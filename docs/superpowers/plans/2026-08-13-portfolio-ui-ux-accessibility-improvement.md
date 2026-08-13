# Portfolio UI·UX·Accessibility Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 채용 담당자가 첫 화면에서 목표 직무를 이해하고 대표 작업·경력·연락을 빠르게 탐색할 수 있도록 홈과 프로젝트 상세의 UI·UX·접근성을 개선한다.

**Architecture:** 기존 Next.js App Router 페이지, `portfolio.ts` 데이터, 단일 전역 CSS 구조를 유지한다. 새 컴포넌트나 상태 관리 없이 JSX 순서·시맨틱, 검증된 공개 문구, CSS breakpoint 규칙을 최소 수정하고 Vitest/Testing Library와 브라우저 반응형 점검으로 검증한다.

**Tech Stack:** Next.js 16.3.0, React 19.2.1, TypeScript 5, CSS, Vitest 4.1.10, React Testing Library 16.3.2

## Global Constraints

- 영문 직무 표기는 `Frontend-focused Product Engineer`를 유지한다.
- 국문 직무 표기는 `프론트엔드 중심 프로덕트 엔지니어`를 유지한다.
- 새 디자인 시스템, 컴포넌트 추상화, 의존성, 이미지, 애니메이션을 추가하지 않는다.
- `.shell` 컨테이너, 전체 팔레트, 상세의 `01–07` 번호 체계를 유지한다.
- 검증되지 않은 경력 수치, 내부 명칭, 실제 화면, 코드 또는 링크를 추가하지 않는다.
- Oprimed 신규 대표 사례는 이번 구현에서 제외한다.
- 기존 skip link, `lang="ko"`, 3px `:focus-visible`, `prefers-reduced-motion`, CTA의 primary/secondary 구분을 유지한다.
- 일반 한글은 단어 단위로 줄바꿈하고, 긴 이메일처럼 실제 overflow 위험이 있는 문자열만 국소적으로 분해한다.
- 모든 변경은 320, 390, 640, 641, 1024, 1440 CSS px와 200% zoom에서 horizontal overflow 없이 동작해야 한다.

---

## File Structure

- `src/app/page.tsx`: 홈의 히어로, section 순서, 프로젝트 진입, 경력과 연락 시맨틱을 렌더링한다.
- `src/app/layout.tsx`: 공통 metadata와 화면 순서에 맞춘 전역 navigation을 제공한다.
- `src/app/projects/[slug]/page.tsx`: 상세 상단 요약, 복귀 링크, section 순서와 접근 가능한 이름을 렌더링한다.
- `src/data/portfolio.ts`: 검증된 Uniport 기여와 프로젝트 관련 기간을 보관한다.
- `src/styles/globals.css`: 타이포, 줄바꿈, hit area, responsive layout과 상세 밀도를 담당한다.
- `src/styles/globals.test.ts`: 전역 줄바꿈과 모바일 CSS 회귀를 소스 수준에서 막는다.
- `src/app/page.test.tsx`: 홈 heading 순서, section 이름, 프로젝트·연락 링크를 검증한다.
- `src/app/layout.test.tsx`: skip link, navigation 순서와 metadata를 검증한다.
- `src/app/projects/[slug]/page.test.tsx`: 상세 요약, section 순서와 상·하단 복귀 경로를 검증한다.

### Task 1: 직무 중심 히어로와 한글 reflow 수정

**Files:**
- Modify: `src/app/page.tsx:8-39`
- Modify: `src/styles/globals.css:24-31,58-61,148-183,266-299,619-644`
- Create: `src/styles/globals.test.ts`
- Test: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: 기존 `contactHref`, `.hero`, `.hero-grid`, `.hero-note`, `.strength-item` 구조.
- Produces: 유일한 H1 `프론트엔드 중심 프로덕트 엔지니어`, 보조 이름 `.hero-name`, 일반 한글 `word-break: keep-all`, 모바일 핵심역량 단일 열 규칙.

- [ ] **Step 1: 히어로와 CSS 회귀 테스트를 먼저 작성한다**

