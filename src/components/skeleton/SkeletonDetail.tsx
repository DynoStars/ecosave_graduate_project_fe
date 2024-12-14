import { Skeleton } from "@mui/material";
import React from "react";
export default function SkeletonDetail() {
  return (
    <div className="detail flex gap-4 w-full bg-gray-50 h-full p-4 rounded-lg shadow-md">
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={530}
        height={500}
      />
      <div className="detail-content">
        <Skeleton variant="text" sx={{ fontSize: "2.5rem" }} width={400} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="100%" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="100%" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="90%" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="30%" />
      </div>
    </div>
  );
}
