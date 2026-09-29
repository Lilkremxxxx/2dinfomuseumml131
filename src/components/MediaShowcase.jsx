import React from 'react';

const videos = [
  { id: 'ccT81MA6nII', label: 'Video tham khảo 1' },
  { id: 'm30oC58psGU', label: 'Video tham khảo 2' },
  { id: 'hrdqWWG4DIg', label: 'Video tham khảo 3' },
  { id: 'Puzo0kJkbKY', label: 'Video tham khảo 4' },
];

export default function MediaShowcase() {
  return (
    <section className="media-showcase" aria-labelledby="media-showcase-title">
      <div className="media-showcase__inner">
        <p className="eyebrow text-vn-gold">TƯ LIỆU THAM KHẢO</p>
        <h2 id="media-showcase-title">Nghe và Xem</h2>
        <div className="media-showcase__grid">
          {videos.map((video) => (
            <div className="media-showcase__video" key={video.id}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.label}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
