import React, { useState, useEffect } from 'react';
import UpPage from './UpPage';
import VSLPlayer from './components/VSLPlayer';
import { 
  trackPageView, 
  trackViewContent, 
  trackInitiateCheckout,
  getCheckoutUrl
} from './utils/metaPixel';
import { 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Crown, 
  Gift, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Sparkles, 
  Star,
  Users,
  Video,
  EyeOff,
  Radio,
  FileCheck,
  Music,
  Smile,
  X,
  ArrowDown,
  ArrowRight
} from 'lucide-react';

// Verification/Instagram results for carousel
const carouselSlides = [
  {
    image: '/assets/aistudio/Whats-App-Image-2026-02-08-at-16-56-59-4-1-1_3a93f6c5.jpg',
    handle: '@desenhoadultoo',
    followers: '238 mil seguidores',
    niche: 'Cortes Família da Pesada'
  },
  {
    image: '/assets/aistudio/Whats-App-Image-2026-02-08-at-16-56-59-3-1-1_7d1919ff.jpg',
    handle: '@evolutionmilionaria',
    followers: '470 mil seguidores',
    niche: 'Motivação e Milionário'
  },
  {
    image: '/assets/aistudio/Whats-App-Image-2026-02-08-at-16-56-59-2-1-1_022bc8d0.jpg',
    handle: '@amoopicapau',
    followers: '311 mil seguidores',
    niche: 'Cenas Pica-Pau'
  },
  {
    image: '/assets/aistudio/Whats-App-Image-2026-02-08-at-16-56-58-1-1_48aff00d.jpg',
    handle: '@topvideodesenho',
    followers: '171 mil seguidores',
    niche: 'Desenhos e Nostalgia'
  },
  {
    image: '/assets/aistudio/Whats-App-Image-2026-02-08-at-16-56-58-1-1-1_152f3c6f.jpg',
    handle: '@memoriaanimada',
    followers: '101 mil seguidores',
    niche: 'Os Simpsons'
  },
  {
    image: '/assets/aistudio/Whats-App-Image-2026-02-08-at-16-57-00-1-1_6b998511.jpg',
    handle: '@smsindelicado',
    followers: '5,3 mi seguidores',
    niche: 'Memes & Diálogos'
  }
];

// Grid of content categories
const categories = [
  {
    image: '/assets/aistudio/Design-sem-nome-3-1-1_5dd80040.png',
    description: 'Mais de 250 cortes de melhores momentos do futebol.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-2-1-1_e15ecb4f.png',
    description: 'Mais de 350 cortes de Family Guy selecionados.'
  },
  {
    image: '/assets/aistudio/AVIACAO-47-1_71ffc73e.png',
    description: 'Mais de 2500 cortes de Varios Animes.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-4-1-1_8062e2f9.png',
    description: 'Não tem quem não goste de Cortes de Os Simpsons. Uma das séries animadas mais antigas ainda ativas. Mais de 120 cortes prontos.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-5-1-1_f59abd97.png',
    description: 'São mais de 900 cortes prontos para postar de filmes e séries variadas.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-6-1-1_a988238a.png',
    description: 'Mais de 600 cortes prontos de Pica-Pau, a maioria já legendados, só postar!'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-7-1-1_0772e08a.png',
    description: 'Cortes de Rick and Morty estão viralizando com força. Conteúdos que capturam atenção e entregam humor ácido na medida certa. Receba mais de 100 cortes prontos.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-8-1-1_6e6dd46b.png',
    description: 'Mais de 130 cortes de Todo Mundo Odeia o Chris prontos para postar.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-9-1-1_e14a7024.png',
    description: 'São mais de 500 cortes de Academia para postar na sua página e viralizar!'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-10-1-1.png',
    description: 'Mais de 500 vídeos de memes limpos + efeitos sonoros.'
  },
  {
    image: '/assets/aistudio/AVIACAO-46.png',
    description: 'Centenas de cortes religiosos para viralizar sua página gospel.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-12-1-1.png',
    description: 'Os melhores cortes de Pablo Marçal.'
  },
  {
    image: '/assets/aistudio/Design-sem-nome-13-1-1.png',
    description: 'Os melhores cortes de Pablo Marçal.'
  }
];

// Testimonials
const testimonials = [
  {
    image: '/assets/review-andre.png',
    name: 'André Martins'
  },
  {
    image: '/assets/review-lucas.png',
    name: 'Lucas Almeida'
  },
  {
    image: '/assets/review-juliana.png',
    name: 'Juliana Santos'
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
  }
];

