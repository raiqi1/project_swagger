import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function VendorScreen() {
  const [activity, setActivity] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [activityVendor, setActivityVendor] = useState([]);
  const [allActivityVendor, setAllActivityVendor] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [applyFilterClicked, setApplyFilterClicked] = useState(false);
  const [notFoundActivity, setNotFoundActivity] = useState(false);

  useEffect(() => {
    fetchVendor();
  }, []);

  const fetchVendor = async () => {
    try {
      let url = `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor?page=1&limit=10`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "VACABADEV",
        },
      });
      const data = response.data;
      setActivity(data.data);
      setNotFound(data.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleVendorChange = (event) => {
    const vendorId = event.target.value;
    setSelectedVendor(selectedVendor === vendorId ? "" : vendorId);
    setApplyFilterClicked(false);
  };

  const applyFilter = async () => {
    try {
      setApplyFilterClicked(true);
      if (!selectedVendor) {
        const data = await fetchActivity();
        setAllActivityVendor(data.data);
      } else {
        const data = await fetchActivityVendor(selectedVendor);
        setActivityVendor(data.data);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const fetchActivityVendor = async (vendorId, page = 1) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor/${vendorId}/activities?page=${page}&limit=20`,
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
      setActivityVendor(data.data);
      setNotFoundActivity(data.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const fetchActivity = async (page = 1) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity?page=${page}&limit=20&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&mostVisited=true`,
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
      setAllActivityVendor(data.data);
      setNotFoundActivity(data.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleClearFilter = () => {
    setActivityVendor(activity); // Setel kembali data allActivityVendor menjadi semua data vendor yang tersedia
    setSelectedVendor(""); // Reset vendor yang dipilih
    setSearchQuery(""); // Reset query pencarian
    setMinPrice(""); // Reset harga minimum
    setMaxPrice(""); // Reset harga maksimum
    setApplyFilterClicked(false); // Reset status filter menjadi belum diklik
    // setActivityVendor([]); // Kosongkan data aktivitas vendor
  };

  useEffect(() => {
    fetchActivity();
  }, [searchQuery, minPrice, maxPrice, applyFilterClicked]);

  useEffect(() => {
    if (activityVendor.length === 0) {
      setAllActivityVendor([]);
      setNotFoundActivity(true);
    }
  }, [activityVendor]);

  return (
    <Layout>
      <div className="mt-5">Pilih Vendor:</div>
      <div className="flex flex-col">
        <div>
          <button className="bg-gray-500" onClick={handleClearFilter}>
            Hapus Filter
          </button>
        </div>
        {activity?.data?.map((vendor) => (
          <label key={vendor.id} className="inline-flex items-center">
            <input
              type="checkbox"
              value={vendor.id}
              checked={selectedVendor === vendor.id}
              onChange={handleVendorChange}
              className="form-checkbox h-3 w-3 text-blue-600"
            />
            <span className="ml-2 w-56">{vendor.name}</span>
          </label>
        ))}
        {notFound && <div>Tidak Tersedia</div>}
      </div>
      <button className="bg-gray-500" onClick={applyFilter}>
        Terapkan
      </button>
      <div>
        <div>
          {activityVendor.length === 0 &&
            allActivityVendor.map((vendor) => (
              <div key={vendor.id}>{vendor.name}</div>
            ))}
        </div>
        <div className="mt-5">
          {activityVendor.length >= 0 &&
            activityVendor.map((vendor) => (
              <div key={vendor.id} className="mt-5">
                {vendor.name}
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
