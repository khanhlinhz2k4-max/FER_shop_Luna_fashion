import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const [isOrdered, setIsOrdered] = useState(false);

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
                    <span>COMPLETE ORDER — $605.00</span>
                  </button>
                </section>
              </form>
            </div>

            <div className="checkout-sidebar-col">
              <div className="summary-box">
                <h3 className="summary-title">Summary (2 Items)</h3>
                <div className="summary-row">
                  <span>L'Aurore Wool Coat (M)</span>
                  <span>$345</span>
                </div>
                <div className="summary-row">
                  <span>Sérénité Silk Dress (S)</span>
                  <span>$260</span>
                </div>
                <div className="summary-row">
                  <span>Worldwide Shipping</span>
                  <span className="free-tag">COMPLIMENTARY</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-total-row">
                  <span>Total</span>
                  <span>$605.00</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
