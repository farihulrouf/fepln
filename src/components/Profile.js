import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { HiDocumentReport } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import Price from "./Price";
import { MdMessage } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import { MdPayment } from "react-icons/md";
import { CiBarcode } from "react-icons/ci";
import UserUpdate from "./Users/UserUpdate";
import ScannerMenu from "./ScannerMenu";
import { MdGroups2 } from "react-icons/md";
import Report from "./Report";
import ListTransaction from "./ListTransaction";
import Customers from "./Customers";
import User from "./Users";
export default function Profile({ user }) {
  const [menu, setMenu] = useState(0);
  const [menuAf, setMenuAf] = useState(false);
  const isBoolean = 0
  const l = 6
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
  const onChangePrice = () => {
    setMenu(7);
  };
  const onChageDefault = () => {
    setMenu(0);
  };

  return (
    <div className="px-6">
      {menu != 0 ? (
        <div className="flex justify-start mt-2">
          <button
            className="px-2 flex space-x-1 items-center"
            onClick={onChageDefault}
          >
            <IoArrowBack />{" "}
            <span className="text-[12px]">
              Menu {menuAf ? <>Tes</> : <></>}{" "}
            </span>
          </button>
        </div>
      ) : null}

      {menu === 1 ? (
        <UserUpdate user={user} />
      ) : menu === 2 ? (
        <Report />
      ) : menu === 3 ? (
        <Customers user={user} isBoolean={isBoolean} l={l}/>
      ) : menu === 4 ? (
        <ListTransaction user={user} />
      ) : menu === 5 ? (
        <ScannerMenu user={user} />
      ) : menu === 6 ? (
        <User />
      ) : menu === 7 ? (
         <Price />
      ) : (
        <div className="">
          <div className="flex flex-wrap justify-between py-2 gap-8">
            <div className="bg-white flex flex-col items-center justify-center w-32 h-28 drop-shadow-sm">
              <span className="text-sm text-blue-800">Barcode </span>
              <button
                on
                className="px-2 py-y rounded-xl"
                onClick={onChangeBarcode}
              >
                <CiBarcode size={30} className="text-blue-600" />
              </button>
            </div>
            <div className="bg-white flex flex-col items-center justify-center w-32 h-28 drop-shadow-sm">
              <span className="text-sm text-blue-800">Profile </span>
              <button
                on
                className="px-2 py-y rounded-xl"
                onClick={onChaneProfile}
              >
                <CgProfile size={30} className="text-blue-600" />
              </button>
            </div>

            <div className="bg-white flex flex-col items-center justify-center w-32 h-28 shadow-sm">
              <span className="text-sm text-blue-800">Report </span>
              <button className="px-2 py-y rounded-xl" onClick={onChangeReport}>
                <HiDocumentReport size={30} className="text-blue-600" />
              </button>
            </div>

            <div className="bg-white flex flex-col items-center justify-center w-32 h-28 shadow-sm">
              <span className="text-sm text-blue-800">Customer </span>
              <button
                className="px-2 py-y rounded-xl"
                onClick={onChangeCustomer}
              >
                <FaHospitalUser size={30} className="text-blue-600" />
              </button>
            </div>

            <div className="bg-white flex flex-col items-center justify-center w-32 h-28 shadow-sm">
              <span className="text-sm text-blue-800">Transaction </span>
              <button
                className="px-2 py-y rounded-xl"
                onClick={onChangeTransaction}
              >
                <MdPayment size={30} className="text-blue-600" />
              </button>
            </div>

            <div className="bg-white flex flex-col items-center justify-center w-32 h-28 shadow-sm">
              <span className="text-sm text-blue-800">Prices</span>
              <button className="px-2 py-y rounded-xl" onClick={onChangePrice}>
                <GiPriceTag size={30} className="text-blue-600" />
              </button>
            </div>
            <div className="bg-white flex flex-col items-center justify-center w-32 h-28 shadow-sm">
              <span className="text-sm text-blue-800">Manage Users </span>
              <button className="px-2 py-y rounded-xl" onClick={onChangeUser}>
                <MdGroups2 size={30} className="text-blue-600" />
              </button>
            </div>

            <div className="bg-white flex flex-col items-center justify-center w-32 h-28 shadow-sm">
              <span className="text-sm text-blue-800">Inbox </span>
              <button className="px-2 py-y rounded-xl" >
                <MdMessage  size={30} className="text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//export default Profile;
