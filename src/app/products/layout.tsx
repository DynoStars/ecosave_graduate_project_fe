// pages/home.tsx
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata("Products", "List of products that can be shown");

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
