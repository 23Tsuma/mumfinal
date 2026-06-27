import { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Globe, ChevronDown, Bot, Send, MessageCircle, ChevronRight, Calendar } from "lucide-react";

// --- DATA & ASSETS IMPORTS ---
import logoImg from "../../imports/logo.jpeg";

import { PROPERTIES, type Property } from "../data/properties";

// ==========================================
// 1. CONFIGURATION & HEURISTICS (MumAI)
// ==========================================
const WELCOME_MESSAGE = `Hello 👋\nI'm Diani AI Concierge, your personal Diani Beach travel assistant.\nHow can I help you today?`;

const QUICK_PROMPTS = [
  { label: "Find Accommodation", value: "Find accommodation for me" },
  { label: "Plan My Trip", value: "Plan my trip" },
  { label: "Family Vacation", value: "I need a family vacation" },
  { label: "Honeymoon Escape", value: "I want a honeymoon escape" },
];

const navLinks = [
  {
    label: "Stay",
    children: [
      "Mum's Backpackers",
      "Apple Mango Apartments",
      "Diani Pearl Resort",
      "Flamboyant Villa",
      "Coral Beach Resort",
      "Soul Breeze",
      "Bahari Dhow",
    ],
  },
  { label: "Nearby", children: null },
  { label: "Map", children: null },
  { label: "Gallery", children: null },
  { label: "About Us", children: null },
];

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "FR", label: "Français" },
  { code: "DE", label: "Deutsch" },
  { code: "SW", label: "Kiswahili" },
];

type ChatMessage = { role: "assistant" | "user"; content: string };
type RecAction = {
  label: string;
  kind: "view_property" | "whatsapp" | "check_availability";
  propertyId?: number;
  propertyName?: string;
};

function whatsappBookingUrl(text: string) {
  return `https://wa.me/254700000000?text=${encodeURIComponent(text)}`;
}

function detectIntent(message: string) {
  const m = message.toLowerCase();
  return {
    isFamily: m.includes("famil") || m.includes("kids") || m.includes("children"),
    isHoneymoon: m.includes("honeymoon") || m.includes("romantic") || m.includes("coupl"),
    isBudget: m.includes("budget") || m.includes("cheap") || m.includes("dorm") || m.includes("backpacker"),
    isGroup: m.includes("group") || m.includes("villa") || m.includes("10") || m.includes("8"),
    isThings: m.includes("what") || m.includes("things") || m.includes("do") || m.includes("activities"),
    wantsAccommodation: m.includes("accom") || m.includes("stay") || m.includes("property") || m.includes("resort")
  };
}

function pickRecommendations(message: string) {
  const { isFamily, isHoneymoon, isBudget, isGroup, isThings, wantsAccommodation } = detectIntent(message);
  let recPool: Property[] = PROPERTIES;

  if (isHoneymoon) {
    recPool = PROPERTIES.filter((p) => (p.badge ?? "").toLowerCase().includes("honeymoon") || p.tags.some((t) => t.toLowerCase().includes("couples") || t.toLowerCase().includes("ocean view")));
  } else if (isFamily) {
    recPool = PROPERTIES.filter((p) => p.guests >= 6 || p.tags.some((t) => t.toLowerCase().includes("kids") || t.toLowerCase().includes("garden")));
  } else if (isBudget) {
    recPool = [...PROPERTIES].sort((a, b) => a.price - b.price);
  } else if (isGroup) {
    recPool = PROPERTIES.filter((p) => p.guests >= 6);
  }

  if (isThings && !wantsAccommodation) {
    const top = [...PROPERTIES].sort((a, b) => b.rating - a.rating).slice(0, 3);
    return {
      intro: "Nice! While I help with your itinerary, here are great stays to match your pace:",
      recs: top,
      actions: top.map((p) => ({ label: `View ${p.name}`, kind: "view_property" as const, propertyId: p.id, propertyName: p.name })),
      fallback: false
    };
  }

  const sorted = [...recPool].sort((a, b) => isBudget ? a.price - b.price : b.rating - a.rating);
  const recs = sorted.slice(0, 3);

  return {
    intro: isHoneymoon ? "For your honeymoon escape, here are my top picks:" : isFamily ? "For a family vacation, here are the best matches:" : "Based on your request, I recommend:",
    recs,
    actions: recs.flatMap((p) => [
      { label: `View ${p.name}`, kind: "view_property" as const, propertyId: p.id, propertyName: p.name },
      { label: "Check Availability", kind: "check_availability" as const, propertyId: p.id, propertyName: p.name }
    ]),
    fallback: false
  };
}

