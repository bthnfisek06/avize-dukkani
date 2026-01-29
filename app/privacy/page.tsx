"use client";
import React, { useEffect, useState } from 'react';

type PolicyTab = "gizlilik" | "uyelik" | "kullanim";

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState<PolicyTab>("gizlilik");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "gizlilik" || hash === "uyelik" || hash === "kullanim") {
      setActiveTab(hash);
    }
  }, []);

  const baseClasses = "px-4 py-2 text-xs uppercase tracking-widest border";
  const activeClasses = "bg-black text-white border-black";
  const inactiveClasses = "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black";

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800 leading-relaxed">
        <h1 className="text-3xl font-bold mb-6">Yasal Metinler</h1>
        <p className="mb-8 text-sm text-gray-500 italic">Son Güncelleme: 25 Ocak 2026</p>

        <div className="flex flex-wrap gap-3 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab("gizlilik")}
            className={`${baseClasses} ${activeTab === "gizlilik" ? activeClasses : inactiveClasses}`}
          >
            Gizlilik Sözleşmesi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("uyelik")}
            className={`${baseClasses} ${activeTab === "uyelik" ? activeClasses : inactiveClasses}`}
          >
            Üyelik Sözleşmesi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("kullanim")}
            className={`${baseClasses} ${activeTab === "kullanim" ? activeClasses : inactiveClasses}`}
          >
            Kullanım Koşulları
          </button>
        </div>

        {activeTab === "gizlilik" && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Gizlilik ve Kişisel Verilerin Korunması Politikası</h2>
            <section className="mb-6">
              <h3 className="text-lg font-bold mb-3">1. Veri Sorumlusu</h3>
              <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verileriniz veri sorumlusu olarak <strong>Nuve Design Studio</strong> tarafından aşağıda açıklanan kapsamda işlenebilecektir.</p>
            </section>
            <section className="mb-6">
              <h3 className="text-lg font-bold mb-3">2. Kişisel Verilerin İşlenme Amacı</h3>
              <p>Toplanan kişisel verileriniz; siparişlerinizin oluşturulması, ürün teslimatı, faturalandırma süreçlerinin yönetimi ve yasal yükümlülüklerimizin yerine getirilmesi amacıyla işlenmektedir.</p>
            </section>
            <section>
              <h3 className="text-lg font-bold mb-3">3. Haklarınız</h3>
              <p>KVKK’nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme ve verilerinizin silinmesini isteme haklarına sahipsiniz. Taleplerinizi iletişim formumuz üzerinden iletebilirsiniz.</p>
            </section>
          </div>
        )}

        {activeTab === "uyelik" && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Üyelik Sözleşmesi</h2>
            <section className="mb-6">
              <h3 className="text-lg font-bold mb-3">1. Taraflar</h3>
              <p>İşbu sözleşme, <strong>Nuve Design Studio</strong> ile siteye üye olan kullanıcı arasında kurulmuştur.</p>
            </section>
            <section className="mb-6">
              <h3 className="text-lg font-bold mb-3">2. Üyelik Koşulları</h3>
              <p>Üyelik başvurusu, doğru ve güncel bilgilerle yapılmalı; kullanıcı, üyelik hesabını güvenli şekilde korumayı kabul eder.</p>
            </section>
            <section>
              <h3 className="text-lg font-bold mb-3">3. Hizmetin Kapsamı</h3>
              <p>Nuve Design Studio, üyelik kapsamında sunulan hizmetlerde değişiklik yapma hakkını saklı tutar.</p>
            </section>
          </div>
        )}

        {activeTab === "kullanim" && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Kullanım Koşulları</h2>
            <section className="mb-6">
              <h3 className="text-lg font-bold mb-3">1. Genel</h3>
              <p>Siteyi kullanan her kullanıcı, işbu koşulları okuduğunu ve kabul ettiğini beyan eder.</p>
            </section>
            <section className="mb-6">
              <h3 className="text-lg font-bold mb-3">2. İçerik ve Telif</h3>
              <p>Site içeriğinin izinsiz kopyalanması, çoğaltılması veya paylaşılması yasaktır.</p>
            </section>
            <section>
              <h3 className="text-lg font-bold mb-3">3. Sorumluluk Sınırı</h3>
              <p>Nuve Design Studio, kullanıcı kaynaklı hatalardan doğan zararlardan sorumlu değildir.</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
