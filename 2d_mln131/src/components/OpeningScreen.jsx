import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RotateCcw, Sparkles, Compass, MapPin, Play, Pause, FastForward } from 'lucide-react';
import vietnamPaths from '../data/vietnamPaths.json';

// Tọa độ chuẩn xác 100% theo hệ tọa độ SVG 703x900
const BEACON_POINTS = [
  { id: 'lung-cu', name: 'Lũng Cú (Hà Giang)', region: 'Bắc Bộ', x: 155, y: 25, desc: 'Cột cờ Lũng Cú — Điểm cực Bắc thiêng liêng của Tổ quốc', labelAlign: 'right' },
  { id: 'ha-noi', name: 'Thủ đô Hà Nội', region: 'Bắc Bộ', x: 182, y: 135, desc: 'Trái tim ngàn năm văn hiến của non sông gấm vóc', labelAlign: 'right' },
  { id: 'ha-long', name: 'Hải Phòng & Quảng Ninh', region: 'Bắc Bộ', x: 266, y: 122, desc: 'Vịnh Hạ Long & Cửa ngõ biển Đông Bắc hào hùng', labelAlign: 'right' },
  { id: 'nghe-an', name: 'Nghệ An — Quê Bác', region: 'Bắc Trung Bộ', x: 140, y: 229, desc: 'Dải đất Lam Hồng địa linh nhân kiệt', labelAlign: 'left' },
  { id: 'hue', name: 'Cố đô Huế', region: 'Trung Bộ', x: 275, y: 375, desc: 'Di sản Cố đô — Khúc ruột miền Trung gắn kết', labelAlign: 'right' },
  { id: 'da-nang', name: 'Đà Nẵng & Quảng Nam', region: 'Trung Bộ', x: 309, y: 403, desc: 'Đầu sóng ngọn gió duyên hải miền Trung', labelAlign: 'right' },
  { id: 'hoang-sa', name: 'Quần đảo Hoàng Sa', region: 'Biển Đảo', x: 520, y: 415, desc: 'Chủ quyền biển đảo thiêng liêng đời đời bất khả xâm phạm', labelAlign: 'left' },
  { id: 'daklak', name: 'Tây Nguyên (Đắk Lắk)', region: 'Tây Nguyên', x: 317, y: 578, desc: 'Đại ngàn rừng thiêng — Không gian văn hóa cồng chiêng', labelAlign: 'left' },
  { id: 'khanh-hoa', name: 'Khánh Hòa & Duyên Hải', region: 'Duyên Hải Nam Trung Bộ', x: 360, y: 602, desc: 'Duyên hải Nam Trung Bộ kiên cường, giàu đẹp', labelAlign: 'right' },
  { id: 'hcm', name: 'TP. Hồ Chí Minh', region: 'Nam Bộ', x: 236, y: 684, desc: 'Đô thị phương Nam rực rỡ mang tên Bác', labelAlign: 'right' },
  { id: 'can-tho', name: 'Cần Thơ & ĐBSCL', region: 'Tây Nam Bộ', x: 176, y: 718, desc: 'Chín rồng sông nước phù sa trù phú, nghĩa tình', labelAlign: 'left' },
  { id: 'truong-sa', name: 'Quần đảo Trường Sa', region: 'Biển Đảo', x: 535, y: 700, desc: 'Phên dậu tiền tiêu nghìn đời của Tổ quốc trên Biển Đông', labelAlign: 'left' },
  { id: 'phu-quoc', name: 'Phú Quốc (Kiên Giang)', region: 'Biển Đảo', x: 95, y: 720, desc: 'Đảo ngọc phương Nam giữa vùng biển Tây Nam', labelAlign: 'left' },
  { id: 'ca-mau', name: 'Đất Mũi Cà Mau', region: 'Cực Nam', x: 142, y: 792, desc: 'Điểm cực Nam non sông liền một dải hình chữ S', labelAlign: 'right' }
];

