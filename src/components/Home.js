import React, { useState } from "react";
import axios from "axios";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({})

  const fetchData = async () => {
    /*
    try {
      const response = await axios.get("localhost:3000/customers/getnomer",{
        params: {
          s: '39843024',
        },
      });
      console.log(response)
      //setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    */
   console.log("data di test")
  };

  return (
    <>
      <form className="w-full p-4">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Nomer Meteran"
            aria-label="Meteran"
          />
          <button
            className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-500  hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button" onClick={fetchData}
          >
            Scan ok
          </button>
        </div>
      </form>
      <div className="mt-4 p-4">
        <div className="text-xl">
          <ul className="flex justify-between p-2">
            <li>Nomer</li>
            <li>9884934</li>
          </ul>
          <ul className="flex justify-between p-2">
            <li>Nama</li>
            <li>Ulul Fahmi</li>
          </ul>
          <ul className="flex justify-between p-2">
            <li>Penggunaan</li>
            <li>1200 m x m</li>
          </ul>
          <ul className="flex justify-between p-2">
            <li>Tagihan</li>
            <li>Rp 90000</li>
          </ul>
        </div>
      </div>
      <div className="flex space-x-4 mb-6 text-sm font-medium p-4">
        <div className="flex-auto flex space-x-4">
          <button
            className="h-10 px-6 font-semibold rounded-md bg-pink-500 text-white"
            type="submit"
          >
            Pay Now
          </button>
        </div>
        <button
          className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
          type="button"
          aria-label="Like"
        >
          <svg width="20" height="20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            />
          </svg>
        </button>
      </div>
    </>
  );
};
export default Home;
