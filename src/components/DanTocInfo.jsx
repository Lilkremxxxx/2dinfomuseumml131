import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  Compass, 
  Maximize2, 
  Sparkles, 
  BookOpen, 
  Layers, 
  CheckCircle2,
  Globe2,
  TrendingUp,
  Languages,
  Landmark,
  Image as ImageIcon,
  RotateCcw,
  Anchor,
  Wind
} from 'lucide-react';
import mapTerritoryImg from '../../Image/1. Ban do viet nam.jpg';
import iconPng from '../../Image/icon.png';
import InteractiveVietnamMap from './InteractiveVietnamMap';

export default function DanTocInfo() {
  const navigate = useNavigate();
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  // State cho hiệu ứng thu - mở của 5 mảnh ghép
  // 'expanded' -> 'collapsed' (thu vào) -> 'revealed' (mở ra bản đồ Việt Nam)
  const [puzzleState, setPuzzleState] = useState('expanded');

  // State theo dõi cuộn chuột cho phần Chuyển động Con thuyền (Cương lĩnh Lênin)
  const boatSectionRef = useRef(null);
  const [boatProgress, setBoatProgress] = useState(0); // 0 -> 1

  useEffect(() => {
    const handleScroll = () => {
      if (!boatSectionRef.current) return;
      const rect = boatSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setBoatProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Xử lý nút kích hoạt hiệu ứng thu - mở 5 mảnh ghép
  const handleTriggerPuzzle = () => {
    setPuzzleState('collapsed');
    setTimeout(() => {
      setPuzzleState('revealed');
    }, 900);
  };

  const handleResetPuzzle = () => {
    setPuzzleState('expanded');
  };

  // Xác định mốc hiện tại của con thuyền theo boatProgress
  // Mốc 1: 0.0 -> 0.35 (BÌNH ĐẲNG)
  // Mốc 2: 0.35 -> 0.70 (TỰ QUYẾT)
  // Mốc 3: 0.70 -> 1.0 (LIÊN HIỆP)
  let activeMilestoneIndex = 0;
  if (boatProgress >= 0.65) activeMilestoneIndex = 2;
  else if (boatProgress >= 0.32) activeMilestoneIndex = 1;

  const milestonesData = [
    {
      title: "BÌNH ĐẲNG",
      quote: "Không phân biệt dân tộc lớn hay nhỏ, trình độ phát triển cao hay thấp; các dân tộc có quyền lợi và nghĩa vụ ngang nhau.",
      badge: "Nguyên tắc thứ nhất · Tự do & Bình quyền",
      color: "#FFCD00"
    },
    {
      title: "TỰ QUYẾT",
      quote: "Quyền tự quyết là quyền của các dân tộc tự quyết định vận mệnh, lựa chọn chế độ chính trị và con đường phát triển của mình.",
      badge: "Nguyên tắc thứ hai · Độc lập & Tự chủ",
      color: "#DA251D"
    },
    {
      title: "LIÊN HIỆP",
      quote: "Đoàn kết, liên hiệp công nhân các dân tộc là cơ sở để đoàn kết các tầng lớp nhân dân lao động trong cuộc đấu tranh vì độc lập dân tộc và tiến bộ xã hội.",
      badge: "Nguyên tắc thứ ba · Sức mạnh Đại đoàn kết",
      color: "#FFCD00"
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#07080A] text-[#F5EFE6] selection:bg-vn-red selection:text-vn-gold overflow-x-hidden">
      
      {/* 1. LỚP NỀN ĐIỆN ẢNH BẢO TÀNG */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/stars.webp)' }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_15%,rgba(143,23,19,0.22)_0%,rgba(7,8,10,0.98)_80%)]" />
      <div className="film-grain pointer-events-none" />
      <div className="film-vignette pointer-events-none" />

      {/* 2. THANH NAVIGATION TOP */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-vn-black/85 border-b border-vn-gold/25 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-vn-gold-antique hover:text-vn-gold transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Màn hình mở đầu</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vn-charcoal/90 border border-vn-gold/30 text-[11px] font-semibold uppercase tracking-[0.25em] text-vn-gold">
          <BookOpen className="w-3.5 h-3.5 text-vn-gold" />
          <span>Chương 6 · Chủ Nghĩa Xã Hội Khoa Học</span>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-vn-gold/40 bg-vn-red-deep/40 text-xs font-semibold uppercase tracking-widest text-vn-gold hover:bg-vn-red-deep hover:text-white transition group"
        >
          <span>Triển lãm 2D</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </header>

      {/* 3. NỘI DUNG CHÍNH */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* KHỐI TIÊU ĐỀ CHÍNH: DÂN TỘC LÀ GÌ? */}
        <div className="relative mb-16 sm:mb-24">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-vn-gold/80 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-vn-red animate-pulse" />
            <span>Lý luận Mác - Lênin về vấn đề dân tộc</span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,205,0,0.45)] leading-none">
            DÂN TỘC LÀ GÌ?
          </h1>

          <p className="mt-6 max-w-3xl font-heading text-lg sm:text-2xl text-vn-gold font-light italic leading-relaxed">
            “Dân tộc là hình thức cộng đồng người ổn định, phát triển cao nhất trong lịch sử nhân loại, hình thành trên cơ sở gắn kết chặt chẽ của các yếu tố lãnh thổ, kinh tế, ngôn ngữ, văn hóa và thể chế.”
          </p>

          <div className="w-full h-px bg-gradient-to-r from-vn-gold/60 via-vn-red/40 to-transparent mt-10" />
        </div>

        {/* -------------------------------------------------------------
            PHẦN ①: LÀ CỘNG ĐỒNG VỀ LÃNH THỔ
            ------------------------------------------------------------- */}
        <section id="dac-trung-1" className="relative rounded-3xl bg-gradient-to-b from-[#13161D] to-[#0A0C10] border-2 border-vn-gold/60 p-6 sm:p-10 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.85)] mb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(255,205,0,0.12)_0%,transparent_70%)] pointer-events-none" />

          {/* Heading ① */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-vn-gold/30 pb-8 mb-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-vn-red-deep via-vn-red to-vn-red-dark border-2 border-vn-gold flex items-center justify-center shadow-[0_0_30px_rgba(218,37,29,0.6)] shrink-0">
              <span className="font-display font-black text-3xl sm:text-4xl text-vn-gold drop-shadow-md">
                ①
              </span>
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-vn-gold/15 border border-vn-gold/40 text-[10px] font-bold uppercase tracking-[0.25em] text-vn-gold mb-1.5">
                Đặc trưng bản thể cốt lõi số một
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight text-glow-gold">
                Là Cộng đồng về lãnh thổ
              </h2>
            </div>
          </div>

          {/* Nội dung kết hợp giữa Tư liệu Hình ảnh Bản đồ và Phân tích */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Ảnh bản đồ tư liệu quý */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                className="relative group w-full max-w-[500px] rounded-2xl p-3 bg-gradient-to-b from-[#1E232F] to-[#0E1015] border-2 border-vn-gold/60 shadow-[0_15px_50px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer"
                onClick={() => setIsZoomModalOpen(true)}
              >
                <div className="relative overflow-hidden rounded-xl bg-vn-black aspect-[3/4] flex items-center justify-center">
                  <img 
                    src={mapTerritoryImg} 
                    alt="Bản đồ lãnh thổ Việt Nam liền một dải" 
                    className="w-full h-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => { e.target.src = '/images/ban-do-viet-nam.jpg'; }}
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-vn-black/85 border border-vn-gold/50 text-vn-gold text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Xem phóng to</span>
                  </div>
                </div>
                <div className="mt-3.5 px-2 pb-1 text-center">
                  <p className="font-heading italic text-sm text-vn-gold-antique">
                    Tư liệu số: Bản đồ Lãnh thổ & Chủ quyền Quốc gia Việt Nam
                  </p>
                </div>
              </div>
            </div>

            {/* Luận điểm & Trích dẫn Bác Hồ */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-5 rounded-2xl bg-vn-charcoal/90 border border-vn-gold/25 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-vn-gold mb-2">
                  <MapPin className="w-4 h-4 text-vn-red" />
                  <span>Không gian sinh tồn bất khả xâm phạm</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-vn-ivory/85">
                  Lãnh thổ là nơi sinh tồn, lao động, sản xuất và phát triển ngàn đời của một cộng đồng người. Không có lãnh thổ thì không thể hình thành và duy trì một dân tộc độc lập có chủ quyền.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-vn-charcoal/90 border border-vn-gold/25 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-vn-gold mb-2">
                  <ShieldCheck className="w-4 h-4 text-vn-red" />
                  <span>Chủ quyền trọn vẹn non sông & biển đảo</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-vn-ivory/85">
                  Lãnh thổ của dân tộc Việt Nam bao gồm toàn vẹn <strong>vùng đất, vùng trời, vùng biển, thềm lục địa</strong> và hệ thống hải đảo tiền tiêu, tiêu biểu là hai quần đảo thiêng liêng <strong>Hoàng Sa và Trường Sa</strong>.
                </p>
              </div>

              <div className="relative p-6 rounded-2xl bg-gradient-to-r from-vn-red-deep/30 to-vn-black/80 border-l-4 border-vn-gold border-y border-r border-vn-gold/20 shadow-xl">
                <Sparkles className="w-5 h-5 text-vn-gold mb-2" />
                <blockquote className="font-heading italic text-base sm:text-lg text-vn-ivory font-light leading-relaxed">
                  “Nước Việt Nam là một, dân tộc Việt Nam là một. Sông có thể cạn, núi có thể mòn, song chân lý ấy không bao giờ thay đổi.”
                </blockquote>
                <div className="mt-2 text-xs uppercase tracking-widest text-vn-gold font-bold text-right">
                  — Chủ tịch Hồ Chí Minh
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* -------------------------------------------------------------
            PHẦN ②: CỘNG ĐỒNG VỀ KINH TẾ
            3 khung ảnh xuất hiện mượt mà (đề xuất: staggered float-in)
            ------------------------------------------------------------- */}
        <section id="dac-trung-2" className="relative rounded-3xl bg-gradient-to-b from-[#13161D] to-[#0A0C10] border-2 border-vn-gold/50 p-6 sm:p-10 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.85)] mb-20 overflow-hidden">
          
          {/* Heading ② */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-vn-gold/30 pb-8 mb-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-vn-bronze via-[#B8860B] to-vn-charcoal border-2 border-vn-gold flex items-center justify-center shadow-[0_0_30px_rgba(212,167,44,0.4)] shrink-0">
              <span className="font-display font-black text-3xl sm:text-4xl text-vn-gold drop-shadow-md">
                ②
              </span>
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-vn-gold/15 border border-vn-gold/40 text-[10px] font-bold uppercase tracking-[0.25em] text-vn-gold mb-1.5">
                Đặc trưng bản thể thứ hai
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight text-glow-gold">
                Cộng đồng về kinh tế
              </h2>
              <p className="text-sm text-vn-ivory/70 mt-1 max-w-2xl">
                Mối liên hệ kinh tế thường xuyên, một thị trường dân tộc thống nhất là chất keo bền chặt gắn kết các bộ phận cư dân thành một khối thống nhất.
              </p>
            </div>
          </div>

          {/* 3 KHUNG ẢNH XUẤT HIỆN MƯỢT MÀ (Được thiết kế khung di sản sẵn sàng hiển thị) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Ảnh 1 */}
            <div className="group relative rounded-2xl p-3 bg-gradient-to-b from-[#1C202B] to-[#0E1015] border border-vn-gold/40 hover:border-vn-gold shadow-xl hover:-translate-y-2 transition-all duration-500">
              <div className="relative aspect-[4/3] rounded-xl bg-vn-charcoal/90 border border-dashed border-vn-gold/30 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <TrendingUp className="w-10 h-10 text-vn-gold/60 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs font-semibold uppercase tracking-wider text-vn-gold">
                  Tư liệu kinh tế 01
                </span>
                <span className="text-[11px] text-vn-ivory/60 mt-1">
                  Nền kinh tế nông nghiệp lúa nước & làng nghề truyền thống
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-3 text-center">
                <p className="font-heading italic text-xs text-vn-gold-antique">
                  Mảnh ghép: Sản xuất & Tự cung tự cấp
                </p>
              </div>
            </div>

            {/* Ảnh 2 */}
            <div className="group relative rounded-2xl p-3 bg-gradient-to-b from-[#1C202B] to-[#0E1015] border border-vn-gold/40 hover:border-vn-gold shadow-xl hover:-translate-y-2 transition-all duration-500 delay-100">
              <div className="relative aspect-[4/3] rounded-xl bg-vn-charcoal/90 border border-dashed border-vn-gold/30 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <ImageIcon className="w-10 h-10 text-vn-gold/60 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs font-semibold uppercase tracking-wider text-vn-gold">
                  Tư liệu kinh tế 02
                </span>
                <span className="text-[11px] text-vn-ivory/60 mt-1">
                  Giao thương đường thủy, chợ nổi & kết nối liên vùng
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-3 text-center">
                <p className="font-heading italic text-xs text-vn-gold-antique">
                  Mảnh ghép: Mạng lưới lưu thông hàng hóa
                </p>
              </div>
            </div>

            {/* Ảnh 3 */}
            <div className="group relative rounded-2xl p-3 bg-gradient-to-b from-[#1C202B] to-[#0E1015] border border-vn-gold/40 hover:border-vn-gold shadow-xl hover:-translate-y-2 transition-all duration-500 delay-200">
              <div className="relative aspect-[4/3] rounded-xl bg-vn-charcoal/90 border border-dashed border-vn-gold/30 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <Globe2 className="w-10 h-10 text-vn-gold/60 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs font-semibold uppercase tracking-wider text-vn-gold">
                  Tư liệu kinh tế 03
                </span>
                <span className="text-[11px] text-vn-ivory/60 mt-1">
                  Thị trường dân tộc thống nhất thời kỳ hội nhập
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-3 text-center">
                <p className="font-heading italic text-xs text-vn-gold-antique">
                  Mảnh ghép: Nền kinh tế độc lập tự chủ
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* -------------------------------------------------------------
            PHẦN ③: CỘNG ĐỒNG VỀ VĂN HÓA VÀ NGÔN NGỮ
            3 khung ảnh xuất hiện mượt mà
            ------------------------------------------------------------- */}
        <section id="dac-trung-3" className="relative rounded-3xl bg-gradient-to-b from-[#13161D] to-[#0A0C10] border-2 border-vn-gold/50 p-6 sm:p-10 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.85)] mb-20 overflow-hidden">
          
          {/* Heading ③ */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-vn-gold/30 pb-8 mb-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-vn-jade via-[#1E4D3E] to-vn-charcoal border-2 border-vn-gold flex items-center justify-center shadow-[0_0_30px_rgba(31,78,63,0.5)] shrink-0">
              <span className="font-display font-black text-3xl sm:text-4xl text-vn-gold drop-shadow-md">
                ③
              </span>
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-vn-gold/15 border border-vn-gold/40 text-[10px] font-bold uppercase tracking-[0.25em] text-vn-gold mb-1.5">
                Đặc trưng bản thể thứ ba
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight text-glow-gold">
                Là Cộng đồng về văn hóa và ngôn ngữ
              </h2>
              <p className="text-sm text-vn-ivory/70 mt-1 max-w-2xl">
                Ngôn ngữ chung là công cụ giao tiếp thống nhất; nền văn hóa chung với tâm lý dân tộc đặc trưng thể hiện cốt cách, bản sắc ngàn đời của non sông gấm vóc.
              </p>
            </div>
          </div>

          {/* 3 KHUNG ẢNH XUẤT HIỆN MƯỢT MÀ */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Ảnh 1 */}
            <div className="group relative rounded-2xl p-3 bg-gradient-to-b from-[#1C202B] to-[#0E1015] border border-vn-gold/40 hover:border-vn-gold shadow-xl hover:-translate-y-2 transition-all duration-500">
              <div className="relative aspect-[4/3] rounded-xl bg-vn-charcoal/90 border border-dashed border-vn-gold/30 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <Languages className="w-10 h-10 text-vn-gold/60 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs font-semibold uppercase tracking-wider text-vn-gold">
                  Tư liệu văn hóa 01
                </span>
                <span className="text-[11px] text-vn-ivory/60 mt-1">
                  Tiếng nói và chữ viết — Cầu nối giao tiếp thống nhất quốc gia
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-3 text-center">
                <p className="font-heading italic text-xs text-vn-gold-antique">
                  Mảnh ghép: Tiếng Việt & chữ Quốc ngữ
                </p>
              </div>
            </div>

            {/* Ảnh 2 */}
            <div className="group relative rounded-2xl p-3 bg-gradient-to-b from-[#1C202B] to-[#0E1015] border border-vn-gold/40 hover:border-vn-gold shadow-xl hover:-translate-y-2 transition-all duration-500 delay-100">
              <div className="relative aspect-[4/3] rounded-xl bg-vn-charcoal/90 border border-dashed border-vn-gold/30 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <Sparkles className="w-10 h-10 text-vn-gold/60 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs font-semibold uppercase tracking-wider text-vn-gold">
                  Tư liệu văn hóa 02
                </span>
                <span className="text-[11px] text-vn-ivory/60 mt-1">
                  Trống đồng Đông Sơn & Hồn cốt văn hóa nghìn năm rực rỡ
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-3 text-center">
                <p className="font-heading italic text-xs text-vn-gold-antique">
                  Mảnh ghép: Di sản văn hóa vật thể
                </p>
              </div>
            </div>

            {/* Ảnh 3 */}
            <div className="group relative rounded-2xl p-3 bg-gradient-to-b from-[#1C202B] to-[#0E1015] border border-vn-gold/40 hover:border-vn-gold shadow-xl hover:-translate-y-2 transition-all duration-500 delay-200">
              <div className="relative aspect-[4/3] rounded-xl bg-vn-charcoal/90 border border-dashed border-vn-gold/30 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <Landmark className="w-10 h-10 text-vn-gold/60 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs font-semibold uppercase tracking-wider text-vn-gold">
                  Tư liệu văn hóa 03
                </span>
                <span className="text-[11px] text-vn-ivory/60 mt-1">
                  Tín ngưỡng thờ cúng Hùng Vương & Lễ hội non sông
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-3 text-center">
                <p className="font-heading italic text-xs text-vn-gold-antique">
                  Mảnh ghép: Tâm lý & Cội nguồn dân tộc
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* -------------------------------------------------------------
            KHỐI TRÍCH DẪN QUAN ĐIỂM CHỦ NGHĨA MÁC – LÊNIN (CHỮ MÀU NỔI)
            ------------------------------------------------------------- */}
        <section className="relative my-24 p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#171A24] via-[#0E1017] to-[#171A24] border-2 border-vn-gold/60 shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-radial from-vn-gold/20 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-vn-red-deep/40 border border-vn-gold/40 text-xs uppercase tracking-[0.3em] text-vn-gold font-bold mb-6">
              Nguyên lý Mác - Lênin về phương thức sản xuất
            </span>

            {/* Đoạn text theo yêu cầu (chữ màu nổi) */}
            <p className="font-heading text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              “Trong quan điểm của chủ nghĩa Mác – Lênin, dân tộc là quá trình phát triển lâu dài của xã hội loài người, trải qua các hình thức cộng đồng từ thấp đến cao, bao gồm: <span className="text-vn-gold font-bold underline decoration-vn-red decoration-2">thị tộc, bộ lạc, bộ tộc, dân tộc</span>. <span className="text-[#FFD700] font-semibold">Sự biến đổi của phương thức sản xuất chính là nguyên nhân quyết định sự biến đổi của cộng đồng dân tộc</span>.”
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------------
            CHUYỂN ĐỘNG: 5 MẢNH GHÉP - TẠO NÊN MỘT DÂN TỘC
            (Nền đỏ chữ vàng chữ nghiêng) + Sơ đồ 5 icon + Thu mở
            ------------------------------------------------------------- */}
        <section className="relative my-24 p-8 sm:p-14 rounded-3xl bg-[#0B0D12] border-2 border-vn-gold/60 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
          
          {/* BANNER NỀN ĐỎ CHỮ VÀNG CHỮ NGHIÊNG theo yêu cầu */}
          <div className="flex justify-center mb-12">
            <div className="px-8 sm:px-12 py-3.5 rounded-full bg-gradient-to-r from-[#8F1713] via-[#DA251D] to-[#8F1713] border-2 border-vn-gold shadow-[0_0_35px_rgba(218,37,29,0.7)] transform hover:scale-105 transition-transform">
              <h2 className="font-heading italic font-bold text-lg sm:text-2xl md:text-3xl text-vn-gold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                5 MẢNH GHÉP — TẠO NÊN MỘT DÂN TỘC
              </h2>
            </div>
          </div>

          <p className="text-center text-xs sm:text-sm text-vn-ivory/70 max-w-xl mx-auto mb-8 font-light">
            Sơ đồ hình thái học: 5 yếu tố cấu thành chỉnh thể dân tộc. Nhấn nút để xem hoạt cảnh thu - mở biến hóa thành hình bản đồ Tổ quốc.
          </p>

          {/* Nút kích hoạt hiệu ứng thu mở */}
          <div className="flex justify-center gap-3 mb-10">
            {puzzleState === 'expanded' ? (
              <button
                onClick={handleTriggerPuzzle}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-vn-gold text-vn-black font-display font-bold text-xs uppercase tracking-widest hover:bg-white shadow-[0_0_25px_rgba(255,205,0,0.5)] transition-all cursor-pointer"
              >
                <span>Thu gom 5 mảnh ghép → Mở ra Bản đồ Việt Nam</span>
                <Sparkles className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleResetPuzzle}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-vn-gold/50 bg-vn-charcoal text-vn-gold text-xs uppercase tracking-widest hover:bg-vn-black transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Xem lại sơ đồ 5 icon</span>
              </button>
            )}
          </div>

          {/* SƠ ĐỒ 5 ICON (Sắp xếp theo thứ tự yêu cầu:
              - Hàng 1: Lãnh thổ ở trên cùng
              - Hàng 2: Kinh tế và Ngôn ngữ
              - Hàng 3: Dân tộc ở chính giữa (ngay dưới Lãnh thổ)
              - Hàng 4: Văn hóa và Nhà nước (thẳng hàng lần lượt Kinh tế và Nhà nước)
          ) */}
          {puzzleState !== 'revealed' ? (
            <div className={`relative max-w-lg mx-auto py-8 transition-all duration-700 ease-in-out ${
              puzzleState === 'collapsed' ? 'scale-50 opacity-40 blur-sm' : 'scale-100 opacity-100'
            }`}>
              
              {/* Hàng 1: LÃNH THỔ (Trên cùng) */}
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-b from-[#222938] to-[#12151D] border-2 border-vn-gold shadow-lg w-36 text-center transform hover:scale-105 transition-transform">
                  <img src={iconPng} alt="Lãnh thổ" className="w-10 h-10 object-contain mb-1.5 filter drop-shadow" />
                  <span className="text-xs font-bold text-vn-gold uppercase">Lãnh Thổ</span>
                  <span className="text-[10px] text-vn-ivory/60">Không gian chung</span>
                </div>
              </div>

              {/* Hàng 2: KINH TẾ & NGÔN NGỮ */}
              <div className="flex justify-between items-center px-4 mb-6">
                {/* Kinh tế (Trái) */}
                <div className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-b from-[#222938] to-[#12151D] border-2 border-vn-gold shadow-lg w-36 text-center transform hover:scale-105 transition-transform">
                  <img src={iconPng} alt="Kinh tế" className="w-10 h-10 object-contain mb-1.5 filter drop-shadow" />
                  <span className="text-xs font-bold text-vn-gold uppercase">Kinh Tế</span>
                  <span className="text-[10px] text-vn-ivory/60">Thị trường gắn kết</span>
                </div>

                {/* Ngôn ngữ (Phải) */}
                <div className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-b from-[#222938] to-[#12151D] border-2 border-vn-gold shadow-lg w-36 text-center transform hover:scale-105 transition-transform">
                  <img src={iconPng} alt="Ngôn ngữ" className="w-10 h-10 object-contain mb-1.5 filter drop-shadow" />
                  <span className="text-xs font-bold text-vn-gold uppercase">Ngôn Ngữ</span>
                  <span className="text-[10px] text-vn-ivory/60">Giao tiếp thống nhất</span>
                </div>
              </div>

              {/* Hàng 3: DÂN TỘC (Ở chính giữa, đứng ngay dưới Lãnh thổ) */}
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center p-5 rounded-3xl bg-gradient-to-br from-vn-red-deep via-vn-red to-vn-red-dark border-3 border-vn-gold shadow-[0_0_35px_rgba(218,37,29,0.8)] w-44 text-center transform hover:scale-110 transition-transform">
                  <img src={iconPng} alt="Dân tộc" className="w-12 h-12 object-contain mb-1.5 filter drop-shadow-[0_0_10px_#FFCD00]" />
                  <span className="font-display font-black text-sm text-vn-gold uppercase tracking-wider">
                    DÂN TỘC
                  </span>
                  <span className="text-[10px] text-white/90 font-medium">Trung tâm quy tụ</span>
                </div>
              </div>

              {/* Hàng 4: VĂN HÓA & NHÀ NƯỚC (Thẳng hàng lần lượt Kinh tế và Ngôn ngữ) */}
              <div className="flex justify-between items-center px-4">
                {/* Văn hóa (Trái, thẳng hàng Kinh tế) */}
                <div className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-b from-[#222938] to-[#12151D] border-2 border-vn-gold shadow-lg w-36 text-center transform hover:scale-105 transition-transform">
                  <img src={iconPng} alt="Văn hóa" className="w-10 h-10 object-contain mb-1.5 filter drop-shadow" />
                  <span className="text-xs font-bold text-vn-gold uppercase">Văn Hóa</span>
                  <span className="text-[10px] text-vn-ivory/60">Tâm lý & cốt cách</span>
                </div>

                {/* Nhà nước (Phải, thẳng hàng Ngôn ngữ) */}
                <div className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-b from-[#222938] to-[#12151D] border-2 border-vn-gold shadow-lg w-36 text-center transform hover:scale-105 transition-transform">
                  <img src={iconPng} alt="Nhà nước" className="w-10 h-10 object-contain mb-1.5 filter drop-shadow" />
                  <span className="text-xs font-bold text-vn-gold uppercase">Nhà Nước</span>
                  <span className="text-[10px] text-vn-ivory/60">Thể chế pháp quyền</span>
                </div>
              </div>

            </div>
          ) : (
            /* HIỆU ỨNG MỞ RA HÌNH BẢN ĐỒ VIỆT NAM (BẢN ĐỒ ZOOM TO DẦN) */
            <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
              <div className="relative w-full max-w-[420px] aspect-[703/900] transform transition-transform duration-1000 scale-110 filter drop-shadow-[0_0_50px_rgba(255,205,0,0.5)]">
                <img 
                  src={mapTerritoryImg} 
                  alt="Bản đồ Việt Nam Zoom to dần" 
                  className="w-full h-full object-contain filter contrast-110"
                  onError={(e) => { e.target.src = '/images/ban-do-viet-nam.jpg'; }}
                />
              </div>
              <p className="font-heading italic text-base sm:text-lg text-vn-gold mt-6 text-center">
                5 mảnh ghép hòa quyện kết tinh thành dáng hình Tổ quốc hình chữ S muôn đời
              </p>
            </div>
          )}

        </section>

        {/* -------------------------------------------------------------
            CHUYỂN ĐỘNG TIẾP: CƯƠNG LĨNH DÂN TỘC CỦA V.I. LÊNIN
            BÌNH ĐẲNG — TỰ QUYẾT — LIÊN HIỆP
            ------------------------------------------------------------- */}
        <section className="relative my-24 py-16 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-vn-gold/15 border border-vn-gold/40 text-xs uppercase tracking-[0.3em] text-vn-gold font-bold mb-4">
            Văn kiện lý luận bất hủ
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-wide leading-none mb-12">
            “CƯƠNG LĨNH DÂN TỘC CỦA V.I. LÊNIN”
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#1E2330] to-[#0E1015] border-2 border-vn-gold shadow-[0_0_30px_rgba(255,205,0,0.3)] hover:scale-105 transition-transform duration-300">
              <span className="text-xs uppercase tracking-[0.25em] text-vn-ivory/60 font-semibold block mb-2">
                Nguyên tắc 01
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-vn-gold text-glow-gold">
                BÌNH ĐẲNG
              </h3>
              <p className="text-xs text-vn-ivory/70 mt-3 font-light leading-relaxed">
                Các dân tộc hoàn toàn bình đẳng về quyền lợi và nghĩa vụ trong mọi lĩnh vực đời sống.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-vn-red-deep/40 to-[#0E1015] border-2 border-vn-gold shadow-[0_0_35px_rgba(218,37,29,0.5)] hover:scale-105 transition-transform duration-300">
              <span className="text-xs uppercase tracking-[0.25em] text-vn-ivory/60 font-semibold block mb-2">
                Nguyên tắc 02
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white text-glow-gold">
                TỰ QUYẾT
              </h3>
              <p className="text-xs text-vn-ivory/70 mt-3 font-light leading-relaxed">
                Quyền tự quyết định con đường phát triển chính trị, kinh tế, xã hội độc lập.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#1E2330] to-[#0E1015] border-2 border-vn-gold shadow-[0_0_30px_rgba(255,205,0,0.3)] hover:scale-105 transition-transform duration-300">
              <span className="text-xs uppercase tracking-[0.25em] text-vn-ivory/60 font-semibold block mb-2">
                Nguyên tắc 03
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-vn-gold text-glow-gold">
                LIÊN HIỆP
              </h3>
              <p className="text-xs text-vn-ivory/70 mt-3 font-light leading-relaxed">
                Liên hiệp công nhân và quần chúng lao động tất cả các dân tộc vì độc lập và tiến bộ.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* -------------------------------------------------------------
          THIẾT KẾ CHUYỂN ĐỘNG CON THUYỀN THEO CUỘN CHUỘT
          (Dựa trên web mẫu: theo-dau-chan-bac-ww1i.vercel.app/#chapter-1911)
          Scroll container h-[320vh] với sticky h-screen
          ------------------------------------------------------------- */}
      <section 
        ref={boatSectionRef} 
        id="con-thuyen-lenin" 
        className="relative h-[320vh] bg-gradient-to-b from-[#080808] via-[#10141C] to-[#080808]"
      >
        <div className="sticky top-0 flex h-screen flex-col items-center justify-between overflow-hidden px-4 sm:px-8 py-10">
          
          {/* Nền sóng biển sương mờ mờ ảo */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(27,42,74,0.4)_0%,transparent_80%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-vn-black to-transparent" />

          {/* Tiêu đề chương phía trên */}
          <div className="relative z-20 text-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-vn-gold-antique font-semibold block mb-1">
              Hành Trình Lịch Sử · Cương Lĩnh Lênin
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-wide">
              CON THUYỀN CÁCH MẠNG QUA 3 MỐC THỜI ĐẠI
            </h2>
            <p className="text-xs text-vn-ivory/60 mt-1 font-mono">
              [ Lăn chuột xuống để điều khiển con thuyền rẽ sóng đi qua từng mốc ]
            </p>
          </div>

          {/* NỘI DUNG HIỆN RA THEO TỪNG MỐC Ở CHÍNH GIỮA MÀN HÌNH (LÀM NỔI BẬT NHƯ WEB SAMPLE) */}
          <div className="relative z-30 max-w-4xl mx-auto text-center px-4 sm:px-8 my-auto transition-all duration-500">
            
            {/* Huy hiệu mốc */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-vn-black/80 border border-vn-gold/50 text-xs uppercase tracking-widest text-vn-gold font-bold mb-4 shadow-xl backdrop-blur-md">
              {milestonesData[activeMilestoneIndex].badge}
            </div>

            {/* Chữ Mốc khổng lồ (BÌNH ĐẲNG / TỰ QUYẾT / LIÊN HIỆP) */}
            <h3 
              key={milestonesData[activeMilestoneIndex].title}
              className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white drop-shadow-[0_0_50px_rgba(255,205,0,0.6)] leading-none mb-6 animate-fadeIn"
            >
              {milestonesData[activeMilestoneIndex].title}
            </h3>

            {/* Đoạn text trích dẫn nổi bật ở giữa màn hình theo đúng yêu cầu */}
            <div className="p-6 sm:p-8 rounded-3xl bg-vn-black/90 border-2 border-vn-gold/60 shadow-[0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-xl">
              <blockquote className="font-heading italic text-lg sm:text-2xl md:text-3xl text-vn-ivory font-light leading-relaxed drop-shadow-md">
                “{milestonesData[activeMilestoneIndex].quote}”
              </blockquote>
            </div>

          </div>

          {/* DÒNG HẢI TRÌNH & CON THUYỀN Ở DƯỚI (DI CHUYỂN DỌC THEO LĂN CHUỘT) */}
          <div className="relative z-20 w-full max-w-4xl pb-4">
            
            {/* Đường timeline ngang */}
            <div className="relative h-1 w-full bg-white/20 rounded-full">
              
              {/* Vạch tiến trình đã đi qua */}
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-vn-gold-antique via-vn-gold to-vn-red rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, boatProgress * 100))}%` }}
              />

              {/* HÌNH VẼ KHỐI CON THUYỀN BẰNG SVG (Di chuyển theo boatProgress) */}
              <div 
                className="absolute bottom-1 z-30 -translate-x-1/2 pointer-events-none transition-all duration-150 ease-out"
                style={{ 
                  left: `${Math.min(94, Math.max(6, boatProgress * 100))}%`,
                  filter: 'drop-shadow(0 0 15px rgba(255,205,0,0.5))'
                }}
              >
                {/* Vector SVG Con thuyền cách mạng */}
                <svg viewBox="0 0 160 80" className="w-28 sm:w-36 h-auto">
                  <defs>
                    <linearGradient id="boatHull" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4A3423" />
                      <stop offset="100%" stopColor="#1C140E" />
                    </linearGradient>
                    <linearGradient id="boatSmoke" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#D4A72C" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFCD00" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Làn khói nhả ra từ ống khói */}
                  <path d="M72 26 C 68 12, 78 8, 74 2 C 86 6, 82 18, 90 24 Z" fill="url(#boatSmoke)" />
                  <path d="M88 26 C 85 14, 94 10, 92 3 C 102 8, 98 18, 104 25 Z" fill="url(#boatSmoke)" opacity="0.6" />

                  {/* Cột buồm và cánh buồm đỏ */}
                  <polygon points="46,14 70,24 46,34" fill="#DA251D" opacity="0.85" />
                  <line x1="46" y1="10" x2="46" y2="52" stroke="#FFCD00" strokeWidth="1.5" />

                  {/* Ống khói */}
                  <rect x="72" y="26" width="10" height="18" fill="#8F1713" stroke="#FFCD00" strokeWidth="0.8" />
                  <rect x="88" y="26" width="10" height="18" fill="#8F1713" stroke="#FFCD00" strokeWidth="0.8" />

                  {/* Thân ca bin tàu */}
                  <rect x="58" y="42" width="62" height="14" fill="#2D2218" stroke="#D4A72C" strokeWidth="1" rx="2" />
                  <rect x="66" y="36" width="46" height="10" fill="#1C140E" stroke="#D4A72C" strokeWidth="0.8" rx="1" />

                  {/* Thân tàu chính hình khối */}
                  <path d="M15 54 L 145 54 L 130 76 L 35 76 Z" fill="url(#boatHull)" stroke="#FFCD00" strokeWidth="1.2" />

                  {/* Cửa sổ mạn tàu phát sáng vàng */}
                  <circle cx="50" cy="64" r="2.5" fill="#FFCD00" />
                  <circle cx="68" cy="64" r="2.5" fill="#FFCD00" />
                  <circle cx="86" cy="64" r="2.5" fill="#FFCD00" />
                  <circle cx="104" cy="64" r="2.5" fill="#FFCD00" />
                  <circle cx="122" cy="64" r="2.5" fill="#FFCD00" />
                </svg>
              </div>

              {/* 3 Mốc trên timeline */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 rounded-full bg-vn-gold border-2 border-white shadow-lg" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-vn-gold border-2 border-white shadow-lg" />
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 rounded-full bg-vn-gold border-2 border-white shadow-lg" />
            </div>

            {/* Nhãn 3 mốc */}
            <div className="mt-4 flex w-full items-center justify-between text-xs sm:text-sm font-bold uppercase tracking-wider">
              <span className={`transition-colors ${activeMilestoneIndex === 0 ? 'text-vn-gold scale-110' : 'text-vn-ivory/60'}`}>
                1. BÌNH ĐẲNG
              </span>
              <span className={`transition-colors ${activeMilestoneIndex === 1 ? 'text-vn-gold scale-110' : 'text-vn-ivory/60'}`}>
                2. TỰ QUYẾT
              </span>
              <span className={`transition-colors ${activeMilestoneIndex === 2 ? 'text-vn-gold scale-110' : 'text-vn-ivory/60'}`}>
                3. LIÊN HIỆP
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          CHUYỂN ĐỘNG ĐẾN: ‘’BẢN SẮC DÂN TỘC’’
          Lấy lại phần 54 Dân tộc bản đồ (bấm vào vùng để xem, các dân tộc)
          ------------------------------------------------------------- */}
      <section id="ban-sac-dan-toc" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vn-red-deep/40 border border-vn-gold/40 text-xs uppercase tracking-[0.3em] text-vn-gold font-bold mb-3">
            <Sparkles className="w-4 h-4 text-vn-gold" />
            Không gian tương tác trực quan
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-wide">
            BẢN SẮC DÂN TỘC — 54 SẮC MÀU HỘI TỤ
          </h2>
          <p className="text-sm sm:text-base text-vn-ivory/70 mt-3 max-w-2xl mx-auto font-light">
            Khám phá 54 tộc người anh em trên khắp 6 vùng sinh thái văn hóa dọc theo dải đất hình chữ S. Bấm chọn từng vùng hoặc tỉnh thành để xem chi tiết.
          </p>
        </div>

        {/* TÍCH HỢP BẢN ĐỒ 54 DÂN TỘC TƯƠNG TÁC */}
        <div className="rounded-3xl bg-[#090B0F] border-2 border-vn-gold/50 shadow-[0_20px_70px_rgba(0,0,0,0.9)] p-4 sm:p-8">
          <InteractiveVietnamMap />
        </div>

        {/* CẦU NỐI VÀO TRIỂN LÃM CHÍNH 10 MỐC LỊCH SỬ */}
        <div className="text-center py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-vn-gold/80 mb-4">
            Bước vào toàn bộ không gian số hóa 10 mốc lịch sử Chương 6
          </p>
          <button
            onClick={() => navigate('/home')}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-vn-red-deep via-vn-red to-vn-red-deep border-2 border-vn-gold text-vn-gold font-display font-black text-base sm:text-xl uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(218,37,29,0.7)] hover:shadow-[0_0_70px_rgba(255,205,0,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>VÀO TRIỂN LÃM CHÍNH (10 MỐC LỊCH SỬ)</span>
            <ArrowRight className="w-5 h-5 text-vn-gold" />
          </button>
        </div>

      </section>

      {/* 5. MODAL LIGHTBOX XEM ẢNH LÃNH THỔ PHÓNG TO */}
      {isZoomModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn cursor-pointer"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img 
              src={mapTerritoryImg} 
              alt="Bản đồ Việt Nam phóng to" 
              className="max-h-[75vh] w-auto object-contain rounded-2xl border-2 border-vn-gold shadow-[0_0_60px_rgba(255,205,0,0.4)]"
            />
            <div className="mt-4 text-center">
              <h3 className="font-display font-bold text-xl text-vn-gold">
                Bản Đồ Lãnh Thổ Việt Nam Liền Một Dải
              </h3>
              <p className="text-xs text-vn-ivory/70 mt-1">
                Chứng tích thiêng liêng của Cộng đồng Dân tộc Việt Nam · Nhấn vào bất kỳ đâu để đóng
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-vn-gold/15 py-8 text-center text-xs text-vn-ivory/50">
        Triển Lãm Tương Tác Số 2D · Học phần Chủ nghĩa Xã hội Khoa học (MLN131) · ĐH FPT
      </footer>

    </div>
  );
}
