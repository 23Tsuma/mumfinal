import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, Star, Users, ChevronDown, Calendar, ArrowRight, Waves } from "lucide-react";

import { PROPERTIES, type Property } from "../data/properties";
import { RotatingImage } from "./RotatingImage";

const FILTERS = ["All", "Beachfront", "Budget", "Luxury", "Family", "Couples", "Adventure"];
const SORT_OPTIONS = ["Top Rated", "Price: Low to High", "Price: High to Low", "Most Reviews"];
const PAGE_SIZE = 6;

const badgeColors: Record<string, string> = {
  "Top Rated": "bg-amber-500/20 text-amber-200 border border-amber-400/30",
  "Best Value": "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30",
  "Honeymoon Pick": "bg-rose-500/20 text-rose-200 border border-rose-400/30",
  "Family Fave": "bg-sky-500/20 text-sky-200 border border-sky-400/30",
  "Luxury Pick": "bg-[#c9a84c]/20 text-[#e5c158] border border-[#c9a84c]/30",
  "Handpicked Stay": "bg-emerald-600/20 text-emerald-200 border border-emerald-500/30",
};

const PROPERTY_ROTATING_IMAGES: Record<string, string[]> = {
  "Diani Pearl Resort": ["/src/imports/diani pearl/Exterior.webp", "/src/imports/diani pearl/Exterior+elevated+2.webp", "/src/imports/diani pearl/Living+room.webp"],
  "Enzi Furnished Apartments": ["/src/imports/Enzi/e1.jpg", "/src/imports/Enzi/frontview.jpg", "/src/imports/Enzi/swim2.jpg"],
  "Coral Beach Resort": ["/src/imports/coral beach/out.jpg", "/src/imports/coral beach/sitting.jpg"],
  "Apple Mango Apartments": ["/src/imports/Apple Mango/aerial.jpg", "/src/imports/Apple Mango/swimmo.jpg"],
  "Bahari Dhow": ["/src/imports/bahari dhow/frontview.JPG", "/src/imports/bahari dhow/wide.JPG", "/src/imports/bahari dhow/room.JPG"],
  "Mum's Backpackers": ["/src/imports/images/mums-2.jpg", "/src/imports/images/mums-3.jpg", "/src/imports/images/mums-bed.jpg"],
};

