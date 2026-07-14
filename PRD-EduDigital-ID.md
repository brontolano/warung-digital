# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Platform EduDigital ID — Sistem Manajemen Pembelajaran Digital

**Versi:** 1.0  
**Status:** Draf  
**Audiens:** Developer, Product Manager, Stakeholder Pendidikan  

---

## DAFTAR ISI

1. Ringkasan Eksekutif
2. Visi & Misi Produk
3. Model Bisnis
4. Persona & Peran Pengguna
5. Fitur Fungsional (Modul)
6. Spesifikasi Data
7. Spesifikasi Teknis
8. Perspektif Pendidikan
9. Alur Pengguna (User Flow)
10. Prioritas & Roadmap
11. Metrik Kesuksesan

---

## 1. RINGKASAN EKSEKUTIF

**EduDigital ID** adalah platform Learning Management System (LMS) berbasis web yang dirancang khusus untuk institusi pendidikan di Indonesia — mulai dari sekolah dasar hingga universitas, serta lembaga kursus non-formal. Platform ini menjembatani guru, siswa, dan orang tua dalam satu ekosistem belajar digital yang terintegrasi.

**Tujuan utama:**
- Mendigitalisasi proses belajar-mengajar
- Menyediakan konten kurikulum yang sesuai standar nasional
- Memberikan analitik perkembangan siswa secara real-time
- Mendukung pembelajaran jarak jauh (PJJ) dan hybrid

---

## 2. VISI & MISI PRODUK

**Visi:** Menjadi platform pendidikan digital nomor satu di Indonesia yang merata dan terjangkau.

**Misi:**
- Demokratisasi akses pendidikan berkualitas
- Memberdayakan guru dengan alat bantu ajar digital
- Melibatkan orang tua dalam proses belajar siswa
- Menyediakan data intelijen pendidikan untuk pengambilan keputusan

---

## 3. MODEL BISNIS

### 3.1 Segmen Pelanggan

| Segmen | Deskripsi |
|--------|-----------|
| **B2B Institusi** | Sekolah negeri/swasta, madrasah, universitas, lembaga kursus |
| **B2C Individu** | Siswa homeschooling, orang tua, tutor independent |
| **B2G Pemerintah** | Dinas Pendidikan, program Kemdikbudristek |

### 3.2 Sumber Pendapatan (Revenue Streams)

1. **Langganan Institusi** (Bulanan/Tahunan)
   - Tier Dasar: Rp 500rb/bln — hingga 100 pengguna
   - Tier Pro: Rp 2jt/bln — hingga 1000 pengguna
   - Tier Enterprise: Rp 5jt/bln — pengguna tak terbatas

2. **Marketplace Konten**
   - Komisi 20% dari penjualan modul/RPP oleh guru kreator
   - Paket soal ujian siap pakai

3. **Premium Fitur Tambahan**
   - Cetak rapor/laporan kustom
   - Analitik lanjutan (prediksi nilai, deteksi resiko drop-out)
   - Integrasi dengan sistem pihak ketiga (SIAKAD, Dapodik)

4. **Pelatihan & Sertifikasi Guru**
   - Workshop digitalisasi pengajaran
   - Sertifikasi penggunaan platform

### 3.3 Struktur Biaya (Cost Structure)

- Infrastruktur cloud (Google Cloud / AWS)
- Tim engineer (full-stack, devops, mobile)
- Tim konten & kurikulum
- Marketing & sales
- Server CDN untuk konten video

---

## 4. PERSONA & PERAN PENGGUNA

### 4.1 Role Definitions

| Role | Hak Akses Utama |
|------|----------------|
| **Super Admin** | Seluruh sistem, konfigurasi, billing |
| **Admin Sekolah** | Kelola guru, siswa, kelas, jadwal |
| **Guru / Pengajar** | Buat kelas, upload materi, beri tugas, nilai |
| **Siswa** | Akses materi, kumpulkan tugas, lihat nilai |
| **Orang Tua / Wali** | Pantau progres anak, terima laporan |
| **Kreator Konten** | Upload & jual modul di marketplace |

