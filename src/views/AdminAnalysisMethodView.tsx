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
              <span className="text-[11px] font-bold text-blue-600">선택한 분석 모듈</span>
              <h2 className="mt-1 text-lg font-extrabold text-slate-900">{active.title}</h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">v2.4</span>
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-4">
            <span className="text-xs font-extrabold text-slate-700">분석 처리 순서</span>
            <p className="mt-2 text-sm leading-6 text-slate-600">{active.detail}</p>
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
    </div>
  );
};

