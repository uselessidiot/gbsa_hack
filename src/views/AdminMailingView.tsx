import React, { useMemo, useState } from 'react';
import { MOCK_COMPANIES } from '../data/mockCompanies';
import { MOCK_SUPPORT_PROGRAMS } from '../data/mockPrograms';

export const AdminMailingView: React.FC = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState('COMP-001');
  const [selectedCampaign, setSelectedCampaign] = useState(0);
  const [autoSend, setAutoSend] = useState(true);
  const [sent, setSent] = useState(false);

  // 4개 기업 매칭 실시간 로그 데이터셋
  const matchingLogs = useMemo(() => [
    {
      companyId: 'COMP-001',
      companyName: '(주)비전웍스AI',
      planName: '제조AI 엣지 비전검사 솔루션 고도화',
      temLevel: 'T3 · E3 · M1',
      bottleneck: '실증·시장검증 (PMF)',
      matchedProgram: '[P001] 산업데이터 표준확산 AI 실증 지원 (최대 5,115만원)',
      channel: '알림톡 + 이메일',
      status: '열람 완료',
      statusColor: 'bg-teal-50 text-teal-700 border-teal-200',
      time: '방금 전',
      fitScore: 96,
      previewMsg: '제출해주신 「스마트공장 비전검사 사업계획서」 AI 진단 결과, 현재 직면한 「현장 실증과 첫 유상 레퍼런스 전환」에 완벽히 부합하는 GBSA 지원사업이 매칭되었습니다.'
    },
    {
      companyId: 'COMP-002',
      companyName: '(주)로보플로우',
      planName: '차세대 물류창고 자율주행 AMR 로봇',
      temLevel: 'T2 · E1 · M1',
      bottleneck: '기술 안정성 (TECH)',
      matchedProgram: '[P002] 경기도 로봇 실증 테스트베드 지원 (최대 4,000만원)',
      channel: '카카오 알림톡',
      status: '링크 확인',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
      time: '3분 전',
      fitScore: 94,
      previewMsg: '제출해주신 「물류 AMR 사업계획서」 AI 진단 결과, 연속 주행 안정성(T2) 보완과 군포 테스트베드 트랙 지원이 결합된 맞춤 지원사업이 매칭되었습니다.'
    },
    {
      companyId: 'COMP-003',
      companyName: '(주)메디헬스바이오',
      planName: '생체신호 기반 당뇨 예측 AI 웨어러블',
      temLevel: 'T3 · E3 · M1',
      bottleneck: '식약처 인허가 (REGULATION)',
      matchedProgram: '[P003] 바이오·의료기기 RA 인허가 패스트트랙 (최대 3,000만원)',
      channel: '알림톡 + 유선안내',
      status: '상담 예약',
      statusColor: 'bg-purple-50 text-purple-700 border-purple-200',
      time: '12분 전',
      fitScore: 98,
      previewMsg: '제출해주신 「당뇨 예측 AI 사업계획서」 분석 결과, 식약처 2등급 품목허가 심사 단축을 위한 GBSA 바이오센터 1:1 RA 전담 컨설팅이 배정되었습니다.'
    },
    {
      companyId: 'COMP-004',
      companyName: '(주)솔라테크',
      planName: '차세대 대면적 페로브스카이트 BIPV 모듈',
      temLevel: 'T3 · E2 · M2',
      bottleneck: '양산설비 자금 (CAPEX)',
      matchedProgram: '[P004] 경기 기후테크 100 혁신성장 펀드 & 융자 (최대 10억원)',
      channel: '알림톡 + 이메일',
      status: '발송 완료',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
      time: '28분 전',
      fitScore: 95,
      previewMsg: '제출해주신 「페로브스카이트 BIPV 사업계획서」 AI 진단 결과, 롤투롤 1m² 파일럿 양산 라인 설비 자금 조달을 위한 경기도 기후테크 녹색펀드가 매칭되었습니다.'
    }
  ], []);

  const campaigns = useMemo(() => [
    { title: '2026 제조 AI 실증 특화 패스트트랙', type: '신규 공고 자동 매칭', target: 'T3 · PMF · 제조AI', count: 78, rate: '84.6%', color: 'blue' },
    { title: 'AI 기술개발·GPU 지원 프로그램', type: '단계별 추천 매칭', target: 'T2~T4 · AI 기술개발', count: 42, rate: '88.2%', color: 'teal' },
    { title: 'M2 이상 상용화 기업 글로벌 VC 연계', type: '성장단계 진입 트리거', target: 'M2 이상 · 투자/글로벌', count: 22, rate: '91.0%', color: 'indigo' },
  ], []);

  // 현재 선택된 기업의 매칭 로그
  const activeLog = matchingLogs.find((l) => l.companyId === selectedCompanyId) || matchingLogs[0];
  const activeCompany = MOCK_COMPANIES.find((c) => c.company.id === selectedCompanyId)?.company || MOCK_COMPANIES[0].company;

  return (
    <div className="max-w-[1500px] mx-auto space-y-6 animate-fadeIn pb-12">
      {/* 1. Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-7 md:p-9 shadow-xl relative overflow-hidden border border-blue-500/20">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-200 text-xs font-bold mb-3">
              <span className="material-symbols-outlined text-sm">bolt</span>
              AI REAL-TIME MATCHING & AUTOMATION HUB
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
              사업계획서 데이터 기반<br />
              실시간 AI 맞춤 공고 자동 발송 관제
            </h1>
            <p className="text-sm text-blue-100/80 mt-2 max-w-2xl leading-relaxed">
              기업이 사업계획서를 업로드하면 <strong>Gemini AI가 T·E·M 성장단계와 핵심 병목을 3초 만에 진단</strong>하여, 
              스팸성 대량 발송 대신 적합도 90% 이상의 최적 공고를 카카오 알림톡으로 1:1 자동 매칭·발송합니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-bold text-white transition active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">tune</span>
              자동 발송 룰 설정
            </button>
            <button
              type="button"
              className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-extrabold shadow-lg transition active:scale-95 flex items-center gap-2"
              onClick={() => setSent(true)}
            >
              <span className="material-symbols-outlined text-base">add_task</span>
              새 지원사업 공고 등록
            </button>
          </div>
        </div>

        {/* 4 Mini KPI Chips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          {[
            ['사업계획서 실시간 자동 매칭', '1,923건', '100% 무인 자동화', 'outgoing_mail'],
            ['초개인화 공고 오픈율', '84.6%', '일반 공고 대비 +57.4%p', 'ads_click'],
            ['공공 행정 타겟팅 시간 절감', '138시간/월', '수작업 기업 선별 제로', 'schedule'],
            ['지원사업 실제 접수 전환율', '31.2%', '적합 기업 매칭 효과', 'how_to_reg'],
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

      {/* 🌟 2. [CORE MAIN FOCUS - TOP ELEVATED] Realtime Business Plan Analysis & 1:1 Matching Stream + Live Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Realtime Business Plan Analysis -> 1:1 Matching Stream Table */}
        <div className="xl:col-span-8 bg-surface-container-lowest rounded-3xl p-space-xl border-2 border-primary/30 shadow-xl flex flex-col gap-space-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm border-b border-outline-variant/20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  실시간 LIVE 매칭 스트림
                </span>
                <span className="text-xs text-on-surface-variant font-medium">기업 업로드 즉시 자동 파싱</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-on-surface tracking-tight">
                실시간 사업계획서 분석 → 추천 공고 1:1 매칭 현황
              </h2>
              <p className="text-xs md:text-sm text-on-surface-variant mt-1">
                기업이 제출한 사업계획서 원문을 Gemini가 실시간 분석하여 적합 공고를 즉시 1:1 매칭·발송합니다. 
                <span className="text-primary font-bold ml-1">(기업 행을 클릭하면 우측에 실시간 수신 화면이 연동됩니다)</span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1.5 rounded-xl bg-surface-container text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-primary">sync</span>
                실시간 연동 중
              </span>
            </div>
          </div>

          {/* High-Impact Interactive Matching Log Cards / Table */}
          <div className="space-y-3">
            {matchingLogs.map((log) => {
              const isSelected = selectedCompanyId === log.companyId;
              return (
                <div
                  key={log.companyId}
                  onClick={() => setSelectedCompanyId(log.companyId)}
                  className={`p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 text-left ${
                    isSelected
                      ? 'border-primary bg-primary-container/20 shadow-md scale-[1.01]'
                      : 'border-outline-variant/30 bg-surface-container-low hover:border-primary/40 hover:bg-surface-container-low/80'
                  }`}
                >
                  {/* Left: Company & Business Plan */}
                  <div className="flex items-start gap-3 min-w-[200px]">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-sm shadow-sm ${
                      isSelected ? 'bg-primary text-white' : 'bg-surface-container-highest text-primary'
                    }`}>
                      {log.companyName.includes('비전') ? '01' : log.companyName.includes('로보') ? '02' : log.companyName.includes('메디') ? '03' : '04'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-on-surface text-sm md:text-base">{log.companyName}</h4>
                        <span className="text-[10px] text-on-surface-variant font-medium">{log.time}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">{log.planName}</p>
                    </div>
                  </div>

                  {/* Middle: AI Diagnostic (TEM + Bottleneck) */}
                  <div className="min-w-[170px] bg-surface-container-lowest/80 px-3 py-2 rounded-xl border border-outline-variant/20">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-primary">{log.temLevel}</span>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-primary/10 text-primary">적합도 {log.fitScore}%</span>
                    </div>
                    <span className="text-[11px] font-bold text-error block mt-0.5">병목: {log.bottleneck}</span>
                  </div>

                  {/* Right: Matched Program & Status */}
                  <div className="flex items-center justify-between md:justify-end gap-3 min-w-[240px]">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-primary font-extrabold uppercase tracking-wide block">자동 매칭 공고</span>
                      <span className="text-xs font-bold text-on-surface block truncate max-w-[180px]">{log.matchedProgram}</span>
                      <span className="text-[10px] text-on-surface-variant">{log.channel}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold border shrink-0 ${log.statusColor}`}>
                      {log.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Automation Assurance Box */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2 text-on-surface-variant font-medium">
              <span className="material-symbols-outlined text-secondary text-base">verified</span>
              <span>KISA 보안망 준수 · 기업 사업계획서 동의 기반 100% 자동 타겟팅</span>
            </div>
            <div className="flex items-center gap-3 font-bold text-primary">
              <span>오늘 발송된 맞춤 알림톡: <strong>142건</strong></span>
              <span>|</span>
              <span>미열람 재알림: <strong>자동 스케줄링 가동 중</strong></span>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Live Interactive Kakao Notification Preview & Controller */}
        <div className="xl:col-span-4 space-y-5">
          {/* Real-time Personalized Preview Card */}
          <section className="bg-surface-container-lowest rounded-3xl border-2 border-secondary/30 p-space-lg shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20 mb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    기업 수신 실시간 프리뷰
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-extrabold">
                  1:1 초개인화 엔진
                </span>
              </div>

              {/* Toss / Kakao Mobile Message Mockup */}
              <div className="rounded-2xl bg-surface-container-high/40 p-3.5 border border-outline-variant/30">
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-md p-4 space-y-3 text-left">
                  {/* Sender Header */}
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                      <span className="w-6 h-6 rounded-lg bg-primary text-white text-xs font-black flex items-center justify-center">G</span>
                      <span>GBSA 경기경제과학원 (알림톡)</span>
                    </div>
                    <span className="text-[10px] text-on-surface-variant font-medium">공식 인증마크 ✓</span>
                  </div>

                  {/* Message Body */}
                  <div>
                    <span className="text-xs font-bold text-primary block">[{activeCompany.name}] 맞춤 공고 안내</span>
                    <p className="text-xs text-on-surface leading-relaxed mt-1 font-medium">
                      {activeLog.previewMsg}
                    </p>
                  </div>

                  {/* Matched Program Badge Box */}
                  <div className="p-3 rounded-xl bg-primary-container/20 border border-primary/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-primary text-white">AI 적합도 {activeLog.fitScore}% 매칭</span>
                      <span className="text-[10px] font-bold text-secondary">GBSA 우선지원 대상</span>
                    </div>
                    <h4 className="text-xs font-extrabold text-on-surface leading-snug">{activeLog.matchedProgram}</h4>
                    <p className="text-[10px] text-on-surface-variant mt-1">
                      진단 성숙도: {activeLog.temLevel} | 해결 병목: {activeLog.bottleneck}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => setSent(true)}
                    className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white text-xs font-bold shadow-md transition active:scale-95 flex items-center justify-center gap-1"
                  >
                    <span>공고 상세 확인 및 1클릭 접수</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-on-surface-variant mt-3 text-center">
                {sent ? '✅ 발송 테스트가 성공적으로 처리되었습니다.' : '기업별 사업계획서 분석 데이터에 맞춰 자동 생성된 메시지입니다.'}
              </p>
            </div>
          </section>

          {/* Admin Control Settings */}
          <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-space-lg shadow-md space-y-4 text-left">
            <h4 className="font-bold text-on-surface text-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-primary">admin_panel_settings</span>
              담당자 자동화 제어 (Automation Rules)
            </h4>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <div>
                <b className="text-xs text-on-surface block">AI 무인 자동 발송 모드</b>
                <span className="text-[10px] text-on-surface-variant">공고 승인 시 즉시 적격 기업 발송</span>
              </div>
              <button
                type="button"
                onClick={() => setAutoSend(!autoSend)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors ${autoSend ? 'bg-primary' : 'bg-outline-variant'}`}
              >
                <span className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${autoSend ? 'translate-x-5' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <div>
                <b className="text-xs text-on-surface block">부적격 공고 자동 차단 필터</b>
                <span className="text-[10px] text-on-surface-variant">T/E/M 미달 및 미부합 사업 스팸 방지</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-extrabold">
                차단 가동 중
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                className="py-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container text-xs font-bold text-on-surface transition active:scale-95 flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm text-primary">download</span>
                발송 로그 엑셀
              </button>
              <button
                type="button"
                className="py-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container text-xs font-bold text-on-surface transition active:scale-95"
              >
                기업별 이력 조회
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* 3. Lower Section: Ongoing Marketing Campaign Pipelines */}
      <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-space-xl shadow-md text-left">
        <div className="flex items-center justify-between mb-space-md">
          <div>
            <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wide">
              공고별 홍보 현황
            </span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">
              실시간 가동 중인 자동 홍보 캠페인 파이프라인
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary-container text-primary text-xs font-bold">
            3개 파이프라인 활성 가동
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {campaigns.map((item, index) => (
            <button
              type="button"
              key={item.title}
              onClick={() => setSelectedCampaign(index)}
              className={`text-left rounded-2xl border-2 p-space-md transition-all ${
                selectedCampaign === index
                  ? 'border-primary bg-primary-container/15 shadow-md'
                  : 'border-outline-variant/30 bg-surface-container-low hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-surface-container-highest text-primary">
                  {item.type}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                  발송 완료
                </span>
              </div>
              <h4 className="font-bold text-on-surface text-sm mb-3 line-clamp-1">{item.title}</h4>

              <div className="grid grid-cols-2 gap-2 bg-surface-container-lowest p-2.5 rounded-xl border border-outline-variant/20 mb-2">
                <div>
                  <span className="text-[10px] text-on-surface-variant block">자동 발송 대상</span>
                  <span className="text-xs font-extrabold text-on-surface">{item.count}개 기업</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">오픈/전환율</span>
                  <span className="text-xs font-extrabold text-secondary">{item.rate}</span>
                </div>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                타겟 조건: <strong className="text-primary">{item.target}</strong>
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

