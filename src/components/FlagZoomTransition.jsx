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
        // The star fills the viewport well before the end of the scroll range.
        if (nextProgress >= 0.28 && !didComplete.current) {
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
        <div className="flag-zoom-card" aria-hidden="true">
          <svg className="flag-zoom-graphic" viewBox="0 0 1600 900" preserveAspectRatio="none">
            <rect width="1600" height="900" fill="#da251d" />
            <polygon
              className="flag-zoom-star"
              points="800,325 830,416 926,416 848,471 878,564 800,506 722,564 752,471 674,416 770,416"
              style={{ '--star-scale': 1 + progress * 32 }}
            />
          </svg>
          <span className="flag-zoom-caption" style={{ opacity: Math.max(0, 1 - progress * 2.2) }}>VIỆT NAM · 54 DÂN TỘC</span>
        </div>
        <div className="flag-zoom-hint">Lăn chuột để mở bản đồ</div>
      </div>
    </section>
  );
}
