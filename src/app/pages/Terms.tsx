import React, { useEffect } from "react";

export default function Terms() {
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
            Terms of Service
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide leading-[1.15] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Rules for Using <br />
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-white to-[#dca442]">
              Mum's Backpackers
            </span>
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-xs sm:text-sm tracking-widest uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Service terms and guidelines for our website
          </p>
        </div>
      </div>

      {/* CORE CONTENT SHELL */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-20 relative z-10">
        <div className="space-y-6">
          
          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">1. Acceptance of Terms</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              By accessing or using Mum's Backpackers website and services, you agree to be
              bound by these Terms of Service. If you do not agree, do not use the site.
            </p>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">2. Use of the Website</h2>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-stone-300 font-light text-sm sm:text-base">
              <li>You must use the website responsibly and only for lawful purposes.</li>
              <li>You agree not to misuse the site, attempt unauthorized access, or interfere with services.</li>
              <li>All content on the site is provided for informational purposes.</li>
            </ul>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">3. Booking & Property Information</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              Mum's Backpackers acts as a marketing and booking assistance platform. Property
              availability, pricing, and operational policies are determined by the respective property
              owner or partner.
            </p>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">4. Disclaimer</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              To the maximum extent permitted by law, we provide the website “as is” and “as
              available”. We do not guarantee that the site will be completely error-free or uninterrupted.
            </p>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">5. Limitation of Liability</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              Mum's Backpackers will not be liable for indirect, incidental, special, or
              consequential damages arising from your use of the site or downstream destination alterations.
            </p>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">6. Changes to These Terms</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              We may update these Terms from time to time. Continued use of the site after
              changes are posted means you accept the updated terms.
            </p>
          </section>

          <section className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-serif text-white tracking-wide">7. Contact</h2>
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mt-3">
              Questions about these Terms can be sent to:
              <br />
              <span className="text-white/90 font-medium block mt-1">info@monikasafaris.com</span>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}