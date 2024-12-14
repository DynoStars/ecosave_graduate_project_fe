import { generateMetadata } from "@/utils";

export const metadata = generateMetadata("Login", "Log in to your account on LayRestaurant");

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
