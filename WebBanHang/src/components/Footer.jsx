export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <div className="font-bold mb-2 text-blue-400">Liên hệ</div>
          <div>Email: <a href="mailto:fevipshop@email.com" className="hover:underline text-blue-200">fevipshop@email.com</a></div>
          <div>ĐT: <a href="tel:0123456789" className="hover:underline text-blue-200">0123 456 789</a></div>
          <div>Địa chỉ: 123 Đường ABC, Hà Nội</div>
        </div>
        <div>
          <div className="font-bold mb-2 text-blue-400">Mạng xã hội</div>
          <div className="flex space-x-2">
            <a href="#" className="hover:underline hover:text-accent transition">Facebook</a>
            <a href="#" className="hover:underline hover:text-accent transition">Zalo</a>
            <a href="#" className="hover:underline hover:text-accent transition">Instagram</a>
          </div>
        </div>
        <div>
          <div className="font-bold mb-2 text-blue-400">Chính sách</div>
          <div><a href="#" className="hover:underline hover:text-accent transition">Bảo mật</a></div>
          <div><a href="#" className="hover:underline hover:text-accent transition">Điều khoản</a></div>
        </div>
      </div>
      <div className="text-center mt-4 text-xs text-gray-400">
        © 2025 FEVIP Shop. All rights reserved.
      </div>
    </footer>
  )
}
