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

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [progressPercent, setProgressPercent] = useState<number>(15);

  const startAnalysisSequence = (targetPayload: { company: Company; analysis: AnalysisResult; profile: CompanyB2BProfile }) => {
    setIsLoading(true);
    setUploadError('');
    setCurrentStep(1);
    setProgressPercent(18);
    setProgressText('사업계획서 문서의 기술 지표와 비즈니스 모델을 파싱 중입니다...');

    // Step 2
    setTimeout(() => {
      setCurrentStep(2);
      setProgressPercent(48);
      setProgressText('T·E·M(기술·실행·시장) 3축 성숙도와 핵심 병목(Bottleneck)을 진단 중입니다...');
    }, 850);

    // Step 3
    setTimeout(() => {
      setCurrentStep(3);
      setProgressPercent(82);
      setProgressText('경기도 120개 지원사업 DB 및 도내 B2B 협력 파트너를 매칭 중입니다...');
    }, 1800);

    // Step 4
    setTimeout(() => {
      setCurrentStep(4);
      setProgressPercent(100);
      setProgressText('경영진 맞춤형 AI 성장진단 & 컨설팅 리포트를 완성했습니다!');
    }, 2650);

    // Final Completion
    setTimeout(() => {
      setIsLoading(false);
      onStartAnalysis(targetPayload);
    }, 3200);
  };

  const handleSampleSelect = (companyId: string) => {
    const found = MOCK_COMPANIES.find(c => c.company.id === companyId) || MOCK_COMPANIES[0];
    const targetPayload = {
      ...found,
      analysis: {
        ...found.analysis,
        consultingInsights: found.analysis.consultingInsights || buildFallbackConsulting(found.company, found.analysis),
      },
    };
    startAnalysisSequence(targetPayload);
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsLoading(true);
    setUploadError('');
    setCurrentStep(1);
    setProgressPercent(15);
    setProgressText('사업계획서 PDF를 Gemini가 실제로 분석하고 있습니다...');

    try {
      // 실제 API 응답을 받은 뒤에만 결과 화면으로 이동합니다.
      const result = await analyzeBusinessPlanPdf(file, (message) => setProgressText(message), false);
      startAnalysisSequence(result);
    } catch (error) {
      console.error('파일 처리 중 예외 발생:', error);
      setIsLoading(false);
      setUploadError(error instanceof Error ? error.message : '실제 AI 분석에 실패했습니다.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
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
            className={`w-full rounded-3xl p-space-2xl transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer border-2 border-dashed ${
              isDragging
                ? 'border-primary bg-primary-container/20 scale-[1.02]'
                : 'border-outline-variant/40 bg-surface-container-low hover:border-primary hover:bg-surface-container-low/80'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                  e.target.value = ''; // 동일 파일 재선택 허용
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

          {/* Loading Progress Overlay with Mascot Character */}
          {isLoading && (
            <div className="absolute inset-0 bg-surface-container-lowest/98 backdrop-blur-xl z-30 flex flex-col items-center justify-center p-space-lg md:p-space-xl animate-fadeIn">
              {/* Mascot Character with Motion Glow */}
              <div className="relative mb-space-md flex flex-col items-center">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-fixed to-secondary-fixed rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden bg-white shadow-2xl border-2 border-primary/20 flex items-center justify-center animate-bounce duration-1000">
                  <img
                    src="/mascot_running.jpg"
                    alt="GBSA Mascot Ikom and Gyeongi"
                    className="w-full h-full object-cover scale-105"
                  />
                </div>
                <div className="mt-space-xs px-space-md py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-sm flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span>이콤 & 경이가 사업계획서 탐색 중!</span>
                </div>
              </div>

              {/* Title & Dynamic Status */}
              <h4 className="font-headline-md text-headline-md font-extrabold text-primary mb-space-2xs text-center">
                G-브릿지 AI 심층 분석 진행 중
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant font-medium text-center max-w-md h-12 flex items-center justify-center mb-space-md">
                {progressText}
              </p>

              {/* Progress Gauge */}
              <div className="w-full max-w-md bg-surface-container-high rounded-full h-3 overflow-hidden mb-space-md shadow-inner border border-outline-variant/30">
                <div
                  className="bg-gradient-to-r from-primary via-primary-container to-secondary h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* 4 Steps Indicator Pill Badges */}
              <div className="w-full max-w-md grid grid-cols-2 gap-2 text-left">
                {[
                  { step: 1, label: '문서 핵심 지표 파싱', icon: 'description' },
                  { step: 2, label: 'T·E·M 성숙도 & 병목 진단', icon: 'network_check' },
                  { step: 3, label: '지원사업 & B2B 매칭', icon: 'hub' },
                  { step: 4, label: '경영진 컨설팅 리포트', icon: 'insights' },
                ].map((item) => {
                  const isDone = currentStep > item.step;
                  const isCurrent = currentStep === item.step;
                  return (
                    <div
                      key={item.step}
                      className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                        isDone
                          ? 'bg-secondary-container/40 text-on-secondary-container font-bold'
                          : isCurrent
                          ? 'bg-primary-container/20 text-primary border border-primary/30 shadow-sm animate-pulse'
                          : 'bg-surface-container-low text-on-surface-variant/60'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isDone ? 'check_circle' : item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>
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
                1번
              </span>
              <span>비전웍스AI (제조AI)</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container font-label-sm text-label-sm text-on-surface font-bold shadow-sm transition active:scale-95"
              onClick={() => handleSampleSelect('COMP-002')}
            >
              <span className="px-1.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-extrabold">
                2번
              </span>
              <span>로보플로우 (로봇)</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container font-label-sm text-label-sm text-on-surface font-bold shadow-sm transition active:scale-95"
              onClick={() => handleSampleSelect('COMP-003')}
            >
              <span className="px-1.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-extrabold">
                3번
              </span>
              <span>메디헬스 (바이오)</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container font-label-sm text-label-sm text-on-surface font-bold shadow-sm transition active:scale-95"
              onClick={() => handleSampleSelect('COMP-004')}
            >
              <span className="px-1.5 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-extrabold">
                4번
              </span>
              <span>솔라테크 (에너지)</span>
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
