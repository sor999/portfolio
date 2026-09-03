import type { SectionHeaderProps } from "../type/sectionHeader.types";

export function SectionHeader({
  id,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <header>
      <h2 id={id}>{title}</h2>
      <p>{subtitle}</p>
    </header>
  )
}