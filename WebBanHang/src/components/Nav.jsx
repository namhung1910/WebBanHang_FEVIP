import { useState, useEffect, useRef } from 'react'

const navs = [
  { name: 'Trang Chủ', href: '#' },
  { name: 'Cửa Hàng', href: '#' },
  { name: 'Giỏ Hàng', href: '#' },
  { name: 'Thanh Toán', href: '#' },
]

export default function Nav() {
  const [active, setActive] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
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
      <ul className="flex justify-center space-x-4 py-2">
        {navs.map((nav, idx) => (
          <li key={nav.name}>
            <a
              href={nav.href}
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
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
