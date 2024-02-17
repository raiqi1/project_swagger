import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CheckOutAnd from "../../components/Checkout/CheckoutAnd";
import Layout from "../../components/Layout";

export default function CheckoutSuccessPage() {
  const [dataCheckout, setDataCheckout] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [selectedChannel, setSelectedChannel] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState({});
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const checkoutSuccessData = async (id) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/checkout/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Api-Key": "VACABADEV",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          // Jika status 401, arahkan pengguna ke halaman login dengan menyertakan parameter redirect
          router.push(`/login?redirect=${window.location.pathname}`);
          return;
        }
        throw new Error("Gagal mengambil data destinasi");
      }

      const data = await response.json();
      setDataCheckout(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchPayment = async () => {
    try {
      // Pastikan token telah diinisialisasi sebelum memanggil fetchPayment
      if (!token) return;

      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/payments/methods`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Api-Key": "VACABADEV",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          // Jika status 401, arahkan pengguna ke halaman login dengan menyertakan parameter redirect
          router.push(`/login?redirect=${window.location.pathname}`);
          return;
        }
        throw new Error("Gagal mengambil data destinasi");
      }

      const data = await response.json();
      setPaymentData(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const postPayment = async ({ paymentChannel, paymentMethodId }) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/payments`,
        {
          method: "POST",
          body: JSON.stringify({
            bookingId: dataCheckout.bookingId,
            paymentChannel,
            paymentMethodId: "cstore",
            usePoint: false
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Api-Key": "VACABADEV",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          // Jika status 401, arahkan pengguna ke halaman login dengan menyertakan parameter redirect
          router.push(`/login?redirect=${window.location.pathname}`);
          return;
        }
        throw new Error("Gagal mengambil data destinasi");
      }

      const data = await response.json();
      setPaymentSuccess(data.data);
      console.log("payment data", data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChannelChange = (channel) => {
    setSelectedChannel(channel);
    setPaymentMethodId();
    console.log("Nilai yang dipilih:", channel);
  };

  const handlePayment = () => {
    if (!selectedChannel) {
      console.log("Pilih metode pembayaran terlebih dahulu!");
      return;
    }
    postPayment({ paymentChannel: selectedChannel });
  };

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    checkoutSuccessData(id);
  }, []);

  useEffect(() => {
    fetchPayment();
  }, [token]); // Memperbarui fetchPayment hanya ketika token berubah

  useEffect(() => {
    if (dataCheckout.id) {
      router.push(`/booking/${dataCheckout.bookingId}`);
    }
  }, [paymentSuccess]);

  console.log("dataCheckout", dataCheckout);
  console.log("paymentData", paymentData);

  return (
    <div className=" overflow-x-hidden">
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Checkout
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Payment</span>
              </li>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex gap-1 mx-5">
        <h1 className="text-xl font-bold  ">Payment</h1>
        <span className="mt-[2px]">{">"}</span>
        <h1 className="mt-[2px]">{dataCheckout.productType}</h1>
      </div>
      <div>
        <div>
          <CheckOutAnd dataCheckout={dataCheckout} />
        </div>
      </div>
      <div className="w-full mx-5 ">
        {Array.isArray(paymentData) &&
          paymentData.map((p, i) => (
            <div key={i} className="flex w-full">
              <div className="w-full">
                <div className="flex mb-2 font-bold items-center">
                  <h1 className="mr-2">{p.name}</h1>
                  {/* <h1 className="mr-2">{p.description}</h1> */}
                  <h1 className="mr-2">{p.code}</h1>
                </div>
                <div className="">
                  {p.channels.map((channel, i) => (
                    <div className="relative w-1/3 mt-3" key={i}>
                      <input
                        type="radio"
                        id={channel.code}
                        name="paymentChannel"
                        value={channel.code}
                        checked={selectedChannel === channel.code}
                        onChange={() => handleChannelChange(channel.code)}
                        className="peer hidden"
                        // checked
                      />
                      <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                      <label
                        className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        htmlFor={channel.code}
                      >
                        {/* <img
                          className="w-14 object-contain"
                          src="/images/naorrAeygcJzX0SyNI4Y0.png"
                          alt=""
                        /> */}
                        <div className="ml-5">
                          <span className="mt-2 font-semibold text-black">
                            {channel.name}
                          </span>
                        </div>
                      </label>
                    </div>
                    // <div key={i} className="mb-2">
                    //   <input
                    //     type="radio"
                    //     id={channel.code}
                    //     name="paymentChannel"
                    //     value={channel.code}
                    //     checked={selectedChannel === channel.code}
                    //     onChange={() => handleChannelChange(channel.code)}
                    //     className="mr-2"
                    //   />
                    //   <label htmlFor={channel.code} className="mr-2">
                    //     {channel.name} - {channel.description}
                    //   </label>
                    // </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={handlePayment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-5"
      >
        Bayar
      </button>
    </div>
  );
}
