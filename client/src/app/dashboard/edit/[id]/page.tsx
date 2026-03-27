// "use client";
// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { 
//   Save, ArrowLeft, Layout, Eye, Palette, Image as ImageIcon, Star, Plus, Trash2 
// } from "lucide-react";

// export default function FullRestaurantEditor() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     tagline: "",
//     coverImage: "",
//     logo: "",
//     slug: "",
//     isPublished: true,
//     theme: { primary: "#ea580c", font: "Inter" },
//     contactInfo: { address: "", phone: "", email: "" },
//     content: { 
//       heroTitle: "", 
//       aboutUs: "", 
//       gallery: [""], 
//       testimonials: [{ name: "", text: "", stars: 5 }] 
//     }
//   });

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`http://localhost:5000/api/my-restaurants`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const current = res.data.find((r: any) => r.id === id);
//         if (current) {
//           setFormData({
//             ...current,
//             theme: current.theme || { primary: "#ea580c", font: "Inter" },
//             contactInfo: current.contactInfo || { address: "", phone: "", email: "" },
//             content: {
//               heroTitle: current.content?.heroTitle || "",
//               aboutUs: current.content?.aboutUs || "",
//               gallery: current.content?.gallery || [""],
//               testimonials: current.content?.testimonials || [{ name: "", text: "", stars: 5 }]
//             }
//           });
//         }
//       } catch (err) { console.error(err); } finally { setLoading(false); }
//     };
//     if (id) fetchDetails();
//   }, [id]);

//   // --- Dynamic Array Handlers ---

//   // Gallery Helpers
//   const addGalleryImage = () => {
//     setFormData({
//       ...formData,
//       content: { ...formData.content, gallery: [...formData.content.gallery, ""] }
//     });
//   };

//   const removeGalleryImage = (index: number) => {
//     const newGallery = formData.content.gallery.filter((_, i) => i !== index);
//     setFormData({
//       ...formData,
//       content: { ...formData.content, gallery: newGallery }
//     });
//   };

//   // Testimonial Helpers
//   const addTestimonial = () => {
//     setFormData({
//       ...formData,
//       content: { 
//         ...formData.content, 
//         testimonials: [...formData.content.testimonials, { name: "", text: "", stars: 5 }] 
//       }
//     });
//   };

//   const removeTestimonial = (index: number) => {
//     const newT = formData.content.testimonials.filter((_, i) => i !== index);
//     setFormData({
//       ...formData,
//       content: { ...formData.content, testimonials: newT }
//     });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem("token");
//       await axios.patch(`http://localhost:5000/api/restaurants/${id}`, formData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert("Website Updated Successfully!");
//     } catch (err) { alert("Failed to save."); } finally { setSaving(false); }
//   };

//   if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-600"></div></div>;

//   return (
//     <div className="min-h-screen bg-slate-50 pb-20">
//       <nav className="sticky top-0 z-50 bg-white border-b px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-slate-100 rounded-full"><ArrowLeft size={20} /></button>
//           <h1 className="font-bold text-xl">Design Your Website</h1>
//         </div>
//         <button onClick={handleSave} className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-orange-700 transition">
//           <Save size={18} /> {saving ? "Saving..." : "Save Changes"}
//         </button>
//       </nav>

//       <main className="max-w-6xl mx-auto mt-8 px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
//         <div className="lg:col-span-8 space-y-6">
          
//           {/* Header & Hero */}
//           <section className="bg-white p-8 rounded-3xl shadow-sm border">
//             <h2 className="text-sm font-black uppercase text-slate-400 mb-6 flex items-center gap-2"><Layout size={16} /> Header & Hero</h2>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-slate-500 ml-1">Restaurant Name</label>
//                   <input className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-100 outline-none" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
//                 </div>
//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-slate-500 ml-1">Hero Title</label>
//                   <input className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-100 outline-none" placeholder="Hero Title" value={formData.content.heroTitle} onChange={(e) => setFormData({...formData, content: {...formData.content, heroTitle: e.target.value}})} />
//                 </div>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-slate-500 ml-1">Cover Image URL</label>
//                 <input className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-100 outline-none" placeholder="https://..." value={formData.coverImage} onChange={(e) => setFormData({...formData, coverImage: e.target.value})} />
//               </div>
//             </div>
//           </section>

