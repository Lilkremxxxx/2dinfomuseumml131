import React from 'react';

export default function WordCascade({ eyebrow, words = [], accentWords = [] }) {
  return (
    <section className="relative py-28 sm:py-36 px-4 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-vn-black via-vn-charcoal/60 to-vn-black border-y border-vn-gold-antique/15">
      
      {/* Background subtle light beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-vn-red-deep/15 blur-3xl rounded-full -z-10" />

      {eyebrow && (
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-cinematic text-vn-gold mb-6 sm:mb-8 border-b border-vn-gold/30 pb-2">
          {eyebrow}
        </p>
      )}

      <div className="flex flex-col items-center gap-2 sm:gap-4 max-w-5xl mx-auto">
        {words.map((word, index) => {
          const isAccent = accentWords.includes(word) || index === words.length - 1;
          return (
            <div
              key={index}
              className={`font-display font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none uppercase transition-all duration-700 ${
                isAccent 
                  ? 'gold-gradient-text text-glow-gold scale-105' 
                  : 'text-vn-ivory/80 hover:text-white'
              }`}
            >
              {word}
            </div>
          );
        })}
      </div>

      <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-vn-gold to-transparent mt-8 sm:mt-12" />
    </section>
  );
}
