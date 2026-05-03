import React, { useState } from 'react';
import { 
  Dice5, 
  Check, 
  Save, 
  RefreshCw,
  User,
  Zap,
  Trophy,
  ShieldCheck,
  Target,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userService from '../../service/user.service';
import { login } from "../Store/authSlice";

const AVATAR_STYLES = [
  { id: 'avataaars', name: 'The Pro', label: 'Classic League' },
  { id: 'notionists', name: 'The Scout', label: 'Draft Mode' },
  { id: 'bottts', name: 'Cyber-Player', label: 'Tech Edition' },
  { id: 'lorelei', name: 'Premium', label: 'Elite Tier' },
  { id: 'fun-emoji', name: 'Fan Spirit', label: 'Mascot Vibe' },
  { id: 'pixel-art', name: 'Retro League', label: '8-Bit Pro' }
];

export default function AvatarSelectionPage() {
  const [seedName, setSeedName] = useState('PlayerOne');
  const [selectedStyle, setSelectedStyle] = useState('avataaars');
  const [isSaving, setIsSaving] = useState(false);
  const { username, name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currentAvatarUrl = `https://api.dicebear.com/7.x/${selectedStyle}/svg?seed=${seedName}`;

  const handleRandomize = () => {
    const randomSeeds = ['Striker', 'Captain', 'Finisher', 'Goat', 'Opener', 'Legend'];
    const random = randomSeeds[Math.floor(Math.random() * randomSeeds.length)] + Math.floor(Math.random() * 1000);
    setSeedName(random);
  };

  const handleSave = () => {
    setIsSaving(true);
    userService.getLoggedIn(name, username, currentAvatarUrl).then((result) => {
      if(result){
        setIsSaving(false);
        dispatch(login(result?.data));
        navigate('/home');
      }
    }).catch((error) => {
      console.error(error.message);
      setIsSaving(false);
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#000814] text-white font-sans selection:bg-[#ffc300] selection:text-blue-900 overflow-x-hidden flex flex-col relative">
      
      {/* --- PROFESSIONAL IPL THEME CSS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,800;1,800&family=Inter:wght@400;600;700&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        .font-sporty { font-family: 'Barlow Condensed', sans-serif; }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .gold-gradient {
          background: linear-gradient(135deg, #ffc300 0%, #ff9500 100%);
        }

        .blue-glow {
          box-shadow: 0 0 40px rgba(0, 102, 255, 0.15);
        }

        .active-style-card {
          border: 2px solid #ffc300;
          background: rgba(255, 195, 0, 0.05);
        }

        @keyframes scan-vertical {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-scan {
          animation: scan-vertical 3s linear infinite;
        }

        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
      `}</style>

      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/5 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 py-12">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full text-xs font-black tracking-widest border border-blue-500/30 mb-6 uppercase">
            <Zap size={14} className="fill-blue-400" /> Phase 02: Profile Drafting
          </div>
          <h1 className="text-6xl md:text-8xl font-sporty font-extrabold italic tracking-tighter leading-none mb-2">
            DESIGN YOUR <span className="text-[#ffc300] drop-shadow-2xl">AVATAR</span>
          </h1>
          <p className="text-white/40 font-semibold tracking-[0.2em] uppercase text-sm">Official Stadium Profile Setup</p>
        </div>

        {/* --- MAIN INTERFACE --- */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Player ID Preview */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden border-t border-white/10 blue-glow">
              
              {/* Identity Tag */}
              <div className="flex flex-col gap-1 mb-6">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Player Alias</label>
                <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between">
                  <span className="font-sporty text-2xl italic text-[#ffc300] tracking-wider">{username || 'GUEST_PLAYER'}</span>
                  <ShieldCheck className="text-blue-500" size={20} />
                </div>
              </div>

              {/* Avatar Visualization Area */}
              <div className="relative group aspect-square bg-gradient-to-b from-white/5 to-transparent rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                {/* Hologram Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/50 blur-sm animate-scan" />
                
                <img 
                  src={currentAvatarUrl} 
                  alt="Preview" 
                  className="w-3/4 h-3/4 object-contain drop-shadow-[0_0_30px_rgba(0,102,255,0.3)] transition-transform duration-700 group-hover:scale-110 z-10"
                />

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[10px] font-bold tracking-tighter">
                        UUID: {seedName.toUpperCase()}
                    </div>
                    <button 
                        onClick={handleRandomize}
                        className="bg-[#ffc300] text-blue-900 p-3 rounded-xl hover:scale-105 transition-transform gold-glow"
                    >
                        <Dice5 size={20} />
                    </button>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full mt-6 gold-gradient text-blue-900 py-5 rounded-xl font-sporty text-2xl font-extrabold italic tracking-wider flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSaving ? (
                  <RefreshCw className="animate-spin" />
                ) : (
                  <>CONFIRM DRAFT <ChevronRight size={24} /></>
                )}
              </button>
            </div>
            
            <div className="px-4 py-3 bg-blue-600/5 border border-blue-500/10 rounded-xl flex items-center gap-4">
                <Target className="text-blue-400" size={20} />
                <p className="text-[11px] text-white/50 leading-tight">Your avatar represents your unique fan identity across the digital stadium. Styles are immutable once saved.</p>
            </div>
          </div>

          {/* Right Column: Style Selection Grid */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h3 className="font-sporty text-3xl italic tracking-tight">AVAILABLE LEAGUES</h3>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Select your visual dimension</p>
              </div>
              <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3">
                  <Sparkles size={16} className="text-[#ffc300]" />
                  <span className="font-bold text-sm tracking-tighter">{AVATAR_STYLES.length} Skins Loaded</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {AVATAR_STYLES.map((style) => {
                const isSelected = selectedStyle === style.id;
                const previewUrl = `https://api.dicebear.com/7.x/${style.id}/svg?seed=${seedName}`;

                return (
                  <div 
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`
                      cursor-pointer group relative p-4 rounded-2xl border transition-all duration-300
                      ${isSelected 
                        ? 'active-style-card gold-glow' 
                        : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.07]'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 text-[#ffc300]">
                        <Check size={18} strokeWidth={4} />
                      </div>
                    )}

                    <div className="flex flex-col items-center gap-4">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center p-1 transition-transform group-hover:scale-110 ${isSelected ? 'bg-[#ffc300]/20' : 'bg-black/40'}`}>
                        <img src={previewUrl} alt={style.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="text-center">
                        <h4 className={`font-bold text-sm tracking-tight ${isSelected ? 'text-[#ffc300]' : 'text-white'}`}>{style.name}</h4>
                        <p className="text-[10px] text-white/40 font-black uppercase mt-1">{style.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pro Tips Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-white/5 to-transparent rounded-2xl border-l-4 border-[#ffc300]">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#ffc300] rounded flex items-center justify-center flex-shrink-0">
                        <Trophy className="text-blue-900" size={24} />
                    </div>
                    <div>
                        <h5 className="font-sporty text-xl italic mb-1">PRO-DRAFT TIP</h5>
                        <p className="text-xs text-white/60 leading-relaxed font-medium">
                            Use the <span className="text-[#ffc300] font-bold">randomizer</span> icon on the preview card to cycle through unique player seeds until you find your perfect digital representative.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- LIVE BROADCAST TICKER --- */}
      <footer className="relative w-full bg-[#ffc300] py-2 overflow-hidden z-50 mt-auto border-t border-white/20">
        <div className="animate-marquee flex gap-12 whitespace-nowrap text-blue-900 font-bold uppercase tracking-tighter text-xs">
          {[1,2].map(i => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2">🏆 Season 2024 Profile Registration Open</span>
              <span className="flex items-center gap-2">🔥 Join 1.2M+ Fans in the Arena</span>
              <span className="flex items-center gap-2">🏏 Match Start: MI vs CSK - 04H : 12M : 00S</span>
              <span className="flex items-center gap-2">✨ Powered by TATA IPL Fan Services</span>
            </React.Fragment>
          ))}
        </div>
      </footer>

    </div>
  );
};