import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Zap, 
  Crown, 
  History, 
  Settings, 
  TrendingUp, 
  Image as ImageIcon, 
  ArrowRight,
  Sparkles,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const DashboardPage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] pb-20">
      <Helmet>
        <title>Dashboard — BGRemover Pro</title>
      </Helmet>

      {/* Header */}
      <div className="bg-white border-b border-slate-100 pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hey, {user.name.split(' ')[0]}!</h1>
                {user.isPremium && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded-full uppercase tracking-widest">
                    <Crown size={12} className="fill-current" /> Pro Member
                  </span>
                )}
              </div>
              <p className="text-slate-500 font-medium tracking-tight">Welcome to your creative workspace.</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/tool" className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                <Zap size={18} className="fill-current" /> Start Removing
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Credits Card */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-100">
                <Zap size={24} className="fill-current" />
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Available Credits</p>
              <h3 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">
                {user.isPremium ? '∞' : user.credits}
              </h3>
              <div className="flex items-center justify-between">
                {!user.isPremium && (
                   <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                      <div 
                        className="bg-indigo-600 h-full rounded-full" 
                        style={{ width: `${(user.credits / 5) * 100}%` }}
                      ></div>
                   </div>
                )}
              </div>
              {!user.isPremium && (
                <Link to="/pricing" className="inline-flex items-center gap-2 text-sm font-black text-indigo-600 hover:gap-3 transition-all">
                  Get more credits <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>

          {/* Plan Status Card */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.04)] border border-slate-100">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <Crown size={24} className="fill-current" />
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Current Plan</p>
            <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
              {user.subscriptionPlan === 'free' ? 'Starter Free' : 
               user.subscriptionPlan === 'monthly' ? 'Pro Monthly' : 'Lifetime Pro'}
            </h3>
            <Link to="/pricing" className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-600 text-xs font-black rounded-xl hover:bg-slate-100 transition-all uppercase tracking-widest">
              Manage Plan
            </Link>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.04)] border border-slate-100">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={24} />
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Account Health</p>
            <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Active</h3>
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
              <ShieldCheck size={16} /> Verfied Account
            </div>
          </div>
        </div>

        {/* Recent Activity Mockup */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.04)] border border-slate-100">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <History size={24} className="text-indigo-600" /> Recent Removals
                  </h3>
                  <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">View All</button>
                </div>
                
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100/50 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-300 overflow-hidden">
                           <ImageIcon size={32} />
                        </div>
                        <div>
                          <p className="font-black text-slate-800 tracking-tight">image_export_{i}.png</p>
                          <p className="text-xs font-bold text-slate-400">Processed 2 days ago</p>
                        </div>
                      </div>
                      <button className="p-3 rounded-xl bg-white border border-slate-100 text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          <div className="space-y-8">
            <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <h4 className="text-2xl font-black mb-6 tracking-tight">Go Unlimited</h4>
              <p className="text-indigo-100 font-medium mb-8 leading-relaxed">
                Unlock HD processing, batch uploads, and 24/7 priority support.
              </p>
              <Link to="/pricing" className="block w-full text-center py-4 px-6 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-xl">
                Upgrade to Pro
              </Link>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h4 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-[10px]">Settings & Security</h4>
               <div className="space-y-4">
                 <button className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600">
                   <div className="flex items-center gap-3"><Settings size={18} /> Account</div>
                   <ArrowRight size={16} className="text-slate-300" />
                 </button>
                 <button onClick={logout} className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-red-50 transition-all font-bold text-red-600">
                   <div className="flex items-center gap-3"><CreditCard size={18} /> Logout</div>
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
