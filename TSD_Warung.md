# TSD — Technical Specification Document
## Platform WarungDigital — Keuangan & Stok Warung (Merged dengan Den Ana - Brontolano Retail)

**Versi:** 2.0  
**Status:** Draf  
**Audiens:** Developer, QA Engineer, DevOps  
**Tanggal:** 14 Juli 2026

---

## 1. TEKNOLOGI STACK — GABUNGAN

### 1.1 Per Tier

| Komponen | Tier 1: Lite | Tier 2: Pro (Den Ana Brontolano) |
|----------|-------------|----------------------------------|
| **Frontend** | HTML + Tailwind CDN + Vanilla JS | React 18 / Vite + Tailwind CSS + PWA |
| **Backend** | Google Apps Script (V8) | Node.js (NestJS / Express) |
| **Database** | Google Sheets (7 tab) | PostgreSQL 16 + Redis 7 |
| **Auth** | SHA-256 + PropertiesService | bcrypt + JWT (access + refresh) |
| **WA** | CallMeBot API | WAHA (WhatsApp HTTP API) — self-hosted |
| **Workflow** | - | n8n (self-hosted / cloud) |
| **Charts** | Google Charts | Chart.js / Recharts |
| **Maps** | - | Google Maps API (Place Autocomplete) |
| **Barcode** | html5-qrcode | html5-qrcode |
| **CI/CD** | Manual | GitHub Actions → Docker → Server |
| **Deploy** | GAS Web App | Docker + docker-compose |
| **Hosting** | Google (serverless) | DigitalOcean / AWS / VPS |

---

## 2. ARSITEKTUR

*(Diagram arsitektur gabungan sudah dijelaskan di SDD_Warung.md Section 2)*

---

## 3. SPESIFIKASI DATABASE

### 3.1 Tier 1: Google Sheets (7 Tab)

**Nama Spreadsheet:** `WarungDigital_Data_[ID_Warung]`

#### Tab: `User`
| Kolom | Type | Required | Example |
|-------|------|----------|---------|
| user_id | String | YES | USR-001 |
| email | String | YES, UNIQUE | sari@gmail.com |
| password_hash | String | YES | a1b2c3d4... |
| nama_warung | String | YES | Warung Bu Sari |
| nama_pemilik | String | YES | Sari |
| no_wa | String | YES, UNIQUE | 628123456789 |
| role | String | YES | owner / karyawan |
| created_at | DateTime | YES | 2026-07-14 |
| last_login | DateTime | NO | 2026-07-14 |
| subscription | String | NO | free / premium |

#### Tab: `Sesi`
| Kolom | Type | Required | Example |
|-------|------|----------|---------|
| token | String (SHA-256) | YES, UNIQUE | abc123def... |
| user_id | String | YES | USR-001 |
| created_at | DateTime | YES | 2026-07-14 |
| expires_at | DateTime | YES | 2026-07-15 |
| ip_address | String | NO | 192.168.1.1 |

#### Tab: `Kategori`
| Kolom | Type | Required | Example |
|-------|------|----------|---------|
| kategori_id | String | YES, UNIQUE | KTG-001 |
| nama_kategori | String | YES, UNIQUE | Mie Instan |
| icon | String | NO | 🍜 |
| urutan | Number | NO | 1 |

#### Tab: `Produk`
| Kolom | Type | Required | Example |
|-------|------|----------|---------|
| produk_id | String | YES, UNIQUE | PRD-001 |
| barcode | String | NO | 8991234567890 |
| nama_produk | String | YES | Indomie Goreng |
| kategori_id | String | YES | KTG-001 |
| harga_beli | Number | YES, >=0 | 2500 |
| harga_jual | Number | YES, >=0 | 3500 |
| stok | Number | YES, >=0 | 50 |
| stok_minimum | Number | NO, DEFAULT 5 | 10 |
| satuan | String | YES | pcs / pack / dus / kg / liter |
| aktif | Boolean | YES, DEFAULT TRUE | TRUE |
| created_at | DateTime | YES | 2026-07-14 |

#### Tab: `Transaksi`
| Kolom | Type | Required | Example |
|-------|------|----------|---------|
| transaksi_id | String | YES, UNIQUE | TRX-001 |
| timestamp | DateTime | YES | 2026-07-14 20:00 |
| user_id | String | YES | USR-001 |
| total_hpp | Number | AUTO | 25000 |
| total_jual | Number | AUTO | 50000 |
| metode_bayar | String | YES | tunai / qris / transfer |
| catatan | String | NO | Diskon 10% |

