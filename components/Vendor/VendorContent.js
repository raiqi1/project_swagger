import React, { useContext, useEffect, useState } from "react";
import VendorTypes from "./VendorTypes";
import VendorOptions from "./VendorOption";
import ActivityCardVendor from "./ActivityCardVendor";
import PaginationVendor from "./PaginationVendor";
import PriceFilter from "../Activity/PriceFilter";
import { VendorContext } from "../../pages/vendor";
import PackageCardVendor from "./PackageCardVendor";

function VendorContent() {
  const {
    activity,
    selectedTypes,
    setSelectedTypes,
    handleTypeChange,
    selectedVendor,
    handleVendorChange,
    loading,
    notFound,
    allActivityVendor,
    activityVendor,
    setActivityVendor,
    currentActivityVendor,
    totalActivityVendor,
    currentAllActivityPage,
    totalActivityPages,
    setCurrentAllActivityPage,
    setCurrentActivityVendor,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    handleClearFilter,
    allPackage,
    currentAllPackagePage,
    setCurrentAllPackagePage,
    totalPackagePages,
    packageVendor,
    setPackageVendor,
    currentPackageVendor,
    setCurrentPackageVendor,
    totalPackageVendor,
    setTotalPackageVendor,
    vendorType,
    setVendorType,
    notFoundPackage,
    setNotFoundPackage,
    filtering,
    tempMinPrice,
    setTempMinPrice,
    tempMaxPrice,
    setTempMaxPrice,
    handleFilterChange,
    tempSearchQuery,
    setSearchQuery,
    handleSearchChange,
    searchActivity,
    loadingVendorType,
    setLoadingVendorType,
  } = useContext(VendorContext);

  const [activeDetail, setActiveDetail] = useState("products");
  const [showActivityNotFound, setShowActivityNotFound] = useState(false);

  console.log("activityVendor", activityVendor);
  console.log("selectedVendor", selectedVendor);
  console.log("allPackage", allPackage);
  console.log("packageVendor", packageVendor);
  console.log("vendorType", vendorType);

  // useEffect(() => {
  //   // Reset pagination saat loading
  //   if (loading) {
  //     setCurrentAllActivityPage(1);
  //     setCurrentPackageVendor(1);
  //   }
  // }, [loading]);

  // useEffect(() => {
  //   if (selectedVendor === "") {
  //     setActivityVendor(allActivityVendor);
  //     setPackageVendor(allPackage);
  //   }
  // }, [selectedVendor]);
  return (
    <div className="mt-6 ml-6">
      <h1 className="text-2xl font-bold">Semua Vendor</h1>
      <div className="flex">
        <div className="mr-4">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={tempSearchQuery} // Gunakan nilai sementara pencarian
              onChange={handleSearchChange}
              placeholder="Cari aktivitas..."
              className="border rounded py-1 px-2 mr-2"
            />
            <button
              onClick={searchActivity}
              className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
            >
              Cari
            </button>
            <button
              onClick={handleClearFilter}
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              Clear Filter
            </button>
          </div>
          <VendorTypes
            activity={activity}
            selectedTypes={selectedTypes}
            handleTypeChange={handleTypeChange}
            setSelectedTypes={setSelectedTypes}
            vendorType={vendorType}
          />
          <div className="mt-5">Pilih Vendor:</div>
          <div className="flex flex-col max-h-[100px] overflow-x-hidden overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
            {activity?.data?.map((vendor) => (
              <VendorOptions
                vendor={vendor}
                key={vendor.id}
                selectedVendor={selectedVendor}
                handleVendorChange={handleVendorChange}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#888 #f1f1f1",
                }}
              />
            ))}
          </div>

          <div>
            <PriceFilter
              minPrice={tempMinPrice}
              maxPrice={tempMaxPrice}
              setMinPrice={setTempMinPrice}
              setMaxPrice={setTempMaxPrice}
              handleClearFilter={handleClearFilter}
              filtering={filtering}
              handleFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="flex">
          <div className=" w-full">
            <ul className="flex gap-8 w-full mt-4">
              <li className="">
                <button
                  onClick={() => setActiveDetail("products")}
                  className={`transition ${
                    activeDetail === "products"
                      ? "border-b-2 border-black text-black"
                      : "border-b hover:border-b-2 hover:border-black"
                  }`}
                >
                  Products
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => setActiveDetail("packagesection")}
                  className={`transition ${
                    activeDetail === "packagesection"
                      ? "border-b-2 border-black text-black"
                      : "border-b hover:border-b-2 hover:border-black"
                  }`}
                >
                  Packages
                </button>
              </li>
            </ul>
            <div>
              {activeDetail === "products" && (
                <section className="mt-4 mb-4 flex flex-col ">
                  <div className="flex gap-5">
                    <div className="flex flex-wrap gap-7">
                      {!loading &&
                        !loadingVendorType &&
                        selectedVendor === "" &&
                        allActivityVendor.map((a) => (
                          <ActivityCardVendor activity={a} key={a.id} />
                        ))}
                      {!loading &&
                        !loadingVendorType &&
                        activityVendor.map((a) => (
                          <ActivityCardVendor activity={a} key={a.id} />
                        ))}
                    </div>
                    <div>
                      <div>
                        {loading && (
                          <div className="flex ml-[420px] mt-[150px] justify-center">
                            <div className="flex flex-col items-center">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900"></div>
                              <p className="text-sm mt-2">Loading...</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        {!loading &&
                          !loadingVendorType &&
                          notFound &&
                          activeDetail === "products" && (
                            <p>Tidak ada aktivitas yang ditemukan.</p>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="justify-center flex">
                    {!loading &&
                    !loadingVendorType &&
                    activityVendor.length > 0 ? (
                      <PaginationVendor
                        currentPage={currentActivityVendor}
                        totalPages={totalActivityVendor}
                        setCurrentPage={setCurrentActivityVendor}
                      />
                    ) : (
                      ""
                    )}
                    {!loading &&
                      !loadingVendorType &&
                      selectedVendor === "" && (
                        <PaginationVendor
                          currentPage={currentAllActivityPage}
                          totalPages={totalActivityPages}
                          setCurrentPage={setCurrentAllActivityPage}
                        />
                      )}
                  </div>
                </section>
              )}
              {activeDetail === "packagesection" && (
                <section className="mt-4 mb-4 flex flex-col">
                  <div className="flex gap-5">
                    {!loading &&
                      !loadingVendorType &&
                      selectedVendor === "" &&
                      allPackage.map((p, i) => (
                        <PackageCardVendor packageCard={p} key={i} />
                      ))}
                    {!loading &&
                      !loadingVendorType &&
                      packageVendor.map((c, i) => (
                        <PackageCardVendor packageCard={c} key={i} />
                      ))}
                  </div>
                  <div>
                    <div>
                      {loading && (
                        <div className="">
                          <div className="">
                            <div className="animate-spin rounded-full  border-b-4 border-gray-900"></div>
                            <p className="text-sm mt-2">Loading...</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      {!loading && !loadingVendorType && notFoundPackage && (
                        <p>Tidak ada package yang ditemukan.</p>
                      )}
                    </div>
                  </div>
                  <div className="justify-center flex">
                    {!loading &&
                    !loadingVendorType &&
                    packageVendor.length > 0 ? (
                      <PaginationVendor
                        currentPage={currentPackageVendor}
                        totalPages={totalPackageVendor}
                        setCurrentPage={setCurrentPackageVendor}
                      />
                    ) : (
                      ""
                    )}
                    {!loading &&
                      !loadingVendorType &&
                      selectedVendor === "" && (
                        <PaginationVendor
                          currentPage={currentAllPackagePage}
                          totalPages={totalPackagePages}
                          setCurrentPage={setCurrentAllPackagePage}
                        />
                      )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorContent;
