import type { ProjectItem } from '../../types/project.types.ts'
interface ProjectCardProps {
  project: ProjectItem
  onOpen: (project: ProjectItem) => void
}

function formatDate(date: string) {
  return date.replace('-', '.')
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <li>
      <div>
        <div>
          <img
            src={project.thumbnailUrl}
            alt={`${project.title} 프로젝트 화면`}
          />
        </div>

        <div>
          <h2>{project.title}</h2>
          <h3>{project.subtitle}</h3>
          <p>{project.summary}</p>

          <ul>
            {project.techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <nav aria-label={`${project.title} 링크`}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}

            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                Demo
              </a>
            )}
          </nav>

          <div>
            <time dateTime={project.startDate}>
              {formatDate(project.startDate)}
            </time>

            {project.endDate && (
              <>
                {' - '}
                <time dateTime={project.endDate}>
                  {formatDate(project.endDate)}
                </time>
              </>
            )}
          </div>

          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => onOpen(project)}
          >
            상세보기
          </button>
        </div>
      </div>
    </li>
  )
}
