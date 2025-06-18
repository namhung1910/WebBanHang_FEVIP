import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useContext(CartContext);

  return (
    <>
      <Header />
      <Nav /> {/* Đưa Nav ra ngoài container */}
      <div
        className="container mx-auto px-4 py-8"
        style={{ minHeight: '100vh', paddingBottom: '120px' }} // Thêm padding dưới tránh che nội dung
      >
        <h1 className="text-2xl font-bold mb-6">Giỏ Hàng ({cartCount})</h1>
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Giỏ hàng của bạn đang trống</p>
            <Link to="/shop" className="bg-blue-500 text-white px-4 py-2 rounded">Tiếp tục mua sắm</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white rounded-lg shadow">
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdate={updateQuantity}
                />
              ))}
              <div className="p-4 flex justify-end">
                <button onClick={clearCart} className="text-red-500">Xóa giỏ hàng</button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Tổng đơn hàng</h2>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{cartTotal.toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Tổng cộng:</span>
                  <span>{cartTotal.toLocaleString()}₫</span>
                </div>
              </div>
              <Link to="/checkout" className="block w-full text-center bg-green-500 text-white py-3 rounded">Thanh toán</Link>
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 w-full z-40">
        <Footer />
      </div>
    </>
  );
};

export default Cart;
