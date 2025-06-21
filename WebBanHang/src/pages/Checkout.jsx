import React, { useState, useContext } from 'react';
import { Modal } from 'antd';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const orderData = {
      id: Date.now(),
      date: new Date().toISOString(),
      customer: formData,
      items: cart,
      total: cartTotal
    };
    setOrder(orderData);
    setIsModalOpen(true);
    clearCart();
    // Lưu đơn hàng vào localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/shop');
  };

  return (
    <>
      <Header />
      <Nav /> {/* Đưa Nav ra ngoài container */}
      <div
        className="container mx-auto px-4 py-8"
        style={{ minHeight: '100vh', paddingBottom: '120px' }} // Thêm padding dưới tránh che nội dung
      >
        <h1 className="text-2xl font-bold mb-6">Thanh Toán</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Họ và tên *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Địa chỉ *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Số điện thoại *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
            >
              Đặt hàng
            </button>
          </form>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-600"> × {item.quantity}</span>
                  </div>
                  <div className="font-medium">
                    {(item.price * item.quantity).toLocaleString()}₫
                  </div>
                </div>
              ))}
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Tổng cộng:</span>
                <span>{cartTotal.toLocaleString()}₫</span>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Đặt hàng thành công!"
          open={isModalOpen}
          onOk={handleModalClose}
          onCancel={handleModalClose}
          okText="Tiếp tục mua sắm"
          cancelText="Đóng"
        >
          {order && (
            <div>
              <p>
                Cảm ơn bạn <strong>{order.customer.name}</strong> đã đặt hàng!
              </p>
              <p className="mt-2">
                Mã đơn hàng: <strong>#{order.id}</strong>
              </p>
              <p>
                Tổng giá trị: <strong>{order.total.toLocaleString()}₫</strong>
              </p>
              <p className="mt-4">Chúng tôi sẽ giao hàng đến:</p>
              <p>{order.customer.address}</p>
              <p>SĐT: {order.customer.phone}</p>
            </div>
          )}
        </Modal>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-40">
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
