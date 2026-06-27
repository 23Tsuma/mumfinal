import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RefreshCw } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const QUICK_PROMPTS = [
  "Family of 5 with a pool under $200/night",
  "Romantic honeymoon for 2, luxury budget",
  "Solo backpacker, cheap dorms in Diani",
  "What to do in Diani for 3 days?",
  "Group of 10, need a full villa",
];

const RESPONSES: Record<string, string> = {
  default: `Hi! I'm Diani, your AI travel assistant 🌴 Tell me:
• Your budget (per night)
• Group size
• Travel dates
• What vibe you're after

I'll find the perfect Diani experience for you!`,
  family: `Great choice for a family! Here are my top picks:

🏡 **Tiki Palms Family Resort** — KES 24,000/night
6 rooms, 2 pools, kids' area, chef service. Perfect for 8-12 people.

🏡 **Coral Cove Beach Villa** — KES 18,500/night
4BR with infinity pool, direct beach. Sleeps up to 8.

🏡 **Sunset Dune Cottage** — KES 8,900/night
Cosy 2BR, lush garden, 3-min walk to Galu Beach.

**Activities for kids:**
🐒 Colobus Conservation monkey walk
🤿 Beginner snorkeling at Tiwi Beach
🚴 Diani beach cycling

Want me to check availability? Just share your dates!`,
  honeymoon: `Oh how exciting! 💍 Diani is *perfect* for honeymoons. Here's what I recommend:

🌹 **Palm Breeze Honeymoon Suite** — KES 32,000/night
Plunge pool, open-air shower, champagne on arrival. Couples only.

🌹 **Ocean Dreamer Penthouse** — KES 45,000/night
Rooftop infinity pool with 360° ocean views. Pure luxury.

**Must-do honeymoon experiences:**
🍽️ Dinner at Ali Barbour's Cave (inside a coral cave!)
🚢 Sunset dhow cruise on the Indian Ocean
💆 Couples spa at Leopard Beach Resort
🐬 Private dolphin watching trip to Kisite

**Don't miss:** Watching the sunrise over the ocean from your private deck 🌅

Shall I arrange a WhatsApp introduction to any of these properties?`,
  backpacker: `Budget mode activated! 🎒 Diani on a shoestring:

🛏️ **Mum's Budget Backpackers** — KES 2,200/dorm bed
Best social hostel in Diani. Pool, bar, free WiFi. You'll make lifelong friends.

💡 **Budget tips:**
• Eat at local *mama ntilie* joints — KES 300 for a full meal
• Use *tuk-tuks* for transport — KES 100-200 per trip
• Free beaches are stunning — no entry fee
• Happy hour at 40 Thieves: 4-6pm daily

**Free/cheap activities:**
🏊 Diani Beach (free!)
🚶 Colobus monkey spotting (free on the beach road)
🌅 Galu Beach sunset (free!)
🤿 Snorkeling from shore (rent gear for KES 500)

**Total daily budget:** KES 4,000-6,000 (≈$30-45) is very comfortable!

Any questions? I'm here to help 😊`,
  things: `Diani in 3 days? Here's my perfect itinerary:

**Day 1 — Arrive & Explore 🌊**
Morning: Check in, hit the beach
Afternoon: Snorkeling at Tiwi Beach or Blue Lagoon
Evening: Sunset drinks at Nomad Beach Bar → dinner at Sails Beach Bar

**Day 2 — Adventure Day 🪁**
Morning: Kite surfing lesson (Diani is world-famous for kite)
OR: Skydive with Diani Skydiving for incredible ocean views
Afternoon: Quad biking along the beach
Evening: Ali Barbour's Cave dinner — a once-in-a-lifetime experience

**Day 3 — Island Escape 🐬**
Full day: Wasini Island trip — dolphin watching, mangrove forest walk, snorkeling in the marine park, seafood lunch

**Don't miss:** The Colobus Conservation centre and local beach market!

Want me to book any of these for you?`,
  group: `Perfect — a big group needs a big villa! 🎉

🏰 **Bahari Pearl Beach House** — KES 28,500/night
5BR beachfront with private reef access. The ultimate group house.

🏰 **Tiki Palms Family Resort** — KES 24,000/night
6BR, two pools, huge garden, full chef service. Sleeps 12.

🏰 **Coral Cove Beach Villa** — KES 18,500/night
4BR, infinity pool. Perfect for 8 guests.

**For groups, I also recommend:**
🍖 Private beach BBQ (we can arrange this)
🎉 Private beach bonfire with live music
🚤 Chartered dhow sunset cruise

All these properties allow private group events. Want me to send you a WhatsApp quote?`,
};

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("famil") || lower.includes("kids") || lower.includes("children")) return RESPONSES.family;
  if (lower.includes("honeymoon") || lower.includes("romantic") || lower.includes("couple")) return RESPONSES.honeymoon;
  if (lower.includes("backpack") || lower.includes("budget") || lower.includes("cheap") || lower.includes("hostel") || lower.includes("dorm")) return RESPONSES.backpacker;
  if (lower.includes("what") || lower.includes("things") || lower.includes("do") || lower.includes("itinerary") || lower.includes("activities")) return RESPONSES.things;
  if (lower.includes("group") || lower.includes("10") || lower.includes("8") || lower.includes("villa")) return RESPONSES.group;
  return `Thanks for that! Let me search our listings for you...

Based on what you've shared, I'd suggest starting with **Coral Cove Beach Villa** (KES 18,500/night) or **Mum's Backpackers** (KES 2,200/night) depending on your budget.


Could you tell me more about:
• How many nights are you planning to stay?
• Any must-have amenities (pool, beachfront, WiFi)?
• Are you celebrating anything special?

I'll narrow it down to the perfect match! 🌴`;
}

