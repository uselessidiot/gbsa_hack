import { Company, AnalysisResult, CompanyB2BProfile, B2BMatchResult } from '../types';

export interface CompanyWithAnalysis {
  company: Company;
  analysis: AnalysisResult;
  profile: CompanyB2BProfile;
}

export const MOCK_COMPANIES: CompanyWithAnalysis[] = [
  // 1. 비전웍스AI (VisionWorks AI) - P0 Core Demo Case 1 (PMF / 시장검증 병목)
  {
    company: {
      id: 'COMP-001',
      name: '비전웍스AI (VisionWorks AI)',
      businessNumber: '124-88-99012',
      industry: '제조 AI',
      subIndustry: '외관 검사 자동화 & Edge AI',
      location: '경기도 성남시 판교 테크노밸리',
      foundedYear: 2022,
      employees: 14,
      revenue: 320, // 3.2억원
      exportAmount: 0,
      certifications: ['ISO9001', '벤처기업인증'],
      patents: ['AI 비전 불량 검출 알고리즘', '엣지 디바이스용 압축 모델'],
      summary: '제조 생산 라인 전용 실시간 AI 비전 불량 검사 디바이스 및 SW 솔루션 개발사',
      keywords: ['제조AI', '비전검사', 'Edge AI', '불량탐지', '스마트팩토리']
    },
    analysis: {
      id: 'ANALYSIS-001',
      companyId: 'COMP-001',
      documentId: 'DOC-001',
      analysisVersion: 'TEM-v1.0',
      temDiagnosis: {
        technology: {
          level: 'T3',
          score: 82,
          reason: '실제 자동차 및 전자 부품 제조 생산 라인에 적용 가능한 레벨의 비전 검사 S/W 및 Edge AI 하드웨어 구현 완료',
          sourceQuote: '사업계획서 p.8: "자동차 부품 라인용 VW-Inspect 2.0 시제품 개발 완료 및 상용화 직전 단계"'
        },
        execution: {
          level: 'E3',
          score: 78,
          reason: 'AI 알고리즘 및 하드웨어 개발 인력 확보 완료, 초기 투자 유치 및 14명 규모 조직 구축',
          sourceQuote: '사업계획서 p.14: "핵심 연구진 9명 보유, 시드 투자 5억원 유치 완료"'
        },
        market: {
          level: 'M1',
          score: 35,
          reason: '생산라인 PoC 진행 경험은 2건 있으나 모두 무상 실증이며, 유상 계약 또는 정기 구독 고객 매출이 부재함',
          sourceQuote: '사업계획서 p.19: "2025년 2개 고객사 무료 PoC 수행 완료, 2026년 유상 전환 추진 중"'
        },
        radarScores: {
          tech: 85,
          validation: 75,
          market: 35,
          finance: 50,
          global: 20
        }
      },
      primaryBottleneck: 'PMF',
      secondaryBottleneck: 'SALES',
      bottlenecks: [
        {
          category: 'PMF',
          title: '유상 계약 및 시장 검증(PMF) 부재',
          description: '기술성숙도(T3) 대비 유상 고객 전환 실적이 없어 시장 검증이 최우선 해결 과제임. 무상 PoC를 유상 매출로 전환할 영업 체계가 미흡함.',
          severity: 'HIGH',
          sourceEvidence: '사업계획서 p.19 라인 12: 무상 실증 2건 진행 완료, 유상 수주 실적 0건',
          pageNumber: 19
        },
        {
          category: 'SALES',
          title: '영업 채널 및 수요기업 네트워크 부족',
          description: '스마트팩토리 SI 기업 또는 대중소 제조사 구매 담당자와의 연결 채널이 부족하여 판로 개척에 어려움을 겪음.',
          severity: 'MEDIUM',
          sourceEvidence: '사업계획서 p.23: "수요기업 마케팅 및 B2B 전담 영업 인력 미비"',
          pageNumber: 23
        }
      ],
      companyRequestedSupport: [
        'AI 기술 R&D 고도화 자금 2억원 신청',
        '연구 인력 추가 채용 지원금'
      ],
      recommendedSupport: [
        'GBSA 양산 실증 및 첫 유상고객 매칭 지원사업',
        '경기도 스마트공장 수요기업 실증 바우처',
        'B2B 전문 마케팅 및 유상 PoC 전환 컨설팅'
      ],
      supportGapAnalysis: '기업은 추가 R&D 자금을 원하나, 현재 핵심 병목은 R&D가 아니라 이미 개발된 T3 기술의 첫 유상고객 확보(PMF)임. 따라서 기술 개발이 아닌 실증비용 지원 및 수요기업 연결 지원사업이 시급함.',
      strengths: [
        'Edge AI 단말 기반의 빠른 실시간 처리 속도 (99.4% 정확도)',
        '기존 생산 라인과 손쉬운 연동이 가능한 가벼운 인터페이스'
      ],
      weaknesses: [
        '유상 계약 이력 부재로 인한 차기 투자 및 성장 제약',
        '고객사 맞춤형 세팅으로 인한 표준 패키지화 미흡'
      ],
      evidenceList: [
        {
          id: 'EVI-001',
          category: 'T',
          source: '01_제조AI_비전웍스AI_사업계획서.pdf',
          page: 8,
          excerpt: 'VW-Inspect 2.0은 분당 120개 부품의 실시간 외관 불량을 99.4% 정확도로 판별할 수 있는 모듈입니다.',
          interpretation: '기술적으로 프로토타입을 넘어 실환경 적용 가능한 T3 수준에 도달함.'
        },
        {
          id: 'EVI-002',
          category: 'M',
          source: '01_제조AI_비전웍스AI_사업계획서.pdf',
          page: 19,
          excerpt: '2025년 하반기 A 부품사와 B 부품사 라인에서 총 3개월간 무상 PoC를 진행하였습니다.',
          interpretation: 'PoC 경험은 존재하나 유상 전환 매출이 발생하지 않아 M1 단계에 머물러 있음 (PMF 병목).'
        }
      ],
      actionPlan90Days: [
        { step: 1, action: '기존 무상 PoC 2개사에 대해 유상 도입 제안서 제출 및 할인 조건 협상', targetMetric: '유상 계약 1건 이상 체결', timeframe: 'Day 1-30' },
        { step: 2, action: 'GBSA 수요기업 실증 지원사업 신청 및 제조 SI 파트너 2곳과 협력 MOU 체결', targetMetric: '실증 지원사업 선정 및 파트너십 구축', timeframe: 'Day 31-60' },
        { step: 3, action: '제품 표준화 가격표 작성 및 B2B 데모 데이 참가', targetMetric: '수요기업 미팅 5회 이상 달성', timeframe: 'Day 61-90' }
      ],
      verificationNeeded: [
        '무상 PoC 진행 시 고객사 만족도 및 불량율 감소 데이터 원본 확인',
        'A 부품사 유상 수주 전환 가능성 담당자 인터뷰 필요'
      ],
      aiInsightSummary: '비전웍스AI는 기술력(T3)이 우수하나 시장검증(M1)이 병목입니다. R&D 보다는 경기도내 제조 수요기업과의 유상 실증 매칭이 성장의 스위치가 될 것입니다.',
      status: 'COMPLETED',
      createdAt: '2026-10-02T10:00:00Z'
    },
    profile: {
      companyId: 'COMP-001',
      companyName: '비전웍스AI',
      industry: '제조 AI',
      technologies: ['AI 비전 검사', 'Edge AI', '불량 탐지 알고리즘'],
      products: ['VW-Inspect 2.0'],
      targetCustomers: ['자동차 부품 제조사', '전자 부품 제조사', '스마트팩토리 SI'],
      capabilities: ['실시간 외관 불량 검사', '엣지 단말기 최적화', '생산라인 데이터 수집'],
      needs: ['제조 현장 유상 실증처', '스마트공장 구축 수요기업', 'B2B 세일즈 채널'],
      desiredPartners: ['자동차/전자 부품 1차 협력사', '스마트팩토리 구축 기업'],
      visibility: 'PUBLIC',
      updatedAt: '2026-10-02T10:00:00Z'
    }
  },

  // 2. 로보플로우 (RoboFlow) - P0 Core Demo Case 2 (TECH / 기술 안정성 병목)
  {
    company: {
      id: 'COMP-002',
      name: '로보플로우 (RoboFlow)',
      businessNumber: '211-87-54321',
      industry: '로봇 / 물류',
      subIndustry: '자율주행 물류 AMR & 군집 제어',
      location: '경기도 부천시 로봇산업단지',
      foundedYear: 2023,
      employees: 9,
      revenue: 150,
      exportAmount: 0,
      certifications: ['연구개발전담부서'],
      patents: ['AMR 자율주행 라이다SLAM 융합 제어'],
      summary: '중소형 물류센터 전용 가성비 자율주행 물류 이송 로봇(AMR) 개발사',
      keywords: ['로봇', 'AMR', '물류자동화', 'SLAM', '군집제어']
    },
    analysis: {
      id: 'ANALYSIS-002',
      companyId: 'COMP-002',
      documentId: 'DOC-002',
      analysisVersion: 'TEM-v1.0',
      temDiagnosis: {
        technology: {
          level: 'T2',
          score: 55,
          reason: '연구소 시험 환경에서 시제품 주행 성공하였으나, 2시간 15분 이상 연속 주행 시 라이다 SLAM 오차 누적 및 발열 멈춤 현상 발생',
          sourceQuote: '사업계획서 p.6: "사내 실험실 최대 연속 주행 시간 2시간 15분 달성"'
        },
        execution: {
          level: 'E1',
          score: 42,
          reason: '하드웨어 개발자 중심으로 구성되어 있으며 안전인증(ISO 3691-4) 및 현장 실증 테스트 전담 인력 부재',
          sourceQuote: '사업계획서 p.12: "로봇 연구원 6명 구성, 안전 인증 전문위원 미확보"'
        },
        market: {
          level: 'M1',
          score: 30,
          reason: '물류 센터 현장 적용 전 단계이며, 구매 의향서(LOI) 1건 보유하였으나 기술 안정성 확보 조건부 계약임',
          sourceQuote: '사업계획서 p.17: "C 물류사와 기술검증 조건부 LOI 1건 체결"'
        },
        radarScores: {
          tech: 55,
          validation: 30,
          market: 30,
          finance: 40,
          global: 15
        }
      },
      primaryBottleneck: 'TECH',
      secondaryBottleneck: 'REGULATION',
      bottlenecks: [
        {
          category: 'TECH',
          title: '장시간 연속 주행 안정성 및 SLAM 오차 미해결',
          description: '실제 물류센터 24시간 가동 환경에 적용하기에는 주행 안정성이 부족함 (2시간 15분 후 멈춤 현상).',
          severity: 'HIGH',
          sourceEvidence: '사업계획서 p.6: 사내 2시간 15분 연속 주행 테스트 후 소프트웨어 재부팅 필요',
          pageNumber: 6
        },
        {
          category: 'REGULATION',
          title: '로봇 안전 인증(KCE, ISO 3691-4) 미착수',
          description: '물류 현장 투입을 위한 필수 로봇 안전 표준 인증을 받지 않아 사고 발생 시 법적 리스크 존재.',
          severity: 'MEDIUM',
          sourceEvidence: '사업계획서 p.14: "안전 인증 2027년 추진 예정으로 현시점 인증 미보유"',
          pageNumber: 14
        }
      ],
      companyRequestedSupport: [
        '해외 전시회 참가 지원 및 해외 판로 개척 자금 5천만원'
      ],
      recommendedSupport: [
        'GBSA 로봇/SW 기술 고도화 및 튜닝 지원사업',
        '경기도 로봇 안전성 테스트베드 실증 지원',
        '로봇 안전 인증 컨설팅 및 시험비용 지원'
      ],
      supportGapAnalysis: '기업은 해외 판로 개척을 희망하지만, 아직 주행 안정성(T2)이 확보되지 않아 현장 투입 시 잦은 고장이 우려됨. 해외 진출 전 로봇 주행 테스트베드 지원 및 기술 고도화(T3 진입)가 우선되어야 함.',
      strengths: [
        '경쟁사 대비 30% 저렴한 하드웨어 제조 원가 구조',
        '모듈형 센서 구성으로 개조 용이성'
      ],
      weaknesses: [
        '장시간 장거리 복잡 주행 시 라이다 오차 축적',
        '로봇 안전 인증 및 현장 실증 데이터 부족'
      ],
      evidenceList: [
        {
          id: 'EVI-003',
          category: 'T',
          source: '04_로봇_로보플로우_사업계획서.pdf',
          page: 6,
          excerpt: '사내 가상 물류 트랙 2시간 15분 연속 주행 테스트 완주 (SLAM 맵 튐 현상 보정 중)',
          interpretation: '연속 작동 한계 및 주행 안정성 부족으로 T2 단계로 진단됨.'
        }
      ],
      actionPlan90Days: [
        { step: 1, action: 'SLAM 누적 오차 수정 알고리즘 튜닝 및 사내 12시간 연속 주행 테스트 달성', targetMetric: '연속 주행 12시간 무오류 달성', timeframe: 'Day 1-30' },
        { step: 2, action: '경기도 로봇실증지원센터 테스트베드 신청 및 안전 인증 가이드라인 컨설팅 받기', targetMetric: '테스트베드 입주 및 인증 로드맵 확립', timeframe: 'Day 31-60' },
        { step: 3, action: 'C 물류센터 조건부 LOI 실증 1단계 시험 집행', targetMetric: '1차 현장 실증 테스트 완료', timeframe: 'Day 61-90' }
      ],
      verificationNeeded: [
        '연속 주행 멈춤 현상의 원인이 센서 발열인지 SW 메모리 누수인지 정밀 진단 필요'
      ],
      aiInsightSummary: '로보플로우는 기술 안정성(T2) 강화가 급선무입니다. 해외 마케팅보다는 경기도 로봇 테스트베드를 활용한 주행 오차 해결과 안전 인증 수립이 먼저 이루어져야 합니다.',
      status: 'COMPLETED',
      createdAt: '2026-10-02T10:30:00Z'
    },
    profile: {
      companyId: 'COMP-002',
      companyName: '로보플로우',
      industry: '로봇 / 물류',
      technologies: ['AMR', 'SLAM 자율주행', '로봇 제어'],
      products: ['RF-Cargo 100'],
      targetCustomers: ['중소형 물류창고', '제조 자재 이송 라인'],
      capabilities: ['가성비 물류 AMR 하드웨어', '모듈형 제어 SW'],
      needs: ['로봇 테스트베드 제공처', '로봇 안전 인증 지원', '기술 튜닝 전문가'],
      desiredPartners: ['물류센터 운영사', '로봇 센서/인증 전문기관'],
      visibility: 'PUBLIC',
      updatedAt: '2026-10-02T10:30:00Z'
    }
  },

  // 3. 메디헬스바이오 (MediHealth Bio) - (REGULATION / 규제·인증 병목)
  {
    company: {
      id: 'COMP-003',
      name: '메디헬스바이오',
      businessNumber: '305-81-12345',
      industry: '디지털 헬스케어',
      subIndustry: 'AI 기반 만성질환 예측 모니터링',
      location: '경기도 수원시 광교 바이오밸리',
      foundedYear: 2021,
      employees: 18,
      revenue: 450,
      exportAmount: 50,
      certifications: ['GMP인증', 'ISO13485'],
      patents: ['생체신호 기반 당뇨 파동 예측 AI'],
      summary: '웨어러블 패치 기반 당뇨 및 혈당 실시간 AI 분석 모니터링 소프트웨어',
      keywords: ['디지털헬스', '의료AI', '생체신호', '의료기기인증']
    },
    analysis: {
      id: 'ANALYSIS-003',
      companyId: 'COMP-003',
      documentId: 'DOC-003',
      analysisVersion: 'TEM-v1.0',
      temDiagnosis: {
        technology: { level: 'T3', score: 85, reason: '임상 2상 수준 탐색 임상시험 완료 및 94% 인슐린 변동 예측 정확도 확보', sourceQuote: '임상시험 보고서 p.12' },
        execution: { level: 'E3', score: 80, reason: '바이오/AI 전문가 및 전문 임상 인력 보유', sourceQuote: '인력현황 p.4' },
        market: { level: 'M1', score: 38, reason: '의료기기 2등급 허가 지연으로 비급여/급여 시장 진입 불가', sourceQuote: '사업계획서 p.22' },
        radarScores: { tech: 85, validation: 80, market: 38, finance: 60, global: 40 }
      },
      primaryBottleneck: 'REGULATION',
      secondaryBottleneck: 'VALIDATION',
      bottlenecks: [
        {
          category: 'REGULATION',
          title: '식약처 의료기기 인허가 및 혁신의료기술 평가 지연',
          description: '기술성숙도는 우수하나 의료기기 인허가 미획득으로 병원 처방 및 매출 발생이 통제됨.',
          severity: 'HIGH',
          sourceEvidence: '사업계획서 p.22: 식약처 품목허가 심사 8개월째 대기 중',
          pageNumber: 22
        }
      ],
      companyRequestedSupport: ['병원 판로 개척 및 마케팅비 1억원'],
      recommendedSupport: ['경기도 바이오/의료기기 RA 인허가 패스트트랙 지원', '의료기기 임상 및 인허가 전문 컨설팅'],
      supportGapAnalysis: '인허가 전 병원 마케팅은 의료법 위반 위험이 있으므로 식약처 인허가 심사 대응 지원이 시급함.',
      strengths: ['높은 예측 정확도(94%) 및 GMP 인증 시설 보유'],
      weaknesses: ['규제 허가에 종속된 비즈니스 구조'],
      evidenceList: [
        { id: 'EVI-004', category: 'M', source: '사업계획서.pdf', page: 22, excerpt: '식약처 의료기기 2등급 허가 절차 진행 중', interpretation: '규제 병목으로 시장 진입 불가' }
      ],
      actionPlan90Days: [
        { step: 1, action: '식약처 보완요청 사항 전문 RA 컨설팅 진행', targetMetric: '보완서류 제출 완료', timeframe: 'Day 1-30' }
      ],
      verificationNeeded: ['식약처 보완 통지서 내 임상 보완 요구사항 구체적 파악'],
      aiInsightSummary: '메디헬스바이오는 인허가(REGULATION) 규제 해결이 유일한 시장 진입 관문입니다.',
      status: 'COMPLETED',
      createdAt: '2026-10-02T11:00:00Z'
    },
    profile: {
      companyId: 'COMP-003',
      companyName: '메디헬스바이오',
      industry: '디지털 헬스케어',
      technologies: ['의료 AI', '생체신호 분석'],
      products: ['GlucoCare AI'],
      targetCustomers: ['대학병원', '내과 의원', '건강검진센터'],
      capabilities: ['혈당 예측 알고리즘', 'GMP 인증 생체 패치'],
      needs: ['식약처 RA 인허가 컨설팅', '대학병원 확증 임상 협력'],
      desiredPartners: ['대학병원 종합검진센터', '의료기기 유통사'],
      visibility: 'PUBLIC',
      updatedAt: '2026-10-02T11:00:00Z'
    }
  },

  // 4. 솔라테크 (SolarTech) - (CAPEX / 양산 설비 투자 및 대면적 실증 병목)
  {
    company: {
      id: 'COMP-004',
      name: '솔라테크 (SolarTech)',
      businessNumber: '128-86-98765',
      industry: '신재생에너지 / 소재',
      subIndustry: '차세대 페로브스카이트 태양광 모듈',
      location: '경기도 안산시 시화스마트허브',
      foundedYear: 2022,
      employees: 14,
      revenue: 280,
      exportAmount: 120,
      certifications: ['벤처기업', '이노비즈', 'ISO9001'],
      patents: ['고내구성 페로브스카이트 박막 코팅 기술'],
      summary: '도심형 건물 일체형 태양광(BIPV) 전용 고효율 페로브스카이트 모듈 개발사',
      keywords: ['태양광', '페로브스카이트', '신재생에너지', 'BIPV', '탄소중립']
    },
    analysis: {
      id: 'ANALYSIS-004',
      companyId: 'COMP-004',
      documentId: 'DOC-004',
      analysisVersion: 'TEM-v1.0',
      temDiagnosis: {
        technology: {
          level: 'T3',
          score: 82,
          reason: '10cm 소형 셀 광전효율 24.2% 달성 및 신뢰성 테스트 통과, 1m² 대면적 롤투롤 코팅 균일도 기술 고도화 진행 중',
          sourceQuote: '사업계획서 p.15: "소형 셀 24.2% 세계 최고 수준 효율 달성"'
        },
        execution: {
          level: 'E2',
          score: 58,
          reason: 'R&D 박사급 연구 인력은 우수하나 파일럿 양산 라인 설비(CAPEX) 및 대량 생산 공정 엔지니어 부족',
          sourceQuote: '사업계획서 p.18: "파일럿 양산 롤투롤 설비 투자 30억원 소요 예정"'
        },
        market: {
          level: 'M2',
          score: 65,
          reason: '건설사 및 지자체 공공건물 BIPV 시범 적용 의향서 2건 확보, 단가 절감 및 IEC 신뢰성 인증 선행 필요',
          sourceQuote: '사업계획서 p.27: "H건설사 도심 오피스 시범 시공 LOI 체결"'
        },
        radarScores: {
          tech: 82,
          validation: 58,
          market: 65,
          finance: 45,
          global: 60
        }
      },
      primaryBottleneck: 'INVESTMENT',
      secondaryBottleneck: 'VALIDATION',
      bottlenecks: [
        {
          category: 'INVESTMENT',
          title: '파일럿 양산 라인 설비 투자금(CAPEX 30억원) 확보 필요',
          description: '소형 셀에서 대면적 상용 모듈로 스케일업하기 위한 롤투롤 양산 설비 구축 자금 조달이 시급함.',
          severity: 'HIGH',
          sourceEvidence: '사업계획서 p.18: 파일럿 양산 라인 구축비 30억원 소요',
          pageNumber: 18
        },
        {
          category: 'REGULATION',
          title: '건물 일체형 태양광(BIPV) KS 인증 및 IEC 61215 신뢰성 인증 미완료',
          description: '건축물 외벽 시공을 위한 필수 내화/내풍압 KS C 8577 인증 및 내구성 공인 성적서 확보 필요.',
          severity: 'MEDIUM',
          sourceEvidence: '사업계획서 p.24: BIPV KS 인증 2026 하반기 취득 목표',
          pageNumber: 24
        }
      ],
      companyRequestedSupport: [
        '해외 마케팅 및 전시회 참가비 7천만원'
      ],
      recommendedSupport: [
        '경기도 기후테크 혁신 펀드 및 시설자금 융자 연계 (최대 10억원)',
        'GBSA BIPV 실증 테스트베드 및 신뢰성 인증 시험 지원',
        '도내 건설사·시공사 B2B 1:1 매칭 지원'
      ],
      supportGapAnalysis: '기업은 해외 판로 지원을 희망하지만, 현시점에는 대면적 파일럿 양산 설비 구축(FINANCE)과 건축 KS 인증이 선행되어야 국내외 시장 납품이 가능함.',
      strengths: [
        '기존 실리콘 대비 50% 가볍고 유연한 박막 태양광 기술',
        '24.2%의 높은 광전 변환 효율'
      ],
      weaknesses: [
        '대면적화 시 균일도 제어 및 초기 설비 투자 부담',
        '건축 외장재 KS/IEC 인증 획득 기간 소요'
      ],
      evidenceList: [
        {
          id: 'EVI-005',
          category: 'T',
          source: '04_에너지_솔라테크_사업계획서.pdf',
          page: 15,
          excerpt: '10cm 소형 셀 광전효율 24.2% 달성 완료, 1m² 롤투롤 대면적 양산 라인 설비 투자 30억원 필요',
          interpretation: '기술성은 T3 단계이나 대면적 양산을 위한 설비 자금(FINANCE)이 핵심 병목임.'
        }
      ],
      actionPlan90Days: [
        { step: 1, action: '경기도 기후테크 혁신 펀드 및 스케일업 정책자금 신청', targetMetric: '정책자금 심사 통과 및 5억원 이상 확보', timeframe: 'Day 1-30' },
        { step: 2, action: 'BIPV 건축 KS 인증 시험 접수 및 신뢰성 성적서 확보', targetMetric: '인증 시험 착수 및 가속 수명 데이터 산출', timeframe: 'Day 31-60' },
        { step: 3, action: 'H건설사 도심 오피스 시범 시공 파일럿 모듈 공급', targetMetric: '1차 실증 시공 완료 및 홍보 레퍼런스 구축', timeframe: 'Day 61-90' }
      ],
      verificationNeeded: [
        '1m² 대면적 페로브스카이트 셀의 1,000시간 가속 열화 시험 결과 확인',
        'BIPV KS 내화 인증 통과 가능 설계 여부 점검'
      ],
      aiInsightSummary: '솔라테크는 기술력(T3)이 입증된 기후테크 유망주입니다. 해외 마케팅보다 경기도 기후테크 펀드 연계와 BIPV 건축 인증 지원을 통해 양산 레퍼런스를 구축하는 것이 최우선 과제입니다.',
      status: 'COMPLETED',
      createdAt: '2026-10-02T11:30:00Z'
    },
    profile: {
      companyId: 'COMP-004',
      companyName: '솔라테크 (SolarTech)',
      industry: '신재생에너지 / 기후테크',
      technologies: ['페로브스카이트', 'BIPV', '롤투롤 코팅', '박막 태양전지'],
      products: ['SolarSkin BIPV 모듈'],
      targetCustomers: ['대형 건설사', '외벽 시공사', '공공기관 시설관리부서'],
      capabilities: ['고효율 박막 코팅', '경량 유연 태양광 패널 제조'],
      needs: ['양산 설비 투자 펀드 매칭', '건축 외장재 KS 인증 지원', '시범 시공 실증처'],
      desiredPartners: ['대형 건설사(시공 파트너)', '유리/창호 제조사', '기후테크 전문 투자사'],
      visibility: 'PUBLIC',
      updatedAt: '2026-10-02T11:30:00Z'
    }
  }
];

