"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const router = useRouter();

  const girisYap = () => {
    if (!email.trim() || !sifre.trim()) {
      alert("Lütfen email ve şifre girin.");
      return;
    }

    const kullanici = {
      id: Date.now().toString(),
      email: email.trim(),
      adSoyad: email.split("@")[0],
    };

    localStorage.setItem("nuve_current_user", JSON.stringify(kullanici));
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-2 text-[#FF5A00]">
          N U V E
        </h1>
        <p className="text-center text-white/60 text-sm mb-8">Giriş Yap</p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-lg text-white placeholder:text-white/40 focus:border-[#FF5A00] outline-none"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-lg text-white placeholder:text-white/40 focus:border-[#FF5A00] outline-none"
          />
          <button
            onClick={girisYap}
            className="w-full py-3 bg-[#FF5A00] text-white font-bold uppercase tracking-widest rounded-lg hover:bg-orange-600 transition"
          >
            Giriş Yap
          </button>
        </div>

        <div className="mt-6 text-center">
          <a href="/signup" className="text-[#FF5A00] text-sm hover:underline">
            Hesabın yok mu? Üye Ol
          </a>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-white/60 text-sm hover:text-white transition">
            ← Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}
