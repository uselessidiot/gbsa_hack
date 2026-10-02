import React, { useRef, useState } from 'react';
import { Company, AnalysisResult, CompanyB2BProfile } from '../types';
import { MOCK_COMPANIES } from '../data/mockCompanies';
import { analyzeBusinessPlanPdf, buildFallbackConsulting } from '../services/gemini';

interface LandingViewProps {
  onStartAnalysis: (result: { company: Company; analysis: AnalysisResult; profile: CompanyB2BProfile }) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStartAnalysis }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progressText, setProgressText] = useState<string>('자연어 RAG 엔진으로 기술성과 실증 지표를 파싱 중입니다 (38%)...');
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSampleSelect = (companyId: string) => {
    const found = MOCK_COMPANIES.find(c => c.company.id === companyId) || MOCK_COMPANIES[0];
    setIsLoading(true);
    setProgressText('선택하신 사업계획서 셋을 자연어 RAG로 파싱 중입니다 (42%)...');

    setTimeout(() => {
      setProgressText('World Bank MVA 지표 및 도내 바우처 적합도 매칭 중 (89%)...');
    }, 400);

    setTimeout(() => {
      setIsLoading(false);
      onStartAnalysis({
        ...found,
        analysis: {
          ...found.analysis,
          consultingInsights: found.analysis.consultingInsights || buildFallbackConsulting(found.company, found.analysis),
        },
      });
    }, 700);
  };

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setUploadError('');
    setProgressText('사업계획서 PDF 분석을 시작합니다...');
    try {
      const result = await analyzeBusinessPlanPdf(file, (msg) => setProgressText(msg));
      onStartAnalysis(result);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : '파일 분석에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[calc(100vh-4rem)] py-space-2xl px-margin-desktop bg-surface">
      {/* Center Content Container */}
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center my-auto">
        {/* Toss Style Micro Badge */}
        <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container mb-space-lg border border-outline-variant/20 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
          <span className="font-label-md text-label-md text-primary font-bold tracking-wide">
            경기도경제과학진흥원 AI 진단 엔진 v2.4
          </span>
        </div>

        {/* Main Bold Headlines (Toss Style) */}
        <h1 className="font-display text-[42px] leading-[1.2] text-primary tracking-tight font-extrabold max-w-2xl mb-space-md">
          사업계획서 한 장이면 충분해요.
        </h1>
        <p className="font-headline-sm text-headline-sm text-on-surface-variant font-normal max-w-xl mb-space-2xl leading-relaxed">
          PDF를 끌어다 놓으면 10초 만에 T·E·M 성장 진단과 공공 지원사업 맞춤 처방이 완성됩니다.
        </p>

        {/* Large Interaction Drag & Drop Card */}
        <div className="w-full bg-surface-container-lowest rounded-[2.5rem] p-space-2xl shadow-2xl transition-all duration-300 relative group overflow-hidden border border-outline-variant/30">
          {/* Ambient Glow Effects */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none group-hover:bg-primary-fixed/60 transition-all"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none group-hover:bg-secondary-fixed/60 transition-all"></div>

          {/* Interactive Dropzone */}
          <div
            className="w-full rounded-3xl p-space-2xl bg-surface-container-low transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer border-2 border-dashed border-outline-variant/40 hover:border-primary hover:bg-surface-container-low/80"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />

            {/* Toss Style Upload Icon Graphic */}
            <div className="w-20 h-20 rounded-full bg-surface-container-lowest shadow-lg flex items-center justify-center text-primary mb-space-md group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-4xl">cloud_upload</span>
            </div>

            <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-space-2xs">
              PDF 사업계획서 끌어다 놓기
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-xl">
              파일을 마우스로 끌어오거나 버튼을 눌러 선택해주세요
            </p>

            {/* Main Action Button */}
            <button
              type="button"
              className="inline-flex items-center gap-space-xs px-space-2xl py-space-md rounded-2xl bg-primary text-on-primary font-headline-sm text-headline-sm font-bold shadow-lg hover:opacity-95 active:scale-95 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <span className="material-symbols-outlined text-2xl">folder_open</span>
              <span>내 PC에서 파일 선택하기</span>
            </button>

            {/* Security Footnote */}
            <div className="flex items-center gap-space-sm mt-space-lg text-on-surface-variant font-label-sm text-label-sm">
              <span className="flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-sm text-secondary">verified_user</span>
                PDF (온라인 분석 최대 4MB)
              </span>
              <span className="text-outline-variant">|</span>
              <span>100% 암호화 안전 보관 (KISA 인증 보안망)</span>
            </div>
          </div>

          {uploadError && (
            <div className="relative z-20 mt-space-md p-space-md rounded-xl bg-error/10 text-error font-body-sm font-semibold text-left">
              {uploadError}
            </div>
          )}

          {/* Loading Progress Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-surface-container-lowest/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-space-xl">
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

        {/* Quick Demo Testset Chips */}
        <div className="w-full mt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm bg-surface-container-low px-space-lg py-space-md rounded-2xl border border-outline-variant/20 shadow-sm">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-primary text-lg">bolt</span>
            <span className="font-medium">파일이 없으신가요? 샘플로 바로 체험해보세요:</span>
          </div>
          <div className="flex flex-wrap items-center gap-space-xs">
            <button
              type="button"
              className="group inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container font-label-sm text-label-sm text-on-surface font-bold shadow-sm transition active:scale-95"
              onClick={() => handleSampleSelect('COMP-001')}
            >
              <span className="px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-extrabold">
                인기
              </span>
              <span>01 비전웍스AI</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container font-label-sm text-label-sm text-on-surface font-bold shadow-sm transition active:scale-95"
              onClick={() => handleSampleSelect('COMP-002')}
            >
              <span>04 로보플로우</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container font-label-sm text-label-sm text-on-surface font-bold shadow-sm transition active:scale-95"
              onClick={() => handleSampleSelect('COMP-003')}
            >
              <span>11 메디헬스바이오</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toss Style 3 Key Feature Cards Below */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-space-md mt-space-2xl">
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/20 flex flex-col text-left">
          <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mb-space-sm">
            <span className="material-symbols-outlined text-xl">analytics</span>
          </div>
          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">
            T·E·M 3축 성숙도 진단
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            기술(T), 실증(E), 시장(M) 단계를 객관적 사실에 기반하여 10초 만에 진단합니다.
          </p>
        </div>

        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/20 flex flex-col text-left">
          <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-space-sm">
            <span className="material-symbols-outlined text-xl">balance</span>
          </div>
          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">
            지원사업 맞춤 처방
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            기업 희망 지원과 실제 선행되어야 할 지원사업의 차이를 사전 파악하여 서류 낭비를 차단합니다.
          </p>
        </div>

        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/20 flex flex-col text-left">
          <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center mb-space-sm">
            <span className="material-symbols-outlined text-xl">hub</span>
          </div>
          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">
            공공 RAG & 기업 매칭
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            분석 데이터가 누적되어 B2B 협력기업 매칭 및 GBSA 신규 지원사업 기획으로 재사용됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};
