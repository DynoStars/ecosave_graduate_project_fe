import React from "react";
import { Avatar } from "@mui/material";

const SkeletonMessageItem: React.FC = () => {
  return (
    <div className="flex items-center p-4  border-b border-gray-300 animate-pulse">
      <Avatar
        className="mr-4"
        alt="Loading..."
        sx={{ width: 24, height: 24, backgroundColor: "#ccc" }}
      />
      <div className="ml-4 flex-1">
        <div className="flex flex-col justify-between">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMessageItem;
