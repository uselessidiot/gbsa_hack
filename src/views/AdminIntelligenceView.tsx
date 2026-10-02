import React, { useMemo, useState } from 'react';
import { MOCK_ADMIN_METRICS } from '../data/mockInsights';
import { MOCK_COMPANIES, CompanyWithAnalysis } from '../data/mockCompanies';
import { AdminCompaniesView } from './AdminCompaniesView';
import { AdminMailingView } from './AdminMailingView';

type StatusFilter = 'ALL' | 'PENDING' | 'ANALYZING' | 'COMPLETED';
type AdminPage = 'dashboard' | 'companies' | 'mailing';

const statusLabel: Record<StatusFilter, string> = {
  ALL: '전체',
  PENDING: '검토 대기',
  ANALYZING: 'AI 분석 중',
  COMPLETED: '분석 완료',
};

const formatDate = (value?: string) =>
  value ? new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(value)) : '-';

const levelScore = (level: string) => Number(level.slice(1)) || 1;

const companyStatus = (item: CompanyWithAnalysis) => {
  if (item.analysis.status === 'COMPLETED') return 'AI 분석 완료';
  if (item.analysis.status === 'ANALYZING') return 'AI 분석 중';
  return '검토 대기';
};

const statusClass = (status: string) => {
  if (status === 'AI 분석 완료') return 'bg-emerald-50 text-emerald-600';
  if (status === 'AI 분석 중') return 'bg-blue-50 text-blue-600';
  return 'bg-orange-50 text-orange-600';
};

const avgScore = (item: CompanyWithAnalysis) => {
  const { technology, execution, market } = item.analysis.temDiagnosis;
  return Math.round(
    ((technology.score || levelScore(technology.level) * 25) +
      (execution.score || levelScore(execution.level) * 25) +
      (market.score || levelScore(market.level) * 25)) / 3,
  );
};

