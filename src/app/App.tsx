import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { FeaturedProperties } from "./components/FeaturedProperties";
import { DianiMap } from "./components/DianiMap";
import { InstagramFeed } from "./components/InstagramFeed";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";
import PropertyDetails from "./pages/PropertyDetails";
import AboutUs from "./pages/AboutUs";

import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import NearbyAttractions from "./components/NearbyAttractions";
import { DianiAIConciergeWidget as AskDianiFloatingWidget } from "./components/AskDianiFloatingWidget";

// Lucide icons for the floating discovery bar
import { Users, ChevronDown, Plus, Minus, Home, Sparkles } from "lucide-react";

/* ---------------- LOCAL HERO IMAGES IMPORTS ---------------- */
import v1 from "../imports/app/v1.jpg";
import v2 from "../imports/app/v2.jpg";
import v3 from "../imports/app/v3.jpg";
import v4 from "../imports/app/v4.jpg";

/* ---------------- PROPERTY IMAGES ASSIGNMENTS ---------------- */
const PROPERTIES_DATA = [
  {
    name: "Diani Pearl Resort",
    img: "/src/imports/diani pearl/Exterior+elevated+2.webp",
  },
  {
    name: "Bahari Dhow beach villa",
    img: "/src/imports/Enzi/frontview.jpg",
  },
  {
    name: "Enzi Furnished Apartments",
    img: "/src/imports/Enzi/swim2.jpg",
  },
  {
    name: "Apple Mango Apartments",
    img: "/src/imports/Enzi/swimmo.jpg",
  },
  {
    name: "Mum's Backpackers",
    img: "/src/imports/images/mums-bed.jpg",
  },
  {
    name: "Coral Beach Resort",
    img: "/src/imports/coral beach/out.jpg",
  },
];

const villaImages = [v1, v2, v3, v4];

/* ---------------- APP SHELL (GLOBAL LAYOUT) ---------------- */
function AppShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleRightClick = (e: MouseEvent) => {
      e.stopPropagation();
    };

    document.addEventListener("contextmenu", handleRightClick, { capture: true });

    return () => {
      document.removeEventListener("contextmenu", handleRightClick, { capture: true });
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050a10] text-stone-200 font-sans overflow-x-hidden antialiased">
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Pinyon+Script&display=swap"
        rel="stylesheet"
      />

      <Navbar />
      {children}
      <AskDianiFloatingWidget />
    </div>
  );
}

