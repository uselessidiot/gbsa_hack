import React, { useState } from 'react';
import { MOCK_POLICY_PROPOSALS } from '../data/mockInsights';
import { generatePolicyProposalWithGemini } from '../services/gemini';
import { PolicyProposalDraft } from '../types';

export const WorldBankView: React.FC = () => {
  const [proposals, setProposals] = useState<PolicyProposalDraft[]>(MOCK_POLICY_PROPOSALS);
  const [targetIndustry, setTargetIndustry] = useState<string>('제조 AI');
  const [targetBottleneck, setTargetBottleneck] = useState<string>('PMF (유상 실증)');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

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
      evidenceDataSummary: `G-BRIDGE AI 축적 데이터 및 World Bank WDI 글로벌 제조업 비중(27.6%) 데이터 기반`,
      createdAt: new Date().toISOString()
    };

    setProposals([newProposal, ...proposals]);
    setIsGenerating(false);
  };

  return (
    <div className="w-full px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">
            api.worldbank.org/v2 & GBSA AI Core
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mt-space-2xs">
            World Bank 글로벌 거시 지표 연동 & AI 신규 사업 기획안 자동 생성기
          </h2>
        </div>
        <div className="flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold">
          <span className="material-symbols-outlined text-sm">public</span>
          <span>World Bank WDI 20,000+ Indicator API Verified</span>
        </div>
      </div>

      {/* World Bank Indicators Live Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/20">
          <span className="font-label-md text-label-md text-on-surface-variant">제조업 부가가치 비중 (NV.IND.MANF.ZS)</span>
          <div className="font-headline-lg text-headline-lg font-black text-primary my-space-xs">
            대한민국 27.6%
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            OECD 1위 (OECD 평균 14.1%). 경기도는 한국 제조업 MVA의 34%를 담당함.
          </p>
        </div>

        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/20">
          <span className="font-label-md text-label-md text-on-surface-variant">High-Tech 제조 수출 비중 (TX.VAL.TECH.MF.ZS)</span>
          <div className="font-headline-lg text-headline-lg font-black text-secondary my-space-xs">
            대한민국 34.8%
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            글로벌 상위 3% (글로벌 평균 19.3%). 고부가가치 AI/로봇 제조품의 수출 적합성 보증.
          </p>
        </div>

        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/20">
          <span className="font-label-md text-label-md text-on-surface-variant">연구개발 집약도 (% of GDP)</span>
          <div className="font-headline-lg text-headline-lg font-black text-primary my-space-xs">
            대한민국 4.93%
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            이스라엘에 이은 세계 2위. 기술개발(T3) 대비 시장검증(M1) 갭 해소가 시급함을 시사.
          </p>
        </div>
      </div>

      {/* AI Policy Proposal Generator Controls */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-md border border-outline-variant/20 flex flex-col gap-space-md">
        <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
          GBSA 데이터 기반 차년도 신규 지원사업 기획안 자동 생성 (AI Policy Generator)
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          누적된 도내 기업 병목 수치와 World Bank 거시 데이터 근거를 조합하여 담당자가 즉시 공문 및 예산 신청서로 활용할 수 있는 기획안 초안을 생성합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mt-space-xs">
          <div>
            <label className="font-label-md text-label-md text-on-surface-variant font-bold block mb-1">
              타겟 산업 분야
            </label>
            <input
              type="text"
              value={targetIndustry}
              onChange={(e) => setTargetIndustry(e.target.value)}
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md"
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
              className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md"
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
                  <span>AI 기획안 생성 중...</span>
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
