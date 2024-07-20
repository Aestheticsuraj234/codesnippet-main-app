import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="dark:bg-[#212121] border-t border-[#212121]/10">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-80 max-w-full flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link aria-current="page" className="flex gap-2 justify-center md:justify-start items-center" href="/#">
              <Image
                alt="Sigma-Coders logo"
                fetchPriority="high"
                width={80}
                height={80}
                style={{ color: 'transparent' }}
                src="/logo-new.svg"
              />
            </Link>
            <p className="mt-3 text-sm text-zinc-700 dark:text-[#E5ECEA]/80 leading-relaxed">
            Code with a Sigma Mindset.
              <br />
              Copyright © 2024 - All rights reserved
            </p>
            <Link className="inline-block mt-4 text-sm border dark:border-[#e5ecea]/20 dark:hover:bg-[#212121] duration-200 cursor-pointer rounded text-zinc-700 dark:text-[#e5ecea]/80 px-2 py-1" href="/">
              <div className="flex gap-2 items-center">
                <span>Built with</span>
                <span className="font-bold text-[#E5ECEA]/40 flex gap-0.5 items-center tracking-tight">
                  <Image
                    alt="Sigma-Coders logo"
                    fetchPriority="high"
                    width={30}
                    height={30}
                    decoding="async"
                    data-nimg="1"
                    className="w-50 h-50"
                    style={{ color: 'transparent' }}
                    src="/logo-new.svg"
                  />
                </span>
              </div>
            </Link>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-24 -mb-10 md:mt-0 mt-10 text-center md:text-left">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-zinc-700 dark:text-[#E5ECEA]/60 tracking-widest text-sm md:text-left mb-3">LINKS</div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link className="text-zinc-600 dark:text-[#E5ECEA]" href="/#pricing">Pricing</Link>
                <Link className="text-zinc-600 dark:text-[#E5ECEA]" href="/leaderboard">Leaderboard</Link>
                <Link className="text-zinc-600 dark:text-[#E5ECEA]" href="/docs">Documentation</Link>
                <Link href="mailto:support@sigmacoders.com" target="_blank" className="text-zinc-600 dark:text-[#E5ECEA]">Support</Link>
                <Link className="text-zinc-600 dark:text-[#E5ECEA]" href="/affiliates">Affiliates — Earn up to $99 per sale</Link>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-zinc-700 dark:text-[#E5ECEA]/60 tracking-widest text-sm md:text-left mb-3">LEGAL</div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link className="text-zinc-600 dark:text-[#E5ECEA]" href="/tos">Terms of Services</Link>
                <Link className="text-zinc-600 dark:text-[#E5ECEA]" href="/privacy-policy">Privacy Policy</Link>
                <Link className="text-zinc-600 dark:text-[#E5ECEA]" href="/license">Licenses</Link>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-zinc-700 dark:text-[#E5ECEA]/40 tracking-widest text-sm md:text-left mb-3">RESOURCES</div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link href="/workshops" className="text-zinc-600 dark:text-[#E5ECEA]">Workshops</Link>
                <Link href="/projects" className="text-zinc-600 dark:text-[#E5ECEA]">Projects</Link>
                <Link href="/notes" className="text-zinc-600 dark:text-[#E5ECEA]">Notes</Link>
                <Link href="/e-book" className="text-zinc-600 dark:text-[#E5ECEA]">E-Book</Link>
                <Link href="/dsa" className="text-zinc-600 dark:text-[#E5ECEA]">DSA Practice</Link>
                <Link href="/community" className="text-zinc-600 dark:text-[#E5ECEA]">Community</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
