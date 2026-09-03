import type { BlogItem } from '../../types/blog.types.ts'

interface BlogCardProps {
  blog: BlogItem
}

function formatDate(date: string) {
  return date.replaceAll('-', '.')
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <li>
      <div>
        <h3>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.title}
          </a>
        </h3>

        <p>{blog.description}</p>

        <time dateTime={blog.publishedDate}>
          {formatDate(blog.publishedDate)}
        </time>

        <a href={blog.url} target="_blank" rel="noreferrer">
          글 보기
        </a>
      </div>
    </li>
  )
}
