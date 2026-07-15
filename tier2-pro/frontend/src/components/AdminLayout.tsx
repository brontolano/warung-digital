import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { path: '/admin', icon: '🏠', label: 'Dashboard' },
  { path: '/admin/pos', icon: '💰', label: 'POS' },
  { path: '/admin/products', icon: '📦', label: 'Produk' },
  { path: '/admin/categories', icon: '📂', label: 'Kategori' },
  { path: '/admin/stock', icon: '📋', label: 'Stok Opname' },
  { path: '/admin/cashdrawer', icon: '🧾', label: 'Shift' },
  { path: '/admin/ar-ap', icon: '📋', label: 'Hutang' },
  { path: '/admin/storefront', icon: '🏪', label: 'Toko' },
  { path: '/admin/marketing', icon: '🏆', label: 'Marketing' },
  { path: '/admin/attendance', icon: '🕐', label: 'Absensi' },
  { path: '/admin/webhooks', icon: '🔗', label: 'Integrasi' },
  { path: '/admin/reports', icon: '📊', label: 'Laporan' },
  { path: '/admin/settings', icon: '⚙️', label: 'Atur' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-green-800 text-white">
        <div className="p-4 font-bold text-lg border-b border-green-700">🏪 WarungDigital</div>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.path ? 'bg-green-600 text-white' : 'text-green-100 hover:bg-green-700'}`}>
              <span>{item.icon}</span><span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-green-700 text-sm">
          <p className="font-medium">{user?.nama_warung || 'Warung'}</p>
          <p className="text-green-200 text-xs truncate">{user?.email}</p>
          <button onClick={handleLogout} className="mt-2 text-red-300 hover:text-red-200 text-xs">Logout</button>
        </div>
      </aside>

      {/* Mobile Content */}
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-green-600 text-white p-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">☰</button>
          <h1 className="font-bold">🏪 WarungDigital</h1>
          <div className="w-8" />
        </header>
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
            <div className="w-64 bg-green-800 h-full p-4 text-white overflow-y-auto" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSidebarOpen(false)} className="text-white text-2xl mb-4">✕</button>
              {navItems.map(item => (
                <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${pathname === item.path ? 'bg-green-600' : 'hover:bg-green-700'}`}>
                  <span>{item.icon}</span><span>{item.label}</span>
                </Link>
              ))}
              <button onClick={handleLogout} className="mt-4 text-red-300 w-full text-left px-4 py-2">🚪 Logout</button>
            </div>
          </div>
        )}
        <main className="flex-1 p-4">{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="flex justify-around py-2 text-xs overflow-x-auto">
          {navItems.slice(0, 6).map(item => (
            <Link key={item.path} to={item.path}
              className={`flex flex-col items-center px-2 ${pathname === item.path ? 'text-green-600' : 'text-gray-500'}`}>
              <span className="text-xl">{item.icon}</span><span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
