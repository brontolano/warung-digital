import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import POSPage from './pages/admin/POSPage';
import ProductsPage from './pages/admin/ProductsPage';
import CashdrawerPage from './pages/admin/CashdrawerPage';
import ArApPage from './pages/admin/ArApPage';
import MarketingPage from './pages/admin/MarketingPage';
import AttendancePage from './pages/admin/AttendancePage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';
// Storefront
import Home from './pages/storefront/Home';
import Katalog from './pages/storefront/Katalog';
import Detail from './pages/storefront/Detail';
import Checkout from './pages/storefront/Checkout';
import TrackOrder from './pages/storefront/TrackOrder';
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading)
        return _jsx("div", { className: "p-8 text-center text-gray-500", children: "Memuat..." });
    if (!user)
        return _jsx(Navigate, { to: "/admin/login" });
    return _jsx(_Fragment, { children: children });
}
export default function App() {
    return (_jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/products", element: _jsx(Katalog, {}) }), _jsx(Route, { path: "/products/:id", element: _jsx(Detail, {}) }), _jsx(Route, { path: "/checkout", element: _jsx(Checkout, {}) }), _jsx(Route, { path: "/orders/track", element: _jsx(TrackOrder, {}) }), _jsx(Route, { path: "/admin/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/admin/pos", element: _jsx(ProtectedRoute, { children: _jsx(POSPage, {}) }) }), _jsx(Route, { path: "/admin/products", element: _jsx(ProtectedRoute, { children: _jsx(ProductsPage, {}) }) }), _jsx(Route, { path: "/admin/cashdrawer", element: _jsx(ProtectedRoute, { children: _jsx(CashdrawerPage, {}) }) }), _jsx(Route, { path: "/admin/ar-ap", element: _jsx(ProtectedRoute, { children: _jsx(ArApPage, {}) }) }), _jsx(Route, { path: "/admin/marketing", element: _jsx(ProtectedRoute, { children: _jsx(MarketingPage, {}) }) }), _jsx(Route, { path: "/admin/attendance", element: _jsx(ProtectedRoute, { children: _jsx(AttendancePage, {}) }) }), _jsx(Route, { path: "/admin/reports", element: _jsx(ProtectedRoute, { children: _jsx(ReportsPage, {}) }) }), _jsx(Route, { path: "/admin/settings", element: _jsx(ProtectedRoute, { children: _jsx(SettingsPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }));
}
