import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#FF8C00] border-t border-orange-600 pt-16 pb-12 px-8 font-sans text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Marka Kimliği */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight">NUVE.</h2>
            <p className="text-orange-50 text-sm leading-relaxed">
              Aydınlatmada zarafetin adresi. Yaşam alanlarınıza ışık ve estetik katmak için özenle tasarlıyoruz.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#FF8C00] transition-all">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Menü Grupları */}
          <div className="space-y-6">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] text-orange-200">Destek</h3>
            <ul className="space-y-4 text-[14px] font-medium">
              <li><a href="#" className="hover:text-orange-100 transition-colors">Ödeme ve Teslimat</a></li>
              <li><a href="#" className="hover:text-orange-100 transition-colors">Değişim ve İade</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] text-orange-200">Yasal</h3>
            <ul className="space-y-4 text-[14px] font-medium">
              <li><a href="/privacy#gizlilik" className="hover:text-orange-100 transition-colors">Gizlilik Sözleşmesi</a></li>
              <li><a href="/privacy#uyelik" className="hover:text-orange-100 transition-colors">Üyelik Sözleşmesi</a></li>
              <li><a href="/privacy#kullanim" className="hover:text-orange-100 transition-colors">Kullanım Koşulları</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] text-orange-200">Profil</h3>
            <ul className="space-y-4 text-[14px] font-medium">
              <li><a href="#" className="hover:text-orange-100 transition-colors">Favorilerim</a></li>
              <li><a href="#" className="hover:text-orange-100 transition-colors">Sipariş Takibi</a></li>
              <li><a href="#" className="hover:text-orange-100 transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-orange-100">
          <div className="flex items-center gap-2 hover:text-white cursor-pointer">
            <span className="text-[12px] font-bold uppercase tracking-widest">İletişim</span>
            <FaWhatsapp size={20} className="text-[#25D366] bg-white rounded-full p-0.5" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/70">
            © 2026 NUVE DESIGN STUDIO.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
