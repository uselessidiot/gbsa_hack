import React, { useState } from 'react';
import { MOCK_SUPPORT_PROGRAMS } from '../data/mockPrograms';
import { SupportProgram } from '../types';

export const PolicyArchiveView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredPrograms = MOCK_SUPPORT_PROGRAMS.filter((prog) => {
    const matchesCategory = selectedCategory === 'ALL' || prog.category === selectedCategory;
    const matchesSearch =
      prog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">
            GBSA 공공 RAG 정책 아카이브
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mt-space-2xs">
            공공 RAG 정책자료실 & 지원사업 세부 검토
          </h2>
        </div>
        <div className="flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-sm text-secondary">verified</span>
          <span>경기도 / GBSA / 중기부 지원사업 공고 실시간 파싱 완료</span>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md border border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            type="text"
            placeholder="지원사업명, 태그 또는 키워드 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary font-body-md"
          />
        </div>

        <div className="flex items-center gap-space-xs flex-wrap">
          {['ALL', '실증/PoC', 'R&D', '인증/규제', '글로벌'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-space-md py-space-xs rounded-xl font-label-md text-label-md font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              {cat === 'ALL' ? '전체 분야' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
        {filteredPrograms.map((prog: SupportProgram) => (
          <div key={prog.id} className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-md border border-outline-variant/20 flex flex-col justify-between hover:border-primary/40 transition">
            <div>
              <div className="flex items-center justify-between mb-space-xs">
                <span className="px-space-xs py-space-2xs rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold">
                  {prog.organization}
                </span>
                <span className="px-space-xs py-space-2xs rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  {prog.category}
                </span>
              </div>

              <h3 className="font-headline-sm text-headline-sm font-bold text-primary mb-space-xs">
                {prog.title}
              </h3>

              <div className="font-data-metric text-data-metric font-extrabold text-on-surface mb-space-sm">
                기업당 최대 {prog.budgetMaxMillion}만원
              </div>

              <div className="mb-space-md">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold block mb-space-2xs">
                  지원 자격 요건:
                </span>
                <ul className="list-disc list-inside text-body-sm text-on-surface-variant space-y-1">
                  {prog.eligibilityCriteria.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1 mb-space-md">
                {prog.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant text-[11px] font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-space-md border-t border-outline-variant/20 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                마감일: {prog.applicationDeadline}
              </span>
              <button
                type="button"
                className="px-space-md py-space-xs rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold hover:opacity-90 transition"
                onClick={() => alert(`[${prog.title}] 공고문 RAG 상세 파싱 페이지로 이동합니다.`)}
              >
                원문 공고문 RAG 보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
