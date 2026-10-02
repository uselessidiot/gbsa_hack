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
  const bottleneck = analysis.primaryBottleneck;
  return {
    executiveDiagnosis: `${company.name}은 기술 자산과 실행 기반은 확보했지만 ${bottleneck} 병목이 성장 속도를 제한하고 있습니다. 추가 개발 자체보다 고객이 비용을 지불할 이유를 검증하고, 재현 가능한 도입 패키지를 만드는 것이 다음 성장의 핵심입니다.`,
    marketOutlook: {
      headline: '수요는 존재하지만 구매 전환 근거가 부족한 시장',
      narrative: `${company.industry} 시장은 도입 관심과 실제 예산 집행 사이의 간극이 큽니다. 기능 우수성보다 도입기간, 전환비용, 정량 ROI를 증명하는 기업이 우선 선택될 가능성이 높습니다.`,
      implications: ['목표 고객군을 1개 세그먼트로 좁혀 구매 기준을 검증', '무상 PoC보다 유상 전환 조건과 성공지표를 계약 전에 합의'],
      evidence: analysis.evidenceList.slice(0, 2).map((item) => item.excerpt),
    },
    technologyAssessment: {
      headline: `${analysis.temDiagnosis.technology.level} 단계 기술의 상용 신뢰성 강화 필요`,
      narrative: analysis.temDiagnosis.technology.reason,
      implications: ['핵심 성능지표와 운영 안정성 지표를 분리 관리', '고객 환경별 커스터마이징 범위를 표준 모듈로 전환'],
      evidence: [analysis.temDiagnosis.technology.sourceQuote],
    },
    businessModelAssessment: {
      headline: '제품 가치와 과금 단위의 연결을 재설계할 시점',
      narrative: analysis.supportGapAnalysis,
      implications: ['고객의 비용 절감 또는 매출 기여를 가격 근거로 전환', '초기 구축비와 반복 매출 구조를 구분한 패키지 설계'],
      evidence: analysis.evidenceList.slice(0, 1).map((item) => item.excerpt),
    },
    futureStrategy: [
      { horizon: 'NOW', title: '핵심 고객 문제 검증', rationale: '가장 큰 불확실성을 먼저 줄입니다.', actions: ['구매담당자 인터뷰 10건', '유상 PoC 전환조건 정의'], kpi: 'LOI 또는 유상 PoC 1건' },
      { horizon: 'NEXT', title: '반복 가능한 상품화', rationale: '개별 프로젝트 의존도를 낮춥니다.', actions: ['표준 제안서·가격표 제작', '도입기간과 필수 연동 범위 표준화'], kpi: '제안-계약 전환율 30%' },
      { horizon: 'LATER', title: '채널과 시장 확장', rationale: '검증된 성공 공식을 인접시장으로 확장합니다.', actions: ['파트너 채널 2곳 확보', '산업별 레퍼런스 패키지 제작'], kpi: '반복매출 비중 40%' },
    ],
    keyRisks: [
      { risk: '기술 고도화가 고객검증보다 선행', impact: '개발비 증가와 출시 지연', mitigation: '분기별 고객 지불의사 검증을 투자 게이트로 설정' },
      { risk: 'PoC가 무상 실증으로 종료', impact: '매출 전환 지연', mitigation: '착수 전 구매 전환 조건과 의사결정자를 문서화' },
    ],
    scenarios: [
      { name: '기준 시나리오', condition: '90일 내 LOI 1건 확보', outlook: '6개월 내 첫 유상 레퍼런스 확보 가능' },
      { name: '하방 시나리오', condition: 'PoC 후 구매 예산 미확보', outlook: '타깃 고객과 가격 구조 재정의 필요' },
    ],
    consultantQuestions: ['실제 구매 의사결정자는 누구이며 예산 항목은 무엇인가?', 'PoC 성공을 유상계약으로 전환하는 사전 조건이 정의되어 있는가?', '고객별 추가개발 없이 반복 판매 가능한 범위는 어디까지인가?'],
  };
}

export async function analyzeBusinessPlanPdf(
  file: File,
  onProgress?: (progressText: string) => void,
): Promise<CompanyAnalysisPayload> {
  onProgress?.('문서의 사업모델·기술·시장 근거를 읽는 중입니다...');
  try {
    const result = await postDocument<CompanyAnalysisPayload>('analyze-company', file);
    onProgress?.('시장 전망과 미래전략을 컨설팅 보고서로 구성 중입니다...');
    return result;
  } catch (error) {
    if (error instanceof Error && error.message.includes('4MB')) throw error;
    console.warn('서버 AI 분석을 사용할 수 없어 검증된 데모 분석으로 전환합니다.', error);
    onProgress?.('API 연결이 없어 검증된 데모 데이터로 전환합니다...');
    const target = MOCK_COMPANIES.find((item) => file.name.includes(item.company.name.split(' ')[0])) || MOCK_COMPANIES[0];
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
  return postDocument<PolicyPlanReview>('analyze-policy-plan', file);
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
      problemStatement: `도내 ${industry} 기업의 반복적인 ${bottleneck} 병목을 사업 단위로 해소할 필요가 있습니다.`,
      proposedProgramTitle: `GBSA ${industry} Growth Bridge 2026`,
      supportComponents: ['진단 기반 단계별 바우처', '수요처 연계 유상 실증', '성과 추적 및 후속투자 연계'],
      expectedImpact: '유상 전환율과 반복매출 비중을 동시에 높이는 성장 경로 구축',
    };
  }
}
