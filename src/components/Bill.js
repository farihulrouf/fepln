import React, { useState, useEffect } from "react";
import CardProfile from "./CardProfile";
import { IoMdClose } from "react-icons/io";
import ServiceApi from "../services/ServiceApi";
import Spinner from "./Spinner";
import moment from "moment";
import { FaCheck } from "react-icons/fa";
const Bill = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const id = 39843096;
  const id_cust = "65cee1ec1cf173883b45fae1";
  const onChangeBack = () => {};
  const setIsupdate = () => {};
  useEffect(() => {
    //console.log('cek', user)
    //getDetailTrans("65cee1ec1cf173883b45fae1");
    getDetailTrans(user.no_id)
  }, []);

  const getDetailTrans = (idc) => {
    setLoading(true);
    ServiceApi.getDetailtransLimit(idc)
      .then((response) => {
        setData(response.data.transaction);
        //console.log("this one", response.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
 // console.log("baca data", user);
  return (
    <>
     <CardProfile
        id={user.no_id}
        user={user}
        onChangeBack={onChangeBack}
        setIsupdate={setIsupdate}
      />
      {loading ? (
        <Spinner />
      ) : (
        <>
        
          <div className="bg-gray-100 px-4 py-2">
            <div className="flex justify-between">
              <h2 className="text-sm font-medium text-gray-800">Total kubik</h2>
              <h2 className="text-sm font-medium text-gray-800">
                {data?.meteran}
              </h2>
            </div>
          </div>
          <div className="px-4 flex space-x-12">
            <p className="text-gray-600 text-sm">
              {" "}
              {moment(data?.updated_at).format("MM/DD/YYYY HH:mm:ss")}
            </p>

            <button
              className={`text-white px-1 text-sm rounded-sm flex items-center gap-1 ${
                data?.status ? "bg-green-700" : "bg-red-500"
              }`}
            >
              {data?.status ? (
                <>
                  <FaCheck />
                  Success
                </>
              ) : (
                <>
                  <IoMdClose />
                  Waiting
                </>
              )}
            </button>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-600">
                  Total Usage
                </span>
                <span className="text-lg font-medium text-gray-800">
                  {data?.last_meteran}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-600">
                  Total paid
                </span>
                <span className="text-lg font-medium text-gray-800">
                  Rp {data?.amount}
                </span>
              </div>
            </div>
          </div>
              
        </>
      )}
    </>
  );
};
export default Bill;
