"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { AiFillGoogleCircle } from "react-icons/ai";

import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
  submit: () => void;
}

const LoginPage = () => {
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
        <h1 className="text-center pt-20 text-2xl ">Login your account</h1>
        <div className="flex items-center justify-center">
          <Link href="/api/auth/signin">
            <button className="bg-red-700 py-2 px-8 mt-3 hover:bg-green-600">
              <div className="flex text-1xl gap-1">
                <AiFillGoogleCircle size={30} />
                <p className="text-1xl pl-2 pt-[3px]">Sign In With Google</p>
              </div>
            </button>
          </Link>
        </div>
        <div className="flex items-center justify-center  pt-5">
          <form
            onSubmit={handleSubmit(onsubmit)}
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
              Do not have account ?
              <Link
                href="/register"
                className="text-green-500 text-md font-bold hover:text-green-500"
              >
                Register
              </Link>
            </p>
          </form>
          L
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
