import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ActivityCard from "../components/ActivityCard";
import PackageCard from "../components/PackageCard";
import Pagination from "../components/Pagination";
import { RiFilterLine } from "react-icons/ri";
import { useRouter } from "next/router";

export default function ActivityScreen() {
  const router = useRouter();
  const [activity, setActivity] = useState([]);
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("activity");
  const [selectedVendor, setSelectedVendor] = useState(""); // State untuk vendor yang dipilih
  const [vendorList, setVendorList] = useState([]); // State untuk daftar vendor
  const [selectedVendorActivity, setSelectedVendorActivity] = useState("");
  const [selectedVendorPackages, setSelectedVendorPackages] = useState("");
  // Daftar nama vendor

  // State untuk menyimpan status checked setiap vendor
  const [vendorStatus, setVendorStatus] = useState("");

  useEffect(() => {
    const { page = 1, minPrice, maxPrice, search, vendor } = router.query;
    setCurrentPage(parseInt(page) || 1);
    setMinPrice(minPrice || "");
    setMaxPrice(maxPrice || "");
    setSearchQuery(search || "");
    setTempMinPrice(minPrice || "");
    setTempMaxPrice(maxPrice || "");
    setTempSearchQuery(search || "");
    setSelectedVendor(vendor || "");
  }, [
    router.query.page,
    router.query.minPrice,
    router.query.maxPrice,
    router.query.search,
    router.query.vendor,
  ]);

  useEffect(() => {
    // Fetch data aktivitas atau paket wisata berdasarkan tab aktif dan vendor yang dipilih
    if (activeTab === "activity") {
      if (selectedVendor) {
        fetchActivityVendorData(currentPage);
      } else {
        fetchActivity(currentPage);
      }
    } else if (activeTab === "packages") {
      if (selectedVendor) {
        fetchPackageVendorData(currentPage);
      } else {
        fetchPackages(currentPage);
      }
    }
  }, [currentPage, minPrice, maxPrice, searchQuery, activeTab, selectedVendor]);

  const fetchActivity = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity?page=${page}&limit=12&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&mostVisited=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data aktivitas");
      }

      const data = await response.json();
      setActivity(data.data);
      const totalPages = Math.ceil(data.meta.total / data.meta.limit);
      setTotalPages(totalPages);
      setLoading(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setLoading(false);
    }
  };

  const fetchPackages = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/package?page=${page}&limit=8&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&mostVisited=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data paket wisata");
      }

      const data = await response.json();
      setPackages(data.data);
      const totalPages = Math.ceil(data.meta.total / data.meta.limit);
      setTotalPages(totalPages);
      setLoading(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setLoading(false);
    }
  };

  console.log("packages", packages);

  const fetchActivityVendorData = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor/${selectedVendor}/activities?page=${page}&limit=8&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&nearest=false`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data aktivitas vendor");
      }

      const data = await response.json();
      setActivity(data.data);
      const totalPages = Math.ceil(data.meta.total / data.meta.limit);
      setTotalPages(totalPages);
      setLoading(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setLoading(false);
    }
  };

  const fetchPackageVendorData = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor/${selectedVendor}/packages?page=${page}&limit=3&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&nearest=false`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data paket wisata vendor");
      }

      const data = await response.json();
      setPackages(data.data);
      const totalPages = Math.ceil(data.meta.total / data.meta.limit);
      setTotalPages(totalPages);
      setLoading(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setLoading(false);
    }
  };

  const fetchVendorList = async () => {
    try {
      const response = await fetch(
        "https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor?page=1&limit=50&search=",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data vendor");
      }

      const data = await response.json();
      setVendorList(data.data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page, vendor: selectedVendor }, // Sertakan selectedVendor dalam query saat mengubah halaman
    });
  };

  useEffect(() => {
    fetchVendorList();
  }, []);

  // Fungsi untuk menerapkan filter yang dipilih
  // Fungsi untuk menerapkan filter yang dipilih
  const handleFilterChange = () => {
    setLoading(true);

    let selectedVendor = "";
    if (activeTab === "activity") {
      selectedVendor = selectedVendorActivity;
    } else if (activeTab === "packages") {
      selectedVendor = selectedVendorPackages;
    }

    if (tempMinPrice || tempMaxPrice || tempSearchQuery || selectedVendor) {
      setMinPrice(tempMinPrice);
      setMaxPrice(tempMaxPrice);
      setSearchQuery(tempSearchQuery);

      router.push({
        pathname: "/activity",
        query: {
          minPrice: tempMinPrice || undefined,
          maxPrice: tempMaxPrice || undefined,
          search: tempSearchQuery || undefined,
          type: activeTab,
          vendor: selectedVendor || undefined,
        },
      });

      setCurrentPage(1);
    } else {
      setLoading(false);
    }

    setShowFilterModal(false);
  };

  const handleClearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setTempMinPrice("");
    setTempMaxPrice("");
    setSearchQuery("");
    setTempSearchQuery("");
    setShowFilterModal(false);
    setLoading(true);
    setCurrentPage(1);
    setSelectedVendor(""); // Reset selectedVendor ketika filter dihapus

    router.push({
      pathname: "/activity",
      query: {
        minPrice: "",
        maxPrice: "",
        search: "",
        page: 1,
        type: activeTab,
        vendor: "", // Kosongkan nilai vendor dalam query saat filter dihapus
      },
    });
  };

  const handleSearchChange = (e) => {
    setTempSearchQuery(e.target.value);
  };

  const searchActivity = () => {
    setSearchQuery(tempSearchQuery);
    setLoading(true);
    setCurrentPage(1);
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);

    let selectedVendor = "";
    if (tab === "activity") {
      selectedVendor = selectedVendorActivity || ""; // Menetapkan nilai string kosong jika tidak ada vendor yang dipilih
    } else if (tab === "packages") {
      selectedVendor = selectedVendorPackages || ""; // Menetapkan nilai string kosong jika tidak ada vendor yang dipilih
    }

    if (tab === "activity") {
      setSelectedVendorActivity(selectedVendor);
    } else if (tab === "packages") {
      setSelectedVendorPackages(selectedVendor);
    }
    
  };

  // Fungsi untuk menangani perubahan status checked checkbox vendor
  // Fungsi untuk menangani perubahan status checked checkbox vendor
  // Fungsi untuk menangani perubahan status checked checkbox vendor
  const handleVendorChange = (vendor) => {
    // Ubah status checked vendor sesuai dengan tab yang aktif
    if (activeTab === "activity") {
      const updatedStatus = {
        ...vendorStatus,
        [vendor]: !vendorStatus[vendor],
      };
      setVendorStatus(updatedStatus);
      setSelectedVendorActivity(updatedStatus[vendor] ? vendor : "");
    } else if (activeTab === "packages") {
      const updatedStatus = {
        ...vendorStatus,
        [vendor]: !vendorStatus[vendor],
      };
      setVendorStatus(updatedStatus);
      setSelectedVendorPackages(updatedStatus[vendor] ? vendor : "");

      // Perbarui URL dengan menyertakan nilai selectedVendor
      let selectedVendor = updatedStatus[vendor] ? vendor : "";
      router.push({
        pathname: router.pathname,
        query: { ...router.query, vendor: selectedVendor },
      });
    }
  };

  return (
    <Layout>
      <div className="px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Activity & Packages</h1>
        <div className="mb-4">
          <label htmlFor="vendorSelect" className="block">
            Pilih Vendor:
          </label>
          <select
            id="vendorSelect"
            className="border rounded py-1 px-2 w-full"
            value={selectedVendor}
            onChange={(e) => {
              setSelectedVendor(e.target.value);
              handleVendorChange(e.target.value); // Panggil fungsi handleVendorChange saat nilai vendor berubah
              router.push({
                pathname: router.pathname,
                query: { ...router.query, vendor: e.target.value },
              });
            }}
          >
            <option value="">Pilih vendor</option>
            {vendorList?.data?.map(
              (
                vendor // Perubahan disini
              ) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              )
            )}
          </select>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button
              onClick={() => handleTabChange("activity")}
              className={`mr-4 font-medium ${
                activeTab === "activity" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              Activity
            </button>
            <button
              onClick={() => handleTabChange("packages")}
              className={`font-medium ${
                activeTab === "packages" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              Packages
            </button>
          </div>
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <RiFilterLine className="mr-2" />
            Filter
          </button>
        </div>
        {showFilterModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-96">
              <div className="mb-4">
                <input
                  type="text"
                  value={tempSearchQuery}
                  onChange={handleSearchChange}
                  placeholder="Cari aktivitas..."
                  className="border rounded py-1 px-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={tempMinPrice}
                  onChange={(e) => setTempMinPrice(e.target.value)}
                  placeholder="Harga Minimum"
                  className="border rounded py-1 px-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(e.target.value)}
                  placeholder="Harga Maksimum"
                  className="border rounded py-1 px-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleFilterChange}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
                >
                  Terapkan
                </button>
                <button
                  onClick={handleClearFilter}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Bersihkan
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 ml-2"
                >
                  Tutup
                </button>
              </div>
              <button
                onClick={() => setShowFilterModal(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                X
              </button>
            </div>
          </div>
        )}
        <div>
          {loading && (
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          {!loading && !notFound && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTab === "activity" &&
                activity.map((a) => (
                  <div key={a.id}>
                    <ActivityCard card={a} />
                  </div>
                ))}
              {activeTab === "packages" &&
                packages.map((p) => (
                  <div key={p.id}>
                    <PackageCard card={p} />
                  </div>
                ))}
            </div>
          )}
          {notFound && !loading && (
            <p className="text-red-500">
              {activeTab === "activity"
                ? "Activity tidak ditemukan."
                : "Packages tidak ditemukan."}
            </p>
          )}
          {!loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              notFound={notFound}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
