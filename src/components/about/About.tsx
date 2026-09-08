import { useEffect, useState } from 'react'
import { getProfile } from '../../api/profile/getProfile'
import type { Profile } from '../../types/profile.types'
import styles from './About.module.css'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

export default function About() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    void getProfile()
      .then(setProfile)
      .catch((error) => {
        console.error('자기소개 조회 실패', error)
      })
  }, [])

  if (!profile) return null

  return (
    <section id="about" aria-label="자기소개">
      <div className={styles.profile}>
        <div className={styles.profileText}>
          <h1 className={styles.headline}>{profile.headline}</h1>
          <h2 className={styles.role}>{profile.role}</h2>
          <p className={styles.description}>{profile.description}</p>

          {/* aria-lable: 네비게이션 영역 용도 구분 - 접근성을 위함
              target="_blank": 새 탭에서 링크 열기
              rel="noreferrer": URL 정보를 상대 사이트에 전달하지 않음
          */}
          <nav className={styles.links} aria-label="프로필 링크">
            <a
              href="https://github.com/sor999"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub aria-hidden="true" />
              <span>Github</span>
            </a>

            <a
              href="https://www.linkedin.com/in/hyunje-park-02263a2a9/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn aria-hidden="true" />
              <span>LinkedIn</span>
            </a>

            <a href="mailto:sorsor999@naver.com">
              <FiMail aria-hidden="true" />
              <span>Email</span>
            </a>
          </nav>
        </div>
        <div className={styles.profileImageBox}>
          <img
            className={styles.profileImage}
            src={profile.profileImageUrl}
            alt="프로필"
          />
        </div>
      </div>
    </section>
  )
}