function PropertyCard({ p, onReserve, onExplore }: { p: Property; onReserve: (p: Property) => void; onExplore: (p: Property) => void }) {
  const [saved, setSaved] = useState(false);
  const [imgError, setImgError] = useState(false);
  const rotatingImages = PROPERTY_ROTATING_IMAGES[p.name];

  return (
    <div className="group relative bg-white border border-emerald-100 rounded-2xl overflow-hidden hover:border-emerald-400/50 transition-all duration-400 hover:shadow-xl hover:shadow-emerald-200/60 flex flex-col shadow-sm">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-[#0b1219]">
        {!imgError ? (
          rotatingImages ? (
            <RotatingImage images={rotatingImages} intervalMs={6000} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={() => setImgError(true)} />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0b1219]">
            <Waves className="w-12 h-12 text-stone-700" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a28] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {p.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase backdrop-blur-sm ${badgeColors[p.badge] ?? "bg-white/10 text-white border border-white/20"}`}>
            {p.badge}
          </span>
        )}

        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors border border-white/10"
          type="button"
        >
          <Heart className={`w-4 h-4 transition-colors ${saved ? "fill-rose-400 text-rose-400" : "text-stone-400"}`} />
        </button>

        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          {p.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[8px] uppercase font-medium bg-black/50 text-stone-300 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest mb-0.5">{p.type}</div>
            <h3 className="text-[#1c2735] text-base font-semibold tracking-wide group-hover:text-emerald-700 transition-colors line-clamp-1"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {p.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 shrink-0 bg-[#c9a84c]/10 border border-[#c9a84c]/20 px-2.5 py-1 rounded-lg">
            <Star className="w-3 h-3 fill-[#c9a84c] text-[#c9a84c]" />
            <span className="text-xs font-bold text-[#1c2735]">{p.rating}</span>
            <span className="text-[10px] text-stone-400">({p.reviews})</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-stone-500 text-xs">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-500/80" /> {p.location}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3 text-emerald-500/80" /> {p.guests} guests
          </span>
          <span className="text-stone-400">{p.beds} beds · {p.baths} baths</span>
        </div>

        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 flex-1">{p.description}</p>

        {/* Footer */}
        <div className="pt-3 border-t border-emerald-50 flex items-center justify-between gap-3">
          <div>
            <div className="text-[#c9a84c] font-bold text-base tracking-tight">
              KES {p.price.toLocaleString()}
            </div>
            <div className="text-[10px] text-stone-400">≈ ${p.priceUSD} / night</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onExplore(p)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-stone-200 text-stone-500 hover:text-[#1c2735] hover:border-stone-300 transition-all"
              type="button"
            >
              Details
            </button>
            <button
              onClick={() => onReserve(p)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#c9a84c] to-[#e5c158] text-[#0B151F] px-4 py-1.5 rounded-lg text-xs font-bold transition-all hover:brightness-110 shadow-sm shadow-[#c9a84c]/20"
              type="button"
            >
              <Calendar className="w-3.5 h-3.5" />
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeaturedPropertiesProps {
  checkIn?: string;
  checkOut?: string;
  guestCount?: number;
  preference?: string;
  propertyType?: string;
}

export function FeaturedProperties({ checkIn, checkOut, guestCount, preference, propertyType }: FeaturedPropertiesProps = {}) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Top Rated");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ propertyName?: string }>;
      const prop = PROPERTIES.find((p) => p.name === ce.detail?.propertyName);
      if (prop) {
        window.dispatchEvent(new CustomEvent("openBookingModal", {
          detail: {
            propertyName: prop.name,
            roomType: prop.type,
            price: `KES ${prop.price.toLocaleString()} / night`,
          }
        }));
      }
    };
    window.addEventListener("openBookingModal", handler as EventListener);
    return () => window.removeEventListener("openBookingModal", handler as EventListener);
  }, []);

  const filteredAndSorted = useMemo(() => {
    const filtered = PROPERTIES.filter((p) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Beachfront") return p.tags.some(t => t.toLowerCase().includes("beach") || t.toLowerCase().includes("ocean"));
      if (activeFilter === "Budget") return p.price < 5000;
      if (activeFilter === "Luxury") return p.price > 20000;
      if (activeFilter === "Family") return p.guests >= 6;
      if (activeFilter === "Couples") return p.guests <= 2;
      if (activeFilter === "Adventure") return p.tags.some((t) => ["Diving", "Pool", "Beachfront"].includes(t));
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

  const visibleProperties = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;

  const handleReserve = (p: Property) => {
    window.dispatchEvent(new CustomEvent("openBookingModal", {
      detail: {
        propertyName: p.name,
        roomType: p.type,
        price: `KES ${p.price.toLocaleString()} / night`,
      }
    }));
  };

  return (
    <section className="py-20 bg-[#f0fdf4] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-[0.3em]">Where to Stay</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-[#1c2735] tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
              Handpicked Stays in <span className="text-[#c9a84c]">Diani</span>
            </h2>
            <p className="text-stone-500 font-light mt-2 text-sm max-w-md">
              Carefully vetted accommodations for every traveller — from barefoot luxury to smart budgets.
            </p>
          </div>

          {/* Sort */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 bg-white border border-stone-200 hover:border-[#c9a84c]/40 rounded-xl px-4 py-2.5 text-xs font-medium text-stone-600 transition-all shadow-sm"
            >
              {sortBy}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
            </button>
            {showSortDropdown && (
              <div className="absolute top-[110%] right-0 w-52 bg-white border border-stone-100 rounded-xl p-1 shadow-xl z-20">
                {SORT_OPTIONS.map((o) => (
                  <button
                    key={o}
                    onClick={() => { setSortBy(o); setShowSortDropdown(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs hover:bg-emerald-50 rounded-lg transition ${sortBy === o ? "text-emerald-700 font-semibold" : "text-stone-500"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => { setActiveFilter(f); setVisibleCount(PAGE_SIZE); }}
              className={`px-4 py-1.5 rounded-full border text-xs font-medium tracking-wide transition-all ${
                activeFilter === f
                  ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-md shadow-emerald-600/25"
                  : "bg-white text-stone-500 border-stone-200 hover:border-emerald-300 hover:text-emerald-700"
              }`}
              type="button"
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProperties.map((p) => (
            <PropertyCard
              key={p.id}
              p={p}
              onReserve={handleReserve}
              onExplore={(prop) => navigate(`/property/${prop.id}`)}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-14">
          {hasMore ? (
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="group inline-flex items-center gap-2.5 border border-emerald-400/60 text-emerald-700 bg-white hover:bg-emerald-600 hover:text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-600/20 shadow-sm"
              type="button"
            >
              Load More Properties
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            filteredAndSorted.length > PAGE_SIZE && (
              <p className="text-stone-600 text-xs">All {filteredAndSorted.length} properties shown</p>
            )
          )}
        </div>

        {filteredAndSorted.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500 text-sm">No properties match this filter. Try a different category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
