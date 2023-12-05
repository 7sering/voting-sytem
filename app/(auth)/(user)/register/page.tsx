"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginForm {
  name: string;
  email: string;
  password: string;
  submit: () => void;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>();

  const onsubmit = (data: LoginForm) => {
    console.log("form submitted successfully", data);
    reset();
  };
  return (
    <section>
      <div className="container mx-auto">
        <h1 className="text-center pt-20 text-2xl "> Register New account</h1>
        <div className="flex items-center justify-center pt-5">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col bg-slate-800 p-8"
          >
            <label htmlFor="email" className="pb-2">
              Name
            </label>
            <input
              className="placeholder-black text-black pl-2 outline-none"
              type="name"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "user name is required",
                },
              })}
            />
            <p className="text-red-500 text-sm py-2">{errors.name?.message}</p>
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
              Already have account ?{" "}
              <Link
                href="/login"
                className="text-green-500 text-md font-bold hover:text-green-500"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
