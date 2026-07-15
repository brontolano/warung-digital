import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navGroups = [
  {
    label: 'Bisnis',
    items: [
      { path: '/admin', icon: '📊', label: 'Dashboard' },
      { path: '/admin/pos', icon: '🛒', label: 'POS Kasir' },
      { path: '/admin/pos-offline', icon: '📡', label: 'POS Offline' },
      { path: '/admin/receipt', icon: '🧾', label: 'Cetak Struk' },
    ],
  },
  {
    label: 'Produk & Stok',
    items: [
      { path: '/admin/products', icon: '📦', label: 'Produk' },
      { path: '/admin/categories', icon: '📂', label: 'Kategori' },
      { path: '/admin/multi-unit', icon: '📏', label: 'Multi Satuan' },
      { path: '/admin/stock', icon: '📋', label: 'Stok Opname' },
      { path: '/admin/stock-mutation', icon: '📊', label: 'Mutasi Stok' },
      { path: '/admin/suppliers', icon: '🚚', label: 'Supplier' },
    ],
  },
  {
    label: 'Pelanggan & Marketing',
    items: [
      { path: '/admin/customers', icon: '👥', label: 'Pelanggan' },
      { path: '/admin/marketing', icon: '🏆', label: 'Promosi' },
      { path: '/admin/referral', icon: '🎁', label: 'Referral' },
      { path: '/admin/storefront', icon: '🏪', label: 'Toko Online' },
      { path: '/admin/linktoko', icon: '🔗', label: 'Linktoko' },
    ],
  },
  {
    label: 'Keuangan',
    items: [
      { path: '/admin/cashdrawer', icon: '🧾', label: 'Shift Kasir' },
      { path: '/admin/ar-ap', icon: '💰', label: 'Hutang/Piutang' },
      { path: '/admin/expenses', icon: '💸', label: 'Pengeluaran' },
      { path: '/admin/qris', icon: '💳', label: 'QRIS' },
      { path: '/admin/ppob', icon: '📱', label: 'PPOB' },
      { path: '/admin/reports', icon: '📈', label: 'Laporan' },
    ],
  },
  {
    label: 'Karyawan & Resto',
    items: [
      { path: '/admin/staff', icon: '👤', label: 'Karyawan' },
      { path: '/admin/attendance', icon: '⏱️', label: 'Absensi' },
      { path: '/admin/food-menu', icon: '🍽️', label: 'Food Menu' },
      { path: '/admin/branches', icon: '🏢', label: 'Cabang' },
    ],
  },
  {
    label: 'Layanan',
    items: [
      { path: '/admin/webhooks', icon: '🔗', label: 'Integrasi' },
      { path: '/admin/settings', icon: '⚙️', label: 'Pengaturan' },
    ],
  },
];

const flatNav = navGroups.flatMap(g => g.items);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Overlay mobile */}
      {sidebarOpen && <div className="md:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-lg font-bold">W</div>
            <div>
              <p className="font-bold text-gray-900 leading-tight">WarungDigital</p>
              <p className="text-[0.65rem] text-gray-400">Den Ana Brontolano</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-5">
          {navGroups.map(group => (
            <div key={group.label}>
              <p className="text-[0.65rem] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map(item => (
                  <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      pathname === item.path
                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}>
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                    {pathname === item.path && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">
              {(user?.nama_pemilik || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.nama_warung || 'Warung'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors text-lg" title="Logout">🚪</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Top Bar */}
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-2xl text-gray-600">☰</button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">W</div>
            <span className="font-bold text-gray-900">WarungDigital</span>
          </div>
          <div className="w-8" />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 animate-in">{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 px-1 safe-area-bottom">
        <div className="flex justify-around py-1">
          {flatNav.slice(0, 5).map(item => (
            <Link key={item.path} to={item.path}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-colors ${
                pathname === item.path ? 'text-emerald-600' : 'text-gray-400'
              }`}>
              <span className="text-xl">{item.icon}</span>
              <span className="text-[0.6rem] font-medium leading-tight">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
