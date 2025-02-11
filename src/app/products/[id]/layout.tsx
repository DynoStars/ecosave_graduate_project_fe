// pages/home.tsx
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata("Products Detail", "List of products that can be shown");

export default function ProductDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
