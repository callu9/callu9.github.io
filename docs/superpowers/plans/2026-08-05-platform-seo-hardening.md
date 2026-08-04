# Platform and SEO Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 정적 GitHub Pages 배포와 검색 엔진 메타데이터를 안정화하고 빌드 중 불필요한 블로그 조회를 줄인다.

**Architecture:** `src/lib/site.ts`에서 공개 사이트 URL을 공유한다. Next 메타데이터 파일은 그 상수를 사용하고, 블로그 데이터 조회는 React 서버 캐시를 사용한다.

**Tech Stack:** Next.js App Router, React, Vitest

## Global Constraints

- 사이트 URL은 `https://callu9.github.io`다.
- 콘텐츠·이미지 자산·의존성은 변경하지 않는다.
- sitemap은 홈과 블로그 목록만 포함한다.

---

### Task 1: 정적 배포와 SEO 메타데이터

**Files:**
- Create: `src/lib/site.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/seo.test.ts`
- Modify: `src/app/layout.tsx`
- Modify: `next.config.ts`

- [x] **Step 1: sitemap과 robots의 기대 URL을 테스트로 작성한다**

```ts
expect(sitemap()).toContainEqual(expect.objectContaining({ url: "https://callu9.github.io/" }));
expect(robots().sitemap).toBe("https://callu9.github.io/sitemap.xml");
```

- [x] **Step 2: 테스트가 실패하는지 확인한다**

Run: `npm run test:run -- src/app/seo.test.ts`

Expected: FAIL because SEO route modules do not exist.

- [x] **Step 3: 공유 사이트 URL, metadata, robots, sitemap, trailing slash를 구현한다**

- [x] **Step 4: SEO 테스트와 전체 검사로 확인한다**

Run: `npm run test:run && npm run lint && npm run build`

Expected: 모든 테스트·린트·정적 빌드가 성공한다.

### Task 2: 블로그 요청 정리

**Files:**
- Modify: `src/lib/githubPosts.ts`

- [x] **Step 1: 호출되지 않는 GitHub 트리 유틸리티를 삭제하고 글 목록 함수를 React 캐시로 감싼다**

- [x] **Step 2: 전체 검사로 확인한다**

Run: `npm run test:run && npm run lint && npm run build`

Expected: 모든 테스트·린트·정적 빌드가 성공한다.

- [x] **Step 3: 커밋한다**

```bash
git add next.config.ts src/app src/lib docs/superpowers/plans/2026-08-05-platform-seo-hardening.md
git commit -m "chore: harden static site delivery"
```
