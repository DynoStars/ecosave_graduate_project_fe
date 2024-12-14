import React from "react";
import { Skeleton } from "@mui/material"; // Assuming you're using Material-UI for skeletons

const RoomCardSkeleton: React.FC = () => {
  return (
    <div className="sm:w-[23%] w-full cart-hover rounded overflow-hidden bg-white">
      <div className="relative">
        <Skeleton variant="rectangular" width="100%" height={192} className="rounded-lg" />
        <div className="absolute top-0 left-0 m-2 bg-white rounded-full p-1 px-2 flex items-center">
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton variant="text" width={30} height={16} className="ml-1" />
        </div>
      </div>
      <div className="px-2 py-4">
        <div className="flex items-center justify-between mb-2">
          <Skeleton variant="text" width="50%" height={24} />
          <Skeleton variant="circular" width={12} height={12} />
        </div>
        <Skeleton variant="text" width="80%" height={20} className="mb-2" />
        <Skeleton variant="text" width="60%" height={20} />
      </div>
      <div className="px-2 pt-4 pb-2 flex items-center justify-between">
        <Skeleton variant="text" width="40%" height={24} />
      </div>
    </div>
  );
};

export default RoomCardSkeleton;
