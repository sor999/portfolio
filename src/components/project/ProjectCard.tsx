import { FaGithub } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'

import type { ProjectItem } from '../../types/project.types.ts'
import styles from './Projects.module.css'

interface ProjectCardProps {
  project: ProjectItem
  onOpen: (project: ProjectItem) => void
}

function formatDate(date: string) {
  return date.slice(0, 7).replace('-', '.')
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <li className={styles.card}>
      <article className={styles.cardInner}>
        <div className={styles.imageFrame}>
          <img
            className={styles.thumbnail}
            src={project.thumbnailUrl}
            alt={`${project.title} 프로젝트 화면`}
          />
        </div>

        <div className={styles.content}>
          <header className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>{project.title}</h2>

            <nav className={styles.links} aria-label={`${project.title} 링크`}>
              {project.demoUrl && (
                <a
                  className={styles.iconLink}
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} 데모 열기`}
                  title="데모 열기"
                >
                  <FiExternalLink aria-hidden="true" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  className={styles.iconLink}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} GitHub 열기`}
                  title="GitHub 열기"
                >
                  <FaGithub aria-hidden="true" />
                </a>
              )}
            </nav>
          </header>

          <p className={styles.meta}>
            <span>{project.subtitle}</span>
            <span className={styles.metaSeparator} aria-hidden="true">
              ·
            </span>
            <span className={styles.dates}>
              <time dateTime={project.startDate}>
                {formatDate(project.startDate)}
              </time>

              {project.endDate && (
                <>
                  {' ~ '}
                  <time dateTime={project.endDate}>
                    {formatDate(project.endDate)}
                  </time>
                </>
              )}
            </span>
          </p>

          <ul className={styles.techList} aria-label="사용 기술">
            {project.techStack.map((tech) => (
              <li className={styles.techTag} key={tech}>
                {tech}
              </li>
            ))}
          </ul>

          <p className={styles.summary}>{project.summary}</p>

          <button
            className={styles.detailButton}
            type="button"
            aria-haspopup="dialog"
            onClick={() => onOpen(project)}
          >
            상세보기
          </button>
        </div>
      </article>
    </li>
  )
}
