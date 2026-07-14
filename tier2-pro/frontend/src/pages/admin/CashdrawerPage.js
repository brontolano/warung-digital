import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';
export default function CashdrawerPage() {
    const [openBal, setOpenBal] = useState('0');
    const [closeBal, setCloseBal] = useState('0');
    const [totalSales, setTotalSales] = useState('0');
    const [shifts, setShifts] = useState([]);
    const [tab, setTab] = useState('open');
    const openShift = async () => {
        try {
            await api.post('/cashdrawer/open', { store_id: 'default', opening_balance: Number(openBal) });
            alert('Shift berhasil dibuka!');
        }
        catch (e) {
            alert(e.response?.data?.message || 'Gagal buka shift');
        }
    };
    const closeShift = async () => {
        try {
            const r = await api.post('/cashdrawer/default/close', { closing_balance: Number(closeBal), total_sales: Number(totalSales), store_id: 'default' });
            alert(`Shift ditutup. Selisih: Rp ${r.data.difference?.toLocaleString() || 0}`);
        }
        catch (e) {
            alert(e.response?.data?.message || 'Gagal tutup shift');
        }
    };
    const loadHistory = async () => { try {
        const r = await api.get('/cashdrawer/history', { params: { store_id: 'default' } });
        setShifts(r.data);
    }
    catch { } };
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-2xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold", children: "\uD83E\uDDFE Kasir / Shift" }), _jsx("div", { className: "flex gap-2 border-b pb-2", children: ['open', 'close', 'history'].map(t => (_jsx("button", { onClick: () => { setTab(t); if (t === 'history')
                            loadHistory(); }, className: `px-4 py-2 rounded-lg text-sm font-medium ${tab === t ? 'bg-green-600 text-white' : 'bg-gray-100'}`, children: t === 'open' ? '🟢 Buka Shift' : t === 'close' ? '🔴 Tutup Shift' : '📋 Riwayat' }, t))) }), tab === 'open' && _jsxs("div", { className: "bg-white rounded-xl shadow p-4 space-y-3", children: [_jsx("h2", { className: "font-bold", children: "Buka Shift Baru" }), _jsx("input", { type: "number", className: "input-field", placeholder: "Saldo Awal", value: openBal, onChange: e => setOpenBal(e.target.value) }), _jsx("button", { onClick: openShift, className: "btn-primary w-full", children: "\uD83D\uDFE2 Buka Shift" })] }), tab === 'close' && _jsxs("div", { className: "bg-white rounded-xl shadow p-4 space-y-3", children: [_jsx("h2", { className: "font-bold", children: "Tutup Shift" }), _jsx("input", { type: "number", className: "input-field", placeholder: "Total Penjualan", value: totalSales, onChange: e => setTotalSales(e.target.value) }), _jsx("input", { type: "number", className: "input-field", placeholder: "Saldo Akhir Fisik", value: closeBal, onChange: e => setCloseBal(e.target.value) }), _jsx("button", { onClick: closeShift, className: "bg-red-600 text-white w-full py-3 rounded-lg", children: "\uD83D\uDD34 Tutup Shift" })] }), tab === 'history' && _jsxs("div", { className: "space-y-2", children: [shifts.map(s => _jsx("div", { className: "bg-white rounded-xl shadow p-3 text-sm", children: _jsxs("p", { children: ["Status: ", s.status, " | Buka: ", s.opening_balance ? `Rp ${Number(s.opening_balance).toLocaleString()}` : '-', " | Tutup: ", s.closing_balance ? `Rp ${Number(s.closing_balance).toLocaleString()}` : '-'] }) }, s.shift_id)), shifts.length === 0 && _jsx("p", { className: "text-gray-400 text-center py-4", children: "Belum ada riwayat shift." })] })] }) }));
}
