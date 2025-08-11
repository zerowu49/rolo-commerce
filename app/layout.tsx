import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StripeElementsProvider from "@/components/StripeElementsProvider";

const poppinsRegular = localFont({
  src: "../public/fonts/Poppins-Regular.ttf",
  display: "swap",
  variable: "--font-poppins-regular",
});

const poppinsMedium = localFont({
  src: "../public/fonts/Poppins-Medium.ttf",
  display: "swap",
  variable: "--font-poppins-medium",
});

const poppinsSemiBold = localFont({
  src: "../public/fonts/Poppins-SemiBold.ttf",
  display: "swap",
  variable: "--font-poppins-semibold",
});

export const metadata: Metadata = {
  title: "ROLO - Your quick e-commerce",
  description: "Discover the things that you are looking for",
  icons: {
    icon: [
      { url: "/icon/favicon.ico", sizes: "any" },
      { url: "/icon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppinsRegular.variable} ${poppinsMedium.variable} ${poppinsSemiBold.variable}`}
      >
        <StripeElementsProvider>{children}</StripeElementsProvider>
      </body>
    </html>
  );
}
