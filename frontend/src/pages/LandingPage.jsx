import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy,
  Zap,
  Users,
  MessageSquare,
  TrendingUp,
  Play,
  Volume2,
  VolumeX,
  Send,
  Target,
  BarChart3,
  Flame,
  Award,
  CircleDot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- IPL MOCK DATA ---
const MOCK_FANS = [
  { name: "Kohli_Goat_18", color: "bg-[#2D2D2D]", text: "text-white", avatar: "Felix" },
  { name: "Dhoni_Finisher", color: "bg-[#FFCC00]", text: "text-blue-900", avatar: "Jack" },
  { name: "Hitman_Rohit", color: "bg-[#004BA0]", text: "text-white", avatar: "Aneka" },
  { name: "Sky_Surya", color: "bg-[#004BA0]", text: "text-white", avatar: "Jocelyn" },
  { name: "IPL_Official", color: "bg-red-600", text: "text-white", avatar: "Cuddles" },
];

const MOCK_COMMENTARY = [
  "WHAT A SHOT! That's going into the stands! 🏏🔥",
  "The required run rate is climbing now. Pressure is on!",
  "Decision pending... Third umpire is looking at the ultra-edge. 📺",
  "CHAMPIONS! What a performance by the bowling unit!",
  "Is that a 6? NO! A spectacular catch at the boundary! 🧤",
  "The crowd is absolutely electric tonight in Mumbai! 🏟️",
  "Impact player being warmed up. Tactical move here.",
  "That's his 50! A brilliant half-century in just 22 balls! 👏",
];

