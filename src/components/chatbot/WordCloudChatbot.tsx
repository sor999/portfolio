import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { FiSend } from 'react-icons/fi'

import { getChatbotKeywords } from '../../api/chatbot/getChatbotKeywords.ts'
import type { ChatbotKeyword, ChatbotProps } from '../../types/chatbot.types.ts'
import { SectionHeader } from '../sectionHeader/SectionHeader.tsx'
import styles from './WordCloudChatbot.module.css'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  isError?: boolean
}

interface ChatResponse {
  answer?: string
  error?: string
}

const initialMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    '안녕하세요. 저의 작업 방식과 경험이 궁금하다면 단어를 골라보세요. 직접 질문해도 좋아요.',
}

function createMessage(
  role: ChatMessage['role'],
  content: string,
  isError = false,
): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    isError,
  }
}

export default function WordCloudChatbot({ title, subtitle }: ChatbotProps) {
  const [keywords, setKeywords] = useState<ChatbotKeyword[]>([])
  const [selectedKeyword, setSelectedKeyword] = useState<ChatbotKeyword | null>(
    null,
  )
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage])
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestedQuestions, setShowSuggestedQuestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messageListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    void getChatbotKeywords()
      .then(setKeywords)
      .catch((error) => {
        console.error('챗봇 키워드 조회 실패', error)
      })
  }, [])

  useEffect(() => {
    const messageList = messageListRef.current

    if (!messageList) return

    messageList.scrollTo({
      top: messageList.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, isLoading, selectedKeyword, showSuggestedQuestions])

  const handleKeywordSelect = (keyword: ChatbotKeyword) => {
    setSelectedKeyword(keyword)
    setDraft('')
    setShowSuggestedQuestions(true)
  }

  const sendQuestion = async (
    question: string,
    keywordContext: string | null = null,
  ) => {
    const trimmedQuestion = question.trim()

    if (!trimmedQuestion || isLoading) return

    const userMessage = createMessage('user', trimmedQuestion)
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setDraft('')
    setShowSuggestedQuestions(false)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedKeyword: keywordContext,
          messages: nextMessages
            .filter((message) => !message.isError && message.id !== 'welcome')
            .slice(-10)
            .map(({ role, content }) => ({
              role,
              content,
            })),
        }),
      })
      const data = (await response.json()) as ChatResponse
      const answer = data.answer

      if (!response.ok || !answer) {
        throw new Error(data.error || '답변을 불러오지 못했습니다.')
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage('assistant', answer),
      ])
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '챗봇에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.'

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage('assistant', message, true),
      ])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendQuestion(draft, selectedKeyword?.label ?? null)
  }

  return (
    <section id="chatbot" aria-labelledby="chatbot-title">
      <SectionHeader id="chatbot-title" title={title} subtitle={subtitle} />

      <div className={styles.interviewDesk}>
        <div className={styles.wordPanel}>
          <p className={styles.guide}>
            어떤 사람인지 궁금한 단어를 골라주세요.
          </p>

          <ul
            className={styles.wordCloud}
            aria-label="박현제를 표현하는 키워드"
          >
            {keywords.map((keyword) => {
              const isSelected = selectedKeyword?.label === keyword.label
              const wordStyle = {
                '--word-x': `${keyword.x}%`,
                '--word-y': `${keyword.y}%`,
                '--word-size': keyword.size,
                '--word-rotation': `${keyword.rotation}deg`,
                '--word-float-x': `${keyword.floatOffsetX}px`,
                '--word-float-y': `${keyword.floatOffsetY}px`,
                '--word-duration': `${keyword.floatDuration}s`,
                '--word-delay': `${keyword.floatDelay}s`,
              } as CSSProperties

              return (
                <li
                  className={`${styles.wordPosition} ${isSelected ? styles.selectedPosition : ''}`}
                  key={keyword.id}
                  style={wordStyle}
                >
                  <button
                    className={`${styles.keywordButton} ${isSelected ? styles.selected : ''}`}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleKeywordSelect(keyword)}
                  >
                    {keyword.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.chatPanel}>
          <div className={styles.selection} aria-live="polite">
            <p className={styles.selectionLabel}>현재 선택된 키워드</p>
            {selectedKeyword ? (
              <strong className={styles.selectedKeyword}>
                {selectedKeyword.label}
              </strong>
            ) : (
              <p className={styles.selectionEmpty}>키워드를 선택해 주세요.</p>
            )}
          </div>

          <div
            ref={messageListRef}
            className={styles.messageList}
            role="log"
            aria-label="챗봇 대화"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                className={`${styles.message} ${
                  message.role === 'user'
                    ? styles.userMessage
                    : styles.assistantMessage
                } ${message.isError ? styles.errorMessage : ''}`}
                key={message.id}
              >
                <span className={styles.messageAuthor}>
                  {message.role === 'user' ? '나' : 'Portfolio AI'}
                </span>
                <p>{message.content}</p>
              </div>
            ))}

            {selectedKeyword && showSuggestedQuestions && (
              <div
                className={styles.suggestionList}
                role="group"
                aria-label={`${selectedKeyword.label} 추천 질문`}
              >
                {selectedKeyword.questions.map((question) => (
                  <button
                    className={styles.suggestionBubble}
                    type="button"
                    disabled={isLoading}
                    key={question}
                    onClick={() =>
                      void sendQuestion(question, selectedKeyword.label)
                    }
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div
                className={`${styles.message} ${styles.assistantMessage}`}
                role="status"
              >
                <span className={styles.messageAuthor}>Portfolio AI</span>
                <span className={styles.thinking} aria-label="답변 작성 중">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            )}
          </div>

          <form className={styles.composer} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={draft}
              maxLength={800}
              placeholder="현제님에 대해 궁금한 점을 입력해 주세요"
              aria-label="챗봇에게 질문하기"
              disabled={isLoading}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button
              type="submit"
              aria-label="질문 보내기"
              disabled={isLoading || !draft.trim()}
            >
              <FiSend aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
