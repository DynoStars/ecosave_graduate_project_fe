import { generateMetadata } from "@/utils";


export const metadata = generateMetadata(
  "Checkout",
  "Welcome to LayRestaurant, the best platform for booking food and rooms"
);


export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
