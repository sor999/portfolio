import type { ProjectItem } from '../../types/project.types'
import { useEffect, useRef } from 'react'

import styles from './Projects.module.css'

interface ProjectDetailModalProps {
  project: ProjectItem
  onClose: () => void
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (dialog && !dialog.open) {
      dialog.showModal()
    }
  }, [])

  return (
    <dialog
      className={styles.modal}
      ref={dialogRef}
      aria-label={`${project.title} 상세보기`}
      onClose={onClose}
    >
      <header className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>{project.title}</h2>

        <button
          className={styles.closeButton}
          type="button"
          aria-label="모달 닫기"
          onClick={onClose}
        >
          ×
        </button>
      </header>

      <p className={styles.modalDescription}>{project.description}</p>
    </dialog>
  )
}
