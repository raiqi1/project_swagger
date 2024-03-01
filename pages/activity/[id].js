import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import ActivityPage from "../../components/Activity/ActivityPage";
import Galeri from "../../components/Activity/Galery";
import Terms from "../../components/Activity/Terms";
import ResponsiveAct from "../../components/Activity/ResponsiveAct";

export default function ActivityDetails() {
  const [activity, setActivity] = useState({});
  const [images, setImages] = useState([]);
  const [terms, setTerms] = useState([]);
  const [activeDetail, setActiveDetail] = useState("galery");
  const [loading, setLoading] = useState(true);

  const fetchDetails = async (id) => {
    try {
      const res = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );
      const data = await res.json();
      setActivity(data);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil detail aktivitas:",
        error
      );
    }
  };

  const fetchImages = async (id) => {
    try {
      const res = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity/${id}/gallery`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );
      const dataImages = await res.json();
      setImages(dataImages);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil gambar aktivitas:",
        error
      );
    }
  };

  const fetchTerms = async (id) => {
    try {
      const resp = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity/${id}/terms-conditions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );
      const dataTerms = await resp.json();
      setTerms(dataTerms);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil Terms and Conditions:",
        error
      );
    }
  };

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchDetails(id), fetchImages(id), fetchTerms(id)]);
      setLoading(false);
    };
    fetchData();

    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setActiveDetail("overview");
    } else {
      setActiveDetail("galery");
    }

    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth <= 768) {
        setActiveDetail("overview");
      } else {
        setActiveDetail("galery");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("activity", activity);
  console.log("images", images);
  console.log("terms", terms);

  return (
    <Layout>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900"></div>
            <p className="text-sm mt-2">Loading...</p>
          </div>
        </div>
      ) : (
        <div>
          <ActivityPage activity={activity} />
          <div className="flex">
            <div className=" w-full">
              <ul className="flex gap-8 w-full">
                <li>
                  <button
                    onClick={() => setActiveDetail("galery")}
                    className={`transition ${
                      activeDetail === "galery"
                        ? "border-b-2 border-black"
                        : "border-b hover:border-b-2 hover:border-black"
                    }`}
                  >
                    Galeri
                  </button>
                </li>
                <li className="md:hidden">
                  <button
                    onClick={() => setActiveDetail("overview")}
                    className={`transition ${
                      activeDetail === "overview"
                        ? "border-b-2 border-black text-black"
                        : "border-b hover:border-b-2 hover:border-black"
                    }`}
                  >
                    Overview
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setActiveDetail("questions")}
                    className={`transition ${
                      activeDetail === "questions"
                        ? "border-b-2 border-black"
                        : "border-b hover:border-b-2 hover:border-black"
                    }`}
                  >
                    Terms and Conditions
                  </button>
                </li>
              </ul>
              <div>
                {activeDetail === "galery" && (
                  <section className="mt-4">
                    <Galeri image={images} />
                  </section>
                )}
                {activeDetail === "overview" && (
                  <section className="mt-4 md:hidden">
                    <ResponsiveAct activity={activity} />
                  </section>
                )}
                {activeDetail === "questions" && (
                  <section className="mt-4">
                    <Terms terms={terms} />
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
