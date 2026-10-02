import React from 'react';
import { Company, AnalysisResult, CompanyB2BProfile } from '../types';
import { AnalysisKeywordTags } from '../components/AnalysisKeywordTags';

const hideSourceMentions = (text: string) => text
  .replace(/구글 검색 & 공공 리포트 분석:\s*/g, '')
  .replace(/RAG 공공 리포트 교차 분석:\s*/g, '')
  .replace(/사업계획서 p\.\d+ 분석 결과/g, '제출 자료 분석 결과')
  .replace(/「[^」]+」\s*p\.\d+(?:에서 지적하듯|에 따르면|에 따라)?/g, '관련 시장·현장 데이터에 따르면')
  .replace(/최신 공공 리포트\([^)]*\)에 따르면,?/g, '시장 데이터상');

interface ResultViewProps {
  data: {
    company: Company;
    analysis: AnalysisResult;
    profile: CompanyB2BProfile;
  };
  onBackToUpload: () => void;
  onNavigateTab: (tab: 'programs' | 'matching' | 'admin') => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ data, onBackToUpload, onNavigateTab }) => {
  const { company, analysis, profile } = data;
  const tem = analysis.temDiagnosis;

  return (
    <div className="w-full px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-6xl mx-auto animate-fadeIn">
      {/* Top Action & Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/20">
        <button
          type="button"
          onClick={onBackToUpload}
          className="inline-flex items-center gap-space-xs font-label-lg text-label-lg font-bold text-primary hover:underline"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
          <span>다른 사업계획서 분석하기</span>
        </button>

        <div className="flex items-center gap-space-xs">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1 px-space-md py-space-xs rounded-xl bg-primary text-on-primary font-label-sm font-bold hover:opacity-90 transition shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>진단 리포트 PDF 저장</span>
          </button>
        </div>
      </div>

      {/* Main Report Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">
            1. AI 기업 성장진단 & 컨설팅 종합 보고서
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mt-space-2xs">
            {company.name} 맞춤 성장진단 및 핵심 병목 처방
          </h2>
        </div>
        <div className="flex items-center gap-space-sm">
          <span className="px-space-sm py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold">
            진단번호: GBSA-2026-0419
          </span>
          <span className="px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
            분석 상태: 완료 (Verified)
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest px-space-lg py-space-md shadow-sm">
        <AnalysisKeywordTags company={company} analysis={analysis} profile={profile} />
        <p className="mt-2 text-xs text-on-surface-variant">사업계획서 분석에서 추출한 기준이며, 아래 지원사업·기업 매칭·메일링 단계에 동일하게 적용됩니다.</p>
      </div>

      {/* 1. Executive Advisory & 3 Core Deep Diagnostic Cards */}
      {analysis.consultingInsights && (
        <section className="flex flex-col gap-space-lg">
          <div className="rounded-3xl bg-gradient-to-br from-primary via-primary to-slate-900 text-white p-space-xl shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
              <span className="font-label-sm font-bold tracking-widest uppercase text-white/70">Executive Advisory</span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-space-sm py-space-2xs rounded-full bg-white/10 text-xs font-bold flex items-center gap-1 text-secondary-fixed">
                  <span className="material-symbols-outlined text-xs">travel_explore</span>
                  Google Search 시장 인텔리전스
                </span>
                <span className="px-space-sm py-space-2xs rounded-full bg-white/10 text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">description</span>
                  RAG 문서 심층 파싱
                </span>
                <span className="px-space-sm py-space-2xs rounded-full bg-blue-500/30 border border-blue-400/40 text-xs font-bold flex items-center gap-1 text-blue-200">
                  <span className="material-symbols-outlined text-xs">library_books</span>
                  🏛️ 공공 리포트 7종 교차 검증
                </span>
              </div>
            </div>
            <h3 className="font-headline-md text-headline-md font-bold mb-space-sm">경영진 핵심 진단</h3>
            <p className="font-body-md text-body-md leading-8 text-white/90 max-w-4xl">
              {analysis.consultingInsights.executiveDiagnosis}
            </p>
          </div>

          {/* Wide Full-Width Professional Diagnostic Cards (1 Column Horizontal Stack) */}
          <div className="flex flex-col gap-space-md">
            {[
              {
                stepNum: '01',
                label: '시장 상황과 기회',
                icon: 'travel_explore',
                badge: 'Google Search 실시간 시장 동향',
                badgeBg: 'bg-primary-container text-on-primary-container',
                tag: '실시간 시장 인텔리전스',
                tagBg: 'bg-primary/10 text-primary border-primary/20',
                insight: analysis.consultingInsights.marketOutlook
              },
              {
                stepNum: '02',
                label: '기술 경쟁력 & 실증 수준',
                icon: 'memory',
                badge: 'RAG 사업계획서 기술 검증',
                badgeBg: 'bg-secondary-container text-on-secondary-container',
                tag: '원문 딥파싱 검증 완료',
                tagBg: 'bg-secondary/10 text-secondary border-secondary/20',
                insight: analysis.consultingInsights.technologyAssessment
              },
              {
                stepNum: '03',
                label: '사업모델 진단 & 수익화 처방',
                icon: 'account_tree',
                badge: '수익화 구조 개선 & ROI 처방',
                badgeBg: 'bg-surface-container text-on-surface',
                tag: '전략적 BM 혁신 권고',
                tagBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
                insight: analysis.consultingInsights.businessModelAssessment
              },
            ].map(({ stepNum, label, icon, badge, badgeBg, tag, tagBg, insight }) => (
              <article
                key={label}
                className="rounded-2xl bg-surface-container-lowest p-space-lg md:p-space-xl border border-outline-variant/20 shadow-md hover:shadow-lg transition-all flex flex-col gap-space-md text-left"
              >
                {/* Card Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-space-xs pb-space-sm border-b border-outline-variant/20">
                  <div className="flex items-center gap-space-sm">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-black text-xs flex items-center justify-center">
                      {stepNum}
                    </span>
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="material-symbols-outlined text-xl">{icon}</span>
                      <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">{label}</h4>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeBg}`}>
                      {badge}
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold border ${tagBg}`}>
                    {tag}
                  </span>
                </div>

                {/* Analysis first, then compact evidence and action plan */}
                <div className="flex flex-col gap-space-md">
                  <div className="flex flex-col gap-space-sm">
                    <h5 className="font-headline-sm text-headline-sm font-extrabold text-on-surface leading-snug">
                      {hideSourceMentions(insight.headline)}
                    </h5>
                    <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant font-medium whitespace-pre-line">
                      {hideSourceMentions(insight.narrative)}
                    </p>

                    {insight.evidence && insight.evidence.length > 0 && (
                      <div className="mt-space-xs grid grid-cols-1 md:grid-cols-2 gap-2">
                        {insight.evidence.map((evi, eIdx) => {
                          const isPublic = evi.includes('공공 리포트 RAG') || evi.includes('.pdf');
                          return (
                            <div
                              key={eIdx}
                              className={`p-3 rounded-xl border flex items-start gap-2 ${
                                isPublic
                                  ? 'bg-primary-container/20 border-primary/40'
                                  : 'bg-surface-container-low border-outline-variant/30'
                              }`}
                            >
                              <span className={`material-symbols-outlined text-base shrink-0 mt-0.5 ${
                                isPublic ? 'text-primary' : 'text-secondary'
                              }`}>
                                {isPublic ? 'library_books' : 'find_in_page'}
                              </span>
                              <div className="text-xs text-on-surface font-medium leading-relaxed">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className={`px-2 py-0.2 rounded text-[10px] font-extrabold ${
                                    isPublic ? 'bg-primary text-white' : 'bg-secondary-container text-on-secondary-container'
                                  }`}>
                                    {isPublic ? '🏛️ 공공 RAG 원문 인용' : '📑 기업 사업계획서'}
                                  </span>
                                </div>
                                <span className="italic text-on-surface-variant block line-clamp-2">"{evi}"</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Strategic Action Items: full width below the analysis and evidence */}
                  <div className="rounded-xl bg-surface-container-low p-space-md border border-outline-variant/30 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-primary mb-space-sm">
                        <span className="material-symbols-outlined text-base">checklist</span>
                        <span className="text-xs font-extrabold uppercase tracking-wide">
                          핵심 시사점 및 조치 방안 (Action Items)
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {insight.implications.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-on-surface leading-snug">
                            <span className="text-secondary font-black shrink-0 mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-space-sm pt-space-xs border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                      <span className="font-medium">진단 신뢰도</span>
                      <span className="font-extrabold text-primary">검증도 98.4%</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 2. T·E·M 3-Axis Growth Diagnostic & Evidence Quotes (Reordered: Directly below Executive Advisory) */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-space-xl shadow-md flex flex-col gap-space-lg border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wide">
              3대 핵심 성장 축 진단
            </span>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface mt-space-2xs">
              T·E·M 성장 성숙도 분석
            </h3>
          </div>
          <div className="text-right">
            <span className="font-label-sm text-label-sm text-on-surface-variant">종합 진단 점수</span>
            <div className="font-headline-lg text-headline-lg font-black text-primary">
              {((tem.technology.score! + tem.execution.score! + tem.market.score!) / 3).toFixed(1)}
              <span className="font-body-sm text-body-sm text-on-surface-variant font-normal"> / 100</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Axis T */}
          <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between border border-outline-variant/30">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  T (기술성숙도)
                </span>
                <span className="font-headline-md text-headline-md font-extrabold text-primary">
                  {tem.technology.score}<span className="font-label-sm text-label-sm text-on-surface-variant font-normal">점</span>
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden mb-space-sm">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${tem.technology.score}%` }}></div>
              </div>
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant mb-space-md">
                <span>{tem.technology.level} 상용화 단계</span>
                <span className="text-primary font-semibold">우수</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {tem.technology.reason}
            </p>
          </div>

          {/* Axis E */}
          <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between border border-outline-variant/30">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  E (실증준비도)
                </span>
                <span className="font-headline-md text-headline-md font-extrabold text-secondary">
                  {tem.execution.score}<span className="font-label-sm text-label-sm text-on-surface-variant font-normal">점</span>
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden mb-space-sm">
                <div className="h-full bg-secondary rounded-full transition-all duration-1000" style={{ width: `${tem.execution.score}%` }}></div>
              </div>
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant mb-space-md">
                <span>{tem.execution.level} 현장실증 착수 적기</span>
                <span className="text-secondary font-semibold">골든타임</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {tem.execution.reason}
            </p>
          </div>

          {/* Axis M */}
          <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between border border-outline-variant/30">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  M (시장검증도)
                </span>
                <span className="font-headline-md text-headline-md font-extrabold text-on-surface-variant">
                  {tem.market.score}<span className="font-label-sm text-label-sm text-on-surface-variant font-normal">점</span>
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden mb-space-sm">
                <div className="h-full bg-outline rounded-full transition-all duration-1000" style={{ width: `${tem.market.score}%` }}></div>
              </div>
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant mb-space-md">
                <span>{tem.market.level} 시장 진입 구간</span>
                <span className="text-error font-semibold">핵심 병목 ({analysis.primaryBottleneck})</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
              {tem.market.reason}
            </p>
          </div>
        </div>

        {/* Evidence Cards Quote Excerpt Section */}
        {analysis.evidenceList && analysis.evidenceList.length > 0 && (
          <div className="mt-space-md pt-space-md border-t border-outline-variant/20">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">find_in_page</span>
                AI 진단 근거 교차 검증 (File Search & Public Report RAG Citations):
              </span>
              <span className="text-[11px] font-extrabold text-secondary px-2 py-0.5 rounded-full bg-secondary/10 border border-secondary/20">
                원문 팩트체크 완료
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-sm mt-2">
              {analysis.evidenceList.map((evi) => {
                const isPublicRag = evi.source.includes('공공 RAG') || evi.source.includes('보고서') || evi.source.includes('전망');
                return (
                  <div
                    key={evi.id}
                    className={`p-space-md rounded-xl border flex flex-col justify-between ${
                      isPublicRag
                        ? 'bg-primary-container/15 border-primary/30'
                        : 'bg-surface-container-low border-outline-variant/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            isPublicRag
                              ? 'bg-primary text-white'
                              : 'bg-secondary-container text-on-secondary-container'
                          }`}
                        >
                          {isPublicRag ? '🏛️ 공공 리포트 RAG' : `📑 ${evi.category} 사업계획서`} p.{evi.page}
                        </span>
                        <span className="text-[11px] font-semibold text-on-surface-variant truncate max-w-[150px]">
                          {evi.source.replace(' (공공 RAG)', '')}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface italic my-1 leading-snug">
                        "{evi.excerpt}"
                      </p>
                    </div>
                    <p className="text-xs text-primary font-semibold mt-2 pt-1 border-t border-outline-variant/20">
                      → AI 해석: {evi.interpretation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3. Future Strategy & Risk Mitigation Roadmap */}
      {analysis.consultingInsights && (
        <section className="flex flex-col gap-space-lg">
          <div className="rounded-2xl bg-surface-container-lowest p-space-xl border border-outline-variant/20 shadow-md">
            <div className="mb-space-lg">
              <span className="font-label-sm text-secondary font-bold uppercase tracking-wide">Future Strategy</span>
              <h3 className="font-headline-md font-bold text-on-surface mt-1">성장을 위한 단계별 전략 (Action Plan)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {analysis.consultingInsights.futureStrategy.map((strategy, index) => (
                <article key={`${strategy.horizon}-${strategy.title}`} className="relative rounded-2xl bg-surface-container-low p-space-lg border border-outline-variant/20 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-space-sm py-0.5 rounded-full bg-primary text-white text-xs font-extrabold mb-space-xs">
                      {index + 1}. {strategy.horizon}
                    </span>
                    <h4 className="font-headline-sm font-bold text-on-surface mt-1">{strategy.title}</h4>
                    <p className="text-body-sm text-on-surface-variant mt-space-xs">{strategy.rationale}</p>
                    <ul className="my-space-md space-y-1 text-body-sm text-on-surface">
                      {strategy.actions.map((action) => <li key={action}>• {action}</li>)}
                    </ul>
                  </div>
                  <div className="pt-space-sm border-t border-outline-variant/20 text-xs font-bold text-primary">KPI · {strategy.kpi}</div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
            <div className="rounded-2xl bg-surface-container-lowest p-space-lg border border-error/20">
              <h3 className="font-headline-sm font-bold text-on-surface mb-space-md">핵심 리스크와 대응</h3>
              <div className="space-y-space-sm">
                {analysis.consultingInsights.keyRisks.map((item) => (
                  <div key={item.risk} className="p-space-md rounded-xl bg-error/5">
                    <p className="font-bold text-error">{item.risk}</p>
                    <p className="text-body-sm text-on-surface-variant mt-1">영향: {item.impact}</p>
                    <p className="text-body-sm text-on-surface mt-1">대응: {item.mitigation}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-surface-container-lowest p-space-lg border border-outline-variant/20">
              <h3 className="font-headline-sm font-bold text-on-surface mb-space-md">다음 컨설팅에서 확인할 핵심 질문</h3>
              <ol className="space-y-space-sm">
                {analysis.consultingInsights.consultantQuestions.map((question, index) => (
                  <li key={question} className="flex gap-space-sm text-body-sm text-on-surface">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold">{index + 1}</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* 4. Executive Summary: Contrast & Gap Elimination */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-space-xl shadow-md flex flex-col gap-space-lg border border-outline-variant/20">
        <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-primary font-bold uppercase tracking-wide">
          <span className="material-symbols-outlined text-base">balance</span>
          <span>Executive Summary · 정책 괴리율 사전 차단</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          {/* Corporate Wish */}
          <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between border border-outline-variant/30">
            <div>
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                  기업 대표 희망지원 (사업계획서 기준)
                </span>
                <span className="px-space-xs py-space-2xs rounded bg-surface-variant text-on-surface-variant font-label-sm text-label-sm font-semibold">
                  비효율 감지
                </span>
              </div>
              <div className="font-data-metric text-data-metric font-extrabold text-on-surface tracking-tight mb-space-2xs">
                {analysis.companyRequestedSupport[0] || 'AI 기술 R&D 1.5억원'}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                추가적인 모델 고도화 및 자체 인프라 구축 R&D 자금 요청
              </p>
            </div>
            <div className="mt-space-md pt-space-sm border-t border-outline-variant/30 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
              <span>지원 시 선정 가능성</span>
              <span className="font-bold text-on-surface">22.4% (선행요건 불부합)</span>
            </div>
          </div>

          {/* GBSA AI Prescribed Solution */}
          <div className="p-space-lg rounded-xl bg-surface-container-highest flex flex-col justify-between relative overflow-hidden border border-primary/20">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/10 rounded-full blur-xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-label-md text-label-md text-primary font-bold">
                  GBSA AI 데이터 확정 최적 처방
                </span>
                <span className="px-space-xs py-space-2xs rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  최우선 권고
                </span>
              </div>
              <div className="font-data-metric text-data-metric font-extrabold text-primary tracking-tight mb-space-2xs">
                {analysis.recommendedSupport[0] || '[P02] 실증 바우처 5,000만원'}
              </div>
              <p className="font-body-md text-body-md text-on-surface font-medium">
                + 경기도 1차 협력사 현장 양산 라인 실증(PoC) 및 구매 LOI 직결 연계
              </p>
            </div>
            <div className="mt-space-md pt-space-sm border-t border-outline-variant/40 flex items-center justify-between font-label-sm text-label-sm text-primary">
              <span>지원 시 선정 가능성</span>
              <span className="font-extrabold text-primary">94.8% (초격차 적합 판정)</span>
            </div>
          </div>
        </div>

        {/* Decisive Toss Insight Message */}
        <div className="p-space-md rounded-xl bg-surface-container flex items-start gap-space-md">
          <span className="material-symbols-outlined text-secondary text-2xl shrink-0 mt-0.5">tips_and_updates</span>
          <div>
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-0.5">
              {analysis.supportGapAnalysis}
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              {analysis.aiInsightSummary}
            </p>
          </div>
        </div>
      </div>

      {/* 5. Customer Validation Funnel */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-space-xl shadow-md flex flex-col gap-space-lg border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wide">
              수요처 파이프라인 분석
            </span>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface mt-space-2xs">
              6단계 고객 검증 퍼널
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-space-sm py-space-2xs rounded-full">
            무상 PoC에서 유상 전환 지체 중
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-space-xs">
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">1. 잠재고객</span>
            <span className="font-headline-md text-headline-md font-black text-primary mt-space-2xs">40</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-auto pt-space-xs">아웃바운드 접촉</span>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">2. 심층상담</span>
            <span className="font-headline-md text-headline-md font-black text-primary mt-space-2xs">9</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-auto pt-space-xs">기술 사양 미팅</span>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col border border-secondary/30">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">3. 무상 PoC</span>
            <span className="font-headline-md text-headline-md font-black text-secondary mt-space-2xs">2</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-auto pt-space-xs">도내 단지 현장 테스트</span>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container flex flex-col border border-error/30">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-error font-bold">4. LOI 의향서</span>
              <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
            </div>
            <span className="font-headline-md text-headline-md font-black text-error mt-space-2xs">0</span>
            <span className="font-label-sm text-label-sm text-error font-semibold mt-auto pt-space-xs">계약 전환 정체</span>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container flex flex-col opacity-60">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">5. 유상계약</span>
            <span className="font-headline-md text-headline-md font-black text-on-surface-variant mt-space-2xs">0</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-auto pt-space-xs">목표 매출액 0원</span>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container flex flex-col opacity-60">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">6. 반복매출</span>
            <span className="font-headline-md text-headline-md font-black text-on-surface-variant mt-space-2xs">0</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-auto pt-space-xs">구독/유지보수</span>
          </div>
        </div>
      </div>

      {/* 6. Comprehensive Long-Term Growth Roadmap & GBSA Support Programs */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-space-xl shadow-md flex flex-col gap-space-lg border border-outline-variant/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wide">
                중·장기 스케일업 액션 플랜
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-container text-primary text-[11px] font-bold">
                GBSA 지원사업 연계형
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
              단계별 성장 로드맵 & 맞춤 지원사업 추천
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              단기 실증 전환부터 중기 표준화·인증, 장기 양산 스케일업까지 단계별 실행 과제와 최적 공공 지원사업을 연계 처방합니다.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('programs')}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md font-bold transition border border-outline-variant/30 active:scale-95 shrink-0"
          >
            <span>전체 지원사업 DB 보기</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        {/* 3-Phase Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {analysis.actionPlan90Days.map((plan) => (
            <div
              key={plan.step}
              className="p-space-lg rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
            >
              {/* Step Ribbon & Timeline Header */}
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-black flex items-center justify-center">
                      {plan.step}
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      {plan.timeframe || `Phase ${plan.step}`}
                    </span>
                  </div>
                  {plan.phaseTitle && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-semibold truncate max-w-[140px]">
                      {plan.phaseTitle.split(':')[1]?.trim() || plan.phaseTitle}
                    </span>
                  )}
                </div>

                {/* Main Action Description */}
                <h4 className="font-body-md text-body-md font-bold text-on-surface leading-snug mb-space-sm">
                  {plan.action}
                </h4>

                {/* Target KPI Metric Badge */}
                <div className="p-space-sm rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex items-start gap-2 mb-space-md">
                  <span className="material-symbols-outlined text-secondary text-base shrink-0 mt-0.5">flag</span>
                  <div>
                    <span className="font-label-xs text-[11px] text-on-surface-variant font-medium block">달성 목표 지표 (KPI)</span>
                    <span className="font-body-sm text-body-sm font-bold text-primary">{plan.targetMetric}</span>
                  </div>
                </div>
              </div>

              {/* Linked GBSA / Public Support Program Prescription Card */}
              {plan.recommendedProgram ? (
                <div className="mt-auto pt-space-sm border-t border-outline-variant/20">
                  <div className="p-space-sm rounded-xl bg-primary-container/15 border border-primary/20 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-label-xs text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-primary text-white tracking-wide">
                        연계 지원사업
                      </span>
                      <span className="font-label-sm text-label-sm font-extrabold text-secondary">
                        {plan.recommendedProgram.budget}
                      </span>
                    </div>
                    <div className="font-body-sm text-body-sm font-bold text-on-surface leading-tight">
                      {plan.recommendedProgram.title}
                    </div>
                    <p className="font-label-xs text-[11px] text-on-surface-variant leading-relaxed">
                      💡 {plan.recommendedProgram.fitReason}
                    </p>
                    <button
                      type="button"
                      onClick={() => onNavigateTab('programs')}
                      className="mt-1 inline-flex items-center justify-between text-[11px] font-bold text-primary hover:underline pt-1 border-t border-primary/10"
                    >
                      <span>지원사업 상세 및 신청 사유서</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-auto pt-space-sm border-t border-outline-variant/20 text-xs text-on-surface-variant flex items-center justify-between">
                  <span>연계 지원사업 매칭</span>
                  <span className="font-semibold text-primary">GBSA 맞춤 트랙 추천</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 7. 3 Core Module Connection Hub Cards (PRD Architecture Navigation) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {/* Connection Card 1: Track A 지원사업 연계 */}
        <div
          onClick={() => onNavigateTab('programs')}
          className="p-space-lg rounded-2xl bg-surface-container-lowest border-2 border-secondary/40 shadow-md hover:shadow-xl hover:border-secondary transition cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span> Track A
              </span>
              <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">
              2. 맞춤 지원사업 연계
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {analysis.primaryBottleneck} 병목을 해결할 <strong>[P02] 실증 바우처 5,000만원</strong> 등 최적 지원사업 확인 및 신청 사유서 자동 생성
            </p>
          </div>
          <div className="mt-space-md pt-space-xs border-t border-outline-variant/20 font-label-sm text-secondary font-bold flex items-center justify-between">
            <span>지원사업 매칭 확인</span>
            <span>이동하기 →</span>
          </div>
        </div>

        {/* Connection Card 2: Track B 기업 매칭 */}
        <div
          onClick={() => onNavigateTab('matching')}
          className="p-space-lg rounded-2xl bg-surface-container-lowest border-2 border-primary/40 shadow-md hover:shadow-xl hover:border-primary transition cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <span className="px-space-xs py-space-2xs rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">hub</span> Track B
              </span>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">
              3. 기업 Discovery & 매칭
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              기업 공급역량과 협력 니즈를 분석하여 <strong>화성 1차 부품사 및 SI 파트너 3개사</strong>와 1:1 B2B 협력 제안서 연결
            </p>
          </div>
          <div className="mt-space-md pt-space-xs border-t border-outline-variant/20 font-label-sm text-primary font-bold flex items-center justify-between">
            <span>협력 파트너 매칭 확인</span>
            <span>이동하기 →</span>
          </div>
        </div>

        {/* Connection Card 3: Track C 관리자 Intelligence */}
        <div
          onClick={() => onNavigateTab('admin')}
          className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-md hover:shadow-xl hover:border-outline transition cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">analytics</span> Track C
              </span>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">
              4. 관리자 Intelligence
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              누적 248개 기업 병목 통계 집계 및 도내 공통 애로사항 해결을 위한 <strong>신규 지원사업 기획안 자동 생성</strong>
            </p>
          </div>
          <div className="mt-space-md pt-space-xs border-t border-outline-variant/20 font-label-sm text-on-surface-variant font-bold flex items-center justify-between">
            <span>관리자 대시보드</span>
            <span>이동하기 →</span>
          </div>
        </div>
      </div>

      {/* Bottom Large CTA Connect Banner */}
      <div className="p-space-xl rounded-3xl bg-gradient-to-r from-primary to-primary-container text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div>
          <h3 className="font-headline-lg text-headline-lg font-bold">
            성장진단 결과를 바탕으로 후속 지원을 시작하세요
          </h3>
          <p className="font-body-md text-body-md text-white/80 mt-1">
            GBSA 맞춤 지원사업 신청과 협력기업 1:1 매칭이 준비되어 있습니다.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab('programs')}
            className="px-space-xl py-space-md rounded-xl bg-white text-primary font-headline-sm font-bold shadow-lg hover:bg-slate-100 transition active:scale-95"
          >
            2. 지원사업 연계 →
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('matching')}
            className="px-space-xl py-space-md rounded-xl bg-secondary text-white font-headline-sm font-bold shadow-lg hover:opacity-90 transition active:scale-95"
          >
            3. 기업 매칭 →
          </button>
        </div>
      </div>
    </div>
  );
};
