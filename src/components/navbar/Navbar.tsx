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
    id: 'projects',
    label: 'PROJECTS',
  },
  {
    id: 'activity',
    label: 'ACTIVITY',
  },
  {
    id: 'blog',
    label: 'BLOG',
  },
]

export default function Navbar(){
  return (
    <header className={styles.navbar}>
      <nav className={styles.nav} area-lable="주요 메뉴">
        <ul className={styles.list}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a className={styles.link} href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}