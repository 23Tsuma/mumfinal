import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
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

import { Users, ChevronDown, Plus, Minus, Home, Sparkles, CalendarDays, ArrowRight } from "lucide-react";

/* ---------------- LOCAL HERO IMAGES IMPORTS ---------------- */
import v1 from "../imports/app/v1.jpg";
import v2 from "../imports/app/v2.jpg";
import v3 from "../imports/app/v3.jpg";
import v4 from "../imports/app/v4.jpg";

/* ---------------- CAROUSEL PROPERTY IMAGES ---------------- */
import carouselImg1 from "../imports/diani pearl/Exterior+elevated+2.webp";
import carouselImg2 from "../imports/bahari dhow/frontview.JPG";
import carouselImg3 from "../imports/Enzi/swim2.jpg";
import carouselImg4 from "../imports/Apple Mango/aerial.jpg";
import carouselImg5 from "../imports/images/mums-2.jpg";
import carouselImg6 from "../imports/coral beach/out.jpg";
import carouselImg7 from "../imports/flamboyant/aerial.webp";
import carouselImg8 from "../imports/Enzi/e1.jpg";

const CAROUSEL_CARDS = [
  { name: "Diani Pearl Resort", type: "Luxury Apartments", img: carouselImg1, price: "KES 20,000", id: 3 },
  { name: "Bahari Dhow Villa", type: "Beachfront Luxury", img: carouselImg2, price: "KES 28,500", id: 7 },
  { name: "Enzi Apartments", type: "Furnished Suites", img: carouselImg3, price: "KES 8,000", id: 4 },
  { name: "Apple Mango", type: "Private Villa", img: carouselImg4, price: "KES 10,000", id: 2 },
  { name: "Mum's Backpackers", type: "Beachside Lodge", img: carouselImg5, price: "KES 2,200", id: 1 },
  { name: "Coral Beach Resort", type: "Coastal Cottage", img: carouselImg6, price: "KES 8,900", id: 5 },
  { name: "Flamboyant Villa", type: "Garden Retreat", img: carouselImg7, price: "KES 22,000", id: 6 },
  { name: "Enzi Sky Suite", type: "Rooftop Experience", img: carouselImg8, price: "KES 10,000", id: 4 },
];

const villaImages = [v1, v2, v3, v4];

/* ---------------- APP SHELL (GLOBAL LAYOUT) ---------------- */
function AppShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleRightClick = (e: MouseEvent) => { e.stopPropagation(); };
    document.addEventListener("contextmenu", handleRightClick, { capture: true });
    return () => document.removeEventListener("contextmenu", handleRightClick, { capture: true });
  }, []);

  return (
    <div className="min-h-screen bg-[#050a10] text-stone-200 font-sans overflow-x-hidden antialiased">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Pinyon+Script&display=swap" rel="stylesheet" />
      <Navbar />
      {children}
      <AskDianiFloatingWidget />
    </div>
  );
}