`src/app/page.test.tsx`에 다음 테스트를 추가하고 기존 첫 테스트의 H1 기대값만 직무명으로 바꾼다. section 순서는 Task 2 전까지 현재 순서를 유지한다.

```tsx
it("presents the target role before the candidate name", () => {
  const { container } = render(<Home />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "프론트엔드 중심 프로덕트 엔지니어",
    }),
  ).toBeVisible();
  expect(screen.getByText("이수정")).not.toHaveRole("heading");
  expect(container.querySelector(".hero br")).not.toBeInTheDocument();
});
```

`src/styles/globals.test.ts`를 생성한다.

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

describe("responsive typography CSS", () => {
  it("keeps Korean copy intact by default", () => {
    const bodyRule = css.match(/body\s*{[^}]*}/s)?.[0] ?? "";

    expect(bodyRule).toContain("word-break: keep-all");
    expect(bodyRule).not.toContain("overflow-wrap: anywhere");
  });

  it("removes odd-card borders after the strengths grid becomes one column", () => {
    expect(css).toMatch(
      /@media \(max-width: 40rem\)[\s\S]*?\.strength-item:nth-child\(odd\),[\s\S]*?border-right: 0/,
    );
  });
});
```

- [ ] **Step 2: focused test를 실행해 실패를 확인한다**

Run: `npm run test:run -- src/app/page.test.tsx src/styles/globals.test.ts`

Expected: 히어로 H1이 아직 `이수정`이고, `body`가 `overflow-wrap: anywhere`를 사용하며, 새 CSS 회귀 테스트가 실패한다.

- [ ] **Step 3: 히어로 JSX를 최소 구조로 교체한다**

`src/app/page.tsx`의 히어로 왼쪽 내용을 다음 구조로 바꾼다. 기존 두 CTA와 오른쪽 aside 구조는 유지하되 aside 문구만 아래 세 항목으로 압축한다.

```tsx
<div>
  <p className="eyebrow">Frontend-focused Product Engineer</p>
  <p className="hero-name">이수정</p>
  <h1 id="hero-title">프론트엔드 중심 프로덕트 엔지니어</h1>
  <p className="hero-intro">
    React·Next.js 기반 데이터 제품과 B2B 운영 시스템에서 현장 문제를 UI
    상태·API 계약·운영 흐름으로 연결합니다.
  </p>
  <div className="actions">
    <a className="button button-primary" href={contactHref}>
      면접 제안 보내기
    </a>
    <a className="button button-secondary" href="#projects">
      프로젝트 보기
    </a>
  </div>
</div>
<aside className="hero-note" aria-label="일하는 방식">
  <p className="hero-note-title">제가 선명하게 만드는 것</p>
  <ul>
    <li>UI와 API가 공유하는 조건의 의미</li>
    <li>재개 가능한 상태와 다음 행동</li>
    <li>재사용 가능한 UI와 검증 기준</li>
  </ul>
</aside>
```

- [ ] **Step 4: 전역 reflow와 히어로 타이포를 수정한다**

`src/styles/globals.css`에서 존재하지 않는 Pretendard 선언과 전역 arbitrary wrap을 제거하고 다음 규칙을 사용한다.

```css
body {
  margin: 0;
  background: var(--background);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.65;
  word-break: keep-all;
}

h1 {
  margin-bottom: 1.25rem;
  font-size: clamp(2.5rem, 6vw, 4.75rem);
}

.hero-name {
  margin-bottom: 0.5rem;
  color: var(--text);
  font-size: 1.1rem;
  font-weight: 800;
}

