---
title: "G-BRIDGE AI - 통합 기획·PRD·개발 문서"
version: "v1.0"
date: "2026-10"
project: "경기도경제과학진흥원 바이브코딩 해커톤"
rag: "Gemini API File Search / File Search Store"
ui_dev: "Stitch + Google Antigravity + Gemini API"
mvp_scope: "기업진단 + 지원사업 연계 + 기업 매칭 + 관리자 인사이트"
language: "ko"
document_type: "concept + PRD + system design + implementation plan"
---

# G-BRIDGE AI

**기업 사업계획서를 성장 데이터로 전환하는 GBSA 기업지원 Intelligence 플랫폼**

> 이 문서는 해커톤 MVP의 컨셉, PRD, Gemini File Search 기반 RAG, 시스템/DB/API, 화면 명세, 개발 순서, 시연 전략을 하나로 통합한 실행 기준서다.

> **●  핵심 정의**
> 사업계획서를 한 번 읽고 끝나는 평가문서가 아니라, 기업의 성장단계·기술·니즈·협력수요를 구조화해 기업지원, 기업매칭, 사업기획에 반복 활용하는 데이터 자산으로 전환한다.

## 0. 문서 구성

이 문서는 컨셉, PRD, RAG, 시스템 설계, 개발 실행계획을 하나로 통합한 실행 기준서입니다.

## 목차

- 1. Executive Summary & 심사전략
- 2. 서비스 컨셉과 문제 정의
- 3. 사용자·업무 시나리오
- 4. 제품 범위와 핵심 모듈
- 5. PRD: 기능 요구사항
- 6. 기업 성장진단 모델(T/E/M)
- 7. Gemini File Search RAG 설계
- 8. 기업 Discovery/Matching 설계
- 9. 관리자 Intelligence Dashboard
- 10. 시스템 아키텍처
- 11. 데이터베이스 설계
- 12. API 및 분석 파이프라인
- 13. UI/화면 명세
- 14. AI 출력 Schema·Prompt 정책
- 15. 검증·품질·보안
- 16. 개발 순서 및 MVP 우선순위
- 17. 시연 시나리오와 심사 대응
- 18. 확장 로드맵
- A 부록: 테스트셋·용어·참고자료

## 1. Executive Summary & 심사전략

### 1.1 프로젝트 한 줄 정의

> **G-BRIDGE AI (가칭)**
> 기업 사업계획서를 AI가 분석해 성장단계(T/E/M), 핵심 병목과 근거, 지원사업을 도출하고, 동시에 기업 Profile과 니즈 데이터를 축적하여 기업 간 매칭과 GBSA의 신규사업 기획까지 연결하는 기업지원 Intelligence 플랫폼.

### 1.2 1개의 사업계획서가 만드는 3개의 가치

| 대상 | 가치 | 핵심 산출물 |
| --- | --- | --- |
| 기업 | 현재 성장단계와 실제 병목을 이해하고 필요한 지원을 찾음 | T/E/M, 병목, 90일 액션, 지원사업 |
| 사업담당자 | 문서 검토·근거 탐색·기업 발굴 업무를 빠르게 수행 | 근거 카드, 기업 검색/매칭, 이력 |
| GBSA/기획담당 | 누적 기업 데이터에서 공통 니즈를 찾아 신규사업 기획 | 산업별 병목, 니즈 Radar, 사업기획 초안 |

### 1.3 심사기준 대응 전략

**[심사기준] GBSA 업무혁신 기여도 35 / 현업 적용성·효과성 25 / 구현 완성도 20 / 확장성·지속가능성 10 / 발표·시연 10**

| 평가항목 | 배점 | 제품에서 보여줄 증거 |
| --- | --- | --- |
| GBSA 업무혁신 기여도 | 35 | 사업계획서 검토 → 기업진단 → 기업매칭 → 니즈 집계 → 신규사업 기획으로 업무 재사용 |
| 현업 적용성·효과성 | 25 | 실제 PDF 업로드, 근거 페이지, 구조화 결과, 검색·매칭까지 End-to-End |
| 구현 완성도 | 20 | 업로드/분석/대시보드/저장/검색이 끊김 없이 동작 |
| 확장성·지속가능성 | 10 | 기업별 이력과 산업별 데이터가 계속 누적되는 구조 |
| 발표·시연 전략 | 10 | 같은 분야라도 다른 병목이 나오는 사례 + 관리자 활용까지 연결 |

## 2. 서비스 컨셉과 문제 정의

### 2.1 AS-IS: 현재 업무의 구조적 문제

- 사업계획서는 해당 사업의 선정·평가 목적으로 집중 검토되지만, 분석된 기업 정보가 다음 사업에서 재사용되기 어렵다.
- 사업계획서 안의 기술, 실증, 고객, 매출, 투자, 인증, 니즈가 문서형 데이터로 흩어져 있어 비교·검색·통계가 어렵다.
- 기업이 요청하는 지원이 실제 성장 병목과 항상 일치하지 않으므로 담당자 경험에 따른 판단 편차가 발생할 수 있다.
- 다른 담당자가 유사 기업·협력 파트너·실증처를 찾으려면 문서를 다시 읽거나 사람에게 물어야 한다.
- 누적된 기업의 실제 니즈를 기반으로 차년도 신규사업을 설계하는 데이터 연결고리가 약하다.
### 2.2 TO-BE: “문서 → 기업 성장 데이터” 전환

```text
기업 사업계획서 업로드
        ↓
Gemini 구조화·근거검색
        ↓
기업 Profile + T/E/M + 병목 + 니즈
        ↓
┌ 기업 성장진단 / 지원사업 ┐
├ 기업 Discovery / Matching ┤
└ 관리자 Intelligence        ┘
        ↓
기업지원 · 기업연결 · 신규사업 기획
```

