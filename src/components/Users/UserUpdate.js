import { useState, useEffect } from "react";
import ServiceApi from "../../services/ServiceApi";
import Spinner from "../Spinner";
const UserUpdate = ({ user }) => {
  //console.log('data yser , di upadte', user)
   //console.log(user)
  const inital  = {
    username: user.username,
    email: user.email,
    password: user.password,
    typeuser: user.typeuser
  }
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(inital)
  //console.log('tes data', data)
  const updateUser = () => {
   // ServiceApi.updateUser
    const { datax } = user
    console.log(datax)
    setIsLoading(true);
 
    {/*
    ServiceApi.updateUser(user._id,dataUser)
    .then((response) => {
      
       setIsLoading(false);  
     
    })
    .catch((e) => {
      console.log(e);
      setIsLoading(false);  
    });
    */}
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target)
    setData({ ...data, [name]: value });
  };
 // console.log(data)
  return (
    <div className="flex justify-center mt-2 relative">
      
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
                className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="text"
                name="username"
                defaultValue={user.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="text-gray-600 dark:text-gray-400">Email</label>
              <input
                className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="text"
                name="email"
                defaultValue={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-gray-600 dark:text-gray-400">Password</label>
              <input
                className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="password"
                name="password"
                defaultValue={user.password}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex justify-end">
              <button
                className="py-1.5 px-3 m-1 text-center bg-teal-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
         
                onClick={updateUser}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default UserUpdate