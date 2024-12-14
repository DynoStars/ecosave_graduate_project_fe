import React from "react";
import { Avatar } from "@mui/material";

const SkeletonHeaderMessage: React.FC = () => {
  return (
    <>
      <div className="flex items-center">
        <Avatar
          className="mr-4"
          alt="Loading..."
          sx={{ width: 24, height: 24, backgroundColor: "#ccc" }}
        />
        <div>
          <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-36"></div>
        </div>
      </div>
      
    </>
  );
};

export default SkeletonHeaderMessage;
