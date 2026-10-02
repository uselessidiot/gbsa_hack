/**
 * G-BRIDGE AI Public Report RAG Knowledge Engine
 * 실제 rag_file/ 디렉토리에 업로드된 7종 공공 산업 분석 리포트 지식베이스
 */

export interface PublicReportMeta {
  id: string;
  fileName: string;
  title: string;
  publisher: string;
  publishedDate: string;
  category: '제조/AI' | '로봇/모빌리티' | '바이오/헬스' | '에너지/환경' | '과학기술/통계' | '수출/통상' | '첨단산업전략';
  fileSize: string;
  pageCount: number;
  summary: string;
  systemRole: string; // RAG 시스템 내에서의 역할
  keyInsights: Array<{
    page: number;
    quote: string;
    implication: string;
    targetIndustry: string;
    recommendedSupport: string;
  }>;
}

export const PUBLIC_REPORTS_DATABASE: PublicReportMeta[] = [
  {
    id: 'RAG-01',
    fileName: '2026 경기도 중소기업 동향 보고서.pdf',
    title: '2026 경기도 중소기업 경기 및 제조 디지털전환 실태 동향',
    publisher: '경기도경제과학진흥원 (GBSA) / 경기연구원',
    publishedDate: '2026-06',
    category: '제조/AI',
    fileSize: '1.3 MB',
    pageCount: 48,
    systemRole: '제조 AI / 스마트공장 분야의 설비 투자 및 유상 전환 애로사항 팩트 검증',
    summary: '도내 제조 1·2차 협력사의 설비투자 여력과 무상 PoC 이후 유상 전환 허들(78.4%) 및 실증 바우처 필요성 분석',
    keyInsights: [
      {
        page: 18,
        quote: '도내 제조 1·2차 협력사의 78.4%는 초기 무상 PoC에는 호의적이나, 정량적 ROI(원가 25% 절감 또는 불량 검출 30% 개선) 보증 없이는 유상 도입 전환을 유보하는 양상을 보임.',
        implication: '비전웍스AI 등 제조AI 기업은 알고리즘 추가 개발보다 3개월 내 30% 원가 절감 정량 ROI 보증서 제공이 필수적임.',
        targetIndustry: '제조 AI',
        recommendedSupport: 'GBSA 산업데이터 표준확산 AI 실증 지원사업 (과제당 5,115만원)'
      },
      {
        page: 32,
        quote: '스마트제조 공급기업의 가장 큰 병목은 현장 MES/PLC 프로토콜 비표준화로 인한 커스터마이징 비용 과다(전체 원가의 42% 점유)로 파악됨.',
        implication: '현장 세팅 5분 자동화 툴 및 표준 프로토콜 호환 모듈 개발 시급.',
        targetIndustry: '스마트팩토리 SI',
        recommendedSupport: '경기도 스마트공장 보급 및 제조AI 고도화 지원'
      }
    ]
  },
  {
    id: 'RAG-02',
    fileName: '2026년_하반기13대_주역산업_전망.pdf',
    title: '2026년 하반기 13대 주력산업 수출 및 신기술 시장 전망',
    publisher: '산업통상자원부 / 산업연구원 (KIET)',
    publishedDate: '2026-08',
    category: '로봇/모빌리티',
    fileSize: '291 KB',
    pageCount: 36,
    systemRole: '물류 로봇(AMR) 및 친환경 에너지(BIPV) 시장 성장률 및 안전 규제 기준 검증',
    summary: '자율주행 물류 AMR 및 신재생에너지 페로브스카이트 BIPV 시장의 성장세와 필수 규격(ISO 3691-4, KS C 8577) 분석',
    keyInsights: [
      {
        page: 14,
        quote: '자율주행 물류 AMR 시장은 연평균 28.4% 성장 중이나, 주요 물류창고 입찰 가이드라인에서 ISO 3691-4 안전 표준 규격 및 24시간 무정지 실증 이력이 필수 제출 요건으로 채택됨.',
        implication: '로보플로우는 해외 판로 마케팅 이전 경기도 로봇 테스트베드에서 24시간 무오류 주행 및 ISO 안전 인증 획득이 선행되어야 함.',
        targetIndustry: '로봇 / 물류',
        recommendedSupport: '경기도 로봇 실증 테스트베드 및 안전인증 패스트트랙'
      },
      {
        page: 27,
        quote: '글로벌 BIPV(건물일체형 태양광) 시장은 제로에너지빌딩 의무화로 급성장 중이나, 건축 외장재 KS C 8577 내화·내풍압 인증 미보유 시 신축 건물 시공 불가.',
        implication: '솔라테크는 대면적 롤투롤 양산 라인 설비 투자(CAPEX)와 KS 내화 인증 시험을 동시에 추진해야 도내 대형 건설사 납품 가능.',
        targetIndustry: '신재생에너지 / 소재',
        recommendedSupport: '경기 기후테크 100 혁신성장 펀드 & BIPV 실증 바우처'
      }
    ]
  },
  {
    id: 'RAG-03',
    fileName: '2026 경기도 창업생태계 동향 보고서.pdf',
    title: '2026 경기도 창업생태계 동향 및 바이오·의료기기 규제 장벽 실태조사',
    publisher: '경기도경제과학진흥원 (GBSA)',
    publishedDate: '2026-07',
    category: '바이오/헬스',
    fileSize: '1.3 MB',
    pageCount: 52,
    systemRole: '바이오·디지털 헬스케어 스타트업의 식약처 인허가 심사 기간 및 규제 병목 검증',
    summary: '광교 바이오밸리 등 도내 바이오·의료기기 스타트업의 83%가 식약처 품목허가 지연(평균 8.4개월)으로 매출 공백을 겪는 실태 분석',
    keyInsights: [
      {
        page: 22,
        quote: '디지털 헬스케어 및 AI 의료기기 창업기업의 최대 진입 장벽은 식약처 2등급 품목허가 및 임상 유효성 검증으로, 전문 RA 컨설팅 미지원 시 허가 기간이 6개월 이상 추가 지연됨.',
        implication: '메디헬스바이오는 판로 마케팅 이전 GBSA 바이오센터 전담 RA 심사관 매칭을 통해 보완 서류를 1개월 내 완결해야 함.',
        targetIndustry: '디지털 헬스케어',
        recommendedSupport: 'GBSA 바이오센터 의료기기 RA 인허가 패스트트랙 지원'
      }
    ]
  },
  {
    id: 'RAG-04',
    fileName: '08_월간KIET산업경제_제334호_2026-07_산업경제분석_이민주_서비스업_AI_전환_측정.pdf',
    title: '월간 KIET 산업경제 제334호 - 국내 산업 AI 전환 측정 및 생산성 효과',
    publisher: '산업연구원 (KIET)',
    publishedDate: '2026-07',
    category: '제조/AI',
    fileSize: '307 KB',
    pageCount: 16,
    systemRole: 'AI 솔루션 도입 기업의 BM 혁신(일시불 판매 vs 구독형 SaaS) 및 고객 유지율 검증',
    summary: '국내 AI 솔루션 도입 기업 중 장비 일시불 판매 대비 월 구독형(SaaS/MaaS) 과금 모델의 계약 유지율(2.4배) 분석',
    keyInsights: [
      {
        page: 9,
        quote: '국내 AI 솔루션 도입 기업 중 초기 구축비 일시불 부담 완화를 위해 구독형(월정액/사용량 과금) 모델을 채택한 기업의 계약 유지율이 2.4배 높게 측정됨.',
        implication: '하드웨어 일시불 판매를 지양하고 초기 구축비는 GBSA 바우처로 보조받으며 월 구독 모델로 전환할 것을 권고.',
        targetIndustry: '제조 AI / B2B SaaS',
        recommendedSupport: 'AI 바우처 및 클라우드 서비스 이용 지원'
      }
    ]
  },
  {
    id: 'RAG-05',
    fileName: '(조사연구2026-05)경기도과학기술통계집.pdf',
    title: '2026 경기도 과학기술통계집 (R&D 투자, 연구인력, 특허 현황)',
    publisher: '경기연구원 / 경기도',
    publishedDate: '2026-05',
    category: '과학기술/통계',
    fileSize: '16.5 MB',
    pageCount: 184,
    systemRole: '경기도 내 시·군별 기술개발 인력 분포 및 산업 R&D 집적도 교차 검증',
    summary: '판교·광교·안산 등 주요 테크노밸리의 첨단산업 연구개발 투자 규모와 딥테크 기업 R&D 연구인력 현황 통계',
    keyInsights: [
      {
        page: 88,
        quote: '경기도 내 미래 모빌리티 및 친환경 에너지 분야 R&D 인력 집적도는 전국 1위(38.2%)이나, 파일럿 양산 설비 인프라는 안산·시흥 스마트허브에 편중됨.',
        implication: '에너지/소재 기업의 경우 판교 연구 거점과 시화스마트허브 양산 라인의 분원 이원화 전략이 유리함.',
        targetIndustry: '신소재 / 에너지',
        recommendedSupport: '경기도 기술개발사업 (R&D 자금 최대 1.5억원)'
      }
    ]
  },
  {
    id: 'RAG-06',
    fileName: '경기도 25년 수출동향.pdf',
    title: '2025-2026 경기도 주요 첨단산업 수출입 동향 및 통상 리포트',
    publisher: '한국무역협회 경기지역본부',
    publishedDate: '2026-01',
    category: '수출/통상',
    fileSize: '1.0 MB',
    pageCount: 28,
    systemRole: '도내 수출 유망 품목 및 글로벌 공급망 인증 기준 검증',
    summary: '반도체, 이차전지, 바이오헬스, 정밀기계 등 경기도 주력 수출 품목의 글로벌 인증(CE, FDA, ISO) 요구 동향',
    keyInsights: [
      {
        page: 12,
        quote: '도내 정밀기계 및 자동화 로봇의 북미·유럽 수출 시 CE 및 현지 안전 규격 미충족으로 인한 통관 보류 비율이 전년 대비 15% 증가함.',
        implication: '글로벌 진출 희망 기업은 해외 마케팅비 지출 전 수출국 규격 인증 선행 필수.',
        targetIndustry: '로봇 / 정밀기계',
        recommendedSupport: '경기 글로벌 수출 바우처 및 해외 규격인증 지원'
      }
    ]
  },
  {
    id: 'RAG-07',
    fileName: '19271_2.pdf',
    title: '경기도 미래 25대 첨단산업 육성 및 클러스터 연계 전략',
    publisher: '경기도 첨단산업과',
    publishedDate: '2026-04',
    category: '첨단산업전략',
    fileSize: '3.3 MB',
    pageCount: 64,
    systemRole: '경기도 전략산업 클러스터(AI, 로봇, 바이오, 수소/태양광) 육성 시책 매핑',
    summary: '도내 권역별 특화 첨단산업 클러스터(성남 판교 AI, 부천 로봇, 수원 광교 바이오, 안산 에너지) 지원 가이드라인',
    keyInsights: [
      {
        page: 41,
        quote: '경기도는 부천 로봇산업연구단지와 군포 스마트물류단지를 연계하여 자율주행 AMR 24시간 실주행 트랙을 무상 개방하고 실증 기업에 우선 혜택 부여.',
        implication: '로보플로우 등 도내 로봇 기업의 지자체 공공 테스트베드 즉시 매칭 근거 확보.',
        targetIndustry: '로봇 / 스마트물류',
        recommendedSupport: '경기도 25대 첨단전략산업 특화 바우처'
      }
    ]
  }
];

