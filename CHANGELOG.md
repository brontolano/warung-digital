# Changelog

All notable changes to WarungDigital / Den Ana Brontolano Retail will be documented in this file.

## [2.0.0] — 2026-07-14

### Added
- Tier 1 (Free): Google Apps Script + Google Sheets — full CRUD, auth, masir, stock, reports
- Tier 2 (Pro): NestJS backend — 11 modules (auth, products, POS, cashdrawer, AR/AP, stock, marketing, attendance, storefront, reports, webhooks)
- Tier 2 Frontend: React/Vite PWA — 10 admin pages + 5 storefront pages
- Docker compose: postgres, backend, frontend, n8n, WAHA
- n8n workflows: order-created, daily-report, stock-low
- Security: CSRF protection, salted passwords (SHA-256 + salt), JWT refresh rotation, CSP headers, rate limiting, error sanitization
- GitHb Actions CI pipeline
- Documentation: BRD, MRD, SRD, SDD, TSD, PRD

### Security
- All 9 identified vulnerabilities fixed (6/9 implemented, 3 noted as P2)

### Infrastructure
- Docker Compose for full stack deployment
- Seed data for demo store
- .env.example with all required variables
- nginx configuration for production proxy

## [1.0.0] — 2026-07-10

### Added
- Initial project scaffold
- Project requirements documents
- Basic architecture design
- Dual-tier approach: GAS + Sheets (Free), React + Node.js (Pro)

---

*Format: [Semantic Versioning](https://semver.org/)*
