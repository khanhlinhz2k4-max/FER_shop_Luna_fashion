import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, ShieldCheck, Lock, Tag, Sparkles, Check, X, AlertCircle } from 'lucide-react';
import { products } from '../data/products';
import { initialPromotions } from '../data/adminData';

export default function CheckoutPage() {
  const [isOrdered, setIsOrdered] = useState(false);
  const location = useLocation();

  // Đọc dữ liệu chuyển tiếp từ CartPage, Buy Now hoặc lấy từ localStorage
  const getCheckoutData = () => {
    if (location.state && location.state.items) {
      return location.state;
    }
    try {
      const saved = localStorage.getItem('lune_checkout_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  };

  const checkoutData = getCheckoutData();

  const defaultItems = [
    { ...products[0], quantity: 1, size: 'M' },
    { ...products[1], quantity: 1, size: 'S' }
  ];

  const items = checkoutData?.items || defaultItems;
  const subtotal = checkoutData?.subtotal ?? items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Quản lý voucher tương tác tại Checkout
  const [appliedVoucher, setAppliedVoucher] = useState(checkoutData?.appliedVoucher ?? null);
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [voucherSuccess, setVoucherSuccess] = useState('');

  // Tự động kiểm tra điều kiện minSpend nếu có voucher
  useEffect(() => {
    if (appliedVoucher && appliedVoucher.minSpend && subtotal < appliedVoucher.minSpend) {
      const removedCode = appliedVoucher.code;
      const minReq = appliedVoucher.minSpend;
      setAppliedVoucher(null);
      setVoucherError(`Mã ${removedCode} đã bị hủy vì đơn hàng dưới mức tối thiểu $${minReq}.`);
    }
  }, [subtotal, appliedVoucher]);

  // Tính toán discount và shipping
  let discountAmount = 0;
  let isFreeShippingByVoucher = false;

  if (appliedVoucher && subtotal > 0) {
    if (appliedVoucher.type === 'Percentage') {
      const match = appliedVoucher.discount.match(/(\d+)%/);
      const percent = match ? parseInt(match[1], 10) : 10;
      discountAmount = Math.round((subtotal * percent) / 100);
    } else if (appliedVoucher.type === 'Fixed Amount') {
      const match = appliedVoucher.discount.match(/\$?(\d+)/);
      const fixed = match ? parseInt(match[1], 10) : 50;
      discountAmount = Math.min(fixed, subtotal);
    } else if (appliedVoucher.type === 'Shipping') {
      isFreeShippingByVoucher = true;
    }
  }

  const baseShipping = subtotal > 250 || subtotal === 0 ? 0 : 25;
  const shipping = isFreeShippingByVoucher || subtotal === 0 ? 0 : baseShipping;
  const total = subtotal === 0 ? 0 : Math.max(0, subtotal - discountAmount + shipping);

  const availableVouchers = initialPromotions.filter((p) => p.status === 'Active');

  const handleApplyVoucher = (codeParam) => {
    const code = (typeof codeParam === 'string' ? codeParam : voucherInput).trim().toUpperCase();
    setVoucherError('');
    setVoucherSuccess('');

    if (!code) {
      setVoucherError('Please enter a privilege voucher code.');
      return;
    }

    const found = initialPromotions.find(
      (p) => p.code.toUpperCase() === code && p.status === 'Active'
    );

    if (!found) {
      setVoucherError('Invalid or expired privilege voucher code.');
      return;
    }

    if (found.minSpend && subtotal < found.minSpend) {
      setVoucherError(`Order must be at least $${found.minSpend} to apply ${found.code}.`);
      return;
    }

    setAppliedVoucher(found);
    setVoucherInput('');
    setVoucherSuccess(`Privilege code "${found.code}" applied successfully!`);
    setTimeout(() => setVoucherSuccess(''), 3500);
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherError('');
    setVoucherSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOrdered(true);
  };

  return (
    <div className="lune-checkout-page">
      <div className="checkout-container">
        <Link to="/cart" className="back-to-cart-link">
          <ArrowLeft size={16} />
          <span>Return to Bag</span>
        </Link>

        {isOrdered ? (
          <div className="checkout-success-card">
            <CheckCircle2 size={56} className="success-check-icon" />
            <span className="success-eyebrow">ORDER CONFIRMED</span>
            <h1 className="success-title">Merci Beaucoup</h1>
            <p className="success-desc">
              Your order #LUNE-2026-8941 has been received and is being prepared with care at our atelier.
              A confirmation email has been dispatched with tracking details.
            </p>
            <Link to="/" className="return-home-btn">
              Return to Homepage
            </Link>
          </div>
        ) : (
          <div className="checkout-grid">
            <div className="checkout-form-col">
              <h1 className="checkout-heading">Express Atelier Checkout</h1>
              
              <form onSubmit={handleSubmit} className="checkout-form">
                <section className="form-section">
                  <h3 className="section-subtitle">1. Contact Information</h3>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" required placeholder="sophie@atelier.com" className="form-input" />
                  </div>
                </section>

                <section className="form-section">
                  <h3 className="section-subtitle">2. Shipping Address</h3>
                  <div className="form-row-two">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" required placeholder="Sophie" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" required placeholder="Laurent" className="form-input" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" required placeholder="75 Boulevard Saint-Germain" className="form-input" />
                  </div>

                  <div className="form-row-two">
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" required placeholder="Paris" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label>Postal Code</label>
                      <input type="text" required placeholder="75005" className="form-input" />
                    </div>
                  </div>
                </section>

                <section className="form-section">
                  <h3 className="section-subtitle">3. Payment</h3>
                  <div className="payment-notice-box">
                    <Lock size={18} />
                    <span>Demo Mode — No actual charge will be made.</span>
                  </div>
                  <button type="submit" className="submit-order-btn">
                    <span>COMPLETE ORDER — ${typeof total === 'number' ? total.toFixed(2) : total}</span>
                  </button>
                </section>
              </form>
            </div>

            <div className="checkout-sidebar-col">
              <div className="summary-box">
                <h3 className="summary-title">Summary ({items.length} Items)</h3>
                {items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="summary-row">
                    <span>{item.name} ({item.size}) × {item.quantity}</span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
                
                <div className="summary-row">
                  <span>Worldwide Shipping</span>
                  <span className="free-tag">
                    {shipping === 0 ? 'COMPLIMENTARY' : `$${shipping}`}
                  </span>
                </div>

                {appliedVoucher && (
                  <div className="summary-row discount-row">
                    <span>Privilege ({appliedVoucher.code})</span>
                    <span>
                      {appliedVoucher.type === 'Shipping'
                        ? 'Free Delivery'
                        : `-$${discountAmount}.00`}
                    </span>
                  </div>
                )}

                {/* KHU VỰC VOUCHER / PRIVILEGE CODE TRÊN CHECKOUT */}
                <div className="cart-voucher-section">
                  <div className="voucher-label-row">
                    <span className="voucher-label">
                      <Tag size={13} />
                      <span>Client Privilege Code</span>
                    </span>
                  </div>

                  {appliedVoucher ? (
                    <div className="voucher-applied-card">
                      <div className="applied-card-left">
                        <Sparkles size={16} className="applied-card-icon" />
                        <div className="applied-card-texts">
                          <span className="applied-card-code">{appliedVoucher.code}</span>
                          <span className="applied-card-benefit">{appliedVoucher.discount}</span>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className="voucher-remove-btn"
                        onClick={handleRemoveVoucher}
                        title="Remove voucher"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleApplyVoucher();
                      }}
                      className="voucher-input-group"
                    >
                      <input 
                        type="text" 
                        placeholder="ENTER PROMO CODE"
                        value={voucherInput}
                        onChange={(e) => setVoucherInput(e.target.value)}
                        className="voucher-input"
                      />
                      <button 
                        type="submit" 
                        className="voucher-apply-btn"
                        disabled={!voucherInput.trim()}
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {/* Thông báo phản hồi */}
                  {voucherError && (
                    <div className="voucher-msg-row error">
                      <AlertCircle size={13} />
                      <span>{voucherError}</span>
                    </div>
                  )}
                  {voucherSuccess && (
                    <div className="voucher-msg-row success">
                      <Check size={13} />
                      <span>{voucherSuccess}</span>
                    </div>
                  )}

                  {/* Gợi ý mã có sẵn */}
                  {!appliedVoucher && availableVouchers.length > 0 && (
                    <div className="voucher-suggestions">
                      <span className="suggestions-title">
                        <Sparkles size={12} />
                        <span>Available Atelier Privileges</span>
                      </span>
                      <div className="suggestions-chips">
                        {availableVouchers.map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            className="voucher-chip-btn"
                            onClick={() => handleApplyVoucher(v.code)}
                            title={`Click to apply ${v.code} (${v.discount})`}
                          >
                            <span className="voucher-chip-code">{v.code}</span>
                            <span className="voucher-chip-perk">• {v.discount}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="summary-divider" />
                <div className="summary-total-row">
                  <span>Total</span>
                  <span>${typeof total === 'number' ? total.toFixed(2) : total}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
