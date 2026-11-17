import React, { useState, useEffect, useRef, lazy, Suspense, memo } from 'react';
import WhatsAppButton from './components/WhatsAppButton';
import InfiniteArsenalSection from './components/InfiniteArsenalSection';
import Gta6BonusSection from './components/Gta6BonusSection';
import VSLPlayer from './components/VSLPlayer';
import { 
  trackPageView, 
  trackViewContent, 
  trackInitiateCheckout,
  getCheckoutUrl
} from './utils/metaPixel';
import { 
  CheckCircle, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  X,
  ArrowDown,
  ArrowRight,
  Headphones,
  Layers,
  CloudDownload,
  CheckCircle2,
  VideoOff,
  SquarePen,
  Award,
  Check,
  Flame
} from 'lucide-react';

const UpPage = lazy(() => import('./UpPage'));

const SalesToast = memo(function SalesToast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const notifications = [
      '⚡ Matheus de SP acabou de adquirir o Super Pack!',
      '🔥 Lucas R. de BH garantiu a Oferta Premium!',
      '👑 Juliana S. de Curitiba começou a viralizar hoje!',
      '⚡ Rodrigo F. de Goiânia liberou o acesso imediato!'
    ];
    let index = 0;
    let hideTimer: number | undefined;
    const interval = window.setInterval(() => {
      setMessage(notifications[index]);
      index = (index + 1) % notifications.length;
      hideTimer = window.setTimeout(() => setMessage(null), 4000);
    }, 12000);

    return () => {
      window.clearInterval(interval);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-3 left-3 z-50 w-[152px] sm:w-[176px] bg-[#080E1A]/95 border border-[#58D4F2] text-white p-2.5 rounded-xl shadow-2xl flex items-start gap-2 text-[11px] sm:text-xs leading-snug pointer-events-none">
      <div className="w-2 h-2 rounded-full bg-[#0AE028] shrink-0 mt-1" />
      <span className="font-medium">{message}</span>
    </div>
  );
});

const CountdownTimer = memo(function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    if (typeof window === 'undefined') return 600;
    const saved = localStorage.getItem('pack_viral_timer_end');
    const now = Date.now();
    if (saved) {
      const endTime = parseInt(saved, 10);
      if (endTime > now) {
        return Math.floor((endTime - now) / 1000);
      }
    }
    const newEndTime = now + 10 * 60 * 1000;
    localStorage.setItem('pack_viral_timer_end', newEndTime.toString());
    return 600;
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const newEndTime = Date.now() + 10 * 60 * 1000;
          localStorage.setItem('pack_viral_timer_end', newEndTime.toString());
          return 600;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#DC2626] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
      <span>ESTA OFERTA TERMINA EM:</span>
      <span className="font-mono font-extrabold tracking-widest bg-black/30 px-2 py-0.5 rounded text-white tabular-nums">
        {formattedTime}
      </span>
    </div>
  );
});

// Grid of content categories (original assets & copy)
const categories = [
  {
    image: '/assets/aistudio/Design-sem-nome-3-1-1_5dd80040.webp',
    description: 'Mais de 250 cortes de melhores momentos do futebol.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-2-1-1_e15ecb4f.webp',
    description: 'Mais de 350 cortes de Family Guy selecionados.'
  },
  {
    image: '/assets/aistudio/AVIACAO-47-1_71ffc73e.webp',
    description: 'Mais de 2.500 cortes de Vários Animes.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-4-1-1_8062e2f9.webp',
    description: 'Não tem quem não goste de Cortes de Os Simpsons. Uma das séries animadas mais antigas ainda ativas. Mais de 120 cortes prontos.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-5-1-1_f59abd97.webp',
    description: 'São mais de 900 cortes prontos para postar de filmes e séries variadas.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-6-1-1_a988238a.webp',
    description: 'Mais de 600 cortes prontos de Pica-Pau, a maioria já legendados, só postar!'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-7-1-1_0772e08a.webp',
    description: 'Cortes de Rick and Morty estão viralizando com força. Conteúdos que capturam atenção e entregam humor ácido na medida certa. Receba mais de 100 cortes prontos.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-8-1-1_6e6dd46b.webp',
    description: 'Mais de 130 cortes de Todo Mundo Odeia o Chris prontos para postar.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-9-1-1_e14a7024.webp',
    description: 'São mais de 500 cortes de Academia para postar na sua página e viralizar!'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-10-1-1.webp',
    description: 'Mais de 500 vídeos de memes limpos + efeitos sonoros.'
  },
  {
    image: '/assets/aistudio/AVIACAO-46.webp',
    description: 'Centenas de cortes religiosos para viralizar sua página gospel.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-12-1-1.webp',
    description: 'Os melhores cortes de Pablo Marçal.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-13-1-1.webp',
  }
];

// FAQ items
const faqItems = [
  {
    question: 'Preciso aparecer?',
    answer: 'Não. Os vídeos já estão prontos pra você postar anonimamente se preferir.'
  },
  {
    question: 'Preciso editar?',
    answer: 'Não. Você pode apenas baixar e postar direto nas suas redes.'
  },
  {
    question: 'Como recebo?',
    answer: 'O acesso é imediato e enviado para o seu WHATSAPP assim que o pagamento for aprovado.'
  },
  {
    question: 'Funciona pra iniciante?',
    answer: 'Sim. O pack foi feito exatamente para quem não tem experiência nenhuma com edição ou criação.'
  },
  {
    question: 'Os vídeos têm copyright ou posso tomar bloqueio nas plataformas?',
    answer: 'Não! Você NÃO vai mais tomar bloqueio das plataformas tentando postar. Todos os vídeos e músicas do pack são 100% LICENCIADOS, totalmente sem copyright (livres de direitos autorais) e sem marcas d\'água. Você pode postar no TikTok, Instagram, YouTube Shorts e Kwai e monetizar suas contas com total segurança jurídica.'
  },
  {
    question: 'E se eu tiver dúvida ou precisar de ajuda depois da compra?',
    answer: 'Quando você compra, você recebe suporte 24 horas ensinando passo a passo como viralizar, além do número direto das melhores pessoas que já viralizaram usando esse pack para te ajudar. E se quiser tirar dúvidas antes de comprar, também atendemos no WhatsApp a qualquer hora!'
  }
];

// Uploaded customer photo reviews for single-card manual carousel
const photoReviews = [
  {
    image: '/assets/Depoimento_Marcelo.webp',
    name: 'Depoimento Marcelo',
    width: 677,
    height: 682
  },
  {
    image: '/assets/Depoimento_Leticia.webp',
    name: 'Depoimento Letícia',
    width: 677,
    height: 682
  },
  {
    image: '/assets/Depoimento_Rafael.webp',
    name: 'Depoimento Rafael',
    width: 679,
    height: 682
  }
];

