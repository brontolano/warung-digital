import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';
export default function ArApPage() {
    const [tab, setTab] = useState('ar');
    const [arList, setArList] = useState([]);
    const [apList, setApList] = useState([]);
    const [modal, setModal] = useState({ type: 'ar', show: false });
    const [form, setForm] = useState({ customer_name: '', vendor_name: '', total_amount: 0, due_date: '' });
    useEffect(() => {
        api.get('/ar', { params: { store_id: 'default' } }).then(r => setArList(r.data)).catch(() => { });
        api.get('/ap', { params: { store_id: 'default' } }).then(r => setApList(r.data)).catch(() => { });
    }, []);
    const save = async () => {
        try {
            if (tab === 'ar') {
                await api.post('/ar', { ...form, store_id: 'default' });
                api.get('/ar', { params: { store_id: 'default' } }).then(r => setArList(r.data));
            }
            else {
                await api.post('/ap', { ...form, store_id: 'default' });
                api.get('/ap', { params: { store_id: 'default' } }).then(r => setApList(r.data));
            }
            setModal({ ...modal, show: false });
        }
        catch (e) {
            alert(e.response?.data?.message);
        }
    };
    const pay = async (type, id) => {
        const amount = prompt('Jumlah pembayaran:');
        if (!amount)
            return;
        try {
            await api.post(`/${type}/${id}/pay`, { amount: Number(amount) });
            location.reload();
        }
        catch (e) {
            alert(e.response?.data?.message);
        }
    };
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-4xl mx-auto", children: [_jsxs("div", { className: "flex gap-2 border-b pb-2", children: [_jsx("button", { onClick: () => setTab('ar'), className: `px-4 py-2 rounded-lg font-medium ${tab === 'ar' ? 'bg-green-600 text-white' : 'bg-gray-100'}`, children: "\uD83D\uDCB0 Piutang" }), _jsx("button", { onClick: () => setTab('ap'), className: `px-4 py-2 rounded-lg font-medium ${tab === 'ap' ? 'bg-green-600 text-white' : 'bg-gray-100'}`, children: "\uD83D\uDCB3 Hutang" }), _jsx("button", { onClick: () => setModal({ type: tab, show: true }), className: "ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm", children: "+ Baru" })] }), _jsxs("div", { className: "bg-white rounded-xl shadow overflow-x-auto", children: [_jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "p-3 text-left", children: tab === 'ar' ? 'Customer' : 'Vendor' }), _jsx("th", { className: "p-3 text-left", children: "Total" }), _jsx("th", { className: "p-3 text-left", children: "Terbayar" }), _jsx("th", { className: "p-3 text-left", children: "Sisa" }), _jsx("th", { className: "p-3 text-left", children: "Jatuh Tempo" }), _jsx("th", { className: "p-3 text-left", children: "Status" }), _jsx("th", { className: "p-3 text-left", children: "Aksi" })] }) }), _jsx("tbody", { children: (tab === 'ar' ? arList : apList).map((item) => (_jsxs("tr", { className: "border-t", children: [_jsx("td", { className: "p-3 font-medium", children: tab === 'ar' ? item.customer_name : item.vendor_name }), _jsxs("td", { className: "p-3", children: ["Rp ", Number(item.total_amount).toLocaleString()] }), _jsxs("td", { className: "p-3", children: ["Rp ", Number(item.paid_amount).toLocaleString()] }), _jsxs("td", { className: "p-3 font-bold", children: ["Rp ", Number(item.total_amount - item.paid_amount).toLocaleString()] }), _jsx("td", { className: "p-3", children: item.due_date?.substring(0, 10) }), _jsx("td", { className: "p-3", children: _jsx("span", { className: `px-2 py-1 rounded-full text-xs ${item.status === 'paid' ? 'bg-green-100 text-green-700' : item.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`, children: item.status }) }), _jsx("td", { className: "p-3", children: _jsx("button", { onClick: () => pay(tab === 'ar' ? 'ar' : 'ap', item.ar_id || item.ap_id), className: "text-green-600 text-xs", children: "Bayar" }) })] }, item.ar_id || item.ap_id))) })] }), arList.length === 0 && apList.length === 0 && _jsx("p", { className: "text-center text-gray-400 py-8", children: "Belum ada data." })] }), modal.show && _jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50", onClick: () => setModal({ ...modal, show: false }), children: _jsxs("div", { className: "bg-white w-full max-w-lg rounded-t-2xl p-6", onClick: e => e.stopPropagation(), children: [_jsxs("h2", { className: "text-xl font-bold mb-4", children: ["Tambah ", modal.type === 'ar' ? 'Piutang' : 'Hutang'] }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { className: "input-field", placeholder: modal.type === 'ar' ? 'Nama Customer' : 'Nama Vendor', value: form.customer_name || form.vendor_name, onChange: e => modal.type === 'ar' ? setForm({ ...form, customer_name: e.target.value }) : setForm({ ...form, vendor_name: e.target.value }) }), _jsx("input", { className: "input-field", type: "number", placeholder: "Jumlah", value: form.total_amount || '', onChange: e => setForm({ ...form, total_amount: Number(e.target.value) }) }), _jsx("input", { className: "input-field", type: "date", value: form.due_date, onChange: e => setForm({ ...form, due_date: e.target.value }) }), _jsx("button", { onClick: save, className: "btn-primary w-full", children: "Simpan" })] })] }) })] }) }));
}
