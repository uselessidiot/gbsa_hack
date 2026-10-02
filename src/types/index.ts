/**
 * G-BRIDGE AI Core Type Definitions
 * Designed for Supabase, Gemini File Search RAG, and Vercel Deployment
 */

// ==========================================
// 1. T/E/M Maturity Levels & Bottleneck Enums
// ==========================================

export type TechLevel = 'T1' | 'T2' | 'T3' | 'T4';
export type ExecLevel = 'E1' | 'E2' | 'E3' | 'E4';
export type MarketLevel = 'M1' | 'M2' | 'M3' | 'M4';

export type BottleneckCategory =
  | 'TECH'         // 기술 안정성/개발
  | 'VALIDATION'   // 실증 부족 / PoC
  | 'PMF'          // 시장검증 / 첫 유상고객
  | 'STANDARDIZE'  // 커스터마이징 과다 / 제품 표준화
  | 'REGULATION'   // 규제·인증·보안
  | 'SALES'        // 판로 확대 / 영업채널
  | 'GLOBAL'       // 글로벌 진출 / 현지화
  | 'DIVERSIFY'    // 사업 다각화
  | 'INVESTMENT';  // 자금 / 투자 유치

export type SeverityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

// ==========================================
// 2. Company & Document Entities
// ==========================================

