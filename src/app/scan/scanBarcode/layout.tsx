import { generateMetadata } from "@/utils";
export const metadata = generateMetadata("Scan", "Scan the Barcode Information");
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
