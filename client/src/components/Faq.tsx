"use client"; // Required for interactivity (useState)
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How long does it take to set up?",
    answer: "You can have a basic version of your restaurant website live in under 5 minutes. Adding custom menus and branding usually takes an additional 10-15 minutes."
  },
  {
    question: "Do I need coding skills?",
    answer: "Not at all! RestroBuilder is a drag-and-drop platform. If you can use a smartphone, you can build your website here."
  },
  {
    question: "Can I use my own domain name?",
    answer: "Yes! On our Pro and Business plans, you can connect your own custom domain (e.g., www.yourrestaurant.com) easily."
  },
  {
    question: "Is there a free trial?",
    answer: "We offer a 'Free Forever' plan that allows you to launch one basic website. You only pay when you need advanced features like custom domains or analytics."
  },
  {
    question: "Does it handle online reservations?",
    answer: "Yes, our platform includes a built-in reservation system that sends notifications directly to your dashboard or email."
  }
];

export default function FaqComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-all duration-200 hover:border-orange-200"
        >
          <button
            onClick={() => toggleFaq(index)}
            suppressHydrationWarning
            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
          >
            <span className="font-semibold text-slate-800 md:text-lg">
              {faq.question}
            </span>
            <span className={`text-orange-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </span>
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-5 pt-0 text-slate-600 border-t border-slate-50 leading-relaxed">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Testimonial Data ---

// ... faqs remains exactly the same as your code ...

const testimonials = [
  {
    initials: "MR",
    name: "Maria Rossi",
    role: "Owner, Trattoria Bella",
    quote: "RestroBuilder helped us go from zero online presence to a stunning website in under 10 minutes. Our reservations increased by 40%!"
  },
  {
    initials: "JS",
    name: "James Smith",
    role: "Manager, The Burger Joint",
    quote: "I never thought building a menu could be this easy. The drag-and-drop feature is a lifesaver for busy restaurant owners."
  },
  {
    initials: "LC",
    name: "Lucia Chen",
    role: "Founder, Zen Tea House",
    quote: "The built-in reservation system is fantastic. We no longer miss calls during rush hour because our customers book online."
  }
];

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  // Animation variants for the sliding effect
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h4 className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-2">
          Testimonials
        </h4>
        <h2 className="text-4xl font-black text-slate-900 mb-12">
          Loved by Restaurant Owners
        </h2>
        
        <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-sm border border-slate-100 relative min-h-[450px] flex flex-col justify-center overflow-hidden">
          {/* Quote Icon */}
          <div className="absolute top-10 right-10 text-slate-100 pointer-events-none">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21C10 22.1046 9.10457 23 8 23H5C3.89543 23 3 22.1046 3 21ZM16.017 14C12.617 14 11.017 11.5 11.017 8C11.017 4.5 13.017 2 16.017 2L17.517 3.5C15.517 5 15.017 6.5 15.017 8H19.017C20.1216 8 21.017 8.89543 21.017 10V14H16.017ZM5 14C1.6 14 0 11.5 0 8C0 4.5 2 2 5 2L6.5 3.5C4.5 5 4 6.5 4 8H8C9.10457 8 10 8.89543 10 10V14H5Z" />
            </svg>
          </div>

          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#EA580C" className="text-orange-600" />
            ))}
          </div>

          {/* Animated Container */}
          <div className="relative h-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                }}
                className="w-full"
              >
                <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-8 italic relative z-10 px-4">
                  "{testimonials[currentIndex].quote}"
                </p>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mb-3 shadow-lg shadow-orange-200">
                    {testimonials[currentIndex].initials}
                  </div>
                  <h4 className="font-bold text-slate-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-slate-500 italic">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center gap-4 mt-10">
            <button 
              onClick={() => paginate(-1)}
              className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 hover:border-orange-200 transition text-slate-400 hover:text-orange-600 focus:outline-none z-20"
            >
              <ChevronLeft size={20}/>
            </button>
            <button 
              onClick={() => paginate(1)}
              className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 hover:border-orange-200 transition text-slate-400 hover:text-orange-600 focus:outline-none z-20"
            >
              <ChevronRight size={20}/>
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-8 bg-orange-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}