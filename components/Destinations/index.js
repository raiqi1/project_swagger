/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function DestinationPage({ data }) {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  return (
    <div>
      <div class="relative flex w-full max-w-[21rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg mb-5">
        <div class="relative  overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          <img
            src={data.thumbnail}
            alt="ui/ux review check"
            className="w-[400px] h-[230px]"
          />
          <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
          <button
            class="!absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="pr-3 pl-3">
          <div class="pt-3  mb-2">
            <div class="flex items-center justify-between">
              <h5 class="block font-bold text-xl antialiased leading-snug tracking-normal text-blue-gray-900">
                {data.name}
              </h5>
            </div>
          </div>
          <div className="flex pt-1  gap-2 justify-between ">
            <div className="flex gap-2 text-[rgba(121,121,121,1)] ">
              <div className="text-center flex flex-col justify-center">
                <img src="../../../maps.svg" alt="" />
              </div>
              <h1 className="">{data.area_name}</h1>
            </div>
            <div className="flex gap-2 ">
              <h1 className="text-sm font-bold flex flex-col justify-center">
                Open:
              </h1>
              <div className="font-semibold text-sm flex flex-col justify-center">
                {data.open_hours.slice(1, 2)}AM
              </div>
            </div>
          </div>
          <div className="flex text-[rgba(121,121,121,1)] mt-1">
            <div className="flex">
              <span className="flex flex-col justify-center">
                <img src="../../../rating.svg" alt="" className="w-4" />
              </span>
              <h1 className="ml-1 mr-1">{data.review_score?.toFixed(1)}</h1>
            </div>
            <h1>({data.review_count} Reviews)</h1>
          </div>
        </div>
        <div class="pt-5">
          <button
            class="block w-full select-none rounded-b-lg bg-orange-500 py-2 px-7 text-center align-middle  text-lg font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            {formatRupiah(data.price)}
          </button>
        </div>
      </div>
    </div>
  );
}
