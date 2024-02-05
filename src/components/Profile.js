import React, { useEffect, useState, useRef } from "react";

// import { getCameraList } from "./Utils";

import ServiceApi from "../services/ServiceApi";

const Profile = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [decodedValue, setDecodedValue] = useState(39843024);
  const [scannerType, setScannerType] = useState("QR");

  const [idvalue, setIdvalue] = useState("")
  const [customer, setCustomer] = useState(null)
  const handleClick = async () => {
    const params = {
      id: decodedValue
      //parseInt(nomer, 10),
    };
    setIsLoading(true)
    ServiceApi.getNoCustomer(params)
    .then((response) => {
     // console.log(response)
      setCustomer(response.data)
      setIsLoading(false)
     // setCurrentCustomer(response.data);
     // setLoad(false);

      //console.log(response.data);
    })
    .catch((e) => {
      setIsLoading(false)
    });
  };

  console.log(customer);

  return (
    <div className="px-6 py-2">
      {err && <h2>{err}</h2>}

      <button className="px-2 py-2 p-2 bg-pink-500" onClick={handleClick}>Fetch data</button>

      {isLoading && <h2>Loading...</h2>}
      <div className="py-4">
      {customer? (
       <>
         {customer.user.name}
       </>
      ):(
       <>
         Ok
       </>
      )}
      </div>
    </div>
  );
};

export default Profile;
