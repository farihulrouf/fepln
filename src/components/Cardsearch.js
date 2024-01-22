import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaWhatsapp } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import Invoice from "./Invoice";
const Cardsearch = ({ user, price }) => {
  const [showinvoice, setShowinvoice] = useState(false);
  const [value, setValue] = useState("");
  const [pemakaian, setPemakaian] = useState(0);
 // console.log("data harga", price);
  const onChange = () => {
    setShowinvoice(!showinvoice);
  };
  const onChangeData = (e) => {
    setPemakaian(e.target.value - user[0].meteran);
    setValue(e.target.value);
    //console.log(pemakaian)
   /* if(pemakaian >= price[0].maximum && pemakaian < price[1].maximum) {
      console.log('data harga', price[0].maximum)
    }
    */
    //console.log("harga saat ini",price)
    // console.log(value)
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
                  name={
                    user[0].customers[0].name + " " + user[0].customers[0].name
                  }
                  maxInitials={2}
                  size={50}
                />
                <div className="py-2">
                  <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-1">
                    {user.name}
                  </h3>
                  <div className="inline-flex gap-2 text-gray-700 dark:text-gray-300 items-center">
                    <FaWhatsapp size={20} />
                    {user[0].customers[0].no_tel}
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
                    {user[0].customers[0].name}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-600">
                      Jumlah Tagihan
                    </span>
                    <span className="text-lg font-medium text-gray-800">
                      Rp {user[0].amount}
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-600">
                      Total Penggunaan
                    </span>
                    <span className="text-lg font-medium text-gray-800">
                      {user[0].meteran} / Kubik
                    </span>
                  </div>
                </div>

                <div className="py-4">
                  <div className="mb-4">
                    <span>Pemakain Bulan ini</span>
                    <input
                      className="appearance-none border border-gray-400 rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Pemakaian"
                      onChange={onChangeData}
                    />

                    <div className="flex justify-between mt-2 bg-gray-200 p-2">
                      <p className="mt-2 mb-2">Total Pemakaian</p>
                      <div className="flex items-center space-x-2">
                        <h1 className="text-3xl">{pemakaian} </h1>
                        <span className="text-md">kubik</span>
                      </div>
                    </div>

                    <div className="flex justify-between mt-2 bg-gray-200 p-2">
                      <p className="mt-2 mb-2">Total Bayar</p>
                      <h1 className="text-3xl">Rp {pemakaian * price[0].harga}</h1>
                    </div>
                  </div>

                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                    onClick={onChange}
                  >
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
