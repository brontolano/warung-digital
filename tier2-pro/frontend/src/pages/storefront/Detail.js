import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [product, setProduct] = useState(null);
    useEffect(() => {
        // Demo — in production, fetch from /storefront/:slug/products/:id
        setProduct({
            name: 'Indomie Goreng',
            description: 'Mie instan goreng rasa original. Cocok untuk ngemil atau makan siang.',
            image_url: '🍜',
            price: 3500,
            tiers: [
                { name: 'HET', min_qty: 1, price: 3500 },
                { name: 'T1', min_qty: 10, price: 3200 },
                { name: 'T2', min_qty: 50, price: 3000 },
                { name: 'T3', min_qty: 100, price: 2800 },
            ],
        });
    }, [id]);
    if (!product)
        return _jsx("div", { className: "p-4 text-center", children: "Memuat..." });
    const tier = product.tiers.reduce((best, t) => qty >= t.min_qty ? t : best, undefined);
    const currentPrice = tier ? tier.price : product.price;
    const total = currentPrice * qty;
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-green-600 text-white p-4 shadow-md sticky top-0 z-40", children: _jsxs("div", { className: "max-w-4xl mx-auto flex items-center gap-4", children: [_jsx(Link, { to: "/", className: "text-white text-2xl", children: "\u2190" }), _jsx("h1", { className: "text-lg font-bold", children: "Detail Produk" })] }) }), _jsxs("div", { className: "max-w-lg mx-auto p-4 space-y-4", children: [_jsxs("div", { className: "bg-white rounded-2xl shadow overflow-hidden", children: [_jsx("div", { className: "bg-gray-100 h-48 flex items-center justify-center text-8xl", children: product.image_url }), _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-bold", children: product.name }), _jsx("p", { className: "text-gray-500 text-sm mt-1", children: product.description })] })] }), _jsxs("div", { className: "bg-white rounded-2xl shadow p-4", children: [_jsx("h3", { className: "font-bold mb-3", children: "\uD83D\uDCB0 Harga (Semakin Banyak, Semakin Murah!)" }), _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-left border-b", children: [_jsx("th", { className: "py-2", children: "Tier" }), _jsx("th", { className: "text-center", children: "Min Qty" }), _jsx("th", { className: "text-right", children: "Harga/pcs" })] }) }), _jsx("tbody", { children: product.tiers.map(t => (_jsxs("tr", { className: `border-b ${qty >= t.min_qty && (!tier || t.min_qty === tier.min_qty) ? 'bg-green-50 text-green-700 font-bold' : ''}`, children: [_jsx("td", { className: "py-2", children: t.name === 'HET' ? 'Eceran' : `Grosir ${t.name}` }), _jsxs("td", { className: "text-center", children: [t.min_qty, "+"] }), _jsxs("td", { className: "text-right", children: ["Rp ", Number(t.price).toLocaleString()] })] }, t.name))) })] })] }), _jsxs("div", { className: "bg-white rounded-2xl shadow p-4", children: [_jsx("h3", { className: "font-bold mb-3", children: "\uD83D\uDED2 Jumlah Beli" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: () => setQty(Math.max(1, qty - 1)), className: "w-12 h-12 bg-gray-200 rounded-full text-2xl font-bold flex items-center justify-center", children: "-" }), _jsx("input", { type: "number", className: "w-24 text-center text-2xl font-bold border rounded-lg py-2", value: qty, onChange: e => setQty(Math.max(1, parseInt(e.target.value) || 1)), min: 1 }), _jsx("button", { onClick: () => setQty(qty + 1), className: "w-12 h-12 bg-green-600 text-white rounded-full text-2xl font-bold flex items-center justify-center", children: "+" })] }), _jsxs("div", { className: "mt-3 text-center", children: [_jsx("span", { className: "text-sm text-gray-500", children: "Harga satuan:" }), _jsxs("span", { className: "text-lg font-bold text-green-600 ml-2", children: ["Rp ", currentPrice.toLocaleString()] }), tier && _jsx("span", { className: "text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2", children: tier.name })] })] }), _jsx("div", { className: "bg-white rounded-2xl shadow p-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Total" }), _jsxs("p", { className: "text-2xl font-bold text-green-600", children: ["Rp ", total.toLocaleString()] })] }), _jsx("button", { onClick: () => navigate(`/checkout?product=${id}&qty=${qty}`), className: "bg-green-600 text-white px-8 py-3 rounded-xl font-bold text-lg", children: "Beli Sekarang" })] }) })] })] }));
}
