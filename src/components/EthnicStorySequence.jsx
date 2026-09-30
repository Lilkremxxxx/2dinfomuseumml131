import React, { useEffect, useRef, useState } from 'react';
import { Coins, Languages, Landmark, Map, Palette, UsersRound, X } from 'lucide-react';
import territoryMap from '../../Image/bản đồ việt nam11.png';
import economyOne from '../../Image/Cộng đồng kinh tế/cộgn đồng kinh tế.jpg';
import economyTwo from '../../Image/Cộng đồng kinh tế/cộng đồng kinh tếế2.jpg';
import cultureOne from '../../Image/Cộng đồng ngôn ngữ/cộng đồng văn hóa ngôn ngữ.jpg';
import cultureTwo from '../../Image/Cộng đồng ngôn ngữ/cộng đồng văn hóa và ngôn ngữ.jpg';
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
  { type: 'title', text: 'BẮT ĐẦU', layout: 'start' },
  { type: 'title', text: 'DÂN TỘC LÀ GÌ ?' },
  { type: 'feature', text: 'LÀ CỘNG ĐỒNG VỀ LÃNH THỔ', layout: 'territory', images: [{ src: territoryMap, alt: 'Bản đồ Việt Nam' }] },
  { type: 'feature', text: 'LÀ CỘNG ĐỒNG VỀ KINH TẾ', layout: 'single-line', images: [
    { src: economyOne, alt: 'Sinh hoạt và lao động kinh tế của cộng đồng' },
    { src: economyTwo, alt: 'Hoạt động kinh tế của cộng đồng' },
  ] },
  { type: 'feature', lines: ['LÀ CỘNG ĐỒNG VỀ VĂN HÓA', 'VÀ NGÔN NGỮ'], layout: 'two-lines', images: [
    { src: cultureOne, alt: 'Cộng đồng văn hóa và ngôn ngữ' },
    { src: cultureTwo, alt: 'Đời sống văn hóa của cộng đồng' },
  ] },
  { type: 'quote', text: 'Trong quan điểm của chủ nghĩa Mác – Lênin, dân tộc là quá trình phát triển lâu dài của xã hội loài người, trải qua các hình thức cộng đồng từ thấp đến cao, bao gồm: thị tộc, bộ lạc, bộ tộc, dân tộc. Sự biến đổi của phương thức sản xuất chính là nguyên nhân quyết định sự biến đổi của cộng đồng dân tộc.' },
  ...elements.map((_, index) => ({ type: 'pentagon', revealed: index + 1 })),
  { type: 'pentagon', revealed: 5, showCenter: true },
  { type: 'pentagon-converge', revealed: 5, showCenter: true },
  { type: 'image', src: fiveElementsMap, alt: 'Bản đồ Việt Nam kết hợp năm yếu tố cấu thành dân tộc', layout: 'five-elements-map' },
];
const SCENE_SCROLL_VIEWPORTS = 1.12;
const FINAL_MAP_EXTRA_SCROLL_VIEWPORTS = 3;

const pentagonPositions = [
  { x: 50, y: -5 }, { x: 107, y: 36 }, { x: 79, y: 102 }, { x: 21, y: 102 }, { x: -7, y: 36 },
];
const pentagonPointPositions = [
  { x: 50, y: 6.5 }, { x: 91.3, y: 36.5 }, { x: 75.5, y: 85 }, { x: 24.5, y: 85 }, { x: 8.7, y: 36.5 },
];

