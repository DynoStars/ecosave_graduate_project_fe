import { generateMetadata } from "@/utils";

export const metadata = generateMetadata("Order", "The order history will be shown");

export default function OrderHistoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
