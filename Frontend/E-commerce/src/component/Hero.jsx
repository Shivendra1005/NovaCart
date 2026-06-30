import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// High-quality Unsplash hero images (fashion / lifestyle)
const slides = [
  {
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
    headline: "New Season Arrivals",
    sub: "Discover the latest in premium fashion",
    cta: "Explore Collection",
  },
  {
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85",
    headline: "Style That Speaks",
    sub: "Curated looks for every occasion",
    cta: "Shop Now",
  },
  {
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85",
    headline: "Premium Quality",
    sub: "Crafted with care, built to last",
    cta: "Browse All",
  },
  {
    url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=85",
    headline: "Feel The Difference",
    sub: "Exclusive designs, unmatched comfort",
    cta: "Start Shopping",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 700);
  };

  const slide = slides[current];

  return (
    <section className="relative w-full h-[62vh] md:h-[78vh] overflow-hidden bg-slate-900">
      {/* ── BACKGROUND IMAGES (crossfade) ── */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.url}
            alt={s.headline}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* ── GRADIENT OVERLAY ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* ── CONTENT ── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="px-8 md:px-16 lg:px-24 max-w-3xl">
          {/* Eyebrow */}
          <p
            key={`eye-${current}`}
            className="animate-fadeIn inline-flex items-center gap-2 text-white/70 text-sm font-medium tracking-widest uppercase mb-4"
          >
            <span className="w-8 h-px bg-white/50" />
            Season 2025
          </p>

          {/* Headline */}
          <h1
            key={`h-${current}`}
            className="animate-fadeIn text-4xl md:text-6xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {slide.headline}
          </h1>

          {/* Subheading */}
          <p
            key={`s-${current}`}
            className="animate-fadeIn text-white/80 text-base md:text-lg mb-8"
          >
            {slide.sub}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/collection">
              <button className="btn-primary text-base px-8 py-3.5 rounded-full">
                {slide.cta}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
            <Link to="/about">
              <button className="px-8 py-3.5 rounded-full border-2 border-white/60 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                Our Story
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── SLIDE INDICATORS ── */}
      <div className="absolute bottom-7 left-8 md:left-16 lg:left-24 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-400 rounded-full cursor-pointer ${
              i === current
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
        {/* Slide counter */}
        <span className="ml-2 text-white/60 text-sm font-mono">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── PREV / NEXT ARROWS ── */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white/15 hover:bg-white/30 rounded-full border border-white/20 text-white transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white/15 hover:bg-white/30 rounded-full border border-white/20 text-white transition-all duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
