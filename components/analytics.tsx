"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_TRACKING_ID = "G-4PGPMBZYKE"; // Replace with your GA ID

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
};

export default Analytics;
