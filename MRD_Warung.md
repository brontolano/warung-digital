# MRD — Market Requirements Document
## Platform WarungDigital — Keuangan & Stok Warung (Merged dengan Den Ana - Brontolano Retail)

**Versi:** 2.0  
**Status:** Draf  
**Audiens:** Tim Marketing, Product Manager, Stakeholder  
**Tanggal:** 14 Juli 2026

---

## DAFTAR ISI

1. Ringkasan Eksekutif
2. Gambaran Pasar (Market Overview)
3. Segmen Target
4. Persona Pengguna
5. User Journey (As-Is vs To-Be)
6. Analisis Kompetitif
7. Kebutuhan Pasar (Market Requirements)
8. Strategi Pricing
9. Go-to-Market Strategy
10. Validasi Pasar

---

## 1. RINGKASAN EKSEKUTIF

WarungDigital hadir dengan **dua tier** untuk melayani **dua segmen pasar** yang berbeda:

| Tier | Target | Teknologi | Pricing |
|------|--------|-----------|---------|
| **Tier 1: Lite** | Warung mikro (±60 juta UMKM) | GAS + Sheets — **gratis** | Free |
| **Tier 2: Pro (Den Ana)** | Retail menengah (±500.000 toko) | React + Node.js + PostgreSQL | Rp 250rb-500rb/bln |

**Ukuran Pasar Gabungan:**
- Total UMKM Indonesia: **64,2 juta** (Kemenkop UKM, 2023)
- Sektor perdagangan: **±12 juta** (Tier 1)
- Retail menengah dengan omset >Rp 50jt/bln: **±500.000** (Tier 2)
- Penetrasi smartphone: **>80%**
- Pengguna WhatsApp: **>90%**
- Pasar aplikasi POS Indonesia: **$500 juta+** (2025)

---

## 2. GAMBARAN PASAR (MARKET OVERVIEW)

### 2.1 Tren Pasar

| Tren | Dampak ke Platform Gabungan |
|------|-----------------------------|
| Digitalisasi UMKM digenjot pemerintah | Peluang adopsi massal Tier 1 |
| QRIS standar pembayaran nasional | Fitur wajib semua tier |
| WhatsApp kanal bisnis utama | WA integration = kunci akuisisi |
| Kesadaran pemisahan keuangan meningkat | Kebutuhan pencatatan otomatis |
| Generasi muda kelola keluarga | Lebih tech-savvy, upgrade ke Tier 2 |
| Omnichannel retail meningkat | Landing page + POS terintegrasi |
| Automasi workflow (n8n trend) | Diferensiasi Tier 2 dari kompetitor |

### 2.2 Tantangan Pasar & Solusi

| Tantangan | Solusi Tier 1 (Lite) | Solusi Tier 2 (Den Ana) |
|-----------|---------------------|------------------------|
| Literasi digital rendah | UI sangat sederhana, teks besar | Onboarding training, live chat |
| Budget terbatas | Gratis (GAS + Sheets) | Subscription affordable |
| Koneksi internet tidak stabil | Cache, ukuran halaman kecil | PWA offline mode |
| Kebiasaan manual (buku) | Reminder WA, challenge komunitas | POS fokus, tiering otomatis |
| Proses order manual lambat | - | Scan barcode, checkout cepat |
| Notifikasi tidak real-time | WA CallMeBot | WAHA + n8n real-time |

---

## 3. SEGMEN TARGET

### 3.1 Segmen Primer — Tier 1 (Lite)

| Sub-segmen | Jumlah | Prioritas | Deskripsi |
|------------|--------|-----------|-----------|
| Warung Kelontong | 8 juta | **Tinggi** | Toko kecil di pemukiman |
| Kios Pasar | 2 juta | **Tinggi** | Kios pasar tradisional |
| Toko Sembako | 1,5 juta | Sedang | Toko bahan pokok skala sedang |
| Koperasi Unit Desa | 150.000 | Rendah | Koperasi simpan pinjam + toko |

### 3.2 Segmen Primer — Tier 2 (Den Ana Brontolano)

