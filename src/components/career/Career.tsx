import { useEffect, useState } from 'react'

import { getCareers } from '../../api/career/getCareers.ts'
import type { CareerItem, CareerProps } from '../../types/career.types.ts'
import { SectionHeader } from '../sectionHeader/SectionHeader.tsx'
import styles from './Career.module.css'

function formatCareerDate(date: string) {
  const [year, month] = date.split('-')

  return `${year}.${month}`
}

export default function Career({ title, subtitle }: CareerProps) {
  const [careers, setCareers] = useState<CareerItem[]>([])

  useEffect(() => {
    void getCareers()
      .then(setCareers)
      .catch((error) => {
        console.error('경력 조회 실패', error)
      })
  }, [])

  return (
    <section
      id="career"
      className={styles.section}
      aria-labelledby="career-title"
    >
      <SectionHeader id="career-title" title={title} subtitle={subtitle} />
      <ol className={styles.timeline}>
        {careers.map((career) => (
          <li key={career.id} className={styles.item}>
            <time className={styles.date} dateTime={career.date}>
              {formatCareerDate(career.date)}
            </time>
            <h3 className={styles.title}>{career.title}</h3>
            <p className={styles.description}>{career.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
