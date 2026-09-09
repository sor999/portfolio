import { useRef, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import styles from './Navbar.module.css'

const navItems = [
  {
    id: 'about',
    label: 'ABOUT',
  },
  {
    id: 'chatbot',
    label: 'ASK ME',
  },
  {
    id: 'career',
    label: 'CAREER',
  },
  {
    id: 'skills',
    label: 'SKILLS',
  },
  {
    id: 'activity',
    label: 'ACTIVITY',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
  },
  {
    id: 'blog',
    label: 'BLOG',
  },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <header className={styles.navbar}>
      <nav
        className={styles.nav}
        aria-label="주요 메뉴"
        onKeyDown={(event) => {
          if (event.key === 'Escape' && isMenuOpen) {
            setIsMenuOpen(false)
            menuButtonRef.current?.focus()
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsMenuOpen(false)
          }
        }}
      >
        <a
          className={styles.brand}
          href="#about"
          onClick={() => setIsMenuOpen(false)}
        >
          박현제 Portfolio
        </a>
        <button
          ref={menuButtonRef}
          className={styles.menuButton}
          type="button"
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-links"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <FiX aria-hidden="true" />
          ) : (
            <FiMenu aria-hidden="true" />
          )}
        </button>
        <ul
          id="navbar-links"
          className={`${styles.list} ${isMenuOpen ? styles.listOpen : ''}`}
        >
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                className={styles.link}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
