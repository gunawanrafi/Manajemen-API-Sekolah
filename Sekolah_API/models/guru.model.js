module.exports = (sequelize, DataTypes) => {
  const Guru = sequelize.define('Guru', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nip: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    nama_lengkap: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telepon: {
      type: DataTypes.STRING(20)
    },
    email: {
      type: DataTypes.STRING(100)
    }
  }, {
    tableName: 'guru',
    timestamps: true
  });
  return Guru;
};