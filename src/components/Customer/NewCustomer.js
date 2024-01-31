import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import ServiceApi from "../../services/ServiceApi";
const NewCustomer = ({onChangeAdd}) => {
  //console.log(onChangeAdd)
  const initialState = {
    name: null,
    no_id: null,
    gender: null,
    no_tel: null,
    addres: null,
  };
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialState);

  const onChangeSave = () => {
   
    ServiceApi.createCustomer(data)
    .then((response) => {
      setData(data);
      setIsLoading(false);
      
     onChangeAdd()
      //setSubmitted(true);
      //console.log(response.data);
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

  return (
    <React.Fragment>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" for="name">
            Name
          </label>
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
          <label className="block text-gray-700 font-bold mb-2" for="noid">
            No Id
          </label>
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
          <label className="block text-gray-700 font-bold mb-2" for="gender">
            Gender
          </label>
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
          <label className="block text-gray-700 font-bold mb-2" for="phone">
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
          <label className="block text-gray-700 font-bold mb-2" for="message">
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
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={onChangeSave}
          >
            Save
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default NewCustomer;
