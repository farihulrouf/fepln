import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
const EditPrice = ({ setIsupdate }) => {
  //console.log(setIsupdate)
  const backPrice = () => {
    console.log('rest')
   // setIsupdate
  }
  return (
    <React.Fragment>
        <div className="px-6">
          <button className="absolute top-[50px] left-20 px-1 mt-2 text-[12px] flex space-x-2 items-center">
            <IoChevronBack onClick={backPrice} />
            Price
          </button>
        </div>
      <div className="container mx-auto p4-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
          <div className="md:flex">
            <div className="mb-6">
              <label className="block text-gray-800 font-bold mb-2">
                Price
              </label>
              <input
                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                placeholder="Price"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 font-bold mb-2">
                minimum
              </label>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="min"
                type="number"
                placeholder="minimum"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 font-bold mb-2">
                maximum
              </label>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="max"
                type="number"
                placeholder="maximum"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default EditPrice;
