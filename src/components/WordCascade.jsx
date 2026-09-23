import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export default function WordCascade({
  words = [],
  background = '#080808',
  accentWords = [],
  id,
  eyebrow,
  perWordVh = 85,
  className = '',
}) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const items = q('.cascade-word');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      items.forEach((el, i) => {
        const at = i * 1;
        tl.fromTo(
          el,
          { opacity: 0, scale: 0.8, filter: 'blur(8px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 0.6 },
          at
        );
        // Fade and scale previous word out (except last word which lingers)
        if (i < items.length - 1) {
          tl.to(
            el,
            { opacity: 0, scale: 1.3, filter: 'blur(6px)', ease: 'power2.in', duration: 0.5 },
            at + 0.6
          );
        }
      });
    },
    { scope: root }
  );

  return (
    <section
      id={id}
      ref={root}
      className={`relative ${className}`}
      style={{ height: `${words.length * perWordVh + 40}vh`, background }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        
        {eyebrow && (
          <p className="eyebrow absolute left-1/2 top-[12%] -translate-x-1/2 whitespace-nowrap text-vn-gold tracking-cinematic text-xs font-semibold uppercase">
            {eyebrow}
          </p>
        )}

        <div className="relative w-full flex items-center justify-center">
          {words.map((w, i) => {
            const isAccent = accentWords.includes(w) || i === words.length - 1;
            return (
              <h2
                key={`${w}-${i}`}
                className={`cascade-word will-transform headline-mega absolute select-none text-center font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase ${
                  isAccent ? 'gold-gradient-text text-glow-gold' : 'text-white drop-shadow-2xl'
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
