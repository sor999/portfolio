import { useEffect, useState } from 'react'

import { getProjects } from '../../api/project/getProjects.ts'
import type { ProjectItem, ProjectProps } from '../../types/project.types.ts'
import { SectionHeader } from '../sectionHeader/SectionHeader.tsx'
import ProjectCard from './ProjectCard.tsx'
import ProjectDetailModal from './ProjectDetailModal.tsx'
import styles from './Projects.module.css'

export default function Projects({ title, subtitle }: ProjectProps) {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  )

  useEffect(() => {
    void getProjects()
      .then(setProjects)
      .catch((error) => {
        console.error('프로젝트 조회 실패', error)
      })
  }, [])

  return (
    <section id="projects" aria-labelledby="project-title">
      <SectionHeader id="project-title" title={title} subtitle={subtitle} />

      <ul className={styles.projectList}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={setSelectedProject}
          />
        ))}
      </ul>
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