### 2.3 프로젝트의 차별점

| 일반적인 AI 요약 서비스 | G-BRIDGE AI |
| --- | --- |
| 문서 요약이 최종 결과 | 요약은 중간 단계, 구조화 DB가 최종 자산 |
| 기업이 요청한 지원을 정리 | 기업 주장과 객관 근거를 비교하여 실제 병목을 진단 |
| 개별 기업 1회성 답변 | 분석 결과가 다음 사업/담당자/기획에 재사용 |
| 검색용 챗봇 중심 | 진단 + 검색 + 매칭 + Portfolio 분석으로 확장 |
| 근거가 자연어 설명에 묻힘 | Gemini File Search citation/metadata를 근거 카드로 노출 |

> **발표 메시지**
> “기업은 더 적합한 지원을 받고, 기업끼리는 연결되고, GBSA는 데이터를 얻는다.”

## 3. 사용자·업무 시나리오

### 3.1 핵심 사용자

| 사용자 | 주요 질문 | 핵심 화면 |
| --- | --- | --- |
| 기업/신청기업 | 우리 기업은 지금 어디에서 막혀 있고 어떤 지원이 필요한가? | 분석 결과, 지원사업, 공개 Profile |
| 사업담당자 | 이 기업의 실제 상태와 근거는 무엇이며 누구와 연결할 수 있는가? | 기업 분석, 근거, Discovery/Matching |
| 기획/관리자 | 기업들이 공통으로 겪는 문제는 무엇이며 어떤 사업을 만들 것인가? | Portfolio, 니즈 Radar, 사업기획 |

### 3.2 대표 업무 시나리오

#### 시나리오 A — 기업 진단

1. 기업 사업계획서 PDF 업로드
1. 기업 기본정보/기술/사업/고객/희망지원 구조화
1. T/E/M 및 핵심 병목 도출
1. 원문 근거 페이지 확인
1. 지원사업/90일 액션 확인
#### 시나리오 B — 기업 발굴·매칭

1. 사업계획서에서 공개 가능한 Profile 자동 생성
1. 담당자가 “물류센터 실증이 필요한 로봇기업”처럼 자연어 검색
1. 기업 기술(capabilities)과 협력수요(needs)를 비교
1. 상위 후보와 매칭 이유를 확인
1. 담당자가 실제 연결 여부를 결정
#### 시나리오 C — 관리자 사업기획

1. 기업군을 산업/지역/성장단계로 필터
1. 반복되는 병목·니즈를 수치로 확인
1. 외부 산업/정책 보고서 RAG와 결합
1. AI가 신규사업 기획 초안을 제시
1. 담당자가 근거와 대상을 검토해 실제 기획으로 발전
## 4. 제품 범위와 핵심 모듈

| 모듈 | 역할 | MVP 우선순위 |
| --- | --- | --- |
| A. AI 기업 성장진단 | 사업계획서 구조화, T/E/M, 병목, 근거, 실행전략 | P0 |
| B. 지원사업 연계 | 기업 병목/조건 기반 지원사업 추천 | P0 |
| C. 기업 Discovery/Matching | 기업 Profile 검색, 수요-공급/실증 매칭 | P1 |
| D. 관리자 Intelligence | 기업군 현황, 병목/니즈 Dashboard | P1 |
| E. 신규사업 기획 지원 | 내부 데이터 + 외부 보고서 기반 사업 아이디어 초안 | P2 |

### 4.1 MVP 경계

> **MVP 원칙**
> “많은 기능”보다 “사업계획서 업로드 → 근거 있는 진단 → DB 저장 → 다시 검색/통계에 재사용”이 실제로 연결되는 것을 우선한다. 신규사업 기획은 자동 의사결정이 아니라 의사결정 지원으로 표현한다.

### 4.2 공개/내부 데이터 경계

| 구분 | 예시 | 정책 |
| --- | --- | --- |
| Internal Only | 매출, 투자, 원문, T/E/M, 병목, 지원이력, 민감한 애로사항 | 담당자 권한 기반 접근 |
| Public Candidate | 기업명, 소개, 제품, 핵심기술, 협력희망, 홈페이지 | 기업 동의/검토 후 공개 |
| Analytics | 산업/지역/병목 집계, 익명 통계 | 개별기업 식별정보를 최소화해 관리자 활용 |

## 5. PRD: 기능 요구사항

### 5.1 P0 기능 요구사항

| ID | 기능 | 요구사항 / 완료조건 |
| --- | --- | --- |
| P0-01 | PDF 업로드 | 사업계획서 PDF를 업로드하고 분석 ID를 발급한다. 오류 시 재시도 상태를 보여준다. |
| P0-02 | 구조화 추출 | 기업명/산업/소재지/제품/기술/고객/매출/투자/PoC/LOI/희망지원 등을 JSON으로 저장한다. |
| P0-03 | T/E/M 진단 | T1~T4, E1~E4, M1~M4 중 하나를 선택하고 근거를 함께 반환한다. |
| P0-04 | 병목 진단 | 정의된 enum 중 primary/secondary bottleneck을 선정한다. |
| P0-05 | 근거 카드 | 핵심 판단마다 원문 파일/페이지/인용 또는 citation metadata를 표시한다. |
| P0-06 | 지원사업 추천 | 필수 조건을 먼저 필터링하고 병목 적합도로 상위 후보를 제공한다. |
| P0-07 | 결과 저장 | 분석 버전과 함께 기업/분석/근거/추천결과를 App DB에 저장한다. |

