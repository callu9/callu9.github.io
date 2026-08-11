"use client";

import React from "react";
import Link from "next/link";
import { navigationLinks } from "@/data/navigation";

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-primary-light/80 border-secondary-peach/10 sticky top-0 right-0 left-0 z-50 border-b backdrop-blur-sm">
      <div className="section-container">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-text-primary hover:text-secondary-coral text-2xl font-bold transition-colors"
          >
            Portfolio
          </Link>

          {/* Navigation Links */}
          <ul className="hidden list-none items-center gap-8 md:flex">
            {navigationLinks.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className="text-text-primary hover:text-secondary-coral font-medium transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button - Hidden on mobile */}
          <a
            href="mailto:callu_9ine@naver.com"
            className="btn btn-primary hidden md:inline-block"
          >
            연락하기
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            className="text-text-primary hover:text-secondary-coral p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-secondary-peach/30 bg-primary-light border-t py-4 md:hidden"
          >
            <ul className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-primary hover:text-secondary-coral block font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:callu_9ine@naver.com"
                  className="text-secondary-coral font-medium"
                >
                  연락하기
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
