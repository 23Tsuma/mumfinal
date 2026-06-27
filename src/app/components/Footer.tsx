import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import logoImg from "../../imports/logo.jpeg";

const PROPERTY_IDS: Record<string, number> = {
  "Mum's Backpackers": 1,
  "Apple Mango Apartments": 2,
  "Diani Pearl Resort": 3,
  "Enzi Furnished Apartments": 4,
  "Coral Beach Resort": 5,
  "Flamboyant Villa": 6,
  "Bahari Dhow": 7,
};

const SOCIALS = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter/X" },
  { icon: Youtube, label: "YouTube" },
];

export function Footer() {
  const navigate = useNavigate();

  const handleHandpickedStays = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("handpicked-stays");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById("handpicked-stays");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#050a10]/98 backdrop-blur-md border-t border-white/5 text-stone-200 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Mum's Backpackers"
                className="h-11 w-11 rounded-full object-cover border border-[#c9a84c]/50 shadow-lg shadow-black/50"
              />
              <div>
                <div className="text-sm font-bold tracking-wide text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Mum's Backpackers
                </div>
                <div className="text-[#c9a84c] font-mono text-[9px] tracking-widest uppercase mt-0.5">
                  Diani Beach, Kenya
                </div>
              </div>
            </div>

            <p className="text-stone-500 text-xs font-light leading-relaxed max-w-xs">
              Diani's premier travel platform. Handpicked villas, cottages & boutique stays — curated for every kind of traveller.
            </p>

            <div className="flex gap-2">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#c9a84c]/10 flex items-center justify-center border border-white/5 hover:border-[#c9a84c]/30 transition-all duration-200 group"
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#c9a84c] transition-colors" />
                </button>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5 max-w-xs">
              <a href="tel:+254734743568" className="flex items-center gap-2.5 text-stone-500 hover:text-[#c9a84c] text-xs transition-colors font-light">
                <Phone className="w-3 h-3 text-[#c9a84c]/60 shrink-0" />
                +254 734 743 568
              </a>
              <a href="mailto:info@monikasafaris.com" className="flex items-center gap-2.5 text-stone-500 hover:text-[#c9a84c] text-xs transition-colors font-light">
                <Mail className="w-3 h-3 text-[#c9a84c]/60 shrink-0" />
                info@monikasafaris.com
              </a>
              <div className="flex items-center gap-2.5 text-stone-500 text-xs font-light">
                <MapPin className="w-3 h-3 text-[#c9a84c]/60 shrink-0" />
                Diani Beach Road, Kwale, Kenya
              </div>
            </div>
          </div>

          {/* Stay Column */}
          <div className="space-y-3">
            <div className="text-[#c9a84c] font-bold text-[9px] uppercase tracking-widest border-b border-white/5 pb-2 font-mono">
              Our Stays
            </div>
            <ul className="space-y-2">
              {Object.entries(PROPERTY_IDS).map(([name, id]) => (
                <li key={name}>
                  <Link
                    to={`/property/${id}`}
                    className="text-stone-500 hover:text-white text-xs font-light transition-all duration-200 inline-block hover:translate-x-0.5"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Column */}
          <div className="space-y-3">
            <div className="text-[#c9a84c] font-bold text-[9px] uppercase tracking-widest border-b border-white/5 pb-2 font-mono">
              Explore
            </div>
            <ul className="space-y-2">
              {[
                { label: "Map", to: "/map" },
                { label: "Gallery", to: "/gallery" },
                { label: "Nearby Attractions", to: "/nearby" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-stone-500 hover:text-white text-xs font-light transition-all duration-200 inline-block hover:translate-x-0.5">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <div className="text-[#c9a84c] font-bold text-[9px] uppercase tracking-widest border-b border-white/5 pb-2 font-mono">
              Company
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-stone-500 hover:text-white text-xs font-light transition-all duration-200 inline-block hover:translate-x-0.5">
                  About Us
                </Link>
              </li>
              <li>
                <button
                  onClick={handleHandpickedStays}
                  className="text-stone-500 hover:text-white text-xs font-light transition-all duration-200 inline-block hover:translate-x-0.5 text-left"
                >
                  Villas &amp; Cottages
                </button>
              </li>
              <li>
                <Link to="/stay" className="text-stone-500 hover:text-white text-xs font-light transition-all duration-200 inline-block hover:translate-x-0.5">
                  All Properties
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-black/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-600 font-light">
          <span>© 2026 Mum's Backpackers · Diani Beach, Kenya. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-stone-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-stone-400 transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-stone-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>

      {/* WhatsApp Pin */}
      <a
        href="https://wa.me/254734743568?text=Hi%20Mum's%20Backpackers!%20I'd%20like%20to%20enquire%20about%20a%20stay%20in%20Diani."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#25D366] hover:bg-[#20bc5a] rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/25 transition-all hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
}
