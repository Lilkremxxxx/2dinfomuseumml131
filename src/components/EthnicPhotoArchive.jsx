import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const imageFiles = import.meta.glob('../../Image/Tổng hơp ảnh các dân tộc/**/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP,avif,AVIF,jfif,JFIF}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const allImages = Object.entries(imageFiles).sort(([pathA], [pathB]) => pathA.localeCompare(pathB, 'vi'));
const archiveCount = Math.min(15, allImages.length);
const archiveImages = Array.from({ length: archiveCount }, (_, index) => {
  const imageIndex = archiveCount === 1 ? 0 : Math.round(index * (allImages.length - 1) / (archiveCount - 1));
  const [path, src] = allImages[imageIndex];
  const [folder, file] = path.split('Tổng hơp ảnh các dân tộc/')[1].split('/');
  return {
    src,
    title: file.replace(/\.[^.]+$/, '').replace(/[()_]+/g, ' ').trim(),
    ethnic: folder.replace(/^\s*Dân tộc\s*/i, '').trim(),
  };
});

export default function EthnicPhotoArchive() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.14 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!previewImage) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setPreviewImage(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [previewImage]);

  return (
    <section ref={sectionRef} className={`ethnic-photo-archive ${isVisible ? 'is-visible' : ''}`} aria-labelledby="ethnic-photo-archive-title">
      <div className="ethnic-photo-frame">
        <header className="ethnic-photo-heading">
          <span className="ethnic-photo-eyebrow">TƯ LIỆU VĂN HÓA · 54 DÂN TỘC</span>
          <h2 id="ethnic-photo-archive-title">Kho Tư Liệu Ảnh</h2>
          <p>Những sắc màu đời sống, lễ hội và trang phục được lưu giữ qua từng khung hình.</p>
        </header>

        <div className="ethnic-photo-grid">
          {archiveImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="ethnic-photo-card"
              style={{ '--photo-index': index, '--photo-delay': `${index * -0.31}s`, '--photo-tilt': `${(index % 2 ? 1 : -1) * (1 + (index % 3))}deg` }}
              onClick={() => setPreviewImage(image)}
              aria-label={`Xem ảnh ${image.title} — dân tộc ${image.ethnic}`}
            >
              <img src={image.src} alt={`${image.title} — dân tộc ${image.ethnic}`} loading="lazy" />
              <span className="ethnic-photo-caption"><strong>{image.title}</strong><small>{image.ethnic}</small></span>
            </button>
          ))}
        </div>
      </div>

      {previewImage && (
        <div className="ethnic-photo-lightbox" role="presentation" onClick={() => setPreviewImage(null)}>
          <button type="button" className="ethnic-photo-lightbox-close" onClick={() => setPreviewImage(null)} aria-label="Đóng ảnh phóng to"><X /></button>
          <img src={previewImage.src} alt={`${previewImage.title} — dân tộc ${previewImage.ethnic}`} onClick={(event) => event.stopPropagation()} />
          <p>{previewImage.title} · {previewImage.ethnic}</p>
        </div>
      )}
    </section>
  );
}