/* ---------------- HOME PAGE ---------------- */
function HomePage() {
  const navigate = useNavigate();
  const [currentBg, setCurrentBg] = useState(0);
  const [propertyType, setPropertyType] = useState("all");
  const [preference, setPreference] = useState("any");
  const [guestCount, setGuestCount] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showPrefDropdown, setShowPrefDropdown] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const prefDropdownRef = useRef<HTMLDivElement>(null);
  const guestDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % villaImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(target)) setShowGuestDropdown(false);
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(target)) setShowTypeDropdown(false);
      if (prefDropdownRef.current && !prefDropdownRef.current.contains(target)) setShowPrefDropdown(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const section = document.getElementById("handpicked-stays");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const typeLabels: Record<string, string> = { all: "All Stays", villa: "Villas", cottage: "Cottages" };
  const prefLabels: Record<string, string> = { any: "Any Vibe", beachfront: "Beachfront", pool: "Private Pool", luxury: "Luxury Tier" };

  const today = new Date().toISOString().split("T")[0];

  return (
    <AppShell>
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          {villaImages.map((imgSrc, idx) => (
            <img
              key={imgSrc}
              src={imgSrc}
              alt="Diani Paradise"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out ${
                idx === currentBg ? "opacity-100 scale-[1.04]" : "opacity-0 scale-100"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050a10]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-72 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {villaImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBg(idx)}
              className={`transition-all duration-300 rounded-full ${idx === currentBg ? "w-6 h-1.5 bg-[#e5c158]" : "w-1.5 h-1.5 bg-white/30"}`}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl px-4 text-center select-none mx-auto pt-24 pb-8">
          <div className="inline-flex items-center gap-2 mb-7 bg-white/8 border border-white/15 backdrop-blur-md px-5 py-2 rounded-full mx-auto">
            <span className="w-1.5 h-1.5 bg-[#e5c158] rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-stone-300 font-medium">
              Diani Beach, Kenya · Premier Stays
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-white mb-6 leading-[1.1]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span>Your Perfect</span>{" "}
            <span
              className="inline-block bg-gradient-to-r from-[#f3d980] via-[#e5c158] to-[#c9a84c] bg-clip-text text-transparent"
              style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "1.25em" }}
            >
              Diani
            </span>{" "}
            <span className="font-normal italic">Escape Awaits</span>
          </h1>

          <p className="text-base md:text-lg text-stone-300/90 font-light tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed">
            Handpicked villas, cottages & boutique stays on one of Kenya's most beautiful beaches.
            From barefoot-luxury to budget-smart — we have your dream stay.
          </p>

          {/* ===== REALISTIC SEARCH BAR ===== */}
          <div className="relative z-20 mx-auto bg-[#0d1a28]/90 border border-white/12 p-2.5 rounded-2xl shadow-2xl backdrop-blur-xl max-w-5xl w-full">
            <div className="flex flex-wrap lg:flex-nowrap gap-1 items-stretch">

              {/* Property Type */}
              <div ref={typeDropdownRef} className="relative flex-1 min-w-[130px]">
                <div
                  onClick={() => { setShowTypeDropdown(!showTypeDropdown); setShowPrefDropdown(false); setShowGuestDropdown(false); }}
                  className="flex items-center gap-2.5 px-4 py-3.5 cursor-pointer hover:bg-white/6 rounded-xl transition h-full"
                >
                  <Home size={16} className="text-[#e5c158] shrink-0" />
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Stay Type</span>
                    <span className="text-stone-200 font-medium text-sm truncate">{typeLabels[propertyType]}</span>
                  </div>
                  <ChevronDown size={12} className={`text-stone-500 ml-auto shrink-0 transition-transform ${showTypeDropdown ? "rotate-180" : ""}`} />
                </div>
                {showTypeDropdown && (
                  <div className="absolute top-[110%] left-0 w-44 bg-[#111e2e] border border-white/10 rounded-xl p-1 shadow-2xl z-50 flex flex-col">
                    {Object.entries(typeLabels).map(([key, label]) => (
                      <button key={key} onClick={() => { setPropertyType(key); setShowTypeDropdown(false); }}
                        className={`text-left px-4 py-2.5 text-xs hover:bg-white/8 rounded-lg transition ${propertyType === key ? "text-[#e5c158] font-semibold" : "text-stone-300"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden lg:block w-px bg-white/8 my-2" />

              {/* Preference */}
              <div ref={prefDropdownRef} className="relative flex-1 min-w-[140px]">
                <div
                  onClick={() => { setShowPrefDropdown(!showPrefDropdown); setShowTypeDropdown(false); setShowGuestDropdown(false); }}
                  className="flex items-center gap-2.5 px-4 py-3.5 cursor-pointer hover:bg-white/6 rounded-xl transition h-full"
                >
                  <Sparkles size={16} className="text-[#e5c158] shrink-0" />
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Preference</span>
                    <span className="text-stone-200 font-medium text-sm truncate">{prefLabels[preference]}</span>
                  </div>
                  <ChevronDown size={12} className={`text-stone-500 ml-auto shrink-0 transition-transform ${showPrefDropdown ? "rotate-180" : ""}`} />
                </div>
                {showPrefDropdown && (
                  <div className="absolute top-[110%] left-0 w-48 bg-[#111e2e] border border-white/10 rounded-xl p-1 shadow-2xl z-50 flex flex-col">
                    {Object.entries(prefLabels).map(([key, label]) => (
                      <button key={key} onClick={() => { setPreference(key); setShowPrefDropdown(false); }}
                        className={`text-left px-4 py-2.5 text-xs hover:bg-white/8 rounded-lg transition ${preference === key ? "text-[#e5c158] font-semibold" : "text-stone-300"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden lg:block w-px bg-white/8 my-2" />

              {/* Check-in */}
              <div className="relative flex-1 min-w-[130px]">
                <div className="flex items-center gap-2.5 px-4 py-3.5 h-full">
                  <CalendarDays size={16} className="text-[#e5c158] shrink-0" />
                  <div className="flex flex-col text-left w-full min-w-0">
                    <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Check-in</span>
                    <input
                      type="date"
                      value={checkIn}
                      min={today}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="bg-transparent text-stone-200 text-sm font-medium outline-none cursor-pointer w-full [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden lg:block w-px bg-white/8 my-2" />

              {/* Check-out */}
              <div className="relative flex-1 min-w-[130px]">
                <div className="flex items-center gap-2.5 px-4 py-3.5 h-full">
                  <CalendarDays size={16} className="text-[#e5c158] shrink-0" />
                  <div className="flex flex-col text-left w-full min-w-0">
                    <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Check-out</span>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || today}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="bg-transparent text-stone-200 text-sm font-medium outline-none cursor-pointer w-full [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden lg:block w-px bg-white/8 my-2" />

              {/* Guests */}
              <div ref={guestDropdownRef} className="relative flex-1 min-w-[110px]">
                <div
                  onClick={() => { setShowGuestDropdown(!showGuestDropdown); setShowTypeDropdown(false); setShowPrefDropdown(false); }}
                  className="flex items-center gap-2.5 px-4 py-3.5 cursor-pointer hover:bg-white/6 rounded-xl transition h-full"
                >
                  <Users size={16} className="text-[#e5c158] shrink-0" />
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Guests</span>
                    <span className="text-stone-200 font-medium text-sm">{guestCount} {guestCount === 1 ? "Guest" : "Guests"}</span>
                  </div>
                  <ChevronDown size={12} className={`text-stone-500 ml-auto shrink-0 transition-transform ${showGuestDropdown ? "rotate-180" : ""}`} />
                </div>
                {showGuestDropdown && (
                  <div className="absolute top-[110%] right-0 w-52 bg-[#111e2e] border border-white/10 rounded-xl p-4 shadow-2xl z-50">
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-3">Number of Guests</p>
                    <div className="flex items-center justify-between gap-4">
                      <button disabled={guestCount <= 1} onClick={() => setGuestCount(p => p - 1)}
                        className="w-8 h-8 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg flex items-center justify-center transition disabled:opacity-30">
                        <Minus size={13} />
                      </button>
                      <span className="font-bold text-lg text-white w-6 text-center">{guestCount}</span>
                      <button onClick={() => setGuestCount(p => p + 1)}
                        className="w-8 h-8 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg flex items-center justify-center transition">
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#e5c158] text-[#0B151F] px-6 py-3.5 rounded-xl font-bold tracking-wide transition shadow-lg hover:brightness-110 hover:shadow-[#c9a84c]/30 hover:shadow-xl whitespace-nowrap text-sm ml-0.5 flex-shrink-0"
              >
                Find Properties
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {["Beachfront", "Private Pool", "Luxury", "Family-Friendly", "Budget-Smart"].map((tag) => (
              <button key={tag} className="px-3.5 py-1.5 bg-white/6 border border-white/10 text-stone-300 text-xs rounded-full hover:bg-white/12 hover:text-white transition backdrop-blur-md">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* ===== INFINITE CIRCULAR CAROUSEL ===== */}
        <div className="relative z-10 w-full pb-8 mt-4">
          <p className="text-[10px] tracking-[0.4em] uppercase text-center text-[#e5c158]/80 mb-5 font-medium">
            Featured Stays · Scroll to Explore
          </p>

          <div className="carousel-wrapper w-full">
            <div className="carousel-track">
              {/* First set */}
              {CAROUSEL_CARDS.map((card, idx) => (
                <div
                  key={`a-${idx}`}
                  onClick={() => navigate(`/property/${card.id}`)}
                  className="group relative h-52 w-72 rounded-2xl overflow-hidden shadow-xl border border-white/8 bg-[#0b1219] cursor-pointer mx-2.5 flex-shrink-0 transform hover:scale-[1.03] transition-transform duration-300"
                >
                  <img src={card.img} alt={card.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-[9px] text-[#e5c158]/80 uppercase tracking-widest font-medium mb-0.5">{card.type}</div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#e5c158] transition">{card.name}</h3>
                    <p className="text-[10px] text-stone-400 mt-0.5">{card.price} / night</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition bg-[#e5c158] text-[#0B151F] text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    View
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {CAROUSEL_CARDS.map((card, idx) => (
                <div
                  key={`b-${idx}`}
                  onClick={() => navigate(`/property/${card.id}`)}
                  className="group relative h-52 w-72 rounded-2xl overflow-hidden shadow-xl border border-white/8 bg-[#0b1219] cursor-pointer mx-2.5 flex-shrink-0 transform hover:scale-[1.03] transition-transform duration-300"
                >
                  <img src={card.img} alt={card.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-[9px] text-[#e5c158]/80 uppercase tracking-widest font-medium mb-0.5">{card.type}</div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#e5c158] transition">{card.name}</h3>
                    <p className="text-[10px] text-stone-400 mt-0.5">{card.price} / night</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition bg-[#e5c158] text-[#0B151F] text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    View
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== HANDPICKED STAYS ===================== */}
      <div id="handpicked-stays">
        <FeaturedProperties checkIn={checkIn} checkOut={checkOut} guestCount={guestCount} preference={preference} propertyType={propertyType} />
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
