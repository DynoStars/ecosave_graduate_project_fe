import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatMoney } from "@/utils";
interface OrderCardProps {
  id: string; // The unique ID for the product
  picture: string; // The URL for the product image
  name: string; // The name of the product
  price: string | number; // The price of the product, either a string or number
  onRemove: (id: string) => void; // The callback function to remove the item
  quantity: number; // The quantity of the product
}
const OrderCard: React.FC<OrderCardProps> = ({
  id,
  picture,
  name,
  price,
  onRemove,
  quantity,
}) => {
  return (
    <div className="flex items-center p-4 bg-gray-100 rounded relative w-full">
      <Link
        href={`/products/${id}`}
        className="flex items-center w-full"
      >
        <Image
          src={picture}
          alt={name}
          className="object-cover rounded mr-3"
          width={100} // Adjusted width and height for better image quality
          height={100}
        />
        <div className="flex flex-col flex-grow gap-1">
          <h3 className="text-sm font-semibold truncate-description ">
            {name}
          </h3>
          <p className="text-green-500">{formatMoney(Number(price))}</p>
        </div>
      </Link>
      <div className="flex items-center w-3/12">
        {/* The quantity display is fixed, no dynamic increment/decrement */}
        <span className="text-lg text-black">{quantity}</span>
      </div>
      <div className="flex items-center ml-4">
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-red-300 hover:bg-red-100 rounded-full p-2"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};


export default OrderCard;