# Git Naming Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 브랜치, 커밋, PR 제목에 일관된 이름 규칙을 제공하는 기여 가이드를 추가한다.

**Architecture:** 저장소 루트의 `CONTRIBUTING.md` 한 파일에 허용 접두사, 형식, 복사 가능한 예시, PR 본문 템플릿을 둔다. 코드와 도구 설정은 변경하지 않는다.

**Tech Stack:** Markdown, Git

## Global Constraints

- 브랜치는 `<type>/<kebab-case-설명>` 형식을 사용한다.
- 커밋은 `<type>: <한국어 명령형 설명>` 형식을 사용한다.
- PR 제목은 `[<type>] <한국어 설명>` 형식을 사용한다.
- 허용 `type`은 `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `ci`, `deploy`이다.
- 커밋 훅, 린트 도구, 의존성은 추가하지 않는다.

---

### Task 1: 기여 가이드 작성

**Files:**
- Create: `CONTRIBUTING.md`

**Interfaces:**
- Consumes: `docs/superpowers/specs/2026-08-05-git-naming-guide-design.md`의 이름 규칙
- Produces: 기여자가 복사해 사용할 수 있는 Git 이름 및 PR 작성 안내

- [x] **Step 1: 가이드에 형식과 허용 타입을 작성한다**

브랜치, 커밋, PR 형식을 각각 코드 블록으로 제공하고, 모든 허용 타입의 용도를 표로 설명한다.

- [x] **Step 2: 같은 변경을 설명하는 일관된 예시를 작성한다**

```text
브랜치: refactor/portfolio-cleanup
커밋: refactor: 미완성 포트폴리오 화면 정리
PR: [refactor] 포트폴리오 화면 정리
```

- [x] **Step 3: PR 본문 템플릿을 작성한다**

```markdown
## 변경 사항

- 

## 검증

- [ ] `npm run lint`
- [ ] `npm run test:run`
- [ ] `npm run build`
```

- [x] **Step 4: Markdown 검토와 Git 상태를 확인한다**

Run: `git diff --check && git status --short`

Expected: 공백 오류가 없고 `CONTRIBUTING.md`와 이 계획 문서만 새 파일로 표시된다.

- [x] **Step 5: 커밋한다**

```bash
git add CONTRIBUTING.md docs/superpowers/plans/2026-08-05-git-naming-guide.md
git commit -m "docs: add contribution naming guide"
```
