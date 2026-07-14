# SDD — System Design Document
## Platform WarungDigital — Keuangan & Stok Warung (Merged dengan Den Ana - Brontolano Retail)

**Versi:** 2.0  
**Status:** Draf  
**Audiens:** Developer, System Architect, DevOps  
**Tanggal:** 14 Juli 2026

---

## 1. PENDAHULUAN

### 1.1 Tujuan
Dokumen ini merinci desain teknis, arsitektur, dan struktur data untuk platform **WarungDigital** dengan **dual-tier architecture**: Tier 1 (GAS+Sheets) untuk warung kecil, Tier 2 (React+Node.js+PostgreSQL) untuk retail menengah.

### 1.2 Arsitektur Dual Tier

| Layer | Tier 1: Lite | Tier 2: Pro (Den Ana Brontolano) |
|-------|-------------|----------------------------------|
| **Presentation** | HTML Service (GAS) — single column, bottom nav | React/Vite PWA — sidebar admin + full storefront |
| **Application** | Google Apps Script (serverless) | Node.js Express/NestJS (Docker) |
| **Database** | Google Sheets (7 tab) | PostgreSQL + Redis |
| **Integration** | CallMeBot (WA) | WAHA + n8n (WA + Workflow) |

---

## 2. DIAGRAM ARSITEKTUR

### 2.1 High-Level Architecture Gabungan

```
                    ┌─────────────────────────────────────────────┐
                    │           CLIENT LAYER                      │
                    │  Tier 1: Browser (Mobile Web)               │
                    │  Tier 2: Browser + PWA (Installable)        │
                    └───────────────────┬─────────────────────────┘
                                        │
              ┌─────────────────────────┼─────────────────────────┐
              │                         │                         │
              ▼                         ▼                         ▼
    ┌─────────────────────┐   ┌─────────────────────────────────────────┐
    │  TIER 1 GATEWAY     │   │          TIER 2 GATEWAY                 │
    │  doGet() / doPost() │   │  Nginx / Cloudflare → API Gateway       │
    └──────────┬──────────┘   └──────────────────┬──────────────────────┘
               │                                  │
               ▼                                  ▼
    ┌─────────────────────┐   ┌─────────────────────────────────────────┐
    │  GAS Backend        │   │  Node.js Backend (NestJS / Express)      │
    │  - Auth.gs          │   │  Modules: Auth, POS, Produk, Cashdrawer  │
    │  - Produk.gs        │   │  ArAP, Marketing, Absensi, Reports       │
    │  - Transaksi.gs     │   │  Webhooks: n8n + WAHA                    │
    │  - Notifikasi.gs    │   └──────────────────┬──────────────────────┘
    └──────────┬──────────┘                      │
               │                                  ├──► Redis Cache
               ▼                                  ▼
    ┌─────────────────────┐   ┌─────────────────────────────────────────┐
    │  Google Sheets      │   │  PostgreSQL Database                     │
    │  (7 Connected Sheets)│   │  15+ Tables (relational)                │
    └─────────────────────┘   └─────────────────────────────────────────┘
```

### 2.2 Data Flow — Kasir Transaksi

**Tier 1 (GAS):**
```
User klik Simpan → google.script.run.addTransaksi()
  → GAS: LockService.waitLock(30000)
  → GAS: SpreadsheetApp.appendRow(Transaksi)
  → GAS: Loop items → appendRow(Detail_Transaksi)
  → GAS: Update stok produk (getRange → setValue)
  → GAS: Cek stok minimum → jikaYa: kirimWA()
  → Client: {success: true, transaksi_id: "TRX-001"}
```

**Tier 2 (Node.js):**
```
User klik Simpan → POST /api/v1/transactions
  → Middleware: JWT auth → validator → rate limiter
  → Controller: Start transaction (PG BEGIN)
    → INSERT transactions
    → FOR EACH item:
        → Cari tier harga berdasarkan qty (SQL dengan CASE)
        → INSERT transaction_items
        → UPDATE products SET stock = stock - qty
    → INSERT audit_log
  → COMMIT
  → Trigger webhook: n8n (async) → WAHA → WA Admin
  → Response: 201 {transaction_id, total}
```

---

## 3. DATA DESIGN

### 3.1 Tier 1: Google Sheets (7 Tab)

*(Detail kolom setiap tab di TSD_Warung.md — 7 tab Sheets)*

### 3.2 Tier 2: PostgreSQL (15+ Tables)

#### Entity Relationship Summary

```
stores ──1:N── users
stores ──1:N── products ──1:N── price_tiers
stores ──1:N── categories
stores ──1:N── cashdrawer_shifts ──1:N── cashdrawer_transactions
stores ──1:N── transactions ──1:N── transaction_items
stores ──1:N── accounts_receivable
stores ──1:N── accounts_payable
stores ──1:N── stock_opname ──1:N── stock_opname_items
stores ──1:N── loyalty_points ──1:N── loyalty_transactions
stores ──1:N── staff_commissions
stores ──1:N── promotions
stores ──1:N── attendance
stores ──1:N── shifts ──1:N── shift_assignments
stores ──1:N── orders ──1:N── order_items
```

---

## 4. COMPONENT DESIGN

### 4.1 Tier 1: GAS Web App (SPA-style)

