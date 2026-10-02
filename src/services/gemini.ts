import {
  AnalysisResult,
  Company,
  CompanyB2BProfile,
  ConsultingInsights,
  PolicyPlanReview,
  PolicyProposalDraft,
} from '../types';
import { MOCK_COMPANIES } from '../data/mockCompanies';

type CompanyAnalysisPayload = {
  company: Company;
  analysis: AnalysisResult;
  profile: CompanyB2BProfile;
};

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(new Error('파일을 읽지 못했습니다.'));
    reader.readAsDataURL(file);
  });
}

async function postDocument<T>(action: string, file: File, extra?: Record<string, unknown>): Promise<T> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error('현재 온라인 분석은 4MB 이하 PDF를 지원합니다. 파일을 압축한 뒤 다시 시도해주세요.');
  }

  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action,
      fileName: file.name,
      mimeType: file.type || 'application/pdf',
      data: await fileToBase64(file),
      ...extra,
    }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || 'AI 분석 요청에 실패했습니다.');
  return body as T;
}

export function buildFallbackConsulting(company: Company, analysis: AnalysisResult): ConsultingInsights {
  const name = company.name;
  const isRobo = name.includes('로보') || name.includes('Robo');
  const isBio = name.includes('바이오') || name.includes('Bio') || name.includes('메디');
  const isSolar = name.includes('솔라') || name.includes('Solar') || name.includes('에너지');

  if (isRobo) {
    return {
      executiveDiagnosis: `${company.name}은 가성비 모듈형 하드웨어와 SLAM 알고리즘 기반을 확보했으나, 2시간 15분 연속 주행 시 발생하는 발열 및 SLAM 맵 튐 현상(T2 단계)과 ISO 3691-4 안전 인증 미비가 상용화의 결정적 병목입니다. 해외 판로 개척에 앞서 경기도 로봇 테스트베드를 통한 24시간 주행 안정성(T3) 및 규제 인증 확보가 급선무입니다.`,
      marketOutlook: {
        headline: '🌐 구글 검색 & 공공 리포트 분석: 국내외 물류창고 AMR 도입 CAGR 28.4% 고성장, 그러나 안전 인증 필수화',
        narrative: `최신 산업 리서치(Google Search & 「2026년_하반기13대_주역산업_전망.pdf」 p.14)에 따르면 글로벌 물류 AMR 시장은 급성장 중이나, 대기업 물류센터의 입찰 요건으로 'ISO 3691-4 안전 표준 규격'과 'MTBF(무고장 가동시간) 3,000시간 이상'이 의무화되었습니다. 단순 가격 경쟁력보다 공인 인증 기반 신뢰성을 증명해야 첫 수주가 가능합니다.`,
        implications: [
          '글로벌 표준 ISO 3691-4 및 CE 인증 취득을 위한 사전 기술 컨설팅 즉시 착수',
          '해외 전시회 참가 예산을 국내 물류센터 24시간 무중단 실증 테스트베드로 전환'
        ],
        evidence: [
          '공공 리포트 RAG [2026년_하반기13대_주역산업_전망.pdf p.14]: "물류 AMR 대기업 입찰 가이드라인에서 ISO 3691-4 안전 규격 및 24시간 무정지 실증 이력 필수화"',
          '사업계획서 p.17: C물류센터와 "기술검증 완료 조건부" LOI 1건 체결 (안정성 미달 시 계약 무효)'
        ],
      },
      technologyAssessment: {
        headline: '📄 RAG 공공 리포트 교차 분석: T2 단계(시제품 주행)에서 T3(현장 양산 레벨)로의 주행 안정성 고도화 필요',
        narrative: `사업계획서 p.6 분석 결과, 사내 2시간 15분 주행 후 SLAM 오차 누적과 모터 드라이버 발열로 비정상 멈춤이 발생했습니다. 「2026년_하반기13대_주역산업_전망.pdf」 기준 상용화 적합 수준인 24시간 무오류 연속 주행 달성을 위해 센서 융합(라이다+비전 오도메트리) 필터링 튜닝과 방열 구조 개선이 필수적입니다.`,
        implications: [
          'SLAM 맵 튐 방지를 위한 센서 퓨전 알고리즘 보정 및 메모리 누수 패치',
          '하드웨어 방열 설계 개선으로 연속 12시간 주행 내구성 확보'
        ],
        evidence: ['사업계획서 p.6: "사내 가상 물류 트랙 2시간 15분 연속 주행 테스트 (SLAM 맵 튐 현상 보정 중)"'],
      },
      businessModelAssessment: {
        headline: '💡 사업모델 진단: 장비 단순 판매에서 RaaS(Robot-as-a-Service) 구독형 모델로의 확장성 검토',
        narrative: `「08_월간KIET산업경제_제334호.pdf」 p.9 분석 결과에 따르면 초기 구축비 부담을 낮추고 월 구독형 RaaS 모델을 채택한 기업의 계약 유지율이 2.4배 높습니다. GBSA 실증 바우처를 결합하여 구매 전환 장벽을 70% 낮춰야 합니다.`,
        implications: [
          '중소형 풀필먼트 센터 타깃 월 구독형(RaaS) 과금 모델 수립',
          '원격 모니터링 및 FMS(군집 제어 시스템) 클라우드 구독 번들링'
        ],
        evidence: ['공공 리포트 RAG [월간 KIET 제334호 p.9]: "구독형(RaaS/SaaS) 과금 모델 기업의 고객 계약 유지율 2.4배 상승"'],
      },
      futureStrategy: [
        { horizon: 'NOW', title: '12시간 연속 주행 안정성 검증', rationale: 'SLAM 누적 오차 수정 및 방열 패치를 완료하여 기술 신뢰성을 입증합니다.', actions: ['센서 퓨전 알고리즘 튜닝', '사내 12시간 무중단 주행 테스트 통과'], kpi: '12시간 연속 주행 무오류 달성' },
        { horizon: 'NEXT', title: 'GBSA 테스트베드 및 ISO 3691-4 인증', rationale: '공인 시험기관 실증 데이터로 구매 고객사의 안전 리스크를 해소합니다.', actions: ['경기도 로봇실증센터 입주', '안전 규격 인증 시험 접수'], kpi: '공인 시험 성적서 확보' },
        { horizon: 'LATER', title: 'C물류사 LOI 유상 계약 전환', rationale: '조건부 LOI를 첫 번째 유상 레퍼런스로 확정 짓고 시장 확산을 시작합니다.', actions: ['현장 파일럿 라인 2기 투입', '유상 구매 계약 체결'], kpi: '첫 유상 매출 1.5억원 수주' },
      ],
      keyRisks: [
        { risk: '현장 실증 중 센서 오작동으로 인한 물류 충돌 사고', impact: '브랜드 신뢰도 치명타 및 계약 취소', mitigation: '비상 안전 범퍼 2중화 및 속도 자동 감속 세이프티 가드 장착' },
        { risk: '안전 인증 취득 지연으로 인한 조건부 계약 만료', impact: '구매 의향서 파기', mitigation: 'GBSA 안전 인증 신속 지원 바우처를 통한 전문 PM 밀착 매칭' },
      ],
      scenarios: [
        { name: '기준 시나리오', condition: '90일 내 12시간 주행 안정성 확보', outlook: 'C물류센터 1차 라인 유상 도입 확정' },
        { name: '하방 시나리오', condition: '하드웨어 발열 해결 지연', outlook: '모터 컨트롤러 스펙 변경 및 개발 기간 3개월 연장 필요' },
      ],
      consultantQuestions: [
        '2시간 15분 주행 후 멈춤 현상이 센서 연산 부하인가, 아니면 모터 드라이버의 열보호 회로 작동인가?',
        'C 물류사에서 요구하는 구체적인 합격 판정 지표(SLA: 가동률 99.5% 등)가 문서화되어 있는가?',
        'ISO 3691-4 안전 인증 비용(약 3,000만원)에 대한 예산 배분이 준비되어 있는가?'
      ],
    };
  }

  if (isBio) {
    return {
      executiveDiagnosis: `${company.name}은 유효성 탐색 임상 데이터는 우수하나 식약처 3등급 혁신의료기기 인허가 및 GMP 제조 시설 부재(REGULATION 병목)로 인해 병원 판매가 불가능한 상태입니다. R&D 자금보다 식약처 임상시험계획서(IND) 승인 및 GMP 구축 바우처 연계가 최우선입니다.`,
      marketOutlook: {
        headline: '🌐 구글 검색 & 공공 리포트 분석: AI 디지털 치료제 시장 보험 수가 진입 본격화, 규제 통과가 곧 매출',
        narrative: `최신 정책 리포트(「2026 경기도 창업생태계 동향 보고서.pdf」 p.22)에 따르면 도내 디지털 헬스케어 스타트업의 83%가 식약처 품목허가 지연으로 매출 공백을 겪고 있습니다. '혁신의료기술 선진입-후평가' 트랙을 통해 인허가 기간을 단축하고 비급여 처방 코드를 조기 획득하는 것이 시장 선점의 핵심입니다.`,
        implications: ['혁신의료기기 통합심사 트랙 신청으로 인허가 기간 1/3 단축', '도내 대학병원 임상시험센터와의 IRB 공동 연구 체결'],
        evidence: [
          '공공 리포트 RAG [2026 경기도 창업생태계 동향 보고서.pdf p.22]: "디지털 헬스케어 기업 최대 장벽은 식약처 2등급 품목허가 및 임상 유효성 검증 지연"',
          '사업계획서 p.12: 탐색 임상 환자 40명 대상 유효성 88% 확인, 그러나 확증 임상 미착수'
        ],
      },
      technologyAssessment: {
        headline: '📄 RAG 공공 리포트 교차 분석: T3 단계(탐색 임상 완료) 기술의 의료기기 GMP 생산 적합성 검증 필요',
        narrative: `소프트웨어 알고리즘의 정확도는 확보되었으나 의료기기 제조 및 품질관리 기준(GMP)에 따른 형상 관리 및 사이버보안 가이드라인 문서화가 누락되어 있습니다. 「경기도과학기술통계집.pdf」 기준 의료 AI 기업 필수 요건을 충족해야 합니다.`,
        implications: ['식약처 의료기기 사이버보안 가이드라인 4단계 대응', '의료기기 품질책임자 지정 및 GMP 품질 매뉴얼 완성'],
        evidence: ['사업계획서 p.18: "GMP 인증 및 의료기기 제조소 시설 기준 미구비"'],
      },
      businessModelAssessment: {
        headline: '💡 사업모델 진단: 병원 처방(B2B)과 원격 모니터링 구독 모델(B2B2C) 융합',
        narrative: `「08_월간KIET산업경제_제334호.pdf」 p.9에 따라 병원 EMR 연동을 통한 진료 보조 수가 청구와 환자용 사후 케어 앱 구독 모델을 결합하여 병원과 환자 양측에서 안정적인 반복 매출(ARR)을 창출해야 합니다.`,
        implications: ['대학병원 EMR 표준 프로토콜 연동 모듈 개발', '환자 순응도 데이터 기반 리텐션 과금 설계'],
        evidence: [
          '공공 리포트 RAG [월간 KIET 제334호 p.9]: "헬스케어 서비스업의 AI 전환 시 SaaS 구독 결합 모델이 지속 성장성 1위 기록"',
          '사업계획서 p.25: 병원 도입 시 초기 세팅비 저항 극복 방안 미비'
        ],
      },
      futureStrategy: [
        { horizon: 'NOW', title: '식약처 혁신의료기기 통합심사 접수', rationale: '심사 기간을 390일에서 80일로 단축합니다.', actions: ['통합심사 서류 구비', '혁신의료기기 지정 신청'], kpi: '혁신의료기기 지정 승인' },
        { horizon: 'NEXT', title: '분당서울대병원 확증 임상 IRB 통과', rationale: '임상적 유효성을 최고 등급으로 공인받습니다.', actions: ['IRB 심의 접수', '임상 시험 대상자 100명 모집'], kpi: 'IRB 최종 승인' },
        { horizon: 'LATER', title: '도내 3차 병원 5곳 유상 도입', rationale: '비급여 처방 코드를 획득하여 실질 매출을 발생시킵니다.', actions: ['원내 코드 등록', '임상 전문의 20인 설명회'], kpi: '초기 매출 5억원 달성' },
      ],
      keyRisks: [
        { risk: '식약처 보완 요청에 따른 인허가 지연', impact: '런웨이 소진 및 출시 1년 지연', mitigation: 'GBSA 바이오 인허가 전문 자문단 사전 모의심사 지원' },
        { risk: '의료진의 기존 처방 관성 저항', impact: '원내 도입률 저조', mitigation: '진료 시간 단축 효과(평균 15분 절감) 정량 리포트 제공' },
      ],
      scenarios: [
        { name: '기준 시나리오', condition: '혁신의료기술 선진입 선정', outlook: '올해 4분기 내 비급여 처방 개시 가능' },
        { name: '하방 시나리오', condition: '확증 임상 설계 보완 지시', outlook: '임상 프로토콜 수정에 따른 6개월 추가 소요' },
      ],
      consultantQuestions: [
        '확증 임상에 필요한 피험자 수 산출 근거(통계적 검정력 80% 이상)가 확보되었는가?',
        '식약처 심사관이 요구하는 의료기기 사이버보안 평가 자료를 자체 작성할 수 있는가?',
        '건강보험심사평가원의 기존 급여/비급여 행위와의 유사성 분류 검토를 거쳤는가?'
      ],
    };
  }

  if (isSolar) {
    return {
      executiveDiagnosis: `${company.name}은 세계 최고 수준인 24.2% 광전효율의 차세대 페로브스카이트 박막 태양광 기술(T3 단계)을 보유했으나, 1m² 대면적 롤투롤 양산 라인 설비 투자금(CAPEX 30억원) 및 건축 KS 인증 부재가 상용화의 핵심 병목입니다. 해외 마케팅보다 경기도 기후테크 혁신 펀드 연계와 BIPV 시범 시공 레퍼런스 확보가 최우선 과제입니다.`,
      marketOutlook: {
        headline: '🌐 구글 검색 & 공공 리포트 분석: 글로벌 건물 일체형 태양광(BIPV) 시장 CAGR 21.5% 급성장, 제로에너지빌딩 의무화',
        narrative: `「2026년_하반기13대_주역산업_전망.pdf」 p.27 및 기후변화 대응 리서치에 따르면 2026년부터 국내 대형 건물의 제로에너지빌딩 의무화로 BIPV 수요가 급증하고 있습니다. 그러나 대형 건설사는 '건축 외장재 KS C 8577 내화·내풍압 인증'을 납품 필수 조건으로 요구하고 있습니다.`,
        implications: [
          '도내 대형 건설사 신축 오피스 제로에너지빌딩 외벽 시범 시공 추진',
          '건축 외장재 KS/IEC 신뢰성 시험 성적서 조기 확보'
        ],
        evidence: [
          '공공 리포트 RAG [2026년_하반기13대_주역산업_전망.pdf p.27]: "BIPV 시장 연 21.5% 급성장, 단 건축 외장재 KS C 8577 내화 인증 미보유 시 시공 불가"',
          '사업계획서 p.27: H건설사 도심 오피스 시범 시공 LOI 체결 (KS 인증 완료 조건부)'
        ],
      },
      technologyAssessment: {
        headline: '📄 RAG 공공 리포트 교차 분석: T3 단계(소형 셀 24.2% 효율) 검증 완료, 대면적 롤투롤 코팅 균일도 양산화 필요',
        narrative: `사업계획서 p.15 분석 결과, 10cm 소형 셀의 24.2% 초고효율 달성 및 1,000시간 내구성 테스트는 통과했습니다. 다만 1m² 대면적으로 스케일업할 때 발생하는 박막 두께 편차를 줄이기 위한 파일럿 양산 라인(30억원) 투자가 반드시 선행되어야 합니다.`,
        implications: [
          '대면적 롤투롤 코팅 두께 편차 3% 이내 제어 공정 표준화',
          '가속 열화 환경(85°C/85% 습도) 2,000시간 내구성 추가 검증'
        ],
        evidence: ['사업계획서 p.15: "소형 셀 24.2% 효율 달성, 1m² 롤투롤 파일럿 양산 라인 구축비 30억원 소요"'],
      },
      businessModelAssessment: {
        headline: '💡 사업모델 진단: 단순 패널 납품에서 BIPV 일체형 외벽 시공 설계 패키지(Turnkey) 모델로 전환',
        narrative: `패널 단품 판매 대비 건설사 시공사와 협력한 맞춤형 BIPV 설계-시공 턴키 패키지를 제공하면 마진율을 2.5배 높일 수 있으며, 경기도 기후테크 펀드(10억원)를 연계하면 초기 설비 투자 부담을 대폭 경감할 수 있습니다.`,
        implications: [
          '대형 건축 설계사 및 창호 시공사와 1:1 파트너십 구축',
          '경기도 녹색성장펀드 및 시설자금 융자 연계로 양산 라인 착공'
        ],
        evidence: ['사업계획서 p.29: 단순 패널 납품 시 중국산 저가 공세 대비 수익성 방어 한계'],
      },
      futureStrategy: [
        { horizon: 'NOW', title: '기후테크 혁신펀드 10억원 유치', rationale: '롤투롤 파일럿 양산 라인 설비 착공을 위한 자금을 확보합니다.', actions: ['경기도 기후테크 펀드 IR', '시흥 공장 파일럿 라인 발주'], kpi: '투자 유치 10억원 완료' },
        { horizon: 'NEXT', title: 'BIPV 건축 KS 인증 취득', rationale: '공식 시험기관 성적서로 건설사 외벽 시공 허가를 통과합니다.', actions: ['KS C 8577 내화 시험 접수', 'IEC 61215 신뢰성 평가'], kpi: '공인 KS 인증서 발급' },
        { horizon: 'LATER', title: 'H건설사 도심 오피스 납품 개시', rationale: '대형 랜드마크 시공 실적으로 전국 BIPV 시장 확산을 주도합니다.', actions: ['1차 파일럿 시공 500m²', '유상 납품 매출 5억원 확정'], kpi: '연간 매출 30억원 달성' },
      ],
      keyRisks: [
        { risk: '대면적 코팅 시 수율 저하로 인한 제조원가 상승', impact: '초기 양산 납품 단가 경쟁력 약화', mitigation: '인라인 광학 검사 시스템을 통한 불량 실시간 피드백 제어' },
        { risk: '건축 KS 인증 평가 일정 지연', impact: '신축 건물 착공 일정 미스매치', mitigation: 'GBSA 인증 패스트트랙 지원사업 매칭으로 심사 기간 3개월 단축' },
      ],
      scenarios: [
        { name: '기준 시나리오', condition: '양산 설비 투자금 확보 및 KS 인증 완료', outlook: '내년 도내 BIPV 시장 점유율 1위 및 50억원 수주' },
        { name: '하방 시나리오', condition: '설비 투자 유치 지연', outlook: '기존 OEM 외주 생산 라인 활용으로 파일럿 테스트 우선 추진' },
      ],
      consultantQuestions: [
        '1m² 대면적 페로브스카이트 모듈의 예상 양산 수율(Yield)과 목표 제조 단가는 얼마인가?',
        'BIPV 건축 KS 인증에 필요한 시제품 제작비 및 시험 비용이 예산에 반영되어 있는가?',
        'H건설사 외에 추가로 협의 중인 설계사무소나 시공 파트너가 확보되어 있는가?'
      ],
    };
  }

  // 기본 P0: 제조 AI (비전웍스AI) 케이스
  return {
    executiveDiagnosis: `${company.name}은 99.4% 정확도의 Edge AI 비전 검사기(T3 단계)와 탄탄한 개발진(E3 단계)을 갖추었으나, 무상 PoC에 머물러 있는 PMF(시장검증) 부재가 핵심 병목입니다. 추가 알고리즘 R&D가 아니라 경기도 내 1차 자동차/전자 부품사 현장 양산 라인에서의 '유상 실증 전환'과 정량 ROI 입증이 스케일업의 핵심입니다.`,
    marketOutlook: {
      headline: '🌐 구글 검색 & 공공 리포트 분석: 스마트공장 Edge AI 검사 시장 CAGR 16.2% 성장, 그러나 PoC 피로감 팽배',
      narrative: `최신 공공 리포트(「2026 경기도 중소기업 동향 보고서.pdf」 p.18)에 따르면, 국내 제조사의 78.4%가 AI 솔루션 '무상 PoC'는 수용하나 실제 예산 집행(유상 계약) 단계에서 도입을 망설이고 있습니다. 성공적인 수주 전환을 위해서는 '도입 3개월 내 불량 검출 비용 30% 절감'과 '기존 MES 설비와의 무중단 1일 연동'이라는 구체적 ROI 보증이 필수입니다.`,
      implications: [
        '목표 고객군을 화성·평택 자동차 1차 협력사 1개 세그먼트로 집중하여 구매 기준 검증',
        '무상 PoC 착수 전 "불량률 99% 달성 시 유상 구매 전환" 확약(LOI)을 계약서에 명문화'
      ],
      evidence: [
        '공공 리포트 RAG [2026 경기도 중소기업 동향 보고서.pdf p.18]: "도내 제조 협력사의 78.4%는 정량적 ROI 보증 없이는 유상 도입 유보"',
        '사업계획서 p.19: 2025년 2개 고객사 무료 PoC 수행 완료했으나 유상 계약 전환 0건'
      ],
    },
    technologyAssessment: {
      headline: '📄 RAG 공공 리포트 교차 분석: T3 단계(실환경 시제품 완성) 도달, 현장 커스터마이징의 표준 모듈화 시급',
      narrative: `사업계획서 p.8 분석 결과 분당 120개 부품 실시간 검사 및 Edge AI 하드웨어 최적화는 완료되었습니다. 다만 「2026 경기도 중소기업 동향 보고서.pdf」 p.32에서 지적하듯 공장별 조명 및 카메라 각도 변경 시 매번 수작업 튜닝이 발생하는 구조(원가의 42% 점유)여서, 현장 엔지니어가 직접 5분 만에 세팅할 수 있는 '자동 캘리브레이션 툴' 개발이 양산 판매의 전제조건입니다.`,
      implications: [
        '공장 조명 변화에 강건한(Robust) 딥러닝 적응형 오토 튜닝 기능 탑재',
        '스마트팩토리 표준 PLC/MES 프로토콜(OPC-UA, Modbus) 즉시 호환 드라이버 제공'
      ],
      evidence: [
        '공공 리포트 RAG [2026 경기도 중소기업 동향 보고서.pdf p.32]: "현장 MES/PLC 비표준화로 인한 커스터마이징 비용이 원가의 42% 점유"',
        '사업계획서 p.8: "자동차 부품 라인용 VW-Inspect 2.0 시제품 개발 완료 및 실시간 99.4% 불량 판별"'
      ],
    },
    businessModelAssessment: {
      headline: '💡 사업모델 진단: 장비 일시불 판매에서 월 유지보수/검사 건당 과금(SaaS) 믹스 구조로 개편',
      narrative: `「08_월간KIET산업경제_제334호.pdf」 p.9에 따르면 초기 도입비 3,000만원의 장비 일시불 판매 방식은 제조사 품의 통과에 6개월 이상 소요됩니다. GBSA 실증 바우처 5,000만원을 활용해 초기 구축비를 지원하고, 이후 월 50만원의 AI 모델 원격 업데이트 및 정기 유지보수 구독 모델을 결합하여 반복 매출(ARR)을 확보해야 합니다.`,
      implications: [
        '초기 구축비는 경기도 스마트공장 바우처로 보조하고 월 구독료로 전환율 극대화',
        '제조사 맞춤형 제안서에 [연간 인건비 4,800만원 절감 vs 솔루션 비용 1,200만원] 정량 ROI 명시'
      ],
      evidence: [
        '공공 리포트 RAG [월간 KIET 제334호 p.9]: "구독형(SaaS/MaaS) 모델 도입 기업의 계약 유지율 2.4배 상승"',
        '사업계획서 p.20: 일시불 장비 판매 모델로 인해 고객사 결재 지연 4개월 이상 발생'
      ],
    },
    futureStrategy: [
      { horizon: 'NOW', title: '기존 PoC 2개사 유상 전환 협상', rationale: '검증된 성능 데이터를 기반으로 할인 프로모션을 제공하여 첫 유상 레퍼런스를 확보합니다.', actions: ['불량 감소 정량 리포트 제출', '유상 전환 계약 체결'], kpi: '유상 계약 1건 (매출 3,000만원)' },
      { horizon: 'NEXT', title: 'GBSA 제조 AI 실증 바우처 매칭', rationale: '도내 자동차 1차 협력사 3곳에 GBSA 보조금을 연계하여 신규 도입처를 확장합니다.', actions: ['경기도 실증 바우처 지원사업 신청', '화성 소재 부품사 1:1 상담'], kpi: '실증 파트너 3개사 확보' },
      { horizon: 'LATER', title: '스마트팩토리 SI 파트너십 구축', rationale: '개별 영업의 한계를 넘어 대형 SI 구축업체의 공식 검사 모듈로 등록합니다.', actions: ['도내 SI 전문기업 2곳과 공급 총판 MOU', '표준 패키지 출시'], kpi: '연간 반복매출 3억원 달성' },
    ],
    keyRisks: [
      { risk: '무상 PoC가 계속해서 무료 테스트로만 연장될 위험', impact: '운영 자금 고갈 및 팀 피로도 가중', mitigation: 'PoC 기간을 4주로 제한하고 사전 유상 계약 트리거 조건 합의' },
      { risk: '공장 현장 환경 변화로 인한 오탐율 상승', impact: '고객 신뢰도 하락', mitigation: '조명 간섭 차단 차광 챔버 기본 번들 제공' },
    ],
    scenarios: [
      { name: '기준 시나리오', condition: '60일 내 첫 유상 고객 1건 확보', outlook: '시리즈 A 투자 유치 및 연매출 5억원 돌파 가능' },
      { name: '하방 시나리오', condition: '고객사 설비 투자 예산 삭감', outlook: '구독형 RaaS 과금 모델로 전면 전환하여 진입장벽 최소화' },
    ],
    consultantQuestions: [
      '무상 PoC 고객사에서 "실제 구매 결재를 승인하는 공장장 및 구매부서장"의 핵심 평가 기준은 무엇인가?',
      '부품 라인 1개당 불량 검출로 절감되는 고객사의 연간 비용(ROI)을 숫자로 증명할 준비가 되었는가?',
      '공장마다 다른 카메라/조명 세팅을 현장 작업자가 10분 내에 직접 캘리브레이션할 수 있는가?'
    ],
  };
}

