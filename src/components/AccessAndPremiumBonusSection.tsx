import React, { useId } from 'react';
import {
  Layers,
  CloudDownload,
  CheckCircle2,
  VideoOff,
  SquarePen,
  Award,
  Check,
  Flame
} from 'lucide-react';

const accessBenefits = [
  {
    icon: Layers,
    bold: 'Você recebe o link de acesso imediatamente',
    rest: 'no seu e-mail e também no WhatsApp. Acesse o pack completo com vídeos organizados por nicho.'
  },
  {
    icon: CloudDownload,
    bold: 'Baixe, publique e comece a viralizar',
    rest: 'nas principais plataformas: TikTok, Instagram, YouTube Shorts, Kwai e muito mais.'
  },
  {
    icon: CheckCircle2,
    bold: 'Conteúdo testado, validado e pronto',
    rest: 'para monetizar.'
  }
];

const quickFeatures = [
  {
    icon: VideoOff,
    line1: 'Sem',
    line2: 'aparecer'
  },
  {
    icon: SquarePen,
    line1: 'Sem',
    line2: 'editar'
  },
  {
    icon: Award,
    line1: 'Zero',
    line2: 'experiência'
  },
  {
    icon: Check,
    line1: 'Sem',
    line2: 'copyright'
  },
  {
    icon: Flame,
    line1: 'Alta chance',
    line2: 'de viralização'
  }
];

