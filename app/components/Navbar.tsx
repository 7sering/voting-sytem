"use client";
import { stat } from "fs";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { status, data: session } = useSession();
  useSession;
  return (
    <>
      <section className="">
        <div className="container mx-auto bg-[#000] mt-3 px-10 rounded-full">
          <div className="flex justify-between items-center py-3">
            <Link href="/">
              <h1 className="text-1xl font-bold uppercase text-green-500">
                Votex
              </h1>
            </Link>

            <ul className="flex gap-3">
              <li className="hover:text-green-500 transition-all ease-linear text-1xl">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-green-500 transition-all ease-linear text-1xl">
                <Link href="/about">About</Link>
              </li>
              <li className="hover:text-green-500 transition-all ease-linear text-1xl">
                <Link href="/system">System</Link>
              </li>
              <li className="hover:text-green-500 transition-all ease-linear text-1xl">
                <Link href="/contact">Contact</Link>
              </li>
              <li className="hover:text-green-500 transition-all ease-linear text-1xl">
                <Link href="/dashboard">Dashboard</Link>
              </li>

              {/* User Logged in & Logged out status */}
              {status === "authenticated" && (
                <button
                  // href="/api/auth/signout"
                  className="bg-green-800 px-5 py-1  rounded-sm transition-all duration-500 ease-linear hover:bg-green-600"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              )}
              {status === "unauthenticated" && (
                <div className="flex gap-2 pl-6">
                  <Link
                    href="/login"
                    className="bg-green-800 px-3 rounded-sm transition-all duration-500 ease-linear hover:bg-green-600"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="bg-green-800 px-3 rounded-sm transition-all duration-500 ease-linear hover:bg-green-600"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* User Status End Here */}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
