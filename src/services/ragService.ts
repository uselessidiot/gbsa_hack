import { PUBLIC_REPORTS_DATABASE, PublicReportMeta, queryPublicReports } from '../data/publicRagKnowledge';

export interface RagRetrievalResult {
  industry: string;
  matchedReportsCount: number;
  citations: Array<{
    reportTitle: string;
    fileName: string;
    page: number;
    quote: string;
    implication: string;
    recommendedSupport: string;
  }>;
  groundingPromptSnippet: string;
}

export function retrievePublicReportGrounding(industry: string, keywords: string[] = []): RagRetrievalResult {
  const citations = queryPublicReports(industry, keywords);

  const groundingPromptSnippet = `
[GBSA 공공 산업 분석 리포트 RAG 지식베이스 팩트 근거]
${citations.map((c, idx) => `
${idx + 1}. 출처: 「${c.fileName}」 p.${c.page}
- 공공 연구기관 팩트: "${c.quote}"
- 정책 시사점 및 처방: ${c.implication}
- 연계 권고 지원사업: ${c.recommendedSupport}
`).join('\n')}
`.trim();

  return {
    industry,
    matchedReportsCount: citations.length,
    citations,
    groundingPromptSnippet
  };
}

export function getAllPublicReports(): PublicReportMeta[] {
  return PUBLIC_REPORTS_DATABASE;
}
