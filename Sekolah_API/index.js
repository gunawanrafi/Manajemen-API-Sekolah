const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware untuk membaca body JSON
app.use(cors());
app.use(express.json());

// Sinkronisasi database
const db = require('./models'); // Mengimpor 'models/index.js'
db.sequelize.sync()
  .then(() => {
    console.log('Database berhasil disinkronkan.');
  })
  .catch((err) => {
    console.error('Gagal sinkronisasi database:', err.message);
  });

// Rute 'selamat datang' sederhana
// Rute 'selamat datang' sederhana (Landing Page HTML)
// Rute 'selamat datang' sederhana (Landing Page HTML)
app.get('/', (req, res) => {
  // Kita kirim string HTML
  res.send(`
    <style>
      body { 
        font-family: 'Arial', sans-serif; display: grid; 
        place-items: center; min-height: 90vh; 
        background-color: #f4f4f4; margin: 0;
      }
      .container { 
        text-align: center; border: 1px solid #ddd; 
        padding: 40px; border-radius: 8px; 
        background-color: #fff; 
        box-shadow: 0 4px 8px rgba(0,0,0,0.05); 
      }
      h1 { color: #333; margin-top: 0; }
      p { color: #555; font-size: 1.1rem; }
      .button-group { 
        margin-top: 25px; 
        display: flex; 
        gap: 15px; /* Memberi jarak antar tombol */
      }
      a.button { 
        display: inline-block; padding: 12px 24px; 
        text-decoration: none; border-radius: 5px; 
        font-weight: bold; color: white; 
        transition: background-color 0.2s ease;
      }
      /* Tombol Utama (Buka Postman) */
      a.button-primary { 
        background-color: #FF6C37; /* Warna oranye Postman */
      }
      a.button-primary:hover { 
        background-color: #E65A2E; 
      }
      
      /* Tombol Kedua (Unduh) */
      a.button-secondary { 
        background-color: #6c757d; /* Warna abu-abu */
      }
      a.button-secondary:hover { 
        background-color: #5a6268; 
      }
    </style>
    <div class="container">
      <h1>🚀 API Manajemen Sekolah</h1>
      <p>Server API sedang berjalan di port ${port}.</p>
      <p>Gunakan tombol di bawah untuk menguji API.</p>
      
      <div class="button-group">
        <a href="postman://" class="button button-primary">Buka Postman (Jika Terinstal)</a>
        
        <a href="https://www.postman.com/downloads/" target="_blank" class="button button-secondary">Unduh Postman</a>
      </div>
    </div>
  `);
});
// Memuat semua file routes
require('./routes/siswa.routes.js')(app);
require('./routes/guru.routes.js')(app);
require('./routes/mapel.routes.js')(app);
require('./routes/nilai.routes.js')(app);

// Menjalankan server
app.listen(port, () => {
  console.log(`Server API berjalan di http://localhost:${port}`);
});