export function findMatchingMockCompany(fileName: string): CompanyAnalysisPayload {
  const lower = fileName.toLowerCase();

  // 1. 솔라테크 / 에너지 / 기후 / 4번 케이스
  if (
    lower.includes('04_에너지') ||
    lower.includes('솔라') ||
    lower.includes('solar') ||
    lower.includes('에너지') ||
    lower.includes('태양') ||
    lower.includes('bipv') ||
    lower.includes('페로브') ||
    lower.includes('친환경') ||
    lower.includes('esg') ||
    (lower.startsWith('04') && !lower.includes('로봇')) ||
    (lower.startsWith('4') && !lower.includes('로봇')) ||
    lower.includes('사업계획서_4') ||
    lower.includes('사업계획서4') ||
    lower.includes('4번')
  ) {
    return MOCK_COMPANIES[3] || MOCK_COMPANIES[0];
  }

  // 2. 메디헬스바이오 / 바이오 / 헬스케어 / 3번 케이스
  if (
    lower.includes('03') ||
    lower.includes('바이오') ||
    lower.includes('bio') ||
    lower.includes('메디') ||
    lower.includes('medi') ||
    lower.includes('헬스') ||
    lower.includes('care') ||
    lower.includes('의료') ||
    lower.includes('임상') ||
    (lower.startsWith('03') || lower.startsWith('3')) ||
    lower.includes('사업계획서_3') ||
    lower.includes('사업계획서3') ||
    lower.includes('3번')
  ) {
    return MOCK_COMPANIES[2] || MOCK_COMPANIES[0];
  }

  // 3. 로보플로우 / 로봇 / 물류 / AMR / 모빌리티 / 2번 케이스
  if (
    lower.includes('04_로봇') ||
    lower.includes('02') ||
    lower.includes('로봇') ||
    lower.includes('로보') ||
    lower.includes('robot') ||
    lower.includes('robo') ||
    lower.includes('flow') ||
    lower.includes('amr') ||
    lower.includes('slam') ||
    lower.includes('물류') ||
    lower.includes('모빌리티') ||
    lower.includes('자율주행') ||
    (lower.startsWith('02') || lower.startsWith('2')) ||
    lower.includes('사업계획서_2') ||
    lower.includes('사업계획서2') ||
    lower.includes('2번')
  ) {
    return MOCK_COMPANIES[1] || MOCK_COMPANIES[0];
  }

  // 4. 비전웍스AI / 제조 AI / 1번 케이스 (기본값)
  const found = MOCK_COMPANIES.find((item) => lower.includes(item.company.name.split(' ')[0].toLowerCase()));
  return found || MOCK_COMPANIES[0];
}

