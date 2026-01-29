# 🚀 NUVE AYDINLATMA - SUNUCU BAŞLATMA KILAVUZU

## ⚡ Hızlı Başlatma (En Kolay Yol)

1. **`BAŞLAT.bat`** dosyasına çift tıkla
2. Tarayıcıda `http://localhost:3000` adresini aç

---

## 📋 Manuel Başlatma

### Adım 1: Terminal/PowerShell Aç
- **Windows tuşu + R** bas
- `cmd` veya `powershell` yaz ve Enter

### Adım 2: Proje Klasörüne Git
```bash
cd C:\Users\bthnf\Desktop\Nuve\avize-dukkani
```

### Adım 3: Paketleri Yükle (İlk defa çalıştırıyorsan)
```bash
npm install
```

### Adım 4: Sunucuyu Başlat
```bash
npm run dev
```

### Adım 5: Tarayıcıda Aç
```
http://localhost:3000
```

---

## 🔧 Sorun Giderme

### ❌ "localhost bağlanmayı reddetti" hatası

**Çözüm 1:** Sunucu çalışıyor mu kontrol et
- Terminal'de şu mesajı görmelisin:
  ```
  ▲ Next.js 16.1.4
  - Local:        http://localhost:3000
  ```

**Çözüm 2:** Port 3000 kullanılıyorsa farklı port kullan
```bash
npm run dev -- -p 3001
```
Sonra `http://localhost:3001` adresini aç

**Çözüm 3:** Node.js yüklü mü kontrol et
```bash
node --version
```
Eğer hata veriyorsa: https://nodejs.org adresinden Node.js yükle

**Çözüm 4:** Paketleri yeniden yükle
```bash
npm install
npm run dev
```

---

## 📱 Sayfalar

- **Ana Sayfa:** http://localhost:3000
- **Ürünler:** http://localhost:3000/shop
- **Admin Panel:** http://localhost:3000/nuve/admin

---

## ⚠️ Önemli Notlar

1. Sunucu çalışırken terminal penceresini **KAPATMA**
2. Sunucuyu durdurmak için terminal'de **Ctrl+C** bas
3. Her değişiklikten sonra sayfayı yenile (F5)

---

## 🆘 Hala Çalışmıyorsa

Terminal'deki hata mesajını kopyala ve paylaş. Birlikte çözelim!
