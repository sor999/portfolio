# 박현제 프로필

포트폴리오의 `supabase/seed.sql`에 기록된 소개·경험을 요약한 공개 참고 정보다. 프로젝트 기간과 수치는 해당 기록 기준이며, 종료일이 없는 프로젝트의 현재 진행 여부는 단정하지 않는다.

## 소개와 개발 방향

- 이름: 박현제. 백엔드 개발자(Backend Engineer).
- 소개: 늘 개선점을 찾으며, SOLID 원칙과 유지보수하기 좋은 코드를 고민한다.
- 관심 분야: 백엔드 API 설계, 비동기 처리, 성능 개선, QA 자동화, 안정적인 배포와 운영.
- 협업 환경 개선: CI/CD 도입, GitHub-Jira 연동 자동화에 관심을 두고 노력한다. 구체적인 협업 사례로 배포 자동화, Swagger 문서화 개선, Spring 스터디 운영·발표 경험이 있다.

## 주요 프로젝트

### Keepit — AI 기반 웹 링크 저장·요약 서비스

- 기간: 2025.12~2026.06. 링크 저장·AI 요약, 통계, 공개 링크 탐색, RAG 챗봇 검색을 제공한다.
- 담당: Redis Stream 비동기 처리, SSE 상태 전달, FastAPI 스크래핑 최적화, 서버 분리, Elasticsearch 기반 RAG, GCP 인프라와 GitHub Actions CI/CD, Swagger 문서화·마이페이지 통계 API.
- 비동기 처리: 링크 저장에 즉시 응답하고 스크래핑·AI 요약은 Consumer가 처리하도록 분리했다. 동일 조건의 k6 부하 테스트에서 초기 응답 실패율이 12.2%에서 0% 수준으로 줄었다. 전체 서비스 장애율이나 모든 환경의 성공률을 뜻하지 않는다.
- 실패 대응: 최대 5회 재시도 후 DLQ에 적재하고 Discord Webhook으로 알렸다. Redis maxmemory와 AOF 영속성도 설정했다.
- 성능: Playwright 브라우저 풀 재사용·Recycle 전략을 도입했다. 1 worker·4 pool 설정에서 1 worker·2 pool 대비 RPS가 94.5% 증가하고 평균 응답 시간이 48.4% 단축됐다.
- 인프라: FastAPI 스크래핑 서버는 Cloud Run, Spring 코어 서버는 Compute Engine으로 분리해 장애 전파를 줄이고 스크래핑 서버가 자동 확장되도록 구성했다.
- 주요 기술: Java, Spring Boot, Spring AI, Python, FastAPI, MySQL, Redis, Elasticsearch, GCP, Docker, k6.

### Lokin — ROS2 기반 실시간 로봇 관제 플랫폼

- 시작: 2026.04. 가상 로봇의 위치·배터리·상태를 수집하고 상태 조회와 제어 명령 전송을 제공한다.
- 담당: ROS2 가상 로봇·Kafka Bridge, Fleet 현황과 로봇별 상태 조회, WebSocket(STOMP) 이동·정지 명령 전송.
- 데이터 처리: Kafka 메시지를 배치로 PostgreSQL에 적재하고 파싱 실패 메시지는 DLQ로 분리했다.
- 주요 기술: ROS2, Python, Java, Spring Boot, Go, Kafka, WebSocket, STOMP, SSE, Next.js, React, Zustand, PostgreSQL, Docker Compose.
- 포트폴리오 표기는 Lokin이며 저장소 이름은 rokin이다. 실제 상용 로봇 운영 규모나 성능 수치는 기록되어 있지 않다.

### QA 자동화 — PTKOREA 인턴 프로젝트

- 기간: 2025.04~2026.01. QA 자동화 인턴으로 고객사 웹페이지의 반복 검수와 보고서 생성을 자동화했다.
- 33개국 번역 단어 검수 프로그램을 개발해 수작업 대비 검증 시간을 66% 단축했다. Global QA 메일 본문 자동화도 수행했다.
- 엑셀 보고서: 약 900개 이미지를 처리하는 API에서 HTTP 클라이언트·연결을 재사용하고, 비동기 다운로드와 엑셀 작성을 분리했다. Semaphore로 동시 다운로드 수를 제한해 메모리 부족을 방지했다. 처리 시간을 23분 9초에서 1분 20초로 약 94% 단축했다.
- 이미지 검수: OpenCV로 노이즈를 제거하고 가장 큰 외곽선 기준으로 실제 아이콘 영역을 추출했다. 여백·배경의 영향을 줄여 SSIM 비교 점수를 80%에서 96%로 높였다. 이 수치는 전체 검수 정확도가 아니라 SSIM 점수다.
- 주요 기술: Python, FastAPI, Django, OpenCV, openpyxl, PostgreSQL, SQLite, Redis, n8n.

