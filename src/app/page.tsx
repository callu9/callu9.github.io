import Image from "next/image";
import { contactHref, educationGroups, experiences, projects } from "@/data/portfolio";
import ProjectPreview from "./project-preview";

export default function Home() {
  return (
    <>
      <section className="hero shell" aria-labelledby="hero-title">
        <p className="eyebrow">Product Engineer · React / Next.js</p>
        <h1 id="hero-title">복잡한 업무 흐름을 구조화하는<br /><span>Product Engineer</span></h1>
        <p className="hero-intro">
          분석 제품의 검수 흐름과 B2B 운영 시스템을 개발합니다.<br />{" "}
          현장의 문제를 파악하고, 기능 기획부터 구현·배포·운영까지 경험했습니다.
        </p>
        <div className="actions">
          <a className="button button-primary" href={contactHref}>면접 제안 보내기 <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="https://github.com/callu9">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section id="projects" className="section shell" aria-labelledby="projects-title">
        <div className="section-heading"><h2 id="projects-title">Projects</h2><span>01 — 03</span></div>
        <div className="project-grid">
          {projects.map((project) => (
            <article id={project.slug} key={project.slug} className="project" aria-labelledby={`${project.slug}-title`}>
              <header className="project-header">
                <div>
                  <p className="eyebrow">{project.label}</p>
                  <h3 id={`${project.slug}-title`}>{project.title}</h3>
                  <p className="project-period">{project.period}</p>
                </div>
                {project.links && <div className="project-links">{project.links.map(link => <a className="text-link" key={link.href} href={link.href}>{link.label} <span aria-hidden="true">↗</span></a>)}</div>}
              </header>
              <div className="project-body">
                <div className="project-copy">
                  <dl className="project-facts">
                    <div><dt>문제</dt><dd>{project.problem}</dd></div>
                    <div><dt>담당 업무</dt><dd>{project.role}</dd></div>
                    <div><dt>핵심 결정</dt><dd>{project.decision}</dd></div>
                  </dl>
                  <ul className="project-tags" aria-label="기술과 기여 영역">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                </div>
                {project.image ? (
                  <figure className="project-preview preview-board">
                    <a className="preview-window screenshot-link" href={project.image.src} aria-label="채용 보드 실제 화면 크게 보기">
                      <Image className="project-screenshot" src={project.image.src} alt={project.image.alt} width={1265} height={712} unoptimized />
                    </a>
                    <figcaption>{project.image.caption}</figcaption>
                  </figure>
                ) : <ProjectPreview slug={project.slug} />}
              </div>
              <details>
                <summary>구현 자세히 보기</summary>
                <div className="project-detail">
                  {project.details.map(detail => <div key={detail.title}><h4>{detail.title}</h4><p>{detail.description}</p></div>)}
                  {project.scope && <p className="scope-note">{project.scope}</p>}
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section shell" aria-labelledby="experience-title">
        <div className="section-heading"><h2 id="experience-title">Experience</h2></div>
        <ol className="experience-list">
          {experiences.map(experience => (
            <li key={experience.company}>
              <div className="experience-meta"><p>{experience.period}</p><h3>{experience.company}</h3><p>{experience.role}</p></div>
              <div className="experience-content">
                <ul>{experience.contributions.map(contribution => <li key={contribution}>{contribution}</li>)}</ul>
                <p className="experience-stack"><strong>기술 스택</strong> {experience.stack}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="education" className="section shell" aria-labelledby="education-title">
        <div className="section-heading"><h2 id="education-title">Education</h2></div>
        {educationGroups.map(group => (
          <section className="education-group" key={group.id} aria-labelledby={`education-${group.id}`}>
            <h3 id={`education-${group.id}`}>{group.title}</h3>
            <ul className="education-list">
              {group.entries.map(entry => (
                <li key={entry.title}>
                  <div className="education-meta">
                    <p className="education-period">
                      <time dateTime={entry.start}>{entry.start.slice(0, 7).replace("-", ".")}</time>
                      {entry.end && <>–<time dateTime={entry.end}>{entry.end.slice(0, 7).replace("-", ".")}</time></>}
                    </p>
                  </div>
                  <div className="education-content">
                    <h4 className="education-entry-title">{entry.title}</h4>
                    {entry.description && <p>{entry.description}</p>}
                    {entry.project && <div className="education-project">
                      <h5>{entry.project.title}</h5>
                      <p>{entry.project.summary}</p>
                      <ul className="project-tags" aria-label="프로젝트 기술">{entry.project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                      <details>
                        <summary>{entry.project.detailsLabel}</summary>
                        <div className="education-contributions">
                          {entry.project.sections.map(section => <div key={section.title}>
                            <h6>{section.title}</h6>
                            {section.meta && <p className="education-project-meta">{section.meta}</p>}
                            {section.description && <p>{section.description}</p>}
                            <ul className="contribution-list">{section.contributions.map(contribution => <li key={contribution}>{contribution}</li>)}</ul>
                            {section.tags && <ul className="project-tags" aria-label={`${section.title} 기술`}>{section.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
                            {section.href && <a className="text-link" href={section.href}>{section.title} 코드 <span aria-hidden="true">↗</span></a>}
                          </div>)}
                      {entry.project.href && <a className="text-link" href={entry.project.href}>같이달램 코드 <span aria-hidden="true">↗</span></a>}
                        </div>
                      </details>
                    </div>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="shell contact-inner">
          <div><h2 id="contact-title">Contact</h2><p>함께 일할 기회도, 가벼운 대화도 좋습니다.<br />궁금한 점이 있다면 편하게 연락 주세요.</p><a className="text-link" href="mailto:callu_9ine@naver.com">callu_9ine@naver.com</a></div>
          <a className="button button-primary" href={contactHref}>면접 제안 보내기 <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </>
  );
}
