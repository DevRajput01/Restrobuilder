

"use client";

export default function Pricing() {
  // const tiers = [
  //   { 
  //     name: "Free", 
  //     price: "0", 
  //     desc: "Best for new restaurants", 
  //     features: ["1 Menu", "Subdomain", "Basic Support"], 
  //     btn: "Start for Free",
  //     popular: false 
  //   },
  //   { 
  //     name: "Pro", 
  //     price: "19", 
  //     desc: "Best for growing business", 
  //     features: ["Unlimited Menus", "Custom Domain", "Priority Support", "Analytics"], 
  //     btn: "Go Pro", 
  //     popular: true 
  //   },
  //   { 
  //     name: "Business", 
  //     price: "49", 
  //     desc: "Best for restaurant chains", 
  //     features: ["Multi-location", "API Access", "Account Manager", "Custom Branding"], 
  //     btn: "Contact Sales",
  //     popular: false 
  //   }
  // ];
  const tiers = [
    { name: "Free", price: "0", desc: "Best for new restaurants", features: ["1 Menu", "Subdomain", "Basic Support"], btn: "Start for Free" },
    { name: "Pro", price: "19", desc: "Best for growing business", features: ["Unlimited Menus", "Custom Domain", "Priority Support", "Analytics"], btn: "Go Pro", popular: true },
    { name: "Business", price: "49", desc: "Best for restaurant chains", features: ["Multi-location", "API Access", "Account Manager", "Custom Branding"], btn: "Contact Sales" }
  ];
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-orange-600 font-bold tracking-widest text-sm mb-2">PRICING</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-600 font-medium mt-4 max-w-2xl mx-auto">
            Start free and upgrade as your restaurant grows. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`relative p-8 rounded-3xl bg-white border transition-all duration-300 ${
                tier.popular 
                  ? 'border-orange-500 shadow-2xl ring-2 ring-orange-500/20 scale-105 z-10' 
                  : 'border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl text-slate-900 font-extrabold">{tier.name}</h3>
              <p className="text-slate-500 text-sm mt-2 font-medium">{tier.desc}</p>
              
              <div className="mt-6 flex text-slate-900 items-baseline gap-1">
                <span className="text-5xl font-black">${tier.price}</span>
                <span className="text-slate-400 font-semibold">/mo</span>
              </div>

              <ul className="mt-8 space-y-4 border-t border-slate-50 pt-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start text-slate-600 text-sm">
                    <span className="text-orange-500 mr-3 font-bold">✓</span>
                    <span className="font-medium text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`mt-10 w-full py-4 rounded-2xl font-bold transition-all active:scale-95 ${
                  tier.popular 
                    ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-200' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {tier.btn}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}