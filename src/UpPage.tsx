import React, { useState, useEffect } from 'react';
import { 
  trackPageView, 
  trackViewContent, 
  trackInitiateCheckout 
} from './utils/metaPixel';

export default function UpPage() {
  const [secondsLeft, setSecondsLeft] = useState(600); // 10:00 countdown

  useEffect(() => {
    // Set page title to match original up page
    document.title = 'up – Pack verso';

    // Track Meta Ads Pixel & CAPI for Upsell Page
    trackPageView();
    trackViewContent('Super Oferta Pack Verso Completo', 15.90);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const featureItems = [
    { text: '100.000 Mil Cortes Virais', isBold: true },
    { text: '41 Nichos Diferentes', isBold: true },
    { text: 'Acesso Vitalício', isBold: true },
    { text: 'Garantia de 7 dias', isBold: true },
    { text: 'Cortes Livres de Meta Dados', isBold: true },
    { text: '+3 Super Bônus', isBold: true },
    { text: 'Pack de Memes', isBold: true },
    { text: 'Efeitos Sonoros', isBold: true },
    { text: 'Músicas sem Copyright', isBold: true },
    { 
      custom: (
        <span>
          <b>Bônus Extra 1:</b> +50mil cortes virais (totalizando 150mil cortes virais)
        </span>
      )
    },
    { 
      custom: (
        <span>
          <b>Presente Surpresa:</b> Você Também Receberá um Presentinho Especial que Preparamos para Você Ainda Hoje…
        </span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start py-6 sm:py-10 px-2 sm:px-4 font-['Montserrat',sans-serif]">
      {/* Main outer card */}
      <div 
        className="w-full max-w-[760px] mx-auto rounded-[34px] p-4 sm:p-8"
        style={{ backgroundColor: '#010835' }}
      >
        {/* Top Attention Badge */}
        <div className="flex justify-center mb-3">
          <div 
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-[30px] font-['Roboto',sans-serif] font-medium text-sm tracking-wide"
            style={{
              backgroundColor: '#001038',
              color: '#E40909',
              border: '1px solid #E40909',
              boxShadow: '0px 0px 10px 9px rgba(224, 8, 8, 0.5) inset'
            }}
          >
            <span className="text-base">⚠️</span>
            <span>ATENÇÃO</span>
          </div>
        </div>

        {/* Heading 1 */}
        <h1 
          className="text-center font-semibold text-[28px] sm:text-[44px] leading-tight my-2"
          style={{ color: '#FF0404' }}
        >
          PARE! NÃO FECHE ESSA PÁGINA
        </h1>

        {/* Heading 2 */}
        <h2 className="text-center font-semibold text-[14px] sm:text-[30px] leading-snug text-white mb-6 px-2">
          Você acaba de desbloquear uma{' '}
          <span style={{ color: '#00e5ff' }}>condição secreta</span>{' '}
          que não aparece para os outros.
        </h2>

        {/* Inner Box with Neon Green Border and Inset Glow */}
        <div 
          className="rounded-[30px] p-4 sm:p-8 flex flex-col items-center text-center"
          style={{
            backgroundColor: '#021666',
            border: '3px solid #00FF0C',
            boxShadow: '0px 0px 10px 10px rgba(64, 255, 0, 0.5) inset'
          }}
        >
          {/* Subheading */}
          <p className="font-semibold text-[15px] sm:text-[18px] text-[#F0F0F0] leading-snug mb-4 max-w-xl">
            Só agora você pode levar o pack completo com um desconto extra!{' '}
            <span style={{ color: 'red' }}>Essa oferta some ao sair da página.</span>
          </p>

          {/* Kit image */}
          <div className="my-2 flex justify-center w-full">
            <img 
              src="/assets/Gemini_Generated_Image_lrkccdlrkccdlrkc-1.png" 
              alt="Pack Completo"
              className="w-[74%] sm:w-[40%] max-w-[340px] h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Strikethrough price */}
          <div className="font-semibold text-[18px] sm:text-[22px] text-[#818E94] my-2">
            De <span style={{ color: 'gray', textDecoration: 'line-through' }}><b>R$97,00</b></span>
          </div>

          {/* Features Checklist */}
          <div className="w-full max-w-lg my-3">
            <ul className="flex flex-col items-center w-full">
              {featureItems.map((item, index) => (
                <li key={index} className="w-full flex flex-col items-center">
                  <div className="flex items-center justify-center gap-2.5 py-1.5 px-2 text-[14px] sm:text-[18px] text-[#F5F5F5] font-medium text-center">
                    <svg 
                      className="w-[18px] h-[18px] shrink-0" 
                      viewBox="0 0 512 512" 
                      fill="#70FF6C"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                    </svg>
                    {item.custom ? (
                      item.custom
                    ) : item.isBold ? (
                      <b>{item.text}</b>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                  {/* 60% Dotted divider except for the last item */}
                  {index < featureItems.length - 1 && (
                    <div 
                      className="w-[60%] border-t border-dotted border-[#808080] my-1" 
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp immediate access item */}
          <div className="flex items-center justify-center gap-3 mt-4 mb-2">
            <svg 
              className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" 
              viewBox="0 0 448 512" 
              fill="#02F11A"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
            <span className="font-normal text-[19px] sm:text-[22px] text-white">
              <b>ACESSO IMEDIATO NO WHASTAPP</b>
            </span>
          </div>

          {/* Super Price */}
          <div 
            className="font-extrabold text-[37px] sm:text-[50px] my-1 leading-none tracking-tight"
            style={{ color: '#00F80C' }}
          >
            R$15,90
          </div>

          {/* CTA Button */}
          <div className="my-4 w-full flex justify-center">
            <a 
              href="https://pay.wiapy.com/VHc7vm529eCu" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackInitiateCheckout('Super Oferta Pack Verso Completo', 15.90)}
              className="inline-block w-full max-w-sm py-3.5 px-6 rounded-[21px] font-['Roboto',sans-serif] font-[900] text-[17px] sm:text-[20px] text-white uppercase tracking-wider text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{
                backgroundColor: '#09E427',
                boxShadow: '0px 0px 10px 9px rgba(38, 212, 14, 0.5)'
              }}
            >
              Aproveitar Super Oferta
            </a>
          </div>

          {/* Countdown timer */}
          <div className="my-2 flex justify-center items-center">
            <div 
              className="font-bold text-[38px] sm:text-[48px] text-white py-3 px-8 sm:px-10 rounded-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.3)] tracking-[2px]"
              style={{
                backgroundColor: '#ff0000',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              {formatCountdown(secondsLeft)}
            </div>
          </div>

          {/* Expiration notice */}
          <p className="font-medium text-[14px] sm:text-[16px] text-white text-center mt-2">
            Essa oferta expira ao sair da página
          </p>
        </div>

        {/* Fallback option link outside inner box */}
        <div className="text-center mt-6">
          <a 
            href="https://pay.wiapy.com/2w3O7s9uCmeZ"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackInitiateCheckout('Oferta Básica Pack Verso Fallback Up', 10.00)}
            className="font-semibold text-[17px] sm:text-[19px] text-white underline hover:text-[#00FF20] transition-colors cursor-pointer"
          >
            <u>Não, vou levar a oferta básica</u>
          </a>
        </div>
      </div>
    </div>
  );
}
