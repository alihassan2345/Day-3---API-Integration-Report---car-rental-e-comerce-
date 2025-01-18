import Image from "next/image";
import React from "react";

const Topheader = () => {
  return (
    <div className="w-[1440px] h-[141px] flex justify-between bg-slate-100  flex-row ml-[200px]] ">
      {/* left side  */}
      <div>
        <Image
          src={"/images/command.png"}
          alt="icon"
          width={32}
          height={32}
          className="mt-[0px]"
        ></Image>
      </div>
      <span className="w-[600px] h-[40px] text-[32px] font-bold mr-[700px]">
        High Fidelity Dashboard - Home Rent
      </span>
      {/* right side */}
      <div className="w-[236px] h-[25px] gap-[8px] flex mr-20">
        <p className="w-[121px] h-[25px] text-[20px] flex">Last Updated:</p>
        <h1 className="w-[107px] h-[25px] font-semibold">8 Aug 2022</h1>
      </div>
    </div>
  );
};

export default Topheader;
