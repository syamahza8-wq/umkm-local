# 🍢 GINSUL SNACK - Panduan Setup

## 📁 Struktur File
```
UMKM-ginsul/
├── index.html          ← Halaman utama
├── style.css           ← Tampilan/desain
├── app.js              ← Logic JavaScript
├── image.png           ← Logo UMKM kamu (sudah ada)
├── music/
│   └── bgmusic.mp3     ← File musik background (tambahkan sendiri)
└── README.md           ← Panduan ini
```

---

## 🔥 Setup Firebase (WAJIB)

### Langkah 1 – Buat Project Firebase
1. Buka [console.firebase.google.com](https://console.firebase.google.com)
2. Klik **"Add project"** → isi nama (contoh: `umkm-ginsul`) → Continue
3. Nonaktifkan Google Analytics (opsional) → **Create Project**

### Langkah 2 – Aktifkan Realtime Database
1. Di sidebar kiri → **Build** → **Realtime Database**
2. Klik **"Create Database"**
3. Pilih lokasi terdekat (misal: `asia-southeast1`)
4. Pilih **"Start in test mode"** → Enable
5. Salin URL database (contoh: `https://umkm-ginsul-default-rtdb.asia-southeast1.firebasedatabase.app`)

### Langkah 3 – Daftar Web App
1. Di Project Overview → klik ikon **`</>`** (Web)
2. Isi App nickname: `GINSUL SNACK Web`
3. Klik **Register App**
4. **Salin seluruh `firebaseConfig`**

### Langkah 4 – Update index.html
Buka `index.html`, cari bagian ini (sekitar baris 170-180):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "umkm-ginsul.firebaseapp.com",
  databaseURL: "https://umkm-ginsul-default-rtdb.firebaseio.com",
  projectId: "umkm-ginsul",
  storageBucket: "umkm-ginsul.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:xxxxxxxxxxxxxxxxxxxxxxxx"
};
```

**Ganti dengan config dari Firebase kamu.**

### Langkah 5 – Rules Database (Untuk Produksi)
Di Firebase Console → Realtime Database → Rules, ganti dengan:
```json
{
  "rules": {
    "pesanan": {
      ".read": true,
      ".write": true
    }
  }
}
```

---

## 🎵 Tambah Musik Background
1. Download lagu `.mp3` dari situs royalty-free
2. Rename jadi `bgmusic.mp3`
3. Taruh di folder `music/bgmusic.mp3`
4. Musik akan aktif saat tombol 🎵 diklik

---

## 🚀 Cara Menjalankan
1. Pastikan Laragon aktif
2. Buka browser → `http://localhost/UMKM-ginsul`
3. Website siap digunakan!

---

## 💡 Fitur Website
- ✅ Tampilan modern, dark theme orange/yellow
- ✅ Animasi floating & partikel
- ✅ 5 menu jajanan @ Rp 1.000
- ✅ Form pemesanan dengan qty counter
- ✅ Promo: beli 10 gratis 1
- ✅ Riwayat pesanan real-time (Firebase)
- ✅ Cari pesanan berdasarkan nama
- ✅ Hapus pesanan satu per satu / semua
- ✅ Pemutar musik background
- ✅ Notifikasi toast
- ✅ Konfetti saat pesan berhasil
- ✅ Responsive (HP & Desktop)
- ✅ Logo dari image.png
