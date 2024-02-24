import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import CheckOutAndPayment from "../../../components/Checkout/CheckOutAndPayment";
import { useRouter } from "next/router";
import PaymentMethods from "../../../components/Checkout/PaymentMethods";
import Switch from "react-switch";
import {
  fetchPointDataAPI,
  fetchPaymentMethodsAPI,
  fetchCheckoutDataAPI,
  fetchCheckoutSuccessDataAPI,
  postPaymentAPI,
} from "../../../tool/apipayment";
import { toast } from "react-toastify";
import IconPayment from "../../../components/Payment/IconPayment";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [dataCheckout, setDataCheckout] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [selectedChannel, setSelectedChannel] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState({});
  const [usePoint, setUsePoint] = useState(false);
  const [pointData, setPointData] = useState({});
  const [originalTotalFee, setOriginalTotalFee] = useState(0);
  const [discountedTotalFee, setDiscountedTotalFee] = useState(0);
  const [dataCheckoutMax, setDataCheckoutMax] = useState({});
  const [isLoadingPayment, setIsLoadingPayment] = useState(false); // State untuk loading tombol bayar
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSuccessPage, setIsLoadingSuccessPage] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedPointData = await fetchPointDataAPI(token);
        const fetchedPaymentData = await fetchPaymentMethodsAPI(token);
        setPointData(fetchedPointData);
        setPaymentData(fetchedPaymentData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push(`/login?redirect=${window.location.pathname}`);
        } else {
          toast.error(error.message);
        }
        console.error("Terjadi kesalahan saat mengambil data:", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [token]);

  useEffect(() => {
    async function fetchCheckout() {
      try {
        const bookingId = dataCheckout?.bookingId;
        const data = await fetchCheckoutDataAPI(bookingId, token);
        setDataCheckoutMax(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push(`/login?redirect=${window.location.pathname}`);
        } else {
          toast.error(error.message);
        }
      }
    }

    fetchCheckout();
  }, [dataCheckout.bookingId]);

  useEffect(() => {
    async function fetchCheckoutSuccess() {
      try {
        const id = window.location.pathname.split("/").pop();
        const data = await fetchCheckoutSuccessDataAPI(id, token);
        setDataCheckout(data);
        setOriginalTotalFee(data.totalFee);
      } catch (error) {
        toast.error(error.message);
      }
    }

    fetchCheckoutSuccess();
  }, [token]);

  const pointUse = dataCheckoutMax?.bookingDetails;

  useEffect(() => {
    if (
      dataCheckout.bookingId &&
      pointData?.points &&
      pointUse?.MaxPointUse &&
      originalTotalFee
    ) {
      if (usePoint) {
        const pointsToUse = Math.min(pointUse.MaxPointUse, pointData.points);
        const discountedTotal = originalTotalFee - pointsToUse;

        setDiscountedTotalFee(discountedTotal);
      } else {
        setDiscountedTotalFee(originalTotalFee);
      }
    }
  }, [
    dataCheckout.bookingId,
    usePoint,
    pointData?.points,
    pointUse?.MaxPointUse,
    originalTotalFee,
  ]);

  const handleChannelChange = (channel) => {
    setSelectedChannel(channel);
  };

  const handlePayment = () => {
    if (!selectedChannel) {
      toast.error("Pilih metode pembayaran terlebih dahulu!");
      return;
    }

    setIsLoadingPayment(true);

    const selectedPaymentMethod = paymentData.find((p) =>
      p.channels.some((channel) => channel.code === selectedChannel)
    );
    const paymentMethodId = selectedPaymentMethod?.code || "";

    postPaymentAPI({
      bookingId: dataCheckout.bookingId,
      paymentChannel: selectedChannel,
      paymentMethodId: paymentMethodId,
      usePoint,
      token,
    })
      .then((data) => {
        setPaymentSuccess(data);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoadingPayment(false);
      });
  };

  const handleToggleUsePoint = () => {
    if (pointData?.points > 0 && pointUse?.MaxPointUse > 0) {
      setUsePoint((prevUsePoint) => !prevUsePoint);
    }
  };

  useEffect(() => {
    if (pointUse?.MaxPointUse && pointData?.points) {
      if (pointUse.MaxPointUse > pointData.points) {
        setUsePoint(false);
      }
    }
  }, [pointUse?.MaxPointUse, pointData?.points]);

  useEffect(() => {
    if (paymentSuccess?.message === "success" && paymentSuccess?.data) {
      const { paymentUrl, bookingId } = paymentSuccess?.data;
      if (paymentUrl) {
        setIsLoadingSuccessPage(true); // Set status loading saat akan melakukan pembayaran
        const paymentWindow = window.open(paymentUrl, "_blank");
        if (
          !paymentWindow ||
          paymentWindow.closed ||
          typeof paymentWindow.closed === "undefined"
        ) {
          // Jika pembukaan tab baru diblokir, redirect ke halaman pembayaran sukses
          router.push(`/booking/${bookingId}`);
          setIsLoadingSuccessPage(false); // Hentikan status loading jika redirect terjadi
        } else {
          const interval = setInterval(() => {
            if (paymentWindow.closed) {
              router.push(`/booking/${bookingId}`);
              clearInterval(interval);
              setIsLoadingSuccessPage(false); // Hentikan status loading jika tab ditutup
            }
          }, 1000);
        }
      } else if (bookingId) {
        router.push(`/booking/${bookingId}`);
      }
    }
  }, [paymentSuccess, router]);
  // console.log('dataCheckout', dataCheckout)

  console.log("paymentSuccess", paymentSuccess);

  console.log("paymentData", paymentData);
  console.log("selectedChannel", selectedChannel);
  

  return (
    <Layout>
      {isLoading ? ( // Menampilkan loading jika sedang rendering
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900"></div>
            <p className="text-sm mt-2">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-1 font-['Poppins'] mb-5">
          <div className="flex w-full gap-2">
            <h1 className="text-xl flex flex-col justify-center font-bold">
              Payment
            </h1>
            <span className=" flex flex-col justify-center ">{">"}</span>
            <h1 className=" flex flex-col justify-center">
              {dataCheckout.productType === "activity" ? "Activity" : ""}
            </h1>
          </div>
          <div>
            <IconPayment />
          </div>
        </div>
      )}
      {!isLoading && ( // Menampilkan komponen ketika loading selesai
        <div className="flex max-lg:flex-col  ml-12 mr-12 font-['Poppins'] gap-5">
          <div className="w-[680px]">
            <div className="gap-3">
              <CheckOutAndPayment
                pointData={pointData}
                discountedTotalFee={discountedTotalFee}
                dataCheckout={dataCheckout}
              />
            </div>
          </div>
          <div className="border rounded-md border-gray-400 px-5 py-3">
            <h1 className=" text-lg justify-center text-center flex mb-4 font-bold pt-1">
              Pilih Metode Pembayaran
            </h1>
            <div className="w-[400px]">
              {Array.isArray(paymentData) &&
                paymentData.map((p, i) => (
                  <div key={i} className="flex">
                    <PaymentMethods
                      p={p}
                      selectedChannel={selectedChannel}
                      handleChannelChange={handleChannelChange}
                    />

                  </div>
                ))}
            </div>
            <div className="flex mt-3 gap-3">
              <img src="../../../images/coin.svg" className="w-5" />

              <div className="flex gap-1">
                <h1 className="flex flex-col justify-center">Tukar </h1>
                <div className="flex flex-col justify-center">
                  {" "}
                  {pointData?.points} koin
                </div>
              </div>
              <Switch
                checked={usePoint}
                onChange={handleToggleUsePoint}
                disabled={!(pointData?.points > 0 && pointUse?.MaxPointUse > 0)}
                onColor="#3182ce"
                offColor="#CBD5E0"
                className="mt-1"
              />
            </div>
            <div className="text-sm flex gap-2 text-gray-500 ">
              <h1>Maksimum Poin untuk Produk Ini</h1>
              <div className="text-red-400">{pointUse?.MaxPointUse}</div>
              <img src="../../../images/coin.svg" className=" w-4" />
            </div>
            <button
              onClick={handlePayment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              disabled={isLoadingPayment} // Men-disable tombol saat proses loading
            >
              {isLoadingPayment || isLoadingSuccessPage
                ? "Memproses..."
                : "Bayar"}{" "}
              {/* Teks dinamis sesuai status loading */}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
