import React from "react";
import CardProfile from "./CardProfile";
import { IoMdClose } from "react-icons/io";

const Bill = ({ user }) => {
  const id = 39843096;
  const onChangeBack = () => {};
  const setIsupdate = () => {};
  return (
    <>
      <CardProfile
        id={id}
        user={user}
        onChangeBack={onChangeBack}
        setIsupdate={setIsupdate}
      />

      <div className="bg-gray-100 px-4 py-2">
        <div className="flex justify-between">
          <h2 className="text-sm font-medium text-gray-800">Total kubik</h2>
          <h2 className="text-sm font-medium text-gray-800">753 K</h2>
        </div>
      </div>
      <div className="px-4 flex justify-end">
        <button className="bg-red-500 text-white px-1 text-sm rounded-sm flex items-center gap-1">
          <IoMdClose />
          waiting
        </button>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-600">
              Total Usage
            </span>
            <span className="text-lg font-medium text-gray-800">20</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-600">
              Total paid
            </span>
            <span className="text-lg font-medium text-gray-800">Rp 7,500</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Bill;
