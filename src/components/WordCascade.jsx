import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export default function WordCascade({
  words = [],
  background = '#080808',
  accentWords = [],
  id,
  eyebrow,
  perWordVh = 100,
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
          scrub: true, // Immediate 1:1 scroll tracking with Lenis
        },
      });

      items.forEach((el, i) => {
        const at = i * 1.0;
        // Word materialises swiftly into view and stays crisp
        tl.fromTo(
          el,
          { opacity: 0, scale: 0.85, filter: 'blur(6px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 0.4 },
          at
        );
        // Fade out previous words (except the last word, which remains until the end)
        if (i < totalWords - 1) {
          tl.to(
            el,
            { opacity: 0, scale: 1.25, filter: 'blur(4px)', ease: 'power2.in', duration: 0.35 },
            at + 0.65
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