### 4.2 User Stories

**Sebagai Guru:**
- Saya ingin membuat kelas virtual dan mengundang siswa dengan kode akses
- Saya ingin mengupload materi dalam format PDF, video, dokumen, dan quiz interaktif
- Saya ingin memberikan tugas dan penilaian otomatis untuk soal pilihan ganda
- Saya ingin melihat dashboard progres setiap siswa

**Sebagai Siswa:**
- Saya ingin mengakses materi pelajaran kapan saja, di mana saja
- Saya ingin mengerjakan quiz dan melihat skor langsung
- Saya ingin melihat jadwal tugas yang akan datang
- Saya ingin berdiskusi dengan teman sekelas di forum

**Sebagai Orang Tua:**
- Saya ingin melihat nilai dan kehadiran anak saya
- Saya ingin mendapat notifikasi jika nilai anak turun drastis
- Saya ingin berkomunikasi dengan guru wali kelas

**Sebagai Admin Sekolah:**
- Saya ingin mengimpor data siswa dari Excel/Dapodik
- Saya ingin mengatur tahun ajaran dan semester
- Saya ingin melihat laporan keseluruhan sekolah
- Saya ingin mengelola tagihan langganan

---

## 5. FITUR FUNGSIONAL (MODUL)

### MODUL A: MANAJEMEN AKUN & AUTH

| ID | Fitur | Prioritas | Keterangan |
|----|-------|-----------|------------|
| A-01 | Registrasi multi-role | P0 | Daftar sebagai guru/siswa/orang tua dengan verifikasi email |
| A-02 | Login SSO (Google, Microsoft) | P1 | Single Sign-On untuk kemudahan akses |
| A-03 | Manajemen profil | P0 | Edit foto, bio, password, no HP |
| A-04 | Verifikasi institusi | P0 | Admin sekolah diverifikasi dengan dokumen legal |
| A-05 | Lupa/reset password | P0 | Flow reset via email/OTP WA |
| A-06 | Multi-level role permission | P0 | RBAC (Role Based Access Control) |

### MODUL B: MANAJEMEN INSTITUSI & KELAS

| ID | Fitur | Prioritas | Keterangan |
|----|-------|-----------|------------|
| B-01 | Dashboard admin sekolah | P0 | Overview jumlah guru, siswa, kelas aktif |
| B-02 | Manajemen tahun ajaran & semester | P0 | Kalender akademik fleksibel |
| B-03 | Buat/kelola kelas | P0 | Kelas dengan guru pengampu, mapel, jadwal |
| B-04 | Import siswa (Excel/Dapodik) | P1 | Upload file Excel atau koneksi Dapodik |
| B-05 | Generate kode akses kelas | P0 | Kode unik 6 digit per kelas |
| B-06 | Manajemen mata pelajaran | P0 | Kurikulum merdeka, K13, atau kustom |
| B-07 | Multi-kelas per guru | P0 | Satu guru bisa handle banyak kelas |

### MODUL C: KONTEN PEMBELAJARAN

| ID | Fitur | Prioritas | Keterangan |
|----|-------|-----------|------------|
| C-01 | Upload materi (PDF, video, doc, image) | P0 | Drag & drop upload, auto-convert |
| C-02 | Video streaming | P0 | Player bawaan dengan subtitle |
| C-03 | Modul interaktif (H5P) | P1 | Drag-and-drop, flashcard, timeline |
| C-04 | Embed YouTube/Vimeo | P1 | Link eksternal video |
| C-05 | Organisasi materi per bab/topik | P0 | Tree view folder struktur |
| C-06 | Tandai selesai (progress tracking) | P0 | Centang otomatis ketika materi dibuka |
| C-07 | Marketplace konten | P2 | Jual-beli modul antar guru |
| C-08 | Konten sesuai kurikulum nasional | P0 | Tag kurikulum merdeka / K13 / IKM |

### MODUL D: TUGAS & PENILAIAN

