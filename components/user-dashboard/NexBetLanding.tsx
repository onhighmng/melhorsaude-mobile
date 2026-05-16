import React from 'react';
import { 
  CheckCircle, 
  Trophy, 
  Timer, 
  Star, 
  ArrowUpRight, 
  Layout, 
  Shield, 
  Zap,
  Instagram,
  Twitter,
  Facebook,
  ChevronRight
} from 'lucide-react';
import appLogo from '@assets/app-logo.png';

const FloatingCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div
      className={`absolute z-10 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl ${className}`}
    >
      {children}
    </div>
  );
};

export const NexBetLanding: React.FC<{ onExplore?: () => void }> = ({ onExplore }) => {

  return (
    <div className="min-h-screen bg-white text-[#030213] font-poppins overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onExplore?.()}>
            <img src={appLogo} alt="Melhor Saúde" className="h-10 w-auto object-contain" />
            <span className="font-plus-jakarta font-bold text-xl text-[#0046a2] tracking-tight">Melhor Saúde</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-black transition-colors">Features</a>
            <a href="#" className="hover:text-black transition-colors">How it works</a>
            <a href="#" className="hover:text-black transition-colors">Blog</a>
            <a href="#" className="hover:text-black transition-colors">Pricing</a>
          </div>

          <button 
            onClick={onExplore}
            className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-black/20"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Decorative Ellipses */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#E8F4F8] rounded-full blur-[120px] opacity-60 -z-10" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-[#F0E8FF] rounded-full blur-[120px] opacity-60 -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-bold mb-8 uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Coming Soon
            </div>
            
            <h1 className="font-poppins text-6xl lg:text-7xl font-light leading-[1.1] mb-8 tracking-tight">
              Get More Done. <br />
              <span className="text-gray-400">Without the Stress.</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
              Plan, track, and complete your tasks in one simple, powerful workspace. 
              Stay focused, collaborate better, and never miss a deadline again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="px-8 py-4 bg-black text-white rounded-2xl text-lg font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Download App <ArrowUpRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-100 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-colors">
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex text-yellow-400 mb-0.5">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-gray-500 font-medium">4.9/5 average rating</p>
              </div>
            </div>
          </div>

          <div>
            {/* Phone Mockup Container */}
            <div className="relative z-0 mx-auto lg:ml-auto w-[320px] h-[640px] bg-black rounded-[50px] border-[8px] border-gray-900 shadow-2xl overflow-hidden">
              {/* Mockup Screen Content */}
              <div className="h-full bg-white p-6 pt-12">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400">Welcome back,</p>
                    <p className="font-bold">Elena R.</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-full" />
                </div>
                
                <div className="p-4 bg-gray-50 rounded-2xl mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Today's Progress</span>
                    <span className="text-xs font-bold">75%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-black rounded-full" />
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { t: "Wireframe Homepage", c: "High Priority", d: "10:00 AM" },
                    { t: "Client Meeting", c: "Medium", d: "02:30 PM" },
                    { t: "Design System Update", c: "Low", d: "04:00 PM" }
                  ].map((task, i) => (
                    <div key={i} className="p-4 border border-gray-100 rounded-2xl flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gray-300" />
                      <div>
                        <p className="text-sm font-bold">{task.t}</p>
                        <p className="text-[10px] text-gray-400">{task.d} • {task.c}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <FloatingCard className="top-10 -left-10 lg:-left-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-3xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Goal Achieved</p>
                  <p className="font-bold text-sm">10/20 Tasks</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard className="bottom-20 -right-4 lg:-right-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-3xl flex items-center justify-center">
                  <Timer className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Time Tracked</p>
                  <p className="font-bold text-sm">24h 15m</p>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">
            Trusted by Worldwide Companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 grayscale opacity-50">
            {['Vision', 'Network', 'Flash', 'Cactus', 'Greenish'].map(brand => (
              <span key={brand} className="text-2xl font-black italic">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Impact Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 mb-24 items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-xs font-bold mb-6 uppercase tracking-widest">
                Our Impacts
              </div>
              <h2 className="font-poppins text-5xl font-light tracking-tight">
                Designed for speed and clarity.
              </h2>
            </div>
            <p className="text-lg text-gray-500 max-w-md">
              We focus on removing the noise so you can focus on the work that actually matters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-black text-white rounded-[40px] h-[450px] flex flex-col justify-between">
              <div>
                <div className="flex -space-x-2 mb-6">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-600 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=feat${i}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-[10px]">
                    +48
                  </div>
                </div>
                <p className="text-2xl font-bold mb-4">Collaborate with ease across teams.</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-4xl font-bold tracking-tighter">99.9%</span>
                  <span className="text-gray-400 text-sm mb-1">Uptime</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full">
                  <div className="h-full w-full bg-white rounded-full" />
                </div>
              </div>
            </div>

            <div className="p-10 bg-gray-50 rounded-[40px] h-[450px] flex flex-col justify-between border border-gray-100">
               <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <p className="text-5xl font-bold tracking-tighter mb-4">4.9/5</p>
                <p className="text-lg font-bold mb-2">User Satisfaction</p>
                <p className="text-gray-500">Highest rated task app in the productivity category.</p>
              </div>
            </div>

            <div className="p-10 bg-[#E8F4F8] rounded-[40px] h-[450px] flex flex-col justify-between">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 italic leading-tight">"This app changed how our team communicates."</h3>
                <p className="text-sm font-bold">— Elena Rodriguez, PM</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold">
                Read all reviews <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <img src={appLogo} alt="Melhor Saúde" className="h-10 w-auto object-contain brightness-0 invert" />
                <span className="font-plus-jakarta font-bold text-xl text-white tracking-tight">Melhor Saúde</span>
              </div>
              <p className="text-gray-400 max-w-xs mb-8">
                Mastering your productivity has never been this simple.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Twitter className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Facebook className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-900 flex flex-col md:row justify-between items-center gap-6 text-gray-500 text-xs">
            <p>© 2026 Melhor Saúde. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};