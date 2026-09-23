import React from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Info, 
  Sparkles, 
  ShieldCheck, 
  Coins, 
  BookOpenCheck, 
  Users, 
  ShieldAlert, 
  Scale, 
  Flame,
  Globe2,
  Building,
  Flag
} from 'lucide-react';

const ICONS_MAP = {
  ShieldAlert: ShieldAlert,
  Coins: Coins,
  BookOpenCheck: BookOpenCheck,
  Users: Users,
  ShieldCheck: ShieldCheck
};

export default function ChapterSection({ chapter }) {
  return (
    <section id={chapter.id} className="relative py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Chapter header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        
        {/* Academic reference badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vn-charcoal border border-vn-gold/30 text-vn-gold text-xs font-mono mb-4">
          <BookOpen className="w-3.5 h-3.5 text-vn-gold" />
          <span>{chapter.textbookRef}</span>
        </div>

        {/* Roman Numeral & Tag */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="w-8 sm:w-12 h-[1px] bg-vn-gold/40" />
          <span className="font-display font-bold text-lg sm:text-xl text-vn-red tracking-widest uppercase">
            HỒI {chapter.roman} · {chapter.sectionTitle}
          </span>
          <span className="w-8 sm:w-12 h-[1px] bg-vn-gold/40" />
        </div>

        {/* Main Title */}
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">
          {chapter.title}
        </h2>

        {/* Subtitle */}
        <p className="font-heading italic text-base sm:text-xl text-vn-gold-antique max-w-2xl mx-auto mb-6">
          {chapter.subtitle}
        </p>

        {/* Lead paragraph */}
        <p className="text-sm sm:text-base text-vn-ivory/80 leading-relaxed font-light max-w-3xl mx-auto">
          {chapter.lead}
        </p>
      </div>

      {/* 1. Infographic Step Flow (if available, e.g. Chuong 1) */}
      {chapter.infographic && (
        <div className="mb-14 p-6 rounded-2xl bg-vn-charcoal/60 border border-vn-gold-antique/20 backdrop-blur-sm">
          <div className="text-xs uppercase font-semibold tracking-wider text-vn-gold text-center mb-6">
            Tiến trình lịch sử phát triển các hình thức cộng đồng người
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {chapter.infographic.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-vn-black/70 border border-vn-ivory/10 flex flex-col justify-between hover:border-vn-gold/40 transition-colors">
                <div className="font-display font-bold text-lg text-vn-gold mb-1">{step.step}</div>
                <div className="text-xs text-vn-ivory/70 leading-relaxed">{step.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Pillars Comparison (Two-column in depth) */}
      {chapter.pillars && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
          {chapter.pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-b ${pillar.color} border ${pillar.border} shadow-xl backdrop-blur-sm flex flex-col justify-between`}
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/50 text-vn-gold border border-vn-gold/30 mb-4">
                  {pillar.badge}
                </span>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-vn-ivory/80 mb-6 leading-relaxed">
                  {pillar.desc}
                </p>

                {pillar.points && (
                  <ul className="space-y-3">
                    {pillar.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-vn-ivory/90 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-vn-gold shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Lenin's Platform (Chuong 2) */}
      {chapter.leninPlatform && (
        <div className="mb-14">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-semibold tracking-cinematic text-vn-gold">
              3 Nguyên Tắc Cốt Lõi Trong Cương Lĩnh Dân Tộc
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chapter.leninPlatform.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-vn-charcoal/80 border border-vn-gold-antique/30 shadow-lg hover:border-vn-gold transition-all duration-300 relative group"
              >
                <div className="w-8 h-8 rounded-full bg-vn-red/30 border border-vn-gold/40 flex items-center justify-center text-vn-gold font-bold text-sm mb-4">
                  {idx + 1}
                </div>
                <h4 className="font-display font-bold text-xl text-white mb-3 group-hover:text-vn-gold transition-colors">
                  {item.rule}
                </h4>
                <p className="text-xs sm:text-sm text-vn-ivory/75 leading-relaxed">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Six Characteristics of Vietnam's 54 Ethnic Groups (Chuong 3) */}
      {chapter.sixCharacteristics && (
        <div className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapter.sixCharacteristics.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-vn-charcoal/70 border border-vn-gold-antique/25 hover:border-vn-gold hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display font-bold text-3xl text-vn-gold/50">{item.num}</span>
                    <span className="w-2 h-2 rounded-full bg-vn-red" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-3">
                    {item.title}
                  </h4>
                  <p className="text-xs text-vn-ivory/75 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-vn-red-deep/20 border border-vn-red/30 text-[11px] text-vn-gold font-medium">
                  {item.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Distinction between Genuine Religion and Superstition (Chuong 4) */}
      {chapter.distinction && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h4 className="font-display font-bold text-lg text-emerald-300">
                {chapter.distinction.left.title}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-vn-ivory/80 leading-relaxed">
              {chapter.distinction.left.desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-red-400" />
              <h4 className="font-display font-bold text-lg text-red-300">
                {chapter.distinction.right.title}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-vn-ivory/80 leading-relaxed">
              {chapter.distinction.right.desc}
            </p>
          </div>
        </div>
      )}

      {/* 6. Five features of religions in Vietnam (Chuong 5) */}
      {chapter.fiveFeatures && (
        <div className="space-y-4 mb-14">
          {chapter.fiveFeatures.map((feat, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl bg-vn-charcoal/80 border border-vn-gold-antique/25 hover:border-vn-gold/50 transition-all flex flex-col sm:flex-row sm:items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-vn-gold/15 border border-vn-gold/40 flex items-center justify-center text-vn-gold font-bold text-sm shrink-0">
                0{idx + 1}
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-white mb-1.5">
                  {feat.title}
                </h4>
                <p className="text-xs sm:text-sm text-vn-ivory/75 leading-relaxed">
                  {feat.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 7. Five Pillars of Ethnic Policy (Chuong 6) */}
      {chapter.policyPillars && (
        <div className="mb-14">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-semibold tracking-cinematic text-vn-gold">
              5 Trụ Cột Chính Sách Dân Tộc Của Đảng Và Nhà Nước
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {chapter.policyPillars.map((p, idx) => {
              const IconComp = ICONS_MAP[p.icon] || Info;
              return (
                <div key={idx} className="p-5 rounded-xl bg-vn-charcoal/80 border border-vn-gold-antique/30 flex flex-col justify-between hover:scale-105 transition-transform duration-300">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-vn-red/20 border border-vn-red/40 flex items-center justify-center text-vn-gold mb-3">
                      <IconComp className="w-5 h-5 text-vn-gold" />
                    </div>
                    <h5 className="font-display font-bold text-base text-white mb-2">{p.pillar}</h5>
                    <p className="text-xs text-vn-ivory/70 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 8. Religious Policy Principles (Chuong 6) */}
      {chapter.religiousPrinciples && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-vn-red-deep/20 via-vn-charcoal to-vn-black border border-vn-gold-antique/30 mb-8">
          <h4 className="font-display font-bold text-xl text-vn-gold mb-4 text-center sm:text-left">
            5 Nguyên Tắc Giải Quyết Vấn Đề Tôn Giáo Cốt Lõi
          </h4>
          <div className="space-y-3">
            {chapter.religiousPrinciples.map((principle, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-vn-ivory/85 leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-vn-gold mt-1.5 shrink-0" />
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Highlight Box if present */}
      {chapter.highlightBox && (
        <div className="p-5 sm:p-6 rounded-xl bg-vn-red-deep/15 border border-vn-gold/30 text-center max-w-3xl mx-auto">
          <h5 className="font-display font-bold text-base sm:text-lg text-vn-gold mb-2">
            {chapter.highlightBox.title}
          </h5>
          <p className="text-xs sm:text-sm text-vn-ivory/85 italic leading-relaxed">
            "{chapter.highlightBox.content}"
          </p>
        </div>
      )}

    </section>
  );
}
