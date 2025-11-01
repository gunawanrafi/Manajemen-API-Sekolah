# SIAKAD - Sistem Informasi Akademik

Aplikasi manajemen akademik sederhana yang dibangun dengan React.js untuk frontend dan Node.js (Express) untuk backend.

## Struktur Proyek

Proyek ini terdiri dari dua bagian utama:
- `Sekolah_FE/` - Frontend React.js
- `Sekolah_API/` - Backend Node.js/Express

## Prasyarat

Sebelum menjalankan aplikasi, pastikan sistem Anda memiliki:
- Node.js (v14 atau lebih baru)
- npm (Node Package Manager)
- SQLite

## Cara Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/gunawanrafi/Tugas-Cloud-Computing.git
cd Tugas-Cloud-Computing
```

### 2. Setup Backend
```bash
# Masuk ke direktori backend
cd Sekolah_API

# Install dependencies
npm install

# Jalankan server
npm start
```
Server akan berjalan di `http://localhost:5000`

### 3. Setup Frontend
```bash
# Buka terminal baru
# Masuk ke direktori frontend
cd Sekolah_FE

# Install dependencies
npm install

# Jalankan aplikasi
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`

## Fitur Aplikasi

1. **Manajemen Siswa**
   - Tambah, edit, hapus data siswa
   - Lihat daftar siswa

2. **Manajemen Guru**
   - Tambah, edit, hapus data guru
   - Lihat daftar guru

3. **Manajemen Mata Pelajaran**
   - Tambah, edit, hapus mata pelajaran
   - Pengaturan KKM

4. **Manajemen Nilai**
   - Input nilai siswa
   - Lihat status kelulusan berdasarkan KKM
   - Edit dan hapus nilai

## Struktur Database

Aplikasi menggunakan SQLite dengan struktur tabel:

1. **Siswa**
   - id (Primary Key)
   - nis
   - nama_lengkap
   - kelas
   - alamat

2. **Guru**
   - id (Primary Key)
   - nip
   - nama_lengkap
   - mata_pelajaran
   - alamat

3. **Mapel (Mata Pelajaran)**
   - id (Primary Key)
   - kode_mapel
   - nama_mapel
   - kkm

4. **Nilai**
   - id (Primary Key)
   - siswa_id (Foreign Key)
   - mapel_id (Foreign Key)
   - nilai_angka
   - tipe_ujian

## API Endpoints

### Siswa
- GET `/api/siswa` - Ambil semua data siswa
- POST `/api/siswa` - Tambah siswa baru
- PUT `/api/siswa/:id` - Update data siswa
- DELETE `/api/siswa/:id` - Hapus data siswa

### Guru
- GET `/api/guru` - Ambil semua data guru
- POST `/api/guru` - Tambah guru baru
- PUT `/api/guru/:id` - Update data guru
- DELETE `/api/guru/:id` - Hapus data guru

### Mata Pelajaran
- GET `/api/mapel` - Ambil semua mata pelajaran
- POST `/api/mapel` - Tambah mata pelajaran baru
- PUT `/api/mapel/:id` - Update mata pelajaran
- DELETE `/api/mapel/:id` - Hapus mata pelajaran

### Nilai
- GET `/api/nilai` - Ambil semua nilai
- POST `/api/nilai` - Tambah nilai baru
- PUT `/api/nilai/:id` - Update nilai
- DELETE `/api/nilai/:id` - Hapus nilai

## Troubleshooting

1. **Server Error**
   - Pastikan port 5000 tidak digunakan oleh aplikasi lain
   - Periksa koneksi database
   - Periksa log error di console

2. **Frontend Error**
   - Pastikan backend server berjalan
   - Periksa console browser untuk error
   - Pastikan semua dependencies terinstall

## Kontribusi

Jika ingin berkontribusi, silakan:
1. Fork repository
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi

[MIT License](LICENSE)