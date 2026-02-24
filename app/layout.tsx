import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Bebas_Neue, Roboto } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const Robo = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

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

  verification: {
    google: "BItFuXAt_apazB30jP8om9emrRHRGCU_St9i7Ywi6HQ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=GTM-NLPK23Q8'+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NLPK23Q8');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${bebas.variable} ${Robo.variable} ${geistMono.variable} antialiased`}
      >
        {/* GTM Noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLPK23Q8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
        <Analytics />
      </body>
    </html>
  );
}