export interface Company {
  id: string;
  name: string;
  businessNumber?: string;
  industry: string;
  subIndustry?: string;
  location: string; // 예: 경기도 성남시 판교, 수원시 광교 등
  foundedYear: number;
  employees: number;
  revenue: number; // 백만원 단위
  exportAmount?: number; // 천달러 또는 백만원 단위
  certifications?: string[];
  patents?: string[];
  summary: string;
  keywords: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface DocumentMeta {
  id: string;
  companyId: string;
  fileName: string;
  fileSize?: number;
  uploadedAt: string;
  pageCount: number;
  fileSearchStoreId?: string;
  storagePath?: string;
}

// ==========================================
// 3. T/E/M Diagnosis & Analysis Schema
// ==========================================

export interface MaturityScoreDetail {
  level: string; // 'T1'~'T4', 'E1'~'E4', 'M1'~'M4'
  score?: number; // 0-100
  reason: string;
  sourceQuote: string;
}

export interface TEMDiagnosis {
  technology: MaturityScoreDetail;
  execution: MaturityScoreDetail;
  market: MaturityScoreDetail;
  radarScores: {
    tech: number;        // 0-100
    validation: number;  // 0-100
    market: number;      // 0-100
    finance: number;     // 0-100
    global: number;      // 0-100
  };
}

export interface BottleneckItem {
  category: BottleneckCategory;
  title: string;
  description: string;
  severity: SeverityLevel;
  sourceEvidence: string;
  pageNumber?: number;
}

export interface EvidenceCard {
  id: string;
  analysisId?: string;
  category: 'T' | 'E' | 'M' | 'BOTTLENECK' | 'GENERAL';
  source: string;
  page: number;
  excerpt: string;
  interpretation: string;
  confidenceScore?: number;
}

export interface ActionStep {
  step: number;
  phaseTitle?: string; // 예: '1단계: 유상 실증 전환 (단기)'
  timeframe?: string; // 예: '단기 (1~3개월)' / '중기 (4~6개월)' / '장기 (7~12개월+)'
  action: string;
  targetMetric: string;
  recommendedProgram?: {
    id?: string;
    organization: string; // 'GBSA' | '경기도' | '경기TP' 등
    title: string;
    budget: string; // '최대 5,115만원'
    fitReason: string;
  };
}

export interface ConsultingSection {
  headline: string;
  narrative: string;
  implications: string[];
  evidence: string[];
}

export interface StrategicInitiative {
  horizon: 'NOW' | 'NEXT' | 'LATER';
  title: string;
  rationale: string;
  actions: string[];
  kpi: string;
}

export interface ConsultingInsights {
  executiveDiagnosis: string;
  marketOutlook: ConsultingSection;
  technologyAssessment: ConsultingSection;
  businessModelAssessment: ConsultingSection;
  futureStrategy: StrategicInitiative[];
  keyRisks: Array<{ risk: string; impact: string; mitigation: string }>;
  scenarios: Array<{ name: string; condition: string; outlook: string }>;
  consultantQuestions: string[];
}

export interface AnalysisResult {
  id: string;
  companyId: string;
  documentId: string;
  analysisVersion: string;
  temDiagnosis: TEMDiagnosis;
  primaryBottleneck: BottleneckCategory;
  secondaryBottleneck?: BottleneckCategory;
  bottlenecks: BottleneckItem[];
  companyRequestedSupport: string[];
  recommendedSupport: string[];
  supportGapAnalysis: string; // 기업 주장 vs AI 객관 진단 비교 설명
  strengths: string[];
  weaknesses: string[];
  evidenceList: EvidenceCard[];
  actionPlan90Days: ActionStep[];
  verificationNeeded: string[];
  aiInsightSummary: string;
  consultingInsights?: ConsultingInsights;
  status: 'PENDING' | 'INDEXING' | 'ANALYZING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
}

export interface PolicyPlanReview {
  documentTitle: string;
  executiveSummary: string;
  policyNeed: ConsultingSection;
  targetFit: ConsultingSection;
  programDesign: ConsultingSection;
  differentiation: ConsultingSection;
  budgetReview: string[];
  kpiReview: Array<{ kpi: string; assessment: string; recommendation: string }>;
  implementationRoadmap: Array<{ phase: string; action: string; deliverable: string }>;
  risks: Array<{ risk: string; mitigation: string }>;
  overallScore: number;
  verdict: 'READY' | 'REVISE' | 'RETHINK';
  priorityRevisions: string[];
}

// ==========================================
// 4. Discovery & B2B Matching
// ==========================================

export interface CompanyB2BProfile {
  companyId: string;
  companyName: string;
  industry: string;
  technologies: string[];
  products: string[];
  targetCustomers: string[];
  capabilities: string[];  // 기업이 타사에 제공할 수 있는 역량
  needs: string[];         // 기업이 필요로 하는 실증/파트너/고객 수요
  desiredPartners: string[];
  visibility: 'PUBLIC' | 'INTERNAL_ONLY' | 'ANONYMIZED';
  updatedAt: string;
}

export interface B2BMatchResult {
  id: string;
  sourceCompanyId: string;
  targetCompanyId: string;
  targetCompanyName: string;
  targetIndustry: string;
  matchScore: number; // 0-100
  matchingReasons: string[];
  synergyDescription: string;
  matchType: 'CAPABILITY_TO_NEED' | 'JOINT_POC' | 'SUPPLY_CHAIN' | 'OPEN_INNOVATION';
  status: 'RECOMMENDED' | 'CONTACTED' | 'CONNECTED' | 'DISMISSED';
}

// ==========================================
// 5. Support Program Matching
// ==========================================

export interface SupportProgram {
  id: string;
  organization: string; // GBSA, 경기도, 중기부 등
  title: string;
  category: 'R&D' | '실증/PoC' | '자금/융자' | '판로/마케팅' | '인증/규제' | '글로벌' | '교육' | '사업화';
  budgetMaxMillion?: number; // 최대 지원금 (백만원)
  targetTechLevel?: TechLevel[];
  targetExecLevel?: ExecLevel[];
  targetMarketLevel?: MarketLevel[];
  targetBottlenecks: BottleneckCategory[];
  eligibilityCriteria: string[];
  applicationDeadline: string;
  status: 'OPEN' | 'UPCOMING' | 'CLOSED';
  detailUrl?: string;
  tags: string[];
  sourceName?: string;
  sourceUrl?: string;
  sourceNote?: string;
  demoRecommendation?: 'RECOMMENDED' | 'CONDITIONAL' | 'NOT_RECOMMENDED';
  demoFitReason?: string;
}

export interface ProgramMatchResult {
  programId: string;
  program: SupportProgram;
  matchScore: number; // 0-100
  eligibilityStatus: 'ELIGIBLE' | 'CONDITIONAL' | 'INELIGIBLE';
  ineligibilityReason?: string;
  recommendationReason: string;
  keyFitPoints: string[];
}

// ==========================================
// 6. Admin Intelligence & Policy Insight
// ==========================================

export interface AdminDashboardMetrics {
  totalAnalyzedCompanies: number;
  temDistribution: {
    technology: Record<TechLevel, number>;
    execution: Record<ExecLevel, number>;
    market: Record<MarketLevel, number>;
  };
  bottleneckStats: Record<BottleneckCategory, number>;
  topNeeds: { need: string; count: number }[];
  topCapabilities: { capability: string; count: number }[];
  regionalDistribution: Record<string, number>;
  programMatchRatePercent: number;
  b2bMatchCandidatesCount: number;
}

export interface PolicyProposalDraft {
  id: string;
  title: string;
  targetIndustry: string;
  targetCompanyCount: number;
  identifiedBottleneck: BottleneckCategory;
  problemStatement: string;
  proposedProgramTitle: string;
  supportComponents: string[];
  expectedImpact: string;
  targetKPIs: string[];
  evidenceDataSummary: string;
  createdAt: string;
}

// ==========================================
// 7. Supabase Database Schema Interfaces
// ==========================================

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: Company;
        Insert: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Company>;
      };
      analyses: {
        Row: AnalysisResult;
        Insert: Omit<AnalysisResult, 'id' | 'createdAt'>;
        Update: Partial<AnalysisResult>;
      };
      support_programs: {
        Row: SupportProgram;
        Insert: SupportProgram;
        Update: Partial<SupportProgram>;
      };
      b2b_profiles: {
        Row: CompanyB2BProfile;
        Insert: CompanyB2BProfile;
        Update: Partial<CompanyB2BProfile>;
      };
    };
  };
}
