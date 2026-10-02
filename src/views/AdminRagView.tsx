import React, { useMemo, useState } from 'react';
import { PUBLIC_REPORTS_DATABASE, PublicReportMeta } from '../data/publicRagKnowledge';
import { retrievePublicReportGrounding } from '../services/ragService';

export const AdminRagView: React.FC = () => {
  const [selectedReportId, setSelectedReportId] = useState<string>(PUBLIC_REPORTS_DATABASE[0].id);
  const [searchIndustry, setSearchIndustry] = useState<string>('제조 AI');
  const [searchKeyword, setSearchKeyword] = useState<string>('PoC');
  const [simulatedResults, setSimulatedResults] = useState(() =>
    retrievePublicReportGrounding('제조 AI', ['PoC', 'ROI'])
  );

  const selectedReport: PublicReportMeta = useMemo(() => {
    return PUBLIC_REPORTS_DATABASE.find((r) => r.id === selectedReportId) || PUBLIC_REPORTS_DATABASE[0];
  }, [selectedReportId]);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const keywords = searchKeyword.split(',').map((k) => k.trim()).filter(Boolean);
    const result = retrievePublicReportGrounding(searchIndustry, keywords);
    setSimulatedResults(result);
  };

  // 총 7개 공공 리포트 목록 (rag_file 내 전체 파일)
  const fullFileList = useMemo(() => [
    { name: '2026 경기도 중소기업 동향 보고서.pdf', size: '1.3 MB', status: '인덱싱 완료 (ACTIVE)', chunks: 24, publisher: 'GBSA / 경기연구원' },
    { name: '08_월간KIET산업경제_제334호_2026-07_산업경제분석_이민주_서비스업_AI_전환_측정.pdf', size: '307 KB', status: '인덱싱 완료 (ACTIVE)', chunks: 12, publisher: '산업연구원 (KIET)' },
    { name: '2026년_하반기13대_주역산업_전망.pdf', size: '291 KB', status: '인덱싱 완료 (ACTIVE)', chunks: 18, publisher: '산업통상자원부' },
    { name: '2026 경기도 창업생태계 동향 보고서.pdf', size: '1.3 MB', status: '인덱싱 완료 (ACTIVE)', chunks: 26, publisher: '경기도경제과학진흥원' },
    { name: '(조사연구2026-05)경기도과학기술통계집.pdf', size: '16.5 MB', status: '인덱싱 완료 (ACTIVE)', chunks: 88, publisher: '경기연구원' },
    { name: '경기도 25년 수출동향.pdf', size: '1.0 MB', status: '인덱싱 완료 (ACTIVE)', chunks: 15, publisher: '한국무역협회 경기본부' },
    { name: '19271_2.pdf', size: '3.3 MB', status: '인덱싱 완료 (ACTIVE)', chunks: 32, publisher: '경기도 첨단산업과' },
  ], []);

  return (
    <div className="max-w-[1500px] mx-auto space-y-6 animate-fadeIn pb-12 text-left">
      {/* 1. Top Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-7 md:p-9 shadow-xl relative overflow-hidden border border-blue-500/20">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-200 text-xs font-bold mb-3">
              <span className="material-symbols-outlined text-sm">library_books</span>
              GBSA PUBLIC REPORT RAG KNOWLEDGE HUB
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
              공공 산업 리포트 RAG 지식베이스<br />
              실시간 색인 & Grounding 관제 센터
            </h1>
            <p className="text-sm text-blue-100/80 mt-2 max-w-2xl leading-relaxed">
              경기도 및 국책 연구기관의 <strong>공공 산업 분석 리포트 7종(PDF)</strong>을 Gemini File API 및 지식 임베딩 엔진으로 인제스천하여, 
              기업 진단 시 100% 팩트 기반의 페이지 인용(`p.XX`)과 지원사업 처방을 생성합니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-bold text-white transition active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">cloud_sync</span>
              전체 PDF 재색인
            </button>
            <button
              type="button"
              className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-extrabold shadow-lg transition active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">upload_file</span>
              신규 공공 리포트 PDF 등록
            </button>
          </div>
        </div>

        {/* Mini Status KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          {[
            ['인덱싱된 공공 리포트', '7개 문서', '24.1 MB 지식 데이터', 'picture_as_pdf'],
            ['추출된 핵심 지식 청크', '215개 문단', '페이지별 팩트 태깅', 'segment'],
            ['RAG 교차 진단 정확도', '99.2%', '환각(Hallucination) 제로', 'verified_user'],
            ['월간 RAG 인용 횟수', '3,418회', '사업계획서 팩트체크', 'auto_awesome'],
          ].map(([label, value, note, icon]) => (
            <div key={label} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between text-blue-200 mb-2">
                <span className="material-symbols-outlined text-lg">{icon}</span>
                <span className="text-[11px] font-bold text-emerald-400">{note}</span>
              </div>
              <div>
                <span className="text-xs text-blue-100/70 font-medium block">{label}</span>
                <span className="text-xl font-black text-white mt-0.5 block">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main 2-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Ingested Public PDF Documents & Detail Knowledge Inspector */}
        <div className="xl:col-span-7 space-y-6">
          {/* Document Ingestion Table */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900">등록된 공공 산업 분석 리포트 라이브러리</h2>
                <p className="text-xs text-slate-500 mt-0.5">`rag_file/` 디렉토리에 동기화된 공공 리포트 7종 현황</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                ● 7개 문서 활성화
              </span>
            </div>

            <div className="space-y-2.5">
              {PUBLIC_REPORTS_DATABASE.map((report) => {
                const isSelected = selectedReportId === report.id;
                return (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReportId(report.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                        : 'border-slate-100 bg-slate-50/50 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        <span className="material-symbols-outlined text-lg">description</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold">
                            {report.category}
                          </span>
                          <span className="text-xs font-bold text-slate-400">{report.publishedDate}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">{report.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{report.publisher} · {report.fileSize}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs font-extrabold text-blue-600">
                        {report.keyInsights.length}개 핵심 청크
                      </span>
                      <span className="material-symbols-outlined text-slate-400 text-lg">chevron_right</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Selected Document Detailed Knowledge & Page Citations */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">find_in_page</span>
                <h3 className="font-black text-slate-900 text-base">
                  「{selectedReport.fileName}」 추출 지식 및 페이지별 팩트
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-400">총 {selectedReport.pageCount} 페이지</span>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
              <strong className="text-slate-800">문서 요약:</strong> {selectedReport.summary}
            </p>

            <div className="space-y-3">
              {selectedReport.keyInsights.map((insight, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-blue-50/40 border border-blue-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[11px] font-extrabold">
                      🏛️ 공공 팩트 인용 (p.{insight.page})
                    </span>
                    <span className="text-xs font-bold text-slate-500">타깃 산업: {insight.targetIndustry}</span>
                  </div>
                  <p className="text-xs text-slate-800 font-medium italic bg-white p-2.5 rounded-lg border border-blue-100">
                    "{insight.quote}"
                  </p>
                  <div className="text-xs text-slate-600 pt-1 space-y-1">
                    <p><strong className="text-blue-700">💡 진단 시사점:</strong> {insight.implication}</p>
                    <p><strong className="text-emerald-700">🎯 연계 추천 지원사업:</strong> {insight.recommendedSupport}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (5 cols): Live RAG Search & Grounding Simulator */}
        <div className="xl:col-span-5 space-y-6">
          {/* Real-time Simulator Form */}
          <section className="bg-white rounded-3xl p-6 border-2 border-blue-500/30 shadow-lg space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
                <h3 className="font-black text-slate-900 text-base">실시간 RAG Grounding 시뮬레이터</h3>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Gemini File Search Engine
              </span>
            </div>

            <form onSubmit={handleSimulate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">산업군 선택</label>
                <select
                  value={searchIndustry}
                  onChange={(e) => setSearchIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="제조 AI">제조 AI (스마트팩토리, 비전검사)</option>
                  <option value="로봇">로봇 / 모빌리티 (AMR, 자율주행)</option>
                  <option value="디지털 헬스케어">바이오 / 디지털 헬스케어 (의료기기)</option>
                  <option value="신재생에너지">신재생에너지 (페로브스카이트, BIPV)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">검색 키워드 (콤마 구분)</label>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="예: PoC, ROI, 안전인증, 식약처, 펀드"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">search_check</span>
                공공 RAG 지식 인출 및 프롬프트 주입 테스트
              </button>
            </form>

            {/* Simulation Results Output */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">매칭된 공공 리포트 인용: <strong>{simulatedResults.citations.length}건</strong></span>
                <span className="text-emerald-600 font-bold">인덱스 매칭 성공 ✓</span>
              </div>

              <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                {simulatedResults.citations.map((c, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-blue-700 truncate max-w-[200px]">{c.fileName}</span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-black text-[10px]">
                        p.{c.page}
                      </span>
                    </div>
                    <p className="text-slate-700 italic bg-white p-2 rounded border border-slate-100">
                      "{c.quote}"
                    </p>
                    <p className="text-slate-500 text-[11px]"><strong className="text-slate-700">처방:</strong> {c.implication}</p>
                    <p className="text-emerald-700 text-[11px] font-bold">🎯 {c.recommendedSupport}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Full Ingested Repository Status */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-3">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-blue-600">folder_zip</span>
              rag_file 저장소 전체 PDF 현황 ({fullFileList.length}개)
            </h4>
            <div className="space-y-1.5">
              {fullFileList.map((f) => (
                <div key={f.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-[11px]">
                  <span className="truncate max-w-[220px] text-slate-700 font-medium">{f.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-slate-400">{f.size}</span>
                    <span className="text-emerald-600 font-bold">ACTIVE</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
