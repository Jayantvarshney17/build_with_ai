import React, { useState, useEffect } from 'react';
import { X, Utensils, Trophy } from 'lucide-react';
import { socket } from '../../service/socket.service';
import FoodSidebar from '../components/FoodSidebar';
import ChatArea from '../components/ChatArea';
import { useSelector } from 'react-redux';
import messageService from '../../service/message.service';
import FunkyLoader from '../components/FunkyLoader';

const HomePage = () => {
  const [inputText, setInputText] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showMobileFood, setShowMobileFood] = useState(false);

  // --- Socket & History Logic ---
  useEffect(() => {
    if (!userData) return;
    socket.emit("sendActiveUsers");
    
    messageService.getHistory().then((res) => {
      if (res) {
        setLoader(false);
        const history = res.data.map((msg) => ({
          id: msg._id,
          user: msg.userData?.[0]?.fullname,
          username: msg.userData?.[0]?.username,
          avatar: msg.userData?.[0]?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=ipl",
          text: msg.content,
          isMe: userData ? msg.userData?.[0]?._id === userData._id : false
        }));
        setMessages(history);
      }
    }).catch(() => setLoader(false));

    socket.on("textMessage", (message) => {
      setMessages(prev => [...prev, { ...message, isMe: false, id: Date.now() }]);
    });

    return () => {
      socket.off("textMessage");
    };
  }, [userData]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    messageService.postMessage(userData, inputText).catch(console.error);

    const msgObj = {
      id: Date.now(),
      user: userData.fullname,
      avatar: userData.avatar,
      username: userData.username,
      text: inputText,
      isMe: true
    };
    
    setMessages(prev => [...prev, msgObj]); 
    socket.emit("newMessage", { ...msgObj, isMe: false });
    setInputText("");
  };

  if (loader) return <FunkyLoader />;

  return (
    <div className="h-[100dvh] w-full bg-[#000814] font-sans text-white relative flex flex-col items-center overflow-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,800;1,800&family=Inter:wght@400;600;700&display=swap');
        .font-sporty { font-family: 'Barlow Condensed', sans-serif; }
        
        .glass-panel { 
            background: rgba(255, 255, 255, 0.02); 
            backdrop-filter: blur(20px); 
            border: 1px solid rgba(255, 255, 255, 0.08); 
        }

        .stadium-glow {
            box-shadow: 0 0 40px rgba(0, 102, 255, 0.1);
        }

        .gold-accent-line {
            height: 2px;
            background: linear-gradient(90deg, transparent, #ffc300, transparent);
        }
      `}</style>

      {/* --- Stadium Ambient Lights --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/5 blur-[120px] pointer-events-none" />

      {/* --- Dashboard Container --- */}
      <div className="relative z-10 w-full max-w-[1700px] h-full p-0 md:p-6 overflow-hidden flex flex-col">
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-6 min-h-0">
          
          {/* LEFT PANEL: FOOD & RATING (4 Columns) */}
          <div className="hidden md:flex md:col-span-4 lg:col-span-3 flex-col h-full overflow-hidden glass-panel rounded-3xl stadium-glow">
             <FoodSidebar />
          </div>

          {/* RIGHT PANEL: FULL CHAT ARENA (8 Columns) */}
          <div className="col-span-1 md:col-span-8 lg:col-span-9 flex flex-col relative h-full w-full overflow-hidden bg-black/40 md:glass-panel md:rounded-3xl border-t border-white/5 z-20">
            <ChatArea 
              messages={messages}
              inputText={inputText}
              setInputText={setInputText}
              handleSend={handleSend}
              onOpenRooms={() => setShowMobileFood(true)}
              onOpenLegends={() => {}} // Disabled as sidebar is removed
            />
          </div>

        </div>
      </div>

      {/* --- Mobile Food Drawer --- */}
      <div className={`fixed inset-0 z-[100] transition-transform duration-500 md:hidden ${showMobileFood ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowMobileFood(false)} />
        <div className="absolute left-0 top-0 bottom-0 w-[85%] bg-[#000814] border-r border-white/10 shadow-2xl flex flex-col">
           <div className="p-6 flex justify-between items-center bg-gradient-to-r from-blue-900/40 to-transparent">
             <div className="flex items-center gap-3">
                <Utensils className="text-[#ffc300]" size={24} />
                <h2 className="font-sporty text-3xl italic text-[#ffc300] tracking-tighter">STADIUM MENU</h2>
             </div>
             <button 
                onClick={() => setShowMobileFood(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
             >
                <X className="text-white" size={24} />
             </button>
           </div>
           <div className="flex-1 overflow-hidden">
             <FoodSidebar isMobile />
           </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;