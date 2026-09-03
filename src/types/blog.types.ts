export interface BlogItem {
  id: number
  title: string
  description: string
  publishedDate: string
  url: string
}

export interface BlogProps {
  title: string
  subtitle: string
  blogs: BlogItem[]
}
