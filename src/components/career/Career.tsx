import { SectionHeader } from '../../shared/ui/SectionHeader.tsx'
import type { CareerProps } from '../../types/career.types.ts'

export default function Career({ title, subtitle, careers }: CareerProps) {
  return (
    <section id="career">
      <SectionHeader id="career-title" title={title} subtitle={subtitle} />

      <ol>
        {careers.map((career) => (
          <li key={career.id}>
            {/* time: 시간 표현 */}
            <time>{career.date}</time>
            <h3>{career.title}</h3>
            <p>{career.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
