import React, { use, useEffect, useState } from "react";
import Layout from "../components/Layout";
import ActivityCard from "../components/ActivityCard";
import Pagination from "../components/Pagination";
import { RiFilterLine } from "react-icons/ri";
import { useRouter } from "next/router";

export default function ActivityScreen() {
  const router = useRouter();
  const [activity, setActivity] = useState([]);
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

  const fetchActivity = async (page) => {
    try {
      setLoading(true); // Mulai loading saat memuat data
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

  useEffect(() => {
    const { page = 1, minPrice, maxPrice, search } = router.query;
    setCurrentPage(parseInt(page) || 1);
    setMinPrice(minPrice || "");
    setMaxPrice(maxPrice || "");
    setSearchQuery(search || "");
    setTempMinPrice(minPrice || "");
    setTempMaxPrice(maxPrice || "");
    setTempSearchQuery(search || "");
  }, [
    router.query.page,
    router.query.minPrice,
    router.query.maxPrice,
    router.query.search,
  ]);

  useEffect(() => {
    fetchActivity(currentPage);
  }, [currentPage, minPrice, maxPrice, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true); // Set loading saat berpindah halaman
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page },
    });
  };

  const handleFilterChange = () => {
    setLoading(true);

    // Pengecekan apakah setidaknya satu filter telah diaplikasikan
    if (tempMinPrice || tempMaxPrice || tempSearchQuery) {
      // Set nilai filter yang baru
      setMinPrice(tempMinPrice);
      setMaxPrice(tempMaxPrice);
      setSearchQuery(tempSearchQuery);

      // Update URL query dengan nilai filter menggunakan router.push
      router.push({
        pathname: "/activity", // Ganti dengan path halaman Anda
        query: {
          minPrice: tempMinPrice || undefined,
          maxPrice: tempMaxPrice || undefined,
          search: tempSearchQuery || undefined,
        },
      });

      // Atur ulang halaman ke halaman pertama setelah menerapkan filter
      setCurrentPage(1);
    } else {
      setLoading(false); // Tidak ada filter yang diaplikasikan, jadi tidak perlu memuat data
    }

    setShowFilterModal(false); // Tutup modal setelah filter diterapkan
  };

  const handleClearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setTempMinPrice("");
    setTempMaxPrice("");
    setSearchQuery("");
    setTempSearchQuery("");
    setShowFilterModal(false); // Tutup modal setelah filter dibersihkan
    setLoading(true); // Set loading saat membersihkan filter
    setCurrentPage(1); // Set query page menjadi 1 saat membersihkan filter

    // Update URL query untuk membersihkan filter dan kembali ke halaman 1
    router.push({
      pathname: "/activity", // Ganti dengan path halaman Anda
      query: {
        minPrice: "",
        maxPrice: "",
        search: "",
        page: 1, // Set query page menjadi 1
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

  return (
    <Layout>
      <div className="px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Activity</h1>
        <div className="flex items-center mb-4">
          {/* Tombol untuk membuka modal */}
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <RiFilterLine className="mr-2" />
            Filter
          </button>
        </div>
        {/* Modal untuk filter */}
        {showFilterModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-96">
              {/* Konten modal */}
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
              {/* Tombol untuk menutup modal */}
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
          {/* Konten lain dari halaman */}
          {loading && (
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          )}

          {!loading && !notFound && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activity.map((a) => (
                <div key={a.id}>
                  <ActivityCard card={a} />
                </div>
              ))}
            </div>
          )}
          {notFound && (
            <p className="text-red-500">Activity tidak ditemukan.</p>
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