/* ---------------- HOME PAGE ---------------- */
function HomePage() {
  const [currentBg, setCurrentBg] = useState(0);
  const [propertyBatchIndex, setPropertyBatchIndex] = useState(0);

  // Discovery Preference States
  const [propertyType, setPropertyType] = useState("all"); // 'all' | 'villa' | 'cottage'
  const [preference, setPreference] = useState("any");   // 'any' | 'beachfront' | 'pool' | 'luxury'
  const [guestCount, setGuestCount] = useState(1);
  
  // Dropdown UI States
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showPrefDropdown, setShowPrefDropdown] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const prefDropdownRef = useRef<HTMLDivElement>(null);
  const guestDropdownRef = useRef<HTMLDivElement>(null);

  // Background Image Rotator (7 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % villaImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Property Cards Rotation Interval (10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setPropertyBatchIndex((prev) => (prev === 0 ? 1 : 0));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Click Outside to Close All Dropdowns Safely
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(target)) {
        setShowGuestDropdown(false);
      }
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(target)) {
        setShowTypeDropdown(false);
      }
      if (prefDropdownRef.current && !prefDropdownRef.current.contains(target)) {
        setShowPrefDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Preference Submission
  const handleSearchProperties = () => {
    // This logs your user's preferences ready to be fed to your catalog filter logic
    console.log("Filtering catalog by preferences:", { propertyType, preference, guestCount });

    const section = document.getElementById("featured-properties-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.95,
        behavior: "smooth"
      });
    }
  };

  // Switch between slices 0-3 and 3-6
  const visibleProperties = propertyBatchIndex === 0 
    ? PROPERTIES_DATA.slice(0, 3) 
    : PROPERTIES_DATA.slice(3, 6);

  // Readable string labels mapped to state values
  const typeLabels: Record<string, string> = { all: "All Stays", villa: "Villas", cottage: "Cottages" };
  const prefLabels: Record<string, string> = { any: "Any Vibe", beachfront: "Beachfront", pool: "Private Pool", luxury: "Luxury Tier" };

  return (
    <AppShell>
      {/* HERO SECTION */}
      <section className="relative min-h-[115vh] w-full flex flex-col items-center justify-start overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 z-0">
          {villaImages.map((imgSrc, idx) => (
            <img
              key={imgSrc}
              src={imgSrc}
              alt="Diani Paradise Nightfall"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out ${
                idx === currentBg 
                  ? "opacity-100 scale-105" 
                  : "opacity-0 scale-100"
              }`}
            />
          ))}
          {/* Neutral Warm Nocturnal Overlay Layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-[#050a10]" />
        </div>

        {/* ONE LINE FANCY HERO HEADER */}
        <div className="relative z-10 max-w-5xl px-4 text-center select-none mb-10 mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mx-auto">
            <span className="w-1.5 h-1.5 bg-[#e5c158] rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-300 font-medium">
              Exclusive Nocturnal Escapes
            </span>
          </div>

          {/* Combined title into a single line wrapper with reduced sizing */}
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-white whitespace-normal md:whitespace-nowrap flex flex-wrap md:flex-nowrap items-center justify-center gap-x-3 gap-y-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span>Experience Diani's</span>
            <span
              className="inline-block bg-gradient-to-r from-[#f3d980] via-[#e5c158] to-[#c9a84c] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(229,193,88,0.2)] px-1"
              style={{ 
                fontFamily: "'Pinyon Script', cursive",
                textTransform: "none",
                fontSize: "1.2em",
                verticalAlign: "middle"
              }}
            >
              Magic
            </span>{" "}
            <span className="font-normal italic text-stone-200">After Dark</span>
          </h1> 

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="hidden sm:block h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c9a84c]" />
            <p className="text-sm md:text-base max-w-xl text-stone-300/90 font-light tracking-wide italic">
              Your perfect beach villa or cottage match, curated by your unique style preferences.
            </p>
            <div className="hidden sm:block h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c9a84c]" />
          </div>
        </div>

        {/* PREFERENCE SEARCH DISCOVERY BAR */}
        <div className="relative z-20 mx-4 mb-16 bg-[#1a120e]/95 border border-[#442f24] p-3 md:p-4 rounded-xl shadow-2xl flex flex-wrap gap-4 items-center justify-center text-sm backdrop-blur-md max-w-4xl w-[90%]">
          
          {/* Property Type Filter Block */}
          <div ref={typeDropdownRef} className="relative min-w-[150px] flex-1 sm:flex-initial">
            <div 
              onClick={() => { setShowTypeDropdown(!showTypeDropdown); setShowPrefDropdown(false); setShowGuestDropdown(false); }}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-white/5 rounded-lg transition justify-between"
            >
              <div className="flex items-center gap-3">
                <Home size={18} className="text-[#e5c158]" /> 
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Looking For</span>
                  <span className="text-stone-200 font-medium whitespace-nowrap">
                    {typeLabels[propertyType]}
                  </span>
                </div>
              </div>
              <ChevronDown size={14} className={`text-stone-400 transition-transform ${showTypeDropdown ? 'rotate-180' : ''}`} />
            </div>

            {showTypeDropdown && (
              <div className="absolute top-[110%] left-0 w-48 bg-[#231914] border border-[#533b2e] rounded-xl p-1 shadow-2xl z-50 text-white flex flex-col">
                {Object.entries(typeLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => { setPropertyType(key); setShowTypeDropdown(false); }}
                    className={`text-left px-4 py-2 text-xs hover:bg-white/10 rounded-lg transition ${propertyType === key ? 'text-[#e5c158] font-semibold' : 'text-stone-300'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block w-px h-8 bg-[#442f24]" />

          {/* Preferences Vibe Selection Block */}
          <div ref={prefDropdownRef} className="relative min-w-[160px] flex-1 sm:flex-initial">
            <div 
              onClick={() => { setShowPrefDropdown(!showPrefDropdown); setShowTypeDropdown(false); setShowGuestDropdown(false); }}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-white/5 rounded-lg transition justify-between"
            >
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-[#e5c158]" /> 
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Preference</span>
                  <span className="text-stone-200 font-medium whitespace-nowrap">
                    {prefLabels[preference]}
                  </span>
                </div>
              </div>
              <ChevronDown size={14} className={`text-stone-400 transition-transform ${showPrefDropdown ? 'rotate-180' : ''}`} />
            </div>

            {showPrefDropdown && (
              <div className="absolute top-[110%] left-0 w-48 bg-[#231914] border border-[#533b2e] rounded-xl p-1 shadow-2xl z-50 text-white flex flex-col">
                {Object.entries(prefLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => { setPreference(key); setShowPrefDropdown(false); }}
                    className={`text-left px-4 py-2 text-xs hover:bg-white/10 rounded-lg transition ${preference === key ? 'text-[#e5c158] font-semibold' : 'text-stone-300'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block w-px h-8 bg-[#442f24]" />

          {/* Guest management block */}
          <div ref={guestDropdownRef} className="relative min-w-[130px] flex-1 sm:flex-initial">
            <div 
              onClick={() => { setShowGuestDropdown(!showGuestDropdown); setShowTypeDropdown(false); setShowPrefDropdown(false); }}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-white/5 rounded-lg transition justify-between"
            >
              <div className="flex items-center gap-3">
                <Users size={18} className="text-[#e5c158]" /> 
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Guests</span>
                  <span className="text-stone-200 font-medium whitespace-nowrap">
                    {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                  </span>
                </div>
              </div>
              <ChevronDown size={14} className={`text-stone-400 transition-transform ${showGuestDropdown ? 'rotate-180' : ''}`} />
            </div>

            {showGuestDropdown && (
              <div className="absolute top-[110%] left-0 w-44 bg-[#231914] border border-[#533b2e] rounded-xl p-3 shadow-2xl z-50 flex items-center justify-between text-white">
                <span className="font-medium text-xs text-stone-300">Adults / Kids</span>
                <div className="flex items-center gap-3">
                  <button 
                    disabled={guestCount <= 1}
                    onClick={() => setGuestCount(prev => prev - 1)}
                    className="w-7 h-7 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-md flex items-center justify-center transition disabled:opacity-30"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="font-bold text-sm w-4 text-center">{guestCount}</span>
                  <button 
                    onClick={() => setGuestCount(prev => prev + 1)}
                    className="w-7 h-7 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-md flex items-center justify-center transition"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Trigger Button */}
          <button 
            onClick={handleSearchProperties}
            className="w-full sm:w-auto sm:ml-auto bg-[#704832] hover:bg-[#86593f] text-white px-6 py-3 rounded-lg font-semibold tracking-wide transition shadow-md whitespace-nowrap uppercase"
          >
            Find Properties
          </button>
        </div>

        {/* ROTATING FEATURED PROPERTIES DISPLAY ROW */}
        <div className="relative z-10 w-full max-w-6xl px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-center text-[#e5c158] mb-6 font-medium">
            Featured Night Stays
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500">
            {visibleProperties.map((property) => (
              <div 
                key={property.name} 
                className="group relative h-64 rounded-[24px] overflow-hidden shadow-xl border border-white/5 bg-[#0b1219]/80 backdrop-blur-sm flex flex-col justify-end transform hover:-translate-y-1 transition duration-300"
              >
                <div className="absolute inset-0 bg-stone-900/40">
                  {typeof property.img === "string" ? (
                    <img
                      src={property.img}
                      alt={property.name}
                      className="w-full h-full object-cover opacity-95"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                
                <div className="relative z-20 p-5">
                  <h3 className="text-lg font-medium text-white group-hover:text-[#e5c158] transition duration-200">
                    {property.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">Click to view night packages</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REMAINDER COMPONENT STAYS */}
      <div id="featured-properties-section">
        <FeaturedProperties />
      </div>
    </AppShell>
  );
}

/* ---------------- LAYOUT WRAPPER FOR ALL OTHER PAGES ---------------- */
function PageLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

/* ---------------- ROUTES ---------------- */
function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <Routes location={location}>
      <Route path="/" element={<HomePage />} />
      <Route path="/stay" element={<PageLayout><FeaturedProperties /></PageLayout>} />
      <Route path="/map" element={<PageLayout><DianiMap /></PageLayout>} />
      <Route path="/gallery" element={<PageLayout><InstagramFeed /></PageLayout>} />
      <Route path="/about-us" element={<PageLayout><AboutUs /></PageLayout>} />
      <Route path="/property/:propertyId" element={<PageLayout><PropertyDetails /></PageLayout>} />
      <Route path="/privacy" element={<PageLayout><Privacy /></PageLayout>} />
      <Route path="/terms" element={<PageLayout><Terms /></PageLayout>} />
      <Route path="/cookies" element={<PageLayout><Cookies /></PageLayout>} />
      <Route path="/nearby" element={<PageLayout><NearbyAttractions /></PageLayout>} />
    </Routes>
  );
}

/* ---------------- ROOT APP ---------------- */
export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <Footer />
      <BookingModal />
    </BrowserRouter>
  );
}