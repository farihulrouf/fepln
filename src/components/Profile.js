import React, { useEffect, useState, useRef } from "react";

// import { getCameraList } from "./Utils";
import { MdQrCodeScanner } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
import ServiceApi from "../services/ServiceApi";

// function startCamera(){}



const Profile = () => {
  const [decodedValue, setDecodedValue] = useState(39843024);
  const [scannerType, setScannerType] = useState("QR");
  const [isLoading, setIsLoading] = useState(false)
  const [idvalue, setIdvalue] = useState("")
  const [customer, setCustomer] = useState(null)

  const getCustomer = () => {
    //console.log("data",decodedValue)
    
    const params = {
      id: decodedValue
      //parseInt(nomer, 10),
    };

    ServiceApi.getNoCustomer(params)
    .then((response) => {
     // console.log(response)
      setCustomer(response.data)
     // setCurrentCustomer(response.data);
     // setLoad(false);

      //console.log(response.data);
    })
    .catch((e) => {
      
    });
  
  }
  const onChangedata = (res) => {
    setDecodedValue(res)
    //getCustomer()
  }

  console.log(customer,'dan', decodedValue)
  return (
    <div className="px-6">
      {/*
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
        <Scanner type={scannerType} onResult={(res) => onChangedata(res)} />
      <br />
  */}
      <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nomer"
            type="text"
            name="nomer"
            placeholder="nomer"
            defaultValue={decodedValue}
           
          />
      
      <div>
       {customer ? (
        <>
          {customer.user.name}
        </>
       ):(
        <>
          Not Found
        </>
       )}
       </div>
      
      <button
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={getCustomer}
          >
            Save
          </button>
    </div>
  );
};

export default Profile;
