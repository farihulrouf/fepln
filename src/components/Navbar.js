import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import { MdFavorite, MdHelp } from "react-icons/md";
import Avatar from "react-avatar";
import { FaHouseFloodWater } from "react-icons/fa6";
import { HiDocumentReport } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { GiPriceTag } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { FaHandHoldingWater } from "react-icons/fa";

const Navbar = ({ user }) => {
  //console.log(user)
  const [nav, setNav] = useState(false);

  const menuItems = [
    { icon: <CgProfile size={25} className="mr-4" />, text: "Profile" },
    { icon: <HiDocumentReport size={25} className="mr-4" />, text: "Report" },
    { icon: <GiPriceTag size={25} className="mr-4" />, text: "Price" },
    { icon: <IoIosLogOut size={25} className="mr-4" />, text: "Logout" },
  ];

  return (
    <div className="max-w-sm bg-blue-600 mx-auto flex justify-between items-center p-3 shadow-sm">
      {/* Left side */}
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <FaHandHoldingWater size={24} className="text-white" />
        </div>

        <p className="ml-2 text-white">Hippam Wotan</p>

        {/*
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Bum <span className="font-bold">Des</span>
        </h1>
  */}
        
      </div>

      {/* Search Input */}
      <div className="flex gap-2 items-center text-white">
        <Avatar
          className="rounded-full"
          name={user.username}
          maxInitials={2}
          size={25}
        />
        {user.username}
      </div>
      {/* Cart button */}
      

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <div className="flex gap-2 ml-3 mt-4">
          <FaHouseFloodWater size={24} className="text-blue-800" />
          <p>Hipamm Wotan</p>
        </div>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            {menuItems.map(({ icon, text }, index) => {
              return (
                <div key={index} className=" py-4">
                  <li className="text-xl flex cursor-pointer  w-[50%] rounded-full mx-auto p-2 hover:text-white hover:bg-black">
                    {icon} {text}
                  </li>
                </div>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
