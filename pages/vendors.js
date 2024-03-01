import React, { use, useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios"; // Import axios
import { fetchVendorData, fetchTypeVendorData } from "../utils/api";

export default function VendorScreen() {
  const [activity, setActivity] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState({});
  const [isFilterApplied, setIsFilterApplied] = useState(false); // Menyimpan status apakah filter sudah diterapkan

  const handleApplyFilter = () => {
    setIsFilterApplied(true); // Mengubah status filter menjadi diterapkan
  };

  //   useEffect(() => {

  //   });

  useEffect(() => {
    fetchVendor();
    if (isFilterApplied) {
      fetchVendor(); // Memanggil fetchVendor() hanya ketika filter sudah diterapkan
    }

    // Kembalikan status filter menjadi tidak diterapkan

    return () => {
      setIsFilterApplied(false);
    };
  }, [
    // selectedTypes,
    isFilterApplied, // Menambahkan isFilterApplied sebagai dependency
  ]);

  const handleClearFilter = () => {
    setSelectedTypes({}); // Mengosongkan jenis aktivitas yang dipilih
    setIsFilterApplied(false); // Mengubah status filter menjadi tidak diterapkan
  };

  console.log("activity", activity);
  console.log("selectedTypes", selectedTypes);

  const fetchVendor = async () => {
    try {
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
      setActivity(data.data);
      setNotFound(data.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      throw error;
    }
  };

  const typeFilter = [
    "Outdoor",
    "Landscape",
    "Beach Club",
    "Entertainment",
    "Adventure",
    "watersports",
    "education",
    "Watersport",
    "Dive",
    "test",
    "test 2",
    "Event Organizer",
  ];

  const handleTypeSelect = (type) => {
    setSelectedTypes((prevTypes) => ({
      ...prevTypes,
      [type]: !prevTypes[type], // Toggle jenis aktivitas dipilih
    }));
  };

  return (
    <Layout>
      <div>
        <div className="flex flex-col gap-2">
          <span>Pilih Jenis Aktivitas</span>
          {typeFilter.map((type) => (
            <div key={type}>
              <input
                type="checkbox"
                checked={selectedTypes[type] || false}
                onChange={() => handleTypeSelect(type)}
              />
              <label>{type}</label>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={handleApplyFilter}>Terapkan</button>
          <button onClick={handleClearFilter}>Hapus Filter</button>
        </div>
      </div>
      <div className="mt-5">Pilih Vendor:</div>
      <div className="flex flex-col max-h-[100px] overflow-x-hidden overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
        {activity?.data?.map((vendor) => (
          <div key={vendor.id}>{vendor.name}</div>
        ))}
        {notFound && <div>Tidak Tersedia</div>}
      </div>
    </Layout>
  );
}
