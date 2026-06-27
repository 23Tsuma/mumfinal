import { useMemo, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BedDouble, Waves, MapPin, Star, Utensils, CheckCircle2,
  PlayCircle, Users, ArrowLeft, Heart, Share2, ChevronLeft,
  ChevronRight, X, Wifi, Car, UtensilsCrossed, TreePalm, Wind,
  Shield, Clock, Award
} from "lucide-react";
import { RotatingImage } from "../components/RotatingImage";

import mums1 from "../../imports/images/mums-2.jpg";
import mums2 from "../../imports/images/mums-3.jpg";
import mums3 from "../../imports/images/soul-bed.jpg";
import mumsBed from "../../imports/images/mums-bed.jpg";
import appleMango1 from "../../imports/images/applemango-1.jpg";
import appleMango2 from "../../imports/images/applemango-2.jpg";
import appleBed from "../../imports/images/apple-bed.jpg";
import flamboyant1 from "../../imports/images/flamboyant-1.jpg";
import flamboyant2 from "../../imports/images/flamboyant-2.jpg";
import flamboyant3 from "../../imports/images/flamboyant-3.jpg";
import flamboyant4 from "../../imports/images/flamboyant-4.jpg";
import flamBed from "../../imports/images/flam-bed.jpg";

const bahariFrontview = new URL("../../imports/bahari dhow/f rontview.JPG", import.meta.url).toString();
const bahariImg0150 = new URL("../../imports/bahari dhow/IMG_0150.JPG", import.meta.url).toString();
const bahariImg0161 = new URL("../../imports/bahari dhow/IMG_0161.JPG", import.meta.url).toString();
const bahariImg0165 = new URL("../../imports/bahari dhow/IMG_0165.JPG", import.meta.url).toString();
const bahariRoom = new URL("../../imports/bahari dhow/room.JPG", import.meta.url).toString();
const bahariWide = new URL("../../imports/bahari dhow/wide.JPG", import.meta.url).toString();

import coral1 from "../../imports/images/coral-1.jpg";
import coral2 from "../../imports/images/coral-2.jpg";
import coralBed from "../../imports/images/coral-bed.jpg";
import dianiPearl1 from "../../imports/images/dianipearl-1.jpg";
import dianiPearl2 from "../../imports/images/dianipearl-2.jpg";
import pearlBed from "../../imports/images/pearl-bed.jpg";
import enziE1 from "../../imports/Enzi/e1.jpg";
import enziFront from "../../imports/Enzi/frontview.jpg";
import enziLiving from "../../imports/Enzi/living.jpg";
import enziKitchen from "../../imports/Enzi/kitchen.jpg";
import enziBedroom from "../../imports/Enzi/bedroom.jpg";
import enziBedroom2 from "../../imports/Enzi/bedroom2.jpg";
import enziBal from "../../imports/Enzi/bal.jpg";
import enziSwimmo from "../../imports/Enzi/swimmo.jpg";
import enziSwim2 from "../../imports/Enzi/swim2.jpg";
import sasafina2 from "../../imports/images/sasafina-2.jpg";
import safinaBed from "../../imports/images/safina-bed.jpg";
import dpExterior from "../../imports/diani pearl/Exterior.webp";
import dpExteriorElevated from "../../imports/diani pearl/Exterior+elevated+2.webp";
import dpLiving from "../../imports/diani pearl/Living+room.webp";
import dpDining from "../../imports/diani pearl/dining.webp";
import dpKitchen from "../../imports/diani pearl/Kitchen.webp";
import dpBedroom from "../../imports/diani pearl/Bedroom.webp";
import dpSitting from "../../imports/diani pearl/sitting.webp";
import dpBathroom from "../../imports/diani pearl/Bathroom.webp";
import flAerial from "../../imports/flamboyant/aerial.webp";
import flBedroom from "../../imports/flamboyant/bedroom.webp";
import flSitting from "../../imports/flamboyant/sitting.webp";
import flSwimming from "../../imports/flamboyant/swimming.webp";
import flVeranda from "../../imports/flamboyant/veranda.jpg";
import flGarden from "../../imports/flamboyant/Garden-View-Flamboyant-1.jpg";
import flFlambo from "../../imports/flamboyant/flambo.jpg";

