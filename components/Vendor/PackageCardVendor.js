/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Rating } from "../Rating";

export default function PackageCardVendor({ packageCard }) {
  console.log("packageCard", packageCard);
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="package ">
      <div className=" w-fit shadow-lg rounded-md">
        <Link href={`/package/${packageCard.id}`}>
          <img
            src={
              packageCard.thumbnailUrl
                ? packageCard.thumbnailUrl
                : "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
            }
            alt={packageCard.thumbnailUrl}
            className="rounded shadow object-cover h-64 w-[250px]"
          />
        </Link>
        <div className="flex flex-col  p-2 space-y-1">
          <div className="font-bold ">
            <p>{packageCard.name}</p>
          </div>
          <div className="flex">
            <div className="mt-[2px]">
              <Rating value={packageCard.ratingAvg} />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700 ml-2">
                {packageCard.ratingAvg}
              </p>
            </div>
          </div>
          <Link href={`/product/${packageCard.slug}`}>
            <h2 className="text-lg">{packageCard.title}</h2>
          </Link>
        </div>
        <div className="font-semibold bg-orange-500 rounded-b-md cursor-pointer hover:bg-orange-600">
          <h1 className="text-white text-center p-1">
            {formatRupiah(packageCard.price)}
          </h1>
        </div>
      </div>
    </div>
  );
}
