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
import Barcode from "react-barcode";
import { MdOutlineVerified } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";
import formatNumber from "../formatNumber";
const NewTrans = ({ customerData, price, transaction, setGetcall }) => {
  // const [customerData, setcustomerData] = useState(null);
  const notify = () => toast("Transaction Saved");
  const [loading, setLoading] = useState(false);
  const [bayar, setBayar] = useState(0);
  const [kubik, setKubik] = useState(null);
  const [nilai, setNilai] = useState(0);
  const [isSave, setIsSave] = useState(false);
  const dataTrans = "Transaction";
  useEffect(() => {
    // getTransactionDetail(customerData.no_id)
  }, []);

  const getTransactionDetail = (no_id) => {
    setLoading(true);
    ServiceApi.getDetailtransById(no_id)
      .then((response) => {
        // console.log(response)
        //setDetailcust(response.data.user);
        //console.log("test response", response);
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

    var x = 0;
    var harga_ = 0;
    if (transaction === undefined) {
      x = e.target.value - 0;
    } else {
      x = e.target.value - transaction.meteran;
    }
    var harga_normal = 0;
    var harga_update = 0;
    if (x <= price[0].maximum) {
      harga_ = x * price[0].harga;
      //console.log('nilai value', harga_, 'dari harga', price[0].harga)
      setBayar(harga_);
    } else if (x > price[0].maximum && x < price[1].maximum) {
      // console.log('cek data lagi', x)
      const price_ = x - price[0].maximum;
      //console.log('cek lagi', price_ * price[1].harga)
      harga_normal = price[0].harga * (x - price_);
      harga_update = price_ * price[1].harga;
      //console.log("ini harga update", price_ * price[1].harga)
      //console.log(harga_normal ,"ini harga normal")
      //console.log('harga total', harga_update+harga_normal)
      setBayar(harga_normal + harga_update);
    } else if (x >= price[1].maximum) {
      var harga_akhir = 0;
      console.log("harga akhir");
      const price_ = x - price[1].maximum;
      harga_normal = price_ * price[2].harga;

      //console.log('cek data',harga_normal)
      // console.log('harga sisa',price_)
      //console.log(price_ * price[2].harga,"masuk harga") //harga_3
      harga_update = (x - price_ - price[0].maximum) * price[1].harga;
      harga_akhir =
        (x - (x - price_ - price[0].maximum) - price_) * price[0].harga;
      // console.log(harga_akhir, harga_update, harga_normal,"cek update")
      //console.log(harga_akhir+harga_normal+harga_update,"ini harga_awal")
      setBayar(harga_akhir + harga_normal + harga_update);
    }
    if (transaction === undefined) {
      setNilai(e.target.value - 0);
    } else {
      setNilai(e.target.value - transaction.meteran);
    }
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
    console.log(dataTransaction,'save')
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

  //console.log('data', price)
  const getBack = () => {
    //console.log(setGetcall)
    setGetcall(false);
    //console.log(!setGetcall)
    // setIsUpdate(1);
    //onChangeBack();
  };
  return (
    <div className="">
      {customerData === null ? (
        <Spinner />
      ) : (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <button
                className="absolute top-[50px] 
              left-20 px-1 mt-2 text-[12px] 
              flex space-x-2 items-center"
                onClick={() => getBack()}
              >
                <FaChevronLeft size={16} />
                QRCode
              </button>
              {isSave ? <AlertMessage data={dataTrans} /> : null}
              <div className="mt-8">
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
                  <Barcode height={20} value={customerData.no_id} />
                </div>

                <div className="border-t border-gray-200 py-2 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <dt className="text-sm font-medium text-gray-500 flex gap-1 items-center">
                            <FaGenderless />
                            Gender
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {customerData.gender === "L" ? (
                              <p className="flex gap-1 items-center">
                                <FaMale />
                                Male
                              </p>
                            ) : (
                              <p className="flex gap-1 items-center">
                                <FaFemale />
                                Female
                              </p>
                            )}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm font-medium text-gray-500 flex items-center gap-1">
                            <CiPhone />
                            Phone number
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

                <div className="mt-2 mb-2 border rounded-lg flex justify-between">
                  <div className="text-white w-24 bg-blue-600 rounded-l-lg">
                    <p className="text-[10px] px-2">Total used</p>
                    <div className="pl-2 flex items-center gap-1">
                      <BsSpeedometer />
                      {formatNumber(transaction?.meteran)}
                    </div>
                  </div>
                  {/*
                  <div className="text-white w-20 bg-orange-500">
                    <p className="text-[10px] px-2">Last Month</p>
                    <div className="pl-2 flex items-center gap-1">
                      <BsThermometerSun />
                      {transaction?.last_meteran}
                    </div>
                  </div>
                  */}
                  <input
                    type="number"
                    onChange={onChanData}
                    defaultValue={kubik}
                    id="quantity-input"
                    placeholder="input"
                    className="bg-white border-none text-center w-24 focus:ring-0 focus:ring-offset-0"
                 
                  
                  />
                  <div className="text-white w-24 bg-teal-500 rounded-r-lg">
                    <p className="text-[10px] px-2 text-right">Now</p>
                    <div className="pr-2 flex justify-end items-center gap-1">
                      {nilai}
                      <BsThermometerSun />
                    </div>
                  </div>
                </div>

                <div className="py-4 px-1 mb-4 flex justify-between text-lg">
                  <p>Total</p>
                  <p>
                    {" "}
                    Rp {bayar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>

                {isSave ? null : (
                  <div className="flex justify-end py-2">
                    <button
                      className="px-2 py-1 bg-blue-500 rounded-sm text-white flex items-center gap-1"
                      onClick={saveData}
                    >
                      {loading ? (
                        <>Loading</>
                      ) : (
                        <>
                          {" "}
                          <CiSaveUp2 />
                          Save
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default NewTrans;
