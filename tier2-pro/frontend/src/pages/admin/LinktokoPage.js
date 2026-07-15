import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AdminLayout from '../../components/AdminLayout';
export default function LinktokoPage() {
    const links = [
        { platform: 'WhatsApp', icon: '📞', url: 'https://wa.me/628123456789', color: 'bg-green-100 text-green-700' },
        { platform: 'Instagram', icon: '📸', url: 'https://instagram.com/denana', color: 'bg-pink-100 text-pink-700' },
        { platform: 'TikTok', icon: '🎵', url: 'https://tiktok.com/@denana', color: 'bg-gray-100 text-gray-800' },
        { platform: 'Shopee', icon: '🛍️', url: 'https://shopee.co.id/denana', color: 'bg-orange-100 text-orange-700' },
        { platform: 'Tokopedia', icon: '🟢', url: 'https://tokopedia.com/denana', color: 'bg-green-100 text-green-800' },
        { platform: 'Google Maps', icon: '🗺️', url: 'https://maps.google.com/?q=Den+Ana', color: 'bg-blue-100 text-blue-700' },
    ];
    return _jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-4xl mx-auto", children: [_jsxs("div", { className: "page-header", children: [_jsxs("div", { children: [_jsx("h1", { children: "\uD83D\uDD17 Linktoko" }), _jsx("p", { className: "text-gray-400 text-sm", children: "Bagikan semua link toko dalam satu halaman" })] }), _jsx("button", { className: "btn-primary", children: "\uD83D\uDCCB Salin Link" })] }), _jsxs("div", { className: "card", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto", children: "D" }), _jsx("h2", { className: "font-bold text-xl mt-2", children: "Den Ana Brontolano" }), _jsx("p", { className: "text-gray-400 text-sm", children: "\uD83D\uDED2 Toko Online \u00B7 \u23F0 07:00-21:00" }), _jsx("div", { className: "inline-block bg-emerald-50 px-3 py-1 rounded-full text-sm mt-2", children: "\uD83D\uDCCB link.denana.id/brontolano" })] }), _jsx("div", { className: "space-y-2", children: links.map((l, i) => (_jsxs("div", { className: `flex items-center justify-between p-3 rounded-xl ${l.color}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-xl", children: l.icon }), _jsx("span", { className: "font-medium", children: l.platform })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { className: "text-xs underline", children: "Edit" }), _jsx("button", { className: "text-xs opacity-50", children: "\u22EE\u22EE" })] })] }, i))) })] })] }) });
}
