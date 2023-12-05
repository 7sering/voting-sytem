"use client";

import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [projects, setProjects] = useState<any[]>([]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/project`
      );
      const result = await response.data;
      setProjects(result.projects);
    } catch (error) {
      console.log("Error fetching projects", error);
      toast.error("Something went wrong please check again");
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const deleteProject = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/project/${id}`
      );
      const { message } = response.data;
      fetchProject();
      toast.success(`${message}`);
    } catch (error) {
      console.log("Error fetching projects", error);
    }
  };

  return (
    <section className="flex bg-slate-600 ">
      <div className="container mx-auto w-10/12 p-8">
        <section className="mx-auto w-full ">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Project</h2>
              <p className="mt-1 text-sm text-gray-100">
                List of projects in our platform
              </p>
            </div>
            <div>
              <Link
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                href="/dashboard/add-project"
              >
                Add new project
              </Link>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="divide-x divide-gray-200">
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          <span>Title</span>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          Info
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          Status
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          Votes Count
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          Edit
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          Delete
                        </th>
                        {/* <th scope="col" className="relative px-4 py-3.5">
                          <span className="sr-only">Edit</span>
                        </th> */}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {projects.map((project) => (
                        <tr
                          key={project.name}
                          className="divide-x divide-gray-200"
                        >
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <Image
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={project.image}
                                  alt="image"
                                  width={100}
                                  height={100}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {project.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <div className="text-sm text-gray-500">
                              {project.info.slice(0, 15)}....
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                            263936
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            <a
                              href="#"
                              className="text-gray-500 hover:text-indigo-600"
                            >
                              Edit
                            </a>
                          </td>
                          <button
                            className="bg-green-700 mt-6 mr-2 px-2 hover:bg-green-500 transition-all duration-500 ease-linear"
                            onClick={() => deleteProject(project.id)}
                          >
                            Delete
                          </button>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full border-gray-300">
            <div className="mt-2 flex items-center justify-end">
              <div className="space-x-2">
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  &larr; Previous
                </button>
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AdminDashboard;
