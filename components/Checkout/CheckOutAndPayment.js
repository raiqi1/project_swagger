/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { FaUser } from 'react-icons/fa'

export default function CheckOutAndPayment({
  dataCheckout,
  pointData,
  discountedTotalFee,
}) {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }
  return (
    <div className="flex">
      <div className="flex gap-2 w-full">
        <img src={dataCheckout.productThumbnail} alt="" className="w-60" />
        <div className="w-full">
          <h1 className="text-lg font-bold">{dataCheckout.productName}</h1>
          <div className="flex gap-5 text-sm">
            <div className="flex gap-1">
              <h1>Type: </h1>
              <div>{dataCheckout.productType}</div>
            </div>
            <div className="flex">
              <span className="flex flex-col justify-center text-xs">
                <FaUser />
              </span>
              <h1>{dataCheckout.numberOfPerson} Person</h1>
            </div>
          </div>
          <div className="border-b pb-4">
            <h1 className=" font-semibold">
              Total Price: {formatRupiah(dataCheckout.productPrice)}
            </h1>
          </div>
          <div className=" space-y-1">
            <div className="pb-1 border-b">
              <h1>Basic Information</h1>
              <h2 className="text-sm text-gray-500">Include Tax</h2>
            </div>
            <div className="flex justify-between  pb-1 border-b">
              <h1 className="text-sm">Basic Fee</h1>
              <h2 className="font-bold">
                {formatRupiah(dataCheckout.basicFee)}
              </h2>
            </div>
            <div className="flex justify-between  pb-1 border-b">
              <h1 className="text-sm">Your Point</h1>
              <h2 className="font-bold">{formatRupiah(pointData.points)}</h2>
            </div>
            <div className="flex justify-between  pb-1 border-b ">
              <h1 className="text-sm">Total</h1>
              <h2 className="font-bold">
                {formatRupiah(discountedTotalFee)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