### 5.2 P1 기능 요구사항

| ID | 기능 | 요구사항 / 완료조건 |
| --- | --- | --- |
| P1-01 | 기업 Profile | 사업계획서에서 공개 후보 필드를 자동 생성하고 공개여부를 분리한다. |
| P1-02 | 기업 검색 | 산업/기술/제품/needs/capabilities로 검색·필터한다. |
| P1-03 | 기업 매칭 | needs ↔ capabilities 기반 상위 기업을 추천하고 이유를 설명한다. |
| P1-04 | 관리자 Dashboard | 기업 수, 산업분포, T/E/M, 병목, 니즈 Top N을 필터 가능한 차트/카드로 제공한다. |
| P1-05 | 기업 상세 이력 | 여러 사업/연도 분석 결과를 기업 단위로 누적 조회한다. |

### 5.3 P2 기능 요구사항

- 외부 산업/정책 보고서 기반 시장 인사이트
- 관리자 자연어 질의(예: 최근 로봇기업의 가장 큰 애로사항)
- 신규사업 기획 초안(대상, 필요성, 지원내용, KPI)
- 유사기업/성공경로 비교
- 분석 결과 Export 및 기관 내부 시스템 연계
## 6. 기업 성장진단 모델(T/E/M)

### 6.1 T/E/M 정의

| 레벨 | T: Technology | E: Evidence / Validation | M: Market |
| --- | --- | --- | --- |
| 1 | 아이디어/초기 연구 | 외부 검증 없음, 내부 시험 중심 | 유상 고객/계약 없음 |
| 2 | 프로토타입/핵심기능 구현 | 제한적 외부 테스트/초기 PoC | 상담·관심·첫 고객 탐색 |
| 3 | 실환경 적용 가능 수준 | 실환경 PoC/장기 운용 검증 | 첫 유상고객 또는 시장진입 직전 |
| 4 | 상용제품/안정 운영 | 반복 검증/상용 환경 운영 | 복수고객·반복매출·시장확장 |

### 6.2 병목 분류

| Code | 병목 | 대표 신호 |
| --- | --- | --- |
| TECH | 기술 안정성/개발 | 성능, 장시간 안정성, 핵심기능 미완성 |
| VALIDATION | 실증 부족 | 실험실 결과만 존재, 현장 데이터/PoC 부족 |
| PMF | 시장검증/첫 고객 | 무상 PoC, LOI/유상계약 부재, 가격/영업체계 미정 |
| STANDARDIZE | 제품 표준화 | 고객별 커스터마이징 과다, 설치기간/원가 증가 |
| REGULATION | 규제·인증·보안 | 의료/보안/안전 인증, 데이터 처리 기준 미비 |
| SALES | 판로 확대 | 제품·고객 검증 후 영업채널/세일즈 역량 부족 |
| GLOBAL | 글로벌 진출 | 국내 검증 후 해외 수요, 현지화/파트너 부족 |
| DIVERSIFY | 사업 다각화 | 기존시장 성숙, 신규 제품/고객군 필요 |
| INVESTMENT | 투자/자금 | 검증 계획은 있으나 실행자금·투자준비 부족 |

### 6.3 Ground Truth 예시

| 테스트 기업 | 기대 진단 | 핵심 병목 | 핵심 근거 |
| --- | --- | --- | --- |
| 비전웍스AI | T3 / E3 / M1 | PMF / 시장검증 | 생산라인 PoC 경험은 있으나 PoC 2건 모두 무상, LOI·유상계약 없음 |
| 로보플로우 | T2 / E1 / M1 | TECH / 기술 안정성 | 사내 최대 연속주행 2시간15분, 물류센터 현장 적용 전, 안전인증 미착수 |

> **테스트 원칙**
> 12개 가상기업 기대분석결과 파일을 정답지로 사용한다. 분야별 정답을 외우게 하는 것이 아니라, 문서의 사실에서 동일한 성장단계·병목을 재현하는지 검증한다.

## 7. Gemini File Search RAG 설계

RAG는 별도 벡터 DB가 아니라 Gemini File Search / File Search Store를 중심으로 구성합니다.

### 7.1 기술 선택 원칙

- Gemini File Search가 문서를 가져오고(chunk), 임베딩하고(index), 질문 시 관련 근거를 검색하는 RAG 계층을 담당한다.
- File Search Store에는 custom metadata를 함께 넣어 기관, 연도, 산업, 문서유형, 기업ID 등으로 검색 범위를 제어한다.
- 검색 결과의 citation annotation과 custom metadata를 UI의 “근거 보기”에 연결한다.
- 구조화 분석 결과(T/E/M, 병목, 매출 등)는 File Search Store가 아니라 App DB에 저장한다.
- Gemini Structured Output(JSON Schema)으로 추출 결과를 고정하고 애플리케이션에서 Zod/서버 검증을 한 번 더 수행한다.
### 7.2 권장 File Search Store 구조

| Store | 내용 | 수명/보안 | 대표 metadata |
| --- | --- | --- | --- |
| company-{analysisId} | 개별 사업계획서 및 기업 제출문서 | 분석 단위 격리. 해커톤 MVP에서 가장 안전 | company_id, analysis_id, doc_type, page |
| support-programs | GBSA/경기도/정부 지원사업 공고·안내 | 지속 업데이트 | org, program_type, year, status, industry |
| industry-reports | 경과원·과기부·산업부·KIET·KISTEP·KOTRA 등 보고서 | 지속 업데이트 | org, year, industry, topic, geography |

### 7.3 RAG 파이프라인

