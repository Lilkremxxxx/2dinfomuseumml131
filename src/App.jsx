import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './lib/gsap';
import Navbar from './components/Navbar';
import TimelineIndicator from './components/TimelineIndicator';
import Hero from './components/Hero';
import WordCascade from './components/WordCascade';
import MilestoneChapter from './components/MilestoneChapter';
import QuoteSection from './components/QuoteSection';
import InteractiveVietnamMap from './components/InteractiveVietnamMap';
import ArchivalGallery from './components/ArchivalGallery';
import KnowledgeQuiz from './components/KnowledgeQuiz';
import Footer from './components/Footer';
import { MILESTONES_DATA } from './data/milestonesData';

export default function App() {
  const [autoScrollActive, setAutoScrollActive] = useState(false);
  const scrollIntervalRef = useRef(null);

  // 1. Lenis Smooth Scroll synchronised with GSAP ScrollTrigger ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // 2. Auto-scroll logic (documentary slow playback)
  const toggleAutoScroll = () => {
    setAutoScrollActive(prev => !prev);
  };

  useEffect(() => {
    if (autoScrollActive) {
      scrollIntervalRef.current = setInterval(() => {
        window.scrollBy({ top: 2, behavior: 'auto' });
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 15) {
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

  // Find milestones
  const mNation = MILESTONES_DATA.find(m => m.id === 'm-nation');
  const mLenin = MILESTONES_DATA.find(m => m.id === 'm-lenin');
  const mUnity = MILESTONES_DATA.find(m => m.id === 'm-unity');
  const mRelNature = MILESTONES_DATA.find(m => m.id === 'm-religion-nature');
  const mRelHarmony = MILESTONES_DATA.find(m => m.id === 'm-religion-harmony');
  const mPhatDiem = MILESTONES_DATA.find(m => m.id === 'm-phatdiem');
  const mCaoDai = MILESTONES_DATA.find(m => m.id === 'm-caodai');
  const mSecurity = MILESTONES_DATA.find(m => m.id === 'm-security');
  const mConstitution = MILESTONES_DATA.find(m => m.id === 'm-constitution');
  const mFlag = MILESTONES_DATA.find(m => m.id === 'm-flag');

  return (
    <div className="relative min-h-screen bg-vn-black text-vn-ivory selection:bg-vn-red selection:text-vn-gold overflow-x-hidden">
      
      {/* Atmospheric overlays */}
      <div className="film-grain" />
      <div className="film-vignette" />

      {/* Top Navbar */}
      <Navbar 
        autoScrollActive={autoScrollActive} 
        onToggleAutoScroll={toggleAutoScroll} 
      />

      {/* Vertical Timeline Indicator */}
      <TimelineIndicator />

      {/* Main Cinematic Scrollytelling Sequence */}
      <main>
        {/* 00. Hero Entrance (Pinned 320vh stage) */}
        <Hero />

        {/* 01. Mốc 1: Bản thể Dân tộc (Quốc gia vs Tộc người) */}
        {mNation && <MilestoneChapter milestone={mNation} />}

        {/* 02. Chuyển đoạn 1: Ba nguyên tắc Cương lĩnh Lênin */}
        <WordCascade
          eyebrow="Cương Lĩnh Dân Tộc Của V.I. Lênin (1913 — 1914)"
          words={['BÌNH ĐẲNG', 'TỰ QUYẾT', 'LIÊN HIỆP', 'CÔNG NHÂN']}
          accentWords={['BÌNH ĐẲNG', 'LIÊN HIỆP']}
          perWordVh={80}
        />

        {/* 03. Mốc 2: Cương lĩnh Dân tộc V.I. Lênin */}
        {mLenin && <MilestoneChapter milestone={mLenin} />}

        {/* 04. Mốc 3: Khối Đại đoàn kết 54 Dân tộc & Thư Pleiku 1946 */}
        {mUnity && <MilestoneChapter milestone={mUnity} />}

        {/* 05. Trích dẫn kiểm chứng: Lênin, Bác Hồ, Hiến pháp */}
        <QuoteSection />

        {/* 06. Chuyển đoạn 2: Tôn giáo đồng hành */}
        <WordCascade
          eyebrow="Phương Châm Tôn Giáo Tại Việt Nam"
          words={['TỰ DO TÍN NGƯỠNG', 'TỐT ĐỜI ĐẸP ĐẠO', 'ĐỒNG HÀNH', 'CÙNG DÂN TỘC']}
          accentWords={['TỐT ĐỜI ĐẸP ĐẠO', 'CÙNG DÂN TỘC']}
          perWordVh={80}
        />

        {/* 07. Mốc 4: Bản chất & 3 Nguồn gốc Tôn giáo */}
        {mRelNature && <MilestoneChapter milestone={mRelNature} />}

        {/* 08. Mốc 5: Hòa hợp Tôn giáo (Chùa Một Cột) */}
        {mRelHarmony && <MilestoneChapter milestone={mRelHarmony} />}

        {/* 09. Mốc 6: Nhà thờ đá Phát Diệm (Giao thoa văn hóa) */}
        {mPhatDiem && <MilestoneChapter milestone={mPhatDiem} />}

        {/* 10. Mốc 7: Đạo Cao Đài & Tôn giáo Phương Nam */}
        {mCaoDai && <MilestoneChapter milestone={mCaoDai} />}

        {/* 11. Mốc 8: Trận tuyến An ninh Tư tưởng (Chống Diễn biến hòa bình) */}
        {mSecurity && <MilestoneChapter milestone={mSecurity} />}

        {/* 12. Bản đồ 2D Tương tác 6 Vùng Sinh thái Nhân văn & Tôn giáo */}
        <InteractiveVietnamMap />

        {/* 13. Mốc 9: Hiến pháp 2013 & Luật Tín ngưỡng Tôn giáo 2016 */}
        {mConstitution && <MilestoneChapter milestone={mConstitution} />}

        {/* 14. Mốc 10: Cột cờ Lũng Cú (Non sông liền một dải) */}
        {mFlag && <MilestoneChapter milestone={mFlag} />}

        {/* 15. Kho Lưu trữ Di sản & Hiện vật số */}
        <ArchivalGallery />

        {/* 16. Phòng Khảo thí Trắc nghiệm 10 câu MLN131 */}
        <KnowledgeQuiz />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
