// pages/home.tsx
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata("Order", "Welcome to LayRestaurant, the best platform for booking food and rooms");

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