```text
[1] PDF 업로드
   ↓
[2] File Search Store 생성/선택
   ↓
[3] 파일 업로드 + custom metadata
   ↓
[4] Gemini가 자동 chunk / embedding / index
   ↓
[5] 분석 질의 + file_search tool
   ↓
[6] Structured Output(JSON) + citation annotations
   ↓
[7] 서버 검증(Zod)
   ↓
[8] App DB 저장 + 근거 카드 UI
```

### 7.4 RAG 영역별 역할

| RAG 영역 | 질문 예시 | 출력 |
| --- | --- | --- |
| 기업문서 | “유상 고객, PoC, 실증, 성능을 보여주는 근거를 모두 찾기” | 기업 진단의 원문 근거 |
| 지원사업 | “PMF 병목이며 경기도 소재 초기기업에 적합한 사업은?” | 후보 사업 + 조건 + 추천 이유 |
| 산업리포트 | “물류 AMR의 최근 도입장벽과 실증 트렌드는?” | 시장/정책 인사이트 |

### 7.5 Chunking·Metadata 권장안

| 항목 | MVP 권장 |
| --- | --- |
| Chunking | 기본 자동 chunking을 우선 사용. 표/섹션 검색 품질이 낮을 때만 chunking_config를 튜닝 |
| Metadata | source_org, year, industry, topic, doc_type, company_id, analysis_id, visibility |
| 지원사업 문서 | program_id, open/close date, region, target_stage, support_type를 App DB에도 구조화 |
| 페이지/출처 | 가능한 경우 page/source URL 등 UI 근거 표시에 필요한 값을 metadata로 보존 |
| Store 검색 | 기업문서는 해당 analysis store만, 외부지식은 산업/지원사업 store를 필요한 순간에 조회 |

> **중요: RAG와 DB의 역할 분리**
> File Search는 “어떤 문서 근거가 답을 지지하는가?”를 해결한다. App DB는 “기업 248개 중 실증 병목 기업은 몇 개인가?” 같은 정확한 집계·필터·대시보드를 해결한다. 관리자 통계를 RAG만으로 계산하지 않는다.

## 8. 기업 Discovery / Matching 설계

### 8.1 자동 생성할 기업 Profile

```json
{
  "industry": ["제조AI"],
  "technologies": ["AI 비전검사", "Edge AI"],
  "products": ["VW-Inspect"],
  "target_customers": ["자동차부품", "전자부품 제조사"],
  "capabilities": ["외관검사 자동화", "불량탐지"],
  "needs": ["수요기업", "유상실증", "영업채널"],
  "desired_partners": ["제조기업", "스마트팩토리 SI"],
  "visibility": "internal|public_candidate"
}
```

### 8.2 매칭 로직

| 평가축 | 가중치(초안) | 설명 |
| --- | --- | --- |
| Need ↔ Capability | 40 | 한 기업이 필요한 것과 다른 기업이 제공할 수 있는 것의 직접 일치 |
| 산업 연관성 | 20 | 공급·수요 산업의 적용 가능성 |
| 기술 연관성 | 15 | 기술 키워드/제품 기능의 의미적 연관성 |
| 성장단계 적합성 | 10 | 실증처, 채널, 투자 등 협력 목적과 현재 단계 |
| 협력 목적 | 10 | PoC/공동개발/수요기업/유통 등 목적 일치 |
| 지역 | 5 | 현장 실증/밀착 지원 시 보조 가중치 |

### 8.3 검색 UX

- 키워드 검색: “AI 비전검사 기업”
- 자연어 검색: “자동차 부품 생산라인에서 실증이 필요한 AI 기업”
- 필터 검색: 산업 / 지역 / T/E/M / 병목 / 기술 / 협력수요
- 추천 검색: 현재 기업 상세에서 “협력 가능한 기업 찾기”
> **매칭의 신뢰성**
> 매칭점수 자체보다 “왜 이 기업을 추천했는지”를 설명하는 것이 중요하다. 기술/니즈/지역/단계 중 실제로 일치한 근거를 3~5개 보여준다.

## 9. 관리자 Intelligence Dashboard

### 9.1 대시보드 핵심 KPI

| KPI | 예시 표현 | 목적 |
| --- | --- | --- |
| 분석기업 수 | 248개 | 플랫폼 활용 규모 |
| T/E/M 분포 | T3 이상 64%, E2 이하 38% | 기업군 성숙도 파악 |
| Top 병목 | 실증 31%, 시장검증 24% | 지원정책 우선순위 |
| Top 니즈 | 테스트베드, 수요기업, 인증 | 기업의 체감 니즈 |
| 지원사업 매칭률 | 조건 충족 추천이 있는 기업 비율 | 지원 공백 확인 |
| 기업 연결 후보 | 매칭 후보/실제 연결 수 | 네트워크 활용도 |

### 9.2 필터

| 필터 | 예시 |
| --- | --- |
| 산업 | 제조AI / 로봇 / AI SaaS / 디지털헬스 |
| 지역 | 화성 / 부천 / 안산 / 시흥 등 |
| 기간 | 분석일 / 사업연도 |
| 성장단계 | T, E, M 개별 또는 조합 |
| 병목 | TECH / VALIDATION / PMF / REGULATION ... |
| 지원상태 | 지원사업 추천 / 매칭 / 후속지원 여부 |

### 9.3 신규사업 기획 지원

```text
내부 기업 데이터
  - 기업 72개 중 실증 병목 26개
  - 첫 고객/시장검증 병목 18개
        +
외부 산업·정책 RAG
  - 정부/연구기관 보고서의 산업 흐름
        ↓
AI 기획 초안
  - 문제정의 / 대상 / 지원내용 / KPI / 근거
        ↓
담당자 검토·수정·의사결정
```

