import React, { useState } from 'react';
import { MapPin, ShieldAlert, Compass, Layers, Check } from 'lucide-react';
import { MAP_REGIONS } from '../data/mapRegionsData';
import vietnamPaths from '../data/vietnamPaths.json';

export default function InteractiveVietnamMap() {
  const [activeRegion, setActiveRegion] = useState(MAP_REGIONS[0]);
  const [hoveredProvince, setHoveredProvince] = useState(null);

  // Helper to find which region a province belongs to
  const getRegionForProvince = (provId) => {
    return MAP_REGIONS.find((r) => r.provinceIds.includes(provId));
  };

  const handleProvinceClick = (provId) => {
    const region = getRegionForProvince(provId);
    if (region) {
      setActiveRegion(region);
    }
  };

  return (
    <section id="ban-do-tuong-tac" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-vn-black via-vn-charcoal/40 to-vn-black border-y border-vn-gold-antique/20 scroll-mt-20">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vn-charcoal border border-vn-gold/30 text-vn-gold text-xs uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5 text-vn-gold" />
            <span>Địa Lý Nhân Văn & Tôn Giáo Toàn Vẹn Lãnh Thổ</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4">
            Bản Đồ 54 Dân Tộc & Tôn Giáo Việt Nam
          </h2>
          <p className="text-sm sm:text-base text-vn-ivory/75 font-light leading-relaxed">
            Bản đồ địa lý chuẩn xác với đầy đủ 63 tỉnh thành và hai quần đảo thiêng liêng Hoàng Sa — Trường Sa. 
            Nhấp vào từng vùng hoặc tỉnh thành trên bản đồ để khám phá đặc thù văn hóa và thế trận quốc phòng toàn dân.
          </p>
        </div>

        {/* Region Quick Selector Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {MAP_REGIONS.map((r) => {
            const isSelected = activeRegion.id === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRegion(r)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-vn-red text-white border border-vn-gold shadow-lg shadow-vn-red/30 font-bold scale-105'
                    : 'bg-vn-charcoal/80 text-vn-ivory/70 border border-vn-gold/20 hover:border-vn-gold/60 hover:text-white'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                <span>{r.name}</span>
                {isSelected && <Check className="w-3 h-3 text-vn-gold ml-0.5" />}
              </button>
            );
          })}
        </div>

        {/* 2-Column Layout: Map (Left) + Stable Details Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Authentic S-Shape SVG Map */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="relative w-full max-w-[500px] aspect-[703/900] p-4 rounded-3xl bg-[#0b0d11] border-2 border-vn-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden">
              
              {/* Subtle background nautical grid watermark */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4A72C_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              {/* Hover Province Floating Badge */}
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <div className="px-3 py-1 rounded-full bg-vn-black/90 border border-vn-gold/40 text-[11px] text-vn-ivory shadow-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeRegion.color }} />
                  <span>
                    {hoveredProvince
                      ? `${hoveredProvince.name} · ${getRegionForProvince(hoveredProvince.id)?.name || ''}`
                      : `${activeRegion.name} (${activeRegion.provinceIds.length} địa phương)`}
                  </span>
                </div>
              </div>

              {/* Geographic SVG of Vietnam (viewBox 0 0 703 900) */}
              <svg
                viewBox="0 0 703 900"
                className="w-full h-full select-none"
                style={{ filter: 'drop-shadow(0 0 25px rgba(218,37,29,0.15))' }}
              >
                {/* 1. All 63 Provinces & Islands rendered authentically */}
                <g id="vietnam-provinces">
                  {vietnamPaths.map((prov) => {
                    const isRegionActive = activeRegion.provinceIds.includes(prov.id);
                    const isHovered = hoveredProvince?.id === prov.id;

                    return (
                      <path
                        key={prov.id}
                        id={prov.id}
                        d={prov.d}
                        fill={isRegionActive ? activeRegion.color : '#161a22'}
                        fillOpacity={isRegionActive ? (isHovered ? 0.95 : 0.8) : 0.45}
                        stroke={isRegionActive ? '#FFCD00' : 'rgba(212,167,44,0.22)'}
                        strokeWidth={isRegionActive ? (isHovered ? 1.6 : 1.0) : 0.4}
                        className="transition-colors duration-200 cursor-pointer hover:brightness-125"
                        onClick={() => handleProvinceClick(prov.id)}
                        onMouseEnter={() => setHoveredProvince({ id: prov.id, name: prov.name })}
                        onMouseLeave={() => setHoveredProvince(null)}
                      />
                    );
                  })}
                </g>

                {/* 2. Sacred Archipelagos Typography (Permanent Sovereignty Labels) */}
                <g className="pointer-events-none select-none">
                  {/* Hoang Sa Label */}
                  <text
                    x="510"
                    y="420"
                    fill="#FFCD00"
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily="serif"
                    letterSpacing="1"
                    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    Q.Đ HOÀNG SA
                  </text>
                  <text
                    x="510"
                    y="435"
                    fill="rgba(245,239,230,0.7)"
                    fontSize="9"
                    fontFamily="sans-serif"
                  >
                    (Đà Nẵng · Việt Nam)
                  </text>
                  <circle cx="530" cy="450" r="3" fill="#FFCD00" stroke="#8F1713" strokeWidth="1" />

                  {/* Truong Sa Label */}
                  <text
                    x="525"
                    y="665"
                    fill="#FFCD00"
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily="serif"
                    letterSpacing="1"
                    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    Q.Đ TRƯỜNG SA
                  </text>
                  <text
                    x="525"
                    y="680"
                    fill="rgba(245,239,230,0.7)"
                    fontSize="9"
                    fontFamily="sans-serif"
                  >
                    (Khánh Hòa · Việt Nam)
                  </text>
                  <circle cx="640" cy="650" r="3" fill="#FFCD00" stroke="#8F1713" strokeWidth="1" />

                  {/* Phu Quoc Island Label */}
                  <text
                    x="75"
                    y="775"
                    fill="#FFCD00"
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    Đảo Phú Quốc
                  </text>
                </g>

                {/* 3. Stable Region Centroid Pins */}
                {MAP_REGIONS.map((r) => {
                  const isSelected = activeRegion.id === r.id;
                  return (
                    <g
                      key={`pin-${r.id}`}
                      onClick={() => setActiveRegion(r)}
                      className="cursor-pointer group select-none"
                    >
                      {/* Active Outer Ring */}
                      {isSelected && (
                        <circle
                          cx={r.pin.x}
                          cy={r.pin.y}
                          r="14"
                          fill="none"
                          stroke={r.color}
                          strokeWidth="1.5"
                          opacity="0.6"
                        />
                      )}

                      {/* Main Pin Dot */}
                      <circle
                        cx={r.pin.x}
                        cy={r.pin.y}
                        r={isSelected ? "8" : "5.5"}
                        fill={isSelected ? r.color : "#12141a"}
                        stroke={isSelected ? "#FFCD00" : r.color}
                        strokeWidth={isSelected ? "2" : "1.2"}
                        className="transition-transform duration-200 group-hover:scale-125"
                      />

                      {/* Region Tag Pill on Map */}
                      <rect
                        x={r.pin.x + 10}
                        y={r.pin.y - 10}
                        width={r.name.length * 9 + 14}
                        height="20"
                        rx="10"
                        fill={isSelected ? "#8F1713" : "#0d0f14"}
                        stroke={isSelected ? "#FFCD00" : "rgba(255,205,0,0.4)"}
                        strokeWidth="1"
                        className="transition-all duration-200"
                      />
                      <text
                        x={r.pin.x + 17}
                        y={r.pin.y + 4}
                        fill={isSelected ? "#FFFFFF" : "#E8DFCE"}
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        {r.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Footer Note */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-vn-ivory/60 border-t border-vn-ivory/10 pt-2 font-mono">
                <span>📍 Việt Nam: 54 Dân tộc anh em</span>
                <span className="text-vn-gold font-bold">Chủ quyền Biển Đảo thiêng liêng</span>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-vn-ivory/50 font-sans italic">
              💡 Gợi ý: Bạn có thể nhấp trực tiếp vào bất kỳ tỉnh thành nào trên bản đồ để chọn vùng
            </p>

          </div>

          {/* Right Column: Detailed Region Information Card (Fixed Min-Height, Zero Jump) */}
          <div className="lg:col-span-6">
            <div className="min-h-[580px] p-6 sm:p-8 rounded-3xl bg-vn-charcoal/95 border-2 border-vn-gold/30 shadow-2xl backdrop-blur-md flex flex-col justify-between">
              
              {/* Region Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-vn-gold-antique/20">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-vn-gold mb-1">
                      <MapPin className="w-3.5 h-3.5 text-vn-red" />
                      <span>{activeRegion.name}</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                      {activeRegion.fullName}
                    </h3>
                    <p className="text-xs text-vn-ivory/60 mt-1 leading-relaxed">
                      <strong>Các tỉnh/thành:</strong> {activeRegion.provinces}
                    </p>
                  </div>

                  <div 
                    className="w-4 h-12 rounded-full shrink-0 shadow-lg" 
                    style={{ backgroundColor: activeRegion.color }}
                    title={activeRegion.name}
                  />
                </div>

                {/* Details Sections */}
                <div className="space-y-3.5">
                  
                  {/* 1. Ethnic Groups */}
                  <div className="p-3.5 rounded-xl bg-vn-black/70 border border-vn-ivory/10">
                    <span className="text-[11px] font-semibold text-vn-gold uppercase tracking-wider block mb-1.5">
                      👥 Các Dân Tộc Cư Trú Chủ Yếu:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeRegion.ethnicGroups.map((eth, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full text-xs bg-vn-charcoal text-vn-ivory border border-vn-gold/25 font-medium">
                          {eth}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 2. Religions & Beliefs */}
                  <div className="p-3.5 rounded-xl bg-vn-black/70 border border-vn-ivory/10">
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
                  <div className="p-3.5 rounded-xl bg-vn-black/70 border border-vn-ivory/10">
                    <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block mb-1">
                      🛡️ Vị Trí Chiến Lược & Quốc Phòng:
                    </span>
                    <p className="text-xs sm:text-sm text-vn-ivory/80 leading-relaxed">
                      {activeRegion.strategicRole}
                    </p>
                  </div>

                  {/* 4. Security Notice */}
                  <div className="p-3.5 rounded-xl bg-vn-red-deep/20 border border-vn-red/40">
                    <div className="flex items-center gap-1.5 text-vn-gold text-[11px] font-bold uppercase tracking-wider mb-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-vn-red" />
                      <span>Cảnh Giác Đấu Tranh Tư Tưởng (Chương 6):</span>
                    </div>
                    <p className="text-xs text-vn-ivory/85 leading-relaxed">
                      {activeRegion.securityNotice}
                    </p>
                  </div>

                  {/* 5. Cultural Highlights */}
                  <div className="p-3.5 rounded-xl bg-vn-black/70 border border-vn-ivory/10">
                    <span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider block mb-1">
                      🎭 Tinh Hoa Văn Hóa & Di Sản:
                    </span>
                    <p className="text-xs sm:text-sm text-vn-ivory/80 leading-relaxed font-serif italic">
                      {activeRegion.culturalHighlight}
                    </p>
                  </div>

                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="mt-5 pt-3 border-t border-vn-ivory/10 flex items-center justify-between text-xs text-vn-ivory/50 font-mono">
                <span>Học phần MLN131</span>
                <span className="text-vn-gold">Khối Đại Đoàn Kết Toàn Dân</span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
