import { Paintbrush, Type, Image as ImageIcon, Smartphone } from "lucide-react";

const featureData = [
  {
    title: "Beautiful Templates",
    description: "Professionally designed, restaurant-specific templates that look stunning out of the box.",
    // Removed 'text-orange-600' from here so the parent can control color
    icon: <Paintbrush className="w-6 h-6" />,
  },
  {
    title: "Easy Customization",
    description: "Personalize colors, fonts, and layouts to perfectly match your restaurant's brand.",
    icon: <Type className="w-6 h-6" />,
  },
  {
    title: "Menu & Photo Management",
    description: "Add your full menu with photos, categories, and pricing in a simple drag-and-drop editor.",
    icon: <ImageIcon className="w-6 h-6" />,
  },
  {
    title: "Mobile-First Design",
    description: "Every template is fully responsive and optimized for the mobile-first world your customers live in.",
    icon: <Smartphone className="w-6 h-6" />,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-orange-600 font-bold tracking-widest text-sm uppercase mb-3">Features</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Everything You Need to Go Online</h3>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Launch a professional restaurant website without any technical skills.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureData.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-orange-50 text-orange-600 group-hover:text-orange-700 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                {feature.title}
              </h4>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}