import React from "react";
import { useRouter } from "next/router";

const PaginationVendor = ({
  currentPage,
  totalPages,
  setCurrentPage,
  handlePageChange,
}) => {
  const router = useRouter();

  return (
    <div className="mt-4">
      {totalPages > 0 && (
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 bg-gray-200 rounded ${
                currentPage === index + 1 ? "bg-gray-500 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaginationVendor;
