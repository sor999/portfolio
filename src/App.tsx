import './App.module.css'

import About from './components/about/About'
import Activity from './components/activity/Activity'
import Blog from './components/blog/Blog'
import Career from './components/career/Career'
import Closing from './components/closing/Closing'
import Projects from './components/project/Projects.tsx'
import Skills from './components/skill/Skills.tsx'
import Navbar from './components/navbar/Navbar.tsx'
import WordCloudChatbot from './components/chatbot/WordCloudChatbot.tsx'

import styles from './App.module.css'

export default function App() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <About />

        <Career title="CAREER" subtitle="지금까지의 여정" />

        <Skills title="SKILL" subtitle="기술 스택" />

        <Activity title="ACTIVITY" subtitle="활동" />

        <Projects title="PROJECTS" subtitle="프로젝트" />

        <Blog title="BLOGS" subtitle="공부하고 기록한 글들" />

        <WordCloudChatbot title="ASK ME" subtitle="나를 표현하는 키워드" />

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
