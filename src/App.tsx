import React, { useState, useEffect } from 'react';
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
  X
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
    name: 'Marcos Alves',
    avatar: '/assets/avatar-marcos.jpg',
    date: 'Há 2 dias',
    quote: '"Bati 10k seguidores no TikTok em poucos dias só postando os cortes. Loucura total, já comecei a monetizar!"'
  },
  {
    name: 'Gabriel Martins',
    avatar: '/assets/avatar-gabriel.jpg',
    date: 'Ontem',
    quote: '"Eu trabalhava o dia todo e não tinha tempo para editar nada. Agora consigo criar vídeos inéditos em menos de 2 minutos."'
  },
  {
    name: 'Lucas Ferreira',
    avatar: '/assets/avatar-lucas.jpg',
    date: 'Há 5 dias',
    quote: '"O conteúdo realmente converte. Já fiz minha primeira venda como afiliado usando apenas os vídeos."'
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
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | null>(null);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-black text-white font-['Montserrat'] selection:bg-yellow-400 selection:text-black">
      
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed bottom-4 left-4 z-50 bg-[#111111] border border-[#FFDE1A]/50 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce text-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* HEADER / HERO SECTION */}
      <section className="relative pt-8 pb-14 px-4 sm:px-6 bg-gradient-to-b from-neutral-950 to-black overflow-hidden border-b border-neutral-900">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Main Hook Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-[900] tracking-tight text-[#FFDE1A] uppercase leading-[1.15] mb-4 drop-shadow-[0_2px_12px_rgba(255,222,26,0.3)]">
            PARE DE PERDER TEMPO CRIANDO CONTEÚDO DO ZERO
          </h1>

          {/* Subhead */}
          <p className="text-base sm:text-xl font-medium text-gray-200 max-w-2xl mb-8 leading-relaxed">
            Use <span className="text-[#FFDE1A] font-bold">50.000 Vídeos Prontos</span> que já viralizaram e comece a crescer hoje mesmo, sem aparecer.
          </p>

          {/* 3D Pack Mockup Image */}
          <div className="relative group my-2 cursor-pointer transition-transform duration-300 hover:scale-105" onClick={scrollToOffers}>
            <div className="absolute inset-0 bg-[#FFDE1A]/20 blur-3xl rounded-full opacity-60 group-hover:opacity-90 transition-opacity" />
            <img 
              src="/assets/embalagem-packviral.png" 
              alt="Embalagem PackViral preta e dourada" 
              className="relative w-64 sm:w-80 md:w-96 mx-auto drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] rounded-2xl"
            />
          </div>

          {/* Price Anchor */}
          <div className="mt-8 mb-6 flex flex-col items-center">
            <p className="text-2xl sm:text-3xl font-bold text-gray-300">
              DE <span className="line-through text-red-500 font-extrabold decoration-red-500 decoration-3">R$67,00</span>
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-100 mt-1">
              Por apenas
            </p>
            <div className="text-6xl sm:text-8xl font-[900] text-[#0BF504] tracking-tight leading-none my-1 drop-shadow-[0_0_25px_rgba(11,245,4,0.4)]">
              R$10
            </div>
            <p className="text-sm sm:text-base font-semibold text-gray-300 tracking-wider uppercase mt-1">
              RISCO ZERO!
            </p>
          </div>

          {/* Main CTA Button */}
          <button 
            onClick={scrollToOffers}
            className="w-full max-w-md py-4 px-8 rounded-full text-white font-extrabold text-lg sm:text-xl tracking-wide uppercase flex items-center justify-center gap-2 green-glow-button animate-pulse-glow transition-all"
          >
            <span>QUERO ACESSO IMEDIATO</span>
            <img src="/assets/aistudio/26a1_d3a6d0c1.svg" alt="⚡" className="w-5 h-5 inline-block" />
          </button>
        </div>
      </section>

      {/* QUICK BENEFITS BAR */}
      <section className="py-12 px-4 bg-black" id="ancora">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Glowing box with 3 pills */}
          <div className="w-full max-w-2xl bg-[#0e0e0e] border-2 border-yellow-400/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_20px_rgba(255,222,26,0.25)]">
            <ul className="space-y-4 sm:space-y-5">
              <li className="flex items-center gap-3 sm:gap-4 text-base sm:text-xl font-semibold text-white">
                <CheckCircle className="w-6 h-6 text-[#24EE05] shrink-0" />
                <span>Poste em menos de 30 segundos</span>
              </li>
              <li className="flex items-center gap-3 sm:gap-4 text-base sm:text-xl font-semibold text-white">
                <EyeOff className="w-6 h-6 text-[#24EE05] shrink-0" />
                <span>Ideal para perfis anônimos</span>
              </li>
              <li className="flex items-center gap-3 sm:gap-4 text-base sm:text-xl font-semibold text-white">
                <Radio className="w-6 h-6 text-[#24EE05] shrink-0" />
                <span>Conteúdo infinito para viralizar</span>
              </li>
            </ul>
          </div>

          {/* Section Title */}
          <h2 className="mt-10 text-2xl sm:text-4xl font-extrabold text-center tracking-tight text-white">
            <span className="text-[#FFDE1A]">VOCÊ NÃO PRECISA CRIAR CONTEÚDO</span>
          </h2>
        </div>
      </section>

      {/* PROOF CAROUSEL SECTION */}
      <section className="py-8 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm sm:text-base text-gray-400 mb-6 font-medium">
            Resultados de quem utiliza cortes virais para crescer e monetizar:
          </p>

          <div className="relative overflow-hidden rounded-3xl bg-[#111111] border border-neutral-800 p-4 sm:p-6 shadow-2xl">
            {/* Slide */}
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-md h-52 sm:h-64 rounded-2xl overflow-hidden mb-4 bg-black flex items-center justify-center border border-neutral-700/60">
                <img 
                  src={carouselSlides[activeSlide].image} 
                  alt={carouselSlides[activeSlide].handle}
                  className="w-full h-full object-contain sm:object-cover"
                />
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg sm:text-xl font-bold text-white">
                  {carouselSlides[activeSlide].handle}
                </span>
                <span className="bg-[#FFDE1A]/20 text-[#FFDE1A] text-xs font-bold px-2 py-0.5 rounded">
                  {carouselSlides[activeSlide].followers}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">
                Nicho: {carouselSlides[activeSlide].niche}
              </p>
            </div>

            {/* Navigation buttons */}
            <button 
              onClick={prevSlide}
              aria-label="Slide anterior"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-2.5 rounded-full border border-neutral-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              aria-label="Próximo slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-2.5 rounded-full border border-neutral-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {carouselSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === idx ? 'w-6 bg-[#FFDE1A]' : 'w-2 bg-neutral-600'
                  }`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MINDSET HIGHLIGHT BOX */}
      <section className="py-12 px-4 bg-black">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0b0b0b] border-2 border-yellow-400/80 rounded-[36px] p-8 sm:p-10 text-center shadow-[0_0_25px_rgba(255,222,26,0.3)] space-y-3">
            <h3 className="text-lg sm:text-2xl font-medium text-white">
              Quem cresce hoje não <span className="text-[#FFDE1A] font-bold underline decoration-2">cria do zero.</span>
            </h3>
            <p className="text-base sm:text-xl font-normal text-gray-300">
              Eles reaproveitam vídeos que já viralizaram.
            </p>
            <h4 className="text-2xl sm:text-4xl font-extrabold text-[#FFDE1A] pt-2">
              O jogo é volume, não perfeição.
            </h4>
          </div>
        </div>
      </section>

      {/* "É SIMPLES ASSIM" - 4 STEPS */}
      <section className="py-16 px-4 bg-black border-t border-neutral-900">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Animated Arrow */}
          <div className="text-[#FFDE1A] text-5xl font-black mb-4 animate-arrow-bounce">
            ↓
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-12">
            É SIMPLES ASSIM
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Step 1 */}
            <div className="bg-[#111111] border border-neutral-800 hover:border-[#FFDE1A] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,222,26,0.15)] group min-h-[220px]">
              <div className="w-14 h-14 rounded-xl bg-[#FFDE1A] text-black font-black text-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">
                Escolha um vídeo<br />pronto
              </h3>
            </div>

            {/* Step 2 */}
            <div className="bg-[#111111] border border-neutral-800 hover:border-[#FFDE1A] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,222,26,0.15)] group min-h-[220px]">
              <div className="w-14 h-14 rounded-xl bg-[#FFDE1A] text-black font-black text-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">
                Poste no TikTok ou<br />Instagram
              </h3>
            </div>

            {/* Step 3 */}
            <div className="bg-[#111111] border border-neutral-800 hover:border-[#FFDE1A] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,222,26,0.15)] group min-h-[220px]">
              <div className="w-14 h-14 rounded-xl bg-[#FFDE1A] text-black font-black text-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">
                Repita todos<br />os dias
              </h3>
            </div>

            {/* Step 4 - Rocket */}
            <div className="bg-[#111111] border border-[#FFDE1A]/40 hover:border-[#FFDE1A] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,222,26,0.2)] group min-h-[220px]">
              <div className="text-4xl mb-5 animate-rocket-float">
                <img src="/assets/aistudio/1f680_3892ef66.svg" alt="🚀" className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-bold text-[#FFDE1A] leading-snug">
                Comece a crescer
              </h3>
            </div>

          </div>
        </div>
      </section>

      {/* 50.000 CORTES PRONTOS PARA POSTAR - CATEGORIES GRID */}
      <section className="py-16 px-4 bg-black border-t border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-[900] text-center tracking-tight mb-12">
            <span className="text-[#FFDE1A]">50.000 CORTES PRONTOS </span>PARA POSTAR
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                className="bg-[#000000] border-2 border-[#3F3F3F] hover:border-[#ECCA0080] hover:shadow-[0px_0px_10px_4px_rgba(235,202,0,0.5)_inset,0_0_15px_rgba(235,202,0,0.3)] rounded-[12px] overflow-hidden transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <div className="w-full aspect-[400/218] overflow-hidden bg-black">
                  <img 
                    src={cat.image} 
                    alt={cat.description} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                <div className="p-3.5 sm:p-4 flex-1 flex items-center justify-center text-center">
                  <p className="text-[13px] sm:text-[14px] font-[500] text-[#DBDBDB] leading-snug">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE ESSE PACK FUNCIONA */}
      <section className="py-16 px-4 bg-black border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-[900] text-center tracking-tight mb-10 text-white">
            POR QUE ESSE <span className="text-[#FFDE1A]">PACK FUNCIONA</span>
          </h2>

          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              'Não precisa aparecer',
              'Não precisa editar',
              'Não precisa ter experiência',
              'Conteúdo validado',
              'Alta chance de viralização'
            ].map((text, idx) => (
              <div 
                key={idx}
                className="w-full min-h-[58px] flex items-center px-6 py-3.5 bg-[#111111] border-l-4 border-[#FFDE1A] rounded-r-xl text-white font-semibold text-base sm:text-lg transition-transform duration-300 hover:translate-x-2 hover:bg-[#151515] hover:shadow-[0_5px_25px_rgba(255,222,26,0.1)]"
              >
                <span className="text-[#FFDE1A] font-extrabold text-2xl mr-4 leading-none">✓</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-4 bg-black border-t border-neutral-900">
        <div className="max-w-[1060px] mx-auto">
          
          <div className="text-center mb-8">
            <h2 className="text-[28px] sm:text-[36px] font-[900] tracking-[-1.4px] text-white uppercase leading-[1.08] font-['Arial',sans-serif]">
              PESSOAS COMUNS JÁ ESTÃO <span className="text-[#FFDE1A]">USANDO</span>
            </h2>
            <p className="mt-4 text-[#D7D9DA] text-[15px] font-normal leading-normal">
              Junte-se a mais de <strong className="text-[#FFDE1A] font-[800]">4.850 alunos</strong> que estão viralizando todos os dias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="relative bg-[#0B1212] border border-[#FFDE1A]/[0.22] rounded-[12px] p-[28px_24px_25px] shadow-[0_0_0_1px_rgba(255,255,255,0.015)_inset] flex flex-col justify-between overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 20% 0%, rgba(255,222,26,0.045), transparent 38%), #0B1212'
                }}
              >
                {/* Top golden hairline */}
                <div className="absolute top-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-[#FFDE1A]/50 to-transparent pointer-events-none" />

                {/* Watermark quotes */}
                <div className="absolute right-4 -top-2 text-white/[0.035] text-[66px] font-[900] leading-none select-none pointer-events-none">
                  “
                </div>

                <div className="flex items-center gap-3.5 relative z-10">
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    className="w-[55px] h-[55px] rounded-full object-cover border-2 border-[#FFDE1A] p-0.5 bg-[#111] shrink-0" 
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[16px] font-[800] text-white whitespace-nowrap">{test.name}</span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-1 rounded-[2px] bg-[#FFDE1A]/[0.12] text-[#FFDE1A] text-[9px] font-[900] uppercase leading-none tracking-normal">
                        <span className="text-[11px] leading-none">✓</span> COMPRA VERIFICADA
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[#FFDE1A] text-[15px] tracking-[2px] leading-none">★★★★★</span>
                      <span className="text-[10px] text-[#666D70] font-normal">{test.date}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-[#D4D6D7] text-[14px] leading-[1.65] italic font-[600] relative z-10">
                  {test.quote}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BÔNUS SECTION */}
      <section className="pt-8 pb-16 px-4 bg-black">
        <div className="max-w-[1060px] mx-auto text-center flex flex-col items-center">
          <h2 className="text-[26px] sm:text-[34px] font-[900] tracking-tight mb-7 flex items-center justify-center gap-2.5 uppercase font-['Montserrat',sans-serif]">
            <img src="/assets/aistudio/1f381_05a65621.svg" alt="🎁" className="w-8 h-8 sm:w-9 sm:h-9 inline-block" />
            <span className="text-white">VOCÊ AINDA <span className="text-[#FFDE1A]">RECEBE BÔNUS</span></span>
          </h2>

          <div 
            className="w-full max-w-[890px] bg-black border-2 border-[#ECE109] rounded-[17px] py-6 px-6 sm:px-12 flex justify-center"
            style={{
              boxShadow: '0px 0px 10px 7px rgba(222, 228, 0, 0.5) inset, 0px 0px 15px rgba(236, 225, 9, 0.35)'
            }}
          >
            <ul className="flex flex-col items-center gap-4 text-center">
              <li className="flex items-center gap-3 text-lg sm:text-[22px] font-[600] text-white">
                <svg className="w-6 h-6 text-[#30FF00] shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
                  <path d="M19 3C19 5 17.5 6.5 15.5 6.5C17.5 6.5 19 8 19 10C19 8 20.5 6.5 22.5 6.5C20.5 6.5 19 5 19 3Z" />
                </svg>
                <span>Banco de Memes Virais</span>
              </li>
              <li className="flex items-center gap-3 text-lg sm:text-[22px] font-[600] text-white">
                <svg className="w-6 h-6 text-[#30FF00] shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
                  <path d="M19 3C19 5 17.5 6.5 15.5 6.5C17.5 6.5 19 8 19 10C19 8 20.5 6.5 22.5 6.5C20.5 6.5 19 5 19 3Z" />
                </svg>
                <span>Stories Prontos</span>
              </li>
              <li className="flex items-center gap-3 text-lg sm:text-[22px] font-[600] text-white">
                <svg className="w-6 h-6 text-[#30FF00] shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
                  <path d="M19 3C19 5 17.5 6.5 15.5 6.5C17.5 6.5 19 8 19 10C19 8 20.5 6.5 22.5 6.5C20.5 6.5 19 5 19 3Z" />
                </svg>
                <span>Musicas Virais em Alta</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* OFFERS SECTION (ESCOLHA A MELHOR OFERTA PARA VOCÊ) */}
      <section className="py-20 px-4 bg-black border-t border-neutral-900" id="escolha">
        <div className="max-w-5xl mx-auto">
          
          <h2 className="text-3xl sm:text-5xl font-[900] text-center text-[#FFDE1A] tracking-tight mb-14 uppercase">
            ESCOLHA A MELHOR OFERTA PARA VOCÊ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
            
            {/* OFERTA BÁSICA */}
            <div className="bg-[#181818] border-2 border-[#888888] rounded-[18px] p-6 sm:p-8 flex flex-col text-center relative shadow-xl">
              <div className="inline-block self-center bg-[#474747] text-white font-[800] italic text-xl py-2 px-8 rounded-2xl mb-4">
                OFERTA BÁSICA
              </div>

              <p className="text-sm sm:text-base italic text-white mb-0.5">
                De <span className="line-through text-red-600 font-bold">R$67,00</span>
              </p>
              <p className="text-sm sm:text-base italic text-white mb-2">
                por apenas:
              </p>
              
              <div className="text-7xl sm:text-8xl font-[900] text-[#00FF20] my-2 leading-none drop-shadow-[0_0_15px_rgba(0,255,32,0.3)]">
                R$10
              </div>

              <div className="my-5">
                <ul className="space-y-0 text-center font-bold italic text-sm sm:text-base text-white">
                  <li className="flex items-center justify-center gap-2 py-1.5">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                    <span>50.000 Cortes Virais</span>
                  </li>
                  <div className="w-[60%] border-t border-dotted border-neutral-500 mx-auto my-1.5" />
                  
                  <li className="flex items-center justify-center gap-2 py-1.5">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                    <span>Acesso Imediato</span>
                  </li>
                  <div className="w-[60%] border-t border-dotted border-neutral-500 mx-auto my-1.5" />

                  <li className="flex items-center justify-center gap-2 py-1.5">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                    <span>Garantia de 7 dias</span>
                  </li>
                </ul>
              </div>

              <a 
                href="https://packverso.shop/up/?utm_source=organic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full max-w-[260px] mx-auto py-3 px-6 rounded-full font-[800] text-base bg-[#001455] text-[#9507C9] border-2 border-[#9B04BE] shadow-[0_0_12px_rgba(155,4,190,0.5)_inset] hover:bg-[#A204E7] hover:text-white transition-all uppercase tracking-wide block my-4"
              >
                QUERO O BÁSICO
              </a>

              <p className="mt-4 text-xs sm:text-sm italic font-bold text-white text-center leading-relaxed">
                ATENÇÃO: Logo abaixo temos uma oferta ainda mais VANTAJOSA para você! Veja 👇👇👇
              </p>
            </div>

            {/* OFERTA PREMIUM (FEATURED) */}
            <div className="bg-[#000000] border-2 border-[#FFDE1A] shadow-[0_0_20px_3px_#FFDE1A,inset_0_0_10px_rgba(255,222,26,0.15)] rounded-[18px] p-6 sm:p-8 flex flex-col text-center relative mt-4 md:mt-0">
              
              {/* Badge Mais Vendido */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#49F503] border-2 border-[#FFDE1A] text-black font-bold italic text-xs sm:text-sm py-0.5 px-3.5 rounded-full flex items-center gap-1 shadow-md whitespace-nowrap">
                <span>🔥 Mais Vendido</span>
              </div>

              <div className="mt-2 mb-3 inline-block self-center bg-[#30FF00] text-black font-[900] italic text-xl sm:text-2xl py-2 px-8 rounded-2xl shadow-md uppercase">
                OFERTA PREMIUM
              </div>

              {/* Bundle Mockup Image (Pack Verso + Memes + Músicas + Efeitos) */}
              <div className="w-full my-2 flex justify-center">
                <img 
                  src="/assets/kit-packviral-sem-fundo.png" 
                  alt="Kit PackViral com quatro caixas" 
                  className="w-56 sm:w-64 max-w-full object-contain drop-shadow-[0_10px_25px_rgba(255,222,26,0.15)]"
                />
              </div>

              <p className="text-sm sm:text-base italic text-white mb-0.5">
                De <span className="line-through text-red-600 font-bold">R$97,00</span>
              </p>
              <p className="text-sm sm:text-base italic text-white mb-2">
                por apenas:
              </p>

              {/* Price */}
              <div className="flex items-start justify-center font-[900] text-[#00ff88] my-1 leading-none drop-shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                <span className="text-2xl sm:text-3xl font-extrabold mr-1 mt-2">R$</span>
                <span className="text-6xl sm:text-7xl tracking-tighter">19</span>
                <span className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">,90</span>
              </div>

              {/* Features list with dotted separators */}
              <div className="my-4">
                <ul className="space-y-0 text-center font-bold italic text-xs sm:text-sm text-white">
                  <li className="flex items-center justify-center gap-2 py-1">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                    <span>100.000 Mil Cortes Virais</span>
                  </li>
                  <div className="w-[80%] border-t border-dotted border-neutral-600 mx-auto my-1" />

                  <li className="flex items-center justify-center gap-2 py-1">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                    <span>41 Nichos Diferentes</span>
                  </li>
                  <div className="w-[80%] border-t border-dotted border-neutral-600 mx-auto my-1" />

                  <li className="flex items-center justify-center gap-2 py-1">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                    <span>Acesso Vitalício</span>
                  </li>
                  <div className="w-[80%] border-t border-dotted border-neutral-600 mx-auto my-1" />

                  <li className="flex items-center justify-center gap-2 py-1">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                    <span>Garantia de 30 dias</span>
                  </li>
                  <div className="w-[80%] border-t border-dotted border-neutral-600 mx-auto my-1" />

                  <li className="flex items-center justify-center gap-2 py-1">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                    <span>Cortes Livres de Meta Dados</span>
                  </li>
                  <div className="w-[80%] border-t border-dotted border-neutral-600 mx-auto my-1" />

                  <li className="flex items-center justify-center gap-2 py-1">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                    <span>+3 Super Bônus</span>
                  </li>
                  <div className="w-[80%] border-t border-dotted border-neutral-600 mx-auto my-1" />

                  <li className="flex items-center justify-center gap-2 py-1">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                    <span>Pack de Memes</span>
                  </li>
                  <div className="w-[80%] border-t border-dotted border-neutral-600 mx-auto my-1" />

                  <li className="flex items-center justify-center gap-2 py-1">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                    <span>Efeitos Sonoros</span>
                  </li>
                  <div className="w-[80%] border-t border-dotted border-neutral-600 mx-auto my-1" />

                  <li className="flex items-center justify-center gap-2 py-1">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black" />
                    <span>Músicas sem Copyright</span>
                  </li>
                  <div className="w-[80%] border-t border-dotted border-neutral-600 mx-auto my-1" />

                  <li className="flex items-start justify-center gap-2 py-1 text-center font-normal">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black mt-0.5" />
                    <span><b>Bônus Extra 1:</b> +50mil cortes virais (totalizando 150mil cortes virais)</span>
                  </li>
                  <div className="w-[80%] border-t border-dotted border-neutral-600 mx-auto my-1" />

                  <li className="flex items-start justify-center gap-2 py-1 text-center font-normal">
                    <CheckCircle className="w-4 h-4 text-[#4EE949] shrink-0 fill-[#4EE949] text-black mt-0.5" />
                    <span><b>Presente Surpresa:</b> Você Também Receberá um Presentinho Especial que Preparamos para Você Ainda Hoje…</span>
                  </li>
                </ul>
              </div>

              {/* WhatsApp notification badge */}
              <div className="flex items-center justify-center gap-2.5 my-3">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="text-white font-[800] italic text-xs sm:text-sm tracking-wide">
                  ACESSO IMEDIATO NO WHATSAPP
                </span>
              </div>

              {/* Button */}
              <a 
                href="https://pay.wiapy.com/i6H0rDMR-x?utm_source=organic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full font-[900] text-lg sm:text-xl text-white bg-[#08D825] border border-[#2EA81F] shadow-[0_0_20px_6px_rgba(8,216,37,0.7)] hover:shadow-[0_0_30px_10px_rgba(8,216,37,0.9)] hover:scale-105 active:scale-95 transition-all block uppercase tracking-wider my-2"
              >
                LIBERAR SUPER PACK
              </a>

              {/* Social proof */}
              <p className="mt-2 text-xs sm:text-sm text-white font-bold italic flex items-center justify-center gap-1.5">
                <span>👑 +1387 pessoas escolheram essa oferta</span>
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* GUARANTEE & FAQ SECTION */}
      <section className="py-16 px-4 bg-black border-t border-neutral-900">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Guarantee Badge */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-[#FFDE1A]/20 blur-2xl rounded-full opacity-60 group-hover:opacity-90 transition-opacity" />
              <img 
                src="/assets/selo-garantia-7-dias.png" 
                alt="Selo de Garantia de 7 Dias" 
                className="relative w-44 sm:w-56 md:w-64 mx-auto object-contain drop-shadow-[0_10px_25px_rgba(255,222,26,0.25)]"
              />
            </div>
          </div>

          {/* FAQ Title */}
          <h2 className="text-3xl sm:text-5xl font-[900] text-[#FFDE1A] tracking-tight mb-8">
            FAQ
          </h2>

          {/* FAQ Accordion */}
          <div className="w-full max-w-3xl space-y-4">
            {faqItems.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-b from-[#ecc80026] to-[#ecc8000d] border border-[#ECCA0059] rounded-2xl p-6 backdrop-blur-md shadow-[0_0_25px_rgba(236,202,0,0.15)] transition-all hover:-translate-y-1 hover:border-[#ECCA00] cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#ECCA00] leading-tight">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-6 h-6 text-[#ECCA00] shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
                <div className={`mt-3 text-base sm:text-lg text-gray-100 font-normal leading-relaxed ${
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
      <section className="pt-16 pb-6 px-4 bg-black text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] italic uppercase text-[#FFDE1A] tracking-tight mb-2 drop-shadow-[0_2px_10px_rgba(255,222,26,0.3)]">
            COMECE HOJE MESMO
          </h2>
          <p className="text-base sm:text-lg italic font-medium text-[#FCFCFC] mb-7 max-w-xl">
            Tenha acesso aos 50.000 cortes e comece a postar agora.
          </p>
          <button 
            onClick={scrollToOffers}
            className="py-3.5 px-10 sm:px-14 rounded-2xl font-[800] text-base sm:text-lg text-white bg-[#05D321] shadow-[0_0_20px_8px_rgba(5,211,33,0.55),0_0_35px_14px_rgba(5,211,33,0.3)] hover:shadow-[0_0_25px_12px_rgba(5,211,33,0.75)] hover:scale-105 active:scale-95 transition-all uppercase tracking-wider"
          >
            QUERO MEU ACESSO
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-6 pb-12 px-4 bg-black text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Pack Verso Circular Logo */}
          <div className="mb-4">
            <img 
              src="/assets/packverso-logo.jpg" 
              alt="Pack Verso" 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto object-cover border border-[#FFDE1A]/30 shadow-[0_0_15px_rgba(255,222,26,0.25)]" 
            />
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-white mb-3">
            <button 
              onClick={() => setPolicyModal('privacy')}
              className="text-white hover:text-[#FFDE1A] transition-colors"
            >
              Política de Privacidade
            </button>
            <span className="text-white"> | </span>
            <button 
              onClick={() => setPolicyModal('terms')}
              className="text-white hover:text-[#FFDE1A] transition-colors"
            >
              Termos de Uso
            </button>
          </div>

          {/* Dotted separator */}
          <div className="w-full max-w-2xl border-t border-dotted border-[#575656] my-2" />

          {/* Support */}
          <p className="text-sm text-[#D6E6EC] mb-1 font-normal">
            Suporte: <a href="mailto:contato@packverso.shop" className="hover:text-[#FFDE1A] transition-colors">contato@packverso.shop</a>
          </p>

          {/* Legal Disclaimer */}
          <p className="text-[11px] sm:text-xs italic text-[#D6E6EC] max-w-2xl mt-1 leading-relaxed opacity-90">
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.
          </p>
        </div>
      </footer>

      {/* MODAL FOR POLICIES */}
      {policyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-neutral-700 max-w-2xl w-full max-h-[80vh] rounded-3xl p-6 sm:p-8 overflow-y-auto relative text-left">
            <button 
              onClick={() => setPolicyModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1"
            >
              <X className="w-6 h-6" />
            </button>

            {policyModal === 'privacy' ? (
              <div>
                <h3 className="text-2xl font-bold text-[#FFDE1A] mb-4">Política de Privacidade</h3>
                <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
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
                <h3 className="text-2xl font-bold text-[#FFDE1A] mb-4">Termos de Uso</h3>
                <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
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
              className="mt-6 w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
