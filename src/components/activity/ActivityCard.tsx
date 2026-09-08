import type { ActivityItem } from '../../types/activity.types.ts'
import styles from './Activity.module.css'

interface ActivityCardProps {
  activity: ActivityItem
  isActive: boolean
  itemRef: (element: HTMLLIElement | null) => void
}

function formatDate(date: string) {
  return date.slice(0, 7).replace('-', '.')
}

export default function ActivityCard({
  activity,
  isActive,
  itemRef,
}: ActivityCardProps) {
  return (
    <li
      className={`${styles.timelineItem} ${isActive ? styles.active : ''}`}
      ref={itemRef}
      aria-current={isActive ? 'true' : undefined}
    >
      <article className={styles.activityContent}>
        <div className={styles.meta}>
          <span className={styles.category}>{activity.category}</span>

          <div className={styles.dateRange}>
            <time dateTime={activity.startDate}>
              {formatDate(activity.startDate)}
            </time>

            {activity.endDate && (
              <>
                {' ~ '}
                <time dateTime={activity.endDate}>
                  {formatDate(activity.endDate)}
                </time>
              </>
            )}
          </div>
        </div>

        <h3 className={styles.title}>{activity.title}</h3>
        <p className={styles.description}>{activity.description}</p>
      </article>

      <aside
        className={`${styles.detailCard} ${isActive ? styles.detailCardVisible : ''}`}
        aria-hidden={!isActive}
        aria-label={`${activity.title} 상세 내용`}
      >
        <h4 className={styles.detailTitle}>{activity.title}</h4>

        {activity.role && <span className={styles.role}>{activity.role}</span>}

        {activity.details.length > 0 && (
          <ul className={styles.detailList}>
            {activity.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        )}
      </aside>
    </li>
  )
}
