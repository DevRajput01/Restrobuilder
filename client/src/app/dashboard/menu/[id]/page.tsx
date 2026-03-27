// "use client";
// import { useEffect, useState, useRef } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { Plus, Trash2, Save, ArrowLeft, UtensilsCrossed, Loader2, CheckCircle, ImagePlus, X } from "lucide-react";

// interface MenuItem {
//   id: string;
//   name: string;
//   description: string;
//   price: string | number;
//   category: string;
//   image?: string; // ✅ new
// }

// export default function MenuEditor() {
//   const { id } = useParams();
//   const router = useRouter();
  
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`http://localhost:5000/api/my-restaurants`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const currentRestaurant = res.data.find((r: any) => r.id === id);
//         if (currentRestaurant && currentRestaurant.menuItems) {
//           setMenuItems(currentRestaurant.menuItems);
//         }
//       } catch (err) {
//         console.error("Failed to fetch menu:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchMenu();
//   }, [id]);

//   const addItem = () => {
//     const newItem: MenuItem = {
//       id: `new-${Date.now()}`,
//       name: "",
//       description: "",
//       price: "1.00",
//       category: "Main Course",
//       image: ""
//     };
//     setMenuItems([...menuItems, newItem]);
//   };

//   const removeItem = (itemId: string) => {
//     setMenuItems(menuItems.filter(item => item.id !== itemId));
//   };

//   const updateItem = (itemId: string, field: keyof MenuItem, value: string) => {
//     setMenuItems((prev) =>
//       prev.map((item) =>
//         item.id === itemId ? { ...item, [field]: value } : item
//       )
//     );
//   };

//   // ✅ Convert image to base64
//   const handleImageUpload = (itemId: string, file: File) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       updateItem(itemId, "image", reader.result as string);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem("token");
//       const cleanedMenu = menuItems.map(({ id, ...rest }) => ({
//         ...rest,
//         price: parseFloat(rest.price.toString()) || 0
//       }));

//       await axios.patch(`http://localhost:5000/api/restaurants/${id}`, {
//         menuItems: cleanedMenu
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 3000);
//     } catch (err) {
//       console.error("Save error:", err);
//       alert("Failed to save menu changes.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50">
//       <Loader2 className="animate-spin text-orange-600" size={40} />
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 pb-24">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8 sticky top-0 bg-slate-50/80 backdrop-blur-md z-10 py-4">
//           <div className="flex items-center gap-4">
//             <button onClick={() => router.back()} className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100 transition">
//               <ArrowLeft size={20} />
//             </button>
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900">Edit Menu</h1>
//               <p className="text-sm text-slate-500">Changes will go live once you save</p>
//             </div>
//           </div>
//           <div className="flex gap-3">
//             <button onClick={addItem} className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-50 transition">
//               <Plus size={18} /> Add Dish
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-sm transition shadow-lg ${
//                 showSuccess ? "bg-green-500 text-white" : "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-100"
//               } disabled:opacity-50`}
//             >
//               {saving ? <Loader2 className="animate-spin" size={18} /> : showSuccess ? <CheckCircle size={18} /> : <Save size={18} />}
//               {saving ? "Saving..." : showSuccess ? "Saved!" : "Save Changes"}
//             </button>
//           </div>
//         </div>

//         {/* Menu List */}
//         <div className="space-y-4">
//           {menuItems.length > 0 ? (
//             menuItems.map((item) => (
//               <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex gap-6 items-start transition hover:border-orange-200">
                
//                 {/* ✅ Image Upload Section */}
//                 <div className="shrink-0">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     ref={(el) => { fileInputRefs.current[item.id] = el; }}
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) handleImageUpload(item.id, file);
//                     }}
//                   />
//                   {item.image ? (
//                     <div className="relative w-24 h-24 group">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-24 h-24 object-cover rounded-2xl border border-slate-100"
//                       />
//                       {/* Remove image button */}
//                       <button
//                         onClick={() => updateItem(item.id, "image", "")}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
//                       >
//                         <X size={12} />
//                       </button>
//                       {/* Change image on click */}
//                       <button
//                         onClick={() => fileInputRefs.current[item.id]?.click()}
//                         className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
//                       >
//                         <ImagePlus size={20} className="text-white" />
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => fileInputRefs.current[item.id]?.click()}
//                       className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-1 hover:border-orange-400 hover:bg-orange-50 transition group"
//                     >
//                       <ImagePlus size={20} className="text-slate-300 group-hover:text-orange-400 transition" />
//                       <span className="text-[10px] text-slate-300 group-hover:text-orange-400 font-bold">Add Photo</span>
//                     </button>
//                   )}
//                 </div>

