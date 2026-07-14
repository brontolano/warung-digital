# SRD — Software Requirements Specification
## Platform WarungDigital — Keuangan & Stok Warung (Merged dengan Den Ana - Brontolano Retail)

**Versi:** 2.0  
**Status:** Draf  
**Audiens:** Developer, System Architect, QA Engineer  
**Tanggal:** 14 Juli 2026

---

## DAFTAR ISI

1. Pendahuluan
2. Arsitektur Sistem — Dual Tier
3. Spesifikasi Database (Tier 1: Google Sheets)
4. Spesifikasi Database (Tier 2: PostgreSQL)
5. Spesifikasi Backend (Tier 1: Google Apps Script)
6. Spesifikasi Backend (Tier 2: Node.js/NestJS)
7. Spesifikasi Frontend (Tier 1: HTML Service)
8. Spesifikasi Frontend (Tier 2: React/Vite PWA)
9. Fitur Fungsional (Modul) — Gabungan
10. Kebutuhan Non-Fungsional
11. Keamanan
12. Integrasi Pihak Ketiga
13. UI/UX Requirements
14. Testing Requirements
15. Deployment & Operasional

---

## 1. PENDAHULUAN

### 1.1 Tujuan
Dokumen ini mendefinisikan spesifikasi teknis untuk pembangunan platform **WarungDigital** — sistem manajemen keuangan dan stok barang dengan **dual-tier architecture**.

### 1.2 Tech Stack Per Tier

| Komponen | Tier 1: Lite | Tier 2: Pro (Den Ana Brontolano) |
|----------|-------------|----------------------------------|
| **Frontend** | HTML + CSS (Tailwind CDN) + Vanilla JS | React.js / Vite (PWA) + Tailwind CSS |
| **Backend** | Google Apps Script (GAS) | Node.js Express / NestJS |
| **Database** | Google Sheets | PostgreSQL + Redis |
| **Auth** | Session token (PropertiesService) | JWT + Passport.js |
| **Scan Barcode** | html5-qrcode (CDN) | html5-qrcode (CDN) |
| **QRIS** | qrcode.js (CDN) | qrcode.js (CDN) |
| **WA Notif** | CallMeBot API | **WAHA (WhatsApp HTTP API)** |
| **Workflow** | - | **n8n (self-hosted/cloud)** |
| **Grafik** | Google Charts | Chart.js / Recharts |
| **Live Chat** | - | Template auto-reply WAHA |
| **Maps** | - | Google Maps API |

### 1.3 Batasan Teknis

| Parameter | Tier 1 | Tier 2 |
|-----------|--------|--------|
| **Quota eksekusi** | 90 menit/hari (GAS) | Unlimited (server) |
| **Database max** | 10 juta sel/Spreadsheet | Unlimited (PG) |
| **Concurrent users** | Terbatas (single-threaded GAS) | 10.000+ (load-balanced) |
| **Waktu eksekusi** | Maks 6 menit/fungsi | Unlimited (async) |
| **Cache** | CacheService (100KB/item) | Redis (unlimited) |
| **Real-time** | Polling (tidak real-time) | WebSocket + n8n webhook |

---

## 2. ARSITEKTUR SISTEM — DUAL TIER

### 2.1 Diagram Arsitektur Gabungan

