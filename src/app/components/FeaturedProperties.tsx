import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Heart, MapPin, MessageCircle, Star, Users } from "lucide-react";

import { PROPERTIES, type Property } from "../data/properties";
import { RotatingImage } from "./RotatingImage";
import { useScrollReveal } from "../hooks/useScrollReveal";

type Season = "low" | "peak";
type MealPlan = "bb" | "bo";
type RoomKey = "deluxe_double_balcony" | "standard_double" | "standard_extra_bed";

type RoomRate = {
  title: string;
  sleeps: number;
  bedNote: string;
  beachAccessNote?: string;
  usd: { bb: { low: number; peak: number }; bo: { low: number; peak: number } };
  ksh: { bb: { low: number; peak: number }; bo: { low: number; peak: number } };
};

const ROOM_RATES: Record<RoomKey, RoomRate> = {
  deluxe_double_balcony: {
    title: "DELUXE DOUBLE ROOM WITH BALCONY",
    sleeps: 2,
    bedNote: "Sleeps 2 people in a king size bed.",
    usd: { bb: { low: 90, peak: 150 }, bo: { low: 85, peak: 145 } },
    ksh: { bb: { low: 9000, peak: 15000 }, bo: { low: 8500, peak: 14500 } },
  },
  standard_double: {
    title: "STANDARD DOUBLE ROOM",
    sleeps: 2,
    bedNote: "Sleeps 2 people in a double size bed.",
    beachAccessNote: "En-suite rooms with beach access",
    usd: { bb: { low: 70, peak: 120 }, bo: { low: 65, peak: 110 } },
    ksh: { bb: { low: 7000, peak: 12000 }, bo: { low: 6500, peak: 11000 } },
  },
  standard_extra_bed: {
    title: "STANDARD ROOM WITH AN EXTRA BED",
    sleeps: 3,
    bedNote: "Sleeps 3 people in a double and single bed.",
    beachAccessNote: "En-suite rooms with beach access",
    usd: { bb: { low: 90, peak: 150 }, bo: { low: 85, peak: 145 } },
    ksh: { bb: { low: 9000, peak: 15000 }, bo: { low: 8500, peak: 14500 } },
  },
};

function rateFor(season: Season, mealPlan: MealPlan, room: RoomRate): { usd: number; ksh: number } {
  const usd = mealPlan === "bb" ? room.usd.bb : room.usd.bo;
  const ksh = mealPlan === "bb" ? room.ksh.bb : room.ksh.bo;
  return {
    usd: season === "low" ? usd.low : usd.peak,
    ksh: season === "low" ? ksh.low : ksh.peak,
  };
}

const FILTERS = ["All", "Beachfront", "Budget", "Luxury", "Family", "Couples", "Adventure"];
const SORT_OPTIONS = ["Top Rated", "Price: Low to High", "Price: High to Low", "Most Reviews"];

const badgeColors: Record<string, string> = {
  "Top Rated": "bg-teal-600 text-white",
  "Best Value": "bg-cyan-600 text-white",
  "Honeymoon Pick": "bg-sky-500 text-white",
  "Family Fave": "bg-indigo-600 text-white",
  "Luxury Pick": "bg-slate-800 text-white",
};

const PROPERTY_ROTATING_IMAGES: Record<string, string[]> = {
  "Diani Pearl Resort": ["/src/imports/diani pearl/Exterior.webp", "/src/imports/diani pearl/Exterior+elevated+2.webp"],

  "Enzi Furnished Apartments": ["/src/imports/Enzi/e1.jpg", "/src/imports/Enzi/frontview.jpg"],
  "Coral Beach Resort": ["/src/imports/coral beach/out.jpg", "/src/imports/coral beach/sitting.jpg"],
  "Apple Mango Apartments": ["/src/imports/Apple Mango/aerial.jpg", "/src/imports/Apple Mango/swimmo.jpg"],
  "Bahari Dhow": ["/src/imports/bahari dhow/frontview.JPG", "/src/imports/bahari dhow/wide.JPG", "/src/imports/bahari dhow/room.JPG"],
};

