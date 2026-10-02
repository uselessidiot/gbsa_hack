import { SupportProgram } from '../types';

export const MOCK_SUPPORT_PROGRAMS: SupportProgram[] = [
  {
    id: 'PROG-001',
    organization: '경기도경제과학진흥원 (GBSA)',
    title: '2026 경기도 AI·제조 융합 실증 및 첫 유상고객 매칭 지원사업',
    category: '실증/PoC',
    budgetMaxMillion: 150,
    targetTechLevel: ['T3', 'T4'],
    targetExecLevel: ['E2', 'E3', 'E4'],
    targetMarketLevel: ['M1', 'M2'],
    targetBottlenecks: ['PMF', 'SALES', 'VALIDATION'],
    eligibilityCriteria: [
      '경기도 내 본사, 연구소 또는 공장 소재 벤처/스타트업',
      '상용화 직전(T3 이상) AI/SW 솔루션 보유 기업',
      '도내 제조 수요기업과 유상/무상 PoC 추진 예정 기업'
    ],
    applicationDeadline: '2026-10-31',
    status: 'OPEN',
    detailUrl: 'https://www.gbsa.or.kr/support/example-001',
    tags: ['제조AI', '실증지원', '수요기업매칭', 'PMF', 'GBSA']
  },
  {
    id: 'PROG-002',
    organization: '경기도 / 차세대융합기술연구원',
    title: '2026 로봇·자율주행 테스트베드 주행 안정성 고도화 지원',
    category: 'R&D',
    budgetMaxMillion: 80,
    targetTechLevel: ['T2', 'T3'],
    targetExecLevel: ['E1', 'E2', 'E3'],
    targetMarketLevel: ['M1', 'M2'],
    targetBottlenecks: ['TECH', 'VALIDATION', 'REGULATION'],
    eligibilityCriteria: [
      '경기도 소재 물류/서비스 로봇 및 자율주행 기업',
      '실환경 옥내외 테스트베드 실증 및 SLAM/안전성 튜닝 필요 기업'
    ],
    applicationDeadline: '2026-11-15',
    status: 'OPEN',
    detailUrl: 'https://www.gbsa.or.kr/support/example-002',
    tags: ['로봇', 'AMR', '테스트베드', '기술고도화', '안전인증']
  },
  {
    id: 'PROG-003',
    organization: '경기도경제과학진흥원 (GBSA)',
    title: '2026 바이오·디지털헬스케어 RA 인허가 패스트트랙 컨설팅',
    category: '인증/규제',
    budgetMaxMillion: 50,
    targetTechLevel: ['T3', 'T4'],
    targetExecLevel: ['E2', 'E3'],
    targetMarketLevel: ['M1'],
    targetBottlenecks: ['REGULATION', 'VALIDATION'],
    eligibilityCriteria: [
      '경기도 소재 바이오, 의료기기, 디지털헬스케어 기업',
      '식약처 품목허가 심사 중이거나 GMP/ISO13485 보완 필요 기업'
    ],
    applicationDeadline: '2026-10-25',
    status: 'OPEN',
    detailUrl: 'https://www.gbsa.or.kr/support/example-003',
    tags: ['바이오', '디지털헬스', '식약처인허가', 'REGULATION', 'GBSA']
  },
  {
    id: 'PROG-004',
    organization: '경기창조경제혁신센터',
    title: '2026 경기 딥테크 스타트업 글로벌 Scale-Up 패스포트',
    category: '글로벌',
    budgetMaxMillion: 100,
    targetTechLevel: ['T3', 'T4'],
    targetExecLevel: ['E3', 'E4'],
    targetMarketLevel: ['M2', 'M3', 'M4'],
    targetBottlenecks: ['GLOBAL', 'SALES', 'INVESTMENT'],
    eligibilityCriteria: [
      '국내 매출 및 검증 실적을 보유한 경기도 딥테크 기업',
      '해외 현지 법인 설립 및 유통 파트너 발굴 희망 기업'
    ],
    applicationDeadline: '2026-11-30',
    status: 'UPCOMING',
    detailUrl: 'https://ccei.creativekorea.or.kr/gyeonggi/',
    tags: ['글로벌', '해외진출', '딥테크', 'ScaleUp']
  }
];