```
                    ┌───────────────────────────────────────────┐
                    │           BROWSER USER                    │
                    │  Tier 1: Browser web biasa                │
                    │  Tier 2: Browser + PWA (Add to Home)     │
                    └───────────────────┬───────────────────────┘
                                        │
              ┌─────────────────────────┼─────────────────────────┐
              │                         │                         │
              ▼                         ▼                         ▼
    ┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
    │  TIER 1: GAS   │     │  TIER 2: Landing    │     │  TIER 2: Admin  │
    │  Web App        │     │  Page (Customer)    │     │  Panel (Owner)  │
    │  doGet/doPost   │     │  React/Vite PWA     │     │  React/Vite PWA │
    └────────┬────────┘     └──────────┬──────────┘     └────────┬────────┘
             │                         │                         │
             ▼                         ▼                         ▼
    ┌─────────────────┐     ┌──────────────────────────────────────────────┐
    │ google.script   │     │         Tier 2: Backend API                 │
    │ .run (async)    │     │     Node.js Express / NestJS                │
    └────────┬────────┘     │                                            │
             │              │  ┌────────┐┌────────┐┌────────┐┌────────┐  │
             ▼              │  │ Auth   ││ POS    ││ Stok   ││ Laporan│  │
    ┌─────────────────┐     │  └────────┘└────────┘└────────┘└────────┘  │
    │ Google Sheets   │     │  ┌────────┐┌────────┐┌────────┐             │
    │ (7 Tab)         │     │  │Tiering ││Cashdrwr││Hutang  │             │
    │ SpreadsheetApp  │     │  │Harga   ││        ││Piutang │             │
    └─────────────────┘     │  └────────┘└────────┘└────────┘             │
                            │  ┌────────┐┌────────┐                      │
                            │  │Loyalty ││Absensi │                      │
                            │  └────────┘└────────┘                      │
                            └──────────────────┬─────────────────────────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    │                          │                          │
                    ▼                          ▼                          ▼
          ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
          │  PostgreSQL DB   │     │  Redis Cache     │     │  n8n Workflow    │
          │  Transactional   │     │  Session + Cache │     │  Engine          │
          │  Data            │     │                  │     │  (Notifikasi)    │
          └──────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                                     │
                                                                     ▼
                                                          ┌──────────────────┐
                                                          │  WAHA (WhatsApp  │
                                                          │  HTTP API)       │
                                                          │  → Admin WA      │
                                                          │  → Customer WA   │
                                                          └──────────────────┘
```

### 2.2 Upgrade Path Architecture

```
[Tier 1: GAS + Sheets]
    │
    ├── Data export/import otomatis
    ├── Link akun yang sama
    └── Notif upgrade: "Data kamu siap dipindah ke Pro!"
         │
         ▼
[Tier 2: React + Node.js + PostgreSQL]
    → Data migrasi sekali, seamless
    → Akun tetap sama, fitur baru muncul
```

---

## 3. SPESIFIKASI DATABASE (TIER 1: GOOGLE SHEETS)

### 3.1 Spreadsheet: `WarungDigital_Data_[ID_Warung]`

**7 Tab:**

| No | Tab | Deskripsi |
|----|-----|-----------|
| 1 | `User` | Akun pengguna, auth, profil |
| 2 | `Sesi` | Session token management |
| 3 | `Kategori` | Kategori produk |
| 4 | `Produk` | Data barang, stok, harga |
| 5 | `Transaksi` | Header penjualan |
| 6 | `Detail_Transaksi` | Item per transaksi |
| 7 | `Pengeluaran` | Biaya operasional |

*(Detail kolom setiap tab lihat TSD_Warung.md — spreadsheet schema)*

---

## 4. SPESIFIKASI DATABASE (TIER 2: POSTGRESQL)

### 4.1 Nama Database: `den_ana_brontolano_retail`

### 4.2 Entity Relationship

