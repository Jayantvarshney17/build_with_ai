import React from 'react';
import { ArrowLeft, Zap, Target, Check, AtSign, Trophy, User, ChevronRight } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const onsubmit = (data) => {
    console.log(data);
    navigate(`/setAvatar/${data.username}/${data.name}`);
  };

  return (
    <div className="min-h-screen bg-[#000814] font-sans text-white relative overflow-hidden selection:bg-[#ffc300] selection:text-blue-900">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,800;1,800&family=Inter:wght@400;600;700&display=swap');
        
        .font-sporty {
          font-family: 'Barlow Condensed', sans-serif;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .gold-gradient {
          background: linear-gradient(135deg, #ffc300 0%, #ff9500 100%);
        }

        .stadium-glow {
          box-shadow: 0 0 50px rgba(0, 102, 255, 0.15);
        }

        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        .animate-scan {
          animation: scan-line 3s linear infinite;
        }

        @keyframes float-ball {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, -20px) rotate(10deg); }
        }
        .animate-float-ball {
          animation: float-ball 8s ease-in-out infinite;
        }

        .input-focus-effect:focus-within {
          border-color: #ffc300;
          box-shadow: 0 0 15px rgba(255, 195, 0, 0.3);
        }

        .perspective-text {
          text-shadow: 4px 4px 0px rgba(0, 75, 160, 1);
        }
      `}</style>

      {/* --- Stadium Ambient Lighting --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* --- Dynamic Background Elements --- */}
      <div className="absolute top-20 right-20 opacity-20 animate-float-ball hidden lg:block">
        <Trophy size={120} className="text-[#ffc300]" strokeWidth={1} />
      </div>
      <div className="absolute bottom-40 left-10 opacity-10 -rotate-12 animate-pulse hidden lg:block">
        <Target size={180} className="text-white" strokeWidth={1} />
      </div>

      <div className="relative z-30 max-w-lg mx-auto px-6 py-8 flex flex-col min-h-screen">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-12 mt-4">
           <button 
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-white/60 hover:text-[#ffc300] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold tracking-widest text-xs uppercase">Back to Pavilion</span>
            </button>
            <div className="flex gap-1">
                <div className="h-1 w-8 bg-[#ffc300] rounded-full"></div>
                <div className="h-1 w-2 bg-white/20 rounded-full"></div>
                <div className="h-1 w-2 bg-white/20 rounded-full"></div>
            </div>
        </div>

        {/* --- MAIN LOGIN PASS --- */}
        <div className="relative glass-card rounded-3xl overflow-hidden stadium-glow">
          
          {/* Decorative "Scanning" Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ffc300] to-transparent opacity-50 animate-scan z-10"></div>

          {/* Header Image Area */}
          <div className="relative h-48 bg-gradient-to-b from-[#003566] to-transparent flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="text-center z-10">
                <h1 className="text-6xl font-sporty font-extrabold italic tracking-tighter perspective-text leading-none">
                    FAN <span className="text-[#ffc300]">ARENA</span>
                </h1>
                <p className="text-[#ffc300] font-black tracking-[0.3em] text-[10px] uppercase mt-2">Official League Access</p>
            </div>
          </div>

          <div className="p-8 pt-4">
            {/* Status Badge */}
            <div className="flex justify-center -mt-10 mb-8">
                <div className="bg-black border border-white/10 px-6 py-3 rounded-xl flex items-center gap-4 shadow-2xl">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-white/40 uppercase leading-none">Match Status</span>
                        <span className="text-xs font-black text-red-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> LIVE ENTRY
                        </span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/10"></div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-white/40 uppercase leading-none">Season</span>
                        <span className="text-xs font-black">2024-25</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-6">

              {/* Real Name Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-1">Full Player Name</label>
                <div className="group bg-white/5 border border-white/10 rounded-xl flex items-center p-1 transition-all input-focus-effect">
                  <div className="pl-4 text-white/30 group-focus-within:text-[#ffc300] transition-colors">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    className="w-full bg-transparent p-4 text-sm font-semibold text-white outline-none placeholder:text-white/20"
                    placeholder="e.g. Virat Kohli"
                    {...register("name", { required: true })}
                  />
                </div>
                {errors.name && <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">Field Required *</span>}
              </div>

              {/* Alias Input */}
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-1">Stadium Alias (@handle)</label>
                 <div className="group bg-white/5 border border-white/10 rounded-xl flex items-center p-1 transition-all input-focus-effect">
                  <div className="pl-4 text-white/30 group-focus-within:text-[#ffc300] transition-colors">
                      <AtSign size={18} />
                  </div>
                  <input 
                    type="text"
                    className="w-full bg-transparent p-4 text-sm font-bold text-white outline-none placeholder:text-white/20"
                    placeholder="finisher_dhoni"
                    {...register("username", { required: true })}
                  />
                </div>
                {errors.username && <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">Alias Required *</span>}
              </div>

              {/* Perks Row */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-3 flex items-center gap-3">
                      <div className="bg-blue-500/20 rounded-full p-1.5 text-blue-400">
                          <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="font-bold text-[10px] text-blue-200 uppercase tracking-tighter">Verified Fan Status</span>
                  </div>
                  <div className="bg-green-600/10 border border-green-500/20 rounded-xl p-3 flex items-center gap-3">
                      <div className="bg-green-500/20 rounded-full p-1.5 text-green-400">
                          <Zap size={14} strokeWidth={3} />
                      </div>
                      <span className="font-bold text-[10px] text-green-200 uppercase tracking-tighter">Early Access</span>
                  </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 group relative">
                  <div className="absolute -inset-1 bg-[#ffc300] rounded-xl blur opacity-20 group-hover:opacity-40 transition-all"></div>
                  <button 
                    type="submit"
                    className="relative w-full gold-gradient text-blue-900 text-lg font-sporty font-black py-5 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] hover:brightness-110"
                  >
                      CLAIM ACCESS PASS
                      <ChevronRight className="w-5 h-5" strokeWidth={3} />
                  </button>
              </div>

              <div className="mt-4 flex flex-col items-center gap-2">
                  <p className="text-[9px] font-bold text-white/30 text-center uppercase tracking-widest">
                    Secure 256-bit Stadium Encryption Active
                  </p>
                  <div className="flex gap-4">
                      <div className="w-8 h-1 bg-white/5 rounded-full"></div>
                      <div className="w-8 h-1 bg-white/5 rounded-full"></div>
                  </div>
              </div>

            </form>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[10px] font-bold text-white/20 mt-12 uppercase tracking-[0.3em]">
            Official Partner of the <span className="text-white/40">Premier Cricket League</span>
        </p>

      </div>
    </div>
  );
}