import type { SectionHeaderProps } from "../../types/sectionHeader.types.ts";
import styles from './SectionHeader.module.css'

export function SectionHeader({
  id,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <header className={styles.header}>
    <h2 className={styles.headline} id={id}>
        {title}
      </h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  )
}