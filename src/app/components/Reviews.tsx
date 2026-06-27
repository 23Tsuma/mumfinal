import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Müller",
    country: "Germany 🇩🇪",
    avatar: "SM",
    rating: 5,
    property: "Coral Cove Beach Villa",
    date: "May 2026",
    text: "Absolutely incredible. Woke up every morning to the sound of the Indian Ocean. The villa is even more beautiful in person — photos don't do it justice. The staff were so warm and attentive. Diani is now my favourite place on earth.",
    photo: "https://images.unsplash.com/photo-1629553032544-3c1477c0eac9?w=300&h=200&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "James Odhiambo",
    country: "Kenya 🇰🇪",
    avatar: "JO",
    rating: 5,
    property: "Mum's Backpackers",
    date: "April 2026",
    text: "I've stayed at hostels across East Africa and Mum's is in a different league. The social atmosphere is electric, the pool is great, and the staff are genuinely fun. Met people from 15 countries in one weekend!",
    photo: "https://images.unsplash.com/photo-1708119063168-4785d1359824?w=300&h=200&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Priya & Raj Sharma",
    country: "India 🇮🇳",
    avatar: "PR",
    rating: 5,
    property: "Palm Breeze Honeymoon Suite",
    date: "March 2026",
    text: "We chose Diani for our honeymoon and it exceeded every expectation. Ali Barbour's Cave dinner was magical. The cottage had a plunge pool and we barely left. If you're celebrating something special, this is the place.",
    photo: "https://images.unsplash.com/photo-1758117638619-42ab7021183b?w=300&h=200&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Tom & Lisa Bennett",
    country: "Australia 🇦🇺",
    avatar: "TB",
    rating: 5,
    property: "Tiki Palms Family Resort",
    date: "February 2026",
    text: "Brought the whole family — 4 kids aged 5 to 14. All of them were in heaven. Two pools, a huge garden, and a chef who cooked incredible meals every night. The Wasini Island day trip was the highlight of the whole trip.",
    photo: "https://images.unsplash.com/photo-1565848725126-1592ea54de4b?w=300&h=200&fit=crop&auto=format",
  },
  {
    id: 5,
    name: "Clara Dumont",
    country: "France 🇫🇷",
    avatar: "CD",
    rating: 5,
    property: "Sunset Dune Cottage",
    date: "January 2026",
    text: "Diani completely stole my heart. The cottage was so charming — Swahili architecture, beautiful garden, and a 3-minute walk to the most perfect beach. The AI planner on this site suggested it and was spot on!",
    photo: "https://images.unsplash.com/photo-1688496761159-e9df8bf438a8?w=300&h=200&fit=crop&auto=format",
  },
];

export function Reviews() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? REVIEWS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === REVIEWS.length - 1 ? 0 : c + 1));

  const review = REVIEWS[current];

  return (
    <section className="py-20 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-[#c9a84c] text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>
            Guest Reviews
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: "#0d1b2a" }}>
            What Our Guests Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-[#c9a84c] text-[#c9a84c]" />
            ))}
            <span className="text-[#0d1b2a] font-semibold ml-1">4.95</span>
            <span className="text-muted-foreground">· 2,400+ reviews</span>
          </div>
        </div>

        {/* Main featured review */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Photo */}
          <div className="relative rounded-2xl overflow-hidden h-80 lg:h-auto bg-[#1e3a5f]">
            <img
              src={review.photo}
              alt={review.property}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/60 via-transparent" />
            <div className="absolute bottom-4 left-4">
              <div className="text-xs text-white/70">{review.property}</div>
              <div className="text-white font-semibold">{review.date}</div>
            </div>
          </div>

          {/* Review card */}
          <div className="flex flex-col justify-between bg-white rounded-2xl p-8 shadow-lg border border-border/30">
            <div>
              <Quote className="w-10 h-10 text-[#c9a84c]/30 mb-4" />
              <p
                className="text-[#0d1b2a] leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontStyle: "italic" }}
              >
                "{review.text}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "fill-[#c9a84c] text-[#c9a84c]" : "text-gray-200"}`} />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ background: "linear-gradient(135deg, #0d1b2a, #1e3a5f)" }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[#0d1b2a] text-sm">{review.name}</div>
                  <div className="text-muted-foreground text-xs">{review.country}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border border-border hover:border-[#0d1b2a] flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full border border-border hover:border-[#0d1b2a] flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail indicators */}
        <div className="flex justify-center gap-3">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all ${
                i === current
                  ? "w-6 h-2 bg-[#c9a84c] rounded-full"
                  : "w-2 h-2 bg-border rounded-full hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
          {[
            { label: "Verified Reviews", value: "2,400+" },
            { label: "Properties Listed", value: "120+" },
            { label: "Average Rating", value: "4.95/5" },
            { label: "Countries Served", value: "47" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow border border-border/30">
              <div
                className="text-[#0d1b2a] mb-1"
                style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700 }}
              >
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
