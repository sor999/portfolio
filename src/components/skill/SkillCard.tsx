import type { SkillItem } from '../../types/skill.types.ts'
import styles from './SkillCard.module.css'

interface SkillCardProps {
  // 내부에서만 사용되는 타입
  skill: SkillItem
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <li className={styles.card}>
      <div className={styles.heading}>
        {skill.iconUrl ? (
          <img
            className={styles.icon}
            src={skill.iconUrl}
            alt=""
            width="28"
            height="28"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className={styles.marker} aria-hidden="true" />
        )}
        <h4 className={styles.name}>{skill.name}</h4>
      </div>

      <p className={styles.description}>{skill.description}</p>
    </li>
  )
}
