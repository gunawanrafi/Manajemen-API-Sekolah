import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GuruPage() {
  // === STATE MANAGEMENT ===
  const [guruList, setGuruList] = useState([]);
  const [formData, setFormData] = useState({
    nip: '',
    nama_lengkap: '',
    mata_pelajaran: '',
    alamat: ''
  });
  const [currentGuru, setCurrentGuru] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const API_URL = 'http://localhost:5000/api/guru';

  // === READ: FETCH DATA ===
  const fetchGuru = async () => {
    try {
      const response = await axios.get(API_URL);
      setGuruList(response.data.data);
      setError(null);
    } catch (err) {
      setError('Gagal mengambil data guru. Silakan coba lagi.');
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchGuru();
  }, []);

  // === CREATE: TAMBAH GURU ===
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      
      // Reset form & refresh data
      setFormData({ nip: '', nama_lengkap: '', mata_pelajaran: '', alamat: '' });
      fetchGuru();
      
      // Show success message
      setSuccessMessage('Data guru berhasil ditambahkan!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setError(null);
    } catch (err) {
      if (err.response?.data?.error?.name === 'SequelizeValidationError') {
        // Handle Sequelize validation errors
        const validationErrors = err.response.data.error.errors;
        const errorMessages = validationErrors.map(e => {
          // Convert field names to readable format
          const field = e.path.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          return `${field} harus diisi`;
        });
        setError(errorMessages.join(', '));
      } else if (err.response?.data?.error?.name === 'SequelizeUniqueConstraintError') {
        setError('NIP sudah terdaftar. Gunakan NIP yang berbeda.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error.message || JSON.stringify(err.response.data.error));
      } else {
        setError('Terjadi kesalahan saat menambahkan guru.');
      }
      console.error('Error creating data:', err);
    }
  };

  // === UPDATE: EDIT GURU ===
  const handleEdit = (guru) => {
    setCurrentGuru(guru);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentGuru(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${currentGuru.id}`, currentGuru);
      
      // Reset state & refresh data
      setIsEditModalOpen(false);
      setCurrentGuru(null);
      fetchGuru();
      
      // Show success message
      setSuccessMessage('Data guru berhasil diperbarui!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setError(null);
    } catch (err) {
      if (err.response?.data?.error?.name === 'SequelizeValidationError') {
        const validationErrors = err.response.data.error.errors;
        const errorMessages = validationErrors.map(e => {
          const field = e.path.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          return `${field} harus diisi`;
        });
        setError(errorMessages.join(', '));
      } else if (err.response?.data?.error?.name === 'SequelizeUniqueConstraintError') {
        setError('NIP sudah terdaftar. Gunakan NIP yang berbeda.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Gagal memperbarui data guru. Silakan coba lagi.');
      }
      console.error('Error updating data:', err);
    }
  };

  // === DELETE: HAPUS GURU ===
  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data guru ini?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchGuru();
        
        // Show success message
        setSuccessMessage('Data guru berhasil dihapus!');
        setTimeout(() => setSuccessMessage(''), 3000);
        
        setError(null);
      } catch (err) {
        setError('Gagal menghapus data guru.');
        console.error('Error deleting data:', err);
      }
    }
  };

  // === RENDER UI ===
  return (
    <div className="container">
      <h1>Manajemen Data Guru</h1>

      {/* Messages */}
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Form Tambah Guru */}
      <div className="form-container">
        <h2>Tambah Guru Baru</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="nip"
              placeholder="NIP (Nomor Induk Pegawai)"
              value={formData.nip}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              name="nama_lengkap"
              placeholder="Nama Lengkap"
              value={formData.nama_lengkap}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="mata_pelajaran"
              placeholder="Mata Pelajaran"
              value={formData.mata_pelajaran}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              name="alamat"
              placeholder="Alamat"
              value={formData.alamat}
              onChange={handleFormChange}
              required
            />
          </div>
          <button type="submit" className="button-submit">
            Tambah Guru
          </button>
        </form>
      </div>

      {/* Tabel Daftar Guru */}
      <h2>Daftar Guru</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NIP</th>
            <th>Nama Lengkap</th>
            <th>Mata Pelajaran</th>
            <th>Alamat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {guruList.length > 0 ? (
            guruList.map(guru => (
              <tr key={guru.id}>
                <td>{guru.id}</td>
                <td>{guru.nip}</td>
                <td>{guru.nama_lengkap}</td>
                <td>{guru.mata_pelajaran}</td>
                <td>{guru.alamat}</td>
                <td className="action-buttons">
                  <button 
                    className="button-edit"
                    onClick={() => handleEdit(guru)}
                  >
                    Edit
                  </button>
                  <button 
                    className="button-delete"
                    onClick={() => handleDelete(guru.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Tidak ada data guru
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Edit */}
      {isEditModalOpen && currentGuru && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Edit Data Guru</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="nip"
                  placeholder="NIP"
                  value={currentGuru.nip}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="text"
                  name="nama_lengkap"
                  placeholder="Nama Lengkap"
                  value={currentGuru.nama_lengkap}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="mata_pelajaran"
                  placeholder="Mata Pelajaran"
                  value={currentGuru.mata_pelajaran}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="text"
                  name="alamat"
                  placeholder="Alamat"
                  value={currentGuru.alamat}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group" style={{ justifyContent: 'flex-end' }}>
                <button type="submit" className="button-edit">
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  className="button-cancel"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}