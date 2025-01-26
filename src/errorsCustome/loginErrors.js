export const loginErrors = {
  errors: {
    "400": {
      code: 400,
      message: "Yêu cầu không hợp lệ.",
      customMessage: "Dữ liệu gửi lên không đúng định dạng hoặc thiếu thông tin cần thiết."
    },
    "401": {
      code: 401,
      message: "Unauthorized.",
      customMessage: "Tài khoản hoặc mật khẩu không đúng."
    },
    "403": {
      code: 403,
      message: "Forbidden.",
      customMessage: "Tài khoản của bạn đã bị khóa hoặc không được phép đăng nhập."
    },
    "404": {
      code: 404,
      message: "Not Found.",
      customMessage: "Tài khoản không tồn tại. Vui lòng kiểm tra lại thông tin đăng nhập."
    },
    "419": {
      code: 419,
      message: "Page Expired.",
      customMessage: "Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại."
    },
    "429": {
      code: 429,
      message: "Too Many Requests.",
      customMessage: "Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau."
    },
    "500": {
      code: 500,
      message: "Internal Server Error.",
      customMessage: "Hệ thống đang gặp sự cố. Vui lòng thử lại sau."
    },
    "503": {
      code: 503,
      message: "Service Unavailable.",
      customMessage: "Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau."
    }
  }
}; // Thêm "as const" để cố định kiểu
