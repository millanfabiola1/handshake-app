import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare, GeistPixelGrid, GeistPixelCircle, GeistPixelTriangle, GeistPixelLine } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tapp'd — Messages and Payments in One App. 0% Fees.",
  description: "Get Tapp'd. Send messages, get paid, keep 100%. Tips, locked content, paid calls, and mass messaging with zero platform fees.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${GeistPixelGrid.variable} ${GeistPixelCircle.variable} ${GeistPixelTriangle.variable} ${GeistPixelLine.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
