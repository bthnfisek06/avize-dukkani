import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase mb-6" style={{ fontFamily: 'serif' }}>
          Hakkımızda
        </h1>
        <div className="h-[1px] w-24 bg-yellow-600 mb-8"></div>
        <p className="text-neutral-300 leading-relaxed">
          Nuve, ışığı yalnızca bir aydınlatma unsuru değil, mekânın ruhunu şekillendiren bir tasarım dili olarak görür.
          Seçkin malzemeler ve zamansız formlarla, yaşam alanlarınıza zarif bir atmosfer kazandırmayı hedefleriz.
          Her parça, ustalıkla işlenmiş detayları ve modern çizgileriyle, lüksün sade bir ifadesini sunar.
        </p>
        <p className="text-neutral-400 leading-relaxed mt-4">
          İlhamımızı mimariden, sanattan ve ışığın doğasından alırız. Nuve koleksiyonu, estetik ve işlevselliği
          dengede tutan tasarımlarıyla, evinizi sakin, şık ve sıcak bir deneyime dönüştürür.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
