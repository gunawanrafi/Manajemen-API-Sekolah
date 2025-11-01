const db = require('../models');
const Nilai = db.nilai;
const Siswa = db.siswa;
const Mapel = db.mapel;
const sequelize = db.sequelize; // Add this line to import sequelize instance

// CREATE: Menambah nilai baru
exports.create = async (req, res) => {
  try {
    // Kita butuh 'siswa_id' dan 'mapel_id' di req.body
    const { siswa_id, mapel_id, tipe_ujian, nilai_angka } = req.body;

    // Cek apakah siswa dan mapel ada
    const siswa = await Siswa.findByPk(siswa_id);
    const mapel = await Mapel.findByPk(mapel_id);

    if (!siswa) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
    if (!mapel) return res.status(404).json({ message: 'Mapel tidak ditemukan' });

    // Buat data nilai
    const data = await Nilai.create({
      siswa_id,
      mapel_id,
      tipe_ujian,
      nilai_angka
    });
    res.status(201).json({ message: 'Nilai berhasil ditambahkan', data: data });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL: Menampilkan semua nilai (termasuk data siswa dan mapel)
exports.findAll = async (req, res) => {
  try {
    const data = await Nilai.findAll({
      include: [
        { 
          model: Siswa,
          attributes: ['id', 'nis', 'nama_lengkap', 'kelas'],
          required: true  // INNER JOIN
        },
        { 
          model: Mapel,
          attributes: ['id', 'kode_mapel', 'nama_mapel', 'kkm'],
          required: true  // INNER JOIN
        }
      ],
      order: [['id', 'DESC']] // Urutkan dari yang terbaru
    });
    res.json({ message: 'Data nilai berhasil diambil', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Menghapus nilai
exports.delete = async (req, res) => {
  const id = req.params.id;
  
  try {
    console.log('[DELETE] Attempting to delete nilai with ID:', id);

    // 1. Cek apakah nilai exist
    const nilai = await Nilai.findOne({
      where: { id: id },
      include: [
        { model: Siswa, attributes: ['nama_lengkap'] },
        { model: Mapel, attributes: ['nama_mapel'] }
      ]
    });
    
    if (!nilai) {
      console.log('[DELETE] Nilai not found with ID:', id);
      return res.status(404).json({
        message: `Nilai dengan ID ${id} tidak ditemukan`
      });
    }

    // Log nilai yang akan dihapus
    console.log('[DELETE] Found nilai:', {
      id: nilai.id,
      siswa: nilai.Siswa?.nama_lengkap,
      mapel: nilai.Mapel?.nama_mapel,
      nilai: nilai.nilai_angka
    });

    // 2. Hapus nilai menggunakan transaction
    await sequelize.transaction(async (t) => {
      const deleted = await Nilai.destroy({
        where: { id: id },
        transaction: t
      });

      console.log('[DELETE] Delete result:', deleted);

      if (deleted === 0) {
        throw new Error('Gagal menghapus nilai');
      }
    });

    console.log('[DELETE] Successfully deleted nilai ID:', id);
    
    // 3. Kirim response sukses
    res.json({
      success: true,
      message: "Nilai berhasil dihapus"
    });

  } catch (error) {
    console.error('[DELETE] Error:', error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus nilai: " + error.message
    });
  }
};