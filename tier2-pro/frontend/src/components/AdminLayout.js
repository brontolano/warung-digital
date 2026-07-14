import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const navItems = [
    { path: '/admin', icon: '🏠', label: 'Dashboard' },
    { path: '/admin/pos', icon: '💰', label: 'POS' },
    { path: '/admin/products', icon: '📦', label: 'Produk' },
    { path: '/admin/cashdrawer', icon: '🧾', label: 'Shift' },
    { path: '/admin/ar-ap', icon: '📋', label: 'Hutang' },
    { path: '/admin/marketing', icon: '🏆', label: 'Marketing' },
    { path: '/admin/attendance', icon: '🕐', label: 'Absensi' },
    { path: '/admin/reports', icon: '📊', label: 'Laporan' },
    { path: '/admin/settings', icon: '⚙️', label: 'Atur' },
];
export default function AdminLayout({ children }) {
    const { pathname } = useLocation();
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/admin/login'); };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex", children: [_jsxs("aside", { className: "hidden md:flex flex-col w-64 bg-green-800 text-white", children: [_jsx("div", { className: "p-4 font-bold text-lg border-b border-green-700", children: "\uD83C\uDFEA WarungDigital" }), _jsx("nav", { className: "flex-1 p-2 space-y-1", children: navItems.map(item => (_jsxs(Link, { to: item.path, className: `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.path ? 'bg-green-600 text-white' : 'text-green-100 hover:bg-green-700'}`, children: [_jsx("span", { children: item.icon }), _jsx("span", { children: item.label })] }, item.path))) }), _jsxs("div", { className: "p-4 border-t border-green-700 text-sm", children: [_jsx("p", { className: "font-medium", children: user?.nama_warung || 'Warung' }), _jsx("p", { className: "text-green-200 text-xs truncate", children: user?.email }), _jsx("button", { onClick: handleLogout, className: "mt-2 text-red-300 hover:text-red-200 text-xs", children: "Logout" })] })] }), _jsxs("div", { className: "flex-1 flex flex-col pb-20 md:pb-0", children: [_jsxs("header", { className: "md:hidden bg-green-600 text-white p-4 flex justify-between items-center", children: [_jsx("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "text-2xl", children: "\u2630" }), _jsx("h1", { className: "font-bold", children: "\uD83C\uDFEA WarungDigital" }), _jsx("div", { className: "w-8" })] }), sidebarOpen && (_jsx("div", { className: "md:hidden fixed inset-0 z-50 bg-black bg-opacity-50", onClick: () => setSidebarOpen(false), children: _jsxs("div", { className: "w-64 bg-green-800 h-full p-4 text-white", onClick: e => e.stopPropagation(), children: [_jsx("button", { onClick: () => setSidebarOpen(false), className: "text-white text-2xl mb-4", children: "\u2715" }), navItems.map(item => (_jsxs(Link, { to: item.path, onClick: () => setSidebarOpen(false), className: `flex items-center gap-3 px-4 py-3 rounded-lg ${pathname === item.path ? 'bg-green-600' : 'hover:bg-green-700'}`, children: [_jsx("span", { children: item.icon }), _jsx("span", { children: item.label })] }, item.path))), _jsx("button", { onClick: handleLogout, className: "mt-4 text-red-300 w-full text-left px-4 py-2", children: "\uD83D\uDEAA Logout" })] }) })), _jsx("main", { className: "flex-1 p-4", children: children })] }), _jsx("nav", { className: "md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40", children: _jsx("div", { className: "flex justify-around py-2 text-xs", children: navItems.slice(0, 5).map(item => (_jsxs(Link, { to: item.path, className: `flex flex-col items-center px-2 ${pathname === item.path ? 'text-green-600' : 'text-gray-500'}`, children: [_jsx("span", { className: "text-xl", children: item.icon }), _jsx("span", { children: item.label })] }, item.path))) }) })] }));
}
