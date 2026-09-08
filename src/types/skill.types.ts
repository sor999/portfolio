export interface SkillItem {
  id: number
  name: string
  description: string
  iconUrl: string | null
}

export interface SkillGroup {
  id: number
  category: string
  items: SkillItem[]
}

export interface SkillProps {
  title: string
  subtitle: string
}
