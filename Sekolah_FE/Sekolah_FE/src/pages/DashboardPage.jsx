import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalSiswa: 0,
    totalGuru: 0,
    totalMapel: 0,
    totalNilai: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [siswaRes, guruRes, mapelRes, nilaiRes] = await Promise.all([
          axios.get('http://localhost:5000/api/siswa'),
          axios.get('http://localhost:5000/api/guru'),
          axios.get('http://localhost:5000/api/mapel'),
          axios.get('http://localhost:5000/api/nilai')
        ]);

        setStats({
          totalSiswa: siswaRes.data.data.length,
          totalGuru: guruRes.data.data.length,
          totalMapel: mapelRes.data.data.length,
          totalNilai: nilaiRes.data.data.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <section className="welcome-section">
        <h1 className="welcome-title">Selamat Datang di SIAKAD</h1>
        <p className="welcome-subtitle">
          Sistem Informasi Akademik - Panel Admin
        </p>
      </section>

      <div className="stats-grid">
        <div className="stat-card">
          <h3 className="stat-title">Total Siswa</h3>
          <p className="stat-value">{stats.totalSiswa}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Total Guru</h3>
          <p className="stat-value">{stats.totalGuru}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Mata Pelajaran</h3>
          <p className="stat-value">{stats.totalMapel}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Total Nilai</h3>
          <p className="stat-value">{stats.totalNilai}</p>
        </div>
      </div>

      <section className="quick-actions">
        <Link to="/siswa" className="action-card">
          <h3 className="action-title">Manajemen Siswa</h3>
          <p className="action-description">
            Kelola data siswa, tambah, edit, atau hapus data siswa
          </p>
        </Link>
        <Link to="/guru" className="action-card">
          <h3 className="action-title">Manajemen Guru</h3>
          <p className="action-description">
            Kelola data guru, tambah, edit, atau hapus data guru
          </p>
        </Link>
        <Link to="/mapel" className="action-card">
          <h3 className="action-title">Manajemen Mapel</h3>
          <p className="action-description">
            Kelola mata pelajaran dan pengaturan KKM
          </p>
        </Link>
        <Link to="/nilai" className="action-card">
          <h3 className="action-title">Manajemen Nilai</h3>
          <p className="action-description">
            Input dan kelola nilai siswa per mata pelajaran
          </p>
        </Link>
      </section>
    </div>
  );
}