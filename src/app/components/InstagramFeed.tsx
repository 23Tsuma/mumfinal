import { Instagram, Heart, MessageCircle } from "lucide-react";

const FEED = [
  {
    id: 1,
    image: "/src/imports/Enzi/frontview.jpg",
    likes: 2451,
    comments: 87,
    caption: "Premium coastal bedding setup. Crisp white premium linens matching our bright bedroom themes 🛏️✨ #DianiBeach #Bedding",
  },
  {
    id: 2,
    image: "/src/imports/Enzi/living.jpg",
    likes: 1982,
    comments: 54,
    caption: "Private luxury villa design highlighting modern Swahili elements 🏡🌴 #DianiVillas #Coast",
  },
  {
    id: 3,
    image: "/src/imports/Enzi/bedroom.jpg",
    likes: 3120,
    comments: 143,
    caption: "Traditional thatched beachfront cottages surrounded by tropical palms 🛖🥥 #CottageLife",
  },
  {
    id: 4,
    image: "/src/imports/images/mums-bed.jpg",
    likes: 4319,
    comments: 201,
    caption: "Morning view of the outdoor crystal clear villa swimming pool 🏊‍♂️☀️ #Poolside #Diani",
  },
  {
    id: 5,
    image: "/src/imports/images/applemango-1.jpg",
    likes: 2891,
    comments: 112,
    caption: "Sunlit open plan luxury villa sitting room layout designed for hosting 🛋️🍹 #InteriorDesign",
  },
  {
    id: 6,
    image: "/src/imports/images/applemango-2.jpg",
    likes: 1845,
    comments: 42,
    caption: "A view of the main villa pavilion dining table set overlooking the lush gardens 🌴🍽️ #DiningRoom",
  },
  {
    id: 7,
    image: "/src/imports/images/apple-bed.jpg",
    likes: 2190,
    comments: 78,
    caption: "Fully equipped premium kitchen containing modern self-catering gear 🍳🍍 #VillaKitchen",
  },
  {
    id: 8,
    image: "/src/imports/images/bahari-1.jpg",
    likes: 3105,
    comments: 92,
    caption: "Additional private cottage courtyard view highlighting premium beachfront stays 🌴🌊 #KenyaCoast",
  },
  {
    id: 9,
    image: "/src/imports/images/bahari-bed.jpg",
    likes: 1540,
    comments: 38,
    caption: "Sunbeds lined up right beside our cottage swimming pool area ☀️💦 #PoolVibes #Relax",
  },
  {
    id: 10,
    image: "/src/imports/images/coral-1.jpg",
    likes: 2110,
    comments: 67,
    caption: "Spacious master bedroom with direct views out to the private pool area 🛏️🌴 #LuxuryVillas",
  },
  {
    id: 11,
    image: "/src/imports/images/coral-2.jpg",
    likes: 1930,
    comments: 51,
    caption: "Bright and comfortable lounge setup inside our standard family cottages 🛋️✨ #CottageInterior",
  },
  {
    id: 12,
    image: "/src/imports/images/coral-bed.jpg",
    likes: 2680,
    comments: 84,
    caption: "Cozy custom bedding with direct garden-access doors open to the breeze 🌾🌊 #DianiStays",
  },
  {
    id: 13,
    image: "/src/imports/images/dianipearl-1.jpg",
    likes: 1420,
    comments: 29,
    caption: "Spacious ensuite bathroom arrangement attached to our primary suites 🛁🧼 #VillaLife",
  },
  {
    id: 14,
    image: "/src/imports/images/dianipearl-2.jpg",
    likes: 3410,
    comments: 115,
    caption: "Evening view of the villa exterior lit up under the clear coastal sky 🏡💫 #DianiNights",
  },
  {
    id: 15,
    image: "/src/imports/images/pearl-bed.jpg",
    likes: 2275,
    comments: 73,
    caption: "Breakfast bar setup inside our premium self-catering kitchen zone 🥞☕ #GoodMorning",
  },
  {
    id: 16,
    image: "/src/imports/images/flamboyant-1.jpg",
    likes: 4125,
    comments: 198,
    caption: "The ultimate infinity pool view looking out toward the property palm groves 🌴🏊‍♂️ #ParadiseFound",
  }
];

function formatNum(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "k" : n.toString();
}

export function InstagramFeed() {
  return (
    <section id="instagram" className="relative py-20 overflow-hidden bg-zinc-950">
      
      {/* 🖼️ KAYA BACKGROUND IMAGE CONTAINER */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/src/imports/Nearby/kaya.png')` }} 
      />
      
      {/* VIGNETTE OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: "#ffffff" }} className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Inside Our Gallery
          </h2>
          <p className="text-stone-300 mt-2 max-w-2xl mx-auto text-sm font-light leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Explore authentic images of our premium villas, traditional cottages, clear swimming pools, and spaces.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {FEED.map((post) => (
            <div key={post.id} className="group relative aspect-square bg-[#1e3a5f] rounded-xl overflow-hidden cursor-pointer shadow-lg">
              <img
                src={post.image}
                alt={post.caption}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#0d1b2a]/0 group-hover:bg-[#0d1b2a]/60 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-5 text-white">
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    <Heart className="w-5 h-5 fill-white" />
                    {formatNum(post.likes)}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    <MessageCircle className="w-5 h-5 fill-white" />
                    {formatNum(post.comments)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}