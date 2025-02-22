import React, { Suspense } from "react";
import OrderReceipt from "./OrderReceiptPage";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/utils/helpers/getAccessToken";
export default function OrderReceiptPage() {
  const token = getAccessToken();
  if (!token) {
    // If no token, redirect to login
    redirect("/login");
  }
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <OrderReceipt />
      </div>
    </Suspense>
  );
}