> **정책적 표현**
> AI는 신규사업을 “결정”하지 않는다. 내부 기업 데이터와 외부 근거를 정리하고 사업 아이디어 초안을 제시하는 의사결정 지원 도구로 정의한다.

## 10. 시스템 아키텍처

```text
[Next.js Web / Stitch UI]
  ├─ 기업 업로드/결과
  ├─ 기업 Discovery/Matching
  └─ Admin Dashboard
          │
          ▼
[Application API]
  ├─ document / analysis
  ├─ matching / programs
  ├─ dashboard / policy-insight
  └─ auth / visibility
          │
  ┌───────┴───────────────┐
  ▼                       ▼
[Gemini API]           [App DB]
  ├ Structured Output    ├ companies
  ├ File Search          ├ analyses
  ├ Diagnosis            ├ evidence
  └ Insight Generation   ├ profiles/matches
      │                  └ programs/metrics
      ▼
[Gemini File Search Stores]
  ├ company-{analysisId}
  ├ support-programs
  └ industry-reports
```

### 10.1 추천 기술스택

| 영역 | 권장 |
| --- | --- |
| Design | Stitch |
| Development | Google Antigravity |
| Frontend | Next.js + TypeScript |
| UI | Tailwind CSS + component library |
| AI | Gemini API |
| RAG | Gemini File Search / File Search Store |
| Schema validation | Zod |
| App DB | Firebase/Firestore 또는 PostgreSQL/Supabase 중 팀 숙련도 우선 |
| File upload | Firebase Storage 또는 앱 서버 임시저장 후 File Search 업로드 |
| Deploy | Firebase App Hosting 또는 팀이 가장 빠른 환경 |

### 10.2 설계 원칙

- AI 호출 결과를 그대로 UI에 뿌리지 않고 Schema validation 후 저장
- 분석 version을 저장해 Prompt/루브릭 변경 시 결과를 비교 가능하게 구성
- File Search Store ID와 App DB 분석 ID를 연결하되 사용자에게 내부 ID는 노출하지 않음
- 긴 작업은 analysis status(pending/indexing/analyzing/completed/failed)로 비동기 처리 가능하게 설계
## 11. 데이터베이스 설계

### 11.1 핵심 엔터티

| Table | 주요 컬럼 | 용도 |
| --- | --- | --- |
| companies | id, name, industry, location, founded_year, employees, revenue | 기업 기준정보 |
| documents | id, company_id, filename, doc_type, storage_ref, file_search_store | 문서/검색 연결 |
| analyses | id, company_id, version, summary, primary_bottleneck, status | 분석 헤더 |
| maturity_scores | analysis_id, T, E, M, reasons | 성장단계 |
| evidence | analysis_id, category, excerpt, source, page, metadata | 판단 근거 |
| company_profiles | company_id, technologies, products, capabilities, needs, visibility | Discovery/Matching |
| company_matches | source_id, target_id, type, score, reasons, status | 기업 연결 후보/이력 |
| support_programs | id, org, title, criteria, tags, dates, status | 지원사업 구조화 |
| program_matches | analysis_id, program_id, score, reason, eligibility | 지원사업 추천 |
| policy_insights | scope, period, metrics_snapshot, ai_summary | 관리자 기획 인사이트 |

### 11.2 분석 버전 관리

```json
{
  "analysis_version": "TEM-v1.0",
  "prompt_version": "diagnosis-v1.0",
  "company_id": "VW001",
  "T": 3, "E": 3, "M": 1,
  "primary_bottleneck": "PMF",
  "generated_at": "2026-10-02"
}
```

### 11.3 집계 데이터는 정형 DB에서 계산

- T/E/M 및 병목 분포는 SQL/Firestore query로 정확히 집계한다.
- AI가 대시보드 숫자를 “추정”하지 않도록 하며, AI는 집계된 수치를 해석하고 설명하는 역할을 맡는다.
- 기업별 민감 정보와 공개 Profile을 논리적으로 분리한다.
## 12. API 및 분석 파이프라인

### 12.1 API 초안

| Method | Endpoint | 역할 |
| --- | --- | --- |
| POST | /api/documents | PDF 업로드 및 document 생성 |
| POST | /api/analyses | File Search index + 기업 분석 시작 |
| GET | /api/analyses/:id | 분석 상태/결과 조회 |
| GET | /api/analyses/:id/evidence | 근거 목록 조회 |
| GET | /api/analyses/:id/programs | 지원사업 매칭 결과 |
| GET | /api/companies | 기업 검색/필터 |
| GET | /api/companies/:id | 기업 Profile/이력 |
| GET | /api/companies/:id/matches | 기업 매칭 후보 |
| GET | /api/admin/dashboard | 관리자 KPI/분포 |
| POST | /api/admin/policy-insight | 선택한 기업군 기반 사업기획 초안 |

### 12.2 분석 작업 상태

```text
uploaded → indexing → extracting → diagnosing → matching → completed
                                         ↘ failed(retryable / non-retryable)
```

### 12.3 분석 순서

1. 문서 업로드 및 File Search Store 인덱싱 완료 대기
1. 사업계획서에서 구조화 필드 추출
1. T/E/M을 각 축별로 독립 판단하고 evidence를 연결
1. 병목 primary/secondary 결정
1. 기업 희망지원과 실제 우선지원 차이를 생성
1. 지원사업 Hard Filter → 적합도 계산 → RAG로 추천 이유 작성
1. 기업 Profile/needs/capabilities 생성
1. App DB 저장 및 UI 반환
## 13. UI / 화면 명세

