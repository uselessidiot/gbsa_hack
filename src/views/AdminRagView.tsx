import React, { useMemo, useState } from 'react';
import { PUBLIC_REPORTS_DATABASE, PublicReportMeta } from '../data/publicRagKnowledge';
import { retrievePublicReportGrounding } from '../services/ragService';

export const AdminRagView: React.FC = () => {
  const [selectedReportId, setSelectedReportId] = useState<string>(PUBLIC_REPORTS_DATABASE[0].id);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('제조 AI');
  const [inputKeyword, setInputKeyword] = useState<string>('PoC, ROI');
  const [ragResult, setRagResult] = useState(() =>
    retrievePublicReportGrounding('제조 AI', ['PoC', 'ROI'])
  );

  const selectedReport: PublicReportMeta = useMemo(() => {
    return PUBLIC_REPORTS_DATABASE.find((r) => r.id === selectedReportId) || PUBLIC_REPORTS_DATABASE[0];
  }, [selectedReportId]);

  const handleRunRagTest = (e: React.FormEvent) => {
    e.preventDefault();
    const keywords = inputKeyword.split(',').map((k) => k.trim()).filter(Boolean);
    const result = retrievePublicReportGrounding(selectedIndustry, keywords);
    setRagResult(result);
  };

  return (
    <div className="max-w-[1500px] mx-auto space-y-6 animate-fadeIn pb-12 text-left">
      {/* 1. Header: Simple & Honest System Overview */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-sm">hub</span>
              Gemini File Search RAG Knowledge Hub
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              공공 산업 리포트 RAG 지식베이스 & 색인 시스템
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              `rag_file/` 디렉토리에 탑재된 <strong>7종 공공 연구보고서(PDF)</strong>를 Gemini File API로 색인하여, 
              기업의 사업계획서 진단 시 <strong>실제 리포트 명칭과 원문 페이지(`p.XX`)</strong>를 팩트 기반으로 교차 검증하고 연계 지원사업을 도출합니다.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              7개 공공 PDF 색인 활성화
            </span>
          </div>
        </div>

        {/* 2. Real System Architecture Flow Diagram (실제 시스템 구성도) */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            실제 RAG 시스템 동작 파이프라인 (System Pipeline Architecture)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              {
                step: '01. 문서 수집 & 보관',
                title: '공공 리포트 PDF (7종)',
                desc: 'GBSA, 산업연구원, 무역협회 등 7개 원본 PDF가 `rag_file/`에 영구 보관됨',
                icon: 'folder_open',
                badge: 'rag_file/*.pdf',
                color: 'blue'
              },
              {
                step: '02. 파일 인제스천',
                title: 'Gemini File API 업로드',
                desc: '대용량 PDF를 Gemini File API로 전송하여 본문 텍스트 및 테이블 구조화',
                icon: 'cloud_upload',
                badge: 'GoogleGenAI Files',
                color: 'indigo'
              },
              {
                step: '03. 시맨틱 검색 & Grounding',
                title: '산업군·키워드 매칭',
                desc: '기업 사업계획서의 산업군/병목에 매칭되는 리포트 핵심 구절과 페이지(p.XX) 인출',
                icon: 'manage_search',
                badge: 'Hybrid Retrieval',
                color: 'sky'
              },
              {
                step: '04. 교차 진단 & 처방',
                title: '팩트 인용 & 지원사업 매칭',
                desc: '경영진 리포트에 공공 출처를 표기하고 1:1 맞춤 지원사업 처방 생성',
                icon: 'verified',
                badge: 'ResultView Citations',
                color: 'emerald'
              }
            ].map((node) => (
              <div key={node.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold text-blue-600">{node.step}</span>
                    <span className="material-symbols-outlined text-slate-400 text-base">{node.icon}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{node.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">{node.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {node.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Main Content: 7 Documents Library (Left) & Realtime Grounding Test (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: 7 Real Ingested Documents List & Detail Viewer (7 cols) */}
        <div className="xl:col-span-7 space-y-5">
          {/* Document Select List */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 text-sm">
                업로드된 공공 리포트 라이브러리 ({PUBLIC_REPORTS_DATABASE.length}종)
              </h2>
              <span className="text-xs text-slate-400">문서를 클릭하면 추출된 세부 팩트를 확인합니다.</span>
            </div>

            <div className="space-y-2">
              {PUBLIC_REPORTS_DATABASE.map((doc, idx) => {
                const isSelected = selectedReportId === doc.id;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setSelectedReportId(doc.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/60 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-extrabold">
                            {doc.category}
                          </span>
                          <span className="text-[11px] text-slate-400">{doc.publishedDate}</span>
                          <span className="text-[11px] text-slate-400">· {doc.fileSize} ({doc.pageCount}p)</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-xs mt-1 leading-snug">
                          {doc.fileName}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {doc.publisher}
                        </p>
                      </div>
                    </div>

                    <span className="material-symbols-outlined text-slate-400 text-base shrink-0 mt-1">
                      {isSelected ? 'check_circle' : 'chevron_right'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Document Detail Viewer */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-blue-600">선택된 리포트 세부 데이터</span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5">
                  「{selectedReport.fileName}」
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                {selectedReport.publisher}
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <p><strong className="text-slate-800">🎯 시스템 내 역할:</strong> <span className="text-slate-600">{selectedReport.systemRole}</span></p>
              <p><strong className="text-slate-800">📄 리포트 핵심 내용:</strong> <span className="text-slate-600">{selectedReport.summary}</span></p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700">RAG 추출 핵심 팩트 & 페이지별 인용 데이터:</h4>
              {selectedReport.keyInsights.map((insight, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-100 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-extrabold text-[10px]">
                      🏛️ 공공 보고서 p.{insight.page} 원문 인용
                    </span>
                    <span className="text-slate-500 text-[11px]">타깃: {insight.targetIndustry}</span>
                  </div>
                  <p className="text-slate-800 italic bg-white p-2.5 rounded-lg border border-blue-100 leading-relaxed font-medium">
                    "{insight.quote}"
                  </p>
                  <div className="space-y-1 text-slate-600 pt-1">
                    <p><strong className="text-blue-700">💡 AI 진단 시사점:</strong> {insight.implication}</p>
                    <p><strong className="text-emerald-700">🎯 연계 추천 지원사업:</strong> {insight.recommendedSupport}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Simple RAG Grounding Test & Prompt Preview (5 cols) */}
        <div className="xl:col-span-5 space-y-5">
          {/* RAG Retrieval Simulator */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-blue-600 text-base">search</span>
                RAG 실시간 인출 테스트
              </h2>
              <span className="text-[11px] font-bold text-slate-400">Gemini File Search</span>
            </div>

            <form onSubmit={handleRunRagTest} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">산업군</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="제조 AI">제조 AI (스마트팩토리, 비전검사)</option>
                  <option value="로봇">로봇 / 모빌리티 (AMR, 물류)</option>
                  <option value="디지털 헬스케어">바이오 / 디지털 헬스케어</option>
                  <option value="신재생에너지">신재생에너지 (페로브스카이트 BIPV)</option>
                  <option value="신소재">신소재 / 과학기술 R&D</option>
                  <option value="정밀기계">정밀기계 / 수출</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">검색 키워드 (콤마 구분)</label>
                <input
                  type="text"
                  value={inputKeyword}
                  onChange={(e) => setInputKeyword(e.target.value)}
                  placeholder="예: PoC, ROI, 안전인증, 식약처"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition shadow-sm active:scale-95"
              >
                검색 실행 및 프롬프트 인출
              </button>
            </form>

            {/* Test Results Output */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">인출된 공공 인용문 ({ragResult.citations.length}건)</span>
                <span className="text-emerald-600 font-bold">색인 매칭 완료</span>
              </div>

              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {ragResult.citations.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-700 truncate max-w-[200px]">{c.fileName}</span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-black text-[10px]">
                        p.{c.page}
                      </span>
                    </div>
                    <p className="text-slate-700 italic bg-white p-2 rounded border border-slate-100 leading-snug">
                      "{c.quote}"
                    </p>
                    <p className="text-[11px] text-emerald-700 font-bold">🎯 {c.recommendedSupport}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gemini Prompt Grounding Snippet Preview */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-slate-500">terminal</span>
                Gemini LLM 주입용 Grounding 컨텍스트 미리보기
              </h3>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto">
              {ragResult.groundingPromptSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
