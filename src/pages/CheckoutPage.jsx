import React, { useState, useEffect } from 'react';
import { ShieldCheck, CreditCard, CheckCircle2, ArrowLeft, Loader2, Crown, Zap } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, token } = useAuth();
  const planId = searchParams.get('plan') || 'monthly';
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (!token) {
      toast.error('Please login to continue');
      navigate(`/login?redirect=/checkout?plan=${planId}`);
    }
  }, [token, navigate, planId]);

  const planDetails = {
    monthly: { name: 'Pro Monthly', price: 750, label: 'per month' },
    lifetime: { name: 'Lifetime Pro', price: 4999, label: 'one-time' }
  };

  const selectedPlan = planDetails[planId] || planDetails.monthly;

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      // 1. Create Order on Backend
      const { data: orderData } = await axios.post(`${API_URL}/payment/create-order`, 
        { plan: planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      const { order } = orderData;

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', 
        amount: order.amount,
        currency: order.currency,
        name: "BGRemover Pro",
        description: `Upgrade to ${selectedPlan.name}`,
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&h=100&fit=crop",
        order_id: order.id,
        handler: async (response) => {
          try {
            setIsProcessing(true);
            // 3. Verify Payment on Backend
            const { data: verifyData } = await axios.post(`${API_URL}/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: planId
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });

            if (verifyData.success) {
              setIsSuccess(true);
              toast.success('Payment Successful! Welcome to Pro.');
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Verification Error:', error);
            toast.error('Verification failed. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        toast.error(response.error.description);
      });
      rzp.open();

    } catch (error) {
      console.error('Payment Error:', error);
      toast.error(error.response?.data?.message || 'Payment failed to initialize');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl shadow-indigo-100 text-center border border-slate-100">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 size={48} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Payment Successful!</h1>
          <p className="text-slate-600 mb-10 leading-relaxed">
            Welcome to <span className="font-bold text-indigo-600">BGRemover Pro</span>. Your account has been upgraded. Enjoy unlimited HD background removals!
          </p>
          <button 
            onClick={() => navigate('/tool')} 
            className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Start Creating Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors mb-10"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight italic">
              Complete your <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Pro Upgrade</span>
            </h1>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-100 mb-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Secure Payment</h3>
                  <p className="text-sm text-slate-500 font-medium">Safe & Encrypted with Razorpay</p>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <ShieldCheck className="text-emerald-500" size={24} />
                  <div>
                    <p className="text-sm font-bold text-slate-900">100% Secure Transaction</p>
                    <p className="text-xs text-slate-500">Your payment data is protected by 256-bit SSL encryption.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-5 px-8 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group text-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Processing Securely...
                  </>
                ) : (
                  <>
                    <Zap size={20} className="fill-current text-yellow-400" />
                    Pay ₹{selectedPlan.price.toLocaleString()} Securely
                    <ArrowLeft className="rotate-180 transition-transform group-hover:translate-x-1" size={20} />
                  </>
                )}
              </button>

              <div className="mt-8 flex flex-wrap justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="font-black text-slate-900 italic text-xl">VISA</span>
                <span className="font-black text-slate-900 italic text-xl">mastercard</span>
                <span className="font-black text-slate-900 text-lg tracking-widest uppercase">UPI</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} /> PCI DSS Compliant
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} /> SSL Secured
              </div>
            </div>
          </div>

          {/* Right Side: Summary */}
          <div className="lg:col-span-5 sticky top-8">
            <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-200">
              <h3 className="text-2xl font-bold mb-8">Order Summary</h3>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                  <div>
                    <p className="text-indigo-100 font-bold uppercase tracking-widest text-xs mb-1">Selected Plan</p>
                    <p className="text-xl font-black">{selectedPlan.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black">₹{selectedPlan.price}</p>
                    <p className="text-xs font-bold text-indigo-200 uppercase">{selectedPlan.label}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    'Unlimited HD Downloads',
                    'No Ads & Watermarks',
                    'Priority AI Processing',
                    'Commercial License'
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 text-sm font-bold">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={12} strokeWidth={3} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-indigo-100 uppercase tracking-widest">Total to Pay</span>
                  <span className="text-xs bg-white text-indigo-600 px-2 py-0.5 rounded-full font-black uppercase">Tax Included</span>
                </div>
                <div className="text-4xl font-black tracking-tighter">₹{selectedPlan.price.toLocaleString()}.00</div>
              </div>

              <p className="mt-8 text-center text-xs font-bold text-indigo-200/60 leading-relaxed uppercase tracking-widest">
                Cancel monthly anytime. <br /> Guaranteed lifetime access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
