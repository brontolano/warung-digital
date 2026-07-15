import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { exportCSV, printTable } from '../../utils/export';

export default function ReportsPage() {
  const [period, setPeriod] = useState('today');
  const [products] = useState([
    { name: 'Indomie Goreng', qty: 45, revenue: 157500, margin: '30%' },
    { name: 'Aqua 600ml', qty: 30, revenue: 150000, margin: '40%' },
    { name: 'Teh Botol', qty: 22, revenue: 176000, margin: '38%' },
    { name: 'Rokok Mild', qty: 15, revenue: 450000, margin: '20%' },
  ]);

  const profitData = [
    { periode: 'Hari Ini', penjualan: 933500, hpp: 625000, pengeluaran: 150000, laba: 158500 },
    { periode: 'Minggu Ini', penjualan: 5200000, hpp: 3500000, pengeluaran: 800000, laba: 900000 },
    { periode: 'Bulan Ini', penjualan: 18000000, hpp: 12000000, pengeluaran: 3500000, laba: 2500000 },
  ];

  const monthNames = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const now = new Date();
  const monthLabel = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="page-header">
          <div><h1>📈 Laporan Keuangan</h1><p className="text-gray-400 text-sm">{monthLabel}</p></div>
          <div className="flex gap-2">
            <button onClick={() => exportCSV(profitData, 'laporan_keuangan')} className="btn btn-sm btn-secondary">📥 CSV</button>
            <button onClick={() => printTable('report-table', `Laporan Keuangan ${monthLabel}`)} className="btn btn-sm btn-secondary">🖨️ Print</button>
          </div>
        </div>

        <div className="flex gap-2">{['today','week','month','year'].map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${period === p ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}>
            {p === 'today' ? 'Hari Ini' : p === 'week' ? 'Minggu Ini' : p === 'month' ? 'Bulan Ini' : 'Tahun Ini'}
          </button>
        ))}</div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="card"><p className="text-gray-400 text-xs">Penjualan</p><p className="text-2xl font-bold text-emerald-600">Rp {profitData[0].penjualan.toLocaleString()}</p></div>
          <div className="card"><p className="text-gray-400 text-xs">HPP</p><p className="text-2xl font-bold text-amber-600">Rp {profitData[0].hpp.toLocaleString()}</p></div>
          <div className="card"><p className="text-gray-400 text-xs">Pengeluaran</p><p className="text-2xl font-bold text-red-600">Rp {profitData[0].pengeluaran.toLocaleString()}</p></div>
          <div className="card"><p className="text-gray-400 text-xs">Laba Bersih</p><p className="text-2xl font-bold text-emerald-600">Rp {profitData[0].laba.toLocaleString()}</p></div>
        </div>

        {/* Table Profit */}
        <div className="table-wrap" id="report-table">
          <table><thead><tr><th>Periode</th><th>Penjualan</th><th>HPP</th><th>Pengeluaran</th><th>Laba Bersih</th><th>Margin</th></tr></thead>
          <tbody>
            {profitData.map((d, i) => (
              <tr key={i}>
                <td className="font-medium">{d.periode}</td>
                <td>Rp {d.penjualan.toLocaleString()}</td>
                <td>Rp {d.hpp.toLocaleString()}</td>
                <td>Rp {d.pengeluaran.toLocaleString()}</td>
                <td className="font-bold text-emerald-600">Rp {d.laba.toLocaleString()}</td>
                <td><span className="badge badge-green">{Math.round((d.laba / d.penjualan) * 100)}%</span></td>
              </tr>
            ))}
          </tbody>
        </table></div>

        {/* Top Products */}
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">🏆 Top Produk</h3>
            <button onClick={() => exportCSV(products, 'top_produk')} className="btn btn-sm btn-secondary">📥 Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="py-2">Nama</th><th>Terjual</th><th>Revenue</th><th>Margin</th></tr></thead>
            <tbody>{products.map((p, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-2 font-medium">{p.name}</td><td>{p.qty}</td>
                <td className="font-semibold">Rp {p.revenue.toLocaleString()}</td>
                <td><span className="badge badge-green">{p.margin}</span></td>
              </tr>
            ))}</tbody></table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
