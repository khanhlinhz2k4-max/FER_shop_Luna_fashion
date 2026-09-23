import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Storefront Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import ProfilePage from './pages/ProfilePage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AboutPage from './pages/AboutPage';

// Admin Management Suite Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminPromotionsPage from './pages/admin/AdminPromotionsPage';

import './App.css';

// Automatically scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Client Storefront Layout Wrapper (Navbar + Content + Footer)
function ClientLayout({ children }) {
  return (
    <div className="lune-app-wrapper">
      <Navbar />
      <main className="lune-main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* =================================================================
            1. STOREFRONT CUSTOMER ROUTES (10 Pages + About)
            ================================================================= */}
        <Route path="/" element={<ClientLayout><HomePage /></ClientLayout>} />
        <Route path="/shop" element={<ClientLayout><ShopPage /></ClientLayout>} />
        <Route path="/product/:id" element={<ClientLayout><ProductDetailPage /></ClientLayout>} />
        <Route path="/wishlist" element={<ClientLayout><WishlistPage /></ClientLayout>} />
        <Route path="/cart" element={<ClientLayout><CartPage /></ClientLayout>} />
        <Route path="/checkout" element={<ClientLayout><CheckoutPage /></ClientLayout>} />
        <Route path="/login" element={<ClientLayout><LoginPage /></ClientLayout>} />
        <Route path="/register" element={<ClientLayout><RegisterPage /></ClientLayout>} />
        <Route path="/profile" element={<ClientLayout><ProfilePage /></ClientLayout>} />
        <Route path="/order-tracking" element={<ClientLayout><OrderTrackingPage /></ClientLayout>} />
        <Route path="/about" element={<ClientLayout><AboutPage /></ClientLayout>} />

        {/* =================================================================
            2. ADMIN MANAGEMENT SUITE ROUTES (5 Pages)
            ================================================================= */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/promotions" element={<AdminPromotionsPage />} />

        {/* Fallback */}
        <Route path="*" element={<ClientLayout><HomePage /></ClientLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
