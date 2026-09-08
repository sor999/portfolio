import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createClient } from '@supabase/supabase-js'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequestBody {
  messages?: unknown
  selectedKeyword?: unknown
}

interface GroqChatCompletion {
  choices?: Array<{
    finish_reason?: string
    message?: {
      content?: string
    }
  }>
}

interface GroqErrorResponse {
  error?: {
    code?: string
    message?: string
    type?: string
  }
}

async function getProfileContext() {
  const context = await readFile(
    join(process.cwd(), 'content/profile-context.md'),
    'utf8',
  )
  if (!context.trim()) throw new Error('프로필 컨텍스트 파일이 비어 있습니다.')
  return context.trim()
}

const MAX_MESSAGE_LENGTH = 800
const MAX_MESSAGES = 10

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== 'object' || value === null) return false

  const message = value as Record<string, unknown>

  return (
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string' &&
    message.content.trim().length > 0 &&
    message.content.length <= MAX_MESSAGE_LENGTH
  )
}

function getAnswer(response: GroqChatCompletion) {
  return response.choices?.[0]?.message?.content?.trim() ?? ''
}

function normalizeQuestion(question: string) {
  return question.trim().replace(/\s+/g, ' ').toLowerCase()
}

async function getSavedAnswer(question: string, keyword: string) {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key =
    process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) return null

  const supabase = createClient(url, key)
  let query = supabase
    .from('chatbot_questions')
    .select('question, answer, chatbot_keywords!inner(keyword)')
    .eq('normalized_question', normalizeQuestion(question))
    .not('answer', 'is', null)

  if (keyword) query = query.eq('chatbot_keywords.keyword', keyword)

  const { data, error } = await query.limit(2)
  if (error) throw error
  // 키워드 없이 같은 질문에 서로 다른 답변이 있으면 기본 정보로 답한다.
  const answers = [
    ...new Set(data.map((row) => row.answer?.trim()).filter(Boolean)),
  ]
  return answers.length === 1 ? answers[0] : null
}

async function handleChatRequest(request: Request) {
  if (request.method !== 'POST') {
    return Response.json(
      { error: '지원하지 않는 요청 방식입니다.' },
      { status: 405, headers: { Allow: 'POST' } },
    )
  }

  let body: ChatRequestBody

  try {
    body = (await request.json()) as ChatRequestBody
  } catch {
    return Response.json(
      { error: '요청 형식이 올바르지 않습니다.' },
      { status: 400 },
    )
  }

  if (
    !body ||
    !Array.isArray(body.messages) ||
    !body.messages.every(isChatMessage)
  ) {
    return Response.json(
      { error: '대화 내용을 확인해 주세요.' },
      { status: 400 },
    )
  }

  const messages = body.messages.slice(-MAX_MESSAGES)
  const selectedKeyword =
    typeof body.selectedKeyword === 'string'
      ? body.selectedKeyword.trim().slice(0, 30)
      : ''

  const question = messages.at(-1)

  if (!question || question.role !== 'user') {
    return Response.json({ error: '질문을 입력해 주세요.' }, { status: 400 })
  }

  try {
    const answer = await getSavedAnswer(question.content, selectedKeyword)
    if (answer) return Response.json({ answer })
  } catch (error) {
    console.error('저장된 챗봇 답변 조회 실패', error)
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return Response.json(
      { error: '챗봇 서버 설정이 완료되지 않았습니다.' },
      { status: 503 },
    )
  }

  try {
    const profileContext = await getProfileContext()
    const instructions = {
      role: '박현제의 포트폴리오를 안내하는 AI 인터뷰 도우미',
      language: '한국어',
      responseStyle: {
        tone: '친근하고 구체적으로',
        sentences: '2~3문장',
        maxCharactersIncludingSpaces: 350,
        perspective:
          '박현제인 것처럼 1인칭으로 말한다.',
        ending:
          '답변이 길어지면 세부 내용을 덜어내고 반드시 완결된 문장으로 끝낸다. 마지막 문장은 마침표로 끝낸다.',
      },
      rules: [
        '공개 프로필 정보만 근거로 답한다.',
        '프로필에 없는 성과, 수치, 회사 경험, 프로젝트 일화를 만들어내지 않는다.',
        '근거가 없는 세부 경험을 물으면 현재 포트폴리오에 기록되지 않은 내용이라고 솔직하게 말하고, 확인 가능한 관련 정보로 이어서 답한다.',
        '포트폴리오와 무관한 질문에는 박현제의 경험과 작업 방식에 관한 질문을 부탁한다.',
      ],
      context: {
        publicProfile: profileContext,
        selectedKeyword: selectedKeyword || null,
      },
    }

    const groqResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || 'qwen/qwen3.8-27b',
          messages: [
            { role: 'system', content: JSON.stringify(instructions) },
            ...messages,
          ],
          max_completion_tokens: 700,
          temperature: 0.4,
        }),
      },
    )

    if (!groqResponse.ok) {
      const errorResponse = (await groqResponse
        .json()
        .catch(() => null)) as GroqErrorResponse | null

      console.error('Groq 응답 실패', {
        status: groqResponse.status,
        requestId: groqResponse.headers.get('x-request-id'),
        code: errorResponse?.error?.code,
        type: errorResponse?.error?.type,
        message: errorResponse?.error?.message,
      })

      return Response.json(
        {
          error: '지금은 답변을 만들 수 없습니다. 잠시 후 다시 시도해 주세요.',
        },
        { status: 502 },
      )
    }

    const response = (await groqResponse.json()) as GroqChatCompletion
    const finishReason = response.choices?.[0]?.finish_reason

    if (finishReason === 'length') {
      console.error('Groq 응답 생성 중단', { reason: finishReason })

      return Response.json(
        { error: '답변 생성이 중간에 멈췄습니다. 다시 시도해 주세요.' },
        { status: 502 },
      )
    }

    const answer = getAnswer(response)

    if (!answer) {
      return Response.json(
        { error: '답변이 비어 있습니다. 질문을 바꿔 다시 시도해 주세요.' },
        { status: 502 },
      )
    }

    return Response.json({ answer })
  } catch (error) {
    console.error('챗봇 요청 실패', error)

    return Response.json(
      { error: '챗봇에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 502 },
    )
  }
}

export default {
  fetch: handleChatRequest,
}
