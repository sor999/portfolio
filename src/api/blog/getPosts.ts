import { supabase } from '../supabase.ts'
import type { PostItem } from '../../types/blog.types.ts'

export async function getPosts(): Promise<PostItem[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, description, published_date, url')
    .order('published_date', { ascending: false })

  if (error) {
    throw error
  }

  return data.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    publishedDate: post.published_date,
    url: post.url,
  }))
}
