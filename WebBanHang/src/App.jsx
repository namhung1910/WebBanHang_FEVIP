import Header from './components/Header'
import Nav from './components/Nav'
import Sidebar from './components/Sidebar'
import Banner from './components/Banner'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import LaptopBrandBar from './components/LaptopBrandBar'
import { useState } from 'react'

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState(null)
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header />
      <Nav />
      <Banner />
      <LaptopBrandBar selected={selectedBrand} onSelect={setSelectedBrand} />
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-2 md:px-4 py-4 gap-4">
        <Sidebar className="hidden lg:block w-64 mr-4" />
        <main className="flex-1">
          {/* Có thể truyền selectedBrand vào ProductGrid để lọc sản phẩm theo hãng nếu muốn */}
          <ProductGrid />
        </main>
      </div>
      <Footer />
    </div>
  )
}
