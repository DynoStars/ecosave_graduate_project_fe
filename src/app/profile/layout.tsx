// pages/user-profile.tsx
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata("User Profile", "User information will be shown");

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
