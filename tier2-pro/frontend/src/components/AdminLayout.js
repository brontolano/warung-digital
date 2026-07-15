import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const navGroups = [
    {
        label: 'Bisnis',
        items: [
            { path: '/admin', icon: '📊', label: 'Dashboard' },
            { path: '/admin/pos', icon: '🛒', label: 'POS Kasir' },
        ],
    },
    {
        label: 'Kelola',
        items: [
            { path: '/admin/products', icon: '📦', label: 'Produk' },
            { path: '/admin/categories', icon: '📂', label: 'Kategori' },
            { path: '/admin/stock', icon: '📋', label: 'Stok Opname' },
        ],
    },
    {
        label: 'Keuangan',
        items: [
            { path: '/admin/cashdrawer', icon: '🧾', label: 'Shift Kasir' },
            { path: '/admin/ar-ap', icon: '💰', label: 'Hutang/Piutang' },
            { path: '/admin/reports', icon: '📈', label: 'Laporan' },
        ],
    },
    {
        label: 'Lainnya',
        items: [
            { path: '/admin/storefront', icon: '🏪', label: 'Toko Online' },
            { path: '/admin/marketing', icon: '🏆', label: 'Marketing' },
            { path: '/admin/attendance', icon: '⏱️', label: 'Absensi' },
            { path: '/admin/webhooks', icon: '🔗', label: 'Integrasi' },
            { path: '/admin/settings', icon: '⚙️', label: 'Pengaturan' },
        ],
    },
];
const flatNav = navGroups.flatMap(g => g.items);
export default function AdminLayout({ children }) {
    const { pathname } = useLocation();
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/admin/login'); };
    return (_jsxs("div", { className: "min-h-screen bg-[#f8fafc] flex", children: [sidebarOpen && _jsx("div", { className: "md:hidden fixed inset-0 bg-black/40 z-40", onClick: () => setSidebarOpen(false) }), _jsxs("aside", { className: `fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`, children: [_jsxs("div", { className: "p-5 border-b border-gray-100 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-lg font-bold", children: "W" }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-gray-900 leading-tight", children: "WarungDigital" }), _jsx("p", { className: "text-[0.65rem] text-gray-400", children: "Den Ana Brontolano" })] })] }), _jsx("button", { onClick: () => setSidebarOpen(false), className: "md:hidden text-gray-400 hover:text-gray-600 text-xl", children: "\u2715" })] }), _jsx("nav", { className: "flex-1 overflow-y-auto p-3 space-y-5", children: navGroups.map(group => (_jsxs("div", { children: [_jsx("p", { className: "text-[0.65rem] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5", children: group.label }), _jsx("div", { className: "space-y-0.5", children: group.items.map(item => (_jsxs(Link, { to: item.path, onClick: () => setSidebarOpen(false), className: `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${pathname === item.path
                                            ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`, children: [_jsx("span", { className: "text-lg", children: item.icon }), _jsx("span", { children: item.label }), pathname === item.path && _jsx("span", { className: "ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" })] }, item.path))) })] }, group.label))) }), _jsx("div", { className: "p-4 border-t border-gray-100", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm", children: (user?.nama_pemilik || 'U').charAt(0).toUpperCase() }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 truncate", children: user?.nama_warung || 'Warung' }), _jsx("p", { className: "text-xs text-gray-400 truncate", children: user?.email || '' })] }), _jsx("button", { onClick: handleLogout, className: "text-gray-400 hover:text-red-500 transition-colors text-lg", title: "Logout", children: "\uD83D\uDEAA" })] }) })] }), _jsxs("div", { className: "flex-1 flex flex-col min-h-screen", children: [_jsxs("header", { className: "md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30", children: [_jsx("button", { onClick: () => setSidebarOpen(true), className: "text-2xl text-gray-600", children: "\u2630" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold", children: "W" }), _jsx("span", { className: "font-bold text-gray-900", children: "WarungDigital" })] }), _jsx("div", { className: "w-8" })] }), _jsx("main", { className: "flex-1 p-4 md:p-6 lg:p-8 animate-in", children: children })] }), _jsx("nav", { className: "md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 px-1 safe-area-bottom", children: _jsx("div", { className: "flex justify-around py-1", children: flatNav.slice(0, 5).map(item => (_jsxs(Link, { to: item.path, className: `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-colors ${pathname === item.path ? 'text-emerald-600' : 'text-gray-400'}`, children: [_jsx("span", { className: "text-xl", children: item.icon }), _jsx("span", { className: "text-[0.6rem] font-medium leading-tight", children: item.label })] }, item.path))) }) })] }));
}