function BonusMusicBoxArt() {
  const uid = useId();
  const glowId = `musicGlow-${uid}`;
  return (
    <div className="relative w-[228px] sm:w-[238px] h-[222px] sm:h-[234px] mx-auto select-none flex items-end justify-center pb-3">
      {/* Radial Neon Cyan Aura Burst */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-48 h-44 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.52)_0%,rgba(14,165,233,0.22)_46%,transparent_72%)] blur-xl" />
      {/* Floor Glow Shadow */}
      <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 w-44 h-4 rounded-full bg-[#38BDF8]/45 blur-md" />

      {/* Floating Music Notes & Particles */}
      <svg viewBox="0 0 240 230" className="pointer-events-none absolute inset-0 w-full h-full overflow-visible" fill="none">
        <defs>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Top Light Burst from Box Interior */}
        <ellipse cx="120" cy="86" rx="58" ry="26" fill={`url(#${glowId})`} />

        {/* Musical Notes floating out */}
        <g className="drop-shadow-[0_0_8px_rgba(56,189,248,0.95)]">
          <path d="M58 58V37L74 33V52" stroke="#7DD3FC" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="54" cy="59" r="4.5" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="1" />
          <circle cx="70" cy="54" r="4.5" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="1" />

          <path d="M98 40V22L108 26" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="94" cy="41" r="4" fill="#7DD3FC" />

          <path d="M196 126V106L208 103V121" stroke="#7DD3FC" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="192" cy="127" r="4" fill="#38BDF8" />
          <circle cx="205" cy="123" r="4" fill="#38BDF8" />
        </g>

        {/* Studio Wireless Headphones perched top-right of open box */}
        <g transform="translate(120, 18) rotate(12)" className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]">
          <path d="M16 42C16 20 34 8 52 8C70 8 88 20 88 42" stroke="#0F172A" strokeWidth="10" strokeLinecap="round" />
          <path d="M16 42C16 20 34 8 52 8C70 8 88 20 88 42" stroke="#7DD3FC" strokeWidth="2.2" strokeLinecap="round" />
          {/* Left Earcup */}
          <rect x="6" y="36" width="18" height="30" rx="8" fill="#0B192E" stroke="#38BDF8" strokeWidth="2.4" />
          <rect x="10" y="42" width="10" height="18" rx="4" fill="#38BDF8" fillOpacity="0.35" />
          {/* Right Earcup */}
          <rect x="80" y="36" width="18" height="30" rx="8" fill="#0B192E" stroke="#38BDF8" strokeWidth="2.4" />
          <rect x="84" y="42" width="10" height="18" rx="4" fill="#38BDF8" fillOpacity="0.35" />
        </g>
      </svg>

      {/* 3D Open Gift Box Structure */}
      <div className="relative flex items-end justify-center z-10">
        {/* Back Open Flap Lid */}
        <div className="absolute -top-[58px] left-1 w-[132px] h-[54px] bg-gradient-to-br from-[#0E294D] via-[#07162B] to-[#030914] border border-[#7DD3FC]/55 rounded-t-md origin-bottom-left -rotate-[16deg] skew-x-[18deg] shadow-[0_-6px_18px_rgba(56,189,248,0.28)]" />
        {/* Inner Glowing Box Cavity */}
        <div className="absolute -top-[22px] left-3 w-[160px] h-[34px] bg-[radial-gradient(ellipse_at_center,#E0F2FE_0%,#38BDF8_45%,#031226_92%)] border border-[#7DD3FC]/60 skew-x-[-14deg] rounded-sm shadow-[0_0_24px_rgba(56,189,248,0.85)]" />

        {/* Front Face of 3D Box */}
        <div className="relative z-10 w-[144px] sm:w-[152px] h-[132px] sm:h-[138px] bg-[linear-gradient(155deg,#0C274D_0%,#051226_55%,#02060E_100%)] border border-[#7DD3FC]/75 rounded-l-md px-3 py-3 flex flex-col items-center justify-center text-center shadow-[0_14px_28px_rgba(0,0,0,0.92),inset_0_1px_0_rgba(186,230,253,0.45)] skew-y-[5deg] overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#38BDF8] via-[#BAE6FD] to-[#0284C7]" />
          <div className="pointer-events-none absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#38BDF8]/15 blur-md" />

          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[9px] font-bold uppercase tracking-[0.14em] text-[#BAE6FD] mb-0.5">
            PACOTE COM
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[18px] sm:text-[19px] font-[900] uppercase leading-[1.03] tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
            MÚSICAS
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[18px] sm:text-[19px] font-[900] uppercase leading-[1.03] tracking-tight text-[#38BDF8] drop-shadow-[0_0_10px_rgba(56,189,248,0.65)]">
            VIRAIS
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[9px] font-extrabold uppercase tracking-[0.1em] text-neutral-200 mt-1">
            SEM COPYRIGHT
          </span>

          {/* Corner Authenticity Seal */}
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#0284C7]/45 border border-[#7DD3FC]/50 text-[7px] font-black tracking-wider text-[#E0F2FE] uppercase">
            PACK VIRAL
          </div>
        </div>

        {/* Right Side Panel for 3D Depth */}
        <div className="relative z-10 w-[34px] sm:w-[38px] h-[132px] sm:h-[138px] bg-[linear-gradient(180deg,#061833_0%,#020914_100%)] border-y border-r border-[#38BDF8]/45 rounded-r-md -skew-y-[18deg] -translate-y-[6px] shadow-[inset_4px_0_12px_rgba(0,0,0,0.75)] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_75%,rgba(56,189,248,0.28),transparent_65%)]" />
        </div>

        {/* Front-Bottom Left Floating Play Badge */}
        <div className="absolute -left-5 -bottom-1 z-20 w-12 h-9 rounded-lg bg-gradient-to-br from-[#38BDF8] to-[#0284C7] border border-[#BAE6FD] shadow-[0_0_18px_rgba(56,189,248,0.75)] flex items-center justify-center -rotate-[12deg]">
          <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-0.5" />
        </div>
      </div>
    </div>
  );
}

