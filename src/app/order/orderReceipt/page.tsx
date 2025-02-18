import React, { Suspense } from "react";
import OrderReceipt from "./OrderReceiptPage";
import Loading from "@/app/loading";

export default function OrderReceiptPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <OrderReceipt />
      </div>
    </Suspense>
  );
}
