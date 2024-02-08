import React from "react";
import { CgProfile } from "react-icons/cg";
import { HiDocumentReport } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { FaHospitalUser } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

const DashUser = ({user}) => {
  console.log('data', user)
  return (
    <div className="">
      <div className="flex flex-wrap justify-between py-4 gap-8">
        <div className="bg-white text-gray-700 flex flex-col items-center justify-center w-32 h-28 drop-shadow-sm">
          <span className="text-sm">Profile </span>
          <button className="px-2 py-y rounded-xl">
            <CgProfile size={30} className="" />
          </button>
        </div>

        <div className="bg-white text-gray-700  flex flex-col items-center justify-center w-32 h-28 shadow-sm">
          <span className="text-sm">Report </span>
          <button className="px-2 py-y rounded-xl">
            <HiDocumentReport size={30} className="" />
          </button>
        </div>

        <div className="bg-white text-gray-700  flex flex-col items-center justify-center w-32 h-28 shadow-sm">
          <span className="text-sm">Customer </span>
          <button className="px-2 py-y rounded-xl">
            <FaHospitalUser size={30} className="" />
          </button>
        </div>

        <div className="bg-white text-gray-700  flex flex-col items-center justify-center w-32 h-28 shadow-sm">
          <span className="text-sm">Transaction </span>
          <button className="px-2 py-y rounded-xl">
            <MdPayment size={30} className="" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default DashUser;
