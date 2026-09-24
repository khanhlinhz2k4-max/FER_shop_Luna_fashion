import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft, Tag, Check, X, Sparkles, AlertCircle } from 'lucide-react';
import { products } from '../data/products';
import { initialPromotions } from '../data/adminData';

export default function CartPage() {
  const [items, setItems] = useState([
    { ...products[0], quantity: 1, size: 'M' },
    { ...products[1], quantity: 1, size: 'S' }
  ]);
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState('');
  const [voucherSuccess, setVoucherSuccess] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Tự động kiểm tra điều kiện minSpend nếu giỏ hàng thay đổi
  useEffect(() => {
    if (appliedVoucher && appliedVoucher.minSpend && subtotal < appliedVoucher.minSpend) {
      const removedCode = appliedVoucher.code;
      const minReq = appliedVoucher.minSpend;
      setAppliedVoucher(null);
      setVoucherError(`Mã ${removedCode} đã bị hủy vì đơn hàng dưới mức tối thiểu $${minReq}.`);
    }
  }, [subtotal, appliedVoucher]);

  // Tính mức giảm giá theo từng loại hình voucher
  let discountAmount = 0;
  let isFreeShippingByVoucher = false;

  if (appliedVoucher) {
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

  const baseShipping = subtotal > 250 ? 0 : 25;
  const shipping = isFreeShippingByVoucher ? 0 : baseShipping;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  // Xử lý áp dụng mã
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

  const handleRemoveItem = (id, size) => {
    setItems(items.filter((item) => !(item.id === id && item.size === size)));
  };

  const availableVouchers = initialPromotions.filter((p) => p.status === 'Active');

  // Đồng bộ giỏ hàng và voucher sang localStorage để CheckoutPage nhận được
  useEffect(() => {
    try {
      localStorage.setItem('lune_checkout_data', JSON.stringify({
        items,
        subtotal,
        shipping,
        discountAmount,
        appliedVoucher,
        total
      }));
    } catch (e) {}
  }, [items, subtotal, shipping, discountAmount, appliedVoucher, total]);

  return (
    <div className="lune-cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Atelier Bag</h1>
        <p className="cart-subtitle">Review your selected pieces before proceeding to checkout.</p>

        <div className="cart-layout-grid">
          {/* Cart Items List */}
          <div className="cart-items-col">
            {items.length === 0 ? (
              <div className="empty-cart-notice" style={{ padding: '48px 0', textAlign: 'center' }}>
                <ShoppingBag size={48} style={{ color: 'var(--color-beige)', marginBottom: 16 }} />
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>Your Atelier Bag is Empty</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>Explore our bespoke runway collections.</p>
                <Link to="/shop" className="checkout-btn" style={{ maxWidth: 240, margin: '0 auto' }}>
                  DISCOVER COLLECTION
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="cart-item-thumb" />
                  <div className="cart-item-info">
                    <span className="cart-item-cat">{item.category}</span>
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-meta">
                      <span>Size: {item.size}</span>
                      <span>•</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <span className="cart-item-price">${item.price}</span>
                  </div>
                  <button 
                    type="button" 
                    className="cart-item-remove-btn" 
                    onClick={() => handleRemoveItem(item.id, item.size)}
                    title="Remove piece"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}

            <Link to="/shop" className="continue-shopping-link">
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-col">
            <div className="summary-box">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="summary-row">
                <span>Estimated Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <strong style={{ color: '#3b6b3e' }}>COMPLIMENTARY</strong>
                  ) : (
                    `$${shipping}`
                  )}
                </span>
              </div>

              {/* Dòng hiển thị giảm giá nếu có voucher */}
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

              {/* KHU VỰC VOUCHER / PRIVILEGE CODE */}
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
                <span>${total}</span>
              </div>

              <Link 
                to="/checkout" 
                state={{ items, subtotal, shipping, discountAmount, appliedVoucher, total }}
                className="checkout-btn"
                style={{ pointerEvents: items.length === 0 ? 'none' : 'auto', opacity: items.length === 0 ? 0.6 : 1 }}
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={17} />
              </Link>

              <div className="cart-perks-note">
                <p>🔒 256-bit Encrypted Secure Checkout</p>
                <p>✨ 30-Day Doorstep Complimentary Return</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
