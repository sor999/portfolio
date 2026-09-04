import { supabase } from '../supabase.ts'
import type { ProjectItem } from '../../types/project.types.ts'

export async function getProjects(): Promise<ProjectItem[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(
      'id, title, subtitle, summary, description, thumbnail_url, tech_stack, github_url, demo_url, start_date, end_date',
    )
    .order('start_date', { ascending: false })

  if (error) {
    throw error
  }

  return data.map((project) => ({
    id: project.id,
    title: project.title,
    subtitle: project.subtitle,
    summary: project.summary,
    description: project.description,
    thumbnailUrl: project.thumbnail_url,
    techStack: project.tech_stack,
    githubUrl: project.github_url,
    demoUrl: project.demo_url,
    startDate: project.start_date,
    endDate: project.end_date,
  }))
}
