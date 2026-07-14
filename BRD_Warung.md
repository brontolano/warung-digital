# BRD — Business Requirements Document
## Platform WarungDigital — Keuangan & Stok Warung (Merged dengan Den Ana - Brontolano Retail)

**Versi:** 2.0  
**Status:** Draf  
**Audiens:** Stakeholder Bisnis, Investor, Product Owner  
**Tanggal:** 14 Juli 2026

---

## DAFTAR ISI

1. Ringkasan Eksekutif
2. Latar Belakang & Problem Statement
3. Visi, Misi & Tujuan Bisnis
4. Lingkup Proyek (In-Scope / Out-of-Scope)
5. Stakeholder & Peran
6. Model Bisnis & Revenue Streams
7. Aturan Bisnis (Business Rules)
8. Metrik Kesuksesan (KPI)
9. Analisis Risiko & Mitigasi
10. Asumsi & Dependensi
11. Timeline & Milestone

---

## 1. RINGKASAN EKSEKUTIF

**WarungDigital** adalah platform **dual-tier** berbasis web yang dirancang untuk membantu bisnis retail menengah hingga warung kecil di Indonesia dalam mengelola:

### Tier 1: Basic (Gratis) — "WarungDigital Lite"
- **Target**: Warung kelontong, koperasi kecil, pedagang pasar
- **Teknologi**: Google Apps Script + Google Sheets (100% gratis)
- **Fitur**: Keuangan harian, stok barang, laporan dasar, notifikasi WA via CallMeBot

### Tier 2: Pro (Berbayar) — "Den Ana Brontolano Retail"
- **Target**: Toko retail menengah, minimarket, franchise kecil
- **Teknologi**: React/Vite PWA + Node.js/NestJS + PostgreSQL + Redis
- **Fitur**: Tiering harga dinamis (HET/T1-T5), POS Kasir, Cashdrawer, Hutang/Piutang, Loyalty, Absensi, Marketing, Integrasi n8n + WAHA

**Visi Gabungan:** Menjadi platform retail digital #1 di Indonesia yang fleksibel untuk skala apapun — dari warung hingga toko menengah.

**Target Tahun Pertama (Gabungan):**
- 5.000 warung terdaftar (Tier 1)
- 200 toko retail menengah (Tier 2)
- 1.000 MAU gabungan
- Retensi >70%
- Conversion rate landing page ke checkout >15%

---

## 2. LATAR BELAKANG & PROBLEM STATEMENT

### 2.1 Kondisi Saat Ini

**Segmen Warung Kecil (Tier 1):**
- **60%+** pemilik warung tidak memisahkan uang pribadi dan usaha
- **75%** tidak mengetahui laba bersih bulanan
- **80%** menggunakan catatan manual (buku/kertas) yang mudah hilang
- Stok opname hanya 1-2 bulan sekali, sering kehabisan barang laris

**Segmen Retail Menengah (Tier 2):**
- Proses pemesanan manual lambat, tidak sinkron antara etalase digital dan gudang
- Kurangnya tiering harga otomatis (HET hingga T5) pada POS standar
- Notifikasi admin tidak real-time (WhatsApp terpisah dari sistem)
- Pencatatan hutang/piutang, cashdrawer, dan shift karyawan masih manual
- Laporan keuangan komprehensif (MDR, pajak, arus kas) sulit digenerate

### 2.2 Solusi yang Ada (Gap Analysis)

| Solusi | Kelebihan | Kekurangan |
|--------|-----------|------------|
| Moka / Pawoon / Majoo | Fitur lengkap, POS fisik | Mahal (Rp 200rb+/bln), ribet untuk warung kecil |
| Buku tulis manual | Gratis, familiar | Mudah rusak/hilang, tidak ada analitik |
| Spreadsheet (Excel) | Gratis, bisa dihitung | Butuh laptop, rumit untuk non-teknis |
| **WarungDigital Tier 1** | **Gratis, mobile-friendly, WA notif, mudah** | **Fitur terbatas, butuh koneksi internet** |
| **WarungDigital Tier 2 (Den Ana)** | **Tiering harga, n8n+WAHA, PWA, POS lengkap** | **Butuh infra cloud, biaya berlangganan** |