| ID | Fitur | Prioritas | Keterangan |
|----|-------|-----------|------------|
| D-01 | Buat tugas (essay, file upload) | P0 | Tugas dengan deadline, bobot nilai |
| D-02 | Quiz otomatis (PG, benar-salah, menjodohkan) | P0 | Koreksi otomatis, timer |
| D-03 | Bank soal | P1 | Kumpulan soal reusable per guru |
| D-04 | Randomisasi soal per siswa | P1 | Soal diacak untuk cegah kecurangan |
| D-05 | Penilaian manual + rubrik | P0 | Guru nilai essay dengan rubrik |
| D-06 | Rekap nilai per siswa & per kelas | P0 | Tabel nilai dengan grafik |
| D-07 | Export nilai (Excel, PDF rapor) | P1 | Download rapor format Dikdasmen |
| D-08 | Analitik butir soal | P2 | Analisis tingkat kesulitan, daya beda |

### MODUL E: ABSENSI & KEHADIRAN

| ID | Fitur | Prioritas | Keterangan |
|----|-------|-----------|------------|
| E-01 | Absensi manual oleh guru | P0 | Hadir/sakit/izin/alpha |
| E-02 | Absensi QR Code | P1 | Siswa scan QR guru untuk absen |
| E-03 | Absensi geo-location | P2 | Absen berdasarkan lokasi GPS |
| E-04 | Rekap kehadiran | P0 | Grafik kehadiran per siswa/bulan |
| E-05 | Notifikasi orang tua jika bolos | P1 | Auto-notifikasi ke akun orang tua |

### MODUL F: DISKUSI & KOLABORASI

| ID | Fitur | Prioritas | Keterangan |
|----|-------|-----------|------------|
| F-01 | Forum diskusi per kelas | P1 | Thread diskusi, reply, mention |
| F-02 | Chat real-time guru-siswa | P2 | Chat pribadi tanpa nomor WA |
| F-03 | Pengumuman kelas | P0 | Notifikasi broadcast ke anggota kelas |
| F-04 | Komentar di tugas/materi | P1 | Feedback langsung dari guru |
| F-05 | Group chat per kelas | P2 | Grup diskusi kolektif |

### MODUL G: LAPORAN & ANALITIK

| ID | Fitur | Prioritas | Keterangan |
|----|-------|-----------|------------|
| G-01 | Dashboard guru | P0 | Rata-rata kelas, tugas belum dinilai, trending |
| G-02 | Dashboard siswa | P0 | Nilai terbaru, tugas pending, jadwal |
| G-03 | Dashboard orang tua | P1 | Progres anak, peringatan, laporan mingguan |
| G-04 | Laporan perkembangan per siswa | P0 | Grafik batang/line peningkatan nilai |
| G-05 | Cetak rapor digital | P1 | PDF rapor siap cetak |
| G-06 | Analitik tingkat sekolah | P1 | Perbandingan kelas, tren semester |
| G-07 | Prediksi risiko gagal | P2 | ML model deteksi siswa berisiko drop-out |
| G-08 | Export data (CSV, PDF, Excel) | P0 | Semua tabel bisa di-download |

### MODUL H: NOTIFIKASI & KOMUNIKASI

| ID | Fitur | Prioritas | Keterangan |
|----|-------|-----------|------------|
| H-01 | Notifikasi in-app | P0 | Bell icon + daftar notifikasi |
| H-02 | Email notifikasi | P1 | Tugas baru, deadline, pengumuman |
| H-03 | WhatsApp gateway | P2 | Notifikasi via WA untuk orang tua |
| H-04 | Push notification mobile | P2 | Untuk versi mobile app |
| H-05 | Kalender akademik terintegrasi | P1 | Google Calendar sync |

### MODUL I: MARKETPLACE KONTEN

| ID | Fitur | Prioritas | Keterangan |
|----|-------|-----------|------------|
| I-01 | Toko modul & RPP | P2 | Guru kreator jual modul |
| I-02 | Rating & review konten | P2 | Bintang 1-5, ulasan |
| I-03 | Wallet kreator | P2 | Saldo penjualan, tarik tunai |
| I-04 | Kategorisasi konten | P2 | Filter mapel, kelas, kurikulum |
| I-05 | Preview gratis | P2 | 3 halaman pertama gratis |

