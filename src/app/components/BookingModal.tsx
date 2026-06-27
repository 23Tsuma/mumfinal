import { useEffect, useState, useRef } from "react";
import {
  X, Calendar, Users, User, Mail, Phone, MessageSquare,
  ChevronRight, CheckCircle, Sparkles, MapPin, ArrowLeft,
  Clock, Shield, Star
} from "lucide-react";

type BookingPayload = {
  propertyName?: string;
  roomType?: string;
  price?: string;
};

type UserFacingStatus = "Pending Review" | "Processing" | "Awaiting Confirmation" | "Confirmed";

function generateRef() {
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const num = String(Math.floor(10000 + Math.random() * 90000));
  return `RES-${ymd}-${num}`;
}

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

/* =========================================================
   STEP INDICATOR
   ========================================================= */
function StepIndicator({ step, total }: { step: number; total: number }) {
  const labels = ["Your Stay", "Details", "Confirmed"];
  return (
    <div className="flex items-center gap-0">
      {labels.map((label, i) => {
        const num = i + 1;
        const done = step > num;
        const active = step === num;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                done ? "bg-[#c9a84c] text-[#0B151F]" :
                active ? "bg-[#0B151F] border-2 border-[#c9a84c] text-[#e5c158]" :
                "bg-white/5 border border-white/15 text-stone-600"
              }`}>
                {done ? <CheckCircle className="w-4 h-4" /> : num}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-wider whitespace-nowrap ${
                active ? "text-[#e5c158]" : done ? "text-stone-400" : "text-stone-600"
              }`}>{label}</span>
            </div>
            {i < total - 1 && (
              <div className={`h-px w-12 sm:w-20 mx-2 mb-4 transition-all duration-500 ${done ? "bg-[#c9a84c]" : "bg-white/10"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   FIELD COMPONENTS
   ========================================================= */
function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
        {label}
        {required && <span className="text-[#c9a84c]">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = "w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#c9a84c]/60 focus:bg-white/8 text-white placeholder-stone-600 text-sm font-medium rounded-xl px-4 py-3.5 outline-none transition-all duration-200 [color-scheme:dark]";

/* =========================================================
   STEP 1 — STAY CONFIGURATION
   ========================================================= */
function Step1({
  data, propertyName, propertyPrice, roomType,
  onChange, onNext,
}: {
  data: { checkIn: string; checkOut: string; adults: number; children: number; roomType: string };
  propertyName: string; propertyPrice: string; roomType: string;
  onChange: (f: string, v: string | number) => void;
  onNext: () => void;
}) {
  const today = getTodayStr();
  const nights = (() => {
    if (!data.checkIn || !data.checkOut) return 0;
    const diff = (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / 86400000;
    return diff > 0 ? diff : 0;
  })();

  const valid = data.checkIn && data.checkOut && nights > 0;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          Configure Your Stay
        </h2>
        <p className="text-stone-500 text-sm mt-1">Choose your dates and guest count</p>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Check-in" required>
          <input
            type="date"
            value={data.checkIn}
            min={today}
            onChange={(e) => { onChange("checkIn", e.target.value); if (data.checkOut && e.target.value >= data.checkOut) onChange("checkOut", ""); }}
            className={inputClass}
          />
        </Field>
        <Field label="Check-out" required>
          <input
            type="date"
            value={data.checkOut}
            min={data.checkIn || today}
            onChange={(e) => onChange("checkOut", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      {/* Night count badge */}
      {nights > 0 && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-xl">
          <Calendar className="w-4 h-4 text-[#e5c158]" />
          <span className="text-[#e5c158] font-bold text-sm">{nights} night{nights > 1 ? "s" : ""}</span>
          <span className="text-stone-500 text-xs ml-auto">· {new Date(data.checkIn).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} → {new Date(data.checkOut).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      )}

      {/* Guests */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Adults" required>
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <button type="button" onClick={() => onChange("adults", Math.max(1, data.adults - 1))} className="w-11 h-12 flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/8 transition text-lg font-light flex-shrink-0">−</button>
            <span className="flex-1 text-center text-white font-bold text-sm">{data.adults}</span>
            <button type="button" onClick={() => onChange("adults", data.adults + 1)} className="w-11 h-12 flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/8 transition text-lg font-light flex-shrink-0">+</button>
          </div>
        </Field>
        <Field label="Children">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <button type="button" onClick={() => onChange("children", Math.max(0, data.children - 1))} className="w-11 h-12 flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/8 transition text-lg font-light flex-shrink-0">−</button>
            <span className="flex-1 text-center text-white font-bold text-sm">{data.children}</span>
            <button type="button" onClick={() => onChange("children", data.children + 1)} className="w-11 h-12 flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/8 transition text-lg font-light flex-shrink-0">+</button>
          </div>
        </Field>
      </div>

      {/* Room type */}
      {roomType && (
        <Field label="Room / Unit Type">
          <div className="px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-stone-300 text-sm">
            {roomType}
          </div>
        </Field>
      )}

      <button
        type="button"
        disabled={!valid}
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#e5c158] text-[#0B151F] font-black py-4 rounded-xl text-sm tracking-wide transition-all hover:brightness-110 hover:shadow-lg hover:shadow-[#c9a84c]/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
      >
        Continue
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* =========================================================
   STEP 2 — PERSONAL DETAILS
   ========================================================= */
function Step2({
  data,
  onChange,
  onBack,
  onSubmit,
  submitting,
}: {
  data: { fullName: string; email: string; phone: string; specialRequests: string };
  onChange: (f: string, v: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  const valid = data.fullName.trim() && data.email.trim() && data.phone.trim();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          Your Details
        </h2>
        <p className="text-stone-500 text-sm mt-1">We'll use these to confirm your reservation</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name" required>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              placeholder="Your full name"
              className={inputClass + " pl-10"}
            />
          </div>
        </Field>

        <Field label="Email Address" required>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="you@example.com"
              className={inputClass + " pl-10"}
            />
          </div>
        </Field>

        <Field label="Phone Number" required>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+254 7XX XXX XXX"
              className={inputClass + " pl-10"}
            />
          </div>
        </Field>
      </div>

      <Field label="Special Requests">
        <div className="relative">
          <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-600" />
          <textarea
            value={data.specialRequests}
            onChange={(e) => onChange("specialRequests", e.target.value)}
            rows={3}
            placeholder="Early check-in, dietary needs, extra bed, anniversary setup…"
            className={inputClass + " pl-10 resize-none"}
          />
        </div>
      </Field>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-4 py-3 border-t border-white/8">
        {[
          { icon: Shield, text: "Your data is secure" },
          { icon: Clock, text: "Instant acknowledgment" },
          { icon: Star, text: "No commitment yet" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-1.5 text-[10px] text-stone-600">
            <Icon className="w-3 h-3 text-[#c9a84c]/60" />
            {text}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 border border-white/10 text-stone-400 hover:text-white hover:border-white/20 px-5 py-3.5 rounded-xl text-sm font-bold transition flex-shrink-0">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          disabled={!valid || submitting}
          onClick={onSubmit}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#e5c158] text-[#0B151F] font-black py-3.5 rounded-xl text-sm tracking-wide transition-all hover:brightness-110 hover:shadow-lg hover:shadow-[#c9a84c]/20 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-[#0B151F]/30 border-t-[#0B151F] rounded-full animate-spin" />Submitting…</span>
          ) : (
            <><Sparkles className="w-4 h-4" />Complete Reservation Request</>
          )}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   STEP 3 — CONFIRMATION
   ========================================================= */
function Step3({
  reservationRef,
  propertyName,
  data,
  stayData,
  onClose,
}: {
  reservationRef: string;
  propertyName: string;
  data: { fullName: string; email: string; phone: string };
  stayData: { checkIn: string; checkOut: string; adults: number; children: number };
  onClose: () => void;
}) {
  const [status, setStatus] = useState<UserFacingStatus>("Pending Review");
  const statusSteps: UserFacingStatus[] = ["Pending Review", "Processing", "Awaiting Confirmation", "Confirmed"];
  const currentIdx = statusSteps.indexOf(status);

  useEffect(() => {
    const t0 = setTimeout(() => setStatus("Processing"), 900);
    const t1 = setTimeout(() => setStatus("Awaiting Confirmation"), 2200);
    const t2 = setTimeout(() => setStatus("Confirmed"), 3800);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const nights = (() => {
    if (!stayData.checkIn || !stayData.checkOut) return 0;
    const diff = (new Date(stayData.checkOut).getTime() - new Date(stayData.checkIn).getTime()) / 86400000;
    return diff > 0 ? diff : 0;
  })();

  return (
    <div className="space-y-6">
      {/* Success hero */}
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full bg-[#c9a84c]/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e5c158] flex items-center justify-center shadow-xl shadow-[#c9a84c]/30">
            <CheckCircle className="w-9 h-9 text-[#0B151F]" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          🎉 Reservation Received!
        </h2>
        <p className="text-stone-400 text-sm max-w-sm mx-auto leading-relaxed">
          Thank you for choosing us. Your reservation request has been received and is currently being processed.
          Our team will reach out via <strong className="text-white">WhatsApp, SMS, or email</strong> shortly.
        </p>
      </div>

      {/* Reference number */}
      <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/25 rounded-2xl p-4 text-center">
        <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-1">Reservation Reference</p>
        <p className="text-[#e5c158] font-black text-xl tracking-widest">{reservationRef}</p>
        <p className="text-stone-600 text-[10px] mt-1">Save this for your records</p>
      </div>

      {/* Summary */}
      <div className="bg-white/4 border border-white/8 rounded-2xl p-4 space-y-3">
        <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Booking Summary</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-stone-500">Property</span>
            <span className="text-white font-semibold">{propertyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Guest</span>
            <span className="text-white font-semibold">{data.fullName}</span>
          </div>
          {stayData.checkIn && stayData.checkOut && (
            <div className="flex justify-between">
              <span className="text-stone-500">Dates</span>
              <span className="text-white font-semibold">
                {new Date(stayData.checkIn).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} → {new Date(stayData.checkOut).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                {nights > 0 && <span className="text-stone-500 font-normal"> · {nights}n</span>}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-stone-500">Guests</span>
            <span className="text-white font-semibold">{stayData.adults} adults{stayData.children > 0 ? `, ${stayData.children} children` : ""}</span>
          </div>
        </div>
      </div>

      {/* Status tracker */}
      <div className="space-y-3">
        <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Reservation Status</p>
        <div className="space-y-2.5">
          {statusSteps.map((step, i) => {
            const done = i <= currentIdx;
            const active = step === status;
            return (
              <div key={step} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 ${
                active ? "bg-[#c9a84c]/10 border border-[#c9a84c]/25" :
                done ? "bg-white/4 border border-white/6" :
                "bg-transparent border border-transparent"
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-500 ${
                  active ? "bg-[#e5c158] animate-pulse shadow-[0_0_8px_rgba(229,193,88,0.6)]" :
                  done ? "bg-[#c9a84c]" : "bg-white/15"
                }`} />
                <span className={`text-sm font-medium transition-colors ${
                  active ? "text-[#e5c158]" : done ? "text-stone-300" : "text-stone-600"
                }`}>{step}</span>
                {active && <span className="ml-auto text-[9px] text-[#c9a84c] font-bold uppercase tracking-wider">In progress</span>}
                {done && !active && <CheckCircle className="ml-auto w-3.5 h-3.5 text-[#c9a84c]" />}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-center text-stone-600 text-xs leading-relaxed">
        Final confirmation will be sent to <strong className="text-stone-400">{data.email}</strong> and <strong className="text-stone-400">{data.phone}</strong>
      </p>

      <button
        type="button"
        onClick={onClose}
        className="w-full border border-white/10 text-stone-400 hover:text-white hover:border-white/20 py-3 rounded-xl text-sm font-bold transition"
      >
        Close
      </button>
    </div>
  );
}

/* =========================================================
   MAIN MODAL
   ========================================================= */
export function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [property, setProperty] = useState({ name: "", room: "", price: "" });
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [reservationRef, setReservationRef] = useState("");

  const [stayData, setStayData] = useState({ checkIn: "", checkOut: "", adults: 2, children: 0, roomType: "" });
  const [personalData, setPersonalData] = useState({ fullName: "", email: "", phone: "", specialRequests: "" });

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<BookingPayload>;
      const detail = ce.detail ?? {};
      setProperty({ name: detail.propertyName ?? "", room: detail.roomType ?? "", price: detail.price ?? "" });
      setStep(1);
      setSubmitting(false);
      setReservationRef("");
      setStayData({ checkIn: "", checkOut: "", adults: 2, children: 0, roomType: detail.roomType ?? "" });
      setPersonalData({ fullName: "", email: "", phone: "", specialRequests: "" });
      setIsOpen(true);
    };
    window.addEventListener("openBookingModal", handler);
    return () => window.removeEventListener("openBookingModal", handler);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && step !== 3) handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [step]);

  const handleClose = () => { setIsOpen(false); };

  const handleStayChange = (f: string, v: string | number) => setStayData((d) => ({ ...d, [f]: v }));
  const handlePersonalChange = (f: string, v: string) => setPersonalData((d) => ({ ...d, [f]: v }));

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setReservationRef(generateRef());
      setStep(3);
      setSubmitting(false);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => step !== 3 && handleClose()}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#080f18] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="relative flex-shrink-0">
          {/* Property info strip */}
          <div className="bg-gradient-to-r from-[#0d1a28] to-[#081018] px-6 pt-6 pb-5 border-b border-white/8">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-[#c9a84c]/20 border border-[#c9a84c]/30 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 text-[#e5c158]" />
                  </div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Reservation Request</span>
                </div>
                <h3 className="text-lg font-black text-white truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {property.name || "Selected Property"}
                </h3>
                {property.price && (
                  <p className="text-[#e5c158] text-xs font-semibold mt-0.5">{property.price}</p>
                )}
              </div>
              {step !== 3 && (
                <button
                  onClick={handleClose}
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition border border-white/10 hover:border-white/20"
                  type="button"
                >
                  <X className="w-4 h-4 text-stone-400" />
                </button>
              )}
            </div>

            {/* Step indicator */}
            <div className="mt-5 flex justify-center">
              <StepIndicator step={step} total={3} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          {step === 1 && (
            <Step1
              data={stayData}
              propertyName={property.name}
              propertyPrice={property.price}
              roomType={property.room}
              onChange={handleStayChange}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <Step2
              data={personalData}
              onChange={handlePersonalChange}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          )}
          {step === 3 && (
            <Step3
              reservationRef={reservationRef}
              propertyName={property.name}
              data={personalData}
              stayData={stayData}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
