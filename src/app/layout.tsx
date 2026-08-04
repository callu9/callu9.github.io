import { BlurredDots } from "@/components/BlurredDots";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { siteUrl } from "@/lib/site";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "포트폴리오 | 프론트엔드 개발자",
  description:
    "프론트엔드 개발자의 경력, 리뷰, 블로그를 소개하는 포트폴리오 사이트입니다.",
  icons: {
    icon: "👨‍💻",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "Lee Sujeong 포트폴리오",
    title: "포트폴리오 | 프론트엔드 개발자",
    description:
      "프론트엔드 개발자의 경력, 리뷰, 블로그를 소개하는 포트폴리오 사이트입니다.",
  },
  twitter: {
    card: "summary",
    title: "포트폴리오 | 프론트엔드 개발자",
    description:
      "프론트엔드 개발자의 경력, 리뷰, 블로그를 소개하는 포트폴리오 사이트입니다.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-primary-light text-text-primary">
        <BlurredDots count={12} />
        <a href="#main-content" className="skip-link">
          본문으로 건너뛰기
        </a>
        <Navigation />
        <main id="main-content" tabIndex={-1} className="py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
