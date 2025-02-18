"use client"

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "./globals.css";
import { isLogin } from "@/utils/helpers/isLogin";
import ClientProvider from "./ClientProvider";
import { usePathname } from 'next/navigation'; // Import usePathname

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server-side logic to determine if the user is logged in
  const checkLogin = isLogin();

  // Get the current pathname
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <script
          src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js"
          defer
        ></script>
        <link
          href="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900 scrollbar-container">
        <ClientProvider>
          {/* Render the header if not on login or register pages */}
          {!(pathname === "/login" || pathname === "/register") && (
            <Header checkLogin={checkLogin} />
          )}
          <main className="bg-white overflow-x-hidden relative min-h-[600px]">
            {children}
          </main>
          {/* Render the footer if not on login or register pages */}
          {!(pathname === "/login" || pathname === "/register") && <Footer />}
        </ClientProvider>
      </body>
    </html>
  );
}
