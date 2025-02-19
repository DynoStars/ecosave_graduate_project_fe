"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux"; // Import Provider
import { store } from "@/redux/store"; // Import store
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
        <script
          src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js"
          defer
        ></script>
        <link href="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css" rel="stylesheet" />
      </head>
      <body className="bg-white text-gray-900">
        <Provider store={store}>
          {!shouldHideHeader && <Header />}
          <main className="bg-white overflow-x-hidden relative min-h-[600px]">
            {children}
          </main>
          {!shouldHideHeader && <Footer />}
        </Provider>
      </body>
    </html>
  );
}