
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Faq, { TestimonialSection } from "@/components/Faq";
import Features from "@/components/Feature";
import StepsSection from "@/components/StepsSection";
import Templates from "@/components/Templates";
import ContactPage from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
    <Navbar />

    
    <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
      
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Features Section (Placeholder based on UI) */}
        <section id="features" className="py-24 bg-white border-t border-slate-100 text-center">
             <Features />
        </section>
<section>
  <StepsSection />
 
</section>
<section  id="templates">
 <Templates  />
</section>
        {/* Pricing Section */}
        <Pricing />
        <section>
<TestimonialSection />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-4xl mx-auto py-24 px-6">
           <p className="text-orange-600 font-semibold mb-2 text-center">FAQ</p>
           <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 tracking-tight">
             Frequently Asked Questions
           </h2>

           <Faq />
        </section>
        <section>
          <ContactPage />
        </section>

        {/* Final CTA */}
        <section className="bg-white-50 py-20 text-center border-y border-orange-100">
           <h2 className="text-3xl font-bold text-slate-700 mb-6">Ready to grow your restaurant online?</h2>
           <div className="flex justify-center gap-4">
              <input type="email" placeholder="Enter your email" className="px-4 py-3 rounded-lg border border-slate-200 w-64 text-slate-500 focus:outline-orange-500" />
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition">Get Started</button>
           </div>
        </section>

    
      </main>

     
    </div>
    <Footer />
    </>
  );
}