```sql
-- Users & Auth
users (
  user_id UUID PK,
  email VARCHAR UNIQUE,
  password_hash VARCHAR,
  role ENUM('owner', 'admin', 'kasir', 'gudang'),
  nama_toko VARCHAR,
  no_wa VARCHAR UNIQUE,
  is_verified BOOLEAN,
  subscription_tier ENUM('pro', 'enterprise'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Toko (untuk multi-toko nanti)
stores (
  store_id UUID PK,
  user_id FK → users,
  nama VARCHAR,
  alamat TEXT,
  logo VARCHAR,
  timezone VARCHAR DEFAULT 'Asia/Jakarta'
)

-- Kategori Produk
categories (
  category_id UUID PK,
  store_id FK → stores,
  name VARCHAR,
  parent_id FK → categories (self),  -- sub-kategori
  sort_order INTEGER
)

-- Produk
products (
  product_id UUID PK,
  store_id FK → stores,
  barcode VARCHAR,
  name VARCHAR,
  category_id FK → categories,
  unit VARCHAR,  -- pcs, pack, dus, kg, liter
  purchase_price DECIMAL(12,2),  -- HPP
  stock INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Tabel Tiering Harga (core feature Den Ana)
price_tiers (
  tier_id UUID PK,
  product_id FK → products,
  tier_name ENUM('HET', 'T1', 'T2', 'T3', 'T4', 'T5'),
  min_qty INTEGER,
  price DECIMAL(12,2),
  is_active BOOLEAN DEFAULT true
)

-- Transaksi / POS
transactions (
  transaction_id UUID PK,
  store_id FK → stores,
  user_id FK → users,  -- kasir yang memproses
  shift_id FK → cashdrawer_shifts,
  customer_name VARCHAR,
  customer_wa VARCHAR,
  subtotal DECIMAL(12,2),
  discount DECIMAL(12,2),
  total DECIMAL(12,2),
  payment_method ENUM('cash', 'qris', 'transfer', 'cod'),
  payment_status ENUM('paid', 'unpaid', 'partial'),
  notes TEXT,
  created_at TIMESTAMP
)

transaction_items (
  item_id UUID PK,
  transaction_id FK → transactions,
  product_id FK → products,
  tier_name VARCHAR,  -- HET/T1/T2/T3/T4/T5
  qty INTEGER,
  unit_price DECIMAL(12,2),
  subtotal DECIMAL(12,2)
)

-- Cashdrawer Management
cashdrawer_shifts (
  shift_id UUID PK,
  store_id FK → stores,
  user_id FK → users,  -- kasir
  opening_balance DECIMAL(12,2),
  closing_balance DECIMAL(12,2),
  expected_balance DECIMAL(12,2),  -- opening + sales - expenses
  difference DECIMAL(12,2),
  notes TEXT,
  opened_at TIMESTAMP,
  closed_at TIMESTAMP,
  status ENUM('open', 'closed', 'verified')
)

cashdrawer_transactions (
  cd_transaction_id UUID PK,
  shift_id FK → cashdrawer_shifts,
  type ENUM('top_up', 'withdrawal', 'petty_cash', 'expense'),
  amount DECIMAL(12,2),
  reason TEXT,
  created_at TIMESTAMP
)

-- Hutang/Piutang
accounts_receivable (
  ar_id UUID PK,
  store_id FK → stores,
  customer_name VARCHAR,
  customer_wa VARCHAR,
  invoice_number VARCHAR,
  total_amount DECIMAL(12,2),
  paid_amount DECIMAL(12,2),
  due_date DATE,
  status ENUM('active', 'overdue', 'paid', 'written_off'),
  notes TEXT,
  created_at TIMESTAMP
)

accounts_payable (
  ap_id UUID PK,
  store_id FK → stores,
  vendor_name VARCHAR,
  invoice_number VARCHAR,
  total_amount DECIMAL(12,2),
  paid_amount DECIMAL(12,2),
  due_date DATE,
  status ENUM('active', 'overdue', 'paid'),
  notes TEXT,
  created_at TIMESTAMP
)

-- Stok Opname
stock_opname (
  opname_id UUID PK,
  store_id FK → stores,
  user_id FK → users,
  notes TEXT,
  status ENUM('draft', 'completed', 'verified'),
  created_at TIMESTAMP,
  completed_at TIMESTAMP
)

stock_opname_items (
  opname_item_id UUID PK,
  opname_id FK → stock_opname,
  product_id FK → products,
  system_stock INTEGER,
  physical_stock INTEGER,
  difference INTEGER,
  notes TEXT
)

-- Loyalty Program
loyalty_programs (
  program_id UUID PK,
  store_id FK → stores,
  name VARCHAR,
  point_per_amount INTEGER,  -- 1 point per Rp X
  min_redeem INTEGER,
  redeem_value DECIMAL(12,2),  -- Rp per point
  is_active BOOLEAN
)

loyalty_points (
  loyalty_id UUID PK,
  store_id FK → stores,
  customer_name VARCHAR,
  customer_wa VARCHAR,
  points INTEGER,
  lifetime_points INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

loyalty_transactions (
  lt_id UUID PK,
  loyalty_id FK → loyalty_points,
  type ENUM('earn', 'redeem', 'expire'),
  points INTEGER,
  reference_id VARCHAR,  -- transaction_id
  created_at TIMESTAMP
)

-- Komisi Staff
staff_commissions (
  commission_id UUID PK,
  store_id FK → stores,
  user_id FK → users,  -- staff penerima komisi
  transaction_id FK → transactions,
  commission_percent DECIMAL(5,2),
  commission_amount DECIMAL(12,2),
  status ENUM('pending', 'paid', 'cancelled'),
  paid_at TIMESTAMP,
  created_at TIMESTAMP
)

-- Absensi Karyawan
attendance (
  attendance_id UUID PK,
  store_id FK → stores,
  user_id FK → users,
  date DATE,
  check_in TIME,
  check_out TIME,
  status ENUM('present', 'late', 'absent', 'leave'),
  notes TEXT
)

shifts (
  shift_id UUID PK,
  store_id FK → stores,
  name VARCHAR,  -- Pagi, Siang, Malam
  start_time TIME,
  end_time TIME
)

shift_assignments (
  assignment_id UUID PK,
  shift_id FK → shifts,
  user_id FK → users,
  date DATE,
  check_in TIME,
  check_out TIME
)

-- Landing Page Customer (PWA)
cart_items (
  cart_id UUID PK,
  session_id VARCHAR,  -- guest session
  product_id FK → products,
  tier_name VARCHAR,
  qty INTEGER,
  unit_price DECIMAL(12,2),
  created_at TIMESTAMP
)

orders (
  order_id UUID PK,
  store_id FK → stores,
  customer_name VARCHAR,
  customer_wa VARCHAR,
  delivery_address TEXT,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  subtotal DECIMAL(12,2),
  total DECIMAL(12,2),
  payment_method ENUM('cod', 'transfer'),
  order_status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'),
  notes TEXT,
  created_at TIMESTAMP
)

-- Marketing & Promo
promotions (
  promotion_id UUID PK,
  store_id FK → stores,
  name VARCHAR,
  type ENUM('discount_percent', 'discount_amount', 'buy_x_get_y', 'free_shipping'),
  value DECIMAL(12,2),
  min_purchase DECIMAL(12,2),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  usage_limit INTEGER,
  is_active BOOLEAN
)

-- n8n Workflow Logs (audit)
n8n_webhook_logs (
  log_id UUID PK,
  webhook_id VARCHAR,
  event_type VARCHAR,
  payload JSONB,
  status ENUM('success', 'failed', 'pending'),
  response TEXT,
  created_at TIMESTAMP
)
```

