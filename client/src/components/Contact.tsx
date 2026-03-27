"use client";
import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";


export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you shortly.");
  };

  return (
    <>
     <div id="contact" className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="pt-30 pb-10 px-6 text-center bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h4 className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-3">
            Contact Us
          </h4>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Have questions about RestroBuilder? Our team is here to help you get your restaurant online and growing.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Let's talk</h2>
              <p className="text-slate-500 mb-8 max-w-md">
                We typically respond within 2-4 business hours. Whether it's a technical question or a pricing inquiry, we've got you covered.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center border border-orange-100">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Email Us</p>
                    <p className="text-slate-900 font-semibold">support@restrobuilder.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center border border-orange-100">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Call Us</p>
                    <p className="text-slate-900 font-semibold">+1 (555) 000-0000</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center border border-orange-100">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Visit Us</p>
                    <p className="text-slate-900 font-semibold">123 Tech Plaza, San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Highlight */}
            <div className="p-8 bg-slate-900 rounded-[32px] text-white relative overflow-hidden">
              <div className="relative z-10">
                <MessageSquare className="text-orange-500 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">24/7 Priority Support</h3>
                <p className="text-slate-400 text-sm">
                  Our Pro and Business plan users get access to a dedicated account manager and instant chat support.
                </p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    required
                    className="w-full text-[#000] px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm  font-bold text-slate-700 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    required
                    className="w-full px-6 py-4 text-[#000] rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Restaurant Name</label>
                <input 
                  type="text" 
                  placeholder="The Pizza Place"
                  className="w-full px-6 py-4 text-[#000] rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Your Message</label>
                <textarea 
                  rows={5}
                  placeholder="Tell us how we can help..."
                  required
                  className="w-full px-6 py-4 text-[#000] rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 focus:bg-white focus:outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-orange-600 text-white rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-2"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>

    </>
   
  );
}