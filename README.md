# WarungDigital — Panduan Coding

> Platform keuangan & stok warung (Tier 1: Gratis / Tier 2: Pro Den Ana Brontolano)

---

## Daftar Isi

1. [Arsitektur Proyek](#arsitektur-proyek)
2. [Prasyarat Development](#prasyarat-development)
3. [Quick Start — Tier 1 (GAS + Sheets)](#quick-start--tier-1-gas--sheets)
4. [Quick Start — Tier 2 (React + Node.js)](#quick-start--tier-2-react--nodejs)
5. [Struktur Folder](#struktur-folder)
6. [Kodeks Coding](#kodeks-coding)
7. [Alur Kerja (Workflow)](#alur-kerja-workflow)
8. [Cara Kerja Modul Utama](#cara-kerja-modul-utama)
9. [Integrasi WhatsApp](#integrasi-whatsapp)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)
13. [Glossary Teknis](#glossary-teknis)

---

## Arsitektur Proyek

```
warung-digital/
├── docs/                        # Dokumen spesifikasi
│   ├── BRD_Warung.md            # Business Requirements
│   ├── MRD_Warung.md            # Market Requirements
│   ├── SRD_Warung.md            # Software Requirements
│   ├── SDD_Warung.md            # System Design
│   ├── TSD_Warung.md            # Technical Specification
│   └── README.md                # Panduan coding (ini)
│
├── tier1-lite/                  # TIER 1: GAS + Google Sheets
│   ├── gas/
│   │   ├── Code.gs              # Entry point (doGet/doPost)
│   │   ├── Auth.gs              # Login, register, session
│   │   ├── Database.gs          # Helper koneksi Sheets
│   │   ├── Produk.gs            # CRUD produk & stok
│   │   ├── Transaksi.gs         # Input transaksi
│   │   ├── Pengeluaran.gs       # CRUD pengeluaran
│   │   ├── Laporan.gs           # Laporan & grafik
│   │   └── Notifikasi.gs        # WA via CallMeBot
│   └── html/
│       ├── Login.html           # Halaman login
│       ├── Dashboard.html       # Dashboard utama
│       ├── Kasir.html           # Halaman kasir
│       ├── Stok.html            # Manajemen stok
│       ├── Pengeluaran.html     # Input pengeluaran
│       ├── Laporan.html         # Laporan & grafik
│       └── Pengaturan.html      # Pengaturan profil
│
├── tier2-pro/                   # TIER 2: React + Node.js + PostgreSQL
│   ├── backend/                 # Node.js (NestJS)
│   │   ├── src/
│   │   │   ├── auth/            # Module auth
│   │   │   ├── products/        # Module produk + tiering
│   │   │   ├── pos/             # Module POS/transaksi
│   │   │   ├── cashdrawer/      # Module shift kasir
│   │   │   ├── ar-ap/           # Module hutang/piutang
│   │   │   ├── stock/           # Module stok opname
│   │   │   ├── marketing/       # Module loyalty + promo
│   │   │   ├── attendance/      # Module absensi
│   │   │   ├── storefront/      # Module landing page
│   │   │   ├── reports/         # Module laporan
│   │   │   ├── webhooks/        # n8n + WAHA integration
│   │   │   ├── common/          # Shared (guards, pipes)
│   │   │   └── config/          # Database, Redis, env
│   │   ├── test/
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   └── package.json
│   │
│   ├── frontend/                # React/Vite PWA
│   │   ├── src/
│   │   │   ├── components/      # Reusable components
│   │   │   ├── pages/
│   │   │   │   ├── admin/       # Admin panel pages
│   │   │   │   └── storefront/  # Landing page customer
│   │   │   ├── contexts/        # React Context
│   │   │   ├── hooks/           # Custom hooks
│   │   │   ├── api/             # API service layer
│   │   │   ├── utils/           # Helpers
│   │   │   └── App.tsx
│   │   ├── public/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── n8n-workflows/           # Backup workflow JSON
│   │   ├── order-created.json
│   │   ├── daily-report.json
│   │   └── stock-low.json
│   │
│   └── .env.example             # Environment variables
│
└── scripts/                     # Utility scripts
    ├── migrate-tier1-to-tier2.py  # Export GAS data → PG
    └── seed-data.sql              # Default data
```

---

## Prasyarat Development

### Tier 1: GAS + Sheets (Gratis)

| Tool | Kebutuhan | Download |
|------|-----------|----------|
| **Browser** | Chrome/Edge (terbaru) | [chrome.com](https://chrome.com) |
| **Akun Google** | Gmail aktif | [gmail.com](https://gmail.com) |
| **CallMeBot API Key** | Untuk WA notif | [callmebot.com](https://callmebot.com) |

### Tier 2: React + Node.js (Pro)

| Tool | Versi Min | Kebutuhan |
|------|-----------|-----------|
| **Node.js** | v18 LTS | Backend |
| **npm / yarn / pnpm** | Terbaru | Package manager |
| **Docker** | v24+ | Container |
| **Docker Compose** | v2+ | Multi-service |
| **Git** | v2+ | Version control |
| **PostgreSQL** | v16 | Database (via Docker) |
| **Redis** | v7 | Cache (via Docker) |
| **n8n** | v1+ | Workflow (via Docker) |
| **WAHA** | v4+ | WhatsApp API (via Docker) |
| **VS Code** | Terbaru | IDE |

**Extensi VS Code yang Direkomendasikan:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- PostgreSQL (extension)
- Docker (extension)

---

## Quick Start — Tier 1 (GAS + Sheets)

### Langkah 1: Buat Google Sheets

```
1. Buka https://sheets.new
2. Rename: "WarungDigital_Data_[NamaWarung]"
3. Buat 7 tab (sheet): User, Sesi, Kategori, Produk, Transaksi, Detail_Transaksi, Pengeluaran
4. Isi header kolom sesuai schema di TSD_Warung.md Section 3.1
```

### Langkah 2: Setup Google Apps Script

```
1. Buka https://script.google.com
2. Klik "New project"
3. Rename: "WarungDigital_API"
4. Copy isi semua file .gs dari folder tier1-lite/gas/
5. Copy isi semua file .html dari folder tier1-lite/html/
6. Set CallMeBot API key di Script Properties:
   File → Project Properties → Add: CALLMEBOT_KEY = [your_key]
```

### Langkah 3: Set ID Spreadsheet

```javascript
// Di Code.gs, set ID spreadsheet yang sudah dibuat
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}
```

### Langkah 4: Deploy

```
1. Klik "Deploy" → "New deployment"
2. Select type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Klik "Deploy"
6. Copy URL yang diberikan → ini adalah URL web app Anda
```

### Langkah 5: Test

```
1. Buka URL web app
2. Register akun baru
3. Login
4. Tambah produk
5. Input transaksi
6. Cek stok berkurang otomatis
```

---

## Quick Start — Tier 2 (React + Node.js)

### Langkah 1: Clone & Install

```bash
# Clone
git clone https://github.com/your-repo/warung-digital.git
cd warung-digital/tier2-pro

# Setup env
cp .env.example .env

# Install dependencies
cd backend && npm install
cd ../frontend && npm install
```

### Langkah 2: Jalankan Docker

```bash
# Dari folder tier2-pro/
docker-compose up -d

# Cek semua container running
docker-compose ps
```

**Container yang jalan:**
- `backend` → port 3000
- `frontend` → port 5173
- `postgres` → port 5432
- `redis` → port 6379
- `n8n` → port 5678
- `waha` → port 3001

### Langkah 3: Database Setup

```bash
# Jalankan migrations
cd backend
npm run migration:run

# Seed data default (kategori, admin user, dll)
npm run seed
```

### Langkah 4: Import n8n Workflows

```
1. Buka http://localhost:5678
2. Login: admin / admin
3. Klik "Workflows" → "Import from File"
4. Import 3 file dari n8n-workflows/:
   - order-created.json
   - daily-report.json
   - stock-low.json
```

### Langkah 5: Buka Aplikasi

```
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api/v1
- n8n: http://localhost:5678
- WAHA: http://localhost:3001
```

### Langkah 6: Register & Test

```
1. Buka http://localhost:5173
2. Register akun owner baru
3. Login
4. Tambah produk + set tiering harga (HET/T1/T2)
5. Buka POS → scan barcode atau input manual → transaksi
6. Cek dashboard → lihat laporan
```

---

## Kodeks Coding

### General Principles

1. **Satu tanggung jawab per fungsi** — Setiap fungsi hanya melakukan satu hal
2. **Naming yang jelas** — Gunakan nama deskriptif (bukan `a`, `x`, `data1`)
3. **Komentar yang perlu saja** — Jelaskan "mengapa", bukan "apa"
4. **Error handling selalu ada** — Jangan pernah biarkan error tanpa handling
5. **Konsisten** — Ikuti pola yang sudah ada di file lain

### Naming Convention

| Tipe | Convention | Contoh |
|------|-----------|--------|
| **File** | camelCase (JS) | `Produk.gs`, `Transaksi.gs` |
| **Class** | PascalCase (TS) | `ProductService`, `CashdrawerController` |
| **Fungsi** | camelCase | `getProduk()`, `addTransaksi()` |
| **Variabel** | camelCase | `userId`, `totalJual` |
| **Const** | UPPER_SNAKE_CASE | `SPREADSHEET_ID`, `MAX_RETRY` |
| **Table PG** | snake_case (plural) | `products`, `price_tiers`, `cashdrawer_shifts` |
| **Column PG** | snake_case | `product_id`, `total_amount` |
| **API endpoint** | kebab-case | `/api/v1/price-tiers`, `/api/v1/cashdrawer` |
| **React component** | PascalCase | `ProductCard`, `PriceTierTable` |

### Error Handling Pattern

**Tier 1 (GAS) — Selalu return object:**
```javascript
// ✅ BAIK
function addProduk(data) {
  try {
    // ... logic
    return { success: true, produk_id: produk_id };
  } catch(e) {
    Logger.log("ERROR addProduk: " + e.stack);
    return { success: false, error: e.message };
  }
}

// ❌ BURUK — melempar error tanpa handling
function addProduk(data) {
  // ... logic, jika error biarkan crash
}
```

**Tier 2 (NestJS) — Gunakan exception filters:**
```typescript
// ✅ BAIK
@Post()
async create(@Body() dto: CreateProductDto): Promise<Product> {
  const existing = await this.productService.findByBarcode(dto.barcode);
  if (existing) {
    throw new ConflictException('Produk dengan barcode ini sudah ada');
  }
  return this.productService.create(dto);
}

// ✅ BAIK — di controller, gunakan guard
@UseGuards(AuthGuard)
@Post()
async create(@Body() dto: CreateProductDto) { ... }
```

### Komentar

```javascript
// ❌ BURUK — komentar menjelaskan "apa"
// mengambil data produk
function getProduk() { ... }

// ✅ BAIK — komentar menjelaskan "mengapa"
// Menggunakan batch getValues() untuk performa, hindari loop getValue()
// yang lambat untuk lebih dari 100 baris data
function getProduk(user_id) { ... }
```

---

## Alur Kerja (Workflow)

### 1. Membuat Fitur Baru

```
1. Pahami requirement di SRD_Warung.md (modul mana, berapa prioritas)
2. Buat branch baru: git checkout -b feature/nama-fitur
3. Backend (Tier 2):
   a. Buat/buat DTO validasi
   b. Buat/buat service layer
   c. Buat/buat controller
   d. Buat/buat migration jika ada perubahan schema
   e. Buat test
4. Frontend (Tier 2):
   a. Buat/buat component
   b. Buat/buat custom hook (jika perlu API call)
   c. Integrasikan ke halaman yang sesuai
   d. Pastikan responsive (mobile-first)
5. Lint + test: npm run lint && npm run test
6. PR → review → merge
```

### 2. Membuat Modul di GAS (Tier 1)

```
1. Buat file [NamaModul].gs
2. Buat semua fungsi dengan pattern:
   - Fungsi utama (CRUD) → return { success: true/false, data/error }
   - Helper function → bisa private (tidak dipanggil client)
3. Update Code.gs → tambah import function
4. Buat/buat HTML page → taruh di html/[NamaModul].html
5. Test via GAS editor → Deploy → Test deployment
```

### 3. Branching Strategy

```
main          ← production
├── develop   ← development
│   ├── feature/tiering-harga
│   ├── feature/cashdrawer
│   ├── feature/hutang-piutang
│   └── bugfix/stok-negative
```

### 4. Commit Message

```
feat: tambah modul tiering harga (HET-T5)
fix: perbaiki stok tidak update setelah transaksi
refactor: pindah logic pricing ke service terpisah
docs: update TSD dengan PostgreSQL schema
test: tambah unit test untuk kasir module
```

---

## Cara Kerja Modul Utama

### Modul Kasir (POS) — Alur Transaksi

```
┌───────────────┐
│  Input Produk │ ← Scan barcode / search nama
│  via POS      │
└──────┬────────┘
       │
       ▼
┌───────────────┐
│  Tambah ke    │ ← Cari harga berdasarkan qty
│  Keranjang    │   (auto-tier: HET → T1 → T2 → T3)
└──────┬────────┘
       │
       ▼
┌───────────────┐
│  Pilih Metode │ ← Tunai / QRIS / Transfer / COD
│  Bayar        │
└──────┬────────┘
       │
       ▼
┌───────────────┐
│  Simpan       │ ← Insert transaksi + detail
│  Transaksi    │   Kurangi stok per item
└──────┬────────┘
       │
       ▼
┌───────────────┐
│  Trigger WA   │ ← Jika stok menipis
│  Notif (opsi) │
└───────────────┘
```

### Modul Tiering Harga (Tier 2) — Alur

```
┌────────────────────┐
│  Lihat Produk      │ ← Landing page / POS
│  (price: HET)      │   Default: harga eceran tertinggi
└─────────┬──────────┘
          │ User input qty
          ▼
┌────────────────────┐
│  Sistem Cek Tier   │ ← SQL: ORDER BY min_qty DESC
│  price_tiers       │   Cari tier tertinggi yang memenuhi qty
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  Tampilkan Harga   │ ← "Harga: Rp 22.000 (T2)" (contoh)
│  Tier Aktif        │
└────────────────────┘
```

### Modul Cashdrawer (Tier 2) — Alur Shift

```
┌───────────────┐
│  Buka Shift   │ ← Input saldo awal (misal: Rp 200.000)
│  (start)      │
└──────┬────────┘
       │ Transaksi seharian...
       ▼
┌───────────────┐
│  Tutup Shift  │ ← Input saldo akhir (misal: Rp 450.000)
│  (close)      │   Sistem hitung otomatis:
└──────┬────────┘   expected = opening + sales - expenses
       │            difference = closing - expected
       ▼            Jika |difference| > Rp 5.000 → peringatan
┌───────────────┐
│  Lihat        │ ← Semua riwayat shift
│  History      │
└───────────────┘
```

### Modul Hutang/Piutang (Tier 2) — Alur

```
┌─────────────────────┐
│  Tambah Piutang     │ ← Customer beli, belum bayar lunas
│  (AR)               │   total_amount, due_date
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Aging Report       │ ← Belum bayar, jatuh tempo
│  (14d / 30d / 60d+) │   Filter berdasarkan days_remaining
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Notif WA           │ ← via n8n: reminder tagihan
│  ke Customer        │
└─────────────────────┘
```

---

## Integrasi WhatsApp

### Tier 1: CallMeBot (Gratis, terbatas)

```javascript
// Function kirimWA — dipanggil dari GAS
function kirimWA(no_wa, pesan) {
  var apiKey = PropertiesService.getScriptProperties()
    .getProperty('CALLMEBOT_KEY');
  var url = 'https://api.callmebot.com/whatsapp.php'
    + '?phone=' + no_wa
    + '&text=' + encodeURIComponent(pesan)
    + '&apikey=' + apiKey;
  var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  return { success: response.getResponseCode() === 200 };
}

// Contoh penggunaan
function notifStokMenipis(user_id) {
  var user = getUserById(user_id);
  var stokMenipis = getProdukStokMenipis(user_id);
  if (stokMenipis.length > 0) {
    var pesan = '⚠️ Stok menipis:\n';
    stokMenipis.forEach(function(p) {
      pesan += '• ' + p.nama + ': ' + p.stok + ' ' + p.satuan + '\n';
    });
    kirimWA(user.no_wa, pesan);
  }
}
```

### Tier 2: WAHA (Production, self-hosted)

```typescript
// Backend Service
@Injectable()
export class WhatsAppService {
  private wahaUrl = process.env.WAHA_URL;
  private wahaKey = process.env.WAHA_API_KEY;

  async sendText(phone: string, text: string): Promise<boolean> {
    const response = await fetch(`${this.wahaUrl}/api/sendText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.wahaKey,
      },
      body: JSON.stringify({
        session: 'default',
        chatId: `${phone}@c.us`,
        text: text,
      }),
    });
    return response.ok;
  }

  async notifOrderBaru(order: Order): Promise<void> {
    const adminWa = await this.storeService.getAdminWa(order.storeId);
    const msg = `🛒 Pesanan baru!\n`
      + `Customer: ${order.customerName}\n`
      + `Total: Rp ${order.total.toLocaleString()}\n`
      + `Metode: ${order.paymentMethod}`;
    await this.sendText(adminWa, msg);
  }

  async notifTagihan(customer: { name: string, wa: string, amount: number, dueDate: Date }): Promise<void> {
    const msg = `💰 Reminder Tagihan:\n`
      + `Halo ${customer.name}!\n`
      + `Anda punya tagihan Rp ${customer.amount.toLocaleString()}\n`
      + `Jatuh tempo: ${customer.dueDate.toLocaleDateString('id-ID')}`;
    await this.sendText(customer.wa, msg);
  }
}
```

---

## Testing

### Tier 1: Manual Testing

```
Buka GAS editor → Run fungsi test manual:
- testLogin()      → cek auth
- testProduk()     → cek CRUD stok
- testTransaksi()  → cek transaksi + stok berkurang
- testLaporan()    → cek laporan
- testWA()         → cek notifikasi masuk ke HP
```

### Tier 2: Unit Test (Jest)

```bash
# Jalankan semua test
npm run test

# Jalankan test modul tertentu
npm run test -- --testPathPattern=pos
npm run test -- --testPathPattern=cashdrawer

# Coverage
npm run test:cov
```

**Contoh test POS (Tier 2):**
```typescript
// test/pos/transactions.service.spec.ts
describe('TransactionsService', () => {
  it('should create transaction and decrement stock', async () => {
    const product = await createTestProduct({ stock: 10 });
    const dto = {
      items: [{ product_id: product.id, qty: 3 }],
      payment_method: 'cash',
      total: product.harga_jual * 3,
    };

    const result = await service.create(dto);

    expect(result).toHaveProperty('transaction_id');
    const updatedProduct = await findProduct(product.id);
    expect(updatedProduct.stock).toBe(7);
  });

  it('should not allow negative stock', async () => {
    const product = await createTestProduct({ stock: 2 });
    const dto = {
      items: [{ product_id: product.id, qty: 5 }],
      payment_method: 'cash',
    };

    await expect(service.create(dto)).rejects.toThrow('Stok tidak mencukupi');
  });
});
```

---

## Deployment

### Tier 1 (GAS) — Sudah di-deploy

```bash
# Update kode
1. Edit di GAS editor
2. Deploy → Manage deployments → Edit
3. Pilih versi baru → Deploy

# Tidak perlu server, semua di Google Cloud
```

### Tier 2 (Docker) — Production

```bash
# 1. Setup server (Ubuntu 22.04 recommended)
# Install Docker & Docker Compose

# 2. Clone repository di server
git clone https://github.com/your-repo/warung-digital.git
cd warung-digital/tier2-pro

# 3. Setup environment
cp .env.example .env
nano .env  # Isi semua environment variables

# 4. Build & jalankan
docker-compose build
docker-compose up -d

# 5. Jalankan migrations
docker-compose exec backend npm run migration:run

# 6. Setup SSL (Nginx/Caddy)
# Point domain ke server → auto SSL

# 7. Setup backup cron
# 0 2 * * * pg_dump -U denana den_ana_retail | gzip > /backups/$(date +\%F).sql.gz
```

### Nginx Config (Production)

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Storefront (Landing Page)
    location / {
        proxy_pass http://localhost:5173;
        proxy_set_header Host $host;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
    }

    # n8n
    location /n8n/ {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
    }
}
```

---

## Troubleshooting

| Masalah | Penyebab | Solusi |
|---------|----------|--------|
| **GAS: Error quota** | 90 menit/hari terlampaui | Optimasi kode, kurangi loop, gunakan batch |
| **GAS: 6 menit timeout** | Fungsi terlalu panjang | Split ke beberapa fungsi, gunakan LockService |
| **GAS: Sheets tidak ada** | ID spreadsheet salah | Cek SPREADSHEET_ID di Code.gs |
| **CallMeBot: Pesan tidak terkirim** | API key expired/invalid | Dapatkan key baru di callmebot.com |
| **Tier 2: Database connection refused** | PostgreSQL belum jalan | `docker-compose up -d postgres` |
| **Tier 2: Redis connection refused** | Redis belum jalan | `docker-compose up -d redis` |
| **Tier 2: n8n webhook error** | URL salah / network | Cek webhook URL di n8n UI, pastikan backend port terbuka |
| **Tier 2: WAHA not sending** | Session belum connected | Login session di WAHA dashboard, pastikan QR scan |
| **Frontend: API error 500** | Backend crash | Cek backend logs: `docker-compose logs backend` |

---

## Glossary Teknis

| Istilah | Definisi |
|---------|----------|
| **GAS** | Google Apps Script — platform serverless JavaScript dari Google |
| **HET** | Harga Eceran Tertinggi — harga default (qty 1) |
| **T1-T5** | Tier harga grosir — semakin banyak qty, semakin murah |
| **POS** | Point of Sale — mesin kasir digital |
| **PWA** | Progressive Web App — web yang bisa di-install ke HP |
| **WAHA** | WhatsApp HTTP API — engine untuk integrasi WhatsApp |
| **n8n** | Workflow automation engine (open-source) |
| **Cashdrawer** | Modul kas kecil / shift management |
| **AR/AP** | Accounts Receivable / Accounts Payable — piutang/hutang |
| **Loyalty** | Program poin loyalitas customer |
| **JWT** | JSON Web Token — standar autentikasi API |
| **CRUD** | Create, Read, Update, Delete — operasi database dasar |

---

## Dokumentasi Terkait

| Dokumen | Lokasi |
|---------|--------|
| Business Requirements | `docs/BRD_Warung.md` |
| Market Requirements | `docs/MRD_Warung.md` |
| Software Requirements | `docs/SRD_Warung.md` |
| System Design | `docs/SDD_Warung.md` |
| Technical Specification | `docs/TSD_Warung.md` |
| Den Ana Original PRD | `Den_Ana_Brontolano_Retail_PRD.md` |

---

---

## Security Status

| Severity | Issue | Status |
|----------|-------|--------|
| 🔴 **CRITICAL** | CSRF Protection (GAS) | ✅ Fixed — Origin validation + token |
| 🟠 **HIGH** | Password Salt (GAS) | ✅ Fixed — SHA-256 + per-user salt |
| 🟠 **HIGH** | JWT Refresh Rotation | ✅ Fixed — 1h access + 7d refresh |
| 🟡 **MEDIUM** | CSP Headers | ✅ Fixed — Helmet configuration |
| 🟡 **MEDIUM** | Rate Limiting | ✅ Fixed — ThrottlerGuard 100/min |
| 🟡 **MEDIUM** | Error Sanitization | ✅ Fixed — GlobalExceptionFilter |
| 🟢 **LOW** | Audit Trail | ✅ Fixed — AuditLog module |
| 🟢 **LOW** | File Upload Validation | ✅ Fixed — 10MB + type check |
| 🟢 **LOW** | HTTPS | ✅ Auto (Google Apps Script) |

**Detail:** Lihat [SECURITY.md](SECURITY.md)

---

## API Reference (Tier 2)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | `/api/v1/auth/register` | - | Register akun baru |
| POST | `/api/v1/auth/login` | - | Login → JWT |
| POST | `/api/v1/auth/refresh` | - | Refresh access token |
| GET | `/api/v1/auth/me` | JWT | Profil user saat ini |
| GET | `/api/v1/products` | JWT | List produk |
| POST | `/api/v1/products` | JWT | Tambah produk |
| GET | `/api/v1/products/:id` | JWT | Detail + tiers |
| POST | `/api/v1/products/:id/tiers` | JWT | Tambah tier harga |
| GET | `/api/v1/products/:id/price?qty=X` | JWT | Hitung harga by qty |
| POST | `/api/v1/transactions` | JWT | Input transaksi |
| GET | `/api/v1/transactions` | JWT | List transaksi |
| POST | `/api/v1/transactions/:id/void` | JWT | Void + restock |
| POST | `/api/v1/cashdrawer/open` | JWT | Buka shift |
| POST | `/api/v1/cashdrawer/:id/close` | JWT | Tutup shift |
| GET | `/api/v1/cashdrawer/history` | JWT | Riwayat shift |
| GET/POST | `/api/v1/ar` | JWT | Piutang CRUD |
| POST | `/api/v1/ar/:id/pay` | JWT | Bayar piutang |
| GET/POST | `/api/v1/ap` | JWT | Hutang CRUD |
| POST | `/api/v1/ap/:id/pay` | JWT | Bayar hutang |
| POST | `/api/v1/attendance/checkin` | JWT | Check-in karyawan |
| POST | `/api/v1/attendance/checkout` | JWT | Check-out karyawan |
| POST | `/api/v1/stock-opname` | JWT | Input stok opname |
| POST | `/api/v1/stock-opname/:id/confirm` | JWT | Konfirmasi opname |
| GET | `/api/v1/reports/profit-loss` | JWT | Laporan laba rugi |
| GET | `/api/v1/reports/top-products` | JWT | Top produk |
| GET | `/api/v1/storefront/:slug` | - | Info toko publik |
| GET | `/api/v1/storefront/:slug/products` | - | Produk publik |
| POST | `/api/v1/storefront/:slug/checkout` | - | Checkout COD |

---

## Quick Start — Production

```bash
# 1. Clone & setup
git clone https://github.com/brontolano/warung-digital.git
cd warung-digital/tier2-pro
cp .env.example .env  # Isi JWT_SECRET, DB_PASSWORD

# 2. Docker Deploy
docker-compose build
docker-compose up -d

# 3. Migrate + Seed
docker-compose exec backend npm run migration:run
docker-compose exec backend npm run seed

# 4. Open
# Admin: http://localhost:5173/admin/login
# API:   http://localhost:3000/api/v1
# Docs:  http://localhost:3000/api/docs

# 5. Tier 1 (GAS) — Buka script.google.com
# Buat project → copy tier1-lite/gas/* + tier1-lite/html/*
# Set SPREADSHEET_ID + CALLMEBOT_KEY → Deploy
```

*Dokumen ini disusun sebagai panduan coding untuk pengembangan WarungDigital. Versi 2.0.*  
*README v2.0 — 14 Juli 2026*