### 2.3 Opportunity

- **60+ juta** UMKM di Indonesia (12 juta sektor perdagangan)
- Penetrasi smartphone >80%, WhatsApp >90%
- Generasi muda mengelola warung/keluarga — tech-savvy
- Digitalisasi UMKM didorong pemerintah
- QRIS standar pembayaran nasional

---

## 3. VISI, MISI & TUJUAN BISNIS

### Visi
Menjadi platform retail digital #1 di Indonesia yang **fleksibel untuk semua skala** — dari warung hingga toko menengah — dengan teknologi yang tepat guna.

### Misi
1. **Tier 1**: Mendigitalisasi pencatatan keuangan warung tanpa biaya
2. **Tier 2**: Otomatisasi operasional retail menengah end-to-end
3. Memberikan laporan keuangan yang mudah dipahami semua level
4. Menjadi pintu masuk ekosistem keuangan digital UMKM (Tier 1 → upgrade ke Tier 2)

### Tujuan Bisnis (SMART) — Gabungan

| Tujuan | Target | Waktu |
|--------|--------|-------|
| Jumlah warung terdaftar (Tier 1) | 5.000 | Tahun-1 |
| Jumlah toko retail terdaftar (Tier 2) | 200 | Tahun-1 |
| MAU gabungan | 1.000+ | Tahun-1 |
| Retensi bulanan | >70% | Tahun-1 |
| Transaksi tercatat per bulan | 50.000+ | Tahun-1 |
| Conversion rate landing → checkout (Tier 2) | >15% | Tahun-1 |
| Rating pengguna | >4.0/5 | Tahun-1 |
| Uptime server (Tier 2) | 99.9% | Tahun-1 |

---

## 4. LINGKUP PROYEK

### 4.1 In-Scope (MVP) — Tier 1: WarungDigital Lite (GAS + Sheets)

- **Autentikasi**: Login email/password, WhatsApp OTP
- **Dashboard**: Ringkasan penjualan hari ini, pengeluaran, laba
- **Kasir/Transaksi**: Catat penjualan per item (scan barcode / manual), total otomatis
- **Manajemen Stok**: CRUD barang, stok minimum alert, multiple satuan
- **Pengeluaran**: Kategori (Modal, Operasional, Gaji, Lain-lain)
- **Laporan**: Laba/rugi harian, grafik 7/30 hari, export Excel
- **Notifikasi**: Stok menipis via WhatsApp (CallMeBot)
- **QRIS**: Generate QR code statis

### 4.2 In-Scope (MVP) — Tier 2: Den Ana Brontolano Retail (React + Node.js + PostgreSQL)

- **Landing Page (Customer PWA/TWA)**:
  - Tiering harga dinamis (HET, T1, T2, T3, T4, T5 berdasarkan qty)
  - Live chat dengan auto-reply template
  - Login WhatsApp + OTP
  - Tracking alur order + Profil detail + Google Maps
  - Keranjang & Checkout COD

- **Admin Panel**:
  - Manajemen Barang/Jasa (Stok, kategori, tipe harga grosir/retail)
  - **POS Kasir** dengan scan barcode kamera
  - **Cashdrawer** (Petty cash & shift kasir)
  - **Manajemen Hutang/Piutang** & Stok Opname
  - **Modul Marketing** (Loyalty point, komisi staff, promosi)
  - **Laporan Komprehensif** (Laba rugi, arus kas, MDR, pajak, dll)
  - **Absensi & Shift karyawan**

- **Integrasi Backend**:
  - n8n workflow engine untuk otomatisasi
  - WAHA (WhatsApp HTTP API) untuk notifikasi real-time
  - Webhook untuk sinkronisasi real-time

### 4.3 Out-of-Scope (MVP)

- Aplikasi mobile native (React Native / Flutter)
- Integrasi marketplace (Tokopedia, Shopee)
- AI prediksi permintaan
- Multi-toko / franchise management (Tier 2 roadmap)
- Sistem akuntansi double-entry penuh (Tier 2 v2)
- Payment gateway pihak ketiga (Fokus COD + QRIS)
- Fitur offline mode penuh PWA (Tier 2 v2)

---

## 5. STAKEHOLDER & PERAN

