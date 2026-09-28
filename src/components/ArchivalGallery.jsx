import React, { useState } from 'react';
import { Layers, Bookmark, Sparkles, X, ExternalLink } from 'lucide-react';
import { GALLERY_DATA } from '../data/galleryData';

export default function ArchivalGallery() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ["Tất cả", "Lý luận & Văn kiện", "Di sản 54 Dân tộc", "Hòa hợp Tôn giáo", "An ninh & Quốc phòng"];

  const filteredItems = activeCategory === "Tất cả"
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === activeCategory);

  return (
    <section id="thu-vien-tu-lieu" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vn-charcoal border border-vn-gold/30 text-vn-gold text-xs uppercase tracking-widest mb-4">
          <Layers className="w-3.5 h-3.5 text-vn-gold" />
          <span>Kho Lưu Trữ Di Sản & Văn Kiện Số</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4">
          Phòng Trưng Bày Tư Liệu Lịch Sử & Văn Hóa
        </h2>
        <p className="text-sm sm:text-base text-vn-ivory/75 font-light leading-relaxed">
          Tập hợp các bảo vật quốc gia, di sản UNESCO, văn kiện kinh điển và mốc son lập hiến 
          khẳng định chân lý trường tồn của dân tộc và sự đồng hành của tôn giáo trong tiến trình cách mạng.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-vn-red text-vn-gold border border-vn-gold shadow-lg shadow-vn-red/40 font-semibold'
                : 'bg-vn-charcoal/80 text-vn-ivory/70 border border-vn-gold-antique/20 hover:border-vn-gold hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group p-5 rounded-2xl bg-vn-charcoal/70 border border-vn-gold-antique/25 hover:border-vn-gold hover:shadow-2xl hover:shadow-vn-red/20 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Image Preview Thumbnail */}
              {item.image && (
                <div className="relative aspect-[16/10] mb-4 overflow-hidden rounded-xl border border-vn-gold/25 bg-vn-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                </div>
              )}

              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold text-vn-gold px-2.5 py-0.5 rounded-full bg-vn-black/60 border border-vn-gold/30">
                  {item.tag}
                </span>
                <span className="text-xs font-mono text-vn-ivory/50">
                  {item.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-xl text-white group-hover:text-vn-gold transition-colors mb-2.5">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-vn-ivory/70 line-clamp-2 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {/* Footer Significance */}
            <div className="pt-3 border-t border-vn-ivory/10 flex items-center justify-between text-xs text-vn-gold-antique group-hover:text-vn-gold">
              <span className="font-medium">Xem chi tiết ý nghĩa lịch sử</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-vn-charcoal border border-vn-gold shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 z-10 p-2 rounded-full bg-vn-black/60 text-vn-ivory/70 hover:text-white hover:bg-vn-red transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image banner inside modal */}
            {selectedItem.image && (
              <div className="relative aspect-[16/9] mb-6 overflow-hidden rounded-2xl border border-vn-gold/30 bg-vn-black shadow-lg">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-vn-red/30 text-vn-gold border border-vn-gold/40">
                {selectedItem.tag}
              </span>
              <span className="text-xs font-mono text-vn-ivory/60">
                Thời kỳ: {selectedItem.year}
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
              {selectedItem.title}
            </h3>

            {/* Modal Content */}
            <div className="space-y-4 text-sm text-vn-ivory/85 leading-relaxed">
              <div className="p-4 rounded-xl bg-vn-black/50 border border-vn-ivory/10">
                <span className="text-xs font-semibold uppercase text-vn-gold block mb-1">
                  Mô tả tư liệu:
                </span>
                <p>{selectedItem.description}</p>
              </div>

              <div className="p-4 rounded-xl bg-vn-red-deep/20 border border-vn-red/40">
                <span className="text-xs font-semibold uppercase text-vn-gold block mb-1">
                  Ý nghĩa lý luận & Giá trị thực tiễn:
                </span>
                <p className="font-medium text-vn-ivory">{selectedItem.significance}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-vn-ivory/10 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2 rounded-full bg-vn-gold text-vn-black font-semibold text-xs tracking-wider uppercase hover:bg-white transition-colors"
              >
                Đóng cửa sổ
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
