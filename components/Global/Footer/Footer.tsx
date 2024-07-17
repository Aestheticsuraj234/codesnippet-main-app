import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#212121] border-t border-[#212121]/10">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-80 max-w-full flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link aria-current="page" className="flex gap-2 justify-center md:justify-start items-center" href="/#">
              <Image
                alt="ShipFast logo"
                fetchPriority="high"
                width={180}
                height={180}
                style={{ color: 'transparent' }}
                src="/logo.svg"
              />
            </Link>
            <p className="mt-3 text-sm text-[#E5ECEA]/80 leading-relaxed">
              Ship your startup in days, not weeks
              <br />
              Copyright © 2024 - All rights reserved
            </p>
            <Link className="inline-block mt-4 text-sm border border-[#e5ecea]/20 hover:border-[#e53cea]/40 hover:text-[#e53cea]/90 hover:bg-[#212121] duration-200 cursor-pointer rounded text-[#e5ecea]/80 px-2 py-1" href="/">
              <div className="flex gap-2 items-center ">
                <span>Built with</span>
                <span className="font-bold text-[#E5ECEA]/40 flex gap-0.5 items-center tracking-tight">
                  <Image
                    alt="ShipFast logo"
                    fetchPriority="high"
                    width={90}
                    height={90}
                    decoding="async"
                    data-nimg="1"
                    className="w-50 h-50"
                    style={{ color: 'transparent' }}
                    src="/logo.svg"
                  />
                  
                </span>
              </div>
            </Link>
    
            
          </div>
          <div className="flex-grow flex flex-wrap md:pl-24 -mb-10 md:mt-0 mt-10 text-center md:text-left">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-[#E5ECEA]/60 tracking-widest text-sm md:text-left mb-3">LINKS</div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link className="text-[#E5ECEA]" href="/index#pricing">Pricing</Link>
                <Link className="text-[#E5ECEA]" href="/leaderboard">Leaderboard</Link>
                <Link className="text-[#E5ECEA]" href="/docs">Documentation</Link>
                <Link href="mailto:marc@shipfa.st" target="_blank" className="text-[#E5ECEA]">Support</Link>
                <Link className="text-[#E5ECEA]" href="/affiliates">Affiliates — Earn up to $99 per sale</Link>
                
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-[#E5ECEA]/60 tracking-widest text-sm md:text-left mb-3">LEGAL</div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link className="text-[#E5ECEA]" href="/tos">Terms of services</Link>
                <Link className="text-[#E5ECEA]" href="/privacy-policy">Privacy policy</Link>
                <Link className="text-[#E5ECEA]" href="/license">Licenses</Link>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-[#E5ECEA]/40 tracking-widest text-sm md:text-left mb-3">TEMPLATES</div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link href="https://launchvir.al/template" target="_blank" className="text-[#E5ECEA]">Course</Link>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
