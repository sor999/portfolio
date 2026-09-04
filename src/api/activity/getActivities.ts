import { supabase } from '../supabase.ts'
import type { ActivityItem } from '../../types/activity.types.ts'

export async function getActivities(): Promise<ActivityItem[]> {
  const { data, error } = await supabase
    .from('activities')
    .select('id, category, start_date, end_date, title, description')
    .order('start_date', { ascending: false })

  if (error) {
    throw error
  }

  return data.map((activity) => ({
    id: activity.id,
    category: activity.category,
    startDate: activity.start_date,
    endDate: activity.end_date,
    title: activity.title,
    description: activity.description,
  }))
}