type MealPlan = "bb" | "bo";
type Season = "low" | "peak";
type RoomKey = "deluxe_double_balcony" | "standard_double" | "standard_extra_bed";

const DIANI_PEARL_RATES = {
  seasons: {
    january_4_to_march_31_2025: "04th Jan - 31st March 2025",
    april_1_to_june_30_2025: "01st April - 30th June 2025",
    july_1_to_nov_21_2025: "01st July - 21st Dec 2025",
    dec_22_2025_to_jan_3_2026: "22nd Dec - 03rd Jan 2026",
  },
  ksh: {
    "2-bedroom": {
      "04th Jan - 31st March 2025": 20000,
      "01st April - 30th June 2025": 18000,
      "01st July - 21st Dec 2025": 20000,
      "22nd Dec - 03rd Jan 2026": 40000,
    },
    "1-bedroom": {
      "04th Jan - 31st March 2025": 10000,
      "01st April - 30th June 2025": 9000,
      "01st July - 21st Dec 2025": 10000,
      "22nd Dec - 03rd Jan 2026": 20000,
    },
    studio: {
      "04th Jan - 31st March 2025": 6000,
      "01st April - 30th June 2025": 5000,
      "01st July - 21st Dec 2025": 6000,
      "22nd Dec - 03rd Jan 2026": 11000,
    },
  },
} as const;

const ENZI_ROOM_PRICES = [
  { title: "1 Bedroom Unit", price: "KSh 8,000", note: "Spacious one-bedroom luxury apartment." },
  { title: "Studio Unit", price: "KSh 5,000", note: "Cozy studio apartment option." },
  { title: "2 Bedroom Unit", price: "KSh 10,000", note: "Perfect for families or shared stays." },
  { title: "Studio Deluxe", price: "KSh 6,000", note: "Enhanced studio option with extra comfort." },
];

const ENZI_FEATURES = [
  "Stylishly furnished", "High speed internet", "Satellite TV", "Roof Top pool area",
  "Secure & Ample parking", "24/7 CCTV surveillance", "Exquisite scenery", "100% Satisfaction",
];

const ENZI_DESCRIPTION = "Our luxury apartments are light, bright and spacious. Stylishly furnished in neutral shades, the open plan living area boasts a sitting room with comfortable sofas and satellite TV, a well-equipped kitchen with a dining area as well as a workstation with phone and Wi-Fi connectivity.";

const ENZI_VIDEOS = [
  { title: "1 Bedroom Unit - KSh 8,000", src: "/src/imports/Enzi/1 bedroom unit 8k.mp4" },
  { title: "Studio Unit - KSh 5,000", src: "/src/imports/Enzi/studio unit 5k.mp4" },
  { title: "2 Bedroom Unit - KSh 10,000", src: "/src/imports/Enzi/2 bedroom unit 10k.mp4" },
  { title: "Studio - KSh 6,000", src: "/src/imports/Enzi/studio 6k.mp4" },
];

type PropertyKey = "mums" | "applemango" | "diani-pearl" | "flamboyant" | "enzi" | "coral" | "bahari" | "sasafina" | "safina";

const ROOM_RATES: Record<RoomKey, {
  title: string; sleeps: number; bedNote: string; beachAccessNote?: string;
  usd: { bb: { low: number; peak: number }; bo: { low: number; peak: number } };
  ksh: { bb: { low: number; peak: number }; bo: { low: number; peak: number } };
}> = {
  deluxe_double_balcony: {
    title: "Deluxe Double Room with Balcony", sleeps: 2, bedNote: "Sleeps 2 people in a king size bed.",
    usd: { bb: { low: 90, peak: 150 }, bo: { low: 85, peak: 145 } },
    ksh: { bb: { low: 9000, peak: 15000 }, bo: { low: 8500, peak: 14500 } },
  },
  standard_double: {
    title: "Standard Double Room", sleeps: 2, bedNote: "Sleeps 2 people in a double size bed.", beachAccessNote: "En-suite rooms with beach access",
    usd: { bb: { low: 70, peak: 120 }, bo: { low: 65, peak: 110 } },
    ksh: { bb: { low: 7000, peak: 12000 }, bo: { low: 6500, peak: 11000 } },
  },
  standard_extra_bed: {
    title: "Standard Room with an Extra Bed", sleeps: 3, bedNote: "Sleeps 3 people in a double and single bed.", beachAccessNote: "En-suite rooms with beach access",
    usd: { bb: { low: 90, peak: 150 }, bo: { low: 85, peak: 145 } },
    ksh: { bb: { low: 9000, peak: 15000 }, bo: { low: 8500, peak: 14500 } },
  },
};