// ==========================================
// 2. FANCY NAVBAR COMPONENT
// ==========================================
export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState("EN");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isHomePage = location.pathname === "/";

  const activeNavLabel = useMemo(() => {
    const p = location.pathname;
    if (p === "/" || p === "/stay") return "Stay";
    if (p === "/nearby") return "Nearby";
    if (p === "/map") return "Map";
    if (p === "/gallery") return "Gallery";
    if (p === "/about-us") return "About Us";
    return "";
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (path: string) => {
    navigate(path);
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const navbarBgClass = isHomePage
    ? scrolled ? "bg-[#0B151F]/90 backdrop-blur-md border-b border-white/10 shadow-2xl h-20" : "bg-transparent h-24"
    : "bg-[#0B151F]/95 backdrop-blur-md border-b border-white/10 shadow-2xl h-20";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${navbarBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
        {/* Logo Brand */}
        <button onClick={() => goto("/")} className="flex items-center gap-3 group relative focus:outline-none">
          <div className="relative">
            <div className="absolute inset-0 bg-[#c9a84c] rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <img src={logoImg} alt="Mum's Backpackers" className="h-14 w-14 rounded-full object-cover border-2 border-[#c9a84c] transform group-hover:scale-105 transition-transform duration-300 relative z-10" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-white tracking-wide transition-colors group-hover:text-[#c9a84c] font-extrabold text-xl leading-none">
              Mum's <span className="text-[#c9a84c] group-hover:text-white transition-colors">Backpackers</span>
            </div>
            <div className="text-white/50 tracking-[0.25em] uppercase font-medium mt-0.5 text-[10px] font-mono">Diani Beach, Kenya</div>
          </div>
        </button>

        {/* Desktop Tabs */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative py-2" onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpenDropdown(link.label); }} onMouseLeave={() => { timeoutRef.current = setTimeout(() => setOpenDropdown(null), 180); }}>
                <button className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition-all ${activeNavLabel === link.label ? "text-[#c9a84c]" : "text-white/80 hover:text-white"}`}>
                  <span className="relative z-10">{link.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.label ? "rotate-180 text-[#c9a84c]" : "opacity-70"}`} />
                  {activeNavLabel === link.label && <span className="absolute inset-0 bg-white/5 rounded-full border border-white/10" />}
                </button>
                {openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 bg-[#0B151F]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 min-w-[240px]">
                    {link.children.map((child) => (
                      <button key={child} onClick={() => goto("/stay")} className="block w-full text-left px-5 py-2.5 text-white/70 hover:text-[#c9a84c] hover:bg-white/5 text-sm font-medium border-l-2 border-transparent hover:border-[#c9a84c] transition-all">
                        {child}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button key={link.label} onClick={() => goto(`/${link.label.toLowerCase().replace(" ", "-")}`)} className={`px-4 py-2 rounded-full font-medium text-sm transition-all relative ${activeNavLabel === link.label ? "text-[#c9a84c]" : "text-white/80 hover:text-white"}`}>
                <span className="relative z-10">{link.label}</span>
                {activeNavLabel === link.label && <span className="absolute inset-0 bg-white/5 rounded-full border border-white/10" />}
              </button>
            )
          )}
        </div>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm px-3 py-2 rounded-full border border-white/10 bg-white/5">
            <Globe className="w-4 h-4 text-[#c9a84c]" />
            <span className="font-semibold text-xs">{currentLang}</span>
          </button>
          <a href={whatsappBookingUrl("Hi Mum's Backpackers!")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all">
            WhatsApp
          </a>
          <button onClick={() => goto("/stay")} className="bg-gradient-to-r from-[#c9a84c] to-[#e5c158] text-[#0B151F] px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold shadow-lg transition-transform hover:scale-102">
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}

// ==========================================
// 3. IN-CONTAINER MUMAI WIDGET COMPONENT
// ==========================================
export function DianiAIConciergeWidget() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: WELCOME_MESSAGE }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping, open]);

  const send = (text: string) => {
    const userMsg = (text || input).trim();
    if (!userMsg) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    setTimeout(() => {
      const { intro, recs, actions } = pickRecommendations(userMsg);
      const bullets = recs.map((p) => `• ${p.name}\n  — ${p.price.toLocaleString()} KES/night`).join("\n");
      const content = `${intro}\n${bullets}\n\n[ACTIONS]` + JSON.stringify(actions);
      setMessages((prev) => [...prev, { role: "assistant", content }]);
      setIsTyping(false);
    }, 800);
  };

  const parseAssistantActions = (content: string) => {
    const marker = "\n\n[ACTIONS]";
    const idx = content.indexOf(marker);
    if (idx === -1) return { text: content, actions: [] };
    try { return { text: content.slice(0, idx), actions: JSON.parse(content.slice(idx + marker.length)) as RecAction[] }; }
    catch { return { text: content, actions: [] }; }
  };

  return (
    /* Absolute position locking inside the safe container element boundary layout frames natively */
    <div className="fixed bottom-6 right-6 z-50">

      {!open ? (
        <button onClick={() => setOpen(true)} className="group flex items-center gap-3 bg-[#0B151F] border border-[#c9a84c]/30 hover:border-[#c9a84c]/60 text-white px-4 py-3 rounded-full shadow-2xl transition-all hover:shadow-[#c9a84c]/10 hover:shadow-lg">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e5c158] flex items-center justify-center shadow-md">
            <Bot className="w-4 h-4 text-[#0B151F]" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-bold text-white leading-none">Diani Concierge</div>
            <div className="text-[9px] text-stone-500 mt-0.5">Ask me anything</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        </button>
      ) : (
        <div className="w-[350px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden">
          <div className="bg-[#0B151F] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#0B151F] font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm">Diani AI Concierge</div>
                <div className="text-[10px] text-white/60">Travel assistant</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)}>
              <X className="w-4 h-4 text-white/70 hover:text-white" />
            </button>
          </div>
          
          <div className="p-4 h-[260px] overflow-y-auto bg-[#fdf8f0] space-y-3">
            {messages.map((m, i) => {
              const parsed = parseAssistantActions(m.content);
              return (
                <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${m.role === "assistant" ? "bg-[#c9a84c]" : "bg-[#0B151F]"}`} />
                  <div className={`p-3 rounded-xl text-xs max-w-[85%] whitespace-pre-line ${m.role === "assistant" ? "bg-white border" : "bg-[#0B151F] text-white"}`}>
                    {parsed.text}
                    {parsed.actions.map((a, idx) => (
                      <button key={idx} onClick={() => { if(a.kind === "view_property") navigate(`/property/${a.propertyId}`); else window.open(whatsappBookingUrl(a.label), "_blank"); }} className="block w-full mt-2 text-left p-2 bg-[#0B151F] text-white rounded text-[11px] font-semibold">
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-white border-t flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)} placeholder="Ask your concierge..." className="flex-1 border text-xs px-3 py-2 rounded-xl bg-[#fdf8f0] text-gray-900 placeholder-gray-400 outline-none" />
            <button onClick={() => send(input)} className="bg-[#c9a84c] px-4 py-2 rounded-xl text-xs font-bold"><Send className="w-3.5 h-3.5"/></button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. MAIN APP CONTAINER ENTRY WITH HERO
// ==========================================
export default function App() {
  return (
    <div className="min-h-screen bg-[#0B151F] text-white antialiased">
      <Navbar />

      {/* Hero Outer Wrapper Frame - LOCKED RELATIVE TO CONTAIN ABSOLUTE MUMAI OVERLAY */}
      <header className="relative w-full h-[85vh] sm:h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B151F]/10 to-[#0B151F]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80" 
            alt="Diani Beach Premium View" 
            className="w-full h-full object-cover opacity-45"
          />
        </div>

        {/* Content Layout Boundary Area */}
        <div className="relative z-20 text-center max-w-4xl px-4 mt-12">
          <span className="text-[#c9a84c] font-mono tracking-[0.3em] uppercase text-xs sm:text-sm block mb-3 animate-pulse">
            Welcome to Paradise
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
            Experience Luxury Stay at <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#f3dfa2] to-[#c9a84c]">
              Mum's Backpackers
            </span>
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-lg mb-8 font-light leading-relaxed">
            Discover breathtaking boutique options, dynamic local coastal tours, and customized stay arrangements along beautiful Diani Beach, Kenya.
          </p>
        </div>

        {/* LOCKED NEATLY INSIDE THE HERO LAYOUT WITH VERTICAL POSITION BRIDGE ACCENTS */}
        <DianiAIConciergeWidget />
      </header>
    </div>
  );
}