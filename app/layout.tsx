import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Payas Vaishnav",
  description: "A personal space for systems, projects, and ideas..",
  verification: {
    google: "LOxBeV3HrCctugpOGifIpfOTWQHUJf5GF7nxBS45IwA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t;}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.dataset.theme='dark';}}catch(e){}})();`}
        </Script>
      </head>
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
