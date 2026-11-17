import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { Play, Pause, Volume2, RotateCcw } from 'lucide-react';

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  unMute: () => void;
  mute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    element: HTMLElement | string,
    options: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      host?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: { target: YTPlayerInstance }) => void;
        onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
        onError?: () => void;
      };
    }
  ) => YTPlayerInstance;
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface VSLPlayerProps {
  videoId?: string;
  className?: string;
}

let ytApiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeIframeAPI(): Promise<YTNamespace> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window unavailable'));
  }
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }
  if (ytApiPromise) {
    return ytApiPromise;
  }

  ytApiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousCallback === 'function') {
        try {
          previousCallback();
        } catch {
          // Ignore prior callback errors
        }
      }
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => {
        ytApiPromise = null;
        reject(new Error('Failed to load YouTube IFrame API'));
      };
      document.head.appendChild(script);
    }

    // Fallback poll in case onYouTubeIframeAPIReady fired before assignment
    const poll = window.setInterval(() => {
      if (window.YT && window.YT.Player) {
        window.clearInterval(poll);
        resolve(window.YT);
      }
    }, 100);

    window.setTimeout(() => {
      window.clearInterval(poll);
    }, 15000);
  });

  return ytApiPromise;
}

let ytPreconnected = false;
function preconnectYouTube() {
  if (ytPreconnected || typeof document === 'undefined') return;
  ytPreconnected = true;
  for (const href of ['https://www.youtube.com', 'https://i.ytimg.com']) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }
}

const DEFAULT_VIDEO_ID = 'n9zFXC2wg1M';

