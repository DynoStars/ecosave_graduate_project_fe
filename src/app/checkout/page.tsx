import React, { Suspense } from "react";
import Loading from "../loading";
import Checkout from "./Checkout";

export default function CheckoutPage() {
  // // Get token on the server
  // const token = getAccessToken();
  // if (!token) {
  //   // If no token, redirect to login
  //   redirect("/login");
  // }

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Checkout />
      </div>
    </Suspense>
  );
}
