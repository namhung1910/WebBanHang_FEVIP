import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import productsData from './assets/data/products.json'

function paginate(arr: any[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  return arr.slice(start, start + perPage);
}

function App() {
  // Phân loại sản phẩm
  const bestSellers = productsData.slice(0, 9); // demo: lấy 9 sản phẩm đầu
  const desktops = productsData.filter(p => p.category === "PC" || p.category === "PC để bàn");
  const gamingLaptops = productsData.filter(p => p.category === "Gaming" || (p.category === "Laptop" && /game|đồ họa|gaming/i.test(p.name)));

  // State cho từng trang
  const [bestSellerPage, setBestSellerPage] = useState(1);
  const [desktopPage, setDesktopPage] = useState(1);
  const [gamingLaptopPage, setGamingLaptopPage] = useState(1);

  const perPage = 3;
  const bestSellerTotal = Math.ceil(bestSellers.length / perPage);
  const desktopTotal = Math.ceil(desktops.length / perPage);
  const gamingLaptopTotal = Math.ceil(gamingLaptops.length / perPage);

  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <Header />
      {/* Navigation Menu */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-6 justify-center font-semibold text-gray-700">
          <a href="#" className="hover:text-blue-600 transition">Laptop</a>
          <a href="#" className="hover:text-blue-600 transition">PC để bàn</a>
          <a href="#" className="hover:text-blue-600 transition">Màn hình</a>
          <a href="#" className="hover:text-blue-600 transition">Phụ kiện</a>
          <a href="#" className="hover:text-blue-600 transition">Gaming Gear</a>
          <a href="#" className="hover:text-blue-600 transition">Khuyến mãi</a>
        </div>
      </nav>
      {/* Main Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-4 py-6">
        {/* Sidebar Left */}
        <aside className="hidden md:block w-1/5 bg-white rounded-lg shadow p-4 min-h-[300px]">
          <div className="font-bold mb-2 text-gray-700">Bộ lọc sản phẩm</div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Giá</li>
            <li>Hãng</li>
            <li>CPU</li>
            <li>RAM</li>
            <li>Ổ cứng</li>
            <li>VGA</li>
            <li>Sản phẩm bán chạy</li>
          </ul>
          <div className="mt-6 bg-blue-50 rounded p-2 text-xs text-blue-700 text-center">
            Banner quảng cáo nhỏ
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 bg-white rounded-lg shadow p-6 min-h-[300px]">
          {/* Sản phẩm bán chạy */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Sản phẩm bán chạy</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginate(bestSellers, bestSellerPage, perPage).map((product) => (
                <div key={product.id} className="bg-blue-50 rounded p-4 text-center text-gray-700 shadow hover:shadow-lg transition">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mx-auto mb-2 h-28 object-contain"
                  />
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-blue-600 font-bold">{product.price.toLocaleString()}₫</div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
              <button
                className="px-3 py-1 rounded border bg-white hover:bg-blue-100 disabled:opacity-50"
                onClick={() => setBestSellerPage(p => Math.max(1, p - 1))}
                disabled={bestSellerPage === 1}
              >{"<"}</button>
              {Array.from({ length: bestSellerTotal }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded border ${bestSellerPage === i + 1 ? "bg-blue-500 text-white" : "bg-white hover:bg-blue-100"}`}
                  onClick={() => setBestSellerPage(i + 1)}
                >{i + 1}</button>
              ))}
              <button
                className="px-3 py-1 rounded border bg-white hover:bg-blue-100 disabled:opacity-50"
                onClick={() => setBestSellerPage(p => Math.min(bestSellerTotal, p + 1))}
                disabled={bestSellerPage === bestSellerTotal}
              >{">"}</button>
            </div>
          </section>
          {/* Máy tính để bàn */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Máy tính để bàn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginate(desktops, desktopPage, perPage).map((product) => (
                <div key={product.id + '-pc'} className="bg-blue-50 rounded p-4 text-center text-gray-700 shadow hover:shadow-lg transition">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mx-auto mb-2 h-28 object-contain"
                  />
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-blue-600 font-bold">{product.price.toLocaleString()}₫</div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
              <button
                className="px-3 py-1 rounded border bg-white hover:bg-blue-100 disabled:opacity-50"
                onClick={() => setDesktopPage(p => Math.max(1, p - 1))}
                disabled={desktopPage === 1}
              >{"<"}</button>
              {Array.from({ length: desktopTotal }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded border ${desktopPage === i + 1 ? "bg-blue-500 text-white" : "bg-white hover:bg-blue-100"}`}
                  onClick={() => setDesktopPage(i + 1)}
                >{i + 1}</button>
              ))}
              <button
                className="px-3 py-1 rounded border bg-white hover:bg-blue-100 disabled:opacity-50"
                onClick={() => setDesktopPage(p => Math.min(desktopTotal, p + 1))}
                disabled={desktopPage === desktopTotal}
              >{">"}</button>
            </div>
          </section>
          {/* Laptop game và đồ họa */}
          <section>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Laptop game và đồ họa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginate(gamingLaptops, gamingLaptopPage, perPage).map((product) => (
                <div key={product.id + '-laptop'} className="bg-blue-50 rounded p-4 text-center text-gray-700 shadow hover:shadow-lg transition">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mx-auto mb-2 h-28 object-contain"
                  />
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-blue-600 font-bold">{product.price.toLocaleString()}₫</div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
              <button
                className="px-3 py-1 rounded border bg-white hover:bg-blue-100 disabled:opacity-50"
                onClick={() => setGamingLaptopPage(p => Math.max(1, p - 1))}
                disabled={gamingLaptopPage === 1}
              >{"<"}</button>
              {Array.from({ length: gamingLaptopTotal }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded border ${gamingLaptopPage === i + 1 ? "bg-blue-500 text-white" : "bg-white hover:bg-blue-100"}`}
                  onClick={() => setGamingLaptopPage(i + 1)}
                >{i + 1}</button>
              ))}
              <button
                className="px-3 py-1 rounded border bg-white hover:bg-blue-100 disabled:opacity-50"
                onClick={() => setGamingLaptopPage(p => Math.min(gamingLaptopTotal, p + 1))}
                disabled={gamingLaptopPage === gamingLaptopTotal}
              >{">"}</button>
            </div>
          </section>
        </main>
        {/* Sidebar Right (optional, có thể dùng cho quảng cáo hoặc sản phẩm nổi bật) */}
        <aside className="hidden lg:block w-1/5 bg-white rounded-lg shadow p-4 min-h-[300px]">
          <div className="font-bold mb-2 text-gray-700">Nội dung phụ</div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Khuyến mãi</li>
            <li>Sản phẩm nổi bật</li>
            <li>Hỗ trợ khách hàng</li>
          </ul>
        </aside>
      </div>
      <Footer />
    </div>
  );
}

export default App