function currencyLine(season: Season, mealPlan: MealPlan, room: (typeof ROOM_RATES)[RoomKey]) {
  const usd = mealPlan === "bb" ? room.usd.bb : room.usd.bo;
  const ksh = mealPlan === "bb" ? room.ksh.bb : room.ksh.bo;
  return { usd: usd[season], ksh: ksh[season] };
}

function toPropertyKey(propertyId: string | undefined): PropertyKey | null {
  if (!propertyId) return null;
  const id = String(propertyId).toLowerCase();
  const numericMap: Record<string, PropertyKey> = { "1": "mums", "2": "applemango", "3": "diani-pearl", "4": "enzi", "5": "coral", "7": "bahari" };
  if (numericMap[id]) return numericMap[id];
  if (id.includes("mums")) return "mums";
  if (id.includes("apple")) return "applemango";
  if (id.includes("pearl")) return "diani-pearl";
  if (id.includes("flam")) return "flamboyant";
  if (id.includes("enzi")) return "enzi";
  if (id.includes("coral")) return "coral";
  if (id.includes("bahari")) return "bahari";
  if (id.includes("safina") || id.includes("sasafina")) return "sasafina";
  return null;
}

function propertyImagesFor(key: PropertyKey) {
  switch (key) {
    case "mums": return [mums1, mums2, mums3, mumsBed];
    case "applemango": return [appleMango1, appleMango2, appleBed];
    case "flamboyant": return [flamboyant1, flamboyant2, flamboyant3, flamboyant4, flamBed];
    case "bahari": return [bahariImg0150, bahariImg0161, bahariImg0165, bahariRoom, bahariWide, bahariFrontview];
    case "coral": return [coral1, coral2, coralBed];
    case "diani-pearl": return [dianiPearl1, dianiPearl2, pearlBed];
    case "enzi": return [enziE1, enziFront, enziLiving, enziKitchen];
    case "sasafina": case "safina": return [sasafina2, safinaBed];
    default: return [];
  }
}

function getHeroImages(key: PropertyKey | null) {
  if (key === "diani-pearl") return [dpExterior, dpExteriorElevated, dpLiving, dpDining, dpKitchen, dpBedroom, dpSitting, dpBathroom];
  if (key === "flamboyant") return [flAerial, flBedroom, flSitting, flSwimming, flVeranda, flGarden, flFlambo];
  if (key === "enzi") return [enziE1, enziFront, enziLiving, enziKitchen, enziBedroom, enziBedroom2, enziBal, enziSwimmo, enziSwim2];
  if (key === "coral") return propertyImagesFor("coral");
  if (key) return propertyImagesFor(key);
  return [appleBed];
}

function getPropertyDescription(key: PropertyKey | null, propertyName: string) {
  switch (key) {
    case "mums": return "A premium coastal sanctuary designed for modern travellers who seek authentic charm, curated comforts, and seamless access to the vibrant spirit of Diani Beach. Wake up to ocean breezes, enjoy a private pool, and let our dedicated team take care of everything.";
    case "applemango": return "Spacious furnished apartments and villa accommodation ideal for families, group holidays, and long-stay beach escapes. With generous living spaces, a beautiful garden, and a sparkling pool, Apple Mango is your home away from home in Diani.";
    case "diani-pearl": return "A polished resort-style stay with stylish interiors, sweeping ocean views, and a rooftop pool. Diani Pearl Resort blends contemporary comfort with coastal elegance — the perfect address for those who refuse to compromise on luxury.";
    case "flamboyant": return "Set within lush tropical gardens, Flamboyant Villa offers refined luxury with elegant spaces, a private pool, and a veranda made for golden hour. Privacy, beauty, and a premium atmosphere for an unforgettable coastal getaway.";
    case "enzi": return ENZI_DESCRIPTION;
    case "coral": return "A breezy beachside escape offering a warm stay experience with comfort, simplicity, and easy access to pristine coastal relaxation. Coral Beach Resort channels authentic Swahili architecture with all modern comforts.";
    case "bahari": return "A breathtaking beachfront villa with a private infinity pool, a dedicated chef, and direct ocean access. Bahari Dhow is Diani's finest address — conceived for those who demand the extraordinary, delivered with quiet elegance.";
    case "sasafina": case "safina": return "A stylish villa-style stay with a calm setting, comfortable accommodation, and a welcoming space for family or leisure travel. The perfect retreat for those who appreciate understated elegance and coastal serenity.";
    default: return `${propertyName} offers a comfortable and memorable coastal stay with curated accommodation, convenient amenities, and easy access to Diani's beach lifestyle.`;
  }
}

