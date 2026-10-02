# G-BRIDGE AI 개발 룰북 (Antigravity Codex & Guidelines)

## 1. 프로젝트 원칙
- **GBSA 업무 혁신 중심**: 단순 요약이 아닌, 비정형 PDF를 구조화된 기업 자산 데이터로 만들어 '진단 → 사업연계 → B2B매칭 → 신규사업기획' 4단계로 확장.
- **AI 근거 필수 제시(Evidence-Based AI)**: 모든 T/E/M 판정, 병목 분석, 매칭 추천에는 반드시 사업계획서 내 발췌 문장(Source Quote)과 산출 근거를 포함.
- **시각적 완성도 & 프리미엄 UI**:
  - 다크/라이트 모드 지원, Glassmorphism, 부드러운 트랜지션, 반응형 레이아웃.
  - GBSA 시그니처 블루/네이비 및 바이올렛 악센트 팔레트 적용.
  - T/E/M 5각/6각 레이더 차트, 병목 단계별 인터랙티브 카드, 매칭 점수 프로그레스 게이지.

## 2. 모듈 구성
- `src/types/`: `company.ts`, `program.ts`, `diagnosis.ts`, `admin.ts` 등 엄격한 타입 정의.
- `src/services/`:
  - `geminiService.ts`: Google Gen AI API를 통한 구조화 JSON 추출 및 RAG 질의.
  - `mockDataService.ts`: 해커톤 시연용 실제 경기도 스타트업 5종 (판교 AI/로봇, 광교 바이오, 안산 스마트제조 등) 샘플 데이터셋.
  - `matchingEngine.ts`: 기업 T/E/M & 병목 기반 지원사업 적합도 및 기업 간 시너지 스코어링 알고리즘.
  - `adminAnalyticsService.ts`: 기업 데이터 통계 분석 및 신규 사업기획 AI 생성기.
- `src/components/`:
  - `Header.tsx`: 브랜딩, 탭 전환, 실시간 데모 프리셋 로더, API Key 모달.
  - `DiagnosisView.tsx`: 사업계획서 PDF 업로드/분석기, T/E/M 레이더 진단, 핵심 병목 & 90일 실행안, 근거 뷰어.
  - `ProgramMatchingView.tsx`: 경기도/GBSA 지원사업 매칭 리스트, 적합도 점수, 사유서 자동 생성.
  - `CompanyMatchingView.tsx`: 기업 Discovery, 기술/니즈 기반 B2B 협력 매칭, 밸류체인 시너지 시뮬레이터.
  - `AdminDashboardView.tsx`: 경기도 기업 생태계 통계, 병목 히트맵, AI 신규 지원사업 기획서 생성 워크스페이스.

## 3. 안정성 & 오프라인 지원
- Gemini API Key가 제공되면 실제 Gemini 1.5/2.0 API와 연동되고, 미입력 시에도 사전 구축된 고품질 GBSA 실전 데이터셋으로 100% 정상 작동하는 듀얼 모드 지원.
