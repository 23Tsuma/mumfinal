import { useEffect } from "react";
import "../../styles/aboutUs.css";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-stone-100 antialiased selection:bg-stone-800 overflow-hidden">
      
      {/* 🖼️ KAYA BACKGROUND IMAGE CONTAINER */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{ backgroundImage: `url('/src/imports/Nearby/kaya.png')` }} 
      />
      
      {/* GLOBAL CINEMATIC OVERLAY LAYER */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85 pointer-events-none z-0" />

      {/* HERO SECTION */}
      <div className="relative pt-36 pb-4 text-center px-4 bg-gradient-to-b from-black/75 to-black/30 shadow-xl z-10">
        <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-3xl mx-auto relative z-10 space-y-4">
          <span
            className="text-[#dca442] text-xs font-bold uppercase tracking-[0.25em] bg-white/5 backdrop-blur-md px-4 py-2 rounded-full inline-block border border-white/10 shadow-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Discover Our Story
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide leading-[1.15] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Trusted Gateway to <br />
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-white to-[#dca442]">
              Diani Beach
            </span>
          </h1>
          {/* Added mb-8 to create dedicated layout spacing right below this text line */}
          <p className="text-stone-300 font-light max-w-xl mx-auto text-xs sm:text-sm tracking-widest uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] mb-8">
            Premium Accommodation Marketing & Booking Platform
          </p>
        </div>
      </div>

      {/* CORE CONTENT SHELL */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-0 pb-20 -mt-4 relative z-10">
        <div className="space-y-16">

          {/* SECTION 1: CORE SUMMARY PILL & DESCRIPTION */}
          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-2">
                <div className="text-[#dca442] font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-[#dca442] inline-block" /> 01 / Welcome
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                  What Mum's Backpackers is
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-5 text-stone-300 font-light text-sm sm:text-base leading-relaxed">
                <p className="text-lg font-normal text-white leading-relaxed">
                  Mum's Backpackers is a dedicated accommodation marketing and booking platform focused on connecting travelers with some of the finest villas, cottages, furnished apartments, resorts, and holiday homes in Diani Beach.
                </p>
                <p>
                  We work closely with property owners to market their accommodations to both domestic and international tourists, helping guests discover comfortable, affordable, and memorable places to stay while visiting Kenya's beautiful coastal destination.
                </p>
                <p>
                  Our mission is to simplify the accommodation search process by providing travelers with reliable information, quality property listings, and personalized booking assistance. Whether you are planning a family vacation, romantic getaway, business trip, group retreat, or long-term stay, Mum's Backpackers helps you find accommodation that suits your needs and budget.
                </p>
                <p>
                  Through our commission-based partnership model, we promote properties to a wide audience of local and foreign tourists, increasing visibility and generating successful bookings for our partners while ensuring guests receive exceptional accommodation experiences.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: WHAT WE OFFER */}
          <section className="space-y-6">
            <div className="text-center space-y-1">
              <div className="text-[#dca442] font-bold text-xs tracking-widest uppercase">02 / Portfolio</div>
              <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">What We Offer</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Marketing and promotion of villas, cottages, furnished apartments, and resorts.",
                "Accommodation booking assistance for local and international travelers.",
                "Property recommendations based on guest preferences and budget.",
                "Reliable information about Diani Beach attractions and nearby amenities."
              ].map((offer, index) => (
                <div 
                  key={index} 
                  className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/5 shadow-md hover:-translate-y-1 hover:bg-black/50 hover:border-white/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#dca442] font-mono text-xs font-bold border border-white/10">
                    0{index + 1}
                  </div>
                  <p className="text-stone-300 font-light text-sm mt-4 leading-relaxed">{offer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: WHY CHOOSE US */}
          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl space-y-8">
            <div className="space-y-1">
              <div className="text-[#dca442] font-bold text-xs tracking-widest uppercase">03 / Excellence</div>
              <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">Why Choose Us?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Wide Selection of Properties", desc: "From budget-friendly cottages to luxurious beachfront villas, we offer accommodation options for every traveler." },
                { title: "Local Expertise", desc: "We understand Diani Beach perfectly and help visitors make highly informed accommodation choices." },
                { title: "Personalized Service", desc: "Our team is committed to helping guests find the perfect stay while supporting property owners in reaching more customers." },
                { title: "Trusted Partnerships", desc: "We collaborate with reputable accommodation providers to ensure exceptional quality and customer satisfaction." }
              ].map((item, idx) => (
                <div key={idx} className="group relative pl-6 space-y-1">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#dca442] group-hover:scale-150 transition duration-300" />
                  <h3 className="text-lg font-medium text-white tracking-wide">{item.title}</h3>
                  <p className="text-sm text-stone-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4 & 5: VISION & MISSION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-black/80 to-black/40 border border-white/10 p-8 sm:p-10 rounded-3xl text-white shadow-xl relative overflow-hidden group hover:shadow-2xl transition duration-300">
              <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-125 transition duration-500" />
              <div className="text-[#dca442] text-xs font-mono tracking-widest uppercase mb-2">04 / Future</div>
              <h2 className="text-2xl font-serif tracking-wide mb-3">Our Vision</h2>
              <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed">
                To become the leading accommodation marketing and booking platform for Diani Beach and the Kenyan Coast by connecting travelers with exceptional stays and helping property owners maximize their occupancy rates.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-md p-8 sm:p-10 rounded-3xl text-white border border-white/10 shadow-xl relative overflow-hidden group hover:shadow-2xl transition duration-300">
              <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-125 transition duration-500" />
              <div className="text-[#dca442] text-xs font-mono tracking-widest uppercase mb-2">05 / Commitment</div>
              <h2 className="text-2xl font-serif text-white tracking-wide mb-3">Our Mission</h2>
              <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed">
                To provide a seamless, trustworthy, and efficient accommodation booking experience that benefits both travelers and property owners while promoting tourism growth along Kenya's coastline.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}