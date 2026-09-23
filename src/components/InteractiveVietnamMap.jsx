import React, { useState, useRef } from 'react';
import { MapPin, ShieldAlert, Compass, Check, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { MAP_REGIONS } from '../data/mapRegionsData';
import vietnamPaths from '../data/vietnamPaths.json';

export default function InteractiveVietnamMap() {
  const [activeRegion, setActiveRegion] = useState(MAP_REGIONS[0]);
  const [hoveredProvince, setHoveredProvince] = useState(null);

  // Zoom and Pan states
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  // Helper to find which region a province belongs to
  const getRegionForProvince = (provId) => {
    return MAP_REGIONS.find((r) => r.provinceIds.includes(provId));
  };

  const handleProvinceClick = (provId) => {
    if (hasDragged.current) return;
    const region = getRegionForProvince(provId);
    if (region) {
      setActiveRegion(region);
    }
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(2.5, +(prev + 0.25).toFixed(2)));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(1, +(prev - 0.25).toFixed(2));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Pan event handlers for dragging when zoomed
  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      hasDragged.current = false;
      dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;
      if (Math.abs(newX - pan.x) > 4 || Math.abs(newY - pan.y) > 4) {
        hasDragged.current = true;
      }
      setPan({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="ban-do-tuong-tac" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-vn-black via-vn-charcoal/40 to-vn-black border-y border-vn-gold-antique/20 scroll-mt-20">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vn-charcoal border border-vn-gold/40 text-vn-gold text-xs sm:text-sm uppercase tracking-widest mb-4 shadow-md font-semibold">
            <Compass className="w-4 h-4 text-vn-gold" />
            <span>Địa Lý Nhân Văn & Tôn Giáo Toàn Vẹn Lãnh Thổ</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white mb-4 tracking-tight">
            Bản Đồ 54 Dân Tộc & Tôn Giáo Việt Nam
          </h2>
          <p className="text-base sm:text-lg text-vn-ivory/85 font-light leading-relaxed">
            Bản đồ chuẩn xác đầy đủ 63 tỉnh thành và hai quần đảo thiêng liêng Hoàng Sa — Trường Sa. 
            Nhấp vào từng vùng hoặc tỉnh thành để khám phá đặc thù văn hóa và thế trận quốc phòng toàn dân.
          </p>
        </div>

        {/* Region Quick Selector Pills with Larger Text */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-10">
          {MAP_REGIONS.map((r) => {
            const isSelected = activeRegion.id === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRegion(r)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md ${
                  isSelected
                    ? 'bg-vn-red text-white border-2 border-vn-gold shadow-lg shadow-vn-red/40 scale-105'
                    : 'bg-vn-charcoal/90 text-vn-ivory/80 border border-vn-gold/30 hover:border-vn-gold hover:text-white'
                }`}
              >
                <span className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: r.color }} />
                <span>{r.name}</span>
                {isSelected && <Check className="w-4 h-4 text-vn-gold ml-0.5" />}
              </button>
            );
          })}
        </div>

        {/* 2-Column Layout: Map (Left) + Stable Details Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Authentic S-Shape SVG Map with Zoom/Pan */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div 
              className="relative w-full max-w-[540px] aspect-[703/900] p-4 rounded-3xl bg-[#0b0d11] border-2 border-vn-gold/40 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              
              {/* Subtle background nautical grid watermark */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4A72C_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              {/* Floating Active/Hover Province Badge (Larger Text) */}
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <div className="px-4 py-2 rounded-2xl bg-vn-black/95 border-2 border-vn-gold/50 text-xs sm:text-sm text-vn-ivory shadow-2xl flex items-center gap-2 font-bold backdrop-blur-md">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: activeRegion.color }} />
                  <span>
                    {hoveredProvince
                      ? `${hoveredProvince.name} · ${getRegionForProvince(hoveredProvince.id)?.name || ''}`
                      : `${activeRegion.name} (${activeRegion.provinceIds.length} địa phương)`}
                  </span>
                </div>
              </div>

              {/* Map Zoom Controls Widget */}
              <div className="absolute top-4 right-4 z-30 flex flex-col items-center gap-1.5 bg-vn-black/90 p-1.5 rounded-2xl border border-vn-gold/40 shadow-xl backdrop-blur-md">
                <button
                  onClick={handleZoomIn}
                  title="Phóng to bản đồ"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-vn-charcoal text-vn-ivory hover:text-vn-gold hover:bg-vn-red-deep/40 flex items-center justify-center transition-all border border-vn-gold/20"
                >
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleZoomOut}
                  title="Thu nhỏ bản đồ"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-vn-charcoal text-vn-ivory hover:text-vn-gold hover:bg-vn-red-deep/40 flex items-center justify-center transition-all border border-vn-gold/20"
                >
                  <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                {zoom > 1 && (
                  <button
                    onClick={handleResetZoom}
                    title="Đặt lại kích thước gốc"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-vn-red/80 text-white flex items-center justify-center transition-all border border-vn-gold"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
                <span className="text-[10px] font-mono text-vn-gold font-bold px-1 select-none">
                  {Math.round(zoom * 100)}%
                </span>
              </div>

              {/* Geographic SVG of Vietnam (viewBox 0 0 703 900) */}
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transformOrigin: 'center center',
                  cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                }}
              >
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
                          className="transition-colors duration-150 cursor-pointer hover:brightness-125"
                          onClick={() => handleProvinceClick(prov.id)}
                          onMouseEnter={() => setHoveredProvince({ id: prov.id, name: prov.name })}
                          onMouseLeave={() => setHoveredProvince(null)}
                        />
                      );
                    })}
                  </g>

                  {/* 2. Sacred Archipelagos Typography (Larger & Bolder) */}
                  <g className="pointer-events-none select-none">
                    {/* Hoang Sa Label */}
                    <text
                      x="495"
                      y="415"
                      fill="#FFCD00"
                      fontSize="16"
                      fontWeight="900"
                      fontFamily="serif"
                      letterSpacing="1.2"
                      className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
                    >
                      Q.Đ HOÀNG SA
                    </text>
                    <text
                      x="495"
                      y="435"
                      fill="#F5EFE6"
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                    >
                      (TP. Đà Nẵng · Việt Nam)
                    </text>
                    <circle cx="530" cy="450" r="4.5" fill="#FFCD00" stroke="#8F1713" strokeWidth="1.5" />

                    {/* Truong Sa Label */}
                    <text
                      x="510"
                      y="660"
                      fill="#FFCD00"
                      fontSize="16"
                      fontWeight="900"
                      fontFamily="serif"
                      letterSpacing="1.2"
                      className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
                    >
                      Q.Đ TRƯỜNG SA
                    </text>
                    <text
                      x="510"
                      y="680"
                      fill="#F5EFE6"
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                    >
                      (Tỉnh Khánh Hòa · Việt Nam)
                    </text>
                    <circle cx="640" cy="650" r="4.5" fill="#FFCD00" stroke="#8F1713" strokeWidth="1.5" />

                    {/* Phu Quoc Island Label */}
                    <text
                      x="65"
                      y="775"
                      fill="#FFCD00"
                      fontSize="13"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                    >
                      ĐẢO PHÚ QUỐC
                    </text>
                  </g>

                  {/* 3. Strictly Fixed Region Centroid Pins (Zero Movement, Locked Position) */}
                  {MAP_REGIONS.map((r) => {
                    const isSelected = activeRegion.id === r.id;
                    return (
                      <g
                        key={`pin-${r.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!hasDragged.current) setActiveRegion(r);
                        }}
                        className="cursor-pointer select-none"
                      >
                        {/* Static Locked Outer Halos (NO CSS transform) */}
                        {isSelected && (
                          <>
                            <circle
                              cx={r.pin.x}
                              cy={r.pin.y}
                              r="15"
                              fill={r.color}
                              fillOpacity="0.25"
                              stroke={r.color}
                              strokeWidth="1.5"
                            />
                            <circle
                              cx={r.pin.x}
                              cy={r.pin.y}
                              r="20"
                              fill="none"
                              stroke="#FFCD00"
                              strokeWidth="1"
                              strokeDasharray="2 2"
                              opacity="0.8"
                            />
                          </>
                        )}

                        {/* Main Fixed Dot (Anchored rigidly at cx, cy) */}
                        <circle
                          cx={r.pin.x}
                          cy={r.pin.y}
                          r="7.5"
                          fill={isSelected ? r.color : "#0f131a"}
                          stroke={isSelected ? "#FFCD00" : "#F5EFE6"}
                          strokeWidth={isSelected ? "2.5" : "1.5"}
                        />
                        <circle
                          cx={r.pin.x}
                          cy={r.pin.y}
                          r="3"
                          fill="#FFFFFF"
                        />

                        {/* Region Tag Pill - Large, Bold and Centered */}
                        <rect
                          x={r.pin.x + 12}
                          y={r.pin.y - 13}
                          width={r.name.length * 11 + 22}
                          height="26"
                          rx="13"
                          fill={isSelected ? "#8F1713" : "#0d1017"}
                          stroke={isSelected ? "#FFCD00" : "rgba(255,205,0,0.6)"}
                          strokeWidth={isSelected ? "2" : "1.2"}
                          filter="drop-shadow(0 2px 6px rgba(0,0,0,0.9))"
                        />
                        <text
                          x={r.pin.x + 23}
                          y={r.pin.y + 4.5}
                          fill={isSelected ? "#FFFFFF" : "#F5EFE6"}
                          fontSize="13"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {r.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Map Footer Note */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-vn-ivory/70 border-t border-vn-ivory/15 pt-2 font-mono">
                <span>📍 Việt Nam: 54 Dân tộc anh em</span>
                <span className="text-vn-gold font-bold">Chủ quyền Biển Đảo thiêng liêng</span>
              </div>
            </div>

            <div className="mt-3.5 flex items-center gap-3 text-xs sm:text-sm text-vn-ivory/70 font-sans italic">
              <span>💡 Dùng nút <strong>[+]</strong> <strong>[-]</strong> để phóng to/thu nhỏ và kéo bản đồ</span>
            </div>

          </div>

          {/* Right Column: Detailed Region Information Card (Large Typography, Zero Jump) */}
          <div className="lg:col-span-6">
            <div className="min-h-[600px] p-6 sm:p-8 rounded-3xl bg-vn-charcoal/95 border-2 border-vn-gold/30 shadow-2xl backdrop-blur-md flex flex-col justify-between">
              
              {/* Region Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-vn-gold-antique/20">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-vn-gold mb-1.5">
                      <MapPin className="w-4 h-4 text-vn-red" />
                      <span>{activeRegion.name}</span>
                    </div>
                    <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                      {activeRegion.fullName}
                    </h3>
                    <p className="text-sm sm:text-base text-vn-ivory/80 mt-2 leading-relaxed">
                      <strong className="text-vn-gold">Các địa phương:</strong> {activeRegion.provinces}
                    </p>
                  </div>

                  <div 
                    className="w-4 h-14 rounded-full shrink-0 shadow-lg border border-vn-gold/40" 
                    style={{ backgroundColor: activeRegion.color }}
                    title={activeRegion.name}
                  />
                </div>

                {/* Details Sections with Bigger Text */}
                <div className="space-y-4">
                  
                  {/* 1. Ethnic Groups */}
                  <div className="p-4 rounded-2xl bg-vn-black/75 border border-vn-ivory/10 shadow-sm">
                    <span className="text-xs sm:text-sm font-bold text-vn-gold uppercase tracking-wider block mb-2">
                      👥 Các Dân Tộc Cư Trú Chủ Yếu:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeRegion.ethnicGroups.map((eth, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-xs sm:text-sm bg-vn-charcoal text-vn-ivory border border-vn-gold/30 font-semibold shadow-inner">
                          {eth}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 2. Religions & Beliefs */}
                  <div className="p-4 rounded-2xl bg-vn-black/75 border border-vn-ivory/10 shadow-sm">
                    <span className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                      🛕 Tôn Giáo & Tín Ngưỡng Đặc Trưng:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeRegion.dominantReligions.map((rel, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-xs sm:text-sm bg-emerald-950/50 text-emerald-200 border border-emerald-500/40 font-semibold shadow-inner">
                          {rel}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 3. Strategic Role */}
                  <div className="p-4 rounded-2xl bg-vn-black/75 border border-vn-ivory/10 shadow-sm">
                    <span className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider block mb-1.5">
                      🛡️ Vị Trí Chiến Lược & Quốc Phòng:
                    </span>
                    <p className="text-sm sm:text-base text-vn-ivory/90 leading-relaxed font-normal">
                      {activeRegion.strategicRole}
                    </p>
                  </div>

                  {/* 4. Security Notice */}
                  <div className="p-4 rounded-2xl bg-vn-red-deep/25 border border-vn-red/50 shadow-sm">
                    <div className="flex items-center gap-2 text-vn-gold text-xs sm:text-sm font-bold uppercase tracking-wider mb-1.5">
                      <ShieldAlert className="w-4 h-4 text-vn-red" />
                      <span>Cảnh Giác Đấu Tranh Tư Tưởng (Chương 6):</span>
                    </div>
                    <p className="text-sm sm:text-base text-vn-ivory/95 leading-relaxed font-normal">
                      {activeRegion.securityNotice}
                    </p>
                  </div>

                  {/* 5. Cultural Highlights */}
                  <div className="p-4 rounded-2xl bg-vn-black/75 border border-vn-ivory/10 shadow-sm">
                    <span className="text-xs sm:text-sm font-bold text-cyan-300 uppercase tracking-wider block mb-1.5">
                      🎭 Tinh Hoa Văn Hóa & Di Sản:
                    </span>
                    <p className="text-sm sm:text-base text-vn-ivory/90 leading-relaxed font-serif italic">
                      {activeRegion.culturalHighlight}
                    </p>
                  </div>

                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="mt-6 pt-4 border-t border-vn-ivory/10 flex items-center justify-between text-xs sm:text-sm text-vn-ivory/60 font-mono">
                <span>Học phần MLN131</span>
                <span className="text-vn-gold font-bold">Khối Đại Đoàn Kết Toàn Dân</span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
