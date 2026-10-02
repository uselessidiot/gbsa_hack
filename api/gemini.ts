import { GoogleGenAI } from '@google/genai';

const configuredModel = process.env.GEMINI_MODEL;
// Gemini 2.5 Flash is retired for newly provisioned API users. Keep older
// Vercel environments working by transparently upgrading that legacy value.
const MODEL = !configuredModel || configuredModel === 'gemini-2.5-flash'
  ? 'gemini-3.8-flash'
  : configuredModel;
const FALLBACK_MODEL = 'gemini-3.5-flash-lite';

const jsonPrompt = (task: string) => `${task}\n\n반드시 유효한 JSON 객체만 반환하세요. 문서에 없는 사실·수치·출처는 만들지 말고, 불명확하면 '확인 필요'라고 표시하세요. 모든 서술은 전문적인 한국어로 작성하세요.`;

function textOf(response: any) {
  const raw = response.text || '{}';
  return JSON.parse(raw.replace(/^```json\s*|\s*```$/g, ''));
}

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function generateWithRetry(ai: GoogleGenAI, request: any) {
  const models = Array.from(new Set([MODEL, FALLBACK_MODEL]));
  let lastError: any;
  for (const model of models) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        return await ai.models.generateContent({ ...request, model });
      } catch (error: any) {
        lastError = error;
        const message = String(error?.message || error);
        const retryable = message.includes('503') || message.includes('UNAVAILABLE') || message.includes('high demand');
        if (!retryable) break;
        await wait(700 * (attempt + 1));
      }
    }
  }
  throw lastError;
}

const asArray = <T>(value: unknown): T[] => Array.isArray(value) ? value : [];
const asSection = (value: any) => ({
  headline: value?.headline || '확인 필요',
  narrative: value?.narrative || '문서에서 충분한 근거를 확인하지 못했습니다.',
  implications: asArray<string>(value?.implications),
  evidence: asArray<string>(value?.evidence),
});

async function generateDocument(ai: GoogleGenAI, body: any, prompt: string) {
  if (!body.data || !body.mimeType) throw new Error('분석할 문서가 없습니다.');
  const response = await generateWithRetry(ai, {
    contents: [
      { inlineData: { mimeType: body.mimeType, data: body.data } },
      { text: jsonPrompt(prompt) },
    ],
    config: { responseMimeType: 'application/json', temperature: 0.2 },
  });
  return textOf(response);
}

