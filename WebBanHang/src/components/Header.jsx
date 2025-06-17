import { useState, useEffect, useRef } from 'react'
import products from '../assets/data/products.json'
import { FiSearch, FiClock, FiX } from 'react-icons/fi'

import { Link } from 'react-router-dom'

export default function Header({ onSearch }) {
  const [cartCount] = useState(0)
  const [show, setShow] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [history, setHistory] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const lastScroll = useRef(window.scrollY)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  // Lấy lịch sử từ localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('searchHistory')) || []
    setHistory(saved)
  }, [])

  // Cập nhật gợi ý khi nhập
  useEffect(() => {
    if (searchKeyword.trim().length >= 2) {
      const keyword = searchKeyword.toLowerCase()
      const matched = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
      ).slice(0, 5)
      setSuggestions(matched)
    } else {
      setSuggestions([])
    }
  }, [searchKeyword])

  // Hiệu ứng ẩn hiện header khi scroll
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

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Lưu vào lịch sử
  const saveToHistory = (keyword) => {
    let updated = [...history]
    const exist = updated.indexOf(keyword)
    if (exist !== -1) updated.splice(exist, 1)
    updated.unshift(keyword)
    if (updated.length > 10) updated.pop()
    setHistory(updated)
    localStorage.setItem('searchHistory', JSON.stringify(updated))
  }

  const handleSuggestionClick = (item) => {
    setSearchKeyword(item.name)
    setSuggestions([])
    setDropdownOpen(false)
    saveToHistory(item.name)
    onSearch(item.name)
  }

  const handleSearchClick = () => {
    const keyword = searchKeyword.trim()
    if (keyword === '') {
      setSuggestions([])
      setDropdownOpen(false)
      onSearch('')
      return
    }

    saveToHistory(keyword)
    onSearch(keyword)
    setSuggestions([])
    setDropdownOpen(false)
  }

  const handleHistoryClick = (keyword) => {
    setSearchKeyword(keyword)
    saveToHistory(keyword)
    onSearch(keyword)
    setDropdownOpen(false)
  }

  const handleDeleteHistory = (keyword) => {
    const updated = history.filter(item => item !== keyword)
    setHistory(updated)
    localStorage.setItem('searchHistory', JSON.stringify(updated))
  }

  return (
    <header
      className={`sticky top-0 z-50 flex flex-col md:flex-row items-center justify-between py-3 px-2 md:px-6 bg-white shadow font-sans transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div className="flex items-center mb-2 md:mb-0">
          <Link to="/" className="font-bold text-2xl text-blue-600 tracking-wide">
            FEVIP Shop
          </Link>
      </div>

      <div className="w-full max-w-lg relative mx-4 mb-2 md:mb-0">
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full px-3 py-2 pr-10 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
          onFocus={() => setDropdownOpen(true)}
        />

        <button
          onClick={handleSearchClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
          aria-label="Tìm kiếm"
        >
          <FiSearch size={20} />
        </button>

        {dropdownOpen && (history.length > 0 || suggestions.length > 0) && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow z-[9999] max-h-96 overflow-y-auto"
          >
            {/* Lịch sử tìm kiếm */}
            {history.length > 0 && (
              <>
                <div className="px-3 py-2 text-sm font-semibold text-gray-500">Lịch sử tìm kiếm</div>
                <ul>
                  {history.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between px-3 py-2 hover:bg-blue-50 text-sm"
                    >
                      <div
                        className="flex items-center gap-2 cursor-pointer flex-1"
                        onClick={() => handleHistoryClick(item)}
                      >
                        <FiClock className="text-gray-400" />
                        {item}
                      </div>
                      <FiX
                        className="text-gray-400 cursor-pointer hover:text-red-500"
                        onClick={() => handleDeleteHistory(item)}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Gợi ý */}
            {suggestions.length > 0 && (
              <>
                <div className="px-3 pt-3 text-sm font-semibold text-gray-500 border-t border-gray-200">Gợi ý</div>
                <ul>
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
              </>
            )}
          </div>
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
