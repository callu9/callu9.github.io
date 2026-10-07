export const contactHref =
  "mailto:callu_9ine@naver.com?subject=포트폴리오를 보고 연락드립니다";

export const experiences = [
  {
    company: "Oprimed",
    role: "Frontend Engineer",
    period: "2026.06–현재",
    stack: "React · Next.js · TypeScript · Vite · MSW · OpenAPI · Storybook / 백엔드: Python",
    contributions: [
      "분석·검수 화면의 작업 복원, 대상 전환과 저장 실패 복구 구현",
      "결과·리포트·PDF 차트 공통화와 입력·계산·렌더링 책임 분리",
      "공통 UI·접근성 정리와 패키지·독립 소비 프로젝트 검증",
      "프론트엔드·백엔드 개발 병행",
    ],
  },
  {
    company: "Uniport",
    role: "Frontend Engineer Intern",
    period: "2026.02–2026.03",
    stack: "Next.js · TypeScript · TanStack Query · TanStack Table · MSW",
    contributions: [
      "문서 관리 화면의 테이블·검색·쿼리와 사용자 액션의 책임을 분리",
      "역할·문서 상태별 동작을 구분하고 다운로드 오류와 업무별 대화상자 상태 처리",
      "업무별 조회 상태 분리와 설정 변경 후 관련 결과 갱신",
    ],
  },
  {
    company: "Lotte Innovate",
    role: "Retail-platform Frontend Engineer",
    period: "2021.10–2025.04",
    stack: "웹: React · JavaScript · Storybook · Chromatic / POS: Java · Kotlin · Spring Boot",
    contributions: [
      "운영 접수·모니터링 UI와 인증·세션 상태 처리",
      "신용카드 결제 서버 기능과 Android POS 정산 화면 구현",
      "공통 UI와 컴포넌트 리뷰 관행 구축",
    ],
  },
] as const;

type EducationEntry = {
  title: string;
  start: string;
  end?: string;
  description?: string;
  project?: {
    title: string;
    summary: string;
    tags: string[];
    detailsLabel: string;
    href?: string;
    sections: {
      title: string;
      meta?: string;
      description?: string;
      contributions: string[];
      tags?: string[];
      href?: string;
    }[];
  };
};

