import React from "react";
import { Button } from "antd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
interface CartButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}
const CartButton: React.FC<CartButtonProps> = ({ onClick, buttonRef }) => {
  return (
    <Button
      icon={<ShoppingCartIcon />}
      size="large"
      onClick={onClick}
      ref={buttonRef}
    />
  );
};
export default CartButton;