| Sub-segmen | Jumlah Potensial | Prioritas | Deskripsi |
|------------|-----------------|-----------|-----------|
| Toko Retail Menengah | 200.000 | **Tinggi** | Toko kelontong besar, omset Rp 50-500jt/bln |
| Minimarket Mandiri | 100.000 | **Tinggi** | Minimarket independen non-franchise |
| Distributor Kecil | 50.000 | Sedang | Gudang/distributor barang konsumsi |
| Agen Sembako | 50.000 | Sedang | Agen/tengkulak grosir |
| Boutique/Fashion Kecil | 40.000 | Rendah | Butik pakaian aksesoris |

### 3.3 Segmen Sekunder

| Segmen | Tier | Deskripsi |
|--------|------|-----------|
| Karyawan/Kasir | 1 & 2 | Input transaksi harian |
| Reseller/Agen | 2 | Pembeli grosir dengan tiering harga |
| Keluarga Pemilik | 1 & 2 | Membantu mengelola |
| Komunitas UMKM | 1 | Grup WA untuk edukasi bersama |

---

## 4. PERSONA PENGGUNA — GABUNGAN

### Persona 1: Bu Sari — Pemilik Warung Kelontong (Tier 1)

| Atribut | Detail |
|---------|--------|
| Usia | 42 tahun, SMA, pinggiran kota |
| HP | Android entry-level (RAM 3GB) |
| Pain Points | Catat manual, tidak pisah uang, stok sering habis |
| Goals | Tahu laba bersih, stok terkontrol, gratis |
| Tech Savviness | 2/5 — bisa WA, TikTok |

### Persona 2: Pak Budi — Pemilik Toko Retail Menengah (Tier 2)

| Atribut | Detail |
|---------|--------|
| Usia | 38 tahun, S1, kota |
| HP | Android mid-range (RAM 6GB+) |
| Pain Points | Proses order manual, stok & keuangan tidak sinkron, kesulitan tiering harga ke reseller, laporan bulanan repot |
| Goals | POS cepat, tiering harga otomatis, hutang/piutang rapi, laporan instan |
| Tech Savviness | 3/5 — paham aplikasi, Excel |

### Persona 3: Rina — Admin/Kasir Toko (Tier 2)

| Atribut | Detail |
|---------|--------|
| Usia | 24 tahun, SMK, pinggiran kota besar |
| HP | Android mid-range |
| Pain Points | Hitung manual, harga beda-beda per pelanggan |
| Goals | Scan barcode cepet, harga otomatis, shift gampang |
| Tech Savviness | 4/5 — paham aplikasi, cepat belajar |

### Persona 4: Andi — Agen Reseller (Tier 2 — Sisi Pembeli)

| Atribut | Detail |
|---------|--------|
| Usia | 29 tahun, S1, kota |
| Pain Points | Sulit lihat harga grosir, negosiasi manual |
| Goals | Lihat tier harga langsung di landing page, checkout otomatis |
| Tech Savviness | 4/5 — familiar dengan marketplace |

---

## 5. USER JOURNEY (AS-IS VS TO-BE) — GABUNGAN

### 5.1 Journey: Catat Penjualan Harian (Tier 1)

**As-Is:** Buka buku → catat manual → hitung pakai kalkulator → simpan (10 menit)
**To-Be:** Buka HP → Dashboard → Klik Tambah Transaksi → Scan barcode → Simpan (30 detik)

### 5.2 Journey: Order Grosir (Tier 2 — Reseller)

**As-Is:**
```
WA owner → Tanya harga → Owner cek manual → Balik WA → Reseller setuju
→ Catat manual → Transfer manual → Owner konfirmasi
→ Catat lagi di buku → Proses pengiriman (total 30-60 menit)
```

**To-Be dengan Den Ana Brontolano:**
```
Buka landing page → Login WA OTP → Lihat produk (Harga Tier otomatis)
→ Tambah ke keranjang → Checkout (Input alamat via Maps)
→ WA Notif otomatis ke admin via n8n → Proses kirim
→ Notif ke reseller: "Pesanan diproses" (total 5 menit)
```

### 5.3 Journey: Closing Shift Kasir (Tier 2)

**As-Is:**
```
Hitung uang manual → Cek bon → Catat selisih → Bikin laporan Excel → (40 menit)
```

**To-Be dengan Cashdrawer Module:**
```
Buka shift → Input saldo awal → Transaksi seharian otomatis
→ Tutup shift → Input saldo fisk → Hitung otomatis
→ Laporan shift siap → (5 menit)
```

