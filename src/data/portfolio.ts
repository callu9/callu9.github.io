export const contactHref =
  "mailto:callu_9ine@naver.com?subject=포트폴리오를 보고 연락드립니다";

export const strengths = [
  {
    title: "복잡한 흐름을 명확한 UI로",
    description:
      "입력·저장·실행·결과·리포트가 UI와 API 경계를 넘어 같은 의미를 유지하도록 설계합니다.",
  },
  {
    title: "현장 문제에서 운영까지",
    description:
      "현장 조사와 AS-IS 분석에서 출발해 사용자 범위, 기능, 배포와 운영 이슈 대응까지 연결합니다.",
  },
  {
    title: "상태와 데이터 시각화",
    description:
      "다단계 업무 복원, 상태 전이, 차트의 로딩·계산·렌더링 책임을 분리해 다룹니다.",
  },
  {
    title: "공유 가능한 UI 기반",
    description:
      "재사용 컴포넌트, 공통 UI 기준과 테스트·빌드 중심의 검증 방식을 문서화합니다.",
  },
] as const;

export const experiences = [
  {
    company: "Oprimed",
    role: "Frontend Engineer",
    period: "2026.06–현재",
    summary:
      "분석 제품의 다단계 업무 흐름과 UI·API 조건을 정렬하고, 재개 작업의 복원과 상태 전이를 안정화하고 있습니다.",
    contributions: [
      "차트의 로딩·계산·렌더링 책임 분리와 잘못된 입력 방어",
      "결과·리포트·PDF에 반복되던 라인 차트 기준을 공통 구조로 정리",
      "공통 UI 기반, 재사용 컴포넌트와 검증 방식 구축·문서화",
    ],
  },
  {
    company: "Uniport",
    role: "Frontend Engineer Intern",
    period: "2026.02–2026.03",
    summary:
      "Mock API와 서버 상태를 바탕으로 문서·상태 관리 흐름을 구현하고, 데이터 조회와 업무 액션의 책임을 분리했습니다.",
    contributions: [
      "테이블·검색·쿼리와 사용자 액션의 책임을 분리해 관리 화면을 구조화했습니다.",
      "역할·문서 상태별 액션을 구분하고 다운로드 오류와 도메인 범위 모달 상태를 처리했습니다.",
    ],
  },
  {
    company: "Lotte Innovate",
    role: "Retail-platform Frontend Engineer",
    period: "2021.10–2025.04",
    summary:
      "운영 접수와 모니터링 UI, Android POS 정산의 클라이언트·서버 기능을 구현했습니다.",
    contributions: [
      "현장 조사와 AS-IS 분석을 바탕으로 업무지원 서비스의 사용자 범위와 요구 재정의",
      "서비스 분석·기획·개발·배포·운영·운영 이슈 대응의 전체 사이클 수행",
      "Storybook 공통 UI와 Chromatic 기반 컴포넌트 리뷰 관행 구축",
    ],
  },
] as const;

export type Project = {
  slug: string;
  title: string;
  label: string;
  period: string;
  summary: string;
  overview: string[];
  problem: string[];
  role: string[];
  decisions: { title: string; description: string }[];
  flow: string[];
  flowCaption: string;
  results: string[];
  omissions: string[];
};

