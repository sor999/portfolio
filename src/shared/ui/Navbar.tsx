const navItems = [
  {
    id: 'home',
    label: 'HOME',
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
    <header>
      <nav area-lable="주요 메뉴">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}