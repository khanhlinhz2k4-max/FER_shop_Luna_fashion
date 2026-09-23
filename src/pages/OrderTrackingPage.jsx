import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Search, 
  Calendar,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { products } from '../data/products';

export default function OrderTrackingPage() {
  const [orderQuery, setOrderQuery] = useState('LUNE-8941');
  const [isSearched, setIsSearched] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setIsSearched(true);
    }
  };

  const steps = [
    {
      title: "Order Confirmed",
      description: "Payment verified & sent to Paris workshop",
      date: "Sep 22, 2026 • 10:15 AM",
      completed: true,
      current: false
    },
    {
      title: "Atelier Tailoring & Preparation",
      description: "Garment inspected, pressed & packed in signature gift box",
      date: "Sep 22, 2026 • 02:40 PM",
      completed: true,
      current: false
    },
    {
      title: "Dispatched & In Transit",
      description: "Departed Paris Roissy Hub via DHL Express Air",
      date: "Sep 23, 2026 • 08:30 AM",
      completed: false,
      current: true
    },
    {
      title: "Out for Delivery",
      description: "Scheduled doorstep delivery with signature verification",
      date: "Estimated: Sep 25, 2026",
      completed: false,
      current: false
    }
  ];

  return (
    <div className="lune-tracking-page">
      <div className="tracking-container">
        {/* Breadcrumb */}
        <nav className="shop-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Order Tracking</span>
        </nav>

        {/* Tracking Header */}
        <div className="tracking-header">
          <span className="section-eyebrow">CONCIERGE LOGISTICS</span>
          <h1 className="tracking-title">Track Your Atelier Shipment</h1>
          <p className="tracking-subtitle">
            Follow the journey of your handcrafted pieces from our European workshop to your doorstep.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="tracking-search-form">
            <Search size={18} className="tracking-search-icon" />
            <input 
              type="text" 
              placeholder="Enter Order ID (e.g. LUNE-8941)"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="tracking-input"
            />
            <button type="submit" className="tracking-btn">
              <span>TRACK ORDER</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {isSearched && (
          <div className="tracking-result-card">
            {/* Status Top Strip */}
            <div className="tracking-status-strip">
              <div>
                <span className="tracking-eyebrow">ORDER REFERENCE</span>
                <h2 className="tracking-order-id">#{orderQuery}</h2>
              </div>
              <div className="status-badge-wrap">
                <span className="live-status-pill in-transit">
                  <Truck size={15} />
                  <span>IN TRANSIT</span>
                </span>
                <span className="estimated-arrival">Estimated: Friday, Sep 25</span>
              </div>
            </div>

            {/* 4-Step Timeline */}
            <div className="timeline-container">
              <div className="timeline-track">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`timeline-step ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}
                  >
                    <div className="step-node-col">
                      <div className="step-node">
                        {step.completed ? (
                          <CheckCircle2 size={18} />
                        ) : step.current ? (
                          <div className="current-pulse-dot" />
                        ) : (
                          <Clock size={16} />
                        )}
                      </div>
                      {index < steps.length - 1 && <div className="step-connector" />}
                    </div>

                    <div className="step-content">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-desc">{step.description}</p>
                      <span className="step-date">{step.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipment Meta Details */}
            <div className="shipment-meta-grid">
              <div className="meta-box">
                <MapPin size={20} className="meta-icon" />
                <div>
                  <h4 className="meta-title">Delivery Destination</h4>
                  <p className="meta-value">Elena Rostova</p>
                  <p className="meta-sub">75 Boulevard Saint-Germain, Paris, France</p>
                </div>
              </div>

              <div className="meta-box">
                <Truck size={20} className="meta-icon" />
                <div>
                  <h4 className="meta-title">Carrier & Airway Bill</h4>
                  <p className="meta-value">DHL Express International</p>
                  <p className="meta-sub">AWB # 984 213 942 10</p>
                </div>
              </div>

              <div className="meta-box">
                <Package size={20} className="meta-icon" />
                <div>
                  <h4 className="meta-title">Package Content</h4>
                  <p className="meta-value">2 Garments (1.8 kg)</p>
                  <p className="meta-sub">Signature upon arrival required</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
