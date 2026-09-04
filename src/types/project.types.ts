export interface ProjectItem {
  id: number
  title: string
  subtitle: string
  summary: string
  description: string
  thumbnailUrl: string
  techStack: string[]
  githubUrl: string | null
  demoUrl: string | null
  startDate: string
  endDate: string | null
}

export interface ProjectProps {
  title: string
  subtitle: string
}
