"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { MapPin, Menu, Phone, Star, Utensils, X, ChevronLeft, ChevronRight, Quote } from "lucide-react";

function BookTableSection({ restaurantId, theme }: { restaurantId: string; theme: any }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", guests: "2", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.date || !form.time) return;
    setStatus("loading");
    try {
      await axios.post("http://localhost:5000/api/bookings", { ...form, restaurantId });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "2", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition text-slate-800 text-sm";

  return (
    <section id="reservations" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>
            Reservations
          </span>
          <h2 className="text-4xl font-serif mt-2 text-slate-900">Book a Table</h2>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: theme.primary }} />
          <p className="text-slate-400 text-sm mt-4">Reserve your spot and we'll confirm shortly</p>
        </div>

        {status === "success" ? (
          <div className="max-w-md mx-auto text-center bg-green-50 border border-green-100 rounded-3xl p-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Booking Received!</h3>
            <p className="text-slate-500 text-sm mb-6">We've received your reservation. We'll confirm shortly.</p>
            <button
              onClick={() => setStatus("idle")}
              className="text-sm font-bold px-6 py-3 rounded-full text-white transition hover:scale-105"
              style={{ backgroundColor: theme.primary }}
            >
              Make Another Booking
            </button>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">Full Name *</label>
                <input className={inputClass} placeholder="John Doe" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">Email</label>
                <input type="email" className={inputClass} placeholder="john@email.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">Phone</label>
                <input className={inputClass} placeholder="+1 (555) 000-0000" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">Number of Guests *</label>
                <select className={inputClass} value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                  <option value="11">10+ Guests</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">Date *</label>
                <input type="date" className={inputClass} value={form.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">Time *</label>
                <select className={inputClass} value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}>
                  <option value="">Select time</option>
                  {["11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30",
                    "18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 ml-1">Special Requests</label>
                <textarea className={`${inputClass} h-24 resize-none`}
                  placeholder="Any dietary requirements, special occasions..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
            </div>

            {status === "error" && (
              <p className="text-red-500 text-sm text-center mt-4">Something went wrong. Please try again.</p>
            )}

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={status === "loading" || !form.name || !form.date || !form.time}
                className="px-12 py-4 rounded-full font-bold text-white text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                style={{ backgroundColor: theme.primary }}
              >
                {status === "loading" ? "Sending..." : "Confirm Reservation"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function MenuBookSection({ menuBook, theme }: { menuBook: any; theme: any }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = menuBook.images.filter((img: string) => img);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((p) => (p! - 1 + images.length) % images.length);
  const next = () => setLightboxIndex((p) => (p! + 1) % images.length);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section id="menubook" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>
            Browse
          </span>
          <h2 className="text-4xl font-serif mt-2 text-slate-900">
            {menuBook.title || "Our Menu"}
          </h2>
          {menuBook.subtitle && (
            <p className="text-slate-400 mt-3 text-sm">{menuBook.subtitle}</p>
          )}
          <div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: theme.primary }} />
          <p className="text-slate-400 text-xs mt-4 italic">Click any page to view full size</p>

          {menuBook.pdfUrl && (
            <a
              href={menuBook.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-sm font-bold text-white transition hover:scale-105 shadow-lg"
              style={{ backgroundColor: theme.primary }}
            >
              ↓ Download Full Menu PDF
            </a>
          )}
        </div>

        {/* Small Preview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img: string, i: number) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white aspect-[3/4]"
            >
              <img
                src={img}
                alt={`Menu page ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              {/* Page number badge */}
              <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {i + 1}
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-xs font-bold text-slate-900 shadow-lg">
                  View Page
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ✅ FULLSCREEN LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-10"
          >
            <X size={20} />
          </button>

          {/* Page counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Prev button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-10"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-3xl max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt={`Menu page ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-10"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Thumbnail strip at bottom */}
          {images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-lg px-4">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`shrink-0 w-12 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightboxIndex ? "border-white scale-110" : "border-white/20 opacity-50 hover:opacity-80"
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

export default function PublicRestaurantView() {
  const { slug } = useParams();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const reviewTimerRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/view/${slug}`);
        setRestaurant(res.data);
      } catch (err) {
        console.error("Error fetching restaurant:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPublicData();
  }, [slug]);

  // ✅ Auto-slide reviews
  useEffect(() => {
    if (!restaurant?.content?.testimonials?.length) return;
    reviewTimerRef.current = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % restaurant.content.testimonials.length);
    }, 4000);
    return () => clearInterval(reviewTimerRef.current);
  }, [restaurant]);

  const goToReview = (index: number) => {
    setActiveReview(index);
    clearInterval(reviewTimerRef.current);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-600"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-400">Restaurant not found</h1>
      </div>
    );
  }

  const theme = restaurant.theme || { primary: "#ea580c" };
  const content = restaurant.content || {};
  const menuItems = restaurant.menuItems || [];
  const categories = ["all", ...Array.from(new Set(menuItems.map((item: any) => item.category || "General"))) as string[]];
  const featuredItems = menuItems.slice(0, 3);
  const testimonials = content.testimonials || [];

  const filteredItems = activeCategory === "all"
    ? menuItems
    : menuItems.filter((item: any) => item.category === activeCategory);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Featured", href: "#featured" },
    { name: "Menu", href: "#menu" },
    { name: "Reviews", href: "#reviews" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Utensils size={24} style={{ color: scrolled ? theme.primary : "white" }} />
            <span className={`text-xl font-serif font-bold ${scrolled ? "text-slate-900" : "text-white"}`}>
              {restaurant.name}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href}
                className={`text-xs uppercase tracking-widest font-bold transition-colors hover:opacity-70 ${scrolled ? "text-slate-600" : "text-white"}`}>
                {link.name}
              </a>
            ))}
           <a href="#reservations" className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
  style={{ backgroundColor: theme.primary, color: "white" }}>
  Book Table
</a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen
              ? <X className={scrolled ? "text-slate-900" : "text-white"} />
              : <Menu className={scrolled ? "text-slate-900" : "text-white"} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl py-6 flex flex-col items-center gap-6 md:hidden border-t">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}
                className="text-slate-900 font-bold uppercase text-xs tracking-widest">{link.name}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <header className="relative h-[80vh] flex items-center justify-center text-white text-center">
        {restaurant.coverImage
          ? <img src={restaurant.coverImage} className="absolute inset-0 w-full h-full object-cover" alt="hero" />
          : <div className="absolute inset-0 bg-slate-800" />}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif mb-4 leading-tight">
            {content.heroTitle || restaurant.name}
          </h1>
          {restaurant.tagline && (
            <p className="text-lg md:text-xl uppercase tracking-[0.3em] font-light opacity-90">
              {restaurant.tagline}
            </p>
          )}
        </div>
      </header>

      {/* FEATURED DISHES */}
      {featuredItems.length > 0 && (
        <section id="featured" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>
              Chef Recommends
            </span>
            <h2 className="text-4xl font-serif mt-2">Featured Dishes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {featuredItems.map((item: any) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-6 h-80 bg-slate-100">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    alt={item.name}
                  />
                </div>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-slate-500 text-sm mt-2 line-clamp-2">{item.description}</p>
                <div className="mt-4 font-bold text-lg" style={{ color: theme.primary }}>
                  ${Number(item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ✅ IMPROVED FULL MENU SECTION */}
      <section id="menu" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>
              What We Offer
            </span>
            <h2 className="text-4xl font-serif mt-2">Explore Our Menu</h2>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: theme.primary }} />
          </div>

          {/* ✅ Category Filter Tabs */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat
                      ? "text-white shadow-lg scale-105"
                      : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"
                  }`}
                  style={activeCategory === cat ? { backgroundColor: theme.primary } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* ✅ Beautiful Menu Cards Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {/* Category badge */}
                    <span
                      className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: theme.primary }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-bold text-slate-900 text-base leading-tight mb-1">{item.name}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 flex-1">
                      {item.description || "A delicious dish crafted with fresh ingredients."}
                    </p>

                    {/* Price row */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-black" style={{ color: theme.primary }}>
                        ${Number(item.price).toFixed(2)}
                      </span>
                      <button
                        className="text-xs font-bold px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95 text-white"
                        style={{ backgroundColor: theme.primary }}
                      >
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-400 italic">Menu items are being prepared.</p>
          )}
        </div>
      </section>

{/* ✅ MENU BOOK SECTION - Click to expand */}
{content.menuBook?.images?.filter((img: string) => img).length > 0 && (
  <MenuBookSection menuBook={content.menuBook} theme={theme} />
)}

{/* BOOK TABLE */}
<BookTableSection restaurantId={restaurant.id} theme={theme} />
   
     {/* ✅ LIGHT GLASSY REVIEWS SECTION */}
{testimonials.length > 0 && (
  <section id="reviews" className="py-24 px-6 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>
          Testimonials
        </span>
        <h2 className="text-4xl font-serif text-slate-900 mt-2">What Our Guests Say</h2>
        <div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: theme.primary }} />
      </div>

      {/* Slider */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeReview * 100}%)` }}
          >
            {testimonials.map((t: any, i: number) => (
              <div key={i} className="w-full shrink-0 px-4">
                <div className="relative bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl shadow-slate-100/80 rounded-3xl p-10 text-center">
                  
                  {/* Soft color blob behind card */}
                  <div
                    className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div
                    className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full blur-3xl opacity-10 pointer-events-none"
                    style={{ backgroundColor: theme.primary }}
                  />

                  {/* Quote icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${theme.primary}15` }}
                  >
                    <Quote size={22} style={{ color: theme.primary }} />
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(Number(t.stars || 5))].map((_, s) => (
                      <Star key={s} size={16} fill={theme.primary} color={theme.primary} />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-slate-600 text-lg md:text-xl italic leading-relaxed mb-8 max-w-2xl mx-auto">
                    "{t.text}"
                  </p>

                  {/* Divider */}
                  <div className="w-12 h-px bg-slate-200 mx-auto mb-6" />

                  {/* Author */}
                  <div className="flex items-center justify-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-md"
                      style={{ backgroundColor: theme.primary }}
                    >
                      {t.name?.[0]?.toUpperCase() || "G"}
                    </div>
                    <div className="text-left">
                      <p className="text-slate-900 font-bold text-sm">{t.name}</p>
                      <p className="text-slate-400 text-xs">Verified Guest</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next buttons */}
        {testimonials.length > 1 && (
          <>
            <button
              onClick={() => goToReview((activeReview - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => goToReview((activeReview + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => goToReview(i)}
              className="transition-all duration-300 rounded-full h-2"
              style={{
                width: activeReview === i ? "24px" : "8px",
                backgroundColor: activeReview === i ? theme.primary : "#e2e8f0"
              }}
            />
          ))}
        </div>
      )}
    </div>
  </section>
)}



      {/* GALLERY */}
      {content.gallery && content.gallery.length > 0 && (
        <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-center text-3xl font-serif mb-16">The Experience</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.gallery.filter((url: string) => url !== "").map((url: string, i: number) => (
              <div key={i} className="overflow-hidden rounded-2xl h-64 bg-slate-100">
                <img src={url} className="h-full w-full object-cover hover:scale-105 transition duration-500" alt="gallery" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 space-y-6">
              <h3 className="text-3xl font-serif tracking-tight">{restaurant.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                {restaurant.tagline || "Experience culinary excellence through our carefully curated menu and cozy atmosphere."}
              </p>
              <div className="flex gap-4 pt-2">
                <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer">
                  <span className="text-[10px] font-bold">IG</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer">
                  <span className="text-[10px] font-bold">FB</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="uppercase text-[10px] font-black tracking-[0.3em] text-orange-500">Navigation</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-300">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#menu" className="hover:text-white transition">Menu</a></li>
                <li><a href="#gallery" className="hover:text-white transition">Gallery</a></li>
                <li><a href="#reviews" className="hover:text-white transition">Reviews</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="uppercase text-[10px] font-black tracking-[0.3em] text-orange-500">Opening Hours</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p className="flex justify-between border-b border-slate-900 pb-2">
                  <span>Mon — Fri</span><span>11:00 - 22:00</span>
                </p>
                <p className="flex justify-between border-b border-slate-900 pb-2">
                  <span>Sat — Sun</span><span>09:00 - 23:00</span>
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="uppercase text-[10px] font-black tracking-[0.3em] text-orange-500">Find Us</h4>
              <div className="space-y-4">
                <p className="flex items-start gap-4 text-slate-300">
                  <MapPin size={18} className="text-white shrink-0" />
                  <span className="text-sm italic leading-tight">{restaurant.contactInfo?.address || "123 Culinary Ave, Food District"}</span>
                </p>
                <p className="flex items-center gap-4 text-slate-300">
                  <Phone size={18} className="text-white shrink-0" />
                  <span className="text-sm font-bold">{restaurant.contactInfo?.phone || "+1 (555) 000-0000"}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
              © {new Date().getFullYear()} {restaurant.name}. Built with RestroBuilder.
            </p>
            <div className="flex gap-8 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}