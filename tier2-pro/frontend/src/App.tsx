import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return <Navigate to="/admin/login" />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/login" element={<div className="p-4"><h1>Login</h1></div>} />
        <Route path="/admin" element={<ProtectedRoute><div className="p-4"><h1>Dashboard</h1></div></ProtectedRoute>} />
        <Route path="/admin/pos" element={<ProtectedRoute><div className="p-4"><h1>POS Kasir</h1></div></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><div className="p-4"><h1>Produk + Tiering Harga</h1></div></ProtectedRoute>} />
        <Route path="/admin/cashdrawer" element={<ProtectedRoute><div className="p-4"><h1>Shift Kasir</h1></div></ProtectedRoute>} />
        <Route path="/admin/ar-ap" element={<ProtectedRoute><div className="p-4"><h1>Hutang / Piutang</h1></div></ProtectedRoute>} />
        <Route path="/admin/marketing" element={<ProtectedRoute><div className="p-4"><h1>Loyalty & Komisi</h1></div></ProtectedRoute>} />
        <Route path="/admin/attendance" element={<ProtectedRoute><div className="p-4"><h1>Absensi</h1></div></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute><div className="p-4"><h1>Laporan</h1></div></ProtectedRoute>} />
        <Route path="/" element={<div className="p-4"><h1>Den Ana — Brontolano Retail</h1></div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
