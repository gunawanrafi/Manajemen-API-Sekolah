import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/actions.css';
import '../styles/nilai.css';

export default function NilaiPage() {
  // === STATE MANAGEMENT ===
  const [nilaiList, setNilaiList] = useState([]);
  const [siswaOptions, setSiswaOptions] = useState([]);
  const [mapelOptions, setMapelOptions] = useState([]);
  const [formData, setFormData] = useState({
    siswa_id: '',
    mapel_id: '',
    tipe_ujian: '',
    nilai_angka: ''
  });
  const [currentNilai, setCurrentNilai] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const API_BASE = 'http://localhost:5000/api';

  // === FETCH ALL DATA ===
  const fetchAllData = async () => {
    try {
      // Get all data in parallel
      const [nilaiRes, siswaRes, mapelRes] = await Promise.all([
        axios.get(`${API_BASE}/nilai`),
        axios.get(`${API_BASE}/siswa`),
        axios.get(`${API_BASE}/mapel`)
      ]);

      console.log('Fetched nilai data:', nilaiRes.data.data);

      // Set state with new data, pastikan data array valid
      const nilaiData = Array.isArray(nilaiRes.data.data) ? nilaiRes.data.data : [];
      const siswaData = Array.isArray(siswaRes.data.data) ? siswaRes.data.data : [];
      const mapelData = Array.isArray(mapelRes.data.data) ? mapelRes.data.data : [];

      setNilaiList(nilaiData);
      setSiswaOptions(siswaData);
      setMapelOptions(mapelData);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Gagal memuat data. Pastikan server berjalan dan endpoint API benar.');
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // === CREATE: INPUT NILAI ===
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
      await axios.post(`${API_BASE}/nilai`, formData);
      
      // Reset form
      setFormData({
        siswa_id: '',
        mapel_id: '',
        tipe_ujian: '',
        nilai_angka: ''
      });
      
      // Refresh data & show success message
      fetchAllData();
      setSuccessMessage('Nilai berhasil ditambahkan!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setError(null);
    } catch (err) {
      if (err.response?.data?.error?.name === 'SequelizeValidationError') {
        // Handle Sequelize validation errors
        const validationErrors = err.response.data.error.errors;
        const errorMessages = validationErrors.map(e => {
          const field = e.path.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          if (field === 'Siswa Id') return 'Siswa harus dipilih';
          if (field === 'Mapel Id') return 'Mata Pelajaran harus dipilih';
          if (field === 'Nilai Angka') return 'Nilai harus diisi (0-100)';
          return `${field} harus diisi`;
        });
        setError(errorMessages.join(', '));
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error.message || JSON.stringify(err.response.data.error));
      } else {
        setError('Terjadi kesalahan saat menambahkan nilai.');
      }
      console.error('Error creating data:', err);
    }
  };

  // === UPDATE: EDIT NILAI ===
  const handleEdit = (nilai) => {
    setCurrentNilai(nilai);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentNilai(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE}/nilai/${currentNilai.id}`, currentNilai);
      
      // Reset state & refresh data
      setIsEditModalOpen(false);
      setCurrentNilai(null);
      fetchAllData();
      
      // Show success message
      setSuccessMessage('Nilai berhasil diperbarui!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setError(null);
    } catch (err) {
      if (err.response?.data?.error?.name === 'SequelizeValidationError') {
        const validationErrors = err.response.data.error.errors;
        const errorMessages = validationErrors.map(e => {
          const field = e.path.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          if (field === 'Siswa Id') return 'Siswa harus dipilih';
          if (field === 'Mapel Id') return 'Mata Pelajaran harus dipilih';
          if (field === 'Nilai Angka') return 'Nilai harus diisi (0-100)';
          return `${field} harus diisi`;
        });
        setError(errorMessages.join(', '));
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error.message || JSON.stringify(err.response.data.error));
      } else {
        setError('Gagal memperbarui nilai. Silakan coba lagi.');
      }
      console.error('Error updating data:', err);
    }
  };

  // === DELETE NILAI ===
  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus nilai ini?')) {
      try {
        console.log('Attempting to delete nilai with ID:', id);
        
        // Hapus dari backend
        await axios.delete(`${API_BASE}/nilai/${id}`);
        
        // Hapus dari state lokal (UI) secara langsung
        setNilaiList(current => current.filter(nilai => nilai.id !== id));
        
        // Clear error dan tampilkan success message
        setError(null);
        setSuccessMessage('Nilai berhasil dihapus!');
        setTimeout(() => setSuccessMessage(''), 3000);
        
        // Refresh data untuk memastikan sinkronisasi
        await fetchAllData();
        
      } catch (err) {
        console.error('Error deleting data:', err.response || err);
        
        if (err.response?.status === 404) {
          setError('Data nilai tidak ditemukan. Mungkin sudah dihapus sebelumnya.');
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Gagal menghapus nilai. Silakan coba lagi.');
        }
      }
    }
  };

  // === RENDER UI ===
  return (
    <div className="container">
      <h1>Manajemen Nilai Siswa</h1>

      {/* Messages */}
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Form Input Nilai */}
      <div className="form-container">
        <h2>Input Nilai Baru</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <select
              name="siswa_id"
              value={formData.siswa_id}
              onChange={handleFormChange}
              required
              className="select-input"
            >
              <option value="">Pilih Siswa</option>
              {siswaOptions && siswaOptions.map(siswa => (
                <option key={siswa.id} value={siswa.id}>
                  {siswa.nis} - {siswa.nama_lengkap}
                </option>
              ))}
            </select>

            <select
              name="mapel_id"
              value={formData.mapel_id}
              onChange={handleFormChange}
              required
              className="select-input"
            >
              <option value="">Pilih Mata Pelajaran</option>
              {mapelOptions && mapelOptions.map(mapel => (
                <option key={mapel.id} value={mapel.id}>
                  {mapel.nama_mapel} ({mapel.kode_mapel})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="tipe_ujian"
              placeholder="Tipe Ujian (UTS/UAS/Tugas)"
              value={formData.tipe_ujian}
              onChange={handleFormChange}
              required
            />
            <div className="nilai-input-group">
              <input
                type="number"
                name="nilai_angka"
                placeholder="Nilai (0-100)"
                value={formData.nilai_angka}
                onChange={handleFormChange}
                required
                min="0"
                max="100"
                className="nilai-input"
              />
              {formData.mapel_id && formData.nilai_angka && (
                <>
                  <span className="kkm-info">
                    KKM: {mapelOptions.find(m => m.id === parseInt(formData.mapel_id))?.kkm || '-'}
                  </span>
                  {formData.nilai_angka < (mapelOptions.find(m => m.id === parseInt(formData.mapel_id))?.kkm || 0) && (
                    <span className="nilai-warning">
                      Nilai di bawah KKM
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          <button type="submit" className="button-submit">
            Simpan Nilai
          </button>
        </form>
      </div>

      {/* Tabel Nilai */}
      <h2>Daftar Nilai</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NIS - Nama Siswa</th>
            <th>Mata Pelajaran (Kode)</th>
            <th>Tipe Ujian</th>
            <th>Nilai</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {nilaiList && nilaiList.length > 0 ? (
            nilaiList.map(nilai => {
              // Access nested data from eager loading
              const siswa = nilai.Siswa || {};
              const mapel = nilai.Mapel || {};
              
              return (
                <tr key={nilai.id}>
                  <td>{nilai.id}</td>
                  <td>{siswa.nis ? `${siswa.nis} - ${siswa.nama_lengkap}` : "Data siswa tidak ditemukan"}</td>
                  <td>{mapel.kode_mapel ? `${mapel.nama_mapel} (${mapel.kode_mapel})` : "Data mapel tidak ditemukan"}</td>
                  <td>{nilai.tipe_ujian}</td>
                  <td className="nilai-cell">
                    {nilai.nilai_angka}
                    <span className="kkm-info">KKM: {mapel.kkm || '-'}</span>
                    <span className={`nilai-status ${nilai.nilai_angka >= (mapel.kkm || 0) ? 'status-passed' : 'status-failed'}`}>
                      {nilai.nilai_angka >= (mapel.kkm || 0) ? 'LULUS' : 'TIDAK LULUS'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="button-edit"
                        onClick={() => handleEdit(nilai)}
                      >
                        Edit
                      </button>
                      <button 
                        className="button-delete"
                        onClick={() => handleDelete(nilai.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Tidak ada data nilai
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Edit */}
      {isEditModalOpen && currentNilai && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Edit Nilai</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-group">
                <select
                  name="siswa_id"
                  value={currentNilai.siswa_id}
                  onChange={handleEditChange}
                  required
                  className="select-input"
                >
                  <option value="">Pilih Siswa</option>
                  {siswaOptions.map(siswa => (
                    <option key={siswa.id} value={siswa.id}>
                      {siswa.nis} - {siswa.nama_lengkap}
                    </option>
                  ))}
                </select>

                <select
                  name="mapel_id"
                  value={currentNilai.mapel_id}
                  onChange={handleEditChange}
                  required
                  className="select-input"
                >
                  <option value="">Pilih Mata Pelajaran</option>
                  {mapelOptions.map(mapel => (
                    <option key={mapel.id} value={mapel.id}>
                      {mapel.nama_mapel} ({mapel.kode_mapel})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="tipe_ujian"
                  placeholder="Tipe Ujian"
                  value={currentNilai.tipe_ujian}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="number"
                  name="nilai_angka"
                  placeholder="Nilai"
                  value={currentNilai.nilai_angka}
                  onChange={handleEditChange}
                  required
                  min="0"
                  max="100"
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