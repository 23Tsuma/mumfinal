import React, { useEffect } from "react";

export default function Cookies() {
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
            Cookie Policy
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide leading-[1.15] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How We Use <br />
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-white to-[#dca442]">
              Cookies
            </span>
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-xs sm:text-sm tracking-widest uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Cookie details for Mum's Backpackers
          </p>
        </div>
      </div>

      {/* CORE CONTENT SHELL */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-20 relative z-10">
        <div className="space-y-6">
          
          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">1. What are Cookies?</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              Cookies are small text files stored on your device by websites you visit. They
              help websites work, remember preferences, and provide analytics.
            </p>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">2. Cookies We Use</h2>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-stone-300 font-light text-sm sm:text-base">
              <li><b>Essential cookies</b>: enable basic site functionality.</li>
              <li><b>Performance/analytics cookies</b>: help us understand site usage.</li>
              <li><b>Preference cookies</b>: remember your settings and preferences.</li>
              <li><b>Marketing cookies</b> (if applicable): used to measure campaigns.</li>
            </ul>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">3. Why We Use Cookies</h2>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-stone-300 font-light text-sm sm:text-base">
              <li>To provide and maintain our website and services.</li>
              <li>To improve user experience and performance.</li>
              <li>To analyze traffic and trends.</li>
              <li>To ensure security and prevent abuse.</li>
            </ul>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">4. Managing Your Cookies</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              You can control cookies through your browser settings. You may delete existing cookies
              and block new cookies. Note that some features of the site may not work if cookies are disabled.
            </p>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">5. Contact</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              If you have questions about this Cookie Policy, contact us at:
              <br />
              <span className="text-white/90 font-medium block mt-1">info@monikasafaris.com</span>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}