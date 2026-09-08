export interface ActivityItem {
  id: number
  category: string
  startDate: string
  endDate: string | null
  title: string
  description: string
  role: string | null
  details: string[]
}

export interface ActivityProps {
  title: string
  subtitle: string
}
