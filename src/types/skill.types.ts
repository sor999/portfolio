export interface SkillItem {
  id: number
  name: string
  description: string
}

export interface SkillGroup {
  id: number
  category: string
  items: SkillItem[]
}

export interface SkillProps {
  title: string
  subtitle: string
  groups: SkillGroup[]
}
