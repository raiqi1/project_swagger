import React from "react";
import classNames from "classnames";

export default function PriceFilter({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  handleFilterChange,
  handleClearFilter,
  isLoading,
}) {
  const applyFilter = () => {
    handleFilterChange(); // Panggil fungsi handleFilterChange untuk menerapkan filter
  };

  return (
    <div className="mr-5 flex flex-col gap-2 mt-3 p-1">
      <h1 className="font-bold">Filter Harga</h1>
      <div className="flex flex-row gap-3">
        <input
          type="text"
          value={minPrice}
          className="border border-gray-300 p-2 rounded w-20 h-8"
          placeholder="Rp. min"
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <div className="mt-4 border-gray-500 border-t w-8 flex justify-center"></div>
        <input
          type="text"
          value={maxPrice}
          className="border border-gray-300 p-2 rounded w-20 h-8"
          placeholder="Rp. max"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <button
          className={classNames("bg-red-500 text-white p-1 rounded", {
            "opacity-50 cursor-not-allowed": isLoading,
          })}
          onClick={applyFilter} // Panggil fungsi applyFilter saat tombol "Terapkan" ditekan
          disabled={isLoading}
        >
          <h1 className="text-sm">{isLoading ? "Menerapkan..." : "Terapkan"}</h1>
        </button>
        <button
          className={classNames("bg-gray-300 text-black p-1 rounded", {
            "opacity-50 cursor-not-allowed": isLoading,
          })}
          onClick={handleClearFilter}
          disabled={isLoading}
        >
          <h1 className="text-sm">
            {isLoading ? "Membersihkan..." : "Hapus Filter"}
          </h1>
        </button>
      </div>
    </div>
  );
}
