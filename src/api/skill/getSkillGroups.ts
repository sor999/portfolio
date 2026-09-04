import type { SkillGroup } from '../../types/skill.types.ts'
import { supabase } from '../supabase.ts'

// supabase에서 skill_categories 테이블과 skills 테이블을 조인하여 기술 그룹과 해당 기술들을 가져옴
export async function getSkillGroups(): Promise<SkillGroup[]> {
  const { data, error } = await supabase
    .from('skill_categories')
    .select('id, name, skills(id, name, description)')
    .order('sort_order')

  if (error) {
    throw error
  }

  return data.map((category) => ({
    id: category.id,
    category: category.name,
    items: category.skills,
  }))
}
