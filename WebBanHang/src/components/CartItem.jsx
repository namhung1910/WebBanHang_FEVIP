import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const CartItem = ({ item, onRemove, onUpdate }) => (
  <div className="flex items-center justify-between p-4 border-b">
    <div className="flex items-center space-x-4">
      {item.image && (
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
      )}
      <div>
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600">
          {item.price.toLocaleString()}₫
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center border rounded">
        <button
          onClick={() => onUpdate(item.id, item.quantity - 1)}
          className="px-2 py-1 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition"
        >
          -
        </button>
        <span className="px-3 py-1">{item.quantity}</span>
        <button
          onClick={() => onUpdate(item.id, item.quantity + 1)}
          className="px-2 py-1 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition"
        >
          +
        </button>
      </div>
      <p className="w-24 text-right font-medium">
        {(item.price * item.quantity).toLocaleString()}₫
      </p>
      <button
        onClick={() => onRemove(item.id)}
        className="flex items-center justify-center p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 transition"
        title="Xóa sản phẩm"
      >
        <FiTrash2 size={20} />
      </button>
    </div>
  </div>
);

export default CartItem;