### 4.3 Redis Cache Structure (Tier 2)

| Key Pattern | Value | TTL | Purpose |
|-------------|-------|-----|---------|
| `session:{token}` | user_id + role | 24 jam | Auth session |
| `products:{store_id}` | JSON array | 5 menit | Product catalog |
| `price:{product_id}:{qty}` | price | 1 jam | Tier price lookup |
| `cart:{session_id}` | JSON array | 1 jam | Customer cart |
| `rate_limit:{ip}` | counter | 1 menit | API rate limiter |

---

## 5. SPESIFIKASI BACKEND (TIER 1: GOOGLE APPS SCRIPT)

*(Detail lengkap di TSD_Warung.md — Section GAS Implementation)*

### 5.1 File Structure

| File | Fungsi |
|------|--------|
| `Code.gs` | Entry point, doGet(), doPost(), routing |
| `Auth.gs` | Login, logout, session, OTP |
| `Database.gs` | Koneksi Sheets, helper CRUD |
| `Produk.gs` | CRUD produk & stok |
| `Transaksi.gs` | Input transaksi, hitung total |
| `Pengeluaran.gs` | CRUD pengeluaran |
| `Laporan.gs` | Laba/rugi, grafik, export |
| `Notifikasi.gs` | Kirim WA via CallMeBot |

---

## 6. SPESIFIKASI BACKEND (TIER 2: NODE.JS/NESTJS)

### 6.1 Project Structure

```
den-ana-backend/
├── src/
│   ├── auth/          # JWT, Login WA OTP, Passport
│   ├── products/      # CRUD produk, tiering harga
│   ├── pos/           # Transaksi, POS Kasir
│   ├── cashdrawer/    # Shift management
│   ├── ar-ap/         # Hutang/Piutang (Accounts Receivable/Payable)
│   ├── stock/         # Stok opname
│   ├── marketing/     # Loyalty, promo, komisi
│   ├── attendance/    # Absensi, shift
│   ├── storefront/    # Landing page API
│   ├── reports/       # Laporan keuangan
│   ├── webhooks/      # n8n + WAHA integration
│   ├── common/        # Shared modules (guards, filters, pipes)
│   └── config/        # Database, Redis, env
├── test/
├── Dockerfile
├── docker-compose.yml
└── n8n-workflows/     # Backup workflow JSON
```

### 6.2 API Endpoints (Tier 2)

