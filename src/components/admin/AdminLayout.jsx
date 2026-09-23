import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shirt, 
  FolderTree, 
  ShoppingBag, 
  Tag, 
  ArrowLeft, 
  Menu, 
  X, 
  Bell, 
  Search, 
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children, title = "Atelier Executive Suite" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/products", label: "Products Catalog", icon: Shirt },
    { to: "/admin/categories", label: "Categories", icon: FolderTree },
    { to: "/admin/orders", label: "Orders & Fulfillment", icon: ShoppingBag, badge: "5" },
    { to: "/admin/promotions", label: "Promotions & Vouchers", icon: Tag },
  ];

  return (
    <div className="admin-root-container">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="admin-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Admin Left Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-brand-link">
            <span className="admin-brand-title">L U N E</span>
            <span className="admin-brand-badge">ADMIN ATELIER</span>
          </Link>
          <button 
            type="button" 
            className="admin-sidebar-close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="admin-nav-menu">
          <span className="admin-nav-section-title">MANAGEMENT SUITE</span>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <IconComponent size={18} className="admin-nav-icon" />
                <span className="admin-nav-label">{item.label}</span>
                {item.badge && <span className="admin-nav-badge">{item.badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-card">
            <div className="admin-avatar">AD</div>
            <div className="admin-user-details">
              <span className="admin-user-name">Atelier Director</span>
              <span className="admin-user-role">Super Admin</span>
            </div>
          </div>

          <Link to="/" className="return-storefront-btn">
            <ArrowLeft size={16} />
            <span>Storefront Front-End</span>
          </Link>
        </div>
      </aside>

      {/* Admin Right Main Content Area */}
      <div className="admin-main-wrapper">
        {/* Topbar Header */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button 
              type="button"
              className="admin-hamburger-btn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={20} />
            </button>
            <div className="topbar-breadcrumb">
              <span className="topbar-parent">Management</span>
              <span className="topbar-slash">/</span>
              <span className="topbar-current">{title}</span>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-search">
              <Search size={16} className="topbar-search-icon" />
              <input type="text" placeholder="Quick search SKU, Order, Client..." />
            </div>

            <button type="button" className="topbar-icon-btn" title="System alerts">
              <Bell size={18} />
              <span className="topbar-notification-dot" />
            </button>

            <Link to="/" target="_blank" className="live-store-chip" title="Open customer store in new tab">
              <span>Live Store</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="admin-page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
