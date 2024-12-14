import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

      <html lang="en">
        <body>
           <Header />

          <main className="bg-white overflow-x-hidden relative">
            {children}
          </main>
          <Footer />
        </body>
      </html>

  );
}
