import React, { useState } from 'react';
import { Company, AnalysisResult, CompanyB2BProfile } from '../types';
import { MOCK_COMPANIES, MOCK_B2B_MATCHES } from '../data/mockCompanies';
import { AnalysisKeywordTags } from '../components/AnalysisKeywordTags';

interface CompanyMatchingViewProps {
  currentCompany?: {
    company: Company;
    analysis: AnalysisResult;
    profile: CompanyB2BProfile;
  } | null;
  onNavigateToAdmin?: () => void;
}

export const CompanyMatchingView: React.FC<CompanyMatchingViewProps> = ({
  currentCompany,
  onNavigateToAdmin
}) => {
  const activeTarget = currentCompany || MOCK_COMPANIES[0];
  const { company, analysis, profile } = activeTarget;
  const matches = MOCK_B2B_MATCHES[company.id] || MOCK_B2B_MATCHES['COMP-001'] || [];

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [partnerProposal, setPartnerProposal] = useState<{ partnerName: string; text: string } | null>(null);

  const handleGenerateProposal = (partnerName: string, synergy: string) => {
    setPartnerProposal({
      partnerName,
      text:
        `[B2B 협력 및 오픈이노베이션 제안서]\n\n` +
        `■ 발신 기업: ${company.name} (대표 역량: ${profile.capabilities.join(', ')})\n` +
        `■ 수신 기업: ${partnerName}\n` +
        `■ 제안 목적: GBSA G-BRIDGE AI 매칭 엔진을 통한 수요-공급 연계\n` +
        `■ 협력 제안 분야: ${profile.technologies.join(', ')} 기반 공동 실증 및 솔루션 도입\n` +
        `■ 기대 시너지: ${synergy}\n` +
        `■ 지원 연계: 경기도 유상 실증 바우처 사업 공동 신청 및 PoC 비용 분담`
    });
  };

  return (
    <div className="w-full px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-6xl mx-auto animate-fadeIn">
      {/* Target Company Banner */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xl">
            <span className="material-symbols-outlined text-2xl">hub</span>
          </div>
          <div>
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold">
                B2B 프로필
              </span>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                {company.name}
              </h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              공급 역량: <strong className="text-primary font-semibold">{profile.capabilities.join(' · ')}</strong> | 협력 니즈: <strong className="text-secondary font-semibold">{profile.needs.join(' · ')}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          {onNavigateToAdmin && (
            <button
              type="button"
              onClick={onNavigateToAdmin}
              className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md font-bold transition border border-outline-variant/30"
            >
              <span>다음: 관리자 Intelligence 확인하기</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest px-space-lg py-space-md shadow-sm">
        <AnalysisKeywordTags company={company} analysis={analysis} profile={profile} label="매칭 기준 키워드" />
      </div>

      {/* Header & Semantic Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">
            Track B · 기업 Discovery & B2B 협력 매칭 엔진
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mt-space-2xs">
            {company.name}과 시너지가 가장 높은 도내 파트너 & 수요기업
          </h2>
        </div>
      </div>

      {/* Semantic Search Bar */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-md border border-outline-variant/20 flex items-center gap-space-sm">
        <span className="material-symbols-outlined text-primary text-2xl pl-2">search</span>
        <input
          type="text"
          placeholder="자연어로 검색해보세요: '자동차 부품 라인 비전 검사 실증 수요기업', '물류센터 테스트베드' 등..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 bg-transparent text-on-surface font-body-md focus:outline-none"
        />
        <button
          type="button"
          onClick={() => alert(`[${searchQuery}] 시맨틱 RAG 검색 결과를 갱신했습니다.`)}
          className="px-space-lg py-space-xs rounded-xl bg-primary text-white font-label-md font-bold shrink-0 shadow-sm"
        >
          AI 검색
        </button>
      </div>

      {/* Proposal Modal Preview */}
      {partnerProposal && (
        <div className="p-space-xl rounded-2xl bg-surface-container-lowest shadow-xl border-2 border-primary animate-fadeIn flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">description</span>
              B2B 협력 제안서 초안 완성 ({partnerProposal.partnerName})
            </span>
            <button
              type="button"
              onClick={() => setPartnerProposal(null)}
              className="text-on-surface-variant hover:text-on-surface text-sm font-bold"
            >
              닫기 ✕
            </button>
          </div>
          <pre className="p-space-md rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface whitespace-pre-wrap leading-relaxed border border-outline-variant/30">
            {partnerProposal.text}
          </pre>
          <div className="flex justify-end gap-space-xs">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(partnerProposal.text);
                alert('협력 제안서가 클립보드에 복사되었습니다.');
              }}
              className="px-space-md py-space-xs rounded-xl bg-primary text-white font-label-md font-bold shadow-md hover:opacity-90 transition"
            >
              제안서 복사하기
            </button>
          </div>
        </div>
      )}

      {/* Matches Grid */}
      <div className="flex flex-col gap-space-lg">
        {matches.map((match, idx) => (
          <div
            key={match.id}
            className={`p-space-xl rounded-2xl bg-surface-container-lowest shadow-md border transition flex flex-col justify-between ${
              idx === 0
                ? 'border-2 border-primary shadow-xl'
                : 'border-outline-variant/20 hover:border-primary/40'
            }`}
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-space-xs mb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-xs py-space-2xs rounded bg-primary-container text-on-primary-container font-label-sm font-bold">
                    매칭 유형: {match.matchType === 'CAPABILITY_TO_NEED' ? '수요-공급 직결' : match.matchType === 'JOINT_POC' ? '공동 실증/PoC' : '공급망 연계'}
                  </span>
                  <span className="px-space-xs py-space-2xs rounded bg-surface-container text-on-surface-variant font-label-sm font-bold">
                    {match.targetIndustry}
                  </span>
                </div>

                <div className="font-headline-md text-headline-md font-extrabold text-primary flex items-center gap-1">
                  <span className="text-sm font-normal text-on-surface-variant">시너지 점수</span>
                  <span>{match.matchScore}점</span>
                </div>
              </div>

              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-space-xs">
                {match.targetCompanyName}
              </h3>

              {/* Match Reasons List */}
              <div className="p-space-md rounded-xl bg-surface-container-low mb-space-md border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-primary font-bold block mb-1">
                  🤝 AI 매칭 근거 및 일치 항목:
                </span>
                <ul className="space-y-1">
                  {match.matchingReasons.map((reason, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2 text-body-sm text-on-surface">
                      <span className="material-symbols-outlined text-secondary text-sm shrink-0 mt-0.5">check</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expected Synergy */}
              <div className="mb-space-md p-space-sm rounded-xl bg-surface-container flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-xl shrink-0">handshake</span>
                <p className="font-body-sm text-body-sm text-on-surface font-medium">
                  <strong>기대 시너지:</strong> {match.synergyDescription}
                </p>
              </div>
            </div>

            <div className="pt-space-md border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-space-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                상태: <strong className="text-secondary">GBSA 담당자 연결 가능</strong>
              </span>

              <div className="flex items-center gap-space-xs w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => handleGenerateProposal(match.targetCompanyName, match.synergyDescription)}
                  className="w-full md:w-auto px-space-lg py-space-xs rounded-xl bg-primary text-on-primary font-label-md font-bold shadow-md hover:opacity-90 transition"
                >
                  협력 제안서 초안 작성
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
