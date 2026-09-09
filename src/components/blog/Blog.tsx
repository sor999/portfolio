import { useQuery } from '@tanstack/react-query'

import { getPosts } from '../../api/blog/getPosts.ts'
import type { BlogProps } from '../../types/blog.types.ts'
import { SectionHeader } from '../sectionHeader/SectionHeader.tsx'
import PostCard from './PostCard.tsx'
import styles from './Blog.module.css'

export default function Blog({ title, subtitle }: BlogProps) {
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return (
    <section id="blog" aria-labelledby="blog-title">
      <SectionHeader id="blog-title" title={title} subtitle={subtitle} />
      <ul className={styles.postList}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </section>
  )
}
