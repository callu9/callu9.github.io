import Link from "next/link";
import { contactHref, experiences, projects, strengths } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">Frontend-focused Product Engineer</p>
            <h1 id="hero-title">이수정</h1>
            <p className="hero-role">
              프론트엔드 중심 프로덕트 엔지니어
              <br />
              현장 문제를 웹·디바이스·API 흐름으로 연결합니다.
            </p>
            <p className="hero-intro">
              React·Next.js 기반 데이터 제품과 B2B 운영 시스템에서 현장 문제,
              UI 상태, API 계약과 운영 흐름을 연결합니다.
            </p>
            <div className="actions">
              <a className="button button-primary" href={contactHref}>
                면접 제안 보내기
              </a>
              <a className="button button-secondary" href="#projects">
                프로젝트 보기
              </a>
            </div>
          </div>
          <aside className="hero-note" aria-label="일하는 방식">
            <p className="hero-note-title">제가 선명하게 만드는 것</p>
            <ul>
              <li>복잡한 업무의 상태와 다음 행동</li>
              <li>UI와 API가 공유하는 조건의 의미</li>
              <li>재사용 가능한 UI와 검증 기준</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="strengths" className="section shell" aria-labelledby="strengths-title">
        <div className="section-heading">
          <p className="eyebrow">Strengths</p>
          <h2 id="strengths-title">핵심 역량</h2>
        </div>
        <div className="strength-grid">
          {strengths.map((strength, index) => (
            <article key={strength.title} className="strength-item">
              <span aria-hidden="true">0{index + 1}</span>
              <h3>{strength.title}</h3>
              <p>{strength.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section section-tint">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>경력</h2>
          </div>
          <ol className="experience-list">
            {experiences.map((experience) => (
              <li key={`${experience.company}-${experience.period}`}>
                <div className="experience-meta">
                  <p>{experience.period}</p>
                  <h3>{experience.company}</h3>
                  <p>{experience.role}</p>
                </div>
                <div className="experience-body">
                  <p>{experience.summary}</p>
                  {experience.contributions.length > 0 && (
                    <ul className="plain-list">
                      {experience.contributions.map((contribution) => (
                        <li key={contribution}>{contribution}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects" className="section shell" aria-labelledby="projects-title">
        <div className="section-heading project-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="projects-title">대표 프로젝트</h2>
          </div>
          <p>
            내부 정보와 원본 화면 대신, 확인 가능한 역할·판단·결과를 공개용
            흐름으로 재구성했습니다.
          </p>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article key={project.slug} className="project-card">
              <div>
                <p className="project-number" aria-hidden="true">
                  0{index + 1}
                </p>
                <p className="project-label">{project.label}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <Link href={`/projects/${project.slug}`} prefetch={false}>
                {project.title} 자세히 보기 <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="shell contact-inner">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>함께 해결할 문제를 이야기해 주세요</h2>
            <p>
              복잡한 운영 흐름과 데이터 제품을 더 명확한 사용자 경험으로 만드는
              팀을 찾고 있습니다.
            </p>
          </div>
          <a className="button button-primary" href={contactHref}>
            면접 제안 보내기
          </a>
        </div>
      </section>
    </>
  );
}
