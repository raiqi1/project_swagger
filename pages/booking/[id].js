import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

export default function BookingScreen() {
  const router = useRouter();

  const [bookingData, setBookingData] = useState({});
  const [ActivityData, setActivityData] = useState({});
  const [showDate, setShowDate] = useState("");
  const [showData, setShowData] = useState({});
  const [payment, setPayment] = useState([]);
  const [paid,setPaid] = useState('');
  const [showSuccess, setShowSuccess] = useState(null)
  const [showPayment,setShowPayment] = useState(false)

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  console.log(token);
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  const fetchBooking = async (id) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/bookings/${id}`,
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
      setBookingData(data.data.bookingDetails);
      setShowData(data.data);
      setShowDate(data.data.bookingDetails.Date);
      // setPaymentID(data.data.bookingId)
      // setDate(bookingData.Date)
    } catch (err) {
      console.log(err.message);
    }
  };
  const fetchData = async (id) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );

      const data = await response.json();
      setActivityData(data.data);
      // setShowDate(.Date)
    } catch (err) {
      console.log(err.message);
    }
  };
  const fetchPayment = async (id) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/payments/booking/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Api-Key": "VACABADEV",
          },
        }
      );

      const data = await response.json();
      setPayment(data.data);
      // setActivityData(data.data)
      // setShowDate(.Date)
    } catch (err) {
      console.log(err.message);
    }
  };


  const DateFormat = bookingData.Date;
  console.log(showDate.slice(0, 10));
  console.log(ActivityData);
  console.log(payment);
  // const DateSlice = DateFormat.slice(0,10)
  useEffect(() => {
    if (router.query.id) {
      fetchBooking(router.query.id);
    }
    fetchData(bookingData.ProductUUID);
    fetchPayment(showData.bookingId);

    if(payment.paymentStatus == null) {
      setPaid('Unpaid')
    } else {
      setPaid('Paid')
    }
  }, [router.query.id, bookingData.ProductUUID, showData.bookingId,payment.paymentStatus]);

  console.log("bookingData", bookingData);
  console.log("showData", showData);

  return (
    <div className="">
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Checkout
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full  bg-emerald-200 text-xs font-semibold text-emerald-700"
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
                  className="flex h-6 w-6 items-center justify-center rounded-full  bg-emerald-200 text-xs font-semibold text-emerald-700"
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
                <span className="font-semibold text-gray-900">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mt-6">
        <div className="px-4 pt-8">
          <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div class="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={ActivityData.thumbnailURL}
                alt=""
              />
              <div class="flex w-full flex-col px-4 py-4">
                <span class="font-semibold text-black">
                  {ActivityData.name}
                </span>
                <span class="float-right text-gray-400">
                  x{bookingData.NumberOfPersons}
                </span>
                <p class="text-lg font-bold">
                  {formatRupiah(
                    ActivityData.price * bookingData.NumberOfPersons
                  )}
                </p>
              </div>
            </div>
          </div>
          <form class="mt-5 grid gap-6">
            <div class="relative">
              <input
                class="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                disabled
              />
              <span class="border-red-200 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-black-300 bg-white"></span>
              <label
                class="peer-checked:border-2 border-red-200 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border b p-4"
                for="radio_1"
              >
                <img
                  class="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold">{payment.paymentMethodId}</span>
                  <p class="text-slate-500 text-sm leading-6">
                    {paid}
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>

        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <form
            // className="max-w-screen-md mt-7"
            // onSubmit={handleSubmit(submitHandler)}
            >
              <div className="mb-4">
                <label htmlFor="contactFullname">Name</label>
                <input
                  type="text"
                  className="w-full"
                  id="contactFullname"
                  // {...register("contactFullname", {
                  //   required: "Silakan masukkan nama lengkap",
                  // })}
                  defaultValue={bookingData.ContactFullName}
                  disabled
                />
                {/* {errors.contactFullname && (
                  <div className="text-red-500">
                    {errors.contactFullname.message}
                  </div>
                )} */}
              </div>

              <div className="mb-4">
                <label htmlFor="contactNumber">Telpon Number</label>
                <input
                  type="text"
                  className="w-full"
                  id="contactNumber"
                  // {...register("contactNumber", {
                  //   required: "Silakan masukkan nama lengkap",
                  // })}
                  defaultValue={bookingData.ContactPhoneNumber}
                  disabled
                />
                {/* {errors.contactNumber && (
                  <div className="text-red-500">
                    {errors.contactNumber.message}
                  </div>
                )} */}
              </div>
              <div className="mb-4">
                <label htmlFor="contactEmail">Email</label>
                <input
                  type="email"
                  // {...register("contactEmail", {
                  //   required: "Silakan masukkan email",
                  //   pattern: {
                  //     value:
                  //       /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                  //     message: "Silakan masukkan email yang valid",
                  //   },
                  // })}
                  defaultValue={bookingData.ContactEmail}
                  className="w-full"
                  id="contactEmail"
                  disabled
                />
                {/* {errors.contactEmail && (
                  <div className="text-red-500">
                    {errors.contactEmail.message}
                  </div>
                )} */}
              </div>

              <div className="mb-4">
                <label htmlFor="date">Date</label>
                <input
                  // type="date"
                  // {...register("date", {
                  //   required: "Silakan pilih tanggal",
                  // })}
                  className="w-full"
                  id="date"
                  value={showDate.slice(0, 10)}
                  disabled
                />
                {/* {errors.date && (
                  <div className="text-red-500">{errors.date.message}</div>
                )} */}
              </div>

              <div className="mb-4 flex flex-col">
                <label htmlFor="numberOfPerson">Number Of Person</label>
                <input
                  type="number"
                  className="w-full text-center"
                  // id="numberOfPerson"
                  // {...register("numberOfPerson", {
                  //   required: "Silakan masukkan jumlah orang",
                  // })}
                  value={bookingData.NumberOfPersons}
                  onChange={(e) => setShowQuantity(e.target.value)}
                  disabled
                />
              </div>
              <div className="mb-4">
                {/* <button
                  className={`primary-button ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Memuat..." : "Daftar"}
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