function getAmenities(key: PropertyKey | null) {
  const base = [
    { icon: Wifi, label: "High-Speed WiFi" },
    { icon: Wind, label: "Air Conditioning" },
    { icon: Car, label: "Free Parking" },
    { icon: Shield, label: "24/7 Security" },
  ];
  switch (key) {
    case "mums": return [...base, { icon: Waves, label: "Infinity Pool" }, { icon: TreePalm, label: "Beach Access" }, { icon: UtensilsCrossed, label: "On-site Restaurant" }, { icon: Award, label: "Top Rated" }];
    case "bahari": return [...base, { icon: Waves, label: "Private Pool" }, { icon: TreePalm, label: "Beachfront" }, { icon: UtensilsCrossed, label: "Private Chef" }, { icon: Award, label: "Luxury Villa" }];
    case "diani-pearl": return [...base, { icon: Waves, label: "Rooftop Pool" }, { icon: TreePalm, label: "Ocean Views" }, { icon: UtensilsCrossed, label: "Full Kitchen" }, { icon: Award, label: "Luxury Stay" }];
    case "flamboyant": return [...base, { icon: Waves, label: "Private Pool" }, { icon: TreePalm, label: "Garden Views" }, { icon: UtensilsCrossed, label: "BBQ Area" }, { icon: Award, label: "Garden Villa" }];
    case "enzi": return [...base, { icon: Waves, label: "Rooftop Pool" }, { icon: UtensilsCrossed, label: "Equipped Kitchen" }, { icon: Clock, label: "Daily Housekeeping" }, { icon: Award, label: "Furnished" }];
    default: return [...base, { icon: Waves, label: "Pool Access" }, { icon: TreePalm, label: "Near Beach" }, { icon: UtensilsCrossed, label: "Kitchen" }, { icon: Clock, label: "Daily Cleaning" }];
  }
}

function getPropertyMeta(key: PropertyKey | null) {
  switch (key) {
    case "mums": return { guests: 8, beds: 4, baths: 3, rating: 4.97, reviews: 214, minStay: 1 };
    case "applemango": return { guests: 6, beds: 3, baths: 2, rating: 4.85, reviews: 631, minStay: 1 };
    case "diani-pearl": return { guests: 4, beds: 2, baths: 2, rating: 5.0, reviews: 88, minStay: 2 };
    case "flamboyant": return { guests: 8, beds: 4, baths: 4, rating: 4.88, reviews: 95, minStay: 3 };
    case "enzi": return { guests: 6, beds: 3, baths: 2, rating: 4.92, reviews: 177, minStay: 2 };
    case "coral": return { guests: 4, beds: 2, baths: 2, rating: 4.78, reviews: 302, minStay: 2 };
    case "bahari": return { guests: 10, beds: 5, baths: 5, rating: 4.99, reviews: 143, minStay: 2 };
    default: return { guests: 4, beds: 2, baths: 2, rating: 4.8, reviews: 100, minStay: 2 };
  }
}

