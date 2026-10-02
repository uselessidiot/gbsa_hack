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
  const [progressPercent, setProgressPercent] = useState<number>(20);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);

  const MASCOT_FRAMES = [
    '/frames/frame_20.jpg',
    '/frames/frame_40.jpg',
    '/frames/frame_60.jpg',
    '/frames/frame_80.jpg',
    '/frames/frame_95.jpg',
    '/frames/frame_100_a.jpg',
  ];

  const startAnalysisSequence = (targetPayload: { company: Company; analysis: AnalysisResult; profile: CompanyB2BProfile }) => {
    setIsLoading(true);
    setUploadError('');
    setCurrentStep(1);
    setProgressPercent(20);
    setActiveFrameIndex(0);
    setProgressText('사업계획서 문서의 기술 지표와 비즈니스 모델을 파싱 중입니다...');

    // 0.8s - Frame 2 (40%)
    setTimeout(() => {
      setCurrentStep(1);
      setProgressPercent(40);
      setActiveFrameIndex(1);
      setProgressText('사업계획서의 핵심 수치와 추진 계획을 정밀 추출 중입니다...');
    }, 800);

    // 1.6s - Frame 3 (60%)
    setTimeout(() => {
      setCurrentStep(2);
      setProgressPercent(60);
      setActiveFrameIndex(2);
      setProgressText('T·E·M 3축 성숙도와 1순위 핵심 병목(Bottleneck)을 진단 중입니다...');
    }, 1600);

    // 2.4s - Frame 4 (80%)
    setTimeout(() => {
      setCurrentStep(3);
      setProgressPercent(80);
      setActiveFrameIndex(3);
      setProgressText('7종 공공 RAG 산업 리포트와 팩트체크 교차 검증을 수행 중입니다...');
    }, 2400);

    // 3.2s - Frame 5 (95%)
    setTimeout(() => {
      setCurrentStep(3);
      setProgressPercent(95);
      setActiveFrameIndex(4);
      setProgressText('경기도 120개 맞춤 지원사업 DB 및 도내 협력 파트너사를 매칭 중입니다...');
    }, 3200);

    // 4.0s - Frame 6 (100% Goal Reached)
    setTimeout(() => {
      setCurrentStep(4);
      setProgressPercent(100);
      setActiveFrameIndex(5);
      setProgressText('목표 달성! 경영진 맞춤형 AI 성장진단 & 컨설팅 리포트를 완성했습니다! 🎉');
    }, 4000);

    // 4.8s - Finish and show result
    setTimeout(() => {
      setIsLoading(false);
      onStartAnalysis(targetPayload);
    }, 4800);
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
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center my-auto">
        {/* Toss Style Micro Badge */}
        <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container mb-space-lg border border-outline-variant/20 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
          <span className="font-label-md text-label-md text-primary font-bold tracking-wide">
            GBSA 기업지원 플랫폼
          </span>
        </div>

        {/* Main Bold Headlines (Toss Style) */}
        <h1 className="font-display text-[50px] md:text-[58px] leading-[1.16] text-primary tracking-tight font-extrabold max-w-5xl mb-space-md">
          <>
            <span className="block">지원사업을 찾지 마세요.</span>
            <span className="block text-on-surface">G-BRIDGE가 당신의 기회를 찾습니다.</span>
          </>
        </h1>
        <p className="font-headline-sm text-headline-sm text-on-surface-variant font-normal max-w-2xl mb-space-lg leading-relaxed">
          <span className="block">사업계획서 하나만 올리면</span>
          <span className="block">AI가 기업을 진단하고, 필요한 지원과 성장기회를 연결합니다.</span>
        </p>

        <div className="w-full max-w-6xl mx-auto mb-space-2xl text-center">
          <div className="mb-space-md">
            <span className="font-label-md text-label-md text-secondary font-bold tracking-wide">기업의 성장, 진단부터 매칭까지</span>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-space-lg text-left">
            <div className="min-h-[190px] p-space-xl rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/20 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mb-space-md">
                <span className="material-symbols-outlined text-2xl">analytics</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">01 기업 성장진단</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <strong className="block text-on-surface mb-1">가능성을 발견합니다</strong>
                AI가 사업계획서를 분석해 기업의 성장단계와<br />
                핵심역량을 진단합니다.
              </p>
            </div>
            <div className="min-h-[190px] p-space-xl rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/20 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-space-md">
                <span className="material-symbols-outlined text-2xl">balance</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">02 맞춤 지원 연계</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <strong className="block text-on-surface mb-1">필요한 지원을 연결합니다</strong>
                기업에 맞는 공공지원사업을 찾아 맞춤형<br />
                지원기회를 연결합니다.
              </p>
            </div>
            <div className="min-h-[190px] p-space-xl rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/20 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-surface-container text-primary flex items-center justify-center mb-space-md">
                <span className="material-symbols-outlined text-2xl">hub</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1 whitespace-nowrap">03 기업 Discovery & 매칭</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <strong className="block text-on-surface mb-1">새로운 기회를 만듭니다</strong>
                기업·파트너·비즈니스 기회를 발굴해<br />
                다음 성장으로 연결합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Large Interaction Drag & Drop Card */}
        <div className="w-full bg-surface-container-lowest rounded-2xl p-space-2xl shadow-md transition-all duration-300 relative group overflow-hidden border border-outline-variant/30">
          {/* Ambient Glow Effects */}
          <div className="absolute inset-x-0 top-0 h-1 bg-primary/80 pointer-events-none"></div>

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
              사업계획서를 업로드하세요
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

          {/* Full-Screen Backdrop Blurred Mascot Loading Modal */}
          {isLoading && (
            <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-fadeIn">
              <div className="relative w-full max-w-3xl bg-white/95 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-white/60 overflow-hidden flex flex-col items-center p-6 md:p-8 text-center animate-scaleUp">
                
                {/* 1. Dynamic Animated Mascot Frame Sequence */}
                <div className="relative w-full aspect-[16/9] max-h-[360px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-lg mb-6 flex flex-col justify-end p-4 group">
                  
                  {/* Dynamic Active Frame Image */}
                  <div className="absolute inset-0 w-full h-full bg-slate-950 flex items-center justify-center">
                    <img
                      key={activeFrameIndex}
                      src={MASCOT_FRAMES[activeFrameIndex] || MASCOT_FRAMES[0]}
                      alt={`경기도 AI 진단 애니메이션 프레임 ${progressPercent}%`}
                      className="w-full h-full object-contain md:object-cover transition-all duration-200 ease-out animate-fadeIn"
                    />
                  </div>

                  {/* Hidden prefetch for ultra-smooth instant frame switching */}
                  <div className="hidden">
                    {MASCOT_FRAMES.map((src) => (
                      <img key={src} src={src} alt="preload" />
                    ))}
                  </div>

                  {/* Running Dynamic Progress Pill positioned at bottom */}
                  <div className="relative z-10 w-full bg-slate-950/80 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-left shadow-xl">
                    <div className="flex items-center justify-between text-xs font-black text-white mb-1.5">
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                        {progressText}
                      </span>
                      <span className="text-base text-emerald-300 font-extrabold ml-2 shrink-0">{progressPercent}%</span>
                    </div>

                    {/* Gradient Progress Gauge Bar */}
                    <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden shadow-inner p-0.5 border border-white/10">
                      <div
                        className="bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 h-full rounded-full transition-all duration-300 ease-out shadow-lg"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* 2. Headline & Mascot Description */}
                <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-1">
                  G-브릿지 AI가 사업계획서를 정밀 진단하고 있습니다
                </h3>
                <p className="text-xs md:text-sm text-slate-500 font-medium max-w-lg mb-6">
                  봉공이와 함께 7종 공공 RAG 보고서를 교차 검증하고 최적의 지원사업을 매칭합니다.
                </p>

                {/* 3. 4-Stage Diagnostic Steps Checklist */}
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 text-left">
                  {[
                    { step: 1, label: '문서 핵심 지표 파싱', icon: 'description' },
                    { step: 2, label: 'T·E·M 성숙도 & 병목 진단', icon: 'network_check' },
                    { step: 3, label: '공공 RAG 교차 검증', icon: 'library_books' },
                    { step: 4, label: '맞춤 지원사업 매칭 완료', icon: 'verified' },
                  ].map((item) => {
                    const isDone = currentStep > item.step || (currentStep === 4 && progressPercent >= 100);
                    const isCurrent = currentStep === item.step && progressPercent < 100;
                    return (
                      <div
                        key={item.step}
                        className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                          isDone
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : isCurrent
                            ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-sm animate-pulse'
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">
                          {isDone ? 'check_circle' : item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
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

    </div>
  );
};
