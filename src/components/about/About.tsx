import type { AboutProps } from '../../types/about.types.ts'

export default function About({
  headline,
  role,
  description,
  profileImageUrl,
}: AboutProps) {
  return (
    <section id="about" aria-label="자기소개">
      <h1>{headline}</h1>
      <div>
        <div>
          <h2>{role}</h2>
          <p>{description}</p>

          {/* aria-lable: 네비게이션 영역 용도 구분 - 접근성을 위함
              target="_blank": 새 탭에서 링크 열기
              rel="noreferrer": URL 정보를 상대 사이트에 전달하지 않음
          */}
          <nav aria-label="프로필 링크">
            <a href="mailto:sorsor999@naver.com">Email</a>
            <a
              href="https://github.com/sor999"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/hyunje-park-02263a2a9/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </nav>
        </div>
        <img src={profileImageUrl} alt="프로필" />
      </div>
    </section>
  )
}
