import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Maximize2, 
  Sparkles, 
  BookOpen, 
  RotateCcw
} from 'lucide-react';
import mapTerritoryImg from '../../Image/1. Ban do viet nam.jpg';
import iconPng from '../../Image/icon.png';
import InteractiveVietnamMap from './InteractiveVietnamMap';

// 5 YẾU TỐ CẤU THÀNH DÂN TỘC — HÌNH NGŨ GIÁC ĐỀU (REGULAR PENTAGON)
// Các góc cách đều nhau đúng 72° (-90°, -18°, 54°, 126°, 198°)
const PENTAGON_ELEMENTS = [
  {
    id: 'lanh-tho',
    name: 'LÃNH THỔ',
    angle: -90, // Đỉnh trên cùng (Top)
    color: '#EAB308',
    glow: 'rgba(234, 179, 8, 0.4)',
    // Icon hình ảnh Lãnh thổ: Biên cương, bản đồ, núi non
    renderIcon: () => (
      <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 fill-none">
        <circle cx="24" cy="24" r="22" fill="#1C212D" stroke="#FFCD00" strokeWidth="1.5" />
        <path d="M14 34 L22 22 L28 28 L34 18 L38 34 Z" fill="url(#goldGrad)" opacity="0.8" />
        <path d="M18 34 L24 26 L29 34 Z" fill="#DA251D" opacity="0.9" />
        <circle cx="34" cy="18" r="2.5" fill="#FFCD00" />
      </svg>
    )
  },
  {
    id: 'kinh-te',
    name: 'KINH TẾ',
    angle: -18, // Góc trên bên phải
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.4)',
    // Icon hình ảnh Kinh tế: Tiền tệ cổ, giao thương, mùa màng
    renderIcon: () => (
      <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 fill-none">
        <circle cx="24" cy="24" r="22" fill="#1C212D" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="13" stroke="#FFCD00" strokeWidth="1.8" />
        <rect x="21" y="21" width="6" height="6" fill="#DA251D" stroke="#FFCD00" strokeWidth="1.2" />
        <path d="M12 24 L16 24 M32 24 L36 24 M24 12 L24 16 M24 32 L24 36" stroke="#FFCD00" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'ngon-ngu',
    name: 'NGÔN NGỮ',
    angle: 54, // Góc dưới bên phải
    color: '#38BDF8',
    glow: 'rgba(56, 189, 248, 0.4)',
    // Icon hình ảnh Ngôn ngữ: Cuốn thư, tiếng nói & chữ viết
    renderIcon: () => (
      <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 fill-none">
        <circle cx="24" cy="24" r="22" fill="#1C212D" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M14 16 C18 14, 22 17, 24 18 C26 17, 30 14, 34 16 L34 32 C30 30, 26 33, 24 34 C22 33, 18 30, 14 32 Z" fill="#0C1929" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="24" y1="18" x2="24" y2="34" stroke="#FFCD00" strokeWidth="1.5" />
        <path d="M18 22 L22 22 M18 26 L22 26 M26 22 L30 22 M26 26 L30 26" stroke="#FFCD00" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'van-hoa',
    name: 'VĂN HÓA',
    angle: 126, // Góc dưới bên trái
    color: '#EF4444',
    glow: 'rgba(239, 68, 68, 0.4)',
    // Icon hình ảnh Văn hóa: Họa tiết Trống đồng Đông Sơn & Hoa sen
    renderIcon: () => (
      <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 fill-none">
        <circle cx="24" cy="24" r="22" fill="#1C212D" stroke="#EF4444" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="14" stroke="#FFCD00" strokeWidth="1.2" strokeDasharray="2 3" />
        <polygon points="24,14 26,22 34,24 26,26 24,34 22,26 14,24 22,22" fill="#DA251D" stroke="#FFCD00" strokeWidth="1" />
        <circle cx="24" cy="24" r="3" fill="#FFCD00" />
      </svg>
    )
  },
  {
    id: 'nha-nuoc',
    name: 'NHÀ NƯỚC',
    angle: 198, // Góc trên bên trái
    color: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.4)',
    // Icon hình ảnh Nhà nước: Tòa nhà thể chế pháp quyền, cột mốc chủ quyền
    renderIcon: () => (
      <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 fill-none">
        <circle cx="24" cy="24" r="22" fill="#1C212D" stroke="#A855F7" strokeWidth="1.5" />
        <path d="M14 22 L24 14 L34 22 Z" fill="#DA251D" stroke="#FFCD00" strokeWidth="1.2" />
        <rect x="16" y="22" width="16" height="12" fill="#111827" stroke="#A855F7" strokeWidth="1.2" />
        <line x1="19" y1="22" x2="19" y2="34" stroke="#FFCD00" strokeWidth="1.2" />
        <line x1="24" y1="22" x2="24" y2="34" stroke="#FFCD00" strokeWidth="1.2" />
        <line x1="29" y1="22" x2="29" y2="34" stroke="#FFCD00" strokeWidth="1.2" />
        <rect x="13" y="34" width="22" height="3" fill="#FFCD00" />
      </svg>
    )
  }
];

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
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  // --- PHẦN 5 MẢNH GHÉP (NGŨ GIÁC ĐỀU & QUY TỤ) ---
  const [absorbedIds, setAbsorbedIds] = useState([]); // Mảng chứa id các yếu tố đã bị kéo vào tâm
  const [animatingId, setAnimatingId] = useState(null);
  const [giantMapOpacity, setGiantMapOpacity] = useState(1);
  const giantMapSectionRef = useRef(null);

  // Bán kính ngũ giác đều
  const PENTAGON_RADIUS = 165; // px

  // Hàm quy tụ 1 yếu tố vào tâm
  const handleAbsorbElement = (id) => {
    if (absorbedIds.includes(id) || animatingId) return;
    setAnimatingId(id);
    setTimeout(() => {
      setAbsorbedIds((prev) => [...prev, id]);
      setAnimatingId(null);
    }, 450);
  };

  // Hàm quy tụ tất cả lần lượt
  const handleAbsorbAll = () => {
    PENTAGON_ELEMENTS.forEach((elem, idx) => {
      setTimeout(() => {
        setAbsorbedIds((prev) => (prev.includes(elem.id) ? prev : [...prev, elem.id]));
      }, idx * 250);
    });
  };

  // Hàm đặt lại 5 mảnh ghép
  const handleResetElements = () => {
    setAbsorbedIds([]);
    setAnimatingId(null);
  };

  const isAllAbsorbed = absorbedIds.length === PENTAGON_ELEMENTS.length;

  // Lắng nghe lăn chuột để làm bản đồ Việt Nam to đùng biến mất dần dần
  useEffect(() => {
    const handleScrollGiantMap = () => {
      if (!isAllAbsorbed || !giantMapSectionRef.current) return;
      const rect = giantMapSectionRef.current.getBoundingClientRect();
      const topOffset = rect.top;
      if (topOffset < 150) {
        // Cuộn xuống qua khỏi màn hình -> opacity giảm dần về 0
        const opacity = Math.max(0, Math.min(1, (topOffset + 300) / 450));
        setGiantMapOpacity(opacity);
      } else {
        setGiantMapOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScrollGiantMap, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollGiantMap);
  }, [isAllAbsorbed]);

  // --- PHẦN CON THUYỀN LÊNIN (WHEEL-INTERCEPT SCROLL LOCK) ---
  // Khi section thuyền vào viewport:
  //   - Bắt event wheel/touch, NGĂN không cho trang cuộn (e.preventDefault())
  //   - Thay vào đó tăng/giảm boatProgress (0.0 -> 1.0)
  //   - Chỉ nhả khóa trang khi progress >= 1 (đã qua mốc 3 "Liên hiệp")
  const boatSectionRef = useRef(null);
  const [boatProgress, setBoatProgress] = useState(0); // 0.0 -> 1.0
  const boatProgressRef = useRef(0); // ref để đọc trong closure không stale
  const boatLockedRef = useRef(false); // ref để biết đang khóa hay không
  const touchStartYRef = useRef(0);

  useEffect(() => {
    const SCROLL_SENSITIVITY = 0.0015; // mỗi px deltaY tăng bao nhiêu progress

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
      // Khi đã xong hết 3 mốc và người dùng cuộn xuống -> mở khóa
      if (boatProgressRef.current >= 1 && e.deltaY > 0) return;
      // Khi người dùng cuộn lên trong khi progress = 0 -> mở khóa (cho cuộn lên)
      if (boatProgressRef.current <= 0 && e.deltaY < 0) return;

      // Ngăn trang cuộn
      e.preventDefault();
      e.stopPropagation();

      // Cập nhật progress
      const delta = e.deltaY * SCROLL_SENSITIVITY;
      const next = Math.max(0, Math.min(1, boatProgressRef.current + delta));
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
  if (boatProgress >= 0.66) {
    activeMilestoneIndex = 2; // Liên hiệp
  } else if (boatProgress >= 0.33) {
    activeMilestoneIndex = 1; // Tự quyết
  }
  const activeData = LENIN_MILESTONES[activeMilestoneIndex];
  const boatLeft = 8 + boatProgress * 84; // 8% -> 92%

  return (
    <div className="relative min-h-screen w-full bg-[#07080A] text-[#F5EFE6] selection:bg-vn-red selection:text-vn-gold overflow-x-hidden">
      
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
        className="fixed inset-0 pointer-events-none opacity-20 mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/stars.webp)' }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_15%,rgba(143,23,19,0.22)_0%,rgba(7,8,10,0.98)_80%)]" />
      <div className="film-grain pointer-events-none" />
      <div className="film-vignette pointer-events-none" />

      {/* THANH NAVIGATION TOP */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-vn-black/85 border-b border-vn-gold/25 px-4 sm:px-8 py-3 flex items-center justify-between">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-vn-gold-antique hover:text-vn-gold transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Màn hình mở đầu</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vn-charcoal/90 border border-vn-gold/30 text-[11px] font-semibold uppercase tracking-[0.25em] text-vn-gold">
          <BookOpen className="w-3.5 h-3.5 text-vn-gold" />
          <span>Chương 6 · Vấn Đề Dân Tộc & Tôn Giáo</span>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-vn-gold/40 bg-vn-red-deep/40 text-xs font-semibold uppercase tracking-widest text-vn-gold hover:bg-vn-red-deep hover:text-white transition group"
        >
          <span>Triển lãm 2D</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </header>

      {/* NỘI DUNG CHÍNH */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* TIÊU ĐỀ: DÂN TỘC LÀ GÌ? (Đã bỏ toàn bộ text nhỏ ở dưới) */}
        <div className="relative mb-14 sm:mb-20 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs uppercase tracking-widest text-vn-gold/80 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-vn-red animate-pulse" />
            <span>Khái niệm căn bản môn MLN131</span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,205,0,0.4)] leading-none">
            DÂN TỘC LÀ GÌ?
          </h1>

          <div className="w-full h-px bg-gradient-to-r from-vn-gold/60 via-vn-red/40 to-transparent mt-8" />
        </div>

        {/* -------------------------------------------------------------
            PHẦN ①: LÀ CỘNG ĐỒNG VỀ LÃNH THỔ
            (Chỉ để mỗi ảnh map Việt Nam và câu nói của Bác Hồ, bỏ hết text giải thích)
            ------------------------------------------------------------- */}
        <section id="dac-trung-1" className="relative rounded-3xl bg-gradient-to-b from-[#13161D] to-[#0A0C10] border-2 border-vn-gold/60 p-6 sm:p-10 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.85)] mb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(255,205,0,0.12)_0%,transparent_70%)] pointer-events-none" />

          {/* Heading ① */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-vn-gold/30 pb-6 mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-vn-red-deep via-vn-red to-vn-red-dark border-2 border-vn-gold flex items-center justify-center shadow-[0_0_30px_rgba(218,37,29,0.6)] shrink-0">
              <span className="font-display font-black text-2xl sm:text-3xl text-vn-gold drop-shadow-md">
                ①
              </span>
            </div>

            <div>
              <div className="inline-block px-3 py-0.5 rounded-full bg-vn-gold/15 border border-vn-gold/40 text-[10px] font-bold uppercase tracking-[0.25em] text-vn-gold mb-1">
                Đặc trưng bản thể cốt lõi số một
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight text-glow-gold">
                Là Cộng đồng về lãnh thổ
              </h2>
            </div>
          </div>

          {/* CHỈ ĐỂ MỖI ẢNH MAP VIỆT NAM VÀ ĐỂ LẠI CÂU NÓI CỦA BÁC */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Ảnh Bản Đồ Việt Nam */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                className="relative group w-full max-w-[460px] rounded-2xl p-3 bg-gradient-to-b from-[#1E232F] to-[#0E1015] border-2 border-vn-gold/60 shadow-[0_15px_50px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer"
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
                <div className="mt-3 px-2 pb-1 text-center">
                  <p className="font-heading italic text-xs text-vn-gold-antique">
                    Bản đồ Lãnh thổ & Chủ quyền Quốc gia Việt Nam liền một dải
                  </p>
                </div>
              </div>
            </div>

            {/* Câu nói của Bác Hồ trang trọng */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-vn-red-deep/40 via-vn-black/90 to-[#10141C] border-2 border-vn-gold/60 shadow-[0_0_50px_rgba(218,37,29,0.35)] backdrop-blur-xl">
                <Sparkles className="w-8 h-8 text-vn-gold mb-4 animate-pulse" />
                <blockquote className="font-heading italic text-xl sm:text-2xl md:text-3xl text-white font-normal leading-relaxed drop-shadow-md">
                  “Nước Việt Nam là một, dân tộc Việt Nam là một. Sông có thể cạn, núi có thể mòn, song chân lý ấy không bao giờ thay đổi.”
                </blockquote>
                <div className="mt-6 flex items-center justify-between border-t border-vn-gold/30 pt-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-vn-gold/70">
                    Chân lý độc lập chủ quyền
                  </span>
                  <span className="text-sm font-display font-bold uppercase tracking-wider text-vn-gold">
                    — Chủ tịch Hồ Chí Minh
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* -------------------------------------------------------------
            KHỐI TRÍCH DẪN QUAN ĐIỂM CHỦ NGHĨA MÁC – LÊNIN (CHỮ MÀU NỔI)
            ------------------------------------------------------------- */}
        <section className="relative my-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#171A24] via-[#0E1017] to-[#171A24] border-2 border-vn-gold/60 shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-radial from-vn-gold/20 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-vn-red-deep/40 border border-vn-gold/40 text-xs uppercase tracking-[0.3em] text-vn-gold font-bold mb-5">
              Quy luật hình thành & phát triển dân tộc
            </span>

            <p className="font-heading text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              “Trong quan điểm của chủ nghĩa Mác – Lênin, dân tộc là quá trình phát triển lâu dài của xã hội loài người, trải qua các hình thức cộng đồng từ thấp đến cao, bao gồm: <span className="text-vn-gold font-bold underline decoration-vn-red decoration-2">thị tộc, bộ lạc, bộ tộc, dân tộc</span>. <span className="text-[#FFD700] font-semibold">Sự biến đổi của phương thức sản xuất chính là nguyên nhân quyết định sự biến đổi của cộng đồng dân tộc</span>.”
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------------
            5 MẢNH GHÉP — TẠO NÊN MỘT DÂN TỘC (NỀN ĐỎ CHỮ VÀNG CHỮ NGHIÊNG)
            HÌNH NGŨ GIÁC ĐỀU VỚI BOX "DÂN TỘC" NẰM Ở CHÍNH GIỮA.
            ANIMATION KÉO/CLICK TỪNG YẾU TỐ QUY TỤ VÀO DÂN TỘC -> BIẾN MẤT.
            KHI ĐỦ 5 YẾU TỐ -> BẢN ĐỒ VIỆT NAM HIỆN RA TO ĐÙNG, LĂN CHUỘT THÌ MỜ DẦN.
            ------------------------------------------------------------- */}
        <section className="relative my-20 p-6 sm:p-12 rounded-3xl bg-[#090B10] border-2 border-vn-gold/60 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
          
          {/* BANNER NỀN ĐỎ CHỮ VÀNG CHỮ NGHIÊNG */}
          <div className="flex justify-center mb-6">
            <div className="px-8 sm:px-12 py-3.5 rounded-full bg-gradient-to-r from-[#8F1713] via-[#DA251D] to-[#8F1713] border-2 border-vn-gold shadow-[0_0_35px_rgba(218,37,29,0.7)]">
              <h2 className="font-heading italic font-bold text-lg sm:text-2xl md:text-3xl text-vn-gold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                5 MẢNH GHÉP — TẠO NÊN MỘT DÂN TỘC
              </h2>
            </div>
          </div>

          <p className="text-center text-xs sm:text-sm text-vn-ivory/80 max-w-xl mx-auto mb-6 font-light">
            Nhấp hoặc kéo từng mảnh ghép bên ngoài quy tụ vào trung tâm <strong className="text-vn-gold">DÂN TỘC</strong>. Cứ mỗi yếu tố hòa nhập sẽ biến mất và tích hợp vào bản thể quốc gia.
          </p>

          {/* THANH ĐIỀU KHIỂN & ĐẾM TIẾN ĐỘ */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="px-3.5 py-1 rounded-full bg-vn-charcoal border border-vn-gold/40 text-xs font-mono font-bold text-vn-gold">
              Đã hội tụ: {absorbedIds.length} / 5 yếu tố
            </span>
            {!isAllAbsorbed && (
              <button
                onClick={handleAbsorbAll}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-vn-gold/20 border border-vn-gold text-vn-gold hover:bg-vn-gold hover:text-vn-black text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quy tụ tất cả 5 yếu tố</span>
              </button>
            )}
            {absorbedIds.length > 0 && (
              <button
                onClick={handleResetElements}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/50 border border-vn-ivory/20 text-vn-ivory/70 hover:text-white text-xs transition-colors"
                title="Đặt lại"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại</span>
              </button>
            )}
          </div>

          {/* SÂN KHẤU HÌNH NGŨ GIÁC ĐỀU (REGULAR PENTAGON STAGE) */}
          <div className="relative w-full max-w-[500px] h-[440px] sm:h-[480px] mx-auto flex items-center justify-center select-none">
            
            {/* Vòng tròn ngũ giác kết nối huyền ảo */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-250 -240 500 480">
              {/* Vòng hào quang quỹ đạo */}
              <circle cx="0" cy="0" r={PENTAGON_RADIUS} fill="none" stroke="rgba(255,205,0,0.18)" strokeWidth="1.5" strokeDasharray="3 4" />
              
              {/* Các đường line nối từ 5 đỉnh vào tâm Dân tộc */}
              {PENTAGON_ELEMENTS.map((elem) => {
                const isAbsorbed = absorbedIds.includes(elem.id);
                const rad = (elem.angle * Math.PI) / 180;
                const x = PENTAGON_RADIUS * Math.cos(rad);
                const y = PENTAGON_RADIUS * Math.sin(rad);
                return (
                  <line 
                    key={`line-${elem.id}`}
                    x1="0" 
                    y1="0" 
                    x2={x} 
                    y2={y} 
                    stroke={isAbsorbed ? "rgba(218,37,29,0.5)" : "rgba(255,205,0,0.3)"} 
                    strokeWidth={isAbsorbed ? "2" : "1.2"}
                    strokeDasharray={isAbsorbed ? "none" : "2 3"}
                  />
                );
              })}
            </svg>

            {/* 1. BOX DÂN TỘC NẰM Ở CHÍNH GIỮA (TÂM NGŨ GIÁC) */}
            <div 
              className={`absolute z-20 w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#8F1713] via-[#DA251D] to-[#5C0D0A] border-4 border-vn-gold flex flex-col items-center justify-center text-center p-3 transition-all duration-500 shadow-[0_0_40px_rgba(218,37,29,0.7)] ${
                animatingId ? 'scale-110 shadow-[0_0_60px_rgba(255,205,0,0.9)]' : 'scale-100'
              }`}
            >
              <img 
                src={iconPng} 
                alt="Dân Tộc" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain mb-1 filter drop-shadow-[0_0_8px_#FFCD00]" 
              />
              <span className="font-display font-black text-sm sm:text-base text-vn-gold uppercase tracking-wider drop-shadow-md">
                DÂN TỘC
              </span>
              <span className="text-[10px] text-white/90 font-medium">
                Tâm điểm quy tụ
              </span>
            </div>

            {/* 2. 5 YẾU TỐ NGOÀI DÂN TỘC TẠO THÀNH HÌNH NGŨ GIÁC ĐỀU */}
            {PENTAGON_ELEMENTS.map((elem) => {
              const isAbsorbed = absorbedIds.includes(elem.id);
              const isAnimating = animatingId === elem.id;
              const rad = (elem.angle * Math.PI) / 180;
              const x = PENTAGON_RADIUS * Math.cos(rad);
              const y = PENTAGON_RADIUS * Math.sin(rad);

              if (isAbsorbed) return null; // Cứ khi kéo/quy tụ vào Dân tộc thì sẽ biến mất

              return (
                <div
                  key={elem.id}
                  onClick={() => handleAbsorbElement(elem.id)}
                  style={{
                    transform: isAnimating 
                      ? 'translate(0px, 0px) scale(0.2)' 
                      : `translate(${x}px, ${y}px) scale(1)`,
                    opacity: isAnimating ? 0 : 1,
                    transition: isAnimating 
                      ? 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s ease-out' 
                      : 'transform 0.2s ease-out, box-shadow 0.2s',
                    boxShadow: `0 0 25px ${elem.glow}`
                  }}
                  className="absolute z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#1C2230] to-[#0E121A] border-2 border-vn-gold flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:scale-110 active:scale-95 group"
                  title={`Nhấp để quy tụ ${elem.name} vào Dân tộc`}
                >
                  <div className="group-hover:scale-110 transition-transform">
                    {elem.renderIcon()}
                  </div>
                  <span className="text-[11px] sm:text-xs font-display font-bold text-white group-hover:text-vn-gold uppercase tracking-wider mt-1">
                    {elem.name}
                  </span>
                  <span className="text-[9px] text-vn-gold/70 uppercase tracking-widest font-mono">
                    [Thu vào]
                  </span>
                </div>
              );
            })}

          </div>

          {/* 3. HIỆU ỨNG BẢN ĐỒ VIỆT NAM HIỆN RA TO ĐÙNG KHI KÉO ĐỦ HẾT 5 YẾU TỐ
                 VÀ BIẾN MẤT DẦN DẦN KHI LĂN CHUỘT XUỐNG */}
          {isAllAbsorbed && (
            <div 
              ref={giantMapSectionRef}
              style={{ opacity: giantMapOpacity }}
              className="mt-12 pt-8 border-t-2 border-vn-gold/40 flex flex-col items-center justify-center animate-fadeIn transition-opacity duration-300"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-vn-red via-vn-red-deep to-vn-red border-2 border-vn-gold text-vn-gold text-xs sm:text-sm font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(218,37,29,0.8)] mb-6 animate-pulse">
                <Sparkles className="w-4 h-4 text-vn-gold" />
                <span>5 Yếu Tố Đã Hòa Quyện — Kết Tinh Thành Non Sông Liền Một Dải</span>
              </div>

              {/* BẢN ĐỒ TO ĐÙNG TRÊN MÀN HÌNH */}
              <div className="relative w-full max-w-[700px] aspect-[703/900] rounded-3xl p-4 bg-gradient-to-b from-[#171B26] to-[#090B0E] border-3 border-vn-gold shadow-[0_0_90px_rgba(255,205,0,0.6)] overflow-hidden">
                <img 
                  src={mapTerritoryImg} 
                  alt="Bản đồ Việt Nam hiện ra to đùng" 
                  className="w-full h-full object-contain filter contrast-110 drop-shadow-[0_0_30px_rgba(255,205,0,0.5)] transform hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = '/images/ban-do-viet-nam.jpg'; }}
                />
              </div>

              <p className="font-heading italic text-base sm:text-xl text-vn-gold mt-6 text-center">
                “Lãnh thổ — Kinh tế — Văn hóa — Ngôn ngữ — Thể chế nhà nước quy tụ tạo nên Dân tộc Việt Nam muôn đời”
              </p>
              <span className="text-xs text-vn-ivory/60 mt-1 font-mono">
                [ Lăn chuột xuống dưới để tiếp tục hải trình — Bản đồ sẽ mờ dần ]
              </span>
            </div>
          )}

        </section>

      </main>

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
        <div className="sticky top-0 flex h-screen flex-col items-center justify-between overflow-hidden px-4 sm:px-8 py-10">
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
          <div className="relative z-30 max-w-4xl w-full mx-auto text-center px-4 my-auto">
            
            {/* Chữ đại diện to trên màn hình (viết hoa chữ đầu: "Bình đẳng", "Tự quyết", "Liên hiệp") */}
            <h3 
              key={activeData.title}
              className="font-display font-bold text-6xl sm:text-8xl md:text-9xl tracking-tight text-white drop-shadow-[0_0_60px_rgba(255,205,0,0.7)] leading-none mb-6 animate-fadeIn"
            >
              {activeData.title}
            </h3>

            {/* Hộp trích dẫn nội dung nguyên tắc nổi bật */}
            <div className="p-6 sm:p-10 rounded-3xl bg-vn-black/90 border-2 border-vn-gold shadow-[0_20px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-300">
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
                className="absolute bottom-4 sm:bottom-5 z-30 -translate-x-1/2 pointer-events-none transition-all duration-75 ease-out"
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
      <section id="ban-sac-dan-toc" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="text-center mb-12">
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

      {/* MODAL LIGHTBOX XEM ẢNH LÃNH THỔ PHÓNG TO */}
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
