import React, { useState } from 'react';
import { Company, AnalysisResult, SupportProgram } from '../types';
import { MOCK_SUPPORT_PROGRAMS } from '../data/mockPrograms';
import { MOCK_COMPANIES } from '../data/mockCompanies';
import { AnalysisKeywordTags } from '../components/AnalysisKeywordTags';

interface ProgramMatchingViewProps {
  currentCompany?: {
    company: Company;
    analysis: AnalysisResult;
  } | null;
  onSelectProgram?: (program: SupportProgram) => void;
  onNavigateToMatching?: () => void;
}

type RecommendationFilter = 'ALL' | 'RECOMMENDED' | 'CONDITIONAL' | 'NOT_RECOMMENDED';

const recommendationLabel: Record<RecommendationFilter, string> = {
  ALL: '전체 공고',
  RECOMMENDED: '추천',
  CONDITIONAL: '조건부 추천',
  NOT_RECOMMENDED: '비추천',
};

export const ProgramMatchingView: React.FC<ProgramMatchingViewProps> = ({
  currentCompany,
  onNavigateToMatching
}) => {
  const activeTarget = currentCompany || MOCK_COMPANIES[0];
  const { company, analysis } = activeTarget;
  const [selectedFilter, setSelectedFilter] = useState<RecommendationFilter>('RECOMMENDED');
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);

  // Compute matched programs for this specific company
  const matchedPrograms = MOCK_SUPPORT_PROGRAMS.map((prog) => {
    let score = prog.demoRecommendation === 'RECOMMENDED' ? 90 : prog.demoRecommendation === 'CONDITIONAL' ? 70 : 35;
    const isBottleneckMatched = prog.targetBottlenecks.includes(analysis.primaryBottleneck);
    if (isBottleneckMatched) score += 25;
    if (prog.category === '실증/PoC' && analysis.primaryBottleneck === 'PMF') score += 5;
    if (prog.category === 'R&D' && analysis.primaryBottleneck === 'TECH') score += 5;
    if (prog.category === '인증/규제' && analysis.primaryBottleneck === 'REGULATION') score += 5;

    return {
      ...prog,
      matchScore: Math.min(score, 98),
      recommendation: prog.demoRecommendation || (isBottleneckMatched ? 'RECOMMENDED' : 'CONDITIONAL'),
      isRecommended: (prog.demoRecommendation || (isBottleneckMatched ? 'RECOMMENDED' : 'CONDITIONAL')) === 'RECOMMENDED',
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const displayedPrograms = selectedFilter === 'ALL'
    ? matchedPrograms
    : matchedPrograms.filter((p) => p.recommendation === selectedFilter);

  const handleGenerateApplication = (progTitle: string) => {
    setGeneratedDraft(
      `[GBSA 지원사업 신청 사유서 초안 - ${company.name}]\n\n` +
      `■ 지원사업명: ${progTitle}\n` +
      `■ 신청 기업: ${company.name} (소재지: ${company.location})\n` +
      `■ 핵심 기술 및 제품: ${company.summary}\n` +
      `■ 현 성장단계(T/E/M): ${analysis.temDiagnosis.technology.level} / ${analysis.temDiagnosis.execution.level} / ${analysis.temDiagnosis.market.level}\n` +
      `■ 신청 사유 및 시급성: 본 기업은 현재 ${analysis.primaryBottleneck} 병목에 직면해 있습니다. ${analysis.supportGapAnalysis}\n` +
      `■ 본 과제를 통한 기대 목표: 90일 이내 ${analysis.actionPlan90Days[0]?.action || '유상 실증 1건 달성'} 및 매출 다각화`
    );
  };

  return (
    <div className="w-full px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-6xl mx-auto animate-fadeIn">
      {/* Target Company Banner */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xl">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
          <div>
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-bold">
                진단 연계 기업
              </span>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                {company.name}
              </h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              핵심 병목: <strong className="text-error font-bold">{analysis.primaryBottleneck}</strong> (
              {analysis.temDiagnosis.technology.level}·{analysis.temDiagnosis.execution.level}·{analysis.temDiagnosis.market.level})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          {onNavigateToMatching && (
            <button
              type="button"
              onClick={onNavigateToMatching}
              className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md font-bold transition border border-outline-variant/30"
            >
              <span>다음: B2B 기업 매칭 확인하기</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest px-space-lg py-space-md shadow-sm">
        <AnalysisKeywordTags company={company} analysis={analysis} label="진단 연계 키워드" />
      </div>

      {/* Track A Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">
            Track A · GBSA 맞춤형 공공 지원사업 매칭 엔진
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mt-space-2xs">
            {company.name}의 {analysis.primaryBottleneck} 병목 해소를 위한 최적 지원사업
          </h2>
        </div>

        {/* Recommendation Filters */}
        <div className="flex flex-wrap items-center gap-space-xs">
          {(['RECOMMENDED', 'CONDITIONAL', 'NOT_RECOMMENDED', 'ALL'] as RecommendationFilter[]).map((filter) => {
            const count = filter === 'ALL' ? matchedPrograms.length : matchedPrograms.filter((p) => p.recommendation === filter).length;
            return <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`px-space-md py-space-xs rounded-xl font-label-sm text-label-sm font-bold transition ${
                selectedFilter === filter
                  ? filter === 'RECOMMENDED' ? 'bg-secondary text-white shadow-md' : filter === 'NOT_RECOMMENDED' ? 'bg-slate-600 text-white shadow-md' : 'bg-primary text-white shadow-md'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {filter === 'RECOMMENDED' ? '✓ ' : filter === 'NOT_RECOMMENDED' ? '× ' : ''}{recommendationLabel[filter]} ({count})
            </button>;
          })}
        </div>
      </div>

      {/* Application Draft Modal / Preview */}
      {generatedDraft && (
        <div className="p-space-xl rounded-2xl bg-surface-container-lowest shadow-xl border-2 border-primary animate-fadeIn flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
              AI 지원 사유서 초안 자동 완성
            </span>
            <button
              type="button"
              onClick={() => setGeneratedDraft(null)}
              className="text-on-surface-variant hover:text-on-surface text-sm font-bold"
            >
              닫기 ✕
            </button>
          </div>
          <pre className="p-space-md rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface whitespace-pre-wrap leading-relaxed border border-outline-variant/30">
            {generatedDraft}
          </pre>
          <div className="flex justify-end gap-space-xs">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(generatedDraft);
                alert('지원 사유서가 클립보드에 복사되었습니다.');
              }}
              className="px-space-md py-space-xs rounded-xl bg-primary text-white font-label-md font-bold shadow-md hover:opacity-90 transition"
            >
              초안 복사하기
            </button>
          </div>
        </div>
      )}

      {/* Matched Programs Cards List */}
      <div className="flex flex-col gap-space-lg">
        {displayedPrograms.map((prog, idx) => (
          <div
            key={prog.id}
            className={`p-space-xl rounded-2xl bg-surface-container-lowest shadow-md border transition flex flex-col justify-between ${
              idx === 0 && prog.recommendation === 'RECOMMENDED'
                ? 'border-2 border-secondary shadow-xl'
                : 'border-outline-variant/20 hover:border-primary/40'
            }`}
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-space-xs mb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-xs py-space-2xs rounded bg-surface-container text-on-surface-variant font-label-sm font-bold">
                    {prog.organization}
                  </span>
                  <span className="px-space-xs py-space-2xs rounded bg-secondary-container text-on-secondary-container font-label-sm font-bold">
                    {prog.category}
                  </span>
                  <span className={`px-space-xs py-space-2xs rounded-full font-label-sm font-bold ${prog.recommendation === 'RECOMMENDED' ? 'bg-secondary-container text-on-secondary-container' : prog.recommendation === 'CONDITIONAL' ? 'bg-primary-fixed text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                    {prog.recommendation === 'RECOMMENDED' ? '추천' : prog.recommendation === 'CONDITIONAL' ? '조건부 추천' : '비추천'}
                  </span>
                  {idx === 0 && prog.recommendation === 'RECOMMENDED' && (
                    <span className="px-space-xs py-space-2xs rounded-full bg-error text-white font-label-sm font-black animate-pulse">
                      1순위 최우선 매칭 (적합도 {prog.matchScore}%)
                    </span>
                  )}
                </div>

                <div className="font-headline-md text-headline-md font-extrabold text-primary">
                  최대 {prog.budgetMaxMillion}만원
                </div>
              </div>

              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-space-xs">
                {prog.title}
              </h3>
              <div className="flex flex-wrap items-center gap-space-xs mb-space-md text-[11px] text-on-surface-variant">
                {prog.sourceName && <span>원문: {prog.sourceName}</span>}
                {prog.sourceUrl && <a href={prog.sourceUrl} target="_blank" rel="noreferrer" className="text-primary font-bold hover:underline">공고 원문 보기 ↗</a>}
                {prog.sourceNote && <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">{prog.sourceNote}</span>}
              </div>

              {/* Match Reason Banner */}
              <div className="p-space-md rounded-xl bg-surface-container-low mb-space-md border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-primary font-bold block mb-1">
                  💡 GBSA AI 진단 기반 추천 사유:
                </span>
                <p className="font-body-sm text-body-sm text-on-surface">
                  {prog.demoFitReason || `${company.name}의 핵심 병목인 [${analysis.primaryBottleneck}]을 해결하기 위해 최적화된 사업입니다.`}
                </p>
              </div>

              {/* Eligibility Checklist */}
              <div className="mb-space-md">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold block mb-space-2xs">
                  신청 자격 검증 (Hard Filter 통과 여부):
                </span>
                <ul className="space-y-1">
                  {prog.eligibilityCriteria.map((crit, cIdx) => (
                    <li key={cIdx} className="flex items-center gap-2 text-body-sm text-on-surface">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-space-md border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-space-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                접수 마감일: <strong className="text-on-surface">{prog.applicationDeadline}</strong>
              </span>

              <span className={`font-label-sm font-bold ${prog.status === 'OPEN' ? 'text-secondary' : 'text-on-surface-variant'}`}>
                {prog.status === 'OPEN' ? '현재 접수 가능' : prog.status === 'CLOSED' ? '접수 종료·다음 공고 참고' : '접수 예정'}
              </span>

              <div className="flex items-center gap-space-xs w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => handleGenerateApplication(prog.title)}
                  className="w-full md:w-auto px-space-lg py-space-xs rounded-xl bg-primary text-on-primary font-label-md font-bold shadow-md hover:opacity-90 transition"
                >
                  신청 사유서 AI 자동 생성
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
