import React, { useEffect, useRef, useState } from 'react';
import { Coins, Languages, Landmark, Map, Palette, UsersRound } from 'lucide-react';
import territoryMap from '../../Image/bản đồ việt nam11.png';
import economyOne from '../../Image/Cộng đồng kinh tế/cộgn đồng kinh tế.jpg';
import economyTwo from '../../Image/Cộng đồng kinh tế/cộng đồng kinh tếế2.jpg';
import cultureOne from '../../Image/Cộng đồng ngôn ngữ/cộng đồng văn hóa ngôn ngữ.jpg';
import cultureTwo from '../../Image/Cộng đồng ngôn ngữ/cộng đồng văn hóa và ngôn ngữ.jpg';
import cultureThree from '../../Image/Cộng đồng ngôn ngữ/cộng đồng văn hóa và ngôn ngữ 2.jpg';
import communityPhoto from '../../Image/ảnh đồng bào.jpg';
import fiveElementsMap from '../../Image/bản đồ phần 5 mảnh ghép.png';

const elements = [
  { text: 'Lãnh Thổ', icon: Map },
  { text: 'Kinh Tế', icon: Coins },
  { text: 'Ngôn Ngữ', icon: Languages },
  { text: 'Văn Hóa', icon: Palette },
  { text: 'Nhà Nước', icon: Landmark },
];
const scenes = [
  { type: 'title', text: 'Bắt đầu', layout: 'start' },
  { type: 'title', text: 'Dân tộc là gì' },
  { type: 'title', lines: ['Là cộng đồng về', 'lãnh thổ'], eyebrow: 'ĐẶC TRƯNG THỨ NHẤT', layout: 'two-lines' },
  { type: 'image', text: 'Một lãnh thổ thống nhất', src: territoryMap, alt: 'Bản đồ Việt Nam' },
  { type: 'title', text: 'Cộng đồng về kinh tế', eyebrow: 'ĐẶC TRƯNG THỨ HAI', layout: 'single-line' },
  { type: 'image', text: 'Cùng gắn bó trong đời sống kinh tế', src: economyOne, alt: 'Cộng đồng kinh tế' },
  { type: 'image', text: 'Cùng lao động và phát triển', src: economyTwo, alt: 'Đời sống kinh tế cộng đồng' },
  { type: 'title', lines: ['Là cộng đồng về văn hóa', 'và ngôn ngữ'], eyebrow: 'ĐẶC TRƯNG THỨ BA', layout: 'two-lines' },
  { type: 'image', text: 'Bản sắc văn hóa được gìn giữ', src: cultureOne, alt: 'Cộng đồng văn hóa' },
  { type: 'image', text: 'Ngôn ngữ kết nối cộng đồng', src: cultureTwo, alt: 'Cộng đồng văn hóa và ngôn ngữ' },
  { type: 'image', text: 'Đa dạng trong thống nhất', src: cultureThree, alt: 'Văn hóa và ngôn ngữ các dân tộc' },
  { type: 'quote', text: 'Trong quan điểm của chủ nghĩa Mác – Lênin, dân tộc là quá trình phát triển lâu dài của xã hội loài người, trải qua các hình thức cộng đồng từ thấp đến cao, bao gồm: thị tộc, bộ lạc, bộ tộc, dân tộc. Sự biến đổi của phương thức sản xuất chính là nguyên nhân quyết định sự biến đổi của cộng đồng dân tộc.' },
  ...elements.map((_, index) => ({ type: 'pentagon', revealed: index + 1 })),
  { type: 'pentagon', revealed: 5, showCenter: true },
  { type: 'pentagon-converge', revealed: 5, showCenter: true },
  { type: 'image', src: fiveElementsMap, alt: 'Bản đồ Việt Nam kết hợp năm yếu tố cấu thành dân tộc' },
];

const pentagonPositions = [
  { x: 50, y: -5 }, { x: 107, y: 36 }, { x: 79, y: 102 }, { x: 21, y: 102 }, { x: -7, y: 36 },
];
const pentagonPointPositions = [
  { x: 50, y: 6.5 }, { x: 91.3, y: 36.5 }, { x: 75.5, y: 85 }, { x: 24.5, y: 85 }, { x: 8.7, y: 36.5 },
];

