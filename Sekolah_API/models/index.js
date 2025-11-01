const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Impor koneksi

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Impor semua model
db.siswa = require('./siswa.model.js')(sequelize, DataTypes);
db.guru = require('./guru.model.js')(sequelize, DataTypes);
db.mapel = require('./mapel.model.js')(sequelize, DataTypes);
db.nilai = require('./nilai.model.js')(sequelize, DataTypes);

// --- Definisikan Relasi Antar Tabel ---

// Relasi 1: Siswa dan Nilai (One-to-Many)
// Satu Siswa bisa memiliki banyak Nilai
db.siswa.hasMany(db.nilai, { foreignKey: 'siswa_id' });
// Satu Nilai hanya dimiliki oleh satu Siswa
db.nilai.belongsTo(db.siswa, { foreignKey: 'siswa_id' });

// Relasi 2: Mapel dan Nilai (One-to-Many)
// Satu Mapel bisa memiliki banyak Nilai
db.mapel.hasMany(db.nilai, { foreignKey: 'mapel_id' });
// Satu Nilai hanya dimiliki oleh satu Mapel
db.nilai.belongsTo(db.mapel, { foreignKey: 'mapel_id' });

// Catatan: Guru dan Mapel/Siswa tidak kita relasikan dulu
// untuk menjaga kesederhanaan sesuai breakdown.

module.exports = db; // Ekspor db object