**Module: Auth**
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/v1/auth/login` | Login email/password |
| POST | `/api/v1/auth/login-wa` | Kirim OTP WA |
| POST | `/api/v1/auth/verify-otp` | Verifikasi OTP |
| POST | `/api/v1/auth/register` | Daftar akun baru |

**Module: Products & Tiering**
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/v1/products` | List produk |
| GET | `/api/v1/products/:id` | Detail produk + seluruh tier harga |
| POST | `/api/v1/products` | Tambah produk baru |
| PUT | `/api/v1/products/:id` | Update produk |
| DELETE | `/api/v1/products/:id` | Soft delete |
| POST | `/api/v1/products/:id/tiers` | Tambah tier harga (HET/T1-T5) |
| PUT | `/api/v1/products/:id/tiers/:tierId` | Update tier harga |
| GET | `/api/v1/products/:id/price?qty=X` | Hitung harga otomatis berdasarkan qty |

**Module: POS & Transactions**
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/v1/transactions` | Input transaksi baru (decrement stok) |
| GET | `/api/v1/transactions` | List transaksi (filter date/user) |
| GET | `/api/v1/transactions/:id` | Detail transaksi |
| POST | `/api/v1/transactions/:id/void` | Void transaksi (revert stok) |

**Module: Cashdrawer**
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/v1/cashdrawer/open` | Buka shift baru |
| POST | `/api/v1/cashdrawer/close` | Tutup shift (hitung selisih) |
| GET | `/api/v1/cashdrawer/history` | Riwayat shift |
| POST | `/api/v1/cashdrawer/petty-cash` | Input petty cash |

**Module: Hutang/Piutang**
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/v1/ar` | List piutang |
| POST | `/api/v1/ar` | Tambah piutang |
| POST | `/api/v1/ar/:id/pay` | Bayar piutang |
| GET | `/api/v1/ap` | List hutang |
| POST | `/api/v1/ap` | Tambah hutang |
| POST | `/api/v1/ap/:id/pay` | Bayar hutang |

**Module: Marketing**
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/v1/loyalty/points/:wa` | Cek poin customer |
| POST | `/api/v1/loyalty/redeem` | Redeem poin |
| GET | `/api/v1/commissions` | List komisi staff |
| POST | `/api/v1/commissions/pay` | Bayar komisi |
| CRUD | `/api/v1/promotions` | Manajemen promo |

**Module: Storefront (Landing Page Customer)**
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/v1/storefront/:slug/products` | Produk untuk customer |
| GET | `/api/v1/storefront/:slug/products/:id/price?qty=X` | Harga tier untuk customer |
| POST | `/api/v1/storefront/cart` | Tambah ke keranjang |
| POST | `/api/v1/storefront/checkout` | Checkout COD |
| POST | `/api/v1/storefront/live-chat` | Kirim chat live ke WA admin |

**Module: n8n Webhooks**
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/v1/webhooks/n8n/order-created` | Trigger n8n: order baru |
| POST | `/api/v1/webhooks/n8n/stock-low` | Trigger n8n: stok menipis |
| POST | `/api/v1/webhooks/n8n/daily-report` | Trigger n8n: laporan harian |

---

## 7. FITUR FUNGSIONAL (MODUL) — GABUNGAN

### MODUL A: AUTENTIKASI

| ID | Fitur | Prioritas | Tier |
|----|-------|-----------|------|
| A-01 | Login Email/Password | P0 | 1 & 2 |
| A-02 | Login WA OTP | P0 | 1 & 2 |
| A-03 | Register akun baru | P0 | 1 & 2 |
| A-04 | Reset password (WA/Email) | P0 | 1 & 2 |
| A-05 | Session management (token) | P0 | 1 & 2 (JWT) |
| A-06 | Role management (RBAC) | P0 | **2** |

### MODUL B: DASHBOARD

| ID | Fitur | Prioritas | Tier |
|----|-------|-----------|------|
| B-01 | Ringkasan penjualan hari ini | P0 | 1 & 2 |
| B-02 | Stok menipis highlight | P0 | 1 & 2 |
| B-03 | Transaksi terakhir (5 data) | P0 | 1 & 2 |
| B-04 | Grafik penjualan 7/30 hari | P0 | 1 & 2 |
| B-05 | Cashdrawer status (buka/tutup) | P1 | **2** |

### MODUL C: POS / TRANSAKSI

| ID | Fitur | Prioritas | Tier |
|----|-------|-----------|------|
| C-01 | Input produk manual + autocomplete | P0 | 1 & 2 |
| C-02 | Scan barcode kamera | P0 | 1 & 2 |
| C-03 | Keranjang belanja | P0 | 1 & 2 |
| C-04 | Hitung total otomatis | P0 | 1 & 2 |
| C-05 | Multi metode bayar (tunai/qris/cod) | P0 | 1 & 2 |
| C-06 | Riwayat transaksi + filter | P1 | 1 & 2 |
| C-07 | Void transaksi | P2 | **2** |
| C-08 | **Tiering Harga Otomatis (HET-T5)** | **P0** | **2** |
| C-09 | **Live chat WA template auto-reply** | **P1** | **2** |