//           {/* Gallery Section */}
//           <section className="bg-white p-8 rounded-3xl shadow-sm border">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-sm font-black uppercase text-slate-400 flex items-center gap-2"><ImageIcon size={16} /> Gallery Images</h2>
//               <button onClick={addGalleryImage} className="flex items-center gap-1 text-xs font-bold bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition">
//                 <Plus size={14} /> Add Image
//               </button>
//             </div>
//             <div className="space-y-3">
//               {formData.content.gallery.map((url, idx) => (
//                 <div key={idx} className="flex gap-2">
//                   <input 
//                     className="flex-1 p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-100 outline-none" 
//                     placeholder="Image URL" 
//                     value={url} 
//                     onChange={(e) => {
//                       const newGallery = [...formData.content.gallery];
//                       newGallery[idx] = e.target.value;
//                       setFormData({...formData, content: {...formData.content, gallery: newGallery}});
//                     }} 
//                   />
//                   <button onClick={() => removeGalleryImage(idx)} className="p-3 text-slate-400 hover:text-red-500 transition">
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Testimonials */}
//           <section className="bg-white p-8 rounded-3xl shadow-sm border">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-sm font-black uppercase text-slate-400 flex items-center gap-2"><Star size={16} /> Guest Reviews</h2>
//               <button onClick={addTestimonial} className="flex items-center gap-1 text-xs font-bold bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition">
//                 <Plus size={14} /> Add Review
//               </button>
//             </div>
//             {formData.content.testimonials.map((t, idx) => (
//               <div key={idx} className="relative space-y-3 mb-6 p-5 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl">
//                 <button onClick={() => removeTestimonial(idx)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition">
//                   <Trash2 size={18} />
//                 </button>
//                 <div className="w-1/2">
//                   <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Guest Name</label>
//                   <input className="w-full p-2 bg-white border rounded-lg outline-none" placeholder="John Doe" value={t.name} onChange={(e) => {
//                     const newT = [...formData.content.testimonials];
//                     newT[idx].name = e.target.value;
//                     setFormData({...formData, content: {...formData.content, testimonials: newT}});
//                   }} />
//                 </div>
//                 <div>
//                   <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Review</label>
//                   <textarea className="w-full p-2 bg-white border rounded-lg outline-none h-20" placeholder="Fantastic food..." value={t.text} onChange={(e) => {
//                     const newT = [...formData.content.testimonials];
//                     newT[idx].text = e.target.value;
//                     setFormData({...formData, content: {...formData.content, testimonials: newT}});
//                   }} />
//                 </div>
//               </div>
//             ))}
//           </section>
//         </div>

//         {/* Sidebar */}
//         <div className="lg:col-span-4 space-y-6">
//           <section className="bg-white p-6 rounded-3xl shadow-sm border">
//             <h2 className="text-sm font-black uppercase text-slate-400 mb-4 flex items-center gap-2"><Palette size={16} /> Brand Color</h2>
//             <div className="flex items-center gap-4">
//                <input type="color" className="w-16 h-12 rounded-lg cursor-pointer bg-transparent" value={formData.theme.primary} onChange={(e) => setFormData({...formData, theme: {...formData.theme, primary: e.target.value}})} />
//                <span className="font-mono text-sm text-slate-500 uppercase">{formData.theme.primary}</span>
//             </div>
//           </section>
//           <a href={`/view/${formData.slug}`} target="_blank" className="flex items-center justify-center gap-2 w-full p-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition shadow-xl shadow-slate-200">
//             <Eye size={18} /> View Live Site
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  Save, ArrowLeft, Layout, Eye, Palette, Image as ImageIcon, Star, Plus, Trash2,
  BookOpen, Link, Upload, X
} from "lucide-react";

