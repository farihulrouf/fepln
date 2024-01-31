import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
const EditCustomer = ({customer, editChange}) => {
  const onChange = () => {
    
  }
  return (
    <React.Fragment>
      <div className="max-w-md mx-auto mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6"><IoMdArrowRoundBack size={25} onClick={onChange}/></div>
        <form className="py-4 px-6" action="" method="POST">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" for="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={customer.name}
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" for="noid">
              No Id
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="noid"
              type="text"
              value={customer.no_id}
              placeholder="Enter your no id"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" for="gender">
              Gender
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gender"
              name="gender"
            >
              <option value="">Select a Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" for="phone">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              value={customer.no_tel}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" for="message">
              Address
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="4"
              value={customer.adares}
              placeholder="Enter any additional information"
            ></textarea>
          </div>
          <div className="flex items-center justify-end mb-4">
            <button
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default EditCustomer;