| Stakeholder | Peran | Ekspektasi |
|-------------|-------|------------|
| **Pemilik Warung (Tier 1)** | Pengguna utama | Mudah, cepat, gratis, tidak perlu belajar |
| **Karyawan Warung (Tier 1)** | Pengguna sekunder | Input transaksi cepat, scan barcode |
| **Retail Admin (Tier 2)** | Pengguna utama | Kelola inventaris, proses pesanan, monitor cashdrawer, laporan otomatis |
| **Kasir (Tier 2)** | Pengguna sekunder | POS cepat, scan barcode, shift management |
| **Lead Frontend Developer** | Pimpinan FE | UI/UX PWA responsif, performa tinggi |
| **Backend Architect** | Arsitek sistem | API skalabel, tiering harga, integrasi n8n |
| **Investor / Owner Produk** | Penyandang dana | Pertumbuhan user, retensi, monetisasi |
| **Developer** | Pembangun sistem | Dokumentasi jelas, fitur modular |
| **Supplier (masa depan)** | Partner ekosistem | Data stok untuk auto-restock |

---

## 6. MODEL BISNIS & REVENUE STREAMS

### 6.1 Model Bisnis — Dual Tier Freemium

| Tier | Model | Target |
|------|-------|--------|
| **Tier 1: Lite** | Gratis (Free forever) | Warung mikro, onboarding ke ekosistem |
| **Tier 2: Pro** | Subscription berbayar | Retail menengah, fitur lengkap |

### 6.2 Revenue Streams

| Stream | Deskripsi | Target Harga |
|--------|-----------|--------------|
| **Tier 2 Subscription** | Full features: POS, Cashdrawer, Hutang/Piutang, Loyalty, Absensi, n8n+WAHA | Rp 250.000 – 500.000/bln per toko |
| **Tier 1 Premium Add-on** | Laporan PDF, backup cepat, prioritas support (opsional) | Rp 15.000 – 25.000/bln |
| **Marketplace Konten** | Template stok, skin dashboard, modul marketing | Komisi 10-20% |
| **Affiliate / Referral** | Komisi dari supplier/rekanan | Per transaksi |
| **Setup & Training Fee** | Onboarding Tier 2, migrasi data, training staff | Rp 500.000 – 2.000.000 one-time |

### 6.3 Struktur Biaya (Cost Structure) — Gabungan

| Komponen | Biaya Tier 1 | Biaya Tier 2 | Keterangan |
|----------|--------------|--------------|------------|
| **Infrastruktur** | GRATIS (GAS + Sheets) | $150/bln (Cloud, DB, Redis) | AWS/DigitalOcean |
| **Domain & Branding** | Rp 150.000/thn | Rp 500.000/thn | Domain, SSL, branding |
| **WhatsApp Gateway** | Rp 0 (CallMeBot) | Rp 1.000.000/bln | WAHA self-hosted / cloud |
| **Marketing** | Rp 500rb/bln | Rp 5.000.000/bln | WA blast, ads, event |
| **Tim Developer** | Internal/Freelance | 1 PM, 1 Lead FE, 1 BE, 1 UI/UX, 1 QA | Full-time untuk Tier 2 |

---

## 7. ATURAN BISNIS (BUSINESS RULES)

### 7.1 Aturan Keuangan (Gabungan)

1. **Laba = Total Penjualan - HPP - Pengeluaran**
2. HPP dihitung otomatis dari rata-rata harga beli (moving average)
3. Setiap transaksi wajib: timestamp, user_id, metode bayar
4. Stok tidak boleh negatif (peringatan jika > stok tersedia)
5. Pengeluaran wajib dikategorikan (Modal, Operasional, Gaji, Lain-lain)
6. **Tier 2**: Cashdrawer wajib tutup shift (saldo awal + masuk - keluar = saldo akhir)

### 7.2 Aturan Stok

1. Setiap barang: stok minimum → trigger notifikasi WA
2. Multiple satuan (pcs, pack, dus, kg, liter) dengan konversi
3. Harga jual fleksibel per transaksi
4. Riwayat perubahan harga & stok dicatat (audit trail)
5. **Tier 2**: Stok opname periodik wajib catat selisih

