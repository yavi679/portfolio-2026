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
        {children}
      </body>
    </html>
  );
}
