interface ChatRequest {
  selectedKeyword: string | null
  messages: { role: 'user' | 'assistant'; content: string }[]
}

interface ChatResponse {
  answer?: string
  error?: string
}

export async function postChat(payload: ChatRequest): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = (await response.json()) as ChatResponse

  if (!response.ok || !data.answer) {
    throw new Error(data.error || '답변을 불러오지 못했습니다.')
  }

  return data.answer
}