export function AITravelPlanner() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: RESPONSES.default },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: getResponse(userMsg) }]);
    }, 1200 + Math.random() * 800);
  };

  const reset = () => {
    setMessages([{ role: "assistant", content: RESPONSES.default }]);
    setInput("");
  };

  return (
    <section className="py-20 bg-[#fdf8f0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#0d1b2a]/10 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-[#c9a84c]" />
            <span className="text-[#0d1b2a] text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              AI-Powered
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: "#0d1b2a" }}>
            Your Personal Diani Travel Planner
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Tell me your budget, group size, and vibe — I'll find the perfect stay and plan your whole trip.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-border/30 overflow-hidden">
          {/* Chat header */}
          <div className="bg-[#0d1b2a] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c9a84c] flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#0d1b2a]" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Diani AI</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/50 text-xs">Online · responds instantly</span>
                </div>
              </div>
            </div>
            <button onClick={reset} className="text-white/40 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-[#fdf8f0]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "assistant" ? "bg-[#c9a84c]" : "bg-[#0d1b2a]"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-4 h-4 text-[#0d1b2a]" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "assistant"
                      ? "bg-white text-[#0d1b2a] shadow-sm border border-border/30 rounded-tl-none"
                      : "bg-[#0d1b2a] text-white rounded-tr-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[#0d1b2a]" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-border/30 flex gap-1 items-center">
                  {[0,1,2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#c9a84c] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-6 py-3 border-t border-border/30 bg-white flex gap-2 overflow-x-auto scrollbar-hide">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="shrink-0 text-xs bg-[#f0ebe0] hover:bg-[#c9a84c]/20 text-[#0d1b2a] px-3 py-1.5 rounded-full border border-border/50 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-4 bg-white border-t border-border/30">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask me about villas, activities, budget tips…"
                className="flex-1 border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-[#f0ebe0] outline-none focus:border-[#c9a84c] transition-colors"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() && !isTyping}
                className="bg-[#c9a84c] hover:bg-[#b8963e] disabled:opacity-40 text-[#0d1b2a] px-5 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
