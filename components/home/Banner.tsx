import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="h-fit w-full">
      <img className="h-[100vh] w-full cover" src="/images/banner.webp" alt="Banner Image" />
    </div>
  );
};

export default Banner;
