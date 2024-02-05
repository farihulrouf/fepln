import React, { useEffect, useState, useRef } from "react";
import Avatar from "react-avatar";
import { MdModeEditOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import QRCode from "react-qr-code";

// import { getCameraList } from "./Utils";

import ServiceApi from "../services/ServiceApi";
import Scanner from "./Scanner";
const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [decodedValue, setDecodedValue] = useState(39843024);
  const [scannerType, setScannerType] = useState("QR");

  const [idvalue, setIdvalue] = useState("");
  const [customer, setCustomer] = useState(null);
  const handleClick = () => {
    setIsLoading(true);
    ServiceApi.getNoCustomer(decodedValue)
      .then((response) => {
        // console.log(response)
        setCustomer(response.data.user);
        setIsLoading(false);
        // setCurrentCustomer(response.data);
        // setLoad(false);

        //console.log(response.data);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const onChangeData = (res) => {
    setDecodedValue(res);
    console.log(res);
    onSearchdata(res);
    // console.log("silver", e.target.value);
    //  setDecodedValue(e.target.value);
  };
  const onSearchdata = (id) => {
    setIsLoading(true);
    ServiceApi.getNoCustomer(id)
      .then((response) => {
        // console.log(response)
        setCustomer(response.data.user);
        setIsLoading(false);
        // setCurrentCustomer(response.data);
        // setLoad(false);

        //console.log(response.data);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  //console.log(customer);

  return (
    <div className="px-6 py-2">
      <label>
        <input
          type="radio"
          defaultChecked
          value="QR"
          name="scannerType"
          onChange={() => setScannerType("QR")}
        />
        QR
      </label>
      <label>
        <input
          type="radio"
          value="BAR"
          name="scannerType"
          onChange={() => setScannerType("BAR")}
        />
        BAR
      </label>
      <Scanner type={scannerType} onResult={(res) => onChangeData(res)} />
      <br />
      {/*<input type="number" onChange={onChangeData} /> */}
      {err && <h2>{err}</h2>}
      <div className="py-4">
        {customer ? (
          <>
            <div className="px-4 py-5 sm:px-6 flex items-center space-x-2 relative">
              <Avatar
                className="rounded-full"
                name={customer.name + " " + customer.name}
                maxInitials={2}
                size={50}
              />
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {customer.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">19741021</p>
              </div>
              <MdModeEditOutline size={25} className="absolute right-4" />
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
                      {customer.gender == "L" ? (
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
                        <p>{customer.no_tel} </p>
                      </dd>
                    </div>

                    <QRCode size={50}  value={String(customer.no_id)} viewBox={`0 0 256 256`} />
                  </div>
                </div>

                <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {customer.adress}
                  </dd>
                </div>
              </dl>
            </div>
          </>
        ) : (
          <>Not Found</>
        )}
      </div>
      <button className="px-2 py-2 p-2 bg-pink-500" onClick={handleClick}>
        Fetch data
      </button>

      {isLoading && <h2>Loading...</h2>}
    </div>
  );
};

export default Profile;
