import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Compass,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Users,
  ChevronRight,
  X,
  BookOpen,
  Languages,
  Home,
  UtensilsCrossed,
  Music,
  Landmark,
  Video,
  Play,
  ExternalLink,
} from 'lucide-react';
import { MAP_REGIONS } from '../data/mapRegionsData';
import { getEthnicDetails } from '../data/ethnicDetailsData';
import vietnamPaths from '../data/vietnamPaths.json';

export default function InteractiveVietnamMap() {
  const [activeRegion, setActiveRegion] = useState(MAP_REGIONS[0]);
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [selectedEthnic, setSelectedEthnic] = useState(null);

  // Zoom and Pan states
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  // Close drawer on Escape key and lock body scroll
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSelectedEthnic(null);
    }
  };
  const lockScroll = () => {
    const scrollY = window.scrollY;
    document.body.dataset.scrollY = scrollY.toString();
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
  };
  const unlockScroll = () => {
    const scrollY = document.body.dataset.scrollY ? parseInt(document.body.dataset.scrollY, 10) : 0;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollY);
    delete document.body.dataset.scrollY;
  };
  if (selectedEthnic) {
    window.addEventListener('keydown', handleKeyDown);
    lockScroll();
  } else {
    unlockScroll();
  }
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    unlockScroll();
  };
}, [selectedEthnic]);

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

  // Handle opening ethnic detail
  const handleOpenEthnic = (ethnicName) => {
    const details = getEthnicDetails(ethnicName);
    if (details) {
      setSelectedEthnic(details);
    } else {
      setSelectedEthnic({
        slug: ethnicName.toLowerCase(),
        name: ethnicName,
        population: 'Theo số liệu Tổng điều tra Dân số',
        tagline: `Cộng đồng dân tộc ${ethnicName} trong đại gia đình các dân tộc Việt Nam`,
        regionNames: [activeRegion.name],
        sections: {
          overview: {
            title: '1. Khái quát',
            paragraphs: [`Cộng đồng dân tộc ${ethnicName} cư trú tại ${activeRegion.fullName}.`],
            highlights: [`Địa bàn cư trú: ${activeRegion.name}`]
          },
          language: {
            title: '2. Ngôn ngữ',
            paragraphs: [`Tiếng nói dân tộc ${ethnicName} được gìn giữ và lưu truyền qua nhiều thế hệ.`],
            highlights: []
          },
          customs: {
            title: '3. Phong tục - tập quán',
            paragraphs: [`Phong tục tập quán và lễ hội dân gian phong phú của dân tộc ${ethnicName}.`],
            highlights: []
          },
          cuisine: {
            title: '4. Ẩm thực',
            paragraphs: [`Ẩm thực truyền thống dân dã mang đậm hương vị địa phương.`],
            highlights: []
          },
          art: {
            title: '5. Nghệ thuật',
            paragraphs: [`Các làn điệu dân ca, nhạc cụ truyền thống và trang phục đặc sắc.`],
            highlights: []
          },
          history: {
            title: '6. Lịch sử',
            paragraphs: [`Lịch sử định cư lâu đời gắn bó cùng khối đại đoàn kết toàn dân tộc.`],
            highlights: []
          },
          video: {
            title: '7. Video',
            videoTitle: `Văn hóa và đời sống dân tộc ${ethnicName}`,
            source: 'VTV',
            url: `https://www.youtube.com/results?search_query=dan+toc+${encodeURIComponent(ethnicName)}+vtv`,
            embedUrl: '',
            description: `Khám phá nét đẹp văn hóa và phong tục truyền thống dân tộc ${ethnicName}.`
          }
        }
      });
    }
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
            Nhấp vào từng vùng hoặc tỉnh thành để khám phá các dân tộc anh em trên dải đất hình chữ S.
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

              {/* Floating Active/Hover Province Badge */}
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
                  {/* 1. All 63 Provinces & Islands */}
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

                  {/* 2. Sacred Archipelagos Typography */}
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

                  {/* 3. Fixed Region Centroid Pins */}
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

          {/* Right Column: Clean Ethnic Groups Cards Panel */}
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

                {/* Section Title & Instruction */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-vn-gold/20">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-vn-gold uppercase tracking-wider">
                    <Users className="w-4 h-4 text-vn-gold" />
                    <span>Các Dân Tộc Cư Trú Tại Vùng ({activeRegion.ethnicGroups.length})</span>
                  </div>
                  <span className="text-[11px] sm:text-xs text-vn-ivory/60 italic hidden sm:inline">
                    Bấm vào dân tộc để xem chi tiết
                  </span>
                </div>

                {/* Clean Grid of Ethnic Boxes - Only Name as Title */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[440px] overflow-y-auto pr-1.5 custom-scrollbar">
                  {activeRegion.ethnicGroups.map((eth, i) => {
                    const details = getEthnicDetails(eth);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleOpenEthnic(eth)}
                        className="group relative flex flex-col justify-between p-3.5 rounded-2xl bg-vn-black/75 hover:bg-vn-red-deep/30 border border-vn-gold/30 hover:border-vn-gold transition-all duration-200 text-left shadow-md hover:shadow-lg hover:shadow-vn-gold/10 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-vn-gold cursor-pointer"
                        title={`Xem chi tiết dân tộc ${eth}`}
                      >
                        <div className="flex items-center justify-between gap-1 w-full mb-1">
                          <span className="font-display font-bold text-sm sm:text-base text-white group-hover:text-vn-gold transition-colors line-clamp-1">
                            {eth}
                          </span>
                          <ChevronRight className="w-4 h-4 text-vn-gold/40 group-hover:text-vn-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                        {details?.population ? (
                          <span className="text-[11px] text-vn-ivory/60 font-mono line-clamp-1">
                            {details.population.replace(/\s*\(.*?\)/, '')}
                          </span>
                        ) : (
                          <span className="text-[11px] text-vn-gold/60 font-sans italic">
                            Xem hồ sơ →
                          </span>
                        )}
                      </button>
                    );
                  })}
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

      {/* Blurred & Dimmed Backdrop Overlay (Focal Effect) */}
      {selectedEthnic && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] transition-opacity duration-300"
          onClick={() => setSelectedEthnic(null)}
          aria-label="Đóng chi tiết dân tộc"
        />
      )}

      {/* Slide-in Right Side Drawer Modal */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-[#0d1017] border-l-2 border-vn-gold/60 shadow-[0_0_80px_rgba(0,0,0,0.95)] z-[101] flex flex-col transition-transform duration-300 ease-out transform ${
          selectedEthnic ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        aria-modal="true"
        role="dialog"
      >
        {selectedEthnic && (
          <>
            {/* Sticky Drawer Header */}
            <div className="sticky top-0 z-20 bg-[#0d1017]/95 backdrop-blur-md border-b border-vn-gold/30 p-5 sm:p-6 pb-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-vn-red/80 text-white border border-vn-gold/40 shadow-sm">
                      54 Dân tộc Việt Nam
                    </span>
                    {selectedEthnic.regionNames && selectedEthnic.regionNames.length > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-vn-charcoal text-vn-gold border border-vn-gold/30">
                        {selectedEthnic.regionNames.join(' · ')}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight flex flex-wrap items-baseline gap-2">
                    <span>Dân tộc {selectedEthnic.name}</span>
                    {selectedEthnic.alternateName && (
                      <span className="text-sm font-normal text-vn-ivory/60 italic">
                        ({selectedEthnic.alternateName})
                      </span>
                    )}
                  </h3>
                  {selectedEthnic.tagline && (
                    <p className="text-xs sm:text-sm text-vn-ivory/80 mt-1 font-light italic">
                      {selectedEthnic.tagline}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setSelectedEthnic(null)}
                  className="p-2 sm:px-3 sm:py-2 rounded-xl bg-vn-charcoal text-vn-ivory hover:text-white hover:bg-vn-red-deep/50 border border-vn-gold/30 hover:border-vn-gold transition-all flex items-center gap-1.5 shrink-0 shadow-md group cursor-pointer"
                  title="Đóng (Phím ESC)"
                >
                  <X className="w-5 h-5 text-vn-gold group-hover:rotate-90 transition-transform duration-200" />
                  <span className="text-xs font-bold hidden sm:inline">Đóng</span>
                </button>
              </div>

              {/* Quick Nav Anchors for the 7 sections */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 custom-scrollbar">
                {[
                  { id: 'overview', label: '1. Khái quát' },
                  { id: 'language', label: '2. Ngôn ngữ' },
                  { id: 'customs', label: '3. Phong tục' },
                  { id: 'cuisine', label: '4. Ẩm thực' },
                  { id: 'art', label: '5. Nghệ thuật' },
                  { id: 'history', label: '6. Lịch sử' },
                  { id: 'video', label: '7. Video' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      const el = document.getElementById(`drawer-sec-${tab.id}`);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap bg-vn-black/70 text-vn-ivory/80 hover:text-vn-gold hover:border-vn-gold border border-vn-ivory/15 transition-all cursor-pointer"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Drawer Body with all 7 Sections */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 custom-scrollbar">
              {/* Section 1: Khái quát */}
              <div id="drawer-sec-overview" className="p-5 rounded-2xl bg-vn-charcoal/80 border border-vn-gold/30 shadow-md scroll-mt-36">
                <div className="flex items-center gap-2 text-vn-gold font-bold text-base mb-3 border-b border-vn-gold/20 pb-2">
                  <BookOpen className="w-5 h-5 text-vn-gold shrink-0" />
                  <h4>1. Khái quát</h4>
                </div>
                {selectedEthnic.sections?.overview?.highlights?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {selectedEthnic.sections.overview.highlights.map((hl, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-vn-black/60 border border-vn-gold/15 text-xs text-vn-ivory/90 leading-relaxed font-medium">
                        {hl}
                      </div>
                    ))}
                  </div>
                )}
                {selectedEthnic.sections?.overview?.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-sm text-vn-ivory/85 leading-relaxed mb-2 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>

              {/* Section 2: Ngôn ngữ */}
              <div id="drawer-sec-language" className="p-5 rounded-2xl bg-vn-charcoal/80 border border-vn-gold/30 shadow-md scroll-mt-36">
                <div className="flex items-center gap-2 text-vn-gold font-bold text-base mb-3 border-b border-vn-gold/20 pb-2">
                  <Languages className="w-5 h-5 text-cyan-400 shrink-0" />
                  <h4>2. Ngôn ngữ</h4>
                </div>
                {selectedEthnic.sections?.language?.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-sm text-vn-ivory/85 leading-relaxed mb-2 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>

              {/* Section 3: Phong tục - tập quán */}
              <div id="drawer-sec-customs" className="p-5 rounded-2xl bg-vn-charcoal/80 border border-vn-gold/30 shadow-md scroll-mt-36">
                <div className="flex items-center gap-2 text-vn-gold font-bold text-base mb-3 border-b border-vn-gold/20 pb-2">
                  <Home className="w-5 h-5 text-amber-400 shrink-0" />
                  <h4>3. Phong tục - tập quán</h4>
                </div>
                {selectedEthnic.sections?.customs?.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-sm text-vn-ivory/85 leading-relaxed mb-2.5 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>

              {/* Section 4: Ẩm thực */}
              <div id="drawer-sec-cuisine" className="p-5 rounded-2xl bg-vn-charcoal/80 border border-vn-gold/30 shadow-md scroll-mt-36">
                <div className="flex items-center gap-2 text-vn-gold font-bold text-base mb-3 border-b border-vn-gold/20 pb-2">
                  <UtensilsCrossed className="w-5 h-5 text-emerald-400 shrink-0" />
                  <h4>4. Ẩm thực</h4>
                </div>
                {selectedEthnic.sections?.cuisine?.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-sm text-vn-ivory/85 leading-relaxed mb-2 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>

              {/* Section 5: Nghệ thuật */}
              <div id="drawer-sec-art" className="p-5 rounded-2xl bg-vn-charcoal/80 border border-vn-gold/30 shadow-md scroll-mt-36">
                <div className="flex items-center gap-2 text-vn-gold font-bold text-base mb-3 border-b border-vn-gold/20 pb-2">
                  <Music className="w-5 h-5 text-rose-400 shrink-0" />
                  <h4>5. Nghệ thuật</h4>
                </div>
                {selectedEthnic.sections?.art?.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-sm text-vn-ivory/85 leading-relaxed mb-2.5 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>

              {/* Section 6: Lịch sử */}
              <div id="drawer-sec-history" className="p-5 rounded-2xl bg-vn-charcoal/80 border border-vn-gold/30 shadow-md scroll-mt-36">
                <div className="flex items-center gap-2 text-vn-gold font-bold text-base mb-3 border-b border-vn-gold/20 pb-2">
                  <Landmark className="w-5 h-5 text-indigo-400 shrink-0" />
                  <h4>6. Lịch sử</h4>
                </div>
                {selectedEthnic.sections?.history?.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-sm text-vn-ivory/85 leading-relaxed mb-2 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>

              {/* Section 7: Video */}
              <div id="drawer-sec-video" className="p-5 rounded-2xl bg-gradient-to-br from-vn-charcoal to-vn-black border-2 border-vn-gold/40 shadow-xl scroll-mt-36">
                <div className="flex items-center justify-between gap-2 mb-3 border-b border-vn-gold/20 pb-2">
                  <div className="flex items-center gap-2 text-vn-gold font-bold text-base">
                    <Video className="w-5 h-5 text-red-500 shrink-0" />
                    <h4>7. Video Tư Liệu & Phóng Sự</h4>
                  </div>
                  {selectedEthnic.sections?.video?.source && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-600/80 text-white border border-red-400/30">
                      {selectedEthnic.sections.video.source}
                    </span>
                  )}
                </div>

                <h5 className="font-display font-bold text-base text-white mb-2">
                  {selectedEthnic.sections?.video?.videoTitle || `Văn hóa dân tộc ${selectedEthnic.name}`}
                </h5>

                {selectedEthnic.sections?.video?.description && (
                  <p className="text-xs sm:text-sm text-vn-ivory/80 leading-relaxed mb-4">
                    {selectedEthnic.sections.video.description}
                  </p>
                )}

                {/* Embedded YouTube video player */}
                {selectedEthnic.sections?.video?.embedUrl ? (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-vn-gold/30 shadow-lg mb-3 bg-black">
                    <iframe
                      src={selectedEthnic.sections.video.embedUrl}
                      title={selectedEthnic.sections.video.videoTitle}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : null}

                {/* Direct Link to YouTube */}
                {selectedEthnic.sections?.video?.url && (
                  <a
                    href={selectedEthnic.sections.video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-vn-red hover:bg-vn-red-deep text-white text-xs sm:text-sm font-bold border border-vn-gold/40 shadow-md transition-all hover:scale-105"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Xem tư liệu trên YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </aside>

    </section>
  );
}
