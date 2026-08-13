import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/site";
import "@/styles/globals.css";

const description =
  "UI 상태, API 계약과 운영 흐름을 연결하는 프론트엔드 중심 프로덕트 엔지니어 이수정의 포트폴리오입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Frontend-focused Product Engineer | 이수정",
    template: "%s | 이수정 포트폴리오",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "이수정 포트폴리오",
    title: "Frontend-focused Product Engineer | 이수정",
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main-content">
          본문으로 건너뛰기
        </a>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="brand" href="/">
              SUJEONG LEE
            </Link>
            <nav aria-label="주요 메뉴">
              <Link href="/#projects">프로젝트</Link>
              <Link href="/#experience">경력</Link>
              <Link href="/#strengths">역량</Link>
              <Link href="/#contact">연락</Link>
            </nav>
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <div className="shell footer-inner">
            <p>© 2026 Sujeong Lee</p>
            <div>
              <a href="mailto:callu_9ine@naver.com">Email</a>
              <a href="https://github.com/callu9">GitHub</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
