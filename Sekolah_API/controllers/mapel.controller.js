const db = require('../models'); // Mengimpor 'models/index.js'
const Mapel = db.mapel; // Menggunakan model Mapel

// CREATE: Menambah mapel baru
exports.create = async (req, res) => {
  try {
    const data = await Mapel.create(req.body);
    res.json({ message: 'Data mapel berhasil ditambahkan', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL: Menampilkan semua mapel
exports.findAll = async (req, res) => {
  try {
    const data = await Mapel.findAll();
    res.json({ message: 'Data mapel berhasil diambil', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE: Menampilkan satu mapel berdasarkan ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Mapel.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: 'Data mapel tidak ditemukan' });
    }
    res.json({ message: 'Data mapel berhasil diambil', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE: Mengubah data mapel berdasarkan ID
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Mapel.update(req.body, { where: { id: id } });
    if (updated) {
      const data = await Mapel.findByPk(id);
      res.json({ message: 'Data mapel berhasil diperbarui', data: data });
    } else {
      res.status(404).json({ message: 'Data mapel tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Menghapus data mapel berdasarkan ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Mapel.destroy({ where: { id: id } });
    if (deleted) {
      res.json({ message: 'Data mapel berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Data mapel tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};