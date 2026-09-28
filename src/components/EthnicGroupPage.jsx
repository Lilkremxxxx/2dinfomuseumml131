import React from 'react';
import { ArrowLeft, BookOpen, Globe2, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ETHNIC_GROUPS } from '../data/ethnicGroupsData';

function MissingGroupPage() {
  return (
    <main className="min-h-screen bg-vn-black px-6 py-24 text-vn-ivory">
      <div className="mx-auto max-w-3xl rounded-3xl border border-vn-gold-antique/30 bg-vn-charcoal/80 p-8 text-center sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vn-gold">Trang giới thiệu dân tộc</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-white">Nội dung đang được bổ sung</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-vn-ivory/70">
          Trang cho dân tộc này chưa có dữ liệu. Hiện tại bản thử nghiệm mới có trang Kinh.
        </p>
        <Link to="/#ban-do-tuong-tac" className="mt-8 inline-flex items-center gap-2 rounded-full border border-vn-gold/50 px-5 py-2.5 text-sm font-semibold text-vn-gold transition hover:bg-vn-red-deep/30">
          <ArrowLeft className="h-4 w-4" />
          Về bản đồ
        </Link>
      </div>
    </main>
  );
}

export default function EthnicGroupPage() {
  const { slug } = useParams();
  const normalizedSlug = slug?.toLowerCase() ?? '';
  const group = Object.hasOwn(ETHNIC_GROUPS, normalizedSlug) ? ETHNIC_GROUPS[normalizedSlug] : null;

  if (!group) return <MissingGroupPage />;

  return (
    <main className="min-h-screen overflow-hidden bg-vn-black text-vn-ivory">
      <section className="relative isolate min-h-[72vh] overflow-hidden border-b border-vn-gold-antique/20 bg-[radial-gradient(ellipse_at_75%_20%,rgba(143,23,19,0.24),transparent_46%),linear-gradient(135deg,#121214_0%,#090A0C_70%)]">
        <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full border border-vn-gold/10 animate-spin-slow" />
        <div className="pointer-events-none absolute -right-10 top-30 h-64 w-64 rounded-full border border-vn-red/15 animate-spin-reverse" />
        <div className="mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-between px-5 pb-10 pt-8 sm:px-8 sm:pb-14 lg:px-12">
          <Link to="/#ban-do-tuong-tac" className="relative z-10 inline-flex w-fit items-center gap-2 rounded-full border border-vn-gold-antique/35 bg-vn-black/50 px-4 py-2 text-sm text-vn-ivory/80 transition hover:border-vn-gold hover:text-vn-gold">
            <ArrowLeft className="h-4 w-4" />
            Quay lại bản đồ
          </Link>

          <div className="relative z-10 max-w-4xl pb-8 pt-20 sm:pt-28">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-vn-gold/35 bg-vn-charcoal/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-vn-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-vn-red" />
              Chân dung 54 dân tộc Việt Nam
            </div>
            <p className="font-heading text-lg italic text-vn-gold-antique sm:text-xl">{group.alternateName}</p>
            <h1 className="mt-2 font-display text-7xl font-black leading-none tracking-tight text-white sm:text-8xl md:text-[10rem]">
              {group.name}
            </h1>
            <p className="mt-5 max-w-2xl font-heading text-xl italic leading-relaxed text-vn-ivory/85 sm:text-2xl">
              {group.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-vn-ivory/70 sm:text-base sm:leading-8">
              {group.introduction}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs text-vn-ivory/60">
              <span className="inline-flex items-center gap-2 rounded-full border border-vn-ivory/10 bg-vn-charcoal/70 px-3 py-2"><Users className="h-4 w-4 text-vn-gold" /> Cộng đồng dân tộc</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-vn-ivory/10 bg-vn-charcoal/70 px-3 py-2"><Globe2 className="h-4 w-4 text-vn-gold" /> Việt Nam</span>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-10 right-8 hidden select-none font-display text-[24rem] font-black leading-none text-vn-gold/[0.025] lg:block">K</div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-vn-gold">Thông tin nhanh</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Một vài nét khái quát</h2>
          <p className="mt-4 text-sm leading-7 text-vn-ivory/65">Các đặc điểm được trình bày ở mức tổng quan; mỗi địa phương và gia đình có thể có thực hành riêng.</p>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
          {group.facts.map((fact, index) => (
            <div key={fact.label} className="group rounded-2xl border border-vn-gold-antique/20 bg-vn-charcoal/65 p-5 transition duration-300 hover:-translate-y-1 hover:border-vn-gold/50">
              <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-vn-gold-antique">
                <span className="font-mono text-vn-red">0{index + 1}</span>{fact.label}
              </dt>
              <dd className="mt-3 text-sm leading-6 text-vn-ivory/90">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-y border-vn-gold-antique/15 bg-gradient-to-b from-vn-charcoal/35 to-vn-black">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-vn-gold">Tìm hiểu thêm</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Ngôn ngữ, văn hóa và sự gắn kết</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {group.sections.map((section, index) => (
              <article key={section.title} className="relative overflow-hidden rounded-2xl border border-vn-gold-antique/20 bg-vn-charcoal/75 p-6 sm:p-7">
                <span className="absolute -right-2 -top-8 font-display text-8xl font-black text-vn-gold/[0.06]">0{index + 1}</span>
                <p className="relative text-[10px] font-semibold uppercase tracking-[0.2em] text-vn-gold-antique">{section.eyebrow}</p>
                <h3 className="relative mt-3 font-display text-2xl font-bold leading-tight text-white">{section.title}</h3>
                <div className="relative mt-4 space-y-3 text-sm leading-7 text-vn-ivory/75">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-vn-ivory/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p className="inline-flex items-start gap-2"><BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-vn-gold-antique" />{group.source}</p>
        <a href="/#ban-do-tuong-tac" className="w-fit text-vn-gold-antique transition hover:text-vn-gold">Trở lại hành trình triển lãm ↑</a>
      </footer>
    </main>
  );
}
