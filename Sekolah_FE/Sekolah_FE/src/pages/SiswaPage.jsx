import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/global.css';

export default function SiswaPage() {
  // === STATE MANAGEMENT ===
  const [siswaList, setSiswaList] = useState([]);
  const [formData, setFormData] = useState({
    nis: '',
    nama_lengkap: '',
    kelas: '',
    alamat: ''
  });
  const [currentSiswa, setCurrentSiswa] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const API_URL = 'http://localhost:5000/api/siswa';

  // === READ: FETCH DATA ===
  const fetchSiswa = async () => {
    try {
      const response = await axios.get(API_URL);
      setSiswaList(response.data.data);
      setError(null);
    } catch (err) {
      setError('Gagal mengambil data siswa. Silakan coba lagi.');
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  // === CREATE: TAMBAH SISWA ===
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
      setFormData({ nis: '', nama_lengkap: '', kelas: '', alamat: '' });
      fetchSiswa();
      
      // Show success message
      setSuccessMessage('Data siswa berhasil ditambahkan!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setError(null);
    } catch (err) {
      if (err.response?.data?.error?.name === 'SequelizeValidationError') {
        // Handle Sequelize validation errors
        const validationErrors = err.response.data.error.errors;
        const errorMessages = validationErrors.map(e => {
          // Convert "nama_lengkap cannot be null" to "Nama Lengkap harus diisi"
          const field = e.path.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          return `${field} harus diisi`;
        });
        setError(errorMessages.join(', '));
      } else if (err.response?.data?.message) {
        // Handle custom message from backend
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        // Handle other structured errors
        setError(err.response.data.error.message || JSON.stringify(err.response.data.error));
      } else {
        // Fallback error message
        setError('Terjadi kesalahan saat menambahkan siswa.');
      }
      console.error('Error creating data:', err);
    }
  };

  // === UPDATE: EDIT SISWA ===
  const handleEdit = (siswa) => {
    setCurrentSiswa(siswa);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentSiswa(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${currentSiswa.id}`, currentSiswa);
      
      // Reset state & refresh data
      setIsEditModalOpen(false);
      setCurrentSiswa(null);
      fetchSiswa();
      
      // Show success message
      setSuccessMessage('Data siswa berhasil diperbarui!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setError(null);
    } catch (err) {
      setError('Gagal memperbarui data siswa. Pastikan semua field terisi dengan benar.');
      console.error('Error updating data:', err);
    }
  };

  // === DELETE: HAPUS SISWA ===
  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchSiswa();
        
        // Show success message
        setSuccessMessage('Data siswa berhasil dihapus!');
        setTimeout(() => setSuccessMessage(''), 3000);
        
        setError(null);
      } catch (err) {
        setError('Gagal menghapus data siswa.');
        console.error('Error deleting data:', err);
      }
    }
  };

  // === RENDER UI ===
  return (
    <div className="container">
      <h1>Manajemen Data Siswa</h1>

      {/* Messages */}
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Form Tambah Siswa */}
      <div className="form-container">
        <h2>Tambah Siswa Baru</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="nis"
              placeholder="NIS (Nomor Induk Siswa)"
              value={formData.nis}
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
              name="kelas"
              placeholder="Kelas (Contoh: 10-A)"
              value={formData.kelas}
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
            Tambah Siswa
          </button>
        </form>
      </div>

      {/* Tabel Daftar Siswa */}
      <h2>Daftar Siswa</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NIS</th>
            <th>Nama Lengkap</th>
            <th>Kelas</th>
            <th>Alamat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {siswaList && siswaList.length > 0 ? (
            siswaList.map((siswa) => (
              <tr key={siswa.id}>
                <td>{siswa.id}</td>
                <td>{siswa.nis}</td>
                <td>{siswa.nama_lengkap}</td>
                <td>{siswa.kelas}</td>
                <td>{siswa.alamat}</td>
                <td className="action-buttons">
                  <button
                    className="button-edit"
                    onClick={() => handleEdit(siswa)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-delete"
                    onClick={() => handleDelete(siswa.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Tidak ada data siswa
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Edit */}
      {isEditModalOpen && currentSiswa && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Edit Data Siswa</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="nis"
                  placeholder="NIS"
                  value={currentSiswa.nis}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama Lengkap"
                  value={currentSiswa.nama}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="kelas"
                  placeholder="Kelas"
                  value={currentSiswa.kelas}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="text"
                  name="alamat"
                  placeholder="Alamat"
                  value={currentSiswa.alamat}
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