import React, { useState, useRef } from 'react';
import { Company, AnalysisResult, CompanyB2BProfile } from '../types';
import { MOCK_COMPANIES } from '../data/mockCompanies';
import { analyzeBusinessPlanPdf } from '../services/gemini';

interface DiagnosisViewProps {
  onAnalysisComplete?: (result: { company: Company; analysis: AnalysisResult; profile: CompanyB2BProfile }) => void;
}

export const DiagnosisView: React.FC<DiagnosisViewProps> = ({ onAnalysisComplete }) => {
  const [selectedCase, setSelectedCase] = useState<typeof MOCK_COMPANIES[0]>(MOCK_COMPANIES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progressText, setProgressText] = useState<string>('자연어 RAG 엔진으로 기술성과 실증 지표를 파싱 중입니다 (38%)...');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSampleSelect = async (companyId: string) => {
    const found = MOCK_COMPANIES.find(c => c.company.id === companyId) || MOCK_COMPANIES[0];
    setIsLoading(true);
    setProgressText('선택하신 사업계획서 셋을 자연어 RAG로 파싱 중입니다 (42%)...');

    setTimeout(() => {
      setProgressText('World Bank MVA 지표 및 도내 바우처 적합도 매칭 중 (89%)...');
    }, 400);

    setTimeout(() => {
      setSelectedCase(found);
      setIsLoading(false);
      if (onAnalysisComplete) onAnalysisComplete(found);
      const resultsElem = document.getElementById('diagnosticResults');
      if (resultsElem) resultsElem.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setProgressText('사업계획서 PDF 분석을 시작합니다...');

    const result = await analyzeBusinessPlanPdf(file, (msg) => setProgressText(msg));
    setSelectedCase(result as any);
    setIsLoading(false);
    if (onAnalysisComplete) onAnalysisComplete(result as any);

    const resultsElem = document.getElementById('diagnosticResults');
    if (resultsElem) resultsElem.scrollIntoView({ behavior: 'smooth' });
  };

  const { company, analysis } = selectedCase;
  const tem = analysis.temDiagnosis;

  return (
    <div className="flex flex-col w-full font-body-md text-on-surface antialiased bg-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Main Hero Section (Toss Style Upload Center) */}
      <section className="w-full px-margin-desktop py-space-2xl flex flex-col items-center justify-center text-center">
        {/* Micro Badge */}
        <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container mb-space-md border border-outline-variant/20">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="font-label-md text-label-md text-primary font-semibold tracking-wide">
            경기도경제과학진흥원 AI 진단 엔진 v2.4
          </span>
        </div>

        {/* Main Impact Headlines */}
        <h1 className="font-display text-display text-primary tracking-tight font-extrabold max-w-3xl mb-space-sm leading-tight">
          사업계획서 한 장이면 충분해요.
        </h1>
        <p className="font-headline-sm text-headline-sm text-on-surface-variant font-normal max-w-2xl mb-space-2xl">
          PDF를 끌어다 놓으면 10초 만에 T·E·M 성장 진단과 공공 지원사업 맞춤 처방이 완성됩니다.
        </p>

        {/* Toss-style Large Interaction Drag & Drop Card */}
        <div className="w-full max-w-3xl bg-surface-container-lowest rounded-3xl p-space-xl shadow-xl transition-all duration-300 relative group overflow-hidden border border-outline-variant/30">
          {/* Ambient Backlight */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none group-hover:bg-primary-fixed/50 transition-all"></div>
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none group-hover:bg-secondary-fixed/50 transition-all"></div>

          {/* Drag & Drop Interactive Dropzone */}
          <div
            className="w-full rounded-2xl p-space-2xl bg-surface-container-low transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer border-2 border-dashed border-outline-variant/40 hover:border-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.hwp,.hwpx"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />

            {/* Toss-style Floating Upload Graphic */}
            <div className="w-20 h-20 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center text-primary mb-space-md group-hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined text-4xl">cloud_upload</span>
            </div>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-space-xs">
              PDF / HWPX 파일 끌어다 놓기
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
              파일을 마우스로 끌어오거나 버튼을 눌러 선택해주세요
            </p>

            {/* Main Action CTA Button */}
            <button
              type="button"
              className="inline-flex items-center gap-space-xs px-space-xl py-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:opacity-95 active:scale-95 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <span className="material-symbols-outlined text-xl">folder_open</span>
              <span>내 PC에서 파일 선택하기</span>
            </button>

            {/* Compliance & Security Footnote */}
            <div className="flex items-center gap-space-sm mt-space-lg text-on-surface-variant font-label-sm text-label-sm">
              <span className="flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-sm text-secondary">verified_user</span>
                PDF, HWP, HWPX (최대 100MB)
              </span>
              <span className="text-outline-variant">|</span>
              <span>100% 암호화 안전 보관 (KISA 인증 보안망)</span>
            </div>
          </div>

          {/* Processing State Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-surface-container-lowest/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-space-xl">
              <div className="w-16 h-16 rounded-full border-4 border-surface-container-highest border-t-primary animate-spin mb-space-md"></div>
              <h4 className="font-headline-sm text-headline-sm font-bold text-primary mb-space-2xs">
                G-브릿지 AI가 사업계획서를 분석하고 있어요
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant animate-pulse">
                {progressText}
              </p>
            </div>
          )}
        </div>

        {/* Quick Demo Testset Bar */}
        <div className="w-full max-w-3xl mt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm bg-surface-container-low px-space-lg py-space-md rounded-2xl border border-outline-variant/20">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-primary text-lg">bolt</span>
            <span className="font-medium">파일이 없으신가요? 검증용 테스트셋으로 바로 체험해보세요:</span>
          </div>
          <div className="flex flex-wrap items-center gap-space-xs">
            <button
              type="button"
              className={`group inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full font-label-sm text-label-sm font-semibold shadow-sm transition ${
                company.id === 'COMP-001'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface'
              }`}
              onClick={() => handleSampleSelect('COMP-001')}
            >
              <span className="px-space-2xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                인기/추천
              </span>
              <span>01 (주)비전웍스AI</span>
            </button>
            <button
              type="button"
              className={`inline-flex items-center px-space-sm py-space-2xs rounded-full font-label-sm text-label-sm font-semibold shadow-sm transition ${
                company.id === 'COMP-002'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface'
              }`}
              onClick={() => handleSampleSelect('COMP-002')}
            >
              <span>04 (주)로보플로우</span>
            </button>
            <button
              type="button"
              className={`inline-flex items-center px-space-sm py-space-2xs rounded-full font-label-sm text-label-sm font-semibold shadow-sm transition ${
                company.id === 'COMP-003'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface'
              }`}
              onClick={() => handleSampleSelect('COMP-003')}
            >
              <span>11 메디헬스바이오</span>
            </button>
          </div>
        </div>
      </section>

      {/* Realtime Diagnostic Results (Toss Report Style) */}
      <section id="diagnosticResults" className="w-full px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-6xl mx-auto">
        {/* Section Title & Meta */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">
              AI 종합 진단 리포트
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mt-space-2xs">
              {company.name} 맞춤 처방 분석 결과
            </h2>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="px-space-sm py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              진단번호: GBSA-2026-0419
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-space-2xs px-space-md py-space-2xs rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition border border-outline-variant/30"
              onClick={() => window.print()}
            >
              <span className="material-symbols-outlined text-sm">print</span> 리포트 저장
            </button>
          </div>
        </div>

        {/* 1. Executive Summary: Contrast & Gap Elimination */}
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

        {/* 2. T·E·M 3-Axis Growth Diagnostic */}
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
        </div>

        {/* 3. Commercialization Roadmap & Support Prescription Flow */}
        <div className="w-full bg-white rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-lg border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <span className="font-label-sm text-label-sm text-blue-600 font-bold uppercase tracking-wider">
                사업화 실행 로드맵
              </span>
              <h3 className="font-headline-md text-headline-md font-black text-slate-900 mt-0.5">
                단계별 병목 돌파 & 성장 마일스톤 로드맵
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 self-start md:self-auto">
              GBSA 맞춤 처방 지원사업 연동 중
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Stage 1 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-blue-700">STEP 01 (현재 단계)</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">진행 중</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">현장 실증 & PoC 데이터 확보</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  도내 수요기업 현장 무상 테스트베드를 통해 오검출률 0.1% 이하 및 공인 시험성적서 획득
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                <span>핵심 목표: <strong>기술 안정성 검증</strong></span>
                <span className="text-blue-600 font-bold">달성도 85%</span>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="p-4 rounded-xl bg-blue-50/50 border-2 border-blue-400 flex flex-col justify-between space-y-3 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600"></div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-black text-blue-800">STEP 02 (집중 처방 구간)</span>
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-black">1순위 병목 돌파</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm">유상 계약 전환 & 첫 레퍼런스</h4>
                <p className="text-xs text-slate-700 mt-1.5 leading-relaxed font-medium">
                  GBSA 맞춤 실증 지원사업(최대 5,115만원)을 매칭하여 수요기업의 도입 비용 부담 해소 및 본계약 체결
                </p>
              </div>
              <div className="pt-2 border-t border-blue-200 text-[11px] text-blue-900 flex items-center justify-between font-bold">
                <span>연계 처방: <strong>{analysis.recommendedSupport[0] || '맞춤형 AI 실증 지원'}</strong></span>
                <span className="text-blue-700">우선 지원</span>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-300"></div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-400">STEP 03 (목표 단계)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[10px] font-bold">스케일업</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">구독형 SaaS & 글로벌 판로 확장</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  동남아·북미 현장 라이선스 공급 및 GBSA 수출바우처 연계를 통한 연간 반복 매출(ARR) 극대화
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                <span>기대 성과: <strong>해외 직수출 12억원+</strong></span>
                <span className="text-emerald-600 font-bold">성장 목표</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Tailored Public Support 3-Zone Cards */}
        <div className="w-full flex flex-col gap-space-md">
          <div>
            <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wide">
              경기도 공공 RAG 연계 처방
            </span>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface mt-space-2xs">
              맞춤 지원사업 3단계 로드맵
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Zone 1 */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col justify-between border-2 border-secondary/40">
              <div>
                <div className="inline-flex items-center gap-space-2xs px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold mb-space-sm">
                  <span className="material-symbols-outlined text-xs">check_circle</span> 지금 즉시 신청
                </div>
                <h4 className="font-headline-sm text-headline-sm font-bold text-primary mb-space-xs">
                  [P02] AI 현장실증(PoC) 지원
                </h4>
                <div className="font-data-metric text-data-metric font-extrabold text-on-surface mb-space-xs">5,000만원</div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                  현대차/기아 1차 협력사 조립라인 현장 설치 및 3개월 양산성 실증 비용 전액 국비/도비 바우처 지원.
                </p>
              </div>
              <div className="pt-space-md border-t border-outline-variant/30 flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant">신청 마감 D-12</span>
                <button
                  type="button"
                  className="px-space-md py-space-xs rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold hover:opacity-90 transition"
                  onClick={() => alert(`${company.name} 맞춤 지원사업 신청서 자동 생성을 시작합니다.`)}
                >
                  신청 서류 자동 생성
                </button>
              </div>
            </div>

            {/* Zone 2 */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col justify-between border border-outline-variant/30">
              <div>
                <div className="inline-flex items-center gap-space-2xs px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold mb-space-sm">
                  <span className="material-symbols-outlined text-xs">schedule</span> 다음 단계 (Q3 예정)
                </div>
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-xs">
                  [P05] 글로벌 수출 바우처
                </h4>
                <div className="font-data-metric text-data-metric font-extrabold text-on-surface-variant mb-space-xs">3,000만원</div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                  국내 첫 유상 계약 1건 확보 후 북미/유럽 모빌리티 공급망 규격(CE, ISO26262) 인증 및 해외 로드쇼 파견.
                </p>
              </div>
              <div className="pt-space-md border-t border-outline-variant/30 flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant">선결 조건: 유상 LOI 1건</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">대기 알림 예약</span>
              </div>
            </div>

            {/* Zone 3 */}
            <div className="bg-surface-container-low rounded-2xl p-space-lg shadow-sm flex flex-col justify-between border border-outline-variant/20 opacity-80">
              <div>
                <div className="inline-flex items-center gap-space-2xs px-space-xs py-space-2xs rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm font-bold mb-space-sm">
                  <span className="material-symbols-outlined text-xs">block</span> 지금은 권하지 않음
                </div>
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface-variant mb-space-xs">
                  [P01] AI 원천기술 R&D 지원
                </h4>
                <div className="font-data-metric text-data-metric font-extrabold text-on-surface-variant mb-space-xs">1억 5,000만원</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  [차단 사유]: 모델 성숙도가 이미 {tem.technology.score}점에 도달하여, 추가 R&D 선정 점수가 낮고 시장 진입 타이밍을 상실할 위험이 큼.
                </p>
              </div>
              <div className="pt-space-md border-t border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-outline font-semibold">대표자 불필요 서류 낭비 차단</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. World Bank Group 20,000+ Indicator Benchmark */}
        <div className="w-full bg-surface-container-lowest rounded-2xl p-space-xl shadow-md flex flex-col gap-space-lg border border-outline-variant/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wide">
                api.worldbank.org/v2 실시간 데이터 연계
              </span>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mt-space-2xs">
                글로벌 거시제조 벤치마크 진단
              </h3>
            </div>
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-space-sm py-space-2xs rounded-full">
              <span className="material-symbols-outlined text-xs text-secondary">public</span>
              <span>World Bank WDI Data Exchange Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between border border-outline-variant/30">
              <div>
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-md text-label-md text-on-surface-variant">제조업 부가가치 비중 (MVA % of GDP)</span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">OECD 1위 (27.6%)</span>
                </div>
                <div className="font-headline-lg text-headline-lg font-black text-primary mb-space-xs">
                  대한민국 27.6% <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">vs OECD 평균 14.1%</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  경기도는 국내 제조업 부가가치의 34%를 창출하는 최대 밀집지입니다. {company.name}의 솔루션은 현장 공급망 적합도 지수 최상위(91.2)에 해당합니다.
                </p>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden mt-space-md">
                <div className="h-full bg-primary rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>

            <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between border border-outline-variant/30">
              <div>
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-md text-label-md text-on-surface-variant">High-Tech 제조 수출 비중 (TX.VAL.TECH.MF.ZS)</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">글로벌 상위 3%</span>
                </div>
                <div className="font-headline-lg text-headline-lg font-black text-secondary mb-space-xs">
                  한국 34.8% <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">vs 글로벌 평균 19.3%</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  현장 PoC 완료 즉시 해외 글로벌 밸류체인 진입이 용이한 고부가가치 세부 카테고리로 분류되었습니다.
                </p>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden mt-space-md">
                <div className="h-full bg-secondary rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
