import { generateMetadata } from "@/utils";

export const metadata = generateMetadata("Register", "Register a new account on LayRestaurant");

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}