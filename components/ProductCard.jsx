import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-3 flex flex-col items-center text-yellow-300 shadow-md hover:shadow-yellow-500/40 transition">
      <img
        src={product.image || "/product.png"}
        alt={product.name}
        className="w-28 h-28 object-cover rounded-md mb-3"
      />
      <h3 className="font-bold text-center">{product.name}</h3>
      <p className="text-gray-400 text-sm mb-2">{product.price} บาท</p>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded-full text-sm"
      >
        เพิ่มลงตะกร้า
      </button>
    </div>
  );
};

export default ProductCard;