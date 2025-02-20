// pages/home.tsx
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata("Order receipt", "Welcome to LayRestaurant, the best platform for booking food and rooms");

export default function OrderReceiptLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
