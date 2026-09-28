import React, { useState } from 'react';
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
  Globe2
} from 'lucide-react';
import mapTerritoryImg from '../../Image/1. Ban do viet nam.jpg';

export default function DanTocInfo() {
  const navigate = useNavigate();
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-[#08090C] text-[#F5EFE6] selection:bg-vn-red selection:text-vn-gold overflow-x-hidden">
      
      {/* 1. Lớp nền bảo tàng điện ảnh */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/stars.webp)' }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_20%,rgba(143,23,19,0.22)_0%,rgba(8,9,12,0.98)_80%)]" />
      <div className="film-grain pointer-events-none" />
      <div className="film-vignette pointer-events-none" />

      {/* 2. Top Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-vn-black/80 border-b border-vn-gold/25 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-vn-gold-antique hover:text-vn-gold transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Màn hình mở đầu</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vn-charcoal/80 border border-vn-gold/30 text-[11px] font-semibold uppercase tracking-[0.25em] text-vn-gold">
          <BookOpen className="w-3.5 h-3.5 text-vn-gold" />
          <span>Chương 6 · MLN131</span>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-vn-gold hover:text-white transition group"
        >
          <span>Vào Triển Lãm</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </header>

      {/* 3. Main Content Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Breadcrumb & Section Eyebrow */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-vn-gold/80 mb-4">
          <span className="w-2 h-2 rounded-full bg-vn-red animate-pulse" />
          <span>Lý Luận Mác - Lênin Về Vấn Đề Dân Tộc</span>
        </div>

        {/* TIÊU ĐỀ CHÍNH: DÂN TỘC LÀ GÌ? */}
        <div className="relative mb-14 sm:mb-20">
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,205,0,0.4)] leading-none">
            DÂN TỘC LÀ GÌ?
          </h1>

          <p className="mt-6 max-w-3xl font-heading text-lg sm:text-2xl text-vn-gold font-light italic leading-relaxed">
            “Dân tộc là hình thức cộng đồng người ổn định, phát triển cao nhất trong lịch sử nhân loại, hình thành trên cơ sở gắn kết chặt chẽ của các yếu tố lãnh thổ, kinh tế, ngôn ngữ, văn hóa và thể chế.”
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-vn-ivory/70">
            <span className="px-3.5 py-1.5 rounded-full bg-vn-charcoal border border-vn-gold/30 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-vn-gold" /> Nghĩa rộng: Quốc gia dân tộc (Nation)
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-vn-charcoal border border-vn-gold/30 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-vn-gold" /> Nghĩa hẹp: Tộc người (Ethnic group)
            </span>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-vn-gold/60 via-vn-red/40 to-transparent mt-10" />
        </div>

        {/* PHẦN HEADING QUAN TRỌNG NHẤT: ① LÀ CỘNG ĐỒNG VỀ LÃNH THỔ */}
        <section className="relative rounded-3xl bg-gradient-to-b from-[#13161D] to-[#0A0C10] border-2 border-vn-gold/60 p-6 sm:p-10 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.85)] mb-16 overflow-hidden">
          
          {/* Spotlight Effect góc trên */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(255,205,0,0.12)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_left,rgba(218,37,29,0.15)_0%,transparent_70%)] pointer-events-none" />

          {/* Heading đặc biệt quan trọng */}
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

          {/* Nội dung kết hợp giữa Tư liệu Hình ảnh Bản đồ và Phân tích Học thuật */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Cột Trái: Ảnh Bản đồ Việt Nam (từ path Image/1. Ban do viet nam.jpg) trong khung tranh di sản */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                className="relative group w-full max-w-[460px] rounded-2xl p-3 bg-gradient-to-b from-[#1E232F] to-[#0E1015] border-2 border-vn-gold/50 shadow-[0_15px_50px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer"
                onClick={() => setIsZoomModalOpen(true)}
              >
                {/* Ánh sáng quét qua khi hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-vn-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Khung ảnh bản đồ */}
                <div className="relative overflow-hidden rounded-xl bg-vn-black aspect-[3/4] flex items-center justify-center">
                  <img 
                    src={mapTerritoryImg} 
                    alt="Bản đồ lãnh thổ Việt Nam liền một dải" 
                    className="w-full h-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      // Fallback nếu ảnh static path
                      e.target.src = '/images/ban-do-viet-nam.jpg';
                    }}
                  />
                  
                  {/* Badge nút phóng to */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-vn-black/85 border border-vn-gold/50 text-vn-gold text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Xem toàn màn hình</span>
                  </div>
                </div>

                {/* Chú thích hiện vật tư liệu */}
                <div className="mt-3.5 px-2 pb-1 text-center">
                  <p className="font-heading italic text-sm text-vn-gold-antique">
                    Tư liệu số: Bản đồ Lãnh thổ & Chủ quyền Quốc gia Việt Nam
                  </p>
                  <p className="text-[11px] text-vn-ivory/60 mt-1 font-sans">
                    Không gian địa lý thống nhất, toàn vẹn từ đất liền đến vùng trời, vùng biển và các quần đảo
                  </p>
                </div>
              </div>
            </div>

            {/* Cột Phải: Luận điểm triết học sâu sắc & Trích dẫn bất hủ */}
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
                  <span>Chủ quyền trọn vẹn non sông</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-vn-ivory/85">
                  Lãnh thổ của dân tộc Việt Nam bao gồm toàn vẹn <strong>vùng đất, vùng trời, vùng biển, thềm lục địa</strong> và hệ thống hải đảo tiền tiêu, tiêu biểu là hai quần đảo thiêng liêng <strong>Hoàng Sa và Trường Sa</strong>.
                </p>
              </div>

              {/* Trích dẫn kinh điển của Chủ tịch Hồ Chí Minh */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-r from-vn-red-deep/30 to-vn-black/80 border-l-4 border-vn-gold border-y border-r border-vn-gold/20 shadow-xl">
                <Sparkles className="w-5 h-5 text-vn-gold mb-2" />
                <blockquote className="font-heading italic text-base sm:text-lg text-vn-ivory font-light leading-relaxed">
                  “Nước Việt Nam là một, dân tộc Việt Nam là một. Sông có thể cạn, núi có thể mòn, song chân lý ấy không bao giờ thay đổi.”
                </blockquote>
                <div className="mt-3 text-xs uppercase tracking-widest text-vn-gold font-bold text-right">
                  — Chủ tịch Hồ Chí Minh (1946)
                </div>
              </div>

            </div>

          </div>

          {/* Các đặc trưng khác của Dân tộc theo Mác - Lênin (Hệ thống hóa) */}
          <div className="mt-12 pt-8 border-t border-vn-gold/20">
            <p className="text-xs uppercase tracking-[0.25em] text-vn-gold-antique font-semibold mb-4 text-center sm:text-left">
              Hệ thống 5 đặc trưng bản thể của Dân tộc:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-vn-red-deep/30 border border-vn-gold/50 text-vn-gold font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vn-gold shrink-0" />
                <span>① Cộng đồng về lãnh thổ</span>
              </div>
              <div className="p-3.5 rounded-xl bg-vn-charcoal/70 border border-vn-gold/20 text-vn-ivory/80 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-vn-black border border-vn-gold/40 flex items-center justify-center text-[10px] text-vn-gold">②</span>
                <span>Cộng đồng về kinh tế</span>
              </div>
              <div className="p-3.5 rounded-xl bg-vn-charcoal/70 border border-vn-gold/20 text-vn-ivory/80 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-vn-black border border-vn-gold/40 flex items-center justify-center text-[10px] text-vn-gold">③</span>
                <span>Cộng đồng về ngôn ngữ</span>
              </div>
              <div className="p-3.5 rounded-xl bg-vn-charcoal/70 border border-vn-gold/20 text-vn-ivory/80 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-vn-black border border-vn-gold/40 flex items-center justify-center text-[10px] text-vn-gold">④-⑤</span>
                <span>Văn hóa & Nhà nước pháp quyền</span>
              </div>
            </div>
          </div>

        </section>

        {/* 4. KHỐI ĐIỀU HƯỚNG BƯỚC VÀO TOÀN BỘ TRIỂN LÃM CHƯƠNG 6 */}
        <div className="text-center py-8">
          <p className="text-xs uppercase tracking-[0.3em] text-vn-gold/80 mb-3">
            Sẵn sàng khám phá toàn cảnh 10 mốc lịch sử & không gian số 2D
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/home')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-vn-red-deep via-vn-red to-vn-red-deep border-2 border-vn-gold text-vn-gold font-display font-black text-base sm:text-lg uppercase tracking-[0.18em] shadow-[0_0_40px_rgba(218,37,29,0.7)] hover:shadow-[0_0_60px_rgba(255,205,0,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>VÀO KHÔNG GIAN TRIỂN LÃM 2D (CHƯƠNG 6)</span>
              <ArrowRight className="w-5 h-5 text-vn-gold" />
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-vn-gold/40 bg-vn-charcoal/80 text-vn-ivory/80 text-sm font-semibold hover:border-vn-gold hover:text-vn-gold transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Xem lại hoạt cảnh bản đồ</span>
            </Link>
          </div>
        </div>

      </main>

      {/* 5. MODAL XEM ẢNH TOÀN MÀN HÌNH (LIGHTBOX) */}
      {isZoomModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
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

      {/* Footer bản quyền */}
      <footer className="border-t border-vn-gold/15 py-6 text-center text-xs text-vn-ivory/50">
        Triển Lãm Tương Tác Số 2D · Học phần Chủ nghĩa Xã hội Khoa học (MLN131) · ĐH FPT
      </footer>

    </div>
  );
}
