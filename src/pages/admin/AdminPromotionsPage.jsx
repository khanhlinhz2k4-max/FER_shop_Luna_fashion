import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Tag, Trash2, CheckCircle2, X, Calendar, Percent } from 'lucide-react';
import { initialPromotions } from '../../data/adminData';

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [newPromo, setNewPromo] = useState({
    code: '',
    discount: '15% OFF',
    type: 'Percentage',
    minSpend: 200,
    maxUsage: 300,
    expiryDate: '2026-12-31'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: `promo-${Date.now()}`,
      code: newPromo.code.toUpperCase().replace(/\s+/g, ''),
      discount: newPromo.discount,
      type: newPromo.type,
      minSpend: Number(newPromo.minSpend),
      usedCount: 0,
      maxUsage: Number(newPromo.maxUsage),
      expiryDate: newPromo.expiryDate,
      status: 'Active'
    };

    setPromotions([created, ...promotions]);
    setIsModalOpen(false);
    setNewPromo({
      code: '',
      discount: '15% OFF',
      type: 'Percentage',
      minSpend: 200,
      maxUsage: 300,
      expiryDate: '2026-12-31'
    });
    showToast(`Promo code ${created.code} activated`);
  };

  const handleDelete = (id) => {
    setPromotions(promotions.filter(p => p.id !== id));
    showToast('Promotion voucher archived');
  };

  return (
    <AdminLayout title="Promotions & Client Privilèges">
      <div className="admin-page-view">
        <div className="admin-header-toolbar">
          <div>
            <h1 className="admin-view-title">Promotions & Vouchers</h1>
            <p className="admin-view-sub">
              Manage bespoke invitations, promotional codes, and private preview privileges.
            </p>
          </div>

          <button 
            type="button" 
            className="admin-primary-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            <span>CREATE PROMO VOUCHER</span>
          </button>
        </div>

        {toastMessage && (
          <div className="toast-notification">
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Promotions Table Card */}
        <div className="admin-table-card">
          <div className="table-responsive-wrapper">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Voucher Code</th>
                  <th>Privilege Benefit</th>
                  <th>Rule Type</th>
                  <th>Minimum Spend</th>
                  <th>Redemption Quota</th>
                  <th>Validity Expiry</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((promo) => (
                  <tr key={promo.id}>
                    <td>
                      <span className="voucher-code-pill">
                        <Tag size={13} />
                        <span>{promo.code}</span>
                      </span>
                    </td>
                    <td>
                      <strong className="discount-bold">{promo.discount}</strong>
                    </td>
                    <td>{promo.type}</td>
                    <td>${promo.minSpend}.00</td>
                    <td>
                      <span className="redemption-counter">
                        {promo.usedCount} / {promo.maxUsage} used
                      </span>
                    </td>
                    <td>{promo.expiryDate}</td>
                    <td>
                      <span className={`status-tag in-stock ${promo.status.toLowerCase().replace(' ', '-')}`}>
                        {promo.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-actions-group" style={{ justifyContent: 'flex-end' }}>
                        <button 
                          type="button" 
                          className="table-action-icon-btn delete"
                          onClick={() => handleDelete(promo.id)}
                          title="Archive voucher"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Voucher Modal */}
        {isModalOpen && (
          <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">Create Atelier Promo Voucher</h3>
                  <p className="modal-subtitle">Generate a bespoke discount code for VIP patrons or campaigns</p>
                </div>
                <button type="button" className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="modal-form">
                <div className="form-group">
                  <label>Voucher Code (uppercase)</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. PRIVILEGE2026"
                    value={newPromo.code}
                    onChange={(e) => setNewPromo({...newPromo, code: e.target.value})}
                    className="form-input" 
                  />
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>Discount Label / Benefit</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. 15% OFF"
                      value={newPromo.discount}
                      onChange={(e) => setNewPromo({...newPromo, discount: e.target.value})}
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <label>Promotion Type</label>
                    <select 
                      className="form-input"
                      value={newPromo.type}
                      onChange={(e) => setNewPromo({...newPromo, type: e.target.value})}
                    >
                      <option value="Percentage">Percentage (%)</option>
                      <option value="Fixed Amount">Fixed Amount ($)</option>
                      <option value="Shipping">Complimentary Shipping</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>Minimum Spend ($)</label>
                    <input 
                      type="number" 
                      value={newPromo.minSpend}
                      onChange={(e) => setNewPromo({...newPromo, minSpend: e.target.value})}
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <label>Usage Limit (Redemptions)</label>
                    <input 
                      type="number" 
                      value={newPromo.maxUsage}
                      onChange={(e) => setNewPromo({...newPromo, maxUsage: e.target.value})}
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Expiration Date</label>
                  <input 
                    type="date" 
                    value={newPromo.expiryDate}
                    onChange={(e) => setNewPromo({...newPromo, expiryDate: e.target.value})}
                    className="form-input" 
                  />
                </div>

                <div className="modal-actions-row">
                  <button type="button" className="modal-cancel-btn" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-primary-btn">
                    <span>ACTIVATE VOUCHER</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
