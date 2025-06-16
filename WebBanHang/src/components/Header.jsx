import { useState, useEffect, useRef } from 'react'
import products from '../assets/data/products.json'
import { FiSearch } from 'react-icons/fi'

export default function Header({ onSearch }) {
  const [cartCount] = useState(0)
  const [show, setShow] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const lastScroll = useRef(window.scrollY)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      if (current > lastScroll.current && current > 60) {
        setShow(false)
      } else {
        setShow(true)
      }
      lastScroll.current = current
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchKeyword.length >= 2) {
      const keyword = searchKeyword.toLowerCase()
      const matched = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
      ).slice(0, 5)
      setSuggestions(matched)
    } else {
      setSuggestions([])
    }
  }, [searchKeyword])

  const handleSuggestionClick = (item) => {
    setSearchKeyword(item.name)
    setSuggestions([])
    onSearch(item.name)
  }

  const handleSearchClick = () => {
    if (searchKeyword.trim() === '') {
      onSearch('') // reset danh sách
    } else {
      onSearch(searchKeyword.trim()) // tìm bằng từ khoá hiện tại
      setSuggestions([]) // ẩn gợi ý
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 flex flex-col md:flex-row items-center justify-between py-3 px-2 md:px-6 bg-white shadow font-sans transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div className="flex items-center mb-2 md:mb-0">
        <span className="font-bold text-2xl text-blue-600 tracking-wide">FEVIP Shop</span>
      </div>

      <div className="w-full max-w-lg relative mx-4 mb-2 md:mb-0">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full px-3 py-2 pr-10 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
        />
        {/* Icon nút tìm kiếm */}
        <button
          onClick={handleSearchClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
          aria-label="Tìm kiếm"
        >
          <FiSearch size={20} />
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow z-[9999]">
            {suggestions.map(item => (
              <li
                key={item.id}
                className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
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
