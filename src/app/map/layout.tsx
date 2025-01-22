// pages/home.tsx
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata("Map", "To see all available nearing stores that contain experiens promational information");

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