### MODUL J: SISTEM ADMIN & KONFIGURASI

| ID | Fitur | Prioritas | Keterangan |
|----|-------|-----------|------------|
| J-01 | Manajemen pengguna (CRUD) | P0 | Super admin kelola seluruh akun |
| J-02 | Log aktivitas (audit trail) | P1 | Siapa melakukan apa, kapan |
| J-03 | Konfigurasi sistem | P0 | Branding sekolah, logo, warna |
| J-04 | Manajemen langganan & billing | P1 | Tagihan, invoice, status pembayaran |
| J-05 | Backup & restore | P0 | Backup database harian otomatis |
| J-06 | Log error & monitoring | P1 | Sentry / custom logging |

---

## 6. SPESIFIKASI DATA

### 6.1 Entity Relationship (Entitas Utama)

```
users
├── id (UUID, PK)
├── email (unique)
├── password_hash
├── full_name
├── role (enum: super_admin, admin_sekolah, guru, siswa, orang_tua, kreator)
├── phone
├── avatar_url
├── is_verified
├── institution_id (FK -> institutions)
├── created_at
├── updated_at
└── deleted_at (soft delete)

institutions
├── id (UUID, PK)
├── name
├── type (enum: sd, smp, sma, smk, universitas, kursus)
├── npsn (nomor pokok sekolah nasional)
├── address
├── subscription_tier (enum: dasar, pro, enterprise)
├── subscription_expiry
├── is_verified
├── logo_url
├── created_at
└── updated_at

classes
├── id (UUID, PK)
├── institution_id (FK -> institutions)
├── name (ex: VII-A, XI IPA 1)
├── grade_level
├── academic_year
├── semester
├── access_code (6 digit)
├── homeroom_teacher_id (FK -> users)
├── is_active
├── created_at
└── updated_at

class_enrollments
├── id (UUID, PK)
├── class_id (FK -> classes)
├── user_id (FK -> users) -> role = siswa
├── student_id_number (NIS/NISN)
├── joined_at
└── is_active

subjects
├── id (UUID, PK)
├── institution_id (FK -> institutions)
├── name
├── code
├── curriculum (enum: merdeka, k13, kustom)
├── description
└── created_at

class_subjects
├── id (UUID, PK)
├── class_id (FK -> classes)
├── subject_id (FK -> subjects)
├── teacher_id (FK -> users) -> role = guru
└── schedule (JSON: hari, jam, ruang)

course_modules
├── id (UUID, PK)
├── class_subject_id (FK -> class_subjects)
├── title
├── description
├── order_index
├── is_published
├── created_at
└── updated_at

materials
├── id (UUID, PK)
├── module_id (FK -> course_modules)
├── title
├── type (enum: pdf, video, doc, image, h5p, link, text)
├── content_url / content_body
├── file_size
├── duration_seconds (untuk video)
├── is_free_preview
├── order_index
├── created_at
└── updated_at

material_progress
├── id (UUID, PK)
├── user_id (FK -> users) -> siswa
├── material_id (FK -> materials)
├── is_completed
├── completed_at
└── time_spent_seconds

assignments
├── id (UUID, PK)
├── class_subject_id (FK -> class_subjects)
├── title
├── description
├── type (enum: essay, file, quiz, project)
├── max_score
├── due_date
├── is_published
├── duration_minutes (khusus quiz)
├── shuffle_questions
├── created_at
└── updated_at

assignment_submissions
├── id (UUID, PK)
├── assignment_id (FK -> assignments)
├── student_id (FK -> users)
├── file_url / answer_body
├── score
├── feedback (text)
├── graded_by (FK -> users)
├── graded_at
├── is_late
├── submitted_at
└── status (enum: submitted, graded, returned)

question_bank
├── id (UUID, PK)
├── subject_id (FK -> subjects)
├── created_by (FK -> users)
├── question_type (enum: pg, benar_salah, menjodohkan, essay)
├── question_body (rich text)
├── options (JSON array)
├── correct_answer
├── difficulty (enum: mudah, sedang, sulit)
├── tags (JSON array)
└── created_at

quiz_questions (pivot assignment + question bank)
├── id (UUID, PK)
├── assignment_id (FK -> assignments)
├── question_id (FK -> question_bank)
├── order_index
└── points

quiz_answers
├── id (UUID, PK)
├── quiz_question_id (FK -> quiz_questions)
├── student_id (FK -> users)
├── answer (JSON)
├── is_correct
├── score_earned
└── answered_at

attendance
├── id (UUID, PK)
├── class_subject_id (FK -> class_subjects)
├── student_id (FK -> users)
├── date
├── status (enum: hadir, sakit, izin, alpha)
├── recorded_by (FK -> users) -> guru
├── meeting_number
├── notes
├── created_at
└── latitude/longitude (opsional)

forum_posts
├── id (UUID, PK)
├── class_id (FK -> classes)
├── author_id (FK -> users)
├── title
├── body (rich text)
├── is_pinned
├── created_at
├── updated_at
└── deleted_at

forum_replies
├── id (UUID, PK)
├── post_id (FK -> forum_posts)
├── author_id (FK -> users)
├── body
├── parent_id (FK -> forum_replies) — nested reply
├── created_at
└── deleted_at

announcements
├── id (UUID, PK)
├── class_id / institution_id
├── author_id (FK -> users)
├── title
├── body
├── priority (enum: info, penting, darurat)
├── created_at
└── expires_at

marketplace_products
├── id (UUID, PK)
├── creator_id (FK -> users) -> kreator
├── title
├── description
├── subject_id (FK -> subjects)
├── grade_level
├── price
├── preview_url
├── file_url
├── rating_avg
├── total_sold
├── status (enum: draft, published, archived)
├── created_at
└── updated_at

notifications
├── id (UUID, PK)
├── user_id (FK -> users)
├── type (enum: tugas, nilai, absen, pengumuman, system)
├── title
├── body
├── is_read
├── reference_type
├── reference_id
├── created_at
└── read_at

audit_logs
├── id (UUID, PK)
├── user_id (FK -> users)
├── action
├── entity_type
├── entity_id
├── old_value (JSON)
├── new_value (JSON)
├── ip_address
├── user_agent
└── created_at
```

