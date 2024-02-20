import React, { useState, useEffect } from "react";
import ServiceApi from "../../services/ServiceApi";
import { MdModeEditOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import Avatar from "react-avatar";
import Spinner from "../Spinner";
import QRCode from "react-qr-code";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScannerMenu from "../ScannerMenu";
import AlertMessage from "../AlertMessage";
import { BsSpeedometer } from "react-icons/bs";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { FaGenderless } from "react-icons/fa";
import { CiPhone } from "react-icons/ci";
import { BsThermometerSun } from "react-icons/bs";
const NewTrans = ({ customerData, price, transaction }) => {
  // const [customerData, setcustomerData] = useState(null);
  const notify = () => toast("Transaction Saved");
  const [loading, setLoading] = useState(false);
  const [bayar, setBayar] = useState(0);
  const [kubik, setKubik] = useState(1);
  const [nilai, setNilai] = useState(0);
  const [isSave, setIsSave] = useState(false);
  const dataTrans = 'Transaction'
  useEffect(() => {
    // getTransactionDetail(customerData.no_id)
  }, []);

  const getTransactionDetail = (no_id) => {
    setLoading(true);
    ServiceApi.getDetailtransById(no_id)
      .then((response) => {
        // console.log(response)
        //setDetailcust(response.data.user);
        console.log("test response", response);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  const getPrice = () => {
    ServiceApi.getallPrice().then((response) => {
      //setPrice(response.data);
    });
  };

  const onChanData = (e) => {
    setKubik(e.target.value);
    if (transaction === undefined) {
      setBayar((e.target.value - 0) * price[0].harga);
      setNilai(e.target.value - 0);
    } else {
      setBayar((e.target.value - transaction.meteran) * price[0].harga);
      setNilai(e.target.value - transaction.meteran);
    }
    // setBayar((e.target.value - customerData.meteran) * price[0].harga);

    //setNilai(e.target.value - customerData.meteran);
  };
  //console.log('test data',transaction)
  const saveData = () => {
    const dataTransaction = {
      title: "Air",
      noinv: Math.random().toFixed(6).split(".")[1],
      no_id: customerData.no_id,
      transactionType: "Cash",
      customerId: customerData._id,
      status: false,
      amount: bayar,
      meteran: kubik,
    };

    setLoading(true);
    ServiceApi.createTransactions(dataTransaction)
      .then((response) => {
        setLoading(false);
        setIsSave(true);
        //alertMessage();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };



  return (
    <React.Fragment>
      {customerData === null ? (
        <Spinner />
      ) : (
        <>
          {loading ? (
             <Spinner />
          ) : (
            <>
              <button className="absolute top-[57px] left-20 px-1 mt-2 text-[12px] flex space-x-2 items-center">
                <IoChevronBack />
                QRCode
              </button>
              {isSave ? <AlertMessage data={dataTrans} /> : (
                null
              )}
            
              <div className="px-4 py-5 sm:px-6 flex items-center space-x-2 relative">
                <Avatar
                  className="rounded-full"
                  name={customerData.name}
                  maxInitials={2}
                  size={50}
                />
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {customerData.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {customerData.no_id}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-2 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex gap-1 items-center">
                          <FaGenderless />Gender
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {customerData.name === "L" ? <p className="flex gap-1 items-center"><FaMale />Male</p> : <p className="flex gap-1 items-center"><FaFemale />Female</p>}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center gap-1">
                          <CiPhone />Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex gap-1 items-center">
                          <FaWhatsapp className="" />{" "}
                          <p>0{customerData.no_tel}</p>
                        </dd>
                      </div>

                      <QRCode
                        size={50}
                        value={String(customerData.no_id)}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                </dl>
              </div>
              <div className="py-2 flex justify-between items-center px-4">
                <h2 className="text-xl flex gap-1 items-center"><BsSpeedometer />Meteran</h2>
                <h2 className="text-3xl">
                  {transaction ? <> {transaction.meteran}</> : 0}
                </h2>
              </div>
              <div className="py-2 flex justify-end items-center px-4">
                <h2 className="text-3xl">{nilai}</h2>
              </div>
              <ToastContainer />
              <div className="py-2 flex relative">
                <div>
                  <label
                    htmlFor="quantity-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1"
                  >
                    <BsThermometerSun /> Meteran:
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
              {isSave ? null : (
                <div className="flex justify-end py-4">
                  <button
                    className="px-3 py-1 bg-teal-700 rounded-sm text-white"
                    onClick={saveData}
                  >
                    {loading ? <>Loading</> : <>Save</>}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
};
export default NewTrans;
