"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { db } from "@/lib/firebase"; // Eğer ./ hata verirse @/ dene
import { collection, onSnapshot, query, orderBy, addDoc } from "firebase/firestore";
type Urun = {
  id?: string | number;
  ad: string;
  fiyat: number;
  kategori: string;
  resimler?: string[];
};

type NuveSession = {
  id: string;
  adSoyad?: string;
  email: string;
};

const SESSION_KEY = "nuve_current_user";
const CART_KEY = "nuve_cart";
const WHATSAPP_PHONE = "905365853695";

const fallbackShowcase = [
  "https://www.aydinlatmamekani.com/idea/dw/59/myassets/products/545/563-10.jpg?revision=1717070296",
  "https://ronisuaydinlatma.com/cdn/shop/files/description-image-13.webp?v=1717713898",
  "https://i.pinimg.com/736x/93/c1/96/93c1961776329009b0791e1b54f0e6ae.jpg",
  "https://cdn.qukasoft.com/f/381968/cG96WmFtNG0vcUp3ZUdGdkg4OG5hcmdQYmNFPQ/p/657dd8b9db50b-92554919-sw1000sh1000.webp",
  "https://images.unsplash.com/photo-1748891548782-88d927012816?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1754634266990-f86e4ee91ea0?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1761864294727-3c9f6b3e7425?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1676447328022-529943635c6f?auto=format&fit=crop&w=2000&q=90",
];

const HOMEPAGE_IMAGE_BLACKLIST = [
  "photo-1513506003901-1e6a229e2d15",
  "photo-1633117678842-5f3e65cf8ad1",
  "photo-1543781363-6b99f8922dfb",
];

function isBlacklistedHomepageImage(url: string) {
  const u = (url || "").toLowerCase();
  if (!u) return false;
  return HOMEPAGE_IMAGE_BLACKLIST.some((x) => u.includes(x.toLowerCase()));
}

