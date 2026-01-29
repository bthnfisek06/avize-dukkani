"use client";
import React, { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AdminPage() {
  const [ad, setAd] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [resim, setResim] = useState("");
  const [kat, setKat] = useState("Modern"); // Ana sayfadaki kategorilere uygun başlattık
  const [yukleniyor, setYukleniyor] = useState(false);

  const urunEkle = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Butona basıldı!"); // Bunu ekle
    alert("Buton çalışıyor, veri gönderiliyor..."); // Bunu ekle
    setYukleniyor(true);

    try {
      if (!ad.trim() || !fiyat.trim() || !resim.trim()) {
        alert("Lütfen ürün adı, fiyat ve resim alanlarını doldurun!");
        setYukleniyor(false);
        return;
      }

      // Ana sayfanın (ShopPage) beklediği tam format budur:
      const urunVerisi = {
        ad: ad.trim(),
        fiyat: Number(fiyat), // Sayıya çevirdik
        kategori: kat,
        resim: resim.trim(), // Liste değil, direkt string gönderiyoruz
        tarih: new Date()
      };

      await addDoc(collection(db, "urunler"), urunVerisi);
      
      alert("BAŞARILI! Ürün dükkana düştü.");
      
      // Formu temizle
      setAd("");
      setFiyat("");
      setResim("");
    } catch (e: any) {
      console.error("Hata: ", e);
      alert("Hata: " + (e.message || "Bilinmeyen bir hata oluştu"));
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="p-8 max-w-md mx-auto bg-white shadow-2xl rounded-3xl mt-10">
        <h1 className="text-3xl font-black mb-6 text-black text-center uppercase tracking-tighter">Nuve Admin</h1>
        
        <form onSubmit={urunEkle} className="space-y-5 text-black">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ürün Adı</label>
            <input 
              value={ad} 
              onChange={(e) => setAd(e.target.value)} 
              placeholder="Örn: Kristal Avize" 
              className="w-full p-3 border-b-2 border-gray-100 focus:border-orange-500 outline-none transition font-medium" 
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fiyat (TL)</label>
            <input 
              value={fiyat} 
              onChange={(e) => setFiyat(e.target.value)} 
              type="number" 
              placeholder="4500" 
              className="w-full p-3 border-b-2 border-gray-100 focus:border-orange-500 outline-none transition font-medium" 
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kategori</label>
            <select 
              value={kat} 
              onChange={(e) => setKat(e.target.value)} 
              className="w-full p-3 bg-gray-50 rounded-xl outline-none font-bold text-sm"
            >
              <option value="Modern">Modern</option>
              <option value="Klasik">Klasik</option>
              <option value="Luxury">Luxury</option>
              <option value="Minimalist">Minimalist</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resim Linki (URL)</label>
            <input 
              value={resim} 
              onChange={(e) => setResim(e.target.value)} 
              placeholder="https://images.unsplash.com/..." 
              className="w-full p-3 border-b-2 border-gray-100 focus:border-orange-500 outline-none transition text-xs" 
            />
          </div>

          <button 
            type="submit" 
            disabled={yukleniyor} 
            className="w-full bg-black text-white p-4 rounded-2xl font-black hover:bg-orange-600 transition-all duration-300 shadow-xl disabled:opacity-50 uppercase tracking-tighter"
          >
            {yukleniyor ? "YÜKLENİYOR..." : "DÜKKANA GÖNDER"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-gray-400 font-bold hover:text-orange-600 text-xs uppercase tracking-widest transition-colors">
            ← SİTEYE GERİ DÖN
          </a>
        </div>
      </div>
    </div>
  );
}