import React, { useMemo } from 'react';
import { AnalysisResult, Company, CompanyB2BProfile } from '../types';

interface AnalysisKeywordTagsProps {
  company: Company;
  analysis?: AnalysisResult;
  profile?: CompanyB2BProfile;
  compact?: boolean;
  label?: string;
}

const bottleneckKeywords: Record<string, string[]> = {
  TECH: ['AI', 'R&D', '디바이스'],
  VALIDATION: ['실증', 'POC', '데이터'],
  PMF: ['실증', 'POC', '상용화', '판로개척'],
  STANDARDIZE: ['상용화', '사업화', '데이터'],
  REGULATION: ['인증', '데이터', '사업화'],
  SALES: ['마케팅', '판로개척', '수출'],
  GLOBAL: ['글로벌', '해외진출', '수출'],
  DIVERSIFY: ['사업화', '판로개척', '마케팅'],
  INVESTMENT: ['투자', 'pre-A', '사업화'],
};

const inferKeywords = (company: Company, analysis?: AnalysisResult, profile?: CompanyB2BProfile) => {
  const source = [
    ...(company.keywords || []),
    company.industry,
    company.subIndustry || '',
    ...(profile?.technologies || []),
    ...(profile?.products || []),
    ...(profile?.needs || []),
    ...(analysis?.companyRequestedSupport || []),
    ...(analysis?.recommendedSupport || []),
  ].join(' ').toLowerCase();

  const result: string[] = [];
  const add = (keyword: string) => {
    if (!result.includes(keyword)) result.push(keyword);
  };

  // Keep the original analysis keywords first so the same identity follows the user journey.
  (company.keywords || []).forEach((keyword) => {
    const normalized = keyword.trim();
    if (!normalized) return;
    if (/ai|인공지능/i.test(normalized)) add('AI');
    else if (/제조|스마트팩토리|부품/i.test(normalized)) add('제조');
    else add(normalized);
  });

  if (/ai|인공지능|머신러닝|비전|데이터/.test(source)) add('AI');
  if (/제조|스마트팩토리|공장|부품|소부장/.test(source)) add('제조');
  if (/헬스|바이오|의료/.test(source)) add('헬스');
  if (/피지컬|로봇|amr|하드웨어|디바이스/.test(source)) add('피지컬');
  if (/수출|해외|글로벌|동남아|일본|미국/.test(source)) { add('수출'); add('해외진출'); }
  if (/투자|vc|pre.?a|seed|시드/.test(source)) { add('투자'); add('pre-A'); }
  if (/창업|창업기업|초기/.test(source)) add('창업');
  if (/중소|중견|sme/.test(source)) add('중소');
  if (/소부장/.test(source)) add('소부장');

  (analysis?.primaryBottleneck && bottleneckKeywords[analysis.primaryBottleneck] || []).forEach(add);
  (analysis?.secondaryBottleneck && bottleneckKeywords[analysis.secondaryBottleneck] || []).forEach(add);

  return result.slice(0, 12);
};

export const AnalysisKeywordTags: React.FC<AnalysisKeywordTagsProps> = ({
  company,
  analysis,
  profile,
  compact = false,
  label = '분석 키워드',
}) => {
  const keywords = useMemo(() => inferKeywords(company, analysis, profile), [company, analysis, profile]);

  if (keywords.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${compact ? '' : 'mt-3'}`}>
      <span className="text-[11px] font-extrabold text-on-surface-variant mr-1">{label}</span>
      {keywords.map((keyword, index) => (
        <span
          key={`${keyword}-${index}`}
          className="inline-flex items-center rounded-full border border-outline-variant/40 bg-surface-container-low px-2.5 py-1 text-[11px] font-bold text-on-surface-variant shadow-sm"
        >
          {keyword}
        </span>
      ))}
    </div>
  );
};

