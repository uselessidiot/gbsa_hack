import React, { useState, useMemo } from 'react';
import { MOCK_COMPANIES } from '../data/mockCompanies';

interface CompanyPerformanceData {
  companyId: string;
  name: string;
  industryTag: string;
  industryColor: string;
  bizNumber: string;
  ceo: string;
  foundedYear: string;
  location: string;
  department: string;
  period: string;
  budget: string;
  budgetRate: string;
  manager: string;
  managerStatus: string;
  kpis: {
    achievementRate: string;
    achievementGrade: string;
    revenue: string;
    revenueGrowth: string;
    jobs: string;
    jobsRate: string;
    totalEmployees: number;
    ipCount: string;
    ipNote: string;
    funding: string;
    export: string;
  };
  yearlyComparison: Array<{
    category: string;
    y1: { target: string; actual: string; rate?: string };
    y2: { target: string; actual: string; rate?: string };
    y3: { target: string; actual: string; rate?: string };
    totalRate: string;
  }>;
  kpiTable: Array<{
    name: string;
    target: string;
    actual: string;
    rate: string;
    document: string;
    status: '승인 완료' | '검토 대기' | '보완 요청';
    statusColor: string;
    verifiedDate: string;
  }>;
  aiComment: string;
  healthIndex: string;
  retentionRate: string;
  historyTimeline: Array<{
    title: string;
    date: string;
    desc: string;
  }>;
}

