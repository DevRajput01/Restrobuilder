// import Image from "next/image";
// import Link from "next/link";

// export default function Footer() {
//   return (
//     <footer className="bg-white border-t pt-16 pb-8">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
//         {/* Brand Section */}
//         <div className="col-span-2 md:col-span-1">
//           <div className="flex items-center gap-2 mb-4">
//             <Image 
//               src="/logo/logo.png" 
//               alt="RestroBuilder Logo" 
//               width={32} 
//               height={32} 
//             />
//             <span className="font-bold text-slate-900 text-lg">RestroBuilder</span>
//           </div>
//           <p className="text-slate-500 text-sm leading-relaxed max-w-[200px]">
//             The easiest way for restaurants to create beautiful, professional websites.
//           </p>
//         </div>

//         {/* Product Section */}
//         <div>
//           <h3 className="font-bold text-slate-900 mb-6">Product</h3>
//           <ul className="text-slate-500 space-y-4 text-sm">
//             <li><Link href="#" className="hover:text-orange-600 transition-colors">Templates</Link></li>
//             <li><Link href="#" className="hover:text-orange-600 transition-colors">Pricing</Link></li>
//             <li><Link href="#" className="hover:text-orange-600 transition-colors">Features</Link></li>
//             <li><Link href="#" className="hover:text-orange-600 transition-colors">Changelog</Link></li>
//           </ul>
//         </div>

//         {/* Company Section */}
//         <div>
//           <h3 className="font-bold text-slate-900 mb-6">Company</h3>
//           <ul className="text-slate-500 space-y-4 text-sm">
//             <li><Link href="#" className="hover:text-orange-600 transition-colors">About</Link></li>
//             <li><Link href="#" className="hover:text-orange-600 transition-colors">Blog</Link></li>
//             <li><Link href="#" className="hover:text-orange-600 transition-colors">Careers</Link></li>
//             <li><Link href="#" className="hover:text-orange-600 transition-colors">Contact</Link></li>
//           </ul>
//         </div>

//         {/* Legal Section */}
//         <div>
//           <h3 className="font-bold text-slate-900 mb-6">Legal</h3>
//           <ul className="text-slate-500 space-y-4 text-sm">
//             <li><Link href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</Link></li>
//             <li><Link href="#" className="hover:text-orange-600 transition-colors">Terms of Service</Link></li>
//             <li><Link href="#" className="hover:text-orange-600 transition-colors">Cookie Policy</Link></li>
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Copyright Section */}
//       <div className="border-t border-slate-100 pt-8 text-center">
//         <p className="text-slate-400 text-sm">
//           &copy; 2026 RestroBuilder. All rights reserved.
//         </p>
//         <div>
//           <p>Owner Social media</p>
//           add hear insta github linkdin social media account of owner
//         </div>
//       </div>
//     </footer>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { Instagram, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { name: "Instagram", icon: <Instagram size={20} />, href: "https://www.instagram.com/devrajput0108/" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/devendra-singh-092b51229/" },
    { name: "GitHub", icon: <Github size={20} />, href: "https://github.com/DevRajput01" },
    // { name: "Twitter", icon: <Twitter size={20} />, href: "https://twitter.com/yourhandle" },
  ];

  return (
    <footer className="bg-orange-50 border-t pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Image 
              src="/logo/logo.png" 
              alt="RestroBuilder Logo" 
              width={32} 
              height={32} 
            />
            <span className="font-bold text-slate-900 text-lg">RestroBuilder</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-[200px]">
            The easiest way for restaurants to create beautiful, professional websites.
          </p>
        </div>

        {/* Product Section */}
        <div>
          <h3 className="font-bold text-slate-900 mb-6">Product</h3>
          <ul className="text-slate-500 space-y-4 text-sm">
            <li><Link href="#"   className="hover:text-orange-600 transition-colors">Home</Link></li>
            <li><Link href="#"  className="hover:text-orange-600 transition-colors">Templates</Link></li>
            <li><Link href="#"  className="hover:text-orange-600 transition-colors">Pricing</Link></li>
            <li><Link href="#"  className="hover:text-orange-600 transition-colors">Features</Link></li>
            
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-bold text-slate-900 mb-6">Company</h3>
          <ul className="text-slate-500 space-y-4 text-sm">
            <li><Link href="#" className="hover:text-orange-600 transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-orange-600 transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-orange-600 transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-orange-600 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="font-bold text-slate-900 mb-6">Legal</h3>
          <ul className="text-slate-500 space-y-4 text-sm">
            <li><Link href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-orange-600 transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-orange-600 transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Social Section */}
      <div className="border-t border-slate-100 pt-4 mt-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm order-2 md:order-1">
            &copy; 2026 RestroBuilder. All rights reserved.
          </p>
  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connect with the Owner</div>

          <div className="flex flex-col items-center md:items-end gap-3 order-1 md:order-2">
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" flex items-center p-1.5 justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 border border-slate-300 hover:border-orange-100"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}