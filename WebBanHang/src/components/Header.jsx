import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const [cartCount] = useState(0)
  const [show, setShow] = useState(true)
  const lastScroll = useRef(window.scrollY)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      if (current > lastScroll.current && current > 60) {
        setShow(false) // scroll down, hide
      } else {
        setShow(true) // scroll up, show
      }
      lastScroll.current = current
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between py-3 px-2 md:px-6 bg-white shadow font-sans transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div className="flex items-center">
        <span className="font-bold text-2xl text-blue-600 tracking-wide">FEVIP Shop</span>
      </div>
      <div className="flex-1 mx-4 hidden md:flex">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full px-3 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          aria-label="Tìm kiếm sản phẩm"
        />
      </div>
      <div className="flex items-center">
        <button className="relative text-2xl btn-cta px-3 py-2" aria-label="Giỏ hàng">
          <span role="img" aria-label="cart">🛒</span>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  )
}
