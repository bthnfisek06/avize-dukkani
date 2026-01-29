import React from 'react';

const Header = () => {
  return (
    <nav className="w-full font-sans">
      <div className="bg-[#FF6B2C] border-b border-orange-700 py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-center lg:justify-end items-center">
          <ul className="flex items-center gap-4 md:gap-8 text-white font-bold text-[11px] md:text-xs tracking-[0.15em] uppercase">
            <li><a href="#" className="hover:opacity-80 transition-opacity">Tüm Ürünler</a></li>
            <span className="text-white/30 hidden md:block">|</span>
            <li><a href="#" className="hover:opacity-80 transition-opacity">Aplikler</a></li>
            <span className="text-white/30 hidden md:block">|</span>
            <li><a href="#" className="hover:opacity-80 transition-opacity">Avizeler</a></li>
            <span className="text-white/30 hidden md:block">|</span>
            <li><a href="#" className="hover:opacity-80 transition-opacity">Lambaderler</a></li>
            <span className="text-white/30 hidden md:block">|</span>
            <li><a href="#" className="hover:opacity-80 transition-opacity">Sarkıtlar</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
