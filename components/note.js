//  <div>
//   <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
//     <a href="#" className="text-2xl font-bold text-gray-800">
//       Checkout
//     </a>
//   </div>
//   <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
//     <div className="px-4 pt-8">
//       <p className="text-xl font-medium">Ringkasan Pesanan</p>
//       <p className="text-gray-400">
//         Periksa item Anda dan pilih metode pengiriman yang sesuai.
//       </p>
//       <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
//         <div className="flex flex-col rounded-lg bg-white sm:flex-row">
//           <img
//             className="m-2 h-24 w-28 rounded-md border object-cover object-center"
//             src={destinationTarget.thumbnailURL}
//             alt=""
//           />
//           <div className="flex w-full flex-col px-4 py-4">
//             <span className="font-bold text-black">
//               {destinationTarget.name}
//             </span>
//             <span className="float-right text-gray-400">x1</span>
//             <p className="text-lg font-bold text-black">
//               {formatRupiah(destinationTarget.price)}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
//       <p className="text-xl font-medium">Detail Pembayaran</p>
//       <p className="text-gray-400">
//         Lengkapi pesanan Anda dengan memberikan detail pembayaran Anda.
//       </p>
//       <form onSubmit={() => HandlePostData()}>
//         <div className="">
//           <label
//             htmlFor="email"
//             className="mt-4 mb-2 block text-sm font-medium text-black"
//           >
//             Email
//           </label>
//           <div className="relative">
//             <input
//               type="email"
//               id="contactEmail"
//               name="contactEmail"
//               className="w-full text-black rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
//               placeholder="your.email@gmail.com"
//               required
//               onChange={(e) => setEmail(e.target.value)}
//               value={Email}
//             />
//             <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                 />
//               </svg>
//             </div>
//           </div>
//           <label
//             htmlFor="card-holder"
//             className="mt-4 mb-2 block text-sm font-medium text-black"
//           >
//             Nama
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               id="contactFullname"
//               name="contactFullname"
//               className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 text-black"
//               placeholder="Nama lengkap Anda di sini"
//               required
//               onChange={(e) => setName(e.target.value)}
//               value={Name}
//             />
//             <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
//                 />
//               </svg>
//             </div>
//           </div>
//           <label
//             htmlFor="card-no"
//             className="mt-4 mb-2 block text-sm font-medium text-black"
//           >
//             Nomor Telepon
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               id="contactNumber"
//               name="contactNumber"
//               className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 text-black"
//               placeholder="NOMOR TELEPON"
//               required
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               value={PhoneNumber}
//             />
//             <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//         <div className="mt-6 border-t border-b py-2">
//           <div className="flex items-center justify-between">
//             <p className="text-sm font-medium text-gray-900">Subtotal</p>
//             <p className="font-semibold text-gray-900">
//               {formatRupiah(destinationTarget.price)}
//             </p>
//           </div>
//         </div>
//         <div className="mt-6 flex items-center justify-between">
//           <p className="text-sm font-medium text-gray-900">Total</p>
//           <p className="text-2xl font-semibold text-gray-900">
//             {formatRupiah(destinationTarget.price)}
//           </p>
//         </div>
//         <button
//           className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
//           type="submit"
//         >
//           Pesan Sekarang
//         </button>
//       </form>
//     </div>
//   </div>
// </div> 
