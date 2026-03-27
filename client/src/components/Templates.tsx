"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const templates = [
  {
    title: "Modern Minimal",
    description: "Clean lines · Bold typography · White space",
    // Fixed: Path changed to lowercase to match your public folder
    image: "/background/heroImage1.jpg", 
  },
  {
    title: "Classic Elegant",
    description: "Dark theme · Serif fonts · Gold accents",
    image: "/background/heroImage1.jpg", 
  },
  {
    title: "Bold & Vibrant",
    description: "Bright colors · Energetic · Geometric",
    image: "/background/heroImage1.jpg", 
  },
];

export default function Templates() {
  const [mounted, setMounted] = useState(false);

  // Fix: Prevents hydration errors by waiting for client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="templates" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Subheading */}
        <h4 className="text-orange-600 font-bold uppercase tracking-[0.2em] text-xs mb-4">
          Templates
        </h4>
        
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Stunning Templates, Ready <br className="hidden md:block" /> to Go
        </h2>
        
        {/* Description */}
        <p className="text-slate-500 text-lg mb-16 max-w-2xl mx-auto">
          Pick a style that matches your restaurant's personality.
        </p>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {templates.map((template, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Card Container */}
              <div className="relative aspect-[1.4/1] bg-white rounded-[32px] border border-slate-200 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-orange-200 group-hover:-translate-y-2">
                
                {/* Simulated Browser Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-10 border-b border-slate-100 flex items-center px-5 gap-1.5 z-20 bg-white/80 backdrop-blur-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                </div>

                {/* Content Area with Next.js Image Component */}
                <div className="absolute inset-0 pt-10 px-0 pb-0 bg-slate-50 flex flex-col justify-center">
                   <div className="relative w-full h-full">
                     <Image
                        src={template.image} 
                        alt={template.title} 
                        fill 
                        className="object-cover" 
                        sizes="(max-width: 768px) 100vw, 33vw"
                      /> 
                   </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center backdrop-blur-[2px]">
                  <button className="bg-orange-600 text-white px-7 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-orange-700">
                    Preview Template <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Text Meta Info */}
              <div className="mt-8 text-left pl-2">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {template.title}
                </h3>
                <p className="text-slate-500 font-medium text-sm">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}