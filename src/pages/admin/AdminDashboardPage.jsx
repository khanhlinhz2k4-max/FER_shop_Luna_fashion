import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  DollarSign, 
  ShoppingBag, 
  Shirt, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  AlertTriangle,
  Package,
  Calendar,
  Eye
} from 'lucide-react';
import { adminKPIs, weeklyRevenueData, initialOrders } from '../../data/adminData';
import { products } from '../../data/products';

export default function AdminDashboardPage() {
  return (
    <AdminLayout title="Atelier Executive Dashboard">
      <div className="admin-dashboard-view">
        {/* Welcome Banner */}
        <div className="admin-welcome-banner">
          <div>
            <h1 className="admin-welcome-title">Welcome back, Atelier Director</h1>
            <p className="admin-welcome-sub">
              Here is what is happening across the LUNE Maison today • Autumn/Winter 2026 Season
            </p>
          </div>
          <Link to="/admin/products" className="admin-primary-btn">
            <span>MANAGE CATALOG</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="admin-kpi-grid">
          {/* Card 1: Revenue */}
          <div className="kpi-card">
            <div className="kpi-icon-wrap revenue">
              <DollarSign size={20} />
            </div>
            <div className="kpi-body">
              <span className="kpi-label">Gross Revenue</span>
              <h3 className="kpi-value">${adminKPIs.totalRevenue.toLocaleString()}</h3>
              <div className="kpi-growth positive">
                <TrendingUp size={14} />
                <span>{adminKPIs.revenueGrowth} vs last month</span>
              </div>
            </div>
          </div>

          {/* Card 2: Orders */}
          <div className="kpi-card">
            <div className="kpi-icon-wrap orders">
              <ShoppingBag size={20} />
            </div>
            <div className="kpi-body">
              <span className="kpi-label">Total Orders</span>
              <h3 className="kpi-value">{adminKPIs.totalOrders}</h3>
              <div className="kpi-growth positive">
                <TrendingUp size={14} />
                <span>{adminKPIs.ordersGrowth} fulfillment rate</span>
              </div>
            </div>
          </div>

          {/* Card 3: Products */}
          <div className="kpi-card">
            <div className="kpi-icon-wrap products">
              <Shirt size={20} />
            </div>
            <div className="kpi-body">
              <span className="kpi-label">Active Silhouettes</span>
              <h3 className="kpi-value">{adminKPIs.activeProducts}</h3>
              <div className="kpi-growth alert">
                <AlertTriangle size={14} />
                <span>{adminKPIs.stockAlerts} items low stock</span>
              </div>
            </div>
          </div>

          {/* Card 4: Clients */}
          <div className="kpi-card">
            <div className="kpi-icon-wrap clients">
              <Users size={20} />
            </div>
            <div className="kpi-body">
              <span className="kpi-label">Atelier Members</span>
              <h3 className="kpi-value">{adminKPIs.atelierClients.toLocaleString()}</h3>
              <div className="kpi-growth positive">
                <TrendingUp size={14} />
                <span>{adminKPIs.clientsGrowth} new patrons</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts & Split Summary Row */}
        <div className="admin-split-grid">
          {/* Revenue Weekly Bar Chart */}
          <div className="admin-chart-card">
            <div className="card-header-row">
              <div>
                <h3 className="card-heading">Weekly Revenue Overview</h3>
                <p className="card-subheading">Daily sales metrics across European and Global boutiques</p>
              </div>
              <span className="chart-total-chip">7-Day Total: $52,000</span>
            </div>

            <div className="revenue-bars-container">
              {weeklyRevenueData.map((col, idx) => (
                <div key={idx} className="bar-column">
                  <div className="bar-track">
                    <div 
                      className="bar-fill" 
                      style={{ height: col.height }} 
                      title={`$${col.amount.toLocaleString()}`}
                    >
                      <span className="bar-tooltip">${col.amount}</span>
                    </div>
                  </div>
                  <span className="bar-day">{col.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Inventory / Low Stock Alert Panel */}
          <div className="admin-alert-card">
            <div className="card-header-row">
              <h3 className="card-heading">Low Inventory Watch</h3>
              <Link to="/admin/products" className="view-all-table-link">Manage</Link>
            </div>

            <div className="low-stock-items-list">
              <div className="stock-item-row">
                <img src={products[0].image} alt="Coat" className="stock-thumb" />
                <div className="stock-info">
                  <h4 className="stock-name">L'Aurore Wool Coat</h4>
                  <span className="stock-sku">SKU: LUNE-WC-01</span>
                </div>
                <span className="stock-pill critical">3 Left (Size M)</span>
              </div>

              <div className="stock-item-row">
                <img src={products[1].image} alt="Dress" className="stock-thumb" />
                <div className="stock-info">
                  <h4 className="stock-name">Sérénité Silk Dress</h4>
                  <span className="stock-sku">SKU: LUNE-SD-02</span>
                </div>
                <span className="stock-pill warning">5 Left (Size S)</span>
              </div>

              <div className="stock-item-row">
                <img src={products[3].image} alt="Knit" className="stock-thumb" />
                <div className="stock-info">
                  <h4 className="stock-name">Solstice Cashmere Knit</h4>
                  <span className="stock-sku">SKU: LUNE-CK-04</span>
                </div>
                <span className="stock-pill warning">4 Left (Size XS)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="admin-table-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-heading">Recent Atelier Orders</h3>
              <p className="card-subheading">Latest client purchases awaiting dispatch or fulfillment</p>
            </div>
            <Link to="/admin/orders" className="view-all-table-link">
              <span>View All 384 Orders</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="table-responsive-wrapper">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Order Reference</th>
                  <th>Client Name</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Fulfillment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {initialOrders.slice(0, 4).map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span className="order-code-bold">#{order.id}</span>
                    </td>
                    <td>
                      <div className="client-cell">
                        <span className="client-name">{order.customer}</span>
                        <span className="client-email">{order.email}</span>
                      </div>
                    </td>
                    <td>{order.date}</td>
                    <td>{order.items} pcs</td>
                    <td>
                      <strong>${order.total}</strong>
                    </td>
                    <td>
                      <span className={`status-tag payment ${order.paymentStatus.toLowerCase()}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`status-tag shipping ${order.shippingStatus.toLowerCase().replace(' ', '-')}`}>
                        {order.shippingStatus}
                      </span>
                    </td>
                    <td>
                      <Link to="/admin/orders" className="table-action-icon-btn" title="Inspect Order">
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
