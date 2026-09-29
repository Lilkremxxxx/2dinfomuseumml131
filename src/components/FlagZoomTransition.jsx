import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export default function FlagZoomTransition({ onComplete }) {
  const sectionRef = useRef(null);
  const didComplete = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const select = gsap.utils.selector(section);
    const star = select('.flag-zoom-star');
    const card = select('.flag-zoom-card');
    const caption = select('.flag-zoom-caption');
    const hint = select('.flag-zoom-hint');

    gsap.set(star, { scale: 1, transformOrigin: '50% 50%' });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      onComplete: () => {
        if (didComplete.current) return;
        didComplete.current = true;
        onCompleteRef.current?.();
      },
    });

    timeline
      .to(star, { scale: 1.15, duration: 0.12, ease: 'none' }, 0)
      .to(caption, { opacity: 0, duration: 0.04, ease: 'none' }, 0.12)
      .to(hint, { opacity: 0, duration: 0.04, ease: 'none' }, 0.12)
      .to(star, { scale: 9, duration: 0.38, ease: 'power1.in' }, 0.54)
      .to(card, { opacity: 0, duration: 0.18, ease: 'none' }, 0.82);

    return () => timeline.scrollTrigger?.kill();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="flag-map-transition" className="flag-zoom-sequence" aria-label="Chuyển cảnh lá cờ Việt Nam">
      <div className="flag-zoom-stage">
        <div className="flag-zoom-card" aria-hidden="true">
          <svg className="flag-zoom-graphic" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
            <rect width="1600" height="900" fill="#da251d" />
            <polygon
              className="flag-zoom-star"
              points="800,325 830,416 926,416 848,471 878,564 800,506 722,564 752,471 674,416 770,416"
            />
          </svg>
          <span className="flag-zoom-caption">VIỆT NAM · 54 DÂN TỘC</span>
        </div>
        <div className="flag-zoom-hint">Lăn chuột để mở bản đồ</div>
      </div>
    </section>
  );
}
