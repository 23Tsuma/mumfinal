import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import logoImg from "../../imports/logo.jpeg"; 
import { PROPERTIES } from "../data/properties";

function whatsappBookingUrl(text: string) {
  return `https://wa.me/254792850349?text=${encodeURIComponent(text)}`;
}

const otherLinks = [
  { label: "Nearby", path: "/nearby" },
  { label: "Map", path: "/map" },
  { label: "Gallery", path: "/gallery" },
  { label: "About Us", path: "/about-us" },
];

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  }, [location.pathname]);

  const goto = (path: string) => {
    navigate(path);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  };

  // Adjusts container size & layout spacing on scroll
  const wrapperClass = scrolled
    ? "pt-3 max-w-6xl"
    : "pt-5 max-w-7xl";

  // MODIFIED EFFECT: Clear transparent top layout with no border/blur that 
  // transitions beautifully to a solid, highly-opaque premium dark color pane.
  const containerBgClass = scrolled
    ? "bg-[#0B151F] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] h-20 rounded-full px-8"
    : "bg-transparent border border-transparent h-24 px-6 md:px-8";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 mx-auto w-full transition-all duration-500 ease-out ${wrapperClass}`}>
      <div className={`flex items-center justify-between h-full transition-all duration-500 ease-out ${containerBgClass}`}>
        
        {/* LOGO */}
        <button onClick={() => goto("/")} className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-[#c9a84c] rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <img
              src={logoImg}
              alt="Mum's Backpackers"
              className="h-12 w-12 rounded-full object-cover border-2 border-[#c9a84c] relative z-10"
            />
          </div>

          {/* FANCY TEXT LAYOUT */}
          <div className="text-left select-none">
            <div className="font-black text-lg sm:text-xl tracking-wide uppercase transition-all duration-300 ease-in-out transform group-hover:scale-[1.02] leading-none">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent group-hover:from-[#f3d980] group-hover:to-[#e5c158]">
                Mum's 
              </span>
              <span className="ml-1 bg-gradient-to-r from-[#e5c158] to-[#a1822a] bg-clip-text text-transparent font-light tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                Backpackers
              </span>
            </div>
          </div>
        </button>

        {/* DESKTOP NAV */}
        <div className={`hidden lg:flex items-center gap-1 border py-1.5 px-2 rounded-full transition-all duration-500 ${
          scrolled 
            ? "bg-white/[0.03] border-white/5 backdrop-blur-sm" 
            : "bg-black/20 border-white/10 backdrop-blur-md"
        }`}>
          
          {/* Stay dropdown desktop */}
          <div
            className="relative"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setOpenDropdown("Stay");
            }}
            onMouseLeave={() => {
              timeoutRef.current = setTimeout(() => setOpenDropdown(null), 180);
            }}
          >
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm text-white/80 hover:text-[#e5c158] hover:bg-white/10 transition-all duration-300">
                <span>Villas &amp; Cottages</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "Stay" ? "rotate-180 text-[#c9a84c]" : ""}`} />
            </button>

            {openDropdown === "Stay" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-[#0B151F]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 min-w-[280px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => goto("/stay")}
                  className="flex items-center justify-between w-full text-left px-5 py-3 text-white font-semibold hover:text-[#c9a84c] hover:bg-white/5 transition-all"
                >
                  <span>View All Properties</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </button>
                <div className="h-px bg-white/10 my-1" />
                <div className="max-h-60 overflow-y-auto">
                  {PROPERTIES.map((property) => (
                    <button
                      key={property.id}
                      onClick={() => goto(`/property/${property.id}`)}
                      className="block w-full text-left px-5 py-3 text-white/75 hover:text-[#c9a84c] hover:bg-white/5 text-sm font-medium border-l-2 border-transparent hover:border-[#c9a84c] transition-all"
                    >
                      {property.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* OTHER LINKS DESKTOP */}
          {otherLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => goto(link.path)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                location.pathname === link.path ? "text-[#e5c158] bg-white/10 font-semibold" : "text-white/80 hover:text-[#e5c158] hover:bg-white/10"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* RIGHT ACTIONS DESKTOP */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={whatsappBookingUrl("Hi Mum's Backpackers! I would like to make a booking.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-[#25D366]/20 bg-[#25D366]/5 text-[#25D366] hover:bg-[#25D366] hover:text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300"
          >
            WhatsApp
          </a>
          <button onClick={() => goto("/stay")} className="bg-gradient-to-r from-[#c9a84c] to-[#e5c158] text-[#0B151F] px-5 py-2 rounded-full text-xs uppercase tracking-widest font-bold shadow-md hover:brightness-105 transition-all duration-300">
            Book Now
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 text-white/80 hover:text-[#e5c158] transition-all rounded-xl border ${
            scrolled 
              ? "bg-white/5 border-white/5" 
              : "bg-black/20 border-white/10 backdrop-blur-sm"
          }`}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-28 bg-[#0B151F]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300 z-50">
          <div className="flex flex-col space-y-1">
            
            <div>
              <button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className={`flex items-center justify-between w-full text-left py-3 px-4 text-sm font-bold rounded-xl transition-all ${
                  mobileDropdownOpen || location.pathname.startsWith("/property") ? "text-[#e5c158] bg-white/5" : "text-white/80 hover:bg-white/5"
                }`}
              >
                <span>Villas &amp; Cottages</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileDropdownOpen ? "rotate-180 text-[#c9a84c]" : ""}`} />
              </button>

              {mobileDropdownOpen && (
                <div className="mt-1 ml-4 pl-2 border-l border-white/10 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => goto("/stay")}
                    className="flex items-center justify-between w-full text-left py-2.5 px-3 text-xs font-semibold text-[#c9a84c]/90 hover:text-white transition-all"
                  >
                    <span>View All Properties</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  {PROPERTIES.map((property) => (
                    <button
                      key={property.id}
                      onClick={() => goto(`/property/${property.id}`)}
                      className="block w-full text-left py-2.5 px-3 text-white/70 hover:text-[#c9a84c] text-xs transition-colors truncate"
                    >
                      {property.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {otherLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => goto(link.path)}
                className={`text-left py-3 px-4 text-sm rounded-xl font-medium transition-all ${
                  location.pathname === link.path ? "text-[#e5c158] bg-white/10 font-bold" : "text-white/80 hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="h-px bg-white/10 mx-2" />

          {/* Action Row Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <a
              href={whatsappBookingUrl("Hi Mum's Backpackers! I would like to make a booking.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border border-[#25D366]/20 bg-[#25D366]/10 text-[#25D366] py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-center"
            >
              WhatsApp
            </a>
            <button
              onClick={() => goto("/stay")}
              className="bg-gradient-to-r from-[#c9a84c] to-[#e5c158] text-[#0B151F] py-3.5 rounded-2xl text-xs uppercase tracking-widest font-extrabold text-center shadow-lg shadow-black/40"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}