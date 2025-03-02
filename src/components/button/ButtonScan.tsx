import { CheckCircle } from "lucide-react";
import { FC } from "react";

// Component Button tái sử dụng
interface ButtonProps {
  label: string;
}

const Button: FC<ButtonProps> = ({ label }) => {
  return (
    <button className="flex items-center gap-2 border border-green-500 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition">
      <CheckCircle className="w-5 h-5 text-green-500" />
      {label}
    </button>
  );
};

export default Button;