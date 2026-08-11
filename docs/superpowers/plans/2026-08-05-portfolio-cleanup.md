# Portfolio Cleanup and Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove unfinished portfolio features and make navigation, blog metadata, and accessibility reliable.

**Architecture:** A typed resolver combines configured blog metadata with GitHub Markdown data, and both blog pages use it. Navigation owns its mobile disclosure state and a shared link list keeps desktop/mobile/footer destinations consistent.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest, React Testing Library.

## Global Constraints

- Do not add fictional projects, resume files, profile photos, or external social profiles.
- Do not change GitHub Pages configuration or deploy from this worktree.
- Remove project/resume controls and broken `#projects`/`#contact` fragments.
- Do not introduce `any`; preserve Korean copy except for accessible labels.

---

## File Structure

- `package.json`, `vitest.config.mts`, `src/test/setup.ts`: automated test harness.
- `src/lib/blogPosts.ts`: typed `resolveBlogPost` helper.
- `src/data/navigation.ts`: one source of navigation links.
- `src/components/{Navigation,Footer,Hero}.tsx`: only complete user actions.
- `src/app/blog/**`: resolved blog list, detail header, and metadata.
- `src/styles/globals.css`, `src/app/layout.tsx`: keyboard and motion support.

### Task 1: Add a test harness and prove blog fallback is missing

**Files:**
- Modify: `package.json`
- Create: `vitest.config.mts`, `src/test/setup.ts`, `src/lib/blogPosts.test.ts`

**Interfaces:** Produces `npm test` and `npm run test:run`; defines the expected `resolveBlogPost(post, config)` contract used in Task 2.

- [ ] **Step 1: Write the failing resolver test**

```ts
import { describe, expect, it } from "vitest";
import { resolveBlogPost } from "@/lib/blogPosts";

it("uses configured metadata when Markdown has no frontmatter", () => {
  const post = resolveBlogPost(
    { path: "topic/post", frontmatter: {}, html: "<p>Body</p>" },
    { path: "topic/post", title: "Configured title", description: "Configured description", category: "React" },
  );
  expect(post).toMatchObject({ title: "Configured title", description: "Configured description" });
  expect(post.date).toBeUndefined();
  expect(post.readingTime).toBeUndefined();
});
```

- [ ] **Step 2: Configure and run the test red**

