import styles from './About.module.css'

export default function About() {
  const about = {
    role: 'Frontend Developer',
    profileImageUrl:
      // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8M2_OiH9jzCBFTFDWcr5JmexUSmT41LszEL2wpT1PoQ&s=10',
      'https://i.namu.wiki/i/R27BGH3F33SRcF9M1UcW-WURx-Aj9-qktuwDO_Nv7tbYNW3wRXtLj-75oHyk_AjItsK66UrrDBmdIpaX4LnlBA.webp',
  }

  return (
    <section id="about" aria-label="자기소개">
      <h1 className={styles.headline}>
        사용자의 시간을 아껴주는
        <br />
        인터페이스를 만듭니다
      </h1>
      <div className={styles.profile}>
        <div className={styles.profileText}>
          <h2 className={styles.role}>Backend Developer</h2>
          <p className={styles.description}>
            안녕하세요, 박현제입니다, 백엔드 개발자지만 프론트엔드에도 관심이 많아요.
            <br/>
            Spring/Java 기반 프로덕트를 만들고 데이터로 검증하는 일을
            <br/>
            좋아합니다. 작은 디테일이 큰 신뢰를 만든다고 믿어요.
          </p>

          {/* aria-lable: 네비게이션 영역 용도 구분 - 접근성을 위함
              target="_blank": 새 탭에서 링크 열기
              rel="noreferrer": URL 정보를 상대 사이트에 전달하지 않음
          */}
          <nav className={styles.links} aria-label="프로필 링크">
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
        <img
          className={styles.profileImage}
          src={about.profileImageUrl}
          alt="프로필"
        />
      </div>
    </section>
  )
}
