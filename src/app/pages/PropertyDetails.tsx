import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BedDouble,
  Waves,
  MapPin,
  Star,
  Utensils,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";
import { RotatingImage } from "../components/RotatingImage";

// NOTE: Image assets must be imported to get correct runtime URLs in Vite.
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

// Bahari Dhow (folder name contains a space; avoid TS/Vite import resolution issues)
const bahariFrontview = new URL(
  "../../imports/bahari dhow/f rontview.JPG",
  import.meta.url
).toString();
const bahariImg0150 = new URL(
  "../../imports/bahari dhow/IMG_0150.JPG",
  import.meta.url
).toString();
const bahariImg0161 = new URL(
  "../../imports/bahari dhow/IMG_0161.JPG",
  import.meta.url
).toString();
const bahariImg0165 = new URL(
  "../../imports/bahari dhow/IMG_0165.JPG",
  import.meta.url
).toString();

const bahariRoom = new URL(
  "../../imports/bahari dhow/room.JPG",
  import.meta.url
).toString();
const bahariWide = new URL(
  "../../imports/bahari dhow/wide.JPG",
  import.meta.url
).toString();






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

// Diani Pearl hero
import dpExterior from "../../imports/diani pearl/Exterior.webp";
import dpExteriorElevated from "../../imports/diani pearl/Exterior+elevated+2.webp";
import dpLiving from "../../imports/diani pearl/Living+room.webp";
import dpDining from "../../imports/diani pearl/dining.webp";
import dpKitchen from "../../imports/diani pearl/Kitchen.webp";
import dpBedroom from "../../imports/diani pearl/Bedroom.webp";
import dpSitting from "../../imports/diani pearl/sitting.webp";
import dpBathroom from "../../imports/diani pearl/Bathroom.webp";

// Flamboyant hero (note mixed .jpg/.webp filenames)
import flAerial from "../../imports/flamboyant/aerial.webp";
import flBedroom from "../../imports/flamboyant/bedroom.webp";
import flSitting from "../../imports/flamboyant/sitting.webp";
import flSwimming from "../../imports/flamboyant/swimming.webp";
import flVeranda from "../../imports/flamboyant/veranda.jpg";
import flGarden from "../../imports/flamboyant/Garden-View-Flamboyant-1.jpg";
import flFlambo from "../../imports/flamboyant/flambo.jpg";

type MealPlan = "bb" | "bo";
type Season = "low" | "peak";
type RoomKey =
  | "deluxe_double_balcony"
  | "standard_double"
  | "standard_extra_bed";

// -----------------------------
// DIANI PEARL RATES
// -----------------------------
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
    "3rd pax": {
      "04th Jan - 31st March 2025": 4000,
      "01st April - 30th June 2025": 3000,
      "01st July - 21st Dec 2025": 4000,
      "22nd Dec - 03rd Jan 2026": 5500,
    },
    chef_on_request: {
      "04th Jan - 31st March 2025": 2500,
      "01st April - 30th June 2025": 2500,
      "01st July - 21st Dec 2025": 2500,
      "22nd Dec - 03rd Jan 2026": 3000,
    },
  },
  longTerm: {
    "2-bedroom": 170000,
    "1-bedroom": 110000,
    studio: 80000,
  },
  timings: {
    checkIn: "12 noon",
    checkOut: "10 AM",
    extensionPerHour: 1500,
  },
  ratesInclude: [
    "Accommodation",
    "Daily Housekeeping Services",
    "Linen",
    "Electricity",
    "Cooking Gas",
    "Free Wi-Fi",
    "Access To Two Swimming Pools",
    "Parking",
  ],
} as const;

// -----------------------------
// ENZI DATA
// -----------------------------
const ENZI_ROOM_PRICES = [
  {
    title: "1 Bedroom Unit",
    price: "KSh 8,000",
    note: "Spacious one-bedroom luxury apartment.",
  },
  {
    title: "Studio Unit",
    price: "KSh 5,000",
    note: "Cozy studio apartment option.",
  },
  {
    title: "2 Bedroom Unit",
    price: "KSh 10,000",
    note: "Perfect for families or shared stays.",
  },
  {
    title: "Studio Deluxe",
    price: "KSh 6,000",
    note: "Enhanced studio option with extra comfort.",
  },
];

