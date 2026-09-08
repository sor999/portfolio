export interface ChatbotKeyword {
  id: number
  label: string
  questions: string[]
  x: number
  y: number
  size: number
  rotation: number
  floatOffsetX: number
  floatOffsetY: number
  floatDuration: number
  floatDelay: number
}
export interface ChatbotProps {
  title: string
  subtitle: string
}