.hero-intro,
.case-summary {
  max-width: 45rem;
  font-size: clamp(1.05rem, 2vw, 1.28rem);
}
```

더 이상 사용하지 않는 `.hero-role` 규칙을 삭제한다. `.shell` 규칙은 수정하지 않는다.

- [ ] **Step 5: 모바일 핵심역량 selector를 정확히 덮는다**

40rem media query의 기존 strength 규칙을 다음으로 교체한다.

```css
.strength-item,
.strength-item:nth-child(odd),
.strength-item:nth-child(even) {
  border-right: 0;
  padding-inline: 0.5rem;
}
```

- [ ] **Step 6: focused test와 정적 검사를 통과시킨다**

Run: `npm run test:run -- src/app/page.test.tsx src/styles/globals.test.ts && npm run lint`

Expected: 모든 focused test가 PASS하고 lint가 exit 0이다.

- [ ] **Step 7: P0 수정만 커밋한다**

```bash
git add src/app/page.tsx src/app/page.test.tsx src/styles/globals.css src/styles/globals.test.ts
git commit -m "fix: 포트폴리오 직무 위계와 모바일 줄바꿈 수정"
```

### Task 2: 홈의 채용 정보 순서·경력·연락 경로 개선

**Files:**
- Modify: `src/app/page.tsx:41-130`
- Modify: `src/app/layout.tsx:8-57`
- Modify: `src/data/portfolio.ts:28-65`
- Modify: `src/styles/globals.css:128-146,345-430,619-683`
- Test: `src/app/page.test.tsx`
- Test: `src/app/layout.test.tsx`

**Interfaces:**
- Consumes: Task 1의 H1과 `.hero-name`, 기존 `projects`, `experiences`, `strengths`, `contactHref`.
- Produces: 홈 순서 `projects → experience → strengths → contact`, 동일 순서의 nav, 두 개의 Uniport contribution, 제목 기반 프로젝트 링크, 실제 이메일·GitHub 연락 링크.

- [ ] **Step 1: 홈 정보 구조와 연락 경로의 실패 테스트를 작성한다**

`src/app/page.test.tsx`의 첫 테스트를 다음 기대값으로 갱신하고 두 테스트를 추가한다.

```tsx
it("presents evidence before supporting claims", () => {
  const { container } = render(<Home />);
  const headings = Array.from(container.querySelectorAll("h1, h2")).map(
    (heading) => heading.textContent,
  );

  expect(headings).toEqual([
    "프론트엔드 중심 프로덕트 엔지니어",
    "대표 프로젝트",
    "경력",
    "핵심 역량",
    "함께 해결할 문제를 이야기해 주세요",
  ]);
});

it("labels every home section for assistive technology", () => {
  render(<Home />);

  for (const name of ["대표 프로젝트", "경력", "핵심 역량", "함께 해결할 문제를 이야기해 주세요"]) {
    expect(screen.getByRole("region", { name })).toBeVisible();
  }
});

it("shows reusable contact destinations", () => {
  render(<Home />);

  expect(screen.getByRole("link", { name: "callu_9ine@naver.com" })).toHaveAttribute(
    "href",
    "mailto:callu_9ine@naver.com",
  );
  expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/callu9",
  );
});
```

기존 프로젝트 링크 테스트는 각 제목 링크가 정확히 하나인지 검증하도록 바꾼다.

```tsx
expect(
  screen.getAllByRole("link", { name: /업무지원 운영 플랫폼/ }),
).toHaveLength(1);
```

`src/app/layout.test.tsx`에서 `within`과 `metadata`를 import하고 다음 테스트를 추가한다.

```tsx
import { render, screen, within } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";

it("matches global navigation to the home reading order", () => {
  const layout = RootLayout({ children: <p>페이지 내용</p> });
  const body = layout.props.children as ReactElement<{ children: ReactNode }>;
  render(<>{body.props.children}</>);

  const nav = screen.getByRole("navigation", { name: "주요 메뉴" });
  expect(within(nav).getAllByRole("link").map((link) => link.textContent)).toEqual([
    "프로젝트",
    "경력",
    "역량",
    "연락",
  ]);
  expect(within(nav).getByRole("link", { name: "연락" })).toHaveAttribute(
    "href",
    "/#contact",
  );
});

