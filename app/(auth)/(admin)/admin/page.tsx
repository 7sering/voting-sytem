"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import AdminLayout from "../layout";

interface FormData {
  email: string;
  password: string;
}

const AdminLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleForm = (data: FormData) => {
    console.log("Form Submit Successful", data);
  };
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-center mt-9 font-bold text-2xl">Admin Login</h1>
        <div className="flex items-center justify-center pt-5">
          <form
            onSubmit={handleSubmit(handleForm)}
            className="flex flex-col bg-slate-800 p-8"
          >
            <label htmlFor="email" className="pb-2">
              Email
            </label>
            <input
              className="placeholder-black text-black pl-2 outline-none"
              type="email"
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "email is required",
                },
              })}
            />
            <p className="text-red-500 text-sm py-2">{errors.email?.message}</p>
            <label htmlFor="password" className="pb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "password is required",
                },
              })}
              className="placeholder-black text-black pl-2 outline-none"
            />
            <p className="text-red-500 text-sm py-2">
              {errors.password?.message}
            </p>
            <button className="mt-2 bg-green-700 py-2 px-3 hover:bg-green-500 transition-all duration-500 ease-linear">
              Submit
            </button>
            <p className="text-sm py-3 text-center">
              Back to{" "}
              <Link
                href="/"
                className="text-green-500 text-md font-bold hover:text-green-500"
              >
                Home
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
