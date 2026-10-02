import { AdminDashboardMetrics, PolicyProposalDraft } from '../types';

export const MOCK_ADMIN_METRICS: AdminDashboardMetrics = {
  totalAnalyzedCompanies: 248,
  temDistribution: {
    technology: { T1: 18, T2: 62, T3: 112, T4: 56 },
    execution: { E1: 34, E2: 88, E3: 94, E4: 32 },
    market: { M1: 104, M2: 82, M3: 44, M4: 18 }
  },
  bottleneckStats: {
    PMF: 78,          // 31.5% (1위)
    VALIDATION: 54,   // 21.8% (2위)
    TECH: 38,         // 15.3% (3위)
    REGULATION: 30,   // 12.1%
    SALES: 22,
    INVESTMENT: 14,
    STANDARDIZE: 6,
    GLOBAL: 4,
    DIVERSIFY: 2
  },
  topNeeds: [
    { need: '제조 현장 유상/무상 테스트베드', count: 94 },
    { need: '1차 수요기업 세일즈 미팅 연결', count: 82 },
    { need: '식약처/KCE 안전 인증 RA 지원', count: 48 },
    { need: '시리즈 A/B 투자자 IR 연결', count: 36 },
    { need: '해외 유통 파트너 바이어 발굴', count: 24 }
  ],
  topCapabilities: [
    { capability: 'AI 비전 및 품질 불량 검사', count: 42 },
    { capability: '자율주행 AMR 및 엠비언트 기술', count: 35 },
    { capability: '생체신호 데이터 분석 알고리즘', count: 28 },
    { capability: '스마트팩토리 MES/ERP 연동', count: 22 }
  ],
  regionalDistribution: {
    '성남시 (판교)': 76,
    '수원시 (광교)': 52,
    '부천시 (로봇단지)': 38,
    '화성시 (자동차부품)': 34,
    '안산시/시흥시 (시화반월)': 28,
    '기타 경기도': 20
  },
  programMatchRatePercent: 88.5,
  b2bMatchCandidatesCount: 142
};

export const MOCK_POLICY_PROPOSALS: PolicyProposalDraft[] = [
  {
    id: 'PROP-001',
    title: '경기도 중소 제조기업-AI 스타트업 1:1 유상 실증(PMF) 패스트트랙 지원사업',
    targetIndustry: '제조 AI / 스마트팩토리',
    targetCompanyCount: 78,
    identifiedBottleneck: 'PMF',
    problemStatement: '도내 제조 AI 스타트업 78개사 중 68%가 T3 수준의 높은 기술 완성도를 가졌음에도 유상 수주 실적(M1) 부족으로 자금난 및 성장 정체를 겪고 있음.',
    proposedProgramTitle: 'GBSA Manufacturing AI Voucher & Commercial PoC Program',
    supportComponents: [
      '수요 제조기업에 유상 PoC 도입 바우처 지원 (기업당 최대 1억원)',
      '실증 성능검증서 발급 및 GBSA 인증 공식 서명',
      '성공적인 실증 완료 후 차년도 스마트공장 구축사업 가점 부여'
    ],
    expectedImpact: '도내 전통 제조기업 불량률 20% 감소 및 AI 스타트업 유상 매출 첫 물꼬 확보 (기업당 평균 매출 1.5억원 증가 기대)',
    targetKPIs: ['유상 PoC 전환율 70% 달성', '수요기업 만족도 90점 이상', '신규 일자리 120명 창출'],
    evidenceDataSummary: 'G-BRIDGE AI 축적 데이터: 제조 AI 기업 42개사 중 35개사가 "유상 실증처 부재"를 1순위 애로사항으로 응답함.',
    createdAt: '2026-10-02T12:00:00Z'
  }
];
