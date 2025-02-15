import React from 'react'

export default function IconPayment() {
  return (
    <div className="flex flex-col items-center border-b bg-white sm:flex-row sm:px-10 lg:px-20 xl:px-32">
      <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
        <div className="relative">
          <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a
                className="flex h-6 w-6 items-center justify-center rounded-full bg-green-700 text-xs font-semibold text-white ring ring-green-700 ring-offset-2"
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
          </ul>
        </div>
      </div>
    </div>
  )
}
