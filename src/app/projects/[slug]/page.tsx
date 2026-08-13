import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contactHref, getProject, projects } from "@/data/portfolio";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}/`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);

  if (!project) notFound();

  return (
    <article className="case-study">
      <header className="case-hero">
        <div className="shell case-hero-inner">
          <Link className="case-back-link" href="/#projects">
            ← 대표 프로젝트
          </Link>
          <div>
            <p className="eyebrow">Selected project</p>
            <p className="project-label">{project.label}</p>
            <h1>{project.title}</h1>
            <p className="case-summary">{project.summary}</p>
            <dl className="case-facts">
              <div>
                <dt>기간</dt>
                <dd>{project.period}</dd>
              </div>
              <div>
                <dt>역할</dt>
                <dd>{project.role[0]}</dd>
              </div>
              <div>
                <dt>핵심 문제</dt>
                <dd>{project.problem[0]}</dd>
              </div>
              <div>
                <dt>검증 결과</dt>
                <dd>{project.results[0]}</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <div className="shell case-content">
        <CaseSection
          id="overview"
          number="01"
          title="프로젝트 개요"
          items={project.overview}
        />
        <CaseSection
          id="problem"
          number="02"
          title="문제와 제약"
          items={project.problem}
          tone="lavender"
        />
        <CaseSection
          id="role"
          number="03"
          title="역할과 기여 범위"
          items={project.role}
        />

        <CaseSection
          id="results"
          number="04"
          title="검증 가능한 결과"
          items={project.results}
          tone="mint"
        />

        <section className="case-section" aria-labelledby="decisions-title">
          <div className="case-section-title">
            <p>05</p>
            <h2 id="decisions-title">핵심 결정과 선택 이유</h2>
          </div>
          <div className="decision-list">
            {project.decisions.map((decision) => (
              <article key={decision.title}>
                <h3>{decision.title}</h3>
                <p>{decision.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section case-visual" aria-labelledby="flow-title">
          <div className="case-section-title">
            <p>06</p>
            <h2 id="flow-title">공개용 UI·흐름</h2>
          </div>
          <figure>
            <ol className="flow-list">
              {project.flow.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">{index + 1}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
            <figcaption>{project.flowCaption}</figcaption>
          </figure>
        </section>

        <CaseSection
          id="omissions"
          number="07"
          title="일반화하거나 생략한 범위"
          items={project.omissions}
          tone="coral"
        />

        <footer className="case-footer">
          <div>
            <h2>더 자세한 판단 과정이 궁금하신가요?</h2>
            <p>공개 가능한 범위에서 면접 중 구체적으로 설명드리겠습니다.</p>
          </div>
          <div className="case-actions">
            <Link className="button button-secondary" href="/#projects">
              프로젝트 목록으로
            </Link>
            <a className="button button-primary" href={contactHref}>
              면접 제안 보내기
            </a>
          </div>
        </footer>
      </div>
    </article>
  );
}

function CaseSection({
  id,
  number,
  title,
  items,
  tone,
}: {
  id: string;
  number: string;
  title: string;
  items: string[];
  tone?: "lavender" | "mint" | "coral";
}) {
  return (
    <section
      className={`case-section${tone ? ` tone-${tone}` : ""}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="case-section-title">
        <p>{number}</p>
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      <ul className="case-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