#### Tab: `Detail_Transaksi`
| Kolom | Type | Required | Example |
|-------|------|----------|---------|
| detail_id | String | YES, UNIQUE | DTL-001 |
| transaksi_id | String | YES | TRX-001 |
| produk_id | String | YES | PRD-001 |
| qty | Number | YES, >=1 | 2 |
| harga_satuan | Number | YES | 3500 |
| subtotal | Number | AUTO | 7000 |

#### Tab: `Pengeluaran`
| Kolom | Type | Required | Example |
|-------|------|----------|---------|
| pengeluaran_id | String | YES, UNIQUE | PEL-001 |
| tanggal | Date | YES | 2026-07-14 |
| user_id | String | YES | USR-001 |
| kategori | String | YES | modal / operasional / gaji / lain-lain |
| deskripsi | String | YES | Beli modal sembako |
| nominal | Number | YES, >0 | 500000 |
| lampiran_url | String | NO | https://drive.google.com/... |
| created_at | DateTime | YES | 2026-07-14 |

### 3.2 Tier 2: PostgreSQL Schema (Key Tables)

*(Detail lengkap 15+ tables ada di SRD_Warung.md Section 4)*

```sql
-- Core: Users + Toko
CREATE TABLE stores (
    store_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(user_id),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    logo_url TEXT,
    timezone VARCHAR(30) DEFAULT 'Asia/Jakarta',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Core: Price Tiers (fitur unik Den Ana)
CREATE TABLE price_tiers (
    tier_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    tier_name VARCHAR(10) NOT NULL CHECK (tier_name IN ('HET','T1','T2','T3','T4','T5')),
    min_qty INTEGER NOT NULL CHECK (min_qty >= 1),
    price DECIMAL(12,2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN DEFAULT true,
    UNIQUE(product_id, tier_name)
);

-- Function: hitung harga berdasarkan quantity
CREATE OR REPLACE FUNCTION get_tier_price(p_product_id UUID, p_qty INTEGER)
RETURNS DECIMAL(12,2) AS $$
DECLARE
    v_price DECIMAL(12,2);
BEGIN
    -- Cari tier dengan qty tertinggi yang memenuhi
    SELECT price INTO v_price FROM price_tiers
    WHERE product_id = p_product_id
      AND min_qty <= p_qty
      AND is_active = true
    ORDER BY min_qty DESC
    LIMIT 1;
    
    -- Fallback ke HET jika tidak ada tier
    IF v_price IS NULL THEN
        SELECT harga_jual INTO v_price FROM products WHERE product_id = p_product_id;
    END IF;
    
    RETURN v_price;
END;
$$ LANGUAGE plpgsql;
```

### 3.3 Redis Cache Strategy (Tier 2)

| Key | Value | TTL | Usage |
|-----|-------|-----|-------|
| `session:{token}` | `{user_id, role}` | 24h | Auth middleware |
| `products:{store_id}` | `[{product}]` | 5m | Product catalog API |
| `price:{product_id}:{qty}` | `{price, tier}` | 1h | Price lookup (heavy) |
| `cart:{session_id}` | `[{item}]` | 1h | Storefront cart |
| `rate_limit:{ip}:{endpoint}` | `{count, ttl}` | 1m | Rate limiter |

---

## 4. API / BACKEND SPECIFICATION

### 4.1 Tier 1: Google Apps Script Functions

#### Core Functions

**Auth.gs:**
```javascript
function login(email, password) → {success, token, user}
function loginWA(no_wa) → {success, otp_sent}
function verifyOTP(no_wa, otp) → {success, token, user}
function register(data) → {success, token, user}
function logout(token) → {success}
function validateSession(token) → Object|null
```

**Produk.gs:**
```javascript
function getProduk(user_id) → Array
function getProdukByBarcode(barcode) → Object|null
function addProduk(data) → {success, produk_id}
function updateProduk(produk_id, data) → {success}
function deleteProduk(produk_id) → {success}
function cekStokMenipis(user_id) → Array
```

**Transaksi.gs:**
```javascript
function addTransaksi(data, items) → {success, transaksi_id}
function getTransaksi(user_id, filter) → Array
function getDetailTransaksi(transaksi_id) → Array
```

**Laporan.gs:**
```javascript
function getLaporanHarian(user_id, date) → {penjualan, pengeluaran, laba, hpp}
function getLaporanMingguan(user_id, start_date) → Array
function getChartData(user_id, period) → Object
```

