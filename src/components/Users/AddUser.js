import React, { useEffect, useState } from "react";
const AddUser = () => {
  const [loading, setLoading] = useState(false);
  return (
    <React.Fragment>
      <div className="mt-6">
        <label
          for="email"
          className="block text-sm font-medium leading-5  text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            id="email"
            name="email"
            placeholder="user@example.com"
            type="email"
            required=""
            value=""
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
          <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label
          for="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="password"
            name="password"
            type="password"
            required=""
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          for="password_confirmation"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Confirm Password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required=""
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>

      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Create User
          </button>
        </span>
      </div>
    </React.Fragment>
  );
};
export default AddUser;
