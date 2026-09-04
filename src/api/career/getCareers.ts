import { supabase } from '../supabase.ts'
import type { CareerItem } from '../../types/career.types.ts'

export async function getCareers(): Promise<CareerItem[]> {
  const { data, error } = await supabase
    .from('careers')
    .select('id, date, title, description')
    .order('date', { ascending: true })

  if (error) {
    throw error
  }
  return data.map((career) => ({
    id: career.id,
    date: career.date,
    title: career.title,
    description: career.description,
  }))
}