export const MOCK_COMPANY_LIST: Company[] = MOCK_COMPANIES.map(c => c.company);

export const MOCK_B2B_MATCHES: Record<string, B2BMatchResult[]> = {
  'COMP-001': [
    {
      id: 'MATCH-001',
      sourceCompanyId: 'COMP-001',
      targetCompanyId: 'PARTNER-101',
      targetCompanyName: '(주)한라모빌리티솔루션 (화성 자동차부품 1차 협력사)',
      targetIndustry: '자동차 / 모빌리티 부품 제조',
      matchScore: 94,
      matchingReasons: [
        '수요-공급 직결: 한라모빌리티솔루션의 외관 불량 검사 자동화 수요(Need)와 비전웍스AI의 Edge AI 비전 검사 역량(Capability)이 100% 일치',
        '지리적 근접성: 경기도 화성시 양산 라인 현장 PoC 즉시 진행 가능',
        '성장단계 적합: T3 상용화 솔루션의 첫 유상 PoC 및 구매 LOI 체결 타겟'
      ],
      synergyDescription: '조립 라인 불량률 0.05% 이하 절감 및 비전웍스AI의 첫 유상 고객(M2) 전환 레퍼런스 확보',
      matchType: 'CAPABILITY_TO_NEED',
      status: 'RECOMMENDED'
    },
    {
      id: 'MATCH-002',
      sourceCompanyId: 'COMP-001',
      targetCompanyId: 'PARTNER-102',
      targetCompanyName: '(주)스마트팩토리엔지니어링',
      targetIndustry: '스마트공장 SI / 산업자동화',
      matchScore: 89,
      matchingReasons: [
        '영업 채널 시너지: 도내 80여 개 중소 제조공장 스마트팩토리 구축 사업에 비전웍스AI 모듈 패키지 공급',
        '기술 결합: MES 시스템과 Edge AI 단말 간 표준 API 연동'
      ],
      synergyDescription: 'B2B 단독 영업 한계(SALES 병목)를 SI 파트너 유통망을 통해 단숨에 극복',
      matchType: 'SUPPLY_CHAIN',
      status: 'RECOMMENDED'
    },
    {
      id: 'MATCH-003',
      sourceCompanyId: 'COMP-001',
      targetCompanyId: 'COMP-002',
      targetCompanyName: '로보플로우 (RoboFlow)',
      targetIndustry: '로봇 / 물류 AMR',
      matchScore: 82,
      matchingReasons: [
        '공동 실증: 물류 AMR 로봇에 비전 불량 검사 모듈을 탑재하는 이동형 검사 솔루션 공동 개발',
        'GBSA 지원사업 연계: 2026 로봇-AI 융합 실증 과제 공동 컨소시엄 구성 가능'
      ],
      synergyDescription: '이동형 자율주행 품질 검사 로봇 신제품 개발 및 테스트베드 공동 활용',
      matchType: 'JOINT_POC',
      status: 'RECOMMENDED'
    }
  ],
  'COMP-002': [
    {
      id: 'MATCH-004',
      sourceCompanyId: 'COMP-002',
      targetCompanyId: 'PARTNER-201',
      targetCompanyName: 'CJ대한통운 군포 복합물류센터 협력단',
      targetIndustry: '물류 운영 / 풀필먼트',
      matchScore: 92,
      matchingReasons: [
        '테스트베드 제공: 군포 스마트물류센터 내 24시간 장거리 주행 테스트베드 트랙 제공',
        '현장 데이터 피드백: SLAM 오차 누적 해결을 위한 실환경 데이터 확보'
      ],
      synergyDescription: '로보플로우의 주행 안정성(T3) 검증 및 조건부 LOI 실증 전환',
      matchType: 'JOINT_POC',
      status: 'RECOMMENDED'
    },
    {
      id: 'MATCH-005',
      sourceCompanyId: 'COMP-002',
      targetCompanyId: 'PARTNER-202',
      targetCompanyName: '한국로봇산업진흥원 인증지원센터',
      targetIndustry: '로봇 안전 인증 전문기관',
      matchScore: 88,
      matchingReasons: [
        '규제 돌파: ISO 3691-4 및 KCE 로봇 안전 표준 인증 사전 컨설팅 매칭'
      ],
      synergyDescription: '안전 인증 병목(REGULATION) 조기 해소',
      matchType: 'CAPABILITY_TO_NEED',
      status: 'RECOMMENDED'
    }
  ],
  'COMP-003': [
    {
      id: 'MATCH-006',
      sourceCompanyId: 'COMP-003',
      targetCompanyId: 'PARTNER-301',
      targetCompanyName: '아주대학교병원 내분비내과 임상연구센터',
      targetIndustry: '상급종합병원 / 임상시험센터',
      matchScore: 95,
      matchingReasons: [
        '확증 임상 협력: 당뇨 환자 200명 대상 실시간 혈당 예측 AI 확증 임상 데이터 확보',
        '식약처 품목허가 심사 보완 자료 공동 대응'
      ],
      synergyDescription: '식약처 2등급 의료기기 허가 패스트트랙 통과 및 임상 근거 확보',
      matchType: 'JOINT_POC',
      status: 'RECOMMENDED'
    }
  ],
  'COMP-004': [
    {
      id: 'MATCH-007',
      sourceCompanyId: 'COMP-004',
      targetCompanyId: 'PARTNER-401',
      targetCompanyName: '현대건설 스마트건축기술연구팀',
      targetIndustry: '대형 건설사 / 친환경 건축',
      matchScore: 96,
      matchingReasons: [
        'BIPV 시공 연계: 신축 제로에너지빌딩 외벽에 솔라테크 태양광 패널 시범 시공',
        'KS 인증 협력: 건축 외장재 화재안전 및 내구성 테스트 지원'
      ],
      synergyDescription: '국내 최고 수준의 대형 오피스 실증 레퍼런스 확보 및 양산 발주 계약',
      matchType: 'CAPABILITY_TO_NEED',
      status: 'RECOMMENDED'
    },
    {
      id: 'MATCH-008',
      sourceCompanyId: 'COMP-004',
      targetCompanyId: 'PARTNER-402',
      targetCompanyName: '경기도 기후테크 녹색성장펀드 운용단',
      targetIndustry: '벤처캐피탈 / 기후테크 투자',
      matchScore: 91,
      matchingReasons: [
        'CAPEX 투자 연계: 30억원 규모 롤투롤 파일럿 양산 라인 설비 투자 1순위 심사 매칭'
      ],
      synergyDescription: '양산 설비 자금 병목(FINANCE) 단기 해결',
      matchType: 'SUPPLY_CHAIN',
      status: 'RECOMMENDED'
    }
  ]
};
