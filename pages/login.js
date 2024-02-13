import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const [loading, setLoading] = useState(false); // State untuk menandai apakah permintaan sedang dalam proses

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
  try {
    setLoading(true);

    const response = await fetch(
      "https://api.dev.vacaba.id/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "VACABADEV",
          "X-Device-Token": "VACABADEV",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Gagal Login");
    }

    const data = await response.json();
    const accessToken = data.data;
    localStorage.setItem("token", accessToken.access.token);
    localStorage.setItem("refreshToken", accessToken.refresh.token);

    console.log("Data aktivitas pengguna:", data);

    router.push(redirect || "/"); // Mengarahkan kembali ke halaman yang ditentukan
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    toast.error(getError(error));
  } finally {
    setLoading(false);
  }
};


  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="w-full"
            id="password"
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 ">
          <button
            className={`primary-button ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
        <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || "/"}`}>Register</Link>
        </div>
      </form>
    </Layout>
  );
}
