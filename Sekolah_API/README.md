# 🚀 API Manajemen Sekolah - Project UTS Cloud Computing

Ini adalah repositori untuk **Proyek 1 Mata Kuliah Cloud Computing**.

Aplikasi ini merupakan **API web sederhana** yang dibangun menggunakan **Node.js**, **Express**, dan **Sequelize**.  
Proyek ini mengimplementasikan fungsi **CRUD (Create, Read, Update, Delete)** untuk mengelola data sekolah, mencakup:

- 👨‍🎓 Manajemen Siswa  
- 👩‍🏫 Manajemen Guru  
- 📘 Manajemen Mata Pelajaran  
- 🧮 Manajemen Nilai  

Aplikasi ini dijalankan secara **lokal di Virtual Machine (VM)** sebagai **aplikasi Monolithic** dengan database **SQL (SQLite)**.

---

## 🛠️ Teknologi yang Digunakan

| Komponen | Teknologi |
|-----------|------------|
| **Backend** | Node.js |
| **Framework** | Express.js |
| **Database** | SQL (SQLite) |
| **ORM** | Sequelize |
| **Deployment Target** | Virtual Machine (Monolithic) |

---

## ⚙️ Panduan Deployment (Menjalankan di VM)

Berikut langkah-langkah untuk menjalankan proyek ini di dalam **Virtual Machine (Ubuntu Server)**.

### 1 Instalasi Prasyarat

Pastikan VM kamu sudah memiliki `git`, `nodejs`, dan `npm`.  
Jika belum, jalankan perintah berikut di terminal:

```bash
sudo apt update
sudo apt install git nodejs npm
```

### 2 Clone repository
```bash
https://github.com/gunawanrafi/Tugas-Cloud-Computing.git
```
### 3 Masuk ke Direktori Proyel
```bash
cd Tugas-Cloud-Computing
```
### 4 Install Dependensi
```bash
npm install
```
### 5 Jalankan Aplikasi 
```bash
node index.js
```

## 📡 Daftar Endpoint API

### 🧍‍♂️ Manajemen Siswa

| Method | Endpoint | Deskripsi |
|---------|-----------|------------|
| **POST** | `/api/siswa` | Membuat siswa baru |
| **GET** | `/api/siswa` | Melihat semua siswa |
| **GET** | `/api/siswa/:id` | Melihat satu siswa |
| **PUT** | `/api/siswa/:id` | Update data siswa |
| **DELETE** | `/api/siswa/:id` | Hapus data siswa |

---

### 👩‍🏫 Manajemen Guru

| Method | Endpoint | Deskripsi |
|---------|-----------|------------|
| **POST** | `/api/guru` | Membuat guru baru |
| **GET** | `/api/guru` | Melihat semua guru |
| **GET** | `/api/guru/:id` | Melihat satu guru |
| **PUT** | `/api/guru/:id` | Update data guru |
| **DELETE** | `/api/guru/:id` | Hapus data guru |

---

### 📘 Manajemen Mata Pelajaran

| Method | Endpoint | Deskripsi |
|---------|-----------|------------|
| **POST** | `/api/mapel` | Membuat mata pelajaran baru |
| **GET** | `/api/mapel` | Melihat semua mata pelajaran |
| **GET** | `/api/mapel/:id` | Melihat satu mata pelajaran |
| **PUT** | `/api/mapel/:id` | Update data mata pelajaran |
| **DELETE** | `/api/mapel/:id` | Hapus data mata pelajaran |

---

### 🧮 Manajemen Nilai

| Method | Endpoint | Deskripsi |
|---------|-----------|------------|
| **POST** | `/api/nilai` | Input nilai baru (butuh `siswa_id` dan `mapel_id`) |
| **GET** | `/api/nilai` | Melihat semua data nilai (termasuk info siswa & mapel) |


