import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';

export default function ArApPage() {
  const [tab, setTab] = useState<'ar' | 'ap'>('ar');
  const [arList, setArList] = useState<any[]>([]);
  const [apList, setApList] = useState<any[]>([]);
  const [modal, setModal] = useState<{type: 'ar' | 'ap'; show: boolean}>({ type: 'ar', show: false });
  const [form, setForm] = useState({ customer_name: '', vendor_name: '', total_amount: 0, due_date: '' });

  useEffect(() => {
    api.get('/ar', { params: { store_id: 'default' } }).then(r => setArList(r.data)).catch(() => {});
    api.get('/ap', { params: { store_id: 'default' } }).then(r => setApList(r.data)).catch(() => {});
  }, []);

  const save = async () => {
    try {
      if (tab === 'ar') { await api.post('/ar', { ...form, store_id: 'default' }); api.get('/ar', { params: { store_id: 'default' } }).then(r => setArList(r.data)); }
      else { await api.post('/ap', { ...form, store_id: 'default' }); api.get('/ap', { params: { store_id: 'default' } }).then(r => setApList(r.data)); }
      setModal({ ...modal, show: false });
    } catch (e: any) { alert(e.response?.data?.message); }
  };

  const pay = async (type: 'ar' | 'ap', id: string) => {
    const amount = prompt('Jumlah pembayaran:');
    if (!amount) return;
    try { await api.post(`/${type}/${id}/pay`, { amount: Number(amount) }); location.reload(); } 
    catch (e: any) { alert(e.response?.data?.message); }
  };

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="flex gap-2 border-b pb-2">
          <button onClick={() => setTab('ar')} className={`px-4 py-2 rounded-lg font-medium ${tab === 'ar' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>💰 Piutang</button>
          <button onClick={() => setTab('ap')} className={`px-4 py-2 rounded-lg font-medium ${tab === 'ap' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>💳 Hutang</button>
          <button onClick={() => setModal({ type: tab, show: true })} className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">+ Baru</button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr><th className="p-3 text-left">{tab === 'ar' ? 'Customer' : 'Vendor'}</th><th className="p-3 text-left">Total</th><th className="p-3 text-left">Terbayar</th><th className="p-3 text-left">Sisa</th><th className="p-3 text-left">Jatuh Tempo</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Aksi</th></tr></thead>
            <tbody>
              {(tab === 'ar' ? arList : apList).map((item: any) => (
                <tr key={item.ar_id || item.ap_id} className="border-t">
                  <td className="p-3 font-medium">{tab === 'ar' ? item.customer_name : item.vendor_name}</td>
                  <td className="p-3">Rp {Number(item.total_amount).toLocaleString()}</td>
                  <td className="p-3">Rp {Number(item.paid_amount).toLocaleString()}</td>
                  <td className="p-3 font-bold">Rp {Number(item.total_amount - item.paid_amount).toLocaleString()}</td>
                  <td className="p-3">{item.due_date?.substring(0, 10)}</td>
                  <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${item.status === 'paid' ? 'bg-green-100 text-green-700' : item.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span></td>
                  <td className="p-3"><button onClick={() => pay(tab === 'ar' ? 'ar' : 'ap', item.ar_id || item.ap_id)} className="text-green-600 text-xs">Bayar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {arList.length === 0 && apList.length === 0 && <p className="text-center text-gray-400 py-8">Belum ada data.</p>}
        </div>

        {modal.show && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50" onClick={() => setModal({ ...modal, show: false })}>
          <div className="bg-white w-full max-w-lg rounded-t-2xl p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Tambah {modal.type === 'ar' ? 'Piutang' : 'Hutang'}</h2>
            <div className="space-y-3">
              <input className="input-field" placeholder={modal.type === 'ar' ? 'Nama Customer' : 'Nama Vendor'} value={form.customer_name || form.vendor_name} onChange={e => modal.type === 'ar' ? setForm({ ...form, customer_name: e.target.value }) : setForm({ ...form, vendor_name: e.target.value })} />
              <input className="input-field" type="number" placeholder="Jumlah" value={form.total_amount || ''} onChange={e => setForm({ ...form, total_amount: Number(e.target.value) })} />
              <input className="input-field" type="date" value={form.due_date} onChange={e => setForm({ ...form, due_date: e.target.value })} />
              <button onClick={save} className="btn-primary w-full">Simpan</button>
            </div>
          </div>
        </div>}
      </div>
    </AdminLayout>
  );
}

