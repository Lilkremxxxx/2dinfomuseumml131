import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export default function WordCascade({
  words = [],
  background = '#080808',
  accentWords = [],
  id,
  eyebrow,
  perWordVh = 70,
  className = '',
}) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const items = q('.cascade-word');
      const totalWords = items.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth scrub matching reference repo
        },
      });

      // Cumulative reveal: Each word illuminates in sequence and STAYS VISIBLE!
      // Forms a complete, magnificent manifesto that never vanishes in 0.5s!
      items.forEach((el, i) => {
        const at = (i / totalWords) * 0.75; // Stagger across first 75% of scroll
        tl.fromTo(
          el,
          { opacity: 0.15, y: 30, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.2, 
            ease: 'power2.out' 
          },
          at
        );
      });

      // Anchor timeline duration to 1.0 so scroll percentages map 1:1
      tl.to({}, { duration: 1.0 }, 0);
    },
    { scope: root }
  );

  return (
    <section
      id={id}
      ref={root}
      className={`relative ${className}`}
      style={{ height: `${words.length * perWordVh + 60}vh`, background }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        
        {eyebrow && (
          <p className="eyebrow mb-8 text-vn-gold tracking-cinematic text-xs font-semibold uppercase text-center">
            {eyebrow}
          </p>
        )}

        <div className="relative flex flex-col items-center justify-center gap-3 sm:gap-5 text-center max-w-5xl">
          {words.map((w, i) => {
            const isAccent = accentWords.includes(w) || i === words.length - 1;
            return (
              <h2
                key={`${w}-${i}`}
                className={`cascade-word will-transform select-none text-center font-display font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase transition-colors duration-300 ${
                  isAccent ? 'gold-gradient-text text-glow-gold' : 'text-white/90 drop-shadow-xl'
                }`}
              >
                {w}
              </h2>
            );
          })}
        </div>

      </div>
    </section>
  );
}