function BonusStoriesMemesBoxArt() {
  const uid = useId();
  const glowId = `storiesGlow-${uid}`;
  return (
    <div className="relative w-[228px] sm:w-[238px] h-[222px] sm:h-[234px] mx-auto select-none flex items-end justify-center pb-3">
      {/* Radial Neon Cyan Aura Burst */}
      <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 w-52 h-44 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.56)_0%,rgba(59,130,246,0.2)_48%,transparent_74%)] blur-xl" />
      {/* Floor Glow Shadow */}
      <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 w-44 h-4 rounded-full bg-[#38BDF8]/45 blur-md" />

      {/* Floating Vertical Social/Story Phones & Meme Badges */}
      <svg viewBox="0 0 240 230" className="pointer-events-none absolute inset-0 w-full h-full overflow-visible" fill="none">
        <defs>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#38BDF8" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="120" cy="88" rx="62" ry="26" fill={`url(#${glowId})`} />

        {/* Left Tilted Reels/Meme Card */}
        <g transform="translate(86, 30) rotate(-11)" className="drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)]">
          <rect x="0" y="0" width="42" height="64" rx="7" fill="#071936" stroke="#38BDF8" strokeWidth="2.2" />
          <path d="M16 24L28 31L16 38V24Z" fill="#BAE6FD" />
          <rect x="7" y="48" width="28" height="3.5" rx="1.75" fill="#38BDF8" fillOpacity="0.7" />
        </g>

        {/* Main Center-Right Glowing Vertical Phone / Story Card */}
        <g transform="translate(130, 18) rotate(8)" className="drop-shadow-[0_8px_18px_rgba(56,189,248,0.4)]">
          <rect x="0" y="0" width="52" height="82" rx="9" fill="#051329" stroke="#7DD3FC" strokeWidth="2.6" />
          <rect x="16" y="5" width="20" height="3" rx="1.5" fill="#38BDF8" />
          {/* Story Progress Bars */}
          <rect x="6" y="12" width="12" height="2" rx="1" fill="#BAE6FD" />
          <rect x="20" y="12" width="12" height="2" rx="1" fill="#BAE6FD" fillOpacity="0.45" />
          <rect x="34" y="12" width="12" height="2" rx="1" fill="#BAE6FD" fillOpacity="0.45" />
          {/* Viral Play / Note glyph inside phone */}
          <circle cx="26" cy="40" r="13" fill="#0EA5E9" fillOpacity="0.24" stroke="#7DD3FC" strokeWidth="1.5" />
          <path d="M22 34L33 40L22 46V34Z" fill="#E0F2FE" />
          <rect x="9" y="61" width="34" height="4" rx="2" fill="#38BDF8" fillOpacity="0.65" />
          <rect x="13" y="68" width="26" height="3" rx="1.5" fill="#BAE6FD" fillOpacity="0.45" />
        </g>

        {/* Sparkle Stars */}
        <circle cx="52" cy="48" r="2.8" fill="#BAE6FD" />
        <circle cx="64" cy="26" r="2" fill="#38BDF8" />
        <circle cx="195" cy="46" r="2.6" fill="#7DD3FC" />
        <circle cx="204" cy="94" r="2.2" fill="#BAE6FD" />
      </svg>

      {/* 3D Open Gift Box Structure */}
      <div className="relative flex items-end justify-center z-10">
        {/* Back Open Flap Lid */}
        <div className="absolute -top-[58px] left-1 w-[132px] h-[54px] bg-gradient-to-br from-[#11315E] via-[#081A36] to-[#030A17] border border-[#7DD3FC]/60 rounded-t-md origin-bottom-left -rotate-[16deg] skew-x-[18deg] shadow-[0_-6px_18px_rgba(56,189,248,0.32)]" />
        {/* Inner Glowing Box Cavity */}
        <div className="absolute -top-[22px] left-3 w-[160px] h-[34px] bg-[radial-gradient(ellipse_at_center,#F0F9FF_0%,#38BDF8_48%,#031226_92%)] border border-[#7DD3FC]/65 skew-x-[-14deg] rounded-sm shadow-[0_0_26px_rgba(56,189,248,0.9)]" />

        {/* Front Face of 3D Box */}
        <div className="relative z-10 w-[144px] sm:w-[152px] h-[132px] sm:h-[138px] bg-[linear-gradient(155deg,#0E2D59_0%,#06152E_56%,#020712_100%)] border border-[#7DD3FC]/80 rounded-l-md px-3 py-3 flex flex-col items-center justify-center text-center shadow-[0_14px_28px_rgba(0,0,0,0.92),inset_0_1px_0_rgba(186,230,253,0.5)] skew-y-[5deg] overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#38BDF8] via-[#E0F2FE] to-[#0284C7]" />
          <div className="pointer-events-none absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#38BDF8]/18 blur-md" />

          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[9px] font-bold uppercase tracking-[0.14em] text-[#BAE6FD] mb-0.5">
            PACOTE DE
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[17px] sm:text-[18px] font-[900] uppercase leading-[1.03] tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
            STORIES
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[17px] sm:text-[18px] font-[900] uppercase leading-[1.03] tracking-tight text-[#38BDF8] drop-shadow-[0_0_10px_rgba(56,189,248,0.65)]">
            PRONTOS
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[9px] font-extrabold uppercase tracking-[0.08em] text-neutral-200 mt-1">
            &amp; PACK DE MEMES
          </span>

          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#0284C7]/45 border border-[#7DD3FC]/50 text-[7px] font-black tracking-wider text-[#E0F2FE] uppercase">
            PACK VIRAL
          </div>
        </div>

        {/* Right Side Panel for 3D Depth */}
        <div className="relative z-10 w-[34px] sm:w-[38px] h-[132px] sm:h-[138px] bg-[linear-gradient(180deg,#071A38_0%,#020916_100%)] border-y border-r border-[#38BDF8]/45 rounded-r-md -skew-y-[18deg] -translate-y-[6px] shadow-[inset_4px_0_12px_rgba(0,0,0,0.75)] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_75%,rgba(56,189,248,0.28),transparent_65%)]" />
        </div>

        {/* Front-Bottom Left Floating Play Badge */}
        <div className="absolute -left-5 -bottom-1 z-20 w-12 h-9 rounded-lg bg-gradient-to-br from-[#38BDF8] to-[#0284C7] border border-[#BAE6FD] shadow-[0_0_18px_rgba(56,189,248,0.75)] flex items-center justify-center -rotate-[12deg]">
          <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-0.5" />
        </div>
      </div>
    </div>
  );
}

function BonusSoundEffectsBoxArt() {
  const uid = useId();
  const glowId = `sfxGlow-${uid}`;
  return (
    <div className="relative w-[228px] sm:w-[238px] h-[222px] sm:h-[234px] mx-auto select-none flex items-end justify-center pb-3">
      {/* Radial Neon Cyan Aura Burst */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-48 h-44 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.5)_0%,rgba(6,182,212,0.2)_46%,transparent_72%)] blur-xl" />
      {/* Floor Glow Shadow */}
      <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 w-44 h-4 rounded-full bg-[#38BDF8]/45 blur-md" />

      {/* Floating Equalizer & Studio Headphones */}
      <svg viewBox="0 0 240 230" className="pointer-events-none absolute inset-0 w-full h-full overflow-visible" fill="none">
        <defs>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#06B6D4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="120" cy="86" rx="58" ry="26" fill={`url(#${glowId})`} />

        {/* Audio Waveform Bars rising on left side */}
        <g className="drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]">
          <rect x="50" y="48" width="5" height="18" rx="2.5" fill="#38BDF8" />
          <rect x="59" y="38" width="5" height="32" rx="2.5" fill="#7DD3FC" />
          <rect x="68" y="44" width="5" height="24" rx="2.5" fill="#BAE6FD" />
          <rect x="77" y="32" width="5" height="38" rx="2.5" fill="#38BDF8" />
          <rect x="86" y="42" width="5" height="22" rx="2.5" fill="#7DD3FC" />
        </g>

        {/* Studio Headphones perched top-right */}
        <g transform="translate(118, 18) rotate(12)" className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]">
          <path d="M16 42C16 20 34 8 52 8C70 8 88 20 88 42" stroke="#0F172A" strokeWidth="10" strokeLinecap="round" />
          <path d="M16 42C16 20 34 8 52 8C70 8 88 20 88 42" stroke="#67E8F9" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="6" y="36" width="18" height="30" rx="8" fill="#0B192E" stroke="#22D3EE" strokeWidth="2.4" />
          <rect x="10" y="42" width="10" height="18" rx="4" fill="#22D3EE" fillOpacity="0.35" />
          <rect x="80" y="36" width="18" height="30" rx="8" fill="#0B192E" stroke="#22D3EE" strokeWidth="2.4" />
          <rect x="84" y="42" width="10" height="18" rx="4" fill="#22D3EE" fillOpacity="0.35" />
        </g>

        {/* Floating Sound Wave Arcs right */}
        <path d="M196 105C202 110 202 120 196 125" stroke="#7DD3FC" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M203 100C212 108 212 122 203 130" stroke="#38BDF8" strokeWidth="2.3" strokeLinecap="round" />
      </svg>

      {/* 3D Open Gift Box Structure */}
      <div className="relative flex items-end justify-center z-10">
        {/* Back Open Flap Lid */}
        <div className="absolute -top-[58px] left-1 w-[132px] h-[54px] bg-gradient-to-br from-[#0E294D] via-[#07162B] to-[#030914] border border-[#7DD3FC]/55 rounded-t-md origin-bottom-left -rotate-[16deg] skew-x-[18deg] shadow-[0_-6px_18px_rgba(56,189,248,0.28)]" />
        {/* Inner Glowing Box Cavity */}
        <div className="absolute -top-[22px] left-3 w-[160px] h-[34px] bg-[radial-gradient(ellipse_at_center,#E0F2FE_0%,#22D3EE_45%,#031226_92%)] border border-[#7DD3FC]/60 skew-x-[-14deg] rounded-sm shadow-[0_0_24px_rgba(34,211,238,0.85)]" />

        {/* Front Face of 3D Box */}
        <div className="relative z-10 w-[144px] sm:w-[152px] h-[132px] sm:h-[138px] bg-[linear-gradient(155deg,#0B274A_0%,#051326_55%,#02060E_100%)] border border-[#67E8F9]/75 rounded-l-md px-3 py-3 flex flex-col items-center justify-center text-center shadow-[0_14px_28px_rgba(0,0,0,0.92),inset_0_1px_0_rgba(186,230,253,0.45)] skew-y-[5deg] overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#22D3EE] via-[#BAE6FD] to-[#0284C7]" />
          <div className="pointer-events-none absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#22D3EE]/15 blur-md" />

          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[9px] font-bold uppercase tracking-[0.12em] text-[#BAE6FD] mb-0.5">
            SUPER PACOTE DE
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[18px] sm:text-[19px] font-[900] uppercase leading-[1.03] tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
            EFEITOS
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[18px] sm:text-[19px] font-[900] uppercase leading-[1.03] tracking-tight text-[#38BDF8] drop-shadow-[0_0_10px_rgba(56,189,248,0.65)]">
            SONOROS
          </span>

          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#0284C7]/45 border border-[#7DD3FC]/50 text-[7px] font-black tracking-wider text-[#E0F2FE] uppercase">
            PACK VIRAL
          </div>
        </div>

        {/* Right Side Panel for 3D Depth */}
        <div className="relative z-10 w-[34px] sm:w-[38px] h-[132px] sm:h-[138px] bg-[linear-gradient(180deg,#061833_0%,#020914_100%)] border-y border-r border-[#38BDF8]/45 rounded-r-md -skew-y-[18deg] -translate-y-[6px] shadow-[inset_4px_0_12px_rgba(0,0,0,0.75)] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_75%,rgba(34,211,238,0.28),transparent_65%)]" />
        </div>

        {/* Front-Bottom Left Floating Play Badge */}
        <div className="absolute -left-5 -bottom-1 z-20 w-12 h-9 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#0284C7] border border-[#BAE6FD] shadow-[0_0_18px_rgba(34,211,238,0.75)] flex items-center justify-center -rotate-[12deg]">
          <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-0.5" />
        </div>
      </div>
    </div>
  );
}

export default function AccessAndPremiumBonusSection() {
  const bonuses = [
    {
      label: 'BÔNUS 1:',
      text: 'Músicas Virais em alta 100% sem copyright',
      Artwork: BonusMusicBoxArt
    },
    {
      label: 'BÔNUS 2:',
      text: 'Pacote de Stories prontos e Pack de Memes',
      Artwork: BonusStoriesMemesBoxArt
    },
    {
      label: 'BÔNUS 3:',
      text: 'Super pacote de Efeitos Sonoros',
      Artwork: BonusSoundEffectsBoxArt
    }
  ];

  return (
    <section className="relative py-8 sm:py-11 px-4 bg-[#000000] border-t border-white/10 overflow-hidden">
      {/* Subtle neon cyan ambient radial glows */}
      <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 w-[480px] h-[190px] bg-[#00A8FF]/12 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 w-[560px] h-[220px] bg-[#00A8FF]/10 blur-[110px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* TOP HEADER */}
        <div className="text-center mb-5 sm:mb-6">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-neutral-300 mb-1.5">
            ENTREGA IMEDIATA &bull; SEM COMPLICAÇÃO
          </p>
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[25px] sm:text-[36px] font-[900] tracking-[-0.02em] leading-[1.12] text-white">
            O Acesso é{' '}
            <span className="bg-gradient-to-b from-[#7DD3FC] via-[#38BDF8] to-[#0284C7] bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">
              Simples e Rápido:
            </span>
          </h2>
        </div>

        {/* COMPACT CENTERED 3-ROW ACCESS BENEFITS */}
        <div className="max-w-xl mx-auto space-y-3.5 sm:space-y-4 mb-6 sm:mb-7">
          {accessBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5 text-left">
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon
                    className="w-6 h-6 sm:w-[26px] sm:h-[26px] text-[#38BDF8] drop-shadow-[0_0_10px_rgba(56,189,248,0.85)]"
                    strokeWidth={2.2}
                  />
                </div>
                <p className="text-[13px] sm:text-[15px] leading-[1.42] text-neutral-200">
                  <strong className="text-white font-bold">{item.bold}</strong>{' '}
                  {item.rest}
                </p>
              </div>
            );
          })}
        </div>

        {/* 5 HORIZONTAL NEON FEATURE BOXES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-8 sm:mb-10">
          {quickFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`relative bg-[linear-gradient(180deg,rgba(8,26,50,0.88)_0%,rgba(3,8,18,0.96)_100%)] border border-[#38BDF8]/65 rounded-xl py-3.5 px-2.5 flex flex-col items-center justify-center text-center shadow-[0_0_16px_rgba(0,180,255,0.16),inset_0_0_12px_rgba(56,189,248,0.06)] hover:border-[#7DD3FC] transition-colors ${
                  idx === quickFeatures.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <span className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-[#7DD3FC] to-transparent" />
                <Icon
                  className="w-6 h-6 sm:w-7 sm:h-7 text-[#38BDF8] mb-2 drop-shadow-[0_0_10px_rgba(56,189,248,0.85)]"
                  strokeWidth={2.4}
                />
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] sm:text-[14px] font-[800] text-white leading-tight">
                  {feat.line1}
                  <br />
                  {feat.line2}
                </span>
              </div>
            );
          })}
        </div>

        {/* BONUS SECTION HEADER */}
        <div className="text-center mb-7 sm:mb-8 max-w-2xl mx-auto">
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-[22px] sm:text-[32px] font-[900] text-white leading-[1.2] tracking-[-0.02em] text-balance">
            Receba{' '}
            <span className="uppercase bg-gradient-to-b from-[#7DD3FC] via-[#38BDF8] to-[#0284C7] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(56,189,248,0.45)]">
              BÔNUS EXCLUSIVOS
            </span>{' '}
            adquirindo a{' '}
            <span className="underline decoration-[#38BDF8] decoration-2 underline-offset-4">
              Oferta Premium
            </span>
            :
          </h3>
        </div>

        {/* 3 BONUS CARDS WITH TOP BADGE + LARGE 3D OPEN BOX COVER + BOTTOM GRÁTIS PILL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-4 lg:gap-5">
          {bonuses.map((bonus, idx) => {
            const Artwork = bonus.Artwork;
            return (
              <div
                key={idx}
                className="relative bg-[radial-gradient(ellipse_at_top,#071E3E_0%,#030916_58%,#010308_100%)] border border-[#38BDF8]/75 rounded-xl pt-7 pb-5 px-4 flex flex-col items-center justify-between text-center shadow-[0_0_22px_rgba(0,180,255,0.16)] hover:border-[#7DD3FC] transition-colors"
              >
                {/* Top Floating Pill Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] border border-[#BAE6FD]/85 text-white font-['Plus_Jakarta_Sans',sans-serif] font-[800] text-[10.5px] sm:text-[11px] tracking-wide shadow-[0_0_16px_rgba(56,189,248,0.7)] flex items-center gap-1">
                  <span>Incluso na Oferta Premium</span>
                  <Flame className="w-3.5 h-3.5 text-white fill-white shrink-0" />
                </div>

                {/* Large 3D Open Box Illustration */}
                <div className="w-full my-1">
                  <Artwork />
                </div>

                {/* Bottom Copy + GRÁTIS Pill */}
                <div className="w-full flex flex-col items-center mt-2">
                  <p className="text-[13px] sm:text-[14px] text-neutral-100 leading-snug max-w-[230px] mx-auto mb-3.5">
                    <strong className="text-white font-extrabold">{bonus.label}</strong>{' '}
                    {bonus.text}
                  </p>

                  <div className="inline-flex items-center justify-center min-w-[128px] py-1.5 px-6 rounded-full bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] border border-[#BAE6FD]/75 text-white font-['Plus_Jakarta_Sans',sans-serif] font-[900] text-[12px] uppercase tracking-wider shadow-[0_0_16px_rgba(56,189,248,0.65)]">
                    GRÁTIS
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
