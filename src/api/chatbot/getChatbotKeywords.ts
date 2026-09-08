import type { ChatbotKeyword } from '../../types/chatbot.types.ts'
import { supabase } from '../supabase.ts'

export async function getChatbotKeywords(): Promise<ChatbotKeyword[]> {
  const { data, error } = await supabase
    .from('chatbot_keywords')
    .select(
      'id, keyword, chatbot_questions(id, question, sort_order), position_x, position_y, font_scale, rotation, float_offset_x, float_offset_y, float_duration, float_delay',
    )
    .order('sort_order')

  if (error) {
    throw error
  }

  return data.map((keyword) => ({
    id: keyword.id,
    label: keyword.keyword,
    questions: (keyword.chatbot_questions ?? [])
      .sort((a, b) => a.sort_order - b.sort_order || a.id - b.id)
      .map((item) => item.question),
    x: keyword.position_x,
    y: keyword.position_y,
    size: keyword.font_scale,
    rotation: keyword.rotation,
    floatOffsetX: keyword.float_offset_x,
    floatOffsetY: keyword.float_offset_y,
    floatDuration: keyword.float_duration,
    floatDelay: keyword.float_delay,
  }))
}
