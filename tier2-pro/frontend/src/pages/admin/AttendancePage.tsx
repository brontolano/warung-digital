import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';

export default function AttendancePage() {
  const [userId, setUserId] = useState('');

  const checkin = async () => {
    if (!userId) return alert('Masukkan user ID');
    try { await api.post('/attendance/checkin', { store_id: 'default', user_id: userId }); alert('Check-in berhasil!'); } 
    catch (e: any) { alert(e.response?.data?.message || 'Gagal check-in'); }
  };
  const checkout = async () => {
    try { await api.post('/attendance/checkout', { store_id: 'default', user_id: userId }); alert('Check-out berhasil!'); } 
    catch (e: any) { alert(e.response?.data?.message || 'Gagal check-out'); }
  };

  return <AdminLayout><div className="space-y-4 max-w-md mx-auto"><h1 className="text-2xl font-bold">🕐 Absensi</h1>
    <div className="bg-white rounded-xl shadow p-4 space-y-3">
      <input className="input-field" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
      <div className="flex gap-2"><button onClick={checkin} className="flex-1 bg-green-600 text-white py-3 rounded-lg">✅ Check-in</button>
        <button onClick={checkout} className="flex-1 bg-red-600 text-white py-3 rounded-lg">🚪 Check-out</button></div>
    </div>
  </div></AdminLayout>;
}

