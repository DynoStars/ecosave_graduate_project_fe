"use client"
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const shouldHideHeader =
    pathname && (pathname.includes("/login") || pathname.includes("/register"));
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900">
        {!shouldHideHeader && <Header />}
        <main className="bg-white overflow-x-hidden relative min-h-[200px]">
          {children}
        </main>
        {!shouldHideHeader && <Footer />}
      </body>
    </html>
  );
}