const ENZI_FEATURES = [
  "Stylishly furnished",
  "High speed internet",
  "Satellite TV",
  "Roof Top pool area",
  "Secure & Ample parking",
  "24/7 CCTV surveillance",
  "Exquisite scenery",
  "100% Satisfaction",
];

const ENZI_DESCRIPTION =
  "Our luxury apartments are light, bright and spacious. Stylishly furnished in neutral shades, the open plan living area boasts a sitting room with comfortable sofas and satellite TV, a well-equipped kitchen with a dining area as well as a workstation with phone and Wi-Fi connectivity.";

const ENZI_VIDEOS = [
  {
    title: "1 Bedroom Unit - KSh 8,000",
    src: "/src/imports/Enzi/1 bedroom unit 8k.mp4",
  },
  {
    title: "Studio Unit - KSh 5,000",
    src: "/src/imports/Enzi/studio unit 5k.mp4",
  },
  {
    title: "2 Bedroom Unit - KSh 10,000",
    src: "/src/imports/Enzi/2 bedroom unit 10k.mp4",
  },
  {
    title: "Studio - KSh 6,000",
    src: "/src/imports/Enzi/studio 6k.mp4",
  },
];

// -----------------------------
// GENERIC ROOM RATE CONFIG
// -----------------------------
type PropertyKey =
  | "mums"
  | "applemango"
  | "diani-pearl"
  | "flamboyant"
  | "enzi"
  | "coral"
  | "bahari"
  | "sasafina"
  | "safina";

const ROOM_RATES: Record<
  RoomKey,
  {
    title: string;
    sleeps: number;
    bedNote: string;
    beachAccessNote?: string;
    usd: {
      bb: { low: number; peak: number };
      bo: { low: number; peak: number };
    };
    ksh: {
      bb: { low: number; peak: number };
      bo: { low: number; peak: number };
    };
  }
> = {
  deluxe_double_balcony: {
    title: "Deluxe Double Room with Balcony",
    sleeps: 2,
    bedNote: "Sleeps 2 people in a king size bed.",
    usd: {
      bb: { low: 90, peak: 150 },
      bo: { low: 85, peak: 145 },
    },
    ksh: {
      bb: { low: 9000, peak: 15000 },
      bo: { low: 8500, peak: 14500 },
    },
  },
  standard_double: {
    title: "Standard Double Room",
    sleeps: 2,
    bedNote: "Sleeps 2 people in a double size bed.",
    beachAccessNote: "En-suite rooms with beach access",
    usd: {
      bb: { low: 70, peak: 120 },
      bo: { low: 65, peak: 110 },
    },
    ksh: {
      bb: { low: 7000, peak: 12000 },
      bo: { low: 6500, peak: 11000 },
    },
  },
  standard_extra_bed: {
    title: "Standard Room with an Extra Bed",
    sleeps: 3,
    bedNote: "Sleeps 3 people in a double and single bed.",
    beachAccessNote: "En-suite rooms with beach access",
    usd: {
      bb: { low: 90, peak: 150 },
      bo: { low: 85, peak: 145 },
    },
    ksh: {
      bb: { low: 9000, peak: 15000 },
      bo: { low: 8500, peak: 14500 },
    },
  },
};

function currencyLine(
  season: Season,
  mealPlan: MealPlan,
  room: (typeof ROOM_RATES)[RoomKey]
) {
  const usd = mealPlan === "bb" ? room.usd.bb : room.usd.bo;
  const ksh = mealPlan === "bb" ? room.ksh.bb : room.ksh.bo;
  return {
    usd: usd[season],
    ksh: ksh[season],
  };
}

