import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../contexts/AuthContext';
export default function Checkout() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [wa, setWa] = useState('');
    const [address, setAddress] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const productId = searchParams.get('product');
    const qty = Number(searchParams.get('qty')) || 1;
    const checkout = async () => {
        if (!name || !wa)
            return alert('Nama dan nomor WA harus diisi');
        setSubmitting(true);
        try {
            await api.post('/storefront/demo/checkout', {
                customer_name: name,
                customer_wa: wa,
                delivery_address: address,
                items: [{ product_id: productId || '1', qty }],
            });
            alert('Pesanan berhasil! Admin akan menghubungi via WhatsApp.');
            navigate('/orders/track');
        }
        catch (e) {
            alert(e.response?.data?.message || 'Gagal checkout');
        }
        finally {
            setSubmitting(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-green-600 text-white p-4 shadow-md", children: _jsx("div", { className: "max-w-lg mx-auto", children: _jsx("h1", { className: "text-lg font-bold", children: "\uD83D\uDCDD Checkout" }) }) }), _jsxs("div", { className: "max-w-lg mx-auto p-4 space-y-4", children: [_jsxs("div", { className: "bg-white rounded-2xl shadow p-4 space-y-3", children: [_jsx("h3", { className: "font-bold", children: "Data Pemesan" }), _jsx("input", { className: "w-full px-4 py-3 border border-gray-300 rounded-lg text-base", placeholder: "Nama Lengkap *", value: name, onChange: e => setName(e.target.value) }), _jsx("input", { className: "w-full px-4 py-3 border border-gray-300 rounded-lg text-base", placeholder: "Nomor WhatsApp *", type: "tel", value: wa, onChange: e => setWa(e.target.value) }), _jsx("textarea", { className: "w-full px-4 py-3 border border-gray-300 rounded-lg text-base resize-none", rows: 3, placeholder: "Alamat pengiriman", value: address, onChange: e => setAddress(e.target.value) })] }), _jsxs("div", { className: "bg-white rounded-2xl shadow p-4", children: [_jsx("h3", { className: "font-bold mb-2", children: "Metode Pembayaran" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "flex items-center gap-3 p-3 bg-green-50 rounded-xl border-2 border-green-500", children: [_jsx("input", { type: "radio", name: "payment", defaultChecked: true, className: "accent-green-600" }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Cash on Delivery (COD)" }), _jsx("p", { className: "text-xs text-gray-500", children: "Bayar saat barang diterima" })] })] }), _jsxs("label", { className: "flex items-center gap-3 p-3 bg-gray-50 rounded-xl border-2 border-gray-200", children: [_jsx("input", { type: "radio", name: "payment", disabled: true, className: "accent-green-600" }), _jsxs("div", { children: [_jsx("span", { className: "font-medium text-gray-400", children: "QRIS" }), _jsx("p", { className: "text-xs text-gray-400", children: "Segera hadir" })] })] })] })] }), _jsx("button", { onClick: checkout, disabled: submitting, className: "w-full bg-green-600 text-white py-4 rounded-xl text-lg font-bold disabled:opacity-50", children: submitting ? 'Memproses...' : '✅ Pesan Sekarang' })] })] }));
}
