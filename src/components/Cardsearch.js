import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaWhatsapp } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import Invoice from "./Invoice";
const Cardsearch = ({ user }) => {
  const [showinvoice, setShowinvoice] = useState(false);
  const [value, setValue] = useState("");

  const onChange = () => {
    setShowinvoice(!showinvoice);
  };
  return (
    <React.Fragment>
      {showinvoice ? (
        <Invoice user={user} value={value} stateChanger={onChange} />
      ) : (
        <div className="h-screen dark:bg-gray-700 bg-gray-200">
          <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="border-b px-4">
              <div className="text-center my-1">
                <Avatar
                  className="rounded-full"
                  name={user.name + " " + user.name}
                  maxInitials={2}
                  size={50}
                />
                <div className="py-2">
                  <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-1">
                    {user.name}
                  </h3>
                  <div className="inline-flex gap-2 text-gray-700 dark:text-gray-300 items-center">
                    <FaWhatsapp size={20} />
                    {user.no_tel}
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-4 py-2 sm:p-6">
                <div className="flex flex-col items-start justify-between mb-6">
                  <span className="text-sm font-medium text-gray-600">
                    Nomer Pelanggan
                  </span>
                  <span className="text-lg font-medium text-gray-800">
                    {user.no_id}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-600">
                      Jumlah Tagihan
                    </span>
                    <span className="text-lg font-medium text-gray-800">
                      Rp 10,000
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-600">
                      Available Balance
                    </span>
                    <span className="text-lg font-medium text-gray-800">
                      Rp 7,500
                    </span>
                  </div>
                </div>
                <div className="px-6 py-2 mt-2 bg-gray-400 text-white">
                  <h1 className="text-lg font-bold">Jumlah Tagihan</h1>
                </div>
                <div className="py-4">
                  <div className="mb-4">
                    <input
                      className="appearance-none border border-gray-400 rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Jumlah Tagihan"
                      onChange={e => setValue(e.target.value)}
                    />
                  </div>

                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full" onClick={onChange}>
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </React.Fragment>
  );
};
export default Cardsearch;