### MODUL D: MANAJEMEN STOK

| ID | Fitur | Prioritas | Tier |
|----|-------|-----------|------|
| D-01 | CRUD produk | P0 | 1 & 2 |
| D-02 | CRUD kategori | P0 | 1 & 2 |
| D-03 | Stok minimum alert | P0 | 1 & 2 |
| D-04 | Import produk (Excel) | P1 | 1 & 2 |
| D-05 | **Stok Opname** | **P0** | **2** |
| D-06 | Multiple satuan (pcs/pack/dus) | P2 | **2** |

### MODUL E: PENGELUARAN

| ID | Fitur | Prioritas | Tier |
|----|-------|-----------|------|
| E-01 | Input pengeluaran | P0 | 1 & 2 |
| E-02 | Kategori (Modal/Operasional/Gaji/dll) | P0 | 1 & 2 |
| E-03 | Riwayat + filter tanggal | P0 | 1 & 2 |

### MODUL F: KASIR & SHIFT (Tier 2 Only)

| ID | Fitur | Prioritas |
|----|-------|-----------|
| F-01 | **Buka shift (saldo awal)** | **P0** |
| F-02 | **Tutup shift (hitung selisih)** | **P0** |
| F-03 | **Petty cash tracking** | **P1** |
| F-04 | **Kasir multi-user** | **P0** |
| F-05 | **Riwayat shift + laporan kasir** | **P1** |

### MODUL G: HUTANG/PIUTANG (Tier 2 Only)

| ID | Fitur | Prioritas |
|----|-------|-----------|
| G-01 | **Tambah piutang customer** | **P0** |
| G-02 | **Tambah hutang vendor** | **P0** |
| G-03 | **Bayar piutang (partial/lunas)** | **P0** |
| G-04 | **Bayar hutang (partial/lunas)** | **P0** |
| G-05 | **Aging report (jatuh tempo)** | **P1** |
| G-06 | **Notifikasi tagihan via WA** | **P1** |

### MODUL H: MARKETING (Tier 2 Only)

| ID | Fitur | Prioritas |
|----|-------|-----------|
| H-01 | **Loyalty point (earn/redeem)** | **P0** |
| H-02 | **Komisi staff per transaksi** | **P0** |
| H-03 | **Promo/diskon (periode + kuota)** | **P1** |
| H-04 | **Riwayat poin & komisi** | **P1** |

### MODUL I: ABSENSI KARYAWAN (Tier 2 Only)

| ID | Fitur | Prioritas |
|----|-------|-----------|
| I-01 | **Check-in/out via POS** | **P0** |
| I-02 | **Jadwal shift (pagi/siang/malam)** | **P0** |
| I-03 | **Rekap kehadiran per bulan** | **P1** |
| I-04 | **Izin/cuti** | **P2** |

### MODUL J: LANDING PAGE / STOREFRONT (Tier 2 Only)

| ID | Fitur | Prioritas |
|----|-------|-----------|
| J-01 | **PWA/TWA support (Add to Home)** | **P0** |
| J-02 | **Produk grid + search** | **P0** |
| J-03 | **Tiering harga otomatis per qty** | **P0** |
| J-04 | **Live chat WA template** | **P1** |
| J-05 | **Login WA + OTP** | **P0** |
| J-06 | **Tracking order (by no WA)** | **P1** |
| J-07 | **Google Maps detail alamat** | **P1** |
| J-08 | **Checkout COD** | **P0** |

### MODUL K: LAPORAN KOMPREHENSIF

| ID | Fitur | Prioritas | Tier |
|----|-------|-----------|------|
| K-01 | Laba/rugi harian | P0 | 1 & 2 |
| K-02 | Laba/rugi bulanan | P0 | 1 & 2 |
| K-03 | Grafik penjualan (line/bar) | P1 | 1 & 2 |
| K-04 | Grafik pengeluaran (pie) | P1 | 1 & 2 |
| K-05 | Top produk | P1 | 1 & 2 |
| K-06 | **Arus Kas (Cash Flow)** | **P0** | **2** |
| K-07 | **Laporan Hutang/Piutang** | **P0** | **2** |
| K-08 | **Laporan Shift Kasir** | **P1** | **2** |
| K-09 | **MDR & Pajak** | **P2** | **2** |
| K-10 | **Laporan Komisi Staff** | **P1** | **2** |
| K-11 | **Aging Report (AR/AP)** | **P1** | **2** |
| K-12 | Export Excel/PDF | P1 | 1 & 2 |

