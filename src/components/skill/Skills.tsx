import { useEffect, useRef, useState } from 'react'

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

  const groupsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = groupsRef.current

    if (!element) return

    let animationFrameId = 0
    let targetScrollLeft = element.scrollLeft

    const animateScroll = () => {
      const distance = targetScrollLeft - element.scrollLeft
      const scrollStep = distance * 0.16

      if (Math.abs(scrollStep) < 1) {
        element.scrollLeft = targetScrollLeft
        animationFrameId = 0
        return
      }

      element.scrollLeft += scrollStep
      animationFrameId = window.requestAnimationFrame(animateScroll)
    }

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return

      const maxScrollLeft = element.scrollWidth - element.clientWidth
      const movingRight = event.deltaY > 0
      const atStart = element.scrollLeft <= 1
      const atEnd = element.scrollLeft >= maxScrollLeft - 1

      if (
        (movingRight && atEnd && targetScrollLeft >= maxScrollLeft - 1) ||
        (!movingRight && atStart && targetScrollLeft <= 1)
      ) {
        return
      }

      event.preventDefault()

      const wheelDistance =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? event.deltaY * 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? event.deltaY * element.clientWidth
            : event.deltaY

      targetScrollLeft = Math.min(
        maxScrollLeft,
        Math.max(0, targetScrollLeft + wheelDistance),
      )

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        element.scrollLeft = targetScrollLeft
        return
      }

      if (animationFrameId === 0) {
        animationFrameId = window.requestAnimationFrame(animateScroll)
      }
    }

    const handleNativeScroll = () => {
      if (animationFrameId === 0) {
        targetScrollLeft = element.scrollLeft
      }
    }

    element.addEventListener('wheel', handleWheel, { passive: false })
    element.addEventListener('scroll', handleNativeScroll, { passive: true })

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      element.removeEventListener('wheel', handleWheel)
      element.removeEventListener('scroll', handleNativeScroll)
    }
  }, [])
  const visibleGroups = groups.filter((group) => group.items.length > 0)

  return (
    <section id="skills" aria-labelledby="skill-header">
      <SectionHeader id="skill-header" title={title} subtitle={subtitle} />

      <div
        ref={groupsRef}
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
