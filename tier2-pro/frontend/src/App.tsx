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
        {/* Storefront */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Katalog />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders/track" element={<TrackOrder />} />

        {/* Admin */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/admin/pos" element={<ProtectedRoute><POSPage /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
        <Route path="/admin/customers" element={<ProtectedRoute><CustomersPage /></ProtectedRoute>} />
        <Route path="/admin/suppliers" element={<ProtectedRoute><SuppliersPage /></ProtectedRoute>} />
        <Route path="/admin/expenses" element={<ProtectedRoute><ExpensesPage /></ProtectedRoute>} />
        <Route path="/admin/cashdrawer" element={<ProtectedRoute><CashdrawerPage /></ProtectedRoute>} />
        <Route path="/admin/ar-ap" element={<ProtectedRoute><ArApPage /></ProtectedRoute>} />
        <Route path="/admin/marketing" element={<ProtectedRoute><MarketingPage /></ProtectedRoute>} />
        <Route path="/admin/stock" element={<ProtectedRoute><StockPage /></ProtectedRoute>} />
        <Route path="/admin/storefront" element={<ProtectedRoute><StorefrontPage /></ProtectedRoute>} />
        <Route path="/admin/staff" element={<ProtectedRoute><StaffPage /></ProtectedRoute>} />
        <Route path="/admin/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
        <Route path="/admin/branches" element={<ProtectedRoute><BranchesPage /></ProtectedRoute>} />
        <Route path="/admin/receipt" element={<ProtectedRoute><ReceiptPage /></ProtectedRoute>} />
        <Route path="/admin/multi-unit" element={<ProtectedRoute><MultiUnitPage /></ProtectedRoute>} />
        <Route path="/admin/stock-mutation" element={<ProtectedRoute><StockMutationPage /></ProtectedRoute>} />
        <Route path="/admin/qris" element={<ProtectedRoute><QrisPage /></ProtectedRoute>} />
        <Route path="/admin/ppob" element={<ProtectedRoute><PpobPage /></ProtectedRoute>} />
        <Route path="/admin/food-menu" element={<ProtectedRoute><FoodMenuPage /></ProtectedRoute>} />
        <Route path="/admin/pos-offline" element={<ProtectedRoute><PosOfflinePage /></ProtectedRoute>} />
        <Route path="/admin/linktoko" element={<ProtectedRoute><LinktokoPage /></ProtectedRoute>} />
        <Route path="/admin/referral" element={<ProtectedRoute><ReferralPage /></ProtectedRoute>} />
        <Route path="/admin/webhooks" element={<ProtectedRoute><WebhooksPage /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