function PentagonScene({ scene }) {
  const [isConverging, setIsConverging] = useState(false);
  const [drawnEdges, setDrawnEdges] = useState(scene.type === 'pentagon-converge' ? scene.revealed : 0);
  useEffect(() => {
    if (scene.type === 'pentagon-converge') {
      setDrawnEdges(scene.revealed);
      return undefined;
    }
    const frame = requestAnimationFrame(() => setDrawnEdges(scene.revealed));
    return () => cancelAnimationFrame(frame);
  }, [scene.revealed, scene.type]);
  useEffect(() => {
    if (scene.type !== 'pentagon-converge') return undefined;
    const frame = requestAnimationFrame(() => setIsConverging(true));
    return () => cancelAnimationFrame(frame);
  }, [scene.type]);

  return (
    <div className={`story-pentagon ${isConverging ? 'story-pentagon--converging' : ''}`}>
      <svg className="story-pentagon-outline" viewBox="0 0 1000 1000" aria-hidden="true">
        <path d="M500 65 L913 365 L755 850 L245 850 L87 365 Z" pathLength="5" style={{ strokeDashoffset: 5 - drawnEdges }} />
      </svg>
      {elements.map(({ text, icon: Icon }, index) => {
        const position = pentagonPositions[index];
        const point = pentagonPointPositions[index];
        const visible = index <= scene.revealed;
        const isArriving = index === scene.revealed && scene.revealed > 0 && scene.revealed < elements.length;
        return (
          <React.Fragment key={text}>
            <span className={`story-pentagon-point story-pentagon-point--${index} ${visible ? 'is-visible' : ''} ${isArriving ? 'is-arriving' : ''}`} style={{ left: `${point.x}%`, top: `${point.y}%`, '--arrival-delay': isArriving ? '.15s' : '0s' }} />
            <div className={`story-pentagon-node story-pentagon-node--${index} ${visible ? 'is-visible' : ''} ${isArriving ? 'is-arriving' : ''}`} style={{ '--node-x': `${position.x}%`, '--node-y': `${position.y}%`, '--arrival-delay': isArriving ? '.15s' : '0s' }}>
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

function SceneContent({ scene, onPreview }) {
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

  if (scene.type === 'feature') {
    return (
      <div className={`story-feature-scene story-feature-scene--${scene.layout || 'pair'}`}>
        <div className="story-feature-images">
          {scene.images.map((image) => (
            <button key={image.src} type="button" onClick={() => onPreview(image)} aria-label={`Phóng to ảnh: ${image.alt}`}>
              <img src={image.src} alt={image.alt} />
            </button>
          ))}
        </div>
        <h2>{scene.lines ? scene.lines.map((line) => <span key={line}>{line}</span>) : scene.text}</h2>
      </div>
    );
  }

  if (scene.type === 'image') {
    return (
      <div className={`story-image-scene ${scene.layout === 'five-elements-map' ? 'story-image-scene--five-elements-map' : ''}`}>
        <img src={scene.src} alt={scene.alt} />
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

export default function EthnicStorySequence({ autoScrollExit = false }) {
  const sequenceRef = useRef(null);
  const [activeScene, setActiveScene] = useState(0);
  const [mapReady, setMapReady] = useState(false);
  const activeSceneRef = useRef(0);
  const lastMapWheelAtRef = useRef(0);
  const mapReadyRef = useRef(false);
  const [previewImage, setPreviewImage] = useState(null);
  activeSceneRef.current = activeScene;
  mapReadyRef.current = mapReady;

  useEffect(() => {
    setMapReady(false);
    if (activeScene !== scenes.length - 1) return undefined;
    const timer = window.setTimeout(() => setMapReady(true), 5200);
    return () => window.clearTimeout(timer);
  }, [activeScene]);

  useEffect(() => {
    if (!previewImage) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setPreviewImage(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [previewImage]);

  useEffect(() => {
    let frame = 0;
    const updateScene = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!sequenceRef.current) return;
        const distance = Math.max(0, window.scrollY - sequenceRef.current.offsetTop);
        const nextScene = Math.min(scenes.length - 1, Math.floor(distance / (window.innerHeight * SCENE_SCROLL_VIEWPORTS)));
        setActiveScene((current) => current === nextScene ? current : nextScene);
      });
    };
    updateScene();
    window.addEventListener('scroll', updateScene, { passive: true });
    window.addEventListener('resize', updateScene);

    const slowFastWheel = (event) => {
      const section = sequenceRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top <= 1 && rect.bottom > window.innerHeight && activeSceneRef.current === scenes.length - 1) {
        event.preventDefault();
        const now = performance.now();
        if (now - lastMapWheelAtRef.current >= 24) {
          lastMapWheelAtRef.current = now;
          const mapScrollMultiplier = mapReadyRef.current ? 5 : 1;
          const baseStep = mapReadyRef.current ? 30 : 6;
          const maxStep = mapReadyRef.current ? 90 : 12;
          const step = Math.sign(event.deltaY) * Math.min(
            maxStep,
            Math.max(baseStep, Math.abs(event.deltaY) * 0.18 * mapScrollMultiplier),
          );
          window.scrollBy(0, step);
        }
        return;
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
      style={{ height: `${(scenes.length * SCENE_SCROLL_VIEWPORTS + FINAL_MAP_EXTRA_SCROLL_VIEWPORTS) * 100}vh` }}
      id="dan-toc-kham-pha"
      data-map-wheel-lock={activeScene === scenes.length - 1 ? 'true' : undefined}
      data-active-scene-type={scenes[activeScene].type}
      data-active-scene-index={activeScene}
      aria-label="Hành trình khám phá khái niệm dân tộc"
    >
      <div className={`ethnic-story-stage ${scenes[activeScene].layout === 'five-elements-map' ? 'ethnic-story-stage--map' : ''} ${autoScrollExit && scenes[activeScene].layout === 'five-elements-map' ? 'ethnic-story-stage--map-exiting' : ''}`} data-map-ready={mapReady ? 'true' : 'false'}>
        <div
          className={`ethnic-story-content ${scenes[activeScene].type === 'quote' ? 'ethnic-story-content--quote' : ''} ${scenes[activeScene].layout === 'five-elements-map' ? 'ethnic-story-content--map' : ''}`}
          key={scenes[activeScene].type === 'pentagon' ? 'pentagon-sequence' : activeScene}
        >
          <SceneContent scene={scenes[activeScene]} onPreview={setPreviewImage} />
        </div>
        <div className="ethnic-story-footer">
          <span>{String(activeScene + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</span>
          <span className="story-scroll-hint">Lăn chuột để tiếp tục <i aria-hidden="true" /></span>
        </div>
      </div>
      {previewImage && (
        <div className="story-image-lightbox" role="presentation" onClick={() => setPreviewImage(null)}>
          <button type="button" onClick={() => setPreviewImage(null)} aria-label="Đóng ảnh phóng to"><X /></button>
          <img src={previewImage.src} alt={previewImage.alt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
