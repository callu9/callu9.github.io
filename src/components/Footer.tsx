import React from "react";
import Link from "next/link";
import { navigationLinks } from "@/data/navigation";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-mint/40 border-secondary-peach/30 border-t py-6">
      <div className="section-container">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-text-primary mb-2 text-2xl font-bold">
              Portfolio
            </h3>
            <p className="text-text-secondary text-sm">
              프론트엔드 개발자 Lee Sujeong의 포트폴리오입니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary mb-4 font-semibold">네비게이션</h4>
            <ul className="space-y-2">
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-secondary-coral text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary mb-4 font-semibold">연락처</h4>
            <p className="text-text-secondary mb-2 flex gap-2 text-sm">
              📧
              <a
                href="mailto:callu_9ine@naver.com"
                className="hover:text-secondary-coral transition-colors"
              >
                callu_9ine@naver.com
              </a>
            </p>
            <p className="text-text-secondary flex gap-2 text-sm">
              📍 <span>대한민국, 서울</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-secondary-peach/30 border-t py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-text-light text-sm">
              © {currentYear} All rights reserved.
            </p>
            <p className="text-text-light flex gap-2 text-sm">
              Designed & Built with
              <span className="text-secondary-coral">callu9</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
