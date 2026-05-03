import React from 'react';
import { 
  Trophy, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Send, 
  ChevronUp, 
  Target, 
  Zap, 
  Facebook, 
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#000814] pt-20 border-t border-white/10 font-sans text-white overflow-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,800;1,800&family=Inter:wght@400;600;700&display=swap');
        
        .font-sporty { font-family: 'Barlow Condensed', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .gold-glow {
          box-shadow: 0 0 20px rgba(255, 195, 0, 0.15);
        }

        .carbon-bg {
          background-image: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
          opacity: 0.05;
        }

        @keyframes ticker-footer {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker-footer {
          animation: ticker-footer 30s linear infinite;
        }

        .live-dot {
          animation: pulse-red 2s infinite;
        }

        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>

      {/* --- Stadium Ambient Lights --- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 carbon-bg pointer-events-none"></div>

      {/* --- High-End Live Score Ticker --- */}
      <div className="relative z-20 bg-[#ffc300] text-blue-900 border-y border-white/10 py-2 overflow-hidden whitespace-nowrap mb-16 transform -skew-x-12 mx-[-20px]">
        <div className="animate-ticker-footer inline-block font-sporty font-black italic uppercase text-sm tracking-[0.2em]">
           🏆 MI: 184/4 (20.0) v/s CSK: 188/3 (19.2) • CSK WON BY 7 WICKETS • 🔥 ORANGE CAP: VIRAT KOHLI (741 RUNS) • ⚡ PURPLE CAP: HARSHAL PATEL (24 WICKETS) • 🏟️ ATTENDANCE: 33,108 • 
           🏆 MI: 184/4 (20.0) v/s CSK: 188/3 (19.2) • CSK WON BY 7 WICKETS • 🔥 ORANGE CAP: VIRAT KOHLI (741 RUNS) • ⚡ PURPLE CAP: HARSHAL PATEL (24 WICKETS) • 🏟️ ATTENDANCE: 33,108 • 
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-20 relative z-10 font-inter">
        
        {/* Column 1: Brand & Championship Status (5 Cols) */}
        <div className="md:col-span-5 space-y-8">
          <div className="space-y-4">
             <h2 className="text-7xl font-sporty font-black italic leading-none tracking-tighter">
                IPL<span className="text-[#ffc300]">.</span>ARENA
             </h2>
             <div className="flex items-center gap-3">
                <span className="bg-red-600 live-dot w-2 h-2 rounded-full"></span>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Broadcasting Worldwide</span>
             </div>
          </div>

          <div className="glass-card p-6 rounded-2xl max-w-md border-l-4 border-[#ffc300]">
            <p className="text-sm font-semibold text-white/70 leading-relaxed italic">
              "The ultimate tactical interface for the modern cricket fan. Real-time analytics, stadium vibes, and the digital dugout—all in one place."
            </p>
          </div>
          
          <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10 shadow-2xl">
                <ShieldCheck size={16} className="text-[#ffc300]" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Official Fan Portal</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10 shadow-2xl">
                <Award size={16} className="text-[#ffc300]" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Season 2024</span>
              </div>
          </div>
        </div>

        {/* Column 2: The Dugout (3 Cols) */}
        <div className="md:col-span-3">
          <h3 className="font-sporty text-2xl italic mb-8 tracking-tighter text-[#ffc300]">
            THE DUGOUT
          </h3>
          <ul className="space-y-5 font-bold text-sm uppercase tracking-widest text-white/60">
            {[
              { name: "Match Center", icon: <Target size={14} /> }, 
              { name: "Fan Standings", icon: <Trophy size={14} /> }, 
              { name: "League Rules", icon: <ShieldCheck size={14} /> }, 
              { name: "Stadium Map", icon: <Zap size={14} /> }
            ].map((item) => (
              <li key={item.name}>
                <a href="#" className="flex items-center gap-4 hover:text-[#ffc300] transition-all group">
                  <span className="text-[#ffc300] opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.icon}
                  </span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Signal & Fan Pass (4 Cols) */}
        <div className="md:col-span-4 space-y-10">
          <div>
            <h3 className="font-sporty text-2xl italic mb-6 tracking-tighter text-[#ffc300]">
                SOCIAL HUB
            </h3>
            <div className="flex flex-wrap gap-4">
                {[
                { icon: <Instagram size={20} />, link: "https://www.instagram.com/aryansh_dixit_/?hl=en" },
                { icon: <Twitter size={20} />, link: "https://x.com/TechnicalBanda_" },
                { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/in/aryansh-dixit-1046b2305" },
                { icon: <Facebook size={20} />, link: "https://www.facebook.com/aryansh.dixit" },
                ].map((social, idx) => (
                <a 
                    key={idx} 
                    href={social.link} 
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 glass-card flex items-center justify-center rounded-xl hover:bg-[#ffc300] hover:text-blue-900 transition-all hover:-translate-y-1 gold-glow"
                >
                    {social.icon}
                </a>
                ))}
            </div>
          </div>
          
          {/* Fan Pass Newsletter */}
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Get Season Tickets</p>
            <div className="relative group">
                <input 
                  type="email" 
                  placeholder="FAN@IPL-ARENA.COM" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-xs font-black outline-none focus:border-[#ffc300] transition-all tracking-widest placeholder:text-white/20" 
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#ffc300] text-blue-900 p-2.5 rounded-lg hover:brightness-110 transition-all">
                    <Send size={18} />
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- HUGE BACKGROUND TROPHY --- */}
      <div className="absolute bottom-20 right-[-50px] z-0 pointer-events-none opacity-[0.03] rotate-12">
         <Trophy size={600} strokeWidth={1} />
      </div>

      {/* --- BOTTOM BROADCAST BAR --- */}
      <div className="relative z-30 bg-black/60 border-t border-white/10 px-8 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="flex flex-col md:flex-row items-center gap-6">
                <p className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase">
                    © {new Date().getFullYear()} IPL ARENA INC. All Rights Reserved.
                </p>
                <div className="hidden md:block w-[1px] h-4 bg-white/10"></div>
                <p className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase flex items-center gap-2">
                    DESIGNED FOR THE <Flame size={12} className="text-orange-500 fill-orange-500" /> ULTIMATE FAN
                </p>
            </div>
            
            <div className="flex items-center gap-8">
                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-[#ffc300] tracking-widest uppercase">System Status</span>
                    <span className="text-[11px] font-bold">256-BIT ENCRYPTED</span>
                </div>
                
                {/* Scroll to Top - Tactical Button */}
                <button 
                    onClick={scrollToTop}
                    className="group bg-[#ffc300] text-blue-900 p-4 rounded-xl gold-glow hover:scale-110 transition-all active:scale-95"
                    title="Return to Pavilion"
                >
                    <ChevronUp size={24} strokeWidth={3} className="group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;