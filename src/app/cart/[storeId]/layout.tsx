import { generateMetadata } from "@/utils";

export const metadata = generateMetadata("CartDetail", "List of products group by store will be shown");

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
