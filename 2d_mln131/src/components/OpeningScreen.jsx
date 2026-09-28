import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RotateCcw, Compass, MapPin, FastForward, Sparkles } from 'lucide-react';
import vietnamPaths from '../data/vietnamPaths.json';

// Danh sách 14 điểm chuẩn xác, bố trí vị trí nhãn (labelPos) so le thông minh để 100% KHÔNG CHỒNG LÊN NHAU
const BEACON_POINTS = [
  { 
    id: 'lung-cu', 
    name: 'Lũng Cú (Hà Giang)', 
    region: 'Bắc Bộ', 
    x: 155, 
    y: 25, 
    desc: 'Cột cờ Lũng Cú — Điểm cực Bắc thiêng liêng của Tổ quốc',
    labelX: 175, 
    labelY: 15,
    w: 165
  },
  { 
    id: 'ha-noi', 
    name: 'Thủ đô Hà Nội', 
    region: 'Bắc Bộ', 
    x: 182, 
    y: 135, 
    desc: 'Trái tim ngàn năm văn hiến của non sông gấm vóc',
    labelX: 40, 
    labelY: 125,
    w: 130
  },
  { 
    id: 'ha-long', 
    name: 'Hải Phòng & Quảng Ninh', 
    region: 'Bắc Bộ', 
    x: 266, 
    y: 122, 
    desc: 'Vịnh Hạ Long & Cửa ngõ biển Đông Bắc hào hùng',
    labelX: 286, 
    labelY: 112,
    w: 195
  },
  { 
    id: 'nghe-an', 
    name: 'Nghệ An — Quê Bác', 
    region: 'Bắc Trung Bộ', 
    x: 140, 
    y: 229, 
    desc: 'Dải đất Lam Hồng địa linh nhân kiệt',
    labelX: 15, 
    labelY: 219,
    w: 165
  },
  { 
    id: 'hue', 
    name: 'Cố đô Huế', 
    region: 'Trung Bộ', 
    x: 275, 
    y: 375, 
    desc: 'Di sản Cố đô — Khúc ruột miền Trung gắn kết',
    labelX: 160, 
    labelY: 365,
    w: 105
  },
  { 
    id: 'da-nang', 
    name: 'Đà Nẵng & Quảng Nam', 
    region: 'Trung Bộ', 
    x: 309, 
    y: 403, 
    desc: 'Đầu sóng ngọn gió duyên hải miền Trung',
    labelX: 329, 
    labelY: 393,
    w: 185
  },
  { 
    id: 'hoang-sa', 
    name: 'Quần đảo Hoàng Sa', 
    region: 'Biển Đảo', 
    x: 520, 
    y: 415, 
    desc: 'Chủ quyền biển đảo thiêng liêng đời đời bất khả xâm phạm',
    labelX: 460, 
    labelY: 435,
    w: 168
  },
  { 
    id: 'daklak', 
    name: 'Tây Nguyên (Đắk Lắk)', 
    region: 'Tây Nguyên', 
    x: 317, 
    y: 578, 
    desc: 'Đại ngàn rừng thiêng — Không gian văn hóa cồng chiêng',
    labelX: 140, 
    labelY: 568,
    w: 168
  },
  { 
    id: 'khanh-hoa', 
    name: 'Khánh Hòa & Duyên Hải', 
    region: 'Duyên Hải Nam Trung Bộ', 
    x: 360, 
    y: 602, 
    desc: 'Duyên hải Nam Trung Bộ kiên cường, giàu đẹp',
    labelX: 380, 
    labelY: 592,
    w: 195
  },
  { 
    id: 'hcm', 
    name: 'TP. Hồ Chí Minh', 
    region: 'Nam Bộ', 
    x: 236, 
    y: 684, 
    desc: 'Đô thị phương Nam rực rỡ mang tên Bác',
    labelX: 256, 
    labelY: 674,
    w: 155
  },
  { 
    id: 'can-tho', 
    name: 'Cần Thơ & ĐBSCL', 
    region: 'Tây Nam Bộ', 
    x: 176, 
    y: 718, 
    desc: 'Chín rồng sông nước phù sa trù phú, nghĩa tình',
    labelX: 25, 
    labelY: 708,
    w: 142
  },
  { 
    id: 'truong-sa', 
    name: 'Quần đảo Trường Sa', 
    region: 'Biển Đảo', 
    x: 535, 
    y: 700, 
    desc: 'Phên dậu tiền tiêu nghìn đời của Tổ quốc trên Biển Đông',
    labelX: 470, 
    labelY: 720,
    w: 168
  },
  { 
    id: 'phu-quoc', 
    name: 'Phú Quốc (Kiên Giang)', 
    region: 'Biển Đảo', 
    x: 95, 
    y: 720, 
    desc: 'Đảo ngọc phương Nam giữa vùng biển Tây Nam',
    labelX: 10, 
    labelY: 740,
    w: 175
  },
  { 
    id: 'ca-mau', 
    name: 'Đất Mũi Cà Mau', 
    region: 'Cực Nam', 
    x: 142, 
    y: 792, 
    desc: 'Điểm cực Nam non sông liền một dải hình chữ S',
    labelX: 162, 
    labelY: 782,
    w: 155
  }
];