### 13.1 화면 IA

| Route | 화면 | 우선순위 |
| --- | --- | --- |
| / | 서비스 소개 / 업로드 진입 | P0 |
| /upload | 사업계획서 PDF 업로드 | P0 |
| /analysis/:id | 기업 성장진단 Dashboard | P0 |
| /companies | 기업 Discovery | P1 |
| /companies/:id | 기업 Profile | P1 |
| /companies/:id/matches | 기업 Matching | P1 |
| /admin | 관리자 Overview | P1 |
| /admin/needs | 기업 니즈/병목 분석 | P1 |
| /admin/policy-planner | 신규사업 기획 지원 | P2 |

### 13.2 분석 결과 화면 구성

| 영역 | 핵심 UI |
| --- | --- |
| Hero | 기업명, 산업, 위치, 한 줄 AI insight, 분석일 |
| T/E/M | 세 축을 카드/게이지로 표시 + 각 단계 이유 |
| 핵심 병목 | Primary bottleneck 강조 + Secondary 보조 |
| 기업 주장 vs AI 진단 | 희망지원과 실제 우선지원 비교 |
| 판단 근거 | 문서 페이지, 원문 excerpt, AI 해석, “원문 보기” |
| 실행전략 | 90일 권장 액션 3~5개 |
| 지원사업 | 자격 통과 여부, 적합도, 추천 이유 |
| 산업 인사이트 | 외부 보고서 RAG 결과 + 출처 |
| 추가 확인 | 문서에서 부족한 정보/담당자 확인 질문 |

### 13.3 관리자 화면 구성

- 상단 KPI: 분석기업, T/E/M 분포, Top 병목, Top 니즈
- 차트: 산업별 병목, 성장단계 Funnel, 지역/기간 필터
- 기업 리스트: 필터 결과와 기업 상세 바로가기
- 니즈 Radar: 실증/첫 고객/인증/투자/판로/글로벌 니즈 집계
- AI Insight: 선택한 데이터 범위에 대해서만 설명 생성
- 신규사업 기획: 내부 집계 + 외부 RAG 근거를 조합한 초안
### 13.4 Stitch 생성 프롬프트

```text
경기도경제과학진흥원의 AI 기업지원 Intelligence 플랫폼을 디자인해줘.
핵심 사용자는 사업담당자와 관리자이며, 기업 사업계획서 PDF를 업로드하면 T/E/M 성장단계, 핵심 병목, 기업 희망지원 vs 실제 우선지원, 판단 근거, 맞춤 지원사업을 보여준다.
추가로 기업 Discovery/Matching 화면과 관리자 Portfolio Dashboard를 제공한다.
디자인은 신뢰감 있는 공공기관 + 현대적 B2B SaaS 스타일, 네이비/블루 중심, 데이터 카드와 표의 가독성을 최우선으로 한다.
'근거 보기'가 눈에 잘 띄고, 관리자 Dashboard에는 병목/니즈/산업별 필터와 신규사업 기획 진입 버튼이 있어야 한다.
```

## 14. AI 출력 Schema · Prompt 정책

### 14.1 핵심 Structured Output 예시

```json
{
  "company": {"name":"", "industry":"", "location":""},
  "maturity": {
    "technology": {"level":"T1|T2|T3|T4", "reason":""},
    "validation": {"level":"E1|E2|E3|E4", "reason":""},
    "market": {"level":"M1|M2|M3|M4", "reason":""}
  },
  "bottleneck": {
    "primary":"TECH|VALIDATION|PMF|STANDARDIZE|REGULATION|SALES|GLOBAL|DIVERSIFY|INVESTMENT",
    "secondary":"", "reason":""
  },
  "company_requested_support": [],
  "recommended_support": [],
  "strengths": [], "weaknesses": [],
  "evidence": [{"category":"", "source":"", "page":0, "excerpt":"", "interpretation":""}],
  "needs": [], "capabilities": [],
  "action_plan_90d": [],
  "verification_needed": [],
  "insight":""
}
```

### 14.2 System Prompt 핵심 규칙

> **분석 원칙**
> 기업의 자기평가나 희망지원 내용을 정답으로 취급하지 않는다. 문서에 있는 객관적 사실과 외부 근거를 바탕으로 현재 선행조건과 가장 큰 병목을 판단한다. 모든 핵심 판단에는 evidence를 붙이고, 증거가 부족하면 “확인 필요”로 남긴다.

- T/E/M은 서로 독립적으로 판단한다.
- 병목은 사전에 정의한 enum에서 선택하고 자유로운 새 분류를 만들지 않는다.
- 기업의 희망지원과 AI 권장지원이 다르면 그 차이를 명시한다.
- 문서에 없는 매출, 고객, 인증, 규제상태는 추정하지 않는다.
- 외부 산업자료의 일반론을 개별 기업의 사실처럼 섞지 않는다.
- 분석 결과는 지원 의사결정을 “보조”하며 최종 선정/심사를 자동화하지 않는다.
### 14.3 RAG 질의 템플릿

```text
[기업문서 근거 검색]
이 기업의 기술성숙도, 실환경 검증, 유상 고객/계약, 가격정책, 영업체계와 관련된 근거를 찾아라.
각 근거가 T/E/M 및 병목 판단에 어떤 의미가 있는지 구분하라.

[산업 보고서 검색]
{industry} 기업의 {bottleneck}과 관련된 최근 산업/정책 동향을 찾고, 이 기업에 적용 가능한 시사점만 요약하라.
출처 기관, 보고서명, 연도를 유지하라.
```

## 15. 검증 · 품질 · 보안

### 15.1 테스트셋 검증