**Notifikasi.gs:**
```javascript
function kirimWA(no_wa, pesan) → {success, status}
function notifStokMenipis(user_id) → {sent, count}
```

### 4.2 Tier 2: Node.js API Endpoints (NestJS)

#### Auth Module
```
POST   /api/v1/auth/login               Login email/password → JWT
POST   /api/v1/auth/login-wa            Kirim OTP ke WhatsApp
POST   /api/v1/auth/verify-otp          Verifikasi OTP → JWT
POST   /api/v1/auth/register            Register akun baru
POST   /api/v1/auth/refresh             Refresh JWT token
```

#### Products & Tiering Module
```
GET    /api/v1/products                 List produk (paginated, filterable)
GET    /api/v1/products/:id             Detail produk + tiers
POST   /api/v1/products                 Create produk
PUT    /api/v1/products/:id             Update produk
DELETE /api/v1/products/:id             Soft delete

POST   /api/v1/products/:id/tiers       Create tier (HET/T1-T5)
PUT    /api/v1/products/:id/tiers/:tid  Update tier
DELETE /api/v1/products/:id/tiers/:tid  Delete tier
GET    /api/v1/products/:id/price?qty=X Hitung harga berdasarkan qty (auto-tier)
```

#### POS / Transactions Module
```
POST   /api/v1/transactions             Create transaksi (decrement stok)
GET    /api/v1/transactions              List transaksi
GET    /api/v1/transactions/:id          Detail transaksi
POST   /api/v1/transactions/:id/void    Void transaksi (increment stok back)
```

#### Cashdrawer Module
```
POST   /api/v1/cashdrawer/open          Open shift (input saldo awal)
POST   /api/v1/cashdrawer/close         Close shift (hitung selisih)
GET    /api/v1/cashdrawer/history       Riwayat shift
POST   /api/v1/cashdrawer/petty-cash   Input petty cash
```

#### AR/AP Module (Hutang/Piutang)
```
GET    /api/v1/ar                       List piutang
POST   /api/v1/ar                       Create piutang
POST   /api/v1/ar/:id/pay               Bayar piutang (partial/lunas)
GET    /api/v1/ap                       List hutang
POST   /api/v1/ap                       Create hutang
POST   /api/v1/ap/:id/pay               Bayar hutang (partial/lunas)
GET    /api/v1/ar/aging                 Aging report piutang
GET    /api/v1/ap/aging                 Aging report hutang
```

#### Marketing Module
```
GET    /api/v1/loyalty/:wa              Cek poin customer by WA
POST   /api/v1/loyalty/redeem           Redeem poin
GET    /api/v1/commissions              List komisi staff
POST   /api/v1/commissions/:id/pay      Bayar komisi
CRUD   /api/v1/promotions               Promo management
```

#### Attendance Module
```
POST   /api/v1/attendance/checkin       Check-in (nearby)
POST   /api/v1/attendance/checkout      Check-out
GET    /api/v1/attendance               Riwayat kehadiran per user/bulan
CRUD   /api/v1/shifts                   Shift management
POST   /api/v1/shifts/assign            Assign staff ke shift
```

#### Storefront (Landing Page Customer)
```
GET    /api/v1/storefront/:slug         Get store info
GET    /api/v1/storefront/:slug/products   Get published products + tier price
GET    /api/v1/storefront/:slug/products/:id/price?qty=X   Get price for qty
POST   /api/v1/storefront/cart          Add to cart (session-based)
POST   /api/v1/storefront/checkout      Checkout COD → trigger webhook n8n
POST   /api/v1/storefront/orders/track  Track order by customer WA
```

#### Reports Module
```
GET    /api/v1/reports/profit-loss      Laba/rugi (periode filter)
GET    /api/v1/reports/cash-flow        Arus kas
GET    /api/v1/reports/top-products     Top produk by qty / revenue
GET    /api/v1/reports/shift-summary    Summary shift kasir per periode
GET    /api/v1/reports/ar-aging         Aging report piutang
GET    /api/v1/reports/commission       Komisi staff per periode
GET    /api/v1/reports/pdf              Generate PDF laporan
```

#### Webhooks Module
```
POST   /api/v1/webhooks/n8n/order-created     n8n trigger: order baru
POST   /api/v1/webhooks/n8n/stock-low         n8n trigger: stok menipis
POST   /api/v1/webhooks/n8n/daily-report      n8n trigger: laporan harian
POST   /api/v1/webhooks/waha/incoming         WAHA incoming: chat customer
```

---

## 5. FRONTEND SPECIFICATION

