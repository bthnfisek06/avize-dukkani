"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PaymentPage() {
  const [kartSahibi, setKartSahibi] = useState("");
  const [kartNo, setKartNo] = useState("");
  const [sonKullanma, setSonKullanma] = useState("");
  const [cvv, setCvv] = useState("");
  const [adSoyad, setAdSoyad] = useState("");
  const [adres, setAdres] = useState("");
  const [sehir, setSehir] = useState("");
  const [tel, setTel] = useState("");
  const [odemeYapildi, setOdemeYapildi] = useState(false);
  const [gonderen, setGonderen] = useState(false);
  const [hata, setHata] = useState("");

  const kartNoFormat = (v: string) => {
    const s = v.replace(/\D/g, "").slice(0, 16);
    return s.replace(/(.{4})/g, "$1 ").trim();
  };

  const skFormat = (v: string) => {
    const s = v.replace(/\D/g, "").slice(0, 4);
    if (s.length >= 2) return `${s.slice(0, 2)}/${s.slice(2)}`;
    return s;
  };

  const handleKartNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKartNo(kartNoFormat(e.target.value));
  };

  const handleSonKullanma = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSonKullanma(skFormat(e.target.value));
  };

  const handleCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata("");
    setGonderen(true);

    const no = kartNo.replace(/\s/g, "");
    if (!kartSahibi.trim() || no.length < 16 || !sonKullanma.trim() || cvv.length < 3) {
      setHata("Lütfen kart bilgilerini eksiksiz doldurun.");
      setGonderen(false);
      return;
    }
    if (!adSoyad.trim() || !adres.trim() || !sehir.trim() || !tel.trim()) {
      setHata("Lütfen teslimat bilgilerini eksiksiz doldurun.");
      setGonderen(false);
      return;
    }

    // Ödeme simülasyonu — gerçek entegrasyonda API çağrısı yapılır
    await new Promise((r) => setTimeout(r, 1200));
    localStorage.removeItem("nuve_cart");
    setOdemeYapildi(true);
    setGonderen(false);
  };

  if (odemeYapildi) {
    return (
      <div className="min-h-screen bg-[#050505] text-white">
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] uppercase mb-4">
            Ödemeniz alındı
          </h1>
          <div className="h-[1px] w-24 bg-[#FF5A00] mx-auto mb-8" />
          <p className="text-neutral-400 mb-8">
            Siparişiniz oluşturuldu. En kısa sürede sizinle iletişime geçeceğiz.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#FF5A00] text-white text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "serif" }}>
          Ödeme
        </h1>
        <div className="h-[1px] w-24 bg-[#FF5A00] mb-2" />
        <p className="text-neutral-400 text-sm mb-10">
          Ödeme adımına yönlendirildiniz. Kart ve teslimat bilgilerinizi girin.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Kart bilgileri */}
          <div>
            <h2 className="text-[#FF5A00] text-xs font-bold uppercase tracking-[0.25em] mb-4">
              Kart bilgileri
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5">
                  Kart sahibi
                </label>
                <input
                  type="text"
                  value={kartSahibi}
                  onChange={(e) => setKartSahibi(e.target.value)}
                  placeholder="Ad Soyad"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5">
                  Kart numarası
                </label>
                <input
                  type="text"
                  value={kartNo}
                  onChange={handleKartNo}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] outline-none transition font-mono tracking-wider"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5">
                    Son kullanma (AA/YY)
                  </label>
                  <input
                    type="text"
                    value={sonKullanma}
                    onChange={handleSonKullanma}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] outline-none transition font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5">
                    CVV
                  </label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={handleCvv}
                    placeholder="•••"
                    maxLength={4}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] outline-none transition font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Teslimat bilgileri */}
          <div>
            <h2 className="text-[#FF5A00] text-xs font-bold uppercase tracking-[0.25em] mb-4">
              Teslimat bilgileri
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5">
                  Ad soyad
                </label>
                <input
                  type="text"
                  value={adSoyad}
                  onChange={(e) => setAdSoyad(e.target.value)}
                  placeholder="Teslimat adına"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5">
                  Adres
                </label>
                <textarea
                  value={adres}
                  onChange={(e) => setAdres(e.target.value)}
                  placeholder="Mahalle, sokak, bina no, daire"
                  rows={3}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] outline-none transition resize-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5">
                    Şehir
                  </label>
                  <input
                    type="text"
                    value={sehir}
                    onChange={(e) => setSehir(e.target.value)}
                    placeholder="İl"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {hata && (
            <p className="text-red-400 text-sm">{hata}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/cart"
              className="order-2 sm:order-1 flex-1 py-4 border border-neutral-700 text-white text-center text-sm font-bold uppercase tracking-widest rounded hover:border-[#FF5A00] hover:text-[#FF5A00] transition"
            >
              Sepete dön
            </Link>
            <button
              type="submit"
              disabled={gonderen}
              className="order-1 sm:order-2 flex-1 py-4 bg-[#FF5A00] text-white text-sm font-bold uppercase tracking-widest rounded hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {gonderen ? "İşleniyor…" : "Ödemeyi tamamla"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