export const AdminPerformanceView: React.FC = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('COMP-001');
  const [activeSubTab, setActiveSubTab] = useState<string>('overall');
  const [memoText, setMemoText] = useState(
    '3분기 정기 보고 서류 접수 완료. 수출실적 검증 결과 목표 초과 확인됨. 신규 채용 12명 4대보험 명부 서류 검토 완료 후 최종 승인 처리 예정. 4분기 글로벌 IR 연계 프로그램 추천 등록 준비.'
  );

  const performanceDb: Record<string, CompanyPerformanceData> = {
    'COMP-001': {
      companyId: 'COMP-001',
      name: '(주)비전웍스AI',
      industryTag: '제조 AI · 엣지 비전검사',
      industryColor: 'bg-blue-100 text-blue-800',
      bizNumber: '124-81-99218',
      ceo: '김태영',
      foundedYear: '2021.03 (업력 5년차)',
      location: '경기도 성남시 분당구 판교역로 166',
      department: '스마트제조혁신본부',
      period: '2024.04 ~ 2026.12',
      budget: '3.5억원',
      budgetRate: '88.6%',
      manager: '홍길동 대리',
      managerStatus: '정상',
      kpis: {
        achievementRate: '115.4%',
        achievementGrade: '종합 A등급',
        revenue: '54.0 억원',
        revenueGrowth: '▲ 64.6% 순증 (전년 32.8억)',
        jobs: '+12 명',
        jobsRate: '150% 달성',
        totalEmployees: 26,
        ipCount: '4 건 등록',
        ipNote: '특허출원 2건 추가',
        funding: '25.0 억원 투자 (시리즈 A)',
        export: '직수출 12.4억원 달성 (일본·베트남)'
      },
      yearlyComparison: [
        { category: '매출액 (억원)', y1: { target: '20.0', actual: '21.2' }, y2: { target: '35.0', actual: '32.8' }, y3: { target: '47.0', actual: '54.0' }, totalRate: '114.9%' },
        { category: '신규고용 (명)', y1: { target: '+4', actual: '+5' }, y2: { target: '+6', actual: '+7' }, y3: { target: '+8', actual: '+12' }, totalRate: '133.3%' },
        { category: 'R&D 투자 (억원)', y1: { target: '3.0', actual: '3.4' }, y2: { target: '5.5', actual: '6.1' }, y3: { target: '7.0', actual: '7.8' }, totalRate: '111.4%' },
        { category: '지식재산권 (건)', y1: { target: '1', actual: '1' }, y2: { target: '1', actual: '2' }, y3: { target: '2', actual: '4' }, totalRate: '175.0%' },
      ],
      kpiTable: [
        { name: '국내 매출액', target: '35.0억원', actual: '41.6억원', rate: '118.8%', document: '부가세과세표준증명원', status: '승인 완료', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', verifiedDate: '2026.09.28' },
        { name: '해외 직수출액', target: '12.0억원', actual: '12.4억원', rate: '103.3%', document: '수출실적증명서', status: '승인 완료', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', verifiedDate: '2026.09.28' },
        { name: '신규 정규직 채용', target: '+8명', actual: '+12명', rate: '150.0%', document: '4대보험 가입자명부', status: '검토 대기', statusColor: 'bg-amber-50 text-amber-700 border-amber-200', verifiedDate: '2026.10.02' },
        { name: '신규 지식재산권', target: '2건', actual: '4건 (특허)', rate: '200.0%', document: '특허등록증 사본', status: '승인 완료', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', verifiedDate: '2026.09.20' },
        { name: '시제품 상용화 판정', target: '1종 출시', actual: 'AI검사기 2종', rate: '200.0%', document: '공인시험성적서', status: '승인 완료', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', verifiedDate: '2026.07.15' },
      ],
      aiComment: '\"(주)비전웍스AI는 스마트 제조 AI 비전 솔루션 부문의 동남아·일본 직수출 판로 개척(12.4억원) 성공으로 연간 매출 및 고용 목표를 조기 초과 달성(+15.4%p)하였습니다. 신규 연구인력 12명 순증으로 R&D 기반 역량이 대폭 강화되었으며, 3분기 원자재 수급에 따른 단기 영업이익률 변동 추이를 지속 모니터링할 것을 권고합니다. 차년도 「글로벌 유니콘 스케일업 육성사업」 우선 연계 추천 대상으로 적합합니다.\"',
      healthIndex: '94.2점 (최우수)',
      retentionRate: '96.8%',
      historyTimeline: [
        { title: '2차년도 중간 현장 실태조사', date: '2026.08.15', desc: '판교 R&D 연구소 및 생산라인 현장 실사. 연구장비 정상 가동 및 협약내용 충실 이행 (조사자: 홍길동 대리, 판정: 적합).' },
        { title: '1차년도 성과평가 및 최종 정산', date: '2026.04.10', desc: '1차년도 사업비 정산 검증 완료(불인정 금액 0원), 성과평가 우수등급 판정 및 2차년도 계속지원 확정.' },
        { title: '중간 모니터링 및 애로사항 컨설팅', date: '2025.10.12', desc: '바이오 전문 연구인력 채용 애로 해소를 위해 경기도 청년연구원 매칭 프로그램 우선 연계 지원.' },
      ]
    },
    'COMP-002': {
      companyId: 'COMP-002',
      name: '(주)로보플로우',
      industryTag: '로봇 · 물류 자율주행 AMR',
      industryColor: 'bg-indigo-100 text-indigo-800',
      bizNumber: '215-86-33109',
      ceo: '박진우',
      foundedYear: '2022.05 (업력 4년차)',
      location: '경기도 부천시 원미구 평천로 655',
      department: '미래모빌리티육성팀',
      period: '2024.06 ~ 2026.12',
      budget: '2.8억원',
      budgetRate: '75.0%',
      manager: '홍길동 대리',
      managerStatus: '정상',
      kpis: {
        achievementRate: '108.2%',
        achievementGrade: '종합 A등급',
        revenue: '28.5 억원',
        revenueGrowth: '▲ 82.4% 순증 (전년 15.6억)',
        jobs: '+8 명',
        jobsRate: '133% 달성',
        totalEmployees: 18,
        ipCount: '3 건 등록',
        ipNote: 'ISO 3691-4 안전규격 획득',
        funding: '15.0 억원 투자 (Pre-A)',
        export: '직수출 4.8억원 달성 (미국·싱가포르)'
      },
      yearlyComparison: [
        { category: '매출액 (억원)', y1: { target: '10.0', actual: '10.5' }, y2: { target: '18.0', actual: '15.6' }, y3: { target: '25.0', actual: '28.5' }, totalRate: '104.7%' },
        { category: '신규고용 (명)', y1: { target: '+3', actual: '+3' }, y2: { target: '+4', actual: '+5' }, y3: { target: '+6', actual: '+8' }, totalRate: '123.1%' },
        { category: 'R&D 투자 (억원)', y1: { target: '2.0', actual: '2.2' }, y2: { target: '3.5', actual: '3.8' }, y3: { target: '4.5', actual: '4.9' }, totalRate: '108.9%' },
        { category: '지식재산권 (건)', y1: { target: '1', actual: '1' }, y2: { target: '1', actual: '1' }, y3: { target: '2', actual: '3' }, totalRate: '125.0%' },
      ],
      kpiTable: [
        { name: '물류 AMR 납품 실적', target: '20대', actual: '24대', rate: '120.0%', document: '세금계산서 및 납품확인서', status: '승인 완료', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', verifiedDate: '2026.09.25' },
        { name: '안전인증 획득', target: 'ISO 3691-4', actual: '인증 획득 완료', rate: '100.0%', document: 'KTL 인증서 사본', status: '승인 완료', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', verifiedDate: '2026.08.30' },
        { name: '24시간 무정지 실증', target: '1,000시간', actual: '1,250시간 무오류', rate: '125.0%', document: '군포 테스트베드 로그', status: '승인 완료', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', verifiedDate: '2026.09.10' },
      ],
      aiComment: '\"(주)로보플로우는 군포 스마트물류 테스트베드 24시간 실증을 바탕으로 대기업 물류센터 납품 계약을 성공적으로 체결하였습니다. ISO 3691-4 안전 인증 획득으로 북미 수출 통관 리스크가 해소되었으며, 차년도 양산 설비 투자를 위한 경기 기후·로봇 펀드 추천을 권고합니다.\"',
      healthIndex: '91.8점 (우수)',
      retentionRate: '94.2%',
      historyTimeline: [
        { title: '군포 테스트베드 현장 실사', date: '2026.07.20', desc: '군포 복합물류센터 내 24시간 무정지 주행 실증 로그 확인 및 안전센서 반응 검증 (판정: 적합).' }
      ]
    },
    'COMP-003': {
      companyId: 'COMP-003',
      name: '(주)메디헬스바이오',
      industryTag: '바이오/헬스 · AI 진단기기',
      industryColor: 'bg-purple-100 text-purple-800',
      bizNumber: '138-87-44512',
      ceo: '최서연',
      foundedYear: '2020.11 (업력 6년차)',
      location: '경기도 수원시 영통구 광교바이오밸리 401호',
      department: '바이오산업본부',
      period: '2024.01 ~ 2026.12',
      budget: '4.0억원',
      budgetRate: '92.0%',
      manager: '홍길동 대리',
      managerStatus: '정상',
      kpis: {
        achievementRate: '112.0%',
        achievementGrade: '종합 A등급',
        revenue: '38.0 억원',
        revenueGrowth: '▲ 45.0% 순증',
        jobs: '+10 명',
        jobsRate: '125% 달성',
        totalEmployees: 22,
        ipCount: '6 건 등록',
        ipNote: '식약처 2등급 품목허가 승인',
        funding: '30.0 억원 투자 (시리즈 A)',
        export: '직수출 8.5억원 달성'
      },
      yearlyComparison: [
        { category: '매출액 (억원)', y1: { target: '15.0', actual: '16.0' }, y2: { target: '25.0', actual: '26.2' }, y3: { target: '35.0', actual: '38.0' }, totalRate: '107.1%' },
        { category: '신규고용 (명)', y1: { target: '+4', actual: '+4' }, y2: { target: '+6', actual: '+7' }, y3: { target: '+8', actual: '+10' }, totalRate: '116.7%' },
      ],
      kpiTable: [
        { name: '식약처 품목허가', target: '2등급 인허가', actual: '허가증 발급 완료', rate: '100.0%', document: '식품의약품안전처 허가증', status: '승인 완료', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', verifiedDate: '2026.09.15' },
        { name: '국내 대학병원 공급', target: '3개 병원', actual: '4개 병원 공급 계약', rate: '133.3%', document: '의료기기 납품 계약서', status: '승인 완료', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', verifiedDate: '2026.09.20' },
      ],
      aiComment: '\"(주)메디헬스바이오는 GBSA 바이오센터 RA 전담관 매칭을 통해 식약처 2등급 품목허가를 3개월 조기 획득하며 주요 상급종합병원 공급을 개시했습니다. 향후 미국 FDA 510(k) 인증을 위한 해외 임상 연계 지원이 유망합니다.\"',
      healthIndex: '93.5점 (우수)',
      retentionRate: '95.0%',
      historyTimeline: [
        { title: '광교 바이오센터 현장 방문', date: '2026.08.10', desc: '의료기기 GMP 제조시설 실사 및 품질책임자 인터뷰 완료 (판정: 적합).' }
      ]
    },
    'COMP-004': {
      companyId: 'COMP-004',
      name: '(주)솔라테크',
      industryTag: '에너지 · 페로브스카이트 BIPV',
      industryColor: 'bg-amber-100 text-amber-800',
      bizNumber: '142-88-12903',
      ceo: '정우진',
      foundedYear: '2021.08 (업력 5년차)',
      location: '경기도 안산시 단원구 시화스마트허브 2단지',
      department: '기후테크육성팀',
      period: '2024.03 ~ 2026.12',
      budget: '3.0억원',
      budgetRate: '80.0%',
      manager: '홍길동 대리',
      managerStatus: '정상',
      kpis: {
        achievementRate: '105.8%',
        achievementGrade: '종합 A등급',
        revenue: '22.0 억원',
        revenueGrowth: '▲ 60.0% 순증',
        jobs: '+7 명',
        jobsRate: '116% 달성',
        totalEmployees: 16,
        ipCount: '5 건 등록',
        ipNote: 'KS C 8577 인증 진행',
        funding: '20.0 억원 투자',
        export: '직수출 3.2억원 달성'
      },
      yearlyComparison: [
        { category: '매출액 (억원)', y1: { target: '8.0', actual: '8.5' }, y2: { target: '14.0', actual: '13.8' }, y3: { target: '20.0', actual: '22.0' }, totalRate: '104.8%' },
      ],
      kpiTable: [
        { name: 'BIPV 시제품 효율', target: '21.0% 이상', actual: '22.4% 달성', rate: '106.7%', document: 'KCL 시험성적서', status: '승인 완료', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', verifiedDate: '2026.08.20' },
        { name: 'KS 인증 시험', target: 'KS C 8577', actual: '내화성능 통과', rate: '90.0%', document: '중간 시험결과서', status: '검토 대기', statusColor: 'bg-amber-50 text-amber-700 border-amber-200', verifiedDate: '2026.09.28' },
      ],
      aiComment: '\"(주)솔라테크는 롤투롤 연속 양산 공정 구축을 통해 페로브스카이트 BIPV 모듈 효율 22.4%를 달성했습니다. KS C 8577 인증 완료 시 도내 공공건축물 제로에너지빌딩 납품이 본격화될 것으로 예상됩니다.\"',
      healthIndex: '90.4점 (우수)',
      retentionRate: '92.5%',
      historyTimeline: [
        { title: '시화스마트허브 파일럿 라인 실사', date: '2026.07.15', desc: '대면적 롤투롤 코팅 장비 가동 상태 및 불량률 검증 (판정: 적합).' }
      ]
    }
  };

  const current = performanceDb[selectedCompanyId] || performanceDb['COMP-001'];

  return (
    <div className="max-w-[1500px] mx-auto space-y-6 animate-fadeIn pb-12 text-left">
      {/* 1. Breadcrumb & Company Selector Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>성과 관리</span>
          <span className="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
          <span>지원기업 성과 관리</span>
          <span className="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
          <strong className="text-slate-900 font-bold">{current.name} 성과관리 상세</strong>
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-black">
            협약 3년차
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Company Selector Dropdown */}
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-800 shadow-sm outline-none focus:border-blue-600"
          >
            {MOCK_COMPANIES.map((c) => (
              <option key={c.company.id} value={c.company.id}>
                {c.company.name} ({c.company.industry})
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => alert(`${current.name}의 사업자등록 정보 및 기업 기본현황 모달을 엽니다.`)}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            기업 기본정보
          </button>

          <button
            type="button"
            onClick={() => alert(`${current.name} 담당자에게 카카오 알림톡 및 정기 공문이 발송되었습니다.`)}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">send</span>
            공문·알림톡 발송
          </button>

          <button
            type="button"
            onClick={() => alert(`${current.name}의 3분기 성과보고서 PDF가 다운로드되었습니다.`)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm text-slate-500">download</span>
            성과보고서 다운로드
          </button>
        </div>
      </div>

      {/* 2. Selected Company Overview Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-2xl">eco</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {current.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold border border-emerald-200">
                ● 우수성장기업
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                스마트제조 육성사업 수혜
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                사후관리 집중대상
              </span>
            </div>

            <p className="text-xs font-bold text-blue-600">
              {current.industryTag}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
              <span>사업자등록번호: <strong>{current.bizNumber}</strong></span>
              <span>대표자: <strong>{current.ceo}</strong></span>
              <span>설립: <strong>{current.foundedYear}</strong></span>
              <span>소재지: <strong>{current.location}</strong></span>
            </div>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="xl:border-l xl:border-slate-200 xl:pl-6 grid grid-cols-2 gap-x-6 gap-y-2 text-xs shrink-0 bg-slate-50 p-4 rounded-xl xl:bg-transparent xl:p-0">
          <div>
            <span className="text-slate-400 block text-[11px]">주관사업부서</span>
            <strong className="text-slate-900 font-bold mt-0.5 block">{current.department}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">협약 기간</span>
            <strong className="text-slate-900 font-bold mt-0.5 block">{current.period}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">협약지원금 (집행률)</span>
            <strong className="text-blue-600 font-black mt-0.5 block">{current.budget} ({current.budgetRate})</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">전담 매니저</span>
            <strong className="text-slate-900 font-bold mt-0.5 block">{current.manager} <span className="text-emerald-600 text-[10px]">({current.managerStatus})</span></strong>
          </div>
        </div>
      </div>

      {/* 3. 5 Core Performance KPI Cards (Exactly matching screenshot) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-600">종합 협약 목표 달성도</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black">
              {current.kpis.achievementGrade}
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-blue-600">{current.kpis.achievementRate}</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">▲ 15.4%p 초과 달성 <span className="text-slate-400 font-normal">목표 100%</span></div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-600">당해연도 총 매출실적</span>
            <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[10px] font-black">
              114.9%
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{current.kpis.revenue}</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">{current.kpis.revenueGrowth}</div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-600">신규 일자리 순증 (고용)</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black">
              {current.kpis.jobsRate}
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-600">{current.kpis.jobs}</div>
            <div className="text-[11px] text-slate-500 mt-1">총 고용원수 {current.kpis.totalEmployees}명 · <span className="text-slate-400">협약목표 8명</span></div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-600">지식재산권 및 녹색인증</span>
            <span className="px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 text-[10px] font-black">
              초과 확보
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{current.kpis.ipCount}</div>
            <div className="text-[11px] text-purple-700 font-bold mt-1">{current.kpis.ipNote} · <span className="text-slate-400 font-normal">협약목표 2건</span></div>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-600">해외수출 및 투자유치</span>
            <span className="px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 text-[10px] font-black">
              시리즈 A
            </span>
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{current.kpis.funding}</div>
            <div className="text-[11px] text-blue-600 font-bold mt-1">{current.kpis.export}</div>
          </div>
        </div>
      </div>

      {/* 4. Sub Navigation Tabs (Matching Screenshot) */}
      <div className="flex items-center gap-4 border-b border-slate-200 text-xs font-bold text-slate-500 overflow-x-auto">
        {[
          ['overall', '종합 성과 대시보드 ●'],
          ['finance', '분기별 매출·재무 검증'],
          ['jobs', '고용·4대보험 실적'],
          ['milestone', '협약 마일스톤 이행'],
          ['evidence', '정기 증빙 서류함 D-7'],
          ['audit', '현장 실태조사 및 지도이력'],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveSubTab(key)}
            className={`pb-3 px-1 transition-all shrink-0 border-b-2 ${
              activeSubTab === key
                ? 'border-blue-600 text-blue-600 font-black'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 5. 2-Column Main Dashboard Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left (8 cols): 3-Year Comparison Table & 2026 Q3 KPI Table & AI Comprehensive Diagnostic */}
        <div className="xl:col-span-8 space-y-6">
          {/* Section A: 3개년 협약 목표 vs 실적 추이 비교 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                3개년 협약 목표 vs 실적 추이 비교
              </h2>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span>협약목표
                </span>
                <span className="flex items-center gap-1 text-blue-600 font-bold">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>달성실적
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-lg">구분</th>
                    <th className="py-2.5 px-3">2024년 (1차년도)</th>
                    <th className="py-2.5 px-3">2025년 (2차년도)</th>
                    <th className="py-2.5 px-3 bg-blue-50/70 text-blue-900">2026년 (현재 3차년도)</th>
                    <th className="py-2.5 px-3 rounded-r-lg text-right">전체 누적 달성률</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {current.yearlyComparison.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-900">{row.category}</td>
                      <td className="py-3 px-3">
                        <span className="text-slate-400">목표 {row.y1.target}</span> / <strong className="text-slate-800">실적 {row.y1.actual}</strong>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-slate-400">목표 {row.y2.target}</span> / <strong className="text-slate-800">실적 {row.y2.actual}</strong>
                      </td>
                      <td className="py-3 px-3 bg-blue-50/40">
                        <span className="text-blue-900/60 font-semibold">목표 {row.y3.target}</span> / <strong className="text-blue-700 font-black">실적 {row.y3.actual}</strong>
                      </td>
                      <td className="py-3 px-3 text-right font-black text-emerald-600">
                        {row.totalRate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section B: 2026년 3분기 핵심 성과지표(KPI) 상세 이행 및 검증 현황 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h2 className="font-black text-slate-900 text-sm">
                  2026년 3분기 핵심 성과지표(KPI) 상세 이행 및 검증 현황
                </h2>
              </div>
              <span className="text-xs text-slate-400">기준시점: 2026년 9월 30일</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold">
                  <tr>
                    <th className="py-2.5 px-3">지표명</th>
                    <th className="py-2.5 px-3">협약 기준 목표</th>
                    <th className="py-2.5 px-3">현재 달성 실적</th>
                    <th className="py-2.5 px-3">달성률</th>
                    <th className="py-2.5 px-3">제출 증빙서류</th>
                    <th className="py-2.5 px-3">검증 상태</th>
                    <th className="py-2.5 px-3 text-right">최종 검증일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {current.kpiTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        {row.name}
                      </td>
                      <td className="py-3 px-3 text-slate-500">{row.target}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{row.actual}</td>
                      <td className="py-3 px-3 font-black text-emerald-600">{row.rate}</td>
                      <td className="py-3 px-3 text-slate-500">{row.document}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${row.statusColor}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right text-slate-400">{row.verifiedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section C: GBSA 성과 AI 종합 진단 및 분석 코멘트 */}
          <div className="bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 rounded-2xl border border-blue-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-xs">
                  AI
                </span>
                <h3 className="font-black text-slate-900 text-sm">
                  GBSA 성과 AI 종합 진단 및 분석 코멘트
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
                초격차 성장 판정
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-blue-100">
              {current.aiComment}
            </p>

            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-blue-100 text-xs">
              <div className="flex items-center gap-4 text-slate-600">
                <span>성장 건전성 지수: <strong className="text-blue-700">{current.healthIndex}</strong></span>
                <span>고용유지율: <strong className="text-emerald-700">{current.retentionRate}</strong></span>
              </div>
              <button
                type="button"
                onClick={() => alert(`${current.name}의 상세 AI 진단보고서 PDF 생성이 완료되었습니다.`)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                상세 AI 진단보고서 생성 (PDF) →
              </button>
            </div>
          </div>
        </div>

        {/* Right (4 cols): Approval Workflow & Audit History Timeline & Manager Notes */}
        <div className="xl:col-span-4 space-y-5">
          {/* Card 1: 3분기 정기 증빙 제출 & 검증 워크플로우 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                3분기 정기 증빙 제출 & 검증 워크플로우
              </h3>
              <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-black border border-rose-200">
                마감 D-7 (10.09)
              </span>
            </div>

            {/* Document Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">3분기 정기 실적보고서 (공문서식)</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">제출일: 2026.10.01 14:22 · report.pdf (4.8MB)</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                  승인 대기
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => alert('3분기 실적보고서가 최종 승인 처리되었습니다.')}
                  className="col-span-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm"
                >
                  검증 및 최종승인
                </button>
                <button
                  type="button"
                  onClick={() => alert('기업 담당자에게 보완요청 알림톡이 발송되었습니다.')}
                  className="py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-300 transition"
                >
                  보완요청
                </button>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2 text-xs">
              {[
                ['부가세과세표준증명원', '국세청 홈택스 전자대사 일치 완료 (매출 54.0억)', '검증완료', 'text-emerald-700 bg-emerald-50'],
                ['4대사회보험 사업장 가입자명부', '신규 12명 가입 확인 완료 (상시근로 26명)', '서류확인', 'text-blue-700 bg-blue-50'],
                ['기술이전 및 특허등록증 사본 (2건)', '특허청 등록원부 진위확인 완료', '검증완료', 'text-emerald-700 bg-emerald-50'],
              ].map(([title, note, badge, badgeColor]) => (
                <div key={title} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">{title}</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">{note}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${badgeColor}`}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: 사후관리 및 현장 실태조사 이력 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-sm">
                사후관리 및 현장 실태조사 이력
              </h3>
              <button
                type="button"
                onClick={() => alert('신규 실태조사 등록 팝업을 엽니다.')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                + 신규 실태조사 등록
              </button>
            </div>

            <div className="space-y-3">
              {current.historyTimeline.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 font-bold">{item.title}</strong>
                      <span className="text-[10px] text-slate-400">{item.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: 전담 매니저 사후관리 소견 및 연계조치 메모장 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-blue-600">edit_note</span>
                전담 매니저 사후관리 소견 및 연계조치
              </h3>
              <span className="text-[10px] text-slate-400">작성자: {current.manager}</span>
            </div>

            <textarea
              rows={4}
              value={memoText}
              onChange={(e) => setMemoText(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 outline-none focus:border-blue-600 leading-relaxed"
            />

            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => alert(`${current.name}에 대한 후속 연계지원사업 추천이 등록되었습니다.`)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                + 후속 연계지원사업 추천 등록
              </button>
              <button
                type="button"
                onClick={() => alert('사후관리 메모가 안전하게 저장되었습니다.')}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition"
              >
                실태조사 메모 저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
