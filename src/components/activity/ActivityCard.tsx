import type { ActivityItem } from '../../types/activity.types.ts'

interface ActivityCardProps {
  activity: ActivityItem
}

function formatDate(date: string) {
  return date.replace('-', '.')
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <li>
      <div>
        <span>{activity.category}</span>

        <div>
          <time dateTime={activity.startDate}>
            {formatDate(activity.startDate)}
          </time>

          {activity.endDate && (
            <>
              {' - '}
              <time dateTime={activity.endDate}>
                {formatDate(activity.endDate)}
              </time>
            </>
          )}
        </div>

        <h3>{activity.title}</h3>
        <p>{activity.description}</p>
      </div>
    </li>
  )
}
