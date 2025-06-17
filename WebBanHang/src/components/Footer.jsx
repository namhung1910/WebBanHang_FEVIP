import { FaFacebookF, FaInstagram, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-8 font-sans text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Cột 1: Liên hệ */}
        <div>
          <h3 className="text-blue-400 font-bold mb-3">Liên hệ</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2"><FaEnvelope /> <a href="mailto:fevipshop@email.com" className="hover:text-blue-200">fevipshop@email.com</a></li>
            <li className="flex items-center gap-2"><FaPhoneAlt /> <a href="tel:0123456789" className="hover:text-blue-200">0123 456 789</a></li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> 1234 Đường ABC, Hà Nội</li>
          </ul>
        </div>

        {/* Cột 2: Mạng xã hội */}
        <div>
          <h3 className="text-blue-400 font-bold mb-3">Mạng xã hội</h3>
          <div className="flex space-x-4 text-xl text-gray-300">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400 transition"><SiZalo /></a>
            <a href="#" className="hover:text-pink-400 transition"><FaInstagram /></a>
          </div>
        </div>

        {/* Cột 3: Chính sách */}
        <div>
          <h3 className="text-blue-400 font-bold mb-3">Chính sách</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-blue-200">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-blue-200">Điều khoản sử dụng</a></li>
          </ul>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="text-center mt-6 text-xs text-gray-500 border-t border-gray-700 pt-4">
        © 2025 FEVIP Shop.
      </div>
    </footer>
  );
}
