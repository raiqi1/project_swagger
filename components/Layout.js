import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { toast } from "react-toastify";
import Theme from "./Theme";

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const [query, setQuery] = useState("");

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const logoutClickHandler = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
    Cookies.remove("cart");
    router.push("/login");
    toast.success("Anda telah berhasil keluar.");
  };

  const handleActivity = (e) => {
    e.preventDefault();
    router.push(`/activity?page=${query}`);
  };

  const handleVendor = (e) => {
    e.preventDefault();
    router.push(`/vendor?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? title + " - Amazona" : "Amazona"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col ">
        <header>
          <nav className="flex h-12 items-center px-4 shadow-md dark:bg-dark">
            <Link href="/" className="text-lg font-bold">
              amazona
            </Link>
            <form
              onSubmit={submitHandler}
              className="mx-auto hidden justify-center md:flex "
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none p-1 text-sm  focus:ring-0 bg-white"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-5 w-5"></SearchIcon>
              </button>
            </form>

            <div className="flex items-center z-10">
              <div className=" mr-3">
                <Theme />
              </div>
              <button onClick={handleVendor}>
                <span className="p-2">Vendor</span>
              </button>
              <Link href={`/packages`}>
                <span className="p-2">Packages</span>
              </Link>
              <button onClick={handleActivity}>
                <span className="p-2">Activity</span>
              </button>

              <Link href="/cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {token ? (
                <div className="flex items-center z-10">
                  <Link href="#" className="p-2" onClick={logoutClickHandler}>
                    Logout
                  </Link>
                </div>
              ) : (
                <Link href="/login" className="p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Amazona</p>
        </footer>
      </div>
    </>
  );
}
