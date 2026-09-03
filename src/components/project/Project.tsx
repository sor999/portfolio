import type { ProjectItem, ProjectProps } from '../../types/project.types.ts'
import ProjectCard from './ProjectCard.tsx'
import { SectionHeader } from '../../shared/ui/SectionHeader.tsx'
import { useState } from 'react'
import ProjectDetailModal from './ProjectDetailModal.tsx'

export default function Project({ title, subtitle, projects }: ProjectProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  )

  return (
    <section id="project">
      <SectionHeader id="project-title" title={title} subtitle={subtitle} />

      <ul>
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
