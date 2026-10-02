import React, { useState } from 'react';
import { MOCK_ADMIN_METRICS, MOCK_POLICY_PROPOSALS } from '../data/mockInsights';
import { analyzePolicyPlan, generatePolicyProposalWithGemini } from '../services/gemini';
import { PolicyPlanReview, PolicyProposalDraft } from '../types';

export const AdminIntelligenceView: React.FC = () => {
  const metrics = MOCK_ADMIN_METRICS;
  const [proposals, setProposals] = useState<PolicyProposalDraft[]>(MOCK_POLICY_PROPOSALS);
  const [targetIndustry, setTargetIndustry] = useState<string>('제조 AI');
  const [targetBottleneck, setTargetBottleneck] = useState<string>('PMF (시장검증/첫 유상고객)');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [planReview, setPlanReview] = useState<PolicyPlanReview | null>(null);
  const [reviewError, setReviewError] = useState<string>('');

  const handlePolicyPlanUpload = async (file: File) => {
    setIsReviewing(true);
    setReviewError('');
    try {
      setPlanReview(await analyzePolicyPlan(file));
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : '기획서 분석에 실패했습니다.');
    } finally {
      setIsReviewing(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const draft = await generatePolicyProposalWithGemini(targetIndustry, targetBottleneck, 78);
    const newProposal: PolicyProposalDraft = {
      id: `PROP-${Date.now().toString().slice(-4)}`,
      title: draft.title || `경기도 ${targetIndustry} 기업 ${targetBottleneck} 해소 특화 지원사업`,
      targetIndustry: targetIndustry,
      targetCompanyCount: 78,
      identifiedBottleneck: 'PMF',
      problemStatement: draft.problemStatement || `도내 ${targetIndustry} 기업 분석 결과, 대부분의 기업이 ${targetBottleneck}으로 어려움을 겪고 있습니다.`,
      proposedProgramTitle: draft.proposedProgramTitle || `GBSA ${targetIndustry} ${targetBottleneck} Breakthrough Program`,
      supportComponents: draft.supportComponents || ['유상 실증 바우처 지원', '수요기업 1:1 매칭'],
      expectedImpact: draft.expectedImpact || '기업 매출 상승 및 신규 고용 창출',
      targetKPIs: ['유상 전환율 70%', '수요기업 만족도 90점'],
      evidenceDataSummary: `G-BRIDGE AI 축적 데이터: 제조 AI 기업 42개사 중 35개사가 "유상 실증처 부재"를 1순위 애로사항으로 응답함.`,
      createdAt: new Date().toISOString()
    };

    setProposals([newProposal, ...proposals]);
    setIsGenerating(false);
  };

  return (
    <div className="w-full px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">
            Track C · GBSA 관리자 Intelligence & 정책 기획 대시보드
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mt-space-2xs">
            누적 기업 데이터 기반 병목 분석 및 차년도 신규사업 자동 기획
          </h2>
        </div>
        <div className="flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
          <span>누적 {metrics.totalAnalyzedCompanies}개사 실시간 통계 집계 중</span>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg">
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between border border-outline-variant/20">
          <span className="font-label-md text-label-md text-on-surface-variant">누적 분석 기업 수</span>
          <div className="font-data-metric text-data-metric font-black text-primary my-space-xs">
            {metrics.totalAnalyzedCompanies}<span className="font-body-md text-body-md font-normal text-on-surface-variant"> 개사</span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary font-semibold">도내 사업계획서 100% 자산화</span>
        </div>

        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between border border-outline-variant/20">
          <span className="font-label-md text-label-md text-on-surface-variant">T3 이상 상용화 비중</span>
          <div className="font-data-metric text-data-metric font-black text-secondary my-space-xs">
            {(((metrics.temDistribution.technology.T3 + metrics.temDistribution.technology.T4) / metrics.totalAnalyzedCompanies) * 100).toFixed(1)}%
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">168개사 상용화 완료 단계</span>
        </div>

        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between border border-outline-variant/20">
          <span className="font-label-md text-label-md text-on-surface-variant">최대 병목 1위 (PMF)</span>
          <div className="font-data-metric text-data-metric font-black text-error my-space-xs">
            31.5<span className="font-body-md text-body-md font-normal text-on-surface-variant">%</span>
          </div>
          <span className="font-label-sm text-label-sm text-error font-semibold">78개사 유상 첫 고객 확보 지체</span>
        </div>

        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between border border-outline-variant/20">
          <span className="font-label-md text-label-md text-on-surface-variant">B2B 매칭 후보 생성</span>
          <div className="font-data-metric text-data-metric font-black text-primary my-space-xs">
            {metrics.b2bMatchCandidatesCount}<span className="font-body-md text-body-md font-normal text-on-surface-variant"> 건</span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary font-semibold">수요-공급 매칭 활성화</span>
        </div>
      </div>

      {/* 9대 병목 히트맵 & Top 니즈 집계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
        {/* Bottleneck Distribution */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-md border border-outline-variant/20 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-md">
              경기도 기업 9대 성장 병목 히트맵
            </h3>
            <div className="space-y-space-sm">
              {Object.entries(metrics.bottleneckStats).map(([key, count]) => {
                const percent = ((count / metrics.totalAnalyzedCompanies) * 100).toFixed(1);
                return (
                  <div key={key} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-label-sm text-label-sm">
                      <span className="font-bold text-on-surface">{key} (병목)</span>
                      <span className="text-on-surface-variant">{count}개사 ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          key === 'PMF' ? 'bg-error' : key === 'VALIDATION' ? 'bg-secondary' : 'bg-primary'
                        }`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Needs Radar / List */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-md border border-outline-variant/20 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-md">
              기업들의 실제 핵심 협력 니즈 (Needs Radar)
            </h3>
            <div className="space-y-space-md">
              {metrics.topNeeds.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-label-md text-label-md font-bold text-on-surface">{item.need}</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm font-extrabold text-primary">{item.count}개사 요청</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-space-md pt-space-sm border-t border-outline-variant/20 text-right">
            <span className="font-label-sm text-label-sm text-on-surface-variant">단순 R&D 자금보다 실증 및 세일즈 연결 수요 압도적</span>
          </div>
        </div>
      </div>

      <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-md border border-primary/20 flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <span className="font-label-sm text-secondary font-bold uppercase tracking-wide">Policy plan reviewer</span>
            <h3 className="font-headline-md font-bold text-on-surface mt-1">신규 사업기획서 AI 사전심사</h3>
            <p className="font-body-md text-on-surface-variant mt-1">기획서를 넣으면 정책 필요성, 대상 적합성, 사업구조, 예산·KPI와 실행 리스크를 평가합니다.</p>
          </div>
          <label className="shrink-0 inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md rounded-xl bg-primary text-white font-bold cursor-pointer hover:opacity-90">
            <span className="material-symbols-outlined">upload_file</span>
            {isReviewing ? '기획서 분석 중...' : '신규 사업기획서 업로드'}
            <input
              type="file"
              accept="application/pdf,.pdf"
              disabled={isReviewing}
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handlePolicyPlanUpload(file);
                event.target.value = '';
              }}
            />
          </label>
        </div>

        {isReviewing && (
          <div className="p-space-lg rounded-xl bg-primary-container/30 flex items-center gap-space-md text-primary font-bold">
            <span className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            정책 논리와 성과지표의 인과관계를 검증하고 있습니다.
          </div>
        )}
        {reviewError && <div className="p-space-md rounded-xl bg-error/10 text-error font-semibold">{reviewError}</div>}

        {planReview && (
          <div className="flex flex-col gap-space-lg border-t border-outline-variant/20 pt-space-lg">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md">
              <div>
                <div className="flex items-center gap-space-xs mb-space-xs">
                  <span className={`px-space-sm py-1 rounded-full text-xs font-extrabold ${planReview.verdict === 'READY' ? 'bg-secondary-container text-on-secondary-container' : 'bg-error/10 text-error'}`}>{planReview.verdict}</span>
                  <span className="text-sm text-on-surface-variant">종합점수 {planReview.overallScore}/100</span>
                </div>
                <h4 className="font-headline-md font-bold text-on-surface">{planReview.documentTitle}</h4>
                <p className="font-body-md text-on-surface-variant mt-space-xs max-w-4xl leading-7">{planReview.executiveSummary}</p>
              </div>
              <div className="text-5xl font-black text-primary">{planReview.overallScore}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {[
                ['정책 필요성', planReview.policyNeed],
                ['지원대상 적합성', planReview.targetFit],
                ['사업설계 완성도', planReview.programDesign],
                ['기존사업 차별성', planReview.differentiation],
              ].map(([label, item]) => {
                const section = item as PolicyPlanReview['policyNeed'];
                return <article key={label as string} className="p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-xs font-bold text-secondary">{label as string}</span>
                  <h5 className="font-headline-sm font-bold text-on-surface mt-1">{section.headline}</h5>
                  <p className="text-body-sm text-on-surface-variant mt-space-xs leading-6">{section.narrative}</p>
                  <ul className="mt-space-sm text-body-sm text-on-surface space-y-1">{section.implications.map((value) => <li key={value}>→ {value}</li>)}</ul>
                </article>;
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
              <div className="p-space-lg rounded-xl bg-error/5 border border-error/20">
                <h5 className="font-headline-sm font-bold text-error mb-space-sm">제출 전 우선 보완사항</h5>
                <ol className="space-y-space-xs text-body-sm text-on-surface">{planReview.priorityRevisions.map((item, index) => <li key={item}><strong>{index + 1}.</strong> {item}</li>)}</ol>
              </div>
              <div className="p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/20">
                <h5 className="font-headline-sm font-bold text-on-surface mb-space-sm">KPI 검토</h5>
                <div className="space-y-space-xs">{planReview.kpiReview.map((item) => <div key={item.kpi} className="text-body-sm"><strong className="text-primary">{item.kpi}</strong><p className="text-on-surface-variant">{item.assessment} → {item.recommendation}</p></div>)}</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* AI Policy Proposal Generator Controls */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-md border border-outline-variant/20 flex flex-col gap-space-md">
        <div>
          <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wide">
            신규사업 기획 지원 (Policy Planner)
          </span>
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface mt-1">
            GBSA 데이터 기반 차년도 신규 지원사업 기획안 자동 생성기
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            누적된 도내 기업 병목 수치를 바탕으로 담당자가 바로 공문 및 예산 신청서로 활용할 수 있는 기획안 초안을 생성합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mt-space-xs">
          <div>
            <label className="font-label-md text-label-md text-on-surface-variant font-bold block mb-1">
              타겟 산업 분야
            </label>
            <input
              type="text"
              value={targetIndustry}
              onChange={(e) => setTargetIndustry(e.target.value)}
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md focus:border-primary"
            />
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface-variant font-bold block mb-1">
              해결할 핵심 병목
            </label>
            <input
              type="text"
              value={targetBottleneck}
              onChange={(e) => setTargetBottleneck(e.target.value)}
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md focus:border-primary"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleGenerate}
              className="w-full py-space-sm px-space-lg rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:opacity-95 transition flex items-center justify-center gap-space-xs"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  <span>AI 기획안 작성 중...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">auto_awesome</span>
                  <span>신규사업 기획안 생성하기</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Proposals List */}
      <div className="flex flex-col gap-space-lg">
        {proposals.map((prop) => (
          <div key={prop.id} className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-md border border-outline-variant/20 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="px-space-xs py-space-2xs rounded bg-secondary-container text-on-secondary-container font-label-sm font-bold">
                {prop.targetIndustry} · {prop.identifiedBottleneck} 병목 특화
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                생성일시: {new Date(prop.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
              {prop.title}
            </h3>

            <div className="p-space-md rounded-xl bg-surface-container-low">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-bold block mb-1">
                문제 제기 및 추진 필요성:
              </span>
              <p className="font-body-md text-body-md text-on-surface">
                {prop.problemStatement}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="p-space-md rounded-xl bg-surface-container">
                <span className="font-label-sm text-label-sm text-primary font-bold block mb-1">
                  권고 지원 내용:
                </span>
                <ul className="list-disc list-inside text-body-sm text-on-surface space-y-1">
                  {prop.supportComponents.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container">
                <span className="font-label-sm text-label-sm text-secondary font-bold block mb-1">
                  기대 효과 및 목표 KPI:
                </span>
                <p className="font-body-sm text-body-sm text-on-surface mb-1">
                  {prop.expectedImpact}
                </p>
                <div className="flex flex-wrap gap-1">
                  {prop.targetKPIs.map((kpi, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface text-xs font-semibold">
                      ✓ {kpi}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-right pt-space-xs">
              <button
                type="button"
                className="px-space-md py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md font-bold transition border border-outline-variant/30"
                onClick={() => alert(`[${prop.title}] 기획안 한글(HWP)/PDF 문서로 내보냅니다.`)}
              >
                기획안 문서 Export (HWP/PDF)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
