import React from 'react';

const CustomerServicePage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase mb-6" style={{ fontFamily: 'serif' }}>
          Müşteri Hizmetleri
        </h1>
        <div className="h-[1px] w-24 bg-yellow-600 mb-8"></div>
        <p className="text-neutral-300 leading-relaxed">
          Nuve Müşteri Hizmetleri olarak her aşamada yanınızdayız. Ürünlerimiz, sipariş süreci, teslimat ve
          satış sonrası destekle ilgili tüm sorularınız için bize ulaşabilirsiniz. Amacımız, size hızlı ve
          güvenilir bir deneyim sunmaktır.
        </p>
        <p className="text-neutral-400 leading-relaxed mt-4">
          Hafta içi 09:00–18:00 saatleri arasında destek ekibimizle iletişime geçebilir; ihtiyaçlarınıza uygun
          çözümler için profesyonel yönlendirme alabilirsiniz. Nuve, memnuniyetinizi her şeyin üzerinde tutar.
        </p>
        <div className="mt-8 text-sm text-neutral-400 space-y-2">
          <p>📞 +90 (212) 555 00 00</p>
          <p>✉️ info@nuvelighting.com</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerServicePage;
