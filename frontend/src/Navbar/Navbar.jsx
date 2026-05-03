import React from 'react';
import { MessageSquare, Trash2Icon, Zap, ShieldAlert, Wifi, Target } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import userService from '../../service/user.service';
import { useNavigate } from 'react-router-dom';
import logo from '/logo.png';

function Navbar() {
  const userData = useSelector((state) => state?.auth?.userData);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const result = await userService.deleteUser(userData.fullname, userData.username);
      if (result) {
        localStorage.removeItem("userData");
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,800;1,800&family=Inter:wght@400;600;700&display=swap');
        
        .font-sporty { font-family: 'Barlow Condensed', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }

        .glass-nav {
          background: rgba(0, 8, 20, 0.8);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        @media (min-width: 768px) {
          .glass-nav {
            border-top: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
        }

        .gold-border-glow {
          box-shadow: 0 0 15px rgba(255, 195, 0, 0.2);
          border: 1px solid rgba(255, 195, 0, 0.4);
        }

        .ipl-modal {
          background: #000814 !important;
          border: 1px solid rgba(255, 195, 0, 0.3) !important;
          box-shadow: 0 0 50px rgba(0, 0, 0, 0.9) !important;
          border-radius: 12px !important;
          font-family: 'Inter', sans-serif !important;
        }

        .uplink-pulse {
          animation: uplink 2s infinite;
        }

        @keyframes uplink {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <nav className="fixed left-0 right-0 z-[100] glass-nav font-inter transition-all duration-300
                      bottom-0 px-4 h-20 flex items-center
                      md:top-0 md:bottom-auto md:h-20 md:px-12">

        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between gap-6">

          {/* --- BRANDING / LOGO --- */}
          <div className="flex-1 flex justify-start items-center">
            <div 
              className="relative group cursor-pointer flex items-center gap-3" 
              onClick={() => navigate('/')}
            >
              <div className="relative p-1 bg-gradient-to-tr from-[#ffc300] to-[#ff9500] rounded-lg">
                <div className="bg-black rounded-md p-1">
                    <img 
                      className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
                      src={logo} 
                      alt="IPL Arena"
                    />
                </div>
              </div>
              <div className="hidden md:block">
                <p className="font-sporty text-xl italic font-extrabold leading-none tracking-tighter">
                    FAN <span className="text-[#ffc300]">ARENA</span>
                </p>
                <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Broadcast ID: 2024-X</p>
              </div>
            </div>
          </div>

          {/* --- USER ACTIONS: TERMINATE PASS --- */}
          <div className={`shrink-0 flex justify-center ${userData ? 'visible' : 'invisible'}`}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button 
                  className="group flex items-center gap-3 px-5 py-2.5 rounded-md border border-red-500/30 bg-red-500/5 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <Trash2Icon size={18} className="text-red-500 group-hover:text-white transition-colors" />
                  <span className="hidden sm:inline font-sporty italic font-bold tracking-widest text-sm text-red-500 group-hover:text-white">TERMINATE PASS</span>
                </button>
              </AlertDialogTrigger>
              
              <AlertDialogContent className="ipl-modal max-w-[450px]">
                <AlertDialogHeader className="items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                     <ShieldAlert className="text-red-500" size={32} />
                  </div>
                  <AlertDialogTitle className="font-sporty text-3xl italic font-black text-white tracking-tight">
                    REVOKE ACCESS PASS?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm font-medium text-white/50 leading-relaxed max-w-[320px]">
                    This action is permanent. Revoking your <span className="text-white">Stadium ID</span> will erase all commentary history and tactical fan records.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                
                <AlertDialogFooter className="mt-8 gap-3 sm:justify-center">
                  <AlertDialogCancel 
                    className="flex-1 bg-white/5 hover:bg-white/10 border-white/10 text-white rounded-md font-bold py-5"
                  >
                    RETURN TO STANDS
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => handleClick()} 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-md font-bold py-5"
                  >
                    CONFIRM REVOCATION
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* --- BROADCAST STATUS & TOOLS --- */}
          <div className="flex-1 flex justify-end items-center gap-4">
            
            {userData ? (
                <button 
                  onClick={() => navigate("/dm")} 
                  className="flex items-center gap-3 bg-[#ffc300] text-blue-900 px-5 py-2 rounded-md font-sporty italic font-black text-sm hover:brightness-110 transition-all gold-border-glow shadow-xl"
                >
                  <MessageSquare size={18} className="fill-blue-900" />
                  <span className="hidden lg:inline tracking-widest">STADIUM COMMS</span>
                </button>
            ) : null}

            <div className="hidden lg:flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2.5 rounded-md">
              <div className="flex items-center gap-3">
                <div className="relative flex h-2 w-2">
                    <span className={`uplink-pulse absolute inline-flex h-full w-full rounded-full opacity-75 ${userData ? "bg-cyan-400" : "bg-red-500"}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${userData ? "bg-cyan-400" : "bg-red-500"}`}></span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-white/30 uppercase leading-none tracking-widest mb-1">Status</span>
                    <p className="text-[10px] font-black text-white uppercase tracking-tighter">
                        {userData ? "BROADCAST UPLINK" : "CONNECTION LOST"}
                    </p>
                </div>
              </div>
              <div className="w-[1px] h-6 bg-white/10 mx-2" />
              <Target size={16} className={userData ? "text-cyan-400" : "text-white/20"} />
            </div>          
          </div>
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;