//                 {/* Fields */}
//                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                   <div className="space-y-1">
//                     <label className="text-[10px] font-bold uppercase text-slate-400">Dish Name</label>
//                     <input
//                       placeholder="e.g. Margherita Pizza"
//                       className="w-full font-bold text-lg bg-transparent border-b border-slate-100 focus:border-orange-400 outline-none transition"
//                       value={item.name}
//                       onChange={(e) => updateItem(item.id, "name", e.target.value)}
//                     />
//                   </div>

//                   <div className="space-y-1">
//                     <label className="text-[10px] font-bold uppercase text-slate-400">Price ($)</label>
//                     <input
//                       type="number"
//                       className="w-full text-orange-600 font-bold bg-transparent border-b border-slate-100 focus:border-orange-400 outline-none transition"
//                       value={item.price}
//                       onChange={(e) => updateItem(item.id, "price", e.target.value)}
//                     />
//                   </div>

//                   <div className="space-y-1 md:col-span-2">
//                     <label className="text-[10px] font-bold uppercase text-slate-400">Description</label>
//                     <input
//                       placeholder="Ingredients or details..."
//                       className="w-full text-sm text-slate-500 bg-transparent border-b border-slate-100 focus:border-orange-400 outline-none transition"
//                       value={item.description}
//                       onChange={(e) => updateItem(item.id, "description", e.target.value)}
//                     />
//                   </div>

//                   <div className="space-y-1">
//                     <label className="text-[10px] font-bold uppercase text-slate-400">Category</label>
//                     <select
//                       className="w-full text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-50 p-2 rounded-lg outline-none border border-slate-100 focus:ring-1 ring-orange-200"
//                       value={item.category}
//                       onChange={(e) => updateItem(item.id, "category", e.target.value)}
//                     >
//                       <option value="Starters">Starters</option>
//                       <option value="Main Course">Main Course</option>
//                       <option value="Desserts">Desserts</option>
//                       <option value="Drinks">Drinks</option>
//                     </select>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition self-center"
//                 >
//                   <Trash2 size={20} />
//                 </button>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
//               <UtensilsCrossed className="mx-auto text-slate-200 mb-4" size={48} />
//               <p className="text-slate-400 font-medium italic">Your menu is empty.</p>
//               <button onClick={addItem} className="mt-4 text-orange-600 font-bold hover:underline">
//                 Add your first dish
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Plus, Trash2, Save, ArrowLeft, UtensilsCrossed, Loader2, CheckCircle, ImagePlus, X, Link } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string | number;
  category: string;
  image?: string;
}

