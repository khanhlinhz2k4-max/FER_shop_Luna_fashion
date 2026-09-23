import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';

export default function CartPage() {
  const sampleItems = [
    { ...products[0], quantity: 1, size: 'M' },
    { ...products[1], quantity: 1, size: 'S' }
  ];

  const subtotal = sampleItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 250 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div className="lune-cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Atelier Bag</h1>
        <p className="cart-subtitle">Review your selected pieces before proceeding to checkout.</p>

        <div className="cart-layout-grid">
          {/* Cart Items List */}
          <div className="cart-items-col">
            {sampleItems.map((item) => (
              <div key={item.id} className="cart-item-row">
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
              </div>
            ))}

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
                <span>{shipping === 0 ? 'COMPLIMENTARY' : `$${shipping}`}</span>
              </div>
              
              <div className="summary-divider" />
              
              <div className="summary-total-row">
                <span>Total</span>
                <span>${total}</span>
              </div>

              <Link to="/checkout" className="checkout-btn">
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
