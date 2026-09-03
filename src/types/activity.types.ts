export interface ActivityItem {
  id: number
  category: string
  startDate: string
  endDate: string | null
  title: string
  description: string
}

export interface ActivityProps {
  title: string
  subtitle: string
  activities: ActivityItem[]
}
