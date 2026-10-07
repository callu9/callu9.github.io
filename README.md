# callu9.github.io

이수정의 프론트엔드·프로덕트 엔지니어링 포트폴리오입니다.

## 실행

```bash
npm ci
npm run dev
```

## 검증

```bash
npm run lint
npm run test:run
npm run build
```

`next.config.ts`의 `output: "export"` 설정으로 빌드 결과는 `out/`에 생성됩니다.

## 구조

- `src/app/page.tsx`: 프로젝트·경력·교육·연락처를 담은 한 페이지 포트폴리오
- `src/app/projects/[slug]/page.tsx`: 기존 상세 URL을 홈의 해당 프로젝트로 연결하는 정적 페이지
- `src/data/portfolio.ts`: 공개 가능한 경력·프로젝트 콘텐츠
- `src/styles/globals.css`: 반응형 디자인과 접근성 스타일
- `public/context-help.js`: 공개용 목업의 도움말·대상 강조·키보드 동작
- `scripts/strip-next-runtime.mjs`: 정적 HTML에서 Next.js 런타임을 제거하고 버전이 붙은 도움말 스크립트만 유지
- `.github/workflows/deploy.yml`: `main` 빌드 결과를 `gh-pages`에 배포

배포는 GitHub Actions가 담당합니다. 로컬에서 `gh-pages` 산출물을 직접 수정하지 않습니다.
