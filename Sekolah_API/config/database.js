const { Sequelize } = require('sequelize');

// Buat koneksi ke database SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sekolah.db' // Nama file database yang akan dibuat
});

module.exports = sequelize;