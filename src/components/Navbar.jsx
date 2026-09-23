import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Compass, BookOpen, MapPin, Award, Layers } from 'lucide-react';
import { soundSynth } from '../utils/soundSynth';

export default function Navbar({ autoScrollActive, onToggleAutoScroll }) {
  const [scrolled, setScrolled] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const playing = soundSynth.toggle();
    setIsAudioPlaying(playing);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundSynth.setVolume(val);
  };

  const navItems = [
    { label: "Bản thể", href: "#chuong-1" },
    { label: "Cương lĩnh", href: "#chuong-2" },
    { label: "54 Dân tộc", href: "#chuong-3" },
    { label: "Tôn giáo", href: "#chuong-4" },
    { label: "Bản đồ", href: "#ban-do-tuong-tac" },
    { label: "Chính sách", href: "#chuong-6" },
    { label: "Tư liệu", href: "#thu-vien-tu-lieu" },
    { label: "Trắc nghiệm", href: "#trac-nghiem-on-tap" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-vn-black/85 backdrop-blur-md border-b border-vn-gold-antique/20 py-2.5 shadow-2xl' 
        : 'bg-gradient-to-b from-vn-black/90 to-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Logo & Subject Info */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-vn-red-deep border border-vn-gold flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            {/* Dong Son mini star */}
            <svg viewBox="0 0 32 32" className="w-5 h-5 fill-vn-gold">
              <circle cx="16" cy="16" r="14" fill="none" stroke="#FFCD00" strokeWidth="1" strokeDasharray="1 2"/>
              <polygon points="16,2 17,11 25,7 19,13 28,16 19,19 25,25 17,21 16,30 15,21 7,25 13,19 4,16 13,13 7,7 15,11"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base sm:text-lg tracking-wide text-vn-gold">
                MLN131
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-vn-red/40 border border-vn-gold/40 text-vn-ivory tracking-widest">
                Nhánh 2D
              </span>
            </div>
            <p className="text-[11px] text-vn-ivory/70 hidden sm:block">
              Chương 6: Vấn đề Dân tộc & Tôn giáo
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2.5 py-1.5 rounded-md text-vn-ivory/80 hover:text-vn-gold hover:bg-white/5 transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Audio + Auto-Scroll */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Audio Synthesizer Controller */}
          <div className="flex items-center gap-1.5 bg-vn-charcoal/80 border border-vn-gold-antique/30 px-2.5 py-1 rounded-full shadow-inner">
            <button
              onClick={handleToggleAudio}
              title={isAudioPlaying ? "Tắt âm hưởng truyền thống" : "Bật âm hưởng cồng chiêng ngũ cung"}
              className={`p-1 rounded-full transition-colors ${
                isAudioPlaying ? 'text-vn-gold hover:text-white' : 'text-vn-ivory/50 hover:text-vn-gold'
              }`}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>
            {isAudioPlaying && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-14 sm:w-16 h-1 accent-vn-gold bg-vn-ivory/20 rounded cursor-pointer"
                title={`Âm lượng: ${Math.round(volume * 100)}%`}
              />
            )}
          </div>

          {/* Auto Scroll Button */}
          <button
            onClick={onToggleAutoScroll}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              autoScrollActive
                ? 'bg-vn-red text-white border-vn-gold shadow-lg shadow-vn-red/40 animate-pulse'
                : 'bg-vn-charcoal/80 text-vn-ivory/80 border-vn-gold-antique/30 hover:border-vn-gold hover:text-vn-gold'
            }`}
            title={autoScrollActive ? "Dừng cuộn tự động" : "Bắt đầu chế độ thưởng lãm điện ảnh tự động"}
          >
            {autoScrollActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{autoScrollActive ? "Dừng cuộn" : "Tự cuộn"}</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-vn-ivory hover:text-vn-gold"
          >
            <Compass className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-vn-charcoal/95 border-b border-vn-gold/30 px-4 py-3 mt-2 space-y-2 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded bg-black/40 text-vn-ivory/80 hover:text-vn-gold hover:bg-vn-red-deep/30"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
