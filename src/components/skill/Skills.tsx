import { SectionHeader } from '../../shared/ui/SectionHeader.tsx'
import type { SkillProps } from '../../types/skill.types.ts'
import SkillCard from './SkillCard.tsx'

export default function Skills({ title, subtitle, groups }: SkillProps) {
  return (
    <section id="skills">
      <SectionHeader id="skill-header" title={title} subtitle={subtitle} />
      {groups.map((group) => (
        <div key={group.id}>
          <h2>{group.category}</h2>

          <ul>
            {group.items.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
