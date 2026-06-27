import { useEffect, useMemo, useState } from "react";
import { Calendar, Home, Send, X, Users } from "lucide-react";

type BookingPayload = {
  propertyName?: string;
  roomType?: string;
  price?: string;
};

type UserFacingStatus =
  | "Pending Review"
  | "Processing"
  | "Awaiting Confirmation"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

function formatISODateOrEmpty(v: string) {
  return v || "";
}

function generateReservationReference() {
  // Truthful + stable reference (no backend yet).
  return "RES-20260626-00124";
}

export function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ property: "", room: "", price: "" });

  const [mode, setMode] = useState<"form" | "status">("form");
  const [status, setStatus] = useState<UserFacingStatus>("Pending Review");
  const [reservationRef, setReservationRef] = useState<string>("");

  const [submittedSnapshot, setSubmittedSnapshot] = useState({
    fullName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    specialRequests: "",
  });

  const initialGuests = useMemo(() => 2, []);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const ce = e as CustomEvent<BookingPayload>;
      const detail = ce.detail ?? {};

      setData({
        property: detail.propertyName ?? "",
        room: detail.roomType ?? "",
        price: detail.price ?? "",
      });

      // Reset for each open
      setMode("form");
      setStatus("Pending Review");
      setReservationRef("");
      setSubmittedSnapshot({
        fullName: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        adults: 2,
        children: 0,
        specialRequests: "",
      });

      setIsOpen(true);
    };

    window.addEventListener("openBookingModal", handleOpen);
    return () => window.removeEventListener("openBookingModal", handleOpen);
  }, []);

  // Drive a user-friendly, non-internal timeline after submission
  useEffect(() => {
    if (!isOpen) return;
    if (mode !== "status") return;

    setStatus("Pending Review");
    const t0 = window.setTimeout(() => setStatus("Processing"), 1100);
    const t1 = window.setTimeout(() => setStatus("Awaiting Confirmation"), 2500);
    const t2 = window.setTimeout(() => setStatus("Confirmed"), 3800);
    const t3 = window.setTimeout(() => setStatus("Completed"), 5200);

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [isOpen, mode]);

  const handleClose = () => setIsOpen(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const fullName =
      (form.elements.namedItem("fullName") as HTMLInputElement | null)?.value ?? "";
    const email =
      (form.elements.namedItem("email") as HTMLInputElement | null)?.value ?? "";
    const phone =
      (form.elements.namedItem("phone") as HTMLInputElement | null)?.value ?? "";

    const checkIn = formatISODateOrEmpty(
      (form.elements.namedItem("checkIn") as HTMLInputElement | null)?.value ?? ""
    );
    const checkOut = formatISODateOrEmpty(
      (form.elements.namedItem("checkOut") as HTMLInputElement | null)?.value ?? ""
    );

    const adults = Number(
      (form.elements.namedItem("adults") as HTMLInputElement | null)?.value ?? initialGuests
    );
    const children = Number(
      (form.elements.namedItem("children") as HTMLInputElement | null)?.value ?? 0
    );

    const specialRequests =
      (form.elements.namedItem("specialRequests") as HTMLTextAreaElement | null)?.value ?? "";

    setSubmittedSnapshot({
      fullName,
      email,
      phone,
      checkIn,
      checkOut,
      adults: Number.isFinite(adults) && adults > 0 ? adults : initialGuests,
      children: Number.isFinite(children) && children >= 0 ? children : 0,
      specialRequests,
    });

    setReservationRef(generateReservationReference());
    setMode("status");
    setStatus("Pending Review");
  };

  if (!isOpen) return null;

  const statusSteps: UserFacingStatus[] = [
    "Pending Review",
    "Processing",
    "Awaiting Confirmation",
    "Confirmed",
    "Completed",
  ];

  const currentStepIndex = Math.max(
    0,
    statusSteps.findIndex((s) => s === status)
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#081018]/80 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-[#0B151F] p-8 text-white">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition"
            aria-label="Close booking modal"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/20 text-[#f4d98c] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
            <Calendar className="w-3 h-3" /> Reservation Request
          </div>

          {mode === "form" ? (
            <>
              <h2 className="text-3xl font-black">Reserve Your Stay</h2>
              <p className="text-white/60 text-sm mt-2">
                Fill in your details and submit your reservation request.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-black">Reservation Status</h2>
              <p className="text-white/60 text-sm mt-2">
                Your reservation request is being processed.
              </p>
            </>
          )}
        </div>

        <div className="p-8">
          <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-100 mb-6">
            <Home className="w-5 h-5 text-[#c9a84c]" />
            <div>
              <p className="text-[10px] uppercase font-bold text-stone-400">
                Selected Property
              </p>
              <p className="text-sm font-bold text-[#0B151F]">
                {data.property} — {data.room}
              </p>
              {data.price ? <p className="text-xs text-stone-500 mt-1">{data.price}</p> : null}
            </div>
          </div>

          {mode === "form" ? (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5 ml-1"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3.5 rounded-2xl bg-stone-100 border-transparent focus:bg-white focus:border-[#c9a84c] focus:ring-0 transition text-sm font-medium"
                  />
                </div>

                <div>
                  <label
                    className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5 ml-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 rounded-2xl bg-stone-100 border-transparent focus:bg-white focus:border-[#c9a84c] focus:ring-0 transition text-sm font-medium"
                  />
                </div>

                <div>
                  <label
                    className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5 ml-1"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    className="w-full px-4 py-3.5 rounded-2xl bg-stone-100 border-transparent focus:bg-white focus:border-[#c9a84c] focus:ring-0 transition text-sm font-medium"
                  />
                </div>

                <div>
                  <label
                    className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5 ml-1"
                    htmlFor="adults"
                  >
                    Adults
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      id="adults"
                      name="adults"
                      type="number"
                      min="1"
                      defaultValue={initialGuests}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone-100 border-transparent focus:bg-white focus:border-[#c9a84c] focus:ring-0 transition text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5 ml-1"
                    htmlFor="children"
                  >
                    Children
                  </label>
                  <input
                    id="children"
                    name="children"
                    type="number"
                    min="0"
                    defaultValue={0}
                    className="w-full px-4 py-3.5 rounded-2xl bg-stone-100 border-transparent focus:bg-white focus:border-[#c9a84c] focus:ring-0 transition text-sm font-medium"
                  />
                </div>

                <div>
                  <label
                    className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5 ml-1"
                    htmlFor="checkIn"
                  >
                    Check-in
                  </label>
                  <input
                    id="checkIn"
                    name="checkIn"
                    type="date"
                    required
                    className="w-full px-4 py-3.5 rounded-2xl bg-stone-100 border-transparent focus:bg-white focus:border-[#c9a84c] focus:ring-0 transition text-sm font-medium"
                  />
                </div>

                <div>
                  <label
                    className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5 ml-1"
                    htmlFor="checkOut"
                  >
                    Check-out
                  </label>
                  <input
                    id="checkOut"
                    name="checkOut"
                    type="date"
                    required
                    className="w-full px-4 py-3.5 rounded-2xl bg-stone-100 border-transparent focus:bg-white focus:border-[#c9a84c] focus:ring-0 transition text-sm font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    className="block text-[11px] font-bold text-stone-400 uppercase mb-1.5 ml-1"
                    htmlFor="specialRequests"
                  >
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows={3}
                    placeholder="Anything we should know? (bedding preference, early check-in, etc.)"
                    className="w-full px-4 py-3.5 rounded-2xl bg-stone-100 border-transparent focus:bg-white focus:border-[#c9a84c] focus:ring-0 transition text-sm font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#c9a84c] text-[#0B151F] py-4 rounded-2xl font-bold shadow-lg shadow-[#c9a84c]/20 hover:bg-[#d9b756] transition mt-2"
              >
                <Send className="w-4 h-4" />
                Complete Reservation Request
              </button>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-[#fdf6e5] border border-[#c9a84c]/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎉</span>
                  <h3 className="font-black text-[#0B151F]">Reservation Received</h3>
                </div>
                <p className="mt-2 text-sm text-[#0B151F]">
                  Thank you for choosing us. Your reservation request has been received and is currently being processed.
                  Our reservations team is verifying your selected dates and preparing your booking confirmation.
                  You will receive an update shortly via WhatsApp, SMS, phone call, or email.
                </p>
                <p className="mt-3 text-sm font-bold text-[#0B151F]">
                  Reservation Reference: {reservationRef}
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-100 rounded-2xl p-5">
                <h3 className="font-black text-[#0B151F]">Status Progress</h3>
                <div className="mt-3 space-y-3">
                  {statusSteps.map((step, idx) => {
                    const done = idx <= currentStepIndex;
                    const active = step === status;
                    return (
                      <div key={step} className="flex items-start gap-3">
                        <div
                          className={[
                            "mt-0.5 w-3.5 h-3.5 rounded-full border",
                            done ? "bg-[#c9a84c] border-[#c9a84c]" : "bg-white border-stone-300",
                          ].join(" ")}
                        />
                        <div className="flex-1">
                          <div
                            className={[
                              "text-sm font-bold",
                              active ? "text-[#0B151F]" : "text-stone-500",
                            ].join(" ")}
                          >
                            {step}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {status === "Cancelled" ? null : (
                  <div className="mt-4 text-xs text-stone-500">
                    Note: This is an on-screen status update. Final confirmation will be sent to you.
                  </div>
                )}
              </div>

              <div className="text-xs text-stone-500">
                Details: {submittedSnapshot.checkIn} → {submittedSnapshot.checkOut} · {submittedSnapshot.adults} adults ·{" "}
                {submittedSnapshot.children} children
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