export default function App() {
  const [activeSlide, setActiveSlide] = useState(3);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | null>(null);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

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

  useEffect(() => {
    trackPageView();
    trackViewContent('Pack Verso - 50.000 Cortes Virais', 19.00);
  }, []);

  const navigateToUp = () => {
    trackInitiateCheckout('Pack Verso Básico - Redirecionamento Up', 19.00);
    const search = typeof window !== 'undefined' ? window.location.search : '';
    window.history.pushState({}, '', '/up' + search);
    setCurrentPath('/up');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Auto carousel rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Periodic conversion notifications
  useEffect(() => {
    const notifications = [
      '⚡ Matheus de SP acabou de adquirir o Super Pack!',
      '🔥 Lucas R. de BH garantiu a Oferta Premium!',
      '👑 Juliana S. de Curitiba começou a viralizar hoje!',
      '⚡ Rodrigo F. de Goiânia liberou o acesso imediato!'
    ];
    let index = 0;
    const interval = setInterval(() => {
      setToastNotification(notifications[index]);
      index = (index + 1) % notifications.length;
      setTimeout(() => setToastNotification(null), 4000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const scrollToOffers = () => {
    const el = document.getElementById('escolha');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  if (currentPath === '/up' || currentPath === '/up/' || currentPath.startsWith('/up')) {
    return <UpPage />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-['Montserrat'] selection:bg-[#58D4F2] selection:text-white">
      
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed bottom-4 left-4 z-50 bg-[#08090C] border border-[#58D4F2] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0AE028]" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* HEADER / HERO SECTION */}
      <section className="relative pt-6 pb-8 sm:pt-10 sm:pb-12 px-4 sm:px-6 bg-black overflow-hidden border-b border-white/10">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center relative z-10">
          
          {/* Top Status Pill / Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DC2626] border border-[#EF4444]/50 text-white text-[11px] sm:text-xs font-extrabold tracking-[0.14em] uppercase mb-4">
            <span>🔥EM ALTA NO BRASIL!</span>
          </div>

          {/* Main Hook Headline */}
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[clamp(1.875rem,7.6vw,4.75rem)] font-[800] tracking-[-0.035em] text-white leading-[1.06] mb-4 text-balance w-full max-w-6xl">
            Pare de perder tempo <span className="gradient-blue-text">criando conteúdo do zero</span>
          </h1>

          {/* Subhead */}
          <p className="text-base sm:text-xl font-medium text-neutral-300 max-w-2xl mb-4 sm:mb-6 leading-relaxed">
            Use <span className="text-white font-bold underline decoration-[#4A72A3] underline-offset-4">50.000 Vídeos Prontos</span> que já viralizaram e comece a crescer hoje mesmo, sem aparecer.
          </p>

          {/* VSL Video Player */}
          <VSLPlayer videoSrc="/videoplayback.mp4" className="my-2" />

          {/* Main CTA Button */}
          <button 
            onClick={scrollToOffers}
            className="mt-5 sm:mt-6 w-full max-w-md py-4 sm:py-5 px-8 rounded-full text-white font-[900] text-lg sm:text-xl tracking-wider uppercase flex items-center justify-center gap-3 green-glow-button animate-pulse-glow transition-all cursor-pointer relative overflow-hidden group shadow-[0_0_30px_rgba(10,224,40,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
              QUERO ACESSO IMEDIATO
              <img src="/assets/aistudio/26a1_d3a6d0c1.svg" alt="⚡" className="w-6 h-6 inline-block" />
            </span>
          </button>

          {/* First Month Results */}
          <div className="mt-8 sm:mt-10 w-full max-w-4xl">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl sm:text-2xl md:text-3xl font-[800] text-white tracking-[-0.02em] mb-2 flex items-center justify-center gap-2.5 sm:gap-3">
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 gradient-blue-text shrink-0 animate-arrow-bounce" />
              <span>Resultado do primeiro mês usando esse Pack</span>
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 gradient-blue-text shrink-0 animate-arrow-bounce" />
            </h2>
            <p className="text-xs sm:text-sm font-medium text-white mb-4 flex items-center justify-center gap-1.5">
              <span>Arraste para o lado</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
            </p>

            <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-5 items-start overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {[
                { src: '/assets/result-1.webp', alt: 'Resultado de desempenho no primeiro mês com 25.8M de alcance' },
                { src: '/assets/result-2.webp', alt: 'Resultado de recompensas estimadas no primeiro mês' },
                { src: '/assets/result-3.webp', alt: 'Depoimento de cliente com vídeos batendo mais de 1M de views em 4 dias' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#07080A] border border-white/10 hover:border-[#58D4F2] rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 w-[76%] sm:w-full shrink-0 sm:shrink snap-center"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto block object-contain select-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MINDSET HIGHLIGHT BOX */}
      <section className="py-4 sm:py-6 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#07080A] border border-[#58D4F2] rounded-2xl p-4 sm:p-7 text-center shadow-xl space-y-1 relative overflow-hidden">
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#58D4F2]/60 to-transparent pointer-events-none" />
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-xl font-semibold text-white relative z-10">
              É assim que os perfis de cortes <span className="gradient-blue-text font-extrabold underline decoration-[#3A6091] decoration-2 underline-offset-4">crescem hoje.</span>
            </h3>
            <p className="text-sm sm:text-lg font-normal text-neutral-300 relative z-10">
              Eles reaproveitam vídeos que já viralizaram.
            </p>
            <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-2xl font-[800] gradient-blue-text pt-1 tracking-tight leading-tight relative z-10">
              O jogo é colocar mais vídeos no ar todos os dias.
            </h4>
          </div>
        </div>
      </section>



      {/* "É SIMPLES ASSIM" - 4 STEPS */}
      <section className="py-7 sm:py-10 px-3 sm:px-4 bg-[#040406] border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Animated Arrow */}
          <div className="gradient-blue-text text-2xl sm:text-3xl font-black mb-1 animate-arrow-bounce">
            ↓
          </div>

          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-4xl font-[800] text-white tracking-[-0.02em] mb-5 sm:mb-7 uppercase">
            É SIMPLES ASSIM
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            
            {/* Step 1 */}
            <div className="bg-[#08090C] border border-white/10 hover:border-[#58D4F2] rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group min-h-[130px] sm:min-h-[180px] relative overflow-hidden">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#112238] border border-[#58D4F2] text-[#D8E5F3] font-['Plus_Jakarta_Sans',sans-serif] font-[800] text-sm sm:text-lg flex items-center justify-center mb-2.5 sm:mb-3.5 shadow-md group-hover:scale-105 transition-transform">
                1
              </div>
              <h3 className="text-xs sm:text-base font-bold text-white leading-tight">
                Escolha um vídeo<br />pronto
              </h3>
            </div>

            {/* Step 2 */}
            <div className="bg-[#08090C] border border-white/10 hover:border-[#58D4F2] rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group min-h-[130px] sm:min-h-[180px] relative overflow-hidden">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#112238] border border-[#58D4F2] text-[#D8E5F3] font-['Plus_Jakarta_Sans',sans-serif] font-[800] text-sm sm:text-lg flex items-center justify-center mb-2.5 sm:mb-3.5 shadow-md group-hover:scale-105 transition-transform">
                2
              </div>
              <h3 className="text-xs sm:text-base font-bold text-white leading-tight">
                Poste no TikTok ou<br />Instagram
              </h3>
            </div>

            {/* Step 3 */}
            <div className="bg-[#08090C] border border-white/10 hover:border-[#58D4F2] rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group min-h-[130px] sm:min-h-[180px] relative overflow-hidden">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#112238] border border-[#58D4F2] text-[#D8E5F3] font-['Plus_Jakarta_Sans',sans-serif] font-[800] text-sm sm:text-lg flex items-center justify-center mb-2.5 sm:mb-3.5 shadow-md group-hover:scale-105 transition-transform">
                3
              </div>
              <h3 className="text-xs sm:text-base font-bold text-white leading-tight">
                Repita todos<br />os dias
              </h3>
            </div>

            {/* Step 4 - Rocket */}
            <div className="bg-[#07090D] border border-[#58D4F2] hover:border-[#3A6091] rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group min-h-[130px] sm:min-h-[180px] relative overflow-hidden">
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#58D4F2]/60 to-transparent pointer-events-none" />
              <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2.5 sm:mb-3.5 flex items-center justify-center animate-rocket-float">
                <img src="/assets/aistudio/1f680_3892ef66.svg" alt="🚀" className="w-7 h-7 sm:w-9 sm:h-9" />
              </div>
              <h3 className="text-xs sm:text-base font-bold text-[#7AA0CC] leading-tight">
                Comece a crescer
              </h3>
            </div>

          </div>
        </div>
      </section>

      {/* 50.000 CORTES PRONTOS PARA POSTAR - CATEGORIES GRID */}
      <section className="py-6 sm:py-8 px-4 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-4xl font-[800] text-center tracking-[-0.02em] mb-5 sm:mb-7 text-white">
            <span className="gradient-blue-text">50.000 CORTES PRONTOS </span>PARA POSTAR
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                className="bg-[#07080A] border border-white/10 hover:border-[#58D4F2] hover:-translate-y-1 hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-200 flex flex-col group cursor-pointer"
              >
                <div className="w-full aspect-[400/218] overflow-hidden bg-black">
                  <img 
                    src={cat.image} 
                    alt={cat.description} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <div className="p-4 flex-1 flex items-center justify-center text-center border-t border-white/5">
                  <p className="text-[13px] sm:text-[14px] font-[500] text-neutral-300 leading-snug">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE ESSE PACK FUNCIONA */}
      <section className="py-6 sm:py-8 px-4 bg-[#040406] border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-4xl font-[800] text-center tracking-[-0.02em] mb-4 sm:mb-6 text-white">
            POR QUE ESSE <span className="gradient-blue-text">PACK FUNCIONA</span>
          </h2>

          <div className="space-y-2.5 sm:space-y-3 max-w-2xl mx-auto">
            {[
              'Não precisa aparecer',
              'Não precisa editar',
              'Não precisa ter experiência',
              'Conteúdo validado',
              'Alta chance de viralização'
            ].map((text, idx) => (
              <div 
                key={idx}
                className="w-full min-h-[52px] sm:min-h-[58px] flex items-center gap-3.5 sm:gap-4 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#08090C] border border-white/10 hover:border-[#58D4F2] rounded-xl text-white font-semibold text-sm sm:text-base transition-all duration-200 hover:translate-x-1.5 hover:bg-[#0C0E13]"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#112238] border border-[#58D4F2] flex items-center justify-center shrink-0">
                  <span className="text-[#7AA0CC] font-extrabold text-xs sm:text-sm leading-none">✓</span>
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BÔNUS SECTION */}
      <section className="py-6 sm:py-8 px-4 bg-[#040406] border-t border-white/10">
        <div className="max-w-[1060px] mx-auto text-center flex flex-col items-center">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[24px] sm:text-[34px] font-[800] tracking-[-0.02em] mb-4 sm:mb-6 flex items-center justify-center gap-2.5 sm:gap-3 uppercase">
            <img src="/assets/aistudio/1f381_05a65621.svg" alt="🎁" className="w-7 h-7 sm:w-8 sm:h-8 inline-block" />
            <span className="text-white">VOCÊ AINDA <span className="gradient-blue-text">RECEBE BÔNUS</span></span>
          </h2>

          <div 
            className="w-full max-w-[920px] bg-[#07080A] border border-[#58D4F2] rounded-2xl grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#58D4F2]/60 to-transparent pointer-events-none" />
            <div className="flex items-center justify-center gap-3 px-5 py-4 sm:py-5 text-sm sm:text-base font-bold text-white">
              <svg className="w-5 h-5 text-[#30FF00] shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
                <path d="M19 3C19 5 17.5 6.5 15.5 6.5C17.5 6.5 19 8 19 10C19 8 20.5 6.5 22.5 6.5C20.5 6.5 19 5 19 3Z" />
              </svg>
              <span>Banco de Memes Virais</span>
            </div>
            <div className="flex items-center justify-center gap-3 px-5 py-4 sm:py-5 text-sm sm:text-base font-bold text-white">
              <svg className="w-5 h-5 text-[#30FF00] shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
                <path d="M19 3C19 5 17.5 6.5 15.5 6.5C17.5 6.5 19 8 19 10C19 8 20.5 6.5 22.5 6.5C20.5 6.5 19 5 19 3Z" />
              </svg>
              <span>Stories Prontos</span>
            </div>
            <div className="flex items-center justify-center gap-3 px-5 py-4 sm:py-5 text-sm sm:text-base font-bold text-white">
              <svg className="w-5 h-5 text-[#30FF00] shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
                <path d="M19 3C19 5 17.5 6.5 15.5 6.5C17.5 6.5 19 8 19 10C19 8 20.5 6.5 22.5 6.5C20.5 6.5 19 5 19 3Z" />
              </svg>
              <span>Musicas Virais em Alta</span>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-6 sm:py-8 px-4 bg-black border-t border-white/10">
        <div className="max-w-[1060px] mx-auto">
          
          <div className="text-center mb-4 sm:mb-5">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[26px] sm:text-[36px] font-[800] tracking-[-0.02em] text-white uppercase leading-[1.1]">
              PESSOAS COMUNS JÁ ESTÃO <span className="gradient-blue-text">USANDO</span>
            </h2>
          </div>

          <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-5 items-start overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="bg-[#07080A] border border-white/10 hover:border-[#58D4F2] rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 w-[82%] sm:w-full shrink-0 sm:shrink snap-center"
              >
                <img 
                  src={test.image} 
                  alt={test.name}
                  className="w-full h-auto block object-contain select-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* OFFERS SECTION (ESCOLHA A MELHOR OFERTA PARA VOCÊ) */}
      <section className="py-8 sm:py-12 px-4 bg-black border-t border-white/10" id="escolha">
        <div className="max-w-5xl mx-auto">
          
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-4xl font-[800] text-center text-white tracking-[-0.02em] mb-6 sm:mb-8 uppercase">
            ESCOLHA A <span className="gradient-blue-text">MELHOR OFERTA</span> PARA VOCÊ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            
            {/* OFERTA BÁSICA */}
            <div className="bg-[#18181B] border border-neutral-700 rounded-2xl p-6 sm:p-9 flex flex-col justify-between text-center relative shadow-2xl hover:border-neutral-500 transition-colors">
              <div>
                <div className="inline-block bg-neutral-800 text-white font-[900] italic text-lg sm:text-xl py-2 px-8 rounded-2xl mb-4 uppercase tracking-wide">
                  OFERTA BÁSICA
                </div>

                <p className="text-sm sm:text-base italic text-neutral-400 mb-0.5">
                  De <span className="line-through text-red-500 font-bold decoration-2">R$67,00</span>
                </p>
                <p className="text-sm sm:text-base italic text-neutral-300 mb-2">
                  por apenas:
                </p>
                
                <div className="text-7xl sm:text-8xl font-[900] text-[#00FF20] my-3 leading-none">
                  R$19
                </div>

                <div className="my-6">
                  <ul className="space-y-0 text-center font-bold italic text-sm sm:text-base text-white">
                    <li className="flex items-center justify-center gap-2 py-2">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>50.000 Cortes Virais</span>
                    </li>
                    <div className="w-[65%] border-t border-dotted border-neutral-700 mx-auto my-1.5" />
                    
                    <li className="flex items-center justify-center gap-2 py-2">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>Acesso Imediato</span>
                    </li>
                    <div className="w-[65%] border-t border-dotted border-neutral-700 mx-auto my-1.5" />

                    <li className="flex items-center justify-center gap-2 py-2">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>Garantia de 7 dias</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <button 
                  type="button"
                  onClick={navigateToUp}
                  className="w-full max-w-[270px] mx-auto py-3.5 px-6 rounded-full font-[900] text-base bg-[#001455] text-[#9507C9] border-2 border-[#9B04BE] shadow-[0_0_15px_rgba(155,4,190,0.5)] hover:bg-[#A204E7] hover:text-white hover:scale-105 transition-all uppercase tracking-wide block my-3 cursor-pointer"
                >
                  QUERO O BÁSICO
                </button>

                <a 
                  href={getCheckoutUrl('https://pay.wiapy.com/j3wwzlE9xobB')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackInitiateCheckout('Pack Verso Básico Direto', 19.00)}
                  className="text-xs text-neutral-400 hover:text-[#00FF20] underline transition-colors block mb-3 cursor-pointer font-medium"
                >
                  (ou ir direto para o básico de R$19)
                </a>

                <p className="mt-4 text-xs sm:text-sm italic font-bold text-neutral-300 text-center leading-relaxed">
                  ATENÇÃO: Logo abaixo temos uma oferta ainda mais VANTAJOSA para você! Veja 👇👇👇
                </p>
              </div>
            </div>

            {/* OFERTA PREMIUM (FEATURED LUXURY CARD) */}
            <div className="bg-[radial-gradient(ellipse_at_center,#040A16_0%,#091832_52%,#143466_100%)] border-2 border-[#58D4F2] shadow-2xl rounded-2xl p-6 sm:p-9 flex flex-col justify-between text-center relative mt-6 md:mt-0 overflow-visible">
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#58D4F2]/70 to-transparent pointer-events-none" />
              
              {/* Badge Mais Vendido */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#49F503] border-2 border-[#58D4F2] text-black font-[900] italic text-xs sm:text-sm py-1 px-4 rounded-full flex items-center gap-1.5 shadow-xl whitespace-nowrap">
                <span>🔥 MAIS VENDIDO</span>
              </div>

              <div>
                <div className="mt-2 mb-4 inline-block bg-[#30FF00] text-black font-[900] italic text-xl sm:text-2xl py-2 px-8 rounded-2xl shadow-lg uppercase tracking-wide">
                  OFERTA PREMIUM
                </div>

                {/* Bundle Mockup Image (Pack Verso + Memes + Músicas + Efeitos) */}
                <div className="w-full my-3 flex justify-center">
                  <img 
                    src="/assets/packviral-kit-sem-fundo.png" 
                    alt="Kit PackViral Definitivo de Conteúdo Viral" 
                    className="w-60 sm:w-68 max-w-full object-contain drop-shadow-xl"
                  />
                </div>

                <p className="text-sm sm:text-base italic text-gray-300 mb-0.5">
                  De <span className="line-through text-red-600 font-bold decoration-2">R$97,00</span>
                </p>
                <p className="text-sm sm:text-base italic text-gray-200 mb-2">
                  por apenas:
                </p>

                {/* Price */}
                <div className="flex items-start justify-center font-[900] text-[#00ff88] my-2 leading-none">
                  <span className="text-2xl sm:text-3xl font-extrabold mr-1 mt-2">R$</span>
                  <span className="text-6xl sm:text-8xl tracking-tighter">29</span>
                  <span className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">,90</span>
                </div>

                {/* Features list with dotted separators */}
                <div className="my-3">
                  <ul className="space-y-0 text-center font-bold italic text-sm sm:text-base text-white leading-normal">
                    <li className="flex items-center justify-center gap-2.5 py-1.5">
                      <CheckCircle className="w-5 h-5 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                      <span>100.000 Mil Cortes Virais</span>
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
                      <span>Cortes Livres de Meta Dados</span>
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
                  onClick={() => trackInitiateCheckout('Pack Verso Premium', 29.90)}
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
      </section>

      {/* GUARANTEE & FAQ SECTION */}
      <section className="py-8 sm:py-12 px-4 bg-[#040406] border-t border-white/10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Guarantee Badge */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
              <img 
                src="/assets/selo-garantia-7-dias.png" 
                alt="Selo de Garantia de 7 Dias" 
                className="relative w-44 sm:w-56 md:w-64 mx-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* FAQ Title */}
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-4xl font-[800] gradient-blue-text tracking-[-0.02em] mb-5 sm:mb-6">
            FAQ
          </h2>

          {/* FAQ Accordion */}
          <div className="w-full max-w-3xl space-y-3 sm:space-y-4">
            {faqItems.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-[#08090C] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-[#58D4F2] cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg sm:text-2xl font-bold text-white leading-tight">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-6 h-6 gradient-blue-text shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
                <div className={`mt-3 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed ${
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
      <section className="py-8 sm:py-10 px-4 bg-black border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl md:text-5xl font-[800] italic uppercase text-white tracking-[-0.02em] mb-2">
            COMECE <span className="gradient-blue-text">HOJE MESMO</span>
          </h2>
          <p className="text-base sm:text-lg italic font-medium text-neutral-300 mb-5 max-w-xl">
            Tenha acesso aos 50.000 cortes e comece a postar agora.
          </p>
          <button 
            onClick={scrollToOffers}
            className="py-3.5 px-10 sm:px-14 rounded-2xl font-[800] text-base sm:text-lg text-white bg-[#05D321] shadow-[0_0_20px_8px_rgba(5,211,33,0.55),0_0_35px_14px_rgba(5,211,33,0.3)] hover:shadow-[0_0_25px_12px_rgba(5,211,33,0.75)] hover:scale-105 active:scale-95 transition-all uppercase tracking-wider cursor-pointer"
          >
            QUERO MEU ACESSO
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-8 pb-12 px-4 bg-black text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Pack Verso Circular Logo */}
          <div className="mb-4">
            <img 
              src="/assets/packverso-logo.jpg" 
              alt="Pack Verso" 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto object-cover border border-[#58D4F2] shadow-md" 
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

    </div>
  );
}
