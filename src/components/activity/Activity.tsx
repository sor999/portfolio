import { SectionHeader } from '../../shared/ui/SectionHeader'
import type { ActivityProps } from '../../types/activity.types'
import ActivityCard from './ActivityCard'

export default function Activity({
  title,
  subtitle,
  activities,
}: ActivityProps) {
  return (
    <section id="activity">
      <SectionHeader id="activity-title" title={title} subtitle={subtitle} />

      <ol>
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </ol>
    </section>
  )
}