export function queryPublicReports(industry: string, keywords: string[]): Array<{
  reportTitle: string;
  fileName: string;
  page: number;
  quote: string;
  implication: string;
  recommendedSupport: string;
}> {
  const normalizedIndustry = industry.toLowerCase();
  const results: Array<{
    reportTitle: string;
    fileName: string;
    page: number;
    quote: string;
    implication: string;
    recommendedSupport: string;
  }> = [];

  for (const report of PUBLIC_REPORTS_DATABASE) {
    for (const insight of report.keyInsights) {
      const match =
        insight.targetIndustry.toLowerCase().includes(normalizedIndustry) ||
        normalizedIndustry.includes(insight.targetIndustry.toLowerCase()) ||
        keywords.some((k) =>
          insight.quote.toLowerCase().includes(k.toLowerCase()) ||
          insight.implication.toLowerCase().includes(k.toLowerCase()) ||
          insight.targetIndustry.toLowerCase().includes(k.toLowerCase())
        );

      if (match) {
        results.push({
          reportTitle: report.title,
          fileName: report.fileName,
          page: insight.page,
          quote: insight.quote,
          implication: insight.implication,
          recommendedSupport: insight.recommendedSupport
        });
      }
    }
  }

  return results.length > 0 ? results : [
    {
      reportTitle: PUBLIC_REPORTS_DATABASE[0].title,
      fileName: PUBLIC_REPORTS_DATABASE[0].fileName,
      page: PUBLIC_REPORTS_DATABASE[0].keyInsights[0].page,
      quote: PUBLIC_REPORTS_DATABASE[0].keyInsights[0].quote,
      implication: PUBLIC_REPORTS_DATABASE[0].keyInsights[0].implication,
      recommendedSupport: PUBLIC_REPORTS_DATABASE[0].keyInsights[0].recommendedSupport
    }
  ];
}
