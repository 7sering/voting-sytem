import React from "react";

const Loader = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full animate-pulse bg-blue-300"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-blue-300"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-blue-300"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
