import React from 'react';

const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase mb-6" style={{ fontFamily: 'serif' }}>
          Sipariş Takibi
        </h1>
        <div className="h-[1px] w-24 bg-yellow-600 mb-8"></div>
        <p className="text-neutral-300 leading-relaxed mb-8">
          Sipariş durumunuzu hızlıca kontrol etmek için aşağıdaki alanı kullanabilirsiniz.
          Sipariş numaranızı girin ve takip edin.
        </p>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 space-y-4">
          <input
            type="text"
            placeholder="Sipariş Numarası"
            className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-600"
          />
          <button
            type="button"
            className="w-full py-3 bg-yellow-600 text-black font-bold uppercase tracking-widest hover:bg-yellow-500 transition"
          >
            Siparişi Sorgula
          </button>
          <p className="text-xs text-neutral-500">
            Örnek: NUVE-2026-00123
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