Add `test: "vitest"` and `test:run: "vitest run"`; add `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, and `@testing-library/user-event`; configure `jsdom` and the `@` alias.

Run: `npm run test:run -- src/lib/blogPosts.test.ts`

Expected: FAIL because `src/lib/blogPosts.ts` does not exist.

- [ ] **Step 3: Commit the test harness**

```bash
git add package.json package-lock.json vitest.config.mts src/test/setup.ts src/lib/blogPosts.test.ts
git commit -m "test: add portfolio regression harness"
```

### Task 2: Repair typed blog metadata

**Files:**
- Create: `src/lib/blogPosts.ts`
- Modify: `src/lib/githubPosts.ts`, `src/lib/blogPosts.test.ts`, `src/app/blog/page.tsx`, `src/app/blog/[...slug]/page.tsx`

**Interfaces:** Exports `GitHubPost`; exports `ResolvedBlogPost` with required `title`, `description`, `category`, `featured`, `path`, `html` and optional `date`, `readingTime`; exports `resolveBlogPost(post, config)`.

- [ ] **Step 1: Extend the failing test for frontmatter precedence**

```ts
it("prefers non-empty Markdown frontmatter", () => {
  const post = resolveBlogPost(
    { path: "topic/post", frontmatter: { title: "Markdown title", description: "Markdown description", date: "2026-08-05" }, html: "<p>Body</p>" },
    { path: "topic/post", title: "Configured title", description: "Configured description", category: "React" },
  );
  expect(post).toMatchObject({ title: "Markdown title", description: "Markdown description", date: "2026-08-05" });
  expect(post.readingTime).toBeUndefined();
});
```

- [ ] **Step 2: Run the focused test red**

Run: `npm run test:run -- src/lib/blogPosts.test.ts`

Expected: FAIL because metadata merging is absent.

- [ ] **Step 3: Write the minimal typed resolver and use it**

```ts
export function resolveBlogPost(post: GitHubPost, config: BlogConfig): ResolvedBlogPost {
  return {
    path: post.path, html: post.html, category: config.category, featured: Boolean(config.featured),
    title: post.frontmatter.title || config.title || post.path,
    description: post.frontmatter.description || config.description,
    date: post.frontmatter.date || undefined,
    readingTime: post.frontmatter.readingTime || undefined,
  };
}
```

Export `GitHubPost` from `githubPosts.ts`; remove all `any`; use resolved posts for cards, detail headers, and `generateMetadata`. Render date/reading time only when present; do not render `•` or `-분` without data.

- [ ] **Step 4: Verify green and commit**

Run: `npm run test:run -- src/lib/blogPosts.test.ts && npm run lint`

Expected: tests PASS; remaining lint issues occur only in later planned files.

```bash
git add src/lib/githubPosts.ts src/lib/blogPosts.ts src/lib/blogPosts.test.ts src/app/blog/page.tsx 'src/app/blog/[...slug]/page.tsx'
git commit -m "fix: resolve blog metadata from configured content"
```

### Task 3: Remove incomplete project and resume UI

**Files:**
- Delete: `src/components/Projects.tsx`, `src/data/projects.ts`
- Modify: `src/types/index.ts`, `src/app/page.tsx`, `src/components/Hero.tsx`, `src/app/layout.tsx`
- Create: `src/components/Hero.test.tsx`

**Interfaces:** Removes `Project`; the hero retains only the accessible GitHub action.

- [ ] **Step 1: Add a visible-action regression test red**

```tsx
render(<Hero />);
expect(screen.getByRole("link", { name: "GitHub 프로필" })).toBeVisible();
expect(screen.queryByRole("button", { name: "프로젝트 보기" })).not.toBeInTheDocument();
expect(screen.queryByRole("button", { name: "이력서 다운로드" })).not.toBeInTheDocument();
```

Run: `npm run test:run -- src/components/Hero.test.tsx`

Expected: FAIL because both inactive CTAs are currently rendered and the GitHub link has no accessible name.

- [ ] **Step 2: Remove inactive content and update metadata**

Delete the two project files; remove the `Project` interface, stale import, hero CTA container, and project claim from root metadata. Keep the profile placeholder because it is explicitly non-goal content.

- [ ] **Step 3: Verify green and commit**

Run: `npm run test:run -- src/components/Hero.test.tsx && npm run lint`

Expected: removal checks PASS and the unused Projects warning disappears.

```bash
git add src/types/index.ts src/app/page.tsx src/components/Hero.tsx src/app/layout.tsx src/components/Hero.test.tsx
git rm src/components/Projects.tsx src/data/projects.ts
git commit -m "refactor: remove unfinished project surfaces"
```

### Task 4: Repair navigation and contact flow

**Files:**
- Create: `src/data/navigation.ts`, `src/components/Navigation.test.tsx`
- Modify: `src/components/Navigation.tsx`, `src/components/Footer.tsx`, `src/components/Hero.tsx`

**Interfaces:** `navigationLinks` contains Home, 경력, 리뷰, 블로그 destinations; Navigation uses local `isMobileMenuOpen` and names its disclosure control.

- [ ] **Step 1: Write the failing mobile-menu test**

```tsx
render(<Navigation />);
const button = screen.getByRole("button", { name: "메뉴 열기" });
await user.click(button);
expect(button).toHaveAttribute("aria-expanded", "true");
expect(screen.getAllByRole("link", { name: "경력" }).length).toBeGreaterThan(0);
```

- [ ] **Step 2: Run the navigation test red**

Run: `npm run test:run -- src/components/Navigation.test.tsx`

Expected: FAIL because the button has no accessible name or state.

- [ ] **Step 3: Implement the shared disclosure navigation**

Use Next `Link` for all internal links. Render `id="mobile-navigation"` only when open. The button uses `aria-controls`, `aria-expanded`, and toggles between `메뉴 열기`/`메뉴 닫기`. Set contact to `mailto:callu_9ine@naver.com`; use `navigationLinks` in the footer without Projects; add `aria-label="GitHub 프로필"` to the icon link.

- [ ] **Step 4: Verify green and commit**

Run: `npm run test:run -- src/components/Navigation.test.tsx && npm run lint`

Expected: menu test PASS and no root-link lint error.

```bash
git add src/data/navigation.ts src/components/Navigation.tsx src/components/Footer.tsx src/components/Hero.tsx src/components/Navigation.test.tsx
git commit -m "fix: repair responsive navigation and contact links"
```

### Task 5: Complete lint and accessibility baseline

**Files:**
- Create: `src/app/layout.test.tsx`
- Modify: `src/app/layout.tsx`, `src/styles/globals.css`, `src/components/BlurredDots.tsx`, `src/components/Reviews.tsx`, `src/components/Experience.tsx`

**Interfaces:** `main` has `id="main-content"`; dot objects include `animationDelay` generated before JSX renders.

- [ ] **Step 1: Write a failing skip-link behavior test**

```tsx
expect(screen.getByRole("link", { name: "본문으로 건너뛰기" })).toHaveAttribute("href", "#main-content");
```

- [ ] **Step 2: Run checks red**

Run: `npm run test:run -- src/app/layout.test.tsx`

Expected: FAIL because the skip link is absent.

- [ ] **Step 3: Implement minimal accessibility and lint repairs**

Add the skip link before navigation and `id="main-content"` to main. Add `:focus-visible` and `prefers-reduced-motion` CSS. Store `animationDelay` in generated dot data, replace unescaped review quotes with `&ldquo;`/`&rdquo;`, and omit the empty achievements list. Validate the motion rule with Task 6's browser-level reduced-motion check rather than a source-text assertion.

- [ ] **Step 4: Verify all checks and commit**

Run: `npm run test:run && npm run lint && npm run build`

Expected: tests PASS, lint exits 0, and Next creates `out/`.

```bash
git add src/app/layout.tsx src/styles/globals.css src/components/BlurredDots.tsx src/components/Reviews.tsx src/components/Experience.tsx src/app/layout.test.tsx
git commit -m "fix: improve portfolio accessibility baseline"
```

### Task 6: Browser regression check

**Files:** No code changes.

- [ ] **Step 1: Serve the static output**

Run: `python3 -m http.server 4173 --bind 127.0.0.1`

- [ ] **Step 2: Verify desktop**

Confirm no project/resume controls, contact is email, footer has no Projects link, skip link focuses main, and blog cards have no `-분` placeholder.

- [ ] **Step 3: Verify 390px mobile**

Click `메뉴 열기`, confirm the links appear, select `경력`, and confirm the panel closes.

- [ ] **Step 4: Record evidence**

Run: `git status --short && git log --oneline -6`

Expected: only intended cleanup commits and a clean worktree.

## Plan self-review

- Spec coverage: Tasks 2–5 cover typed blog data, inactive UI removal, navigation/contact fixes, and accessibility/lint repairs; Task 6 covers browser validation.
- Placeholder scan: all steps contain exact files, commands, or code behavior.
- Type consistency: `GitHubPost`, `ResolvedBlogPost`, `resolveBlogPost`, and `navigationLinks` are introduced before use.
