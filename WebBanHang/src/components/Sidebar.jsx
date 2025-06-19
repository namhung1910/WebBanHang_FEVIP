import { useState } from 'react'

const categories = ['Laptop', 'Gaming', 'PC']
const priceRanges = [
  { label: '< 20 triệu', value: 'lt20' },
  { label: '20-35 triệu', value: '20-35' },
  { label: '> 35 triệu', value: 'gt35' },
]

export default function Sidebar({ className, onFilterChange }) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedPrice, setSelectedPrice] = useState('')

  const handleCategoryChange = (cat) => {
    let newCategories = [...selectedCategories]
    if (newCategories.includes(cat)) {
      newCategories = newCategories.filter(c => c !== cat)
    } else {
      newCategories.push(cat)
    }
    setSelectedCategories(newCategories)
    onFilterChange({ categories: newCategories, price: selectedPrice })
  }

  const handlePriceChange = (value) => {
    setSelectedPrice(value)
    onFilterChange({ categories: selectedCategories, price: value })
  }

  return (
    <aside
      className={`
        bg-white rounded-xl shadow p-6 h-fit font-sans
        w-full mb-4
        md:w-64 md:mb-0
        ${className || ''}
      `}
    >
      <div>
        <h3 className="font-semibold mb-3 text-blue-700 text-lg">Danh mục</h3>
        <ul className="space-y-2">
          {categories.map(cat => (
            <li key={cat}>
              <label className="flex items-center space-x-2 sidebar-category cursor-pointer hover:text-blue-600 transition">
                <input
                  type="checkbox"
                  className="accent-blue-600 focus:ring-2 focus:ring-blue-400"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                <span>{cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold mb-3 text-blue-700 text-lg">Khoảng giá</h3>
        <ul className="space-y-2">
          {priceRanges.map(range => (
            <li key={range.value}>
              <label className="flex items-center space-x-2 sidebar-price cursor-pointer hover:text-blue-600 transition">
                <input
                  type="radio"
                  name="price"
                  className="accent-blue-600 focus:ring-2 focus:ring-blue-400"
                  checked={selectedPrice === range.value}
                  onChange={() => handlePriceChange(range.value)}
                />
                <span>{range.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
