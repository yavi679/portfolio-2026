import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vikas Yadav — Product Designer",
  description: "Portfolio of Vikas Yadav, Product Designer.",
  openGraph: {
    title: "Vikas Yadav — Product Designer",
    description: "Portfolio of Vikas Yadav, Product Designer.",
    images: [{ url: "/projects/avatar.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <div className="md:hidden fixed inset-0 z-50 flex items-center justify-center bg-gray-50 px-8">
          <p className="text-base text-gray-900 leading-relaxed text-center">
            Designing for mobile is usually the right call.<br />This time, it wasn't.
          </p>
        </div>
        <div className="hidden md:block">
          {children}
        </div>
      </body>
    </html>
  );
}
