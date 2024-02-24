import React, { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function PaymentMethods({
  p,
  selectedChannel,
  handleChannelChange,
}) {
  console.log("p", p);
  const pdfUrl =
    p.channels.find((channel) => channel.paymentInstructionsDoc)
      ?.paymentInstructionsDoc || "";

  return (
    <div className="w-full">
      <div className="flex mb-2 font-bold items-center">
        <h1 className="mr-2">{p.name}</h1>
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="How to Pay ?"
          >
            <AiOutlineQuestionCircle className="w-6 h-6" />
            <span className="ml-1 opacity-0 transition-opacity duration-0 absolute text-xs">
              How to Pay 
            </span>
          </a>
        )}
      </div>
      <div className="">
        {p.channels.map((channel, i) => (
          <div className="relative mt-3" key={i}>
            <input
              type="radio"
              id={channel.code}
              name="paymentChannel"
              value={channel.code}
              checked={selectedChannel === channel.code}
              onChange={() => handleChannelChange(channel.code)}
              className="peer hidden"
            />
            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
            <label
              className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              htmlFor={channel.code}
            >
              <div className="ml-5">
                <span className="mt-2 font-semibold text-black">
                  {channel.name}
                </span>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
