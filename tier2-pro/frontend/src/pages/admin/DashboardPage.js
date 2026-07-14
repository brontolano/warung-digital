import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';
export default function DashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.get('/reports/profit-loss', { params: { store_id: 'default', start_date: new Date().toISOString().split('T')[0], end_date: new Date().toISOString().split('T')[0] } })
            .then(r => setData(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, []);
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Dashboard" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: ['Penjualan Hari Ini', 'Pengeluaran', 'Total Stok', 'Transaksi'].map((title, i) => (_jsxs("div", { className: "bg-white p-4 rounded-xl shadow", children: [_jsx("p", { className: "text-gray-500 text-xs", children: title }), _jsx("p", { className: "text-2xl font-bold", children: loading ? '...' : 'Rp 0' })] }, i))) }), _jsxs("div", { className: "bg-white rounded-xl shadow p-4", children: [_jsx("h2", { className: "font-bold mb-3", children: "\u26A0\uFE0F Stok Menipis" }), _jsx("p", { className: "text-gray-400 text-sm", children: "Tidak ada data stok menipis." })] }), _jsxs("div", { className: "bg-white rounded-xl shadow p-4", children: [_jsx("h2", { className: "font-bold mb-3", children: "Transaksi Terakhir" }), _jsx("p", { className: "text-gray-400 text-sm", children: "Belum ada transaksi hari ini." })] })] }) }));
}
