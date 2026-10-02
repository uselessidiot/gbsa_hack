import React, { useState } from 'react';
import { MOCK_ADMIN_METRICS } from '../data/mockInsights';
import { MOCK_COMPANIES } from '../data/mockCompanies';

export const PortfolioView: React.FC = () => {
  const [filterBottleneck, setFilterBottleneck] = useState<string>('ALL');
  const metrics = MOCK_ADMIN_METRICS;

  const filteredCompanies = MOCK_COMPANIES.filter(item => {
    if (filterBottleneck === 'ALL') return true;
    return item.analysis.primaryBottleneck === filterBottleneck;
  });

  return (
    <div className="w-full px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">
            GBSA G-BRIDGE AI Admin Intelligence
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mt-space-2xs">
            12개사 관제 포트폴리오 & 도내 기업 병목 대시보드
          </h2>
        </div>
        <div className="flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
          <span>누적 {metrics.totalAnalyzedCompanies}개사 실시간 집계 완료</span>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg">
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between border border-outline-variant/20">
          <span className="font-label-md text-label-md text-on-surface-variant">총 분석 기업 수</span>
          <div className="font-data-metric text-data-metric font-black text-primary my-space-xs">
            {metrics.totalAnalyzedCompanies}<span className="font-body-md text-body-md font-normal text-on-surface-variant"> 개사</span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary font-semibold">경기도 31개 시군 커버리지 100%</span>
        </div>

        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between border border-outline-variant/20">
          <span className="font-label-md text-label-md text-on-surface-variant">T3 이상 상용화 비중</span>
          <div className="font-data-metric text-data-metric font-black text-secondary my-space-xs">
            {(((metrics.temDistribution.technology.T3 + metrics.temDistribution.technology.T4) / metrics.totalAnalyzedCompanies) * 100).toFixed(1)}%
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">168개사 T3/T4 기술 단계</span>
        </div>

        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between border border-outline-variant/20">
          <span className="font-label-md text-label-md text-on-surface-variant">최대 병목 1위 (PMF)</span>
          <div className="font-data-metric text-data-metric font-black text-error my-space-xs">
            31.5<span className="font-body-md text-body-md font-normal text-on-surface-variant">%</span>
          </div>
          <span className="font-label-sm text-label-sm text-error font-semibold">78개사 유상 첫 고객 부재</span>
        </div>

        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between border border-outline-variant/20">
          <span className="font-label-md text-label-md text-on-surface-variant">지원사업 적격 매칭률</span>
          <div className="font-data-metric text-data-metric font-black text-primary my-space-xs">
            {metrics.programMatchRatePercent}%
          </div>
          <span className="font-label-sm text-label-sm text-secondary font-semibold">142개 B2B 매칭 후보 생성</span>
        </div>
      </div>

      {/* Bottleneck Stats & Regional Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
        {/* Bottleneck Distribution */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-md border border-outline-variant/20 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-md">
              경기도 기업 9대 성장 병목 히트맵
            </h3>
            <div className="space-y-space-sm">
              {Object.entries(metrics.bottleneckStats).map(([key, count]) => {
                const percent = ((count / metrics.totalAnalyzedCompanies) * 100).toFixed(1);
                return (
                  <div key={key} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-label-sm text-label-sm">
                      <span className="font-bold text-on-surface">{key} (병목)</span>
                      <span className="text-on-surface-variant">{count}개사 ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          key === 'PMF' ? 'bg-error' : key === 'VALIDATION' ? 'bg-secondary' : 'bg-primary'
                        }`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-md border border-outline-variant/20 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-md">
              권역별 분석 기업 분포
            </h3>
            <div className="space-y-space-md">
              {Object.entries(metrics.regionalDistribution).map(([region, count]) => (
                <div key={region} className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-base">location_on</span>
                    <span className="font-label-md text-label-md font-bold text-on-surface">{region}</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm font-extrabold text-primary">{count}개사</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-space-md pt-space-sm border-t border-outline-variant/20 text-right">
            <span className="font-label-sm text-label-sm text-on-surface-variant">GBSA 판교/광교/부천 바이오·로봇 거점 중심</span>
          </div>
        </div>
      </div>

      {/* Companies List Table with Filter */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-md border border-outline-variant/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
          <div>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
              관제 포트폴리오 기업 목록 (12개사 정밀 데이터)
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              기업을 클릭하면 해당 기업의 T·E·M 진단 및 맞춤 처방 결과로 이동합니다.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-space-xs overflow-x-auto">
            {['ALL', 'PMF', 'TECH', 'REGULATION', 'VALIDATION'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterBottleneck(cat)}
                className={`px-space-sm py-space-2xs rounded-full font-label-sm text-label-sm font-semibold transition ${
                  filterBottleneck === cat
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                }`}
              >
                {cat === 'ALL' ? '전체 보기' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/40 text-on-surface-variant font-label-sm text-label-sm">
                <th className="py-space-sm px-space-md">기업명</th>
                <th className="py-space-sm px-space-md">산업 / 위치</th>
                <th className="py-space-sm px-space-md text-center">T·E·M 단계</th>
                <th className="py-space-sm px-space-md">1순위 핵심 병목</th>
                <th className="py-space-sm px-space-md">기업 희망지원</th>
                <th className="py-space-sm px-space-md">GBSA AI 최적 처방</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-body-sm text-body-sm">
              {filteredCompanies.map(({ company, analysis }) => (
                <tr key={company.id} className="hover:bg-surface-container-low transition-colors cursor-pointer">
                  <td className="py-space-md px-space-md font-bold text-primary">
                    {company.name}
                  </td>
                  <td className="py-space-md px-space-md text-on-surface-variant">
                    {company.industry} / <span className="text-xs">{company.location}</span>
                  </td>
                  <td className="py-space-md px-space-md text-center">
                    <span className="px-2 py-1 rounded bg-primary-container text-on-primary-container font-label-sm font-bold mr-1">
                      {analysis.temDiagnosis.technology.level}
                    </span>
                    <span className="px-2 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm font-bold mr-1">
                      {analysis.temDiagnosis.execution.level}
                    </span>
                    <span className="px-2 py-1 rounded bg-surface-container text-on-surface-variant font-label-sm font-bold">
                      {analysis.temDiagnosis.market.level}
                    </span>
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="px-space-xs py-space-2xs rounded bg-error-container text-on-error-container font-label-sm font-bold">
                      {analysis.primaryBottleneck}
                    </span>
                  </td>
                  <td className="py-space-md px-space-md text-on-surface-variant line-clamp-1">
                    {analysis.companyRequestedSupport[0] || '-'}
                  </td>
                  <td className="py-space-md px-space-md font-semibold text-primary">
                    {analysis.recommendedSupport[0] || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
