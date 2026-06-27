import { useMemo, useState, useRef } from "react";
import { Navigation, Compass, MapPin } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type PinCategory = "Villas" | "Hotels";

type Place = {
  id: string;
  name: string;
  category: PinCategory;
  lat: number;
  lng: number;
  detail: string;
  tag: string;
};

const PLACES: Place[] = [
  { id: "mums", name: "Mum's Backpackers", category: "Villas", lat: -4.2925, lng: 39.5801, detail: "Budget basecamp & social hub", tag: "Social" },
  { id: "applemango", name: "Apple Mango Apartments", category: "Villas", lat: -4.2789, lng: 39.6238, detail: "Modern self-catering suites", tag: "Privacy" },
  { id: "diani-pearl", name: "Diani Pearl Resort", category: "Villas", lat: -4.2886, lng: 39.5907, detail: "Boutique beachfront resort", tag: "Beachfront" },
  { id: "flamboyant", name: "Flamboyant Villa", category: "Villas", lat: -4.2868, lng: 39.5824, detail: "Luxury private estate", tag: "Luxury" },
  { id: "soulbreeze", name: "Soul Breeze", category: "Villas", lat: -4.2776, lng: 39.5998, detail: "Kitesurfing & beach lounge", tag: "Active" },
  { id: "colobus", name: "Colobus Conservation", category: "Hotels", lat: -4.2677, lng: 39.5641, detail: "Primate wildlife sanctuary", tag: "Nature" },
  { id: "ali-barbour", name: "Ali Barbour's Cave", category: "Hotels", lat: -4.2727, lng: 39.6025, detail: "Candlelit cave dining", tag: "Dining" },
  { id: "kongo-mosque", name: "Kongo Mosque", category: "Hotels", lat: -4.2962, lng: 39.6050, detail: "Ancient historic landmark", tag: "Heritage" },
];

const THEME = {
  villas: "#dca442",
  hotels: "#e5c158",
};

const makeLuxuryIcon = (color: string) => {
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="${color}" fill-opacity="0.25"></path>
      <circle cx="12" cy="10" r="3" fill="white"></circle>
    </svg>
  `);

  return L.divIcon({
    html: `<div class="luxury-marker-ping"><img alt="marker" src="data:image/svg+xml,${svg}" style="width:36px;height:36px;"/></div>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

const CENTER: [number, number] = [-4.2897, 39.6063];

export function DianiMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mapRef = useRef<any>(null);

  const icons = useMemo(() => ({
    Villas: makeLuxuryIcon(THEME.villas),
    Hotels: makeLuxuryIcon(THEME.hotels),
  }), []);

  const handleFlyTo = (place: Place) => {
    setSelectedId(place.id);
    if (mapRef.current) {
      mapRef.current.flyTo([place.lat, place.lng], 14, { duration: 1.5 });
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-24 text-stone-100 overflow-hidden bg-zinc-950">
      
      {/* 🖼️ KAYA BACKGROUND IMAGE CONTAINER */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/src/imports/Nearby/kaya.PNG')` }} 
      />
      
      {/* VIGNETTE OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADER BADGE */}
        <div className="flex items-center gap-2 text-[#dca442] text-xs uppercase tracking-[0.25em] font-bold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <MapPin className="w-4 h-4 stroke-[2.5]" />
          Explorer's Guide
        </div>

        {/* SECTION HEADER BLOCK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/10">
          <div className="max-w-xl text-left">
            <h2 className="text-5xl md:text-6xl font-serif font-light tracking-wide text-white leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Mapping <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white to-[#dca442]">Paradise</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-[#dca442] animate-pulse" />
              <span className="text-[10px] font-bold text-stone-200 uppercase tracking-wider">Premium Stays</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-[#e5c158]" />
              <span className="text-[10px] font-bold text-stone-200 uppercase tracking-wider">Local Landmarks</span>
            </div>
          </div>
        </div>

        {/* LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT INTERACTIVE LIST */}
          <div className="lg:col-span-4 h-[600px] overflow-y-auto space-y-3 pr-2 custom-luxury-scroll">
            {PLACES.map((place) => {
              const active = selectedId === place.id;
              return (
                <button
                  key={place.id}
                  onClick={() => handleFlyTo(place)}
                  className={`w-full text-left group transition-all duration-500 p-5 rounded-2xl border ${
                    active 
                      ? 'bg-black/60 backdrop-blur-md border-[#dca442] shadow-[0_10px_30px_rgba(0,0,0,0.5)] scale-[1.01]' 
                      : 'border-transparent bg-black/10 backdrop-blur-[2px] hover:bg-black/30 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${active ? 'text-[#dca442]' : 'text-stone-400'}`}>{place.tag}</span>
                    <Navigation className={`w-4 h-4 transition-all duration-500 ${active ? 'text-[#dca442] translate-x-0' : 'text-stone-400 opacity-60 group-hover:translate-x-1'}`} />
                  </div>
                  <h4 className={`text-xl font-serif tracking-wide transition-colors duration-300 ${active ? 'text-white font-medium' : 'text-stone-200 group-hover:text-white'}`}>{place.name}</h4>
                  <p className="text-sm text-stone-400 font-light leading-relaxed mt-1">{place.detail}</p>
                </button>
              );
            })}
          </div>

          {/* RIGHT MAP DISPLAY CANVAS */}
          <div className="lg:col-span-8 h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_90px_-15px_rgba(0,0,0,0.7)] relative">
            <MapContainer
              {...({ center: CENTER, zoom: 13, scrollWheelZoom: true, ref: mapRef } as any)}
              className="w-full h-full z-0"
            >
              <TileLayer
                {...({
                  url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
                  attribution: '&copy; OpenStreetMap contributors'
                } as any)}
              />

              {PLACES.map((p) => (
                <Marker 
                  key={p.id} 
                  position={[p.lat, p.lng]} 
                  {...({ icon: p.category === "Villas" ? icons.Villas : icons.Hotels } as any)}
                >
                  <Popup {...({ className: "luxury-popup" } as any)}>
                    <div className="p-3 text-center bg-[#FFFDF9]">
                      <span className="text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded bg-black text-[#dca442] mb-2 inline-block">
                        {p.tag}
                      </span>
                      <h5 className="font-serif text-lg text-slate-900 font-bold leading-tight">{p.name}</h5>
                      <p className="text-xs text-slate-600 font-normal tracking-wide mt-1">{p.detail}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* FLOATING COMPASS STAT BADGE */}
            <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/10 z-[1000] hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <Compass className="w-5 h-5 text-[#dca442]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Wind Conditions</div>
                  <div className="text-sm font-bold text-white tracking-wide">ESE 12 knots</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* LUXURY LEAFLET CSS CUSTOMIZATIONS */}
      <style>{`
        .luxury-popup .leaflet-popup-content-wrapper {
          background: #FFFDF9 !important;
          border-radius: 20px !important;
          border: 1px solid #EFECE6 !important;
          padding: 0px !important;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3) !important;
        }
        .luxury-popup .leaflet-popup-content {
          margin: 0px !important;
          min-width: 200px;
        }
        .luxury-popup .leaflet-popup-tip { background: #FFFDF9 !important; }
        
        .luxury-marker-ping {
          animation: luxuryPing 3s infinite ease-in-out;
        }
        @keyframes luxuryPing {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(220,164,66,0)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 12px rgba(220,164,66,0.5)); }
        }

        .custom-luxury-scroll::-webkit-scrollbar { width: 4px; }
        .custom-luxury-scroll::-webkit-scrollbar-thumb { background: rgba(220,164,66,0.3); border-radius: 10px; }
        .custom-luxury-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </section>
  );
}