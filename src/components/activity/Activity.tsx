import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { getActivities } from '../../api/activity/getActivities.ts'
import type { ActivityItem, ActivityProps } from '../../types/activity.types.ts'
import { SectionHeader } from '../sectionHeader/SectionHeader.tsx'
import ActivityCard from './ActivityCard'
import styles from './Activity.module.css'

const emptyActivities: ActivityItem[] = []

export default function Activity({ title, subtitle }: ActivityProps) {
  const { data: activities = emptyActivities } = useQuery({
    queryKey: ['activities'],
    queryFn: getActivities,
  })
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeActivityId, setActiveActivityId] = useState<number | null>(null)
  const activityRefs = useRef(new Map<number, HTMLLIElement>())

  const categories = useMemo(() => {
    const categoryCounts = new Map<string, number>()

    activities.forEach((activity) => {
      categoryCounts.set(
        activity.category,
        (categoryCounts.get(activity.category) ?? 0) + 1,
      )
    })

    return Array.from(categoryCounts, ([name, count]) => ({
      name,
      count,
    })).sort((firstCategory, secondCategory) =>
      firstCategory.name.localeCompare(secondCategory.name, 'ko'),
    )
  }, [activities])

  const visibleActivities = useMemo(
    () =>
      selectedCategory
        ? activities.filter(
            (activity) => activity.category === selectedCategory,
          )
        : activities,
    [activities, selectedCategory],
  )

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
    if (visibleActivities.length === 0) {
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
  }, [visibleActivities])

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    setActiveActivityId(null)
  }

  return (
    <section id="activity" aria-labelledby="activity-title">
      <SectionHeader id="activity-title" title={title} subtitle={subtitle} />

      {categories.length > 0 && (
        <nav className={styles.categoryFilter} aria-label="활동 분류별 보기">
          <div className={styles.categoryFilterList}>
            <button
              className={`${styles.categoryButton} ${selectedCategory === null ? styles.categoryButtonActive : ''}`}
              type="button"
              aria-pressed={selectedCategory === null}
              onClick={() => handleCategoryChange(null)}
            >
              전체
              <span className={styles.categoryCount}>{activities.length}</span>
            </button>

            {categories.map((category) => (
              <button
                className={`${styles.categoryButton} ${selectedCategory === category.name ? styles.categoryButtonActive : ''}`}
                type="button"
                aria-pressed={selectedCategory === category.name}
                onClick={() => handleCategoryChange(category.name)}
                key={category.name}
              >
                {category.name}
                <span className={styles.categoryCount}>{category.count}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      <ol className={styles.timeline}>
        {visibleActivities.map((activity) => (
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
