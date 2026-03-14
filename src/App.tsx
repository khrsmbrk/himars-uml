import { useState } from 'react'
import './App.css'

const API_URL = 'https://script.google.com/macros/s/AKfycbzxTOyourdeploymentid/exec'

function App() {
  const [activeMenu, setActiveMenu] = useState('home')
  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    email: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'addAnggota',
          data: formData
        })
      })
      alert('Data berhasil disimpan!')
      setFormData({ nama: '', nim: '', email: '' })
    } catch (error) {
      alert('Terjadi kesalahan')
    }
  }

  return (
    <div className="app">
      <header>
        <h1>HIMARS UML</h1>
        <p>Himpunan Mahasiswa Program Studi Administrasi Rumah Sakit</p>
      </header>
      
      <nav>
        <button onClick={() => setActiveMenu('home')}>Beranda</button>
        <button onClick={() => setActiveMenu('anggota')}>Anggota</button>
        <button onClick={() => setActiveMenu('aspirasi')}>Aspirasi</button>
        <button onClick={() => setActiveMenu('presensi')}>Presensi</button>
        <button onClick={() => setActiveMenu('evoting')}>E-Voting</button>
        <button onClick={() => setActiveMenu('keuangan')}>Keuangan</button>
      </nav>

      <main>
        {activeMenu === 'home' && (
          <div>
            <h2>Selamat Datang di HIMARS UML</h2>
            <p>Sistem Informasi Manajemen Organisasi</p>
          </div>
        )}

        {activeMenu === 'anggota' && (
          <div>
            <h2>Pendaftaran Anggota</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={formData.nama}
                onChange={(e) => setFormData({...formData, nama: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="NIM"
                value={formData.nim}
                onChange={(e) => setFormData({...formData, nim: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <button type="submit">Daftar</button>
            </form>
          </div>
        )}

        {activeMenu === 'aspirasi' && (
          <div>
            <h2>Kotak Aspirasi</h2>
            <p>Fitur aspirasi akan segera hadir</p>
          </div>
        )}

        {activeMenu === 'presensi' && (
          <div>
            <h2>Presensi QR Code</h2>
            <p>Fitur presensi akan segera hadir</p>
          </div>
        )}

        {activeMenu === 'evoting' && (
          <div>
            <h2>E-Voting</h2>
            <p>Fitur e-voting akan segera hadir</p>
          </div>
        )}

        {activeMenu === 'keuangan' && (
          <div>
            <h2>Manajemen Keuangan</h2>
            <p>Fitur keuangan akan segera hadir</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
