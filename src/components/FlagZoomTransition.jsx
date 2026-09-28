import React, { useEffect, useRef, useState } from 'react';

export default function FlagZoomTransition({ onComplete }) {
  const sectionRef = useRef(null);
  const didComplete = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const scrollableDistance = Math.max(1, section.offsetHeight - window.innerHeight);
        const distance = Math.max(0, -section.getBoundingClientRect().top);
        const nextProgress = Math.max(0, Math.min(1, distance / scrollableDistance));
        setProgress(nextProgress);
        if (nextProgress >= 0.98 && !didComplete.current) {
          didComplete.current = true;
          onComplete();
        }
      });
    };

    const slowFastWheel = (event) => {
      const section = sectionRef.current;
      if (!section || Math.abs(event.deltaY) <= 240) return;
      const rect = section.getBoundingClientRect();
      if (rect.top <= 1 && rect.bottom > window.innerHeight) {
        event.preventDefault();
        window.scrollBy(0, Math.sign(event.deltaY) * 240);
      }
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    window.addEventListener('wheel', slowFastWheel, { passive: false });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      window.removeEventListener('wheel', slowFastWheel);
    };
  }, [onComplete]);

  return (
    <section ref={sectionRef} id="flag-map-transition" className="flag-zoom-sequence" aria-label="Chuyển cảnh lá cờ Việt Nam">
      <div className="flag-zoom-stage">
        <div
          className="flag-zoom-card"
          style={{ '--star-scale': 1 + progress * 12, '--caption-opacity': Math.max(0, 1 - progress * 2.2) }}
          aria-hidden="true"
        >
          <svg className="flag-zoom-star" viewBox="0 0 100 100">
            <polygon points="50,3 61,37 97,37 68,58 79,94 50,72 21,94 32,58 3,37 39,37" />
          </svg>
          <span className="flag-zoom-caption">VIỆT NAM · 54 DÂN TỘC</span>
        </div>
        <div className="flag-zoom-hint">Lăn chuột để mở bản đồ</div>
      </div>
    </section>
  );
}
