import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dirty Breakfast | Breakfast, Brunch & Late Night Eats - Cincinnati, OH",
  description: "Your go-to spot for breakfast, brunch & late night eats in Cincinnati, Ohio. Southern cuisine made fresh daily. Est. 2023.",
  keywords: ["Dirty Breakfast", "breakfast", "brunch", "late night", "Cincinnati", "southern cuisine", "waffles", "pancakes", "grits"],
  icons: {
    icon: "https://i.imgur.com/ocYoXO2.png",
    apple: "https://i.imgur.com/ocYoXO2.png",
  },
  openGraph: {
    title: "Dirty Breakfast | Breakfast, Brunch & Late Night Eats",
    description: "Your go-to spot for breakfast, brunch & late night eats in Cincinnati, Ohio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
