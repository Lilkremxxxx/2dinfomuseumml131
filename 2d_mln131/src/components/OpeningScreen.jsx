import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RotateCcw, Sparkles, Compass } from 'lucide-react';
import vietnamPaths from '../data/vietnamPaths.json';

// Danh sách các điểm chấm sáng lần lượt từ Bắc -> Trung -> Nam
const BEACON_POINTS = [
  { id: 'lung-cu', name: 'Lũng Cú (Hà Giang)', region: 'Bắc Bộ', x: 200, y: 38, desc: 'Cột cờ Lũng Cú - Điểm cực Bắc Tổ quốc' },
  { id: 'ha-noi', name: 'Thủ đô Hà Nội', region: 'Bắc Bộ', x: 198, y: 132, desc: 'Trái tim ngàn năm văn hiến' },
  { id: 'ha-long', name: 'Hải Phòng & Quảng Ninh', region: 'Bắc Bộ', x: 236, y: 148, desc: 'Cửa biển Đông Bắc hào hùng' },
  { id: 'nghe-an', name: 'Nghệ An - Hà Tĩnh', region: 'Trung Bộ', x: 180, y: 248, desc: 'Dải đất Lam Hồng kiên trung' },
  { id: 'hue', name: 'Cố đô Huế & Quảng Trị', region: 'Trung Bộ', x: 260, y: 350, desc: 'Trung độ hội tụ di sản văn hóa' },
  { id: 'da-nang', name: 'Đà Nẵng & Quảng Nam', region: 'Trung Bộ', x: 300, y: 405, desc: 'Đầu sóng ngọn gió miền Trung' },
  { id: 'hoang-sa', name: 'Quần đảo Hoàng Sa', region: 'Biển Đảo', x: 505, y: 430, desc: 'Chủ quyền biển đảo thiêng liêng' },
  { id: 'tay-nguyen', name: 'Tây Nguyên (Đắk Lắk - Gia Lai)', region: 'Tây Nguyên', x: 295, y: 555, desc: 'Đại ngàn rừng thiêng đất đỏ' },
  { id: 'nha-trang', name: 'Khánh Hòa & Bình Thuận', region: 'Nam Trung Bộ', x: 350, y: 610, desc: 'Duyên hải Nam Trung Bộ' },
  { id: 'hcm', name: 'TP. Hồ Chí Minh', region: 'Nam Bộ', x: 240, y: 708, desc: 'Đô thị phương Nam rực rỡ' },
  { id: 'can-tho', name: 'Cần Thơ & ĐBSCL', region: 'Nam Bộ', x: 195, y: 730, desc: 'Chín rồng sông nước nghĩa tình' },
  { id: 'truong-sa', name: 'Quần đảo Trường Sa', region: 'Biển Đảo', x: 525, y: 715, desc: 'Phên dậu tiền tiêu của Tổ quốc' },
  { id: 'phu-quoc', name: 'Phú Quốc (Kiên Giang)', region: 'Biển Đảo', x: 98, y: 725, desc: 'Đảo ngọc biển Tây Nam' },
  { id: 'ca-mau', name: 'Đất Mũi Cà Mau', region: 'Nam Bộ', x: 146, y: 792, desc: 'Điểm cực Nam non sông liền một dải' }
];

