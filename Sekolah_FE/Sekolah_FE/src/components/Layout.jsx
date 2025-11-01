import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Admin SIAKAD</h1>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/" className="nav-link">
            <i className="fas fa-home"></i>
            Dashboard
          </Link>
          
          <Link to="/siswa" className="nav-link">
            <i className="fas fa-user-graduate"></i>
            Manajemen Siswa
          </Link>
          
          <Link to="/guru" className="nav-link">
            <i className="fas fa-chalkboard-teacher"></i>
            Manajemen Guru
          </Link>
          
          <Link to="/mapel" className="nav-link">
            <i className="fas fa-book"></i>
            Manajemen Mapel
          </Link>
          
          <Link to="/nilai" className="nav-link">
            <i className="fas fa-star"></i>
            Manajemen Nilai
          </Link>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}