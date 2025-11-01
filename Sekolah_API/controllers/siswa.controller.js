const db = require('../models'); // Mengimpor 'models/index.js'
const Siswa = db.siswa;

// CREATE: Menambah siswa baru
exports.create = async (req, res) => {
  try {
    const data = await Siswa.create(req.body);
    res.json({ message: 'Data siswa berhasil ditambahkan', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL: Menampilkan semua siswa
exports.findAll = async (req, res) => {
  try {
    const data = await Siswa.findAll();
    res.json({ message: 'Data siswa berhasil diambil', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE: Menampilkan satu siswa berdasarkan ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Siswa.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: 'Data siswa tidak ditemukan' });
    }
    res.json({ message: 'Data siswa berhasil diambil', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE: Mengubah data siswa berdasarkan ID
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Siswa.update(req.body, { where: { id: id } });
    if (updated) {
      const data = await Siswa.findByPk(id);
      res.json({ message: 'Data siswa berhasil diperbarui', data: data });
    } else {
      res.status(404).json({ message: 'Data siswa tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Menghapus data siswa berdasarkan ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Siswa.destroy({ where: { id: id } });
    if (deleted) {
      res.json({ message: 'Data siswa berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Data siswa tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};