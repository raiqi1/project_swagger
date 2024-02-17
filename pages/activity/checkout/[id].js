/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CheckoutPage from "../../../components/Checkout";
import { useRouter } from "next/router";

export default function Checkout() {
  const [destinationTarget, setDestinationsTarget] = useState({});
  const [loading, setLoading] = useState(false);
  const [numberOfPerson, setNumberOfPerson] = useState(1);
  const [chekcOutData, setChekcOutData] = useState({});
  const [showQuantity, setShowQuantity] = useState(1);
  const [userData, setUserData] = useState({});
  const router = useRouter();

  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const {
      handleSubmit,
      register,
      formState: { errors },
      setValue, // Dapatkan setValue dari useForm
    } = useForm()
    
    useEffect(() => {
      // Set nilai default menggunakan setValue setelah fetchUser
      if (userData.name) {
        setValue('contactFullname', userData.name)
      }
      if (userData.phoneNumber) {
        setValue('contactNumber', userData.phoneNumber)
      }
      if (userData.email) {
        setValue('contactEmail', userData.email)
      }
    }, [userData, setValue])

    
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://api.dev.vacaba.id/api/v1/users/profile`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              'X-Api-Key': 'VACABADEV',
            },
          },
        )
  
        if (!response.ok) {
          if (response.status === 401) {
            // Jika status 401, arahkan pengguna ke halaman login dengan menyertakan parameter redirect
            router.push(`/login?redirect=${window.location.pathname}`)
            return
          }
          throw new Error('Gagal mengambil data user')
        }
  
        const data = await response.json()
        setUserData(data.data)
        console.log(data)
      } catch (err) {
        console.log(err.message)
      }
    }
  
    useEffect(() => {
      fetchUser()
    }, [])

  const fetchDataActivity = async (id) => {
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

      if (!response.ok) {
        throw new Error("Gagal mengambil data destinasi");
      }

      const data = await response.json();
      setDestinationsTarget(data.data);

      // Set nilai default numberOfPerson dari data.data
      setNumberOfPerson(data.data.minPerson || 1);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log("numberOfPerson", numberOfPerson);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    fetchDataActivity(id);
  }, []);

  const submitHandler = async ({
    contactEmail,
    contactFullname,
    contactNumber,
    date,
    numberOfPerson
  }) => {
    try {
      const response = await fetch(
        "https://api.dev.vacaba.id/api/v1/activity-service/checkout",
        {
          method: "POST",
          body: JSON.stringify({
            contactEmail,
            contactFullname,
            contactNumber,
            date: new Date(date).toISOString(),
            numberOfPerson: parseInt(numberOfPerson),
            productType: "activity",
            productUUID: destinationTarget.id,
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
      setChekcOutData(data.data);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log(destinationTarget);
  console.log("chekcOutData", chekcOutData);

  useEffect(() => {
    if (chekcOutData.id) {
      router.push(`/checkout-success/${chekcOutData.id}`);
    }
  }, [chekcOutData.id]);

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
                  className="flex h-6 w-6 items-center justify-center rounded-full"
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
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={destinationTarget.thumbnailURL}
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">
                  {destinationTarget.name}
                </span>
                <span className="float-right text-gray-400">x{showQuantity}</span>
                <p className="text-lg font-bold">{formatRupiah(destinationTarget.price * showQuantity)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <form
              // className="max-w-screen-md mt-7"
              onSubmit={handleSubmit(submitHandler)}
            >
              <div className="mb-4">
                <label htmlFor="contactFullname">Name</label>
                <input
                  type="text"
                  className="w-full"
                  id="contactFullname"
                  {...register("contactFullname", {
                    required: "Silakan masukkan nama lengkap",
                  })}
                  defaultValue={userData.name}
                />
                {errors.contactFullname && (
                  <div className="text-red-500">
                    {errors.contactFullname.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="contactNumber">Telpon Number</label>
                <input
                  type="text"
                  className="w-full"
                  id="contactNumber"
                  {...register("contactNumber", {
                    required: "Silakan masukkan nama lengkap",
                  })}
                  defaultValue={userData.phoneNumber}
                />
                {errors.contactNumber && (
                  <div className="text-red-500">
                    {errors.contactNumber.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="contactEmail">Email</label>
                <input
                  type="email"
                  {...register("contactEmail", {
                    required: "Silakan masukkan email",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                      message: "Silakan masukkan email yang valid",
                    },
                  })}
                  defaultValue={userData.email}
                  className="w-full"
                  id="contactEmail"
                />
                {errors.contactEmail && (
                  <div className="text-red-500">
                    {errors.contactEmail.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  {...register("date", {
                    required: "Silakan pilih tanggal",
                  })}
                  className="w-full"
                  id="date"
                />
                {errors.date && (
                  <div className="text-red-500">{errors.date.message}</div>
                )}
              </div>

              <div className="mb-4 flex flex-col">
                <label htmlFor="numberOfPerson">Number Of Person</label>
                <input
                  type="number"
                  className="w-full text-center"
                  id="numberOfPerson"
                  {...register("numberOfPerson", {
                    required: "Silakan masukkan jumlah orang",
                  })}
                  onChange={(e) => setShowQuantity((e.target.value))}
                />
              </div>
              <div className="mb-4">
                <button
                  className={`primary-button ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Memuat..." : "Daftar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
{
}
