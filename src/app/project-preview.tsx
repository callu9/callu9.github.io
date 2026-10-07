export default function ProjectPreview({ slug }: { slug: string }) {
  const analysis = slug === "frontend-contract-handoff";
  return (
    <figure className={`project-preview ${analysis ? "preview-analysis" : "preview-operations"}`}>
      <div
        role={analysis ? "region" : "img"}
        aria-label={analysis
          ? "공개용 분석 제품 목업: 검수 요청, 입력·응답 상태와 다음 행동, MSW 및 OpenAPI·TypeScript 연동 기준"
          : "공개용 업무지원 운영 목업: 현장 요청 접수, 담당자 연결과 처리 상태 공유"}
      >
        <div className="preview-window" aria-hidden={analysis ? undefined : true} data-context-help={analysis ? "" : undefined}>
          <div className="preview-bar"><span className="window-dots">● ● ●</span><span>WORK / FLOW</span></div>
          {analysis ? (
            <div className="preview-screen">
              <div className="preview-heading">
                <p className="preview-kicker">분석 제품 · 검수 작업</p>
                <button className="help-trigger" type="button" aria-label="도움말" aria-expanded="false" aria-controls="review-help-panel">?</button>
              </div>
              <p className="preview-title">입력부터 결과 확인까지.</p>
              <div className="review-steps"><strong>입력 조건</strong><span>응답 검토</span><span>결과 확인</span></div>
              <div className="review-fields">
                <div data-help-id="review-input"><small>검수 요청</small><strong>입력 상태 확인</strong></div>
                <div data-help-id="review-response"><small>가상 응답</small><strong>응답·오류 상태</strong></div>
              </div>
              <p className="review-next" data-help-id="review-next">검수 상태 확인 <span>→</span> 다음 행동 판단</p>
              <div className="contract-path"><span>MSW 응답</span><b>→</b><span>화면 상태·동작 검토</span></div>
              <div className="contract-file"><strong>OpenAPI → TypeScript</strong><small>이후 연동 기준 · 산출물 최신 상태 검사</small></div>
              <aside className="mock-help-panel" id="review-help-panel" aria-labelledby="review-help-title" hidden>
                <div className="mock-help-head">
                  <strong id="review-help-title">검수 화면 도움말</strong>
                  <button type="button" data-help-close aria-label="도움말 닫기">닫기</button>
                </div>
                <div className="mock-help-summary">
                  <strong>이 화면에서 할 일</strong>
                  <p>입력 조건과 응답 상태를 확인하고 다음 행동을 판단합니다.</p>
                  <strong>완료 조건</strong>
                  <p>입력·응답에 오류가 없는지 확인한 뒤 결과 확인으로 진행합니다.</p>
                </div>
                {[
                  ["review-input", "입력 조건 확인", "검수 요청의 입력 상태를 먼저 확인합니다."],
                  ["review-response", "응답과 오류 확인", "가상 응답으로 정상·오류 상태를 확인합니다."],
                  ["review-next", "다음 행동 판단", "오류가 있다면 수정 후 재검토하고, 확인이 끝나면 결과로 진행합니다."],
                ].map(([target, title, description], index) => (
                  <button className="mock-help-item" type="button" data-help-target={target} aria-pressed="false" key={target}>
                    <span aria-hidden="true">{index + 1}</span>
                    <span><strong>{title}</strong><span>{description}</span></span>
                  </button>
                ))}
              </aside>
            </div>
          ) : (
            <div className="preview-screen">
              <p className="preview-kicker">매장 · 지원 조직 · 현장 엔지니어</p>
              <p className="preview-title">접수부터 처리까지 함께 확인.</p>
              <div className="operation-row"><span>01</span><strong>현장 요청</strong><em>접수</em></div>
              <div className="operation-row"><span>02</span><strong>담당자 연결</strong><em>처리 중</em></div>
              <div className="operation-row"><span>03</span><strong>운영 화면</strong><em>상태 갱신</em></div>
              <p className="preview-footnote">기존: 전화 → 메모장 → 시스템 재입력<br />반영: 현장 사용자의 모바일 접근·상태 공유</p>
            </div>
          )}
        </div>
      </div>
      <figcaption>공개용 재구성 · 실제 내부 제품 화면이 아닙니다.</figcaption>
    </figure>
  );
}
