import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';

export default function SettingsPage() {
  const { user, logout } = useAuth();

  return <AdminLayout><div className="space-y-4 max-w-md mx-auto"><h1 className="text-2xl font-bold">⚙️ Pengaturan</h1>
    <div className="bg-white rounded-xl shadow p-4 space-y-2">
      <p><span className="text-gray-500">Warung:</span> {user?.nama_warung || '-'}</p>
      <p><span className="text-gray-500">Email:</span> {user?.email || '-'}</p>
      <p><span className="text-gray-500">Role:</span> {user?.role || '-'}</p>
    </div>
    <button onClick={logout} className="bg-red-500 text-white w-full py-3 rounded-lg">🚪 Logout</button>
    <p className="text-center text-xs text-gray-400">WarungDigital v1.0 | Den Ana Brontolano Retail</p>
  </div></AdminLayout>;
}