| 지표 | MVP 검증 방법 | 권장 성공 Gate |
| --- | --- | --- |
| T 정확도 | 12개 기대정답과 exact match 비교 | 각 축 9/12 이상을 1차 목표로 두고 오류사례 리뷰 |
| E 정확도 | 12개 기대정답과 exact match 비교 | 동일 |
| M 정확도 | 12개 기대정답과 exact match 비교 | 동일 |
| 병목 정확도 | Primary bottleneck exact match | 9/12 이상 목표 |
| 근거 적합성 | 근거가 실제 문서에 존재하고 판단을 지지하는지 수동 샘플링 | 핵심 판단당 2개 이상 유효 근거 |
| 지원사업 적격성 | Hard Filter 조건 위반 여부 | 부적격 사업 추천 0건 목표 |

### 15.2 Hallucination 방어

- Structured Output의 필수값/enum을 서버에서 검증한다.
- 근거가 없는 핵심 판단은 저장 시 validation warning을 발생시킨다.
- 지원사업은 RAG 유사도보다 자격조건 필터가 선행한다.
- 기업 정보와 외부 보고서 정보에 source_type을 저장해 UI에서도 구분한다.
- 불확실한 내용은 verification_needed에 넣고 사실처럼 단정하지 않는다.
### 15.3 기업정보 보호

| 위험 | 대응 |
| --- | --- |
| 기업 간 문서 혼입 | MVP는 company-{analysisId} Store로 격리 |
| 민감정보 공개 | Public Profile과 Internal Analysis 필드를 분리하고 공개 동의 절차 적용 |
| 권한 없는 관리자 접근 | 관리자 role/사업 범위 기반 접근제어 고려 |
| 원문 장기 보관 | 보관기간/삭제정책을 기관 정책에 맞춰 정의 |
| AI 결과 과신 | “AI 진단 / 담당자 검토 필요” 표시 및 근거 보기 제공 |

## 16. 개발 순서 및 MVP 우선순위

### 16.1 개발 순서

| 순서 | 작업 | 완료조건 |
| --- | --- | --- |
| 01 | 분석 기준 확정 | T/E/M, 병목 enum, Ground Truth를 코드와 문서에 고정 |
| 02 | Schema/Prompt | Structured Output + Zod schema 작성 |
| 03 | Gemini File Search 연결 | File Search Store 생성/업로드/indexing/query 동작 확인 |
| 04 | 비전웍스AI 단일 분석 | T3/E3/M1 + PMF가 재현되는지 확인 |
| 05 | 로보플로우 반례 분석 | T2/E1/M1 + TECH가 나오는지 확인 |
| 06 | 결과 Dashboard | Stitch 기반 UI + evidence 카드 연결 |
| 07 | 지원사업 Store/DB | 소수 10~30개 사업으로 Hard Filter/추천 구현 |
| 08 | 분석 결과 App DB | 기업/분석/근거/추천 이력 저장 |
| 09 | 기업 Profile/검색 | needs/capabilities 생성 및 Discovery 구현 |
| 10 | Matching | 상위 후보 + 추천 이유 |
| 11 | Admin Dashboard | 12개 테스트 데이터를 기반으로 KPI/병목/니즈 구현 |
| 12 | 외부 리포트 RAG | 실제 기관 리포트를 industry-reports Store에 색인 |
| 13 | 신규사업 기획 | 내부 집계 + 외부 RAG 기반 초안 |
| 14 | 12개 회귀 테스트 | Prompt 변경 때마다 정답지 기준 regression |
| 15 | Demo 최적화 | 분석 속도, 에러 처리, 화면 전환, 발표 데이터 고정 |

### 16.2 시간 부족 시 자르는 순서

| 유지 | 후순위로 미룸 |
| --- | --- |
| PDF → T/E/M → 병목 → 근거 → 저장 | 실시간 외부 웹검색 |
| 지원사업 10~30개 실제 데이터 | 전 지원사업 자동 수집 |
| 기업 Profile + 간단한 Matching | 복잡한 그래프 추천 알고리즘 |
| 관리자 병목/니즈 Dashboard | 고급 예측/Forecast |
| 신규사업 기획은 1개 템플릿 | 다양한 보고서 자동생성 |

## 17. 시연 시나리오와 심사 대응

### 17.1 4~5분 Demo 시나리오

| 구간 | 시연 | 메시지 |
| --- | --- | --- |
| 0:00–0:30 | 문제 제시 | 사업계획서는 한 번 평가 후 데이터로 재사용되지 않는다. |
| 0:30–1:30 | 비전웍스AI 업로드/결과 | 기업은 R&D를 원하지만 실제 병목은 시장검증임을 근거로 보여준다. |
| 1:30–2:10 | 로보플로우 결과 전환 | 같은 방식으로도 기업별 병목이 다르게 나오는 것을 보여준다. |
| 2:10–2:50 | 지원사업/기업 매칭 | 병목을 해결하는 사업과 협력기업을 연결한다. |
| 2:50–3:40 | 관리자 Dashboard | 12개 기업 결과가 모여 병목/니즈 데이터가 되는 것을 보여준다. |
| 3:40–4:30 | 신규사업 기획 | 내부 니즈 + 외부 리포트 근거로 사업기획 초안을 생성한다. |
| 4:30–5:00 | 결론 | 하나의 사업계획서를 기업지원·기업연결·정책기획에 반복 활용한다. |

### 17.2 심사 질문에 대한 한 문장 답변

