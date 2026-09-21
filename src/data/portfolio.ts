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
      "분석 제품의 UI 상태와 API 계약을 정렬하고, 검토용 화면군과 다단계 작업의 검증 경계를 다룹니다.",
    contributions: [
      "검토용 목업 화면군의 라우트·레이아웃·상태·상호작용을 정렬해 주 개발 환경에 통합",
      "서비스 상태 경계와 사용자 여정별 E2E 검증 절차·증거·결함 기록 기준 설계",
      "공통 UI의 시각·동작 정합성과 출시 전 접근성·호환성·패키지 평가 기준 정리",
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
    slug: "frontend-contract-handoff",
    title: "검수 프론트엔드와 API 계약 인수",
    label: "분석 제품 · Frontend/API 계약",
    period: "2026.06–현재 경력 중",
    summary:
      "백엔드 인력 공백기에 MSW로 검수 화면 개발을 이어가고, OpenAPI 계약을 인수 가능한 산출물로 정리했습니다.",
    overview: [
      "분석 제품의 검수 흐름에서 입력 상태와 결과 확인, 다음 행동의 의미를 맞추는 프론트엔드 작업입니다.",
      "화면과 API의 연결 기준을 일반화해 공개하며, 제품·조직 내부 자료와 원본 화면은 포함하지 않았습니다.",
    ],
    problem: [
      "백엔드 담당 인력의 공백으로 API 구현을 기다리면 프론트엔드 검수 흐름의 개발도 멈출 수 있었습니다.",
      "가상 응답으로 화면을 먼저 구현하더라도 이후 백엔드와 요청·응답 계약을 같은 기준으로 인수해야 했습니다.",
    ],
    role: [
      "MSW 응답으로 프론트엔드 검수 흐름을 먼저 구현하고 화면 상태를 확인했습니다.",
      "OpenAPI JSON과 생성된 TypeScript 타입을 계약 산출물로 정리했습니다.",
      "검수 맥락의 도움말과 FE/MSW 검증 게이트를 정리해 오류 상태에서 결과로 진행하지 않도록 했습니다.",
    ],
    decisions: [
      {
        title: "MSW로 화면 개발의 경계 확보",
        description:
          "백엔드 구현을 기다리는 대신 검수 요청·응답을 MSW로 재현해 화면 상태와 다음 행동을 검증했습니다.",
      },
      {
        title: "OpenAPI를 인수 기준으로",
        description:
          "정본 OpenAPI JSON에서 TypeScript 타입을 생성하고, 산출물이 오래된 상태로 남지 않도록 변경 검증을 연결했습니다.",
      },
      {
        title: "실패 상태도 검수 흐름에 포함",
        description:
          "FE/MSW 검증에서 문제가 확인되면 수정 후 재검토하며, 확인되기 전에는 결과 진행을 막는 기준을 세웠습니다.",
      },
    ],
    flow: ["검수 흐름 정의", "MSW 응답으로 화면 개발", "OpenAPI 계약 정리", "변경·상태 검증"],
    flowCaption:
      "실제 API와 원본 화면 대신 프론트엔드 선개발과 계약 인수의 관계를 나타낸 개념도입니다.",
    results: [
      "MSW 기반 검수 화면과 OpenAPI JSON·TypeScript 타입을 인수 가능한 기준으로 정리했습니다.",
      "계약 산출물의 최신 상태 검사와 변경 검증 절차를 마련했습니다.",
    ],
    omissions: [
      "제품·조직 식별 정보, 내부 API 경로와 스키마, 원본 화면·데이터",
      "실제 백엔드 연동과 서비스 운영 성과는 포함하지 않았습니다.",
      "확인되지 않은 일정 단축·사용량 등의 정량 지표",
    ],
  },
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
      "전화 접수 내용을 컴퓨터 메모장에 입력한 뒤 기존 시스템으로 다시 옮기는 중복 업무가 있었습니다.",
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
    slug: "recruitment-pipeline-board",
    title: "채용 단계 관리 보드",
    label: "공개 프로젝트 · React/TypeScript",
    period: "2026.09",
    summary:
      "지원자 검색·상세·단계 변경을 서버 상태 기준으로 구현하고 실패 시 복원되는 보드입니다.",
    overview: [
      "React와 TypeScript로 만든 공개 채용 단계 관리 보드입니다.",
      "MSW와 localStorage 기반 Mock API를 사용한 포트폴리오 프로젝트이며 실제 채용 서비스는 아닙니다.",
    ],
    problem: [
      "검색·필터·상세 화면과 단계 변경이 같은 지원자 상태를 일관되게 보여야 했습니다.",
      "빠른 단계 변경 중 실패하거나 같은 지원자를 중복 변경해도 화면이 잘못된 상태로 남지 않아야 했습니다.",
    ],
    role: [
      "검색·필터·상세·오류 상태를 포함한 지원자 관리 UI를 구현했습니다.",
      "TanStack Query를 서버 상태의 기준으로 삼고 MSW/localStorage Mock API를 연결했습니다.",
      "접근성과 자동화 검사를 포함해 공개 프로젝트의 기본 동작을 확인했습니다.",
    ],
    decisions: [
      {
        title: "서버 상태를 단일 기준으로",
        description:
          "TanStack Query 캐시를 지원자 목록과 상세 상태의 기준으로 사용해 화면마다 별도 복사본을 두지 않았습니다.",
      },
      {
        title: "변경 실패 시 복원",
        description:
          "단계 변경에는 지원자별 낙관적 갱신과 실패 시 롤백을 적용했습니다.",
      },
      {
        title: "동일 지원자 중복 변경 방지",
        description:
          "변경이 진행 중인 지원자에게는 추가 요청을 막아 같은 항목의 상태가 충돌하지 않게 했습니다.",
      },
    ],
    flow: ["지원자 검색·필터", "상세 확인", "단계 변경", "성공 반영 또는 실패 복원"],
    flowCaption:
      "Mock API와 화면 상태가 만나는 공개 프로젝트의 단계 변경 흐름입니다.",
    results: [
      "검색·필터·상세와 단계 변경의 성공·실패 흐름을 구현했습니다.",
      "지원자별 롤백·중복 변경 방지와 접근성·자동화 검사를 적용했습니다.",
    ],
    omissions: [
      "실제 채용 운영·프로덕션 백엔드와 다중 사용자 동시 처리 성과는 포함하지 않았습니다.",
      "실사용자 수, 처리 시간 단축 등 검증되지 않은 정량 성과",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
