import React from 'react';
import { ChevronDown, Sparkles, BookOpen, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center overflow-hidden">
      
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-vn-red-deep/30 via-vn-black to-vn-black -z-20" />
      
      {/* Spinning Dong Son drum motif watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] -z-10 pointer-events-none opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow fill-none stroke-vn-gold">
          {/* Concentric rings */}
          <circle cx="50" cy="50" r="48" strokeWidth="0.5" strokeDasharray="1 1"/>
          <circle cx="50" cy="50" r="42" strokeWidth="0.8"/>
          <circle cx="50" cy="50" r="35" strokeWidth="0.4" strokeDasharray="2 1"/>
          <circle cx="50" cy="50" r="28" strokeWidth="0.8"/>
          <circle cx="50" cy="50" r="18" strokeWidth="0.4"/>
          <circle cx="50" cy="50" r="10" strokeWidth="0.6"/>
          {/* Central sun star 14 rays */}
          <polygon 
            points="50,40 52,48 59,43 54,49 61,52 54,54 57,60 51,55 50,62 48,55 42,60 45,54 38,52 45,49 40,43 47,48" 
            fill="#FFCD00" 
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center z-10">
        
        {/* Academic context tags */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vn-red-deep/40 border border-vn-gold/40 text-vn-gold text-xs uppercase tracking-cinematic mb-6 shadow-lg shadow-vn-red-deep/30">
          <Sparkles className="w-3.5 h-3.5 text-vn-gold animate-pulse" />
          <span>Giáo trình CNXHKH · Chương 6 · Triển lãm số 2D</span>
        </div>

        {/* Main Title with Cormorant Garamond display */}
        <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-4">
          <span className="text-white drop-shadow-md">VẤN ĐỀ </span>
          <span className="gold-gradient-text text-glow-gold">DÂN TỘC</span>
          <br className="hidden sm:inline" />
          <span className="text-white"> & </span>
          <span className="text-vn-red drop-shadow-lg text-glow-red">TÔN GIÁO</span>
        </h1>

        {/* Subtitle */}
        <p className="font-heading italic text-lg sm:text-2xl md:text-3xl text-vn-ivory/90 font-medium mb-6 tracking-wide">
          Trong Thời Kỳ Quá Độ Lên Chủ Nghĩa Xã Hội
        </p>

        {/* Lead Summary */}
        <p className="text-sm sm:text-base md:text-lg text-vn-ivory/75 max-w-2xl font-light leading-relaxed mb-10">
          Không gian trải nghiệm điện ảnh số khám phá lý luận Mác - Lênin, tư tưởng Hồ Chí Minh, 
          bức tranh đa dạng văn hóa của <strong className="text-vn-gold font-semibold">54 dân tộc anh em</strong> và 
          đường lối bảo đảm <strong className="text-vn-gold font-semibold">quyền tự do tín ngưỡng</strong> tại Việt Nam.
        </p>

        {/* Stats highlight cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-12">
          <div className="p-3.5 rounded-xl bg-vn-charcoal/70 border border-vn-gold-antique/25 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold font-display text-vn-gold">54</div>
            <div className="text-[11px] sm:text-xs text-vn-ivory/70 uppercase tracking-wider mt-1">Dân tộc anh em</div>
          </div>
          <div className="p-3.5 rounded-xl bg-vn-charcoal/70 border border-vn-gold-antique/25 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold font-display text-vn-red">16</div>
            <div className="text-[11px] sm:text-xs text-vn-ivory/70 uppercase tracking-wider mt-1">Tôn giáo hợp pháp</div>
          </div>
          <div className="p-3.5 rounded-xl bg-vn-charcoal/70 border border-vn-gold-antique/25 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold font-display text-emerald-400">43</div>
            <div className="text-[11px] sm:text-xs text-vn-ivory/70 uppercase tracking-wider mt-1">Tổ chức tôn giáo</div>
          </div>
          <div className="p-3.5 rounded-xl bg-vn-charcoal/70 border border-vn-gold-antique/25 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold font-display text-amber-300">100%</div>
            <div className="text-[11px] sm:text-xs text-vn-ivory/70 uppercase tracking-wider mt-1">Khối đại đoàn kết</div>
          </div>
        </div>

        {/* Primary CTA button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#chuong-1"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-vn-red to-vn-red-deep border border-vn-gold text-white font-medium text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-xl shadow-vn-red/30 flex items-center gap-2 group"
          >
            <span>Khám phá Triển lãm</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform text-vn-gold" />
          </a>
          <a
            href="#trac-nghiem-on-tap"
            className="px-6 py-3.5 rounded-full bg-vn-charcoal/80 border border-vn-gold-antique/40 text-vn-ivory/90 hover:text-vn-gold hover:border-vn-gold font-medium text-sm tracking-wider uppercase transition-all"
          >
            Ôn tập trắc nghiệm
          </a>
        </div>

      </div>

      {/* Scroll indicator pulsing line */}
      <div className="mt-16 flex flex-col items-center gap-2 opacity-70">
        <span className="text-[10px] uppercase tracking-cinematic text-vn-gold">Cuộn để khám phá</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-vn-gold to-transparent animate-pulse" />
      </div>

    </section>
  );
}
