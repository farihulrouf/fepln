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
  useEffect(() => {
    getTran();
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
  console.log("data", customerData.customers[0].name);
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
        </>
      )}
    </React.Fragment>
  );
};
export default NewTrans;
