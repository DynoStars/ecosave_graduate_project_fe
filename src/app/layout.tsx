"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux"; // Import Provider
import { store } from "@/redux/store"; // Import store
import "./globals.css";
import { Providers } from "@/redux/provider";
import Script from "next/script";

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
        <script
          src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js"
          defer
        ></script>
        <Script
          src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js"
          onLoad={() => console.log("GoongJS Loaded")}
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-white text-gray-900">
        <Provider store={store}>
          {!shouldHideHeader && <Header />}
          <main className="bg-white overflow-x-hidden relative min-h-[600px]">
            <Providers>{children}</Providers>
          </main>
          {!shouldHideHeader && <Footer />}
        </Provider>
      </body>
    </html>
  );
}
