import React from "react";
import { FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-200 pt-10 pb-4 mt-10">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-10 md:gap-20 justify-between">
      {/* Company Info */}
      <div className="flex-1 min-w-[220px]">
        <div className="text-2xl font-bold text-blue-400 mb-2">TechStore</div>
        <div className="text-gray-300 mb-1">
          Địa chỉ: 123 Đường Công Nghệ, Q.1, TP.HCM
        </div>
        <div className="text-gray-300 mb-1">
          Email:{" "}
          <a
            href="mailto:support@techstore.vn"
            className="hover:underline text-blue-300"
          >
            support@techstore.vn
          </a>
        </div>
        <div className="text-gray-300">
          Hotline:{" "}
          <a
            href="tel:19001234"
            className="hover:underline text-blue-300"
          >
            1900 1234
          </a>
        </div>
      </div>
      {/* Quick Links */}
      <div className="flex-1 min-w-[180px]">
        <div className="font-semibold mb-2 text-blue-300">Liên kết nhanh</div>
        <ul className="space-y-1">
          <li>
            <a
              href="#"
              className="hover:text-blue-400 transition"
            >
              Chính sách đổi trả
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-400 transition"
            >
              Bảo hành & hỗ trợ
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-400 transition"
            >
              Hướng dẫn mua hàng
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-400 transition"
            >
              Về chúng tôi
            </a>
          </li>
        </ul>
      </div>
      {/* Social */}
      <div className="flex-1 min-w-[160px]">
        <div className="font-semibold mb-2 text-blue-300">
          Kết nối với chúng tôi
        </div>
        <div className="flex gap-4 mt-1">
          <a
            href="#"
            className="hover:text-blue-500 transition"
            aria-label="Facebook"
          >
            <FaFacebook size={26} />
          </a>
          <a
            href="#"
            className="hover:text-red-500 transition"
            aria-label="YouTube"
          >
            <FaYoutube size={26} />
          </a>
          <a
            href="#"
            className="hover:text-gray-100 transition"
            aria-label="TikTok"
          >
            <FaTiktok size={26} />
          </a>
        </div>
      </div>
    </div>
    <div className="text-center text-gray-400 text-sm mt-8 border-t border-gray-800 pt-4">
      © 2025 TechStore. All rights reserved.
    </div>
  </footer>
);

export default Footer;