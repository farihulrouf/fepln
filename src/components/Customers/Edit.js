import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Spinner from "../Spinner";
import ServiceApi from "../../services/ServiceApi";
import { IoChevronBack } from "react-icons/io5";
import { CiSaveDown2 } from "react-icons/ci";
import AddUser from "../Users/AddUser";
import { IoMdAdd } from "react-icons/io";

const Edit = ({ customer, setIsEdit }) => {
  const initialState = {
    id: customer._id,
    name: customer.name,
    no_id: customer.no_id,
    gender: customer.gender,
    no_tel: customer.no_tel,
    addres: customer.addres,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialState);
  const [isUpdate, setIsUpdate] = useState(0);
  const onChange = () => {
    //editChange();
  };
  //console.log(data)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target)
    setData({ ...data, [name]: value });
  };
  // console.log(data);
  const onChangeSave = () => {
    setIsLoading(true);
    ServiceApi.updateCustomer(customer._id, data)
      .then((response) => {
        setData(data);
        setIsLoading(false);
        setIsEdit(0)
        // onChangeAdd()
        //setSubmitted(true);
        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };
  
  return (
    <React.Fragment>
      <div className="px-6">
        <button
        className="absolute 
        top-[50px] left-20 px-1 
        mt-2 text-[12px] flex space-x-2 
        items-center"  onClick={() => setIsEdit(0)}
        >
          <IoChevronBack />
          Customers
        </button>
      </div>

      {isUpdate === 0 ? (
        <>
          <div className="mb-2 mt-2">
            
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
              value={data.gender}
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
            <label className="block text-gray-700 font-bold mb-2">
              Address
            </label>
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
              className="bg-blue-600 flex items-center text-white py-1 px-2 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={onChangeSave}
            >
              <CiSaveDown2 />
              Save
            </button>
          </div>
        </>
      ) : (
        <AddUser />
      )}
    </React.Fragment>
  );
};
export default Edit;
