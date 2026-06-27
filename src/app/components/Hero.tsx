import { useState, useEffect, useRef } from "react";
import { Search, Calendar, Users, MapPin, ChevronDown, Sparkles, Star } from "lucide-react";

// ✅ Local image import (make sure path is correct)
import mnazi from "@/imports/mnazi.png";

const HERO_BG = mnazi;

const experienceTypes = [
  { emoji: "🌊", label: "Beachfront" },
  { emoji: "💍", label: "Honeymoon" },
  { emoji: "🎒", label: "Backpacker" },
  { emoji: "👨‍👩‍👧‍👦", label: "Family" },
  { emoji: "✨", label: "Luxury" },
  { emoji: "🤿", label: "Adventure" },
];

// Animated counter hook
function useCountUp(target: number, duration: number = 2000, start: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, start]);

  return count;
}

export function Hero({ onSearch }: { onSearch?: (q: any) => void }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [type, setType] = useState("All");
  const [activeExp, setActiveExp] = useState<string | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const propertiesCount = useCountUp(120, 2000, statsVisible);
  const guestsCount = useCountUp(8000, 2500, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSearch = () => {
    onSearch?.({
      checkIn,
      checkOut,
      guests,
      type,
      experience: activeExp,
    });

    document
      .getElementById("properties")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Safe fallback processing for TypeScript compiler bundle asset configurations
  const resolveHeroBg = (): string => {
    if (!HERO_BG) return "";
    if (typeof HERO_BG === "string") return HERO_BG;
    return (HERO_BG as any).src || "";
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background with Ken Burns effect */}
      <div className="absolute inset-0 bg-[#0d1b2a]">
        <img
          src={resolveHeroBg()}
          alt="Diani Beach white sand and turquoise ocean"
          className="absolute inset-0 w-full h-full object-cover opacity-60 animate-ken-burns"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/70 via-[#0d1b2a]/30 to-[#0d1b2a]/90" />
        {/* Subtle gold glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c9a84c]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Floating decorative orbs */}
      <div className="absolute top-1/4 left-[8%] w-2 h-2 rounded-full bg-[#c9a84c]/40 animate-float-slow pointer-events-none" />
      <div className="absolute top-1/3 right-[12%] w-3 h-3 rounded-full bg-[#e5c158]/30 animate-float pointer-events-none" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-[15%] w-1.5 h-1.5 rounded-full bg-white/30 animate-float-slow pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/4 right-[18%] w-2 h-2 rounded-full bg-[#c9a84c]/30 animate-float pointer-events-none" style={{ animationDelay: "0.5s" }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pt-28 pb-16">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#c9a84c]/15 border border-[#c9a84c]/40 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm animate-fade-in-down fade-in-up-initial">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
          <span
            className="text-[#c9a84c] tracking-widest uppercase font-semibold"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}
          >
            Diani Beach, Kenya
          </span>
        </div>

        {/* Fancy Brand Headline */}
        <h1
          className="text-white mb-6 leading-[1.05] tracking-wide animate-fade-in-up fade-in-up-initial delay-200"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 900,
          }}
        >
          Discover Diani's
          <br />
          <span 
            className="shimmer-text italic font-light px-2"
            style={{ textTransform: "none" }}
          >
            Magic
          </span> 
          Every Stay
        </h1>

        <p
          className="text-white/75 mb-8 max-w-xl leading-relaxed font-light animate-fade-in-up fade-in-up-initial delay-300"
          style={{ fontSize: "1.1rem" }}
        >
          Villas, hostels & cottages steps from the best beach in Kenya. Book instantly
          or chat with us on WhatsApp.
        </p>

        {/* Experience type pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 animate-fade-in-up fade-in-up-initial delay-400">
          {experienceTypes.map((exp) => (
            <button
              key={exp.label}
              type="button"
              onClick={() => setActiveExp(activeExp === exp.label ? null : exp.label)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 backdrop-blur-sm border ${
                activeExp === exp.label
                  ? "bg-[#c9a84c] text-[#0d1b2a] border-[#c9a84c] shadow-lg shadow-[#c9a84c]/30 scale-105"
                  : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white hover:border-[#c9a84c]/40"
              }`}
            >
              <span className="text-sm">{exp.emoji}</span>
              {exp.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-2 flex flex-wrap gap-2 md:flex-nowrap items-center animate-fade-in-up fade-in-up-initial delay-500">
          
          {/* Location */}
          <div className="flex-1 min-w-[140px] flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
            <MapPin className="w-4 h-4 text-[#c9a84c] shrink-0" />
            <div className="text-left">
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Location</div>
              <div className="text-[#0d1b2a] text-sm font-semibold whitespace-nowrap">
                Diani Beach
              </div>
            </div>
          </div>

          {/* Check In */}
          <div className="flex-1 min-w-[140px] flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
            <Calendar className="w-4 h-4 text-[#c9a84c] shrink-0" />
            <div className="flex-1 text-left">
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Check In</div>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="text-[#0d1b2a] text-sm font-semibold bg-transparent outline-none w-full cursor-pointer"
              />
            </div>
          </div>

          {/* Check Out */}
          <div className="flex-1 min-w-[140px] flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
            <Calendar className="w-4 h-4 text-[#c9a84c] shrink-0" />
            <div className="flex-1 text-left">
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Check Out</div>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="text-[#0d1b2a] text-sm font-semibold bg-transparent outline-none w-full cursor-pointer"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex items-center gap-2 px-4 py-3 min-w-[130px]">
            <Users className="w-4 h-4 text-[#c9a84c] shrink-0" />
            <div className="text-left">
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Guests</div>
              <div className="flex items-center gap-2.5 mt-0.5">
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-5 h-5 rounded-full bg-[#f0ebe0] hover:bg-[#c9a84c] hover:text-white transition-colors flex items-center justify-center text-xs font-bold"
                >
                  −
                </button>
                <span className="text-sm font-bold text-[#0d1b2a] min-w-[12px] text-center">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests(Math.min(20, guests + 1))}
                  className="w-5 h-5 rounded-full bg-[#f0ebe0] hover:bg-[#c9a84c] hover:text-white transition-colors flex items-center justify-center text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="w-full md:w-auto bg-gradient-to-r from-[#c9a84c] to-[#e5c158] hover:brightness-105 active:scale-95 text-[#0d1b2a] px-7 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all group"
          >
            <Search className="w-4 h-4 stroke-[2.5] group-hover:rotate-12 transition-transform duration-300" />
            Search
          </button>
        </div>

        {/* Trust indicators row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/50 text-xs animate-fade-in fade-in-up-initial delay-700">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#c9a84c]" />
            Instant booking
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-[#c9a84c] fill-[#c9a84c]" />
            Verified stays
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
            WhatsApp support
          </span>
        </div>

        {/* Stats with animated counters */}
        <div ref={statsRef} className="mt-12 grid grid-cols-3 gap-8 sm:gap-16">
          {[
            { n: `${propertiesCount}+`, label: "Properties" },
            { n: "4.9★", label: "Avg Rating" },
            { n: `${guestsCount.toLocaleString()}+`, label: "Happy Guests" },
          ].map((s, i) => (
            <div key={s.label} className="text-center">
              <div
                className="text-white mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 700,
                }}
              >
                {s.n}
              </div>
              <div
                className="text-white/50 text-xs uppercase tracking-widest font-medium"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Cue */}
      <button
        type="button"
        onClick={() =>
          document.getElementById("properties")?.scrollIntoView({
            behavior: "smooth",
          })
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 flex flex-col items-center gap-1 group transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce group-hover:translate-y-0.5 transition-transform" />
      </button>
    </section>
  );
}