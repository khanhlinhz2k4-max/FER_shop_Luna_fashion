import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, ShieldCheck, Lock, Tag } from 'lucide-react';
import { products } from '../data/products';

export default function CheckoutPage() {
  const [isOrdered, setIsOrdered] = useState(false);
  const location = useLocation();

  // Đọc dữ liệu chuyển tiếp từ CartPage hoặc lấy từ localStorage
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
  const shipping = checkoutData?.shipping ?? (subtotal > 250 ? 0 : 25);
  const discountAmount = checkoutData?.discountAmount ?? 0;
  const appliedVoucher = checkoutData?.appliedVoucher ?? null;
  const total = checkoutData?.total ?? Math.max(0, subtotal - discountAmount + shipping);

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
