import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useData } from '../store/DataContext';

export default function PublicLayout() {
  const { data } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStrukturOpen, setIsStrukturOpen] = useState(false);
  const [isFiturOpen, setIsFiturOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Profil Prodi', path: '/profil' },
    { name: 'Struktur', path: '/struktur' },
    { name: 'Berita', path: '/blog' },
    { name: 'Dokumen', path: '/dokumen' },
    { name: 'Fitur', path: '#' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-liquid text-slate-900 font-sans">
      {/* Navbar */}
      <header className="glass-ios sticky top-0 z-50 border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-4 group">
                <div className="w-12 h-12 glass-ios rounded-full flex items-center justify-center shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/40 overflow-hidden transition-transform group-hover:scale-110">
                  <img 
                    src={data.settings.logoUrl || undefined} 
                    alt={`${data.settings.siteName} Logo`} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-2xl text-himars-dark leading-none tracking-tighter group-hover:text-himars-peach transition-colors uppercase">{data.settings.siteName}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">UMLA</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                if (link.name === 'Struktur') {
                  return (
                    <div key={link.name} className="relative">
                      <button
                        onClick={() => setIsStrukturOpen(!isStrukturOpen)}
                        className={`text-xs font-black uppercase tracking-widest transition-all flex items-center gap-1 ${
                          location.pathname.startsWith(link.path)
                            ? 'text-himars-peach'
                            : 'text-slate-500 hover:text-himars-peach'
                        }`}
                      >
                        {link.name}
                        <svg className={`w-4 h-4 transition-transform ${isStrukturOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isStrukturOpen && (
                        <div className="absolute left-0 mt-2 w-56 z-50 pt-2">
                          <div className="glass-ios rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/40 overflow-hidden py-2">
                            {[
                              { id: 'ketua-wakil', title: 'Ketua & Wakil' },
                              { id: 'sekretaris', title: 'Sekretaris' },
                              { id: 'bendahara', title: 'Bendahara' },
                              { id: 'paik', title: 'PENAK' },
                              { id: 'litbang', title: 'Litbang' },
                              { id: 'pengmas', title: 'PENGAPMAS' },
                              { id: 'medkom', title: 'Medkom' },
                            ].map(dept => (
                              <Link
                                key={dept.id}
                                to={`/struktur/${dept.id}`}
                                onClick={() => setIsStrukturOpen(false)}
                                className="block px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-himars-peach hover:bg-slate-50 transition-colors"
                              >
                                {dept.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                if (link.name === 'Fitur') {
                  return (
                    <div key={link.name} className="relative">
                      <button
                        onClick={() => setIsFiturOpen(!isFiturOpen)}
                        className={`text-xs font-black uppercase tracking-widest transition-all flex items-center gap-1 ${
                          ['/presensi', '/aspirasi', '/voting', '/gallery', '/calendar', '/pendaftaran'].includes(location.pathname)
                            ? 'text-himars-peach'
                            : 'text-slate-500 hover:text-himars-peach'
                        }`}
                      >
                        {link.name}
                        <svg className={`w-4 h-4 transition-transform ${isFiturOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isFiturOpen && (
                        <div className="absolute left-0 mt-2 w-56 z-50 pt-2">
                          <div className="glass-ios rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/40 overflow-hidden py-2">
                            {[
                              { id: 'presensi', title: 'Presensi QR', path: '/presensi' },
                              { id: 'aspirasi', title: 'Kotak Aspirasi', path: '/aspirasi' },
                              { id: 'voting', title: 'E-Voting', path: '/voting' },
                              { id: 'gallery', title: 'Galeri', path: '/gallery' },
                              { id: 'calendar', title: 'Kalender', path: '/calendar' },
                              { id: 'pendaftaran', title: 'Pendaftaran', path: '/pendaftaran' },
                            ].map(item => (
                              <Link
                                key={item.id}
                                to={item.path}
                                onClick={() => setIsFiturOpen(false)}
                                className="block px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-himars-peach hover:bg-slate-50 transition-colors"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs font-black uppercase tracking-widest transition-all ${
                      location.pathname === link.path
                        ? 'text-himars-peach'
                        : 'text-slate-500 hover:text-himars-peach'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest text-himars-peach bg-himars-peach/10 hover:bg-himars-peach/20 transition-all active:scale-95 border border-himars-peach/20"
              >
                Masuk
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
              >
                {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav - see full code for complete implementation */}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="glass-ios pt-24 pb-12 border-t border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <div>
              <h3 className="text-xl font-black text-himars-peach uppercase tracking-tighter mb-6">HIMARS UMLA</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Himpunan Mahasiswa Program Studi S1 Administrasi Rumah Sakit Universitas Muhammadiyah Lamongan.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-black text-himars-dark uppercase tracking-widest mb-6">Tautan Cepat</h3>
              <ul className="space-y-4">
                <li><Link to="/profil" className="text-slate-500 hover:text-himars-peach transition-colors text-sm font-bold">Profil Prodi</Link></li>
                <li><Link to="/struktur" className="text-slate-500 hover:text-himars-peach transition-colors text-sm font-bold">Struktur Organisasi</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-himars-dark uppercase tracking-widest mb-6">Kontak</h3>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li>Jl. Raya Plalangan Plosowahyu Km 2, Lamongan</li>
                <li>Email: himars@umla.ac.id</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-100 flex justify-center">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              &copy; {new Date().getFullYear()} {data.settings.siteName}. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
