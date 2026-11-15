import React, { useState } from 'react';
import {
  ArrowLeft,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Link as LinkIcon,
  MessageCircle
} from 'lucide-react';

interface ProfileCardData {
  id: string;
  handle: string;
  name: string;
  posts: string;
  followers: string;
  following: string;
  category?: string;
  bioLines?: Array<{ text: string; isLink?: boolean; isMention?: boolean }>;
  channelBar?: { name: string; members: string };
  hasButtons?: boolean;
  avatarType: 'em' | 'desenho' | 'sms';
}

const profiles: ProfileCardData[] = [
  {
    id: 'evolutionmilionaria',
    handle: 'evolutionmilionaria',
    name: 'Evolution Milionária',
    posts: '743',
    followers: '470 mil',
    following: '8',
    category: 'Página de fãs',
    hasButtons: true,
    avatarType: 'em'
  },
  {
    id: 'desenhoadultoo',
    handle: 'desenhoadultoo',
    name: 'Cortes família da pesada',
    posts: '879',
    followers: '238 mil',
    following: '0',
    bioLines: [
      { text: '😂 Os melhores momentos de Family Guy' },
      { text: '🔞 Vídeo todos os dias' },
      { text: '👇 Clique em seguir' },
      { text: 'girodecarnaval.site', isLink: true }
    ],
    hasButtons: true,
    avatarType: 'desenho'
  },
  {
    id: 'smsindelicado',
    handle: 'smsindelicado',
    name: 'Memes e diálogos engraçados',
    posts: '20,2 mil',
    followers: '5,3 mi',
    following: '38',
    bioLines: [
      { text: '💬 Sabe aquela conversa que você teve no WhatsApp? Ela pode acabar parando aqui.' },
      { text: '👁️ @hyeser', isMention: true },
      { text: '📩 comercial@husers.com.br' },
      { text: 's.shopee.com.br/AUkkfNQxPT', isLink: true }
    ],
    channelBar: {
      name: 'Apenas diálogos',
      members: '22,7 mil membros'
    },
    hasButtons: false,
    avatarType: 'sms'
  }
];

