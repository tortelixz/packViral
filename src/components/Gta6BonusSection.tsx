import React from 'react';
import { Flame, ArrowDown } from 'lucide-react';

interface Gta6BonusSectionProps {
  onScrollToOffers: () => void;
}

export default function Gta6BonusSection({ onScrollToOffers }: Gta6BonusSectionProps) {
  return (
    <section className="py-6 sm:py-9 px-3 sm:px-4 bg-transparent relative overflow-hidden">
      {/* Top luminous Pack Viral -> Vice City transition hairline */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#58D4F2]/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_18%,rgba(147,51,234,0.12)_0%,rgba(255,46,147,0.06)_42%,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Destaque ATENÇÃO! e Título Explicativo */}
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-[28px] min-[390px]:text-[32px] sm:text-[42px] font-[900] text-[#EF4444] tracking-tight mb-2 uppercase">
            ⚠️ ATENÇÃO!
          </h3>
          <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-[18px] min-[390px]:text-[20px] sm:text-[26px] font-[800] tracking-tight leading-[1.3] text-white max-w-3xl mx-auto px-2">
            VEJA O <span className="gradient-blue-text">BÔNUS</span> QUE VOCÊ VAI RECEBER COMPRANDO ESSE PACK!
          </h4>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-[#58D4F2]/40 bg-[#070D19]/95 shadow-[0_20px_55px_rgba(0,0,0,0.65)]">
          {/* Top Vice City + Pack Viral neon bar */}
          <div
            className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#58D4F2] via-[#FF2E93] to-[#FFD60A] z-20"
            aria-hidden="true"
          />

          <div className="relative z-10 p-4 sm:p-6 md:p-8">
            {/* Faixa Superior BÔNUS EXCLUSIVO */}
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#FFD60A] via-[#FACC15] to-[#FF9F1C] text-[#050912] font-[900] text-xs sm:text-sm uppercase tracking-[0.14em] shadow-[0_4px_18px_rgba(250,204,21,0.3)]">
                <Flame className="w-4 h-4 fill-[#050912] shrink-0" aria-hidden="true" />
                <span>BÔNUS EXCLUSIVO</span>
              </div>
            </div>

            {/* Headline Principal da Nova Seção */}
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-[800] text-[22px] min-[390px]:text-[26px] sm:text-[34px] md:text-[38px] leading-[1.1] tracking-[-0.02em] text-white text-center max-w-4xl mx-auto text-balance">
              <span className="bg-[linear-gradient(135deg,#FFD60A_0%,#FF6B35_36%,#FF2E93_72%,#A855F7_100%)] bg-clip-text text-transparent font-[900]">
                GTA 6
              </span>{' '}
              VAI PARAR A INTERNET.{' '}
              <span className="gradient-blue-text drop-shadow-[0_0_20px_rgba(88,212,242,0.4)]">
                VOCÊ ESTÁ PREPARADO?
              </span>
            </h2>

            {/* Grid 2 Colunas Desktop / Vertical Mobile */}
            <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
              {/* Imagem Personalizada Pack Viral Segurando GTA 6 */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                <div
                  className="pointer-events-none absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(88,212,242,0.20)_0%,rgba(255,46,147,0.12)_52%,transparent_74%)]"
                  aria-hidden="true"
                />
                <img
                  src="/assets/packviral-gta6-bonus.webp"
                  alt="Personagem Pack Viral segurando arte do GTA 6 com faixa Bônus Exclusivo"
                  width={600}
                  height={521}
                  loading="eager"
                  decoding="async"
                  className="relative z-10 w-[80%] max-w-[280px] sm:max-w-[340px] lg:max-w-full h-auto object-contain select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.75)]"
                  draggable={false}
                />
              </div>

              {/* Copy Persuasiva em Blocos Curtos */}
              <div className="lg:col-span-7 space-y-3.5 text-left">
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[17px] sm:text-[20px] font-[800] text-[#58D4F2]">
                  Pensa comigo...
                </p>

                <p className="text-[15px] sm:text-[17px] text-neutral-100 leading-[1.6]">
                  Um dos jogos <strong className="text-white font-bold">mais aguardados do mundo</strong> está chegando.{' '}
                  <strong className="text-white font-bold">Milhões de pessoas</strong> vão procurar vídeos, novidades, curiosidades e cortes sobre GTA 6.
                </p>

                {/* Destaque de Antecipação */}
                <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(88,212,242,0.12)_0%,rgba(147,51,234,0.14)_55%,rgba(255,46,147,0.12)_100%)] border border-[#58D4F2]/45 p-3.5 sm:p-4">
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] sm:text-[17.5px] font-[800] text-white leading-[1.4]">
                    E enquanto todo mundo estiver procurando esses vídeos, você pode estar{' '}
                    <span className="text-[#58D4F2]">
                      publicando os seus!
                    </span>
                  </p>
                </div>

                {/* Apresentação do Bônus */}
                <div className="rounded-2xl bg-[#050912]/85 border border-[#FF4DA6]/45 p-3.5 sm:p-4.5 text-center">
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[22px] sm:text-[30px] font-[900] leading-tight tracking-tight tabular-nums bg-[linear-gradient(90deg,#FFD60A_0%,#FF6B35_48%,#FF2E93_100%)] bg-clip-text text-transparent">
                    +3.500 CORTES VIRAIS DO GTA 6!
                  </p>
                </div>
              </div>
            </div>

            {/* Fechamento de Oportunidade */}
            <div className="mt-5 sm:mt-6 flex justify-center">
              <button
                type="button"
                onClick={onScrollToOffers}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#05D321] hover:bg-[#04b81c] text-white font-[900] text-[15px] sm:text-base uppercase tracking-wider shadow-[0_0_24px_rgba(5,211,33,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>QUERO GARANTIR MEU ACESSO</span>
                <ArrowDown className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
