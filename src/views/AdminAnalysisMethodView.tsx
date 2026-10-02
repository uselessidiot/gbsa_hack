import React, { useState } from 'react';

type MethodKey = 'api' | 'baseline' | 'rag';

const methods: Array<{
  key: MethodKey;
  title: string;
  description: string;
  icon: string;
  status: string;
  detail: string;
  color: string;
}> = [
  {
    key: 'api',
    title: 'Gemini API 정밀 분석',
    description: '업로드된 사업계획서의 기업·기술·시장 정보를 구조화하고 성장 진단을 생성합니다.',
    icon: 'bolt',
    status: '운영 중',
    detail: '문서 파싱 → 기업 정보 추출 → T·E·M 진단 → 지원·매칭 추천',
    color: 'blue',
  },
  {
    key: 'rag',
    title: '공공 RAG 근거 보강',
    description: '공공 지원사업 문서와 산업 리포트를 검색해 분석 결과의 근거와 추천 적합도를 보강합니다.',
    icon: 'library_books',
    status: '운영 중',
    detail: '공공 문서 검색 → 관련 근거 추출 → 추천 사업·인용 카드 연결',
    color: 'emerald',
  },
  {
    key: 'baseline',
    title: '기본 분석 fallback',
    description: 'API 응답 지연이나 형식 오류가 발생할 때도 발표 흐름이 중단되지 않도록 기본 규칙으로 결과를 생성합니다.',
    icon: 'rule',
    status: '대기 중',
    detail: '산업·키워드·병목 규칙 → 표준 진단 → 관련 지원사업 목록',
    color: 'amber',
  },
];

