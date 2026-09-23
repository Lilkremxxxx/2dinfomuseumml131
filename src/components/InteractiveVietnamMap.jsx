import React, { useState } from 'react';
import { MapPin, ShieldAlert, Sparkles, Compass, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { MAP_REGIONS } from '../data/mapRegionsData';

export default function InteractiveVietnamMap() {
  const [activeRegion, setActiveRegion] = useState(MAP_REGIONS[0]);

  return (
    <section id="ban-do-tuong-tac" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-vn-black via-vn-charcoal/40 to-vn-black border-y border-vn-gold-antique/20 scroll-mt-20">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vn-charcoal border border-vn-gold/30 text-vn-gold text-xs uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5 text-vn-gold animate-spin-slow" />
            <span>Không Gian Địa Lý Nhân Văn & Tôn Giáo</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4">
            Bản Đồ Phân Bố 54 Dân Tộc & Tôn Giáo Việt Nam
          </h2>
          <p className="text-sm sm:text-base text-vn-ivory/75 font-light leading-relaxed">
            Khám phá 6 vùng sinh thái nhân văn lớn của Tổ quốc. Nhấp vào từng vùng trên bản đồ để 
            tìm hiểu đặc điểm dân cư, đời sống tâm linh tín ngưỡng và vị trí chiến lược quốc phòng - an ninh.
          </p>
        </div>

        {/* Interactive layout: 2 Columns (Map on Left, Detail Card on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: S-shaped SVG Map with Interactive Region Hotspots */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="relative w-full max-w-[420px] aspect-[3/4] p-4 rounded-3xl bg-vn-charcoal/80 border border-vn-gold-antique/30 shadow-2xl flex items-center justify-center overflow-hidden">
              
              {/* Background Map Watermark & Coordinates */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4A72C_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Stylized Vietnam S-Shape SVG Path */}
              <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-[0_0_15px_rgba(218,37,29,0.3)]">
                {/* Coastal silhouette */}
                <path
                  d="M 28 12 
                     C 35 10, 48 10, 52 16 
                     C 55 20, 48 26, 46 32 
                     C 44 38, 52 44, 56 50 
                     C 60 56, 58 64, 56 72 
                     C 54 80, 50 88, 44 94 
                     C 38 100, 32 106, 26 102 
                     C 22 98, 30 92, 34 88 
                     C 38 84, 44 76, 44 68 
                     C 44 60, 38 52, 36 44 
                     C 34 36, 22 28, 22 20 
                     Z"
                  fill="rgba(143, 23, 19, 0.45)"
                  stroke="#FFCD00"
                  strokeWidth="1.2"
                  className="transition-all duration-300"
                />

                {/* Hoang Sa & Truong Sa Archipelagos */}
                <g fill="#FFCD00" opacity="0.9">
                  {/* Hoang Sa */}
                  <circle cx="78" cy="46" r="1.5" />
                  <circle cx="82" cy="48" r="1.2" />
                  <circle cx="80" cy="52" r="1.3" />
                  <text x="70" y="42" fill="#FFCD00" fontSize="3.5" fontFamily="serif" fontWeight="bold">Q.Đ Hoàng Sa</text>
                  
                  {/* Truong Sa */}
                  <circle cx="75" cy="85" r="1.4" />
                  <circle cx="82" cy="88" r="1.3" />
                  <circle cx="85" cy="94" r="1.5" />
                  <circle cx="78" cy="98" r="1.2" />
                  <text x="68" y="80" fill="#FFCD00" fontSize="3.5" fontFamily="serif" fontWeight="bold">Q.Đ Trường Sa</text>
                </g>

                {/* Regional Clickable Pins */}
                {MAP_REGIONS.map((region) => {
                  const isSelected = activeRegion.id === region.id;
                  return (
                    <g 
                      key={region.id}
                      onClick={() => setActiveRegion(region)}
                      className="cursor-pointer group"
                    >
                      {/* Pulse circle when selected */}
                      {isSelected && (
                        <circle
                          cx={region.coordinates.x}
                          cy={region.coordinates.y}
                          r="6"
                          fill="none"
                          stroke={region.color}
                          strokeWidth="0.8"
                          className="animate-ping origin-center"
                        />
                      )}
                      
                      {/* Pin Outer */}
                      <circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r={isSelected ? "4.5" : "3.2"}
                        fill={isSelected ? region.color : "#121214"}
                        stroke={isSelected ? "#FFCD00" : region.color}
                        strokeWidth="1"
                        className="transition-all duration-300 group-hover:scale-125"
                      />

                      {/* Pin Label */}
                      <text
                        x={region.coordinates.x + 5}
                        y={region.coordinates.y + 1.5}
                        fill={isSelected ? "#FFCD00" : "#F5EFE6"}
                        fontSize="3.8"
                        fontWeight={isSelected ? "bold" : "normal"}
                        fontFamily="sans-serif"
                        className="transition-all select-none"
                      >
                        {region.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Footer Note */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] text-vn-ivory/60 border-t border-vn-ivory/10 pt-2 font-mono">
                <span>📍 Việt Nam: 54 Dân tộc</span>
                <span className="text-vn-gold">Biển Đảo Thiêng Liêng</span>
              </div>
            </div>

            {/* Quick selector buttons below map on mobile */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-4 max-w-[420px]">
              {MAP_REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setActiveRegion(r)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    activeRegion.id === r.id
                      ? 'bg-vn-red text-vn-gold font-bold border border-vn-gold'
                      : 'bg-vn-charcoal text-vn-ivory/70 hover:text-white border border-vn-ivory/15'
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Detailed Region Information Card */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-vn-charcoal/90 border border-vn-gold-antique/30 shadow-2xl backdrop-blur-md">
              
              {/* Region Header */}
              <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-vn-gold-antique/20">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-vn-gold mb-1">
                    <MapPin className="w-3.5 h-3.5 text-vn-red" />
                    <span>{activeRegion.name}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    {activeRegion.fullName}
                  </h3>
                  <p className="text-xs text-vn-ivory/60 mt-1">
                    {activeRegion.provinces}
                  </p>
                </div>

                <div 
                  className="w-4 h-12 rounded-full shrink-0" 
                  style={{ backgroundColor: activeRegion.color }}
                  title={activeRegion.name}
                />
              </div>

              {/* Details grid */}
              <div className="space-y-4">
                
                {/* 1. Ethnic Groups */}
                <div className="p-3.5 rounded-xl bg-vn-black/60 border border-vn-ivory/10">
                  <span className="text-[11px] font-semibold text-vn-gold uppercase tracking-wider block mb-1.5">
                    👥 Các Dân Tộc Cư Trú Chủ Yếu:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeRegion.ethnicGroups.map((eth, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-full text-xs bg-vn-charcoal text-vn-ivory border border-vn-gold/20">
                        {eth}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Religions & Beliefs */}
                <div className="p-3.5 rounded-xl bg-vn-black/60 border border-vn-ivory/10">
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1.5">
                    🛕 Tôn Giáo & Tín Ngưỡng Đặc Trưng:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeRegion.dominantReligions.map((rel, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-full text-xs bg-emerald-950/40 text-emerald-200 border border-emerald-500/30">
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Strategic Role */}
                <div className="p-3.5 rounded-xl bg-vn-black/60 border border-vn-ivory/10">
                  <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block mb-1">
                    🛡️ Vị Trí Chiến Lược & Quốc Phòng:
                  </span>
                  <p className="text-xs sm:text-sm text-vn-ivory/80 leading-relaxed">
                    {activeRegion.strategicRole}
                  </p>
                </div>

                {/* 4. Security & Ideological Vigilance */}
                <div className="p-3.5 rounded-xl bg-vn-red-deep/20 border border-vn-red/40">
                  <div className="flex items-center gap-1.5 text-vn-gold text-[11px] font-bold uppercase tracking-wider mb-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-vn-red" />
                    <span>Cảnh Giác Đấu Tranh Tư Tưởng:</span>
                  </div>
                  <p className="text-xs text-vn-ivory/85 leading-relaxed">
                    {activeRegion.securityNotice}
                  </p>
                </div>

                {/* 5. Cultural Heritage */}
                <div className="p-3.5 rounded-xl bg-vn-black/60 border border-vn-ivory/10">
                  <span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider block mb-1">
                    🎭 Tinh Hoa Văn Hóa & Lễ Hội:
                  </span>
                  <p className="text-xs sm:text-sm text-vn-ivory/80 leading-relaxed font-serif italic">
                    {activeRegion.culturalHighlight}
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
