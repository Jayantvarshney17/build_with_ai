import React, { useRef, useEffect, useState, useContext } from 'react';
import { Send, Zap, Utensils, Users, MoreVertical, Trophy, Flame, Image as ImageIcon, ChevronRight, Target } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import logo from '/logo.png'; 
import { useNavigate } from 'react-router-dom';
import userContext from '@/context/userContext';
import { ComingSoonPopup } from '../components/PopUp';

const ChatArea = ({ 
  messages, 
  inputText, 
  setInputText, 
  handleSend, 
  onOpenRooms, // Now functions as OpenFood
  onOpenLegends // Now functions as OpenFans
}) => {
  const scrollContainerRef = useRef(null);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isPopUpOpen, setisPopUpOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const navigate = useNavigate();

  const handleEmojiClick = (emoji) => {
    setInputText(prev => prev + emoji.emoji);
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(prev => prev === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full w-full relative bg-[#000814] font-sans overflow-hidden z-10">
      <ComingSoonPopup isOpen={isPopUpOpen} onClose={() => setisPopUpOpen(false)}/>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,900&family=Inter:wght@400;700&display=swap');
        
        .font-sporty { font-family: 'Barlow Condensed', sans-serif; }
        
        .glass-msg {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .my-msg {
          background: linear-gradient(135deg, #003566 0%, #001d3d 100%);
          border-left: 4px solid #ffc300;
        }

        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: #ffc300; border-radius: 10px; }

        .carbon-pattern {
          background-image: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
        }

        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .msg-anim { animation: slideUp 0.3s ease-out forwards; }

        .neon-glow {
          box-shadow: 0 0 15px rgba(255, 195, 0, 0.3);
        }
      `}</style>

      {/* --- STADIUM LIGHTS OVERLAY --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none z-0" />

      {/* --- DESKTOP MATCH HEADER --- */}
      <div className="hidden md:flex absolute top-4 left-6 right-6 justify-between items-center z-30 pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
            <div className="bg-red-600 text-white px-3 py-1 rounded-sm text-[10px] font-black italic animate-pulse">LIVE</div>
            <div className="glass-panel px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold tracking-widest flex items-center gap-2">
                <Target size={14} className="text-[#ffc300]" /> MI vs CSK • FINAL OVER
            </div>
        </div>
        <div className="flex items-center gap-3 pointer-events-auto">
            <div className="glass-panel px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold tracking-widest text-[#ffc300]">
                #TATAIPL2024
            </div>
        </div>
      </div>

      {/* --- MOBILE BROADCAST HEADER --- */}
      <div className="md:hidden flex flex-col shrink-0 z-40 bg-[#001d3d] border-b border-white/10">
        <div className="flex justify-between items-center px-4 py-3">
            <button onClick={onOpenRooms} className="text-white/60 hover:text-[#ffc300]">
              <Utensils size={22} />
            </button>
            <div className="flex items-center gap-2">
                <div className="text-right">
                    <p className="text-[10px] font-bold text-white/40 leading-none">MATCH CENTER</p>
                    <p className="font-sporty text-lg italic leading-none">STADIUM CHAT</p>
                </div>
                <Trophy size={24} className="text-[#ffc300]" />
            </div>
            <button onClick={onOpenLegends} className="text-white/60 hover:text-[#ffc300]">
              <Users size={22} />
            </button>
        </div>
        <div className="bg-[#ffc300] py-0.5 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap text-[9px] font-black text-blue-900 px-4 uppercase tracking-tighter">
                ⚡ IMPACT PLAYER READY • DHONI ON STRIKE • 12 RUNS NEEDED FROM 6 BALLS • ⚡ IMPACT PLAYER READY • DHONI ON STRIKE
            </div>
        </div>
      </div>

      {/* --- CHAT AREA --- */}
      <div className="flex-1 flex flex-col pt-10 md:pt-20 min-h-0 relative z-10">
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto space-y-6 px-4 md:px-8 pb-10 custom-scroll"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`msg-anim flex gap-3 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar with Team Glow */}
              <div className="flex-shrink-0 mt-auto">
                <div className={`w-10 h-10 rounded-lg border-2 ${msg.isMe ? 'border-[#ffc300]' : 'border-blue-500'} overflow-hidden bg-black`}>
                  <img src={msg.avatar} alt="avatar" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Message Card */}
              <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1 px-1">
                   <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{msg.user}</span>
                   {msg.isMe && <Zap size={10} className="text-[#ffc300] fill-[#ffc300]" />}
                </div>

                <div className={`relative px-4 py-3 rounded-xl transition-all ${msg.isMe ? 'my-msg' : 'glass-msg'}`}>
                  
                  {/* Action Trigger */}
                  <button 
                    onClick={(e) => toggleMenu(e, msg.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-white/20 hover:text-white"
                  >
                    <MoreVertical size={16} />
                  </button>

                  <p className="text-sm md:text-base font-semibold leading-relaxed tracking-tight">
                    {msg.text}
                  </p>

                  {/* Context Menu (Pro Style) */}
                  {activeMenuId === msg.id && (
                    <div className="absolute bottom-full mb-2 right-0 w-40 bg-[#001d3d] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50">
                      <button className="w-full px-4 py-2 text-left text-[10px] font-bold hover:bg-red-600 transition-colors border-b border-white/5 uppercase">🚩 Report Foul</button>
                      <button className="w-full px-4 py-2 text-left text-[10px] font-bold hover:bg-white/10 transition-colors uppercase">💬 Private DM</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- DUGOUT COMMAND INPUT --- */}
      <div className="relative mt-auto shrink-0 z-40 carbon-pattern bg-[#000814] border-t border-white/10 p-4 md:px-12 md:py-8">
        
        {/* Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#ffc300] to-transparent" />

        <div className="max-w-5xl mx-auto flex items-center gap-3">
          
          {/* Emoji / Media Toggle */}
          <div className="relative">
            <button 
              onClick={() => setIsEmojiOpen(!isEmojiOpen)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-xl glass-panel flex items-center justify-center hover:border-[#ffc300] transition-all"
            >
              <Flame size={20} className={isEmojiOpen ? "text-[#ffc300] fill-[#ffc300]" : "text-white/40"} />
            </button>

            {isEmojiOpen && (
              <div className="absolute bottom-full mb-4 left-0 z-50 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <EmojiPicker onEmojiClick={(e) => { handleEmojiClick(e); setIsEmojiOpen(false); }} theme="dark" />
              </div>
            )}
          </div>

          {/* Main Input Box */}
          <div className="flex-1 relative group">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="SEND TACTICAL COMMENTARY..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 md:py-5 font-bold text-sm tracking-widest outline-none focus:border-[#ffc300] focus:bg-white/[0.08] transition-all uppercase placeholder:text-white/20"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-white/20">
                <ImageIcon size={18} className="hover:text-white cursor-pointer" />
            </div>
          </div>
          
          {/* Send Trigger */}
          <button 
            onClick={handleSend}
            className="group w-12 h-12 md:w-14 md:h-14 bg-[#ffc300] rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all neon-glow"
          >
            <Send size={22} className="text-blue-900 fill-blue-900 -rotate-12 group-hover:rotate-0 transition-transform" />
          </button>
        </div>

        {/* Footer Attribution */}
        <div className="hidden md:flex justify-center mt-4">
             <p className="text-[9px] font-black text-white/20 tracking-[0.4em] uppercase">Tactical Fan Interface • Encryption Active</p>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;