import Header from './components/Header'
import Nav from './components/Nav'
import Sidebar from './components/Sidebar'
import Banner from './components/Banner'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import LaptopBrandBar from './components/LaptopBrandBar'
import { useState } from 'react'
import products from './assets/data/products.json'

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [filters, setFilters] = useState({ categories: [], price: '' })
  const [searchKeyword, setSearchKeyword] = useState('')

  const applyFilter = () => {
    const noCategory = filters.categories.length === 0
    const noPrice = filters.price === ''
    const noBrand = !selectedBrand
    const noSearch = searchKeyword.trim() === ''

    // Nếu không có lọc gì cả thì trả hết sản phẩm
    if (noCategory && noPrice && noBrand && noSearch) {
      return products
    }

    let result = [...products]

    // Lọc theo hãng
    if (!noBrand) {
      result = result.filter(p => p.brand === selectedBrand)
    }

    // Lọc theo danh mục
    if (!noCategory) {
      result = result.filter(p => filters.categories.includes(p.category))
    }

    // Lọc theo giá
    if (!noPrice) {
      if (filters.price === 'lt20') {
        result = result.filter(p => p.price < 20000000)
      } else if (filters.price === '20-35') {
        result = result.filter(p => p.price >= 20000000 && p.price <= 35000000)
      } else if (filters.price === 'gt35') {
        result = result.filter(p => p.price > 35000000)
      }
    }

    // Lọc theo từ khoá tìm kiếm
    if (!noSearch) {
      const keyword = searchKeyword.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(keyword)
      )
    }

    return result
  }

  const filteredProducts = applyFilter()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header onSearch={setSearchKeyword} />
      <Nav />
      <Banner />
      <LaptopBrandBar selected={selectedBrand} onSelect={setSelectedBrand} />
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-2 md:px-4 py-4 gap-4">
        <Sidebar
          className="hidden lg:block w-64 mr-4"
          onFilterChange={setFilters}
        />
        <main className="flex-1">
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
      <Footer />
    </div>
  )
}
