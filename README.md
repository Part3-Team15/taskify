# Taskify

![taskify](https://github.com/Part3-Team15/taskify/assets/64190056/881c8967-1c42-4592-9032-e55709e9d066)

#### 서비스 링크

https://taskify-15.vercel.app/

#### 로컬 실행 커멘드

```
pnpm install  # 패키지 설치
pnpm run dev  # 개발 서버 실행
```

## README 목차

- [기술 스택](#기술-스택)
- [개발 환경](#개발-환경)
- [개발 기간](#개발-기간-20240622--20240707)
- [개발 문화](#개발-문화)
- [프로젝트 폴더 구조](#프로젝트-폴더-구조)
- [서비스 상세설명](#서비스-상세설명)
- [서비스 개선 사항](#서비스-개선-사항)
- [팀원 소개 및 프로젝트 후기](#팀원-소개-및-프로젝트-후기)

<br />

## 기술 스택

### 개발

<div>
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/next.js-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/tailwind_css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</div>

<div>
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
<img src="https://img.shields.io/badge/react_query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
</div>

### 배포 및 환경

<div>
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/vercel-black?style=for-the-badge&logo=vercel&logoColor=white" />
<img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black" />
</div>

<div>
<img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
<img src="https://img.shields.io/badge/create_react_app-09D3AC?style=for-the-badge&logo=createreactapp&logoColor=white" />
</div>

<div>
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" />
<img src="https://img.shields.io/badge/commitlint-white?style=for-the-badge&logo=commitlint&logoColor=black" />
</div>

### 소통과 협업

<div>
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" />
<img src="https://img.shields.io/badge/notion-white?style=for-the-badge&logo=notion&logoColor=black" />
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
</div>

<br />

## [개발 환경](https://github.com/Part3-Team15/taskify/discussions/60)

### 브랜치 전략

Github Flow에 백업용 브랜치를 추가한 형태로, main, develop, feature를 사용합니다.

#### 브랜치 종류

- main: 배포를 위한 브랜치 (develop -> PR -> main)
- develop: 개발 통합을 위한 브랜치 (feature -> PR -> develop)
- feature: 기능을 개발을 위한 브랜치

#### 브랜치 관리 전략

- main은 develop에서 PR을 생성하는 방식으로 변경사항을 반영합니다. (주로 rebase, 묶을 수 있다면 squash)
- feature는 develop을 base로 feature/{기능이름}으로 브랜치를 생성합니다.
- feature에서 목표한 작업이 끝나면 develop으로 PR을 생성하는 방식으로 변경사항을 반영하며, squash and merge로 병합합니다.
- PR은 최소 1명의 승인이 있어야 병합 가능하며, 급하지 않다면 3명 모두 승인한 뒤 병합하도록 합니다.

### 커밋 컨벤션

- [commitlintrc](https://github.com/Part3-Team15/taskify/blob/develop/.commitlintrc.ts) 설정을 지킵니다.  
  `유형(#이슈번호): 제목`의 형식을 준수합니다. (body, footer는 선택적으로)
  ```
  ✨  feat        새로운 기능 추가
  🛠  fix         버그 수정
  ↔️   style       코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
  ♻️   refactor    코드 리팩토링
  🎨  design      CSS 등 사용자 UI 디자인 변경
  ✅  test        테스트 코드, 리팩토링 테스트 코드 추가
  📝  docs        문서 수정
  ⚙️   chore       패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
  💬  comment     필요한 주석 추가 및 변경
  🚚  rename      파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우
  🗑  remove      파일을 삭제하는 작업만 수행한 경우
  ❗️  !HOTFIX     급하게 치명적인 버그를 고쳐야 하는 경우
  ```

### 코드 컨벤션

- 기본적으로는 [린터](https://github.com/Part3-Team15/taskify/blob/develop/.eslintrc.json)와 [프리티어](https://github.com/Part3-Team15/taskify/blob/develop/.prettierrc) 설정에 맞춥니다.
- 주석은 Comment Anchors를 사용해 확인하기 쉽게 합니다.
- 컴포넌트 함수는 선언문으로 (function 키워드), 이외 모든 함수는 표현식으로 작성합니다.

<br />

## 개발 기간 (2024.06.22 ~ 2024.07.07)

#### 프로젝트 준비: 2024.06.17 ~ 2024.06.21

- 규칙 정리(팀 규칙, 코드 컨벤션, 커밋 컨벤션, 브랜치 전략 등)
- 프로젝트 선정, 기술 스택 선정
- 프로젝트 초기 설정(Git repo 생성, 각종 설정 완료 및 배포)
- 요구사항 분석 후 이슈 등록
- 유저플로우 분석하고 이에 기반해 이슈 우선순위 배정  
  ![image](https://github.com/Part3-Team15/taskify/assets/24778465/ca78570e-f56d-4085-9b76-8a71d3add261)

#### 1차 기능 구현: 2024.06.21 ~ 2024.07.02

#### 2차 추가 작업: 2024.07.02 ~ 2024.07.08

- 버그 해결, 미완성 기능 구현
- 리팩토링, 추가 기능 구현
- 리드미 작성

#### 발표준비: 2024.07.06 ~ 2024.07.08

#### 3차 추가 작업: 2024.07.09 ~ 2024.07.12

- 리팩토링 (간결한 코드, 성능 개선)
- 리드미 완성

<br />

## 개발 문화

### 팀 규칙

- 오전 10시 데일리 스크럼에 적극 참석합니다.
- 오전 11시 ~ 오후 6시는 코어타임으로 가급적 디스코드 음성채팅방에 접속하여 빠른 의사소통이 가능하도록 합니다. (점심시간, 일요일 제외)
- 회의에 불참하거나 휴가를 사용할 경우, 하루 전에는 팀원에게 공유합니다.
- ❗️ 데일리 스크럼 이전(오전 9시 55분까지)에 다음 사항들을 완료합니다.
  - 올라온 PR 리뷰하기
  - 회의록에 한 일과 팀원에게 공유할 사항(어려운 점, 개선사항) 정리하기 (이슈, 디스커션 언급만 해도 무방)
  - [Project roadmap](https://github.com/orgs/Part3-Team15/projects/3/views/4)에 이슈 상태 최신화하기 (특히 status)
- [이슈 관리 규칙](https://github.com/Part3-Team15/taskify/discussions/62) 을 숙지하고 적극 활용하여 진행상황을 공유하고, 의견을 교환합니다.
- 작업 중 질문이나 건의사항이 있으면 Discussions를 적극 활용합니다.
- PR, 이슈, 디스커션 알림이 오면 빠르게 확인하고 반응합니다.

### 이슈 관리

깃허브 이슈로 프로젝트 일정을 관리하고 진행상황을 공유합니다. 프로젝트에서 이슈의 역할은 아래와 같으며, [이슈 관리 규칙](https://github.com/Part3-Team15/taskify/discussions/62)에 따라 이슈를 관리합니다.

- 요구사항 정리  
  <img width="240" alt="image" src="https://github.com/Part3-Team15/taskify/assets/24778465/ad75ed0f-c5e1-40a6-b94f-4c8e0db1868f">
- 일정 관리  
  <img width="1377" alt="image" src="https://github.com/Part3-Team15/taskify/assets/24778465/76e9de52-c604-4397-97b6-59fad81a4965">
- 우선순위 기준 작업분배  
  <img width="1423" alt="image" src="https://github.com/Part3-Team15/taskify/assets/24778465/baca203e-c450-441b-a627-a31c4690ea8d">

<br />

## [프로젝트 폴더 구조](https://github.com/Part3-Team15/taskify/discussions/61)

```
.
├── .gitignore
├── .husky
├── public/
│   ├── favicon.ico
│   ├── fonts/
│   ├── icons/
│   └── images/
├── src/
│   ├── components/
│   │   └── Button/
│   │       ├── AButton.tsx
│   │       ├── BButton.tsx
│   │       └── index.tsx
│   ├── constants/
│   ├── containers/
│   ├── contexts/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   ├── services/
│   ├── styles/
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── types/
│   └── utils/
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

<details>
  <summary>폴더구조 상세 설명</summary>
  <div markdown="1">
    
### `public/`

이미지, 아이콘, 폰트와 같은 정적 파일들 & favicon 등

### `src/`

소스 코드들.

- `components/` 전역적으로 쓰이는 공용 컴포넌트들
  - 예) `Button/` : 버튼 관련 컴포넌트 모음.
- `constants/` 전역적으로 공통으로 쓰이는 상수 값
- `containers/` 특정 페이지와 관련된 컴포넌트 모음.
  - 예) containers/auth/ 에는 auth 페이지와 관련된 것들만 있음
- `contexts/` 컨텍스트 모음
- `hooks/` 커스텀 훅 모음
- `layouts/` 레이아웃 컴포넌트들
- `pages/` 페이지 라우트 컴포넌트들
- \_app.tsx : 최상위 컴포넌트 (레이아웃, 스타일, 상태관리 등)
- \_document.tsx : HTML 구조
- index.tsx : 서비스의 메인 페이지
- `services/` API 호출 로직 모음
- `styles/` 글로벌 스타일 및 Tailwind CSS 설정
- `types/` 인터페이스, 타입 등 타입스크립트 정의 파일 모음
- `utils/` 자주 사용되는 유틸리티 함수 모음

  - 예) 날짜 포맷팅, 데이터 변환, 문자열 처리 등

    </div>
  </details>

<br />

## 서비스 상세설명

| 랜딩페이지 | 회원가입 | 로그인 |
| :-: | :-: | :-: |
| <img width="300" alt="image" src="https://github.com/Part3-Team15/taskify/assets/24778465/de9b1267-abce-4dda-8f18-18cdfec808e8"> | <img width="385" alt="image" src="https://github.com/Part3-Team15/taskify/assets/24778465/c89f7a6c-86ef-4b1a-81bb-eb2700bfe4ea"> | <img width="400" alt="image" src="https://github.com/Part3-Team15/taskify/assets/24778465/6852be2a-e566-41df-b727-ff2ac90cb65c"> |
|  |

| 나의 대시보드 | 계정관리 |
| :-: | :-: |
| <img width="450" alt="image" src="https://github.com/Part3-Team15/taskify/assets/24778465/a3e847aa-d29a-4b0c-b826-211ae08bfcd3"> | <img width="450" alt="image" src="https://github.com/Part3-Team15/taskify/assets/24778465/835319b1-6330-4d33-90f5-4a24bf55aadc"> |

| 대시보드 | 대시보드 관리 |
| :-: | :-: |
| <img width="460" alt="image" src="https://github.com/Part3-Team15/taskify/assets/24778465/f22bad5e-6136-41cc-a226-59ea249495d5"> | <img width="350" alt="image" src="https://github.com/Part3-Team15/taskify/assets/24778465/f1c0f8e5-557e-4653-9c3b-e058585b80ca"> |

### 계정관리

https://github.com/Part3-Team15/taskify/assets/24778465/de7cea41-95f4-4a87-b717-1d80a2e9c43c

#### 1. 랜딩페이지

- 서비스에서 제공하는 기능 소개합니다.
- 로그인 / 회원가입 페이지로 이동할 수 있습니다.

#### 2. 회원가입 페이지

- 정보를 입력하여 새로운 계정을 생성합니다.
- 가입 완료 시 안내와 함께 로그인 페이지로 이동합니다.

#### 3. 로그인 페이지

- 생성한 계정으로 로그인할 수 있습니다.
  - 로그인한 유저 정보는 Redux를 이용해 전역으로 관리합니다.
- 로그인 성공 시 나의 대시보드 페이지로 이동합니다.

#### 4. 계정 관리

- 프로필 이미지 / 닉네임을 변경할 수 있습니다.
- 비밀번호 변경를 변경할 수 있습니다.

### 대시보드

https://github.com/Part3-Team15/taskify/assets/24778465/8250bbb1-cdd4-4f77-b5d9-b3220c04b430

#### 5. 나의 대시보드

- 내 대시보드 목록을 볼 수 있고, 새로운 대시보드를 생성할 수 있습니다.
  - 대시보드 목록은 페이지네이션을 이용해 정보를 불러옵니다.
- 초대받은 대시보드 목록을 확인하고, 수락 / 거절할 수 있습니다.
  - 초대받은 대시보드 목록은 무한스크롤로 정보를 불러오며, 대시보드 이름으로 검색 가능합니다.
- 좌측의 사이드바를 통해 계정 관리나 다른 대시보드로 이동할 수 있습니다.
- 우상단의 프로필을 클릭하면 나의 대시보드 / 계정 관리로 이동하거나 로그아웃할 수 있습니다.

#### 6. 대시보드

- 페이지 끝 (PC: 우측, 태블릿/모바일: 하단) `새로운 컬럼 추가하기` 버튼으로 컬럼을 추가할 수 있습니다.
- 컬럼 이름 옆 관리 버튼으로 컬럼 이름 변경 및 컬럼 삭제가 가능합니다.
- 컬럼 이름 아래 `+` 버튼으로 새로운 할 일을 추가할 수 있습니다.
- 할 일을 클릭하여 할 일 상세 정보를 확인할 수 있습니다.
  - 우상단 버튼을 클릭해 할 일을 수정 또는 삭제할 수 있습니다.
  - 본문 아래 댓글 입려 창에서 댓글을 추가하고, 추가된 댓글을 수정 / 삭제 / 열람할 수 있습니다.
    - 댓글 목록은 무한스크롤로 불러옵니다.
  - 할 일 목록은 무한스크롤로 불러옵니다.
- 드래그 앤 드랍으로 할 일의 컬럼을 변경할 수 있습니다.
- 대시보드 생성자의 경우 상단의 `관리` / `초대하기` 버튼이 노출됩니다.
  - 관리: 대시보드 관리로 이동합니다.
  - 초대하기: 서비스에 가입한 팀원의 이메일을 입력해 초대할 수 있습니다.

### 대시보드 관리 및 추가기능

https://github.com/Part3-Team15/taskify/assets/24778465/74e6a1b0-806a-4c7f-845c-2ff633d04344

#### 7. 대시보드 관리

- 대시보드 이름 / 색상 / 공유 여부 / 즐겨찾기 여부를 변경할 수 있습니다.
  - 공유 시 url을 이용해 멤버가 아닌 사람도 대시보드를 열람할 수 있습니다.
  - 즐겨찾기 추가 시 사이드바 상단에 노출되어 쉽게 접근할 수 있습니다.
- 생성자를 제외한 구성원을 삭제할 수 있습니다.
- 새로운 구성원을 초대하거나 초대 내역을 확인하고 취소할 수 있습니다.
- 하단의 `대시보드 삭제하기` 버튼으로 전체 대시보드를 삭제할 수 있습니다.

## 서비스 개선 사항

### 대시보드 즐겨찾기 기능 추가

- 대시보드 순서를 변경할 수 없어, 자주 확인하는 대시보드가 뒷쪽에 있다면 접근성이 떨어집니다. API 한계로 순서 변경은 어렵지만, 즐겨찾기 기능을 추가해 접근성을 높였습니다.
- 즐겨찾기는 대시보드 관리 페이지에서 추가 / 제거할 수 있고 최대 3개까지 추가 가능합니다.
- MongoDB Atlas를 이용해서 DB를 구축했습니다. Next.js API를 만들어 기존 서버의 유저 정보를 받아와서 저장하고 그 정보를 바탕으로 유저마다 즐겨찾기를 추가할 수 있도록 만들었습니다.
- 관련: [디스커션 #59](https://github.com/Part3-Team15/taskify/discussions/59), [이슈 #188](https://github.com/Part3-Team15/taskify/issues/188), [PR #213](https://github.com/Part3-Team15/taskify/pull/213)

### 대시보드의 카드 드래그 앤 드랍으로 컬럼 이동

- 대시보드 내 카드 드래그앤드롭을 구현하기 위해, `react-beautiful-dnd` 라이브러리를 사용했습니다.
- `DragDropContext`로 드래그 앤 드롭 동작을 감지하고, 드래그 시작, 드래그 종료, 드래그 업데이트 등의 이벤트를 통해 상태를 추적했습니다.
- `onDragEnd` 콜백 함수를 통해 드래그 중 발생하는 상태 변화를 쉽게 처리할 수 있었습니다.
- 관련: [PR #145](https://github.com/Part3-Team15/taskify/pull/145)

<details>
<summary>DnD 구현 원리</summary>
<div markdown="1">
  <img src="https://velog.velcdn.com/images/wayandway/post/97c289e1-3e66-4e1f-a429-a8ec1ccd900a/image.gif" width=300 />

- `DragDropContext`: 드래그앤드롭 기능을 제공하는 컨텍스트
- `Droppable`: 드롭 가능한 영역을 정의하며, 각 컬럼을 `Droppable`로 감싸줌
- `Droppable` 내에서 각 카드에 대해 `Draggable`을 사용해 드래그할 수 있음
</div>
</details>

### 초대 알림 기능 추가

- 초대가 왔을 때 사용자가 바로 인지할 수 있도록 알림을 제공합니다.
- TanStack Query의 useQuery에 refetchInterval을 적용하여 주기적으로 초대받은 내역을 받아옵니다.
- 새로 받은 내역과 이전 내역을 비교해 새로운 초대 목록을 구하고,react-toastify를 이용해 토스트로 알립니다.
- 관련: [이슈 #156](https://github.com/Part3-Team15/taskify/issues/156), [PR #178](https://github.com/Part3-Team15/taskify/pull/178)

### 대시보드 공유 기능 추가

- 팀의 대시보드를 외부 인원에게 공유할 수 있는 기능을 제공합니다.
- 대시보드 url을 공유하면, 로그인 여부와 관계없이 구성원이 아닌 사람도 대시보드를 확인할 수 있습니다. 구성원이 아닌 경우 읽기만 가능하며 수정은 불가능합니다.
- 대시보드 생성 / 수정 시 공유 설정이 가능하며, 공유를 선택한 경우 공유 계정을 멤버로 등록합니다.
  - 이 때, 공유 계정을 미리 만들고 그 정보를 환경변수로 등록해 사용합니다.
- axios의 interceptor를 이용해 공유 대시보드에 권한이 없는 경우, 공유계정의 권한으로 읽기를 수행합니다.
- 관련: [디스커션 #101](https://github.com/Part3-Team15/taskify/discussions/101), [이슈 #155](https://github.com/Part3-Team15/taskify/issues/155), [PR #181](https://github.com/Part3-Team15/taskify/pull/181)

### 비밀번호 암호화

- 비밀번호가 문자 그대로 전송되면, 전송 과정 중에 노출될 위험이 있습니다.
- sha256 해시함수와 환경변수로 설정한 문자열을 이용해 비밀번호를 암호화해서 전달합니다.
- 회원가입 / 로그인 / 비밀번호 변경에서 모두 같은 방법으로 암호화해 비밀번호 확인이 정확하도록 합니다.
- 관련: [디스커션 #88](https://github.com/Part3-Team15/taskify/discussions/88), [이슈 #90](https://github.com/Part3-Team15/taskify/issues/90), [PR #164](https://github.com/Part3-Team15/taskify/pull/164)

### 다크모드

- next.js는 next-themes 라이브러리를 이용하면 쉽게 다크모드의 전환이 가능합니다.
- next-themes의 ThemeProvider를 이용해서 app을 감싸면 useTheme를 이용해 테마를 간편하게 변경이 가능합니다
- ThemeProvider는 유저의 디바이스 설정에 따라서 기본 모드가 적용이 됩니다.
- 관련: [이슈 #153](https://github.com/Part3-Team15/taskify/issues/153)

### 권한이 없는 경우 안내와 함께 페이지 이동

- 권한이 없는 대시보드 / 관리 페이지 등에 접근 시 에러를 보여주기보다는, 권한이 없다는 안내와 함께 로그인 여부에 따라 적절한 페이지로 이동하도록 했습니다.

### 디자인 개선

- `나의 대시보드`와 `계정 관리`의 접근성을 높이기 위해 사이드바에 이동할 수 있는 링크를 추가했습니다.
- 할 일 상세정보를 누르기 전에 팀원의 반응을 확인할 수 있도록 댓글 개수를 카드 하단에 추가했습니다.
- 404 페이지를 만들고, 잘못된 주소로 접근 시 404 페이지에서 3초간 머물다 로그인 여부에 따라 적절한 페이지로 이동하도록 했습니다.

## 팀원 소개 및 프로젝트 후기

| 김지윤 | 류혜원 | 이대양 | 정민재 |
| :-: | :-: | :-: | :-: |
| <img src="https://github.com/Part3-Team15/taskify/assets/24778465/807b24c9-7bad-4c5b-8351-2c8f450b8a1d" width="150" > | <img src="https://github.com/Part3-Team15/taskify/assets/24778465/8cc4ffc5-8bf8-484d-9988-3068481fa4ef" width="150"> | <img src="https://github.com/Part3-Team15/taskify/assets/24778465/6a64aa55-6253-4f88-8b6c-b7a6109df1a5" width="150" > | <img src="https://github.com/Part3-Team15/taskify/assets/24778465/58b1ec5f-3f08-4585-a9e4-211d06a3fad2" width="150" > |
| [@wayandway](https://github.com/wayandway) | [@un0211](https://github.com/un0211) | [@oceanlee-seoul](https://github.com/oceanlee-seoul) | [@wjsdncl](https://github.com/wjsdncl) |
| 유저기능, 대시보드 페이지, 할 일 카드 모달 | 헤더, 계정관리 페이지, 대시보드 관리 페이지 | 전역 모달 관리, 카드 생성/수정 모달, 대시보드 변경 | 사이드바, 내 대시보드 페이지(SSR 적용) |
| 할 일 카드 DnD | 초대 알림, 대시보드 공유, 비밀번호 암호화 |  | 대시보드 즐겨찾기, 다크모드 |
| Tanstack Query 및 Redux 설정 | 깃/깃허브 관리, 문서 관리, 배포 | 발표 자료 준비 및 발표 | 회의 내용 정리 |

### 김지윤

<기술적인 성장>

Taskify 프로젝트에서 저의 가장 중요한 목표는 "새로운 기술을 익힐 수 있는 능력"을 키우는 것이었습니다. Tanstack Query, Redux Toolkit, TailwindCSS 등을 사용하면서 이 목표를 이뤄낼 수 있었고, 단순히 새로운 기술을 사용해보자는 것보다 쿼리를 왜 사용했는지 등, 그리고 사용해서 어떤 이점이 있는지를 끊임없이 고민하면서 기술을 체득하는 역량을 키울 수 있었어요.

또한 대시보드의 컴포넌트들을 개발하면서 조상-자식으로 얽혀있는 컴포넌트들 사이의 상태들을 어떻게 관리할지 정말 많이 고민했습니다. 공통으로 쓰이는 데이터, CRUD에 의해 변경되는 데이터들이 있기 때문에 프롭 드릴링 문제도 있었고, 페이지/컴포넌트 별 쓰이는 상태들은 어떤 것이 있는지 분석 및 설계하는 능력이 중요하다고 배울 수 있었습니다.

<협업에서의 성장>

너무 훌륭한 팀원분들을 뵙게 되서 행운이라고 생각합니다. 코드리뷰를 이렇게 꼼꼼히 하시려는 분들은 처음 뵌 것 같아요. 이를 통해서 저도 제 코드를 다시 고민하고 개선하는 경험도 많이 얻을 수 있어 정말 감사하게 생각하고 있습니다.

이번에 협업으로서 성장한 점은 "효율적인 분담"을 할 수 있게 된 것입니다. 예를 들어 작은 컴포넌트, 유틸 함수 등의 작은 단위로 이슈를 산정하고, 작은 단위의 일들을 팀원들이 나눠 가지게 되어 개별적으로 맡은 일들을 빠르게 끝낼 수 있었습니다. 또한 공용 컴포넌트, 유틸함수를 미리 정의해 팀원들과 재사용한 것도 효율적인 방법이었다고 느꼈습니다.

무엇보다 팀원분들 모두 코드 로직이든, 성능 및 UI든 끊임없이 개선하려고 고민하시는 분들이어서, 저도 그런 태도를 같이 습득할 수 있었습니다. 짧은 기간 동안 함께 좋은 결과물 만들어내주셔서 감사합니다! 정말 수고 많으셨습니다 ☺️

### 류혜원

중급 프로젝트에서 처음으로 팀장을 맡게 되었고, 다음과 같은 목표를 가지고 있었습니다. 첫째, 새로운 기술을 경험한 뒤 이전에 사용해봤던 것과 비교해보고 싶었습니다. 둘째, 팀원들이 개발에 집중할 수 있는 환경을 구축하고 싶었습니다. 셋째, 일정 관리 / 공유를 잘 해서 어떤 일이 진행중이고, 어떤 일이 아직 남아있는지 명확히 파악할 수 있도록 하고 싶었습니다. 넷째, 기본 요구사항 외에도 더 나은 방향으로 개선하는 시간을 최대한 확보하고 싶었습니다. 좋은 팀원분들을 만나 프로젝트를 무사히 완성한 것은 물론이고, 위 목표들도 달성할 수 있었습니다.

먼저, Tanstack Query, Redux Toolkit, TailwindCSS 등 이전에 사용해본 적 없던 기술을 사용했고, 특히 Tanstack Query의 장점을 크게 느꼈습니다. 동기적으로 깔끔하게 코드를 작성하고, 요청을 캐시해두었다가 변화가 있을 때 재요청하며 효율적으로 관리할 수 있었으며, 전역 설정으로 응답 코드에 따라 간단하게 리다이렉션이 가능했습니다. TailwindCSS도 스타일을 컴포넌트와 한 번에 확인 가능하다는 점이 좋았고, 미리 자주 쓸 만한 스타일을 정의해두면 오히려 가독성이 좋다고 느꼈습니다. 다만 프로젝트 시작하면서 새로 익히느라 초반에 시간이 꽤 소모되었기에, 이후에는 프로젝트 시작 전 팀원들과 함께 스터디를 통해 미리 공부하는 등의 방식으로 개선하고 싶습니다.

팀장은 팀원들이 개발에 집중할 수 있게 환경을 구축하는 것도 중요하다고 생각해, 프로젝트 초기설정과 배포 관리 등도 맡았습니다. 코드 형식 통일에는 prettier와 husky를 사용해, 따로 노력을 들이지 않아도 코드와 커밋 메세지 형식을 맞출 수 있도록 했습니다. 팀원들이 빠르게 작업을 반영할 수 있도록 (+ 전체 프로젝트 코드를 파악하려고) PR의 코드 리뷰에 열심히 참여했는데, 코드리뷰의 꼼꼼함과 속도 사이에서 어느 정도가 적당할 지 많이 고민했습니다. 정답을 찾지 못하고 그때마다 할 수 있는 최선을 다했으며, 한 번에 리뷰하기 편하게 PR을 적절히 쪼개고, 기능 확인 / 전체 흐름 파악 / 주요 로직 확인 정도를 필수로 해야겠다고 생각했습니다.

지난 프로젝트에서 일정 관리와 공유가 중요하면서도 어려운 일이라고 느꼈기 때문에 프로젝트 시작 전 많이 고민했습니다. 저희는 깃허브 하나로 통일해 관리했으며 (이슈 - 해야할 일, PR - 한 일, 디스커션 - 논의할 것), 각각에 대응하는 디스코드 채널을 만들어 알림을 받았습니다. 덕분에 깃허브 하나만 확인해도 일정 확인이 가능했고, 디스코드로 실시간 작업 알림도 받을 수 있었습니다. 이슈를 컴포넌트 단위로 나누었기 때문에 더 명확하게 상황 공유가 가능했으며, 우선순위가 높은 작업을 먼저 진행해 할 일이 없거나 다른 사람의 작업을 기다리느라 시간이 소모되는 일이 없었습니다. 각자 어떤 작업을 진행중이고, 다음에 어떤 작업을 할 지 등 일정 관리와 공유 면에서 매끄럽게 진행되었기 때문에 저희가 채택한 방법에 아주 만족합니다. (+ 회의록은 노션에 적었는데, 회의록도 깃허브 디스커션에 적었다면 좋았을 것 같습니다.)

초기 계획할 때 프로젝트를 일찍 마무리짓고 UI 개선 / 리팩토링 / 추가 기능 구현 / 발표 준비 등에 시간을 써보자고 했는데, 실제로 그렇게 할 수 있었습니다. 늦은 시간까지 부지런히 개발하고, 더 나은 서비스를 위해서 서로 개선사항을 이야기하고 반영하며, 발표 준비까지 열심히 해 준 팀원들 덕에 제게 이번 프로젝트는 아쉬운 점 없이 정말 만족스럽습니다. 또, 프로젝트를 하다보면 이런 저런 기능이 추가되면 더 편리하지 않을까 하는 아이디어가 생각나는데, 이번에는 그것들을 실제로 구현할 수 있어서 좋았습니다. 사용할 수 있는 API가 제한된 상태에서 추가 기능을 개발하면서 우리가 사용하는 라이브러리를 더 잘 활용해 볼 수 있었습니다.

짧게 적으려 했는데, 적다보니 회고와 후기 그 사이가 되어버렸네요. 기술적인 면에서도, 협업과 프로젝트 관리 면에서도 이번 프로젝트 동안 정말 많이 배웠습니다. 2주동안 이렇게 많이 배운 경험은 손에 꼽을 것 같습니다. 어떤 제안도 웃으며 받아주고, 함께 실현해주신 팀원분들 감사합니다!

### 이대양

이번 프로젝트에서 Next.js뿐만 아니라 TanStack Query, Redux Toolkit, TailwindCSS와 같은 생소한 스택들을 많이 차용하여 진행했습니다. 프로젝트를 진행하면서 GitHub Project와 Git Issue 같은 다양한 협업 관련 기능들을 더 심도 있게 사용해 볼 수 있었습니다. 이러한 경험은 협업과 기술적 측면에서 모두 매우 유익했습니다.

물론 학습해야 할 부분이 많아서 따라가기가 조금 벅찼지만, 훌륭한 팀원들 덕분에 끝까지 잘 해낼 수 있었습니다. 이번 프로젝트에서 사용해본 새로운 기술들과 협업 도구들을 추가적으로 공부하여, 다음 프로젝트에서도 잘 활용할 수 있도록 준비하고 싶습니다.

이번 경험을 통해 다양한 기술 스택과 협업 도구에 대한 이해도가 높아졌고, 이를 바탕으로 더욱 효과적이고 능숙하게 프로젝트를 진행할 수 있을 것 같습니다. 앞으로도 지속적인 학습을 통해 더욱 성장할 수 있도록 노력하겠습니다.

### 정민재

이번 팀 프로젝트를 통해 팀원분들 덕분에 많은 것을 배울 수 있었습니다. 프로젝트 진행에 필요한 것들을 미리 준비해 주시고, 새로운 기술들을 먼저 프로젝트에 적용해 주셔서 해당 코드를 보며 많은 것을 배울 수 있었습니다. 덕분에 프로젝트가 원활하게 진행되었고, 더욱 완성도 있는 결과물을 만들 수 있었습니다.

프로젝트를 진행하면서 저의 부족한 점도 많이 깨달았고, 앞으로 배워야 할 것이 무엇인지 어렴풋이 알게 되었습니다. 이러한 점들을 멘토님과 팀원분들과의 대화를 통해 명확히 하게 되어, 앞으로 필요한 것을 공부하며 성장할 수 있을 것 같습니다.

깃허브의 이슈나 프로젝트를 사용하며 협업 및 일정 관리를 진행하는 과정에서, 어떻게 하는 것이 좋은 협업인지 고민하게 되었습니다. 팀원분들의 협업 방식을 보면서 저만의 협업 방식을 생각할 좋은 기회가 되었습니다.

팀 프로젝트가 중요한 이유는 이렇게 다양한 분들과 협업해 보면서 얻어가는 무언가가 있기 때문이라고 생각합니다. 이번 프로젝트에서도 정말 많은 것을 얻을 수 있었습니다. 감사합니다.
