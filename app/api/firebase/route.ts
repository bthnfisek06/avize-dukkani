import { NextRequest, NextResponse } from "next/server";

// Firebase Admin SDK kullanmak yerine, client-side'dan gelen istekleri kabul ediyoruz
// Not: Production'da Firebase Admin SDK kullanılmalı

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ad, fiyat, kategori, resimler, renk, duyTipi } = body;

    if (!ad || !fiyat || !kategori || !resimler || !Array.isArray(resimler)) {
      return NextResponse.json(
        { error: "Eksik veya geçersiz veri" },
        { status: 400 }
      );
    }

    // Firebase'e veri göndermek için client-side'da yapılacak
    // Bu API route sadece validasyon için kullanılabilir
    // Gerçek Firebase işlemi client-side'da yapılmalı

    return NextResponse.json({
      success: true,
      message: "Veri doğrulandı. Firebase'e yükleme client-side'da yapılacak.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
