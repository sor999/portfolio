import type { SkillItem } from '../../types/skill.types.ts'
import styles from './SkillCard.module.css'

interface SkillCardProps {
  // 내부에서만 사용되는 타입
  skill: SkillItem
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <li className={styles.card}>
      <span className={styles.marker} aria-hidden="true" />

      <div>
        <h4 className={styles.name}>{skill.name}</h4>
        <p className={styles.description}>{skill.description}</p>
      </div>
    </li>
  )
}
