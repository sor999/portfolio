import { useCallback, useEffect, useRef, useState } from 'react'

import { getActivities } from '../../api/activity/getActivities.ts'
import type { ActivityItem, ActivityProps } from '../../types/activity.types.ts'
import { SectionHeader } from '../sectionHeader/SectionHeader.tsx'
import ActivityCard from './ActivityCard'
import styles from './Activity.module.css'

export default function Activity({ title, subtitle }: ActivityProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [activeActivityId, setActiveActivityId] = useState<number | null>(null)
  const activityRefs = useRef(new Map<number, HTMLLIElement>())

  useEffect(() => {
    void getActivities()
      .then(setActivities)
      .catch((error) => {
        console.error('활동 조회 실패', error)
      })
  }, [])

  const registerActivity = useCallback(
    (activityId: number, element: HTMLLIElement | null) => {
      if (element) {
        activityRefs.current.set(activityId, element)
        return
      }

      activityRefs.current.delete(activityId)
    },
    [],
  )

  useEffect(() => {
    if (activities.length === 0) {
      return
    }

    let frameId = 0

    const updateActiveActivity = () => {
      frameId = 0

      const viewportCenter = window.innerHeight / 2
      let closestActivityId: number | null = null
      let closestDistance = Number.POSITIVE_INFINITY

      activityRefs.current.forEach((element, activityId) => {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight

        if (!isVisible) {
          return
        }

        const itemCenter = rect.top + rect.height / 2
        const distanceFromCenter = Math.abs(itemCenter - viewportCenter)

        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter
          closestActivityId = activityId
        }
      })

      setActiveActivityId((currentId) =>
        currentId === closestActivityId ? currentId : closestActivityId,
      )
    }

    const scheduleUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateActiveActivity)
      }
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [activities])

  return (
    <section
      className={styles.section}
      id="activity"
      aria-labelledby="activity-title"
    >
      <SectionHeader id="activity-title" title={title} subtitle={subtitle} />

      <ol className={styles.timeline}>
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            isActive={activity.id === activeActivityId}
            itemRef={(element) => registerActivity(activity.id, element)}
          />
        ))}
      </ol>
    </section>
  )
}