export const educationGroups: { id: string; title: string; entries: EducationEntry[] }[] = [
  {
    id: "training",
    title: "교육 과정",
    entries: [
      {
        title: "코드잇 스프린트 프론트엔드 단기심화 11기",
        start: "2025-09-03",
        end: "2025-11-06",
        project: {
          title: "같이달램 · 개발자 모임 플랫폼",
          summary: "참여한 모임 조회·취소와 찜한 모임 화면을 구현하고, API 응답 검증·공통 UI·기능별 테스트를 구성했습니다.",
          tags: ["Next.js", "TypeScript", "TanStack Query", "Zod"],
          detailsLabel: "프로젝트 기여 보기",
          href: "https://github.com/codeit-sprint11-team-6/nextjs-gati-dallem",
          sections: [
            {
              title: "참여한 모임",
              contributions: ["모임 목록·로딩·빈 상태 UI와 참여 취소·리뷰 작성 액션 구현"],
            },
            {
              title: "찜한 모임",
              contributions: ["찜한 모임 목록 UI와 저장된 즐겨찾기 기반 조회", "Next.js Route Handler의 조회 조건 검증과 API 연결"],
            },
            {
              title: "API·공통 UI",
              contributions: ["Zod 스키마로 응답을 검증하는 초기 API client와 공통 Modal·재사용 카드 구현"],
            },
            {
              title: "테스트·UI 검증",
              contributions: ["React Query 테스트 도구·전역 mock과 마이페이지·찜한 모임·공통 컴포넌트 테스트 작성", "Storybook 스토리와 Chromatic workflow 변경 작성"],
            },
          ],
        },
      },
      {
        title: "코드잇 스프린트 프론트엔드 부트캠프 14기",
        start: "2024-12",
        end: "2025-06",
        project: {
          title: "Fandom-K · Taskify · GlobalNomad",
          summary: "팬덤 플랫폼, 협업 보드, 체험 예약 서비스의 사용자 화면과 API 연동·상태 관리를 구현했습니다.",
          tags: ["React", "Next.js", "TypeScript"],
          detailsLabel: "프로젝트별 기여 보기",
          sections: [
            {
              title: "Fandom-K",
              meta: "2025.03 · 기초",
              description: "아이돌 팬덤 플랫폼",
              contributions: ["아이돌·후원 등록 화면과 크레딧 충전 모달·공통 UI 구현"],
              tags: ["React", "JavaScript", "SCSS"],
              href: "https://github.com/codeit-fe-14-first-project-team2/fandom-k",
            },
            {
              title: "Taskify",
              meta: "2025.04–05 · 중급",
              description: "대시보드 기반 협업·할 일 관리 서비스",
              contributions: ["API 스키마·서비스·쿼리 분리와 대시보드 조회·변경 후 관련 쿼리 갱신", "초대·할 일 카드 수정 모달 구현"],
              tags: ["Next.js", "TypeScript", "TanStack Query"],
              href: "https://github.com/FE14-Team7-Taskify/Taskify",
            },
            {
              title: "GlobalNomad",
              meta: "2025.05–06 · 고급",
              description: "체험 예약 서비스",
              contributions: ["예약 캘린더·상세 모달과 날짜·시간·상태(신청·승인·거절)별 조회 구현", "공통 UI와 Storybook 설정·예시 작성"],
              tags: ["Next.js", "TypeScript", "TanStack Query", "Storybook"],
              href: "https://github.com/FE14-part4-team4-globalnomad/GlobalNomad",
            },
          ],
        },
      },
      {
        title: "삼성 청년 SW 아카데미(SSAFY) 5기",
        start: "2021-01-02",
        end: "2021-10-26",
        description: "스마트홈 팀 프로젝트 · 팀장, 프론트엔드·UI/UX·객체 인식 담당",
      },
    ],
  },
  {
    id: "academic",
    title: "학력",
    entries: [
      {
        title: "서울과학기술대학교",
        start: "2016-03-02",
        end: "2021-02-24",
        description: "전자IT미디어공학과 공학사 · 문예창작학과 부전공",
      },
    ],
  },
  {
    id: "language",
    title: "어학",
    entries: [{ title: "OPIc IH", start: "2026-05-27" }],
  },
];

type Project = {
  slug: string;
  title: string;
  label: string;
  period: string;
  problem: string;
  role: string;
  decision: string;
  tags: string[];
  image?: { src: string; alt: string; caption: string };
  links?: { label: string; href: string }[];
  details: { title: string; description: string }[];
  scope: string;
};