### 5.1 Tier 1: HTML + Tailwind CDN

**Halaman:**
- Login (email/WA OTP)
- Dashboard (ringkasan penjualan, stok, grafik)
- Kasir (scan barcode, keranjang, total otomatis)
- Stok (CRUD produk, filter)
- Pengeluaran (input + riwayat)
- Laporan (laba/rugi, grafik)
- Pengaturan (profil, password)

**Navigasi:**
```html
<div class="fixed bottom-0 w-full bg-white shadow-lg z-50">
  <div class="flex justify-around items-center py-2">
    <button onclick="nav('dashboard')">🏠</button>
    <button onclick="nav('kasir')">💰</button>
    <button onclick="nav('stok')">📦</button>
    <button onclick="nav('laporan')">📊</button>
    <button onclick="nav('pengaturan')">⚙️</button>
  </div>
</div>
```

**Pattern Client:**
```javascript
google.script.run
  .withSuccessHandler(handleSuccess)
  .withFailureHandler(handleError)
  .functionName(param1, param2);
```

### 5.2 Tier 2: React + Vite PWA

**Component Tree (Simplified):**
```
App
├── AuthLayout
│   ├── LoginPage (WA OTP / email)
│   └── RegisterPage
├── StorefrontLayout (Public PWA)
│   ├── Navbar + Search
│   ├── ProductGrid (with tier price tooltip)
│   ├── ProductDetail (tier table)
│   ├── Cart (persist localStorage → API)
│   └── Checkout (Google Maps + COD)
├── AdminLayout (Private Dashboard)
│   ├── Sidebar
│   ├── DashboardPage (stats)
│   ├── POSPage (kasir + barcode)
│   ├── ProductsPage (CRUD + tier management)
│   ├── CashdrawerPage (shift)
│   ├── ArApPage (hutang/piutang)
│   ├── MarketingPage (loyalty + promo)
│   ├── AttendancePage (absensi)
│   └── ReportsPage (charts + export)
```

**PWA Configuration** (`vite.config.ts`):
```typescript
import { VitePWA } from 'vite-plugin-pwa';
export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Den Ana Brontolano',
        short_name: 'Den Ana',
        theme_color: '#059669',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/'
      }
    })
  ]
}
```

**State Management:**
- `React Context` untuk auth state
- `localStorage` untuk cart (storefront)
- `SWR / React Query` untuk API caching
- `Zustand` untuk POS state (fast updates)

---

## 6. INTEGRATION SPECIFICATION

### 6.1 CallMeBot (Tier 1 — WA Gratis)

```javascript
function kirimWA(no_wa, pesan) {
  var apiKey = PropertiesService.getScriptProperties().getProperty('CALLMEBOT_KEY');
  var url = 'https://api.callmebot.com/whatsapp.php?phone='
    + no_wa + '&text=' + encodeURIComponent(pesan) + '&apikey=' + apiKey;
  var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  return response.getResponseCode() === 200;
}
```

### 6.2 WAHA (Tier 2 — WA Production)

**Deployment:**
```yaml
services:
  waha:
    image: devlike/waha:latest
    ports:
      - "3001:3001"
    environment:
      WAHA_API_KEY: ${WAHA_API_KEY}
      WAHA_WEBHOOK_URL: https://api.denana.com/api/v1/webhooks/waha/incoming
    volumes:
      - waha-sessions:/app/sessions
```

**Send Message (Backend → WAHA):**
```javascript
// NestJS Service
async function sendWA(to, message) {
  const response = await fetch(`${WAHA_URL}/api/sendText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Api-Key': WAHA_KEY },
    body: JSON.stringify({
      session: 'default',
      chatId: `${to}@c.us`,
      text: message
    })
  });
  return response.json();
}
```

### 6.3 n8n (Tier 2 — Workflow)

**Deployment:**
```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      N8N_METRICS: "true"
      WEBHOOK_URL: https://n8n.denana.com
    volumes:
      - n8ndata:/home/node/.n8n
```

---

## 7. ERROR HANDLING

### 7.1 Standard API Response Format (Tier 2)

```typescript
// Success
{ success: true, data: {...}, meta: { page: 1, total: 100 } }

// Error
{ success: false, error: "Pesan error", code: "PRODUCT_NOT_FOUND" }