### 6.2 Relasi Kunci

```
institutions 1──N users
institutions 1──N classes
institutions 1──N subjects
classes 1──N class_enrollments
classes 1──N class_subjects
class_subjects 1──N course_modules
course_modules 1──N materials
class_subjects 1──N assignments
assignments 1──N assignment_submissions
assignments N──M question_bank (via quiz_questions)
users N──M classes (via class_enrollments)
```

---

## 7. SPESIFIKASI TEKNIS

### 7.1 Tech Stack Rekomendasi

| Lapisan | Teknologi | Alasan |
|---------|-----------|--------|
| **Frontend Web** | Next.js 14 + TypeScript + Tailwind CSS | SSR, SEO, performa tinggi |
| **Mobile** | Flutter / React Native | Cross-platform, satu basis kode |
| **Backend API** | Node.js (NestJS) atau Python (FastAPI) | RESTful + WebSocket untuk chat real-time |
| **Database** | PostgreSQL (Supabase / Cloud SQL) | Relasional, mendukung JSON, performa baik |
| **Storage** | Google Cloud Storage / AWS S3 | Upload file, video streaming, CDN |
| **Auth** | Supabase Auth / NextAuth.js | SSO, role management built-in |
| **Caching** | Redis | Session cache, queue notifikasi |
| **Search** | Elasticsearch / Meilisearch | Pencarian konten, forum, marketplace |
| **Realtime** | WebSocket / Supabase Realtime | Chat, notifikasi live |
| **Queue** | Bull / RabbitMQ | Email, notifikasi, export laporan async |
| **Video** | Mux / Cloudflare Stream | Streaming video, subtitle, thumbnail |
| **Analytics** | Mixpanel / PostHog | Event tracking, user behavior |
| **Monitoring** | Sentry + Grafana | Error tracking, server metrics |

