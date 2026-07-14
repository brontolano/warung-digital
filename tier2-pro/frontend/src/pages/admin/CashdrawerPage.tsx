import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';

export default function CashdrawerPage() {
  const [openBal, setOpenBal] = useState('0');
  const [closeBal, setCloseBal] = useState('0');
  const [totalSales, setTotalSales] = useState('0');
  const [shifts, setShifts] = useState<any[]>([]);
  const [tab, setTab] = useState<'open' | 'close' | 'history'>('open');

  const openShift = async () => {
    try { await api.post('/cashdrawer/open', { store_id: 'default', opening_balance: Number(openBal) }); alert('Shift berhasil dibuka!'); } 
    catch (e: any) { alert(e.response?.data?.message || 'Gagal buka shift'); }
  };
  const closeShift = async () => {
    try { const r = await api.post('/cashdrawer/default/close', { closing_balance: Number(closeBal), total_sales: Number(totalSales), store_id: 'default' }); alert(`Shift ditutup. Selisih: Rp ${r.data.difference?.toLocaleString() || 0}`); } 
    catch (e: any) { alert(e.response?.data?.message || 'Gagal tutup shift'); }
  };
  const loadHistory = async () => { try { const r = await api.get('/cashdrawer/history', { params: { store_id: 'default' } }); setShifts(r.data); } catch {} };

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">🧾 Kasir / Shift</h1>
        <div className="flex gap-2 border-b pb-2">
          {(['open', 'close', 'history'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); if (t === 'history') loadHistory(); }} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>
              {t === 'open' ? '🟢 Buka Shift' : t === 'close' ? '🔴 Tutup Shift' : '📋 Riwayat'}
            </button>
          ))}
        </div>

        {tab === 'open' && <div className="bg-white rounded-xl shadow p-4 space-y-3"><h2 className="font-bold">Buka Shift Baru</h2>
          <input type="number" className="input-field" placeholder="Saldo Awal" value={openBal} onChange={e => setOpenBal(e.target.value)} />
          <button onClick={openShift} className="btn-primary w-full">🟢 Buka Shift</button>
        </div>}

        {tab === 'close' && <div className="bg-white rounded-xl shadow p-4 space-y-3"><h2 className="font-bold">Tutup Shift</h2>
          <input type="number" className="input-field" placeholder="Total Penjualan" value={totalSales} onChange={e => setTotalSales(e.target.value)} />
          <input type="number" className="input-field" placeholder="Saldo Akhir Fisik" value={closeBal} onChange={e => setCloseBal(e.target.value)} />
          <button onClick={closeShift} className="bg-red-600 text-white w-full py-3 rounded-lg">🔴 Tutup Shift</button>
        </div>}

        {tab === 'history' && <div className="space-y-2">{shifts.map(s => <div key={s.shift_id} className="bg-white rounded-xl shadow p-3 text-sm"><p>Status: {s.status} | Buka: {s.opening_balance ? `Rp ${Number(s.opening_balance).toLocaleString()}` : '-'} | Tutup: {s.closing_balance ? `Rp ${Number(s.closing_balance).toLocaleString()}` : '-'}</p></div>)}
          {shifts.length === 0 && <p className="text-gray-400 text-center py-4">Belum ada riwayat shift.</p>}
        </div>}
      </div>
    </AdminLayout>
  );
}