export const projects: Project[] = [
  {
    slug: "frontend-contract-handoff",
    title: "OpenAPI로 개발 기준을, 도움말로 사용 흐름을 설계하다",
    label: "실무 · 분석 제품",
    period: "관련 재직 기간 · 2026.06–현재",
    problem: "입력 확인부터 결과 검토까지 이어지는 검수 화면이 필요했지만, 백엔드 인력 공백으로 API 구현을 기다릴 수 없는 상황이었습니다.",
    role: "검수 화면의 입력·응답·오류 상태와 다음 행동을 구현하고, MSW 응답·OpenAPI 명세·생성 타입과 변경 검증 절차를 정리했습니다.",
    decision: "MSW로 요청·응답을 재현해 화면 개발을 이어가고, 이후 API 구현과 기준이 어긋나지 않도록 OpenAPI JSON에서 타입을 생성했습니다.",
    tags: ["검수 화면·상태", "MSW", "OpenAPI", "TypeScript"],
    details: [
      {
        title: "입력 상태에서 결과 확인까지",
        description: "검수 맥락의 도움말과 화면 상태를 정리했습니다. 프론트엔드·MSW 검증에서 문제가 확인되면 수정 후 재검토하고, 오류가 확인된 상태에서는 결과로 진행하지 않도록 기준을 마련했습니다.",
      },
      {
        title: "명세 변경이 타입에 남도록",
        description: "명세만 바뀌고 이전 타입이 남는 상황을 확인할 수 있도록, 생성 산출물의 최신 상태 검사와 변경 검증 절차를 마련했습니다.",
      },
    ],
    scope: "프론트엔드 구현과 연동 기준 정리까지의 사례입니다. 실제 백엔드 연동과 운영 성과는 포함하지 않습니다.",
  },
  {
    slug: "work-support-platform",
    title: "업무지원 운영 플랫폼",
    label: "실무 · B2B 운영",
    period: "관련 재직 기간 · 2021.10–2025.04",
    problem: "전화 접수 내용을 컴퓨터 메모장에 기록한 뒤 기존 시스템에 다시 입력하고 있었습니다.",
    role: "현장 인터뷰와 요구 분석부터 기능 기획, 개발·배포·운영 및 이슈 대응까지 담당했습니다.",
    decision: "현장의 요청자와 처리자가 같은 상태를 확인하도록, 매장 캐셔와 현장 엔지니어까지 사용자 범위를 넓히고 모바일 접근을 반영했습니다.",
    tags: ["현장 요구 분석", "모바일 업무 흐름", "서비스 운영"],
    details: [
      {
        title: "기존 절차보다 실제 사용자를 먼저 확인",
        description: "현장 인터뷰와 AS-IS 분석에서 중복 입력과 상태 공유의 필요를 확인했습니다. 접수하는 매장과 처리하는 파트너 엔지니어가 같은 진행 상태를 확인하도록 요구를 다시 정의했습니다.",
      },
      {
        title: "배포 이후의 운영까지",
        description: "서비스 배포 후 운영 이슈에 대응했습니다. 운영자가 새로고침하지 않아도 상황을 확인하도록 운영 화면 자동 갱신을 적용했습니다.",
      },
    ],
    scope: "회사·고객 정보와 내부 화면·코드는 공개하지 않습니다.",
  },
  {
    slug: "recruitment-pipeline-board",
    title: "채용 단계 관리 보드",
    label: "공개 프로젝트",
    period: "제작 시점 · 2026.09",
    problem: "검색·목록·상세에서 같은 지원자 상태를 보여주면서, 저장 실패도 처리해야 했습니다.",
    role: "지원자 검색·필터·상세 UI와 단계 변경, 실패 복원 및 중복 요청 방지를 구현했습니다.",
    decision: "목록 전체를 되돌리면 다른 변경까지 사라질 수 있어, 저장에 실패한 지원자만 이전 단계로 복원했습니다.",
    tags: ["React", "TypeScript", "TanStack Query", "MSW"],
    image: {
      src: "/images/recruitment-board.png",
      alt: "지원자 목록, 검색 필터와 채용 단계가 표시된 채용 단계 관리 보드의 실제 데모 화면",
      caption: "직접 구현한 데모 화면 · 인물과 수치는 가상 데이터입니다.",
    },
    links: [
      { label: "데모 보기", href: "https://callu9.github.io/recruitment-pipeline-board-fe/" },
      { label: "코드 보기", href: "https://github.com/callu9/recruitment-pipeline-board-fe" },
    ],
    details: [
      {
        title: "목록과 상세의 상태 기준을 하나로",
        description: "지원자 정보를 화면마다 복사하지 않고 TanStack Query 캐시를 공통 기준으로 사용했습니다. 검색·필터·상세가 같은 지원자 상태를 보도록 구성했습니다.",
      },
      {
        title: "즉시 반영하되, 실패 복원은 지원자별로",
        description: "단계 변경은 낙관적으로 화면에 반영합니다. 예를 들어 A의 변경이 실패하고 B의 변경이 성공했다면, A만 복원하고 B는 유지하도록 설계했습니다. 같은 지원자는 요청이 끝날 때까지 추가 변경을 막고, 다른 지원자의 변경은 별도로 처리합니다.",
      },
    ],
    scope: "MSW·localStorage 기반 데모입니다. 위 A/B 상황은 설계 의도를 설명하는 예시이며, 실제 채용 운영이나 다중 사용자 동시 처리 검증을 의미하지 않습니다.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
