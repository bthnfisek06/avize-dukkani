"use client";
import React, { useEffect, useMemo, useState } from 'react';

type SepetUrunu = {
  id: string | number;
  ad: string;
  fiyat: number;
  resim?: string;
};

const CartPage = () => {
  const [sepet, setSepet] = useState<SepetUrunu[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('nuve_cart');
    if (data) {
      try {
        setSepet(JSON.parse(data));
      } catch {
        localStorage.removeItem('nuve_cart');
      }
    }
  }, []);

  const toplamTutar = useMemo(
    () => sepet.reduce((toplam, urun) => toplam + (urun.fiyat || 0), 0),
    [sepet]
  );

  const sepettenSil = (index: number) => {
    const yeniSepet = sepet.filter((_, i) => i !== index);
    setSepet(yeniSepet);
    localStorage.setItem('nuve_cart', JSON.stringify(yeniSepet));
  };

  const sepetiOnayla = () => {
    window.location.href = "/payment";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase mb-6" style={{ fontFamily: 'serif' }}>
          Alışveriş Sepetim
        </h1>
        <div className="h-[1px] w-24 bg-yellow-600 mb-8"></div>

        {sepet.length === 0 ? (
          <p className="text-neutral-400 text-sm">
            Sepetiniz şu anda boş. Ürün ekledikçe burada listelenecektir.
          </p>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {sepet.map((urun, index) => (
                <div key={`${urun.id}-${index}`} className="flex items-center gap-4 bg-neutral-900/60 border border-neutral-800 rounded-lg p-4">
                  <div className="w-16 h-20 bg-neutral-800 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={urun.resim || 'https://via.placeholder.com/120x160'}
                      alt={urun.ad}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm uppercase tracking-widest text-white">{urun.ad}</h3>
                    <p className="text-yellow-600 font-bold text-sm">{urun.fiyat?.toLocaleString()} TL</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => sepettenSil(index)}
                    className="text-white/50 hover:text-red-400 transition-colors text-lg"
                    aria-label="Sepetten Sil"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-neutral-800 pt-6">
              <span className="text-neutral-400 text-sm uppercase tracking-widest">Toplam</span>
              <span className="text-yellow-600 font-bold text-lg">{toplamTutar.toLocaleString()} TL</span>
            </div>

            <button
              onClick={sepetiOnayla}
              className="w-full py-4 bg-yellow-600 text-black font-bold uppercase tracking-widest hover:bg-yellow-500 transition"
            >
              Sepeti Onayla
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
