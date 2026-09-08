import type { Profile } from '../../types/profile.types.ts'
import { supabase } from '../supabase.ts'

export async function getProfile(): Promise<Profile> {
  const { data, error } = await supabase
    .from('profile')
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
