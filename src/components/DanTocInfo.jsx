import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import Lenis from 'lenis';
import { useNavigate } from 'react-router-dom';
import InteractiveVietnamMap from './InteractiveVietnamMap';
import EthnicStorySequence from './EthnicStorySequence';
import EthnicPhotoArchive from './EthnicPhotoArchive';
import FlagZoomTransition from './FlagZoomTransition';
import MediaShowcase from './MediaShowcase';

// 3 NGUYÊN TẮC CƯƠNG LĨNH LÊNIN (Viết hoa chữ đầu: "Bình đẳng", "Tự quyết", "Liên hiệp")
const LENIN_MILESTONES = [
  {
    index: 0,
    title: "Bình đẳng",
    quote: "Không phân biệt dân tộc lớn hay nhỏ, trình độ phát triển cao hay thấp; các dân tộc có quyền lợi và nghĩa vụ ngang nhau.",
    timelinePos: "8%",
  },
  {
    index: 1,
    title: "Tự quyết",
    quote: "Quyền tự quyết là quyền của các dân tộc tự quyết định vận mệnh, lựa chọn chế độ chính trị và con đường phát triển của mình.",
    timelinePos: "50%",
  },
  {
    index: 2,
    title: "Liên hiệp",
    quote: "Đoàn kết, liên hiệp công nhân các dân tộc là cơ sở để đoàn kết các tầng lớp nhân dân lao động trong cuộc đấu tranh vì độc lập dân tộc và tiến bộ xã hội.",
    timelinePos: "92%",
  }
];

