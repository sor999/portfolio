import type { SkillItem } from '../../types/skill.types.ts'

interface SkillCardProps {
  // 내부에서만 사용되는 타입
  skill: SkillItem
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <li>
      <h3>{skill.name}</h3>
      <p>{skill.description}</p>
    </li>
  )
}
