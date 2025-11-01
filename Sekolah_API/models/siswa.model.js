module.exports = (sequelize, DataTypes) => {
  const Siswa = sequelize.define('Siswa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nis: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    nama_lengkap: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    kelas: {
      type: DataTypes.STRING(10)
    },
    alamat: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'siswa',
    timestamps: true
  });
  return Siswa;
};