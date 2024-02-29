import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import ServiceApi from "../../services/ServiceApi";
import Spinner from "../Spinner";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
const Add = ({ setIsupdate }) => {
  //console.log(onChangeAdd)
  const initialState = {
    name: null,
    no_id: Math.random().toFixed(6).split(".")[1],
    gender: null,
    no_tel: null,
    addres: null,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialState);

  const onChangeSave = () => {
    saveCustomer();
    saveUser();
  };

  const saveCustomer = () => {
    setIsLoading(true);

    ServiceApi.createCustomer(data)
      .then((response) => {
        setData(data);
        setIsLoading(false);
        // setIsupdate(0);
        //console.log(setIsupdate(0))

        // onChangeAdd();
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };
  const saveUser = () => {
    //const myArray = text.split(" ", 1);
    //substring(0, str.indexOf('_'));
    //const str = 'Walk the dog';
    //const before_ = str.substring(0, str.indexOf('_'));

    const user_name = data.name.substring(0, data.name.indexOf(" "));
    const userData = {
      username: user_name.toLowerCase(),
      email: data.no_id.toString() + "@hippamwotan.com",
      password: data.no_id.toString(),
      typeuser: "User",
      no_id: data.no_id,
    };
    //console.log(userData)

    ServiceApi.createUser(userData)
      .then((response) => {
        setIsupdate(0);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target)
    setData({ ...data, [name]: value });
  };

  // console.log("coba", data);
  //console.log(data.no_id);
  return (
    <React.Fragment>
      <button
        className="absolute top-[49px] left-20 px-1 mt-2 text-[12px] flex space-x-2 items-center"
        onClick={() => setIsupdate(0)}
      >
        <FaChevronLeft size={16} />
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
