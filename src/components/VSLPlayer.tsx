import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Volume2 } from 'lucide-react';

interface VSLPlayerProps {
  videoSrc?: string;
  className?: string;
}

export default function VSLPlayer({
  videoSrc = '/videoplayback.mp4',
  className = ''
}: VSLPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [fakeProgress, setFakeProgress] = useState(65);
  const activatedRef = useRef(false);

  // Unlock Web Audio system for iOS / Safari / In-App Browsers
  const unlockAudioContext = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      }
    } catch (_) {
      // AudioContext fallback
    }
  };

  // Initial muted autoplay for visual background motion
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 1.0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Normal: browser autoplay policies may wait for first user interaction
        });
      }
    }
  }, []);

  // Sync muted property directly to DOM node on state changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      video.defaultMuted = isMuted;
      video.volume = 1.0;
      if (!isMuted) {
        video.removeAttribute('muted');
      }
    }
  }, [isMuted]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const cur = video.currentTime;
      const dur = video.duration || 120;
      // Psychological progress bar: starts at 65% and smoothly crawls to 97.5%
      const actualRatio = Math.min(1, Math.max(0, cur / dur));
      const calculatedFake = Math.min(97.5, 65 + Math.pow(actualRatio, 0.72) * 32.5);
      setFakeProgress(calculatedFake);
    }
  };

  // Sound activation with full iOS / Android / In-App browser compatibility
  const handleActivateSound = useCallback((e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
      if (e.cancelable && e.type === 'touchend') {
        e.preventDefault();
      }
    }

    if (activatedRef.current) return;
    activatedRef.current = true;

    unlockAudioContext();

    const video = videoRef.current;
    if (video) {
      // Direct DOM manipulation before calling play for iOS Safari
      video.muted = false;
      video.defaultMuted = false;
      video.volume = 1.0;
      video.removeAttribute('muted');

      try {
        video.currentTime = 0;
      } catch (_) {}

      // Play continuously with audio (cannot be paused)
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsActivated(true);
            setIsMuted(false);
          })
          .catch((err) => {
            console.warn('Playback error with audio, retrying:', err);
            video.muted = false;
            video.volume = 1.0;
            video.play().then(() => {
              setIsActivated(true);
              setIsMuted(false);
            }).catch(() => {
              setIsActivated(true);
              setIsMuted(false);
            });
          });
      } else {
        setIsActivated(true);
        setIsMuted(false);
      }
    } else {
      setIsActivated(true);
      setIsMuted(false);
    }
  }, []);


  // Never allow pausing: if pause event triggers unexpectedly, immediately resume
  const handlePauseAttempt = () => {
    if (activatedRef.current && videoRef.current && !videoRef.current.ended) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className={`relative flex flex-col items-center w-full ${className}`}>
      {/* "Aumente o volume" above VSL */}
      <div className="mb-3.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#08090C] border border-[#58D4F2]/50 text-white font-bold text-sm sm:text-base tracking-wide shadow-lg">
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#58D4F2] animate-pulse" />
        <span>Aumente o volume</span>
      </div>

      {/* Video Container (Fixed 9:16 aspect ratio, responsive) */}
      <div 
        onClick={!isActivated ? handleActivateSound : undefined}
        className={`relative w-full max-w-[330px] sm:max-w-[360px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-black border-2 border-[#58D4F2] shadow-[0_0_35px_rgba(88,212,242,0.3)] select-none group ${
          !isActivated ? 'cursor-pointer' : 'cursor-default'
        }`}
      >
        {/* HTML5 Video: pauses are blocked and automatically resumed */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          autoPlay
          muted={isMuted}
          loop={!isActivated}
          onTimeUpdate={handleTimeUpdate}
          onPause={handlePauseAttempt}
          onContextMenu={(e) => e.preventDefault()}
          controls={false}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            !isActivated 
              ? 'filter blur-md sm:blur-lg scale-105 pointer-events-auto' 
              : 'filter blur-0 scale-100 pointer-events-none'
          }`}
        />

        {/* OVERLAY 1: "ATIVAR SOM" (When not activated) */}
        {!isActivated && (
          <div 
            onClick={handleActivateSound}
            onTouchEnd={handleActivateSound}
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 z-30 cursor-pointer"
          >
            {/* Urgent Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/95 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider mb-5 animate-pulse shadow-xl pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>SEU VÍDEO JÁ COMEÇOU!</span>
            </div>

            {/* Pulsing "ATIVAR SOM" Button */}
            <button
              type="button"
              onClick={handleActivateSound}
              onTouchEnd={handleActivateSound}
              className="group relative px-6 sm:px-8 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#58D4F2] to-[#4EC7E6] text-black font-['Plus_Jakarta_Sans',sans-serif] font-[900] text-base sm:text-lg tracking-wider uppercase shadow-[0_0_30px_rgba(88,212,242,0.9)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-3 border-2 border-white/60 cursor-pointer animate-pulse-glow"
            >
              <div className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center pointer-events-none">
                <Volume2 className="w-5 h-5 text-black" />
              </div>
              <span className="pointer-events-none">ATIVAR SOM</span>
            </button>
          </div>
        )}

        {/* FAKE PROGRESS BAR (Always displayed at bottom, tricks the user into thinking it's almost at the end) */}
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
