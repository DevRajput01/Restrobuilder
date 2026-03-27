import React from 'react';
import { UserPlus, FileText, Palette, Rocket } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: "Sign Up",
    description: "Create your free account in seconds",
    icon: <UserPlus size={32} className="text-orange-600" />,
  },
  {
    number: 2,
    title: "Enter Details",
    description: "Add your restaurant name, menu & photos",
    icon: <FileText size={32} className="text-orange-600" />,
  },
  {
    number: 3,
    title: "Customize",
    description: "Pick a template and personalize the design",
    icon: <Palette size={32} className="text-orange-600" />,
  },
  {
    number: 4,
    title: "Publish & Share",
    description: "Go live and share your link instantly",
    icon: <Rocket size={32} className="text-orange-600" />,
  },
];

export default function StepsSection() {
  return (
    <section id='Step' className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-3">
            How it works
          </h4>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Live in 4 Simple Steps
          </h2>
          <p className="text-slate-500 mt-4 text-lg italic">
            From sign up to publish — it only takes a few minutes.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10" />

          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center group">
              <div className="relative w-24 h-24 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center justify-center mb-8 transition-transform group-hover:-translate-y-2">
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg shadow-orange-200">
                  {step.number}
                </div>
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[200px] italic">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}