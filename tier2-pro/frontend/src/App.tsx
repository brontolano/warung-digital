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
import StockPage from './pages/admin/StockPage';
import StorefrontPage from './pages/admin/StorefrontPage';
import WebhooksPage from './pages/admin/WebhooksPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';

// Storefront
import Home from './pages/storefront/Home';
import Katalog from './pages/storefront/Katalog';
import Detail from './pages/storefront/Detail';
import Checkout from './pages/storefront/Checkout';
import TrackOrder from './pages/storefront/TrackOrder';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8 text-center text-gray-500">Memuat...</div>;
  if (!user) return <Navigate to="/admin/login" />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Storefront (Public) */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Katalog />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders/track" element={<TrackOrder />} />

        {/* Admin Panel */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/admin/pos" element={<ProtectedRoute><POSPage /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/admin/cashdrawer" element={<ProtectedRoute><CashdrawerPage /></ProtectedRoute>} />
        <Route path="/admin/ar-ap" element={<ProtectedRoute><ArApPage /></ProtectedRoute>} />
        <Route path="/admin/marketing" element={<ProtectedRoute><MarketingPage /></ProtectedRoute>} />
        <Route path="/admin/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
        <Route path="/admin/stock" element={<ProtectedRoute><StockPage /></ProtectedRoute>} />
        <Route path="/admin/storefront" element={<ProtectedRoute><StorefrontPage /></ProtectedRoute>} />
        <Route path="/admin/webhooks" element={<ProtectedRoute><WebhooksPage /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
