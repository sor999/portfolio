import { useEffect, useState } from 'react'

import { getSkillGroups } from '../../api/skill/getSkillGroups.ts'
import type { SkillGroup, SkillProps } from '../../types/skill.types.ts'
import { SectionHeader } from '../sectionHeader/SectionHeader.tsx'
import SkillCard from './SkillCard.tsx'
import styles from './Skills.module.css'

export default function Skills({ title, subtitle }: SkillProps) {
  const [groups, setGroups] = useState<SkillGroup[]>([])

  useEffect(() => {
    void getSkillGroups()
      .then(setGroups)
      .catch((error) => {
        console.error('기술 조회 실패', error)
      })
  }, [])

  const visibleGroups = groups.filter((group) => group.items.length > 0)

  return (
    <section
      id="skills"
      className={styles.section}
      aria-labelledby="skill-header"
    >
      <SectionHeader id="skill-header" title={title} subtitle={subtitle} />

      <div
        className={styles.groups}
        role="region"
        aria-label="기술 그룹 목록"
        tabIndex={0}
      >
        {visibleGroups.map((group) => (
          <div key={group.id} className={styles.group}>
            <h3 className={styles.category}>{group.category}</h3>

            <ul
              className={styles.list}
              aria-label={`${group.category} 기술 목록`}
            >
              {group.items.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
