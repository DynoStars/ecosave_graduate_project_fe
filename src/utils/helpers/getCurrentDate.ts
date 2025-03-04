export  const getCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Đảm bảo luôn có 2 chữ số
    const day = String(today.getDate()).padStart(2, "0"); // Đảm bảo luôn có 2 chữ số

    return `${year}-${month}-${day}`;
  };