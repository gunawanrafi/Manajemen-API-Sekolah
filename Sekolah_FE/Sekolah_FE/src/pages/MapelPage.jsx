import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MapelPage() {
  // === STATE MANAGEMENT ===
  const [mapelList, setMapelList] = useState([]);
  const [formData, setFormData] = useState({
    kode_mapel: '',
    nama_mapel: '',
    kkm: ''
  });
  const [currentMapel, setCurrentMapel] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const API_URL = 'http://localhost:5000/api/mapel';

  // === READ: FETCH DATA ===
  const fetchMapel = async () => {
    try {
      const response = await axios.get(API_URL);
      setMapelList(response.data.data);
      setError(null);
    } catch (err) {
      setError('Gagal mengambil data mata pelajaran. Silakan coba lagi.');
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchMapel();
  }, []);

  // === CREATE: TAMBAH MAPEL ===
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
      setFormData({ kode_mapel: '', nama_mapel: '', kkm: '' });
      fetchMapel();
      
      // Show success message
      setSuccessMessage('Data mata pelajaran berhasil ditambahkan!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setError(null);
    } catch (err) {
      if (err.response?.data?.error?.name === 'SequelizeValidationError') {
        // Handle Sequelize validation errors
        const validationErrors = err.response.data.error.errors;
        const errorMessages = validationErrors.map(e => {
          // Convert field names to readable format (e.g., kode_mapel -> Kode Mapel)
          const field = e.path.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          return `${field} harus diisi`;
        });
        setError(errorMessages.join(', '));
      } else if (err.response?.data?.error?.name === 'SequelizeUniqueConstraintError') {
        setError('Kode Mapel sudah terdaftar. Gunakan kode yang berbeda.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error.message || JSON.stringify(err.response.data.error));
      } else {
        setError('Terjadi kesalahan saat menambahkan mata pelajaran.');
      }
      console.error('Error creating data:', err);
    }
  };

  // === UPDATE: EDIT MAPEL ===
  const handleEdit = (mapel) => {
    setCurrentMapel(mapel);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentMapel(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${currentMapel.id}`, currentMapel);
      
      // Reset state & refresh data
      setIsEditModalOpen(false);
      setCurrentMapel(null);
      fetchMapel();
      
      // Show success message
      setSuccessMessage('Data mata pelajaran berhasil diperbarui!');
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
        setError('Kode Mapel sudah terdaftar. Gunakan kode yang berbeda.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Gagal memperbarui data mata pelajaran. Silakan coba lagi.');
      }
      console.error('Error updating data:', err);
    }
  };

  // === DELETE: HAPUS MAPEL ===
  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus mata pelajaran ini?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchMapel();
        
        // Show success message
        setSuccessMessage('Data mata pelajaran berhasil dihapus!');
        setTimeout(() => setSuccessMessage(''), 3000);
        
        setError(null);
      } catch (err) {
        setError('Gagal menghapus data mata pelajaran.');
        console.error('Error deleting data:', err);
      }
    }
  };

  // === RENDER UI ===
  return (
    <div className="container">
      <h1>Manajemen Mata Pelajaran</h1>

      {/* Messages */}
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Form Tambah Mapel */}
      <div className="form-container">
        <h2>Tambah Mata Pelajaran Baru</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="kode_mapel"
              placeholder="Kode Mapel (Contoh: MTK01)"
              value={formData.kode_mapel}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              name="nama_mapel"
              placeholder="Nama Mata Pelajaran"
              value={formData.nama_mapel}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="kkm"
              placeholder="KKM (0-100)"
              value={formData.kkm}
              onChange={handleFormChange}
              required
              min="0"
              max="100"
              style={{ width: '50%' }}
            />
          </div>
          <button type="submit" className="button-submit">
            Tambah Mata Pelajaran
          </button>
        </form>
      </div>

      {/* Tabel Daftar Mapel */}
      <h2>Daftar Mata Pelajaran</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kode Mapel</th>
            <th>Nama Mata Pelajaran</th>
            <th>KKM</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mapelList.length > 0 ? (
            mapelList.map(mapel => (
              <tr key={mapel.id}>
                <td>{mapel.id}</td>
                <td>{mapel.kode_mapel}</td>
                <td>{mapel.nama_mapel}</td>
                <td>{mapel.kkm}</td>
                <td className="action-buttons">
                  <button 
                    className="button-edit"
                    onClick={() => handleEdit(mapel)}
                  >
                    Edit
                  </button>
                  <button 
                    className="button-delete"
                    onClick={() => handleDelete(mapel.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Tidak ada data mata pelajaran
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Edit */}
      {isEditModalOpen && currentMapel && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Edit Mata Pelajaran</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="kode_mapel"
                  placeholder="Kode Mapel"
                  value={currentMapel.kode_mapel}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="text"
                  name="nama_mapel"
                  placeholder="Nama Mata Pelajaran"
                  value={currentMapel.nama_mapel}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="kkm"
                  placeholder="KKM"
                  value={currentMapel.kkm}
                  onChange={handleEditChange}
                  required
                  min="0"
                  max="100"
                  style={{ width: '50%' }}
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