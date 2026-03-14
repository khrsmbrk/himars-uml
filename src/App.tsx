import { useState } from 'react'
import './App.css'
import QRScanner from './components/QRScanner'
import GenerateSuratModal from './components/GenerateSuratModal'
import ConfirmModal from './components/ConfirmModal'
import SettingsModal from './components/SettingsModal'
import { Settings, FileText, QrCode, LogOut } from 'lucide-react'

const API_URL = 'https://script.google.com/macros/s/AKfycbzxTOyourdeploymentid/exec'

function App() {
  const [activeMenu, setActiveMenu] = useState('home')
  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    email: '',
  })
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [scannedData, setScannedData] = useState<any>(null)
  const [settings, setSettings] = useState({
    apiKey: '',
    spreadsheetId: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmModal(true)
  }

  const handleConfirmedSubmit = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      setFormData({ nama: '', nim: '', email: '' })
      alert('Data berhasil dikirim!')
    } catch (error) {
      console.error('Error:', error)
      alert('Gagal mengirim data')
    }
  }

  const handleQRScan = (decodedText: string) => {
    try {
      const data = JSON.parse(decodedText)
      setScannedData(data)
      setFormData(data)
    } catch (error) {
      console.error('Invalid QR code data')
    }
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'home':
        return (
          <div className="form-container">
            <h2>Form Input Data</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama:</label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>NIM:</label>
                <input
                  type="text"
                  value={formData.nim}
                  onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        )
      case 'qrcode':
        return <QRScanner onScan={handleQRScan} onClose={() => setActiveMenu('home')} />
      default:
        return null
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>HIMARS UML</h1>
        <div className="header-actions">
          <button
            onClick={() => setShowGenerateModal(true)}
            className="icon-btn"
            title="Generate Surat"
          >
            <FileText className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="icon-btn"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={() => alert('Logout')}
            className="icon-btn"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <nav className="nav-menu">
        <button
          className={activeMenu === 'home' ? 'active' : ''}
          onClick={() => setActiveMenu('home')}
        >
          Home
        </button>
        <button
          className={activeMenu === 'qrcode' ? 'active' : ''}
          onClick={() => setActiveMenu('qrcode')}
        >
          <QrCode className="w-4 h-4 inline mr-1" />
          QR Code Scanner
        </button>
      </nav>

      <main className="main-content">
        {renderContent()}
      </main>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmedSubmit}
        data={formData}
      />

      <GenerateSuratModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  )
}

export default App
