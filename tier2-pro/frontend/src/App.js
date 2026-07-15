import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import POSPage from './pages/admin/POSPage';
import ProductsPage from './pages/admin/ProductsPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import CashdrawerPage from './pages/admin/CashdrawerPage';
import ArApPage from './pages/admin/ArApPage';
import MarketingPage from './pages/admin/MarketingPage';
import AttendancePage from './pages/admin/AttendancePage';
import StockPage from './pages/admin/StockPage';
import StorefrontPage from './pages/admin/StorefrontPage';
import WebhooksPage from './pages/admin/WebhooksPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';
import CustomersPage from './pages/admin/CustomersPage';
import SuppliersPage from './pages/admin/SuppliersPage';
import ExpensesPage from './pages/admin/ExpensesPage';
import BranchesPage from './pages/admin/BranchesPage';
import StaffPage from './pages/admin/StaffPage';
import ReceiptPage from './pages/admin/ReceiptPage';
import MultiUnitPage from './pages/admin/MultiUnitPage';
import StockMutationPage from './pages/admin/StockMutationPage';
import QrisPage from './pages/admin/QrisPage';
import PpobPage from './pages/admin/PpobPage';
import FoodMenuPage from './pages/admin/FoodMenuPage';
import PosOfflinePage from './pages/admin/PosOfflinePage';
import LinktokoPage from './pages/admin/LinktokoPage';
import ReferralPage from './pages/admin/ReferralPage';
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
    return (_jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/products", element: _jsx(Katalog, {}) }), _jsx(Route, { path: "/products/:id", element: _jsx(Detail, {}) }), _jsx(Route, { path: "/checkout", element: _jsx(Checkout, {}) }), _jsx(Route, { path: "/orders/track", element: _jsx(TrackOrder, {}) }), _jsx(Route, { path: "/admin/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/admin/pos", element: _jsx(ProtectedRoute, { children: _jsx(POSPage, {}) }) }), _jsx(Route, { path: "/admin/products", element: _jsx(ProtectedRoute, { children: _jsx(ProductsPage, {}) }) }), _jsx(Route, { path: "/admin/categories", element: _jsx(ProtectedRoute, { children: _jsx(CategoriesPage, {}) }) }), _jsx(Route, { path: "/admin/customers", element: _jsx(ProtectedRoute, { children: _jsx(CustomersPage, {}) }) }), _jsx(Route, { path: "/admin/suppliers", element: _jsx(ProtectedRoute, { children: _jsx(SuppliersPage, {}) }) }), _jsx(Route, { path: "/admin/expenses", element: _jsx(ProtectedRoute, { children: _jsx(ExpensesPage, {}) }) }), _jsx(Route, { path: "/admin/cashdrawer", element: _jsx(ProtectedRoute, { children: _jsx(CashdrawerPage, {}) }) }), _jsx(Route, { path: "/admin/ar-ap", element: _jsx(ProtectedRoute, { children: _jsx(ArApPage, {}) }) }), _jsx(Route, { path: "/admin/marketing", element: _jsx(ProtectedRoute, { children: _jsx(MarketingPage, {}) }) }), _jsx(Route, { path: "/admin/stock", element: _jsx(ProtectedRoute, { children: _jsx(StockPage, {}) }) }), _jsx(Route, { path: "/admin/storefront", element: _jsx(ProtectedRoute, { children: _jsx(StorefrontPage, {}) }) }), _jsx(Route, { path: "/admin/staff", element: _jsx(ProtectedRoute, { children: _jsx(StaffPage, {}) }) }), _jsx(Route, { path: "/admin/attendance", element: _jsx(ProtectedRoute, { children: _jsx(AttendancePage, {}) }) }), _jsx(Route, { path: "/admin/branches", element: _jsx(ProtectedRoute, { children: _jsx(BranchesPage, {}) }) }), _jsx(Route, { path: "/admin/receipt", element: _jsx(ProtectedRoute, { children: _jsx(ReceiptPage, {}) }) }), _jsx(Route, { path: "/admin/multi-unit", element: _jsx(ProtectedRoute, { children: _jsx(MultiUnitPage, {}) }) }), _jsx(Route, { path: "/admin/stock-mutation", element: _jsx(ProtectedRoute, { children: _jsx(StockMutationPage, {}) }) }), _jsx(Route, { path: "/admin/qris", element: _jsx(ProtectedRoute, { children: _jsx(QrisPage, {}) }) }), _jsx(Route, { path: "/admin/ppob", element: _jsx(ProtectedRoute, { children: _jsx(PpobPage, {}) }) }), _jsx(Route, { path: "/admin/food-menu", element: _jsx(ProtectedRoute, { children: _jsx(FoodMenuPage, {}) }) }), _jsx(Route, { path: "/admin/pos-offline", element: _jsx(ProtectedRoute, { children: _jsx(PosOfflinePage, {}) }) }), _jsx(Route, { path: "/admin/linktoko", element: _jsx(ProtectedRoute, { children: _jsx(LinktokoPage, {}) }) }), _jsx(Route, { path: "/admin/referral", element: _jsx(ProtectedRoute, { children: _jsx(ReferralPage, {}) }) }), _jsx(Route, { path: "/admin/webhooks", element: _jsx(ProtectedRoute, { children: _jsx(WebhooksPage, {}) }) }), _jsx(Route, { path: "/admin/reports", element: _jsx(ProtectedRoute, { children: _jsx(ReportsPage, {}) }) }), _jsx(Route, { path: "/admin/settings", element: _jsx(ProtectedRoute, { children: _jsx(SettingsPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }));
}
