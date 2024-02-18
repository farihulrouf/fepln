import React, { useState, useEffect } from "react";
import ServiceApi from "../../services/ServiceApi";
import { MdModeEditOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import Avatar from "react-avatar";
import Spinner from "../Spinner";
import QRCode from "react-qr-code";

const NewTrans = (nomer) => {
  const [customerData, setcustomerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bayar, setBayar] = useState(0);
  const [kubik, setKubik] = useState(1);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    getTran();
    getPrice();
  }, []);

  const getTran = () => {
    setLoading(true);
    ServiceApi.getTransactions(nomer)
      .then((response) => {
        setcustomerData(response.data.transaction[0]);
        setLoading(false);
        //setPrice(response.data);
        // console.log(response.data)
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const getPrice = () => {
    ServiceApi.getallPrice().then((response) => {
      setPrice(response.data);
    });
  };

  const onChanData = (e) => {
    setKubik(e.target.value);
    setBayar(((e.target.value) - customerData.meteran )* price[0].harga);
  };
  // console.log("data", customerData.customers[0].name);
  return (
    <React.Fragment>
      {customerData === null ? (
        <Spinner />
      ) : (
        <>
          <div className="px-4 py-5 sm:px-6 flex items-center space-x-2 relative">
            <Avatar
              className="rounded-full"
              name={customerData.customers[0].name}
              maxInitials={2}
              size={50}
            />
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {customerData.customers[0].name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {customerData.customers[0].no_id}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-2 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Gender
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {customerData.customers[0].name == "L" ? (
                        <p>Male</p>
                      ) : (
                        <>Female</>
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Phone number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <FaWhatsapp size={25} className="text-teal-700" />{" "}
                      <p>0{customerData.customers[0].no_tel}</p>
                    </dd>
                  </div>

                  <QRCode
                    size={50}
                    value={String(customerData.customers[0].no_id)}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            </dl>
          </div>
          <div className="py-2 flex justify-between items-center px-4">
                <h2 className="text-xl">Meteran</h2>
                <h2 className="text-3xl">{customerData.meteran}</h2>
          </div>
          <div className="py-2 flex relative">
            <div>
              <label
                htmlFor="quantity-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Meteran:
              </label>
              <div className="relative flex items-center w-36">
                <button
                  type="button"
                  id="decrement-button"
                  data-input-counter-decrement="quantity-input"
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  id="quantity-input"
                  onChange={onChanData}
                  defaultValue={kubik}
                  data-input-counter
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="999"
                  required
                />
                <button
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="quantity-input"
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-5 absolute right-4">
              <div className="flex flex-row items-center justify-between py-4">
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium text-gray-800">
                    Rp {bayar}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};
export default NewTrans;
