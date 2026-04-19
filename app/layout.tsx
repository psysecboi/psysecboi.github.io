import type { Metadata } from "next";
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
    <html lang="en">
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