export default function App() {
  const [photoSlide, setPhotoSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | null>(null);
  const firstMonthScrollRef = useRef<HTMLDivElement>(null);

  const [currentPath, setCurrentPath] = useState(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fire tracking immediately on first rendered frame so slow mobile visits don't bounce before PageView registers
  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      trackPageView();
      trackViewContent('Pack Verso - 100.000 Cortes Virais', 19.90);
    });
    return () => window.cancelAnimationFrame(rafId);
  }, []);






  const scrollToOffers = () => {
    const el = document.getElementById('escolha');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextPhotoSlide = () => {
    setPhotoSlide((prev) => (prev + 1) % photoReviews.length);
  };

  const prevPhotoSlide = () => {
    setPhotoSlide((prev) => (prev - 1 + photoReviews.length) % photoReviews.length);
  };

  if (currentPath === '/up' || currentPath === '/up/' || currentPath.startsWith('/up')) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#050912]" />}>
        <UpPage />
        <WhatsAppButton />
      </Suspense>
    );
  }

  const renderOffersSection = (sectionId?: string) => (
    <section className="py-8 sm:py-12 px-2.5 sm:px-4 bg-transparent relative" id={sectionId}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.42)_32%,rgba(168,85,247,0.42)_54%,rgba(255,46,147,0.36)_72%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_52%_at_48%_42%,rgba(14,165,233,0.14)_0%,transparent_72%),radial-gradient(ellipse_62%_48%_at_55%_68%,rgba(147,51,234,0.11)_0%,rgba(255,46,147,0.08)_46%,rgba(255,107,53,0.04)_70%,transparent_84%)]" />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        
        <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[30px] min-[390px]:text-[36px] sm:text-[44px] font-[800] text-center text-white tracking-[-0.02em] leading-[1.08] mb-6 sm:mb-9 uppercase px-1 text-balance">
          PREPARAMOS A <span className="gradient-blue-text">MELHOR OFERTA</span> PARA VOCÊ
        </h2>

        <div className="max-w-[540px] mx-auto mt-6">
          {/* OFERTA PREMIUM (FEATURED LUXURY CARD) */}
          <div className="rounded-[24px] p-[2px] bg-[linear-gradient(150deg,#58D4F2_0%,#0EA5E9_36%,#A855F7_66%,#FF2E93_86%,#FF8C42_100%)] shadow-[0_24px_65px_rgba(14,165,233,0.24),0_12px_42px_rgba(255,46,147,0.16)] relative overflow-visible">
            {/* Badge Mais Vendido */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-[#49F503] border-2 border-[#58D4F2] text-black font-[900] italic text-xs sm:text-sm py-1 px-4 rounded-full flex items-center gap-1.5 shadow-[0_6px_20px_rgba(73,245,3,0.35)] whitespace-nowrap">
              <span>🔥 MAIS VENDIDO</span>
            </div>

            <div className="rounded-[22px] bg-[radial-gradient(ellipse_at_top,#0C2348_0%,#09132B_50%,#050914_100%)] p-5 sm:p-9 flex flex-col justify-between text-center relative">
              <div>
                <div className="mt-2 mb-3 inline-block bg-[#30FF00] text-black font-[900] italic text-xl sm:text-2xl py-2 px-8 rounded-2xl shadow-[0_6px_24px_rgba(48,255,0,0.28)] uppercase tracking-wide">
                  OFERTA PREMIUM
                </div>

                {/* Bundle Mockup Image (Pack Definitivo + Memes + Músicas + Efeitos) */}
                <div className="w-full my-2 flex justify-center">
                  <img 
                    src="/assets/packviral-100k-sem-fundo.webp" 
                    alt="Kit PackViral Definitivo de Conteúdo Viral - 100.000 Cortes" 
                    width={720}
                    height={658}
                    loading="lazy"
                    decoding="async"
                    className="w-72 sm:w-80 h-auto max-w-full object-contain"
                  />
                </div>

                <div className="my-3 py-3 px-4 rounded-2xl bg-[#050912]/70 border border-white/10">
                  <p className="text-sm sm:text-base italic text-gray-300 mb-0.5 tabular-nums">
                    De <span className="line-through text-red-600 font-bold decoration-2">R$97,00</span>
                  </p>
                  <p className="text-sm sm:text-base italic text-gray-200 mb-1.5">
                    por apenas:
                  </p>

                  {/* Price */}
                  <div className="flex items-start justify-center font-[900] text-[#00ff88] my-1 leading-none tabular-nums">
                    <span className="text-2xl sm:text-3xl font-extrabold mr-1 mt-2">R$</span>
                    <span className="text-6xl sm:text-8xl tracking-tighter">19</span>
                    <span className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">,90</span>
                  </div>
                </div>

                {/* Features list with dotted separators */}
                <div className="my-3">
                  <ul className="space-y-0 text-center font-bold italic text-[15px] sm:text-base text-white leading-snug">
                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>100.000 Cortes Virais</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>41 Nichos Diferentes</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>Acesso Vitalício</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>Garantia de 30 dias</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>Vídeos 100% Licenciados (Zero Bloqueios nas Plataformas)</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>Todos os Vídeos Sem Marca d&apos;Água</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>Cortes Livres de Metadados</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>+3 Super Bônus</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>Pack de Memes</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>Efeitos Sonoros</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>Músicas sem Copyright</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>Suporte 24h Ensinando a Viralizar + Número de Quem Já Viralizou</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-start justify-center gap-2.5 py-1.5 text-center font-normal">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black mt-0.5" />
                      <span><b>Bônus Extra 1:</b> +50mil cortes virais (totalizando 150mil cortes virais)</span>
                    </li>
                    <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />

                    <li className="flex items-start justify-center gap-2.5 py-1.5 text-center font-normal">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black mt-0.5" />
                      <span><b>Presente Surpresa:</b> Você Também Receberá um Presentinho Especial que Preparamos para Você Ainda Hoje…</span>
                    </li>
                  </ul>
                </div>

                {/* WhatsApp notification badge */}
                <div className="flex items-center justify-center gap-2.5 my-4 bg-green-500/10 border border-green-500/30 py-2 px-4 rounded-xl">
                  <svg className="w-7 h-7 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span className="text-white font-[900] italic text-xs sm:text-sm tracking-wide">
                    ACESSO IMEDIATO NO WHATSAPP
                  </span>
                </div>
              </div>

              <div>
                {/* Button */}
                <a 
                  href={getCheckoutUrl('https://pay.wiapy.com/2w3O7s9uCmeZ')}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackInitiateCheckout('Pack Verso Premium', 19.90)}
                  className="w-full py-4.5 px-6 rounded-full font-[900] text-lg sm:text-xl text-white bg-[#00E635] border border-[#00B328] shadow-[0_0_25px_8px_rgba(0,230,53,0.65)] hover:bg-[#00c92e] hover:scale-105 active:scale-95 transition-all block uppercase tracking-wider my-3 text-center cursor-pointer"
                >
                  LIBERAR SUPER PACK
                </a>

                {/* Social proof */}
                <p className="mt-2 text-xs sm:text-sm gradient-blue-text font-bold italic flex items-center justify-center gap-1.5">
                  <span>👑 +1.387 pessoas escolheram essa oferta</span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#080D18_0%,#050912_16%,#090B1B_38%,#040811_62%,#0B0A1A_84%,#050912_100%)] text-white font-['Montserrat'] selection:bg-[#58D4F2] selection:text-white">
      
      {/* Isolated Toast Notification */}
      <SalesToast />

      {/* HEADER / HERO SECTION */}
      <section className="relative pt-4 pb-7 sm:pt-8 sm:pb-11 px-0 bg-transparent overflow-x-clip">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_38%,rgba(14,165,233,0.17)_0%,rgba(8,24,48,0.30)_46%,transparent_76%),radial-gradient(ellipse_55%_42%_at_18%_18%,rgba(147,51,234,0.14)_0%,transparent_70%),radial-gradient(ellipse_52%_40%_at_82%_22%,rgba(255,46,147,0.11)_0%,rgba(255,107,53,0.06)_48%,transparent_74%)]"
          aria-hidden="true"
        />
        <div className="w-full max-w-none mx-auto text-center flex flex-col items-center relative z-10 px-0">
          
          {/* Top Urgency Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DC2626] border border-[#EF4444]/55 text-white text-[11px] sm:text-xs font-extrabold tracking-[0.14em] uppercase mb-2.5 shadow-[0_4px_18px_rgba(220,38,38,0.32)]">
            <span>🔥EM ALTA NO BRASIL!</span>
          </div>

          {/* Temporizador regressivo de 10 minutos */}
          <CountdownTimer />

          {/* Nova Logo Pack Viral + Bônus Exclusivo GTA 6 */}
          <div className="w-full flex justify-center items-center px-4 mb-2.5 sm:mb-4">
            <img
              src="/assets/packviral-gta6-bonus.webp"
              alt="Pack Viral com Bônus Exclusivo GTA 6"
              width={720}
              height={480}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-60 min-[390px]:w-64 sm:w-76 md:w-[330px] h-auto object-contain select-none drop-shadow-[0_14px_28px_rgba(0,0,0,0.75)]"
              draggable={false}
            />
          </div>

          {/* Main Hook Headline */}
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-[800] tracking-[-0.03em] text-white leading-[1.06] sm:leading-[1.05] mb-2.5 sm:mb-3.5 w-full max-w-full px-3 sm:px-6 text-center">
            {/* Mobile: 3 symmetrical balanced lines guaranteed to fit inside any mobile screen */}
            <span className="flex flex-col items-center w-full max-w-full sm:hidden text-[clamp(1.6rem,8.8vw,3.1rem)]">
              <span className="block max-w-full">Pare de perder</span>
              <span className="block max-w-full">
                tempo <span className="gradient-blue-text">criando</span>
              </span>
              <span className="block max-w-full gradient-blue-text px-0.5">conteúdo do zero</span>
            </span>

            {/* Tablet / Desktop: 2 full-width lines */}
            <span className="hidden sm:flex flex-col items-center w-full max-w-full text-[clamp(2rem,5.4vw,4.75rem)]">
              <span className="block max-w-full">Pare de perder tempo</span>
              <span className="block max-w-full gradient-blue-text px-1">criando conteúdo do zero</span>
            </span>
          </h1>

          {/* Subhead */}
          <p className="text-[15.5px] sm:text-xl font-medium text-neutral-200 text-center max-w-2xl px-3 sm:px-6 mb-2.5 sm:mb-3 leading-[1.4] mx-auto">
            Use <span className="text-white font-bold underline decoration-[#4A72A3] underline-offset-4">100.000 Vídeos Prontos</span> que já viralizaram e comece a crescer hoje mesmo, sem aparecer.
          </p>

          {/* Explicit No-Copyright & No-Watermark Guarantee Line */}
          <p className="text-[12.5px] sm:text-base font-bold text-[#58D4F2] text-center px-3 mb-3 sm:mb-4 tracking-wide">
            ✓ 100% Sem Copyright (Livre para Monetizar) &nbsp;•&nbsp; ✓ Todos Sem Marca d&apos;Água
          </p>

          {/* Exemplos do Pack Viral Showcase */}
          <div className="w-full max-w-[540px] sm:max-w-[580px] mx-auto px-2 sm:px-4 my-1 sm:my-2">
            <img
              src="/assets/smartphone-packviral.webp"
              alt="Smartphone Pack Viral com exemplos de vídeos no TikTok, Instagram Reels e YouTube Shorts"
              width={680}
              height={744}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto block object-contain select-none"
              draggable={false}
            />
          </div>

          {/* VSL PRINCIPAL */}
          <VSLPlayer className="mt-4 sm:mt-6 px-3 sm:px-4" />

          {/* Main CTA Button */}
          <button 
            onClick={scrollToOffers}
            className="mt-4 sm:mt-6 w-[calc(100%-1rem)] sm:w-full max-w-md py-4 sm:py-5 px-6 sm:px-8 rounded-full text-white font-[900] text-[18px] sm:text-xl tracking-wider uppercase flex items-center justify-center gap-3 green-glow-button animate-pulse-glow transition-all cursor-pointer relative overflow-hidden group shadow-[0_0_30px_rgba(10,224,40,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
              QUERO ACESSO IMEDIATO
              <img src="/assets/aistudio/26a1_d3a6d0c1.svg" alt="⚡" width={24} height={24} decoding="async" className="w-6 h-6 inline-block" />
            </span>
          </button>
        </div>
      </section>

      {/* ARSENAL DE CONTEÚDO INFINITO */}
      <InfiniteArsenalSection />

      {/* QUEM CRESCE HOJE - VERTICAL 4 STEPS TIMELINE */}
      <section className="py-6 sm:py-10 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.34)_35%,rgba(168,85,247,0.32)_58%,rgba(255,46,147,0.26)_78%,transparent_100%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_45%,rgba(14,165,233,0.10)_0%,transparent_72%),radial-gradient(ellipse_60%_50%_at_50%_72%,rgba(168,85,247,0.08)_0%,rgba(255,46,147,0.05)_50%,transparent_76%)]" aria-hidden="true" />
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Heading */}
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[28px] min-[390px]:text-[34px] sm:text-[38px] md:text-[44px] font-[800] text-center tracking-[-0.02em] leading-[1.08] text-white px-1">
            Quem Cresce Hoje Não Cria do Zero. Eles
            <span className="block gradient-blue-text mt-0.5">
              Reaproveitam Vídeos Que Já Viralizaram.
            </span>
          </h2>

          {/* Subheading */}
          <p className="mt-2.5 sm:mt-3.5 text-[17px] sm:text-xl md:text-[22px] font-semibold text-neutral-100 text-center">
            O jogo é volume, não perfeição.
          </p>

          {/* Vertical Connected Steps */}
          <div className="mt-6 sm:mt-8 max-w-[480px] sm:max-w-[560px] mx-auto flex flex-col px-1 sm:px-0">
            {[
              {
                number: '1',
                whiteLine: 'Escolha um',
                cyanLines: ['vídeo pronto'],
                icon: (
                  <svg viewBox="5 3 38 40" fill="none" className="w-[58px] h-[58px] sm:w-[74px] sm:h-[74px] text-[#58D4F2]" aria-hidden="true">
                    <path d="M9 17.5L38 11.5L36.2 6.8C35.8 5.6 34.5 4.9 33.3 5.2L9.8 10.1C8.5 10.4 7.7 11.6 8 12.9L9 17.5Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                    <path d="M15 9.1L17.5 15.5M23 7.4L25.5 13.8M31 5.7L33.2 12.1" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
                    <rect x="9" y="18" width="30" height="22" rx="3.5" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="2.4" />
                    <path d="M21 24.2L29.5 29L21 33.8V24.2Z" fill="currentColor" />
                  </svg>
                )
              },
              {
                number: '2',
                whiteLine: 'Poste no',
                cyanLines: ['TikTok ou', 'Instagram'],
                icon: (
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[#58D4F2]">
                    <svg viewBox="4.5 2 16.5 19" fill="none" className="w-[34px] h-[38px] sm:w-[44px] sm:h-[48px]" aria-hidden="true">
                      <path d="M14.5 3.5V14.8C14.5 17.1 12.6 19 10.3 19C8 19 6.1 17.1 6.1 14.8C6.1 12.6 7.8 10.8 10 10.6V13.4C9.2 13.6 8.7 14.1 8.7 14.8C8.7 15.7 9.4 16.4 10.3 16.4C11.2 16.4 11.9 15.7 11.9 14.8V3.5H14.5ZM14.5 3.5C15.1 5.8 16.9 7.6 19.2 8V10.7C17.4 10.6 15.8 9.9 14.5 8.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg viewBox="2 2 20 20" fill="none" className="w-[36px] h-[36px] sm:w-[46px] sm:h-[46px]" aria-hidden="true">
                      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="2.1" />
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2.1" />
                      <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" />
                    </svg>
                  </div>
                )
              },
              {
                number: '3',
                whiteLine: 'Repita esse',
                cyanLines: ['processo todos', 'os dias'],
                icon: (
                  <svg viewBox="8 8 32 32" fill="none" className="w-[56px] h-[56px] sm:w-[70px] sm:h-[70px] text-[#58D4F2]" aria-hidden="true">
                    <path d="M12.5 22.5C13.2 16.1 18.6 11.2 25.2 11.2C29.8 11.2 33.9 13.6 36.1 17.3" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" />
                    <path d="M37.4 11.8L37.4 18.8L30.4 18.8" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M35.5 25.5C34.8 31.9 29.4 36.8 22.8 36.8C18.2 36.8 14.1 34.4 11.9 30.7" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" />
                    <path d="M10.6 36.2L10.6 29.2L17.6 29.2" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              {
                number: '4',
                whiteLine: 'Veja seu',
                cyanLines: ['perfil crescer!'],
                icon: (
                  <svg viewBox="6 6 36 35" fill="none" className="w-[56px] h-[56px] sm:w-[70px] sm:h-[70px] text-[#58D4F2]" aria-hidden="true">
                    <rect x="9" y="29" width="6.5" height="9" rx="1.5" fill="currentColor" fillOpacity="0.9" />
                    <rect x="20.5" y="24" width="6.5" height="14" rx="1.5" fill="currentColor" fillOpacity="0.95" />
                    <rect x="32" y="18.5" width="6.5" height="19.5" rx="1.5" fill="currentColor" />
                    <path d="M10 22.5C18.5 20.8 26.5 16.8 34.5 9.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M29 8.8H35.5V15.3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              }
            ].map((step, idx, arr) => (
              <div key={step.number} className="relative">
                {/* Vertical connector line to next step */}
                {idx < arr.length - 1 && (
                  <div
                    className={`absolute left-[50px] sm:left-[63px] -translate-x-1/2 top-[100px] sm:top-[126px] bottom-[-22px] sm:bottom-[-26px] w-[4px] z-10 pointer-events-none ${
                      idx === 0
                        ? 'bg-gradient-to-b from-[#58D4F2] to-[#A855F7]'
                        : idx === 1
                          ? 'bg-gradient-to-b from-[#A855F7] to-[#FF2E93]'
                          : 'bg-gradient-to-b from-[#FF2E93] to-[#58D4F2]'
                    }`}
                    aria-hidden="true"
                  />
                )}

                <div className={`flex items-center ${idx < arr.length - 1 ? 'mb-[22px] sm:mb-[26px]' : ''}`}>
                  {/* Glowing Circle Icon Badge */}
                  <div className={`relative z-20 shrink-0 w-[100px] h-[100px] sm:w-[126px] sm:h-[126px] rounded-full bg-[radial-gradient(circle_at_center,rgba(88,212,242,0.22)_0%,#030710_72%)] border-2 flex items-center justify-center ${
                    idx === 1
                      ? 'border-[#A855F7] shadow-[0_0_22px_rgba(168,85,247,0.28)]'
                      : idx === 2
                        ? 'border-[#FF4DA6] shadow-[0_0_22px_rgba(255,46,147,0.26)]'
                        : 'border-[#58D4F2] shadow-[0_0_22px_rgba(88,212,242,0.26)]'
                  }`}>
                    {step.icon}
                    {/* Bottom glowing node dot */}
                    <span
                      className={`absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white border-2 ${
                        idx === 1 ? 'border-[#A855F7]' : idx === 2 ? 'border-[#FF4DA6]' : 'border-[#58D4F2]'
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Attached Horizontal Step Bar */}
                  <div className={`flex-1 -ml-8 sm:-ml-10 pl-11 sm:pl-14 pr-4 sm:pr-7 min-h-[86px] sm:min-h-[104px] py-3 rounded-r-full border border-l-0 bg-gradient-to-r from-[#091E32] via-[#0A1022] to-[#050A14] flex items-center ${
                    idx === 1
                      ? 'border-[#A855F7]/50'
                      : idx === 2
                        ? 'border-[#FF4DA6]/45'
                        : 'border-[#58D4F2]/50'
                  }`}>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] sm:text-[52px] font-[800] leading-none text-[#58D4F2] w-7 sm:w-10 text-center shrink-0">
                      {step.number}
                    </span>

                    <div className="w-[1px] h-12 sm:h-14 bg-gradient-to-b from-[#58D4F2]/50 via-[#A855F7]/40 to-[#FF2E93]/40 mx-3.5 sm:mx-5 shrink-0" aria-hidden="true" />

                    <div className="text-left leading-[1.2] text-[16px] sm:text-[19px]">
                      <div className="font-bold text-white">{step.whiteLine}</div>
                      <div className="font-semibold text-[#58D4F2]">
                        {step.cyanLines.map((line, lIdx) => (
                          <React.Fragment key={lIdx}>
                            {line}
                            {lIdx < step.cyanLines.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 100.000 CORTES PRONTOS PARA POSTAR - CATEGORIES GRID (3 COLUNAS) */}
      <section className="py-6 sm:py-10 px-[4px] sm:px-4 bg-transparent relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.38)_30%,rgba(255,46,147,0.34)_56%,rgba(255,107,53,0.30)_76%,transparent_100%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_78%_52%_at_50%_38%,rgba(14,165,233,0.10)_0%,transparent_72%),radial-gradient(ellipse_60%_45%_at_22%_68%,rgba(147,51,234,0.08)_0%,transparent_70%),radial-gradient(ellipse_55%_42%_at_80%_64%,rgba(255,107,53,0.06)_0%,transparent_72%)]" aria-hidden="true" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[30px] min-[390px]:text-[36px] sm:text-[42px] font-[800] text-center tracking-[-0.02em] leading-[1.08] mb-4 sm:mb-7 text-white px-1">
            <span className="gradient-blue-text">100.000 CORTES PRONTOS </span>PARA POSTAR
          </h2>

          <div className="grid grid-cols-3 gap-[5px] sm:gap-4 md:gap-5 items-stretch">
            {categories.map((cat, idx) => {
              const accentMode = idx % 3;
              const borderStyle =
                accentMode === 0
                  ? 'border-[#58D4F2]/65 border-b-[#58D4F2]/25 hover:border-[#58D4F2] shadow-[0_0_16px_rgba(88,212,242,0.14)] hover:shadow-[0_0_24px_rgba(88,212,242,0.28)]'
                  : accentMode === 1
                    ? 'border-[#58D4F2]/55 border-b-[#A855F7]/30 hover:border-[#A855F7]/85 shadow-[0_0_16px_rgba(88,212,242,0.12),0_4px_18px_rgba(168,85,247,0.12)] hover:shadow-[0_0_24px_rgba(168,85,247,0.26)]'
                    : 'border-[#58D4F2]/55 border-b-[#FF4DA6]/30 hover:border-[#FF4DA6]/85 shadow-[0_0_16px_rgba(88,212,242,0.12),0_4px_18px_rgba(255,46,147,0.10)] hover:shadow-[0_0_24px_rgba(255,46,147,0.24)]';
              const topHairline =
                accentMode === 0
                  ? 'via-[#58D4F2]/85'
                  : accentMode === 1
                    ? 'from-[#58D4F2]/40 via-[#A855F7]/85 to-[#FF4DA6]/40'
                    : 'from-[#58D4F2]/40 via-[#FF4DA6]/80 to-[#FF8C42]/50';

              return (
                <div
                  key={idx}
                  className={`relative bg-[linear-gradient(180deg,rgba(8,18,36,0.92)_0%,rgba(8,10,24,0.90)_100%)] border rounded-xl sm:rounded-2xl overflow-hidden flex flex-col text-center transition-all duration-200 group ${borderStyle} ${
                    idx === 12 ? 'col-start-2' : ''
                  }`}
                >
                  <div className={`pointer-events-none absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent ${topHairline} to-transparent z-10`} aria-hidden="true" />

                  <div className="w-full aspect-[400/218] overflow-hidden bg-[#060B16] border-b border-[#58D4F2]/25">
                    <img
                      src={cat.image}
                      alt={cat.description}
                      width={400}
                      height={218}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-[5px] sm:p-3.5 md:p-4 flex-1 flex items-center justify-center text-center">
                    <p className="text-[9.5px] min-[390px]:text-[10px] sm:text-xs md:text-[14px] font-medium text-neutral-100 leading-[1.24] sm:leading-snug">
                      {cat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO PERSUASIVA EXCLUSIVA — BÔNUS GTA 6 */}
      <Gta6BonusSection onScrollToOffers={scrollToOffers} />

      {/* O ACESSO É SIMPLES + BENEFÍCIOS */}
      <section className="py-6 sm:py-10 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.36)_35%,rgba(168,85,247,0.34)_60%,rgba(255,46,147,0.28)_80%,transparent_100%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_40%_at_50%_20%,rgba(14,165,233,0.09)_0%,transparent_72%),radial-gradient(ellipse_80%_46%_at_50%_82%,rgba(147,51,234,0.10)_0%,rgba(255,46,147,0.06)_52%,transparent_76%)]" aria-hidden="true" />
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Título Principal */}
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[32px] min-[390px]:text-[38px] sm:text-[42px] font-[800] text-center tracking-[-0.02em] leading-[1.08] mb-5 sm:mb-7 text-white">
            O Acesso é <span className="gradient-blue-text">Simples:</span>
          </h2>

          {/* Três textos explicativos abaixo do título */}
          <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 mb-6 sm:mb-9 px-1">
            <div className="flex items-start gap-3.5 sm:gap-4 text-left">
              <div className="mt-1 shrink-0 text-[#58D4F2]">
                <Layers className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <p className="text-[15.5px] sm:text-[17px] text-neutral-100 leading-relaxed">
                Você terá acesso ao pacote Premium com <strong className="text-white font-bold">+100mil cortes virais</strong> através de uma área de membros premium, <strong className="text-white font-bold">organizada por nicho</strong>. O link de acesso é enviado imediatamente no <strong className="text-white font-bold">e-mail cadastrado na compra e também no seu WhatsApp.</strong>
              </p>
            </div>

            <div className="flex items-start gap-3.5 sm:gap-4 text-left">
              <div className="mt-1 shrink-0 text-[#58D4F2]">
                <CloudDownload className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <p className="text-[15.5px] sm:text-[17px] text-neutral-100 leading-relaxed">
                Você terá acesso a um pacote com os melhores cortes do momento, prontos para utilizar nas principais plataformas, como: <strong className="text-white font-bold">TikTok, Instagram, YouTube, Kwai,</strong> etc. Basta baixar e postar!
              </p>
            </div>

            <div className="flex items-start gap-3.5 sm:gap-4 text-left">
              <div className="mt-1 shrink-0 text-[#58D4F2]">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <p className="text-[15.5px] sm:text-[17px] text-neutral-100 leading-relaxed">
                São vídeos de alta conversão, <strong className="text-white font-bold">testados e aprovados!</strong>
              </p>
            </div>
          </div>

          {/* Cinco cartões de benefícios lado a lado */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {[
              { icon: VideoOff, label: 'Não precisa aparecer' },
              { icon: SquarePen, label: 'Não precisa editar' },
              { icon: Award, label: 'Não precisa ter experiência' },
              { icon: Check, label: 'Conteúdo validado' },
              { icon: Flame, label: 'Alta chance de viralização' }
            ].map((benefit, idx) => {
              const IconComponent = benefit.icon;
              const isPurple = idx === 1 || idx === 3;
              const isPinkSunset = idx === 2 || idx === 4;
              return (
                <div
                  key={idx}
                  className={`relative overflow-hidden bg-[linear-gradient(165deg,rgba(7,13,25,0.94)_0%,rgba(9,10,24,0.94)_100%)] rounded-2xl px-3 py-5 sm:py-6 flex flex-col items-center justify-center text-center transition-all duration-200 ${
                    isPurple
                      ? 'border border-[#58D4F2]/60 hover:border-[#A855F7] shadow-[0_0_18px_rgba(88,212,242,0.14),0_6px_20px_rgba(168,85,247,0.14)] hover:shadow-[0_0_26px_rgba(168,85,247,0.28)]'
                      : isPinkSunset
                        ? 'border border-[#58D4F2]/55 hover:border-[#FF4DA6] shadow-[0_0_18px_rgba(88,212,242,0.14),0_6px_20px_rgba(255,46,147,0.12)] hover:shadow-[0_0_26px_rgba(255,46,147,0.26)]'
                        : 'border border-[#58D4F2]/75 hover:border-[#58D4F2] shadow-[0_0_18px_rgba(88,212,242,0.18)] hover:shadow-[0_0_26px_rgba(88,212,242,0.32)]'
                  } ${
                    idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent ${
                      isPurple
                        ? 'via-[#A855F7]/75'
                        : isPinkSunset
                          ? 'via-[#FF4DA6]/75'
                          : 'via-[#58D4F2]/80'
                    } to-transparent`}
                    aria-hidden="true"
                  />
                  <div className="mb-3 text-[#58D4F2]">
                    <IconComponent className="w-9 h-9 sm:w-10 sm:h-10" strokeWidth={2.2} />
                  </div>
                  <p className="text-[14px] sm:text-[15px] font-extrabold text-white leading-snug">
                    {benefit.label}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SEÇÃO - PARA QUEM É O PACK VIRAL? */}
      <section className="py-6 sm:py-8 px-3 sm:px-4 bg-transparent relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.34)_35%,rgba(168,85,247,0.32)_62%,transparent_100%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_46%,rgba(14,165,233,0.09)_0%,rgba(147,51,234,0.07)_46%,transparent_76%)]" aria-hidden="true" />
        <div className="max-w-2xl mx-auto relative z-10">
          {/* Header com Título e Logo do Personagem PackViral */}
          <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[22px] min-[390px]:text-[26px] sm:text-[32px] md:text-[36px] font-[800] text-white tracking-wide uppercase leading-tight">
              PARA QUEM É O
            </h2>
            <div className="mt-2 flex items-center justify-center">
              <img
                src="/assets/logo-packviral-personagem.webp"
                alt="Pack Viral"
                width={384}
                height={256}
                loading="lazy"
                decoding="async"
                className="w-52 min-[390px]:w-60 sm:w-68 md:w-76 max-w-full h-auto object-contain select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* 6 Benefit Items Stacked Vertically */}
          <div className="max-w-[580px] mx-auto flex flex-col gap-2.5 sm:gap-3 px-1 sm:px-0">
            {[
              "Para quem quer ganhar dinheiro postando vídeos sem aparecer.",
              "Para quem não quer perder tempo criando ou editando.",
              "Para iniciantes, mesmo sem seguidores.",
              "Para quem quer começar usando apenas o celular.",
              "Para quem busca renda extra nas redes sociais.",
              "Para quem trabalha ou estuda e tem pouco tempo."
            ].map((text, idx) => (
              <div
                key={idx}
                className="relative flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-[linear-gradient(135deg,rgba(7,13,25,0.96)_0%,rgba(11,16,34,0.95)_100%)] border border-[#58D4F2]/30 hover:border-[#58D4F2]/70 transition-all duration-200 shadow-sm"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#05D321]/15 border border-[#05D321]/40 flex items-center justify-center shrink-0 text-[#05D321]">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                </div>
                <p className="flex-1 text-[14.5px] min-[390px]:text-[15.5px] sm:text-[16.5px] text-neutral-100 font-semibold leading-[1.4]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* FIRST MONTH RESULTS */}
      <section className="py-6 sm:py-9 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.36)_35%,rgba(255,46,147,0.32)_62%,transparent_100%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_40%_50%,rgba(14,165,233,0.09)_0%,transparent_72%),radial-gradient(ellipse_55%_45%_at_72%_55%,rgba(168,85,247,0.07)_0%,rgba(255,107,53,0.04)_52%,transparent_74%)]" aria-hidden="true" />
        <div className="w-full mx-auto text-center flex flex-col items-center relative z-10">
          {/* First Month Results */}
          <div className="w-full max-w-4xl px-0 sm:px-2">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[26px] min-[390px]:text-[32px] sm:text-[40px] font-[800] text-white tracking-[-0.02em] leading-[1.1] mb-1.5 flex items-center justify-center gap-1.5 sm:gap-3 px-2">
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 gradient-blue-text shrink-0 animate-arrow-bounce" />
              <span className="min-w-0">Resultado do primeiro mês usando esse Pack</span>
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 gradient-blue-text shrink-0 animate-arrow-bounce" />
            </h2>
            <p className="text-sm sm:text-base font-medium text-neutral-200 mb-1">
              Três dos nossos alunos
            </p>
            <p className="text-sm sm:text-base font-semibold text-white mb-4 flex items-center justify-center gap-1.5">
              <span>Arraste para o lado</span>
              <ArrowRight className="w-4 h-4 text-[#58D4F2] shrink-0" />
            </p>

            <div
              ref={firstMonthScrollRef}
              className="relative flex sm:grid sm:grid-cols-3 gap-3 sm:gap-5 items-center sm:items-stretch overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-2 sm:pb-0 -mx-2 px-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {[
                { src: '/assets/aistudio/result-tiktok-1.webp', alt: 'Perfil @falecomdeus_ com 1,8 milhão de seguidores e 14,8 milhões de curtidas', width: 900, height: 502 },
                { src: '/assets/aistudio/result-tiktok-2.webp', alt: 'Perfil @itsamerog.2 com 484,5 mil seguidores e 30 milhões de curtidas', width: 900, height: 519 },
                { src: '/assets/aistudio/result-tiktok-3.webp', alt: 'Perfil @agoftbl com 293,7 mil seguidores e 35,4 milhões de curtidas', width: 900, height: 504 }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-[#080E1A] rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 w-[90%] sm:w-full shrink-0 sm:shrink snap-center ${
                    idx === 1
                      ? 'border border-[#A855F7]/45 hover:border-[#A855F7] shadow-[0_12px_30px_rgba(168,85,247,0.16)]'
                      : idx === 2
                        ? 'border border-[#FF4DA6]/35 hover:border-[#FF4DA6] shadow-[0_12px_30px_rgba(255,46,147,0.14)]'
                        : 'border border-[#58D4F2]/40 hover:border-[#58D4F2] shadow-[0_12px_30px_rgba(88,212,242,0.15)]'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block object-contain select-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUEM ADQUIRIU, GOSTOU ❤️ - Manual carousel with controls */}
      <section className="py-6 sm:py-9 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.34)_35%,rgba(168,85,247,0.32)_60%,rgba(255,46,147,0.26)_80%,transparent_100%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_52%,rgba(14,165,233,0.09)_0%,rgba(147,51,234,0.07)_48%,transparent_76%)]" aria-hidden="true" />
        <div className="w-full max-w-md mx-auto text-center relative z-10">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[30px] min-[390px]:text-[36px] sm:text-[40px] font-[800] text-white tracking-[-0.02em] leading-[1.1] mb-4">
            Quem adquiriu, <span className="gradient-blue-text">gostou</span> ❤️
          </h2>

          <div className="relative w-full sm:max-w-[420px] mx-auto px-3 sm:px-0">
            <div className="overflow-hidden rounded-2xl bg-[#080E1A] border-2 border-[#58D4F2] shadow-[0_0_26px_rgba(88,212,242,0.22),0_10px_32px_rgba(168,85,247,0.16)]">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${photoSlide * 100}%)` }}
              >
                {photoReviews.map((item, idx) => (
                  <div key={idx} className="w-full shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto block object-contain select-none"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={prevPhotoSlide}
              aria-label="Depoimento anterior"
              className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-20 bg-black/90 hover:bg-[#112238] text-white p-2 sm:p-2.5 rounded-full border border-[#58D4F2]/70 hover:border-[#A855F7] transition-all cursor-pointer shadow-xl active:scale-95 touch-manipulation"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#58D4F2]" />
            </button>

            <button
              type="button"
              onClick={nextPhotoSlide}
              aria-label="Próximo depoimento"
              className="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-20 bg-black/90 hover:bg-[#112238] text-white p-2 sm:p-2.5 rounded-full border border-[#58D4F2]/70 hover:border-[#FF4DA6] transition-all cursor-pointer shadow-xl active:scale-95 touch-manipulation"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#58D4F2]" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-3.5">
            {photoReviews.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPhotoSlide(idx)}
                aria-label={`Ver depoimento ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer touch-manipulation ${
                  photoSlide === idx ? 'w-7 bg-gradient-to-r from-[#58D4F2] via-[#A855F7] to-[#FF2E93]' : 'w-2.5 bg-neutral-700 hover:bg-neutral-500'
                }`}
              />
            ))}
          </div>


        </div>
      </section>

      {/* OFFERS SECTION (ESCOLHA A MELHOR OFERTA PARA VOCÊ) */}
      {renderOffersSection('escolha')}

      {/* GUARANTEE BADGE (7 DIAS) */}
      <section className="py-4 sm:py-7 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.10)_0%,rgba(147,51,234,0.06)_40%,transparent_66%)]" aria-hidden="true" />
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
            <img 
              src="/assets/selo-garantia-7-dias.webp" 
              alt="Selo de Garantia de 7 Dias" 
              width={520}
              height={520}
              loading="lazy"
              decoding="async"
              className="relative w-52 sm:w-64 h-auto mx-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* SUPORTE 24 HORAS (ANTES E DEPOIS DA COMPRA) */}
      <section className="py-6 sm:py-9 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.34)_35%,rgba(168,85,247,0.32)_62%,transparent_100%)]" aria-hidden="true" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg-[linear-gradient(155deg,rgba(8,14,26,0.94)_0%,rgba(15,12,30,0.94)_100%)] border border-[#58D4F2]/65 rounded-2xl p-5 sm:p-8 text-center shadow-[0_0_25px_rgba(88,212,242,0.14),0_10px_28px_rgba(168,85,247,0.14)] relative overflow-hidden">
            <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-[#58D4F2]/60 via-[#A855F7]/75 to-[#FF4DA6]/60 pointer-events-none" />
            
            <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(135deg,#0C2342_0%,#1A1335_100%)] border border-[#58D4F2] flex items-center justify-center mx-auto mb-3.5 shadow-[0_0_16px_rgba(88,212,242,0.22)]">
              <Headphones className="w-7 h-7 text-[#58D4F2]" />
            </div>

            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[28px] min-[390px]:text-[34px] sm:text-[34px] font-[800] text-white tracking-[-0.02em] leading-[1.1] mb-2.5 uppercase">
              SUPORTE <span className="gradient-blue-text">24 HORAS</span>
            </h2>

            <p className="text-[15px] sm:text-base text-neutral-200 max-w-xl mx-auto leading-relaxed mb-5">
              Quando você compra, você recebe <span className="text-white font-semibold">suporte 24 horas ensinando passo a passo a viralizar</span> e também ganha o{' '}
              <span className="text-white font-semibold">número direto das melhores pessoas que já viralizaram</span> com o pack. E se tiver qualquer dúvida antes de adquirir, é só chamar no WhatsApp agora mesmo:
            </p>

            <a
              href="https://wa.me/5515991035895?text=oi%2C%20eu%20quero%20adquirir%20o%20pack%20viral%20de%20voc%C3%AAs%2C%20mas%20antes%20preciso%20tirar%20algumas%20duvidas."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1fb858] text-black font-[900] text-sm sm:text-base uppercase tracking-wider shadow-[0_0_20px_rgba(37,211,102,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>TIRAR DÚVIDAS NO WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-6 sm:py-10 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.34)_35%,rgba(168,85,247,0.32)_62%,transparent_100%)]" aria-hidden="true" />
        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          
          {/* FAQ Title */}
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[34px] min-[390px]:text-[42px] sm:text-[42px] font-[800] gradient-blue-text tracking-[-0.02em] leading-[1.1] mb-4 sm:mb-6">
            FAQ
          </h2>

          {/* FAQ Accordion */}
          <div className="w-full max-w-3xl space-y-3 sm:space-y-4">
            {faqItems.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-[linear-gradient(155deg,rgba(8,14,26,0.92)_0%,rgba(12,11,26,0.92)_100%)] border border-[#58D4F2]/25 rounded-2xl p-4 sm:p-6 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A855F7]/75 hover:shadow-[0_0_20px_rgba(168,85,247,0.16)] cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-[17px] sm:text-2xl font-bold text-white leading-tight">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-6 h-6 gradient-blue-text shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
                <div className={`mt-2.5 text-[15px] sm:text-lg text-neutral-200 font-normal leading-relaxed ${
                  openFaq === idx ? 'block' : 'block sm:block'
                }`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-6 sm:py-9 px-2 sm:px-4 bg-transparent relative overflow-hidden text-center">
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.34)_32%,rgba(255,46,147,0.32)_58%,rgba(255,107,53,0.26)_78%,transparent_100%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_50%_55%,rgba(14,165,233,0.10)_0%,rgba(147,51,234,0.08)_46%,rgba(255,46,147,0.05)_70%,transparent_80%)]" aria-hidden="true" />
        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[30px] min-[390px]:text-[36px] sm:text-[42px] font-[800] italic uppercase text-white tracking-[-0.02em] leading-[1.08] mb-2">
            COMECE <span className="gradient-blue-text">HOJE MESMO</span>
          </h2>
          <p className="text-[16px] sm:text-lg italic font-medium text-neutral-200 mb-5 max-w-xl">
            Tenha acesso aos 100.000 cortes e comece a postar agora.
          </p>
          <button 
            onClick={scrollToOffers}
            className="w-full max-w-sm py-4 px-10 sm:px-14 rounded-2xl font-[800] text-lg text-white bg-[#05D321] shadow-[0_0_24px_rgba(5,211,33,0.6)] hover:scale-105 active:scale-95 transition-transform uppercase tracking-wider cursor-pointer"
          >
            QUERO MEU ACESSO
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-8 pb-12 px-4 bg-transparent relative text-center">
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.28)_35%,rgba(168,85,247,0.26)_65%,transparent_100%)]" aria-hidden="true" />
        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          
          {/* PackViral Product Circular Logo */}
          <div className="mb-4">
            <img 
              src="/assets/packviral-logo.webp" 
              alt="PackViral" 
              width={320}
              height={320}
              loading="lazy"
              decoding="async"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto object-cover border-2 border-[#58D4F2] shadow-[0_0_22px_rgba(88,212,242,0.34),0_0_28px_rgba(168,85,247,0.20)]" 
            />
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-neutral-200 mb-3">
            <button 
              onClick={() => setPolicyModal('privacy')}
              className="text-neutral-200 hover:gradient-blue-text transition-colors"
            >
              Política de Privacidade
            </button>
            <span className="text-neutral-600"> | </span>
            <button 
              onClick={() => setPolicyModal('terms')}
              className="text-neutral-200 hover:gradient-blue-text transition-colors"
            >
              Termos de Uso
            </button>
          </div>

          {/* Subtle separator */}
          <div className="w-full max-w-2xl border-t border-white/10 my-3" />

          {/* Support */}
          <p className="text-sm text-neutral-300 mb-1 font-normal">
            Suporte: <a href="mailto:contato@packverso.shop" className="hover:gradient-blue-text transition-colors">contato@packverso.shop</a>
          </p>

          {/* Legal Disclaimer */}
          <p className="text-[11px] sm:text-xs italic text-neutral-400 max-w-2xl mt-1 leading-relaxed">
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.
          </p>
        </div>
      </footer>

      {/* MODAL FOR POLICIES */}
      {policyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#07080A] border border-[#58D4F2] max-w-2xl w-full max-h-[80vh] rounded-3xl p-6 sm:p-8 overflow-y-auto relative text-left">
            <button 
              onClick={() => setPolicyModal(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1"
            >
              <X className="w-6 h-6" />
            </button>

            {policyModal === 'privacy' ? (
              <div>
                <h3 className="text-2xl font-bold gradient-blue-text mb-4">Política de Privacidade</h3>
                <div className="space-y-3 text-sm text-neutral-300 leading-relaxed">
                  <p>
                    A sua privacidade é de extrema importância para nós. Esta política explica como coletamos, usamos e protegemos as informações fornecidas ao acessar e utilizar os serviços do Pack Verso.
                  </p>
                  <p>
                    <strong>1. Coleta de Informações:</strong> Coletamos apenas as informações necessárias para processamento do pedido e envio dos acessos (e-mail e número do WhatsApp para entrega instantânea do material).
                  </p>
                  <p>
                    <strong>2. Uso dos Dados:</strong> As informações coletadas são utilizadas exclusivamente para liberação do conteúdo adquirido, comunicação sobre atualizações e suporte ao cliente.
                  </p>
                  <p>
                    <strong>3. Segurança:</strong> Seus dados pessoais são processados através de plataformas de pagamento com criptografia de ponta a ponta e nunca serão vendidos ou compartilhados com terceiros.
                  </p>
                  <p>
                    <strong>4. Dúvidas:</strong> Entre em contato conosco pelo e-mail <em>contato@packverso.shop</em> para qualquer esclarecimento sobre a privacidade dos seus dados.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold gradient-blue-text mb-4">Termos de Uso</h3>
                <div className="space-y-3 text-sm text-neutral-300 leading-relaxed">
                  <p>
                    Ao adquirir o Pack Verso, você concorda com os termos e condições descritos abaixo.
                  </p>
                  <p>
                    <strong>1. Licença de Uso:</strong> Você recebe acesso ao acervo digital de vídeos para uso em suas redes sociais e criação de conteúdo. O acesso é pessoal e intransferível.
                  </p>
                  <p>
                    <strong>2. Garantia de 7 Dias:</strong> Caso não fique satisfeito, você tem até 7 dias após a aprovação da compra para solicitar o reembolso integral diretamente pelo canal de suporte.
                  </p>
                  <p>
                    <strong>3. Entrega do Acesso:</strong> O envio do link e acesso aos arquivos ocorre de forma imediata após a confirmação do pagamento, disponibilizado via WhatsApp e e-mail cadastrado.
                  </p>
                  <p>
                    <strong>4. Responsabilidade:</strong> O usuário é o único responsável pela postagem e gestão de suas respectivas contas nas plataformas de redes sociais.
                  </p>
                </div>
              </div>
            )}

            <button 
              onClick={() => setPolicyModal(null)}
              className="mt-6 w-full py-3 bg-[#10131A] hover:bg-[#162844] text-white font-bold rounded-xl transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* End Policy Modal */}

      <WhatsAppButton />
    </div>
  );
}
