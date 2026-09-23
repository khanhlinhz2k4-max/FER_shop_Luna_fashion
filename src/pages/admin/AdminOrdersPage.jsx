import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Search, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle, 
  Filter,
  Download
} from 'lucide-react';
import { initialOrders } from '../../data/adminData';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, shippingStatus: newStatus };
      }
      return o;
    }));
    showToast(`Order #${orderId} status updated to ${newStatus}`);
  };

  const filteredOrders = orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        o.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || o.shippingStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout title="Orders & Fulfillment Management">
      <div className="admin-page-view">
        <div className="admin-header-toolbar">
          <div>
            <h1 className="admin-view-title">Atelier Orders & Fulfillment</h1>
            <p className="admin-view-sub">
              Monitor client purchases, dispatch statuses, and logistics tracking.
            </p>
          </div>

          <button 
            type="button" 
            className="admin-secondary-btn"
            onClick={() => showToast('Orders list exported to CSV')}
          >
            <Download size={16} />
            <span>EXPORT DISPATCH LOG</span>
          </button>
        </div>

        {toastMessage && (
          <div className="toast-notification">
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="admin-filter-bar">
          <div className="admin-search-wrap">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by Order ID, client name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="admin-filter-options">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-select"
            >
              <option value="ALL">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <span className="count-pill">{filteredOrders.length} Orders</span>
          </div>
        </div>

        {/* Orders Table Card */}
        <div className="admin-table-card">
          <div className="table-responsive-wrapper">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Order Reference</th>
                  <th>Client Profile</th>
                  <th>Order Date</th>
                  <th>Pieces</th>
                  <th>Total Amount</th>
                  <th>Payment Method</th>
                  <th>Shipping / Logistics Status</th>
                  <th style={{ textAlign: 'right' }}>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <span className="order-code-bold">#{o.id}</span>
                    </td>
                    <td>
                      <div className="client-cell">
                        <span className="client-name">{o.customer}</span>
                        <span className="client-email">{o.email}</span>
                      </div>
                    </td>
                    <td>{o.date}</td>
                    <td>{o.items} items</td>
                    <td>
                      <strong className="price-tag">${o.total}.00</strong>
                    </td>
                    <td>
                      <div className="payment-method-cell">
                        <span className="status-tag payment paid">{o.paymentStatus}</span>
                        <span className="text-muted" style={{ fontSize: '11px', display: 'block', marginTop: '2px' }}>
                          {o.method}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-tag shipping ${o.shippingStatus.toLowerCase().replace(' ', '-')}`}>
                        {o.shippingStatus}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <select 
                        value={o.shippingStatus}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className="status-changer-select"
                      >
                        <option value="Processing">Processing</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
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
