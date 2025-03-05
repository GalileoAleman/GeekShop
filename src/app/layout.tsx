import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    template: '%s - Geek | Shop',
    default: 'Home - Geek | Shop'
  },
  description: "Tienda virtual Geek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