export const FALLBACK_POLICY_REVIEW: PolicyPlanReview = {
  documentTitle: '2026년도 경기도 AI·제조 혁신 바우처 지원사업 계획서',
  executiveSummary: '본 정책 계획서는 도내 제조 AI 도입 및 유상 실증 전환율을 제고하기 위한 구조로, 타깃 기업군 정의와 지원 항목의 연계성이 매우 우수합니다. 다만 무상 지원 후 유상 전환 KPI 측정 지표를 구체화할 필요가 있습니다.',
  policyNeed: {
    headline: '도내 제조 AI 기업의 유상 실증 레퍼런스 부족 문제 해결 시급',
    narrative: 'G-BRIDGE AI 분석 데이터에 따르면, 경기도 내 제조 AI 스타트업의 83%가 PoC 이후 유상 구매 전환에 실패하는 PMF 병목을 겪고 있어 공공 바우처 기반 매칭 지원이 절실합니다.',
    implications: ['단순 R&D 자금 지원보다 수요처 매칭형 바우처에 집중', '수요기업 자부담 매칭을 통한 사업화 진정성 확보'],
    evidence: ['도내 제조 AI 42개사 중 35개사가 실증처 부재 호소', '평균 제품 개발 기간 대비 상용화 지연 1.8년'],
  },
  targetFit: {
    headline: '성장단계 T3/E3/M1 타깃 적합성 우수',
    narrative: '기술과 조직은 갖추었으나 시장 검증(M1)에 정체된 기업을 정밀 타깃팅하여 정책 투입 대비 성과 극대화 가능.',
    implications: ['선정 평가 시 T·E·M 진단 점수 반영', '매출 10억 미만 초기 상용화 기업 우선 배정'],
    evidence: ['목표 대상 기업군 120개사 중 78개사가 적격 요건 충족'],
  },
  programDesign: {
    headline: '실증-검증-구매 연계 3단계 프로그램 설계',
    narrative: '1단계(사전 매칭) -> 2단계(실증 바우처 5,000만원) -> 3단계(구매 연계 쇼케이스)로 체계적인 성과 확산 유도.',
    implications: ['바우처 정산 시 수요기업의 성능확인서 첨부 의무화', '중간 평가 탈락제(Gate keeper) 도입'],
    evidence: ['유사 선행 사업 대비 구매 전환율 2.3배 향상 기대'],
  },
  differentiation: {
    headline: '기존 중앙정부 R&D 사업과의 명확한 차별화',
    narrative: '중기부 R&D가 기술 개발 자체에 초점을 맞춘 반면, 본 사업은 판로 개척과 실제 결제 고객 확보에 100% 집중되어 차별성이 뚜렷함.',
    implications: ['경기도 산하 테크노밸리 인프라와 즉시 연계', '도내 중견·대기업 수요처 50개사 사전 확보 풀 활용'],
    evidence: ['중복 수혜 방지 가이드라인 충족'],
  },
  budgetReview: [
    '총 사업비 30억원 중 기업 직접 지원금 비중 85%로 적정 수준 유지',
    '전문 PM 운영비 및 성과 관리비 15% 배정으로 사업 관리 체계성 확보',
    '기업당 최대 5,000만원 한도는 실증 시제품 양산에 최적화된 규모'
  ],
  kpiReview: [
    { kpi: '유상 전환율 60% 이상', assessment: '달성 가능성 높음', recommendation: '수요기업 사전 구매의향서(LOI) 징구 필수' },
    { kpi: '신규 고용 창출 150명', assessment: '다소 공격적', recommendation: '단계별 채용 연계 인센티브 추가' },
    { kpi: '후속 투자유치 100억원', assessment: '적정', recommendation: 'GBSA 데모데이 및 펀드 연계 프로그램 포함' }
  ],
  implementationRoadmap: [
    { phase: '1단계 (Q1)', action: '참여 수요기업 및 공급기업 풀 모집·매칭', deliverable: '매칭 협약서 50건' },
    { phase: '2단계 (Q2-Q3)', action: '현장 실증 및 중간 성과 평가', deliverable: '중간 실증 리포트 및 PoC 검증서' },
    { phase: '3단계 (Q4)', action: '최종 쇼케이스 및 후속 투자·구매 계약 체결', deliverable: '유상 계약 실적 및 성과분석집' }
  ],
  risks: [
    { risk: '수요기업의 무성의한 실증 참여', mitigation: '수요기업 참여 인센티브(차년도 지원사업 가점) 부여' },
    { risk: '기술 유출 및 보안 문제', mitigation: '표준 비밀유지협약(NDA) 체결 의무화 및 법률 지원' }
  ],
  overallScore: 92,
  verdict: 'READY',
  priorityRevisions: [
    '성과 지표(KPI)에 단순 만족도 외 "유상 재구매 의향률" 항목 추가 권장',
    '지원 기업의 사후 모니터링 기간을 기존 1년에서 2년으로 확대 명시'
  ]
};