**Routing:**
- `doGet(e)` → parse `e.parameter.page` → render HTML template
- Pages: `login`, `dashboard`, `kasir`, `stok`, `pengeluaran`, `laporan`, `pengaturan`
- Client-side `google.script.run` for all data operations

### 4.2 Tier 2: React + Node.js (API + PWA)

**Landing Page (Customer PWA):**
```
/ → Home (Hero + Produk Unggulan)
/products → Katalog produk (Grid + search)
/products/:slug → Detail produk + tabel tier harga dinamis
/checkout → Keranjang + form alamat (Google Maps) + COD
/orders/track → Tracking order by no WA
/login → Login WA OTP
```

**Admin Panel (Internal PWA):**
```
/dashboard → Ringkasan penjualan, stok, grafik
/pos → POS Kasir (scan barcode + tiering harga)
/products → Manajemen produk + tier harga
/stock → Stok opname
/cashdrawer → Shift management + petty cash
/ar → Hutang piutang (customer)
/ap → Hutang piutang (vendor)
/marketing → Loyalty, promo, komisi
/attendance → Absensi + jadwal shift
/reports → Laporan keuangan lengkap
/settings → Pengaturan toko + subscription
```

### 4.3 n8n Workflow Design

**Workflow: Order → WA Notif (Real-time)**
```yaml
trigger:
  webhook: POST /api/v1/webhooks/n8n/order-created
steps:
  - name: Parse payload
    action: Code node
  - name: Cek stok
    action: PostgreSQL node (SELECT stock WHERE product_id)
  - name: Kirim WA Admin
    action: HTTP Request → WAHA API
    template: "Pesanan baru! {customer} - Rp {total}"
  - name: Kirim WA Customer
    action: HTTP Request → WAHA API
    template: "Pesananmu dikonfirmasi, Kak! Siap diproses."
  - name: Update status order
    action: HTTP Request → Backend API
```

---

## 5. INTEGRATION DESIGN

### 5.1 Integrasi WhatsApp

| Fitur | Tier 1 (CallMeBot) | Tier 2 (WAHA) |
|-------|-------------------|---------------|
| **Arah pesan** | Outbound only | Outbound + Inbound |
| **Template** | Fix text | Template kustom |
| **Real-time** | No (polling) | Yes (webhook) |
| **Reliability** | Rendah (gratis) | Tinggi (self-hosted) |
| **Broadcast** | No | Yes (multi-number) |
| **Chat masuk** | No | Yes (customer → admin) |

### 5.2 Integrasi n8n (Tier 2 Only)

| Workflow | Trigger | Action |
|----------|---------|--------|
| **Order Baru** | Webhook (API → n8n) | WA Admin + Customer, update stok |
| **Stok Menipis** | Cron (check every 6h) | WA Owner daftar barang habis |
| **Laporan Harian** | Cron (20:00 WIB) | WA Owner ringkasan penjualan |
| **Tagihan Jatuh Tempo** | Cron (09:00 WIB) | WA Customer tagihan piutang |
| **Notifikasi Promo** | Cron + query | WA Broadcast diskon/promo |

---

## 6. SECURITY DESIGN

### 6.1 Tier 1 Security

- **Auth**: SHA-256 password + session token di PropertiesService
- **Input**: Sanitasi string (strip script tags)
- **Rate limit**: 5x login gagal → lock 15 menit (counter di PropertiesService)

### 6.2 Tier 2 Security

- **Auth**: bcrypt (12 salt rounds) + JWT (access + refresh token)
- **API**: Helmet.js + CORS + Rate limiter (100 req/min)
- **Database**: Prepared statements (TypeORM), encrypted secrets
- **Webhook**: HMAC signature validation (n8n → backend)
- **PWA**: Service worker restricted scope, HTTPS mandatory

---

## 7. DEPLOYMENT DESIGN

### 7.1 Tier 1 Deployment
```
GAS Editor → Deploy → New Deployment → Web App
    → Execute as: Me
    → Access: Anyone
    → URL: script.google.com/macros/s/xxx/exec
```

### 7.2 Tier 2 Deployment (Docker)
```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./den-ana-backend
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      - postgres
      - redis
  postgres:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
  redis:
    image: redis:7-alpine
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    volumes:
      - n8ndata:/home/node/.n8n
  waha:
    image: devlike/wa-ha  # atau WAHA Cloud
    ports:
      - "3001:3001"
volumes:
  pgdata:
  n8ndata:
```

---

## 8. PERFORMANCE DESIGN

| Metrik | Tier 1 (Target) | Tier 2 (Target) |
|--------|-----------------|-----------------|
| **Page load** | <3 detik (CDN GAS) | <2 detik (CDN PWA) |
| **API response** | <500ms (GAS) | <200ms (Node.js) |
| **Transaksi/simpan** | <2 detik | <500ms |
| **Concurrent users** | Terbatas (GAS) | 10.000+ (load balancer) |
| **Caching** | CacheService (100KB) | Redis (unlimited) |
| **Database query** | getValues() batch | Indexed SQL + Redis cache |
| **Webhook** | N/A | <1 detik (n8n + WAHA) |

---

*Dokumen ini disusun untuk panduan arsitektur & desain sistem platform WarungDigital (Tier 1 & Tier 2).*  
*SDD v2.0 — 14 Juli 2026*