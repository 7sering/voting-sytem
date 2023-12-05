"use client";
import {
  ProjectorIcon,
  User2Icon,
  BiohazardIcon,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <>
      <div>
        <aside className="w-64 h-screen flex flex-col overflow-y-auto border-r bg-black px-5 py-8">
          <Link href="/dashboard">
            <h1 className="flex gap-2 font-bold text-green-500 hover:text-green-700 transition-all duration-500 ease-linear">
              <BiohazardIcon />
              VOTEX
            </h1>
          </Link>
          <div className="mt-6 flex flex-1 flex-col justify-between">
            <nav className="-mx-3 space-y-6 ">
              <div className="space-y-3 ">
                <label className="px-3 text-xs font-semibold uppercase text-white">
                  Dashboard
                </label>
                <Link
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                  href="/"
                >
                  <HomeIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Home</span>
                </Link>
                <Link
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="/dashboard"
                >
                  <ProjectorIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Project</span>
                </Link>
                <Link
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="/project"
                >
                  <User2Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">User</span>
                </Link>
              </div>
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
