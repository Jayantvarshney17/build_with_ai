import React, { useState } from 'react';
import { Star, Flame, Zap, Award } from 'lucide-react';

const STADIUM_FOOD = [
  { id: 1, name: "Premium Vada Pav", price: "₹120", calories: "250 kcal", img: "🥯" },
  { id: 2, name: "Loaded Nachos", price: "₹350", calories: "450 kcal", img: "🌮" },
  { id: 3, name: "Stadium Popcorn", price: "₹250", calories: "180 kcal", img: "🍿" },
  { id: 4, name: "Chicken Wings (6P)", price: "₹450", calories: "520 kcal", img: "🍗" },
  { id: 5, name: "Cold Brew / Cola", price: "₹90", calories: "140 kcal", img: "🥤" },
];

const FoodSidebar = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <Utensils className="text-[#ffc300]" size={20} />
          <h3 className="font-sporty text-2xl tracking-tighter italic">MATCH DAY FUEL</h3>
        </div>
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Rate the stadium snacks</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll">
        {STADIUM_FOOD.map((item) => (
          <FoodItem key={item.id} item={item} />
        ))}
      </div>

      <div className="p-4 bg-white/5 m-4 rounded-xl border border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <Award className="text-[#ffc300]" size={14} />
          <span className="text-[10px] font-black text-[#ffc300] uppercase">Fan's Choice</span>
        </div>
        <p className="text-xs font-bold">Vada Pav is trending! 🔥</p>
      </div>
    </div>
  );
};

// --- Modular Food Card Component ---
const FoodItem = ({ item }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="group bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-3">
        <div className="text-4xl">{item.img}</div>
        <div className="text-right">
          <p className="text-sm font-black text-[#ffc300]">{item.price}</p>
          <p className="text-[9px] text-white/40 font-bold uppercase">{item.calories}</p>
        </div>
      </div>
      
      <h4 className="font-bold text-sm mb-1 tracking-tight">{item.name}</h4>
      
      {/* Rating System */}
      <div className="flex items-center gap-1 mt-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="transition-transform active:scale-125"
          >
            <Star
              size={14}
              className={`${
                star <= rating ? 'fill-[#ffc300] text-[#ffc300]' : 'text-white/20'
              } transition-colors`}
            />
          </button>
        ))}
        {rating > 0 && <span className="text-[10px] ml-2 font-black text-[#ffc300] animate-pulse">FIXED!</span>}
      </div>
    </div>
  );
};

const Utensils = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
)

export default FoodSidebar;