function normalizeCompany(raw: any, fileName: string) {
  const now = Date.now();
  const companyId = `COMP-${String(now).slice(-8)}`;
  const documentId = `DOC-${String(now).slice(-8)}`;
  const company = {
    id: companyId,
    name: raw.company?.name || fileName.replace(/\.[^.]+$/, ''),
    businessNumber: raw.company?.businessNumber || '',
    industry: raw.company?.industry || '확인 필요',
    subIndustry: raw.company?.subIndustry || '',
    location: raw.company?.location || '확인 필요',
    foundedYear: Number(raw.company?.foundedYear) || 0,
    employees: Number(raw.company?.employees) || 0,
    revenue: Number(raw.company?.revenue) || 0,
    summary: raw.company?.summary || '사업계획서 기반 기업 분석',
    keywords: asArray<string>(raw.company?.keywords),
    createdAt: new Date().toISOString(),
  };
  const analysis = {
    id: `ANALYSIS-${String(now).slice(-8)}`,
    companyId,
    documentId,
    analysisVersion: 'TEM-v2.0-consulting',
    temDiagnosis: {
      technology: raw.temDiagnosis?.technology || { level: 'T1', score: 0, reason: '확인 필요', sourceQuote: '확인 필요' },
      execution: raw.temDiagnosis?.execution || { level: 'E1', score: 0, reason: '확인 필요', sourceQuote: '확인 필요' },
      market: raw.temDiagnosis?.market || { level: 'M1', score: 0, reason: '확인 필요', sourceQuote: '확인 필요' },
      radarScores: raw.temDiagnosis?.radarScores || { tech: 0, validation: 0, market: 0, finance: 0, global: 0 },
    },
    primaryBottleneck: raw.primaryBottleneck || 'PMF',
    secondaryBottleneck: raw.secondaryBottleneck,
    bottlenecks: asArray(raw.bottlenecks),
    companyRequestedSupport: asArray(raw.companyRequestedSupport),
    recommendedSupport: asArray(raw.recommendedSupport),
    supportGapAnalysis: raw.supportGapAnalysis || '확인 필요',
    strengths: asArray(raw.strengths),
    weaknesses: asArray(raw.weaknesses),
    evidenceList: asArray<any>(raw.evidenceList).map((item: any, index: number) => ({ id: `EVI-${now}-${index}`, source: fileName, ...item })),
    actionPlan90Days: asArray(raw.actionPlan90Days),
    verificationNeeded: asArray(raw.verificationNeeded),
    aiInsightSummary: raw.aiInsightSummary || raw.consultingInsights?.executiveDiagnosis || '분석 완료',
    consultingInsights: {
      executiveDiagnosis: raw.consultingInsights?.executiveDiagnosis || raw.aiInsightSummary || '확인 필요',
      marketOutlook: asSection(raw.consultingInsights?.marketOutlook),
      technologyAssessment: asSection(raw.consultingInsights?.technologyAssessment),
      businessModelAssessment: asSection(raw.consultingInsights?.businessModelAssessment),
      futureStrategy: asArray(raw.consultingInsights?.futureStrategy),
      keyRisks: asArray(raw.consultingInsights?.keyRisks),
      scenarios: asArray(raw.consultingInsights?.scenarios),
      consultantQuestions: asArray(raw.consultingInsights?.consultantQuestions),
    },
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
  };
  const profile = {
    companyId,
    companyName: company.name,
    industry: company.industry,
    technologies: asArray(raw.profile?.technologies).length ? raw.profile.technologies : company.keywords,
    products: asArray(raw.profile?.products),
    targetCustomers: asArray(raw.profile?.targetCustomers),
    capabilities: asArray(raw.profile?.capabilities),
    needs: asArray(raw.profile?.needs),
    desiredPartners: asArray(raw.profile?.desiredPartners),
    visibility: 'PUBLIC',
    updatedAt: new Date().toISOString(),
  };
  return { company, analysis, profile };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST 요청만 지원합니다.' });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'Vercel에 GEMINI_API_KEY가 설정되지 않았습니다.' });

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (body.action === 'analyze-company') {
      const raw = await generateDocument(ai, body, `
당신은 GBSA 수석 기업전략 컨설턴트다. 첨부 사업계획서를 실사하듯 분석하라.
다음 키를 모두 포함한다.
company: name,businessNumber,industry,subIndustry,location,foundedYear,employees,revenue,summary,keywords[].
temDiagnosis: technology/execution/market 각각 level(T1~T4/E1~E4/M1~M4),score(0~100),reason,sourceQuote와 radarScores(tech,validation,market,finance,global).
primaryBottleneck, secondaryBottleneck: TECH,VALIDATION,PMF,STANDARDIZE,REGULATION,SALES,GLOBAL,DIVERSIFY,INVESTMENT 중 선택.
bottlenecks[]: category,title,description,severity(HIGH/MEDIUM/LOW),sourceEvidence,pageNumber.
companyRequestedSupport[], recommendedSupport[], supportGapAnalysis, strengths[], weaknesses[].
evidenceList[]: category(T/E/M/BOTTLENECK/GENERAL),page,excerpt,interpretation,confidenceScore. 최소 4개.
actionPlan90Days[]: step,action,targetMetric,timeframe. 정확히 3개.
verificationNeeded[], aiInsightSummary.
consultingInsights: executiveDiagnosis(3~5문장), marketOutlook, technologyAssessment, businessModelAssessment.
각 assessment는 headline,narrative(3~5문장),implications[],evidence[]를 가진다.
futureStrategy[]는 NOW/NEXT/LATER 각각 horizon,title,rationale,actions[],kpi.
keyRisks[]는 risk,impact,mitigation. scenarios[]는 name,condition,outlook. consultantQuestions[]는 상담 시 확인할 질문 5개.
profile: technologies[],products[],targetCustomers[],capabilities[],needs[],desiredPartners[].
시장 규모나 경쟁사 수치는 문서에 있을 때만 사용하고, 일반 시장 전망과 문서 근거를 명확히 구분하라.
`);
      return res.status(200).json(normalizeCompany(raw, body.fileName || '사업계획서.pdf'));
    }

    if (body.action === 'analyze-policy-plan') {
      const raw = await generateDocument(ai, body, `
당신은 공공 지원사업 예비타당성 및 사업설계 평가위원이다. 첨부된 신규 사업기획서를 분석하라.
documentTitle, executiveSummary를 작성한다.
policyNeed,targetFit,programDesign,differentiation은 각각 headline,narrative,implications[],evidence[] 구조다.
budgetReview[]는 예산 적정성·단가·누락 항목을 평가한다.
kpiReview[]는 kpi,assessment,recommendation 구조다.
implementationRoadmap[]는 phase,action,deliverable 구조다.
risks[]는 risk,mitigation 구조다.
overallScore는 0~100, verdict는 READY/REVISE/RETHINK 중 하나다.
priorityRevisions[]에는 제출 전 우선 보완사항 3~5개를 구체적으로 작성한다.
정책 필요성-대상-지원수단-KPI 사이 인과관계를 특히 엄격하게 검증하라.
`);
      return res.status(200).json(raw);
    }

    if (body.action === 'generate-policy') {
      const response = await generateWithRetry(ai, {
        contents: jsonPrompt(`경기도 ${body.industry} 기업 ${body.targetCount}개사의 ${body.bottleneck} 병목을 해결할 신규 지원사업을 설계하라. title,problemStatement,proposedProgramTitle,supportComponents[],expectedImpact를 작성하라.`),
        config: { responseMimeType: 'application/json', temperature: 0.3 },
      });
      return res.status(200).json(textOf(response));
    }

    return res.status(400).json({ error: '지원하지 않는 분석 작업입니다.' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error?.message || 'Gemini 분석 중 오류가 발생했습니다.' });
  }
}