export default function OpeningScreen() {
  // Step 0: "Bạn đang đứng ở đâu?"
  // Step 1: Bản đồ Việt Nam xuất hiện huyền ảo
  // Step 2: Các chấm sáng lần lượt nối nhau chạy từ Bắc -> Trung -> Nam (chậm rãi, mượt mà)
  // Step 3: Dòng dẫn dắt: "Để kết tinh thành 1 mảnh đất hình chữ S đó..."
  // Step 4: Chuyển động thu ra (Zoom-out): "DÂN TỘC" + Banner đỏ chữ vàng
  // Step 5: Nút "BẮT ĐẦU HÀNH TRÌNH →"
  const [step, setStep] = useState(0);
  
  // Quản lý hành trình di chuyển giữa các điểm
  const [completedPointsCount, setCompletedPointsCount] = useState(1); // Bắt đầu ở điểm 0 (Lũng Cú)
  const [travelingCoord, setTravelingCoord] = useState({ x: BEACON_POINTS[0].x, y: BEACON_POINTS[0].y });
  const [isTraveling, setIsTraveling] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const animFrameRef = useRef(null);
  const navigate = useNavigate();

  // 1. Giai đoạn mở đầu (Step 0 -> 1 -> 2)
  useEffect(() => {
    // Hiện câu hỏi mở đầu trong 3.2s
    const timer1 = setTimeout(() => {
      setStep(1);
    }, 3200);

    // Mở bản đồ hoàn chỉnh trong 2.5s rồi bắt đầu hành trình
    const timer2 = setTimeout(() => {
      setStep(2);
    }, 5700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // 2. Chuyển động nối từ điểm này sang điểm khác (Chạy chậm rãi, mượt mà, KHÔNG BỊ LỆCH)
  useEffect(() => {
    if (step !== 2 || isPaused) return;

    if (completedPointsCount >= BEACON_POINTS.length) {
      // Đã đi qua hết 14 điểm từ Bắc tới Nam
      const timerAfterFinish = setTimeout(() => {
        setStep(3); // Hiện text dẫn dắt
      }, 1200);

      const timerZoomOut = setTimeout(() => {
        setStep(4); // Chuyển động thu ra (Zoom-out) DÂN TỘC + Banner
      }, 3500);

      const timerButton = setTimeout(() => {
        setStep(5); // Hiện nút Bắt đầu
      }, 5000);

      return () => {
        clearTimeout(timerAfterFinish);
        clearTimeout(timerZoomOut);
        clearTimeout(timerButton);
      };
    }

    // Đang nối từ điểm (completedPointsCount - 1) sang điểm (completedPointsCount)
    const fromPt = BEACON_POINTS[completedPointsCount - 1];
    const toPt = BEACON_POINTS[completedPointsCount];

    // Tốc độ: Mỗi đoạn đường chạy chậm rãi trong ~1400ms (1.4 giây)
    const DURATION = 1400;
    const startTime = performance.now();
    setIsTraveling(true);

    const animateTravel = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / DURATION);
      
      // Easing mượt mà (ease-in-out)
      const easeProgress = rawProgress < 0.5 
        ? 2 * rawProgress * rawProgress 
        : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      // Tính toán tọa độ chính xác tuyệt đối trên đường nối, không lệch 1 pixel
      const curX = fromPt.x + (toPt.x - fromPt.x) * easeProgress;
      const curY = fromPt.y + (toPt.y - fromPt.y) * easeProgress;

      setTravelingCoord({ x: curX, y: curY });

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(animateTravel);
      } else {
        // Đã đến điểm tiếp theo!
        setTravelingCoord({ x: toPt.x, y: toPt.y });
        setIsTraveling(false);
        // Dừng nghỉ một chút (~350ms) để người xem cảm nhận điểm đến, rồi mới sang điểm kế
        setTimeout(() => {
          setCompletedPointsCount((prev) => prev + 1);
        }, 350);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateTravel);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [step, completedPointsCount, isPaused]);

  // Danh sách các điểm đã hoàn thành để vẽ đường polyline
  const completedPoints = BEACON_POINTS.slice(0, completedPointsCount);
  const activeBeacon = BEACON_POINTS[Math.min(completedPointsCount - 1, BEACON_POINTS.length - 1)];

  // Xử lý các nút điều khiển
  const handleStartJourney = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/dan-toc');
    }, 700);
  };

  const handleSkipToEnd = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setCompletedPointsCount(BEACON_POINTS.length);
    setTravelingCoord({ x: BEACON_POINTS[BEACON_POINTS.length - 1].x, y: BEACON_POINTS[BEACON_POINTS.length - 1].y });
    setIsTraveling(false);
    setStep(5);
  };

  const handleReplay = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setStep(0);
    setCompletedPointsCount(1);
    setTravelingCoord({ x: BEACON_POINTS[0].x, y: BEACON_POINTS[0].y });
    setIsTraveling(false);
    setTimeout(() => setStep(1), 2500);
    setTimeout(() => setStep(2), 4800);
  };

  return (
    <div className={`relative min-h-screen w-full bg-[#08090C] text-[#F5EFE6] overflow-x-hidden select-none transition-all duration-700 ${
      isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      
      {/* 1. NỀN BẦU TRỜI ĐÊM ĐIỆN ẢNH VÀ HẠT GRAIN */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/stars.webp)' }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_35%,rgba(143,23,19,0.18)_0%,rgba(8,9,12,0.98)_80%)]" />
      <div className="film-grain pointer-events-none" />
      <div className="film-vignette pointer-events-none" />

      {/* 2. THANH TIÊU ĐỀ & ĐIỀU KHIỂN GÓC TRÊN CÙNG */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-vn-black/70 border-b border-vn-gold/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-vn-red-deep border border-vn-gold flex items-center justify-center shadow-lg">
            <Compass className="w-4 h-4 text-vn-gold animate-spin-slow" />
          </div>
          <div>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-vn-gold block">
              Triển Lãm Số 2D · Khởi Đầu Không Gian
            </span>
            <span className="text-[10px] text-vn-ivory/60 font-light block">
              Chương 6 MLN131 · Dân Tộc & Lãnh Thổ Việt Nam
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {step === 2 && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-vn-gold/30 bg-vn-black/70 text-vn-gold text-xs hover:bg-vn-charcoal transition"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPaused ? 'Tiếp tục' : 'Tạm dừng'}</span>
            </button>
          )}

          {step < 5 && (
            <button
              onClick={handleSkipToEnd}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-vn-gold/30 bg-vn-charcoal/80 text-xs uppercase tracking-widest text-vn-ivory/80 hover:text-vn-gold hover:border-vn-gold transition"
            >
              <FastForward className="w-3.5 h-3.5 text-vn-gold" />
              <span>Xem nhanh</span>
            </button>
          )}

          {step >= 4 && (
            <button
              onClick={handleReplay}
              title="Xem lại toàn bộ hoạt cảnh"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-vn-gold/40 bg-vn-black/80 text-vn-gold text-xs hover:bg-vn-red-deep/40 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phát lại</span>
            </button>
          )}
        </div>
      </header>

      {/* 3. GIAI ĐOẠN 0: CÂU HỎI TRIẾT HỌC "Bạn đang đứng ở đâu?" */}
      <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center px-6 transition-all duration-1000 ${
        step === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
      }`}>
        <p className="text-xs uppercase tracking-[0.45em] text-vn-gold/80 mb-5 font-sans animate-pulse">
          Cội nguồn không gian & lịch sử
        </p>
        <h1 className="font-display font-light italic text-4xl sm:text-6xl md:text-8xl text-white text-center leading-tight tracking-wide drop-shadow-[0_0_45px_rgba(255,205,0,0.5)]">
          “Bạn đang đứng ở đâu?”
        </h1>
        <div className="w-32 h-0.5 mt-8 bg-gradient-to-r from-transparent via-vn-gold to-transparent opacity-70" />
      </div>

      {/* 4. KHU VỰC TEXT DẪN DẮT (Step 3): KHÔNG HỀ CHE BẢN ĐỒ!
             Được bố trí ở góc trên màn hình, phía dưới thanh header và hoàn toàn nằm ngoài biên bản đồ */}
      <div className={`fixed top-16 sm:top-20 left-0 right-0 z-30 flex justify-center px-4 transition-all duration-1000 ${
        step === 3 || step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'
      }`}>
        <div className="max-w-2xl text-center px-6 py-3 rounded-2xl bg-vn-black/90 border border-vn-gold/50 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
          <p className="font-heading italic text-base sm:text-xl md:text-2xl text-vn-ivory font-light leading-relaxed">
            “Để kết tinh thành 1 mảnh đất hình chữ S đó, điều quan trọng nhất phải có:”
          </p>
        </div>
      </div>

      {/* 5. KHUNG BẢN ĐỒ VIỆT NAM (ĐƯỢC TĂNG KÍCH THƯỚC LỚN, RÕ RÀNG, UY NGHI) */}
      <div className={`relative z-20 w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-32 sm:pb-36 px-2 sm:px-6 transition-all duration-1000 ${
        step >= 1 ? 'opacity-100' : 'opacity-0'
      }`}>
        
        {/* Bản đồ SVG cỡ lớn, tự co giãn cân đối */}
        <div className={`relative flex items-center justify-center transition-all duration-1000 ease-out ${
          step >= 4
            ? 'scale-[0.80] sm:scale-[0.86] md:scale-[0.92] -translate-y-8 sm:-translate-y-12'
            : 'scale-100 translate-y-0'
        }`}>
          
          {/* Hào quang nền tỏa rộng bao quanh bản đồ */}
          <div className="absolute inset-0 -m-20 rounded-full bg-radial from-vn-gold/20 via-vn-red-deep/12 to-transparent blur-3xl pointer-events-none" />

          {/* SVG Container: KÍCH THƯỚC ĐÃ ĐƯỢC TĂNG LỚN (lên tới 780px) */}
          <div className="relative w-[380px] sm:w-[540px] md:w-[680px] lg:w-[760px] aspect-[703/900] filter drop-shadow-[0_0_50px_rgba(218,37,29,0.35)]">
            <svg
              viewBox="0 0 703 900"
              className="w-full h-full select-none"
            >
              {/* Định nghĩa hiệu ứng phát sáng SVG */}
              <defs>
                <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
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
                    fill="#131720"
                    fillOpacity="0.92"
                    stroke="#FFCD00"
                    strokeWidth="1.1"
                    strokeOpacity="0.55"
                    className="transition-colors duration-300 hover:fill-[#251d18]"
                  />
                ))}
              </g>

              {/* Tên Quần đảo Hoàng Sa & Trường Sa thiêng liêng (Kích thước lớn, sắc nét) */}
              <g className="pointer-events-none select-none">
                <rect x="475" y="398" width="160" height="42" rx="6" fill="#090A0C" fillOpacity="0.85" stroke="#FFCD00" strokeWidth="1" />
                <text x="490" y="420" fill="#FFCD00" fontSize="17" fontWeight="bold" letterSpacing="1.5">
                  Q.Đ HOÀNG SA
                </text>
                <text x="490" y="434" fill="#E8DFCE" fontSize="11" opacity="0.85" fontStyle="italic">
                  (Chủ quyền Việt Nam)
                </text>

                <rect x="490" y="682" width="165" height="42" rx="6" fill="#090A0C" fillOpacity="0.85" stroke="#FFCD00" strokeWidth="1" />
                <text x="505" y="704" fill="#FFCD00" fontSize="17" fontWeight="bold" letterSpacing="1.5">
                  Q.Đ TRƯỜNG SA
                </text>
                <text x="505" y="718" fill="#E8DFCE" fontSize="11" opacity="0.85" fontStyle="italic">
                  (Chủ quyền Việt Nam)
                </text>
              </g>

              {/* ĐƯỜNG DẪN NỐI CÁC ĐIỂM (CHẠY CHẬM RÃI, LIỀN MẠCH, KHÔNG BỊ NGẮT QUÃNG) */}
              {step >= 2 && (
                <g id="travel-path">
                  {/* Đường polyline đã vẽ qua các điểm hoàn thành + tọa độ đang di chuyển */}
                  <polyline
                    points={[
                      ...completedPoints.map(p => `${p.x},${p.y}`),
                      ...(isTraveling ? [`${travelingCoord.x},${travelingCoord.y}`] : [])
                    ].join(' ')}
                    fill="none"
                    stroke="#FFCD00"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="6 4"
                    filter="url(#gold-glow)"
                    className="opacity-95"
                  />
                </g>
              )}

              {/* CÁC CHẤM SÁNG ĐÃ ĐƯỢC KÍCH HOẠT (CHẮC CHẮN KHÔNG LỆCH) */}
              {step >= 2 && completedPoints.map((beacon, idx) => {
                const isCurrent = idx === completedPointsCount - 1;

                return (
                  <g key={beacon.id} id={`beacon-${beacon.id}`}>
                    {/* Vòng hào quang lan tỏa chuẩn tâm SVG tuyệt đối (KHÔNG DÙNG CSS animate-ping) */}
                    <circle cx={beacon.x} cy={beacon.y} r="6" fill="none" stroke="#FFCD00" strokeWidth="2">
                      <animate attributeName="r" values="6;24;6" dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.9;0.1;0.9" dur="2.4s" repeatCount="indefinite" />
                    </circle>

                    {isCurrent && (
                      <circle cx={beacon.x} cy={beacon.y} r="10" fill="none" stroke="#DA251D" strokeWidth="2">
                        <animate attributeName="r" values="10;34" dur="1.8s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Vầng sáng vàng nền */}
                    <circle cx={beacon.x} cy={beacon.y} r="10" fill="#FFCD00" fillOpacity="0.4" />

                    {/* Tâm chấm sáng trắng viền đỏ mạ vàng */}
                    <circle
                      cx={beacon.x}
                      cy={beacon.y}
                      r={isCurrent ? "6.5" : "5"}
                      fill="#FFFFFF"
                      stroke="#DA251D"
                      strokeWidth="2"
                    />

                    {/* TITLE CỦA CÁC ĐIỂM: ĐÃ ĐƯỢC TĂNG LỚN (Font 16px, Đậm nét, Rõ ràng) */}
                    {(isCurrent || step >= 3) && (
                      <g className="pointer-events-none select-none">
                        {/* Hộp nhãn nền đen viền vàng */}
                        <rect
                          x={beacon.labelAlign === 'left' ? beacon.x - (beacon.name.length * 9.5 + 24) : beacon.x + 14}
                          y={beacon.y - 15}
                          width={beacon.name.length * 9.5 + 20}
                          height="30"
                          rx="6"
                          fill="#08090C"
                          fillOpacity="0.95"
                          stroke="#FFCD00"
                          strokeWidth="1.5"
                          filter="drop-shadow(0 2px 10px rgba(0,0,0,0.85))"
                        />

                        {/* Điểm nhấn chấm đỏ trong nhãn */}
                        <circle
                          cx={beacon.labelAlign === 'left' ? beacon.x - (beacon.name.length * 9.5 + 14) : beacon.x + 24}
                          cy={beacon.y}
                          r="3.5"
                          fill="#DA251D"
                        />

                        {/* Chữ Tên Địa Danh To và Rõ (Font 15.5px, bold) */}
                        <text
                          x={beacon.labelAlign === 'left' ? beacon.x - (beacon.name.length * 9.5 + 4) : beacon.x + 34}
                          y={beacon.y + 5.5}
                          fill="#FFCD00"
                          fontSize="15.5"
                          fontWeight="700"
                          letterSpacing="0.4"
                        >
                          {beacon.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* VÒNG TRÒN / NGÔI SAO SÁNG ĐANG CHẠY (TRAVELING CIRCLE)
                  Tọa độ lấy trực tiếp từ travelingCoord (curX, curY), CHÍNH XÁC 100%, KHÔNG LỆCH! */}
              {isTraveling && (
                <g id="traveling-orb">
                  {/* Hào quang theo sau quả cầu sáng */}
                  <circle cx={travelingCoord.x} cy={travelingCoord.y} r="18" fill="none" stroke="#FFCD00" strokeWidth="2" opacity="0.7">
                    <animate attributeName="r" values="8;24;8" dur="0.8s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={travelingCoord.x} cy={travelingCoord.y} r="10" fill="#FFCD00" fillOpacity="0.5" />
                  {/* Tâm quả cầu sáng rực rỡ */}
                  <circle cx={travelingCoord.x} cy={travelingCoord.y} r="6" fill="#FFFFFF" stroke="#DA251D" strokeWidth="2" />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* 6. THẺ HUD THÔNG TIN ĐIỂM SÁNG HIỆN TẠI (Hiển thị góc dưới to rõ ràng) */}
        {step === 2 && activeBeacon && (
          <div className="fixed bottom-6 left-4 sm:left-8 z-30 max-w-sm sm:max-w-md p-4 rounded-2xl bg-vn-black/90 border-2 border-vn-gold/60 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.9)] animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-vn-gold uppercase tracking-widest mb-1.5 font-bold">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-vn-red" />
                Vùng đất: {activeBeacon.region}
              </span>
              <span className="font-mono text-vn-ivory/70">
                {completedPointsCount}/{BEACON_POINTS.length}
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

        {/* 7. KHỐI CHUYỂN ĐỘNG THU RA: "DÂN TỘC" + BANNER ĐỎ CHỮ VÀNG + NÚT BẮT ĐẦU (Step 4 & 5)
               Nằm ở phần dưới màn hình, có không gian riêng biệt, hoàn toàn không che lấp bản đồ! */}
        <div className={`fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 flex flex-col items-center text-center px-4 transition-all duration-1000 ease-out ${
          step >= 4 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-12 pointer-events-none'
        }`}>
          
          <div className="max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-vn-black/95 border-2 border-vn-gold/70 shadow-[0_20px_70px_rgba(0,0,0,0.95)] backdrop-blur-xl flex flex-col items-center">
            
            {/* Chữ DÂN TỘC hào sảng */}
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,205,0,0.7)] leading-none mb-4">
              DÂN TỘC
            </h2>

            {/* Banner NỀN ĐỎ CHỮ VÀNG theo đúng yêu cầu */}
            <div className="relative group w-full max-w-lg px-6 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-[#8F1713] via-[#DA251D] to-[#8F1713] border-2 border-vn-gold shadow-[0_0_35px_rgba(218,37,29,0.75)] transform transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,205,0,0.3)_0%,transparent_70%)] pointer-events-none" />
              <p className="relative font-heading font-bold text-base sm:text-xl md:text-2xl text-vn-gold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                Một đất nước – 54 sắc màu – một cộng đồng.
              </p>
            </div>

            {/* Nút BẮT ĐẦU HÀNH TRÌNH (Step 5) */}
            <div className={`mt-6 sm:mt-7 transition-all duration-700 ${
              step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}>
              <button
                onClick={handleStartJourney}
                className="relative inline-flex items-center gap-3 px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-vn-gold-antique via-vn-gold to-vn-gold-antique text-vn-black font-display font-black text-base sm:text-xl uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(255,205,0,0.6)] hover:shadow-[0_0_70px_rgba(255,205,0,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>BẮT ĐẦU HÀNH TRÌNH</span>
                <ArrowRight className="w-5 h-5 text-vn-black animate-pulse" />
                <div className="absolute -inset-1 rounded-full border border-vn-gold/60 animate-ping opacity-30 pointer-events-none" />
              </button>
              <p className="text-[11px] sm:text-xs text-vn-gold/80 mt-2.5 font-mono tracking-wider">
                Chuyển động đến chuyên đề: Dân tộc là gì?
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
