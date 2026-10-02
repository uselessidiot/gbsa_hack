import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { MascotWidget } from './components/MascotWidget';
import { LandingView } from './views/LandingView';
import { ResultView } from './views/ResultView';
import { ProgramMatchingView } from './views/ProgramMatchingView';
import { CompanyMatchingView } from './views/CompanyMatchingView';
import { AdminIntelligenceView } from './views/AdminIntelligenceView';
import { Company, AnalysisResult, CompanyB2BProfile } from './types';
import { MOCK_COMPANIES } from './data/mockCompanies';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'admin' || params.get('admin') === 'true' || window.location.hash.includes('admin')) {
        return 'admin';
      }
    }
    return 'diagnosis';
  });
  const [analysisResult, setAnalysisResult] = useState<{
    company: Company;
    analysis: AnalysisResult;
    profile: CompanyB2BProfile;
  } | null>(null);

  const handleStartAnalysis = (result: {
    company: Company;
    analysis: AnalysisResult;
    profile: CompanyB2BProfile;
  }) => {
    setAnalysisResult(result);
    setActiveTab('diagnosis');
  };

  const handleBackToUpload = () => {
    setAnalysisResult(null);
    setActiveTab('diagnosis');
  };

  // Safe fallback target if a user navigates to programs/matching before uploading
  const currentTarget = analysisResult || MOCK_COMPANIES[0];

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between selection:bg-primary-fixed selection:text-on-primary-fixed font-body-md text-on-surface">
      <div>
        {activeTab !== 'admin' && (
          <Header
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
            }}
            hasAnalyzedCompany={Boolean(analysisResult)}
          />
        )}
        
        <main className={`w-full ${activeTab === 'admin' ? 'pt-0' : 'pt-16'} bg-surface min-h-screen`}>
          {activeTab === 'diagnosis' && (
            analysisResult ? (
              <ResultView
                data={analysisResult}
                onBackToUpload={handleBackToUpload}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            ) : (
              <LandingView onStartAnalysis={handleStartAnalysis} />
            )
          )}

          {activeTab === 'programs' && (
            <ProgramMatchingView
              currentCompany={currentTarget}
              onNavigateToMatching={() => setActiveTab('matching')}
            />
          )}

          {activeTab === 'matching' && (
            <CompanyMatchingView
              currentCompany={currentTarget}
              onNavigateToAdmin={() => setActiveTab('admin')}
            />
          )}

          {activeTab === 'admin' && (
            <AdminIntelligenceView />
          )}
        </main>
      </div>

      {/* 3D Mascot Interactive Widget */}
      {activeTab !== 'admin' && (
        <MascotWidget
          customMessage={
            analysisResult
              ? `${analysisResult.company.name}의 성장진단이 완료되었습니다. 맞춤 지원사업과 B2B 매칭 파트너를 확인해보세요!`
              : undefined
          }
        />
      )}

      {/* Global Footer */}
      {activeTab !== 'admin' && <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.02)] py-space-xl border-t border-outline-variant/20 mt-space-2xl">
        <div className="w-full px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-2xs text-left">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              경기도경제과학진흥원 GBSA
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              G-BRIDGE AI · 사업계획서 기반 기업지원 & B2B 매칭 Intelligence 플랫폼
            </span>
          </div>
          <div className="flex items-center gap-space-lg text-on-surface-variant font-label-md text-label-md">
            <span>T·E·M 진단 모델 v1.0</span>
            <span>운영센터 1588-0000</span>
            <span>© GBSA. All rights reserved.</span>
          </div>
        </div>
      </footer>}
    </div>
  );
}

export default App;
