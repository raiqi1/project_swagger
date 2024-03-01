import React, { useState } from "react";

export default function VendorTypes({
  selectedTypes,
  setSelectedTypes,
  handleTypeChange,
  vendorType,
  handleClearFilterVendor,
  handleApplyFilter,
  handleTypeSelect
}) {
  const [isOpen, setIsOpen] = useState(false);

 

  const typeVendor = vendorType?.data?.flatMap((f) => f.types);
  const uniqueType = [...new Set(typeVendor)];

  return (
    <div className="mt-4 relative">
      <button
        className="block font-medium cursor-pointer bg-white border border-gray-300 w-fit rounded p-1 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
        style={{ zIndex: 1 }}
      >
        Pilih Vendor
      </button>
      {isOpen && (
        <div className="absolute  bg-white border border-gray-300 shadow-md rounded-md w-48 p-3">
          <div className="max-h-[200px] overflow-y-auto">
            {uniqueType.map((type) => (
              <label
                key={type}
                className="flex items-center py-1 px-3 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  value={type}
                  checked={selectedTypes[type] || false}
                  onChange={() => handleTypeSelect(type)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                  defaultValue={type}
                />
                <span className="ml-2">{type}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3 mt-2 h-8 w-full">
            <button
              onClick={handleApplyFilter}
              className="bg-blue-500 text-white p-1 rounded w-full"
            >
              Apply
            </button>
            <button
              onClick={handleClearFilterVendor}
              className="bg-gray-300 text-black p-1 rounded w-full"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
