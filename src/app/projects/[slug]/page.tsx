import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/portfolio";

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
    alternates: { canonical: "/" },
    robots: { index: false, follow: true },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const href = `/#${project.slug}`;
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${href}`} />
      <div className="section shell">
        <h1>{project.title}</h1>
        <a className="text-link" href={href}>홈에서 프로젝트 보기 →</a>
      </div>
    </>
  );
}
