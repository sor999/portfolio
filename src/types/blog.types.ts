import type { PostItem } from './post.types.ts'

export interface BlogProps {
  title: string
  subtitle: string
  posts: PostItem[]
}
