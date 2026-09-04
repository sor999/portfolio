import { useEffect, useState } from 'react'

import { getPosts } from '../../api/blog/getPosts.ts'
import type { BlogProps, PostItem } from '../../types/blog.types.ts'
import { SectionHeader } from '../sectionHeader/SectionHeader.tsx'
import PostCard from './PostCard.tsx'
import styles from './Blog.module.css'

export default function Blog({ title, subtitle }: BlogProps) {
  const [posts, setPosts] = useState<PostItem[]>([])

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((error) => {
        console.error('게시글 조회 실패', error)
      })
  }, [])

  return (
    <section className={styles.section} id="blog" aria-labelledby="blog-title">
      <SectionHeader id="blog-title" title={title} subtitle={subtitle} />
      <ul className={styles.postList}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </section>
  )
}
