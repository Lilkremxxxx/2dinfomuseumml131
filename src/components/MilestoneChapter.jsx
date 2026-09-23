import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export default function MilestoneChapter({ milestone: m }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      // 1. Ken Burns background photo drift across the entire scroll
      if (!m.contain) {
        gsap.fromTo(
          q('.m-bgphoto'),
          { scale: 1.12, yPercent: 4 },
          {
            scale: 1.0,
            yPercent: -2,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1, // Smooth Ken Burns drift matching reference repo
            },
          }
        );
      } else {
        // Contained photo frame subtle parallax
        gsap.fromTo(
          q('.m-frame'),
          { y: 30, scale: 0.96 },
          {
            y: -15,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      }

      // 2. Text entrance: Triggers smoothly when the chapter enters the viewport (top 80%)
      // Once revealed, text STAYS 100% VISIBLE! Never scrubbed away, never vanishes in 0.5s!
      const textElements = q('.m-anim');
      gsap.fromTo(
        textElements,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: root }
  );

  // Layout 1: Framed / Contained (Side-by-side with antique museum frame)
  if (m.contain) {
    return (
      <section id={m.id} ref={root} className="relative h-[220vh]" style={{ background: m.background || '#090A0C' }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 px-6 md:flex-row md:gap-14 md:px-12">
            
            {/* Text column - Stays 100% visible once scrolled into view */}
            <div className="order-2 flex-1 text-center md:order-1 md:text-left z-20">
              <p className="m-anim eyebrow mb-3 text-vn-gold tracking-cinematic">{m.eyebrow}</p>
              <h2 className="m-anim font-display text-5xl sm:text-7xl md:text-8xl font-black leading-none text-white text-glow-gold tracking-tight">
                {m.year}
              </h2>
              <h3 className="m-anim mt-3 font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-vn-gold-antique">
                {m.heading}
              </h3>
              <p className="m-anim mt-4 font-heading text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-vn-gold">
                {m.keyText}
              </p>
              <p className="m-anim mt-4 max-w-xl font-sans text-sm sm:text-base italic leading-relaxed text-vn-ivory/85 md:mx-0">
                "{m.caption}"
              </p>
            </div>

            {/* Framed archival photo with subtle parallax float */}
            <div className="m-frame will-transform relative order-1 w-full max-w-sm md:order-2 md:w-[48%] md:max-w-lg z-20">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-vn-gold/40 bg-vn-black shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-2">
                <img
                  src={m.image}
                  alt={m.heading}
                  className="h-full w-full object-cover rounded-xl archival hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-vn-ivory/50 font-mono">
                Tư liệu lịch sử xác thực · {m.eyebrow}
              </p>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // Layout 2: Full-bleed background cinematic photo with Ken Burns scale
  return (
    <section id={m.id} ref={root} className="relative h-[220vh]" style={{ background: m.background || '#090A0C' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Full-bleed archival photo with Ken Burns scale */}
        <img
          src={m.image}
          alt={m.heading}
          className="m-bgphoto will-transform pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover photo-cine"
          style={{ objectPosition: 'center', filter: 'contrast(1.08) brightness(0.85)' }}
        />

        {/* Multi-stop cinematic gradient scrims for maximum text readability */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              'linear-gradient(90deg, rgba(9,10,12,0.96) 0%, rgba(9,10,12,0.85) 38%, rgba(9,10,12,0.45) 65%, rgba(9,10,12,0.15) 100%)',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[35vh] bg-gradient-to-t from-vn-black/90 to-transparent" />

        {/* Text content anchored on the left - Stays 100% visible once revealed */}
        <div className="relative z-20 flex h-full items-center">
          <div className="max-w-2xl px-6 sm:px-12 md:px-20">
            <p className="m-anim eyebrow mb-3 text-vn-gold tracking-cinematic">{m.eyebrow}</p>
            <h2 className="m-anim font-display text-5xl sm:text-7xl md:text-8xl font-black leading-none text-white text-glow-gold tracking-tight">
              {m.year}
            </h2>
            <h3 className="m-anim mt-3 font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-vn-gold-antique">
              {m.heading}
            </h3>
            <p className="m-anim mt-4 font-heading text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-vn-gold">
              {m.keyText}
            </p>
            <p className="m-anim mt-4 max-w-xl font-sans text-sm sm:text-base italic leading-relaxed text-vn-ivory/85">
              "{m.caption}"
            </p>
          </div>
        </div>

        {/* Bottom-right archival badge */}
        <p className="absolute bottom-6 right-8 z-20 text-[11px] uppercase tracking-widest text-vn-ivory/40 font-mono hidden sm:block">
          Tư liệu lịch sử MLN131
        </p>

      </div>
    </section>
  );
}
