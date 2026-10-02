# G-BRIDGE AI 공동 개발 기록

> Codex와 Gemini가 같은 저장소에서 번갈아 개발할 때 작업 배경, 변경 범위,
> 검증 결과와 다음 할 일을 잃지 않기 위한 단일 인수인계 문서입니다.

## 1. 작성 원칙

모든 개발 세션은 작업 시작 전 이 문서를 읽고, 종료 전에 아래 내용을 갱신합니다.

1. `진행 중 작업`에 담당자와 수정 예정 파일을 먼저 기록합니다.
2. 기존 작업자의 미커밋 파일을 덮어쓰거나 되돌리지 않습니다.
3. 완료 후 `변경 이력`에 구현 내용과 검증 결과를 남깁니다.
4. 미완료 사항과 알려진 문제는 숨기지 않고 `다음 작업`에 기록합니다.
5. API 키, 토큰, 개인정보는 이 문서나 소스 코드에 기록하지 않습니다.
6. 작업을 마치면 `npm run build` 또는 `pnpm run build` 결과를 기록합니다.

## 2. 프로젝트 목표

G-BRIDGE AI는 사업계획서를 단순 요약하는 서비스가 아니라 다음 의사결정을
지원하는 기업 성장 컨설팅 플랫폼을 목표로 합니다.

- 사업계획서 기반 T/E/M 성장단계 및 핵심 병목 진단
- 시장환경, 기술 경쟁력, 사업모델과 미래전략에 대한 정성 분석
- 기업이 원하는 지원과 실제 선행 지원 사이의 차이 분석
- 지원사업 및 B2B 협력기업 매칭
- 신규 지원사업 기획서의 정책 논리, 예산, KPI와 실행 가능성 검토
- 누적 기업 데이터를 활용한 GBSA 정책 기획 지원

## 3. 기술 및 배포 구조

| 영역 | 구성 |
|---|---|
| 프론트엔드 | React 18, TypeScript, Vite, Tailwind CSS |
| AI | Google Gemini `@google/genai` |
| AI 호출 위치 | Vercel Function `/api/gemini` |
| 데이터 | 현재 목업 데이터, 향후 Supabase 연동 |
| 배포 | Vercel, 빌드 명령 `pnpm run build`, 출력 `dist` |
| 저장소 | `https://github.com/uselessidiot/gbsa_hack` |

Gemini API 키는 클라이언트의 `VITE_` 환경변수에 넣지 않습니다. Vercel 서버
환경변수 `GEMINI_API_KEY`로만 설정합니다.

## 4. 현재 구현 상태

### 기업 성장진단

- PDF 사업계획서 업로드
- T/E/M 단계와 점수 산출
- 핵심 및 보조 병목 분류
- 희망 지원과 AI 권고 지원의 차이 분석
- 사업계획서 원문 근거 카드
- 90일 실행계획
- 경영진 핵심 진단
- 시장 상황과 기회 분석
- 기술 경쟁력 및 사업모델 분석
- NOW/NEXT/LATER 미래전략
- 핵심 리스크 및 컨설팅 확인 질문
- Gemini 장애 또는 키 미설정 시 검증된 샘플 분석으로 전환

### 신규 사업기획서 분석

- 관리자 화면에서 PDF 업로드
- 정책 필요성, 지원대상 적합성, 사업설계, 차별성 평가
- 예산 검토, KPI 적정성 평가
- 실행 로드맵과 위험요인 분석
- READY/REVISE/RETHINK 판정 및 100점 종합점수
- 제출 전 우선 보완사항 제시

### Vercel

- `/api/gemini.ts` 서버 함수 구현
- 서버 전용 `GEMINI_API_KEY` 사용
- PDF는 현재 JSON Base64 요청 크기를 고려해 4MB 이하로 제한
- TypeScript 및 Vite 프로덕션 빌드 성공

## 5. 진행 중 작업

| 날짜 | 담당 | 작업 | 대상 파일 | 상태 |
|---|---|---|---|---|
| 2026-10-02 | Codex | 기업 정성 컨설팅 및 신규 사업기획서 분석 | `api/gemini.ts`, `src/services/gemini.ts`, `src/views/ResultView.tsx`, `src/views/AdminIntelligenceView.tsx` | 구현 완료, 실제 API 검증 필요 |
| 2026-10-02 | 공동 | GitHub 공개 범위 확인 후 커밋·푸시 | `mock/`, `docs/`, `web design/` 포함 여부 | 사용자 확인 대기 |

