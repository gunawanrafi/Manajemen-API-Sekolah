import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import './styles/global.css'
import SiswaPage from './pages/SiswaPage';
import GuruPage from './pages/GuruPage';
import MapelPage from './pages/MapelPage';
import NilaiPage from './pages/NilaiPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="siswa" element={<SiswaPage />} />
        <Route path="guru" element={<GuruPage />} />
        <Route path="mapel" element={<MapelPage />} />
        <Route path="nilai" element={<NilaiPage />} />
      </Route>
    </Routes>
  );
}

export default App;
