import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

const slugs = ["frontend-contract-handoff", "work-support-platform", "recruitment-pipeline-board"];

describe("single-page portfolio", () => {
  it("keeps each project and its expandable explanation on the home page", () => {
    const { container } = render(<Home />);
    expect(Array.from(container.querySelectorAll("article"), article => article.id)).toEqual(slugs);
    for (const slug of slugs) {
      const article = container.querySelector(`#${slug}`)!;
      expect(article.querySelectorAll("dl dt")).toHaveLength(3);
      expect(article.querySelector("details > summary")).toHaveTextContent("구현 자세히 보기");
      expect(article.querySelector("details")).not.toHaveAttribute("open");
      expect(article.querySelector(".project-copy details")).toBeNull();
      expect(article.querySelectorAll(".project-body + details .scope-note")).toHaveLength(slug === "recruitment-pipeline-board" ? 1 : 0);
    }
    expect(container.querySelector('a[href^="/projects/"]')).toBeNull();
    expect(screen.queryByRole("heading", { name: "핵심 역량" })).not.toBeInTheDocument();
  });

  it("features an actual screenshot and the public demo and source", () => {
    render(<Home />);
    const board = within(screen.getByRole("article", { name: "채용 단계 관리 보드" }));
    expect(board.getByRole("img")).toHaveAttribute("src", "/images/recruitment-board.png");
    expect(board.getByRole("link", { name: /데모 보기/ })).toHaveAttribute("href", "https://callu9.github.io/recruitment-pipeline-board-fe/");
    expect(board.getByRole("link", { name: /코드 보기/ })).toHaveAttribute("href", "https://github.com/callu9/recruitment-pipeline-board-fe");
  });

  it("leads with product work and restores both public work mockups", () => {
    render(<Home />);
    const title = screen.getByRole("heading", { level: 1 });
    expect(title.innerHTML).toBe("복잡한 업무 흐름을 구조화하는<br><span>Product Engineer</span>");
    expect(screen.getByText("Product Engineer · React / Next.js")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("프론트엔드");
    expect(screen.getByRole("region", { name: /분석 제품 목업/ })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /업무지원 운영 목업/ })).toBeInTheDocument();
    expect(screen.getAllByText("공개용 재구성 · 실제 내부 제품 화면이 아닙니다.")).toHaveLength(2);
  });

  it("keeps the final work mockup and uses the same card structure for all projects", () => {
    const { container } = render(<Home />);
    const analysis = container.querySelector("#frontend-contract-handoff .project-preview")!;
    expect(analysis.querySelectorAll(".review-steps > *")).toHaveLength(3);
    expect(analysis.querySelectorAll(".review-fields > div")).toHaveLength(2);
    expect(analysis.querySelector(".review-next")).toHaveTextContent("다음 행동 판단");
    expect(container.querySelectorAll("#work-support-platform .operation-row")).toHaveLength(3);
    for (const slug of slugs) {
      const article = container.querySelector(`#${slug}`)!;
      expect(article.className).toBe("project");
      expect(article.querySelector(".project-body > :first-child")).toHaveClass("project-copy");
      expect(article.querySelector(".project-body > :last-child")).toHaveClass("project-preview");
    }
  });

  it("omits internal work scope notes while preserving dates and the board scope", () => {
    render(<Home />);
    expect(screen.getAllByText(/관련 재직 기간/)).toHaveLength(2);
    expect(screen.queryByText(/실제 백엔드 연동과 운영 성과는 포함하지/)).not.toBeInTheDocument();
    expect(screen.queryByText("회사·고객 정보와 내부 화면·코드는 공개하지 않습니다.")).not.toBeInTheDocument();
    expect(screen.getByText(/MSW·localStorage 기반 데모입니다/)).toBeInTheDocument();
    expect(screen.getByText(/운영 화면 자동 갱신/)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /면접 제안/ })).toHaveLength(2);
  });

  it("includes all three training programs, the degree and OPIc with ledger dates", () => {
    const { container } = render(<Home />);
    const education = within(screen.getByRole("region", { name: "Education" }));
    for (const title of [
      "코드잇 스프린트 프론트엔드 단기심화 11기",
      "코드잇 스프린트 프론트엔드 부트캠프 14기",
      "삼성 청년 SW 아카데미(SSAFY) 5기",
      "서울과학기술대학교",
      "OPIc IH",
    ]) expect(education.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(education.getByText(/전자IT미디어공학과 공학사/)).toHaveTextContent("문예창작학과 부전공");
    for (const date of ["2025-09-03", "2025-11-06", "2024-12", "2025-06", "2021-01-02", "2021-10-26", "2016-03-02", "2021-02-24", "2026-05-27"]) {
      expect(container.querySelector(`#education time[datetime="${date}"]`)).not.toBeNull();
    }
    expect(education.getByRole("link", { name: /같이달램 코드/, hidden: true })).toHaveAttribute("href", "https://github.com/codeit-sprint11-team-6/nextjs-gati-dallem");
    expect(container.textContent).not.toMatch(/CLAIM-|EVD-/);
  });

  it("groups education and keeps project summaries visible with native contribution details", () => {
    render(<Home />);
    const education = within(screen.getByRole("region", { name: "Education" }));
    for (const name of ["교육 과정", "학력", "어학"]) {
      expect(education.getByRole("heading", { level: 3, name })).toBeInTheDocument();
    }
    for (const summary of [
      "참여한 모임 조회·취소와 찜한 모임 화면을 구현하고, API 응답 검증·공통 UI·기능별 테스트를 구성했습니다.",
      "팬덤 플랫폼, 협업 보드, 체험 예약 서비스의 사용자 화면과 API 연동·상태 관리를 구현했습니다.",
    ]) expect(education.getByText(summary).closest("details")).toBeNull();
    expect(education.getByText("같이달램 코드").closest("details")?.querySelector("summary")).toHaveTextContent("프로젝트 기여 보기");
    for (const label of ["프로젝트 기여 보기", "프로젝트별 기여 보기"]) {
      const details = education.getByText(label).closest("details");
      expect(details).not.toHaveAttribute("open");
    }
    for (const [name, href] of [
      ["Fandom-K 코드", "https://github.com/codeit-fe-14-first-project-team2/fandom-k"],
      ["Taskify 코드", "https://github.com/FE14-Team7-Taskify/Taskify"],
      ["GlobalNomad 코드", "https://github.com/FE14-part4-team4-globalnomad/GlobalNomad"],
    ]) expect(education.getByText(name).closest("a")).toHaveAttribute("href", href);
  });

  it("invites conversation while retaining both interview links", () => {
    render(<Home />);
    const contact = within(screen.getByRole("region", { name: "Contact" }));
    expect(contact.getByText(/함께 일할 기회도, 가벼운 대화도 좋습니다./)).toHaveTextContent("궁금한 점이 있다면 편하게 연락 주세요.");
    for (const link of screen.getAllByRole("link", { name: /면접 제안 보내기/ })) {
      expect(link).toHaveAttribute("href", "mailto:callu_9ine@naver.com?subject=포트폴리오를 보고 연락드립니다");
      expect(link).toHaveClass("button", "button-primary");
    }
  });

  it("keeps project details scoped and records chart consolidation in experience", () => {
    render(<Home />);
    const analysis = within(screen.getByRole("article", { name: "OpenAPI로 개발 기준을, 도움말로 사용 흐름을 설계하다" }));
    for (const heading of ["작업 재개와 저장 실패 복구", "일부 조회가 실패해도 결과 유지", "결과·리포트·PDF의 차트", "공통 UI와 패키지 검증"]) {
      expect(analysis.queryByText(heading)).not.toBeInTheDocument();
    }
    expect(screen.getByText(/프론트엔드·백엔드 개발 병행/)).toBeInTheDocument();
    expect(screen.getByText("신용카드 결제 서버 기능과 Android POS 정산 화면 구현")).toBeInTheDocument();
    const experience = screen.getByRole("region", { name: "Experience" });
    expect(within(experience).getAllByText("기술 스택")).toHaveLength(3);
    expect(within(experience).getByText("결과·리포트·PDF 차트 공통화와 입력·계산·렌더링 책임 분리")).toBeInTheDocument();
    for (const removed of ["결제·거래 데이터 기반 단위·통합 검증", "검토용 화면군 통합과 E2E 절차·결과·결함 기록 및 출시 전 평가 기준 정리", "C# 결제 로직 분석", "Oracle DB"]) {
      expect(experience).not.toHaveTextContent(removed);
    }
    expect(experience.querySelector(".experience-stack")).toHaveTextContent("백엔드: Python");
  });
});