새 작업을 시작할 때 아래 형식으로 행을 추가합니다.

```text
| YYYY-MM-DD | Codex/Gemini/이름 | 작업 요약 | 수정할 파일 | 진행 중 |
```

## 6. 변경 이력

### 2026-10-02 · Codex

#### 구현

- 기업분석 결과에 `ConsultingInsights` 스키마 추가
- 경영진 진단, 시장, 기술, 사업모델, 미래전략, 리스크 UI 추가
- 신규 사업기획서 심사용 `PolicyPlanReview` 스키마와 화면 추가
- Gemini 호출을 브라우저에서 Vercel 서버 함수로 이전
- 실제 Gemini 호출 실패 시 데모 분석으로 전환하는 fallback 구현
- `.env.example` 및 Vercel 환경변수 안내 추가
- 샘플 기업에서도 컨설팅형 분석 결과가 표시되도록 보완

#### 검증

```text
pnpm run build
✓ TypeScript 검사 성공
✓ Vite production build 성공
✓ 42 modules transformed
```

#### 미검증

- 실제 `GEMINI_API_KEY`를 사용한 PDF 분석 응답
- Vercel Preview 환경의 함수 요청 크기와 타임아웃
- 실제 신규 사업기획서에 대한 평가 품질
- 모바일 화면과 인쇄/PDF 레이아웃

## 7. 다음 작업

우선순위 순서입니다.

1. Vercel Preview에 `GEMINI_API_KEY`를 설정하고 실제 PDF 3종 분석
2. Gemini 출력에 누락 필드가 있어도 화면이 깨지지 않도록 런타임 검증 추가
3. 문서 근거의 페이지 번호와 인용문 정확도 확인
4. 시장 데이터에 최신검색 또는 공공 보고서 RAG 연결
5. 4MB 초과 문서를 위한 Files API 또는 Blob 업로드 흐름 도입
6. 신규 사업기획서 분석 결과의 저장·재조회 기능 구현
7. 정책기획서 PDF 내보내기 구현
8. 모바일, 태블릿, 인쇄 화면 QA

## 8. 역할 분담 권장안

동시에 같은 파일을 수정하지 않도록 기능 단위로 나눕니다.

### Codex 권장 담당

- TypeScript 타입과 데이터 계약
- Vercel Function 및 보안 구조
- 빌드 오류, 런타임 예외, fallback 처리
- Git 상태, 테스트, 배포 검증
- 여러 화면을 연결하는 상태 관리

### Gemini 권장 담당

- Gemini 프롬프트 실험과 응답 품질 개선
- 기업 컨설팅 문장과 정책평가 기준 개선
- 시장·기술·정책 분석 항목 확장
- 샘플 사업계획서별 기대 결과 비교
- UI 문구와 보고서 표현 개선

역할은 고정 규칙이 아니며, 같은 파일을 수정해야 한다면 먼저 `진행 중 작업`에
담당자와 범위를 기록합니다.

## 9. Gemini/Codex 인수인계 템플릿

각 세션 종료 시 아래 블록을 복사해 작성합니다.

```markdown
### YYYY-MM-DD HH:mm · 담당자

- 목표:
- 완료:
- 수정 파일:
- 주요 결정:
- 검증 명령 및 결과:
- 미완료/주의사항:
- 다음 담당자가 할 일:
```

## 10. 실행 및 검증

```powershell
cd C:\Users\LENOVO\Desktop\dongi
pnpm install
pnpm run dev
pnpm run build
```

Vercel 환경변수:

```text
GEMINI_API_KEY=<server-only key>
GEMINI_MODEL=gemini-2.5-flash
```

실제 비밀값이 들어 있는 `.env`, `.env.local` 파일은 Git에 올리지 않습니다.

## 11. 커밋 규칙

권장 커밋 메시지:

```text
feat: 새로운 기능
fix: 오류 수정
refactor: 동작 변화 없는 구조 개선
docs: 문서 변경
test: 테스트 추가 또는 수정
chore: 설정, 의존성, 빌드 작업
```

하나의 커밋에는 하나의 명확한 목적을 담고, 다른 작업자가 만든 변경을 임의로
정리하거나 되돌리지 않습니다.