function MarqueeRow({
  images,
  direction,
  onImageClick,
}: {
  images: string[];
  direction: "left" | "right";
  onImageClick?: (src: string) => void;
}) {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden">
      <div
        className={[
          "flex gap-4 w-max",
          direction === "left" ? "nuve-marquee-left" : "nuve-marquee-right",
        ].join(" ")}
      >
        {doubled.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="group relative h-44 md:h-52 w-[240px] md:w-[320px] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-[0_12px_40px_rgba(0,0,0,0.35)] cursor-zoom-in"
            role={onImageClick ? "button" : undefined}
            tabIndex={onImageClick ? 0 : undefined}
            aria-label={onImageClick ? "Görseli büyüt" : undefined}
            onClick={() => onImageClick?.(src)}
            onKeyDown={(e) => {
              if (!onImageClick) return;
              if (e.key === "Enter" || e.key === " ") onImageClick(src);
            }}
          >
            <img
              src={src}
              alt="Nuve koleksiyon"
              className="h-full w-full object-cover opacity-90 scale-[1.03]"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/800x600?text=Nuve";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute right-3 top-3 h-9 w-9 rounded-full border border-white/15 bg-black/40 backdrop-blur flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-3 py-1.5 rounded-full border border-white/15 bg-black/40 text-[10px] tracking-[0.3em] uppercase text-white/90">
                  İncele
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [kullanici, setKullanici] = useState<NuveSession | null>(null);
  const [sepetSayisi, setSepetSayisi] = useState(0);
  const [urunler, setUrunler] = useState<Urun[]>([]);
  const siparisVer = async (urun: any) => {
    const telefon = "905365853695"; // Buraya kendi numaranı yaz abi
    const mesaj = `Merhaba Nuve Aydınlatma, "${urun.ad}" ürünü için sipariş vermek istiyorum.`;
    
    try {
      // Bu kısım siparişi Firebase'e kaydeder
      await addDoc(collection(db, "siparisler"), {
        urunAdi: urun.ad,
        tarih: new Date().toISOString(),
        durum: "Yeni Bekliyor"
      });
      // Bu kısım WhatsApp'ı açar
      window.open(`https://wa.me/905365853695?text=${encodeURIComponent(mesaj)}`, '_blank');
    } catch (e) {
      // Hata olsa bile müşteriyi WhatsApp'a gönderelim
      window.open(`https://wa.me/905365853695?text=${encodeURIComponent(mesaj)}`, '_blank');
    }
  };
  useEffect(() => {
    const q = query(collection(db, "urunler"), orderBy("tarih", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const urunListesi: Urun[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Urun[];
      setUrunler(urunListesi);
    });
    return () => unsubscribe();
  }, []);
  const [lightbox, setLightbox] = useState<{ src: string; alt?: string } | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(false);
  const [firebaseYukleniyor, setFirebaseYukleniyor] = useState(true);

  const openLightbox = useCallback((src: string, alt?: string) => {
    setLightbox({ src, alt });
    setLightboxZoom(false);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setLightboxZoom(false);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      setKullanici(raw ? (JSON.parse(raw) as NuveSession) : null);
    } catch {
      setKullanici(null);
    }

    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setSepetSayisi(Array.isArray(parsed) ? parsed.length : 0);
    } catch {
      setSepetSayisi(0);
    }
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox, closeLightbox]);
  const showcaseImages = useMemo(() => {
    // Ürün varsa onları kullan, yoksa boş liste döndür
    const fromProducts = Array.isArray(urunler) ? urunler : [];
    
    // Ürünlerin içindeki resimleri topla
    const extractedImages = fromProducts
      .flatMap((u: any) => (Array.isArray(u.resimler) ? u.resimler : [u.resim]))
      .filter((x) => x && x !== "." && typeof x === "string")
      .map((x) => x.trim())
      .slice(0, 10);

    // Eğer ürün resmi varsa onları göster, yoksa yedek resimleri (fallback) göster
    return extractedImages.length > 0 ? extractedImages : fallbackShowcase;
  }, [urunler]);

  const cikisYap = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setKullanici(null);
    window.location.href = "/";
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <style jsx global>{`
        @keyframes nuveMarqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .nuve-marquee-left,
          .nuve-marquee-right {
            animation: none !important;
          }
        }
      `}</style>

      {/* ÜST BAR */}
      <div className="bg-black/60 border-b border-neutral-900">
        <div className="max-w-[1400px] mx-auto px-4 py-6 flex items-center justify-between gap-4">
          <div className="flex flex-col text-left">
            <div className="text-[34px] md:text-[36px] leading-none font-semibold tracking-[0.18em] uppercase text-[#FF5A00]">
              N U V E
            </div>
            <div className="mt-3 h-[1px] w-24 bg-[#FF5A00]" />
            <div className="mt-2 text-[10px] text-white/60 font-medium tracking-[0.35em] uppercase">
              Luxury Lighting
            </div>
          </div>

          <div className="flex items-center gap-3">
            {kullanici ? (
              <button
                type="button"
                onClick={cikisYap}
                className="h-10 px-4 rounded-full border border-[#FF5A00]/40 bg-black/30 text-[10px] font-bold uppercase tracking-widest text-[#FF5A00] hover:bg-[#FF5A00] hover:text-black transition-colors"
                title={kullanici.email}
              >
                Çıkış
              </button>
            ) : (
              <a
                href="/login"
                className="h-10 px-4 rounded-full border border-[#FF5A00]/40 bg-black/30 text-[10px] font-bold uppercase tracking-widest text-[#FF5A00] hover:bg-[#FF5A00] hover:text-black transition-colors inline-flex items-center"
              >
                Giriş
              </a>
            )}

            <a
              href="/cart"
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#FF5A00]/40 bg-black/30 hover:bg-[#FF5A00] transition-colors"
              aria-label="Alışveriş Sepeti"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#FF5A00]"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {sepetSayisi > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF5A00] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {sepetSayisi}
                </span>
              )}
            </a>

            <a
              href="/shop"
              className="h-10 px-5 rounded-full bg-[#FF5A00] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition inline-flex items-center"
            >
              Ürünler
            </a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="max-w-[1400px] mx-auto px-4 pt-14 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#FF5A00] text-[11px] font-bold tracking-[0.35em] uppercase">
              Modern • Lüks • Zamansız
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Doğru ışığı birlikte seçelim.
            </h2>
            <p className="mt-4 text-white/65 leading-relaxed max-w-xl">
              Nuve'de her ürünü özenle seçiyoruz; net bilgi, hızlı dönüş ve
              güvenli alışverişi önceliğimiz yapıyoruz. Aklınıza takılan bir şey
              olursa bize yazın—samimi şekilde yardımcı olalım.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900/30">
                <div className="text-white font-bold">Kalite</div>
                <div className="text-white/55 mt-1">Seçkin materyal, özenli işçilik</div>
              </div>
              <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900/30">
                <div className="text-white font-bold">Güven</div>
                <div className="text-white/55 mt-1">Şeffaf iletişim, hızlı destek</div>
              </div>
              <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900/30">
                <div className="text-white font-bold">Teslimat</div>
                <div className="text-white/55 mt-1">Özenli paketleme</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/privacy#gizlilik"
                className="px-6 py-3 border border-[#FF5A00]/50 text-[#FF5A00] text-[10px] font-bold uppercase tracking-widest rounded hover:bg-[#FF5A00] hover:text-black transition"
              >
                Güven &amp; Sözleşmeler
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  "Merhaba, ürünler hakkında bilgi almak istiyorum."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-[#FF5A00] text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-orange-600 transition inline-flex items-center"
              >
                WhatsApp'tan yaz
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <MarqueeRow
              images={showcaseImages}
              direction="left"
              onImageClick={(src) => openLightbox(src, "Nuve koleksiyon")}
            />
            <MarqueeRow
              images={[...showcaseImages].reverse()}
              direction="right"
              onImageClick={(src) => openLightbox(src, "Nuve koleksiyon")}
            />
          </div>
        </div>
      </section>

      {/* GÜVEN BÖLÜMÜ */}
      <section className="w-full bg-black border-y border-neutral-900 mt-2">
        <div className="max-w-[1400px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 bg-neutral-900 shadow-sm border border-neutral-800 rounded-full flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:border-orange-600 transition-all duration-300">
                <svg
                  className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-1">
                  Hızlı Teslimat
                </h4>
                <p className="text-[11px] text-white/60 leading-tight uppercase tracking-tight">
                  24 Saatte Kargoda <br />
                  <span className="font-semibold text-orange-600">Hızlı Gönderim</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 bg-neutral-900 shadow-sm border border-neutral-800 rounded-full flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:border-orange-600 transition-all duration-300">
                <svg
                  className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-1">
                  Güvenli Ödeme
                </h4>
                <p className="text-[11px] text-white/60 leading-tight uppercase tracking-tight">
                  256-Bit SSL Sertifikalı <br />
                  <span className="font-semibold text-orange-600">Güvenli Alışveriş</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 bg-neutral-900 shadow-sm border border-neutral-800 rounded-full flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:border-orange-600 transition-all duration-300">
                <svg
                  className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-1">
                  Kolay İade
                </h4>
                <p className="text-[11px] text-white/60 leading-tight uppercase tracking-tight">
                  14 Gün İçinde İade <br />
                  <span className="font-semibold text-orange-600">Koşulsuz İade Hakkı</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 bg-neutral-900 shadow-sm border border-neutral-800 rounded-full flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:border-orange-600 transition-all duration-300">
                <svg
                  className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 11m8 4V5M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-1">
                  Kırılma Garantisi
                </h4>
                <p className="text-[11px] text-white/60 leading-tight uppercase tracking-tight">
                  Özel Sigortalı Paket <br />
                  <span className="font-semibold text-orange-600">Yüzde Yüz Güvence</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GÜVEN ODAKLI BÖLÜM */}
      <section className="max-w-[1400px] mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
            <div className="text-[#FF5A00] text-[11px] font-bold tracking-[0.35em] uppercase">
              Güvenle alışveriş
            </div>
            <h3 className="mt-3 text-2xl md:text-[26px] font-semibold tracking-normal text-white">
              Bizim için önce güven.
            </h3>
            <p className="mt-4 text-white/65 leading-relaxed">
              Ürünleri "ekleyip geçmiyoruz". Fotoğraf/ölçü/uygunluk gibi sorularınız
              için hızlı dönüş sağlıyoruz. İsterseniz WhatsApp'tan yazın; size en
              doğru modeli birlikte seçelim.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full border border-neutral-800 bg-black/30 text-[10px] uppercase tracking-widest text-white/70">
                Şeffaf bilgi
              </span>
              <span className="px-3 py-1.5 rounded-full border border-neutral-800 bg-black/30 text-[10px] uppercase tracking-widest text-white/70">
                Hızlı destek
              </span>
              <span className="px-3 py-1.5 rounded-full border border-neutral-800 bg-black/30 text-[10px] uppercase tracking-widest text-white/70">
                Özenli paketleme
              </span>
              <span className="px-3 py-1.5 rounded-full border border-neutral-800 bg-black/30 text-[10px] uppercase tracking-widest text-white/70">
                Kolay iade
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Net bilgi, doğru yönlendirme",
                desc: "Ölçü, montaj ve ürün uyumu gibi konularda açık anlatım.",
              },
              {
                title: "Güvenli ödeme altyapısı",
                desc: "SSL koruması ve güvenli ödeme adımlarıyla için rahat olsun.",
              },
              {
                title: "Kırılma garantisi",
                desc: "Özenli paketleme + sigortalı gönderim seçenekleri.",
              },
              {
                title: "Kolay iade desteği",
                desc: "Sorun yaşarsanız hızlı çözüm ve süreç takibi.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/20 p-5 hover:border-orange-400/60 transition"
              >
                <div className="text-[11px] uppercase tracking-[0.35em] text-white/55">Nuve</div>
                <div className="mt-2 text-white font-bold">{c.title}</div>
                <div className="mt-2 text-white/60 text-sm leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black border-t border-neutral-900 mt-12 py-12 px-4">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight uppercase">NUVE</h2>
            <p className="text-white/55 text-sm">
              Işığın en saf halini tasarımla buluşturuyoruz. Lüks ve estetiğin adresi.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[#FF5A00] text-xs font-bold uppercase tracking-[0.25em]">Yasal</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="/privacy#gizlilik" className="hover:text-white transition-colors">
                  Gizlilik Sözleşmesi
                </a>
              </li>
              <li>
                <a href="/privacy#uyelik" className="hover:text-white transition-colors">
                  Üyelik Sözleşmesi
                </a>
              </li>
              <li>
                <a href="/privacy#kullanim" className="hover:text-white transition-colors">
                  Kullanım Koşulları
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[#FF5A00] text-xs font-bold uppercase tracking-[0.25em]">
              Hesabım
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="/signup" className="hover:text-white transition-colors">
                  Üye Ol
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-white transition-colors">
                  Giriş Yap
                </a>
              </li>
              <li>
                <a href="/orders" className="hover:text-white transition-colors">
                  Siparişlerim
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white transition-colors">
                  Alışveriş Sepetim
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[#FF5A00] text-xs font-bold uppercase tracking-[0.25em]">
              İletişim
            </h4>
            <p className="text-white/70 text-sm">📞 +90 (212) 555 00 00</p>
            <p className="text-white/70 text-sm">✉️ info@nuvelighting.com</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pt-6 border-t border-white/10 mt-6">
          <p className="text-[10px] text-white/55 tracking-[0.2em] uppercase mb-2">
            Güvenli Ödeme Altyapısı
          </p>
          <div className="rounded-xl border border-[#FF5A00]/25 bg-[#FF5A00]/15 px-6 py-4">
            <div className="flex items-center gap-6 grayscale opacity-60 hover:opacity-100 transition-all duration-500">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                className="h-3 md:h-4"
                loading="lazy"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                className="h-5 md:h-6"
                loading="lazy"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/39/Troy_logo.svg"
                alt="Troy"
                className="h-3 md:h-4"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 mt-10 border-t border-neutral-900 text-center">
          <p className="text-white/40 text-[10px] uppercase tracking-[0.3em]">
            © 2026 Nuve Lighting. Tüm Hakları Saklıdır.
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Görsel önizleme"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeLightbox}
            aria-label="Kapat"
          />
          <div className="relative w-full max-w-5xl">
            <div className="absolute -top-10 right-0 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLightboxZoom((z) => !z)}
                className="h-9 px-3 rounded-full border border-white/15 bg-black/40 text-[10px] uppercase tracking-widest text-white/90 hover:border-orange-400 transition"
              >
                {lightboxZoom ? "Uzaklaştır" : "Yakınlaştır"}
              </button>
              <button
                type="button"
                onClick={closeLightbox}
                className="h-9 w-9 rounded-full border border-white/15 bg-black/40 text-white/90 hover:border-orange-400 transition inline-flex items-center justify-center"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
              <div className="p-2 md:p-3">
                <div className="relative overflow-auto max-h-[80vh] rounded-xl bg-black">
                  <img
                    src={lightbox.src}
                    alt={lightbox.alt ?? "Görsel"}
                    className={[
                      "block mx-auto select-none",
                      lightboxZoom ? "cursor-zoom-out" : "cursor-zoom-in",
                    ].join(" ")}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      transformOrigin: "center",
                      transform: lightboxZoom ? "scale(1.8)" : "scale(1)",
                      transition: "transform 180ms ease",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxZoom((z) => !z);
                    }}
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/1200x900?text=Nuve";
                    }}
                  />
                </div>
                <div className="mt-3 text-center text-[10px] tracking-[0.35em] uppercase text-white/55">
                  Tıkla: yakınlaştır / uzaklaştır • ESC: kapat
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Floating */}
      <button
        type="button"
        onClick={() =>
          window.open(
            `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
              "Merhaba, bilgi almak istiyorum."
            )}`
          )
        }
        className="fixed bottom-[30px] right-[30px] z-[150] flex items-center gap-3 group"
        aria-label="WhatsApp ile iletişime geç"
      >
        <span className="bg-neutral-900/95 px-4 py-2 rounded-full border border-[#FF5A00]/25 shadow-[0_10px_40px_rgba(0,0,0,0.55)] text-[13px] font-semibold text-white/90 opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          Size nasıl yardımcı olabiliriz?
        </span>
        <span className="bg-[#FF5A00] p-4 rounded-full shadow-2xl group-hover:scale-110 transition">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.204l-.665 2.41 2.487-.654c.91.564 1.812.926 2.92.926 3.181 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.767-5.766zm3.393 8.232c-.145.409-.844.754-1.164.793-.32.04-.64.062-1.031-.062-.252-.08-.553-.186-.92-.345-1.56-.672-2.569-2.245-2.646-2.348-.077-.103-.622-.826-.622-1.575 0-.749.385-1.118.536-1.272.152-.153.334-.191.444-.191l.319.005c.101.002.238-.038.373.289.135.327.462 1.127.502 1.209.041.082.068.177.013.286-.054.109-.081.177-.163.272-.082.096-.172.214-.245.286-.082.082-.167.171-.072.335.096.163.424.7.912 1.134.629.56 1.157.734 1.321.815.163.081.259.068.354-.041.096-.109.409-.477.518-.641.109-.163.218-.136.368-.082.15.054.954.45 1.118.532.164.082.272.123.313.191.04.068.04.396-.105.805z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