function PropertyCard({
  p,
  onBook,
  onExplore,
}: {
  p: Property;
  onBook: (p: Property) => void;
  onExplore: (p: Property) => void;
}) {
  const [saved, setSaved] = useState(false);
  const [imgError, setImgError] = useState(false);
  const rotatingImages = PROPERTY_ROTATING_IMAGES[p.name];

  return (
    <div className="group bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-cyan-100/60 flex flex-col justify-between">
      <div>
        <div className="relative h-52 bg-[#0E4A47]/10 overflow-hidden">
          {!imgError ? (
            rotatingImages ? (
              <RotatingImage images={rotatingImages} intervalMs={7000} alt={p.name} className="w-full h-full object-cover" />
            ) : (
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={() => setImgError(true)} />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🏖️</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent" />

          {p.badge && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase ${badgeColors[p.badge] ?? "bg-white text-slate-800"}`}>
              {p.badge}
            </span>
          )}

          <button onClick={() => setSaved(!saved)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center hover:bg-white transition-colors" type="button">
            <Heart className={`w-4 h-4 ${saved ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
          </button>

          <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
            {p.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-[9px] uppercase font-medium bg-white/20 text-white backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] text-cyan-600 font-bold uppercase tracking-widest block font-mono">
                {p.type}
              </span>
              <h3 className="text-slate-800 text-base font-serif tracking-wide mt-0.5 line-clamp-1">
                {p.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 shrink-0 bg-cyan-50 border border-cyan-100/60 px-2 py-1 rounded-lg text-xs font-bold text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{p.rating}</span>
              <span className="text-[10px] text-slate-400 font-normal">({p.reviews})</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-500 text-xs font-light">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-500" /> {p.location}</span>
            <span className="text-cyan-200">•</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3 text-cyan-500" /> {p.guests} guests</span>
            <span className="text-cyan-200">•</span>
            <span>{p.beds} beds</span>
          </div>

          <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-2">{p.description}</p>
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-cyan-50 flex items-center justify-between gap-2">
          <div>
            <div className="text-[#0E4A47] font-semibold text-base tracking-tight">
              KES {p.price.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 font-light">≈ ${p.priceUSD} / night</div>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => onExplore(p)} className="px-2.5 py-1.5 rounded-xl text-xs font-medium border border-cyan-100 text-slate-600 hover:text-[#0E4A47] hover:bg-cyan-50/30 transition-all bg-white/50" type="button">
              Details
            </button>
            <a href={`https://wa.me/254700000000?text=Hi!%20I'd%20like%20to%20book%20${encodeURIComponent(p.name)}.`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-xl border border-emerald-200 text-emerald-500 hover:bg-emerald-50 transition-colors bg-white/50">
              <MessageCircle className="w-4 h-4" />
            </a>
            <button onClick={() => onBook(p)} className="bg-[#0E4A47] hover:bg-[#093533] text-white px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1" type="button">
              <Calendar className="w-3.5 h-3.5" />
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BookingModalProps {
  property: Property;
  onClose: () => void;
  handleConfirmBook: () => void;
  booked: boolean;
}

function BookingModal({ property, onClose, handleConfirmBook, booked }: BookingModalProps) {
  const [bookingStep, setBookingStep] = useState<"details" | "payment">("details");
  const [payMethod, setPayMethod] = useState<"mpesa" | "card">("mpesa");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [season, setSeason] = useState<Season>("low");
  const [mealPlan, setMealPlan] = useState<MealPlan>("bb");
  const [roomKey, setRoomKey] = useState<RoomKey>("deluxe_double_balcony");

  const computedFinancials = useMemo(() => {
    const selectedRate = rateFor(season, mealPlan, ROOM_RATES[roomKey]);
    const nights = 3;
    const total = selectedRate.ksh * nights;
    return {
      rate: selectedRate.ksh,
      total,
      deposit: Math.round(total * 0.3),
      nights,
    };
  }, [season, mealPlan, roomKey]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-white/60">
        {booked ? (
          <div className="p-12 text-center space-y-3">
            <div className="text-5xl animate-bounce">❄️</div>
            <h3 className="font-serif text-xl font-bold text-[#0E4A47]">Booking Confirmed!</h3>
            <p className="text-slate-500 text-xs font-light">You will receive reservation verification on WhatsApp shortly.</p>
          </div>
        ) : (
          <>
            <div className="relative h-32">
              <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#093533]" />
              <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/20 text-white text-xs flex items-center justify-center hover:bg-black/40" type="button">✕</button>
              <div className="absolute bottom-3 left-4 text-white">
                <div className="text-[10px] text-teal-200/80 uppercase font-mono tracking-widest">{property.type}</div>
                <div className="font-serif text-base tracking-wide">{property.name}</div>
              </div>
            </div>

            <div className="p-5">
              {bookingStep === "details" ? (
                <div className="space-y-4">
                  <h4 className="font-serif text-sm font-bold text-[#0E4A47] uppercase tracking-wider border-b border-cyan-50 pb-1.5">Stay Configuration</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-light">Check-in</span>
                      <input type="date" className="border border-cyan-100 rounded-lg px-2 py-1 text-slate-700 bg-white outline-none" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-light">Check-out</span>
                      <input type="date" className="border border-cyan-100 rounded-lg px-2 py-1 text-slate-700 bg-white outline-none" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-light">Season</span>
                      <select className="border border-cyan-100 rounded-lg px-2 py-1 text-slate-700 bg-white outline-none" value={season} onChange={(e) => setSeason(e.target.value as Season)}>
                        <option value="low">Low Season</option>
                        <option value="peak">Peak Season</option>
                      </select>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-light">Meal Arrangement</span>
                      <select className="border border-cyan-100 rounded-lg px-2 py-1 text-slate-700 bg-white outline-none w-36 text-ellipsis" value={mealPlan} onChange={(e) => setMealPlan(e.target.value as MealPlan)}>
                        <option value="bb">Bed & Breakfast</option>
                        <option value="bo">Bed Only</option>
                      </select>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-light">Room Class</span>
                      <select className="border border-cyan-100 rounded-lg px-2 py-1 text-slate-700 bg-white outline-none w-36 text-ellipsis" value={roomKey} onChange={(e) => setRoomKey(e.target.value as RoomKey)}>
                        <option value="deluxe_double_balcony">Deluxe Balcony</option>
                        <option value="standard_double">Standard Double</option>
                        <option value="standard_extra_bed">Standard + Extra</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-cyan-50/50 border border-cyan-100/60 rounded-xl p-3.5 space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>KES {computedFinancials.rate.toLocaleString()} × {computedFinancials.nights} nights</span>
                      <span className="font-medium">KES {computedFinancials.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Micro-deposit (30%)</span>
                      <span className="text-cyan-700 font-bold">KES {computedFinancials.deposit.toLocaleString()}</span>
                    </div>
                  </div>

                  <button onClick={() => setBookingStep("payment")} className="w-full bg-[#0E4A47] hover:bg-[#093533] text-white py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase" type="button">
                    Proceed to Payment →
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="font-serif text-xs font-bold text-[#0E4A47] uppercase tracking-wider border-b border-cyan-50 pb-1.5">
                    Securing Deposit · KES {computedFinancials.deposit.toLocaleString()}
                  </h4>
                  <div className="flex gap-2">
                    <button onClick={() => setPayMethod("mpesa")} className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${payMethod === "mpesa" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-cyan-100 text-slate-400 bg-white"}`} type="button">M-Pesa</button>
                    <button onClick={() => setPayMethod("card")} className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${payMethod === "card" ? "border-slate-800 bg-slate-50 text-slate-800" : "border-cyan-100 text-slate-400 bg-white"}`} type="button">Card</button>
                  </div>

                  {payMethod === "mpesa" ? (
                    <div className="space-y-2">
                      <input type="tel" placeholder="07XX XXX XXX" value={mpesaPhone} onChange={(e) => setMpesaPhone(e.target.value)} className="w-full border border-cyan-100 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none bg-white" />
                      <div className="bg-emerald-50/50 border border-emerald-100 text-[10px] text-emerald-800 p-2.5 rounded-lg leading-relaxed">
                        An M-Pesa STK push notification will instantly launch on your screen.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input placeholder="Card Account Number" className="w-full border border-cyan-100 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none bg-white" />
                      <div className="flex gap-2">
                        <input placeholder="MM/YY" className="flex-1 border border-cyan-100 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none bg-white" />
                        <input placeholder="CVC" className="w-16 border border-cyan-100 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none bg-white" />
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button onClick={handleConfirmBook} className="w-full bg-[#0E4A47] hover:bg-[#093533] text-white py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase" type="button">
                      {payMethod === "mpesa" ? "Initialize STK Prompt" : "Authorize Deposit"} ✓
                    </button>
                    <button onClick={() => setBookingStep("details")} className="w-full mt-1.5 text-slate-400 text-[11px] font-medium hover:text-slate-600 transition-colors py-1" type="button">
                      ← Modify Selections
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function FeaturedProperties() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Top Rated");
  const [bookingModal, setBookingModal] = useState<Property | null>(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ propertyName?: string }>;
      const prop = PROPERTIES.find((p) => p.name === ce.detail?.propertyName);
      if (prop) {
        setBookingModal(prop);
        setBooked(false);
      }
    };
    window.addEventListener("openBookingModal", handler as EventListener);
    return () => window.removeEventListener("openBookingModal", handler as EventListener);
  }, []);

  const filteredAndSorted = useMemo(() => {
    const filtered = PROPERTIES.filter((p) => {
      if (activeFilter === "All" || activeFilter === "Beachfront") return true;
      if (activeFilter === "Budget") return p.price < 5000;
      if (activeFilter === "Luxury") return p.price > 20000;
      if (activeFilter === "Family") return p.guests >= 6;
      if (activeFilter === "Couples") return p.guests <= 2;
      if (activeFilter === "Adventure") return p.tags.some((t) => ["Diving", "Pool"].includes(t));
      return true;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "Top Rated") return b.rating - a.rating;
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Most Reviews") return b.reviews - a.reviews;
      return 0;
    });
  }, [activeFilter, sortBy]);

  const handleConfirmBook = () => {
    setBooked(true);
    setTimeout(() => {
      setBookingModal(null);
      setBooked(false);
    }, 2500);
  };

  return (
    <section id="properties" className="py-20 bg-linear-to-b from-[#e3f4f7] via-[#f0f7f9] to-[#ffffff] relative overflow-hidden">
      <div className="absolute top-12 right-[-5%] w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-[-5%] w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-cyan-100/60 pb-6">
          <div>
            <span className="text-cyan-600 text-xs font-bold uppercase tracking-[0.2em] block mb-1 font-mono">Where to Stay</span>
            <h2 className="text-3xl font-serif text-[#0E4A47] tracking-wide">Handpicked Stays in Diani</h2>
            <p className="text-slate-500 font-light mt-1 text-sm max-w-md">Vetted accommodations for every traveler type.</p>
          </div>

          <div className="relative">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white/80 border border-cyan-100 rounded-xl px-4 py-2 text-xs font-medium text-slate-700 outline-none cursor-pointer appearance-none pr-10 shadow-xs hover:border-[#0E4A47]">
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400 text-xs">▼</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-1.5 rounded-full border text-xs font-medium tracking-wide transition-all ${activeFilter === f ? "bg-[#0E4A47] text-white border-[#0E4A47]" : "bg-white/60 text-slate-600 border-cyan-100/60 hover:border-[#0E4A47]"}`} type="button">
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map((p) => (
            <PropertyCard key={p.id} p={p} onBook={setBookingModal} onExplore={(prop) => navigate(`/property/${prop.id}`)} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border border-[#0E4A47] text-[#0E4A47] hover:bg-[#0E4A47] hover:text-white px-8 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all bg-white/40 shadow-xs" type="button">
            View More Properties →
          </button>
        </div>
      </div>

      {bookingModal && (
        <BookingModal property={bookingModal} onClose={() => setBookingModal(null)} handleConfirmBook={handleConfirmBook} booked={booked} />
      )}
    </section>
  );
}