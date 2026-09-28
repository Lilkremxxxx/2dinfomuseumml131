import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, Volume1, VolumeX, Play, Pause, RotateCcw, Star } from 'lucide-react';

const YT_VIDEO_ID = 'NSnkb1IAjbE';
const DEFAULT_VOLUME = 100;

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [useFallbackAudio, setUseFallbackAudio] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(true);
  const [widgetPosition, setWidgetPosition] = useState({ x: 16, y: 112 });

  const playerRef = useRef(null);
  const fallbackAudioRef = useRef(null);
  const initTimeoutRef = useRef(null);
  const dragRef = useRef(null);
  const draggedRef = useRef(false);

  const startWidgetDrag = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: widgetPosition.x,
      originY: widgetPosition.y,
    };
    draggedRef.current = false;
  };

  const moveWidget = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 4) draggedRef.current = true;
    if (!draggedRef.current) return;
    const widgetWidth = isExpanded ? 320 : 48;
    const widgetHeight = isExpanded ? 56 : 48;
    setWidgetPosition({
      x: Math.max(0, Math.min(window.innerWidth - widgetWidth, drag.originX + deltaX)),
      y: Math.max(0, Math.min(window.innerHeight - widgetHeight, drag.originY + deltaY)),
    });
  };

  const stopWidgetDrag = (event) => {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  };

  // 1. Initialize YouTube Iframe Player
  useEffect(() => {
    let isCancelled = false;

    // Load YouTube IFrame API script if not already present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.body.appendChild(tag);
    }

    const initPlayer = () => {
      if (isCancelled || playerRef.current) return;
      if (!window.YT || !window.YT.Player) {
        initTimeoutRef.current = setTimeout(initPlayer, 200);
        return;
      }

      try {
        playerRef.current = new window.YT.Player('yt-bg-audio-container', {
          height: '2',
          width: '2',
          videoId: YT_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: YT_VIDEO_ID, // Required for loop in single YT video
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (isCancelled) return;
              setPlayerReady(true);
              event.target.setVolume(DEFAULT_VOLUME);
              // Try autoplay
              try {
                event.target.playVideo();
              } catch (e) {
                console.log('Browser blocked initial autoplay, waiting for interaction:', e);
              }
            },
            onStateChange: (event) => {
              if (isCancelled) return;
              // YT.PlayerState: -1 (UNSTARTED), 0 (ENDED), 1 (PLAYING), 2 (PAUSED), 3 (BUFFERING)
              if (event.data === 1) {
                setIsPlaying(true);
                setAutoplayBlocked(false);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                // Loop: replay immediately
                event.target.seekTo(0);
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onError: (err) => {
              console.warn('YouTube audio player error, fallback to HTML5 audio:', err);
              setUseFallbackAudio(true);
            },
          },
        });
      } catch (err) {
        console.warn('Failed to initialize YouTube player:', err);
        setUseFallbackAudio(true);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      initTimeoutRef.current = setTimeout(initPlayer, 500);
    }

    // Safety timeout: if YouTube API doesn't initialize within 6s, prepare fallback
    const safetyFallbackTimer = setTimeout(() => {
      if (!playerRef.current && !playerReady) {
        setUseFallbackAudio(true);
      }
    }, 6000);

    return () => {
      isCancelled = true;
      if (initTimeoutRef.current) clearTimeout(initTimeoutRef.current);
      clearTimeout(safetyFallbackTimer);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (_) {}
      }
    };
  }, []);

  // 2. Playback trigger helper
  const triggerPlay = () => {
    if (useFallbackAudio) {
      if (fallbackAudioRef.current) {
        fallbackAudioRef.current.volume = isMuted ? 0 : volume / 100;
        fallbackAudioRef.current.play().then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        }).catch((err) => {
          console.log('Audio fallback play error:', err);
        });
      }
    } else if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        if (isMuted) {
          playerRef.current.mute();
        } else {
          playerRef.current.unMute();
          playerRef.current.setVolume(volume);
        }
        playerRef.current.playVideo();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (e) {
        console.log('YouTube play error:', e);
      }
    }
  };

  const triggerPause = () => {
    if (useFallbackAudio) {
      if (fallbackAudioRef.current) {
        fallbackAudioRef.current.pause();
        setIsPlaying(false);
      }
    } else if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
      try {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } catch (e) {
        console.log('YouTube pause error:', e);
      }
    }
  };

  // 3. User interaction listener to bypass browser autoplay policy
  useEffect(() => {
    // Attempt immediate unmuted play on mount
    triggerPlay();

    const handleFirstInteraction = () => {
      triggerPlay();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('pointermove', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('pointermove', handleFirstInteraction, { passive: true });
    window.addEventListener('wheel', handleFirstInteraction, { passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('pointermove', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying, playerReady, useFallbackAudio, volume, isMuted]);

  // Broadcast state changes globally
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('bg-music-state', { 
      detail: { isPlaying, volume, isMuted } 
    }));
  }, [isPlaying, volume, isMuted]);

  // Listen to remote toggle / volume events
  useEffect(() => {
    const onToggle = () => togglePlayPause();
    const onSetVol = (e) => {
      if (typeof e.detail?.volume === 'number') {
        handleVolumeChange(e.detail.volume);
      }
    };

    window.addEventListener('toggle-bg-music', onToggle);
    window.addEventListener('set-bg-volume', onSetVol);
    return () => {
      window.removeEventListener('toggle-bg-music', onToggle);
      window.removeEventListener('set-bg-volume', onSetVol);
    };
  }, [isPlaying, useFallbackAudio, playerReady, volume, isMuted]);

  // 4. Volume and Mute updates
  const handleVolumeChange = (newVal) => {
    const val = Math.max(0, Math.min(100, newVal));
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }

    if (useFallbackAudio) {
      if (fallbackAudioRef.current) {
        fallbackAudioRef.current.volume = isMuted ? 0 : val / 100;
      }
    } else if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      try {
        playerRef.current.setVolume(val);
        if (val === 0) {
          playerRef.current.mute();
        } else {
          playerRef.current.unMute();
        }
      } catch (_) {}
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (useFallbackAudio) {
      if (fallbackAudioRef.current) {
        fallbackAudioRef.current.volume = nextMuted ? 0 : volume / 100;
      }
    } else if (playerRef.current) {
      try {
        if (nextMuted) {
          playerRef.current.mute();
        } else {
          playerRef.current.unMute();
          playerRef.current.setVolume(volume);
        }
      } catch (_) {}
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      triggerPause();
    } else {
      triggerPlay();
    }
  };

  return (
    <>
      {/* Hidden YouTube Player Iframe (must be rendered in DOM with minimal size for browser audio processing) */}
      <div
        id="yt-bg-audio-container"
        className="fixed bottom-0 left-0 -z-50 pointer-events-none opacity-[0.001] w-[2px] h-[2px] overflow-hidden"
        aria-hidden="true"
      />

      {/* Fallback HTML5 Audio Tag */}
      {useFallbackAudio && (
        <audio
          ref={fallbackAudioRef}
          src="/audio/vietnam-my-home.m4a"
          loop
          preload="auto"
          onEnded={() => {
            if (fallbackAudioRef.current) {
              fallbackAudioRef.current.currentTime = 0;
              fallbackAudioRef.current.play().catch(() => {});
            }
          }}
        />
      )}

      {/* Floating Background Music Controller Widget */}
      <aside
        aria-label="Điều khiển nhạc nền triển lãm"
        style={{ left: `${widgetPosition.x}px`, top: `${widgetPosition.y}px` }}
        className={`fixed z-50 transition-all duration-300 select-none ${
          isExpanded ? 'w-80' : 'w-auto'
        }`}
      >
        <div className="relative flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-vn-charcoal/90 backdrop-blur-xl border border-vn-gold/40 shadow-2xl shadow-black/80 text-vn-ivory hover:border-vn-gold transition-all duration-200">
          
          {/* Vinyl / Equalizer Icon button */}
          {isExpanded ? (
            <button
              onClick={togglePlayPause}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-vn-red-deep to-vn-black border border-vn-gold/60 flex items-center justify-center flex-shrink-0 group hover:scale-105 transition-transform overflow-hidden"
              title={isPlaying ? 'Tạm dừng nhạc nền' : 'Phát nhạc nền: VIETNAM | My Home'}
            >
              {isPlaying ? (
                <div className="flex items-end justify-center gap-[2.5px] h-4 w-4">
                  <span className="w-[3px] bg-vn-gold rounded-full animate-bounce [animation-delay:0ms] h-full" />
                  <span className="w-[3px] bg-vn-gold rounded-full animate-bounce [animation-delay:150ms] h-3" />
                  <span className="w-[3px] bg-vn-gold rounded-full animate-bounce [animation-delay:300ms] h-4" />
                  <span className="w-[3px] bg-vn-gold rounded-full animate-bounce [animation-delay:100ms] h-2" />
                </div>
              ) : <Play className="w-4 h-4 text-vn-gold fill-vn-gold/30 translate-x-[1px]" />}
              {autoplayBlocked && !isPlaying && <span className="absolute inset-0 rounded-full border-2 border-vn-gold animate-ping opacity-75" />}
            </button>
          ) : (
            <button
              type="button"
              onPointerDown={startWidgetDrag}
              onPointerMove={moveWidget}
              onPointerUp={stopWidgetDrag}
              onPointerCancel={stopWidgetDrag}
              onClick={() => {
                if (draggedRef.current) {
                  draggedRef.current = false;
                  return;
                }
                setIsExpanded(true);
              }}
              className="flex h-10 w-10 touch-none items-center justify-center rounded-full border border-red-300/80 bg-gradient-to-br from-red-500 to-red-800 text-red-100 shadow-lg shadow-red-950/50 transition-transform hover:scale-110"
              title="Kéo để di chuyển · Nhấn để mở điều khiển nhạc"
              aria-label="Mở điều khiển nhạc, có thể kéo để di chuyển"
            >
              <Star className="h-5 w-5 fill-red-200 text-red-100 drop-shadow-[0_0_6px_rgba(255,60,60,0.9)]" />
            </button>
          )}

          {/* Collapsed Mode: Track label & quick volume info */}
          {isExpanded ? (
            <div className="flex-1 flex items-center justify-between gap-3 px-2 pr-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-vn-gold truncate">VIETNAM | My Home</span>
                  <span className="text-[10px] font-mono text-vn-gold font-bold ml-2">{isMuted ? 'Muted' : `${volume}%`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={toggleMute} className="p-0.5 text-vn-gold-antique hover:text-vn-gold" title={isMuted ? 'Bật âm' : 'Tắt tiếng'}>
                    {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <input type="range" min="0" max="100" step="1" value={isMuted ? 0 : volume} onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10))} className="w-full h-1.5 accent-vn-gold bg-vn-ivory/20 rounded-full cursor-pointer" />
                </div>
              </div>
              <button type="button" onClick={() => setIsExpanded(false)} className="text-[10px] px-2 py-1 rounded bg-black/40 text-vn-ivory/70 hover:text-white border border-vn-gold/20" title="Thu gọn">✕</button>
            </div>
          ) : null}

        </div>
      </aside>
    </>
  );
}
