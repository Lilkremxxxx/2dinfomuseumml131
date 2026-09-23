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

  // 1. Lenis Smooth Scroll synchronised with GSAP ScrollTrigger ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger calculations when images and fonts settle
    const refresh = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh);
    }
    const settleTimer = setTimeout(refresh, 500);

    let lastW = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth;
        refresh();
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      window.removeEventListener('load', refresh);
      window.removeEventListener('resize', onResize);
      clearTimeout(settleTimer);
    };
  }, []);

  // 2. Smooth Auto-scroll logic (documentary continuous playback)
  const toggleAutoScroll = () => {
    setAutoScrollActive(prev => !prev);
  };

  useEffect(() => {
    let animId;
    if (autoScrollActive) {
      const scrollStep = () => {
        window.scrollBy(0, 1.5);
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
          setAutoScrollActive(false);
          return;
        }
        animId = requestAnimationFrame(scrollStep);
      };
      animId = requestAnimationFrame(scrollStep);
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
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
    <div className="relative min-h-screen bg-vn-black text-vn-ivory selection:bg-vn-red selection:text-vn-gold">
      
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
        {/* 00. Hero Entrance (Pinned stage) */}
        <Hero />

        {/* 01. Mốc 1: Bản thể Dân tộc (Quốc gia vs Tộc người) */}
        {mNation && <MilestoneChapter milestone={mNation} reverse={false} />}

        {/* 02. Chuyển đoạn 1: Ba nguyên tắc Cương lĩnh Lênin */}
        <WordCascade
          id="cascade-lenin"
          eyebrow="Cương Lĩnh Dân Tộc Của V.I. Lênin (1913 — 1914)"
          items={[
            {
              word: 'BÌNH ĐẲNG',
              tag: 'NGUYÊN TẮC THỨ NHẤT',
              quote: 'Các dân tộc hoàn toàn bình đẳng',
              desc: 'Quyền thiêng liêng, không một dân tộc nào có đặc quyền hay bị kỳ thị, áp bức trong mọi lĩnh vực đời sống xã hội.'
            },
            {
              word: 'TỰ QUYẾT',
              tag: 'NGUYÊN TẮC THỨ HAI',
              quote: 'Các dân tộc được quyền tự quyết',
              desc: 'Quyền tự định đoạt chế độ chính trị và con đường phát triển; quyền tự do phân lập hoặc tự nguyện liên hiệp.'
            },
            {
              word: 'LIÊN HIỆP',
              tag: 'NGUYÊN TẮC THỨ BA',
              quote: 'Liên hiệp công nhân tất cả các dân tộc',
              desc: 'Tư tưởng cốt lõi và ngọn cờ tập hợp sức mạnh giai cấp vô sản quốc tế cùng các dân tộc bị áp bức toàn thế giới.'
            },
            {
              word: 'CÔNG NHÂN',
              tag: 'LỰC LƯỢNG TIÊN PHONG',
              quote: 'Giai cấp công nhân dẫn dắt sự nghiệp giải phóng',
              desc: 'Bảo đảm phong trào dân tộc kiên định mục tiêu độc lập dân tộc gắn liền với chủ nghĩa xã hội.'
            }
          ]}
        />

        {/* 03. Mốc 2: Cương lĩnh Dân tộc V.I. Lênin */}
        {mLenin && <MilestoneChapter milestone={mLenin} reverse={true} />}

        {/* 04. Mốc 3: Khối Đại đoàn kết 54 Dân tộc & Thư Pleiku 1946 */}
        {mUnity && <MilestoneChapter milestone={mUnity} reverse={false} />}

        {/* 05. Trích dẫn kiểm chứng: Lênin, Bác Hồ, Hiến pháp */}
        <QuoteSection />

        {/* 06. Chuyển đoạn 2: Tôn giáo đồng hành */}
        <WordCascade
          id="cascade-religion"
          eyebrow="Phương Châm Tôn Giáo Tại Việt Nam"
          items={[
            {
              word: 'TỰ DO TÍN NGƯỠNG',
              tag: 'QUYỀN CƠ BẢN',
              quote: 'Tôn trọng & bảo đảm tự do tín ngưỡng',
              desc: 'Mọi công dân có quyền theo hoặc không theo bất kỳ tôn giáo nào; các tổ chức tôn giáo bình đẳng trước pháp luật.'
            },
            {
              word: 'TỐT ĐỜI ĐẸP ĐẠO',
              tag: 'PHƯƠNG CHÂM HÀNH ĐẠO',
              quote: 'Sống tốt đời, đẹp đạo',
              desc: 'Dung hợp giáo lý tôn giáo chân chính với lòng yêu nước, đạo lý nhân văn và trách nhiệm công dân phụng sự Tổ quốc.'
            },
            {
              word: 'ĐỒNG HÀNH',
              tag: 'TRUYỀN THỐNG LỊCH SỬ',
              quote: 'Gắn bó máu thịt cùng non sông đất nước',
              desc: 'Các tôn giáo luôn chung vai sát cánh cùng nhân dân trong kháng chiến cứu quốc và công cuộc xây dựng chủ nghĩa xã hội.'
            },
            {
              word: 'CÙNG DÂN TỘC',
              tag: 'ĐẠI ĐOÀN KẾT TOÀN DÂN',
              quote: 'Đoàn kết đồng bào có đạo và không có đạo',
              desc: 'Củng cố khối đại đoàn kết toàn dân tộc dưới sự lãnh đạo của Đảng vì mục tiêu dân giàu, nước mạnh, dân chủ, văn minh.'
            }
          ]}
        />

        {/* 07. Mốc 4: Bản chất & 3 Nguồn gốc Tôn giáo */}
        {mRelNature && <MilestoneChapter milestone={mRelNature} reverse={true} />}

        {/* 08. Mốc 5: Hòa hợp Tôn giáo (Chùa Một Cột) */}
        {mRelHarmony && <MilestoneChapter milestone={mRelHarmony} reverse={false} />}

        {/* 09. Mốc 6: Nhà thờ đá Phát Diệm (Giao thoa văn hóa) */}
        {mPhatDiem && <MilestoneChapter milestone={mPhatDiem} reverse={true} />}

        {/* 10. Mốc 7: Đạo Cao Đài & Tôn giáo Phương Nam */}
        {mCaoDai && <MilestoneChapter milestone={mCaoDai} reverse={false} />}

        {/* 11. Mốc 8: Trận tuyến An ninh Tư tưởng (Chống Diễn biến hòa bình) */}
        {mSecurity && <MilestoneChapter milestone={mSecurity} reverse={true} />}

        {/* 12. Bản đồ 2D Tương tác 6 Vùng Sinh thái Nhân văn & Tôn giáo */}
        <InteractiveVietnamMap />

        {/* 13. Mốc 9: Hiến pháp 2013 & Luật Tín ngưỡng Tôn giáo 2016 */}
        {mConstitution && <MilestoneChapter milestone={mConstitution} reverse={false} />}

        {/* 14. Mốc 10: Cột cờ Lũng Cú (Non sông liền một dải) */}
        {mFlag && <MilestoneChapter milestone={mFlag} reverse={true} />}

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
