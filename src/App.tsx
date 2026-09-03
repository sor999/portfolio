import './App.css'

import About from './components/about/About'
import Activity from './components/activity/Activity'
import Blog from './components/blog/Blog'
import Career from './components/career/Career'
import Closing from './components/closing/Closing'
import Project from './components/project/Project'
import Skill from './components/skill/Skill'
import Navbar from './shared/ui/Navbar'

// dummy data

import type { ActivityItem } from './types/activity.types'
import type { BlogItem } from './types/blog.types'
import type { CareerItem } from './types/career.types'
import type { ProjectItem } from './types/project.types'
import type { SkillGroup } from './types/skill.types'

const careers: CareerItem[] = [
  {
    id: 1,
    date: '2026.07',
    title: '현대오토에버 모빌리티 SW 스쿨',
    description: '웹 프론트엔드 개발 과정을 학습하고 있습니다.',
  },
]

const skillGroups: SkillGroup[] = [
  {
    id: 1,
    category: 'FRONTEND',
    items: [
      {
        id: 1,
        name: 'React',
        description: '컴포넌트 기반으로 사용자 인터페이스를 개발합니다.',
      },
      {
        id: 2,
        name: 'TypeScript',
        description: '타입을 활용해 안정적인 코드를 작성합니다.',
      },
      {
        id: 3,
        name: 'Redux Toolkit',
        description: '애플리케이션의 전역 상태를 관리합니다.',
      },
      {
        id: 4,
        name: 'CSS Modules',
        description: '컴포넌트별로 독립적인 스타일을 작성합니다.',
      },
    ],
  },
  {
    id: 2,
    category: 'DATABASE',
    items: [
      {
        id: 5,
        name: 'Supabase',
        description: '프로젝트 데이터 저장과 조회에 사용합니다.',
      },
    ],
  },
]

const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'Portfolio Project',
    subtitle: '개인 포트폴리오 만들기',
    summary: '경력과 기술, 프로젝트를 소개하는 포트폴리오입니다.',
    description:
      'React와 TypeScript를 기반으로 제작한 개인 포트폴리오입니다. Redux Toolkit으로 상태를 관리하고 Supabase에서 데이터를 조회할 예정입니다.',
    thumbnailUrl:
      'https://i.namu.wiki/i/GQMqb8jtiqpCo6_US7jmWDO30KfPB2MMvbdURVub61Rs6ALKqbG-nUATj-wNk7bXXWIDjiLHJxWYkTELUgybkA.webp',
    startDate: '2026-09',
    endDate: null,
    techStack: ['React', 'TypeScript', 'Redux Toolkit', 'Supabase'],
    githubUrl: 'https://github.com/sor999',
    demoUrl: null,
  },
]

const activities: ActivityItem[] = [
  {
    id: 1,
    category: '교육',
    startDate: '2026-07',
    endDate: null,
    title: '현대오토에버 모빌리티 SW 스쿨',
    description: '프론트엔드와 백엔드 개발 과정을 학습하고 있습니다.',
  },
  {
    id: 2,
    category: '프로젝트',
    startDate: '2026-09',
    endDate: null,
    title: '개인 포트폴리오 제작',
    description: 'React 기반의 개인 포트폴리오를 제작하고 있습니다.',
  },
]

const blogs: BlogItem[] = [
  {
    id: 1,
    title: 'React 컴포넌트 분리 기준 정리',
    description:
      '재사용 가능한 컴포넌트와 타입을 분리하는 기준을 정리했습니다.',
    publishedDate: '2026-09-03',
    url: 'https://example.com/blog/react-components',
  },
]

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <About
          headline="사용자의 시간을 아껴주는 인터페이스를 만듭니다"
          role="Frontend Developer"
          description="사용자 경험을 고민하며 더 나은 서비스를 만드는 프론트엔드 개발자입니다."
          profileImageUrl="https://i.namu.wiki/i/GQMqb8jtiqpCo6_US7jmWDO30KfPB2MMvbdURVub61Rs6ALKqbG-nUATj-wNk7bXXWIDjiLHJxWYkTELUgybkA.webp"
        />

        <Career title="CAREER" subtitle="지금까지의 여정" careers={careers} />
        <Skill title="SKILL" subtitle="기술 스택" groups={skillGroups} />
        <Project title="PROJECT" subtitle="프로젝트" projects={projects} />
        <Activity title="ACTIVITY" subtitle="활동" activities={activities} />
        <Blog
          title="BLOGS"
          subtitle="공부하고 기록한 글들"
          blogs={blogs}
        />

        <Closing
          headline="여기까지 봐주셔서 감사합니다"
          description="더 나은 제품을 만드는 과정을 좋아합니다. 함께 일하고 싶으시다면 편하게 연락 주세요."
          ctaText="이메일 보내기"
          email="sorsor999@naver.com"
        />
      </main>
    </>
  )
}
