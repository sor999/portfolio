import type { ProjectItem } from '../../types/project.types'
import { useEffect, useRef } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiLink, FiX } from 'react-icons/fi'

import styles from './Projects.module.css'

interface ProjectDetailModalProps {
  project: ProjectItem
  onClose: () => void
}

function formatDate(date: string) {
  return date.slice(0, 7).replace('-', '.')
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const screenshotUrls = project.screenshotUrls
    .filter((url) => url.trim().length > 0)
    .slice(0, 3)

  useEffect(() => {
    const dialog = dialogRef.current

    if (dialog && !dialog.open) {
      dialog.showModal()
      dialog.focus()
    }
  }, [])

  return (
    <dialog
      className={styles.modal}
      ref={dialogRef}
      tabIndex={-1}
      aria-label={`${project.title} 상세보기`}
      onClose={onClose}
    >
      <header className={styles.modalHeader}>
        <div className={styles.modalHeading}>
          <h2 className={styles.modalTitle}>{project.title}</h2>

          <nav
            className={styles.modalLinks}
            aria-label={`${project.title} 프로젝트 링크`}
          >
            {project.demoUrl && (
              <a
                className={styles.modalIconLink}
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} 데모 열기`}
                title="데모 열기"
              >
                <FiLink aria-hidden="true" />
              </a>
            )}

            {project.githubUrl && (
              <a
                className={styles.modalIconLink}
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
        </div>

        <button
          className={styles.closeButton}
          type="button"
          aria-label="모달 닫기"
          onClick={onClose}
        >
          <FiX aria-hidden="true" />
        </button>
      </header>

      <ul
        className={`${styles.techList} ${styles.modalTechList}`}
        aria-label="사용 기술"
      >
        {project.techStack.map((tech) => (
          <li className={styles.techTag} key={tech}>
            {tech}
          </li>
        ))}
      </ul>

      <p className={styles.modalMeta}>
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

      <p className={styles.modalSummary}>{project.summary}</p>

      {screenshotUrls.length > 0 && (
        <ul
          className={styles.screenshotList}
          aria-label={`${project.title} 프로젝트 스크린샷`}
        >
          {screenshotUrls.map((url, index) => (
            <li className={styles.screenshotItem} key={`${url}-${index}`}>
              <img
                className={styles.screenshot}
                src={url}
                alt={`${project.title} 프로젝트 스크린샷 ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      )}

      <section
        className={styles.modalBody}
        aria-label={`${project.title} 상세 설명`}
      >
        <p className={styles.modalDescription}>{project.description}</p>
      </section>
    </dialog>
  )
}
