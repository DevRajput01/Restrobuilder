import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
          <Image 
            src="/logo/logobg.png" 
            alt="RestroBuilder Logo" 
            width={40} 
            height={40} 
            className=""
          />
          <span className="font-bold text-xl text-orange-600 tracking-tight group-hover:text-orange-700 transition-colors">
            RestroBuilder
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
           <Link href="#templates" className="hover:text-orange-600">Templates</Link>
          <Link href="#features" className="hover:text-orange-600">Features</Link>
          <Link href="#pricing" className="hover:text-orange-600">Pricing</Link>
          <Link href="#faq" className="hover:text-orange-600">FAQ</Link>
          <Link href="#contact" className="hover:text-orange-600">Contact</Link>

        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-orange-600">Login</Link>
          <Link href="/signup" className="bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-orange-700 transition">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}