export default function OpeningScreen() {
  // Step 0: "Bạn đang đứng ở đâu?"
  // Step 1: Bản đồ Việt Nam xuất hiện huyền ảo
  // Step 2: Các chấm sáng lần lượt xuất hiện từ Bắc -> Trung -> Nam
  // Step 3: Dòng dẫn dắt: "Để kết tinh thành 1 mảnh đất hình chữ S đó..."
  // Step 4: Chuyển động thu ra (Zoom out): "DÂN TỘC" + Banner đỏ chữ vàng
  // Step 5: Nút "BẮT ĐẦU HÀNH TRÌNH →"
  const [step, setStep] = useState(0);
  const [activeBeaconIndex, setActiveBeaconIndex] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Stage 0 -> 1: Hiện câu hỏi mở đầu "Bạn đang đứng ở đâu?", sau 2.2s bắt đầu mở bản đồ
    const timer1 = setTimeout(() => {
      setStep(1);
    }, 2200);

    // Stage 1 -> 2: Bản đồ hiện rõ, bắt đầu thắp sáng các điểm từ Bắc đến Nam
    const timer2 = setTimeout(() => {
      setStep(2);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Điều khiển các chấm sáng chạy tuần tự từ Bắc -> Nam khi ở Step 2
  useEffect(() => {
    if (step < 2) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BEACON_POINTS.length) {
        setActiveBeaconIndex(currentIndex);
        currentIndex++;
      } else {
        clearInterval(interval);
        // Sau khi các chấm sáng thắp xong từ Bắc -> Nam, hiện dòng chữ dẫn dắt (Step 3)
        setTimeout(() => setStep(3), 800);
        // Chuyển động thu ra (Zoom-out) hé lộ DÂN TỘC và banner (Step 4)
        setTimeout(() => setStep(4), 2800);
        // Hiện nút bắt đầu hành trình (Step 5)
        setTimeout(() => setStep(5), 4000);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [step]);

  const handleStartJourney = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/dan-toc');
    }, 700);
  };

  const handleSkip = () => {
    setStep(5);
    setActiveBeaconIndex(BEACON_POINTS.length - 1);
  };

  const handleReplay = () => {
    setStep(0);
    setActiveBeaconIndex(-1);
    setTimeout(() => setStep(1), 1800);
    setTimeout(() => setStep(2), 3400);
  };

  return (
    <div className={`relative min-h-screen w-full bg-[#08090C] text-[#F5EFE6] overflow-hidden select-none transition-opacity duration-700 ${
      isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      {/* 1. Nền bầu trời đêm sao tinh vân huyền bí */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/stars.webp)' }}
      />
      {/* Lớp hạt điện ảnh & ánh sáng nền */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_40%,rgba(143,23,19,0.18)_0%,rgba(9,10,12,0.95)_75%)]" />
      <div className="film-grain pointer-events-none" />
      <div className="film-vignette pointer-events-none" />

      {/* Thanh điều khiển phụ góc trên */}
      <div className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-vn-charcoal/80 border border-vn-gold/30 backdrop-blur-md">
          <Compass className="w-4 h-4 text-vn-gold animate-spin-slow" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-vn-gold">
            Triển Lãm Số 2D · Khởi Đầu Không Gian
          </span>
        </div>

        <div className="flex items-center gap-3">
          {step < 5 && (
            <button
              onClick={handleSkip}
              className="text-xs uppercase tracking-widest text-vn-ivory/60 hover:text-vn-gold transition px-3 py-1 rounded-full border border-vn-gold/20 hover:border-vn-gold/50 bg-vn-black/50"
            >
              Bỏ qua hiệu ứng →
            </button>
          )}
          {step >= 4 && (
            <button
              onClick={handleReplay}
              title="Xem lại hoạt cảnh mở đầu"
              className="p-2 rounded-full border border-vn-gold/30 bg-vn-black/60 text-vn-gold hover:bg-vn-red-deep/40 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. GIAI ĐOẠN 0: Câu hỏi triết học "Bạn đang đứng ở đâu?" */}
      <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center transition-all duration-1000 px-6 ${
        step === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
      }`}>
        <p className="text-xs uppercase tracking-[0.4em] text-vn-gold/70 mb-4 font-sans animate-pulse">
          Chiêm nghiệm không gian & cội nguồn
        </p>
        <h1 className="font-display font-light italic text-4xl sm:text-6xl md:text-7xl text-white text-center leading-tight tracking-wide drop-shadow-[0_0_35px_rgba(255,205,0,0.45)]">
          “Bạn đang đứng ở đâu?”
        </h1>
        <div className="w-24 h-0.5 mt-8 bg-gradient-to-r from-transparent via-vn-gold to-transparent opacity-60" />
      </div>

      {/* 3. KHUNG CHÍNH: Bản đồ Việt Nam + Chấm sáng Bắc -> Trung -> Nam + Chuyển động thu ra */}
      <div className={`relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-4 transition-all duration-1000 ${
        step >= 1 ? 'opacity-100' : 'opacity-0'
      }`}>
        
        {/* Bản đồ SVG Việt Nam với hiệu ứng Camera Zoom-out (Thu ra ở Step >= 4) */}
        <div className={`relative flex items-center justify-center transition-all duration-1000 ease-out ${
          step >= 4 
            ? 'scale-[0.62] sm:scale-[0.72] md:scale-[0.78] -translate-y-12 sm:-translate-y-14' 
            : 'scale-90 sm:scale-100 translate-y-0'
        }`}>
          
          {/* Hào quang nền quanh bản đồ */}
          <div className="absolute inset-0 -m-16 rounded-full bg-radial from-vn-gold/15 via-vn-red-deep/10 to-transparent blur-3xl pointer-events-none" />

          {/* Container Bản đồ SVG 703x900 */}
          <div className="relative w-[340px] sm:w-[440px] md:w-[500px] aspect-[703/900] filter drop-shadow-[0_0_40px_rgba(218,37,29,0.35)]">
            <svg
              viewBox="0 0 703 900"
              className="w-full h-full select-none"
            >
              {/* Toàn bộ dải lãnh thổ 63 tỉnh thành & đảo Việt Nam hình chữ S */}
              <g id="vietnam-silhouette" className="transition-opacity duration-1000">
                {vietnamPaths.map((prov) => (
                  <path
                    key={prov.id}
                    d={prov.d}
                    fill="#151922"
                    fillOpacity="0.88"
                    stroke="#FFCD00"
                    strokeWidth={step >= 4 ? 0.9 : 1.2}
                    strokeOpacity="0.65"
                    className="transition-all duration-500 hover:fill-[#2a1a15]"
                  />
                ))}
              </g>

              {/* Đường sáng kết nối các điểm từ Bắc đến Nam */}
              {step >= 2 && activeBeaconIndex > 0 && (
                <polyline
                  points={BEACON_POINTS.slice(0, activeBeaconIndex + 1).map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="#FFCD00"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.8"
                  className="animate-pulse"
                />
              )}

              {/* Tên Quần đảo Hoàng Sa & Trường Sa thiêng liêng */}
              <g className="pointer-events-none select-none">
                <text x="495" y="415" fill="#FFCD00" fontSize="15" fontWeight="bold" letterSpacing="2">
                  Q.Đ HOÀNG SA
                </text>
                <text x="495" y="432" fill="#E8DFCE" fontSize="10" opacity="0.8" fontStyle="italic">
                  (Việt Nam)
                </text>

                <text x="515" y="700" fill="#FFCD00" fontSize="15" fontWeight="bold" letterSpacing="2">
                  Q.Đ TRƯỜNG SA
                </text>
                <text x="515" y="717" fill="#E8DFCE" fontSize="10" opacity="0.8" fontStyle="italic">
                  (Việt Nam)
                </text>
              </g>

              {/* CÁC CHẤM SÁNG LẦN LƯỢT XUẤT HIỆN TỪ BẮC -> TRUNG -> NAM */}
              {step >= 2 && BEACON_POINTS.map((beacon, idx) => {
                const isActivated = idx <= activeBeaconIndex;
                const isCurrent = idx === activeBeaconIndex;
                if (!isActivated) return null;

                return (
                  <g key={beacon.id} className="transition-all duration-300">
                    {/* Vòng sóng xung kích tỏa tròn (Radar wave) cho điểm hiện tại */}
                    {isCurrent && (
                      <>
                        <circle
                          cx={beacon.x}
                          cy={beacon.y}
                          r="18"
                          fill="none"
                          stroke="#FFCD00"
                          strokeWidth="2"
                          opacity="0.85"
                          className="animate-ping"
                        />
                        <circle
                          cx={beacon.x}
                          cy={beacon.y}
                          r="28"
                          fill="none"
                          stroke="#DA251D"
                          strokeWidth="1.5"
                          opacity="0.6"
                          className="animate-ping"
                        />
                      </>
                    )}

                    {/* Hào quang nền */}
                    <circle
                      cx={beacon.x}
                      cy={beacon.y}
                      r="9"
                      fill="#FFCD00"
                      fillOpacity="0.35"
                    />

                    {/* Tâm chấm sáng rực rỡ */}
                    <circle
                      cx={beacon.x}
                      cy={beacon.y}
                      r={isCurrent ? "5.5" : "4"}
                      fill="#FFFFFF"
                      stroke="#DA251D"
                      strokeWidth="1.5"
                      className="filter drop-shadow-[0_0_8px_#FFCD00]"
                    />

                    {/* Nhãn địa danh hiển thị nổi bật */}
                    {(isCurrent || step >= 3) && (
                      <g className="pointer-events-none">
                        <rect
                          x={beacon.x + 8}
                          y={beacon.y - 11}
                          width={beacon.name.length * 6.8 + 12}
                          height="18"
                          rx="4"
                          fill="#090A0C"
                          fillOpacity="0.9"
                          stroke="#FFCD00"
                          strokeWidth="0.8"
                        />
                        <text
                          x={beacon.x + 14}
                          y={beacon.y + 2}
                          fill="#FFCD00"
                          fontSize="9.5"
                          fontWeight="600"
                          letterSpacing="0.5"
                        >
                          {beacon.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* 4. DÒNG DẪN DẮT (Step 3 & 4) */}
        <div className={`absolute top-[18vh] sm:top-[16vh] z-30 text-center max-w-2xl px-4 transition-all duration-1000 ${
          step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vn-red-deep/40 border border-vn-gold/40 text-[11px] uppercase tracking-cinematic text-vn-gold mb-3 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-vn-gold animate-spin-slow" />
            Khởi Nguồn Lịch Sử · Chương 6 MLN131
          </div>
          <p className="font-heading italic text-lg sm:text-2xl text-vn-ivory/90 leading-relaxed font-light">
            “Để kết tinh thành 1 mảnh đất hình chữ S đó, điều quan trọng nhất phải có:”
          </p>
        </div>

        {/* 5. KHỐI CHUYỂN ĐỘNG THU RA: "DÂN TỘC" + Banner đỏ chữ vàng (Step 4 & 5) */}
        <div className={`absolute bottom-[10vh] sm:bottom-[12vh] z-30 flex flex-col items-center text-center px-4 transition-all duration-1000 ease-out ${
          step >= 4 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8 pointer-events-none'
        }`}>
          {/* Chữ DÂN TỘC kích thước lớn uy nghi */}
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,205,0,0.65)] leading-none mb-4">
            DÂN TỘC
          </h2>

          {/* Banner NỀN ĐỎ CHỮ VÀNG theo đúng yêu cầu */}
          <div className="relative group max-w-xl mx-auto px-6 sm:px-10 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#8F1713] via-[#DA251D] to-[#8F1713] border-2 border-vn-gold shadow-[0_0_35px_rgba(218,37,29,0.7)] transform transition-transform duration-300 hover:scale-105">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,205,0,0.25)_0%,transparent_70%)] pointer-events-none" />
            <p className="relative font-heading font-bold text-base sm:text-xl md:text-2xl text-vn-gold tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              Một đất nước – 54 sắc màu – một cộng đồng.
            </p>
          </div>

          {/* 6. NÚT BẮT ĐẦU HÀNH TRÌNH (Step 5) */}
          <div className={`mt-8 transition-all duration-700 ${
            step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}>
            <button
              onClick={handleStartJourney}
              className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-vn-gold-antique via-vn-gold to-vn-gold-antique text-vn-black font-display font-black text-base sm:text-lg uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(255,205,0,0.5)] hover:shadow-[0_0_60px_rgba(255,205,0,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>BẮT ĐẦU HÀNH TRÌNH</span>
              <ArrowRight className="w-5 h-5 text-vn-black animate-pulse" />
              <div className="absolute -inset-1 rounded-full border border-vn-gold/60 animate-ping opacity-30 pointer-events-none" />
            </button>
            <p className="text-[11px] text-vn-ivory/50 mt-3 font-mono tracking-wider">
              Chuyển động đến chuyên đề: Dân tộc là gì?
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
