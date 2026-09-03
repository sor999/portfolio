import type { PostItem } from '../../types/post.types.ts'

interface PostCardProps {
  post: PostItem
}

function formatDate(date: string) {
  return date.replaceAll('-', '.')
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <li>
      <div>
        <h3>
          <a href={post.url} target="_blank" rel="noreferrer">
            {post.title}
          </a>
        </h3>

        <p>{post.description}</p>

        <time dateTime={post.publishedDate}>
          {formatDate(post.publishedDate)}
        </time>

        <a href={post.url} target="_blank" rel="noreferrer">
          글 보기
        </a>
      </div>
    </li>
  )
}
