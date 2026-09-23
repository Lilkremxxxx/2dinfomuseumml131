import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import TimelineIndicator from './components/TimelineIndicator';
import Hero from './components/Hero';
import WordCascade from './components/WordCascade';
import ChapterSection from './components/ChapterSection';
import QuoteSection from './components/QuoteSection';
import InteractiveVietnamMap from './components/InteractiveVietnamMap';
import ArchivalGallery from './components/ArchivalGallery';
import KnowledgeQuiz from './components/KnowledgeQuiz';
import Footer from './components/Footer';
import { CHAPTERS_DATA } from './data/chaptersData';

export default function App() {
  const [autoScrollActive, setAutoScrollActive] = useState(false);
  const scrollIntervalRef = useRef(null);

  // Auto-scroll logic (Cinematic slow scroll down)
  const toggleAutoScroll = () => {
    setAutoScrollActive(prev => !prev);
  };

  useEffect(() => {
    if (autoScrollActive) {
      scrollIntervalRef.current = setInterval(() => {
        window.scrollBy({ top: 1.5, behavior: 'auto' });
        // Check if reached bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
          setAutoScrollActive(false);
        }
      }, 25);
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [autoScrollActive]);

  const ch1 = CHAPTERS_DATA.find(c => c.id === 'chuong-1');
  const ch2 = CHAPTERS_DATA.find(c => c.id === 'chuong-2');
  const ch3 = CHAPTERS_DATA.find(c => c.id === 'chuong-3');
  const ch4 = CHAPTERS_DATA.find(c => c.id === 'chuong-4');
  const ch5 = CHAPTERS_DATA.find(c => c.id === 'chuong-5');
  const ch6 = CHAPTERS_DATA.find(c => c.id === 'chuong-6');

  return (
    <div className="relative min-h-screen bg-vn-black text-vn-ivory overflow-x-hidden">
      
      {/* Film grain and vignette fixed atmospheric layers */}
      <div className="film-grain" />
      <div className="film-vignette" />

      {/* Top Navbar */}
      <Navbar 
        autoScrollActive={autoScrollActive} 
        onToggleAutoScroll={toggleAutoScroll} 
      />

      {/* Vertical Timeline Progress Bar */}
      <TimelineIndicator />

      {/* Main Content Flow */}
      <main>
        {/* 00. Hero Entrance */}
        <Hero />

        {/* 01. Interlude 1: Lenin's Principles */}
        <WordCascade
          eyebrow="Cương Lĩnh Dân Tộc Của V.I. Lênin (1913 - 1914)"
          words={['BÌNH ĐẲNG', 'TỰ QUYẾT', 'LIÊN HIỆP', 'CÔNG NHÂN']}
          accentWords={['BÌNH ĐẲNG', 'LIÊN HIỆP']}
        />

        {/* 02. Hồi I: Bản Thể & Đặc Trưng Dân Tộc */}
        {ch1 && <ChapterSection chapter={ch1} />}

        {/* 03. Hồi II: Hai Xu Hướng & Cương Lĩnh Lênin */}
        {ch2 && <ChapterSection chapter={ch2} />}

        {/* 04. Verified Quote Section */}
        <QuoteSection />

        {/* 05. Hồi III: 6 Đặc Điểm Dân Tộc Việt Nam & Khối Đại Đoàn Kết */}
        {ch3 && <ChapterSection chapter={ch3} />}

        {/* 06. Interlude 2: Religious Harmony */}
        <WordCascade
          eyebrow="Phương Châm Tôn Giáo Tại Việt Nam"
          words={['TỰ DO TÍN NGƯỠNG', 'TỐT ĐỜI ĐẸP ĐẠO', 'ĐỒNG HÀNH', 'CÙNG DÂN TỘC']}
          accentWords={['TỐT ĐỜI ĐẸP ĐẠO', 'CÙNG DÂN TỘC']}
        />

        {/* 07. Hồi IV: Bản Chất, Nguồn Gốc & Tính Chất Tôn Giáo */}
        {ch4 && <ChapterSection chapter={ch4} />}

        {/* 08. Hồi V: Đặc Điểm Tôn Giáo & Mối Quan Hệ Đan Xen Dân Tộc - Tôn Giáo */}
        {ch5 && <ChapterSection chapter={ch5} />}

        {/* 09. Interactive 2D Vietnam Map */}
        <InteractiveVietnamMap />

        {/* 10. Hồi VI: Đường Lối & Chính Sách Toàn Diện Của Đảng, Nhà Nước */}
        {ch6 && <ChapterSection chapter={ch6} />}

        {/* 11. Archival Gallery */}
        <ArchivalGallery />

        {/* 12. Knowledge Quiz Room */}
        <KnowledgeQuiz />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
