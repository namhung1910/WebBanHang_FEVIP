import { useState, useEffect, useRef } from 'react'

const banners = [
  {
    img: 'https://truonggiang.vn/wp-content/uploads/2021/07/banner-laptop-sinh-vien-scaled.jpg',
    alt: 'Khuyến mãi mùa hè',
  },
  {
    img: 'https://truonggiang.vn/wp-content/uploads/2022/09/banner-laptop-sinh-vien-2048x943-1.jpg',
    alt: 'Giảm giá Gaming',
  },
  {
    img: 'https://img.freepik.com/free-vector/hand-drawn-electronics-store-sale-banner-template_23-2151138129.jpg?semt=ais_hybrid&w=740',
    alt: 'Laptop giá tốt',
  },
]

export default function Banner() {
  const [idx, setIdx] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIdx((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearTimeout(timeoutRef.current)
  }, [idx])

  const goTo = (i) => setIdx(i)
  const prev = () => setIdx((idx - 1 + banners.length) % banners.length)
  const next = () => setIdx((idx + 1) % banners.length)

  return (
    <div className="w-full mb-6 relative rounded-2xl overflow-hidden shadow-lg" style={{ minHeight: '220px' }}>
      <img
        src={banners[idx].img}
        alt={banners[idx].alt}
        className="w-full h-[220px] md:h-[320px] lg:h-[360px] object-cover object-center transition-all duration-700"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent pointer-events-none" />
      {/* Nút chuyển slide */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-accent text-blue-600 rounded-full p-2 shadow-lg transition"
        onClick={prev}
        aria-label="Previous"
        tabIndex={0}
      >
        <svg width="28" height="28" fill="none" stroke="currentColor">
          <path d="M18 22L10 14L18 6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-accent text-blue-600 rounded-full p-2 shadow-lg transition"
        onClick={next}
        aria-label="Next"
        tabIndex={0}
      >
        <svg width="28" height="28" fill="none" stroke="currentColor">
          <path d="M10 6L18 14L10 22" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`w-4 h-4 rounded-full border-2 border-white transition ${
              i === idx ? 'bg-blue-600 scale-110' : 'bg-white/70'
            }`}
            onClick={() => goTo(i)}
            aria-label={`Chuyển đến banner ${i + 1}`}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  )
}