| 질문 | 답변 |
| --- | --- |
| 왜 GBSA가 필요한가? | 기업별 지원 결과가 누적되어 다음 사업과 정책기획에 직접 재사용되기 때문이다. |
| 그냥 챗봇 아닌가? | 아니다. 문서를 구조화 DB로 만들고 T/E/M·병목·매칭·통계를 실제 업무 흐름에 연결한다. |
| RAG 신뢰성은? | Gemini File Search citation/metadata로 판단 근거를 원문까지 추적한다. |
| AI가 틀리면? | Ground Truth 회귀 테스트, 근거 검증, enum/schema validation, 담당자 최종 검토를 둔다. |
| 확장성은? | 지원사업이 달라도 동일 기업 Profile과 진단 이력을 재사용할 수 있다. |

## 18. 확장 로드맵

| 단계 | 범위 | 목표 |
| --- | --- | --- |
| Hackathon MVP | 12개 테스트 기업, 지원사업 소수, 관리자 대시보드 | 업무혁신 가치와 기술 흐름 입증 |
| Pilot | 특정 사업 1~2개 실제 신청기업 | 담당자 검토시간/진단 일치도 측정 |
| Operational | 다수 지원사업, 기업 이력 통합 | 기업 360° Profile 및 부서 간 재사용 |
| Intelligence | 산업별 기업군 분석, 정책 RAG | 신규사업/지원정책 의사결정 지원 |
| Ecosystem | 기업·대학·투자자·수요처 연결 | 경기도 기업 협력 네트워크 플랫폼 |

### 18.1 성과 측정 후보

- 사업계획서 1건당 초기 검토시간 변화
- AI 진단과 담당자 최종 판단의 일치율
- 지원사업 부적격 추천률 / 적격 추천률
- 기업 Profile 재사용 건수와 기업 매칭 건수
- 관리자 Dashboard 사용 및 신규사업 기획 참고 건수
> **최종 제품 비전**
> G-BRIDGE AI의 장기 가치는 “AI가 PDF를 잘 읽는 것”이 아니라, GBSA가 접점에서 얻는 기업 정보를 표준화하고 누적해 기업지원의 다음 행동을 더 빠르고 일관되게 결정할 수 있게 만드는 데 있다.

## A. 부록: 테스트셋 · 용어 · 참고자료

### A.1 제공된 테스트 자료의 역할

| 자료 | 역할 |
| --- | --- |
| 00_12개기업_기대분석결과.md | 12개 기업의 T/E/M, 병목, 우선지원 Ground Truth. 회귀 테스트와 관리자 Dashboard 샘플 데이터로 사용 |
| 01_제조AI_비전웍스AI_사업계획서.pdf | 기업 희망지원(R&D)과 실제 병목(시장검증)이 다른 핵심 Demo 사례 |
| 04_로봇_로보플로우_사업계획서.pdf | 기업 희망지원(판로)과 실제 병목(기술 안정성)이 다른 반례 Demo 사례 |
| 심사기준 이미지 | 평가항목 35/25/20/10/10에 기능과 발표전략을 정렬하는 기준 |

※ 제공된 두 사업계획서는 AI 해커톤 시연을 위해 작성된 가상 기업 자료이며, 기업명·수치·사례는 실제와 무관한 테스트 문서입니다.

### A.2 주요 용어

| 용어 | 정의 |
| --- | --- |
| T/E/M | Technology / Evidence & Validation / Market 성장단계 진단 축 |
| Bottleneck | 현재 성장의 다음 단계로 가기 위해 먼저 해결해야 하는 핵심 제약 |
| Capability | 기업이 다른 기업/수요처에 제공할 수 있는 기술·제품·역량 |
| Need | 기업이 현재 필요로 하는 실증처·고객·인증·투자·파트너 등의 수요 |
| File Search Store | Gemini File Search에서 문서를 chunk/embedding/index하여 검색하는 저장소 |
| Ground Truth | AI 출력 품질을 비교하기 위해 사전에 정의한 기대 정답 |

### A.3 Gemini 기술 참고

Google AI for Developers — File Search: Gemini API File Search 공식 문서

Google AI for Developers — Structured outputs: Gemini API Structured Output 공식 문서

기술 메모: File Search는 문서를 가져와 자동으로 chunk·embedding·index하고 검색 컨텍스트로 활용할 수 있으며, custom metadata와 metadata filter를 지원한다. Structured Output은 JSON Schema 기반 출력을 지원하되, 의미적 정확성은 애플리케이션에서 별도 검증해야 한다.

### A.4 개발 시작 체크리스트

☐  T/E/M 기준과 병목 enum을 팀원 모두 동일하게 사용한다.

☐  12개 Ground Truth를 JSON fixture로 만든다.

☐  Gemini API Key 및 File Search Store 생성 테스트를 완료한다.

☐  비전웍스AI와 로보플로우가 기대진단을 재현하는지 먼저 확인한다.

☐  지원사업 10~30개를 실제 문서 + 구조화 조건으로 준비한다.

☐  경과원·과기부·산업부·KIET·KISTEP·KOTRA 등 실제 산업보고서를 industry-reports Store에 넣는다.

☐  Stitch에서 4개 핵심 화면(업로드/분석/기업검색/관리자)을 우선 생성한다.

☐  시연 데이터는 분석 실패에 대비해 저장된 결과 fallback을 준비한다.

☐  발표에서는 “AI 정확도”보다 “GBSA 업무 흐름 변화”를 먼저 보여준다.

> **문서 종료**
> 본 문서는 해커톤 MVP 구현을 위한 v1.0 기준서입니다. 분석 Rubric, Prompt, Schema는 12개 테스트셋 회귀결과에 따라 버전업하며, 제품 방향은 “기업지원 + 기업연결 + 기관 Intelligence” 세 축을 유지합니다.
