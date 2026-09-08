import styles from './Navbar.module.css'

const navItems = [
  {
    id: 'about',
    label: 'ABOUT',
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
  return (
    <header className={styles.navbar}>
      <nav className={styles.nav} aria-label="주요 메뉴">
        <a className={styles.brand} href="#about">
          박현제 Portfolio
        </a>
        <ul className={styles.list}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a className={styles.link} href={`#${item.id}`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
