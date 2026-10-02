# G-BRIDGE AI (GBSA 기업지원 Intelligence 플랫폼) 시스템 아키텍처 및 코덱스

## 1. 프로젝트 개요
- **서비스명**: G-BRIDGE AI
- **목적**: 경기도경제과학진흥원(GBSA)에 제출되는 기업 사업계획서(PDF)를 정밀 분석하여 정형화된 데이터 자산으로 변환하고, 기업 성장진단(T/E/M), 지원사업 자동 연계, 기업 간 매칭, 관리자용 신규사업 기획 Intelligence를 제공하는 통합 플랫폼.

---

## 2. 핵심 아키텍처 및 파이프라인

```
[기업/담당자]
    │
    ▼ (사업계획서 PDF 업로드)
[1. Document Ingestion & Gemini File Search]
    │
    ▼ (구조화 데이터 추출 / Schema Validation)
[2. GBSA Enterprise Data Engine]
    ├─► 기업 일반 정보 (업종, 소재지, 매출, 고용, 투자)
    ├─► T/E/M 기술·시장·실행력 단계 진단 (T1~T4, E1~E4, M1~M4)
    ├─► 핵심 병목 (인증, 실증/PoC, 자금, 판로, 인력 등)
    ├─► AI 판단 근거 (사업계획서 내 발췌 문장 및 페이지 링크)
    └─► 90일 단기 액션 플랜
    │
    ▼
[3. Multi-Track Intelligence Core]
    ├─► Track A: 지원사업 매칭 엔진 (경기도/GBSA/중기부 사업 적합도 평가)
    ├─► Track B: 기업 Discovery & 매칭 (기술 공급-수요, 오픈이노베이션, 밸류체인)
    └─► Track C: GBSA 관리자 Intelligence (산업별 병목 통계, 정책 수요, 신규사업 자동 기획)
```

---

## 3. T/E/M 진단 모델 정의
- **T (Technology / 기술 성숙도)**: T1(아이디어) → T2(시제품/PoC) → T3(상용화/양산) → T4(글로벌 초격차)
- **E (Execution / 실행력·조직·자금)**: E1(팀구성) → E2(시드투자/인력확충) → E3(시리즈A/조직화) → E4(스케일업)
- **M (Market / 시장성·판로·트랙션)**: M1(시장탐색) → M2(초기고객) → M3(반복매출/PMF) → M4(시장지배/수출)

---

## 4. 데이터 스키마 (TypeScript Core Schema)

```typescript
export interface CompanyProfile {
  id: string;
  name: string;
  businessNumber: string;
  industry: string;
  subIndustry: string;
  location: string; // 예: 판교 테크노밸리, 광교 바이오밸리 등 경기도 권역
  foundedYear: number;
  employees: number;
  revenue: number; // 백만원 단위
  exportAmount?: number;
  certifications: string[];
  patents: string[];
  summary: string;
  keywords: string[];
  
  // T/E/M 진단
  temDiagnosis: {
    technologyLevel: { level: 'T1'|'T2'|'T3'|'T4'; score: number; reason: string; sourceQuote: string };
    executionLevel: { level: 'E1'|'E2'|'E3'|'E4'; score: number; reason: string; sourceQuote: string };
    marketLevel: { level: 'M1'|'M2'|'M3'|'M4'; score: number; reason: string; sourceQuote: string };
    radarScores: { tech: number; execution: number; market: number; finance: number; global: number };
  };

  // 핵심 병목 & 강약점
  bottlenecks: Array<{
    category: '기술실증' | '인허가/인증' | '판로/마케팅' | '자금/투자' | '인재/조직' | '글로벌진출';
    description: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    sourceEvidence: string;
  }>;
  strengths: string[];
  weaknesses: string[];
  actionPlan90Days: Array<{ step: number; action: string; targetMetric: string }>;

  // 원본 문서 메타데이터
  documentMeta: {
    fileName: string;
    uploadedAt: string;
    pageCount: number;
    fileSearchStoreId?: string;
  };
}
```

---

## 5. UI/UX 구성 체계
1. **헤더 & 통합 네비게이션**: GBSA 브랜딩, 테마 전환, 데모 시나리오 프리셋 선택기
2. **Tab 1: 기업 진단 & 분석 (AI Diagnosis)**: PDF 드래그&드롭, 실시간 스트리밍 분석, T/E/M 레이더 및 근거 뷰어
3. **Tab 2: 맞춤형 지원사업 연계 (Program Matching)**: 매칭 점수순 추천, 신청 자격 검증, 지원 사유서 자동 생성
4. **Tab 3: 기업 검색 & 매칭 (Discovery & B2B Match)**: 기술/역량 기반 시맨틱 탐색, 협력 시너지 시뮬레이터
5. **Tab 4: GBSA 관리자 Intelligence (Admin Dashboard)**: 경기도 권역별/산업별 병목 히트맵, 정책 수요 분석, AI 신규 지원사업 기획안 자동 생성

---

## 6. 데모 시연 및 평가 대응 포인트 (해커톤 100점 만점 전략)
- **GBSA 업무혁신 기여도 (35점)**: 비정형 PDF를 다목적 데이터 자산으로 즉시 변환하는 업무 프로세스 극대화 시연.
- **현업 적용성·효과성 (25점)**: 담당자가 바로 쓸 수 있는 근거 인용(Source Quote)과 즉시 공문/제안서로 쓸 수 있는 기획안 출력.
- **구현 완성도 (20점)**: 실제 Gemini API 연동 + 오프라인/체험용 고품질 프리셋 데이터 동시 지원으로 완벽한 안정성 확보.
- **발표/시연 (10점) & 확장성 (10점)**: 시각적 매력도가 뛰어난 Glassmorphism + 다크/라이트 대시보드 및 직관적 인터랙션.