### 7.2 Arsitektur Sistem

```
[Client Web (Next.js)]     [Client Mobile (Flutter)]
         |                           |
    [CDN / CloudFront]         [API Gateway / Load Balancer]
         |                           |
    [Next.js SSR]             [Backend API (NestJS/FastAPI)]
         |                           |
    [Redis Cache] <---------> [PostgreSQL Database]
         |                           |
    [Job Queue]               [Object Storage (S3/GCS)]
         |                           |
    [Email/SMS/WA Service]    [Video Processing (Mux)]
```

### 7.3 Keamanan

- **Autentikasi**: JWT dengan refresh token, expiry 24 jam
- **RBAC**: Middleware di setiap endpoint backend
- **Enkripsi**: HTTPS mandatory, bcrypt untuk password
- **File Upload**: Validasi tipe file, virus scan, rate limit
- **SQL Injection**: Prepared statements / ORM
- **XSS & CSRF**: Sanitasi input, CSRF token
- **Rate Limiting**: 100 req/min per user, 1000 req/min per IP
- **GDPR/UU PDP**: Cookie consent, data deletion request, export data pribadi
- **Backup**: Full DB backup harian, point-in-time recovery

### 7.4 Performa

- **Page load**: < 2 detik (First Contentful Paint)
- **API response**: < 200ms (p95)
- **Concurrent users**: Mendukung 10.000 concurrent per instance
- **Upload file**: Maks 200MB per file, dengan chunked upload
- **Streaming video**: Adaptive bitrate HLS
- **Database**: Index pada kolom foreign key dan sering di-query
- **CDN**: Semua asset statis dan video melalui CDN

### 7.5 Skalabilitas

- **Horizontal scaling**: Backend stateless, bisa di-replicate horizontal
- **Database read replica**: Untuk laporan dan dashboard berat
- **Microservices**: Pisah service notifikasi, email, dan video processing
- **Caching layer**: Redis untuk session, query cache, rate limiter
- **Queue system**: Semua tugas berat (export, email blast) via queue

---

## 8. PERSPEKTIF PENDIDIKAN

### 8.1 Pedagogical Framework

Platform ini dibangun di atas prinsip pedagogi modern:

1. **Pembelajaran Mandiri (Self-Paced)**
   - Siswa dapat mengakses materi kapan saja
   - Progress tracking memungkinkan siswa belajar sesuai ritme sendiri
   - Fitur "tandai selesai" memberikan sense of accomplishment

2. **Pembelajaran Berbasis Kompetensi**
   - Setiap modul memiliki Capaian Pembelajaran (CP) yang jelas
   - Tujuan Pembelajaran (TP) di setiap pertemuan
   - Alur Tujuan Pembelajaran (ATP) terstruktur per semester

3. **Asesmen Formatif & Sumatif**
   - Formatif: Quiz singkat setiap akhir bab
   - Sumatif: Ujian tengah semester dan akhir semester
   - Remedial: Siswa yang tidak tuntas bisa mengulang

4. **Differentiated Instruction**
   - Guru dapat memberikan materi berbeda per siswa
   - Soal dengan tingkat kesulitan berbeda dalam satu kelas
   - Konten pengayaan untuk siswa cepat, remedial untuk siswa lambat

### 8.2 Kurikulum yang Didukung

| Kurikulum | Dukungan |
|-----------|----------|
| Kurikulum Merdeka | CP, TP, ATP, P5, rapor format baru |
| K-13 (2013) | KI, KD, silabus, KKM |
| Kurikulum Kustom | Fleksibel untuk lembaga non-formal |
| Internasional | Cambridge IB (ekspansi ke-2) |

### 8.3 Fitur Khusus Pendidikan Indonesia

- **Dapodik Integration**: Sinkron data siswa & guru dari database kemendikbud
- **NISN/NPSN**: Validasi nomor induk siswa nasional dan nomor pokok sekolah
- **Rapor Digital**: Format sesuai Juknis Kemdikbudristek
- **P5 Project**: Manajemen Projek Penguatan Profil Pelajar Pancasila
- **KKM**: Kriteria Ketuntasan Minimal per mata pelajaran
- **Ekstrakurikuler**: Manajemen kegiatan non-akademik

