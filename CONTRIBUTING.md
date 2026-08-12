# 기여 가이드

브랜치, 커밋, PR 제목에는 같은 변경 범주(`type`)를 사용합니다.

## 브랜치

형식:

```text
<type>/<kebab-case-설명>
```

예시:

```text
feat/project-details
fix/mobile-navigation
refactor/portfolio-cleanup
docs/contribution-guide
```

## 커밋 메시지

형식:

```text
<type>: <한국어 명령형 설명>
```

예시:

```text
feat: 블로그 검색 추가
fix: 모바일 메뉴 닫힘 처리 수정
refactor: 미완성 포트폴리오 화면 정리
docs: 기여 가이드 추가
```

## PR 제목

형식:

```text
[<type>] <한국어 설명>
```

예시:

```text
[feat] 블로그 검색 추가
[fix] 모바일 메뉴 닫힘 처리 수정
[refactor] 포트폴리오 화면 정리
```

## 타입

| 타입 | 사용 시점 |
| --- | --- |
| `feat` | 사용자에게 보이는 기능을 추가할 때 |
| `fix` | 잘못된 동작을 수정할 때 |
| `refactor` | 동작을 바꾸지 않고 구조나 코드를 정리할 때 |
| `docs` | 문서만 변경할 때 |
| `test` | 테스트만 추가하거나 수정할 때 |
| `chore` | 의존성, 설정, 잡무를 정리할 때 |
| `ci` | CI/CD 워크플로를 변경할 때 |
| `deploy` | 배포 산출물 또는 배포 설정을 변경할 때 |

## 한 변경의 이름 맞추기

```text
브랜치: refactor/portfolio-cleanup
커밋: refactor: 미완성 포트폴리오 화면 정리
PR: [refactor] 포트폴리오 화면 정리
```

## PR 본문 템플릿

```markdown
## 변경 사항

- 

## 검증

- [ ] `npm run lint`
- [ ] `npm run test:run`
- [ ] `npm run build`
```
