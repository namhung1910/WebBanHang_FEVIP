import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const navs = [
  { name: 'Trang Chủ', href: '/' },
  { name: 'Cửa Hàng', href: '/shop' },
  { name: 'Giỏ Hàng', href: '/cart' },
  { name: 'Thanh Toán', href: '/checkout' },
]

export default function Nav() {
  const [active, setActive] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-40 font-sans transition-all duration-300
        ${scrolled
          ? 'bg-white/80 backdrop-blur border-b border-blue-100 shadow-md'
          : 'bg-blue-600 text-white'
        }
      `}
      style={{ transitionProperty: 'background, box-shadow, border-color, color' }}
    >
      {/* Desktop nav */}
      <ul className="hidden md:flex justify-center space-x-4 py-2">
        {navs.map((nav, idx) => (
          <li key={nav.name}>
            <Link
              to={nav.href}
              className={`px-4 py-2 rounded-lg transition font-medium focus:outline-none focus:ring-2 focus:ring-white/70 ${
                active === idx
                  ? scrolled
                    ? 'bg-blue-600 text-white shadow font-semibold'
                    : 'bg-white text-blue-700 shadow font-semibold'
                  : scrolled
                    ? 'hover:bg-blue-100 hover:text-blue-700 text-blue-700'
                    : 'hover:bg-blue-700 hover:text-white'
              }`}
              onClick={() => setActive(idx)}
              tabIndex={0}
            >
              {nav.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center justify-between px-2 py-2 relative">
        <div className="font-bold text-lg">{navs[active]?.name}</div>
        <button
          className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setOpen(o => !o)}
          aria-label="Mở menu"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        {open && (
          <ul className="absolute left-0 top-full w-full bg-white shadow-lg rounded-b z-50 animate-fade-in-down">
            {navs.map((nav, idx) => (
              <li key={nav.name}>
                <Link
                  to={nav.href}
                  className={`block px-4 py-3 border-b last:border-b-0 font-medium transition ${
                    active === idx
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-blue-100 hover:text-blue-700 text-blue-700'
                  }`}
                  onClick={() => {
                    setActive(idx)
                    setOpen(false)
                  }}
                  tabIndex={0}
                >
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}
