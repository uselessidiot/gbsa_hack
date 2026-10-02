import React, { useState } from 'react';

interface MascotWidgetProps {
  customMessage?: string;
}

export const MascotWidget: React.FC<MascotWidgetProps> = ({ customMessage }) => {
  const [motion, setMotion] = useState<'normal' | 'jump' | 'flip' | 'wave' | 'ball'>('normal');
  const [bubbleText, setBubbleText] = useState<string>(
    customMessage || '사업계획서를 올려주시면 이콤이가 10초 만에 완벽히 읽고 맞춤 지원을 찾아드려요!'
  );

  const triggerMotion = (type: 'jump' | 'flip' | 'wave' | 'ball') => {
    setMotion(type);
    if (type === 'jump') {
      setBubbleText('이콤이가 높이 점프했어요! 경기도 1등 기업으로 비상하세요!');
    } else if (type === 'flip') {
      setBubbleText('짜잔! 재주넘기로 막힌 시장 규제도 가볍게 돌파할게요!');
    } else if (type === 'wave') {
      setBubbleText('반가워요! GBSA G-브릿지 AI가 대표님의 든든한 파트너가 되어드릴게요!');
    } else if (type === 'ball') {
      setBubbleText('골인! 글로벌 시장을 향해 데이터 패스를 정확히 찔러드렸어요!');
    }

    setTimeout(() => {
      setMotion('normal');
    }, 600);
  };

  const getMotionClass = () => {
    switch (motion) {
      case 'jump':
        return '-translate-y-4 transition-transform duration-300';
      case 'flip':
        return 'rotate-180 transition-transform duration-500';
      case 'wave':
        return 'scale-125 transition-transform duration-300';
      case 'ball':
        return 'translate-x-2 transition-transform duration-300';
      default:
        return 'transition-transform duration-300 hover:scale-105';
    }
  };

  return (
    <aside className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-space-sm pointer-events-none">
      {/* Speech Bubble */}
      <div className="pointer-events-auto bg-surface-container-lowest text-on-surface p-space-md rounded-2xl shadow-xl max-w-xs transition-all duration-300 border border-surface-container">
        <div className="flex items-center gap-space-xs mb-space-2xs">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-label-sm text-label-sm font-bold text-primary">이콤 & 경이 AI 파트너</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface font-medium leading-relaxed">
          {customMessage || bubbleText}
        </p>
      </div>

      {/* Interactive Floating Card */}
      <div className="pointer-events-auto bg-surface-container-lowest/95 backdrop-blur-md p-space-sm rounded-3xl shadow-xl flex items-center gap-space-sm border border-outline-variant/20">
        <div
          className={`relative w-14 h-14 rounded-2xl bg-surface-container overflow-hidden flex items-center justify-center cursor-pointer ${getMotionClass()}`}
          onClick={() => triggerMotion('wave')}
          title="손인사 하기"
        >
          <img
            className="w-full h-full object-cover"
            alt="Official 3D rendered anime mascot characters of GBSA named Ikom and Gyeongi"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV7B44YjBj03EcmHsA1EH7JUU-zWJXgmxfLZaewc8kd3WWmCPMxanBdorrllWOZYgkRoX5X3aNjnTblVoQcyfas3JKLsjK6ivzSDW3p67pSPxyOrEoCt97aWQHH2xYYIJ7uGp3q0Y8HfyrhnCaXkBe-NgJxaCtzm8-UOEWLsCupAOKQ7XOwdImEnmfBMDIcMSkvQSESh8vwpu3QfSNA7njRCOGlYhYNrMpQUrOzTZ0KQWLEg-NGIY3"
          />
        </div>

        {/* 4 Motion Action Buttons */}
        <div className="flex items-center gap-1 pr-1">
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center transition"
            onClick={() => triggerMotion('jump')}
            title="점프"
          >
            <span className="material-symbols-outlined text-base">north</span>
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center transition"
            onClick={() => triggerMotion('flip')}
            title="재주넘기"
          >
            <span className="material-symbols-outlined text-base">replay</span>
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center transition"
            onClick={() => triggerMotion('wave')}
            title="손인사"
          >
            <span className="material-symbols-outlined text-base">waving_hand</span>
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center transition"
            onClick={() => triggerMotion('ball')}
            title="공놀이"
          >
            <span className="material-symbols-outlined text-base">sports_soccer</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
