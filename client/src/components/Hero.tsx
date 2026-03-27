import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="pt-32 pb-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="bg-orange-10 p-2 ps-4 pe-4 border-1 rounded-4xl shadow-inner">
            {/* <Image src="/logo/logo.png" alt="Logo" width={56} height={56} priority /> */}
            <h2 className="text-slate-500 ">✨ No coding required</h2>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
          Create Your Restaurant <br /> Website in <span className="text-orange-600">5 Minutes</span>
        </h1>
        
        <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
         Just fill in your details and get a beautiful, mobile-ready website that attracts more customers and grows your business..
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link 
            href="/signup"
            className="h-14 px-10 flex items-center justify-center rounded-md bg-orange-600 text-white font-bold text-lg hover:bg-orange-700 transition-all w-full sm:w-auto shadow-xl shadow-orange-100"
          >
            Get Started Free
          </Link>
          <Link 
            href="#templates"
            className="h-14 px-10 flex items-center justify-center rounded-md border-1 border-orange-500 text-slate-700 font-bold text-lg hover:bg-orange-100 transition-all w-full sm:w-auto"
    
          >
             See Templates
          </Link>
          
         
        </div>

        {/* Dashboard Preview Image */}
        <div className="mt-10 relative rounded-2xl border border-slate-200 shadow-2xl overflow-hidden bg-slate-50">
          <div className="bg-white border-b border-slate-200 p-4 flex gap-2">
             <div className="w-3 h-3 rounded-full bg-red-400" />
             <div className="w-3 h-3 rounded-full bg-yellow-400" />
             <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
        
          <div className="p-1 bg-slate-50">
            <div className="aspect-video relative bg-white rounded-lg shadow-sm overflow-hidden flex items-center justify-center">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
                poster="/background/heroImage1.jpg" // Optional: Image shown before video loads
              >
                <source src="/video/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}