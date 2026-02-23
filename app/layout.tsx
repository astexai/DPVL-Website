import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Bebas_Neue } from "next/font/google";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const Robo = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});
const bebas = Bebas_Neue({
  variable:"--font-bebas-neue",
  subsets:["latin"],
  weight:"400"
})
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title:
    "Delhi Pro Volleyball League (DPVL) | Official Volleyball League of Delhi",

  description:
    "Delhi Pro Volleyball League (DPVL) is India's emerging professional volleyball league featuring franchise teams, player trials, fixtures, and elite competition. Join the future of volleyball in Delhi.",

  keywords: [
    "Delhi Pro Volleyball League",
    "DPVL",
    "volleyball league Delhi",
    "professional volleyball India",
    "volleyball franchise league",
    "Delhi volleyball tournament",
    "volleyball trials India",
    "DPVL teams",
    "sports league Delhi",
    "volleyball championship India",
  ],

  robots: {
    index: true,
    follow: true,
  },

  authors: [
    {
      name: "Delhi Pro Volleyball League",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${bebas.variable} ${Robo.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
