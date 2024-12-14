import { Skeleton } from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";
export default function SkeletonCard() {
  const { theme } = useTheme();
  return (
    <div
      className={`${theme} flex flex-col p-5 rounded-lg overflow-hidden gap-1.5`}
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={320}
        height={130}
      />
      <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width="60%" />
    </div>
  );
}
