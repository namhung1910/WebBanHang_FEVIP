import Header from '../components/Header'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import Banner from '../components/Banner'
import ProductGrid from '../components/ProductGrid'
import Footer from '../components/Footer'
import LaptopBrandBar from '../components/LaptopBrandBar'
import { useState } from 'react'
import products from '../assets/data/products.json'

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [filters, setFilters] = useState({ categories: [], price: '' })
  const [searchKeyword, setSearchKeyword] = useState('')

  //xây logic lọc sản phẩm
  const applyFilter = () => {
    //kiểm tra xem có bộ lọc nào đang hoạt động
    const noCategory = filters.categories.length === 0
    const noPrice = filters.price === ''
    const noBrand = !selectedBrand
    const noSearch = searchKeyword.trim() === ''

    if (noCategory && noPrice && noBrand && noSearch) {
      return products
    }

    let result = [...products]

    if (!noBrand) {
      result = result.filter(p => p.brand === selectedBrand)
    }

    if (!noCategory) {
      result = result.filter(p => filters.categories.includes(p.category))
    }

    if (!noPrice) {
      if (filters.price === 'lt20') {
        result = result.filter(p => p.price < 20000000)
      } else if (filters.price === '20-35') {
        result = result.filter(p => p.price >= 20000000 && p.price <= 35000000)
      } else if (filters.price === 'gt35') {
        result = result.filter(p => p.price > 35000000)
      }
    }
    //lọc danh sách sp theo từ khóa được header trả về
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
      {/*nhận từ khóa tìm kiếm từ Header*/}
      <Header onSearch={setSearchKeyword} />
      <Nav />
      <Banner />
      <LaptopBrandBar selected={selectedBrand} onSelect={setSelectedBrand} />
      <div className="flex flex-col md:flex-row gap-4">
        <Sidebar onFilterChange={setFilters} />
        <div className="flex-1">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
      <Footer />
    </div>
  )
}