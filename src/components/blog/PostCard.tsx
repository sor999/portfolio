import { HiOutlineArrowRight } from 'react-icons/hi2'

import type { PostItem } from '../../types/blog.types.ts'
import styles from './Blog.module.css'

interface PostCardProps {
  post: PostItem
}

function formatDate(date: string) {
  return date.slice(0, 7).replace('-', '.')
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <li className={styles.postItem}>
      <article className={styles.postCard}>
        <div className={styles.postContent}>
          <h3 className={styles.postTitle}>
            <a href={post.url} target="_blank" rel="noreferrer">
              {post.title}
            </a>
          </h3>

          <p className={styles.postDescription}>{post.description}</p>

          <time className={styles.postDate} dateTime={post.publishedDate}>
            {formatDate(post.publishedDate)}
          </time>
        </div>

        <a
          className={styles.postLink}
          href={post.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${post.title} 글 보기`}
          title="글 보기"
        >
          <HiOutlineArrowRight aria-hidden="true" />
        </a>
      </article>
    </li>
  )
}
