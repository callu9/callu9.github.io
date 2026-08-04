# 플랫폼 및 SEO 안정화 설계

## 목적

내용 데이터는 바꾸지 않고, 정적 배포 경로·검색 엔진 메타데이터·빌드 중 블로그 로딩을 안정화한다.

## 변경

- `getAllPostsFromGitHub`를 React 요청 캐시로 감싸 동일 렌더링 요청에서 Markdown을 반복 조회하지 않는다.
- 호출되지 않는 GitHub 트리 유틸리티를 삭제한다.
- Next 정적 export에 `trailingSlash: true`를 적용해 GitHub Pages가 디렉터리의 `index.html`을 안정적으로 제공하게 한다.
- 사이트 URL 상수를 공유하고 canonical, Open Graph, Twitter, `robots.txt`, `sitemap.xml`을 생성한다.
- sitemap은 홈과 블로그 목록만 포함한다. 글 경로는 이미 블로그 목록에서 링크되며, 외부 Markdown 저장소를 sitemap 생성에서 한 번 더 읽지 않는다.

## 제약

- 사이트 URL은 `https://callu9.github.io`를 사용한다.
- 프로필·블로그·프로젝트 내용과 이미지 자산은 변경하지 않는다.
- 새 의존성과 자동화 도구는 추가하지 않는다.

## 검증

- sitemap과 robots 함수의 URL을 단위 테스트한다.
- `npm run test:run`, `npm run lint`, `npm run build`가 통과해야 한다.
