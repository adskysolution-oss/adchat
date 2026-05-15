import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Sky Verse | Premium Messaging & Business CRM",
  description: "Experience the next evolution of secure communication and business management. All-in-one messaging platform for personal, business, and power users.",
  keywords: ["messaging", "business crm", "secure chat", "sky verse", "premium app"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
