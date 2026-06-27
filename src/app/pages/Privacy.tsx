import React, { useEffect } from "react";

export default function Privacy() {
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

      {/* HERO SECTION WITH LUXURY DARK TRANSLUCENT WRAPPER */}
      <div className="relative pt-36 pb-24 text-center px-4 bg-gradient-to-b from-black/75 to-black/30 border-b border-white/5 shadow-xl z-10">
        <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-3xl mx-auto relative z-10 space-y-4">
          <span
            className="text-[#dca442] text-xs font-bold uppercase tracking-[0.25em] bg-white/5 backdrop-blur-md px-4 py-2 rounded-full inline-block border border-white/10 shadow-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Privacy Policy
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide leading-[1.15] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How We Protect <br />
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-white to-[#dca442]">
              Your Data
            </span>
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-xs sm:text-sm tracking-widest uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Summary legal notice for Mum's Backpackers
          </p>
        </div>
      </div>

      {/* CORE CONTENT SHELL */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-20 relative z-10">
        <div className="space-y-6">
          
          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">1. Introduction</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              This Privacy Policy explains how Mum's Backpackers (“we”, “us”, Our”) collects, uses,
              and protects personal information when you visit our website or interact with our
              services.
            </p>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">2. Information We Collect</h2>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-stone-300 font-light text-sm sm:text-base">
              <li>Contact details you provide (e.g., name, email, phone number).</li>
              <li>Booking and inquiry details you submit to help us respond.</li>
              <li>Usage information (e.g., pages viewed, approximate location, device/browser type).</li>
              <li>Any messages you send us through forms or communications.</li>
            </ul>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-stone-300 font-light text-sm sm:text-base">
              <li>To respond to inquiries and provide booking assistance.</li>
              <li>To manage reservations and communicate with guests.</li>
              <li>To improve our website and services.</li>
              <li>To maintain security and prevent fraud or misuse.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">4. Sharing of Information</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              We may share relevant information with property partners and service providers (e.g., to
              facilitability booking and guest communication). We do not sell your personal data.
            </p>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">5. Cookies</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              We use cookies and similar technologies to enhance your experience and understand how
              our site is used. Please see our{" "}
              <a className="text-[#dca442] hover:text-[#e5c158] underline transition-colors" href="/cookies">
                Cookies Policy
              </a>{" "}
              for details.
            </p>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">6. Your Rights</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              Depending on your location, you may have rights such as access, correction, deletion,
              and objection to certain processing. To request changes, contact us using the details
              below.
            </p>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">7. Contact Us</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              If you have questions about this Privacy Policy, contact us at:
              <br />
              <span className="text-white/90 font-medium block mt-1">info@monikasafaris.com</span>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}