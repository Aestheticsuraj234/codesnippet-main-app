import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ModalProvider } from "@/providers/modal-provider";
import ReactQueryProvider from "./ReactQueryProvider";
import { SocketProvider } from "@/providers/socket-provider";
import Script from "next/script";
import { BannerDisplay } from "@/features/banner/components/banner-display";
import Analytics from "@/components/analytics";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "CodeSnipet – Crack Code, Not Your Brain! 💡",
  description: "CodeSnipet.dev is the ultimate developer learning hub, offering live courses, 1:1 mentorship, AI-powered debugging, and real-time community support.",
  keywords: [
    "CodeSnipet.dev",
    "coding courses",
    "learn programming",
    "full-stack development",
    "DSA visualization",
    "debugging challenges",
    "AI-powered learning",
    "mentorship",
    "developer community",
    "programming tutorials",
    "code review",
    "software engineering",
    "web development",
    "mobile app development",
    "career in tech"
  ],
  authors: [{ name: "CodeSnipet.dev", url: "https://codesnipet.dev" }],
  metadataBase: new URL("https://codesnipet.dev"),
  openGraph: {
    type: "website",
    url: "https://codesnipet.dev",
    title: "CodeSnipet.dev - Learn, Build & Debug Smarter 🚀",
    description: "Join CodeSnipet.dev to master software development through live courses, project-based learning, AI-driven debugging, and real-time support.",
    siteName: "CodeSnipet.dev",
    images: [
      {
        url: "https://codesnipet.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeSnipet.dev - The Ultimate Developer Learning Hub",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@CodeSnipetdev",
    creator: "@CodeSnipetdev",
    title: "CodeSnipet.dev - Learn, Build & Debug Smarter 🚀",
    description: "Join CodeSnipet.dev for hands-on coding courses, AI-powered debugging, and mentorship from industry experts.",
    images: ["https://codesnipet.dev/twitter-card.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#08bd80" }
    ]
  },
  manifest: "/site.webmanifest",
  themeColor: "#08bd80",
  applicationName: "CodeSnipet.dev",
  appleWebApp: {
    capable: true,
    title: "CodeSnipet.dev",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  category: "education",
  creator: "codesnipet.dev Team",
  publisher: "codesnipet.dev",
  alternates: {
    canonical: "https://codesnipet.dev",
    languages: {
      'en-US': 'https://codesnipet.dev',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
 
};

const GA_TRACKING_ID = "G-4PGPMBZYKE"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className="scroll-smooth">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://codesnipet.dev" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        </head>
        <body className={cn(inter.className, "min-h-screen bg-[#F5F5F5] dark:bg-[#141413]")}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SocketProvider>
             
                <ToastProvider />
                <Toaster  />
                <ModalProvider />
                <Analytics  />
                {children}
                <Script
                  id="razorpay-checkout-js"
                  src="https://checkout.razorpay.com/v1/checkout.js"
                  strategy="lazyOnload"
                />
                <Script
                  id="structured-data"
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "WebSite",
                      "name": "codesnipet.dev",
                      "url": "https://CodeSnipet.dev",
                      "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://codesnipet.dev/search?q={search_term_string}",
                        "query-input": "required name=search_term_string"
                      },
                      "description": "CodeSnipet.dev is the ultimate developer learning hub, offering live courses, 1:1 mentorship, AI-powered debugging, and real-time community support.",
                      "publisher": {
                        "@type": "Organization",
                        "name": "CodeSnipet.dev",
                        "logo": {
                          "@type": "ImageObject",
                          "url": "https://codesnipet.dev/logo.png"
                        }
                      }
                    })
                  }}
                />
                
                <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
              </SocketProvider>
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}