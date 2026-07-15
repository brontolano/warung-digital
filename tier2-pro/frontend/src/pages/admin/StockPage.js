import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';
export default function StockPage() {
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState({});
    const [showForm, setShowForm] = useState(false);
    useEffect(() => { api.get('/products', { params: { store_id: 'default' } }).then(r => setProducts(r.data)).catch(() => { }); }, []);
    const startOpname = () => { setShowForm(true); const init = {}; products.forEach(p => init[p.product_id] = p.stock || 0); setItems(init); };
    const saveOpname = async () => {
        const data = { store_id: 'default', user_id: 'admin', items: Object.entries(items).map(([product_id, physical_stock]) => ({ product_id, physical_stock: Number(physical_stock) })) };
        try {
            const r = await api.post('/stock-opname', data);
            alert(`Stok opname selesai! ID: ${r.data.opname_id}`);
            setShowForm(false);
        }
        catch (e) {
            alert(e.response?.data?.message || 'Gagal');
        }
    };
    return _jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-4xl mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "\uD83D\uDCCB Stok Opname" }), !showForm && _jsx("button", { onClick: startOpname, className: "bg-green-600 text-white px-4 py-2 rounded-lg", children: "+ Mulai Opname" })] }), showForm && _jsxs("div", { className: "bg-white rounded-xl shadow p-4 space-y-3", children: [_jsx("h2", { className: "font-bold", children: "Input Stok Fisik" }), _jsx("div", { className: "space-y-2 max-h-96 overflow-y-auto", children: products.map(p => _jsxs("div", { className: "flex justify-between items-center py-2 border-b", children: [_jsxs("span", { className: "text-sm", children: [p.name, _jsx("br", {}), _jsxs("span", { className: "text-gray-400 text-xs", children: ["Sistem: ", p.stock] })] }), _jsx("input", { type: "number", className: "w-24 input-field text-center", value: items[p.product_id] || p.stock || 0, onChange: e => setItems({ ...items, [p.product_id]: Number(e.target.value) }) })] }, p.product_id)) }), _jsx("button", { onClick: saveOpname, className: "btn-primary w-full", children: "\uD83D\uDCBE Simpan Opname" })] }), !showForm && _jsxs("div", { className: "bg-white rounded-xl shadow p-6 text-center text-gray-400", children: [_jsx("p", { className: "text-4xl mb-2", children: "\uD83D\uDCCB" }), _jsx("p", { children: "Klik \"Mulai Opname\" untuk mulai stok opname" })] })] }) });
}