it("puts the target role first in share metadata", () => {
  expect(metadata.title).toMatchObject({
    default: "Frontend-focused Product Engineer | 이수정",
  });
  expect(metadata.openGraph).toMatchObject({
    title: "Frontend-focused Product Engineer | 이수정",
  });
});
```

- [ ] **Step 2: 홈·layout focused test의 실패를 확인한다**

Run: `npm run test:run -- src/app/page.test.tsx src/app/layout.test.tsx`

Expected: 기존 section 순서, mailto nav, 이름 우선 metadata, 빈 Uniport contribution과 중복 프로젝트 링크 때문에 FAIL한다.

- [ ] **Step 3: 검증된 Uniport 문구 두 개만 추가한다**

`src/data/portfolio.ts`의 Uniport 항목을 정확히 다음 내용으로 교체한다.

```ts
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
```

- [ ] **Step 4: 홈 section을 증거 우선 순서로 이동하고 이름을 연결한다**

`src/app/page.tsx`에서 기존 section 블록 전체를 다음 ID 순서로 이동한다. section 내부 map은 재작성하지 않는다.

```ts
const expectedHomeSectionOrder = [
  "projects",
  "experience",
  "strengths",
  "contact",
] as const;
```

실제 JSX에는 위 상수를 추가하지 말고 기존 블록을 물리적으로 이동한다. Experience와 Contact는 다음처럼 heading id와 section label을 추가한다.

```tsx
<section
  id="experience"
  className="section section-tint"
  aria-labelledby="experience-title"
