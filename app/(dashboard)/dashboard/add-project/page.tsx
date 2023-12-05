"use client";
import axios from "axios";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface addForm {
  title: string;
  info: string;
  image: string;
}

const AddProjectPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addForm>();

  const handleForm = async (data: addForm) => {
    try {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/project`, data);
      toast.success("Project added successfully");
      reset();
    } catch (error) {
      console.error("Error posting projects:", error);
      toast.error("Error posting projects");
    }
  };
  return (
    <>
      <section>
        <div>
          <h2 className="text-center pb-5 text-2xl uppercase"> Add Project</h2>
          <Link href="/dashboard">
            <div className="flex hover:text-green-700 transition-all duration-500 ease-linear">
              <ArrowBigLeft />
              <h1 className="text-white pb-5 hover:text-green-700 transition-all duration-500 ease-linear">
                Back
              </h1>
            </div>
          </Link>
          <div className="bg-white py-5 px-5">
            <div>
              <form
                onSubmit={handleSubmit(handleForm)}
                className="mt-8 max-w-2xl mx-auto"
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      Project Name
                    </label>

                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full text-black rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter Project Name.................."
                        {...register("title", {
                          required: {
                            value: true,
                            message: "Title is required",
                          },
                        })}
                      />
                    </div>
                    <p className="text-red-500 text-sm py-2">
                      {errors.title?.message}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        Project Info
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter Project Info............"
                        {...register("info", {
                          required: {
                            value: true,
                            message: "Info is required",
                          },
                        })}
                      />
                    </div>
                    <p className="text-red-500 text-sm py-2">
                      {errors.info?.message}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        Image
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Only Image URL............"
                        {...register("image", {
                          required: {
                            value: true,
                            message: "Image URL is required",
                          },
                        })}
                      />
                    </div>
                    <p className="text-red-500 text-sm py-2">
                      {errors.image?.message}
                    </p>
                  </div>
                  <div>
                    <button className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                      Submit Project
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProjectPage;