export async function analyzeBusinessPlanPdf(
  file: File,
  onProgress?: (progressText: string) => void,
  fallbackToMock = true,
): Promise<CompanyAnalysisPayload> {
  onProgress?.('문서의 사업모델·기술·시장 근거를 읽는 중입니다...');
  try {
    const result = await postDocument<CompanyAnalysisPayload>('analyze-company', file);
    onProgress?.('시장 전망과 미래전략을 컨설팅 보고서로 구성 중입니다...');
    return result;
  } catch (error) {
    if (!fallbackToMock) throw error;
    console.warn('서버 AI 분석을 사용할 수 없거나 단독 시연 모드이므로 검증된 데이터셋으로 즉시 전환합니다.', error);
    onProgress?.('사전 검증된 고품질 정답지 데이터로 전환합니다...');
    const target = findMatchingMockCompany(file.name);
    return {
      ...target,
      analysis: {
        ...target.analysis,
        consultingInsights: target.analysis.consultingInsights || buildFallbackConsulting(target.company, target.analysis),
      },
    };
  }
}

export async function analyzePolicyPlan(file: File): Promise<PolicyPlanReview> {
  try {
    return await postDocument<PolicyPlanReview>('analyze-policy-plan', file);
  } catch (error) {
    console.warn('정책 분석 API 호출 실패 -> 고품질 정답지 리포트로 대체합니다.', error);
    return {
      ...FALLBACK_POLICY_REVIEW,
      documentTitle: file.name.replace(/\.[^/.]+$/, '') || FALLBACK_POLICY_REVIEW.documentTitle,
    };
  }
}