function ProfileCard({ profile, highlighted }: { profile: ProfileCardData; highlighted: boolean }) {
  return (
    <div
      className={`bg-[#0B0F14] rounded-2xl border transition-all duration-300 p-4 sm:p-5 text-left text-white flex flex-col justify-between ${
        highlighted
          ? 'border-[#58D4F2] shadow-[0_0_28px_rgba(88,212,242,0.28)] md:-translate-y-1.5'
          : 'border-[#58D4F2]/45 shadow-[0_0_16px_rgba(88,212,242,0.12)] opacity-95'
      }`}
    >
      <div>
        {/* Instagram Top Header */}
        <div className="flex items-center justify-between mb-3.5 text-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-neutral-200" />
            <span className="font-bold text-[15px] sm:text-[16px] tracking-tight truncate">
              {profile.handle}
            </span>
          </div>
          <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-neutral-300" />
        </div>

        {/* Avatar + Name + Stats */}
        <div className="flex items-center gap-3.5 mb-3">
          {profile.avatarType === 'em' ? (
            <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-black border border-neutral-700 flex items-center justify-center shrink-0 shadow-inner">
              <span className="font-serif text-xl font-semibold tracking-wider text-neutral-200">
                EM
              </span>
            </div>
          ) : (
            <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full p-[2.5px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shrink-0">
              <div className="w-full h-full rounded-full bg-[#0B0F14] p-[2px]">
                <img
                  src={profile.avatarType === 'desenho' ? '/assets/profile-desenho.webp' : '/assets/profile-sms.webp'}
                  alt={profile.handle}
                  width={120}
                  height={120}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="text-[13px] sm:text-[14px] font-semibold text-white truncate mb-1.5">
              {profile.name}
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-left">
              <div>
                <div className="text-[13px] sm:text-[14px] font-bold text-white leading-tight">
                  {profile.posts}
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-300 leading-tight">
                  posts
                </div>
              </div>
              <div>
                <div className="text-[13px] sm:text-[14px] font-bold text-white leading-tight">
                  {profile.followers}
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-300 leading-tight">
                  seguidores
                </div>
              </div>
              <div>
                <div className="text-[13px] sm:text-[14px] font-bold text-white leading-tight">
                  {profile.following}
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-300 leading-tight">
                  seguindo
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category or Bio */}
        {profile.category && (
          <p className="text-xs sm:text-[13px] text-neutral-300 mb-3">
            {profile.category}
          </p>
        )}

        {profile.bioLines && (
          <div className="space-y-1 text-[12px] sm:text-[12.5px] leading-snug mb-3.5 text-neutral-100">
            {profile.bioLines.map((line, idx) =>
              line.isLink ? (
                <div key={idx} className="flex items-center gap-1 text-[#7DD3FC] font-medium pt-0.5">
                  <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{line.text}</span>
                </div>
              ) : line.isMention ? (
                <div key={idx}>
                  👁️ <span className="text-[#93C5FD]">@hyeser</span>
                </div>
              ) : (
                <div key={idx}>{line.text}</div>
              )
            )}
          </div>
        )}
      </div>

      {/* Bottom Action Row or Broadcast Channel */}
      {profile.hasButtons && (
        <div className="flex items-center gap-1.5 mt-auto pt-1">
          <div className="flex-1 bg-[#4A5DF9] text-white text-xs sm:text-[13px] font-semibold py-2 rounded-md text-center">
            Seguir
          </div>
          <div className="flex-1 bg-[#262A30] text-white text-xs sm:text-[13px] font-semibold py-2 rounded-md text-center">
            Mensagem
          </div>
          <div className="bg-[#262A30] text-white p-2 rounded-md flex items-center justify-center">
            <UserPlus className="w-4 h-4" />
          </div>
        </div>
      )}

      {profile.channelBar && (
        <div className="flex items-center gap-1.5 text-xs text-neutral-200 pt-2 border-t border-white/10 mt-auto">
          <MessageCircle className="w-4 h-4 text-neutral-300 shrink-0" />
          <span className="font-semibold text-white">{profile.channelBar.name}</span>
          <span className="text-neutral-400">{profile.channelBar.members}</span>
        </div>
      )}
    </div>
  );
}

export default function InfiniteArsenalSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % profiles.length);
  };

  const orderedDesktopIndices = [
    (activeIndex - 1 + profiles.length) % profiles.length,
    activeIndex,
    (activeIndex + 1) % profiles.length
  ];

  return (
    <section className="cv-auto py-6 sm:py-10 px-2 sm:px-4 bg-transparent relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#58D4F2]/18 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_46%,rgba(14,165,233,0.10)_0%,transparent_72%)]" />
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Título */}
        <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[28px] min-[390px]:text-[33px] sm:text-[38px] md:text-[44px] font-[800] text-center tracking-[-0.03em] leading-[1.08] text-white max-w-4xl mx-auto mb-5 sm:mb-8 px-1">
          Você Não Precisa Criar Conteúdo do Zero,{' '}
          <span className="gradient-blue-text">
            Tenha Um Arsenal de Conteúdo Infinito
          </span>{' '}
          Pronto
          <span className="block">Para Viralizar!</span>
        </h2>

        {/* Carrossel de Perfis */}
        <div className="relative max-w-4xl mx-auto px-6 sm:px-10">
          {/* Seta Esquerda */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Perfil anterior"
            className="absolute -left-1 sm:left-0 top-1/2 -translate-y-1/2 z-20 p-1 sm:p-2 text-[#58D4F2] hover:text-white transition-colors cursor-pointer touch-manipulation drop-shadow-[0_0_8px_rgba(88,212,242,0.75)]"
          >
            <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
          </button>

          {/* Seta Direita */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Próximo perfil"
            className="absolute -right-1 sm:right-0 top-1/2 -translate-y-1/2 z-20 p-1 sm:p-2 text-[#58D4F2] hover:text-white transition-colors cursor-pointer touch-manipulation drop-shadow-[0_0_8px_rgba(88,212,242,0.75)]"
          >
            <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
          </button>

          {/* Mobile: single-card full-width carousel */}
          <div className="md:hidden w-full max-w-[370px] mx-auto">
            <ProfileCard profile={profiles[activeIndex]} highlighted={true} />
          </div>

          {/* Desktop: 3-card showcase matching screenshot order */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 items-center">
            {orderedDesktopIndices.map((profileIdx, slotIdx) => (
              <ProfileCard
                key={profiles[profileIdx].id}
                profile={profiles[profileIdx]}
                highlighted={slotIdx === 1}
              />
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-3.5">
            {profiles.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Ver perfil ${p.handle}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx ? 'w-7 bg-[#58D4F2]' : 'w-2.5 bg-neutral-700 hover:bg-neutral-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dois Cartões Abaixo do Carrossel */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-5 max-w-[520px] mx-auto mt-5 sm:mt-7">
          {/* Poste em Menos de 30 segundos! */}
          <div className="bg-[#060911] border border-[#58D4F2]/75 rounded-2xl px-2.5 sm:px-5 py-5 sm:py-6 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(88,212,242,0.16)] hover:border-[#58D4F2] hover:shadow-[0_0_26px_rgba(88,212,242,0.3)] transition-all duration-200">
            <div className="mb-3 text-[#58D4F2] drop-shadow-[0_0_10px_rgba(88,212,242,0.75)]">
              <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11 sm:w-12 sm:h-12" aria-hidden="true">
                <circle cx="24" cy="24" r="19" fill="currentColor" />
                <path d="M24 13.5V24.5L31.5 29" stroke="#060911" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[14px] sm:text-[17px] font-extrabold text-white leading-snug">
              Poste em Menos
              <br />
              de 30 segundos!
            </p>
          </div>

          {/* Ideal para perfis anônimos */}
          <div className="bg-[#060911] border border-[#58D4F2]/75 rounded-2xl px-2.5 sm:px-5 py-5 sm:py-6 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(88,212,242,0.16)] hover:border-[#58D4F2] hover:shadow-[0_0_26px_rgba(88,212,242,0.3)] transition-all duration-200">
            <div className="mb-3 text-[#58D4F2] drop-shadow-[0_0_10px_rgba(88,212,242,0.75)]">
              <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11 sm:w-12 sm:h-12" aria-hidden="true">
                {/* Hat crown */}
                <path d="M16 19L19.2 9.5C19.6 8.3 20.9 7.8 22 8.2L24 9L26 8.2C27.1 7.8 28.4 8.3 28.8 9.5L32 19H16Z" fill="currentColor" />
                {/* Hat brim */}
                <path d="M8 20.5C14 18.2 34 18.2 40 20.5C35 23 13 23 8 20.5Z" fill="currentColor" />
                {/* Glasses */}
                <circle cx="17.5" cy="28" r="5" fill="currentColor" />
                <circle cx="30.5" cy="28" r="5" fill="currentColor" />
                <path d="M22.2 27.2H25.8" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                {/* Coat collar */}
                <path d="M11 41C12.2 36.2 17.5 34.5 24 34.5C30.5 34.5 35.8 36.2 37 41H11Z" fill="currentColor" />
              </svg>
            </div>
            <p className="text-[14px] sm:text-[17px] font-extrabold text-white leading-snug">
              Ideal para perfis
              <br />
              anônimos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
