import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";;
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ModalProvider } from "@/providers/modal-provider";
import ReactQueryProvider from "./ReactQueryProvider";
import { SocketProvider } from "@/providers/socket-provider";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sigma Coders",
  description: "Sigma Coders is a community of developers"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
    <html lang="en">
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
          <ModalProvider />
          {children}
          <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
          </SocketProvider>
        </ThemeProvider>
        </ReactQueryProvider>
     
      </body>
    </html>
  </SessionProvider>
    
  );
}
