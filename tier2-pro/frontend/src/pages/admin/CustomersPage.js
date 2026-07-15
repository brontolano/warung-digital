import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
export default function CustomersPage() {
    const [customers, setCustomers] = useState([
        { id: 'c1', name: 'Budi Santoso', wa: '628123456789', total: 250000, visits: 5, last: '2026-07-12' },
        { id: 'c2', name: 'Siti Rahmawati', wa: '628987654321', total: 180000, visits: 3, last: '2026-07-10' },
        { id: 'c3', name: 'Ahmad Hidayat', wa: '628555123456', total: 420000, visits: 8, last: '2026-07-14' },
    ]);
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-5xl mx-auto", children: [_jsxs("div", { className: "page-header", children: [_jsxs("div", { children: [_jsx("h1", { children: "\uD83D\uDC65 Manajemen Pelanggan" }), _jsxs("p", { className: "text-gray-400 text-sm", children: [customers.length, " pelanggan terdaftar"] })] }), _jsx("button", { className: "btn-primary", children: "+ Tambah Pelanggan" })] }), _jsx("div", { className: "table-wrap", children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Nama" }), _jsx("th", { children: "WhatsApp" }), _jsx("th", { children: "Total Belanja" }), _jsx("th", { children: "Kunjungan" }), _jsx("th", { children: "Terakhir" }), _jsx("th", { children: "Aksi" })] }) }), _jsx("tbody", { children: customers.map(c => (_jsxs("tr", { children: [_jsx("td", { className: "font-medium", children: c.name }), _jsx("td", { className: "font-mono text-sm", children: c.wa }), _jsxs("td", { className: "font-semibold", children: ["Rp ", c.total.toLocaleString()] }), _jsxs("td", { children: [c.visits, "x"] }), _jsx("td", { className: "text-sm text-gray-400", children: c.last }), _jsx("td", { children: _jsx("button", { className: "btn btn-sm btn-secondary", children: "Detail" }) })] }, c.id))) })] }) })] }) }));
}
