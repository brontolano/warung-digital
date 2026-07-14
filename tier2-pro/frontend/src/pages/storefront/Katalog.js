import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
export default function Katalog() {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    useEffect(() => {
        setProducts([
            { product_id: '1', name: 'Indomie Goreng', sell_price: 3500, category: 'Makanan Ringan', image_url: '🍜', min_qty: 1 },
            { product_id: '2', name: 'Indomie Kuah', sell_price: 3500, category: 'Makanan Ringan', image_url: '🍜', min_qty: 1 },
            { product_id: '3', name: 'Aqua 600ml', sell_price: 5000, category: 'Minuman', image_url: '💧', min_qty: 1 },
            { product_id: '4', name: 'Teh Botol', sell_price: 8000, category: 'Minuman', image_url: '🍵', min_qty: 1 },
            { product_id: '5', name: 'Rokok Mild', sell_price: 25000, category: 'Rokok', image_url: '🚬', min_qty: 1 },
            { product_id: '6', name: 'Sabun Lifebuoy', sell_price: 3000, category: 'Kebersihan', image_url: '🧼', min_qty: 1 },
            { product_id: '7', name: 'Kecap ABC', sell_price: 6000, category: 'Sembako', image_url: '🫙', min_qty: 1 },
            { product_id: '8', name: 'Gula Pasir 1kg', sell_price: 15000, category: 'Sembako', image_url: '🍬', min_qty: 1 },
        ]);
    }, [slug]);
    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === 'all' || p.category === category;
        return matchSearch && matchCategory;
    });
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-green-600 text-white p-4 shadow-md sticky top-0 z-40", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx(Link, { to: "/", className: "text-white no-underline", children: _jsx("h1", { className: "text-xl font-bold", children: "\uD83C\uDFEA Den Ana" }) }), _jsx("input", { className: "w-full mt-2 px-4 py-2 rounded-lg text-gray-800", placeholder: "Cari produk...", value: search, onChange: e => setSearch(e.target.value) })] }) }), _jsxs("section", { className: "max-w-4xl mx-auto p-4", children: [_jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 mb-4", children: ['all', 'Makanan Ringan', 'Minuman', 'Sembako', 'Rokok', 'Kebersihan'].map(kat => (_jsx("button", { onClick: () => setCategory(kat), className: `flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${category === kat ? 'bg-green-600 text-white' : 'bg-gray-200'}`, children: kat === 'all' ? 'Semua' : kat }, kat))) }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: filtered.map(p => (_jsxs(Link, { to: `/products/${p.product_id}`, className: "bg-white rounded-xl shadow hover:shadow-md transition-shadow overflow-hidden", children: [_jsx("div", { className: "bg-gray-100 h-28 flex items-center justify-center text-4xl", children: p.image_url }), _jsxs("div", { className: "p-3", children: [_jsx("h4", { className: "font-medium text-sm", children: p.name }), _jsx("p", { className: "text-gray-500 text-xs", children: p.category }), _jsxs("p", { className: "text-green-600 font-bold mt-1", children: ["Rp ", Number(p.sell_price).toLocaleString()] })] })] }, p.product_id))) }), filtered.length === 0 && _jsxs("div", { className: "text-center py-12 text-gray-400", children: [_jsx("p", { className: "text-4xl mb-2", children: "\uD83D\uDD0D" }), _jsx("p", { children: "Produk tidak ditemukan" })] })] })] }));
}