### Moamoa — 교내 번개모임 서비스

- 시작: 2024.10. 교내 학생들이 모임을 만들고 참여하는 서비스의 백엔드·배포 환경을 구축했다.
- 담당: AWS EC2·RDS·S3·CloudFront·Route53·ALB를 이용한 HTTPS 배포, GitHub Actions·Docker CI/CD.
- Redis 학생 메일 인증으로 DB 부하를 줄이고, 계층형 아키텍처에 맞춰 로그인·회원가입을 리팩터링했다. 회원 정보 수정 API와 JUnit 5 통합·단위 테스트도 작성했다.
- 주요 기술: Java, Spring Boot, JPA, Spring Security, PostgreSQL, Redis, AWS.

### Can I Eat? — 임산부 식품 안전 정보 서비스

- 시작: 2024.08. 사진으로 식품의 영양정보를 검색하는 서비스를 개발했다.
- 담당: Spring Security 기반 JWT 인증, 구글·카카오 OAuth 2.0 로그인, OCR 영양정보 검색 API, AWS S3 이미지 업로드.
- 주요 기술: Java, Spring Boot, JPA, Google Cloud Vision AI, AWS, Docker.

### Duett — 음악 취향 기반 소개팅 서비스

- 기간: 2024.04~2024.08. 음악 취향 기반 매칭과 프로필·유튜브 콘텐츠를 제공한다.
- 담당: 프로필 매칭, 최근 열어본 프로필 조회, 마이페이지·프로필 설정 API. 프로필이 비어 있으면 마이페이지로 이동하도록 처리했다.
- 다대다 관계와 Enum으로 태그 종류·선택 깊이를 모델링하고, YouTube Data API v3로 비디오 검색을 구현했다.
- 주요 기술: Java, Spring Boot, JPA, Spring Security, PostgreSQL, Redis, GCP.

## 학습·활동·수상

- 가톨릭대학교 컴퓨터정보공학부: 기록된 재학 기간 2020.03~2025.02, 학점 4.06/4.5.
- GDSC(2023.09~2024.08): Spring 스터디 팀장. Spring 원리와 MySQL·Redis 동시성 문제 해결 방법을 학습하고 성과 세미나에서 발표했다.
- Dino 창업팀(2024.03~2024.08): 백엔드 개발자로 MyList 음악 플레이리스트 공유 서비스 유지보수와 Duett 제작에 참여했다.
- 2024 하나 소셜벤처 유니버시티: 창업 교육, 예비 창업가들과 경험 공유, 멘토 피드백을 통한 서비스 개선 방향 탐색.
- 수상: UNITHON 10TH 우수상(2023.09, K-POP 팬덤 소통 앱), CUK 혁신 아이디어 경진대회 장려상(2023.11, 멘토·멘티 서비스), GDSC 2nd Hackathon 장려상(2024.06, 학습용 유튜브 플레이리스트 공유 서비스).
- 자격증 기록: 정보처리기사·리눅스마스터 2급(2024.06), SQLD(2024.12)

## 답변에 활용할 경험 연결

- 문제해결·끈기·검증: Keepit의 worker·pool 조합별 k6 실험, QA 엑셀 처리 병목 개선, SSIM 전처리 개선.
- 책임감·안정성: 재시도·DLQ·Discord 알림, 서버 장애 격리, JUnit 5 테스트.
- 사용자 중심: 링크 저장 즉시 응답과 SSE 상태 안내, QA 반복 작업 시간 단축.
- 성장·협업·기록: GDSC 스터디 운영·발표, Dino 서비스 개발·유지보수, CI/CD와 Swagger 개선.

팀 규모, 개인별 기여율, 팀원 갈등 일화, 성격·취미·지원 동기, 현재 재직·구직 상태 등 기록되지 않은 내용은 추측하지 않는다. 질문과 관련된 사실만 골라 답하고, 정보가 없으면 기록되지 않았다고 안내한다.