export default function DanTocInfo() {
  const navigate = useNavigate();
  const lenisRef = useRef(null);
  const [isFlagZoomOpen, setIsFlagZoomOpen] = useState(false);
  const [isEthnicMapOpen, setIsEthnicMapOpen] = useState(false);
  const [isEthnicDrawerOpen, setIsEthnicDrawerOpen] = useState(false);
  const [autoScrollActive, setAutoScrollActive] = useState(false);
  const [mapAutoExit, setMapAutoExit] = useState(false);
  const [boatAutoExit, setBoatAutoExit] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.15,
      autoRaf: true,
      prevent: (node) => Boolean(node.closest?.('#con-thuyen-lenin, [data-map-wheel-lock="true"]')),
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const returnToStart = () => {
    setAutoScrollActive(false);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.scrollY < 8) {
      navigate('/');
      return;
    }

    lenisRef.current?.scrollTo(0, {
      duration: 1.8,
      easing: (progress) => progress * progress * (3 - 2 * progress),
      onComplete: () => navigate('/'),
    });
  };

  useEffect(() => {
    if (!autoScrollActive) return undefined;
    let frameId;
    let previousTime;
    let heldPentagonScene = null;
    let convergeResumeAt = 0;
    let releasedConvergeScene = null;
    let heldMapScene = null;
    let mapResumeAt = 0;
    let mapExitStartedAt = null;
    let mapExitStartY = 0;
    let mapExitTargetY = 0;
    let mapExitSceneKey = null;
    let mapGlideComplete = false;
    let boatExitStartedAt = null;
    let boatExitStartY = 0;
    let boatExitTargetY = 0;
    let boatGlideComplete = false;
    let boatPlayback = null;
    const step = () => {
      const now = performance.now();
      const elapsed = previousTime === undefined ? 0 : Math.min(50, now - previousTime);
      previousTime = now;
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        setAutoScrollActive(false);
        return;
      }

      const story = document.getElementById('dan-toc-kham-pha');
      const sceneType = story?.dataset.activeSceneType;
      const sceneIndex = story?.dataset.activeSceneIndex;
      const sceneKey = `${sceneType}:${sceneIndex}`;
      if (sceneType === 'pentagon' || sceneType === 'pentagon-converge') {
        if (heldPentagonScene !== sceneKey && releasedConvergeScene !== sceneKey) {
          heldPentagonScene = sceneKey;
          convergeResumeAt = now + (sceneType === 'pentagon-converge' ? 2000 : 900);
        }
        if (heldPentagonScene === sceneKey && now < convergeResumeAt) {
          frameId = requestAnimationFrame(step);
          return;
        }
        if (sceneType === 'pentagon-converge' && heldPentagonScene === sceneKey) {
          releasedConvergeScene = sceneKey;
          heldPentagonScene = null;
          const nextSceneY = story.offsetTop + (Number(sceneIndex) + 1) * window.innerHeight * 1.12 + 1;
          lenisRef.current?.scrollTo(nextSceneY, { immediate: true });
          frameId = requestAnimationFrame(step);
          return;
        }
      } else {
        heldPentagonScene = null;
        if (sceneKey !== releasedConvergeScene) releasedConvergeScene = null;
      }

      const isHoldingFinalMap = document.querySelector('.ethnic-story-stage--map');
      const mapIsReady = isHoldingFinalMap?.dataset.mapReady === 'true';
      if (sceneType === 'image' && mapIsReady && !mapGlideComplete) {
        const mapSceneKey = `${sceneKey}:ready`;
        if (heldMapScene !== mapSceneKey) {
          heldMapScene = mapSceneKey;
          mapResumeAt = now + 5000;
        }
        if (now < mapResumeAt) {
          frameId = requestAnimationFrame(step);
          return;
        }
        if (mapExitSceneKey !== mapSceneKey) {
          mapExitSceneKey = mapSceneKey;
          mapExitStartedAt = now;
          mapExitStartY = window.scrollY;
          const boatTop = boatSectionRef.current?.getBoundingClientRect().top;
          mapExitTargetY = window.scrollY + Math.max(0, boatTop ?? window.innerHeight);
          setMapAutoExit(true);
        }
        const glideProgress = Math.min(1, (now - mapExitStartedAt) / 1500);
        const easedGlide = glideProgress < 0.5
          ? 4 * glideProgress ** 3
          : 1 - ((-2 * glideProgress + 2) ** 3) / 2;
        lenisRef.current?.scrollTo(
          mapExitStartY + (mapExitTargetY - mapExitStartY) * easedGlide,
          { immediate: true },
        );
        if (glideProgress < 1) {
          frameId = requestAnimationFrame(step);
          return;
        }
        setMapAutoExit(false);
        heldMapScene = null;
        mapExitSceneKey = null;
        mapGlideComplete = true;
      } else {
        heldMapScene = null;
        mapExitSceneKey = null;
        mapExitStartedAt = null;
      }

      const boatRect = boatSectionRef.current?.getBoundingClientRect();
      if (boatRect && boatRect.top <= 10 && (boatProgressRef.current < 1 || boatPlayback?.stage === 2)) {
        if (!boatPlayback) {
          const stage = boatProgressRef.current >= 1 ? 2 : boatProgressRef.current >= 0.5 ? 1 : 0;
          boatPlayback = {
            stage,
            from: boatProgressRef.current,
            to: stage === 0 ? 0.5 : 1,
            startedAt: now,
          };
        }
        const progressAfterHold = Math.max(0, now - boatPlayback.startedAt - 7000) / 1000;
        const transition = Math.min(1, progressAfterHold);
        const easedTransition = 0.5 - Math.cos(Math.PI * transition) / 2;
        const nextProgress = boatPlayback.from + (boatPlayback.to - boatPlayback.from) * easedTransition;
        boatProgressRef.current = nextProgress;
        setBoatProgress(nextProgress);
        if (transition === 1) {
          if (boatPlayback.stage < 2) {
            boatPlayback = {
              stage: boatPlayback.stage + 1,
              from: boatPlayback.to,
              to: 1,
              startedAt: now,
            };
          } else {
            boatPlayback = null;
          }
        }
        if (nextProgress >= 1) {
          frameId = requestAnimationFrame(step);
          return;
        }
        frameId = requestAnimationFrame(step);
        return;
      }

      if (boatRect && boatRect.top <= 10 && boatProgressRef.current >= 1 && !boatGlideComplete) {
        if (boatExitStartedAt === null) {
          boatExitStartedAt = now;
          boatExitStartY = window.scrollY;
          const mapSectionTop = document.getElementById('ban-sac-dan-toc')?.getBoundingClientRect().top;
          boatExitTargetY = window.scrollY + Math.max(0, mapSectionTop ?? window.innerHeight);
          setBoatAutoExit(true);
        }
        const glideProgress = Math.min(1, (now - boatExitStartedAt) / 1500);
        const easedGlide = glideProgress < 0.5
          ? 4 * glideProgress ** 3
          : 1 - ((-2 * glideProgress + 2) ** 3) / 2;
        lenisRef.current?.scrollTo(
          boatExitStartY + (boatExitTargetY - boatExitStartY) * easedGlide,
          { immediate: true },
        );
        if (glideProgress < 1) {
          frameId = requestAnimationFrame(step);
          return;
        }
        setBoatAutoExit(false);
        boatGlideComplete = true;
        boatExitStartedAt = null;
      }

      const scrollRate = sceneType === 'quote'
        ? 0.15
        : isHoldingFinalMap
          ? (mapIsReady ? 0.72 : 0.24)
          : 0.36;
      lenisRef.current?.scrollTo(window.scrollY + elapsed * scrollRate, { immediate: true });
      frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [autoScrollActive]);

  useEffect(() => {
    if (!isFlagZoomOpen) return undefined;
    const frame = requestAnimationFrame(() => {
      document.getElementById('flag-map-transition')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [isFlagZoomOpen]);

  // --- PHẦN CON THUYỀN LÊNIN (WHEEL-INTERCEPT SCROLL LOCK) ---
  // Khi section thuyền vào viewport:
  //   - Bắt event wheel/touch, NGĂN không cho trang cuộn (e.preventDefault())
  //   - Thay vào đó tăng/giảm boatProgress (0.0 -> 1.0)
  //   - Chỉ nhả khóa trang khi progress >= 1 (đã qua mốc 3 "Liên hiệp")
  const boatSectionRef = useRef(null);
  const [boatProgress, setBoatProgress] = useState(0); // 0.0 -> 1.0
  const boatProgressRef = useRef(0); // ref để đọc trong closure không stale
  const boatLockedRef = useRef(false); // ref để biết đang khóa hay không
  const boatReachedEndAtRef = useRef(0);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    const SCROLL_SENSITIVITY = 0.0009;
    const MAX_WHEEL_DELTA = 140;

    const isBoatSectionInViewport = () => {
      if (!boatSectionRef.current) return false;
      const rect = boatSectionRef.current.getBoundingClientRect();
      // Section nằm trong viewport: top <= 0 và bottom >= innerHeight
      return rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
    };

    const handleWheel = (e) => {
      if (!boatSectionRef.current) return;
      const rect = boatSectionRef.current.getBoundingClientRect();

      // Khi section chưa đến vị trí dính (chưa sticky hoàn toàn), cho cuộn bình thường
      if (rect.top > 10) return;
      // Chặn quán tính còn lại sau mốc cuối; cử chỉ cuộn mới sẽ đi tiếp xuống trang.
      if (boatProgressRef.current >= 1 && e.deltaY > 0) {
        if (performance.now() - boatReachedEndAtRef.current < 260) {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }
      // Khi người dùng cuộn lên trong khi progress = 0 -> mở khóa (cho cuộn lên)
      if (boatProgressRef.current <= 0 && e.deltaY < 0) return;

      // Ngăn trang cuộn
      e.preventDefault();
      e.stopPropagation();

      // Cập nhật progress
      const delta = Math.max(-MAX_WHEEL_DELTA, Math.min(MAX_WHEEL_DELTA, e.deltaY)) * SCROLL_SENSITIVITY;
      const next = Math.max(0, Math.min(1, boatProgressRef.current + delta));
      if (next === 1 && boatProgressRef.current < 1) boatReachedEndAtRef.current = performance.now();
      boatProgressRef.current = next;
      setBoatProgress(next);
    };

    // Touch support
    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!boatSectionRef.current) return;
      const rect = boatSectionRef.current.getBoundingClientRect();
      if (rect.top > 10) return;
      if (boatProgressRef.current >= 1 && e.touches[0].clientY < touchStartYRef.current) return;
      if (boatProgressRef.current <= 0 && e.touches[0].clientY > touchStartYRef.current) return;

      e.preventDefault();
      const dy = touchStartYRef.current - e.touches[0].clientY;
      touchStartYRef.current = e.touches[0].clientY;
      const next = Math.max(0, Math.min(1, boatProgressRef.current + dy * 0.003));
      boatProgressRef.current = next;
      setBoatProgress(next);
    };

    // Dùng { passive: false } để có thể gọi preventDefault()
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Khóa/mở position trang dựa trên trạng thái section thuyền
  useEffect(() => {
    if (!boatSectionRef.current) return;
    const rect = boatSectionRef.current.getBoundingClientRect();
    // Chỉ khóa nếu section đang active (sticky)
    if (rect.top <= 10 && boatProgress < 1) {
      // đảm bảo trang không bị cuộn xuống quá section này
      // Không dùng overflow hidden vì sẽ làm mất sticky, chỉ dùng wheel intercept
    }
  }, [boatProgress]);

  // Scroll page xuống đúng vị trí sticky khi cần
  useEffect(() => {
    const handleScroll = () => {
      if (!boatSectionRef.current) return;
      const rect = boatSectionRef.current.getBoundingClientRect();
      // Nếu section đang partially visible ở top, và progress chưa xong -> ngăn cuộn ra ngoài
      // (wheel handler đã lo, đây chỉ sync progress khi cuộn thường bằng scrollbar)
      if (rect.top > 10) return;
      const windowHeight = window.innerHeight;
      const totalScrollable = boatSectionRef.current.offsetHeight - windowHeight;
      if (totalScrollable <= 0) return;
      const currentScroll = -rect.top;
      // Nếu user dùng scrollbar thay vì wheel, sync progress
      if (boatProgressRef.current < 1) {
        const syncedProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
        // Chỉ sync nếu khác nhiều (wheel handler chủ động, scroll handler passive backup)
        if (Math.abs(syncedProgress - boatProgressRef.current) > 0.05) {
          boatProgressRef.current = syncedProgress;
          setBoatProgress(syncedProgress);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Xác định mốc hiện tại theo tiến trình cuộn (0 -> 1)
  let activeMilestoneIndex = 0;
  if (boatProgress >= 1) {
    activeMilestoneIndex = 2; // Liên hiệp
  } else if (boatProgress >= 0.5) {
    activeMilestoneIndex = 1; // Tự quyết
  }
  const activeData = LENIN_MILESTONES[activeMilestoneIndex];
  const boatLeft = 8 + boatProgress * 84; // 8% -> 92%

  return (
    <div className="relative min-h-screen w-full bg-[#07080A] text-[#F5EFE6] selection:bg-vn-red selection:text-vn-gold">
      <button
        type="button"
        onClick={() => setAutoScrollActive((active) => !active)}
        className={`${isEthnicDrawerOpen ? 'hidden sm:inline-flex' : 'inline-flex'} fixed right-4 top-4 z-[120] items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-xl backdrop-blur-md transition-colors ${autoScrollActive ? 'border-vn-gold bg-vn-red-deep text-white' : 'border-vn-gold/50 bg-vn-charcoal/90 text-vn-gold hover:bg-vn-red-deep'}`}
        title={autoScrollActive ? 'Dừng tự cuộn' : 'Bắt đầu tự cuộn'}
        aria-label={autoScrollActive ? 'Dừng tự cuộn' : 'Bắt đầu tự cuộn'}
      >
        {autoScrollActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        <span>{autoScrollActive ? 'Dừng cuộn' : 'Tự cuộn'}</span>
      </button>
      
      {/* SVG Defs chung */}
      <svg className="hidden">
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="50%" stopColor="#FFCD00" />
            <stop offset="100%" stopColor="#C99700" />
          </linearGradient>
        </defs>
      </svg>

      {/* LỚP NỀN ĐIỆN ẢNH BẢO TÀNG */}
      <div 
        className="media-page-stars fixed inset-0 pointer-events-none opacity-20 mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/stars.webp)' }}
      />
      <div className="media-page-ambient fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_15%,rgba(143,23,19,0.22)_0%,rgba(7,8,10,0.98)_80%)]" />
      <div className="film-grain pointer-events-none" />
      <div className="film-vignette pointer-events-none" />

      {/* NỘI DUNG CHÍNH */}
      <EthnicStorySequence autoScrollExit={mapAutoExit && autoScrollActive} />



      {/* -------------------------------------------------------------
          PHẦN CƯƠNG LĨNH DÂN TỘC CỦA V.I. LÊNIN (CHỈ DÙNG CON THUYỀN)
          - Đã bỏ 3 nguyên tắc ban đầu.
          - Mặc định nguyên tắc đầu tiên xuất hiện là "BÌNH ĐẲNG".
          - Khóa cuộn trang khi tàu chưa chạy hết 3 mốc (chỉ mở khi xong mốc 3).
          - 3 Cột mốc nguyên tắc to ra, đẹp & nổi bật.
          - Con thuyền to lên rẽ sóng đi qua từng mốc.
          ------------------------------------------------------------- */}
      {/* -------------------------------------------------------------
          PHẦN CƯƠNG LĨNH DÂN TỘC CỦA V.I. LÊNIN (CHỈ DÙNG CON THUYỀN)
          - Lăn chuột xuống dưới và tạm khóa trang qua container h-screen
            đến khi nào lăn hết đến nguyên tắc 3 là "Liên hiệp" mới cuộn tiếp xuống
          - Thuyền bé lại thanh thoát
          - Các mốc trên timeline bé lại thành chấm tròn gọn gàng
          - Chữ của các mốc to lên nổi bật ("Bình đẳng", "Tự quyết", "Liên hiệp")
          - Chữ đại diện to trên màn hình viết hoa chữ đầu
          - Bỏ hết chữ thừa như "văn kiện...", "Đã hoàn thành...", "Nguyên tắc 01..."
          ------------------------------------------------------------- */}
      <section 
        ref={boatSectionRef}
        id="con-thuyen-lenin" 
        className="relative h-screen bg-gradient-to-b from-[#060709] via-[#0E131E] to-[#060709] border-t-2 border-vn-gold/40"
      >
        <div className={`sticky top-0 flex h-screen flex-col items-center justify-between overflow-hidden px-4 sm:px-8 py-10 boat-camera-stage ${boatAutoExit && autoScrollActive ? 'boat-camera-stage--exiting' : ''}`}>
          {/* Thanh progress hanh trinh */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50 pointer-events-none">
            <div className="h-full bg-gradient-to-r from-vn-gold via-vn-red to-vn-gold transition-all duration-75" style={{width: boatProgress * 100 + '%'}} />
          </div>
          
          {/* Nền sóng biển & hào quang */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(27,42,74,0.45)_0%,transparent_80%)]" />

          {/* TIÊU ĐỀ: CƯƠNG LĨNH DÂN TỘC CỦA V.I. LÊNIN */}
          <div className="relative z-20 text-center">
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-wide">
              “Cương lĩnh dân tộc của V.I. Lênin”
            </h2>
            <p className="text-xs text-vn-ivory/60 mt-1 font-mono">
              [ Lăn chuột xuống dưới để con thuyền tiếp tục hành trình qua 3 nguyên tắc ]
            </p>
          </div>

          {/* NỘI DUNG NGUYÊN TẮC Ở CHÍNH GIỮA MÀN HÌNH (VIẾT HOA CHỮ ĐẦU, TO VÀ NỔI BẬT) */}
          <div key={activeData.title} className="relative z-30 flex w-full max-w-4xl flex-1 items-center justify-center px-4 text-center animate-fadeIn">
            {/* Hộp trích dẫn nội dung nguyên tắc nổi bật */}
            <div className="w-full rounded-3xl border-2 border-vn-gold bg-vn-black/90 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-300 sm:p-10">
              <blockquote className="font-heading italic text-lg sm:text-2xl md:text-3xl text-vn-ivory font-light leading-relaxed drop-shadow-md">
                “{activeData.quote}”
              </blockquote>
            </div>

          </div>

          {/* DÒNG HẢI TRÌNH: CON THUYỀN BÉ GỌN + CÁC MỐC BÉ LẠI + CHỮ CÁC MỐC TO NỔI BẬT */}
          <div className="relative z-20 w-full max-w-4xl pb-6">
            
            {/* Đường timeline ngang */}
            <div className="relative h-2 w-full bg-white/20 rounded-full">
              
              {/* Vạch tiến trình đã đi qua */}
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-vn-gold-antique via-vn-gold to-vn-red rounded-full"
                style={{ width: `${boatLeft}%` }}
              />

              {/* 3 CỘT MỐC: CHẤM TRÒN BÉ GỌN (CHO BÉ CÁC MỐC LẠI) */}
              {LENIN_MILESTONES.map((m) => {
                const isActive = activeMilestoneIndex === m.index;
                const isPassed = activeMilestoneIndex >= m.index;
                return (
                  <div
                    key={m.index}
                    style={{ left: m.timelinePos }}
                    className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-display font-bold text-[10px] transition-all duration-300 ${
                      isActive 
                        ? 'bg-vn-red text-vn-gold border-2 border-vn-gold scale-125 shadow-[0_0_15px_rgba(255,205,0,0.9)]'
                        : isPassed
                        ? 'bg-vn-gold text-vn-black border border-white'
                        : 'bg-[#151922] text-vn-ivory/40 border border-vn-gold/30'
                    }`}
                  >
                    <span>{m.index + 1}</span>
                  </div>
                );
              })}

              {/* CON THUYỀN BÉ LẠI (CHO BÉ THUYỀN LẠI) */}
              <div 
                className="absolute bottom-4 sm:bottom-5 z-30 -translate-x-1/2 pointer-events-none"
                style={{ 
                  left: `${boatLeft}%`,
                  filter: 'drop-shadow(0 0 15px rgba(255,205,0,0.6))'
                }}
              >
                <svg viewBox="0 0 160 85" className="w-24 sm:w-32 md:w-36 h-auto">
                  <defs>
                    <linearGradient id="boatHullSleek" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5D3A1A" />
                      <stop offset="100%" stopColor="#1B1209" />
                    </linearGradient>
                    <linearGradient id="boatSmokeSleek" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#D4A72C" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFCD00" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Làn khói */}
                  <path d="M72 24 C 66 10, 78 6, 72 0 C 86 4, 82 16, 90 22 Z" fill="url(#boatSmokeSleek)" />
                  <path d="M88 24 C 84 12, 95 8, 91 1 C 103 6, 98 16, 105 23 Z" fill="url(#boatSmokeSleek)" opacity="0.6" />

                  {/* Cột buồm và cánh buồm đỏ */}
                  <polygon points="46,12 72,22 46,32" fill="#DA251D" stroke="#FFCD00" strokeWidth="0.8" />
                  <line x1="46" y1="8" x2="46" y2="52" stroke="#FFCD00" strokeWidth="1.5" />

                  {/* Ống khói */}
                  <rect x="72" y="24" width="10" height="18" fill="#8F1713" stroke="#FFCD00" strokeWidth="0.8" />
                  <rect x="88" y="24" width="10" height="18" fill="#8F1713" stroke="#FFCD00" strokeWidth="0.8" />

                  {/* Thân ca bin tàu */}
                  <rect x="56" y="42" width="66" height="15" fill="#3B2616" stroke="#FFCD00" strokeWidth="1" rx="2" />
                  <rect x="64" y="35" width="50" height="11" fill="#20150C" stroke="#D4A72C" strokeWidth="0.8" rx="1" />

                  {/* Thân tàu chính */}
                  <path d="M12 55 L 148 55 L 132 78 L 32 78 Z" fill="url(#boatHullSleek)" stroke="#FFCD00" strokeWidth="1.2" />

                  {/* Cửa sổ mạn tàu sáng vàng */}
                  <circle cx="48" cy="66" r="2.5" fill="#FFCD00" />
                  <circle cx="68" cy="66" r="2.5" fill="#FFCD00" />
                  <circle cx="88" cy="66" r="2.5" fill="#FFCD00" />
                  <circle cx="108" cy="66" r="2.5" fill="#FFCD00" />
                  <circle cx="126" cy="66" r="2.5" fill="#FFCD00" />

                  {/* Vệt sóng nước chân tàu */}
                  <path d="M6 80 Q 30 76 60 80 T 120 80 T 154 80" stroke="#FFCD00" strokeWidth="1.2" fill="none" opacity="0.75" />
                </svg>
              </div>

            </div>

            {/* CHỮ TÊN CÁC MỐC ĐƯỢC TĂNG CỠ CHỮ TO LÊN VÀ VIẾT HOA CHỮ ĐẦU */}
            <div className="mt-8 flex w-full items-center justify-between">
              {LENIN_MILESTONES.map((m) => (
                <div
                  key={m.index}
                  className={`font-display font-bold text-xl sm:text-3xl md:text-4xl transition-all duration-300 ${
                    activeMilestoneIndex === m.index 
                      ? 'text-vn-gold scale-105 drop-shadow-[0_0_15px_rgba(255,205,0,0.85)]' 
                      : 'text-vn-ivory/50'
                  }`}
                >
                  {m.index + 1}. {m.title}
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          CHUYỂN ĐỘNG ĐẾN: ‘’BẢN SẮC DÂN TỘC’’
          Lấy lại phần 54 Dân tộc bản đồ (bấm vào vùng để xem, các dân tộc)
          ------------------------------------------------------------- */}
      <section id="ban-sac-dan-toc" className="relative z-10 px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl rounded-3xl border border-vn-gold/30 bg-[#0b0d11]/90 px-6 py-12 shadow-[0_20px_70px_rgba(0,0,0,0.8)] sm:px-12">
          <p className="eyebrow text-vn-gold">Không gian tương tác trực quan</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-6xl">54 dân tộc — một cộng đồng</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-vn-ivory/70 sm:text-base">
            Khám phá các cộng đồng dân tộc trên bản đồ Việt Nam và mở hồ sơ văn hóa của từng dân tộc.
          </p>
          {!isFlagZoomOpen && !isEthnicMapOpen && (
            <button
              type="button"
              onClick={() => setIsFlagZoomOpen(true)}
              className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-vn-gold bg-gradient-to-r from-vn-red-deep via-vn-red to-vn-red-deep px-7 py-4 font-display text-base font-black text-vn-gold shadow-[0_0_40px_rgba(218,37,29,0.5)] transition hover:scale-105 sm:text-xl"
            >
              <span>Xem bản đồ 54 dân tộc tại đây</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </section>

      {isFlagZoomOpen && (
        <FlagZoomTransition
          onComplete={() => {
            setAutoScrollActive(false);
            setIsEthnicMapOpen(true);
          }}
        />
      )}
      {isEthnicMapOpen && <InteractiveVietnamMap onDrawerOpenChange={setIsEthnicDrawerOpen} />}

      {isEthnicMapOpen && (
        <div className="flex justify-center px-4 py-10">
          <button
            type="button"
            onClick={() => document.getElementById('dan-toc-kham-pha')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="rounded-full border border-vn-gold/50 bg-vn-charcoal/90 px-6 py-3 text-sm font-semibold text-vn-gold shadow-lg transition hover:scale-105 hover:bg-vn-red-deep"
          >
            Trở về phần khám phá
          </button>
        </div>
      )}

      {isEthnicMapOpen && <EthnicPhotoArchive />}

      {isEthnicMapOpen && <MediaShowcase />}

      <div className="flex justify-center px-4 py-12">
        <button
          type="button"
          onClick={returnToStart}
          className="rounded-full border-2 border-vn-gold bg-gradient-to-r from-vn-red-deep via-vn-red to-vn-red-deep px-7 py-4 font-display text-lg font-bold text-vn-gold shadow-[0_0_32px_rgba(218,37,29,0.42)] transition hover:scale-105"
        >
          Trở về ban đầu
        </button>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-vn-gold/15 py-8 text-center text-xs text-vn-ivory/50">
        Triển Lãm Tương Tác Số 2D · Học phần Chủ nghĩa Xã hội Khoa học (MLN131) · ĐH FPT
      </footer>

    </div>
  );
}
