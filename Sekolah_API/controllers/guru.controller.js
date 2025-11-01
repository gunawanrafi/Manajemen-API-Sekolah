const db = require('../models'); // Mengimpor 'models/index.js'
const Guru = db.guru; // Menggunakan model Guru

// CREATE: Menambah guru baru
exports.create = async (req, res) => {
  try {
    const data = await Guru.create(req.body);
    res.json({ message: 'Data guru berhasil ditambahkan', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL: Menampilkan semua guru
exports.findAll = async (req, res) => {
  try {
    const data = await Guru.findAll();
    res.json({ message: 'Data guru berhasil diambil', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE: Menampilkan satu guru berdasarkan ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Guru.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: 'Data guru tidak ditemukan' });
    }
    res.json({ message: 'Data guru berhasil diambil', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE: Mengubah data guru berdasarkan ID
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Guru.update(req.body, { where: { id: id } });
    if (updated) {
      const data = await Guru.findByPk(id);
      res.json({ message: 'Data guru berhasil diperbarui', data: data });
    } else {
      res.status(4404).json({ message: 'Data guru tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Menghapus data guru berdasarkan ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Guru.destroy({ where: { id: id } });
    if (deleted) {
      res.json({ message: 'Data guru berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Data guru tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};