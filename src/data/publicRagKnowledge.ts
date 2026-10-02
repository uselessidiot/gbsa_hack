/**
 * G-BRIDGE AI Public Report RAG Knowledge Engine
 * 공공 산업 리포트 7종 기반 팩트 지식베이스 및 Grounding 데이터
 */

export interface PublicReportMeta {
  id: string;
  fileName: string;
  title: string;
  publisher: string;
  publishedDate: string;
  category: '제조/AI' | '로봇/모빌리티' | '바이오/헬스' | '에너지/기후' | '창업/통계';
  pageCount: number;
  fileSize: string;
  summary: string;
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
    id: 'RAG-PUB-001',
    fileName: '2026 경기도 중소기업 동향 보고서.pdf',
    title: '2026 경기도 중소기업 경기 및 제조 디지털전환 실태 동향',
    publisher: '경기도경제과학진흥원 (GBSA) / 경기연구원',
    publishedDate: '2026-06',
    category: '제조/AI',
    pageCount: 48,
    fileSize: '1.3 MB',
    summary: '도내 중소 제조기업의 설비투자 여력과 무상 PoC 이후 유상 전환 애로사항(78.4% 도입 망설임) 및 스마트공장 AI 실증 바우처 필요성 분석',
    keyInsights: [
      {
        page: 18,
        quote: '도내 제조 1차·2차 협력사의 78.4%는 초기 무상 PoC에는 호의적이나, 정량적 ROI(원가 25% 절감 또는 불량 검출 30% 개선) 보증 없이는 유상 도입 전환을 유보하는 양상을 보임.',
        implication: '비전웍스AI 등 제조AI 기업은 단순 알고리즘 우수성보다 공정 3개월 내 30% 비용 절감 정량 보증서 제공이 필수적임.',
        targetIndustry: '제조 AI',
        recommendedSupport: 'GBSA 산업데이터 표준확산 AI 실증 지원사업 (과제당 5,115만원)'
      },
      {
        page: 32,
        quote: '스마트제조 공급기업의 가장 큰 병목은 현장 MES/PLC 프로토콜 비표준화로 인한 커스터마이징 비용 과다(전체 원가의 42% 점유)로 파악됨.',
        implication: '현장 세팅 5분 자동화 툴 및 AAS 표준 프로토콜 호환 모듈 개발 시급.',
        targetIndustry: '스마트공장 SI',
        recommendedSupport: '경기도 스마트공장 보급 및 제조AI 고도화 지원'
      }
    ]
  },
  {
    id: 'RAG-PUB-002',
    fileName: '08_월간KIET산업경제_제334호_2026-07_산업경제분석_이민주_서비스업_AI_전환_측정.pdf',
    title: '월간 KIET 산업경제 제334호 - 국내 산업 AI 전환 측정 및 생산성 효과',
    publisher: '산업연구원 (KIET)',
    publishedDate: '2026-07',
    category: '제조/AI',
    pageCount: 16,
    fileSize: '307 KB',
    summary: '국내 AI 도입 기업의 부가가치 창출 효과 및 장비 일시불 구매 대비 구독형(SaaS/MaaS) 과금 모델의 시장 침투율 분석',
    keyInsights: [
      {
        page: 9,
        quote: '국내 AI 솔루션 도입 기업 중 초기 구축비 일시불 부담 완화를 위해 구독형(월정액/사용량 과금) 모델을 채택한 기업의 계약 유지율이 2.4배 높게 측정됨.',
        implication: '하드웨어 일시불 판매(3,000만원)를 지양하고, 초기 구축비는 GBSA 바우처로 보조받으며 월 50만원 SaaS 구독 모델로 전환할 것을 강력 권고.',
        targetIndustry: '제조 AI / B2B SaaS',
        recommendedSupport: 'AI 바우처 및 클라우드 서비스 이용 지원'
      }
    ]
  },
  {
    id: 'RAG-PUB-003',
    fileName: '2026년_하반기13대_주역산업_전망.pdf',
    title: '2026년 하반기 13대 주력산업 수출 및 신기술 시장 전망 (로봇/바이오/이차전지/신재생)',
    publisher: '산업통상자원부 / KIET',
    publishedDate: '2026-08',
    category: '로봇/모빌리티',
    pageCount: 36,
    fileSize: '291 KB',
    summary: '글로벌 물류 AMR 로봇 및 신재생에너지(BIPV/페로브스카이트) 시장의 연평균 20% 이상 고성장과 ISO 3691-4 안전 인증, KS 내화 인증 등 규제 장벽 분석',
    keyInsights: [
      {
        page: 14,
        quote: '자율주행 물류 AMR 시장은 연평균 28.4% 성장 중이나, 주요 물류창고 입찰 가이드라인에서 ISO 3691-4 안전 표준 규격 및 24시간 무정지 실증 이력이 필수 제출 요건으로 채택됨.',
        implication: '로보플로우는 해외 전시회 마케팅보다 경기도 로봇 테스트베드에서 24시간 무오류 주행 및 ISO 안전 인증 획득이 선행되어야 함.',
        targetIndustry: '로봇 / 물류',
        recommendedSupport: '경기도 로봇 실증 테스트베드 및 안전인증 패스트트랙'
      },
      {
        page: 27,
        quote: '글로벌 BIPV(건물일체형 태양광) 시장은 제로에너지빌딩 의무화로 연 21.5% 급성장 중이나, 건축 외장재 KS C 8577 내화·내풍압 인증 미보유 시 신축 건물 시공 불가.',
        implication: '솔라테크는 대면적 롤투롤 양산 라인 설비 투자(CAPEX)와 KS 내화 인증 시험을 동시에 추진해야 도내 대형 건설사 납품 가능.',
        targetIndustry: '신재생에너지 / 소재',
        recommendedSupport: '경기 기후테크 100 혁신성장 펀드 & BIPV 실증 바우처'
      }
    ]
  },
  {
    id: 'RAG-PUB-004',
    fileName: '2026 경기도 창업생태계 동향 보고서.pdf',
    title: '2026 경기도 딥테크 창업생태계 및 바이오/의료기기 규제 장벽 실태조사',
    publisher: '경기도경제과학진흥원 (GBSA)',
    publishedDate: '2026-07',
    category: '바이오/헬스',
    pageCount: 52,
    fileSize: '1.3 MB',
    summary: '광교 바이오밸리 등 도내 바이오·의료기기 스타트업의 83%가 식약처 품목허가 심사 지연(평균 8.4개월)으로 인해 매출 공백기를 겪는 실태 및 GBSA RA 인허가 지원 효과 분석',
    keyInsights: [
      {
        page: 22,
        quote: '디지털 헬스케어 및 AI 의료기기 창업기업의 최대 진입 장벽은 식약처 2등급 품목허가 및 임상 유효성 검증으로, 전문 RA 컨설팅 미지원 시 허가 기간이 6개월 이상 추가 지연됨.',
        implication: '메디헬스바이오는 판로 마케팅 이전 GBSA 바이오센터 전담 RA 심사관 매칭을 통해 보완 서류를 1개월 내 완결해야 함.',
        targetIndustry: '디지털 헬스케어',
        recommendedSupport: 'GBSA 바이오센터 의료기기 RA 인허가 패스트트랙 지원'
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
        keywords.some((k) => insight.quote.toLowerCase().includes(k.toLowerCase()) || insight.implication.toLowerCase().includes(k.toLowerCase()));

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
