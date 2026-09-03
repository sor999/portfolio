export interface CareerItem {
  id: number
  date: string
  title: string
  description: string
}

export interface CareerProps {
  title: string
  subtitle: string
  careers: CareerItem[]
}
