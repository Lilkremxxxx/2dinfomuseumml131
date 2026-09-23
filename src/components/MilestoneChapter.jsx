import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export default function MilestoneChapter({ milestone: m }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true, // Immediate 1:1 scroll tracking with Lenis, no artificial lag
        },
      });

      // 1. Ken Burns background photo zoom (continuous across scroll)
      if (!m.contain) {
        tl.fromTo(q('.m-bgphoto'), { scale: 1.08 }, { scale: 1.0, ease: 'none' }, 0);
      } else {
        tl.fromTo(q('.m-frame'), { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.05, ease: 'none' }, 0.01);
      }

      // 2. Early, tight text entrance (all text is 100% visible by progress 0.22)
      tl.fromTo(q('.m-eyebrow'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.04, ease: 'none' }, 0.01)
        .fromTo(q('.m-year'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05, ease: 'none' }, 0.04)
        .fromTo(q('.m-head'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05, ease: 'none' }, 0.09)
        .fromTo(q('.m-key'), { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.05, ease: 'none' }, 0.14)
        .fromTo(q('.m-cap'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.05, ease: 'none' }, 0.18);

      // Notice: NO exit fade-out! Text remains 100% visible and readable
      // for the entire remaining ~80% of the section so the user never misses it.
    },
    { scope: root }
  );

  // Layout 1: Framed / Contained (Side-by-side with antique museum frame)
  if (m.contain) {
    return (
      <section id={m.id} ref={root} className="relative h-[240vh]" style={{ background: m.background || '#090A0C' }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 px-6 md:flex-row md:gap-14 md:px-12">
            
            {/* Text column */}
            <div className="m-text-group will-transform order-2 flex-1 text-center md:order-1 md:text-left z-20">
              <p className="m-eyebrow eyebrow mb-3 text-vn-gold tracking-cinematic">{m.eyebrow}</p>
              <h2 className="m-year font-display text-5xl sm:text-7xl md:text-8xl font-black leading-none text-white text-glow-gold tracking-tight">
                {m.year}
              </h2>
              <h3 className="m-head mt-3 font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-vn-gold-antique">
                {m.heading}
              </h3>
              <p className="m-key mt-4 font-heading text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-vn-gold">
                {m.keyText}
              </p>
              <p className="m-cap mt-4 max-w-xl font-sans text-sm sm:text-base italic leading-relaxed text-vn-ivory/85 md:mx-0">
                "{m.caption}"
              </p>
            </div>

            {/* Framed archival photo */}
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
    <section id={m.id} ref={root} className="relative h-[240vh]" style={{ background: m.background || '#090A0C' }}>
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

        {/* Text content anchored on the left */}
        <div className="relative z-20 flex h-full items-center">
          <div className="m-text-group will-transform max-w-2xl px-6 sm:px-12 md:px-20">
            <p className="m-eyebrow eyebrow mb-3 text-vn-gold tracking-cinematic">{m.eyebrow}</p>
            <h2 className="m-year font-display text-5xl sm:text-7xl md:text-8xl font-black leading-none text-white text-glow-gold tracking-tight">
              {m.year}
            </h2>
            <h3 className="m-head mt-3 font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-vn-gold-antique">
              {m.heading}
            </h3>
            <p className="m-key mt-4 font-heading text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-vn-gold">
              {m.keyText}
            </p>
            <p className="m-cap mt-4 max-w-xl font-sans text-sm sm:text-base italic leading-relaxed text-vn-ivory/85">
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
