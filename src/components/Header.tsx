import React from 'react';

export type NavTab = 
  | 'diagnosis' 
  | 'programs' 
  | 'matching' 
  | 'admin';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  hasAnalyzedCompany?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, hasAnalyzedCompany }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20">
      <div className="h-16 w-full px-margin-desktop flex items-center justify-between">
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-xs cursor-pointer" onClick={() => setActiveTab('diagnosis')}>
            <div className="w-7 h-7 rounded-xl bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm font-bold shadow-sm">
              G
            </div>
            <span className="font-headline-md text-headline-md text-primary tracking-tight font-extrabold">
              G-브릿지
            </span>
          </div>
          <span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold tracking-wide">
            GBSA 기업지원 플랫폼
          </span>
        </div>

        {/* 4 Core PRD Tabs */}
        <nav className="hidden lg:flex items-center gap-space-lg">
          <button
            type="button"
            onClick={() => setActiveTab('diagnosis')}
            className={`transition-colors py-2 px-1 border-b-2 font-label-lg text-label-lg ${
              activeTab === 'diagnosis'
                ? 'text-primary font-bold border-primary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            1. 기업 성장진단
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('programs')}
            className={`transition-colors py-2 px-1 border-b-2 font-label-lg text-label-lg relative ${
              activeTab === 'programs'
                ? 'text-primary font-bold border-primary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            2. 맞춤 지원사업 연계
            {hasAnalyzedCompany && (
              <span className="absolute -top-1 -right-3 px-1.5 py-0.2 rounded-full bg-secondary text-white text-[10px] font-extrabold animate-pulse">
                추천
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matching')}
            className={`transition-colors py-2 px-1 border-b-2 font-label-lg text-label-lg relative ${
              activeTab === 'matching'
                ? 'text-primary font-bold border-primary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            3. 기업 협력 매칭
            {hasAnalyzedCompany && (
              <span className="absolute -top-1 -right-3 px-1.5 py-0.2 rounded-full bg-primary text-white text-[10px] font-extrabold">
                B2B
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              window.open('?view=admin', '_blank');
            }}
            className="transition-all py-1.5 px-3 rounded-lg font-label-lg text-label-lg text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 flex items-center gap-1.5 font-bold"
            title="새 탭에서 관리자 페이지 열기"
          >
            <span className="material-symbols-outlined text-base text-blue-600">admin_panel_settings</span>
            <span>관리자 콘솔</span>
            <span className="material-symbols-outlined text-xs text-slate-400">open_in_new</span>
          </button>
        </nav>

        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-low border border-outline-variant/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">데이터 연동 상태 양호</span>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container flex items-center justify-center border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-xl">account_circle</span>
          </div>
        </div>
      </div>
    </header>
  );
};