### 5.4 Journey: Cek Stok (Semua Tier)

**As-Is:** Lihat rak → Catat kertas → Estimasi feeling → Kehabisan sering
**To-Be:** Buka Dashboard → Tab Stok → Filter stok menipis → Notif WA otomatis → Order supplier

---

## 6. ANALISIS KOMPETITIF — GABUNGAN

### 6.1 Matriks Perbandingan (Tier 1 Competition)

| Fitur | WarungDigital Lite | Moka | Pawoon | Majoo | Buku Manual |
|-------|-------------------|------|--------|-------|-------------|
| **Harga** | Gratis | Rp 250rb/bln | Rp 199rb/bln | Rp 299rb/bln | Gratis |
| Mobile-first | ✅ | ✅ | ✅ | ✅ | ✅ |
| Scan Barcode | ✅ (html5) | ✅ | ✅ | ✅ | ❌ |
| WA Notif | ✅ | ❌ | ❌ | ❌ | ❌ |
| Backup Drive | ✅ (auto) | ❌ | ❌ | ❌ | ❌ |
| Setup | 5 menit | 1-3 hari | 1-3 hari | 1-3 hari | 0 menit |
| **Upgrade path ke Tier 2** | **✅ Smooth** | ❌ | ❌ | ❌ | ❌ |

### 6.2 Matriks Perbandingan (Tier 2 Competition)

| Fitur | Den Ana (Tier 2) | Moka Pro | Pawoon Pro | Majoo Pro | Odoo POS |
|-------|-----------------|----------|------------|-----------|----------|
| **Harga/bln** | Rp 250-500rb | Rp 500rb-1jt | Rp 399-799rb | Rp 500rb-1,5jt | Gratis (self-host) |
| **PWA/TWA** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Tiering Harga (HET-T5)** | ✅ | ❌ | ❌ | ❌ | Modul tambahan |
| **n8n Workflow** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **WAHA WhatsApp** | ✅ Real-time | ❌ | ❌ | ❌ | ❌ |
| **Cashdrawer** | ✅ (shift) | ✅ | ✅ | ✅ | ✅ |
| **Hutang/Piutang** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Loyalty + Komisi** | ✅ | ✅ (add-on) | ⚠️ | ✅ (add-on) | Modul |
| **Absensi Staff** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Landing Page Customer** | ✅ Built-in | ❌ | ❌ | ❌ | ❌ |
| **Multi-tier pricing** | ✅ | ❌ | ❌ | ❌ | ❌ |

### 6.3 Competitive Advantage Gabungan

1. **Dual-tier Strategy**: Gratis untuk adopsi massal (Tier 1), berbayar untuk premium (Tier 2)
2. **WhatsApp-Native**: CallMeBot (Tier 1) → WAHA + n8n (Tier 2) — WA sebagai backbone
3. **Tiering Harga Otomatis**: Fitur unik untuk reseller/grosir yang tidak ada di POS standar
4. **PWA/TWA**: Landing page customer tanpa install apps
5. **n8n Workflow**: Otomasi notifikasi, laporan, dan integrasi — kustom sesuai kebutuhan
6. **Upgrade Path**: Warung kecil bisa start gratis, upgrade ke fitur lengkap tanpa migrasi data

---

## 7. KEBUTUHAN PASAR (MARKET REQUIREMENTS) — GABUNGAN

### 7.1 Kebutuhan Fungsional

| ID | Kebutuhan | Prioritas | Tier |
|----|-----------|-----------|------|
| M-01 | Gratis/tanpa biaya | P0 | 1 |
| M-02 | Bisa dipakai di HP murah | P0 | 1 |
| M-03 | Tidak perlu install aplikasi | P0 | 1 & 2 (PWA) |
| M-04 | Input transaksi <30 detik | P0 | 1 & 2 |
| M-05 | Stok real-time | P0 | 1 & 2 |
| M-06 | Laporan laba otomatis | P0 | 1 & 2 |
| M-07 | Notifikasi stok menipis | P1 | 1 & 2 |
| M-08 | Scan barcode kamera | P0 | 1 & 2 |
| M-09 | Tiering harga otomatis (HET-T5) | P0 | **2** |
| M-10 | Cashdrawer & shift management | P0 | **2** |
| M-11 | Hutang/piutang tracking | P0 | **2** |
| M-12 | Loyalty point & promo | P1 | **2** |
| M-13 | Absensi & shift karyawan | P1 | **2** |
| M-14 | Landing page customer (PWA) | P0 | **2** |
| M-15 | Webhook n8n integrasi | P1 | **2** |
| M-16 | Laporan komprehensif (MDR, pajak) | P1 | **2** |
| M-17 | Daftar via WA (tanpa email) | P1 | 1 & 2 |

