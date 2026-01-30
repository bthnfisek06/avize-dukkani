"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const CART_KEY = "nuve_cart";

interface Urun {
  id: string;
  ad: string;
  fiyat: number;
  resim: string;
  kategori: string;
}

type SepetUrunu = { id: string; ad: string; fiyat: number; resim?: string };

export default function ShopPage() {
  const [arama, setArama] = useState("");
  const [seciliKategori, setSeciliKategori] = useState("Hepsi");
  const [sepet, setSepet] = useState<SepetUrunu[]>([]);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [urunler, setUrunler] = useState<Urun[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  // Sepeti localStorage'dan yükle
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setSepet(Array.isArray(parsed) ? parsed : []);
    } catch {
      localStorage.removeItem(CART_KEY);
    }
  }, []);

  const sepeteEkle = (urun: Urun) => {
    const yeni = { id: urun.id, ad: urun.ad, fiyat: urun.fiyat, resim: urun.resim || undefined };
    const yeniSepet = [...sepet, yeni];
    setSepet(yeniSepet);
    localStorage.setItem(CART_KEY, JSON.stringify(yeniSepet));
  };

  // Firebase'den ürünleri çek
  useEffect(() => {
    const q = query(collection(db, "urunler"), orderBy("tarih", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const urunListesi: Urun[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ad: data.ad || "",
          fiyat: typeof data.fiyat === "number" ? data.fiyat : Number(data.fiyat) || 0,
          resim: data.resim || (Array.isArray(data.resimler) ? data.resimler[0] : "") || "",
          kategori: data.kategori || "Genel"
        };
      });
      setUrunler(urunListesi);
      setYukleniyor(false);
    }, (error) => {
      console.error("Firebase hatası:", error);
      setYukleniyor(false);
    });

    return () => unsubscribe();
  }, []);

  const filtrelenmisUrunler = urunler.filter((urun) => {
    const matchesSearch = urun.ad.toLowerCase().includes(arama.toLowerCase());
    const matchesCategory = seciliKategori === "Hepsi" || urun.kategori === seciliKategori;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF5A00]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex flex-col text-left">
          <div className="text-[30px] md:text-[36px] leading-none font-semibold tracking-[0.12em] uppercase text-[#FF5A00] whitespace-nowrap">
              N U V E
            </div>
            <div className="mt-3 h-[1px] w-24 bg-[#FF5A00]" />
            <div className="mt-2 text-[10px] text-white/60 font-medium tracking-[0.35em] uppercase">
              Luxury Lighting
            </div>
          </Link>
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Avize ara..." 
              value={arama}
              onChange={(e) => setArama(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-full py-2 px-10 text-sm focus:border-[#FF5A00] outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="h-10 px-4 rounded-full border border-[#FF5A00]/40 bg-black/30 text-[10px] font-bold uppercase tracking-widest text-[#FF5A00] hover:bg-[#FF5A00] hover:text-black transition-colors inline-flex items-center"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/cart"
              className="font-bold text-[#FF5A00] uppercase text-sm hover:underline"
            >
              Sepetim ({sepet.length})
            </Link>
          </div>
        </div>
      </header>

      {/* Kategoriler */}
      <nav className="bg-neutral-950 border-b border-neutral-900 py-3 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-4 text-xs font-bold uppercase tracking-widest">
          {["Hepsi", "Modern", "Klasik", "Luxury", "Minimalist"].map((kat) => (
            <button 
              key={kat}
              onClick={() => setSeciliKategori(kat)}
              className={`px-4 py-1 rounded-full transition-all ${seciliKategori === kat ? "text-[#FF5A00] border border-[#FF5A00]" : "text-neutral-500 hover:text-white"}`}
            >
              {kat}
            </button>
          ))}
        </div>
      </nav>

      {/* Vitrin */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {yukleniyor ? (
          <div className="text-center py-20">
            <div className="text-[#FF5A00] text-sm uppercase tracking-widest">Yükleniyor...</div>
          </div>
        ) : filtrelenmisUrunler.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-white/60 text-sm uppercase tracking-widest">Henüz ürün eklenmemiş</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtrelenmisUrunler.map((urun) => (
              <div key={urun.id} className="group bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#FF5A00]/50 transition-all duration-500">
                <div className="aspect-[4/5] overflow-hidden cursor-pointer" onClick={() => setLightbox({src: urun.resim, alt: urun.ad})}>
                  <img src={urun.resim} alt={urun.ad} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold uppercase mb-2">{urun.ad}</h3>
                  <p className="text-2xl font-black text-[#FF5A00] mb-6">{urun.fiyat.toLocaleString('tr-TR')} TL</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={(e) => { e.stopPropagation(); sepeteEkle(urun); }} className="bg-white text-black py-3 rounded-xl font-bold text-xs hover:bg-[#FF5A00] hover:text-white transition-all uppercase">EKLE</button>
                    <button onClick={() => window.open(`https://wa.me/905321234567?text=${encodeURIComponent(urun.ad)} hakkında bilgi alabilir miyim?`)} className="border border-[#25D366] text-[#25D366] py-3 rounded-xl font-bold text-xs hover:bg-[#25D366] hover:text-white transition-all uppercase">WHATSAPP</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <img src={lightbox.src} alt={lightbox.alt} className="max-h-[80vh] object-contain rounded-lg shadow-2xl" />
            <button className="absolute -top-12 right-0 text-white text-5xl font-light hover:text-[#FF5A00]">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}