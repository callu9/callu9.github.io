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

- `src/app/page.tsx`: 홈
- `src/app/projects/[slug]/page.tsx`: 대표 프로젝트 정적 상세 페이지
- `src/data/portfolio.ts`: 공개 가능한 경력·프로젝트 콘텐츠
- `src/styles/globals.css`: 반응형 디자인과 접근성 스타일
- `.github/workflows/deploy.yml`: `main` 빌드 결과를 `gh-pages`에 배포

배포는 GitHub Actions가 담당합니다. 로컬에서 `gh-pages` 산출물을 직접 수정하지 않습니다.