export const projects: Project[] = [
  {
    slug: "work-support-platform",
    title: "업무지원 운영 플랫폼",
    label: "B2B 운영 · 전 과정 기여",
    period: "2021.10–2025.04 경력 중",
    summary:
      "현장 접수의 병목을 발견하고 사용자 범위와 상태 공유 방식을 다시 정의한 운영 플랫폼입니다.",
    overview: [
      "매장 현장과 지원 조직, 파트너 엔지니어가 접수와 처리 상태를 공유하는 B2B 업무지원 서비스입니다.",
      "공개 페이지에서는 조직과 제품을 식별할 수 없도록 역할과 흐름만 일반화했습니다.",
    ],
    problem: [
      "전화 접수 내용을 수기로 기록한 뒤 시스템에 다시 입력하는 중복 업무가 있었습니다.",
      "기존 사용자 범위는 전산실 담당자 중심이었고, 매장과 현장 엔지니어에게는 모바일 접근과 진행 상태 공유가 필요했습니다.",
    ],
    role: [
      "현장 인터뷰와 AS-IS 분석으로 병목을 확인했습니다.",
      "사용자 범위를 매장 캐셔와 파트너사 엔지니어까지 확장하고 요구를 다시 정의했습니다.",
      "서비스 분석·기능 기획·개발·배포·운영·운영 이슈 대응까지 전체 사이클을 수행했습니다.",
    ],
    decisions: [
      {
        title: "사용자 범위를 현장까지 확장",
        description:
          "접수 정보를 다시 옮기는 대신 실제 요청자와 처리자가 같은 진행 상태를 볼 수 있도록 사용자 범위를 재정의했습니다.",
      },
      {
        title: "모바일 접근과 상태 공유를 핵심 흐름으로",
        description:
          "현장에서 접수하고 처리 과정을 확인할 수 있도록 모바일 접근과 진행 상태 공유 요구를 함께 반영했습니다.",
      },
      {
        title: "운영 화면 자동 갱신",
        description:
          "운영자가 새 상황을 더 빠르게 확인할 수 있도록 자동 갱신을 적용했습니다.",
      },
    ],
    flow: ["현장 요청 접수", "담당자와 상태 공유", "처리 진행", "운영 대응"],
    flowCaption:
      "실제 화면이 아닌 가상 항목으로 재구성한 공개용 업무 흐름입니다.",
    results: [
      "분석부터 운영 이슈 대응까지 하나의 서비스 사이클을 수행했습니다.",
      "자동 갱신으로 장애 인지 시간을 최소 5분에서 1분으로 단축했습니다.",
    ],
    omissions: [
      "회사·고객·사용자 정보, 내부 명칭과 URL, 원본 데이터와 실제 업무 화면",
      "내부 코드·PR 링크와 인증·권한·보안 구현 상세",
      "공개 근거가 없는 사용량, 만족도와 사업 성과",
    ],
  },
  {
    slug: "operations-dashboard",
    title: "통합 운영 대시보드",
    label: "문서·상태 관리 · Frontend",
    period: "2026.02–2026.03",
    summary:
      "문서와 상태가 함께 변하는 관리 업무를 Mock API와 서버 상태 중심 UI로 구현했습니다.",
    overview: [
      "문서와 처리 상태를 한 흐름에서 확인하고 관리하는 운영 대시보드입니다.",
      "인턴십 기간에 프론트엔드 구현을 담당한 범위만 공개합니다.",
    ],
    problem: [
      "문서 정보와 현재 처리 상태를 함께 다루는 관리 업무 흐름을 화면으로 구현해야 했습니다.",
      "실제 조직명, 데이터 구조와 원본 화면은 공개하지 않는 제약이 있습니다.",
    ],
    role: [
      "Mock API를 연결해 문서·상태 관리 흐름을 구현했습니다.",
      "서버 상태 중심의 UI 구조를 적용했습니다.",
      "확인 가능한 범위는 프론트엔드 구현이며, 백엔드나 운영 성과로 확장해 주장하지 않습니다.",
    ],
    decisions: [
      {
        title: "Mock API를 화면의 데이터 경계로 사용",
        description:
          "공개 가능한 가상 데이터로 문서와 상태가 오가는 프론트엔드 흐름을 구성했습니다.",
      },
      {
        title: "서버 상태 중심 UI 구조",
        description:
          "문서와 처리 상태를 서버에서 온 현재 상태를 중심으로 표현했습니다. 세부 도입 배경은 공개 근거가 없어 추가 해석하지 않았습니다.",
      },
    ],
    flow: ["문서 선택", "현재 상태 확인", "업무 처리", "변경 상태 반영"],
    flowCaption:
      "실제 데이터 필드와 화면 배치를 복제하지 않은 개념적 상태 흐름입니다.",
    results: [
      "Mock API와 서버 상태 중심 구조로 문서·상태 관리 업무 흐름을 구현했습니다.",
      "그 밖의 정량 성과는 확인 가능한 근거가 없어 공개하지 않습니다.",
    ],
    omissions: [
      "회사·고객·사용자 정보, 내부 명칭·URL과 원본 문서 데이터",
      "실제 업무 화면, 내부 코드와 저장소 링크",
      "확인되지 않은 백엔드 기여, 운영 효과와 정량 성과",
    ],
  },
  {
    slug: "collaborative-web-product",
    title: "협업형 웹 제품",
    label: "Next.js 팀 프로젝트 · 공통 기반",
    period: "2025.09–2025.11",
    summary:
      "API 응답 검증, 공통 Modal, 서버 상태 테스트와 컴포넌트 리뷰 흐름에 기여한 팀 프로젝트입니다.",
    overview: [
      "Next.js와 TypeScript로 개발한 협업형 팀 웹 제품입니다.",
      "제품 도메인 대신 제가 직접 구현하거나 변경한 공통 기술 범위만 설명합니다.",
    ],
    problem: [
      "팀 프로젝트에서 API 응답을 다루는 초기 기반, 반복되는 Modal UI와 서버 상태 테스트 기반이 필요했습니다.",
      "팀 전체 결과와 다른 구성원의 기여를 개인 성과로 표현하지 않는 제약을 두었습니다.",
    ],
    role: [
      "Zod 응답 검증을 포함한 초기 API Client를 구현했습니다.",
      "공통 Modal을 구현했습니다.",
      "React Query 테스트 유틸·전역 mock과 Chromatic workflow 변경을 작성했습니다.",
    ],
    decisions: [
      {
        title: "API 경계에서 응답 검증",
        description:
          "초기 API Client에 Zod 응답 검증을 포함해 UI가 사용하기 전 응답 형태를 확인하는 경계를 만들었습니다.",
      },
      {
        title: "공통 Modal과 테스트 기반",
        description:
          "공통 Modal, React Query 테스트 유틸과 전역 mock을 담당했습니다. 각 도입의 상세 의사결정 배경은 공개 근거가 없어 구현 범위만 밝힙니다.",
      },
      {
        title: "컴포넌트 리뷰 흐름 변경",
        description:
          "Chromatic workflow 변경을 작성해 컴포넌트 리뷰 기반에 기여했습니다.",
      },
    ],
    flow: ["API 응답", "Zod 검증", "API Client", "화면·공통 Modal"],
    flowCaption:
      "실제 제품 UI 대신 확인된 API 경계와 공통 UI의 관계를 일반화한 흐름입니다.",
    results: [
      "Zod 응답 검증이 포함된 초기 API Client와 공통 Modal을 구현했습니다.",
      "React Query 테스트 유틸·전역 mock, Chromatic workflow 변경을 작성했습니다.",
    ],
    omissions: [
      "제품명·도메인, 사용자 데이터, 원본 화면과 저장소·PR 링크",
      "팀 전체 인증 갱신과 CI/CD를 개인 단독 성과로 표현하는 내용",
      "검증되지 않은 사용자·사업 성과와 정량 지표",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
