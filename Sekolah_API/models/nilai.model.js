module.exports = (sequelize, DataTypes) => {
  const Nilai = sequelize.define('Nilai', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipe_ujian: {
      type: DataTypes.STRING, // "UTS", "UAS", "Tugas"
      allowNull: false
    },
    nilai_angka: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
    // Kolom 'siswa_id' dan 'mapel_id' akan dibuat otomatis oleh relasi
  }, {
    tableName: 'nilai',
    timestamps: true
  });
  return Nilai;
};