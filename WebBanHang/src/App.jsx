import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { CartProvider } from './context/CartContext' // Thêm dòng này

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* <Route path="/products/:id" element={<ProductDetail />} /> */}
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
