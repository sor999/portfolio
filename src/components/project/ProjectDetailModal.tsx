import type { ProjectItem } from '../../types/project.types'
import { useEffect, useRef } from 'react'

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
      ref={dialogRef}
      aria-label={`${project.title} 상세보기`}
      onClose={onClose}
    >
      <header>
        <h2>{project.title}</h2>

        <button type="button" aria-label="모달 닫기" onClick={onClose}>
          ×
        </button>
      </header>

      <p>{project.description}</p>
    </dialog>
  )
}
