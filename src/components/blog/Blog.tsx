import type { BlogProps } from '../../types/blog.types.ts'
import { SectionHeader } from '../../shared/ui/SectionHeader.tsx'
import PostCard from './PostCard.tsx'

export default function Blog({ title, subtitle, posts }: BlogProps) {
  return (
    <section id="blog">
      <SectionHeader id="blog-title" title={title} subtitle={subtitle} />
      <ul>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </section>
  )
}