### MODUL L: NOTIFIKASI

| ID | Fitur | Prioritas | Tier |
|----|-------|-----------|------|
| L-01 | WA stok menipis | P1 | 1 (CallMeBot) |
| L-02 | WA laporan harian | P2 | 1 (CallMeBot) |
| L-03 | **WA notif order baru** | **P0** | **2 (WAHA)** |
| L-04 | **WA notif tagihan jatuh tempo** | **P1** | **2 (WAHA)** |
| L-05 | **WA notif promo** | **P2** | **2 (WAHA)** |
| L-06 | **n8n workflow auto-report** | **P1** | **2** |

### MODUL M: PENGATURAN

| ID | Fitur | Prioritas | Tier |
|----|-------|-----------|------|
| M-01 | Profil toko | P0 | 1 & 2 |
| M-02 | Backup data | P0 | 1 (Drive) / **2 (PG dump)** |
| M-03 | Reset password | P0 | 1 & 2 |
| M-04 | Subscription management | P2 | **2** |

---

## 8. KEBUTUHAN NON-FUNGSIONAL

| Metrik | Target Tier 1 | Target Tier 2 |
|--------|--------------|---------------|
| **Page load (3G)** | <3 detik | <3 detik |
| **API response (p95)** | <500ms | <200ms |
| **Transaksi simpan** | <2 detik | <500ms |
| **Uptime** | >99% (bergantung Google) | 99.9% (SLA) |
| **Upload file** | Maks 5MB | Maks 10MB |
| **Concurrent users** | Terbatas GAS | 10.000+ per instance |
| **Webhook response** | - | <2 detik |
| **Font size** | Min 16px body | Min 14px body |
| **Touch target** | Min 48x48px | Min 48x48px |
| **Timezone support** | WIB (fixed) | WIB/WITA/WIT (config) |

---

## 9. KEAMANAN

| Aspek | Tier 1 | Tier 2 |
|-------|--------|--------|
| **Password** | SHA-256 hash | bcrypt (salt rounds = 12) |
| **Session** | PropertiesService token | JWT + refresh token |
| **API auth** | - (GAS internal) | JWT Bearer + rate limiter |
| **SQL Injection** | N/A (Sheets) | Prepared statements / TypeORM |
| **XSS/CSRF** | Sanitasi input, CSP headers | Helmet.js, CORS, CSP |
| **Rate limit** | 5 gagal login = blokir 15m | 100 req/min/user, 1000 req/min/IP |
| **Backup** | Google Drive auto | PG dump harian + S3 |
| **Data residency** | Google Cloud (global) | Bisa pilih region Indonesia |

---

## 10. INTEGRASI PIHAK KETIGA — GABUNGAN

| Integrasi | Tier 1 | Tier 2 |
|-----------|--------|--------|
| **WA Notif** | CallMeBot API (gratis) | **WAHA (WhatsApp HTTP API)** self-hosted/cloud |
| **Workflow** | - | **n8n** (open-source workflow engine) |
| **Maps** | - | Google Maps API |
| **QRIS** | qrcode.js (client) | qrcode.js (client) |
| **Barcode** | html5-qrcode | html5-qrcode |
| **Charts** | Google Charts | Chart.js / Recharts |
| **Storage** | Google Drive | AWS S3 / DigitalOcean Spaces |
| **Database** | Google Sheets | PostgreSQL (Supabase / Cloud SQL) |
| **Cache** | CacheService | Redis (Upstash / self-hosted) |

### 10.1 n8n Workflow Integration (Tier 2)

**Workflow 1: Order Baru → WA Admin**
```json
{
  "name": "Order Baru → Notif WA Owner",
  "trigger": "Webhook (POST /api/v1/webhooks/n8n/order-created)",
  "steps": [
    {"action": "Parse order data"},
    {"action": "Cek stok untuk item pesanan"},
    {"action": "Kirim WA ke admin via WAHA"},
    {"action": "Update status order (confirmed)"}
  ]
}
```