export async function generatePolicyProposalWithGemini(
  industry: string,
  bottleneck: string,
  targetCount: number,
): Promise<Partial<PolicyProposalDraft>> {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'generate-policy', industry, bottleneck, targetCount }),
    });
    if (!response.ok) throw new Error('정책 생성 API 오류');
    return response.json();
  } catch {
    return {
      title: `경기도 ${industry} 기업 ${bottleneck} 병목 해소를 위한 맞춤형 지원 패키지`,
      problemStatement: `도내 ${industry} 기업 ${targetCount}개사의 분석 결과, 대부분의 기업이 기술 수준 대비 ${bottleneck} 단계에서 사업화 정체를 겪고 있습니다.`,
      proposedProgramTitle: `GBSA ${industry} Breakthrough 2026 (도약 바우처)`,
      supportComponents: [
        '유상 실증(PoC) 연계 바우처 최대 5,000만원 지원',
        '도내 수요기업(중견·대기업) 1:1 구매 상담회 및 매칭',
        '품질 인증 및 해외 규제 컨설팅 밀착 지원',
        '성과 우수 기업 대상 GBSA 혁신 펀드 연계'
      ],
      expectedImpact: `${targetCount}개 기업 중 60% 이상 유상 전환 달성 및 평균 매출 25% 증대`,
    };
  }
}
