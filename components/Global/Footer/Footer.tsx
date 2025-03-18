"use client";

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Instagram, Youtube, ArrowUp, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { theme } = useTheme();
  const [imagePath, setImagePath] = useState("/code-snippet2ss.svg");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      setImagePath("/code-snippet-dark2.svg");
    } else {
      setImagePath("/code-snippet2.svg");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative dark:bg-[#212121] border-t border-[#212121]/10">
      {/* Decorative element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and info section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                alt="CodeSnippet Logo"
                fetchPriority="high"
                width={160}
                height={160}
                style={{ color: 'transparent' }}
                src={imagePath || "/placeholder.svg"}
                className="transition-all duration-300 hover:scale-105"
              />
            </Link>
            <p className="text-sm text-zinc-700 dark:text-[#E5ECEA]/80 leading-relaxed">
              Crack Code - Not Your Brain💡
            </p>
            
            {/* Newsletter signup */}
        
            
            <Link className="inline-flex items-center gap-2 text-sm border dark:border-[#e5ecea]/20 rounded-full px-4 py-2 text-zinc-700 dark:text-[#e5ecea]/80 hover:bg-zinc-100 dark:hover:bg-[#2A2A2A] transition-all duration-200" href="https://nextjs.org/">
              <span>Built with</span>
              <Image
                alt="Sigma-Coders logo"
                width={24}
                height={24}
                className="w-6 h-6"
                style={{ color: 'transparent' }}
                src="/logo-new.svg"
              />
            </Link>
          </div>

          {/* Platform links */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-[#E5ECEA] uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Pricing", href: "/pricing" },
                { name: "Tutorials", href: "/dashboard/tutorials" },
                { name: "Live Courses", href: "/dashboard/" },
                { name: "Workshops", href: "/dashboard/workshops" },
                { name: "Campus Ambassador", href: "/dashboard/campus-ambassador" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-zinc-600 dark:text-[#E5ECEA]/80 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 h-0.5 bg-primary mr-0 group-hover:mr-2"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-[#E5ECEA] uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Terms of Services", href: "/tos" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Refund Policy", href: "/refund-policy" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-zinc-600 dark:text-[#E5ECEA]/80 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 h-0.5 bg-primary mr-0 group-hover:mr-2"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact links */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-[#E5ECEA] uppercase tracking-wider">
              Connect With Us
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="https://api.whatsapp.com/send/?phone=918700169570&text=Hi+CodeSnippet%21&type=phone_number&app_absent=0" 
                  target="_blank"
                  className="text-zinc-600 dark:text-[#E5ECEA]/80 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.instagram.com/codesnippet3/" 
                  target="_blank"
                  className="text-zinc-600 dark:text-[#E5ECEA]/80 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.youtube.com/@CODESNIPPET003" 
                  target="_blank"
                  className="text-zinc-600 dark:text-[#E5ECEA]/80 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Youtube className="h-4 w-4" />
                  <span>YouTube</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="mailto:codesnippet003@gmail.com"
                  className="text-zinc-600 dark:text-[#E5ECEA]/80 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Us</span>
                </Link>
              </li>
            </ul>
            
            <div className="pt-4">
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/codesnippet3/" },
                  { icon: Youtube, href: "https://www.youtube.com/@CODESNIPPET003" },
                  { icon: MessageCircle, href: "https://api.whatsapp.com/send/?phone=918700169570&text=Hi+CodeSnippet%21&type=phone_number&app_absent=0" },
                ].map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href}
                    target="_blank"
                    className="bg-zinc-100 border dark:bg-[#2A2A2A] dark:text-[#E5ECEA]/80 p-2 rounded-full transition-all duration-200 "
                  >
                    <item.icon className="h-4 w-4 hover:text-emerald-500" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-[#2A2A2A] flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-zinc-600 dark:text-[#E5ECEA]/60">
            Copyright © {year} CodeSnippet - All rights reserved
          </p>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="text-sm text-zinc-600 dark:text-[#E5ECEA]/60">
              Made with ❤️ in India
            </span>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
   <Button
   onClick={scrollToTop}
    variant={"outline"}
    size={"icon"}
   className='absolute bottom-5 right-4 z-10  rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-300'
   >
    <ArrowUp className="h-6 w-6" />
   </Button>
    </footer>
  );
};

export default Footer;