**Workflow 2: Laporan Harian Otomatis**
```json
{
  "name": "Laporan Harian → WA Owner",
  "trigger": "Schedule (Cron: 20:00 WIB every day)",
  "steps": [
    {"action": "Query total penjualan hari ini"},
    {"action": "Query top produk"},
    {"action": "Query stok menipis"},
    {"action": "Generate ringkasan teks"},
    {"action": "Kirim WA ke owner via WAHA"}
  ]
}
```

### 10.2 WAHA Integration (Tier 2)

**WAHA (WhatsApp HTTP API):**
- **Deployment**: Docker container or WAHA Cloud
- **Webhook incoming**: Chat dari customer landing page
- **Webhook outgoing**: Notifikasi order, promo, tagihan
- **Template pesan**: Diskon, stok menipis, order baru, tagihan

---

## 11. UI/UX REQUIREMENTS

### 11.1 Desain Visual

| Elemen | Tier 1 | Tier 2 |
|--------|--------|--------|
| **Warna utama** | Hijau (#16A34A) + Emas | Hijau (#059669) + Biru (#2563EB) |
| **Font** | System UI sans-serif | Inter / Poppins (Google Font) |
| **Layout** | Single column, bottom nav | Sidebar (admin) + full (storefront) |
| **Mode** | Terang | Terang + Gelap (PWA) |

### 11.2 Copywriting

| Konteks | Teks |
|---------|------|
| Login berhasil | "Selamat datang kembali, Kak {nama}!" |
| Transaksi sukses | "Berhasil! Transaksi Rp {total} tersimpan." |
| Stok menipis | "Stok {barang} udah mau abis! Tinggal {stok} aja." |
| Tier 2 checkout sukses | "Pesananmu sudah masuk, Kak! Admin akan hubungi kamu." |
| Tutup shift | "Shift selesai. Selisih: Rp {selisih}. Jangan lupa catat ya!" |
| Upgrade ke Pro | "Warungmu makin besar, yuk upgrade ke Pro biar makin mantap!" |

---

## 12. TESTING REQUIREMENTS

### 12.1 Testing Per Tier

| Area | Tier 1 | Tier 2 |
|------|--------|--------|
| **Unit Test** | Logger GAS manual | Jest / Mocha — coverage >80% |
| **API Test** | N/A (GAS built-in) | Supertest / Postman collection |
| **E2E Test** | Manual test all flows | Cypress / Playwright |
| **Load Test** | N/A (GAS limited) | k6 / Artillery — 10k concurrent |
| **PWA Audit** | - | Lighthouse >80 all categories |

### 12.2 Flow Test Scenarios (Tier 2)

| Flow | Steps |
|------|-------|
| **Tiering Harga** | Input produk → set HET, T1, T2 → landing page cek harga per qty → checkout → cek stok berkurang |
| **Cashdrawer** | Buka shift (Rp 100.000) → transaksi 3x → tutup shift (Rp 350.000) → cek selisih otomatis |
| **Hutang/Piutang** | Input piutang customer Rp 500.000 → bayar Rp 200.000 → cek sisa Rp 300.000 |
| **Landing → Order** | Buka PWA → login WA OTP → pilih produk (tier otomatis) → checkout COD → WA notif admin |
| **n8n Workflow** | Trigger webhook order-created → cek WA admin terkirim → cek status order berubah |

---

## 13. DEPLOYMENT & OPERASIONAL

| Parameter | Tier 1 | Tier 2 |
|-----------|--------|--------|
| **Platform** | GAS Web App | DigitalOcean / AWS / VPS |
| **Container** | - | Docker + docker-compose |
| **Database** | Google Sheets (built-in) | PostgreSQL (Supabase / self-hosted) |
| **Cache** | CacheService (built-in) | Redis (Upstash / self-hosted) |
| **CI/CD** | Manual deploy GAS | GitHub Actions → Docker → Server |
| **Monitoring** | StackDriver Logging | Sentry + Grafana + Prometheus |
| **Domain** | script.google.com (default) | Custom domain + SSL |
| **CDN** | Google (built-in) | Cloudflare / Fastly |
| **Backup** | Google Drive auto-versioning | PG dump harian + S3 |
| **Rollback** | Deploy versi sebelumnya | Blue-green deployment |

---

*Dokumen ini disusun untuk panduan pengembangan platform WarungDigital (Tier 1 & Tier 2 / Den Ana Brontolano Retail).*  
*SRD v2.0 — 14 Juli 2026*