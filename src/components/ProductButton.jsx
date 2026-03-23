import React from "react";

function ProductButton({ product, onBuy }) {

  const handleClick = () => {
    if (typeof onBuy === "function") {
      onBuy(product);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold transition"
    >
      เพิ่มลงตะกร้า
    </button>
  );
}

export default ProductButton;