import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { FilterProvider } from "./contexts/FilterContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Fronted Million",
  description: "Fronted Million",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-phia-extension-fonts-loaded="true" lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <FilterProvider>
          {children}
        </FilterProvider>
      </body>
    </html>
  );
}
