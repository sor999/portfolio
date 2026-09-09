# 포트폴리오 프로젝트

경험, 기술, 프로젝트와 학습 기록을 소개하는 웹 포트폴리오입니다. React와 TypeScript로 화면을 구성하고, Supabase에서 콘텐츠를 조회합니다.
키워드 선택과 직접 질문으로 작업 방식과 경험을 알아볼 수 있는 AI 챗봇을 제공합니다.

## URL

- [배포 사이트](https://hyunje.vercel.app/)
- [이슈](https://github.com/sor999/portfolio/issues?q=is%3Aissue%20state%3Aclosed)
- [풀리퀘스트](https://github.com/sor999/portfolio/pulls?q=is%3Apr+is%3Aclosed)

## 주요 기능

| 섹션     | 기능                                                                       |
| -------- | -------------------------------------------------------------------------- |
| About    | 자기소개, 프로필 이미지, GitHub·LinkedIn·이메일 링크                       |
| Career   | 경력과 성장 과정 소개                                                      |
| Skill    | 분야별 기술 그룹과 기술 설명, 가로 스크롤                                  |
| Activity | 활동 타임라인, 카테고리별 필터와 개수 표시, 화면 중앙에 가까운 카드 활성화 |
| Projects | 프로젝트 카드와 상세 모달, 기술 스택·스크린샷·GitHub·데모 링크             |
| Blogs    | 학습 기록 목록과 원문 링크                                                 |
| Ask Me   | 움직이는 키워드 워드클라우드, 추천 질문, AI 대화                           |
| Contact  | 이메일 보내기                                                              |

CSS Modules와 미디어 쿼리로 반응형 화면을 구성하며, 프로젝트 상세보기에는 HTML `<dialog>`를 사용합니다.

## 기술 스택

| 구분          | 기술                                           |
| ------------- | ---------------------------------------------- |
| 프론트엔드    | React 19, TypeScript 6, Vite 8                 |
| 스타일·아이콘 | CSS Modules, React Icons                       |
| 데이터        | Supabase, PostgreSQL                           |
| AI 챗봇       | Groq Chat Completions API, 서버 측 `/api/chat` |
| 개발 도구     | Oxlint, Prettier, Supabase CLI                 |

## 로컬 실행

Node.js는 설치된 Vite의 요구사항에 맞춰 **20.19 이상인 20.x 또는 22.12 이상**을 사용합니다. npm과 Supabase 프로젝트가 필요합니다.

```bash
npm ci
cp .env.example .env
```

`.env`에 Supabase 연결 정보를 입력합니다.

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Supabase 테이블과 데이터를 준비한 뒤 개발 서버를 실행합니다.

```bash
npm run dev
```

터미널에 표시되는 주소로 접속합니다. 기본 주소는 `http://localhost:5173`이며, 포트가 사용 중이면 다른 포트로 실행될 수 있습니다.

### Supabase 데이터 준비

- [supabase/migrations](supabase/migrations): 테이블 생성과 스키마 변경 이력
- [supabase/seed.sql](supabase/seed.sql): 포트폴리오 초기 콘텐츠

새 데이터베이스에는 마이그레이션 파일을 파일명 순서대로 적용한 다음 시드 데이터를 실행합니다. 초기 `about` 테이블은 후속 마이그레이션에서 `profile`로 변경되므로 모든 마이그레이션을 적용해야 합니다.

`seed.sql`에는 기존 데이터 수정과 일부 샘플 데이터 삭제도 포함되어 있습니다. 기존 프로젝트에 적용할 때는 내용을 먼저 확인하세요.

| 테이블                       | 데이터                                  |
| ---------------------------- | --------------------------------------- |
| `profile`                    | 자기소개와 프로필 이미지                |
| `careers`                    | 경력                                    |
| `skill_categories`, `skills` | 기술 분류와 하위 기술                   |
| `activities`                 | 활동 분류, 기간, 역할과 상세 내용       |
| `projects`                   | 프로젝트 설명, 기술 스택, 이미지와 링크 |
| `posts`                      | 블로그 글                               |
| `chatbot_keywords`           | 워드클라우드 배치와 추천 질문           |

### AI 챗봇 설정

챗봇을 사용하려면 `.env`에 다음 서버 환경 변수를 추가합니다. 현재 `.env.example`에는 Supabase 변수만 포함되어 있습니다.

```dotenv
GROQ_API_KEY=YOUR_GROQ_API_KEY
GROQ_MODEL=YOUR_GROQ_MODEL_ID
PORTFOLIO_PROFILE_CONTEXT="포트폴리오에 공개할 자기소개, 기술, 프로젝트와 경험을 입력하세요."
```

- `GROQ_API_KEY`: 답변 생성에 필요한 API 키입니다.
- `GROQ_MODEL`: 사용할 모델 ID입니다. 생략하면 `api/chat.ts`에 지정된 기본값을 사용합니다.
- `PORTFOLIO_PROFILE_CONTEXT`: 답변의 근거가 되는 공개 프로필입니다. 현재 기본 내용은 비어 있으므로 실제 소개 정보를 입력해야 합니다. 문자열 안의 `\n`은 줄바꿈으로 처리됩니다.

서버는 Supabase의 프로필을 자동으로 읽어 답변에 사용하지 않습니다. 소개 내용이 변경되면 `PORTFOLIO_PROFILE_CONTEXT`도 함께 갱신하세요.

`GROQ_API_KEY`에는 `VITE_` 접두사를 붙이지 않습니다. `VITE_` 변수는 브라우저에 공개되므로 Supabase의 `service_role` 키도 넣으면 안 됩니다.

개발 환경에서는 `vite.config.ts`의 미들웨어가 `/api/chat` 요청을 처리하므로 `npm run dev`로 챗봇도 실행할 수 있습니다. 환경 변수를 변경한 뒤에는 서버를 다시 시작합니다.

## 프로젝트 구조

```text
portfolio/
├── api/
│   └── chat.ts              # 질문 검증, 프로필 문맥 구성, Groq 호출
├── public/                 # 정적 파일
├── src/
│   ├── api/                # 도메인별 Supabase 조회 함수
│   ├── components/         # 섹션별 컴포넌트와 CSS Modules
│   ├── types/              # 데이터 및 컴포넌트 타입
│   ├── App.tsx             # 포트폴리오 섹션 구성
│   └── main.tsx            # React 진입점
├── .env.example            # 프론트엔드 환경 변수 예시
└── vite.config.ts          # Vite 및 로컬 챗봇 API 설정
```

각 섹션은 필요한 데이터를 `src/api`의 조회 함수로 불러와 컴포넌트 상태로 관리합니다. 조회 함수는 데이터베이스 필드를 화면에서 사용하는 타입으로 변환하며, 기술 목록은 분류와 하위 기술을 관계 쿼리로 함께 가져옵니다.

챗봇은 브라우저에서 `/api/chat`으로 대화 내용을 보내고, 서버가 공개 프로필 문맥을 추가하여 Groq에 답변을 요청하는 구조입니다.

## 개발 명령어

| 명령어                 | 설명                             |
| ---------------------- | -------------------------------- |
| `npm run dev`          | 프론트엔드와 로컬 챗봇 API 실행  |
| `npm run build`        | TypeScript 검사 및 프로덕션 빌드 |
| `npm run preview`      | 빌드된 프론트엔드 미리보기       |
| `npm run lint`         | Oxlint 코드 검사                 |
| `npm run format`       | 프로젝트 전체 포맷 적용          |
| `npm run format:check` | 프로젝트 전체 포맷 검사          |

빌드 결과는 `dist/`에 생성됩니다. `npm run preview`는 개발 서버용 챗봇 미들웨어를 실행하지 않으므로 챗봇 확인에는 `npm run dev` 또는 `/api/chat`을 제공하는 배포 환경이 필요합니다.

## 배포 구성

프론트엔드 빌드 명령은 `npm run build`, 출력 디렉터리는 `dist`입니다. 배포 환경에도 Supabase 환경 변수를 설정해야 합니다.

AI 챗봇까지 제공하려면 `api/chat.ts`의 서버 핸들러를 `/api/chat`으로 실행할 수 있는 환경과 서버 환경 변수가 필요합니다. `dist`만 정적 호스팅하면 챗봇 API는 포함되지 않습니다.
