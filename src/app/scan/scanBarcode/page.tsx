

import { getAccessToken } from "@/utils/helpers/getAccessToken";
import BarcodeScanner from "./Scan";
import { redirect } from "next/navigation";

const ScanPage = () => {
  const token = getAccessToken();
    if (!token) {
      // If no token, redirect to login
      redirect("/login");
    }
  return (
    <div className="p-4">
      <BarcodeScanner />
    </div>
  );
};

export default ScanPage;
