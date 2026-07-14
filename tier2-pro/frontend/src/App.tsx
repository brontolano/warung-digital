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
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/admin/pos" element={<ProtectedRoute><POSPage /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/admin/cashdrawer" element={<ProtectedRoute><CashdrawerPage /></ProtectedRoute>} />
        <Route path="/admin/ar-ap" element={<ProtectedRoute><ArApPage /></ProtectedRoute>} />
        <Route path="/admin/marketing" element={<ProtectedRoute><MarketingPage /></ProtectedRoute>} />
        <Route path="/admin/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4"><div className="text-center max-w-md"><div className="text-6xl mb-4">🏪</div><h1 className="text-3xl font-bold text-green-800 mb-2">Den Ana — Brontolano Retail</h1><p className="text-gray-500 mb-6">Platform manajemen toko & warung</p><a href="/admin/login" className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold inline-block">Masuk ke Admin</a></div></div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
