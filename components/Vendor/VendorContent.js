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
  } = useContext(VendorContext);

  const [activeDetail, setActiveDetail] = useState("products");

  console.log("activityVendor", activityVendor);
  console.log("selectedVendor", selectedVendor);
  console.log("allPackage", allPackage);
  console.log("packageVendor", packageVendor);
  console.log("vendorType", vendorType);

  // useEffect(() => {
  //   if (selectedVendor === "") {
  //     setPackageVendor([]);
  //   }
  // }, []);

  useEffect(() => {
    if (loading) {
      setCurrentAllActivityPage(1);
      setCurrentAllPackagePage(1);
    }
  }, [loading]);
  

  return (
    <div className="mt-6 ml-6">
      <h1 className="text-2xl font-bold">Semua Vendor</h1>
      <div className="flex">
        <div className="mr-4">
          <VendorTypes
            activity={activity}
            selectedTypes={selectedTypes}
            handleTypeChange={handleTypeChange}
            setSelectedTypes={setSelectedTypes}
            vendorType={vendorType}
          />
          <div className="mt-4 flex flex-col">
            <label htmlFor="vendorSelect" className="mr-2">
              Choose Vendor:
            </label>
            <select
              id="vendorSelect"
              value={selectedVendor}
              onChange={handleVendorChange}
              className="border rounded py-1 px-2"
            >
              <VendorOptions
                vendors={activity.data || []}
                handleSelectChange={handleVendorChange}
              />
            </select>
          </div>
          <div>
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              handleClearFilter={handleClearFilter}
            />
          </div>
          <div>{loading && <p>Memuat...</p>}</div>
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
                    {!loading &&
                      selectedVendor === "" &&
                      allActivityVendor.map((a) => (
                        <ActivityCardVendor activity={a} key={a.id} />
                      ))}
                    {!loading &&
                      activityVendor.map((a) => (
                        <ActivityCardVendor activity={a} key={a.id} />
                      ))}
                  </div>
                  <div className="justify-center flex">
                    {activityVendor.length > 0 ? (
                      <PaginationVendor
                        currentPage={currentActivityVendor}
                        totalPages={totalActivityVendor}
                        setCurrentPage={setCurrentActivityVendor}
                      />
                    ) : (
                      ""
                    )}
                    {selectedVendor === "" && (
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
                      selectedVendor === "" &&
                      allPackage.map((p, i) => (
                        <PackageCardVendor packageCard={p} key={i} />
                      ))}
                    {!loading &&
                      packageVendor.map((c, i) => (
                        <PackageCardVendor packageCard={c} key={i} />
                      ))}
                  </div>
                  <div className="justify-center flex">
                    {packageVendor.length > 0 ? (
                      <PaginationVendor
                        currentPage={currentPackageVendor}
                        totalPages={totalPackageVendor}
                        setCurrentPage={setCurrentPackageVendor}
                      />
                    ) : (
                      ""
                    )}
                    {selectedVendor === "" && (
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