function toPropertyKey(propertyId: string | undefined): PropertyKey | null {
  if (!propertyId) return null;
  const id = String(propertyId).toLowerCase();

  const numericMap: Record<string, PropertyKey> = {
    "1": "mums",
    "2": "applemango",
    "3": "diani-pearl",
    "4": "enzi",
    "5": "coral",
    "7": "bahari",
  };

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
    case "mums":
      return [mums1, mums2, mums3, mumsBed];
    case "applemango":
      return [appleMango1, appleMango2, appleBed];
    case "flamboyant":
      return [flamboyant1, flamboyant2, flamboyant3, flamboyant4, flamBed];
    case "bahari":
      return [bahariFrontview, bahariImg0150, bahariImg0161, bahariImg0165, bahariRoom, bahariWide];

    case "coral":
      return [coral1, coral2, coralBed];
    case "diani-pearl":
      return [dianiPearl1, dianiPearl2, pearlBed];
    case "enzi":
      return [enziE1, enziFront, enziLiving, enziKitchen];
    case "sasafina":
    case "safina":
      return [sasafina2, safinaBed];
    default:
      return [];
  }
}



function getPropertyDescription(key: PropertyKey | null, propertyName: string) {
  switch (key) {
    case "mums":
      return "A premium coastal sanctuary designed for modern travelers who seek authentic charm, premium comforts, and seamless access to the beautiful vibes of Diani.";
    case "applemango":
      return "Spacious furnished apartments and villa accommodation ideal for families, group holidays, and long-stay beach escapes in Diani.";
    case "diani-pearl":
      return "A polished resort-style stay with stylish interiors, calm ambiance, and convenient access to Diani’s coastline and attractions.";
    case "flamboyant":
      return "A refined villa experience with elegant spaces, privacy, lush surroundings, and a premium atmosphere for memorable coastal getaways.";
    case "enzi":
      return "";
    case "coral":
      return "A breezy beachside escape offering a warm stay experience with comfort, simplicity, and easy access to coastal relaxation.";
    case "bahari":
      return "A peaceful stay curated for guests seeking a serene environment, beautiful coastal surroundings, and a cozy holiday base.";
    case "sasafina":
    case "safina":
      return "A stylish villa-style stay with a calm setting, comfortable accommodation, and a welcoming space for family or leisure travel.";
    default:
      return `${propertyName} offers a comfortable and memorable coastal stay with curated accommodation, convenient amenities, and easy access to Diani’s beach lifestyle.`;
  }
}

function getHeroImages(key: PropertyKey | null) {
  if (key === "diani-pearl") {
    return [
      dpExterior,
      dpExteriorElevated,
      dpLiving,
      dpDining,
      dpKitchen,
      dpBedroom,
      dpSitting,
      dpBathroom,
    ];
  }

  if (key === "flamboyant") {
    return [
      flAerial,
      flBedroom,
      flSitting,
      flSwimming,
      flVeranda,
      flGarden,
      flFlambo,
    ];
  }

  if (key === "enzi") {
    return [
      enziE1,
      enziFront,
      enziLiving,
      enziKitchen,
      enziBedroom,
      enziBedroom2,
      enziBal,
      enziSwimmo,
      enziSwim2,
    ];
  }

  // Coral hero images from the dedicated folder (mixed names)
  if (key === "coral") {
    // These were previously hardcoded as /src/imports/... paths.
    // Importing them would require additional import declarations.
    // For now, fall back to the generic property images to ensure they display.
    return propertyImagesFor("coral");
  }

  if (key) return propertyImagesFor(key);
  return [appleBed];
}


function HeroStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-3 text-white">
      <div className="text-[#f4d98c]">{icon}</div>
      <div>
        <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
          {label}
        </p>
        <p className="text-xs font-bold">{value}</p>
      </div>
    </div>
  );
}

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const [season] = useState<Season>("low");
  const [mealPlan] = useState<MealPlan>("bb");
  const [roomKey] = useState<RoomKey>("deluxe_double_balcony");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [propertyId]);

  const key = toPropertyKey(propertyId);
  const selectedRoom = ROOM_RATES[roomKey];

  const dianiPearlSeasonLabel =
    season === "low"
      ? DIANI_PEARL_RATES.seasons.january_4_to_march_31_2025
      : DIANI_PEARL_RATES.seasons.dec_22_2025_to_jan_3_2026;

  const dianiPearlDisplay = useMemo(() => {
    if (key !== "diani-pearl") return null;

    const type =
      roomKey === "deluxe_double_balcony"
        ? "2-bedroom"
        : roomKey === "standard_double"
        ? "1-bedroom"
        : "studio";

    const ksh = (DIANI_PEARL_RATES.ksh as any)[type][dianiPearlSeasonLabel] as number;

    return {
      type,
      priceKsh: ksh,
      usd: "—",
      dateRange: dianiPearlSeasonLabel,
    };
  }, [key, roomKey, dianiPearlSeasonLabel]);

  const line = useMemo(() => {
    if (key === "diani-pearl" || dianiPearlDisplay) {
      return {
        ksh:
          dianiPearlDisplay?.priceKsh ??
          currencyLine(season, mealPlan, selectedRoom).ksh,
        usd:
          dianiPearlDisplay?.usd ??
          currencyLine(season, mealPlan, selectedRoom).usd,
      };
    }
    return currencyLine(season, mealPlan, selectedRoom);
  }, [key, dianiPearlDisplay, season, mealPlan, selectedRoom]);

  const propertyName = useMemo(() => {
    const names: Record<Exclude<PropertyKey, null>, string> = {
      mums: "Mum's Backpackers",
      applemango: "Apple Mango Apartments",
      "diani-pearl": "Diani Pearl Resort",
      flamboyant: "Flamboyant Villa",
      enzi: "Enzi Furnished Apartments",
      coral: "Coral Beach Resort",
      bahari: "Bahari Dhow",
      sasafina: "Safina Villa",
      safina: "Safina Villa",
    };
    if (key && names[key]) return names[key];
    return `Property ${propertyId ?? ""}`;
  }, [key, propertyId]);

  const heroImages = useMemo(() => getHeroImages(key), [key]);
  const propertyDescription = useMemo(
    () => getPropertyDescription(key, propertyName),
    [key, propertyName]
  );

  const handleOpenBookingModal = () => {
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });

    const roomType = selectedRoom?.title ?? "";
    const price = `From KSh ${line.ksh.toLocaleString()} / night`;

    const event = new CustomEvent("openBookingModal", {
      detail: { propertyName, roomType, price },
    });
    window.dispatchEvent(event);
  };

  const heroThumbs = heroImages.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f8f4ec] text-[#0B151F] antialiased">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <RotatingImage
            images={heroImages}
            intervalMs={7000}
            alt={`${propertyName} hero`}
            className="h-[72vh] min-h-[540px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#081018]/50 via-[#081018]/40 to-[#081018]/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-12 sm:pb-16 min-h-[72vh] flex flex-col justify-end">
          <div
            className={`grid gap-10 items-end mt-12 ${
              key === "diani-pearl" || key === "enzi" || key === "applemango"
                ? "grid-cols-1"
                : "grid-cols-1 lg:grid-cols-[1.3fr_420px]"
            }`}
          >
            <div className="max-w-3xl">
              <div className="inline-flex flex-wrap items-center gap-2 mb-4">
                <span className="rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#f4d98c] backdrop-blur-sm">
                  {key === "mums"
                    ? "Luxury Co-Living Concept"
                    : key === "enzi"
                    ? "Luxury Furnished Apartments"
                    : "Diani Coastal Stay"}
                </span>

                {key !== "diani-pearl" && key !== "enzi" ? (
                  <span className="rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
                    From KSh {line.ksh.toLocaleString()} / night
                  </span>
                ) : null}
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                {propertyName}
              </h1>

              {propertyDescription ? (
                <p className="mt-4 text-white/80 text-sm sm:text-base leading-relaxed">
                  {propertyDescription}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleOpenBookingModal}
                  className="rounded-full bg-[#c9a84c] px-6 py-2.5 text-sm font-bold text-[#0B151F] shadow-lg hover:translate-y-[-1px] transition"
                  type="button"
                >
                  Reserve Now
                </button>

                <button
                  onClick={handleOpenBookingModal}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-md hover:bg-white/15 transition"
                  type="button"
                >
                  Book This Property
                </button>

                <button
                  onClick={handleOpenBookingModal}
                  className="inline-flex items-center justify-center rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/10 px-6 py-2.5 text-sm font-bold text-[#c9a84c] backdrop-blur-md hover:bg-[#c9a84c]/15 transition"
                  type="button"
                >
                  Reserve Your Stay
                </button>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <HeroStat
                  icon={<BedDouble className="w-4 h-4" />}
                  label="Accommodation"
                  value={key === "enzi" ? "Luxury Units" : "Flexible Rooms"}
                />
                <HeroStat
                  icon={<Waves className="w-4 h-4" />}
                  label="Experience"
                  value={key === "enzi" ? "Rooftop Pool" : "Beach Access"}
                />
                <HeroStat
                  icon={<Utensils className="w-4 h-4" />}
                  label="Comfort"
                  value={key === "enzi" ? "Stylish Interiors" : "BB / Room Only"}
                />
                <HeroStat
                  icon={<MapPin className="w-4 h-4" />}
                  label="Location"
                  value="Diani"
                />
              </div>
            </div>

            {/* RIGHT HERO CARD - hidden for Diani Pearl, Enzi and Apple Mango */}
            {key !== "diani-pearl" && key !== "enzi" && key !== "applemango" && (
              <div className="w-full lg:justify-self-end">
                <div className="rounded-[24px] border border-white/15 bg-white/15 backdrop-blur-xl p-5 shadow-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#f4d98c] font-bold">
                        Stay Context
                      </p>
                      <h3 className="text-white text-base font-black mt-0.5 line-clamp-1">
                        {selectedRoom.title}
                      </h3>
                    </div>

                    <span className="rounded-md bg-[#c9a84c] px-2 py-0.5 text-[10px] font-bold text-[#0B151F] uppercase whitespace-nowrap">
                      {season === "low" ? "Low" : "Peak"}
                    </span>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#081018]/45 border border-white/5 p-3">
                    <div className="text-2xl font-black text-white">
                      KSh {line.ksh.toLocaleString()}
                    </div>
                    <div className="text-xs text-white/60">USD {line.usd} / night</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        {/* ENZI CUSTOM SECTION */}
        {key === "enzi" && (
          <section className="mb-14 space-y-8">
            {/* Enzi Prices */}
            <div className="rounded-[28px] bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-[0.22em]">
                    Updated Room Rates
                  </p>
                  <h2 className="text-2xl md:text-3xl font-black text-[#0B151F] mt-2">
                    Enzi apartment pricing
                  </h2>
                  <p className="mt-3 text-sm md:text-base text-neutral-600 leading-relaxed max-w-4xl">
                    {ENZI_DESCRIPTION}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {ENZI_ROOM_PRICES.map((room) => (
                  <div
                    key={room.title}
                    className="rounded-[22px] border border-black/5 bg-[#faf8f3] p-5 shadow-sm"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-[#c9a84c]">
                      Apartment Type
                    </p>
                    <h3 className="mt-2 text-lg font-black text-[#0B151F]">
                      {room.title}
                    </h3>
                    <p className="mt-3 text-2xl font-black text-[#0B151F]">
                      {room.price}
                    </p>
                    <p className="mt-2 text-sm text-neutral-500">{room.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enzi Videos */}
            <div className="rounded-[28px] bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <div className="mb-6">
                <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-[0.22em]">
                  Apartment Video Tours
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-[#0B151F] mt-2">
                  Explore Enzi room categories
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ENZI_VIDEOS.map((video) => (
                  <div
                    key={video.title}
                    className="rounded-[24px] overflow-hidden border border-black/5 bg-[#faf8f3] shadow-sm"
                  >
                    <div className="aspect-video bg-black">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        className="w-full h-full object-cover"
                        preload="metadata"
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 text-[#c9a84c] mb-2">
                        <PlayCircle className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Video Tour
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-[#0B151F]">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enzi Features */}
            <div className="rounded-[28px] bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-[0.22em]">
                Apartment Features
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#0B151F] mt-2">
                What makes Enzi special
              </h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ENZI_FEATURES.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-[18px] border border-black/5 bg-[#faf8f3] p-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#c9a84c] mt-0.5 shrink-0" />
                    <span className="text-sm font-medium text-[#0B151F]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* GALLERY */}
        <section className="mb-14">
          {key === "enzi" && (
            <div className="mb-5">
              <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-[0.22em]">
                Visual Experience
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#0B151F] mt-2">
                Enzi Gallery
              </h2>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-4">
            <div className="overflow-hidden rounded-[30px] border border-black/5 bg-white shadow-sm">
              <RotatingImage
                images={heroImages}
                intervalMs={7000}
                alt={`${propertyName} gallery`}
                className="w-full h-[360px] md:h-[440px] object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {heroThumbs.map((img, i) => (
                <div
                  key={`${img}-${i}`}
                  className="overflow-hidden rounded-[22px] border border-black/5 bg-white shadow-sm"
                >
                  <img
                    src={img}
                    alt={`${propertyName} preview ${i + 1}`}
                    className="w-full h-[110px] md:h-[212px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROPERTY-SPECIFIC CONTENT */}
        {key === "applemango" ? (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-[24px] bg-white border border-black/5 p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-black text-[#0B151F]">
                    2-Bedroom Apartments
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Fully furnished layout · Ideal for family or small groups
                  </p>
                </div>
                <span className="text-lg font-black text-[#0B151F]">
                  KSh {season === "low" ? "10,000" : "18,000"} / night
                </span>
              </div>

              <div className="rounded-[24px] bg-white border border-black/5 p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-black text-[#0B151F]">
                    Exclusive 6-Bedroom Villa
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Ultimate privacy layout for larger team retreats or families
                  </p>
                </div>
                <span className="text-lg font-black text-[#0B151F]">
                  KSh {season === "low" ? "30,000" : "55,000"} / night
                </span>
              </div>
            </div>
          </section>
        ) : key === "diani-pearl" ? (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-[24px] bg-white border border-black/5 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-black text-[#0B151F]">
                      Diani Pearl Luxury Apartments Rates 2025-26
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      All night rates are in Kenya Shillings (KES).
                    </p>
                  </div>
                  <div className="rounded-xl border border-black/5 bg-[#fffaf0] px-3 py-2 text-xs font-semibold text-[#0B151F]">
                    Nightly Rates
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                      <tr className="text-xs text-neutral-500">
                        <th className="py-3 pr-4 font-bold whitespace-nowrap">
                          Apartment Type
                        </th>
                        <th className="py-3 px-2 font-bold whitespace-nowrap">
                          04th Jan - 31st March 2025
                        </th>
                        <th className="py-3 px-2 font-bold whitespace-nowrap">
                          01st April - 30th June 2025
                        </th>
                        <th className="py-3 px-2 font-bold whitespace-nowrap">
                          01st July - 21st Dec 2025
                        </th>
                        <th className="py-3 px-2 font-bold whitespace-nowrap">
                          22nd Dec - 03rd Jan 2026
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-[#0B151F]">
                      <tr>
                        <td className="py-4 pr-4 font-bold whitespace-nowrap">
                          2 Bedroom Apartment
                        </td>
                        <td className="py-4 px-2 font-bold whitespace-nowrap">
                          KSh 20,000
                        </td>
                        <td className="py-4 px-2 font-bold whitespace-nowrap">
                          KSh 18,000
                        </td>
                        <td className="py-4 px-2 font-bold whitespace-nowrap">
                          KSh 20,000
                        </td>
                        <td className="py-4 px-2 font-bold whitespace-nowrap">
                          KSh 40,000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}