export const AdminIntelligenceView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState<AdminPage>('dashboard');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [selectedId, setSelectedId] = useState(MOCK_COMPANIES[0]?.company.id || '');

  const filteredCompanies = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return MOCK_COMPANIES.filter((item) => {
      const status = item.analysis.status as StatusFilter;
      const searchable = [item.company.name, item.company.industry, item.company.subIndustry, ...item.company.keywords].join(' ').toLowerCase();
      return (!normalized || searchable.includes(normalized)) && (statusFilter === 'ALL' || status === statusFilter);
    });
  }, [query, statusFilter]);

  const selected = useMemo(
    () => MOCK_COMPANIES.find((item) => item.company.id === selectedId) || filteredCompanies[0] || MOCK_COMPANIES[0],
    [filteredCompanies, selectedId],
  );

  const metrics = MOCK_ADMIN_METRICS;
  const selectedScore = selected ? Math.round(
    ((selected.analysis.temDiagnosis.technology.score || 0) +
      (selected.analysis.temDiagnosis.execution.score || 0) +
      (selected.analysis.temDiagnosis.market.score || 0)) / 3,
  ) : 0;

  const kpis = [
    { label: '총 접수 기업', value: metrics.totalAnalyzedCompanies + 78, trend: '12%', icon: 'description', color: 'blue' },
    { label: '검토 대기', value: 48, trend: '8%', icon: 'schedule', color: 'purple', negative: true },
    { label: 'AI 분석 완료', value: metrics.totalAnalyzedCompanies + 3, trend: '35%', icon: 'smart_toy', color: 'sky' },
    { label: '맞춤형 매칭 후보', value: metrics.b2bMatchCandidatesCount, trend: '42%', icon: 'hub', color: 'teal' },
    { label: '선정·지원 기업', value: 38, trend: '27%', icon: 'business', color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-[#f1f5fa] text-[#1e293b] animate-fadeIn">
      <header className="h-16 bg-white border-b border-slate-200/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3 shrink-0">
          <div className="font-black italic text-xl tracking-tight text-[#005BAC]">GBSA</div>
          <div className="h-4 w-px bg-slate-200" />
          <span className="text-sm md:text-base font-extrabold text-slate-800">기업지원 관리자</span>
        </div>
        <label className="hidden md:block relative w-full max-w-xl mx-4 lg:mx-8">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="기업명, 사업명, 키워드로 검색하세요." className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-sm outline-none focus:border-blue-500 focus:bg-white" />
        </label>
        <div className="flex items-center gap-3 shrink-0">
          <button type="button" className="relative text-slate-500" aria-label="알림"><span className="material-symbols-outlined">notifications</span><span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">3</span></button>
          <div className="hidden sm:block pl-3 border-l border-slate-200"><div className="text-xs font-bold text-slate-800">홍길동 대리</div><div className="text-[10px] text-slate-400">경기도경제과학진흥원</div></div>
        </div>
      </header>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside className="hidden xl:flex w-56 shrink-0 bg-white border-r border-slate-200/80 flex-col justify-between p-4">
          <div>
            <nav className="space-y-1">
              <button type="button" onClick={() => setActivePage('dashboard')} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-bold text-sm text-left ${activePage === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <span className="material-symbols-outlined">home</span><span>대시보드</span>
              </button>
              <div className="pt-4 pb-1 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">기업 데이터</div>
              {[
                ['description', '사업계획서 관리', 'dashboard'],
                ['business', '기업 관리', 'companies'],
                ['hub', '맞춤형 매칭·추천', 'dashboard'],
                ['mail', '메일링 홍보', 'mailing'],
                ['monitoring', '성과 관리', 'dashboard'],
                ['bar_chart', '통계·리포트', 'dashboard'],
              ].map(([icon, label]) => (
                <button key={label} type="button" onClick={() => setActivePage((label === '기업 관리' ? 'companies' : label === '메일링 홍보' ? 'mailing' : 'dashboard') as AdminPage)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-semibold ${activePage === label || (activePage === 'companies' && label === '기업 관리') || (activePage === 'mailing' && label === '메일링 홍보') ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <span className="material-symbols-outlined text-slate-400">{icon}</span><span>{label}</span>
                </button>
              ))}
            </nav>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">시스템 관리</div>
              {[
                ['group', '사용자 관리'],
                ['settings', '설정'],
              ].map(([icon, label]) => (
                <button key={label} type="button" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 text-left text-sm font-semibold">
                  <span className="material-symbols-outlined text-slate-400">{icon}</span><span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-xs font-bold text-blue-700 leading-5">
            AI로 더 많은 기업이<br />성장할 수 있도록
            <span className="material-symbols-outlined block text-right text-3xl mt-2">north_east</span>
          </div>
        </aside>

        <main className="flex-1 min-w-0 px-4 sm:px-6 md:px-8 py-7 lg:px-10">
          {activePage === 'companies' ? <AdminCompaniesView /> : activePage === 'mailing' ? <AdminMailingView /> : <div className="max-w-[1500px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-7">
              <div>
                <p className="text-xs font-bold text-blue-600 mb-2">GBSA 기업지원 Intelligence</p>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">홍길동 대리님, 오늘도 좋은 하루입니다!</h1>
                <p className="mt-2 text-sm md:text-base text-slate-500">기업들의 사업계획서를 AI가 분석하여, 적합한 지원사업과 후속관리를 도와드립니다.</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="font-semibold">2026년 10월 2일 (금)</span>
                <button type="button" className="px-3 py-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-700">2026년</button>
                <button type="button" className="px-3 py-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-700">3분기 (7~9월)</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-7">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center justify-between">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${kpi.color === 'purple' ? 'bg-purple-50 text-purple-500' : kpi.color === 'teal' ? 'bg-teal-50 text-teal-500' : kpi.color === 'orange' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-600'}`}>
                      <span className="material-symbols-outlined">{kpi.icon}</span>
                    </span>
                    <span className={`text-xs font-bold ${kpi.negative ? 'text-rose-500' : 'text-emerald-600'}`}>{kpi.negative ? '▼' : '▲'} {kpi.trend}</span>
                  </div>
                  <p className="mt-4 text-xs font-semibold text-slate-400">{kpi.label}</p>
                  <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-800">{kpi.value.toLocaleString()}<span className="text-sm font-medium ml-1">개</span></p>
                  <p className="mt-1 text-[11px] text-slate-400">전분기 대비</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.85fr)] gap-6 items-start">
              <section className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="p-5 pb-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">사업계획서 목록 <span className="text-sm font-semibold text-slate-400">{filteredCompanies.length}건</span></h2>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {(Object.keys(statusLabel) as StatusFilter[]).map((status) => (
                        <button key={status} type="button" onClick={() => setStatusFilter(status)} className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusFilter === status ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}>
                          {statusLabel[status]}{status === 'ALL' ? ` ${MOCK_COMPANIES.length}` : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <label className="relative block">
                      <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
                      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="기업명·사업명 검색" className="w-48 pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-blue-500 focus:bg-white" />
                    </label>
                    <button type="button" className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600"><span className="material-symbols-outlined text-base">download</span>엑셀</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left">
                    <thead className="bg-slate-50 border-y border-slate-100 text-[11px] uppercase text-slate-400">
                      <tr><th className="px-5 py-3 w-10"> </th><th className="px-3 py-3">기업명</th><th className="px-3 py-3">사업명 / 분야</th><th className="px-3 py-3">접수일</th><th className="px-3 py-3">AI 적합도</th><th className="px-3 py-3">상태</th><th className="px-3 py-3">담당자</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCompanies.map((item) => {
                        const status = companyStatus(item);
                        const score = avgScore(item);
                        return <tr key={item.company.id} onClick={() => setSelectedId(item.company.id)} className={`cursor-pointer transition-colors ${selected?.company.id === item.company.id ? 'bg-blue-50/60' : 'hover:bg-slate-50'}`}>
                          <td className="px-5 py-4"><span className={`w-5 h-5 rounded border flex items-center justify-center ${selected?.company.id === item.company.id ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>{selected?.company.id === item.company.id && <span className="material-symbols-outlined text-sm">check</span>}</span></td>
                          <td className="px-3 py-4"><div className="font-bold text-sm text-slate-800">{item.company.name}</div><div className="text-[11px] text-slate-400 mt-1">{item.company.location}</div></td>
                          <td className="px-3 py-4 max-w-[220px]"><div className="truncate text-sm text-slate-600">{item.company.subIndustry || item.company.summary}</div><span className="inline-block mt-1 px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold">{item.company.industry}</span></td>
                          <td className="px-3 py-4 text-xs text-slate-400 whitespace-nowrap">{formatDate(item.analysis.createdAt || item.company.createdAt)}</td>
                          <td className="px-3 py-4 text-sm font-extrabold text-emerald-600 tabular-nums">{score}%</td>
                          <td className="px-3 py-4"><span className={`inline-block px-2 py-1 rounded text-[11px] font-bold ${statusClass(status)}`}>{status}</span></td>
                          <td className="px-3 py-4 text-xs text-slate-500 whitespace-nowrap">홍길동</td>
                        </tr>;
                      })}
                    </tbody>
                  </table>
                </div>
                {filteredCompanies.length === 0 && <div className="p-10 text-center text-sm text-slate-400">검색 조건에 맞는 기업이 없습니다.</div>}
                <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400"><span>사업계획서 기반 AI 분석 자산화 현황</span><button type="button" className="px-3 py-1.5 rounded-lg border border-slate-200 font-bold text-slate-600">10개씩 보기</button></div>
              </section>

              {selected && <aside className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-5 sticky top-20">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3"><div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><span className="material-symbols-outlined">eco</span></div><div><h2 className="font-extrabold text-slate-900">{selected.company.name}</h2><div className="flex gap-1 mt-1"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold">{selected.company.industry}</span><span className="px-2 py-0.5 rounded bg-purple-50 text-purple-600 text-[10px] font-bold">AI 추천 상위 1순위</span></div></div></div>
                  <button type="button" className="text-slate-400 hover:text-slate-700" aria-label="기업 상세 닫기"><span className="material-symbols-outlined">close</span></button>
                </div>
                <div className="flex gap-5 border-b border-slate-100 py-3 text-xs font-bold text-slate-400"><span className="text-blue-600 border-b-2 border-blue-600 pb-3 -mb-3">성과 추적</span><span>기업 정보</span><span>제출서류</span><span>성과요청 관리</span></div>

                <div className="mt-5 rounded-xl bg-blue-50/60 border border-blue-100 p-4 flex items-center gap-4">
                  <div className="w-24 h-24 shrink-0 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(#2563eb ${selectedScore * 3.6}deg, #dbeafe 0deg)` }}><div className="w-[76px] h-[76px] rounded-full bg-white flex flex-col items-center justify-center"><span className="text-2xl font-black text-slate-800">{selectedScore}<small className="text-sm">%</small></span><span className="text-[10px] text-slate-400">종합 적합도</span></div></div>
                  <div><div className="flex items-center gap-2"><h3 className="font-bold text-slate-800">기업 성장 성과 총평</h3><span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold">우수성장기업</span></div><p className="text-xs leading-5 text-slate-500 mt-2 line-clamp-4">{selected.analysis.aiInsightSummary}</p><button type="button" className="mt-2 text-xs text-blue-600 font-bold">상세 진단서 보기 →</button></div>
                </div>

                <div className="mt-5"><h3 className="flex items-center gap-2 font-bold text-slate-800 text-sm"><span className="w-1 h-4 bg-blue-600 rounded-full" />핵심 진단 지표</h3><div className="grid grid-cols-3 gap-2 mt-3">{[
                  ['기술', selected.analysis.temDiagnosis.technology.score || 0, selected.analysis.temDiagnosis.technology.level],
                  ['실행', selected.analysis.temDiagnosis.execution.score || 0, selected.analysis.temDiagnosis.execution.level],
                  ['시장', selected.analysis.temDiagnosis.market.score || 0, selected.analysis.temDiagnosis.market.level],
                ].map(([label, value, level]) => <div key={label} className="rounded-lg bg-slate-50 border border-slate-100 p-3"><span className="text-[10px] text-slate-400">{label} 성숙도</span><div className="mt-1 text-lg font-black text-slate-800">{value}<span className="text-xs font-normal">점</span></div><span className="text-[10px] font-bold text-blue-600">{level}</span></div>)}</div></div>

                <div className="mt-5 rounded-xl border border-rose-100 bg-rose-50/50 p-4"><div className="flex items-center justify-between"><h3 className="font-bold text-sm text-slate-800">우선 관리 병목</h3><span className="px-2 py-1 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold">{selected.analysis.primaryBottleneck}</span></div><p className="text-xs leading-5 text-slate-600 mt-2">{selected.analysis.bottlenecks[0]?.title || '추가 검토가 필요합니다.'}</p><p className="text-[11px] text-slate-400 mt-1">근거: {selected.analysis.bottlenecks[0]?.sourceEvidence || selected.analysis.temDiagnosis.market.sourceQuote}</p></div>

                <div className="mt-5"><div className="flex items-center justify-between mb-3"><h3 className="font-bold text-sm text-slate-800">성과 데이터 제출 요청</h3><span className="text-[10px] text-rose-500 font-bold">3분기 정기 보고</span></div><div className="space-y-2">{['분기 공시 매출액 및 부가세 과세표준 증명원', '고용보험 가입자명부 (신규 고용 창출 증빙)', '수출 실적 및 PoC 유상 전환 계약서 사본'].map((label, index) => <div key={label} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"><span className={`w-5 h-5 rounded flex items-center justify-center ${index < 2 ? 'bg-blue-600 text-white' : 'border border-slate-300 text-transparent'}`}><span className="material-symbols-outlined text-sm">check</span></span><span className="font-semibold text-slate-600">{label}</span></div>)}</div><div className="grid grid-cols-3 gap-2 mt-3"><button type="button" className="col-span-2 rounded-lg bg-blue-600 text-white py-2 text-xs font-bold">알림톡·공문 요청 발송</button><button type="button" className="rounded-lg border border-slate-200 text-slate-600 py-2 text-xs font-bold">양식 자동발송</button></div></div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex gap-2"><button type="button" className="flex-1 rounded-lg bg-blue-600 text-white py-2.5 text-xs font-bold">성과 증빙 검토</button><button type="button" className="flex-1 rounded-lg border border-slate-200 text-slate-600 py-2.5 text-xs font-bold">성과보고서 PDF</button></div>
              </aside>}
            </div>
          </div>}
        </main>
      </div>
    </div>
  );
};
