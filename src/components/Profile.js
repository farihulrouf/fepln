import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { HiDocumentReport } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { FaHospitalUser } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { CiBarcode } from "react-icons/ci";
import UserUpdate from "./Users/UserUpdate";
import Customer from "./Customer/Customer";
import ScannerMenu from "./ScannerMenu";
import { MdGroups2 } from "react-icons/md";
import Report from "./Report";
import ListTransaction from "./ListTransaction";
import Customers from "./Customers";
export default function Profile({ user }) {
  const [menu, setMenu] = useState(0);

  const onChaneProfile = () => {
    setMenu(1);
  };
  const onChangeReport = () => {
    setMenu(2);
  };
  const onChangeCustomer = () => {
    setMenu(3);
  };
  const onChangeTransaction = () => {
    setMenu(4);
  };
  const onChangeBarcode = () => {
    setMenu(5);
  };
  const onChangeUser = () => {
    setMenu(6);
  };
  const onChageDefault = () => {
    setMenu(0);
  };
 // console.log("data", menu);
  return (
    <div className="px-6">
      {menu != 0 ? (
        <div className="flex justify-end">
          <button
            className="px-2 flex space-x-1 items-center"
            onClick={onChageDefault}
          >
            <IoArrowBack /> <span className="text-[12px]">Back</span>
          </button>
        </div>
      ) : null}

      {menu === 1 ? (
        <UserUpdate user={user} />
      ) : menu === 2 ? (
         <Report />
      ) : menu === 3 ? (
        <Customers />
      ) : menu === 4 ? (
        <ListTransaction />
      ) : menu === 5 ? (
        <ScannerMenu />
      ) : menu === 6 ? (
        <>Menu 6</>
      ) : (
        <div className="">
          <div className="flex flex-wrap justify-between py-4 gap-8">
            <div className="bg-white text-gray-700 flex flex-col items-center justify-center w-32 h-28 drop-shadow-sm">
              <span className="text-sm">Barcode </span>
              <button
                on
                className="px-2 py-y rounded-xl"
                onClick={onChangeBarcode}
              >
                <CiBarcode size={30} className="" />
              </button>
            </div>
            <div className="bg-white text-gray-700 flex flex-col items-center justify-center w-32 h-28 drop-shadow-sm">
              <span className="text-sm">Profile </span>
              <button
                on
                className="px-2 py-y rounded-xl"
                onClick={onChaneProfile}
              >
                <CgProfile size={30} className="" />
              </button>
            </div>

            <div className="bg-white text-gray-700  flex flex-col items-center justify-center w-32 h-28 shadow-sm">
              <span className="text-sm">Report </span>
              <button className="px-2 py-y rounded-xl" onClick={onChangeReport}>
                <HiDocumentReport size={30} className="" />
              </button>
            </div>

            <div className="bg-white text-gray-700  flex flex-col items-center justify-center w-32 h-28 shadow-sm">
              <span className="text-sm">Customer </span>
              <button
                className="px-2 py-y rounded-xl"
                onClick={onChangeCustomer}
              >
                <FaHospitalUser size={30} className="" />
              </button>
            </div>

            <div className="bg-white text-gray-700  flex flex-col items-center justify-center w-32 h-28 shadow-sm">
              <span className="text-sm">Transaction </span>
              <button
                className="px-2 py-y rounded-xl"
                onClick={onChangeTransaction}
              >
                <MdPayment size={30} className="" />
              </button>
            </div>

            <div className="bg-white text-gray-700  flex flex-col items-center justify-center w-32 h-28 shadow-sm">
              <span className="text-sm">Manage Users </span>
              <button className="px-2 py-y rounded-xl" onClick={onChangeUser}>
                <MdGroups2 size={30} className="" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//export default Profile;
