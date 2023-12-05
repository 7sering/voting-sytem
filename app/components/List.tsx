"use client";
import axios from "axios";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const List = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const { data: session, status } = useSession();

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/project`
      );
      const result = await response.data;
      setProjects(result.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // console.log("USER ID -> ", session?.user.id);

  const handleVote = async (projectId: string) => {
    if (!session || !session.user.id) {
      console.error("User is not logged in");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vote`,
        {
          userId: session.user.id,
          projectId: projectId,
        }
      );
      const { message } = response.data;
      toast.success(`${message}`);
      fetchProjects();
    } catch (error: any) {
      console.error("Error voting:", error);
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("something went wrong....");
        }
      } else if (error.request) {
        toast.error("No response received from server.");
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <section>
      <div className="container mx-auto">
        <div className="relative overflow-x-auto mt-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Project
                </th>
                <th scope="col" className="px-6 py-3">
                  Info
                </th>
                <th scope="col" className="px-6 py-3">
                  Vote Count
                </th>
                <th scope="col" className="px-6 py-3">
                  Vote
                </th>
              </tr>
            </thead>
            {projects.map((project) => (
              <tbody key={project.id}>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      src={project.image}
                      alt="Project Image"
                      width={50}
                      height={30}
                      className="rounded-full"
                    />
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {project.title}
                  </th>
                  <td className="px-6 py-4">{project.info.slice(0, 15)}...</td>
                  <td className="px-6 py-4">{project.voteCount}</td>
                  <div className="mt-8">
                    {status === "unauthenticated" && (
                      <Link
                        className=" py-1 bg-green-800 mb-2 px-5 mt- rounded-lg text-white hover:bg-green-600 duration-500 ease-linear"
                        // onClick={() => handleVote(project.id)}
                        href="/login"
                      >
                        Vote
                      </Link>
                    )}
                    {status === "authenticated" && (
                      <button
                        className=" py-1 bg-green-800 mb-2 px-5  rounded-lg text-white hover:bg-green-600 duration-500 ease-linear"
                        onClick={() => handleVote(project.id)}
                      >
                        Vote
                      </button>
                    )}
                  </div>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </section>
  );
};

export default List;
