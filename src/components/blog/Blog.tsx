import type { BlogProps } from '../../types/blog.types.ts'
import { SectionHeader } from '../../shared/ui/SectionHeader.tsx'
import BlogCard from './BlogCard.tsx'

export default function Blog({ title, subtitle, blogs }: BlogProps) {
  return (
    <section id="blog">
      <SectionHeader id="blog-title" title={title} subtitle={subtitle} />
      <ul>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </ul>
    </section>
  )
}
