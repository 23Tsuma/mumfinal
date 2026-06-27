import { useState } from "react";
import { Star, Award, MapPin, Calendar } from "lucide-react";

const FEATURE = {
  name: "Bahari Dhow Beach Villas",
  type: "Beachfront Luxury Villa",
  location: "Diani Beach Road, South Diani",
  price: 28500,
  priceUSD: 220,
  rating: 4.99,
  reviews: 143,
  guests: 10,
  beds: 5,
  image: "/src/imports/overview.JPG",
  description:
    "This week's standout: a sprawling 5-bedroom oceanfront palace with its own coral reef access, heated infinity pool, full chef service, and private beach stretch. Waking up here feels like a dream — and the Milky Way at night will take your breath away.",
  highlights: ["Private beach access", "Chef included", "Coral reef snorkeling", "Infinity pool", "Sunset deck", "Airport transfers"],
};

export function FeaturedOfWeek() {
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState<"details" | "payment" | "confirm">("details");
  const [payMethod, setPayMethod] = useState<"mpesa" | "card">("mpesa");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [booked, setBooked] = useState(false);

  const handleConfirmBook = () => {
    setBooked(true);
    setTimeout(() => {
      setBookingModal(false);
      setBooked(false);
      setBookingStep("details");
    }, 2500);
  };

  return (
    <section className="py-16 bg-[#0d1b2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2 bg-[#c9a84c]/20 border border-[#c9a84c]/30 rounded-full px-4 py-1.5">
            <Award className="w-4 h-4 text-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              Featured Property of the Week
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden shadow-2xl">
          {/* Image */}
          <div className="lg:col-span-3 relative h-72 lg:h-auto min-h-[400px] bg-[#1e3a5f]">
            <img
              src={FEATURE.image}
              alt={FEATURE.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d1b2a]/10" />
            <div className="absolute top-5 left-5">
              <span className="bg-[#c9a84c] text-[#0d1b2a] px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                🏆 This Week's Pick
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 bg-[#1e3a5f] p-8 flex flex-col justify-between">
            <div>
              <div className="text-[#c9a84c]/70 text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                {FEATURE.type}
              </div>
              <h2
                className="text-white mb-3 leading-tight"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", fontWeight: 700 }}
              >
                {FEATURE.name}
              </h2>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />
                  <span className="text-white font-semibold">{FEATURE.rating}</span>
                  <span className="text-white/50 text-sm">({FEATURE.reviews} reviews)</span>
                </div>
                <span className="text-white/30">·</span>
                <div className="flex items-center gap-1 text-white/70 text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {FEATURE.location}
                </div>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-5">{FEATURE.description}</p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {FEATURE.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-1.5 text-white/80 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700 }}>
                  KES {FEATURE.price.toLocaleString()}
                </span>
                <span className="text-white/50 text-sm">/ night</span>
              </div>
              <div className="text-white/40 text-xs mb-4">≈ ${FEATURE.priceUSD} · Includes chef & transfers</div>

              <div className="flex gap-3">
                <button
                  onClick={() => setBookingModal(true)}
                  className="flex-1 bg-[#c9a84c] hover:bg-[#b8963e] text-[#0d1b2a] py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book This Week
                </button>
                <a
                  href={`https://wa.me/254700000000?text=Hi!%20I'm%20interested%20in%20the%20featured%20property%20${encodeURIComponent(FEATURE.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {booked ? (
              <div className="p-10 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "#0d1b2a",
                  }}
                >
                  Booking Confirmed!
                </h3>
                <p className="text-muted-foreground mt-2">
                  You'll receive a confirmation WhatsApp message shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="relative h-40">
                  <img
                    src={FEATURE.image}
                    alt={FEATURE.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/80" />
                  <button
                    onClick={() => setBookingModal(false)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-3 left-4 text-white">
                    <div className="text-xs text-white/70">{FEATURE.type}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                      {FEATURE.name}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {bookingStep === "details" && (
                    <>
                      <h4
                        className="font-semibold text-[#0d1b2a] mb-4"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Booking Details
                      </h4>
                      <div className="space-y-3 mb-5">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Check-in</span>
                          <input
                            type="date"
                            className="border border-border rounded-lg px-3 py-1.5 text-sm text-foreground bg-muted/30 outline-none"
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Check-out</span>
                          <input
                            type="date"
                            className="border border-border rounded-lg px-3 py-1.5 text-sm text-foreground bg-muted/30 outline-none"
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Guests</span>
                          <select
                            className="border border-border rounded-lg px-3 py-1.5 text-sm text-foreground bg-muted/30 outline-none"
                          >
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                              <option key={n}>
                                {n} guest{n > 1 ? "s" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="bg-[#f0ebe0] rounded-xl p-4 mb-5">
                        <div className="flex justify-between text-sm mb-1">
                          <span>KES {FEATURE.price.toLocaleString()} × 3 nights</span>
                          <span>KES {(FEATURE.price * 3).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">30% deposit now</span>
                          <span className="text-[#2a7f62] font-semibold">
                            KES {Math.round(FEATURE.price * 3 * 0.3).toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t border-border/40 my-2" />
                        <div className="flex justify-between font-semibold text-[#0d1b2a]">
                          <span>Total</span>
                          <span>KES {(FEATURE.price * 3).toLocaleString()}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setBookingStep("payment")}
                        className="w-full bg-[#0d1b2a] hover:bg-[#1e3a5f] text-white py-3 rounded-xl font-semibold transition-colors"
                      >
                        Continue to Payment →
                      </button>
                    </>
                  )}

                  {bookingStep === "payment" && (
                    <>
                      <h4
                        className="font-semibold text-[#0d1b2a] mb-4"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Pay Deposit · KES {Math.round(FEATURE.price * 3 * 0.3).toLocaleString()}
                      </h4>

                      <div className="flex gap-3 mb-5">
                        <button
                          onClick={() => setPayMethod("mpesa")}
                          className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                            payMethod === "mpesa"
                              ? "border-[#4CAF50] bg-green-50 text-[#2a7f62]"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          📱 M-Pesa
                        </button>
                        <button
                          onClick={() => setPayMethod("card")}
                          className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                            payMethod === "card"
                              ? "border-[#0d1b2a] bg-blue-50 text-[#0d1b2a]"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          💳 Card
                        </button>
                      </div>

                      {payMethod === "mpesa" ? (
                        <div className="space-y-3 mb-5">
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">
                              M-Pesa Phone Number
                            </label>
                            <input
                              type="tel"
                              placeholder="07XX XXX XXX"
                              value={mpesaPhone}
                              onChange={(e) => setMpesaPhone(e.target.value)}
                              className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-muted/30 outline-none focus:border-[#4CAF50]"
                            />
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-800">
                            You'll receive an M-Pesa STK push prompt to confirm payment of KES{" "}
                            {Math.round(FEATURE.price * 3 * 0.3).toLocaleString()}.
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 mb-5">
                          <input
                            placeholder="Card Number"
                            className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none bg-muted/30 focus:border-[#0d1b2a]"
                          />
                          <div className="flex gap-3">
                            <input
                              placeholder="MM/YY"
                              className="flex-1 border border-border rounded-xl px-4 py-3 text-sm outline-none bg-muted/30"
                            />
                            <input
                              placeholder="CVV"
                              className="w-20 border border-border rounded-xl px-4 py-3 text-sm outline-none bg-muted/30"
                            />
                          </div>
                          <input
                            placeholder="Name on Card"
                            className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none bg-muted/30"
                          />
                        </div>
                      )}

                      <button
                        onClick={handleConfirmBook}
                        className="w-full bg-[#c9a84c] hover:bg-[#b8963e] text-[#0d1b2a] py-3 rounded-xl font-bold transition-colors"
                      >
                        {payMethod === "mpesa" ? "Send M-Pesa Prompt" : "Pay Deposit Now"} ✓
                      </button>
                      <button
                        onClick={() => setBookingStep("details")}
                        className="w-full mt-2 text-muted-foreground text-sm hover:text-foreground transition-colors py-2"
                      >
                        ← Back
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