export default function FullRestaurantEditor() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [menuImageMode, setMenuImageMode] = useState<"url" | "upload">("url");

  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    coverImage: "",
    logo: "",
    slug: "",
    isPublished: true,
    theme: { primary: "#ea580c", font: "Inter" },
    contactInfo: { address: "", phone: "", email: "" },
    content: {
      heroTitle: "",
      aboutUs: "",
      gallery: [""],
      testimonials: [{ name: "", text: "", stars: 5 }],
      menuBook: {           // ✅ new
        title: "Our Menu",
        subtitle: "Freshly prepared with love",
        images: [] as string[],
        pdfUrl: "",
        style: "grid" as "grid" | "scroll" | "book"
      }
    }
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/my-restaurants`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const current = res.data.find((r: any) => r.id === id);
        if (current) {
          setFormData({
            ...current,
            theme: current.theme || { primary: "#ea580c", font: "Inter" },
            contactInfo: current.contactInfo || { address: "", phone: "", email: "" },
            content: {
              heroTitle: current.content?.heroTitle || "",
              aboutUs: current.content?.aboutUs || "",
              gallery: current.content?.gallery || [""],
              testimonials: current.content?.testimonials || [{ name: "", text: "", stars: 5 }],
              menuBook: current.content?.menuBook || {
                title: "Our Menu",
                subtitle: "Freshly prepared with love",
                images: [],
                pdfUrl: "",
                style: "grid"
              }
            }
          });
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    if (id) fetchDetails();
  }, [id]);

  // --- Gallery Helpers ---
  const addGalleryImage = () =>
    setFormData({ ...formData, content: { ...formData.content, gallery: [...formData.content.gallery, ""] } });

  const removeGalleryImage = (index: number) =>
    setFormData({ ...formData, content: { ...formData.content, gallery: formData.content.gallery.filter((_, i) => i !== index) } });

  // --- Testimonial Helpers ---
  const addTestimonial = () =>
    setFormData({ ...formData, content: { ...formData.content, testimonials: [...formData.content.testimonials, { name: "", text: "", stars: 5 }] } });

  const removeTestimonial = (index: number) =>
    setFormData({ ...formData, content: { ...formData.content, testimonials: formData.content.testimonials.filter((_, i) => i !== index) } });

  // --- Menu Book Helpers ---
  const updateMenuBook = (field: string, value: any) =>
    setFormData({ ...formData, content: { ...formData.content, menuBook: { ...formData.content.menuBook, [field]: value } } });

  const addMenuImageUrl = () =>
    updateMenuBook("images", [...formData.content.menuBook.images, ""]);

  const updateMenuImageUrl = (index: number, value: string) => {
    const newImages = [...formData.content.menuBook.images];
    newImages[index] = value;
    updateMenuBook("images", newImages);
  };

  const removeMenuImage = (index: number) =>
    updateMenuBook("images", formData.content.menuBook.images.filter((_: any, i: number) => i !== index));

  const handleMenuImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateMenuBook("images", [...formData.content.menuBook.images, reader.result as string]);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5000/api/restaurants/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Website Updated Successfully!");
    } catch (err) { alert("Failed to save."); } finally { setSaving(false); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-600"></div>
    </div>
  );

  const menuBook = formData.content.menuBook;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="sticky top-0 z-50 bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-xl">Design Your Website</h1>
        </div>
        <button onClick={handleSave} className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-orange-700 transition">
          <Save size={18} /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </nav>

      <main className="max-w-6xl mx-auto mt-8 px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">

          {/* Header & Hero */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border">
            <h2 className="text-sm font-black uppercase text-slate-400 mb-6 flex items-center gap-2">
              <Layout size={16} /> Header & Hero
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-1">Restaurant Name</label>
                  <input className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-100 outline-none" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-1">Hero Title</label>
                  <input className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-100 outline-none" placeholder="Hero Title" value={formData.content.heroTitle} onChange={(e) => setFormData({ ...formData, content: { ...formData.content, heroTitle: e.target.value } })} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1">Cover Image URL</label>
                <input className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-100 outline-none" placeholder="https://..." value={formData.coverImage} onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })} />
              </div>
            </div>
          </section>

          {/* ✅ MENU BOOK SECTION */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black uppercase text-slate-400 flex items-center gap-2">
                <BookOpen size={16} /> Menu Book / Menu Page
              </h2>
              {/* Live mini preview badge */}
              <span className="text-[10px] font-bold bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100">
                Shows on frontend
              </span>
            </div>

            {/* Title + Subtitle */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Section Title</label>
                <input
                  className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-100 outline-none"
                  placeholder="e.g. Our Menu"
                  value={menuBook.title}
                  onChange={(e) => updateMenuBook("title", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Subtitle</label>
                <input
                  className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-100 outline-none"
                  placeholder="e.g. Freshly prepared with love"
                  value={menuBook.subtitle}
                  onChange={(e) => updateMenuBook("subtitle", e.target.value)}
                />
              </div>
            </div>

            {/* Display Style */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-500 block mb-3">Display Style</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "grid", label: "Grid", desc: "2-column photo grid" },
                  { value: "scroll", label: "Scroll", desc: "Horizontal scroll" },
                  { value: "book", label: "Book", desc: "Full-width pages" },
                ].map((style) => (
                  <button
                    key={style.value}
                    onClick={() => updateMenuBook("style", style.value)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      menuBook.style === style.value
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-100 hover:border-slate-200 bg-slate-50"
                    }`}
                  >
                    <p className={`text-sm font-bold ${menuBook.style === style.value ? "text-orange-600" : "text-slate-700"}`}>
                      {style.label}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{style.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* PDF URL */}
            <div className="mb-6 space-y-1">
              <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Link size={12} /> Menu PDF Link (optional)
              </label>
              <input
                className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-100 outline-none"
                placeholder="https://your-menu.pdf"
                value={menuBook.pdfUrl}
                onChange={(e) => updateMenuBook("pdfUrl", e.target.value)}
              />
              <p className="text-[10px] text-slate-400 ml-1">A "Download Menu" button will appear on the frontend</p>
            </div>

            {/* Image Upload Toggle */}
            <div className="mb-4">
              <label className="text-xs font-bold text-slate-500 block mb-3">Menu Images</label>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setMenuImageMode("url")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    menuImageMode === "url" ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  <Link size={12} /> Paste URL
                </button>
                <button
                  onClick={() => setMenuImageMode("upload")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    menuImageMode === "upload" ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  <Upload size={12} /> Upload Image
                </button>
              </div>

              {/* URL Mode */}
              {menuImageMode === "url" && (
                <div className="space-y-3">
                  {menuBook.images.map((img: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        className="flex-1 p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-100 outline-none text-sm"
                        placeholder="https://image-url.jpg"
                        value={img}
                        onChange={(e) => updateMenuImageUrl(idx, e.target.value)}
                      />
                      <button onClick={() => removeMenuImage(idx)} className="p-3 text-slate-400 hover:text-red-500 transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addMenuImageUrl}
                    className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-4 py-2 rounded-xl hover:bg-orange-100 transition"
                  >
                    <Plus size={14} /> Add Image URL
                  </button>
                </div>
              )}

              {/* Upload Mode */}
              {menuImageMode === "upload" && (
                <div className="space-y-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-orange-200 rounded-2xl bg-orange-50/30 hover:bg-orange-50 cursor-pointer transition group">
                    <Upload size={24} className="text-orange-300 group-hover:text-orange-500 transition mb-2" />
                    <span className="text-xs font-bold text-orange-400 group-hover:text-orange-600">Click to upload menu image</span>
                    <span className="text-[10px] text-slate-400 mt-1">JPG, PNG, WEBP up to 5MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => { const file = e.target.files?.[0]; if (file) handleMenuImageUpload(file); }}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Image Previews */}
            {menuBook.images.length > 0 && (
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-3">Preview ({menuBook.images.length} image{menuBook.images.length > 1 ? "s" : ""})</label>
                <div className="grid grid-cols-3 gap-3">
                  {menuBook.images.filter((img: string) => img).map((img: string, idx: number) => (
                    <div key={idx} className="relative group rounded-2xl overflow-hidden h-28 bg-slate-100">
                      <img src={img} alt={`Menu ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeMenuImage(idx)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={12} />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Gallery Section */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black uppercase text-slate-400 flex items-center gap-2">
                <ImageIcon size={16} /> Gallery Images
              </h2>
              <button onClick={addGalleryImage} className="flex items-center gap-1 text-xs font-bold bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition">
                <Plus size={14} /> Add Image
              </button>
            </div>
            <div className="space-y-3">
              {formData.content.gallery.map((url, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    className="flex-1 p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-100 outline-none"
                    placeholder="Image URL"
                    value={url}
                    onChange={(e) => {
                      const newGallery = [...formData.content.gallery];
                      newGallery[idx] = e.target.value;
                      setFormData({ ...formData, content: { ...formData.content, gallery: newGallery } });
                    }}
                  />
                  <button onClick={() => removeGalleryImage(idx)} className="p-3 text-slate-400 hover:text-red-500 transition">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black uppercase text-slate-400 flex items-center gap-2">
                <Star size={16} /> Guest Reviews
              </h2>
              <button onClick={addTestimonial} className="flex items-center gap-1 text-xs font-bold bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition">
                <Plus size={14} /> Add Review
              </button>
            </div>
            {formData.content.testimonials.map((t, idx) => (
              <div key={idx} className="relative space-y-3 mb-6 p-5 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl">
                <button onClick={() => removeTestimonial(idx)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition">
                  <Trash2 size={18} />
                </button>
                <div className="w-1/2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Guest Name</label>
                  <input className="w-full p-2 bg-white border rounded-lg outline-none" placeholder="John Doe" value={t.name} onChange={(e) => {
                    const newT = [...formData.content.testimonials];
                    newT[idx].name = e.target.value;
                    setFormData({ ...formData, content: { ...formData.content, testimonials: newT } });
                  }} />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Review</label>
                  <textarea className="w-full p-2 bg-white border rounded-lg outline-none h-20" placeholder="Fantastic food..." value={t.text} onChange={(e) => {
                    const newT = [...formData.content.testimonials];
                    newT[idx].text = e.target.value;
                    setFormData({ ...formData, content: { ...formData.content, testimonials: newT } });
                  }} />
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-white p-6 rounded-3xl shadow-sm border">
            <h2 className="text-sm font-black uppercase text-slate-400 mb-4 flex items-center gap-2">
              <Palette size={16} /> Brand Color
            </h2>
            <div className="flex items-center gap-4">
              <input type="color" className="w-16 h-12 rounded-lg cursor-pointer bg-transparent" value={formData.theme.primary} onChange={(e) => setFormData({ ...formData, theme: { ...formData.theme, primary: e.target.value } })} />
              <span className="font-mono text-sm text-slate-500 uppercase">{formData.theme.primary}</span>
            </div>
          </section>

          {/* ✅ Menu Book Quick Info */}
          <section className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
            <h2 className="text-sm font-black uppercase text-orange-400 mb-4 flex items-center gap-2">
              <BookOpen size={16} /> Menu Book Status
            </h2>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-500">Images</span>
                <span className="font-bold">{menuBook.images.filter((i: string) => i).length} added</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">PDF</span>
                <span className={`font-bold ${menuBook.pdfUrl ? "text-green-600" : "text-slate-400"}`}>
                  {menuBook.pdfUrl ? "Linked ✓" : "None"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Style</span>
                <span className="font-bold capitalize">{menuBook.style}</span>
              </div>
            </div>
          </section>

          <a href={`/view/${formData.slug}`} target="_blank" className="flex items-center justify-center gap-2 w-full p-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition shadow-xl shadow-slate-200">
            <Eye size={18} /> View Live Site
          </a>
        </div>
      </main>
    </div>
  );
}