
"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/axios";
import {
  MapPin, Menu, Phone, Star, Utensils, X, ChevronLeft, ChevronRight,
  Mail, Clock, ChevronDown, Instagram, Facebook, ArrowDown,
} from "lucide-react";
import { MessageCircle } from "lucide-react";

/* ─── SCROLL ANIMATION HOOK ─────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── FADE UP WRAPPER ───────────────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── SECTION HEADER ────────────────────────────────────────── */
function SectionHeader({
  eyebrow,
  title,
  theme,
}: {
  eyebrow: string;
  title: string;
  theme: any;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`text-center mb-16 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <span
        className="inline-block text-[10px] font-black uppercase tracking-[0.3em] mb-4"
        style={{ color: theme.primary }}
      >
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-serif text-zinc-900 mt-1">{title}</h2>
      <div
        className="w-10 h-[2px] mx-auto mt-5 rounded-full"
        style={{ backgroundColor: theme.primary }}
      />
    </div>
  );
}

/* ─── BOOK TABLE ─────────────────────────────────────────────── */
// function BookTableSection({
//   restaurantId,
//   theme,
// }: {
//   restaurantId: string;
//   theme: any;
// }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     date: "",
//     time: "",
//     guests: "2",
//     message: "",
//   });
//   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

//   const handleSubmit = async () => {
//     if (!form.name || !form.date || !form.time) return;
//     setStatus("loading");
//     try {
//       await axios.post("/api/bookings", { ...form, restaurantId });
//       setStatus("success");
//       setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "2", message: "" });
//     } catch {
//       setStatus("error");
//     }
//   };

//   const inputCls =
//     "w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl outline-none focus:border-current focus:ring-2 transition text-zinc-800 text-sm placeholder-zinc-400";

//   return (
//     <section id="reservations" className="py-24 px-6 bg-white">
//       <div className="max-w-4xl mx-auto">
//         <SectionHeader eyebrow="Reservations" title="Book a Table" theme={theme} />
//         {status === "success" ? (
//           <FadeUp>
//             <div className="max-w-sm mx-auto text-center py-16 px-8 rounded-3xl border border-zinc-100 bg-zinc-50">
//               <div
//                 className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
//                 style={{ backgroundColor: `${theme.primary}15` }}
//               >
//                 <svg
//                   className="w-7 h-7"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   style={{ color: theme.primary }}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2.5}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-zinc-900 mb-2">Booking Received!</h3>
//               <p className="text-zinc-400 text-sm mb-7">We'll confirm your reservation shortly.</p>
//               <button
//                 onClick={() => setStatus("idle")}
//                 className="text-sm font-bold px-7 py-3 rounded-xl text-white"
//                 style={{ backgroundColor: theme.primary }}
//               >
//                 Make Another
//               </button>
//             </div>
//           </FadeUp>
//         ) : (
//           <FadeUp>
//             <div className="bg-zinc-50 rounded-3xl p-8 md:p-10 border border-zinc-100">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {[
//                   { label: "Full Name *", type: "text", key: "name", placeholder: "John Doe" },
//                   { label: "Email", type: "email", key: "email", placeholder: "john@email.com" },
//                   { label: "Phone", type: "text", key: "phone", placeholder: "+1 (555) 000-0000" },
//                 ].map(({ label, type, key, placeholder }) => (
//                   <div key={key} className="space-y-1.5">
//                     <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
//                       {label}
//                     </label>
//                     <input
//                       type={type}
//                       className={inputCls}
//                       style={{ "--tw-ring-color": `${theme.primary}30` } as any}
//                       placeholder={placeholder}
//                       value={(form as any)[key]}
//                       onChange={(e) => setForm({ ...form, [key]: e.target.value })}
//                     />
//                   </div>
//                 ))}
//                 <div className="space-y-1.5">
//                   <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
//                     Guests *
//                   </label>
//                   <select
//                     className={inputCls}
//                     style={{ "--tw-ring-color": `${theme.primary}30` } as any}
//                     value={form.guests}
//                     onChange={(e) => setForm({ ...form, guests: e.target.value })}
//                   >
//                     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
//                       <option key={n} value={n}>
//                         {n} {n === 1 ? "Guest" : "Guests"}
//                       </option>
//                     ))}
//                     <option value="11">10+ Guests</option>
//                   </select>
//                 </div>
//                 <div className="space-y-1.5">
//                   <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
//                     Date *
//                   </label>
//                   <input
//                     type="date"
//                     className={inputCls}
//                     style={{ "--tw-ring-color": `${theme.primary}30` } as any}
//                     value={form.date}
//                     min={new Date().toISOString().split("T")[0]}
//                     onChange={(e) => setForm({ ...form, date: e.target.value })}
//                   />
//                 </div>
//                 <div className="space-y-1.5">
//                   <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
//                     Time *
//                   </label>
//                   <select
//                     className={inputCls}
//                     style={{ "--tw-ring-color": `${theme.primary}30` } as any}
//                     value={form.time}
//                     onChange={(e) => setForm({ ...form, time: e.target.value })}
//                   >
//                     <option value="">Select time</option>
//                     {[
//                       "11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30",
//                       "18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30",
//                     ].map((t) => (
//                       <option key={t} value={t}>
//                         {t}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="sm:col-span-2 space-y-1.5">
//                   <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
//                     Special Requests
//                   </label>
//                   <textarea
//                     className={`${inputCls} h-24 resize-none`}
//                     style={{ "--tw-ring-color": `${theme.primary}30` } as any}
//                     placeholder="Dietary requirements, special occasions…"
//                     value={form.message}
//                     onChange={(e) => setForm({ ...form, message: e.target.value })}
//                   />
//                 </div>
//               </div>
//               {status === "error" && (
//                 <p className="text-red-400 text-xs text-center mt-4">
//                   Something went wrong. Try again.
//                 </p>
//               )}
//               <div className="mt-6 flex justify-center">
//                 <button
//                   onClick={handleSubmit}
//                   disabled={status === "loading" || !form.name || !form.date || !form.time}
//                   className="px-10 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
//                   style={{ backgroundColor: theme.primary }}
//                 >
//                   {status === "loading" ? "Sending…" : "Confirm Reservation"}
//                 </button>
//               </div>
//             </div>
//           </FadeUp>
//         )}
//       </div>
//     </section>
//   );
// }


function BookTableSection({
  restaurantId,
  theme,
}: {
  restaurantId: string;
  theme: any;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.date || !form.time) return;
    setStatus("loading");
    try {
      await axios.post("/api/bookings", { ...form, restaurantId });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "2", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-current focus:ring-2 transition text-zinc-800 text-sm placeholder-zinc-400";

  return (
    <section id="reservations" className="py-24 px-6 bg-zinc-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100 grid grid-cols-1 md:grid-cols-2 min-h-[640px]">

          {/* ── LEFT: IMAGE SIDE ── */}
          <div className="relative min-h-[320px] md:min-h-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
              alt="Restaurant ambiance"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

            {/* Text content pinned to bottom */}
            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <p
                className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3"
                style={{ color: theme.primary }}
              >
                Since 1987
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                A Table for<br />
                <span className="italic font-normal" style={{ color: "#e8d5be" }}>
                  Every Occasion
                </span>
              </h2>
              <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                From intimate dinners to grand celebrations, we craft unforgettable experiences around every meal.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-5">
                {["Fine Dining", "Open Daily", "Private Events"].map((label) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-white/85 backdrop-blur-sm"
                    style={{
                      background: "rgba(255,255,255,0.13)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: theme.primary }}
                    />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: FORM SIDE ── */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            {status === "success" ? (
              <FadeUp>
                <div className="text-center py-10 px-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: `${theme.primary}15` }}
                  >
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ color: theme.primary }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">Booking Received!</h3>
                  <p className="text-zinc-400 text-sm mb-7">We'll confirm your reservation shortly.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-sm font-bold px-7 py-3 rounded-xl text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    Make Another
                  </button>
                </div>
              </FadeUp>
            ) : (
              <FadeUp>
                {/* Header */}
                <p
                  className="text-[10px] font-bold tracking-[0.16em] uppercase mb-2"
                  style={{ color: theme.primary }}
                >
                  Reservations
                </p>
                <h3 className="text-2xl font-bold text-zinc-900 mb-6">Book a Table</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name *", type: "text", key: "name", placeholder: "John Doe" },
                    { label: "Email", type: "email", key: "email", placeholder: "john@email.com" },
                    { label: "Phone", type: "text", key: "phone", placeholder: "+1 (555) 000-0000" },
                  ].map(({ label, type, key, placeholder }) => (
                    <div key={key} className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        {label}
                      </label>
                      <input
                        type={type}
                        className={inputCls}
                        style={{ "--tw-ring-color": `${theme.primary}30` } as any}
                        placeholder={placeholder}
                        value={(form as any)[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      />
                    </div>
                  ))}

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Guests *
                    </label>
                    <select
                      className={inputCls}
                      style={{ "--tw-ring-color": `${theme.primary}30` } as any}
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                      <option value="11">10+ Guests</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Date *
                    </label>
                    <input
                      type="date"
                      className={inputCls}
                      style={{ "--tw-ring-color": `${theme.primary}30` } as any}
                      value={form.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Time *
                    </label>
                    <select
                      className={inputCls}
                      style={{ "--tw-ring-color": `${theme.primary}30` } as any}
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                    >
                      <option value="">Select time</option>
                      {[
                        "11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30",
                        "18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30",
                      ].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Special Requests
                    </label>
                    <textarea
                      className={`${inputCls} h-20 resize-none`}
                      style={{ "--tw-ring-color": `${theme.primary}30` } as any}
                      placeholder="Dietary requirements, special occasions…"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs text-center mt-4">
                    Something went wrong. Try again.
                  </p>
                )}

                <div className="mt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={status === "loading" || !form.name || !form.date || !form.time}
                    className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {status === "loading" ? "Sending…" : "Confirm Reservation"}
                  </button>
                </div>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MENU BOOK ───────────────────────────────────────────────── */
function MenuBookSection({ menuBook, theme }: { menuBook: any; theme: any }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const images = menuBook.images.filter((img: string) => img);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((p) => (p! - 1 + images.length) % images.length);
  const next = () => setLightboxIndex((p) => (p! + 1) % images.length);
  const slidePrev = () => setActiveSlide((p) => Math.max(0, p - 1));
  const slideNext = () => setActiveSlide((p) => Math.min(images.length - 1, p + 1));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex]);

  const visibleCount = 3;
  const canPrev = activeSlide > 0;
  const canNext = activeSlide < images.length - visibleCount;

  return (
    <section id="menubook" className="py-24 px-6 bg-zinc-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span
              className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 block"
              style={{ color: theme.primary }}
            >
              Browse
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-zinc-900">
              {menuBook.title || "Our Menu"}
            </h2>
            {menuBook.subtitle && (
              <p className="text-zinc-400 text-sm mt-2">{menuBook.subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {menuBook.pdfUrl && (
              <a
                href={menuBook.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: theme.primary }}
              >
                ↓ Download PDF
              </a>
            )}
            {images.length > visibleCount && (
              <div className="flex gap-2">
                <button
                  onClick={slidePrev}
                  disabled={!canPrev}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                    canPrev
                      ? "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
                      : "bg-zinc-100 border-zinc-100 text-zinc-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={slideNext}
                  disabled={!canNext}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                    canNext
                      ? "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
                      : "bg-zinc-100 border-zinc-100 text-zinc-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sliding cards */}
        <div className="overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(-${activeSlide} * (33.333% + 20px/3)))`,
            }}
          >
            {images.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="group relative shrink-0 w-[calc(33.333%-14px)] rounded-2xl overflow-hidden bg-white border border-zinc-100 hover:border-zinc-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={img}
                  alt={`Page ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-600"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-white rounded-xl px-5 py-2.5 text-xs font-bold text-zinc-900 shadow-lg">
                    View Full Page
                  </div>
                </div>
                <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {images.map((_: string, i: number) => (
              <button
                key={i}
                onClick={() =>
                  setActiveSlide(Math.min(i, Math.max(0, images.length - visibleCount)))
                }
                className="transition-all duration-300 rounded-full h-1.5"
                style={{
                  width: i === activeSlide ? "20px" : "6px",
                  backgroundColor: i === activeSlide ? theme.primary : "#e4e4e7",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-10"
          >
            <X size={18} />
          </button>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {images.length}
          </div>
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-10"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          <div
            className="max-w-2xl max-h-[88vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt=""
              className="max-h-[88vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-10"
            >
              <ChevronRight size={22} />
            </button>
          )}
          {images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-lg px-4">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`shrink-0 w-12 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightboxIndex ? "border-white scale-110" : "border-white/20 opacity-50"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer({
  theme,
  restaurant,
  contactInfo,
  content,
  testimonials,
  faqs,
}: {
  theme: any;
  restaurant: any;
  contactInfo: any;
  content: any;
  testimonials: any[];
  faqs: any[];
}) {
  return (
    <footer className="relative bg-[#0a0a0a] overflow-hidden pt-16 pb-6 px-6 border-t border-white/5">
      {/* Dynamic Background Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 blur-[120px] opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top, ${theme.primary}, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.5fr_1fr_1.2fr] gap-12 lg:gap-8 mb-16">

          {/* Brand */}
          <div className="flex flex-col items-center text-center space-y-5">
            {restaurant.logo ? (
              <img
                src={restaurant.logo}
                alt="logo"
                className="w-20 h-20 object-contain drop-shadow-xl"
              />
            ) : (
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 border border-white/10"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <Utensils size={28} style={{ color: theme.primary }} />
              </div>
            )}
            <div>
              <h2
                className="font-serif text-2xl uppercase tracking-[0.15em] mb-2"
                style={{ color: theme.primary }}
              >
                {restaurant.name}
              </h2>
              <p className="text-zinc-300 font-serif italic text-md opacity-80">
                {restaurant.tagline || "Hi Foodie, Dine Anytime!"}
              </p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              {contactInfo.social?.instagram && (
                <a
                  href={contactInfo.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
                  style={{ backgroundColor: theme.primary, color: "#fff" }}
                >
                  <Instagram size={18} strokeWidth={2.5} />
                </a>
              )}
              {contactInfo.social?.facebook && (
                <a
                  href={contactInfo.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
                  style={{ backgroundColor: theme.primary, color: "#fff" }}
                >
                  <Facebook size={18} strokeWidth={2.5} />
                </a>
              )}
              <a
                href="https://wa.me/33184190997"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
                style={{ backgroundColor: theme.primary, color: "#fff" }}
              >
                <MessageCircle size={18} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:px-8">
            <h3
              className="text-[11px] font-medium uppercase tracking-[0.2em] mb-6"
              style={{ color: theme.primary }}
            >
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-2">
              {[
                { label: "Home", href: "#home" },
                ...(content.aboutUs ? [{ label: "About", href: "#about" }] : []),
                { label: "Menu", href: "#menu" },
                ...(content.gallery?.filter((u: string) => u).length > 0
                  ? [{ label: "Gallery", href: "#gallery" }]
                  : []),
                ...(testimonials?.length > 0 ? [{ label: "Reviews", href: "#reviews" }] : []),
                ...(faqs?.length > 0 ? [{ label: "FAQ", href: "#contact" }] : []),
                { label: "Reservations", href: "#reservations" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-zinc-300 text-sm hover:text-white transition-colors block"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              {content.categories
                ?.filter((c: any) => c.isVisible)
                .slice(0, 3)
                .map((category: any) => (
                  <li key={category.categorySlug}>
                    <a
                      href={`/${category.categorySlug}`}
                      className="text-zinc-300 text-sm hover:text-white transition-colors block capitalize"
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3
              className="text-[11px] font-medium uppercase tracking-[0.2em] mb-6"
              style={{ color: theme.primary }}
            >
              Hours
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center gap-4">
                <span className="text-zinc-300">Mon – Fri</span>
                <span className="text-zinc-100 tabular-nums">
                  {contactInfo.hours?.weekdays || "10:00 – 22:00"}
                </span>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-zinc-500" />
                  <span className="text-zinc-300">Sat – Sun</span>
                </div>
                <span className="text-zinc-100 tabular-nums">
                  {contactInfo.hours?.weekends || "09:00 – 23:00"}
                </span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-[11px] font-medium uppercase tracking-[0.2em] mb-6"
              style={{ color: theme.primary }}
            >
              Find Us
            </h3>
            <div className="space-y-5 text-sm text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: theme.primary }} />
                <span className="leading-relaxed">
                  {contactInfo.address || "Mohali sec 118, Chandigarh"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" style={{ color: theme.primary }} />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-white transition tabular-nums"
                >
                  {contactInfo.phone || "234567890"}
                </a>
              </div>
              {contactInfo.email && (
                <div className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0" style={{ color: theme.primary }} />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-white transition truncate"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-zinc-500 uppercase tracking-widest">
            © {new Date().getFullYear()} {restaurant.name} · Built with RestroBuilder
          </p>
          <div className="flex gap-6 text-[11px] text-zinc-500 uppercase tracking-widest">
            <a href="#" className="hover:text-zinc-400 transition">Privacy</a>
            <a href="#" className="hover:text-zinc-400 transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────────────── */
export default function PublicRestaurantView() {
  const { slug } = useParams();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const reviewTimerRef = useRef<any>(null);



const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
  open: false,
  index: 0,
});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const res = await axios.get(`/api/view/${slug}`);
        setRestaurant(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPublicData();
  }, [slug]);

  useEffect(() => {
    if (!restaurant?.content?.testimonials?.length) return;
    reviewTimerRef.current = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % restaurant.content.testimonials.length);
    }, 4500);
    return () => clearInterval(reviewTimerRef.current);
  }, [restaurant]);

  const goToReview = (index: number) => {
    setActiveReview(index);
    clearInterval(reviewTimerRef.current);
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 gap-4">
        <div className="relative w-12 h-12">
          <div
            className="absolute inset-0 rounded-full border-2 border-zinc-200 border-t-current animate-spin"
            style={{ borderTopColor: "#ea580c" }}
          />
          <Utensils size={18} className="absolute inset-0 m-auto text-zinc-400" />
        </div>
        <p className="text-zinc-400 text-xs uppercase tracking-widest font-medium animate-pulse">
          Loading…
        </p>
      </div>
    );

  if (!restaurant)
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <p className="text-zinc-400 font-medium">Restaurant not found</p>
      </div>
    );

  const theme = restaurant.theme || { primary: "#ea580c" };
  const content = restaurant.content || {};
  const menuItems = restaurant.menuItems || [];
  const categories = [
    "all",
    ...(Array.from(
      new Set(menuItems.map((item: any) => item.category || "General"))
    ) as string[]),
  ];
  const featuredItems = menuItems.slice(0, 3);
  const testimonials = content.testimonials || [];
  const faqs = content.faqs || [];
  const contactInfo = restaurant.contactInfo || {};
  const hasContact = !!(contactInfo.address || contactInfo.phone || contactInfo.email);

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item: any) => item.category === activeCategory);

  const navLinks = [
    { name: "Home", href: "#home" },
    ...(content.aboutUs ? [{ name: "About", href: "#about" }] : []),
    { name: "Menu", href: "#menu" },
    ...(testimonials.length > 0 ? [{ name: "Reviews", href: "#reviews" }] : []),
    ...(content.gallery?.filter((u: string) => u).length > 0
      ? [{ name: "Gallery", href: "#gallery" }]
      : []),
    ...(hasContact || faqs.length > 0 ? [{ name: "Contact", href: "#contact" }] : []),
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-zinc-100 py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            {restaurant.logo ? (
              <img
                src={restaurant.logo}
                alt="logo"
                className="w-8 h-8 object-contain rounded-lg"
              />
            ) : (
              <Utensils
                size={18}
                style={{ color: scrolled ? theme.primary : "white" }}
              />
            )}
            <span
              className={`font-serif text-lg font-bold tracking-tight transition-colors ${
                scrolled ? "text-zinc-900" : "text-white"
              }`}
            >
              {restaurant.name}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.15em] font-semibold transition-all hover:opacity-50 ${
                  scrolled ? "text-zinc-500" : "text-white/80"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#reservations"
              className="px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: theme.primary }}
            >
              Book Table
            </a>
          </div>

          <button className="md:hidden p-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X size={20} className={scrolled ? "text-zinc-900" : "text-white"} />
            ) : (
              <Menu size={20} className={scrolled ? "text-zinc-900" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-t border-zinc-100 overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 py-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-zinc-700 font-semibold text-xs uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#reservations"
              onClick={() => setIsMenuOpen(false)}
              className="px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: theme.primary }}
            >
              Book Table
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <header id="home" className="relative h-screen min-h-[660px] overflow-hidden bg-zinc-950">
        {restaurant.coverImage ? (
          <img
            src={restaurant.coverImage}
            className="absolute inset-0 w-full h-full object-cover scale-105 animate-[pulse_12s_ease-in-out_infinite]"
            alt="hero"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900" />
        )}

        <div className="absolute inset-0 bg-black/25" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 70% 42%, rgba(255,255,255,0.08), transparent 28%), linear-gradient(90deg, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.16) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

        <div
          className="absolute -left-24 top-32 h-72 w-72 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ backgroundColor: theme.primary }}
        />
        <div className="absolute right-16 bottom-20 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div className="relative max-w-2xl">
              <div
                className="absolute -inset-px rounded-[2rem] opacity-45"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}70, rgba(255,255,255,0.18), transparent)`,
                }}
              />
              <div className="ml-auto max-w-2xl rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-lg shadow-2xl shadow-black/25 p-7 md:p-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
                <div className="relative">
                  {restaurant.tagline && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-4 py-2 mb-6">
                      <span
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <p className="text-white/80 text-[11px] uppercase tracking-[0.22em] font-semibold">
                        {restaurant.tagline}
                      </p>
                    </div>
                  )}
                  <h1 className="text-5xl md:text-7xl font-serif text-white leading-[0.95] tracking-tight drop-shadow-2xl">
                    {content.heroTitle || restaurant.name}
                  </h1>
                  <p className="mt-6 max-w-lg text-white/60 text-sm md:text-base leading-relaxed">
                    Discover a warm Food experience crafted around memorable flavors, elegant
                    ambience, and moments worth sharing.
                  </p>
                  <div className="mt-9 flex flex-wrap items-center gap-3">
                    <a
                      href="#menu"
                      className="group px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
                      style={{
                        backgroundColor: theme.primary,
                        boxShadow: `0 18px 40px ${theme.primary}35`,
                      }}
                    >
                      View Menu
                      <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                    <a
                      href="#reservations"
                      className="px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-wide text-white border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/20"
                    >
                      Reserve a Table
                    </a>
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                      <p className="text-white text-lg font-black">{menuItems.length || "Fresh"}</p>
                      <p className="text-white/45 text-[10px] uppercase tracking-widest">Dishes</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                      <p className="text-white text-lg font-black">
                        {testimonials.length || "5"}★
                      </p>
                      <p className="text-white/45 text-[10px] uppercase tracking-widest">Reviews</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                      <p className="text-white text-lg font-black">Book</p>
                      <p className="text-white/45 text-[10px] uppercase tracking-widest">Online</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35">
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
          <ArrowDown size={14} className="animate-bounce" />
        </div>
      </header>

      {/* ── ABOUT US ───────────────────────────────────────────── */}
      {content.aboutUs && (
        <section id="about" className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeUp>
                <span
                  className="text-[10px] font-black uppercase tracking-[0.3em]"
                  style={{ color: theme.primary }}
                >
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-zinc-900 mt-3 mb-5 leading-snug">
                  About Us
                </h2>
                <div
                  className="w-8 h-[2px] rounded-full mb-7"
                  style={{ backgroundColor: theme.primary }}
                />
                <p className="text-zinc-500 text-[15px] leading-relaxed whitespace-pre-line">
                  {content.aboutUs}
                </p>
              </FadeUp>
              <FadeUp delay={120}>
                <div className="relative">
                  {restaurant.coverImage ? (
                    <>
                      <img
                        src={restaurant.coverImage}
                        alt={restaurant.name}
                        className="w-full h-[380px] object-cover rounded-2xl shadow-lg"
                      />
                      <div
                        className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10"
                        style={{ backgroundColor: `${theme.primary}15` }}
                      />
                    </>
                  ) : (
                    <div
                      className="w-full h-[380px] rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${theme.primary}08` }}
                    >
                      <Utensils size={48} style={{ color: theme.primary, opacity: 0.2 }} />
                    </div>
                  )}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURED DISHES ────────────────────────────────────── */}
      {featuredItems.length > 0 && (
        <section id="featured" className="py-24 px-6 bg-zinc-50">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Chef Recommends" title="Featured Dishes" theme={theme} />
            <div className="grid md:grid-cols-3 gap-7">
              {featuredItems.map((item: any, idx: number) => (
                <FadeUp key={item.id} delay={idx * 80}>
                  <div className="group cursor-default">
                    <div className="relative overflow-hidden rounded-2xl h-72 bg-zinc-200">
                      <img
                        src={
                          item.image ||
                          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                        }
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                        alt={item.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div
                        className="absolute top-4 left-4 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black"
                        style={{ backgroundColor: theme.primary }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5">
                        <span className="font-black text-sm" style={{ color: theme.primary }}>
                          ${Number(item.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="pt-5">
                      <h3 className="font-bold text-zinc-900 text-lg mb-1.5">{item.name}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FULL MENU ──────────────────────────────────────────── */}
      <section id="menu" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="What We Offer" title="Explore Our Menu" theme={theme} />
          {categories.length > 1 && (
            <FadeUp>
              <div className="flex flex-wrap justify-center gap-2.5 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      activeCategory === cat
                        ? "text-white shadow-md"
                        : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                    }`}
                    style={activeCategory === cat ? { backgroundColor: theme.primary } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </FadeUp>
          )}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredItems.map((item: any, idx: number) => (
                <FadeUp key={item.id} delay={Math.min(idx * 40, 320)}>
                  <div className="bg-white rounded-2xl overflow-hidden border border-zinc-100 hover:border-zinc-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div className="relative h-48 bg-zinc-100 overflow-hidden">
                      <img
                        src={
                          item.image ||
                          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                      <span
                        className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg text-white"
                        style={{ backgroundColor: theme.primary }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="font-bold text-zinc-900 text-sm mb-1.5">{item.name}</h4>
                      <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 flex-1">
                        {item.description || "A delicious dish crafted with fresh ingredients."}
                      </p>
                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-50">
                        <span className="text-lg font-black" style={{ color: theme.primary }}>
                          ${Number(item.price).toFixed(2)}
                        </span>
                        <button
                          className="text-xs font-bold px-4 py-1.5 rounded-lg transition-all hover:opacity-90 text-white"
                          style={{ backgroundColor: theme.primary }}
                        >
                          Order
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Utensils size={36} className="mx-auto mb-3 text-zinc-200" />
              <p className="text-zinc-400 text-sm">Menu items are being prepared.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── MENU BOOK ──────────────────────────────────────────── */}
      {content.menuBook?.images?.filter((img: string) => img).length > 0 && (
        <MenuBookSection menuBook={content.menuBook} theme={theme} />
      )}

      {/* ── BOOK TABLE ─────────────────────────────────────────── */}
      <BookTableSection restaurantId={restaurant.id} theme={theme} />

      {/* ── REVIEWS ────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section id="reviews" className="py-24 px-6 bg-zinc-50">
          <div className="max-w-3xl mx-auto">
            <SectionHeader eyebrow="Testimonials" title="What Guests Say" theme={theme} />
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-600 ease-in-out"
                  style={{ transform: `translateX(-${activeReview * 100}%)` }}
                >
                  {testimonials.map((t: any, i: number) => (
                    <div key={i} className="w-full shrink-0 px-1">
                      <div className="bg-white rounded-2xl border border-zinc-100 p-10 text-center shadow-sm">
                        <div className="flex justify-center gap-1 mb-6">
                          {[...Array(Number(t.stars || 5))].map((_, s) => (
                            <Star key={s} size={15} fill={theme.primary} color={theme.primary} />
                          ))}
                        </div>
                        <p className="text-zinc-600 text-lg font-serif italic leading-relaxed mb-8">
                          "{t.text}"
                        </p>
                        <div className="flex items-center justify-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: theme.primary }}
                          >
                            {t.name?.[0]?.toUpperCase() || "G"}
                          </div>
                          <div className="text-left">
                            <p className="text-zinc-900 font-bold text-sm">{t.name}</p>
                            <p className="text-zinc-400 text-xs mt-0.5">Verified Guest</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      goToReview((activeReview - 1 + testimonials.length) % testimonials.length)
                    }
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-xl bg-white border border-zinc-200 shadow-sm hover:shadow-md text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => goToReview((activeReview + 1) % testimonials.length)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-xl bg-white border border-zinc-200 shadow-sm hover:shadow-md text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => goToReview(i)}
                    className="transition-all duration-300 rounded-full h-1.5"
                    style={{
                      width: activeReview === i ? "24px" : "6px",
                      backgroundColor: activeReview === i ? theme.primary : "#e4e4e7",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── GALLERY ────────────────────────────────────────────── */}
  
{content.gallery && content.gallery.filter((u: string) => u).length > 0 && (
  <section id="gallery" className="py-24 px-6 bg-white overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <SectionHeader eyebrow="Visual Story" title="The Experience" theme={theme} />

      {/* Masonry grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {content.gallery
          .filter((url: string) => url !== "")
          .map((url: string, i: number) => (
            <FadeUp key={i} delay={i * 80}>
              <div
                className="group relative overflow-hidden rounded-2xl bg-zinc-100 cursor-pointer break-inside-avoid"
                style={{ animationDelay: `${i * 80}ms` }}
                onClick={() => setLightbox({ open: true, index: i })}
              >
                <img
                  src={url}
                  className="w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
                  alt={`gallery ${i + 1}`}
                  loading="lazy"
                />
                {/* Hover shimmer overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}22 0%, ${theme.primary}44 100%)`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
                    style={{ backgroundColor: `${theme.primary}cc` }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightbox({ open: false, index: 0 })}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            onClick={() => setLightbox({ open: false, index: 0 })}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            onClick={(e) => {
              e.stopPropagation();
              const imgs = content.gallery.filter((u: string) => u !== "");
              setLightbox((prev) => ({ ...prev, index: (prev.index - 1 + imgs.length) % imgs.length }));
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <img
            src={content.gallery.filter((u: string) => u !== "")[lightbox.index]}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            alt={`gallery ${lightbox.index + 1}`}
          />

          {/* Next */}
          <button
            className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            onClick={(e) => {
              e.stopPropagation();
              const imgs = content.gallery.filter((u: string) => u !== "");
              setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % imgs.length }));
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-5 flex gap-1.5">
            {content.gallery
              .filter((u: string) => u !== "")
              .map((_: string, i: number) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox((prev) => ({ ...prev, index: i })); }}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{
                    backgroundColor: i === lightbox.index ? theme.primary : "rgba(255,255,255,0.35)",
                    transform: i === lightbox.index ? "scale(1.4)" : "scale(1)",
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  </section>
)}
      {/* ── CONTACT + FAQ ──────────────────────────────────────── */}
      {(hasContact || faqs.length > 0) && (
        <section id="contact" className="py-24 px-6 bg-zinc-50">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow={
                hasContact && faqs.length > 0
                  ? "Contact & FAQ"
                  : hasContact
                  ? "Get in Touch"
                  : "Questions"
              }
              title={
                hasContact && faqs.length > 0
                  ? "Find Us & Get Answers"
                  : hasContact
                  ? "Contact & Location"
                  : "Frequently Asked"
              }
              theme={theme}
            />
            <div className="grid md:grid-cols-2 gap-10 items-start">
              {hasContact && (
                <FadeUp>
                  <div className="space-y-3">
                    <p
                      className="text-[10px] font-black uppercase tracking-[0.3em] mb-5"
                      style={{ color: theme.primary }}
                    >
                      Get in Touch
                    </p>
                    {contactInfo.address && (
                      <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-zinc-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                        <div
                          className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: `${theme.primary}10` }}
                        >
                          <MapPin size={18} style={{ color: theme.primary }} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider mb-1">
                            Address
                          </p>
                          <p className="text-zinc-700 text-sm leading-relaxed">
                            {contactInfo.address}
                          </p>
                        </div>
                      </div>
                    )}
                    {contactInfo.phone && (
                      <div className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-zinc-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                        <div
                          className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: `${theme.primary}10` }}
                        >
                          <Phone size={18} style={{ color: theme.primary }} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider mb-1">
                            Phone
                          </p>
                          <a
                            href={`tel:${contactInfo.phone}`}
                            className="text-zinc-700 text-sm font-medium hover:text-zinc-900 transition"
                          >
                            {contactInfo.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    {contactInfo.email && (
                      <div className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-zinc-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                        <div
                          className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: `${theme.primary}10` }}
                        >
                          <Mail size={18} style={{ color: theme.primary }} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider mb-1">
                            Email
                          </p>
                          <a
                            href={`mailto:${contactInfo.email}`}
                            className="text-zinc-700 text-sm font-medium hover:text-zinc-900 transition break-all"
                          >
                            {contactInfo.email}
                          </a>
                        </div>
                      </div>
                    )}
                    {(contactInfo.hours?.weekdays || contactInfo.hours?.weekends) && (
                      <div className="bg-white rounded-2xl p-5 border border-zinc-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: `${theme.primary}10` }}
                          >
                            <Clock size={16} style={{ color: theme.primary }} />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                            Opening Hours
                          </p>
                        </div>
                        <div className="space-y-3">
                          {contactInfo.hours?.weekdays && (
                            <div className="flex justify-between pb-3 border-b border-zinc-50">
                              <span className="text-zinc-500 text-sm">Mon — Fri</span>
                              <span className="font-bold text-zinc-800 text-sm">
                                {contactInfo.hours.weekdays}
                              </span>
                            </div>
                          )}
                          {contactInfo.hours?.weekends && (
                            <div className="flex justify-between">
                              <span className="text-zinc-500 text-sm">Sat — Sun</span>
                              <span className="font-bold text-zinc-800 text-sm">
                                {contactInfo.hours.weekends}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </FadeUp>
              )}

              {faqs.length > 0 && (
                <FadeUp delay={100}>
                  <div className="space-y-2">
                    <p
                      className="text-[10px] font-black uppercase tracking-[0.3em] mb-5"
                      style={{ color: theme.primary }}
                    >
                      Frequently Asked
                    </p>
                    {faqs.map((faq: any, i: number) => (
                      <div
                        key={i}
                        className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                          openFaq === i
                            ? "border-zinc-200 bg-white shadow-sm"
                            : "border-zinc-100 bg-white"
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                        >
                          <span className="font-semibold text-zinc-800 text-sm">
                            {faq.question}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`shrink-0 transition-transform duration-300 ${
                              openFaq === i ? "rotate-180" : "text-zinc-300"
                            }`}
                            style={openFaq === i ? { color: theme.primary } : {}}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            openFaq === i ? "max-h-96" : "max-h-0"
                          }`}
                        >
                          <p className="px-5 pb-5 text-zinc-500 text-sm leading-relaxed border-t border-zinc-50 pt-3">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeUp>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <Footer
        theme={theme}
        restaurant={restaurant}
        contactInfo={contactInfo}
        content={content}
        testimonials={testimonials}
        faqs={faqs}
      />
    </div>
  );
}