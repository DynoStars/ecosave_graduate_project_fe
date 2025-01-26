import React, { useState } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface ToastNotificationProps {
  message: string;
  keyword: "SUCCESS" | "ERROR" | "WARNING" | "INFO";
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, keyword }) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = () => {
    setOpen(false);
  };

  const getAlertSeverity = (keyword: string): AlertColor => {
    switch (keyword) {
      case "SUCCESS":
        return "success";
      case "ERROR":
        return "error";
      case "WARNING":
        return "warning";
      case "INFO":
      default:
        return "info";
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={getAlertSeverity(keyword)} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
