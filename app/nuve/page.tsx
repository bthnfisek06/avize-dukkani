"use client";
import React from "react";

export default function NuvePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-[#FF5A00]">N U V E</h1>
        <div className="space-y-4">
          <a
            href="/nuve/admin"
            className="block w-full py-3 bg-[#FF5A00] text-white font-bold uppercase tracking-widest rounded-lg hover:bg-orange-600 transition"
          >
            Admin Paneline Git
          </a>
          <a
            href="/"
            className="block w-full py-3 border border-[#FF5A00]/50 text-[#FF5A00] font-bold uppercase tracking-widest rounded-lg hover:bg-[#FF5A00] hover:text-black transition"
          >
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}
