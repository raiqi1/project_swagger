import React, { createContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  fetchVendorData,
  fetchActivityData,
  fetchActivityVendorData,
  fetchPackageData,
  fetchPackageVendorData,
  fetchTypeVendorData,
} from "../utils/api";
import VendorContent from "../components/Vendor/VendorContent";
import { set } from "mongoose";
import axios from "axios";
import { useRouter } from "next/router";

export const VendorContext = createContext();

export default function VendorScreen() {
  const router = useRouter();
  const [activity, setActivity] = useState([]);
  const [activityVendor, setActivityVendor] = useState([]);
  const [allActivityVendor, setAllActivityVendor] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [notFoundPackage, setNotFoundPackage] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState({});
  const [totalActivityPages, setTotalActivityPages] = useState(1);
  const [currentAllActivityPage, setCurrentAllActivityPage] = useState(1);
  const [totalActivityVendor, setTotalActivityVendor] = useState(1);
  const [currentActivityVendor, setCurrentActivityVendor] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [allPackage, setAllPackage] = useState([]);
  const [currentAllPackagePage, setCurrentAllPackagePage] = useState(1);
  const [totalPackagePages, setTotalPackagePages] = useState(1);
  const [packageVendor, setPackageVendor] = useState([]);
  const [currentPackageVendor, setCurrentPackageVendor] = useState(1);
  const [totalPackageVendor, setTotalPackageVendor] = useState(1);
  const [vendorType, setVendorType] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [loadingVendorType, setLoadingVendorType] = useState(true);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [vendorsData, setVendorsData] = useState([]);
  const [notFoundVendors, setNotFoundVendors] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // useEffect(() => {
  //   fetchVendor();
  // }, [currentPage, searchQuery]);

  // useEffect(() => {
  //   const queryParams = { search: searchQuery };
  //   router.push({ pathname: router.pathname, query: queryParams });
  // }, [searchQuery, currentPage, minPrice, maxPrice, selectedVendor, selectedTypes]);

  // useEffect(() => {
  //   const handleWindowBack = () => {
  //     // Update URL berdasarkan state yang sesuai
  //     const queryParams = { search: searchQuery };
  //     router.push({ pathname: router.pathname, query: queryParams });
  //   };

  //   window.addEventListener("popstate", handleWindowBack);

  //   return () => {
  //     window.removeEventListener("popstate", handleWindowBack);
  //   };
  // }, []);

  useEffect(() => {
    // Fetch jenis vendor hanya saat currentPage atau searchQuery berubah
    fetchTypeVendor();

    // Fetch aktivitas dan paket
    if (selectedVendor === "") {
      fetchActivity(currentPage);
      fetchPackage(currentPage);
    } else {
      fetchActivityVendor(currentPage);
      fetchPackageVendor(currentPage);
    }

    // Fetch aktivitas vendor saat selectedVendor atau currentActivityVendor berubah
    fetchActivityVendor(currentActivityVendor);

    // Fetch paket vendor saat selectedVendor atau currentPackageVendor berubah
    fetchPackageVendor(currentPackageVendor);

    // Fetch aktivitas saat currentAllActivityPage berubah
    fetchActivity(currentAllActivityPage);

    // Fetch paket saat currentAllPackagePage berubah
    fetchPackage(currentAllPackagePage);
  }, [
    currentPage,
    searchQuery,
    selectedVendor,
    currentActivityVendor,
    currentPackageVendor,
    currentAllActivityPage,
    currentAllPackagePage,
    minPrice,
    maxPrice,
  ]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setLoadingVendorType(true);
      let url = `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor?page=1&limit=10`;

      // Membuat query string untuk jenis aktivitas yang dipilih
      const selectedTypesQueryString = Object.keys(selectedTypes)
        .filter((key) => selectedTypes[key])
        .map((key) => encodeURIComponent(key))
        .join(",");

      // Menambahkan query string ke URL jika jenis aktivitas dipilih
      if (selectedTypesQueryString) {
        url += `&types=${selectedTypesQueryString}`;
      }

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "VACABADEV",
        },
      });

      const data = response.data;
      setVendorsData(data.data);
      setLoading(false);
      setLoadingVendorType(false);
      setNotFoundVendors(data.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      throw error;
    }
  };

  console.log("vendorsData", vendorsData);
  const handleClearFilterVendor = () => {
    setSelectedTypes({}); // Mengosongkan jenis aktivitas yang dipilih
    setIsFilterApplied(false); // Mengubah status filter menjadi tidak diterapkan
  };

  const fetchVendor = async () => {
    // try {
    //   setLoading(true);
    //   const dataVendor = await fetchVendorData(selectedTypes, searchQuery);
    //   setActivity(dataVendor.data);
    //   setLoading(false);
    //   setNotFound(dataVendor.data.length === 0);
    //   setNotFound(dataVendor.data.length === 0);
    // } catch (error) {
    //   setLoading(false);
    // }
  };

  const fetchTypeVendor = async () => {
    try {
      setLoading(true);
      setLoadingVendorType(true);
      const data = await fetchTypeVendorData();
      setVendorType(data.data);
      setLoading(false);
      setLoadingVendorType(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      setLoading(false);
    }
  };

  console.log("vendorType", vendorType);

  const fetchActivity = async (page) => {
    try {
      setLoading(true);
      setLoadingVendorType(true);
      const data = await fetchActivityData(
        page,
        searchQuery,
        minPrice,
        maxPrice
      );
      setAllActivityVendor(data.data);
      setTotalActivityPages(Math.ceil(data.meta.total / data.meta.limit));
      setLoading(false);
      setLoadingVendorType(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchPackage = async (page) => {
    try {
      setLoading(true);
      setLoadingVendorType(true);
      const dataPackage = await fetchPackageData(
        page,
        searchQuery,
        minPrice,
        maxPrice
      );
      setAllPackage(dataPackage.data);
      setTotalPackagePages(
        Math.ceil(dataPackage.meta.total / dataPackage.meta.limit)
      );
      setLoading(false);
      setLoadingVendorType(false);
      setNotFoundPackage(dataPackage.data.length === 0);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchActivityVendor = async (page) => {
    try {
      setLoading(true);
      setLoadingVendorType(true);
      const data = await fetchActivityVendorData(
        selectedVendor,
        page,
        searchQuery,
        minPrice,
        maxPrice
      );
      setActivityVendor(data.data);
      setTotalActivityVendor(Math.ceil(data.meta.total / data.meta.limit));
      setLoading(false);
      setLoadingVendorType(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchPackageVendor = async (page) => {
    try {
      setLoading(true);
      setLoadingVendorType(true);
      const data = await fetchPackageVendorData(
        selectedVendor,
        page,
        searchQuery,
        minPrice,
        maxPrice
      );
      setPackageVendor(data.data);
      setTotalPackageVendor(Math.ceil(data.meta.total / data.meta.limit));
      setLoading(false);
      setLoadingVendorType(false);
      setNotFoundPackage(data.data.length === 0);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const {
      page = 1,
      limit = 10,
      search = "",
      minPrice,
      maxPrice,
      vendor,
      selectedTypes,
      isFilterApplied,
    } = router.query;
    setCurrentPage(parseInt(page) || 1);
    setMinPrice(minPrice || "");
    setMaxPrice(maxPrice || "");
    setSearchQuery(search || "");
    setTempMinPrice(minPrice || "");
    setTempMaxPrice(maxPrice || "");
    setTempSearchQuery(search || "");
    setSelectedVendor(vendor || "");
    setIsFilterApplied(isFilterApplied || false);
    setSelectedTypes(
      selectedTypes
        ? selectedTypes.split(",").reduce((acc, type) => {
            acc[type] = true;
            return acc;
          }, {})
        : {}
    );
  }, [
    router.query.page,
    router.query.limit,
    router.query.search,
    router.query.minPrice,
    router.query.maxPrice,
    router.query.vendor,
    router.query.selectedTypes,
    router.query.isFilterApplied,
    router.query,
  ]);

  useEffect(() => {
    const handleWindowBack = () => {
      // Update URL berdasarkan state yang sesuai
      const queryParams = { search: searchQuery };
      router.push({ pathname: router.pathname, query: queryParams });

      // Mengosongkan jenis aktivitas yang dipilih

      setActivity([]);
      setSelectedTypes({});
    };

    window.addEventListener("popstate", handleWindowBack);

    // Membersihkan event listener saat komponen dibongkar (unmount)
    return () => {
      window.removeEventListener("popstate", handleWindowBack);
    };
  }, []);

  const handleApplyFilter = () => {
    setIsFilterApplied(true); // Mengubah status filter menjadi diterapkan

    // Konstruksi query string untuk jenis aktivitas yang dipilih
    const selectedTypesQueryString = Object.keys(selectedTypes)
      .filter((key) => selectedTypes[key])
      .map((key) => encodeURIComponent(key))
      .join(",");

    // Membuat objek query dengan jenis aktivitas yang dipilih
    const queryParams = { types: selectedTypesQueryString };

    // Menggunakan router.push untuk mengubah URL dengan query yang sesuai
    router.push({
      pathname: router.pathname, // Ganti dengan nama rute halaman Anda
      query: queryParams,
    });

    // Memanggil fetchVendors() untuk memperbarui data vendor dengan filter yang diterapkan
    fetchVendors();

    return () => {
      setIsFilterApplied(false);
    };
  };

  useEffect(() => {
    fetchVendors();
    if (isFilterApplied) {
      fetchVendors(); // Memanggil fetchVendor() hanya ketika filter sudah diterapkan
    }

    return () => {
      setIsFilterApplied(false);
    };
  }, [
    // selectedTypes,
    isFilterApplied, // Menambahkan isFilterApplied sebagai dependency
    setActivity,
  ]);

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);

    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page },
    });
  };

  const handleVendorChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === selectedVendor) {
      setSelectedVendor("");
      setSearchQuery("");
      setActivityVendor([]);
      setTempSearchQuery("");
      setPackageVendor([]);
      setNotFound(false);
      setNotFoundPackage(false);
      const queryParams = { ...router.query };
      delete queryParams.vendor;

      // Menggunakan router.push untuk mengubah URL tanpa query string "vendor"
      router.push({
        pathname: router.pathname, // Gunakan pathname yang saat ini
        query: queryParams,
      });
    } else {
      setSelectedVendor(selectedValue);

      // Jika vendor dipilih, menambahkan query string "vendor" ke URL
      const queryParams = { ...router.query, vendor: selectedValue };

      // Menggunakan router.push untuk mengubah URL dengan query string "vendor"
      router.push({
        pathname: router.pathname, // Gunakan pathname yang saat ini
        query: queryParams,
      });
    }
    setLoading(true);
  };

  const handleTypeSelect = (type) => {
    setSelectedTypes((prevTypes) => ({
      ...prevTypes,
      [type]: !prevTypes[type], // Toggle jenis aktivitas dipilih
    }));
  };

  const handleClearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setTempMinPrice("");
    setTempMaxPrice("");
    setSearchQuery("");
    // setLoading(true)
    // setLoading(false)
    setCurrentAllActivityPage(1);
    setCurrentAllActivityPage(1);
  };

  const handleFilterChange = () => {
    setLoading(true);
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    // setSearchQuery(tempSearchQuery);
    setShowFilterModal(false); // Tutup modal setelah filter diterapkan
    // handlePageChange(1);

    // Menggunakan router.push untuk mengubah URL dengan query pencarian dan filter yang sesuai

    router.push({
      pathname: router.pathname, // Ganti dengan path halaman Anda
      query: {
        minPrice: tempMinPrice || undefined,
        maxPrice: tempMaxPrice || undefined,
        search: tempSearchQuery || undefined,
      },
    });
  };

  const handleSearchChange = (e) => {
    setTempSearchQuery(e.target.value);
  };

  const searchActivity = () => {
    if (!tempSearchQuery) {
      fetchActivity(1);
    }

    setSearchQuery(tempSearchQuery);
    setLoading(true);
    setLoadingVendorType(true);

    // Konstruksi query string untuk pencarian
    const queryParams = { search: tempSearchQuery };

    // Menggunakan router.push untuk mengubah URL dengan query pencarian yang sesuai
    router.push({
      pathname: router.pathname, // Gunakan pathname yang saat ini
      query: queryParams,
    });

    // Reset halaman ke halaman pertama setelah pencarian
    setCurrentPage(1);
    setCurrentAllActivityPage(1);
    setCurrentAllPackagePage(1);
    setCurrentActivityVendor(1);
    setCurrentPackageVendor(1);

    setLoading(false);
    setLoadingVendorType(false);
  };

  const handleFilterAndSearch = () => {
    setLoading(true);
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    // setSearchQuery(tempSearchQuery);
    setCurrentPage(1); // Anda mungkin juga perlu mengatur halaman ke 1 tergantung pada logika aplikasi Anda.

    // Menggunakan router.push untuk mengubah URL dengan query pencarian dan filter yang sesuai
    router.push({
      pathname: router.pathname, // Ganti dengan path halaman Anda
      query: {
        minPrice: tempMinPrice || undefined,
        maxPrice: tempMaxPrice || undefined,
        search: tempSearchQuery || undefined,
      },
    });
  };

  // Menggunakan fungsi handleFilterAndSearch saat tombol "Terapkan" ditekan
  const handleApplyFilterAndSearch = () => {
    handleFilterChange();
  };

  console.log("allPackage", allPackage);
  console.log("allPackageVendor", packageVendor);
  console.log("");

  return (
    <Layout>
      <VendorContext.Provider
        value={{
          handleTypeSelect,
          handlePageChange,
          handleClearFilterVendor,
          handleApplyFilter,
          vendorsData,
          activity,
          setActivity,
          activityVendor,
          setActivityVendor,
          allActivityVendor,
          setAllActivityVendor,
          selectedVendor,
          setSelectedVendor,
          currentPage,
          setCurrentPage,
          totalPages,
          setTotalPages,
          searchQuery,
          setSearchQuery,
          loading,
          setLoading,
          notFound,
          setNotFound,
          selectedTypes,
          setSelectedTypes,
          totalActivityPages,
          setTotalActivityPages,
          currentAllActivityPage,
          setCurrentAllActivityPage,
          totalActivityVendor,
          setTotalActivityVendor,
          currentActivityVendor,
          setCurrentActivityVendor,
          handleVendorChange,
          handleClearFilter,
          minPrice,
          setMinPrice,
          maxPrice,
          setMaxPrice,
          allPackage,
          setAllPackage,
          currentAllPackagePage,
          setCurrentAllPackagePage,
          totalPackagePages,
          setTotalPackagePages,
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
          setFiltering,
          tempMinPrice,
          setTempMinPrice,
          tempMaxPrice,
          setTempMaxPrice,
          handleFilterChange,
          handleSearchChange,
          searchActivity,
          tempSearchQuery,
          setTempSearchQuery,
          loadingVendorType,
          setLoadingVendorType,
          handleFilterAndSearch,
          handleApplyFilterAndSearch,
        }}
      >
        <VendorContent />
      </VendorContext.Provider>
    </Layout>
  );
}