// Validation Error
{ success: false, errors: [{ field: "email", message: "Format email salah" }] }
```

### 7.2 HTTP Status Codes (Tier 2)

| Code | Usage |
|------|-------|
| 200 | Success |
| 201 | Created (transaksi, produk) |
| 400 | Bad request (validasi gagal) |
| 401 | Unauthorized (token invalid) |
| 403 | Forbidden (role tidak sesuai) |
| 404 | Not found |
| 409 | Conflict (stok tidak cukup) |
| 429 | Too many requests (rate limit) |
| 500 | Internal server error |

---

## 8. PERFORMANCE OPTIMIZATION

### 8.1 Tier 1 (GAS)

| Teknik | Implementasi |
|--------|-------------|
| **Batch read** | `getValues()` sekali, jangan loop `getValue()` |
| **Cache** | `CacheService.put()` untuk produk/kategori (5 menit) |
| **Lock** | `LockService.waitLock()` pada transaksi (30 detik) |
| **Batch write** | `setValues()` untuk multi-row insert |

### 8.2 Tier 2 (Node.js)

| Teknik | Implementasi |
|--------|-------------|
| **Query optimization** | Index on FK + date columns, EXPLAIN ANALYZE |
| **Connection pool** | `pg-pool` max 20 connections |
| **Redis cache** | Products, tiers, sessions — cache first |
| **Pagination** | Cursor-based for large datasets |
| **Compression** | Response compression (gzip/brotli) |
| **CDN** | Static assets via Cloudflare |

---

## 9. SECURITY SPECIFICATION

| Aspek | Tier 1 | Tier 2 |
|-------|--------|--------|
| **Password** | SHA-256 | bcrypt (salt rounds=12) |
| **Auth token** | PropertiesService + SHA-256 | JWT (RS256) + refresh token |
| **Rate limit** | 5 fail login = lock 15m | 100 req/min/user, 1000/min/IP |
| **CORS** | N/A (GAS) | Whitelist domain only |
| **Helmet** | - | Helmet.js middleware |
| **Input validation** | Manual sanitize | class-validator + DTO |
| **DB injection** | N/A (Sheets) | TypeORM parameterized queries |
| **Audit log** | - | Table audit_logs (all mutations) |
| **Data backup** | Drive auto-version | PG dump daily + S3 |

---

## 10. DEPLOYMENT

### 10.1 Tier 1
```
GAS Editor → Deploy → New deployment → Web app
  → Execute as: Me
  → Who has access: Anyone
  → Deploy → Copy URL
```

### 10.2 Tier 2
```bash
# 1. Clone
git clone https://github.com/denana/brontolano-retail.git
cd brontolano-retail

# 2. Environment
cp .env.example .env
# Edit .env: DB_HOST, REDIS_URL, WAHA_KEY, N8N_URL, etc.

# 3. Docker Deploy
docker-compose up -d

# 4. Database Migration
docker-compose exec backend npm run migration:run

# 5. Seed default data
docker-compose exec backend npm run seed

# 6. Import n8n workflows
# Import file JSON dari ./n8n-workflows/ ke UI n8n

# 7. Setup SSL (Nginx/Caddy)
# Reverse proxy ke backend:3000 dan storefront:80
```

---

## 11. TESTING

| Area | Tier 1 | Tier 2 |
|------|--------|--------|
| **Unit test** | Manual + Logger | Jest (coverage >80%) |
| **API test** | - | Supertest + Postman Collection |
| **E2E** | Manual flow test | Cypress (storefront + admin) |
| **Load test** | - | k6 — 10k concurrent users |
| **Security** | Manual | OWASP ZAP + audit npm |
| **PWA audit** | - | Lighthouse >80 all categories |

---

## 12. ENVIRONMENT VARIABLES (Tier 2)

```bash
# .env
NODE_ENV=production
PORT=3000

# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=den_ana_retail
DB_USER=denana
DB_PASSWORD=secure_password

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRY=24h
JWT_REFRESH_EXPIRY=7d

# WAHA
WAHA_URL=http://waha:3001
WAHA_API_KEY=your_waha_key

# n8n
N8N_WEBHOOK_URL=https://n8n.denana.com/webhook

# Google Maps
GOOGLE_MAPS_API_KEY=your_maps_key

# Cloud Storage (for backups)
S3_ENDPOINT=https://sgp1.digitaloceanspaces.com
S3_BUCKET=denana-backups
S3_ACCESS_KEY=your_key
S3_SECRET_KEY=your_secret
```

---

*Dokumen ini berisi spesifikasi teknis lengkap untuk implementasi WarungDigital (Tier 1 & Tier 2 / Den Ana Brontolano Retail).*  
*TSD v2.0 — 14 Juli 2026*