export const AdminAnalysisMethodView: React.FC = () => {
  const [selected, setSelected] = useState<MethodKey>('api');
  const [apiEnabled, setApiEnabled] = useState(true);
  const active = methods.find((method) => method.key === selected) || methods[0];

  return (
    <div className="max-w-[1500px] mx-auto space-y-6 animate-fadeIn">
      <header className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">ANALYSIS ORCHESTRATION</span>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-900">분석 방법 관리</h1>
            <p className="mt-1 text-sm text-slate-500">API 분석, 공공 근거 보강, 기본 분석의 적용 순서와 운영 상태를 관리합니다.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 현재 분석 파이프라인 정상
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {methods.map((method, index) => (
          <button
            key={method.key}
            type="button"
            onClick={() => setSelected(method.key)}
            className={`text-left rounded-2xl border p-5 transition shadow-sm ${selected === method.key ? 'border-blue-500 bg-blue-50/60 shadow-md' : 'border-slate-200 bg-white hover:border-blue-300'}`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method.color === 'blue' ? 'bg-blue-100 text-blue-700' : method.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                <span className="material-symbols-outlined">{method.icon}</span>
              </div>
              <span className="text-[10px] font-black text-slate-400">0{index + 1}</span>
            </div>
            <h2 className="mt-4 text-base font-extrabold text-slate-900">{method.title}</h2>
            <p className="mt-2 text-xs leading-5 text-slate-500">{method.description}</p>
            <span className={`inline-block mt-4 px-2 py-1 rounded-full text-[10px] font-extrabold ${method.status === '운영 중' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{method.status}</span>
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-bold text-blue-600">API TRANSPARENCY</span>
              <h2 className="mt-1 text-lg font-extrabold text-slate-900">프롬프트·JSON 구조</h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">{active.title}</span>
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-4">
            <span className="text-xs font-extrabold text-slate-700">분석 처리 순서</span>
            <p className="mt-2 text-sm leading-6 text-slate-600">{active.detail}</p>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><div className="flex items-center justify-between mb-1"><span className="text-[11px] font-extrabold text-slate-700">요청 프롬프트</span><span className="text-[10px] text-blue-600 font-bold">POST /api/gemini</span></div><pre className="h-44 overflow-auto rounded-xl bg-slate-950 p-3 text-[10px] leading-5 text-slate-200 whitespace-pre-wrap">{'// 역할: GBSA 기업전략 컨설턴트\n// 입력: 사업계획서 PDF\n// 생성: 기업정보·T/E/M·병목·추천사업·근거·로드맵\n// 규칙: 유효한 JSON만 반환\n// 불명확한 내용은 "확인 필요"'}</pre></div>
            <div><div className="flex items-center justify-between mb-1"><span className="text-[11px] font-extrabold text-slate-700">응답 JSON 구조</span><span className="text-[10px] text-emerald-600 font-bold">application/json</span></div><pre className="h-44 overflow-auto rounded-xl bg-slate-950 p-3 text-[10px] leading-5 text-emerald-200 whitespace-pre-wrap">{'{\n  "company": { "keywords": [] },\n  "temDiagnosis": {},\n  "primaryBottleneck": "PMF",\n  "evidenceList": [],\n  "actionPlan90Days": [],\n  "consultingInsights": {},\n  "profile": {}\n}'}</pre></div>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ['평균 처리시간', '18.4초'], ['성공률', '96.8%'], ['최근 실행', '2분 전'], ['활성 문서', '7종'],
            ].map(([label, value]) => <div key={label} className="rounded-xl border border-slate-200 p-3"><span className="text-[10px] text-slate-400 block">{label}</span><strong className="mt-1 block text-sm text-slate-800">{value}</strong></div>)}
          </div>
        </div>

        <aside className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-extrabold text-slate-900">운영 설정</h2>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 p-3">
            <div><span className="text-xs font-bold text-slate-700 block">Gemini API 분석</span><span className="text-[10px] text-slate-400">실제 업로드 분석에 우선 적용</span></div>
            <button type="button" onClick={() => setApiEnabled(!apiEnabled)} className={`w-11 h-6 rounded-full p-0.5 ${apiEnabled ? 'bg-blue-600' : 'bg-slate-300'}`}><span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${apiEnabled ? 'translate-x-5' : ''}`} /></button>
          </div>
          <div className="mt-3 rounded-xl border border-slate-200 p-3 text-xs text-slate-600 leading-5"><strong className="text-slate-800">실패 시 처리:</strong> API 오류 → 기본 분석 → 결과 화면 유지</div>
          <button type="button" className="w-full mt-4 rounded-xl bg-blue-600 text-white py-2.5 text-xs font-bold">설정 변경 이력 보기</button>
        </aside>
      </section>

      <section className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-bold text-blue-600">REPORT DESIGN RULES</span>
            <h2 className="mt-1 text-lg font-extrabold text-slate-900">진단 보고서 구성 관리</h2>
          </div>
          <span className="text-xs text-slate-400">분석 결과에 공통 적용되는 기준</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2"><span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center"><span className="material-symbols-outlined text-base">insights</span></span><h3 className="text-sm font-extrabold text-slate-900">T·E·M 성장진단</h3></div>
            <p className="mt-3 text-xs leading-5 text-slate-500">기술 성숙도(T), 실행 역량(E), 시장 검증(M)을 각각 평가하고 평균 점수와 주요 근거를 함께 표시합니다.</p>
            <div className="mt-3 flex flex-wrap gap-1.5"><span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">기술 수준</span><span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">실행 역량</span><span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">시장 검증</span></div>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2"><span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center"><span className="material-symbols-outlined text-base">route</span></span><h3 className="text-sm font-extrabold text-slate-900">90일 실행 로드맵</h3></div>
            <p className="mt-3 text-xs leading-5 text-slate-500">핵심 병목을 기준으로 단기·중기·장기 실행과제와 목표 KPI, 연계 지원사업을 단계별로 구성합니다.</p>
            <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-emerald-700"><span>진단</span><span>→</span><span>실증</span><span>→</span><span>상용화</span></div>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2"><span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center"><span className="material-symbols-outlined text-base">fact_check</span></span><h3 className="text-sm font-extrabold text-slate-900">근거·자료 구성</h3></div>
            <p className="mt-3 text-xs leading-5 text-slate-500">사업계획서 원문, 공공 자료, 산업 리포트의 근거를 분리해 인용 카드와 추천 사유에 연결합니다.</p>
            <div className="mt-3 flex flex-wrap gap-1.5"><span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">사업계획서</span><span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">공공 자료</span><span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">산업 동향</span></div>
          </div>
        </div>
      </section>

      <section className="hidden rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-bold text-blue-600">API TRANSPARENCY</span>
            <h2 className="mt-1 text-lg font-extrabold text-slate-900">API 요청 프롬프트·응답 구조</h2>
          </div>
          <span className="text-xs text-slate-400">민감한 키와 원문 파일은 표시하지 않습니다.</span>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
          <div>
            <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-extrabold text-slate-800">분석 프롬프트 미리보기</h3><span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">POST /api/gemini</span></div>
            <pre className="h-80 overflow-auto rounded-xl bg-slate-950 p-4 text-[11px] leading-5 text-slate-200 whitespace-pre-wrap">{`당신은 GBSA 수석 기업전략 컨설턴트다.
첨부 사업계획서를 실사하듯 분석하라.

1. company: 기업 기본정보와 keywords[] 추출
2. temDiagnosis: T·E·M 성장단계와 점수 산출
3. primaryBottleneck / secondaryBottleneck 선정
4. 지원사업 추천·요청사항·강점·약점 작성
5. evidenceList 최소 4개와 90일 actionPlan 3개 작성
6. consultingInsights에 시장·기술·사업모델 진단 포함
7. futureStrategy는 NOW / NEXT / LATER 3단계 구성
8. profile에 기술·제품·고객·역량·니즈·파트너 작성

반드시 유효한 JSON 객체만 반환하세요.
문서에 없는 사실·수치·출처는 만들지 마세요.
불명확한 내용은 '확인 필요'로 표시하세요.`}</pre>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-extrabold text-slate-800">응답 JSON 구조</h3><span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">JSON</span></div>
            <pre className="h-80 overflow-auto rounded-xl bg-slate-950 p-4 text-[11px] leading-5 text-emerald-200 whitespace-pre-wrap">{`{
  "company": {
    "name": "...", "industry": "...", "keywords": []
  },
  "temDiagnosis": {
    "technology": { "level": "T1~T4", "score": 0 },
    "execution": { "level": "E1~E4", "score": 0 },
    "market": { "level": "M1~M4", "score": 0 },
    "radarScores": {}
  },
  "primaryBottleneck": "PMF",
  "bottlenecks": [],
  "recommendedSupport": [],
  "evidenceList": [],
  "actionPlan90Days": [],
  "consultingInsights": {
    "executiveDiagnosis": "...",
    "marketOutlook": {},
    "technologyAssessment": {},
    "businessModelAssessment": {},
    "futureStrategy": [],
    "keyRisks": []
  },
  "profile": {
    "technologies": [], "products": [],
    "capabilities": [], "needs": [],
    "desiredPartners": []
  }
}`}</pre>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-500"><span className="px-2 py-1 rounded bg-slate-100">temperature: 0.2</span><span className="px-2 py-1 rounded bg-slate-100">responseMimeType: application/json</span><span className="px-2 py-1 rounded bg-slate-100">문서 근거 우선</span><span className="px-2 py-1 rounded bg-slate-100">JSON 오류 보정·재시도</span></div>
      </section>
    </div>
  );
};
