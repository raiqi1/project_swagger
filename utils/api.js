export async function fetchVendorData(selectedTypes, searchQuery) {
  try {
    const response = await fetch(
      `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor?page=1&limit=10&types=${Object.keys(
        selectedTypes
      ).join(",")}&search=${searchQuery}`,
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
    return data;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error;
  }
}

export async function fetchActivityData(page, searchQuery, minPrice, maxPrice) {
  try {
    const response = await fetch(
      `https://api.dev.vacaba.id/api/v1/activity-service/activity?page=${page}&limit=3&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&mostVisited=true`,
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
    return data;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error;
  }
}

export async function fetchActivityVendorData(
  selectedVendor,
  page,
  searchQuery,
  minPrice,
  maxPrice
) {
  try {
    const response = await fetch(
      `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor/${selectedVendor}/activities?page=${page}&limit=1&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&nearest=false`,
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
    return data;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error;
  }
}

export async function fetchPackageData(page, searchQuery, minPrice, maxPrice) {
  try {
    const response = await fetch(
      `https://api.dev.vacaba.id/api/v1/activity-service/package?page=${page}&limit=2&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&mostVisited=true`,
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
    return data;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error;
  }
}

export async function fetchPackageVendorData(
  selectedVendor,
  page,
  searchQuery,
  minPrice,
  maxPrice
) {
  try {
    const response = await fetch(
      `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor/${selectedVendor}/packages?page=${page}&limit=2&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&nearest=false`,
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
    return data;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error;
  }
}