function PentagonScene({ scene }) {
  const [isConverging, setIsConverging] = useState(false);
  useEffect(() => {
    if (scene.type !== 'pentagon-converge') return undefined;
    const frame = requestAnimationFrame(() => setIsConverging(true));
    return () => cancelAnimationFrame(frame);
  }, [scene.type]);

  return (
    <div className={`story-pentagon ${isConverging ? 'story-pentagon--converging' : ''}`}>
      <svg className="story-pentagon-outline" viewBox="0 0 1000 1000" aria-hidden="true">
        <path d="M500 65 L913 365 L755 850 L245 850 L87 365 Z" style={{ strokeDashoffset: 3000 * (1 - scene.revealed / 5) }} />
      </svg>
      {elements.map(({ text, icon: Icon }, index) => {
        const position = pentagonPositions[index];
        const point = pentagonPointPositions[index];
        const visible = index < scene.revealed;
        return (
          <React.Fragment key={text}>
            <span className={`story-pentagon-point story-pentagon-point--${index} ${visible ? 'is-visible' : ''}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} />
            <div className={`story-pentagon-node story-pentagon-node--${index} ${visible ? 'is-visible' : ''}`} style={{ '--node-x': `${position.x}%`, '--node-y': `${position.y}%` }}>
              <Icon aria-hidden="true" />
              <span>{text}</span>
            </div>
          </React.Fragment>
        );
      })}
      {scene.showCenter && <div className="story-pentagon-center"><UsersRound aria-hidden="true" /><span>Dân Tộc</span></div>}
    </div>
  );
}

function SceneContent({ scene }) {
  if (scene.type === 'blank') return null;

  if (scene.type === 'quote') {
    return (
      <div className="story-quote" style={{ '--story-background': `url("${communityPhoto}")` }}>
        <p>
          Trong quan điểm của chủ nghĩa Mác – Lênin, dân tộc là quá trình phát triển lâu dài của xã hội loài người, trải qua các hình thức cộng đồng từ thấp đến cao, bao gồm: <span>thị tộc, bộ lạc, bộ tộc, dân tộc</span>. <span>Sự biến đổi của phương thức sản xuất chính là nguyên nhân quyết định sự biến đổi của cộng đồng dân tộc</span>.
        </p>
      </div>
    );
  }

  if (scene.type === 'image') {
    return (
      <div className="story-image-scene">
        <img src={scene.src} alt={scene.alt} />
        {scene.text && <p>{scene.text}</p>}
      </div>
    );
  }

  if (scene.type === 'pentagon' || scene.type === 'pentagon-converge') return <PentagonScene scene={scene} />;

  return (
    <div className={`story-title-scene ${scene.layout ? `story-title-scene--${scene.layout}` : ''}`}>
      {scene.eyebrow && <span className="story-eyebrow">{scene.eyebrow}</span>}
      <h2 key={scene.text || scene.lines?.join(' ')}>
        {scene.lines
          ? scene.lines.map((line) => <span key={line}>{line}</span>)
          : scene.text}
      </h2>
    </div>
  );
}

export default function EthnicStorySequence() {
  const sequenceRef = useRef(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateScene = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!sequenceRef.current) return;
        const distance = Math.max(0, window.scrollY - sequenceRef.current.offsetTop);
        const nextScene = Math.min(scenes.length - 1, Math.floor(distance / (window.innerHeight * 1.12)));
        setActiveScene((current) => current === nextScene ? current : nextScene);
      });
    };
    updateScene();
    window.addEventListener('scroll', updateScene, { passive: true });
    window.addEventListener('resize', updateScene);

    const slowFastWheel = (event) => {
      const section = sequenceRef.current;
      if (!section || Math.abs(event.deltaY) <= 240) return;
      const rect = section.getBoundingClientRect();
      if (rect.top <= 1 && rect.bottom > window.innerHeight) {
        event.preventDefault();
        window.scrollBy(0, Math.sign(event.deltaY) * 240);
      }
    };
    window.addEventListener('wheel', slowFastWheel, { passive: false });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateScene);
      window.removeEventListener('resize', updateScene);
      window.removeEventListener('wheel', slowFastWheel);
    };
  }, []);

  return (
    <section
      className="ethnic-story-sequence"
      ref={sequenceRef}
      style={{ height: `${scenes.length * 112}vh` }}
      id="dan-toc-kham-pha"
      aria-label="Hành trình khám phá khái niệm dân tộc"
    >
      <div className="ethnic-story-stage">
        <div
          className={`ethnic-story-content ${scenes[activeScene].type === 'quote' ? 'ethnic-story-content--quote' : ''}`}
          key={scenes[activeScene].type === 'pentagon' ? 'pentagon-sequence' : activeScene}
        >
          <SceneContent scene={scenes[activeScene]} />
        </div>
        <div className="ethnic-story-footer">
          <span>{String(activeScene + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</span>
          <span className="story-scroll-hint">Lăn chuột để tiếp tục <i aria-hidden="true" /></span>
        </div>
      </div>
    </section>
  );
}
