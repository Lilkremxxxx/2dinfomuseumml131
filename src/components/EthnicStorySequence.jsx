import React, { useEffect, useRef, useState } from 'react';
import territoryMap from '../../Image/bản đồ việt nam11.png';
import economyOne from '../../Image/Cộng đồng kinh tế/cộgn đồng kinh tế.jpg';
import economyTwo from '../../Image/Cộng đồng kinh tế/cộng đồng kinh tếế2.jpg';
import cultureOne from '../../Image/Cộng đồng ngôn ngữ/cộng đồng văn hóa ngôn ngữ.jpg';
import cultureTwo from '../../Image/Cộng đồng ngôn ngữ/cộng đồng văn hóa và ngôn ngữ.jpg';
import cultureThree from '../../Image/Cộng đồng ngôn ngữ/cộng đồng văn hóa và ngôn ngữ 2.jpg';
import communityPhoto from '../../Image/ảnh đồng bào.jpg';
import fiveElementsMap from '../../Image/bản đồ phần 5 mảnh ghép.png';

const elements = ['Lãnh thổ', 'Nhà nước', 'Kinh tế', 'Văn hóa', 'Ngôn ngữ', 'Dân tộc'];
const scenes = [
  { type: 'blank' },
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
  ...elements.map((text, index) => ({ type: 'element', text, index })),
  { type: 'image', text: 'Năm yếu tố cấu thành dân tộc', src: fiveElementsMap, alt: 'Bản đồ năm mảnh ghép cấu thành dân tộc' },
];

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
        <p>{scene.text}</p>
      </div>
    );
  }

  if (scene.type === 'element') {
    return (
      <div className="story-element-scene">
        <span className="story-eyebrow">MẢNH GHÉP {scene.index + 1} / 6</span>
        <h2 key={scene.text}>{scene.text}</h2>
      </div>
    );
  }

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
      aria-label="Hành trình khám phá khái niệm dân tộc"
    >
      <div className="ethnic-story-stage">
        <div className="ethnic-story-content" key={activeScene}>
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