export default function MenuEditor() {
  const { id } = useParams();
  const router = useRouter();
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [urlInputOpen, setUrlInputOpen] = useState<{ [key: string]: boolean }>({});  // ✅ track which items have URL input open
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/my-restaurants`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const currentRestaurant = res.data.find((r: any) => r.id === id);
        if (currentRestaurant && currentRestaurant.menuItems) {
          setMenuItems(currentRestaurant.menuItems);
        }
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMenu();
  }, [id]);

  // ✅ New items added to TOP
  const addItem = () => {
    const newItem: MenuItem = {
      id: `new-${Date.now()}`,
      name: "",
      description: "",
      price: "1.00",
      category: "Main Course",
      image: ""
    };
    setMenuItems([newItem, ...menuItems]);  // ✅ unshift to top
  };

  const removeItem = (itemId: string) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
  };

  const updateItem = (itemId: string, field: keyof MenuItem, value: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  const handleImageUpload = (itemId: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateItem(itemId, "image", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ✅ Toggle URL input for a specific item
  const toggleUrlInput = (itemId: string) => {
    setUrlInputOpen((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const cleanedMenu = menuItems.map(({ id, ...rest }) => ({
        ...rest,
        price: parseFloat(rest.price.toString()) || 0
      }));

      await axios.patch(`http://localhost:5000/api/restaurants/${id}`, {
        menuItems: cleanedMenu
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save menu changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-orange-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-slate-50/80 backdrop-blur-md z-10 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100 transition">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Edit Menu</h1>
              <p className="text-sm text-slate-500">Changes will go live once you save</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={addItem} className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-50 transition">
              <Plus size={18} /> Add Dish
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-sm transition shadow-lg ${
                showSuccess ? "bg-green-500 text-white" : "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-100"
              } disabled:opacity-50`}
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : showSuccess ? <CheckCircle size={18} /> : <Save size={18} />}
              {saving ? "Saving..." : showSuccess ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Menu List */}
        <div className="space-y-4">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex gap-6 items-start transition hover:border-orange-200">
                
                {/* Image Section */}
                <div className="shrink-0 flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={(el) => { fileInputRefs.current[item.id] = el; }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(item.id, file);
                    }}
                  />

                  {/* Image Preview or Upload Box */}
                  {item.image ? (
                    <div className="relative w-24 h-24 group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-2xl border border-slate-100"
                      />
                      <button
                        onClick={() => updateItem(item.id, "image", "")}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={12} />
                      </button>
                      <button
                        onClick={() => fileInputRefs.current[item.id]?.click()}
                        className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        <ImagePlus size={20} className="text-white" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRefs.current[item.id]?.click()}
                      className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-1 hover:border-orange-400 hover:bg-orange-50 transition group"
                    >
                      <ImagePlus size={20} className="text-slate-300 group-hover:text-orange-400 transition" />
                      <span className="text-[10px] text-slate-300 group-hover:text-orange-400 font-bold">Add Photo</span>
                    </button>
                  )}

                  {/* ✅ URL toggle button */}
                  <button
                    onClick={() => toggleUrlInput(item.id)}
                    className={`flex items-center justify-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg transition w-24 ${
                      urlInputOpen[item.id]
                        ? "bg-orange-100 text-orange-600"
                        : "bg-slate-100 text-slate-400 hover:bg-orange-50 hover:text-orange-500"
                    }`}
                  >
                    <Link size={10} />
                    {urlInputOpen[item.id] ? "Close URL" : "Use URL"}
                  </button>

                  {/* ✅ URL input field */}
                  {urlInputOpen[item.id] && (
                    <div className="w-24">
                      <input
                        type="text"
                        placeholder="https://..."
                        className="w-full text-[10px] p-1.5 border border-slate-200 rounded-lg outline-none focus:border-orange-400 text-slate-600"
                        value={item.image?.startsWith("http") ? item.image : ""}
                        onChange={(e) => updateItem(item.id, "image", e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Dish Name</label>
                    <input
                      placeholder="e.g. Margherita Pizza"
                      className="w-full font-bold text-lg bg-transparent border-b border-slate-100 focus:border-orange-400 outline-none transition"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, "name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Price ($)</label>
                    <input
                      type="number"
                      className="w-full text-orange-600 font-bold bg-transparent border-b border-slate-100 focus:border-orange-400 outline-none transition"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, "price", e.target.value)}
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Description</label>
                    <input
                      placeholder="Ingredients or details..."
                      className="w-full text-sm text-slate-500 bg-transparent border-b border-slate-100 focus:border-orange-400 outline-none transition"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Category</label>
                    <select
                      className="w-full text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-50 p-2 rounded-lg outline-none border border-slate-100 focus:ring-1 ring-orange-200"
                      value={item.category}
                      onChange={(e) => updateItem(item.id, "category", e.target.value)}
                    >
                      <option value="Starters">Starters</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Drinks">Drinks</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition self-center"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
              <UtensilsCrossed className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-400 font-medium italic">Your menu is empty.</p>
              <button onClick={addItem} className="mt-4 text-orange-600 font-bold hover:underline">
                Add your first dish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}