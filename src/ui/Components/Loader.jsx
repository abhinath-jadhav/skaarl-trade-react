import React from "react";

const Loader = ({ height = "h-screen" }) => {
  return (
    <>
      <div className={`flex flex-col justify-center items-center ${height}`}>
        <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
        <div className="mt-10 text-violet-800 text-2xl">Loading ...</div>
      </div>
    </>
  );
};

export default Loader;
