import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/site";
import "@/styles/globals.css";

const description =
  "분석 제품의 검수 흐름과 B2B 운영 시스템을 개발하는 프로덕트 엔지니어 이수정의 포트폴리오입니다. 현장 문제 파악부터 기능 기획, 구현·배포·운영까지의 경험을 소개합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Product Engineer | 이수정",
    template: "%s | 이수정 포트폴리오",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "이수정 포트폴리오",
    title: "Product Engineer | 이수정",
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
              <Link href="/#projects">Projects</Link>
              <Link href="/#experience">Experience</Link>
              <Link href="/#education">Education</Link>
              <Link href="/#contact">Contact</Link>
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
