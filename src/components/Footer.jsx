import React from 'react';
import { ArrowUp, BookOpen, GitBranch, Heart, Shield, Globe } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-vn-black border-t border-vn-gold-antique/20 pt-16 pb-12 px-4 sm:px-6 text-vn-ivory">
      
      {/* Decorative top red-gold line */}
      <div className="red-gold-line max-w-6xl mx-auto mb-12 opacity-50" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        
        {/* Column 1: Project & Academic Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-display font-bold text-xl text-vn-gold">
              MLN131 · TRIỂN LÃM SỐ 2D
            </span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-vn-red/40 border border-vn-gold/40 text-vn-ivory">
              Nhánh 2D
            </span>
          </div>
          <p className="text-xs text-vn-ivory/70 leading-relaxed mb-4">
            Đề tài: <strong className="text-white">Chương 6: Vấn đề Dân tộc và Tôn giáo trong Thời kỳ Quá độ lên Chủ nghĩa Xã hội</strong>.
            Dự án nghiên cứu & ứng dụng công nghệ trực quan hóa bài giảng học phần Lý luận Chính trị.
          </p>
          <div className="text-[11px] text-vn-ivory/50 flex items-center gap-1.5 font-mono">
            <BookOpen className="w-3.5 h-3.5 text-vn-gold" />
            <span>Đại học FPT · Học kỳ 9</span>
          </div>
        </div>

        {/* Column 2: Textbook Citation */}
        <div>
          <h4 className="font-display font-bold text-base text-vn-gold uppercase tracking-wider mb-3">
            Nguồn Tư Liệu Chính Thống
          </h4>
          <p className="text-xs text-vn-ivory/70 leading-relaxed mb-2">
            📖 <strong>Giáo trình Chủ nghĩa Xã hội Khoa học</strong> (Dành cho bậc đại học hệ không chuyên lý luận chính trị), Bộ Giáo dục và Đào tạo, NXB Chính trị quốc gia Sự thật.
          </p>
          <p className="text-xs text-vn-ivory/70 leading-relaxed">
            📜 <strong>Hiến pháp nước CHXHCN Việt Nam (2013)</strong>, Luật Tín ngưỡng, tôn giáo (2016) và Văn kiện Đại hội đại biểu toàn quốc lần thứ XIII của Đảng.
          </p>
        </div>

        {/* Column 3: Dual Deployment & Vercel Info */}
        <div>
          <h4 className="font-display font-bold text-base text-vn-gold uppercase tracking-wider mb-3">
            Đa Nền Tảng Trực Tuyến
          </h4>
          <ul className="space-y-2 text-xs text-vn-ivory/70">
            <li className="flex items-center gap-2">
              <GitBranch className="w-3.5 h-3.5 text-vn-gold shrink-0" />
              <span><strong>Nhánh 'main':</strong> Bảo tàng 3D Three.js Không gian Ảo</span>
            </li>
            <li className="flex items-center gap-2">
              <GitBranch className="w-3.5 h-3.5 text-vn-red shrink-0" />
              <span><strong>Nhánh '2d':</strong> Triển lãm Cuộn Điện ảnh Số 2D (Hiện tại)</span>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Được cấu hình để host song song trên nền tảng Vercel</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto pt-8 border-t border-vn-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-vn-ivory/50">
        <div>
          © 2026 Nhóm Nghiên Cứu MLN131. Tự hào Bản sắc Dân tộc & Khối Đại Đoàn Kết Toàn Dân.
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-vn-charcoal border border-vn-gold-antique/30 text-vn-gold hover:text-white hover:bg-vn-red transition-all"
        >
          <span>Lên đầu trang</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

    </footer>
  );
}