### 7.3 Aturan Tiering Harga (Tier 2 — Den Ana Feature)

| Tier Harga | Keterangan | Prioritas |
|------------|------------|-----------|
| **HET** | Harga Eceran Tertinggi (qty 1) | Default customer |
| **T1** | Tier 1 grosir (qty minimal X) | Reseller kecil |
| **T2** | Tier 2 grosir (qty minimal Y) | Reseller menengah |
| **T3** | Tier 3 grosir (qty minimal Z) | Agen/distributor |
| **T4** | Tier 4 grosir (qty besar) | Corporate/B2B |
| **T5** | Tier 5 grosir (qty paling besar) | Key account |

> **Rule**: Sistem otomatis memilih harga terendah yang memenuhi qty minimum pembeli.

### 7.4 Aturan Cashdrawer (Tier 2)

1. Shift kasir: Buka shift → input saldo awal → transaksi → Tutup shift → input saldo akhir
2. Selisih > toleransi (Rp 5.000) wajib catatan alasan
3. Petty cash tracking terpisah dari penjualan

### 7.5 Aturan Hutang/Piutang (Tier 2)

1. Hutang: Catat vendor, jatuh tempo, status (lunas/belum)
2. Piutang: Catat customer, jatuh tempo, tagihan otomatis via WA
3. Laporan aging hutang/piutang bulanan

### 7.6 Aturan Loyalty & Marketing (Tier 2)

1. Point: 1 point per Rp 1.000 belanja (konfigurabel)
2. Redeem: Minimal 100 point = Rp 1.000 (konfigurabel)
3. Komisi staff: % dari transaksi yang dilayani
4. Promo: Diskon %/nominal, berlaku tanggal/kuota

### 7.7 Aturan Akses (Gabungan)

| Aturan | Tier 1 | Tier 2 |
|--------|--------|--------|
| Akun per toko | 1 | 1 |
| Max karyawan gratis | 3 | Unlimited |
| Role karyawan | Input transaksi only | Kasir, Admin, Gudang, Owner |
| Owner access | Semua | Semua + Konfigurasi sistem |
| Reset password | WA OTP | WA OTP + Email |

---

## 8. METRIK KESUKSESAN (KPI) — GABUNGAN

### 8.1 Business Metrics

| Metrik | Target Y1 (Tier 1) | Target Y1 (Tier 2) | Cara Ukur |
|--------|-------------------|-------------------|-----------|
| **Pendaftaran (Signups)** | 5.000 | 200 | Database |
| **MAU** | 1.000 | 200 | Login <30 hari |
| **Retensi bulanan** | >70% | >85% | Subscription renewal |
| **Transaksi/user/hari** | >3 | >20 | Rata-rata harian |
| **Churn rate** | <30%/bln | <15%/bln | No login >60 hari |
| **NPS** | >40 | >50 | Survey in-app |
| **Conversion landing→checkout** | - | >15% | Analytics |
| **Avg order value (Tier 2)** | - | >Rp 150.000 | Analytics |

### 8.2 Engagement Metrics

| Metrik | Target Tier 1 | Target Tier 2 |
|--------|---------------|---------------|
| **DAU/MAU** | >35% | >50% |
| **Rata-rata sesi** | >10 menit | >15 menit |
| **Fitur paling digunakan** | Transaksi 60%, Stok 20%, Laporan 15% | POS 40%, Laporan 25%, Stok 15%, Marketing 10% |
| **Adopsi scan barcode** | >30% | >80% |
| **Tiering harga usage** | - | >60% transaksi |

### 8.3 Technical Metrics (Tier 2)

| Metrik | Target |
|--------|--------|
| **Uptime server** | 99.9% |
| **Webhook response** | <2 detik |
| **API response (p95)** | <200ms |
| **Page load (PWA)** | <3 detik (3G) |

---

## 9. ANALISIS RISIKO & MITIGASI — GABUNGAN

