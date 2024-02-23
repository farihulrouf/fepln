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
import { CiSaveUp2 } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import Barcode from 'react-barcode';
import { MdOutlineVerified } from "react-icons/md";

const NewTrans = ({ customerData, price, transaction }) => {
  // const [customerData, setcustomerData] = useState(null);
  const notify = () => toast("Transaction Saved");
  const [loading, setLoading] = useState(false);
  const [bayar, setBayar] = useState(0);
  const [kubik, setKubik] = useState(null);
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
      last_meteran: nilai,
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

 console.log('data', nilai)

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
              <button className="absolute top-[50px] left-20 px-1 mt-2 text-[12px] flex space-x-2 items-center">
                <IoChevronBack />
                QRCode
              </button>
              {isSave ? <AlertMessage data={dataTrans} /> : (
                null
              )}
            
              <div className="py-2 flex items-center space-x-2 relative">
                <Avatar
                  className="rounded-full"
                  name={customerData.name}
                  maxInitials={2}
                  size={50}
                />
                <div className="w-44">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {customerData.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500 flex items-center gap-1">
                    Active <MdOutlineVerified />
                  </p>
                </div>
                <Barcode height={20} value={customerData.no_id}/>
              </div>
              
              <div className="border-t border-gray-200 py-2 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex gap-1 items-center">
                          <FaGenderless />Gender
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {customerData.gender === "L" ? <p className="flex gap-1 items-center"><FaMale />Male</p> : <p className="flex gap-1 items-center"><FaFemale />Female</p>}
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
              <div className="flex justify-between">
                 <div className="w-1/3">
                  <label
                    htmlFor="quantity-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1"
                  >
                    <BsThermometerSun /> Cubic:
                  </label>
                  <div className="relative flex items-center w-16">
                   
                    <input
                      type="number"
                      id="quantity-input"
                      onChange={onChanData}
                      defaultValue={kubik}
                      data-input-counter
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50  border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="999"
                      required
                    />
                  
                  </div>
                </div>
                <div className="w-2/3 py-2 flex gap-2 justify-between items-center">
                <h2 className="text-lg flex gap-1 items-center"><BsSpeedometer />Last used</h2>
                <h2 className="text-3xl">
                  {transaction ? <> {transaction.meteran}</> : 0}
                </h2>
              </div>
              </div>          
              <div className="py-2 flex justify-end items-center">
                <h2 className="text-3xl">{nilai}</h2>
              </div>
              <div className="py-4 mb-4 flex justify-between text-lg">
                 <p>Total</p>
                <p> Rp {bayar}</p>
              </div>
              
              {isSave ? null : (
                <div className="flex justify-end py-2">
                  <button
                    className="px-2 py-1 bg-blue-500 rounded-sm text-white flex items-center gap-1"
                    onClick={saveData}
                  >
                    {loading ? <>Loading</> : <> <CiSaveUp2 />Save</>}
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