const VSLPlayer = memo(function VSLPlayer({
  videoId = DEFAULT_VIDEO_ID,
  className = ''
}: VSLPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ytHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const playerInitializedRef = useRef(false);
  const pendingFirstPlayRef = useRef(false);
  const hasStartedRef = useRef(false);
  const maxWatchedTimeRef = useRef(0);
  const soundFallbackTimerRef = useRef<number | null>(null);
  const muteVerifyTimerRef = useRef<number | null>(null);

  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [needsSoundUnlock, setNeedsSoundUnlock] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [progressPct, setProgressPct] = useState(0);

  const clearTimers = useCallback(() => {
    if (soundFallbackTimerRef.current !== null) {
      window.clearTimeout(soundFallbackTimerRef.current);
      soundFallbackTimerRef.current = null;
    }
    if (muteVerifyTimerRef.current !== null) {
      window.clearTimeout(muteVerifyTimerRef.current);
      muteVerifyTimerRef.current = null;
    }
  }, []);

  const verifyAudioState = useCallback((player: YTPlayerInstance) => {
    if (muteVerifyTimerRef.current !== null) {
      window.clearTimeout(muteVerifyTimerRef.current);
    }
    muteVerifyTimerRef.current = window.setTimeout(() => {
      try {
        const muted = player.isMuted();
        const volume = player.getVolume();
        if (muted || volume === 0) {
          setNeedsSoundUnlock(true);
        } else {
          setNeedsSoundUnlock(false);
        }
      } catch {
        // Ignore transient API reads
      }
    }, 450);
  }, []);

  const initPlayer = useCallback(() => {
    if (playerInitializedRef.current || !ytHostRef.current) return;
    playerInitializedRef.current = true;

    loadYouTubeIframeAPI()
      .then((YT) => {
        if (!ytHostRef.current || playerRef.current) return;

        // Create an isolated child mount node so React never reconciles YouTube's replaced iframe
        const mountNode = document.createElement('div');
        mountNode.style.width = '100%';
        mountNode.style.height = '100%';
        ytHostRef.current.innerHTML = '';
        ytHostRef.current.appendChild(mountNode);

        playerRef.current = new YT.Player(mountNode, {
          videoId,
          width: '100%',
          height: '100%',
          host: 'https://www.youtube.com',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            cc_load_policy: 0,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: ({ target }) => {
              // Ensure inline mobile attributes on the generated iframe for iOS Safari & in-app WebViews
              const iframe = ytHostRef.current?.querySelector('iframe');
              if (iframe) {
                iframe.setAttribute('playsinline', '1');
                iframe.setAttribute('webkit-playsinline', '1');
                iframe.setAttribute(
                  'allow',
                  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                );
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = '0';
                iframe.style.pointerEvents = 'none';
              }

              setIsPlayerReady(true);

              if (pendingFirstPlayRef.current) {
                pendingFirstPlayRef.current = false;
                try {
                  target.unMute();
                  target.setVolume(100);
                  target.playVideo();

                  // If async playback after deferred API load was blocked by Safari with audio, fallback to muted + clear unmute prompt
                  soundFallbackTimerRef.current = window.setTimeout(() => {
                    try {
                      const state = target.getPlayerState();
                      if (state !== YT.PlayerState.PLAYING && state !== YT.PlayerState.BUFFERING) {
                        target.mute();
                        target.playVideo();
                        setNeedsSoundUnlock(true);
                      }
                    } catch {
                      // Ignore
                    }
                  }, 900);
                } catch {
                  setIsStarting(false);
                }
              }
            },
            onStateChange: ({ data, target }) => {
              if (!window.YT) return;
              const { PLAYING, PAUSED, ENDED, BUFFERING } = window.YT.PlayerState;

              if (data === PLAYING) {
                if (soundFallbackTimerRef.current !== null) {
                  window.clearTimeout(soundFallbackTimerRef.current);
                  soundFallbackTimerRef.current = null;
                }
                hasStartedRef.current = true;
                setHasStarted(true);
                setIsStarting(false);
                setIsPlaying(true);
                setIsPaused(false);
                setIsEnded(false);
                setIsBuffering(false);
                verifyAudioState(target);
              } else if (data === BUFFERING) {
                setIsBuffering(true);
              } else if (data === PAUSED) {
                setIsPlaying(false);
                setIsBuffering(false);
                if (hasStartedRef.current) {
                  setIsPaused(true);
                }
              } else if (data === ENDED) {
                setIsPlaying(false);
                setIsPaused(false);
                setIsBuffering(false);
                setIsEnded(true);
                setProgressPct(100);
              }
            },
            onError: () => {
              setIsStarting(false);
              setIsBuffering(false);
              setHasError(true);
            }
          }
        });
      })
      .catch(() => {
        playerInitializedRef.current = false;
        setIsStarting(false);
        setHasError(true);
      });
  }, [videoId, verifyAudioState]);

  // Defer YouTube API & iframe initialization until after window.load (or first user touch/scroll)
  // so initial site entry & Connect Rate have zero competition from YouTube assets, while warming up fast for Play
  useEffect(() => {
    let warmTimer: number | null = null;
    let cancelled = false;

    const triggerWarmup = () => {
      if (cancelled) return;
      preconnectYouTube();
      initPlayer();
    };

    const scheduleAfterLoad = () => {
      if (cancelled) return;
      preconnectYouTube();
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(
          () => {
            if (!cancelled) initPlayer();
          },
          { timeout: 900 }
        );
      } else {
        warmTimer = window.setTimeout(triggerWarmup, 400);
      }
    };

    const onFirstInteraction = () => {
      triggerWarmup();
    };

    window.addEventListener('touchstart', onFirstInteraction, { once: true, passive: true });
    window.addEventListener('pointerdown', onFirstInteraction, { once: true, passive: true });
    window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true });

    if (document.readyState === 'complete') {
      scheduleAfterLoad();
    } else {
      window.addEventListener('load', scheduleAfterLoad, { once: true });
    }

    return () => {
      cancelled = true;
      if (warmTimer !== null) window.clearTimeout(warmTimer);
      window.removeEventListener('load', scheduleAfterLoad);
      window.removeEventListener('touchstart', onFirstInteraction);
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('scroll', onFirstInteraction);
    };
  }, [initPlayer]);

  // Cleanup on unmount only — never reset on scroll
  useEffect(() => {
    return () => {
      clearTimers();
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore destroy errors
        }
        playerRef.current = null;
      }
    };
  }, [clearTimers]);

  // Anti-seek guard & non-interactive visual progress updater while actively playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      try {
        const cur = player.getCurrentTime();
        const dur = player.getDuration();

        if (typeof cur === 'number' && Number.isFinite(cur)) {
          // Prevent skipping forward past watched time
          if (cur > maxWatchedTimeRef.current + 2.5) {
            player.seekTo(maxWatchedTimeRef.current, true);
            return;
          }
          if (cur > maxWatchedTimeRef.current) {
            maxWatchedTimeRef.current = cur;
          }
          if (typeof dur === 'number' && dur > 0) {
            setProgressPct(Math.min(100, Math.max(0, (cur / dur) * 100)));
          }
        }
      } catch {
        // Ignore transient reads
      }
    }, 400);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const handleUnmuteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const player = playerRef.current;
    if (!player) return;
    try {
      player.unMute();
      player.setVolume(100);
      setNeedsSoundUnlock(false);
    } catch {
      // Ignore
    }
  }, []);

  const handlePrimaryInteraction = useCallback(() => {
    setHasError(false);

    // If API/player isn't ready yet, start loading and queue first play
    if (!isPlayerReady || !playerRef.current) {
      pendingFirstPlayRef.current = true;
      setIsStarting(true);
      initPlayer();
      return;
    }

    const player = playerRef.current;

    // First play or replay after ending
    if (!hasStarted || isEnded) {
      if (isEnded) {
        maxWatchedTimeRef.current = 0;
        setProgressPct(0);
        setIsEnded(false);
        try {
          player.seekTo(0, true);
        } catch {
          // Ignore seek errors
        }
      }

      setIsStarting(true);
      try {
        // Synchronous inside user click so Chrome, iOS Safari & Meta WebViews allow audio immediately
        player.unMute();
        player.setVolume(100);
        player.playVideo();

        // Guard against browsers blocking unmuted playback
        if (soundFallbackTimerRef.current !== null) {
          window.clearTimeout(soundFallbackTimerRef.current);
        }
        soundFallbackTimerRef.current = window.setTimeout(() => {
          try {
            const state = player.getPlayerState();
            const playingState = window.YT?.PlayerState.PLAYING ?? 1;
            const bufferingState = window.YT?.PlayerState.BUFFERING ?? 3;
            if (state !== playingState && state !== bufferingState) {
              player.mute();
              player.playVideo();
              setNeedsSoundUnlock(true);
            }
          } catch {
            // Ignore
          }
        }, 900);
      } catch {
        setIsStarting(false);
      }
      return;
    }

    // Toggle Play / Pause preserving exact timestamp
    try {
      const state = player.getPlayerState();
      const playingState = window.YT?.PlayerState.PLAYING ?? 1;
      const bufferingState = window.YT?.PlayerState.BUFFERING ?? 3;

      if (state === playingState || state === bufferingState) {
        player.pauseVideo();
        setIsPlaying(false);
        setIsPaused(true);
      } else {
        player.unMute();
        player.setVolume(100);
        player.playVideo();
        setIsPaused(false);
        setIsPlaying(true);
      }
    } catch {
      // Ignore
    }
  }, [hasStarted, initPlayer, isEnded, isPlayerReady]);

  return (
    <div ref={containerRef} className={`relative flex flex-col items-center w-full ${className}`}>
      {/* "Aumente o volume" above VSL */}
      <div className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#08090C] border border-[#58D4F2]/60 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_0_16px_rgba(88,212,242,0.18)]">
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#58D4F2] animate-pulse" />
        <span>Aumente o volume</span>
      </div>

      {/* Video Container (Fixed 9:16 vertical Shorts ratio, clean responsive frame) */}
      <div
        role="button"
        tabIndex={0}
        aria-label={
          !hasStarted
            ? 'Reproduzir vídeo com áudio'
            : isEnded
              ? 'Assistir vídeo novamente'
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
        {/* Dedicated YouTube IFrame host (unmanaged by React children once mounted) */}
        <div
          ref={ytHostRef}
          className={`absolute inset-0 w-full h-full z-10 transition-opacity duration-300 pointer-events-none ${
            hasStarted && !isEnded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Static cover before first play or after end so there is never a black screen or related videos */}
        {(!hasStarted || isEnded) && (
          <img
            src="/assets/vsl-cover.webp"
            alt="Vídeo de apresentação Pack Viral"
            width={400}
            height={711}
            loading="eager"
            fetchPriority="low"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover z-15 pointer-events-none select-none"
            draggable={false}
          />
        )}

        {/* Transparent interaction layer blocking YouTube native scrub/seek/double-tap & toggling Play/Pause */}
        <div className="absolute inset-0 z-20" />

        {/* OVERLAY 1: Initial Stopped State — Centered Play CTA */}
        {!hasStarted && !isEnded && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 z-30 pointer-events-none">
            <span className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#58D4F2] to-[#4EC7E6] text-black flex items-center justify-center shadow-[0_0_32px_rgba(88,212,242,0.85)] border-2 border-white/80 animate-pulse-glow">
              {isStarting ? (
                <span className="w-8 h-8 rounded-full border-4 border-black/25 border-t-black animate-spin" />
              ) : (
                <Play className="w-9 h-9 sm:w-11 sm:h-11 fill-black text-black ml-1" />
              )}
            </span>
            <span className="mt-4 px-5 py-2 rounded-full bg-black/80 border border-[#58D4F2]/70 text-white font-['Plus_Jakarta_Sans',sans-serif] font-[800] text-xs sm:text-sm tracking-wider uppercase shadow-lg">
              {isStarting ? 'CARREGANDO VÍDEO...' : 'CLIQUE PARA ASSISTIR'}
            </span>
          </div>
        )}

        {/* OVERLAY 2: Paused State — Preserves exact timestamp */}
        {hasStarted && isPaused && !isEnded && (
          <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center p-4 z-30 pointer-events-none transition-opacity duration-200">
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#58D4F2] to-[#4EC7E6] text-black flex items-center justify-center shadow-[0_0_30px_rgba(88,212,242,0.9)] border-2 border-white/80">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-black text-black ml-1" />
            </span>
            <span className="mt-4 px-4 py-2 rounded-full bg-black/85 border border-[#58D4F2]/60 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm tracking-wide uppercase shadow-lg">
              Pausado • Toque para continuar
            </span>
          </div>
        )}

        {/* OVERLAY 3: Ended State — Clean Replay without YouTube related videos */}
        {isEnded && (
          <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center p-4 z-30 pointer-events-none">
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#58D4F2] to-[#4EC7E6] text-black flex items-center justify-center shadow-[0_0_30px_rgba(88,212,242,0.9)] border-2 border-white/80">
              <RotateCcw className="w-8 h-8 sm:w-9 sm:h-9 text-black" strokeWidth={2.5} />
            </span>
            <span className="mt-4 px-4 py-2 rounded-full bg-black/85 border border-[#58D4F2]/60 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm tracking-wide uppercase shadow-lg">
              Assistir novamente
            </span>
          </div>
        )}

        {/* Fallback Unmute Button ONLY if browser forced muted playback */}
        {hasStarted && !isEnded && needsSoundUnlock && (
          <button
            type="button"
            onClick={handleUnmuteClick}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-['Plus_Jakarta_Sans',sans-serif] font-[800] text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(220,38,38,0.65)] border border-white/50 animate-pulse cursor-pointer whitespace-nowrap"
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span>TOQUE PARA ATIVAR O SOM</span>
          </button>
        )}

        {/* Subtle corner Pause indicator while actively playing */}
        {hasStarted && isPlaying && !isBuffering && !isPaused && !isEnded && (
          <div className="absolute bottom-4 right-3 z-30 w-9 h-9 rounded-full bg-black/65 border border-white/25 flex items-center justify-center text-white/90 pointer-events-none">
            <Pause className="w-4 h-4" />
          </div>
        )}

        {/* Buffering spinner */}
        {hasStarted && isBuffering && !isPaused && !isEnded && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div className="w-10 h-10 rounded-full border-3 border-[#58D4F2]/30 border-t-[#58D4F2] animate-spin" />
          </div>
        )}

        {/* Error fallback message */}
        {hasError && (
          <div className="absolute inset-x-4 bottom-8 z-40 rounded-xl bg-black/90 border border-red-500/60 p-3 text-center text-xs text-white pointer-events-none">
            Não foi possível carregar o vídeo agora. Toque novamente para tentar.
          </div>
        )}

        {/* Non-interactive visual progress indicator (no seek/skip possible) */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/75 z-30 pointer-events-none overflow-hidden"
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
