import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { Play, Pause, Volume2, RotateCcw } from 'lucide-react';

interface VSLPlayerProps {
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
}

const DEFAULT_VIDEO_SRC = '/assets/aistudio/lv_0_20261117021214_534941d0.mp4';
const DEFAULT_POSTER_SRC = '/assets/vsl-poster-novo.webp';

const VSLPlayer = memo(function VSLPlayer({
  videoSrc = DEFAULT_VIDEO_SRC,
  posterSrc = DEFAULT_POSTER_SRC,
  className = ''
}: VSLPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedRef = useRef(false);
  const maxWatchedTimeRef = useRef(0);

  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [needsSoundUnlock, setNeedsSoundUnlock] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [progressPct, setProgressPct] = useState(0);

  // Unlock Web Audio API inside trusted click callstack for iOS Safari / In-App WebViews
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

  // Configure inline attributes and defer metadata preload until after window.load (or first user interaction)
  // so initial site entry has zero bandwidth competition from the video file
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.volume = 1.0;

    let cancelled = false;
    let warmTimer: number | null = null;

    const warmMetadata = () => {
      if (cancelled || !videoRef.current) return;
      if (videoRef.current.preload === 'none') {
        videoRef.current.preload = 'metadata';
      }
    };

    const scheduleAfterLoad = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(warmMetadata, { timeout: 800 });
      } else {
        warmTimer = window.setTimeout(warmMetadata, 300);
      }
    };

    window.addEventListener('touchstart', warmMetadata, { once: true, passive: true });
    window.addEventListener('pointerdown', warmMetadata, { once: true, passive: true });
    window.addEventListener('scroll', warmMetadata, { once: true, passive: true });

    if (document.readyState === 'complete') {
      scheduleAfterLoad();
    } else {
      window.addEventListener('load', scheduleAfterLoad, { once: true });
    }

    return () => {
      cancelled = true;
      if (warmTimer !== null) window.clearTimeout(warmTimer);
      window.removeEventListener('load', scheduleAfterLoad);
      window.removeEventListener('touchstart', warmMetadata);
      window.removeEventListener('pointerdown', warmMetadata);
      window.removeEventListener('scroll', warmMetadata);
    };
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const cur = video.currentTime;
    const dur = video.duration;

    if (cur > maxWatchedTimeRef.current) {
      maxWatchedTimeRef.current = cur;
    }

    if (Number.isFinite(dur) && dur > 0) {
      setProgressPct(Math.min(100, Math.max(0, (cur / dur) * 100)));
    }
  }, []);

  // Prevent skipping ahead beyond already watched position
  const handleSeeking = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime > maxWatchedTimeRef.current + 1.5) {
      try {
        video.currentTime = maxWatchedTimeRef.current;
      } catch {
        // Ignore transient seek errors
      }
    }
  }, []);

  const handleUnmuteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    unlockAudioContext();
    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1.0;
    video.removeAttribute('muted');
    setNeedsSoundUnlock(false);
    if (video.paused) {
      video.play().catch(() => {});
    }
  }, []);

  const handlePrimaryInteraction = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);

    // Ensure preload activates immediately on click
    if (video.preload === 'none') {
      video.preload = 'auto';
    }

    // First play or replay from end
    if (!hasStartedRef.current || isEnded) {
      unlockAudioContext();

      if (isEnded) {
        maxWatchedTimeRef.current = 0;
        setProgressPct(0);
        setIsEnded(false);
        try {
          video.currentTime = 0;
        } catch {
          // Ignore seek errors
        }
      }

      // Mutate audio flags synchronously inside trusted click handler
      video.muted = false;
      video.defaultMuted = false;
      video.volume = 1.0;
      video.removeAttribute('muted');
      setIsBuffering(true);

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasStartedRef.current = true;
            setHasStarted(true);
            setIsPlaying(true);
            setIsPaused(false);
            setIsBuffering(false);
            setNeedsSoundUnlock(video.muted || video.volume === 0);
          })
          .catch(() => {
            // Fallback for strict WebViews that block unmuted start: start muted and show clear Unmute CTA
            video.muted = true;
            video
              .play()
              .then(() => {
                hasStartedRef.current = true;
                setHasStarted(true);
                setIsPlaying(true);
                setIsPaused(false);
                setIsBuffering(false);
                setNeedsSoundUnlock(true);
              })
              .catch(() => {
                setIsBuffering(false);
                setHasError(true);
              });
          });
      } else {
        hasStartedRef.current = true;
        setHasStarted(true);
        setIsPlaying(true);
        setIsPaused(false);
        setIsBuffering(false);
      }
      return;
    }

    // Toggle Play / Pause preserving exact timestamp
    if (video.paused) {
      video.muted = false;
      video.volume = 1.0;
      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true);
          setIsPaused(false);
          setNeedsSoundUnlock(video.muted || video.volume === 0);
        }).catch(() => {});
      } else {
        setIsPlaying(true);
        setIsPaused(false);
      }
    } else {
      video.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  }, [isEnded]);

  return (
    <div className={`relative flex flex-col items-center w-full ${className}`}>
      {/* "Aumente o volume" above VSL */}
      <div className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#08090C] border border-[#58D4F2]/60 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_0_16px_rgba(88,212,242,0.18)]">
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#58D4F2] animate-pulse" />
        <span>Aumente o volume</span>
      </div>

      {/* Video Container (Fixed 9:16 aspect ratio, responsive, Play/Pause only) */}
      <div
        role="button"
        tabIndex={0}
        aria-label={
          !hasStarted
            ? 'Assistir vídeo com som'
            : isEnded
              ? 'Assistir novamente'
              : isPaused
                ? 'Continuar vídeo'
                : 'Pausar vídeo'
        }
        onClick={handlePrimaryInteraction}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePrimaryInteraction();
          }
        }}
        className="relative w-full max-w-[376px] sm:max-w-[400px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#050912] border-2 border-[#58D4F2] shadow-[0_0_28px_rgba(88,212,242,0.28)] select-none cursor-pointer focus:outline-none touch-manipulation"
      >
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          playsInline
          preload="none"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          controls={false}
          onTimeUpdate={handleTimeUpdate}
          onSeeking={handleSeeking}
          onWaiting={() => {
            if (hasStartedRef.current) setIsBuffering(true);
          }}
          onPlaying={() => {
            setIsBuffering(false);
            setIsPlaying(true);
            setIsPaused(false);
          }}
          onPause={() => {
            if (hasStartedRef.current && !videoRef.current?.ended) {
              setIsPlaying(false);
              setIsPaused(true);
            }
          }}
          onEnded={() => {
            setIsPlaying(false);
            setIsPaused(false);
            setIsBuffering(false);
            setIsEnded(true);
            setProgressPct(100);
          }}
          onError={() => {
            setIsBuffering(false);
            setHasError(true);
          }}
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Crisp static cover image before first play or after ending (prevents black frame at 00:00) */}
        {(!hasStarted || isEnded) && (
          <img
            src={posterSrc}
            alt="Vídeo de apresentação Pack Viral"
            width={400}
            height={711}
            loading="eager"
            fetchPriority="low"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none select-none"
            draggable={false}
          />
        )}

        {/* OVERLAY 1: Stopped initial state — Centered Play button */}
        {!hasStarted && !isEnded && (
          <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center p-4 z-20 pointer-events-none">
            <span className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#58D4F2] to-[#4EC7E6] text-black flex items-center justify-center shadow-[0_0_32px_rgba(88,212,242,0.85)] border-2 border-white/80 animate-pulse-glow">
              {isBuffering ? (
                <span className="w-8 h-8 rounded-full border-4 border-black/25 border-t-black animate-spin" />
              ) : (
                <Play className="w-9 h-9 sm:w-11 sm:h-11 fill-black text-black ml-1" />
              )}
            </span>
            <span className="mt-4 px-5 py-2 rounded-full bg-black/80 border border-[#58D4F2]/70 text-white font-['Plus_Jakarta_Sans',sans-serif] font-[800] text-xs sm:text-sm tracking-wider uppercase shadow-lg">
              {isBuffering ? 'CARREGANDO VÍDEO...' : 'CLIQUE PARA ASSISTIR'}
            </span>
          </div>
        )}

        {/* OVERLAY 2: Paused state — Resumes from exact paused moment */}
        {hasStarted && isPaused && !isEnded && (
          <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center p-4 z-20 pointer-events-none transition-opacity duration-200">
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#58D4F2] to-[#4EC7E6] text-black flex items-center justify-center shadow-[0_0_30px_rgba(88,212,242,0.9)] border-2 border-white/80">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-black text-black ml-1" />
            </span>
            <span className="mt-4 px-4 py-2 rounded-full bg-black/85 border border-[#58D4F2]/60 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm tracking-wide uppercase shadow-lg">
              Pausado • Toque para continuar
            </span>
          </div>
        )}

        {/* OVERLAY 3: Ended state — Clean replay */}
        {isEnded && (
          <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center p-4 z-20 pointer-events-none">
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#58D4F2] to-[#4EC7E6] text-black flex items-center justify-center shadow-[0_0_30px_rgba(88,212,242,0.9)] border-2 border-white/80">
              <RotateCcw className="w-8 h-8 sm:w-9 sm:h-9 text-black" strokeWidth={2.5} />
            </span>
            <span className="mt-4 px-4 py-2 rounded-full bg-black/85 border border-[#58D4F2]/60 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm tracking-wide uppercase shadow-lg">
              Assistir novamente
            </span>
          </div>
        )}

        {/* Unmute button ONLY if browser/WebView forced muted playback */}
        {hasStarted && !isEnded && needsSoundUnlock && (
          <button
            type="button"
            onClick={handleUnmuteClick}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-['Plus_Jakarta_Sans',sans-serif] font-[800] text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(220,38,38,0.65)] border border-white/50 animate-pulse cursor-pointer whitespace-nowrap"
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span>TOQUE PARA ATIVAR O SOM</span>
          </button>
        )}

        {/* Subtle corner Pause badge while actively playing */}
        {hasStarted && isPlaying && !isBuffering && !isPaused && !isEnded && (
          <div className="absolute bottom-4 right-3 z-20 w-9 h-9 rounded-full bg-black/65 border border-white/25 flex items-center justify-center text-white/90 pointer-events-none">
            <Pause className="w-4 h-4" />
          </div>
        )}

        {/* Buffering spinner */}
        {hasStarted && isBuffering && !isPaused && !isEnded && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-10 h-10 rounded-full border-3 border-[#58D4F2]/30 border-t-[#58D4F2] animate-spin" />
          </div>
        )}

        {/* Error fallback */}
        {hasError && (
          <div className="absolute inset-x-4 bottom-8 z-30 rounded-xl bg-black/90 border border-red-500/60 p-3 text-center text-xs text-white pointer-events-none">
            Não foi possível reproduzir agora. Toque novamente para tentar.
          </div>
        )}

        {/* Non-interactive visual progress bar (no seek/skip possible) */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/75 z-20 pointer-events-none overflow-hidden"
        >
          <div
            className="h-full bg-gradient-to-r from-[#58D4F2] via-[#4EC7E6] to-[#0AE028] transition-[width] duration-300 ease-linear"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
});

export default VSLPlayer;
