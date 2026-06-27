import React, { useState } from "react";
import { MapPin, Compass, ArrowRight } from "lucide-react";

type NearbyItem = {
  title: string;
  headline: string;
  description: string;
  imageSrc: string;
  distance: string;
  tag: string;
};

const NEARBY: NearbyItem[] = [
  {
    title: "Diani Beach",
    headline: "Experience Africa's Award-Winning Beach Paradise",
    description:
      "Walk along 17km of white sand beaches, swim in turquoise waters, and enjoy sunsets along Kenya’s coast.",
    imageSrc: "/src/imports/Nearby/dianib.png",
    distance: "3 mins away",
    tag: "Nature",
  },
  {
    title: "Ukunda Airstrip",
    headline: "Fast Coastal Access Hub",
    description:
      "Main entry point for flights into Diani and the South Coast region.",
    imageSrc: "/src/imports/Nearby/ukunda air.jpg",
    distance: "10 mins away",
    tag: "Transport",
  },
  {
    title: "Diani Shopping Centre",
    headline: "Shopping & Essentials Nearby",
    description:
      "Restaurants, supermarkets, and local shops in one convenient place.",
    imageSrc: "/src/imports/Nearby/diani shopping.jpg",
    distance: "5 mins away",
    tag: "Lifestyle",
  },
  {
    title: "Colobus Conservation",
    headline: "Wildlife Protection Center",
    description:
      "Learn about endangered colobus monkeys and conservation efforts.",
    imageSrc: "/src/imports/Nearby/colobus.png",
    distance: "12 mins away",
    tag: "Wildlife",
  },
  {
    title: "Kongo Mosque",
    headline: "Historic Coastal Heritage Site",
    description:
      "One of Kenya’s oldest Swahili cultural landmarks with ocean views.",
    imageSrc: "/src/imports/Nearby/kongo.png",
    distance: "8 mins away",
    tag: "Heritage",
  },
  {
    title: "Shimba Hills Reserve",
    headline: "Safari Adventure Near the Coast",
    description:
      "Lush forest reserve with elephants, giraffes, and scenic viewpoints.",
    imageSrc: "/src/imports/Nearby/shimba.png",
    distance: "35 mins away",
    tag: "Safari",
  },
];

export default function NearbyAttractions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = NEARBY[activeIndex];

  return (
    <section className="relative min-h-screen pt-28 pb-24 text-stone-100 overflow-hidden bg-zinc-950">
      
      {/* 🖼️ KAYA BACKGROUND IMAGE CONTAINER */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/src/imports/Nearby/kaya.PNG')` }} 
      />
      
      {/* VIGNETTE OVERLAY (Smooth integration block for text readability over the image) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* SECTION HEADER BADGE */}
        <div className="flex items-center gap-2 text-[#dca442] text-xs uppercase tracking-[0.25em] font-bold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <MapPin className="w-4 h-4 stroke-[2.5]" />
          Curated Surroundings
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* LEFT INTERACTIVE LIST */}
          <div className="lg:col-span-5">
            <h2 className="text-6xl font-serif font-light mb-5 tracking-wide text-white leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Explore <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white to-[#dca442]">Diani</span>
            </h2>

            <p className="text-stone-200 text-sm max-w-md mb-10 font-light leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              Immerse yourself in breathtaking local landmarks located just moments away from your luxury escape.
            </p>

            <div className="space-y-3">
              {NEARBY.map((item, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <div
                    key={item.title}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`group relative py-4 px-6 flex justify-between items-center cursor-pointer transition-all duration-500 rounded-2xl border ${
                      isSelected 
                        ? "bg-black/60 backdrop-blur-md border-[#dca442] shadow-[0_10px_30px_rgba(0,0,0,0.5)] scale-[1.01]" 
                        : "border-transparent bg-black/10 backdrop-blur-[2px] hover:bg-black/30 hover:border-white/10"
                    }`}
                  >
                    <div>
                      <p className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-300 ${
                        isSelected ? "text-[#dca442]" : "text-stone-400"
                      }`}>
                        {item.tag} &bull; {item.distance}
                      </p>

                      <h3 className={`text-xl font-serif tracking-wide mt-1 transition-colors duration-300 ${
                        isSelected ? "text-white font-medium" : "text-stone-200 group-hover:text-white"
                      }`}>
                        {item.title}
                      </h3>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-all duration-500 ${
                      isSelected 
                        ? "text-[#dca442] translate-x-0 opacity-100" 
                        : "text-stone-400 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0"
                    }`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SHOWCASE CARD (Cream Content Layout) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden bg-[#FFFDF9] shadow-[0_40px_90px_-15px_rgba(0,0,0,0.7)] border border-white/10">

              {/* IMAGE WINDOW */}
              <div className="relative h-[430px] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9]/10 via-transparent to-black/10 z-10" />
                
                <img
                  key={active.imageSrc}
                  src={active.imageSrc}
                  alt={active.title}
                  className="w-full h-full object-cover transition-all duration-1000 ease-out scale-100 group-hover:scale-103"
                />

                {/* DISTANCE TIMING BADGE */}
                <div className="absolute top-6 right-6 z-20 bg-black/80 backdrop-blur-md px-4 py-2 text-[11px] uppercase tracking-widest font-semibold rounded-xl flex items-center gap-2 text-stone-200 border border-white/10 shadow-xl">
                  <Compass className="w-3.5 h-3.5 text-[#dca442]" />
                  {active.distance}
                </div>

                {/* PINNED HERO TITLE */}
                <div className="absolute bottom-6 left-8 z-20">
                  <h3 className="text-4xl font-serif tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]">
                    {active.title}
                  </h3>
                </div>
              </div>

              {/* WELL-ARRANGED CREAM ACCENT BODY */}
              <div className="p-10 bg-[#FFFDF9] text-slate-900">
                
                {/* Horizontal Divider Detail */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 rounded bg-black text-white">
                    {active.tag}
                  </span>
                  <div className="h-[1px] flex-1 bg-stone-200" />
                </div>
                
                {/* Headline Text */}
                <h4 className="font-serif text-2xl text-[#9E742A] font-bold mb-4 tracking-wide leading-snug">
                  {active.headline}
                </h4>

                {/* Description Text */}
                <p className="text-slate-600 text-base leading-relaxed font-normal tracking-wide max-w-2xl">
                  {active.description}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}