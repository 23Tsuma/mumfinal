import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import logoImg from "../../imports/logo.jpeg";

const FOOTER_LINKS = {
  "Stay": [
    "Mum's Backpackers",
    "Apple Mango Apartments",
    "Diani Pearl Resort",
    "Flamboyant Villa",
    "Coral Beach Resort",
    "Soul Breeze",
    "Bahari Dhow",
  ],
  "Explore": ["Map", "Gallery", "Nearby"],
  "Company": ["About Us", "Villas & Cottages"],
};

// Explicit routing mapping lookup table to reconcile display labels to precise routes
const ROUTE_MAPPD_LINKS: Record<string, string> = {
  "map": "/map",
  "gallery": "/gallery",
  "nearby": "/nearby",
  "about us": "/about-us",
  "properties": "/stay", // Pointing Properties option directly to your main stay section
};

const SOCIALS = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter/X" },
  { icon: Youtube, label: "YouTube" },
];

export function Footer() {
  // Utility handler to determine path targets programmatically 
  const getCleanHref = (heading: string, label: string): string => {
    const fallbackNormalizedKey = label.toLowerCase().trim();
    
    if (heading === "Stay") {
      return "/property/" + fallbackNormalizedKey.replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    
    return ROUTE_MAPPD_LINKS[fallbackNormalizedKey] || "/";
  };

  return (
    <footer className="relative bg-[#050a10]/95 backdrop-blur-md border-t border-white/5 text-stone-200 z-10">
      
      {/* Compressed Fine-tuned Main Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img 
                src={logoImg} 
                alt="Mum's Backpackers" 
                className="h-10 w-10 rounded-full object-cover border border-[#c9a84c]/50 shadow-md shadow-black/50" 
              />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700 }} className="text-sm tracking-wide text-white leading-tight">
                  Mum's Backpackers
                </div>
                <div className="text-[#c9a84c] font-mono text-[10px] tracking-widest uppercase">
                  Diani Beach, Kenya
                </div>
              </div>
            </div>
            
            <p className="text-stone-400 text-xs font-light leading-relaxed max-w-xs">
              The complete travel platform for Diani Beach. Handpicked villas, experiences, and local knowledge.
            </p>
            
            {/* Minimalist Social Rows */}
            <div className="flex gap-2 pt-1">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/5 hover:border-white/10 transition-all duration-200 group"
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#c9a84c] transition-colors" />
                </button>
              ))}
            </div>

            {/* Micro-formatted Contact Details */}
            <div className="space-y-1.5 pt-2 border-t border-white/5 max-w-xs">
              <a href="tel:+254734743568" className="flex items-center gap-2 text-stone-400 hover:text-[#c9a84c] text-xs transition-colors font-light">
                <Phone className="w-3 h-3 text-[#c9a84c]/70" />
                +254 734 743 568
              </a>
              <a href="mailto:info@monikasafaris.com" className="flex items-center gap-2 text-stone-400 hover:text-[#c9a84c] text-xs transition-colors font-light">
                <Mail className="w-3 h-3 text-[#c9a84c]/70" />
                info@monikasafaris.com
              </a>
              <div className="flex items-center gap-2 text-stone-400 text-xs font-light">
                <MapPin className="w-3 h-3 text-[#c9a84c]/70" />
                Diani Beach Road, Kwale, Kenya
              </div>
            </div>
          </div>

          {/* Clean Link Iterators */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="space-y-3">
              <div
                className="text-[#c9a84c] font-bold text-[10px] uppercase tracking-widest border-b border-white/5 pb-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {heading}
              </div>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to={getCleanHref(heading, link)}
                      className="text-stone-400 hover:text-white text-xs font-light transition-all duration-200 inline-block hover:translate-x-0.5"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Tiny Polished Bottom Bar */}
      <div className="border-t border-white/5 bg-black/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-stone-500 font-light">
          <span>© 2026 Mum's Backpackers · Diani Beach, Kenya. All rights reserved.</span>
          <div className="flex gap-3.5">
            <Link to="/privacy" className="hover:text-stone-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-stone-300 transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-stone-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>

      {/* Floating Micro-WhatsApp Pin */}
      <a
        href="https://wa.me/254734743568?text=Hi%20Mum's%20Backpackers!%20I%20need%20help%20planning%20my%20Diani%20trip."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 w-11 h-11 bg-[#25D366] hover:bg-[#20bc5a] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
}