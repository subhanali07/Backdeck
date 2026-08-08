import React from "react";
import sacaveatwhite from "../assets/sacaveatwhite.svg";
import Sa from "../assets/Sa.svg";
import launchit from '../assets/launchit-logo.svg'


const Navbar = () => {
  return (
    <nav className="w-full border-b-black/30 h-auto z-50 fixed top-0 left-0 px-13 flex justify-between items-center py-5">
      <div className="bg-[#e7e7e7] p-1 rounded-[8px]">
        <div className="flex bg-white rounded-[8px] gap-4  transition duration-200 hover:cursor-pointer hover:bg-[#dddada]">
          <img src={launchit} className="w-auto h-9 rounded-[7px] " />
        </div>
      </div>

      <div className="flex items-center p-1 gap-[6px] bg-[#e7e7e7] rounded-[8px]">
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
