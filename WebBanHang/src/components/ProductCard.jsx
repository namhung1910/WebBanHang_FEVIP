import { useState, useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false)
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()
  const [showAddedMsg, setShowAddedMsg] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      // ...thêm thuộc tính khác nếu cần
    })
    setShowAddedMsg(true)
    setTimeout(() => setShowAddedMsg(false), 1500)
  }

  const handleBuyNow = (e) => {
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      // ...thêm thuộc tính khác nếu cần
    })
    navigate('/checkout')
  }

  return (
    <>
      {/* Thẻ sản phẩm */}
      <div
        onClick={() => setShowModal(true)}
        className="bg-white rounded-xl shadow p-4 flex flex-col h-full w-full min-h-[320px] sm:min-h-[370px] max-w-full mx-auto cursor-pointer hover:shadow-lg transition"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-contain mb-3 rounded"
          loading="lazy"
        />
        <div className="flex-1 flex flex-col">
          <div className="font-medium mb-1">{product.name}</div>
          <div className="text-blue-600 font-bold text-lg mb-4">
            {product.price.toLocaleString()}₫
          </div>
          <div className="mt-auto">
            <button
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition w-full"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ
            </button>
            {showAddedMsg && (
              <div className="mt-2 text-green-600 text-sm text-center animate-fade-in">
                Sản phẩm đã được thêm vào giỏ hàng
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal chi tiết sản phẩm */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full relative p-6">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full md:w-1/2 h-48 object-contain bg-gray-50 rounded"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                <ul className="text-sm space-y-1 mb-4">
                  <li><strong>CPU:</strong> {product.cpu}</li>
                  <li><strong>RAM:</strong> {product.ram}</li>
                  <li><strong>Ổ cứng:</strong> {product.storage}</li>
                  <li><strong>GPU:</strong> {product.gpu}</li>
                  <li><strong>Màn hình:</strong> {product.display}</li>
                  <li><strong>Hệ điều hành:</strong> {product.os}</li>
                </ul>
                <div className="text-blue-600 font-bold text-xl mb-4">
                  {product.price.toLocaleString()}₫
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    onClick={handleBuyNow}
                  >
                    Mua ngay
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={handleAddToCart}
                  >
                    Thêm vào giỏ
                  </button>
                  {showAddedMsg && (
                    <div className="ml-2 text-green-600 text-sm self-center animate-fade-in">
                      Sản phẩm đã được thêm vào giỏ hàng
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
