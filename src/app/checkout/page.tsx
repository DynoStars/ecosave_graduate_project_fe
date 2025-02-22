// app/checkout/page.tsx
import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import Loading from "../loading";
import Checkout from "./Checkout";
import { getAccessToken } from "@/utils/helpers/getAccessToken";

export default function CheckoutPage() {
  // Get token on the server
  const token = getAccessToken();
  if (!token) {
    // If no token, redirect to login
    redirect("/login");
  }
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Checkout />
      </div>
    </Suspense>
  );
}