>
  <div className="shell">
    <div className="section-heading">
      <p className="eyebrow">Experience</p>
      <h2 id="experience-title">경력</h2>
    </div>
    <ol className="experience-list">
      {experiences.map((experience) => (
        <li key={`${experience.company}-${experience.period}`}>
          <div className="experience-meta">
            <p>{experience.period}</p>
            <h3>{experience.company}</h3>
            <p>{experience.role}</p>
          </div>
          <div className="experience-body">
            <p>{experience.summary}</p>
            {experience.contributions.length > 0 && (
              <ul className="plain-list">
                {experience.contributions.map((contribution) => (
                  <li key={contribution}>{contribution}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  </div>
</section>
```

```tsx
<section
  id="contact"
  className="section contact-section"
  aria-labelledby="contact-title"
>
  <div className="shell contact-inner">
    <div>
      <p className="eyebrow">Contact</p>
      <h2 id="contact-title">함께 해결할 문제를 이야기해 주세요</h2>
      <p>
        복잡한 운영 흐름과 데이터 제품을 더 명확한 사용자 경험으로 만드는
        팀을 찾고 있습니다.
      </p>
      <p className="contact-links">
        <a href="mailto:callu_9ine@naver.com">callu_9ine@naver.com</a>
        <a href="https://github.com/callu9">GitHub</a>
      </p>
    </div>
    <a className="button button-primary" href={contactHref}>
      면접 제안 보내기
    </a>
  </div>
</section>
```

- [ ] **Step 5: 프로젝트 제목 하나만 진입 링크로 사용한다**

`src/app/page.tsx`의 각 `.project-card`에서 하단 Link를 제거하고 제목·결과를 다음처럼 렌더링한다.

```tsx
<h3>
  <Link href={`/projects/${project.slug}`} prefetch={false}>
    {project.title} <span aria-hidden="true">→</span>
  </Link>
</h3>
<p>{project.summary}</p>
<p className="project-result">
  <strong>검증 결과</strong>
  {project.results[0]}
</p>
```

- [ ] **Step 6: nav와 metadata를 화면 전략에 맞춘다**

`src/app/layout.tsx`의 title 두 곳과 nav를 다음 값으로 바꾼다.

```tsx
title: {
  default: "Frontend-focused Product Engineer | 이수정",
  template: "%s | 이수정 포트폴리오",
},
```

```tsx
<nav aria-label="주요 메뉴">
  <Link href="/#projects">프로젝트</Link>
  <Link href="/#experience">경력</Link>
  <Link href="/#strengths">역량</Link>
  <Link href="/#contact">연락</Link>
</nav>
```

Open Graph의 title도 `Frontend-focused Product Engineer | 이수정`으로 바꾼다. layout에서 `contactHref` import가 더 이상 사용되지 않으므로 제거한다.

- [ ] **Step 7: 링크 hit area와 홈 보조 정보 스타일을 추가한다**

`src/styles/globals.css`에 다음 규칙을 반영한다.

```css
.eyebrow {
  margin-bottom: 0.8rem;
  color: var(--accent-dark);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.project-label {
  margin-bottom: 0.8rem;
  color: var(--accent-dark);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: -0.01em;
}

nav a,
.footer-inner a,
.project-card h3 a,
.contact-links a {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
}

nav a,
.footer-inner a {
  min-width: 2.75rem;
  justify-content: center;
}

.project-card h3 a {
  white-space: normal;
}

.project-card {
  grid-template-columns: 1fr;
}

.project-result {
  margin-top: 1rem;
}

.project-result strong {
  display: block;
  color: var(--text);
  font-size: 0.85rem;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-top: 1rem;
}

.contact-links a {
  overflow-wrap: anywhere;
  word-break: normal;
}
```

`.project-number`의 `grid-row`를 추가된 결과까지 포함하도록 `1 / 5`로 바꾼다. 더 이상 유효하지 않은 `.project-card > a`, `white-space: nowrap`, 52rem의 `.project-card a { justify-self: start; }` 규칙을 삭제한다.

기존 결합 selector `.eyebrow, .project-label`도 위 두 개의 독립 규칙으로 교체해 한국어 label에 uppercase와 영문 자간이 적용되지 않게 한다.

40rem media query에는 다음 한 규칙만 추가해 2행 모바일 header가 viewport를 계속 점유하지 않게 한다.

```css
.site-header {
  position: static;
}
```

- [ ] **Step 8: 홈·layout test와 lint를 통과시킨다**

Run: `npm run test:run -- src/app/page.test.tsx src/app/layout.test.tsx && npm run lint`

Expected: 새 heading/nav 순서, section accessible name, 단일 프로젝트 제목 링크, 실제 연락처와 metadata 테스트가 모두 PASS한다.

- [ ] **Step 9: 홈 UX 변경을 커밋한다**

```bash
git add src/app/page.tsx src/app/page.test.tsx src/app/layout.tsx src/app/layout.test.tsx src/data/portfolio.ts src/styles/globals.css
git commit -m "feat: 포트폴리오 탐색과 경력 정보 개선"
```

### Task 3: 프로젝트 상세의 요약·결과 순서·복귀 동선 개선

**Files:**
- Modify: `src/data/portfolio.ts:67-224`
- Modify: `src/app/projects/[slug]/page.tsx:31-140`
- Modify: `src/styles/globals.css:432-585,587-683`
- Test: `src/app/projects/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: 기존 `Project` 데이터의 `label`, `problem[0]`, `results[0]`, Task 2에서 유지한 `/#projects` anchor.
- Produces: `Project.period: string`, `.case-back-link`, `.case-facts`, 결과가 네 번째인 `01–07` 상세 section 순서, 모든 section의 `aria-labelledby`.

- [ ] **Step 1: 상세 정보 구조의 실패 테스트를 작성한다**

`src/app/projects/[slug]/page.test.tsx`의 렌더 테스트를 다음 구조로 갱신한다.

```tsx
it.each(slugs)("renders a scannable case-study structure for %s", async (slug) => {
  const { container } = render(
    await ProjectPage({ params: Promise.resolve({ slug }) }),
  );

  expect(screen.getByRole("link", { name: "대표 프로젝트" })).toHaveAttribute(
    "href",
    "/#projects",
  );
  expect(screen.getByText("관련 기간")).toBeVisible();
  expect(screen.getByText("역할")).toBeVisible();
  expect(screen.getByText("핵심 문제")).toBeVisible();
  expect(screen.getAllByText("검증 결과", { exact: true }).length).toBeGreaterThan(0);

  expect(
    Array.from(container.querySelectorAll(".case-section h2")).map(
      (heading) => heading.textContent,
    ),
  ).toEqual([
    "프로젝트 개요",
    "문제와 제약",
    "역할과 기여 범위",
    "검증 가능한 결과",
    "핵심 결정과 선택 이유",
    "공개용 UI·흐름",
    "일반화하거나 생략한 범위",
  ]);

  expect(screen.getByRole("link", { name: "프로젝트 목록으로" })).toHaveAttribute(
    "href",
    "/#projects",
  );
});
```

`screen.getByText("역할")`이 project label 내부 문자열과 충돌하지 않도록 exact option을 사용한다.

```tsx
expect(screen.getByText("역할", { exact: true })).toBeVisible();
```

- [ ] **Step 2: focused 상세 test가 실패하는지 확인한다**

Run: `npm run test:run -- 'src/app/projects/[slug]/page.test.tsx'`

Expected: 상단 복귀 링크와 facts가 없고 결과가 여섯 번째라 FAIL한다.

- [ ] **Step 3: 검증된 관련 기간만 데이터에 추가한다**

`Project` type에 필드를 하나만 추가한다.

```ts
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
```

실제 코드에는 기존 필드를 생략하지 말고 `period`만 다음 값으로 추가한다.

```ts
// work-support-platform
period: "2021.10–2025.04 경력 중",

// operations-dashboard
period: "2026.02–2026.03",

// collaborative-web-product
period: "2025.09–2025.11",
```

첫 값은 프로젝트 수행 기간이 아니라 관련 Lotte 경력 범위임을 문구 자체로 제한한다.

- [ ] **Step 4: 가장 반복적인 Uniport 상세 문구를 검증된 책임 단위로 정리한다**

`operations-dashboard`의 `problem`, `role`, `decisions`, `results`만 다음 내용으로 교체한다. 다른 두 프로젝트는 공개 근거가 제한되어 있으므로 이번 작업에서 새 해석을 추가하지 않는다.

```ts
problem: [
  "문서 목록 조회와 현재 상태에 따른 사용자 액션이 한 화면에서 함께 변하는 관리 흐름이었습니다.",
  "실제 조직명, 데이터 구조와 원본 화면은 공개하지 않는 제약이 있습니다.",
],
role: [
  "Mock API를 연결해 공개 가능한 문서·상태 관리 흐름을 구현했습니다.",
  "테이블·검색·쿼리와 사용자 액션의 책임을 분리했습니다.",
  "역할·문서 상태별 액션과 다운로드 오류, 도메인 범위 모달 상태를 구현했습니다.",
],
decisions: [
  {
    title: "조회와 업무 액션 분리",
    description:
      "테이블·검색·쿼리는 데이터 조회 흐름으로, 역할·문서 상태별 행동은 사용자 액션으로 구분했습니다.",
  },
  {
    title: "예외 상태를 별도 책임으로 처리",
    description:
      "다운로드 오류와 도메인 범위 모달 상태를 조회 흐름과 분리해 각각의 변경 범위를 제한했습니다.",
  },
],
results: [
  "조회 상태와 업무 액션이 분리된 문서·상태 관리 흐름을 구현했습니다.",
  "프론트엔드 인턴 기여 범위만 공개하며 확인되지 않은 정량 성과는 주장하지 않습니다.",
],
```

- [ ] **Step 5: hero에 상단 복귀 링크와 네 가지 facts를 렌더링한다**

`src/app/projects/[slug]/page.tsx`의 `.case-hero-inner` 안을 다음 순서로 구성한다.

```tsx
<Link className="case-back-link" href="/#projects">
  <span aria-hidden="true">←</span> 대표 프로젝트
</Link>
<p className="eyebrow">Selected project</p>
<p className="project-label">{project.label}</p>
<h1>{project.title}</h1>
<p className="case-summary">{project.summary}</p>
<dl className="case-facts">
  <div>
    <dt>관련 기간</dt>
    <dd>{project.period}</dd>
  </div>
  <div>
    <dt>역할</dt>
    <dd>{project.label}</dd>
  </div>
  <div>
    <dt>핵심 문제</dt>
    <dd>{project.problem[0]}</dd>
  </div>
  <div>
    <dt>검증 결과</dt>
    <dd>{project.results[0]}</dd>
  </div>
</dl>
```

- [ ] **Step 6: 결과를 역할 바로 뒤로 옮기고 번호를 명시적으로 전달한다**

상세 section을 다음 순서와 번호로 렌더링한다.

```tsx
<CaseSection id="overview-title" number="01" title="프로젝트 개요" items={project.overview} />
<CaseSection id="problem-title" number="02" title="문제와 제약" items={project.problem} tone="lavender" />
<CaseSection id="role-title" number="03" title="역할과 기여 범위" items={project.role} />
<CaseSection id="results-title" number="04" title="검증 가능한 결과" items={project.results} tone="mint" />
```

기존 decisions section의 숫자를 `05`, flow section의 숫자를 `06`으로 바꾸고 마지막 omissions를 다음처럼 렌더링한다.

```tsx
<CaseSection
  id="omissions-title"
  number="07"
  title="일반화하거나 생략한 범위"
  items={project.omissions}
  tone="coral"
/>
```

`CaseSection`의 title 기반 number record를 삭제하고 signature와 JSX를 다음처럼 바꾼다.

```tsx
function CaseSection({
  id,
  number,
  title,
  items,
  tone,
}: {
  id: string;
  number: string;
  title: string;
  items: string[];
  tone?: "lavender" | "mint" | "coral";
}) {
  return (
    <section
      className={`case-section${tone ? ` tone-${tone}` : ""}`}
      aria-labelledby={id}
    >
      <div className="case-section-title">
        <p>{number}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <ul className="case-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
```

decisions와 flow의 기존 `aria-labelledby`는 유지한다.

- [ ] **Step 7: 상세 facts와 모바일 밀도 CSS를 추가한다**

`src/styles/globals.css`에 다음 규칙을 추가한다.

```css
.case-back-link {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
  color: var(--accent-dark);
  font-weight: 800;
}

.case-facts {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin: 2rem 0 0;
}

.case-facts div {
  border-top: 1px solid color-mix(in srgb, var(--accent) 35%, var(--line));
  padding-top: 0.75rem;
}

.case-facts dt {
  color: var(--accent-dark);
  font-size: 0.8rem;
  font-weight: 800;
}

.case-facts dd {
  margin: 0.35rem 0 0;
  color: var(--text);
}
```

52rem media query에는 다음을 추가한다.

```css
.case-facts {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.case-section {
  gap: 1.25rem;
  padding-block: 2.5rem;
}
```

40rem media query에는 다음을 추가한다.

```css
.case-facts {
  grid-template-columns: 1fr;
}
```

`.tone-lavender, .tone-mint, .tone-coral`의 `padding-inline: 1.5rem`을 삭제해 모든 상세 section 기준선을 맞춘다. 배경색 규칙은 유지한다.

- [ ] **Step 8: 상세 test와 전체 unit test를 통과시킨다**

Run: `npm run test:run -- 'src/app/projects/[slug]/page.test.tsx' && npm run test:run`

Expected: 세 slug 모두 동일한 facts와 `01–07` 순서, 상·하단 복귀 경로를 렌더링하고 전체 unit test가 PASS한다.

- [ ] **Step 9: 상세 UX 변경을 커밋한다**

```bash
git add 'src/app/projects/[slug]/page.tsx' 'src/app/projects/[slug]/page.test.tsx' src/data/portfolio.ts src/styles/globals.css
git commit -m "feat: 프로젝트 상세 요약과 복귀 동선 개선"
```

### Task 4: 통합 검증과 반응형 QA

**Files:**
- Modify only if verification exposes a defect: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/projects/[slug]/page.tsx`, `src/data/portfolio.ts`, `src/styles/globals.css`, matching test file
- Test: all `*.test.ts`, `*.test.tsx`

**Interfaces:**
- Consumes: Tasks 1–3의 최종 홈·상세 UI.
- Produces: lint, unit, static build와 명시된 viewport/zoom/keyboard 조건을 모두 통과한 정적 사이트.

- [ ] **Step 1: 자동 검증을 순서대로 실행한다**

Run: `npm run lint && npm run test:run && npm run build`

Expected: 세 명령 모두 exit 0이고 정적 산출물이 `out/`에 생성된다.

- [ ] **Step 2: 정적 산출물을 로컬에서 제공한다**

Run: `python3 -m http.server 4173 --bind 127.0.0.1 --directory out`

Expected: `http://127.0.0.1:4173/`와 세 프로젝트 상세 URL이 200 응답을 반환한다.

- [ ] **Step 3: 320·390px 홈을 검증한다**

브라우저에서 각 viewport마다 다음 항목을 확인한다.

```text
- H1이 프론트엔드 중심 프로덕트 엔지니어이고 이수정보다 먼저 보인다.
- 한글이 글자 단위로 임의 분해되지 않는다.
- header는 스크롤을 따라오지 않으며 네 nav 링크가 겹치지 않는다.
- 핵심역량 01·03 오른쪽 보더가 없고 네 항목 padding이 같다.
- horizontal overflow가 0이다.
- 연락 section에서 이메일 주소와 GitHub를 읽고 선택할 수 있다.
```

- [ ] **Step 4: 640·641·1024·1440px 홈을 검증한다**

```text
- 640px과 641px 양쪽에서 breakpoint 전후 콘텐츠 손실이나 겹침이 없다.
- desktop sticky header가 section 제목을 가리지 않는다.
- 대표 프로젝트가 경력과 핵심 역량보다 먼저 나온다.
- 프로젝트 제목 링크가 키보드 focus ring을 보이고 최소 높이 44px이다.
- 1024px과 1440px에서 .shell 최대 폭과 기존 팔레트가 유지된다.
```

- [ ] **Step 5: 세 프로젝트 상세를 390·1024px에서 검증한다**

```text
- 상단 대표 프로젝트 링크와 하단 프로젝트 목록으로 링크가 모두 /#projects로 간다.
- 관련 기간·역할·핵심 문제·검증 결과가 상세 초반에 보인다.
- section은 01 개요, 02 문제, 03 역할, 04 결과, 05 결정, 06 흐름, 07 생략 순서다.
- 390px에서 facts가 1열이고 section 사이에 대형 공백이 없다.
- 1024px에서 facts가 4열이고 텍스트나 border가 겹치지 않는다.
- horizontal overflow가 0이다.
```

- [ ] **Step 6: 키보드와 200% zoom을 검증한다**

```text
- Tab 순서: 본문 건너뛰기 → 브랜드 → nav → hero CTA → 프로젝트 제목 → Contact → footer.
- 모든 focusable 요소에 기존 3px focus ring이 보인다.
- 본문 건너뛰기는 #main-content에 focus를 옮긴다.
- 200% zoom에서도 텍스트 clipping, focus 손실, 양방향 스크롤이 없다.
- prefers-reduced-motion에서 smooth scrolling이 비활성화된다.
```

- [ ] **Step 7: QA에서 결함이 발견된 경우에만 가장 가까운 기존 규칙과 테스트를 수정한다**

새 helper나 breakpoint를 만들지 않는다. 결함이 40rem/52rem 경계에만 있으면 해당 media query를 수정하고, 수정한 동작을 가장 가까운 기존 test 또는 `src/styles/globals.test.ts`에 한 assertion으로 남긴다.

- [ ] **Step 8: 최종 상태를 확인하고 QA 수정이 있을 때만 커밋한다**

Run: `git diff --check && git status --short && git log --oneline -4`

Expected: whitespace 오류가 없고 `.ouroboros/` 외에 의도하지 않은 파일이 없다. QA 수정이 있었다면 다음 커밋을 만든다.

```bash
git add src/app src/data/portfolio.ts src/styles
git commit -m "fix: 포트폴리오 반응형 회귀 수정"
```

## Plan Self-Review

- Spec coverage: Task 1이 P0 히어로·줄바꿈·핵심역량을, Task 2가 홈 순서·경력·navigation·프로젝트·연락·metadata를, Task 3이 상세 요약·결과 순서·복귀·밀도를, Task 4가 viewport·zoom·keyboard 검증을 담당한다.
- Deliberate follow-up: Oprimed 신규 사례는 승인된 설계의 별도 콘텐츠 작업이므로 이번 plan에 구현 task를 만들지 않았다.
- Dependency check: 새 dependency, font, component, helper 파일을 만들지 않는다. Node `fs`와 기존 Vitest만 사용한다.
- Type consistency: `Project.period: string`은 Task 3에서 추가되고 같은 task의 상세 JSX에서만 소비된다. `CaseSection`의 `id`, `number`, `title`, `items`, `tone` 이름을 모든 호출부와 signature에서 동일하게 사용한다.
- Scope check: 홈, 상세, 전역 CSS는 하나의 사용자 탐색 흐름이며 각 task가 독립적으로 테스트·리뷰·커밋 가능하다.
