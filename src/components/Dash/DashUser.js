import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { HiDocumentReport } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { FaHospitalUser } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { CiBarcode } from "react-icons/ci";
import UserUpdate from "../Users/UserUpdate";
import ScannerMenu from "../ScannerMenu";
import Customers from "../Customers";
const DashUser = ({ user }) => {
  const [menu, setMenu] = useState(0);
  //console.log('data', user)
  {
    /*
  useEffect(() => {
    setMenu(0);
  }, []);
*/
  }
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
  const onChageDefault = () => {
    setMenu(0);
  };
  console.log("data", menu);
  return (
    <>
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
        <>menu 2</>
      ) : menu === 3 ? (
        <Customers />
      ) : menu === 4 ? (
        <>menu 4 </>
      ) : menu === 5 ? (
        <ScannerMenu />
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
          </div>
        </div>
      )}
    </>
  );
};
export default DashUser;
