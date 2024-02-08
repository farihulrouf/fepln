import { useState, useEffect } from "react";
const UserUpdate = ({ user }) => {
  console.log('data yser , di upadte', user)
  return (
    <div className="flex justify-center mt-2">
      <form className="">
        <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
          <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">
            Account settings:
          </h2>

          <div className="flex flex-col gap-2 w-full border-gray-400">
            <div>
              <label className="text-gray-600 dark:text-gray-400">
                User name
              </label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="text"
                defaultValue={user.username}
              />
            </div>

            <div>
              <label className="text-gray-600 dark:text-gray-400">Email</label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="text"
                defaultValue={user.email}
              />
            </div>

            
            <div className="flex justify-end">
              <button
                className="py-1.5 px-3 m-1 text-center bg-teal-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                type="submit"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserUpdate