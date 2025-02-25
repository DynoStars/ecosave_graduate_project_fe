// pages/home.tsx
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata("Notifications", "Welcome to LayRestaurant, the best platform for booking food and rooms");

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