### 7.2 Kebutuhan Non-Fungsional

| ID | Kebutuhan | Prioritas | Tier |
|----|-----------|-----------|------|
| N-01 | Page load <3 detik (3G) | P0 | 1 & 2 |
| N-02 | Tampilan nyaman layar 5" | P0 | 1 & 2 |
| N-03 | Bahasa Indonesia | P0 | 1 & 2 |
| N-04 | Ukuran huruf besar (min 16px) | P0 | 1 |
| N-05 | Tombol minimal 48x48px | P0 | 1 & 2 |
| N-06 | Uptime server 99.9% | P0 | **2** |
| N-07 | API response <200ms (p95) | P0 | **2** |
| N-08 | Webhook response <2 detik | P0 | **2** |
| N-09 | Database backup otomatis | P0 | 1 & 2 |
| N-10 | Mode offline (PWA cache) | P1 | **2** |

---

## 8. STRATEGI PRICING — GABUNGAN

### 8.1 Model Pricing

| Tier | Harga | Target |
|------|-------|--------|
| **Tier 1: Lite** | **Gratis** | Akuisisi massal, onboarding ke ekosistem |
| **Tier 2: Pro (Den Ana)** | **Rp 250.000 – 500.000/bln** per toko | Retail menengah fitur lengkap |
| **Tier 2: Enterprise** | **Rp 1.000.000 – 2.000.000/bln** | Multi-toko, franchise, API akses penuh |

### 8.2 Fitur per Tier

| Fitur | Lite (Gratis) | Pro (Rp 250-500rb) | Enterprise (Rp 1-2jt) |
|-------|:----------:|:-----------------:|:--------------------:|
| Transaksi harian | ✅ | ✅ | ✅ |
| Manajemen stok | ✅ | ✅ | ✅ |
| Pengeluaran | ✅ | ✅ | ✅ |
| Laporan dasar | ✅ | ✅ | ✅ |
| WA Notif (CallMeBot) | ✅ (terbatas) | ✅ (via WAHA) | ✅ (WAHA + backup) |
| Scan barcode | ✅ | ✅ | ✅ |
| QRIS statis | ✅ | ✅ | ✅ |
| **Tiering Harga (HET-T5)** | ❌ | ✅ | ✅ |
| **POS Kasir** | ❌ | ✅ | ✅ |
| **Cashdrawer Shift** | ❌ | ✅ | ✅ |
| **Hutang/Piutang** | ❌ | ✅ | ✅ |
| **Loyalty & Komisi** | ❌ | ✅ | ✅ |
| **Absensi Karyawan** | ❌ | ✅ | ✅ |
| **Landing Page PWA** | ❌ | ✅ | ✅ |
| **n8n Workflow** | ❌ | ✅ | ✅ |
| **Laporan Komprehensif** | ❌ | ✅ | ✅ |
| **Multi-toko** | ❌ | ❌ | ✅ |
| **API Full Access** | ❌ | ❌ | ✅ |
| **Priority Support** | ❌ | ✅ (WA) | ✅ (WA + Phone) |

### 8.3 Model Monetisasi Tambahan

| Metode | Detail | Tier |
|--------|--------|------|
| Setup & Training | Rp 500rb-2jt one-time | 2 |
| Marketplace Template | Komisi 10-20% | 1 & 2 |
| Affiliate Supplier | Komisi per order | 2 |
| Laporan Premium Tahunan | Cetak laporan audit-ready PDF | 1 & 2 |
| Layanan Migrasi Data | Import dari sistem lama | 2 |

---

## 9. GO-TO-MARKET STRATEGY — GABUNGAN

### 9.1 Channel Akuisisi per Tier

