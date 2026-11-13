import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Volume2 } from 'lucide-react';

interface VSLPlayerProps {
  videoSrc?: string;
  className?: string;
}

export default function VSLPlayer({
  videoSrc = '/videoplayback.mp4',
  className = ''
}: VSLPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [isPausedOverlay, setIsPausedOverlay] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [fakeProgress, setFakeProgress] = useState(65);
  const hasStartedWithSoundRef = useRef(false);

  // Unlock Web Audio API cleanly on user click for iOS / Safari / In-App WebViews
  const unlockAudioContext = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      }
    } catch {
      // Ignore AudioContext restriction errors
    }
  };

  // Configure inline attributes and start muted preview loop right after first paint
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video) return;

    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 1.0;

    // Wait briefly after initial paint so hero text & CTA render at max speed before fetching video frames
    const startPreviewTimer = window.setTimeout(() => {
      if (!hasStartedWithSoundRef.current && video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay may be deferred on Low Power Mode or strict in-app WebViews until user tap
          });
        }
      }
    }, 150);

    // Pause silent preview when scrolled offscreen on low-end devices (only before sound activation)
    let observer: IntersectionObserver | null = null;
    if (container && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (hasStartedWithSoundRef.current) return;
          if (entry.isIntersecting) {
            if (video.paused) video.play().catch(() => {});
          } else {
            if (!video.paused) video.pause();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    return () => {
      window.clearTimeout(startPreviewTimer);
      observer?.disconnect();
    };
  }, []);

  const handleCanPlay = () => {
    const video = videoRef.current;
    setIsBuffering(false);
    if (video && !hasStartedWithSoundRef.current && video.paused) {
      video.muted = true;
      video.play().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const cur = video.currentTime;
    const dur = video.duration && Number.isFinite(video.duration) ? video.duration : 120;
    // Psychological progress bar: starts at 65% and smoothly crawls to 97.5%
    const actualRatio = Math.min(1, Math.max(0, cur / dur));
    const calculatedFake = Math.min(97.5, 65 + Math.pow(actualRatio, 0.72) * 32.5);
    setFakeProgress(calculatedFake);
  };

  // Single trusted click activation compatible with iOS Safari, Android Chrome, Instagram & Discord WebViews
  const handleActivateSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    unlockAudioContext();
    setIsActivating(true);

    // Mutate audio flags synchronously inside the trusted click callstack
    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1.0;
    video.removeAttribute('muted');

    // Call play() BEFORE seeking so iOS WKWebView does not lose user activation or stall buffer
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (!hasStartedWithSoundRef.current && video.currentTime > 0.4 && video.readyState >= 2) {
            try {
              video.currentTime = 0;
            } catch {
              // Ignore seek errors on streaming buffers
            }
          }
          hasStartedWithSoundRef.current = true;
          setIsActivating(false);
          setIsActivated(true);
          setIsPausedOverlay(false);
          setIsBuffering(false);
        })
        .catch(() => {
          setIsActivating(false);
          // Fallback: keep muted loop running if strict WebView blocked audio unlock so retry works cleanly
          video.muted = true;
          video.play().catch(() => {});
        });
    } else {
      hasStartedWithSoundRef.current = true;
      setIsActivating(false);
      setIsActivated(true);
      setIsPausedOverlay(false);
    }
  }, []);

  // Keep VSL playing continuously; only surface a tap-to-resume button if OS forces a pause
  const handlePauseAttempt = () => {
    const video = videoRef.current;
    if (hasStartedWithSoundRef.current && video && !video.ended) {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          setIsPausedOverlay(true);
        });
      }
    }
  };

  const handlePlaying = () => {
    setIsBuffering(false);
    if (hasStartedWithSoundRef.current) {
      setIsPausedOverlay(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative flex flex-col items-center w-full ${className}`}>
      {/* "Aumente o volume" above VSL */}
      <div className="mb-3.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#08090C] border border-[#58D4F2]/50 text-white font-bold text-sm sm:text-base tracking-wide shadow-lg">
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#58D4F2] animate-pulse" />
        <span>Aumente o volume</span>
      </div>

      {/* Video Container (Fixed 9:16 aspect ratio, responsive) */}
      <div className="relative w-full max-w-[330px] sm:max-w-[360px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-black border-2 border-[#58D4F2] shadow-[0_0_24px_rgba(88,212,242,0.25)] select-none">
        {/* HTML5 Video: lightweight pre-blurred poster + clean hardware layer without CSS blur filter */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster="/vsl-poster.webp"
          playsInline
          muted={!isActivated}
          loop={!isActivated}
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          onCanPlay={handleCanPlay}
          onWaiting={() => {
            if (hasStartedWithSoundRef.current) setIsBuffering(true);
          }}
          onPlaying={handlePlaying}
          onTimeUpdate={handleTimeUpdate}
          onPause={handlePauseAttempt}
          onContextMenu={(e) => e.preventDefault()}
          controls={false}
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* OVERLAY 1: "ATIVAR SOM" (No live CSS backdrop-blur over video so weak mobile GPUs stay fast) */}
        {!isActivated && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Ativar som e assistir vídeo"
            onClick={handleActivateSound}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleActivateSound();
              }
            }}
            className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 z-30 cursor-pointer touch-manipulation"
          >
            {/* Urgent Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/95 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider mb-5 animate-pulse shadow-xl pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>SEU VÍDEO JÁ COMEÇOU!</span>
            </div>

            {/* Pulsing "ATIVAR SOM" Visual CTA */}
            <span className="relative px-6 sm:px-8 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#58D4F2] to-[#4EC7E6] text-black font-['Plus_Jakarta_Sans',sans-serif] font-[900] text-base sm:text-lg tracking-wider uppercase shadow-[0_0_24px_rgba(88,212,242,0.8)] active:scale-95 transition-transform duration-200 flex items-center gap-3 border-2 border-white/60 animate-pulse-glow pointer-events-none">
              <span className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-black" />
              </span>
              <span>{isActivating ? 'CARREGANDO...' : 'ATIVAR SOM'}</span>
            </span>
          </div>
        )}

        {/* OVERLAY 2: Tap-to-resume fallback if OS/In-App WebView externally paused playback */}
        {isActivated && isPausedOverlay && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Continuar vídeo"
            onClick={handleActivateSound}
            className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center p-4 z-30 cursor-pointer touch-manipulation"
          >
            <span className="px-6 py-4 rounded-full bg-gradient-to-r from-[#58D4F2] to-[#4EC7E6] text-black font-['Plus_Jakarta_Sans',sans-serif] font-[900] text-sm sm:text-base tracking-wider uppercase shadow-[0_0_22px_rgba(88,212,242,0.8)] flex items-center gap-2.5 border-2 border-white/60 pointer-events-none">
              <Play className="w-5 h-5 fill-black text-black" />
              <span>CONTINUAR VÍDEO</span>
            </span>
          </div>
        )}

        {/* Subtle loading spinner only when actively buffering after activation */}
        {isActivated && isBuffering && !isPausedOverlay && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-10 h-10 rounded-full border-3 border-[#58D4F2]/30 border-t-[#58D4F2] animate-spin" />
          </div>
        )}

        {/* FAKE PROGRESS BAR (Always displayed at bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-2 sm:h-2.5 bg-black/75 z-20 pointer-events-none overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#58D4F2] via-[#4EC7E6] to-[#0AE028] shadow-[0_0_12px_rgba(88,212,242,0.9)] transition-all duration-300 ease-out relative"
            style={{ width: `${fakeProgress}%` }}
          >
            {/* Luminous indicator at the tip */}
            <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white shadow-[0_0_10px_#fff]" />
          </div>
        </div>
      </div>
    </div>
  );
}