const IPLArena = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: "IPL_Official", text: "Welcome to the Fan Arena! Get ready for the toss. 🪙", avatarSeed: "Cuddles", bg: "bg-red-600", textColor: "text-white" },
    { id: 2, name: "Dhoni_Finisher", text: "Looking for a big finish tonight! Mahi Maar Raha Hai! 🦁", avatarSeed: "Jack", bg: "bg-[#FFCC00]", textColor: "text-blue-900" },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  
  const chatContainerRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch((e) => console.log("Audio failed", e));
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fan = MOCK_FANS[Math.floor(Math.random() * MOCK_FANS.length)];
      const msg = MOCK_COMMENTARY[Math.floor(Math.random() * MOCK_COMMENTARY.length)];

      setMessages((prev) => [...prev, {
        id: Date.now(),
        name: fan.name,
        text: msg,
        avatarSeed: fan.avatar,
        bg: fan.color,
        textColor: fan.text
      }].slice(-50));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      name: "YOU",
      text: inputValue,
      avatarSeed: "Hero",
      bg: "bg-white",
      textColor: "text-black"
    }]);
    setInputValue("");
  };

  return (
    <div className="relative w-full min-h-screen bg-[#000814] text-white font-sans overflow-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;600;700&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        .font-sporty { font-family: 'Barlow Condensed', sans-serif; }

        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ipl-gradient {
          background: linear-gradient(135deg, #001d3d 0%, #003566 100%);
        }

        .gold-glow {
          box-shadow: 0 0 20px rgba(255, 195, 0, 0.2);
        }

        .animate-ticker {
          animation: ticker 30s linear infinite;
        }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .live-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ffc300; border-radius: 10px; }
      `}</style>

      {/* --- Stadium Light Effects --- */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* --- Live Score Ticker --- */}
      <div className="relative z-50 w-full bg-[#ffc300] py-1.5 border-y border-white/20">
        <div className="animate-ticker flex gap-12 whitespace-nowrap text-blue-900 font-bold uppercase tracking-tighter text-sm">
          {[1,2].map(i => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2"><CircleDot className="h-3 w-3 fill-red-600 text-red-600" /> MI: 184/4 (20.0) v/s CSK: 188/3 (19.2) - CSK WON BY 7 WICKETS</span>
              <span className="flex items-center gap-2"><Flame className="h-3 w-3 text-orange-600" /> ORANGE CAP: VIRAT KOHLI (741 RUNS)</span>
              <span className="flex items-center gap-2"><Award className="h-3 w-3 text-blue-800" /> PURPLE CAP: HARSHAL PATEL (24 WICKETS)</span>
              <span className="flex items-center gap-2">NEXT MATCH: RCB V/S KKR - STARTING IN 02H : 14M : 22S</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <main className="relative z-10 max-w-[1600px] mx-auto px-6 py-8 flex flex-col min-h-screen">
        
        {/* --- Header Section --- */}
        <header className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-8">
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-red-600 text-white px-3 py-0.5 rounded text-xs font-black live-pulse">LIVE</span>
              <span className="text-white/60 font-semibold tracking-widest text-sm uppercase">TATA IPL 2024 • THE FINAL</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-sporty font-extrabold italic tracking-tighter leading-none">
              ULTIMATE <br />
              <span className="text-[#ffc300] drop-shadow-2xl">FAN ARENA</span>
            </h1>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6">
            <div className="flex gap-4">
               <button onClick={toggleAudio} className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all">
                  {isPlaying ? <Volume2 className="text-[#ffc300]" /> : <VolumeX />}
               </button>
               <button onClick={() => navigate('/login')} className="flex items-center gap-3 px-8 py-4 bg-[#ffc300] text-blue-900 font-sporty text-xl font-black rounded-sm gold-glow hover:scale-105 transition-all">
                  <Play className="fill-blue-900 h-5 w-5" /> JOIN THE STADIUM
               </button>
            </div>
            <div className="flex gap-8 items-center glass-panel px-6 py-3 rounded-xl">
               <div className="text-center">
                  <p className="text-xs text-white/50 font-bold uppercase">Online Fans</p>
                  <p className="text-xl font-bold font-sporty">1.2M+</p>
               </div>
               <div className="w-[1px] h-8 bg-white/10" />
               <div className="text-center">
                  <p className="text-xs text-white/50 font-bold uppercase">Fan Polls</p>
                  <p className="text-xl font-bold font-sporty">MI 52% | CSK 48%</p>
               </div>
            </div>
          </div>
        </header>

        {/* --- Main Interface --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[700px]">
          
          {/* Left Sidebar: Standings */}
          <aside className="hidden lg:flex lg:col-span-3 flex-col gap-4">
            <div className="glass-panel rounded-2xl p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-sporty text-2xl">POINTS TABLE</h3>
                <TrendingUp className="text-[#ffc300] h-5 w-5" />
              </div>
              <div className="space-y-3 overflow-y-auto pr-2">
                <StandingRow rank="1" team="KKR" points="20" color="bg-purple-800" />
                <StandingRow rank="2" team="SRH" points="17" color="bg-orange-600" />
                <StandingRow rank="3" team="RR" points="17" color="bg-pink-600" />
                <StandingRow rank="4" team="RCB" points="14" color="bg-red-700" />
                <StandingRow rank="5" team="CSK" points="14" color="bg-yellow-500" />
                <StandingRow rank="6" team="DC" points="14" color="bg-blue-600" />
              </div>
              <div className="mt-auto pt-4 border-t border-white/10 text-center">
                <button className="text-[#ffc300] text-sm font-bold hover:underline">VIEW FULL FIXTURES</button>
              </div>
            </div>
          </aside>

          {/* Center Chat: Commentary Box */}
          <section className="lg:col-span-6 flex flex-col glass-panel rounded-2xl overflow-hidden border-t border-white/20">
            <div className="p-4 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#ffc300] flex items-center justify-center">
                   <MessageSquare className="text-blue-900 h-6 w-6" />
                </div>
                <div>
                   <h2 className="font-bold text-lg leading-tight uppercase">FAN COMMENTARY</h2>
                   <p className="text-xs text-[#ffc300] font-bold">LIVE WORLDWIDE</p>
                </div>
              </div>
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <img key={i} className="w-8 h-8 rounded-full border-2 border-[#001d3d]" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                ))}
                <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-[#001d3d] flex items-center justify-center text-[10px] font-bold">+2k</div>
              </div>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-black/20">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.name === "YOU" ? "items-end" : "items-start"}`}>
                   <div className={`max-w-[85%] rounded-lg p-3 px-4 ${msg.name === "YOU" ? "bg-white text-black" : "glass-panel"}`}>
                      {msg.name !== "YOU" && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${msg.bg}`} />
                          <span className="text-[10px] font-black uppercase text-white/50 tracking-wider">{msg.name}</span>
                        </div>
                      )}
                      <p className="text-sm md:text-base font-semibold leading-relaxed">{msg.text}</p>
                   </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-black/40 border-t border-white/10">
              <div className="flex gap-3">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="SHARE YOUR COMMENTARY..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[#ffc300] transition-all text-sm font-bold tracking-wide"
                />
                <button onClick={handleSendMessage} className="bg-[#ffc300] p-3 rounded-lg hover:brightness-110 transition-all">
                  <Send className="text-blue-900 h-5 w-5" />
                </button>
              </div>
            </div>
          </section>

          {/* Right Sidebar: Key Performers */}
          <aside className="hidden lg:flex lg:col-span-3 flex-col gap-6">
            <div className="glass-panel rounded-2xl p-5 border-t border-white/10">
              <h3 className="font-sporty text-2xl mb-4">MATCH TOP PERFORMERS</h3>
              <div className="space-y-4">
                <PerformerCard name="Virat Kohli" stats="72(44)" role="BATSMAN" />
                <PerformerCard name="Jasprit Bumrah" stats="3/14 (4.0)" role="BOWLER" />
              </div>
            </div>
            
            <div className="flex-1 glass-panel rounded-2xl p-5 border-t border-white/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Trophy size={100} />
               </div>
               <h3 className="font-sporty text-2xl mb-2 italic">WIN PRIZES!</h3>
               <p className="text-sm text-white/60 mb-4 font-semibold">Predict the next wicket and win the official match ball.</p>
               <button className="w-full py-3 bg-white/10 rounded-lg border border-white/20 font-black text-sm tracking-widest hover:bg-[#ffc300] hover:text-blue-900 transition-all">
                  PREDICT NOW
               </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

// --- Subcomponents ---

const StandingRow = ({ rank, team, points, color }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all cursor-pointer">
    <span className="w-6 font-sporty text-xl text-white/40">{rank}</span>
    <div className={`w-10 h-10 rounded flex items-center justify-center font-black ${color}`}>{team}</div>
    <div className="flex-1">
      <p className="text-xs font-black text-white/50 uppercase">Team Name</p>
      <p className="text-sm font-bold">{team === "KKR" ? "Kolkata Knight Riders" : team === "RCB" ? "Royal Challengers Bengaluru" : "Team Squad"}</p>
    </div>
    <div className="text-right">
      <p className="text-xs font-black text-[#ffc300]">PTS</p>
      <p className="font-sporty text-xl leading-none">{points}</p>
    </div>
  </div>
);

const PerformerCard = ({ name, stats, role }) => (
  <div className="p-3 bg-gradient-to-r from-white/10 to-transparent rounded-lg border-l-4 border-[#ffc300]">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] font-black text-[#ffc300] tracking-tighter mb-1 uppercase">{role}</p>
        <p className="font-bold text-lg tracking-tight">{name}</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-sporty italic">{stats}</p>
      </div>
    </div>
  </div>
);

export default IPLArena;