| Channel | Biaya | Tier 1 Efektivitas | Tier 2 Efektivitas |
|---------|-------|-------------------|-------------------|
| Grup WhatsApp UMKM | Gratis | **Sangat Tinggi** | **Tinggi** |
| Demo langsung pasar | Rp 200rb/hari | **Tinggi** | Rendah |
| Referral mulut ke mulut | Gratis | **Tinggi** | **Tinggi** |
| Instagram/TikTok edukasi | Gratis | **Tinggi** | Sedang |
| Google/SEO | Gratis | Sedang | **Tinggi** |
| Google Ads/FB Ads | Rp 2-10jt/bln | Rendah (murah) | **Tinggi** |
| Sales langsung (door-to-door) | Rp 5jt/bln | Rendah | **Tinggi** |

### 9.2 Program Akuisisi Awal

| Program | Tier | Detail |
|---------|------|--------|
| #30HariCatatWarung | 1 | Challenge catat transaksi, hadiah pulsa |
| 100 Warung Digital Pertama | 1 | Stiker + sertifikat |
| Beta Tester Diskon | 2 | 10 toko pertama: gratis 3 bulan + setup gratis |
| Referral Program | 1 & 2 | Referral dapat premium 1 bulan |

### 9.3 Upgrade Path: Lite → Pro

| Trigger | Action |
|---------|--------|
| Transaksi >100/bulan | Notif: "Kak, upgrade ke Pro biar makin mantap!" |
| Stok >200 variasi | Notif: "Stok mulai banyak, yuk upgrade!" |
| Karyawan >3 orang | Notif: "Tambah karyawan? Pro unlimited!" |
| Aktif >6 bulan | Email: "Diskon 50% bulan pertama Pro!" |

---

## 10. VALIDASI PASAR

### 10.1 Hipotesis yang Harus Divalidasi

1. **"Pemilik warung mau beralih dari manual ke digital jika gratis dan gampang"** (Tier 1)
2. **"Notifikasi WA adalah fitur yang paling membuat mereka balik lagi"** (Tier 1)
3. **"Tiering harga otomatis adalah fitur yang paling dicari reseller/grosir"** (Tier 2)
4. **"Integrasi webhook n8n + WAHA membedakan dari POS lain"** (Tier 2)
5. **"Pengguna Tier 1 yang sudah besar mau upgrade ke Tier 2"** (Cross-sell)

### 10.2 Metode Validasi Pra-Launch

| Metode | Target | Metrik |
|--------|--------|--------|
| Survey WA (100 responden) | Pemilik warung & toko | >60% tertarik |
| Wawancara 1-on-1 (15 orang) | 10 Tier 1 + 5 Tier 2 | 3 pain points terkonfirmasi |
| Landing page pre-launch Tier 2 | 50 pendaftar | Konversi >5% |
| Prototype test (10 orang) | 5 non-teknis, 5 admin toko | Setup <10 menit (Tier 1), <30 menit (Tier 2) |
| Beta test Tier 2 (10 toko) | Toko retail menengah | >80% retention minggu-1 |

### 10.3 Metrik Validation Post-Launch

| Metrik | Target Tier 1 | Target Tier 2 |
|--------|--------------|---------------|
| Signup-to-Active (catat transaksi pertama) | >60% (7 hari) | >80% (3 hari) |
| Week-1 Retention | >50% | >80% |
| Month-1 Retention | >30% | >60% |
| Fitur paling digunakan | Transaksi | POS + Laporan |

---

## LAMPIRAN

### A. Glossary

| Istilah | Definisi |
|---------|----------|
| **HET** | Harga Eceran Tertinggi |
| **T1-T5** | Tier harga grosir (semakin tinggi, semakin murah) |
| **n8n** | Workflow automation engine (open-source) |
| **WAHA** | WhatsApp HTTP API engine (open-source) |
| **PWA** | Progressive Web App |
| **POS** | Point of Sale |
| **MDR** | Merchant Discount Rate (biaya transaksi) |

### B. Referensi Pasar

1. Kemenkop UKM — Data UMKM Indonesia 2023
2. We Are Social — Digital Indonesia Report 2024
3. Google / Temasek — e-Conomy SEA Report 2024
4. Asosiasi Retail Indonesia — Data retail menengah 2024

---

*Dokumen ini disusun untuk panduan pengembangan platform WarungDigital (Tier 1 & Tier 2).*  
*MRD v2.0 — 14 Juli 2026*