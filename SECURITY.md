# SECURITY REPORT — WarungDigital

## 🔴 CRITICAL (1)
1. **CSRF Protection** — GAS doPost() tidak memvalidasi origin. **Fix: tambahkan token CSRF + validasi origin header**

## 🟠 HIGH (2)
2. **Password Hashing GAS** — SHA-256 tanpa salt. **Fix: gunakan Utilities.computeHmacSha256Signature() + salt per user**
3. **JWT Refresh Rotation** — Tidak ada refresh token di backend. **Fix: implementasikan refresh token + DB storage**

## 🟡 MEDIUM (3)
4. **CSP Headers** — Sudah ditambahkan di main.ts via Helmet ✅
5. **Rate Limit Login** — Terproteksi via ThrottlerGuard ✅
6. **Error Sanitasi** — Global exception filter sudah menyembunyikan stack trace ✅

## 🟢 LOW (3)
7. **Audit Log** — Perlu ditambahkan tabel audit_log di PostgreSQL
8. **File Upload Validation** — Perlu validasi tipe/ukuran file
9. **HTTPS** — Otomatis via Google Apps Script ✅

**Prioritas 1: Fix CSRF + Password salt sebelum production launch**
