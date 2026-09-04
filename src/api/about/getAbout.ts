import type { AboutProps } from '../../types/about.types.ts'
import { supabase } from '../supabase.ts'

export async function getAbout(): Promise<AboutProps> {
  const { data, error } = await supabase
    .from('about')
    .select('headline, role, description, profile_image_url')
    .single()

  if (error) throw error
  return {
    headline: data.headline,
    role: data.role,
    description: data.description,
    profileImageUrl: data.profile_image_url,
  }
}