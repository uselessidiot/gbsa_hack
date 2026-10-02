import React, { useMemo, useState } from 'react';
import { MOCK_ADMIN_METRICS } from '../data/mockInsights';
import { MOCK_COMPANIES, CompanyWithAnalysis } from '../data/mockCompanies';
import { AdminCompaniesView } from './AdminCompaniesView';
import { AdminMailingView } from './AdminMailingView';
import { AdminRagView } from './AdminRagView';

type StatusFilter = 'ALL' | 'PENDING' | 'ANALYZING' | 'COMPLETED';
type AdminPage = 'dashboard' | 'companies' | 'mailing' | 'rag';

const statusLabel: Record<StatusFilter, string> = {
  ALL: '전체',
  PENDING: '검토 대기',
  ANALYZING: 'AI 분석 중',
  COMPLETED: '분석 완료',
};

const formatDate = (value?: string) =>
  value ? new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(value)) : '-';

const levelScore = (level: string) => Number(level.slice(1)) || 1;

export const AdminIntelligenceView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState<AdminPage>('dashboard');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [selectedId, setSelectedId] = useState(MOCK_COMPANIES[0]?.company.id || '');

  const filteredCompanies = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return MOCK_COMPANIES.filter((item) => {
      const status = item.analysis.status as StatusFilter;
      const searchable = [
        item.company.name,
        item.company.industry,
        item.company.subIndustry,
        ...item.company.keywords,
        item.analysis.primaryBottleneck,
      ].join(' ').toLowerCase();
      return (!normalized || searchable.includes(normalized)) && (statusFilter === 'ALL' || status === statusFilter);
    });
  }, [query, statusFilter]);

  const selected = useMemo(
    () => MOCK_COMPANIES.find((item) => item.company.id === selectedId) || filteredCompanies[0] || MOCK_COMPANIES[0],
    [filteredCompanies, selectedId],
  );

  const selectedScore = selected ? Math.round(
    ((selected.analysis.temDiagnosis.technology.score || 0) +
      (selected.analysis.temDiagnosis.execution.score || 0) +
      (selected.analysis.temDiagnosis.market.score || 0)) / 3,
  ) : 0;

  // Real, credible enterprise KPI cards
  const kpis = [
    { label: '사업계획서 접수 기업', value: '4개사', sub: '실시간 AI 정밀 진단', icon: 'folder_open', color: 'blue' },
    { label: 'T·E·M 진단 완료율', value: '100%', sub: '기술·실행·시장 3대 성숙도', icon: 'verified_user', color: 'emerald' },
    { label: '공공 RAG 교차 검증', value: '7종 PDF', sub: '경기도/산업부 리포트 인용', icon: 'library_books', color: 'sky' },
    { label: '1:1 맞춤 지원사업 매칭', value: '12개 과제', sub: '평균 적합도 91.5%', icon: 'hub', color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] animate-fadeIn text-left">
      {/* 1. Enterprise Top Bar */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
              G
            </span>
            <div>
              <span className="font-extrabold text-sm md:text-base text-slate-900 tracking-tight block">
                GBSA 기업지원 Intelligence
              </span>
              <span className="text-[10px] text-slate-400 font-semibold block -mt-0.5">
                경기도경제과학진흥원 관리자 통합 관제 콘솔
              </span>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <label className="hidden md:block relative w-full max-w-md mx-6">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="기업명, 산업군, 병목 키워드로 검색"
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs outline-none focus:border-blue-500 focus:bg-white transition"
          />
        </label>

        {/* Right Actions & Return to User Service */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (window.opener) {
                window.close();
              } else {
                window.location.href = window.location.pathname;
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 border border-slate-200"
          >
            <span className="material-symbols-outlined text-sm text-slate-500">arrow_back</span>
            <span>사용자 서비스로 돌아가기</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              홍
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-800">홍길동 책임</div>
              <div className="text-[10px] text-slate-400">기업성장지원팀</div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Body with Sidebar Navigation */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="hidden xl:flex w-60 shrink-0 bg-white border-r border-slate-200 flex-col justify-between p-4">
          <div className="space-y-6">
            <div>
              <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                인텔리전스 관제
              </div>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActivePage('dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs text-left transition ${
                    activePage === 'dashboard'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">dashboard</span>
                  <span>통합 관제 대시보드</span>
                </button>
              </nav>
            </div>

            <div>
              <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                기업 데이터 & AI 파이프라인
              </div>
              <nav className="space-y-1">
                {[
                  ['business', '기업 관리 & 진단 목록', 'companies'],
                  ['mail', '맞춤형 알림톡·메일링', 'mailing'],
                  ['library_books', '공공 RAG 지식베이스', 'rag'],
                ].map(([icon, label, pageKey]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActivePage(pageKey as AdminPage)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition ${
                      activePage === pageKey
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-base text-slate-400">{icon}</span>
                      <span>{label}</span>
                    </div>
                    {pageKey === 'rag' && (
                      <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 text-[10px] font-black">
                        7종 PDF
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* GBSA Mission Banner */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 p-4 text-white text-xs border border-blue-900 shadow-sm space-y-2">
            <div className="flex items-center gap-1.5 text-blue-300 font-extrabold text-[11px]">
              <span className="material-symbols-outlined text-sm">verified</span>
              GBSA AI Enterprise
            </div>
            <p className="text-[11px] text-blue-100/80 leading-relaxed">
              공공 RAG 팩트체크와 T·E·M 정밀 진단으로 도내 유망 중소기업의 성장을 가속합니다.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 md:px-8 py-6 lg:px-8">
          {activePage === 'companies' ? (
            <AdminCompaniesView />
          ) : activePage === 'mailing' ? (
            <AdminMailingView />
          ) : activePage === 'rag' ? (
            <AdminRagView />
          ) : (
            <div className="max-w-[1500px] mx-auto space-y-6">
              {/* Executive Header Banner */}
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
                      실시간 기업지원 관제 현황
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      2026년 10월 2일 기준
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    홍길동 책임님, 4개 접수 기업의 AI 진단 및 지원사업 매칭이 완료되었습니다.
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    사업계획서 원문 파싱 데이터와 7종 공공 리포트 RAG 지식베이스가 100% 동기화되어 있습니다.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  <button
                    type="button"
                    onClick={() => setActivePage('mailing')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">forward_to_inbox</span>
                    <span>알림톡·메일링 일괄 발송</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePage('rag')}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200 flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm text-blue-600">library_books</span>
                    <span>RAG 지식 뷰어</span>
                  </button>
                </div>
              </div>

              {/* 4 Professional KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-slate-500 mb-3">
                      <span className="text-xs font-bold text-slate-600">{kpi.label}</span>
                      <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg">{kpi.icon}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-2xl font-black text-slate-900 block">{kpi.value}</span>
                      <span className="text-[11px] text-slate-400 font-medium block mt-0.5">{kpi.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2-Column Dashboard Main: Realtime Diagnosis Stream (Left) + Detail & Tracking (Right) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Left (8 cols): Realtime Enterprise Diagnostic Table */}
                <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h2 className="font-black text-slate-900 text-sm">
                        접수 기업 실시간 T·E·M 진단 & 공공 RAG 연동 스트림
                      </h2>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        기업을 선택하면 우측에서 종합 적합도 및 공공 리포트 교차 근거를 확인합니다.
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {(['ALL', 'COMPLETED'] as StatusFilter[]).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setStatusFilter(st)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                            statusFilter === st
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {statusLabel[st]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredCompanies.map((item) => {
                      const isSelected = selected.company.id === item.company.id;
                      const score = Math.round(
                        ((item.analysis.temDiagnosis.technology.score || 0) +
                          (item.analysis.temDiagnosis.execution.score || 0) +
                          (item.analysis.temDiagnosis.market.score || 0)) / 3,
                      );
                      const topProgram = item.analysis.recommendedSupport[0] || '맞춤 지원사업 발굴 중';

                      return (
                        <div
                          key={item.company.id}
                          onClick={() => setSelectedId(item.company.id)}
                          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold">
                                {item.company.industry}
                              </span>
                              <span className="font-extrabold text-slate-900 text-sm">
                                {item.company.name}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                ({item.company.location})
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 font-medium">
                              {item.company.summary}
                            </p>

                            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                              <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200 flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">warning</span>
                                1순위 병목: {item.analysis.primaryBottleneck}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                                🎯 추천: {topProgram}
                              </span>
                            </div>
                          </div>

                          {/* Scores & Status */}
                          <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4 justify-between md:justify-end">
                            <div className="text-center">
                              <div className="text-[10px] text-slate-400 font-bold">T·E·M 성숙도</div>
                              <div className="text-lg font-black text-blue-600">{score}점</div>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 text-lg">
                              {isSelected ? 'check_circle' : 'chevron_right'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right (4 cols): Selected Company Detailed Profile & Action Console */}
                <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase">Selected Enterprise</span>
                      <h3 className="font-black text-slate-900 text-base mt-0.5">
                        {selected.company.name}
                      </h3>
                      <p className="text-xs text-slate-500">{selected.company.industry} · {selected.company.subIndustry}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      진단 완료
                    </span>
                  </div>

                  {/* Score Gauge */}
                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex flex-col items-center justify-center shrink-0 shadow-md">
                      <span className="text-xl font-black leading-none">{selectedScore}</span>
                      <span className="text-[9px] font-bold text-blue-200">종합 점수</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">AI 종합 성장 진단 총평</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-snug">
                        {selected.analysis.aiInsightSummary}
                      </p>
                    </div>
                  </div>

                  {/* 3 TEM Breakdown */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-700">T·E·M 3대 성숙도 지표</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {[
                        ['기술(T)', selected.analysis.temDiagnosis.technology.score || 85, selected.analysis.temDiagnosis.technology.level],
                        ['실행(E)', selected.analysis.temDiagnosis.execution.score || 80, selected.analysis.temDiagnosis.execution.level],
                        ['시장(M)', selected.analysis.temDiagnosis.market.score || 75, selected.analysis.temDiagnosis.market.level],
                      ].map(([label, val, lvl]) => (
                        <div key={String(label)} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10px] text-slate-400 font-bold block">{label}</span>
                          <span className="text-base font-black text-slate-800 block mt-0.5">{val}점</span>
                          <span className="text-[10px] font-bold text-blue-600">{lvl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottleneck Box */}
                  <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-rose-800 font-bold">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">report</span>
                        집중 관리 병목 ({selected.analysis.primaryBottleneck})
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium">
                      {selected.analysis.bottlenecks[0]?.title || '현장 실증 데이터 및 정량 ROI 보증 필요'}
                    </p>
                    <p className="text-[11px] text-slate-500 italic bg-white p-2 rounded border border-rose-100">
                      근거: "{selected.analysis.bottlenecks[0]?.sourceEvidence || selected.analysis.temDiagnosis.market.sourceQuote}"
                    </p>
                  </div>

                  {/* Follow-up Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <button
                      type="button"
                      onClick={() => setActivePage('mailing')}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">send</span>
                      <span>맞춤 지원사업 알림톡 발송</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert(`${selected.company.name}의 공공 RAG 연계 성장진단서 PDF가 다운로드되었습니다.`)}
                      className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm text-slate-500">picture_as_pdf</span>
                      <span>심사위원용 성과보고서 PDF 발급</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
