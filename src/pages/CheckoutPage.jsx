import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Smartphone, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      localStorage.setItem('bgremover_is_pro', 'true');
      toast.success('Payment Successful! Welcome to Pro.');
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="container" style={{ maxWidth: '500px', padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{
          width: '80px', height: '80px', background: '#10b98120', color: '#10b981',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}>
          <CheckCircle2 size={40} />
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Payment Successful!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Your account has been upgraded to Pro. You now have unlimited HD downloads and premium support.
        </p>
        <button onClick={() => navigate('/tool')} className="btn btn-gradient btn-lg" style={{ width: '100%' }}>
          Go to Tool
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '1000px', padding: '4rem 1.5rem' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '2rem' }}
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem' }}>
        {/* Left Side: Payment Details */}
        <div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '2rem', letterSpacing: '-0.02em' }}>Checkout</h1>

          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Select Payment Method</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button
                onClick={() => setMethod('upi')}
                style={{
                  padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: `2px solid ${method === 'upi' ? 'var(--accent)' : 'var(--border-color)'}`,
                  background: method === 'upi' ? 'var(--accent-light)' : 'var(--bg-card)',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease'
                }}
              >
                <div style={{ color: method === 'upi' ? 'var(--accent)' : 'var(--text-muted)', marginBottom: '0.75rem', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '0.02em' }}>UPI</span>
                </div>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>UPI Payment</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Google Pay, PhonePe, Paytm</p>
              </button>

              <button
                onClick={() => setMethod('card')}
                style={{
                  padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: `2px solid ${method === 'card' ? 'var(--accent)' : 'var(--border-color)'}`,
                  background: method === 'card' ? 'var(--accent-light)' : 'var(--bg-card)',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease'
                }}
              >
                <CreditCard size={24} style={{ color: method === 'card' ? 'var(--accent)' : 'var(--text-muted)', marginBottom: '0.75rem' }} />
                <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Credit/Debit Card</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Visa, Mastercard, RuPay</p>
              </button>
            </div>
          </div>

          <div style={{ background: '#10b98110', border: '1px solid #10b98140', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: '#059669' }}>
            <ShieldCheck size={18} />
            Secure 256-bit SSL Encrypted Connection
          </div>

          <form onSubmit={handlePayment} style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
            {method === 'upi' ? (
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Enter UPI ID <ShieldCheck size={14} color="var(--accent)" />
                </label>
                <input
                  type="text" required placeholder="yourname@bank"
                  style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', marginBottom: '1.5rem' }}
                />
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Card Number</label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" required placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: '0.875rem', paddingRight: '2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)' }} />
                    <CreditCard size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Expiry Date</label>
                    <input type="text" required placeholder="MM/YY" style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>CVV</label>
                    <input type="password" required placeholder="***" style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="btn btn-gradient btn-lg"
              style={{ width: '100%', marginTop: '2rem', height: '56px' }}
            >
              {isProcessing ? 'Processing Securely...' : 'Complete Secure Payment'}
            </button>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', alignItems: 'center', opacity: 0.7 }}>
              <span style={{ fontWeight: 900, fontStyle: 'italic', fontSize: '1.125rem', color: '#1a1f71' }}>VISA</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eb001b' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f79e1b', marginLeft: '-6px' }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>UPI</span>
            </div>
          </form>

          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} /> PCI DSS Compliant
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} /> SSL Secured
            </div>
          </div>
        </div>

        {/* Right Side: Summary */}
        <div style={{ position: 'sticky', top: '2rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Order Summary</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Pro Plan (Monthly)</span>
              <span style={{ fontWeight: 600 }}>₹750.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.875rem', color: '#10b981' }}>
              <span>First month discount</span>
              <span>-₹0.00</span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>Total Amount</span>
              <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--accent)' }}>₹750.00</span>
            </div>

            <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
              {[
                'Unlimited HD Downloads',
                'No ads, no watermarks',
                'Priority AI processing',
                'Commercial license included'
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="var(--accent)" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              By completing your purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