---

## 9. ALUR PENGGUNA (USER FLOW)

### 9.1 Flow: Registrasi & Setup Sekolah

```
[Admin Sekolah Daftar]
    → Verifikasi email
    → Isi data sekolah (NPSN, alamat, logo)
    → Verifikasi dokumen (oleh Super Admin)
    → Pilih paket langganan (dapat trial 14 hari)
    → Dashboard Admin terbuka
    → Import data guru (manual / undangan email)
    → Import data siswa (Excel / Dapodik)
    → Buat tahun ajaran & kelas
    → Assign guru ke mata pelajaran & kelas
    → Kelas siap digunakan
```

### 9.2 Flow: Guru Mengajar

```
[Guru Login]
    → Dashboard: lihat kelas yang diampu
    → Pilih kelas → lihat daftar siswa
    → Buat modul/materi baru
    → Upload materi (PDF, video, link)
    → Buat tugas/quiz
    → Atur deadline dan bobot
    → Kirim pengumuman ke kelas
    → Nilai tugas yang masuk
    → Lihat rekap nilai & absensi
    → Download laporan
```

### 9.3 Flow: Siswa Belajar

```
[Siswa Login]
    → Dashboard: lihat tugas pending & materi baru
    → Masuk kelas → pilih modul
    → Baca materi / tonton video
    → Tandai selesai
    → Kerjakan tugas / quiz
    → Upload file jawaban
    → Lihat nilai & feedback
    → Diskusi di forum kelas
    → Lihat jadwal & kalender akademik
```

### 9.4 Flow: Orang Tua Monitoring

```
[Orang Tua Login]
    → Dashboard: lihat anak terdaftar
    → Pilih anak → lihat:
        • Rata-rata nilai & tren
        • Kehadiran (grafik)
        • Tugas mendatang & terlambat
        • Pengumuman kelas
    → Notifikasi jika nilai drop atau absen mencurigakan
    → Download laporan perkembangan
```

---

## 10. PRIORITAS & ROADMAP

### Phase 1 (MVP) — Estimasi 3 Bulan

**Fokus**: LMS dasar berfungsi untuk 1 sekolah

| Modul | Fitur |
|-------|-------|
| A | Registrasi, login, role dasar, profil |
| B | Manajemen kelas, tahun ajaran, import siswa (Excel) |
| C | Upload materi, video embed, organisasi folder |
| D | Tugas essay/file, quiz PG otomatis, rekap nilai |
| E | Absensi manual, rekap kehadiran |
| G | Dashboard guru & siswa |
| H | Notifikasi in-app |
| J | Manajemen user, konfigurasi branding |

### Phase 2 (Growth) — Estimasi 2 Bulan

**Fokus**: Kolaborasi & analitik

| Modul | Fitur |
|-------|-------|
| A | SSO Google/Microsoft |
| B | Import Dapodik, multi-kelas |
| C | H5P interaktif |
| D | Bank soal, randomisasi, rubrik, export rapor |
| F | Forum diskusi, komentar tugas |
| G | Dashboard orang tua, cetak rapor |
| H | Email notifikasi, kalender akademik |
| J | Audit trail, backup otomatis |

### Phase 3 (Scale) — Estimasi 3 Bulan

**Fokus**: Monetisasi & advanced features

| Modul | Fitur |
|-------|-------|
| C | Marketplace konten |
| D | Analitik butir soal |
| E | QR Code absensi, geo-location |
| F | Chat real-time, group chat |
| G | Prediksi risiko, analitik sekolah |
| H | WA gateway, push notification mobile |
| I | Marketplace penuh (wallet, rating, kategorisasi) |
| J | Billing & subscription management |

### Phase 4 (Ecosystem) — Estimasi 2+ Bulan

**Fokus**: Ekspansi & integrasi