| Risiko | Dampak | Probabilitas | Mitigasi |
|--------|--------|-------------|----------|
| **Kuota Google Sheets habis (Tier 1)** | Sistem berhenti | Medium | Arsip data lama, kompresi, upgrade path ke Tier 2 |
| **Pengguna non-teknis bingung** | Churn tinggi | Tinggi | UI super sederhana, panduan video WA, onboarding 3 langkah |
| **Koneksi internet lemah** | Tidak bisa akses | Tinggi | Mode offline (localStorage), cache data, PWA |
| **CallMeBot berhenti gratis** | WA notif mati | Medium | Upgrade path ke Tier 2 (WAHA), atau Telegram |
| **WAHA/n8n down (Tier 2)** | Notifikasi & workflow mati | Low | Redundansi webhook, fallback ke polling |
| **Competitor versi gratis** | Kehilangan pasar Tier 1 | Medium | Fokus UX & komunitas; upsell path ke Tier 2 yang diferensiasi |
| **Inkonsistensi stok trafik tinggi** | Data corrupt | Medium (Tier 2) | Database locking (PostgreSQL advisory lock) |
| **Pemblokiran nomor WA Meta** | Notifikasi mati | Medium | Template resmi, delay pengiriman, multi-number rotation |
| **Data hilang** | Kepercayaan hilang | Rendah | Backup harian otomatis (Tier 1: Drive; Tier 2: PG dump + S3) |

---

## 10. ASUMSI & DEPENDENSI — GABUNGAN

1. **Google tidak mengubah kebijakan** — Apps Script dan Google Sheets tetap gratis (Tier 1)
2. **Smartphone Android** — mayoritas pengguna HP Android (min. Android 8)
3. **WhatsApp** — pengguna aktif menggunakan WhatsApp
4. **Literasi digital dasar** — bisa baca-tulis, buka browser
5. **Token CallMeBot stabil** — layanan WA gratis tidak berubah drastis (Tier 1)
6. **WAHA self-hosted stabil** — butuh server terpisah atau cloud (Tier 2)
7. **n8n cloud/self-hosted** — workflow engine tersedia (Tier 2)
8. **PostgreSQL + Redis** — managed service tersedia (Tier 2)
9. **PWA browser support** — Chrome Android, Safari iOS 15+ (Tier 2)

---

## 11. TIMELINE & MILESTONE — GABUNGAN

### Fase 1: MVP Tier 1 (Minggu 1-4) — Parallel dengan Tier 2 Foundation
- **M1**: Setup GAS project, struktur Google Sheets, arsitektur Tier 1
- **M2**: Login, dashboard, transaksi Tier 1
- **M3**: Manajemen stok, pengeluaran Tier 1
- **M4**: Laporan, notifikasi WA (CallMeBot), testing Tier 1 → **Soft Launch Tier 1**

### Fase 2: Tier 2 Foundation & Tier 1 Improvement (Minggu 5-8)
- **M5**: Feedback Tier 1, bug fixes
- **M6**: Scan barcode (html5-qrcode) Tier 1; Setup React/Vite + Node.js + PostgreSQL Tier 2
- **M7**: Dashboard analitik Tier 1; Tiering harga (HET-T5), POS, Database schema Tier 2
- **M8**: Mode offline/cache Tier 1; Cashdrawer, CRUD barang, Auth Tier 2

### Fase 3: Tier 2 Core Features (Minggu 9-16)
- **M9**: Fitur premium Tier 1; Hutang/Piutang, Stok Opname Tier 2
- **M10**: Marketplace template Tier 1; Marketing (Loyalty, Komisi, Promo), Absensi Tier 2
- **M11**: Integrasi supplier Tier 1; n8n workflow, WAHA integration, Webhook Tier 2
- **M12**: Rilis publik Tier 1 campaign; Laporan Komprehensif, PWA build Tier 2
- **M13**: Soft Launch Tier 2 (Beta testing 10 toko)
- **M14**: Feedback Tier 2, bug fixes
- **M15**: Optimasi performa, UAT
- **M16**: **Rilis Resmi Tier 2** + Campaign marketing

### Fase 4: Scale & Ecosystem (Minggu 17+)
- Multi-toko / franchise management
- AI prediksi permintaan
- Payment gateway integration
- Offline mode PWA penuh
- Marketplace supplier auto-restock

---

*Dokumen ini disusun untuk panduan pengembangan platform WarungDigital (Tier 1 & Tier 2 / Den Ana Brontolano Retail).*  
*BRD v2.0 — 14 Juli 2026*