/* =================== FULL-SCREEN GALLERY MODAL =================== */
function GalleryModal({ images, startIdx, onClose }: { images: string[]; startIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <span className="text-white/60 text-sm">{idx + 1} / {images.length}</span>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center relative px-4">
        <button onClick={prev} className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition z-10">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <img src={images[idx]} alt={`Gallery ${idx + 1}`} className="max-h-[80vh] max-w-full object-contain rounded-xl" />
        <button onClick={next} className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition z-10">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="flex gap-2 p-4 overflow-x-auto justify-center">
        {images.map((img, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition ${i === idx ? "border-[#c9a84c]" : "border-transparent opacity-50 hover:opacity-80"}`}>
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* =================== MAIN COMPONENT =================== */
export default function PropertyDetails() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [season] = useState<Season>("low");
  const [mealPlan] = useState<MealPlan>("bb");
  const [roomKey] = useState<RoomKey>("deluxe_double_balcony");
  const [saved, setSaved] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryStartIdx, setGalleryStartIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "rates" | "gallery">("overview");
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [propertyId]);

  const key = toPropertyKey(propertyId);
  const selectedRoom = ROOM_RATES[roomKey];
  const meta = getPropertyMeta(key);
  const heroImages = useMemo(() => getHeroImages(key), [key]);
  const amenities = useMemo(() => getAmenities(key), [key]);
  const propertyDescription = useMemo(() => getPropertyDescription(key, ""), [key]);

  const dianiPearlSeasonLabel = season === "low"
    ? DIANI_PEARL_RATES.seasons.january_4_to_march_31_2025
    : DIANI_PEARL_RATES.seasons.dec_22_2025_to_jan_3_2026;

  const dianiPearlDisplay = useMemo(() => {
    if (key !== "diani-pearl") return null;
    const type = roomKey === "deluxe_double_balcony" ? "2-bedroom" : roomKey === "standard_double" ? "1-bedroom" : "studio";
    const ksh = (DIANI_PEARL_RATES.ksh as any)[type][dianiPearlSeasonLabel] as number;
    return { type, priceKsh: ksh, usd: "—", dateRange: dianiPearlSeasonLabel };
  }, [key, roomKey, dianiPearlSeasonLabel]);

  const line = useMemo(() => {
    if (key === "diani-pearl" && dianiPearlDisplay) return { ksh: dianiPearlDisplay.priceKsh, usd: dianiPearlDisplay.usd };
    return currencyLine(season, mealPlan, selectedRoom);
  }, [key, dianiPearlDisplay, season, mealPlan, selectedRoom]);

  const propertyName = useMemo(() => {
    const names: Record<Exclude<PropertyKey, null>, string> = {
      mums: "Mum's Backpackers", applemango: "Apple Mango Apartments",
      "diani-pearl": "Diani Pearl Resort", flamboyant: "Flamboyant Villa",
      enzi: "Enzi Furnished Apartments", coral: "Coral Beach Resort",
      bahari: "Bahari Dhow", sasafina: "Safina Villa", safina: "Safina Villa",
    };
    if (key && names[key]) return names[key];
    return `Property ${propertyId ?? ""}`;
  }, [key, propertyId]);

  const propertyTypeLabel = useMemo(() => {
    const labels: Record<Exclude<PropertyKey, null>, string> = {
      mums: "Beachside Lodge", applemango: "Private Villa",
      "diani-pearl": "Luxury Apartments", flamboyant: "Garden Villa",
      enzi: "Furnished Suites", coral: "Coastal Cottage",
      bahari: "Beachfront Luxury Villa", sasafina: "Villa Stay", safina: "Villa Stay",
    };
    return key ? (labels[key] ?? "Coastal Stay") : "Coastal Stay";
  }, [key]);

  const handleOpenBookingModal = () => {
    const roomType = selectedRoom?.title ?? "";
    const price = `From KSh ${line.ksh.toLocaleString()} / night`;
    window.dispatchEvent(new CustomEvent("openBookingModal", { detail: { propertyName, roomType, price } }));
  };

  const openGallery = (idx = 0) => { setGalleryStartIdx(idx); setGalleryOpen(true); };

  /* Gallery grid images */
  const gridImages = heroImages.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-[#1c2735] antialiased">
      {/* ====== FLOATING TOP BAR ====== */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-emerald-100 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-stone-500 hover:text-[#1c2735] text-sm font-medium transition">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSaved(!saved)}
              className="flex items-center gap-1.5 text-stone-500 hover:text-[#1c2735] text-xs transition font-medium px-3 py-1.5 rounded-full border border-stone-200 hover:border-stone-300"
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? "fill-rose-400 text-rose-400" : ""}`} />
              Save
            </button>
            <button className="flex items-center gap-1.5 text-stone-500 hover:text-[#1c2735] text-xs transition font-medium px-3 py-1.5 rounded-full border border-stone-200 hover:border-stone-300">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* ====== PHOTO GALLERY MOSAIC ====== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[420px] sm:h-[520px]">
          {/* Main large image */}
          <div className="col-span-2 row-span-2 relative cursor-pointer group" onClick={() => openGallery(0)}>
            <img src={gridImages[0]} alt={propertyName} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
          {/* 4 smaller images */}
          {gridImages.slice(1, 5).map((img, i) => (
            <div key={i} className="relative cursor-pointer group overflow-hidden" onClick={() => openGallery(i + 1)}>
              <img src={img} alt={`${propertyName} ${i + 2}`} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              {/* Show all photos button on last thumb */}
              {i === 3 && heroImages.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-white font-bold text-sm">+{heroImages.length - 5} photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ====== MAIN LAYOUT: LEFT CONTENT + RIGHT SIDEBAR ====== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

          {/* ====== LEFT COLUMN ====== */}
          <div>
            {/* Property Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a84c]/12 border border-[#c9a84c]/30 text-[#b8922e] text-[10px] font-bold uppercase tracking-widest">
                  <Award className="w-3 h-3" />
                  {propertyTypeLabel}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-[10px] font-medium">
                  <MapPin className="w-3 h-3 text-[#c9a84c]" />
                  Diani Beach, Kenya
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-[#1c2735] tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {propertyName}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />
                  <span className="font-bold text-[#1c2735]">{meta.rating}</span>
                  <span>({meta.reviews} reviews)</span>
                </div>
                <span className="text-stone-300">·</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#c9a84c]/70" /> {meta.guests} guests</span>
                <span className="text-stone-300">·</span>
                <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-[#c9a84c]/70" /> {meta.beds} bedrooms</span>
                <span className="text-stone-300">·</span>
                <span>{meta.baths} bathrooms</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-stone-200 mb-8" />

            {/* Tabs */}
            <div className="flex gap-1 mb-8 bg-stone-100 p-1 rounded-xl border border-stone-200 w-fit">
              {(["overview", "rates", "gallery"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab
                      ? "bg-[#c9a84c] text-[#0B151F] shadow-md"
                      : "text-stone-500 hover:text-[#1c2735]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ====== TAB: OVERVIEW ====== */}
            {activeTab === "overview" && (
              <div className="space-y-10">
                {/* Description */}
                <div>
                  <h2 className="text-xl font-bold text-[#1c2735] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>About this property</h2>
                  <p className="text-stone-600 leading-relaxed text-sm">{propertyDescription}</p>
                </div>

                <div className="h-px bg-stone-200" />

                {/* Amenities */}
                <div>
                  <h2 className="text-xl font-bold text-[#1c2735] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>What's included</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {amenities.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3 bg-white border border-stone-100 rounded-xl p-3.5 hover:border-[#c9a84c]/40 hover:shadow-sm transition-all shadow-sm">
                        <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#c9a84c]" />
                        </div>
                        <span className="text-stone-600 text-xs font-medium leading-tight">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-stone-200" />

                {/* Stay details */}
                <div>
                  <h2 className="text-xl font-bold text-[#1c2735] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Stay details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Check-in", value: "From 12:00 noon", icon: Clock },
                      { label: "Check-out", value: "By 10:00 AM", icon: Clock },
                      { label: "Min. Stay", value: `${meta.minStay} night${meta.minStay > 1 ? "s" : ""}`, icon: BedDouble },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="bg-white border border-stone-100 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-4 h-4 text-[#c9a84c]" />
                          <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">{label}</span>
                        </div>
                        <p className="text-[#1c2735] font-semibold text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enzi-specific content */}
                {key === "enzi" && (
                  <>
                    <div className="h-px bg-stone-200" />
                    <div>
                      <h2 className="text-xl font-bold text-[#1c2735] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Apartment Features</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {ENZI_FEATURES.map((feature) => (
                          <div key={feature} className="flex items-center gap-3 bg-white border border-stone-100 rounded-xl p-3.5 shadow-sm">
                            <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0" />
                            <span className="text-stone-600 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ====== TAB: RATES ====== */}
            {activeTab === "rates" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#1c2735]" style={{ fontFamily: "'Playfair Display', serif" }}>Room Rates & Packages</h2>

                {key === "enzi" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ENZI_ROOM_PRICES.map((room) => (
                      <div key={room.title} className="bg-white border border-stone-100 hover:border-[#c9a84c]/40 rounded-2xl p-5 transition-all shadow-sm hover:shadow-md group">
                        <div className="text-[9px] text-[#c9a84c] font-bold uppercase tracking-widest mb-2">Apartment Type</div>
                        <h3 className="text-lg font-bold text-[#1c2735] mb-3">{room.title}</h3>
                        <div className="text-2xl font-black text-[#c9a84c] mb-2">{room.price}</div>
                        <p className="text-stone-500 text-xs">{room.note}</p>
                        <button onClick={handleOpenBookingModal} className="mt-4 w-full bg-[#c9a84c] hover:brightness-110 text-[#0B151F] font-bold py-2.5 rounded-xl text-xs tracking-wide transition">
                          Reserve Your Stay
                        </button>
                      </div>
                    ))}
                  </div>
                ) : key === "diani-pearl" ? (
                  <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-5 border-b border-stone-100">
                      <p className="text-stone-500 text-sm">All rates are per night in Kenya Shillings (KES).</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-stone-100 bg-stone-50">
                            <th className="px-5 py-3 text-[10px] text-stone-400 font-bold uppercase tracking-wider">Type</th>
                            {Object.values(DIANI_PEARL_RATES.seasons).map((s) => (
                              <th key={s} className="px-4 py-3 text-[10px] text-stone-400 font-bold uppercase tracking-wider whitespace-nowrap">{s}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                          {(["2-bedroom", "1-bedroom", "studio"] as const).map((type) => (
                            <tr key={type} className="hover:bg-stone-50 transition-colors">
                              <td className="px-5 py-4 font-semibold text-[#1c2735] text-sm capitalize">{type.replace("-", " ")}</td>
                              {Object.values(DIANI_PEARL_RATES.seasons).map((s) => (
                                <td key={s} className="px-4 py-4 text-[#c9a84c] font-bold text-sm whitespace-nowrap">
                                  KSh {(DIANI_PEARL_RATES.ksh[type] as any)[s].toLocaleString()}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : key === "applemango" ? (
                  <div className="space-y-4">
                    {[
                      { title: "2-Bedroom Apartment", price: "KSh 10,000 / night", peak: "KSh 18,000 peak", note: "Fully furnished · Family or small groups" },
                      { title: "6-Bedroom Exclusive Villa", price: "KSh 30,000 / night", peak: "KSh 55,000 peak", note: "Ultimate privacy · Large groups & retreats" },
                    ].map((room) => (
                      <div key={room.title} className="bg-white border border-stone-100 hover:border-[#c9a84c]/40 rounded-2xl p-5 transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-[#1c2735] text-base mb-1">{room.title}</h3>
                          <p className="text-stone-500 text-xs">{room.note}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[#c9a84c] font-black text-xl">{room.price}</div>
                          <div className="text-stone-400 text-xs">{room.peak}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(["deluxe_double_balcony", "standard_double", "standard_extra_bed"] as RoomKey[]).map((rk) => {
                      const r = ROOM_RATES[rk];
                      const lowRate = r.ksh.bb.low;
                      const peakRate = r.ksh.bb.peak;
                      return (
                        <div key={rk} className="bg-white border border-stone-100 hover:border-[#c9a84c]/40 rounded-2xl p-5 transition-all shadow-sm hover:shadow-md">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-bold text-[#1c2735] text-base mb-1">{r.title}</h3>
                              <p className="text-stone-500 text-xs">{r.bedNote}</p>
                              {r.beachAccessNote && <p className="text-[#c9a84c]/80 text-xs mt-1">{r.beachAccessNote}</p>}
                              <div className="flex gap-2 mt-2">
                                <span className="text-[9px] bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full text-stone-500">Sleeps {r.sleeps}</span>
                                <span className="text-[9px] bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full text-stone-500">B&B or Room Only</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-[#c9a84c] font-black text-xl">KSh {lowRate.toLocaleString()}</div>
                              <div className="text-stone-400 text-xs">Peak: KSh {peakRate.toLocaleString()}</div>
                              <button onClick={handleOpenBookingModal} className="mt-3 bg-[#c9a84c] hover:brightness-110 text-[#0B151F] font-bold px-5 py-2 rounded-xl text-xs tracking-wide transition shadow-sm">
                                Reserve Your Stay
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Enzi video tours */}
                {key === "enzi" && (
                  <div className="mt-8">
                    <h2 className="text-xl font-bold text-[#1c2735] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Video Tours</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {ENZI_VIDEOS.map((video) => (
                        <div key={video.title} className="rounded-2xl overflow-hidden border border-stone-100 bg-white shadow-sm">
                          <div className="aspect-video bg-black">
                            <video autoPlay loop muted playsInline controls className="w-full h-full object-cover" preload="metadata">
                              <source src={video.src} type="video/mp4" />
                            </video>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center gap-2 text-[#c9a84c] mb-1">
                              <PlayCircle className="w-4 h-4" />
                              <span className="text-[10px] font-bold uppercase tracking-wider">Video Tour</span>
                            </div>
                            <h3 className="font-bold text-[#1c2735] text-sm">{video.title}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ====== TAB: GALLERY ====== */}
            {activeTab === "gallery" && (
              <div>
                <h2 className="text-xl font-bold text-[#1c2735] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Property Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {heroImages.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-sm" onClick={() => openGallery(i)}>
                      <img src={img} alt={`${propertyName} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-3 py-1 rounded-full">View</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ====== RIGHT SIDEBAR ====== */}
          <div ref={sidebarRef}>
            <div className="sticky top-20">
              {/* Price card */}
              <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-lg">
                {/* Price header */}
                <div className="p-6 border-b border-stone-100 bg-gradient-to-br from-[#c9a84c]/5 to-transparent">
                  <div className="flex items-end justify-between mb-1">
                    <div>
                      <span className="text-3xl font-black text-[#1c2735]">KSh {line.ksh.toLocaleString()}</span>
                      <span className="text-stone-400 text-sm ml-2">/ night</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#c9a84c]/12 border border-[#c9a84c]/25 px-2.5 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-[#c9a84c] text-[#c9a84c]" />
                      <span className="text-[#b8922e] font-bold text-xs">{meta.rating}</span>
                    </div>
                  </div>
                  {typeof line.usd === "number" && (
                    <p className="text-stone-400 text-xs">≈ ${line.usd} USD per night</p>
                  )}
                </div>

                {/* Quick booking form */}
                <div className="p-6 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
                      <p className="text-[9px] text-stone-400 uppercase tracking-widest font-bold mb-1">Check-in</p>
                      <input type="date" className="bg-transparent text-[#1c2735] text-xs font-semibold w-full outline-none" />
                    </div>
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
                      <p className="text-[9px] text-stone-400 uppercase tracking-widest font-bold mb-1">Check-out</p>
                      <input type="date" className="bg-transparent text-[#1c2735] text-xs font-semibold w-full outline-none" />
                    </div>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
                    <p className="text-[9px] text-stone-400 uppercase tracking-widest font-bold mb-1">Guests</p>
                    <select className="bg-transparent text-[#1c2735] text-xs font-semibold w-full outline-none">
                      {Array.from({ length: meta.guests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleOpenBookingModal}
                    className="w-full bg-gradient-to-r from-[#c9a84c] to-[#e5c158] text-[#0B151F] font-black py-4 rounded-xl tracking-wide transition hover:brightness-110 hover:shadow-lg hover:shadow-[#c9a84c]/25 text-sm"
                  >
                    Reserve Your Stay
                  </button>

                  <p className="text-center text-stone-400 text-[10px]">No charge until confirmation · Free cancellation</p>
                </div>

                {/* Property highlights */}
                <div className="px-6 pb-6 space-y-2.5">
                  <div className="h-px bg-stone-100 mb-4" />
                  {[
                    { icon: Shield, text: "Verified property — safety guaranteed" },
                    { icon: Clock, text: `Minimum ${meta.minStay} night stay` },
                    { icon: CheckCircle2, text: "Instant reservation confirmation" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-xs text-stone-500">
                      <Icon className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div className="mt-4 bg-white border border-stone-100 rounded-2xl p-5 shadow-sm">
                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-3">Need help deciding?</p>
                <a
                  href={`https://wa.me/254792850349?text=Hi! I'm interested in ${encodeURIComponent(propertyName)}. Can you help me?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-[#25D366]/40 bg-[#25D366]/8 text-[#1a9e4a] hover:bg-[#25D366] hover:text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery modal */}
      {galleryOpen && <GalleryModal images={heroImages} startIdx={galleryStartIdx} onClose={() => setGalleryOpen(false)} />}
    </div>
  );
}