- Aplikasi mobile (Flutter)
- Integrasi SIAKAD perguruan tinggi
- Integrasi dengan Zoom/Google Meet
- AI-powered recommendation (rekomendasi materi)
- Adaptive learning pathway
- Gamification (badge, leaderboard, poin)
- Offline mode (PWA + service worker)

---

## 11. METRIK KESUKSESAN

### 11.1 Business Metrics

| Metrik | Target (Year 1) | Cara Ukur |
|--------|-----------------|-----------|
| Jumlah institusi aktif | 500+ | Database |
| Jumlah pengguna aktif (MAU) | 50.000+ | Analytics |
| Retention rate institusi | >85% | Subscription renewal |
| Rata-rata rating platform | >4.5/5 | Survey in-app |
| Revenue bulanan (MRR) | Rp 500jt+ | Payment system |

### 11.2 Engagement Metrics

| Metrik | Target |
|--------|--------|
| DAU/MAU ratio | >40% |
| Rata-rata sesi per hari | >25 menit |
| Tugas diselesaikan tepat waktu | >70% |
| Materi yang diakses per minggu | >5 per siswa |
| Partisipasi forum | >30% siswa posting minimal 1x/minggu |

### 11.3 Technical Metrics

| Metrik | Target |
|--------|--------|
| Uptime (SLA) | >99.9% |
| API response time (p95) | <200ms |
| Page load time | <2 detik |
| Crash-free rate | >99.5% |
| CSAT (Customer Satisfaction) | >90% |

---

## LAMPIRAN

### A. Glossary

| Istilah | Definisi |
|---------|----------|
| **CP** | Capaian Pembelajaran — kompetensi yang harus dicapai siswa di akhir fase |
| **TP** | Tujuan Pembelajaran — target spesifik per pertemuan |
| **ATP** | Alur Tujuan Pembelajaran — urutan TP selama satu semester |
| **P5** | Projek Penguatan Profil Pelajar Pancasila |
| **KKM** | Kriteria Ketuntasan Minimal — nilai minimum untuk dianggap tuntas |
| **Dapodik** | Data Pokok Pendidikan — database nasional siswa & sekolah |
| **NPSN** | Nomor Pokok Sekolah Nasional |
| **NISN** | Nomor Induk Siswa Nasional |
| **RPP** | Rencana Pelaksanaan Pembelajaran |
| **RBAC** | Role Based Access Control |
| **SSO** | Single Sign-On |
| **JWT** | JSON Web Token |
| **MVP** | Minimum Viable Product |
| **SLA** | Service Level Agreement |
| **MAU/DAU** | Monthly/Daily Active Users |
| **MRR** | Monthly Recurring Revenue |

### B. Asumsi & Dependensi

1. **Koneksi Internet**: Target utama adalah sekolah dengan akses internet stabil (perkotaan). Untuk daerah 3T, disediakan mode offline/lite.
2. **Perangkat**: Siswa dan guru menggunakan smartphone Android (minimum) sebagai perangkat utama.
3. **Literasi Digital**: Diasumsikan guru memiliki literasi digital dasar. Pelatihan disediakan di phase 1.
4. **Regulasi**: Produk harus mematuhi UU PDP Indonesia, UU ITE, dan peraturan Kemdikbudristek.
5. **Pembayaran**: Menggunakan midtrans/Xendit untuk payment gateway.

### C. Batasan (Constraints)

1. **Budget**: Development phase 1 dengan tim kecil (3-5 engineer).
2. **Timeline**: MVP harus siap dalam 3 bulan.
3. **Hosting**: Prioritas menggunakan infrastruktur Indonesia (Google Cloud Jakarta / AWS Jakarta) untuk kepatuhan data residency.
4. **Bandwidth**: Video streaming dioptimalkan untuk koneksi menengah (2-5 Mbps).
5. **Regulasi Konten**: Semua konten pendidikan harus sesuai standar nasional.

---

**Dokumen ini disusun untuk panduan pengembangan platform EduDigital ID.  
Setiap perubahan pada dokumen ini harus melalui change request dan disetujui oleh Product Manager.**

---
*PRD v1.0 — Dirilis: 14 Juli 2026*
