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
          scrub: 1,
        },
      });

      if (!m.contain) {
        tl.fromTo(q('.m-bgphoto'), { scale: 1.12 }, { scale: 1, ease: 'none' }, 0);
      } else {
        tl.fromTo(q('.m-frame'), { opacity: 0, y: 35, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.1 }, 0.02);
      }

      tl.fromTo(q('.m-year'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.08 }, 0.05)
        .fromTo(q('.m-head'), { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.08 }, 0.12)
        .fromTo(q('.m-key'), { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.08 }, 0.2)
        .fromTo(q('.m-cap'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.08 }, 0.28);
    },
    { scope: root }
  );

  // Framed layout (Side-by-side with antique frame)
  if (m.contain) {
    return (
      <section id={m.id} ref={root} className="relative h-[220vh]" style={{ background: m.background || '#090A0C' }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 px-6 md:flex-row md:gap-14 md:px-12">
            
            {/* Text column */}
            <div className="order-2 flex-1 text-center md:order-1 md:text-left z-20">
              <p className="eyebrow mb-3 text-vn-gold tracking-cinematic">{m.eyebrow}</p>
              <h2 className="m-year font-display text-6xl font-bold leading-none text-white text-glow-gold md:text-8xl">
                {m.year}
              </h2>
              <h3 className="m-head mt-3 font-display text-xl font-semibold uppercase tracking-wider text-vn-gold-antique md:text-3xl">
                {m.heading}
              </h3>
              <p className="m-key mt-5 font-heading text-xl font-bold uppercase tracking-wide text-vn-gold md:text-2xl">
                {m.keyText}
              </p>
              <p className="m-cap mt-5 max-w-xl font-sans text-sm sm:text-base italic leading-relaxed text-vn-ivory/80 md:mx-0">
                "{m.caption}"
              </p>
            </div>

            {/* Framed archival photo */}
            <div className="m-frame relative order-1 w-full max-w-sm md:order-2 md:w-[46%] md:max-w-lg z-20">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-vn-gold/30 bg-vn-black/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-2">
                <img
                  src={m.image}
                  alt={m.heading}
                  className="h-full w-full object-cover rounded-lg archival hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <p className="mt-2 text-center text-[11px] uppercase tracking-widest text-vn-ivory/40 font-mono">
                Tư liệu ảnh lịch sử · {m.eyebrow}
              </p>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // Full-bleed background cinematic photo
  return (
    <section id={m.id} ref={root} className="relative h-[220vh]" style={{ background: m.background || '#090A0C' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Full-bleed archival photo with Ken Burns scale */}
        <img
          src={m.image}
          alt={m.heading}
          className="m-bgphoto pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover photo-cine"
          style={{ objectPosition: 'center', filter: 'contrast(1.05) brightness(0.85)' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Cinematic gradient scrims */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              'linear-gradient(90deg, rgba(9,10,12,0.96) 0%, rgba(9,10,12,0.82) 36%, rgba(9,10,12,0.4) 65%, rgba(9,10,12,0.08) 100%)',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[35vh] bg-gradient-to-t from-vn-black/90 to-transparent" />

        {/* Text content */}
        <div className="relative z-20 flex h-full items-center">
          <div className="max-w-2xl px-6 sm:px-12 md:px-20">
            <p className="eyebrow mb-3 text-vn-gold tracking-cinematic">{m.eyebrow}</p>
            <h2 className="m-year font-display text-6xl font-bold leading-none text-white text-glow-gold md:text-8xl">
              {m.year}
            </h2>
            <h3 className="m-head mt-3 font-display text-xl font-semibold uppercase tracking-wider text-vn-gold-antique md:text-3xl">
              {m.heading}
            </h3>
            <p className="m-key mt-5 font-heading text-xl font-bold uppercase tracking-wide text-vn-gold md:text-2xl">
              {m.keyText}
            </p>
            <p className="m-cap mt-5 max-w-xl font-sans text-sm sm:text-base italic leading-relaxed text-vn-ivory/85">
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
