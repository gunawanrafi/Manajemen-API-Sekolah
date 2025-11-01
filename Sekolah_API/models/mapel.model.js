module.exports = (sequelize, DataTypes) => {
  const Mapel = sequelize.define('Mapel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    kode_mapel: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    nama_mapel: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    kkm: {
      type: DataTypes.INTEGER,
      defaultValue: 75
    }
  }, {
    tableName: 'mapel',
    timestamps: true
  });
  return Mapel;
};