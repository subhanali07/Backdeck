import React from "react";
import sacaveatwhite from "../assets/sacaveatwhite.svg";
import Sa from "../assets/Sa.svg";

const Navbar = () => {
  return (
    <nav className="w-full border-b-black/30 h-auto flex justify-between items-center px-8 py-5">
      <div className="bg-[#bdbdbd] p-1 rounded-[8px]">
        <div className="flex bg-white rounded-[8px] gap-4 px-13 py-1 transition duration-200 hover:cursor-pointer hover:bg-[#dddada]">
          <img src={Sa} className="size-7 pb-[6px]" />
          <div className="text-black font-baskerville font-bold text-md">
            zux
          </div>
        </div>
      </div>

      <div className="flex items-center p-1 gap-[6px] bg-[#bdbdbd] rounded-[8px]">
        <div className="flex bg-white rounded-[8px] px-8 py-1 transition duration-200 hover:cursor-pointer hover:bg-[#dddada]">
          /work
        </div>
        <div className="flex bg-white rounded-[8px] px-8 py-1 transition duration-200 hover:cursor-pointer hover:bg-[#dddada]">
          /contact
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
