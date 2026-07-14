import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function TrackOrder() {
    const [wa, setWa] = useState('');
    const [orders, setOrders] = useState([]);
    const [searched, setSearched] = useState(false);
    const track = () => {
        if (!wa)
            return alert('Masukkan nomor WA');
        // In production, POST /storefront/orders/track with { customer_wa: wa }
        setOrders([
            { order_id: 'ORD-001', total: 50000, status: 'confirmed', date: '2026-07-14', items: 'Indomie Goreng x10, Aqua x2' },
        ]);
        setSearched(true);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-green-600 text-white p-4 shadow-md", children: _jsx("div", { className: "max-w-lg mx-auto", children: _jsx(Link, { to: "/", className: "text-white no-underline", children: _jsx("h1", { className: "text-lg font-bold", children: "\uD83C\uDFEA Den Ana" }) }) }) }), _jsxs("div", { className: "max-w-lg mx-auto p-4 space-y-4", children: [_jsx("h2", { className: "font-bold text-xl", children: "\uD83D\uDCE6 Lacak Pesanan" }), _jsxs("div", { className: "bg-white rounded-2xl shadow p-4 space-y-3", children: [_jsx("p", { className: "text-gray-500 text-sm", children: "Masukkan nomor WhatsApp kamu untuk melihat status pesanan." }), _jsx("input", { className: "w-full px-4 py-3 border border-gray-300 rounded-lg text-base", type: "tel", placeholder: "628123456789", value: wa, onChange: e => setWa(e.target.value) }), _jsx("button", { onClick: track, className: "w-full bg-green-600 text-white py-3 rounded-lg font-semibold", children: "Lacak Pesanan" })] }), searched && (_jsx("div", { className: "space-y-3", children: orders.length === 0 ? (_jsxs("div", { className: "bg-white rounded-2xl shadow p-6 text-center text-gray-400", children: [_jsx("p", { className: "text-4xl mb-2", children: "\uD83D\uDD0D" }), _jsx("p", { children: "Pesanan tidak ditemukan." })] })) : orders.map(o => (_jsxs("div", { className: "bg-white rounded-2xl shadow p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsxs("p", { className: "font-bold", children: ["#", o.order_id] }), _jsx("p", { className: "text-xs text-gray-400", children: o.date })] }), _jsx("span", { className: `px-3 py-1 rounded-full text-xs font-bold ${o.status === 'delivered' ? 'bg-green-100 text-green-700' : o.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`, children: o.status === 'pending' ? '⏳ Pending' : o.status === 'confirmed' ? '✅ Dikonfirmasi' : o.status === 'delivered' ? '📦 Diterima' : o.status })] }), _jsx("p", { className: "text-sm text-gray-500", children: o.items }), _jsxs("p", { className: "font-bold mt-2", children: ["Rp ", Number(o.total).toLocaleString()] })] }, o.order_id))) }))] })] }));
}
