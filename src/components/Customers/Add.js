import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import ServiceApi from "../../services/ServiceApi";
import Spinner from "../Spinner";
import { IoIosArrowRoundBack } from "react-icons/io";

const Add = ({ setIsupdate }) => {
  //console.log(onChangeAdd)
  const initialState = {
    name: null,
    no_id: null,
    gender: null,
    no_tel: null,
    addres: null,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialState);

  const onChangeSave = () => {
    //console.log('tester')
    //console.log(setIsupdate(0))

    setIsLoading(true);

    ServiceApi.createCustomer(data)
      .then((response) => {
        setData(data);
        setIsLoading(false);
        setIsupdate(0);
        //console.log(setIsupdate(0))

        // onChangeAdd();
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target)
    setData({ ...data, [name]: value });
  };

  // console.log("coba", data);

  return (
    <React.Fragment>
      <button
        className="absolute top-[57px] left-20 px-1 mt-2 text-[12px] flex space-x-2 items-center"
        onClick={() => setIsupdate(0)}
      >
        <IoChevronBack />
        Customers
      </button>

      {isLoading ? <Spinner /> : null}
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={data.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">No Id</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="noid"
          type="number"
          name="no_id"
          placeholder="Enter your Id"
          value={data.no_id}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">Gender</label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="gender"
          name="gender"
          onChange={handleInputChange}
        >
          <option value="">Select a Gender</option>
          <option value="L">Male</option>
          <option value="P">Female</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">
          Phone Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="phone"
          name="no_tel"
          value={data.no_tel}
          placeholder="Enter your phone number"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">Address</label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          rows="4"
          name="addres"
          placeholder="Enter any additional information"
          value={data.addres}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="flex items-center justify-end mb-2">
        <button
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={onChangeSave}
        >
          Save
        </button>
      </div>
    </React.Fragment>
  );
};
export default Add;