export default function OpeningScreen() {
  // state:
  // step 0: Câu hỏi "Bạn đang đứng ở đâu?"
  // step 1: Bản đồ to xuất hiện
  // step 2: Đường nối chạy mượt mà qua các điểm
  // step 3: Sau khi kết thúc line -> Bản đồ zoom out + hiện đồng thời DÂN TỘC, banner và nút bắt đầu
  const [step, setStep] = useState(0);
  const [unlockedIndex, setUnlockedIndex] = useState(0); // Điểm đã kích hoạt
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Direct DOM Refs để đạt 60fps/120fps siêu mượt, không bị giật do re-render React
  const travelingOrbRef = useRef(null);
  const activeLineRef = useRef(null);
  const animFrameRef = useRef(null);
  const navigate = useNavigate();

  // Khởi động giai đoạn mở đầu
  useEffect(() => {
    // 2.2s hiện câu hỏi "Bạn đang đứng ở đâu?"
    const t1 = setTimeout(() => {
      setStep(1); // Hiện bản đồ to
    }, 2200);

    // 4.0s bắt đầu chạy các line
    const t2 = setTimeout(() => {
      setStep(2);
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // VÒNG LẶP DI CHUYỂN SIÊU MƯỢT (Direct DOM manipulation - Zero frame drops)
  useEffect(() => {
    if (step !== 2) return;

    let currentLeg = 0; // Chặng hiện tại từ point 0 -> 1 -> ... -> 13
    const TOTAL_LEGS = BEACON_POINTS.length - 1;
    const LEG_DURATION = 1100; // 1.1s mỗi chặng, vừa mượt vừa trang trọng
    let legStartTime = performance.now();

    const completedSegmentsCoords = [
      `${BEACON_POINTS[0].x},${BEACON_POINTS[0].y}`
    ];

    const runLoop = (now) => {
      if (currentLeg >= TOTAL_LEGS) {
        // ĐÃ HOÀN THÀNH TẤT CẢ CÁC ĐIỂM!
        setUnlockedIndex(BEACON_POINTS.length - 1);
        
        // Ẩn quả cầu chạy
        if (travelingOrbRef.current) {
          travelingOrbRef.current.style.opacity = '0';
        }

        // CẬP NHẬT NGAY LẬP TỨC: Bản đồ zoom out và hiện đồng thời chữ Dân tộc, text dẫn dắt, banner, button!
        setStep(3);
        return;
      }

      const pFrom = BEACON_POINTS[currentLeg];
      const pTo = BEACON_POINTS[currentLeg + 1];
      const elapsed = now - legStartTime;
      const progress = Math.min(1, elapsed / LEG_DURATION);

      // Easing mượt mà (smooth cubic)
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // Tọa độ quả cầu sáng chuẩn xác tuyệt đối trên đường nối (100% không lệch)
      const curX = pFrom.x + (pTo.x - pFrom.x) * ease;
      const curY = pFrom.y + (pTo.y - pFrom.y) * ease;

      // Cập nhật vị trí quả cầu sáng trực tiếp vào DOM (siêu mượt 60fps)
      if (travelingOrbRef.current) {
        travelingOrbRef.current.setAttribute('cx', curX);
        travelingOrbRef.current.setAttribute('cy', curY);
        travelingOrbRef.current.style.opacity = '1';
      }

      // Cập nhật đường vẽ polyline đang chạy
      if (activeLineRef.current) {
        const allPts = [...completedSegmentsCoords, `${curX},${curY}`].join(' ');
        activeLineRef.current.setAttribute('points', allPts);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(runLoop);
      } else {
        // Hoàn tất 1 chặng, điểm đến bừng sáng!
        currentLeg++;
        completedSegmentsCoords.push(`${pTo.x},${pTo.y}`);
        setUnlockedIndex(currentLeg);
        legStartTime = performance.now();
        animFrameRef.current = requestAnimationFrame(runLoop);
      }
    };

    animFrameRef.current = requestAnimationFrame(runLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [step]);

  // Nút bỏ qua / xem nhanh
  const handleSkip = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setUnlockedIndex(BEACON_POINTS.length - 1);
    if (activeLineRef.current) {
      activeLineRef.current.setAttribute(
        'points', 
        BEACON_POINTS.map(p => `${p.x},${p.y}`).join(' ')
      );
    }
    if (travelingOrbRef.current) {
      travelingOrbRef.current.style.opacity = '0';
    }
    setStep(3);
  };

  // Nút phát lại
  const handleReplay = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setStep(0);
    setUnlockedIndex(0);
    if (activeLineRef.current) {
      activeLineRef.current.setAttribute('points', `${BEACON_POINTS[0].x},${BEACON_POINTS[0].y}`);
    }
    setTimeout(() => setStep(1), 1800);
    setTimeout(() => setStep(2), 3400);
  };

  // Chuyển cảnh vào chuyên đề Dân tộc là gì
  const handleStartJourney = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/dan-toc');
    }, 600);
  };

  const activeBeacon = BEACON_POINTS[unlockedIndex];

  return (
    <div className={`relative min-h-screen w-full bg-[#07080A] text-[#F5EFE6] overflow-hidden select-none transition-all duration-700 ${
      isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      
      {/* 1. NỀN BẦU TRỜI SAO & HẠT BẢO TÀNG */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/stars.webp)' }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_35%,rgba(143,23,19,0.18)_0%,rgba(7,8,10,0.98)_85%)]" />
      <div className="film-grain pointer-events-none" />
      <div className="film-vignette pointer-events-none" />

      {/* 2. THANH CÔNG CỤ ĐIỀU KHIỂN GÓC TRÊN */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-vn-black/60 border-b border-vn-gold/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-vn-red-deep border border-vn-gold flex items-center justify-center shadow-lg">
            <Compass className="w-4 h-4 text-vn-gold animate-spin-slow" />
          </div>
          <div>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-vn-gold block">
              Triển Lãm Số 2D · Khởi Đầu Không Gian
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {step === 2 && (
            <button
              onClick={handleSkip}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-vn-gold/30 bg-vn-charcoal/80 text-xs uppercase tracking-widest text-vn-ivory/80 hover:text-vn-gold hover:border-vn-gold transition cursor-pointer"
            >
              <FastForward className="w-3.5 h-3.5 text-vn-gold" />
              <span>Xem nhanh</span>
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleReplay}
              title="Phát lại hoạt cảnh"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-vn-gold/30 bg-vn-black/80 text-vn-gold text-xs hover:bg-vn-red-deep/40 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xem lại</span>
            </button>
          )}
        </div>
      </header>

      {/* 3. GIAI ĐOẠN 0: CÂU HỎI MỞ ĐẦU "Bạn đang đứng ở đâu?" */}
      <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center px-6 transition-all duration-1000 ${
        step === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
      }`}>
        <p className="text-xs uppercase tracking-[0.45em] text-vn-gold/80 mb-4 font-sans animate-pulse">
          Chiêm nghiệm không gian & lịch sử
        </p>
        <h1 className="font-display font-light italic text-4xl sm:text-6xl md:text-8xl text-white text-center leading-tight tracking-wide drop-shadow-[0_0_45px_rgba(255,205,0,0.5)]">
          “Bạn đang đứng ở đâu?”
        </h1>
        <div className="w-28 h-0.5 mt-8 bg-gradient-to-r from-transparent via-vn-gold to-transparent opacity-70" />
      </div>

      {/* 4. KHUNG BẢN ĐỒ VIỆT NAM (BAN ĐẦU TO, SAU KHI CHẠY XONG TỰ ĐỘNG THU NHỎ MƯỢT MÀ) */}
      <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-2 sm:px-6">
        
        {/* Container bản đồ:
            - Khi step 1 & 2: Bản đồ TO (scale 1.05 - 1.15) chiếm trọn màn hình
            - Khi step 3: MẶC ĐỊNH THU NHỎ MƯỢT MÀ (Smooth Animation Zoom Out) lùi về phía trên để nhường chỗ cho khối thông tin */}
        <div className={`relative flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          step >= 1 ? 'opacity-100' : 'opacity-0'
        } ${
          step === 3 
            ? 'scale-[0.68] sm:scale-[0.72] md:scale-[0.76] -translate-y-16 sm:-translate-y-20' 
            : 'scale-[0.98] sm:scale-[1.05] md:scale-[1.12] translate-y-2'
        }`}>
          
          {/* Hào quang nền quanh bản đồ */}
          <div className="absolute inset-0 -m-16 rounded-full bg-radial from-vn-gold/15 via-vn-red-deep/10 to-transparent blur-3xl pointer-events-none" />

          {/* SVG Map Container (Khổ lớn, sắc nét) */}
          <div className="relative w-[360px] sm:w-[500px] md:w-[620px] lg:w-[680px] aspect-[703/900] filter drop-shadow-[0_0_45px_rgba(218,37,29,0.35)]">
            <svg
              viewBox="0 0 703 900"
              className="w-full h-full select-none"
            >
              {/* Định nghĩa hiệu ứng phát sáng */}
              <defs>
                <filter id="gold-line-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Lớp lãnh thổ 63 tỉnh thành & hải đảo Việt Nam */}
              <g id="vietnam-provinces">
                {vietnamPaths.map((prov) => (
                  <path
                    key={prov.id}
                    d={prov.d}
                    fill="#12161F"
                    fillOpacity="0.94"
                    stroke="#FFCD00"
                    strokeWidth="1.1"
                    strokeOpacity="0.55"
                    className="transition-colors duration-300 hover:fill-[#251d18]"
                  />
                ))}
              </g>


              {/* ĐƯỜNG DẪN NỐI (Được cập nhật trực tiếp tại 60fps qua Ref, siêu mượt) */}
              <polyline
                ref={activeLineRef}
                points={`${BEACON_POINTS[0].x},${BEACON_POINTS[0].y}`}
                fill="none"
                stroke="#FFCD00"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 4"
                filter="url(#gold-line-glow)"
                className="opacity-95"
              />

              {/* TẤT CẢ 14 CHẤM SÁNG VÀ TITLE ĐƯỢC TÁCH BIỆT RÕ RÀNG (KHÔNG CHỒNG LÊN NHAU) */}
              {BEACON_POINTS.map((beacon, idx) => {
                const isActivated = idx <= unlockedIndex;
                const isCurrent = idx === unlockedIndex;
                if (!isActivated) return null;

                return (
                  <g key={beacon.id} id={`beacon-${beacon.id}`}>
                    {/* Vòng hào quang lan tỏa chuẩn tâm tuyệt đối bằng native SVG <animate> */}
                    <circle cx={beacon.x} cy={beacon.y} r="6" fill="none" stroke="#FFCD00" strokeWidth="2">
                      <animate attributeName="r" values="6;24;6" dur="2.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.9;0.1;0.9" dur="2.2s" repeatCount="indefinite" />
                    </circle>

                    {isCurrent && (
                      <circle cx={beacon.x} cy={beacon.y} r="10" fill="none" stroke="#DA251D" strokeWidth="2">
                        <animate attributeName="r" values="10;32" dur="1.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.85;0" dur="1.6s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Vầng sáng nền */}
                    <circle cx={beacon.x} cy={beacon.y} r="9" fill="#FFCD00" fillOpacity="0.4" />

                    {/* Chấm sáng tâm */}
                    <circle
                      cx={beacon.x}
                      cy={beacon.y}
                      r={isCurrent ? "6" : "5"}
                      fill="#FFFFFF"
                      stroke="#DA251D"
                      strokeWidth="2"
                    />

                    {/* TITLE ĐỊA DANH: ĐÃ ĐƯỢC PHÂN TÁCH VỊ TRÍ SO LE, FONT 15PX, ĐẬM VÀ RÕ RÀNG */}
                    <g className="pointer-events-none select-none">
                      {/* Khung nhãn */}
                      <rect
                        x={beacon.labelX}
                        y={beacon.labelY}
                        width={beacon.w}
                        height="28"
                        rx="6"
                        fill="#08090C"
                        fillOpacity="0.94"
                        stroke={isCurrent ? '#FFCD00' : 'rgba(255,205,0,0.6)'}
                        strokeWidth={isCurrent ? "1.8" : "1"}
                        filter="drop-shadow(0 2px 8px rgba(0,0,0,0.85))"
                      />

                      {/* Chấm chỉ điểm */}
                      <circle
                        cx={beacon.labelX + 10}
                        cy={beacon.labelY + 14}
                        r="3.5"
                        fill="#DA251D"
                      />

                      {/* Tên địa danh to rõ, không chạm nhau */}
                      <text
                        x={beacon.labelX + 18}
                        y={beacon.labelY + 19}
                        fill="#FFCD00"
                        fontSize="14.5"
                        fontWeight="700"
                        letterSpacing="0.3"
                      >
                        {beacon.name}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* QUẢ CẦU SÁNG DI CHUYỂN SIÊU MƯỢT (Di chuyển chính xác trên line, ẩn khi xong) */}
              <circle
                ref={travelingOrbRef}
                cx={BEACON_POINTS[0].x}
                cy={BEACON_POINTS[0].y}
                r="7"
                fill="#FFFFFF"
                stroke="#DA251D"
                strokeWidth="2.5"
                filter="url(#gold-line-glow)"
                style={{ opacity: 0, transition: 'opacity 0.2s' }}
              />
            </svg>
          </div>
        </div>

        {/* 5. THẺ HUD THÔNG TIN GÓC DƯỚI TRONG LÚC ĐANG CHẠY (Step 2) */}
        {step === 2 && activeBeacon && (
          <div className="fixed bottom-6 left-4 sm:left-8 z-30 max-w-sm sm:max-w-md p-4 rounded-2xl bg-vn-black/90 border-2 border-vn-gold/60 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.9)] animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-vn-gold uppercase tracking-widest mb-1.5 font-bold">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-vn-red" />
                Vùng đất: {activeBeacon.region}
              </span>
              <span className="font-mono text-vn-ivory/70">
                {unlockedIndex + 1}/{BEACON_POINTS.length}
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-display font-bold text-white tracking-wide">
              {activeBeacon.name}
            </h3>
            <p className="text-xs sm:text-sm text-vn-ivory/80 font-light mt-1">
              {activeBeacon.desc}
            </p>
          </div>
        )}

        {/* 6. TOÀN BỘ PHẦN KẾT TINH + DÂN TỘC + BANNER NỀN ĐỎ CHỮ VÀNG + NÚT BẮT ĐẦU
               HIỆN LÊN ĐỒNG THỜI NGAY SAU KHI CHẠY XONG LINE (Step 3)! */}
        <div className={`fixed bottom-3 sm:bottom-6 left-0 right-0 z-40 flex flex-col items-center text-center px-4 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          step === 3 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-16 pointer-events-none'
        }`}>
          
          <div className="max-w-3xl w-full p-6 sm:p-8 rounded-3xl bg-vn-black/95 border-2 border-vn-gold/70 shadow-[0_20px_70px_rgba(0,0,0,0.98)] backdrop-blur-xl flex flex-col items-center">
            
            {/* DÒNG DẪN DẮT: Hiện lên cùng phần bắt đầu hành trình theo đúng yêu cầu */}
            <div className="mb-4 max-w-xl">
              <p className="font-heading italic text-base sm:text-xl md:text-2xl text-vn-ivory font-light leading-relaxed drop-shadow-md">
                “Để kết tinh thành 1 mảnh đất hình chữ S đó, điều quan trọng nhất phải có:”
              </p>
            </div>

            {/* CHỮ DÂN TỘC KHỔNG LỒ HÀO HÙNG */}
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,205,0,0.7)] leading-none mb-3">
              DÂN TỘC
            </h2>

            {/* BANNER NỀN ĐỎ CHỮ VÀNG */}
            <div className="relative group w-full max-w-lg px-6 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-[#8F1713] via-[#DA251D] to-[#8F1713] border-2 border-vn-gold shadow-[0_0_35px_rgba(218,37,29,0.75)] transform transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,205,0,0.3)_0%,transparent_70%)] pointer-events-none" />
              <p className="relative font-heading font-bold text-base sm:text-xl md:text-2xl text-vn-gold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                Một đất nước – 54 sắc màu – một cộng đồng.
              </p>
            </div>

            {/* NÚT BẮT ĐẦU HÀNH TRÌNH → */}
            <div className="mt-6">
              <button
                onClick={handleStartJourney}
                className="relative inline-flex items-center gap-3 px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-vn-gold-antique via-vn-gold to-vn-gold-antique text-vn-black font-display font-black text-base sm:text-xl uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(255,205,0,0.6)] hover:shadow-[0_0_70px_rgba(255,205,0,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>BẮT ĐẦU HÀNH TRÌNH</span>
                <ArrowRight className="w-5 h-5 text-vn-black animate-pulse" />
                <div className="absolute -inset-1 rounded-full border border-vn-gold/60 animate-ping opacity-30 pointer-events-none" />
              </button>
              <p className="text-[11px] sm:text-xs text-vn-gold/80 mt-2 font-mono tracking-wider">
                Chuyển động đến chuyên đề: Dân tộc là gì?
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
