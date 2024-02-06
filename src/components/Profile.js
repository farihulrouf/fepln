import React, { useEffect, useState, useRef } from "react";
import { FaTachometerAlt } from "react-icons/fa";

import CardProfile from "./CardProfile";
// import { getCameraList } from "./Utils";
import Spinner from "./Spinner";
import ServiceApi from "../services/ServiceApi";
import Scanner from "./Scanner";
import Transaction from "./Transaction";
import Ujicoba from "./Ujicoba";
const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [decodedValue, setDecodedValue] = useState(39843024);
  const [scannerType, setScannerType] = useState("QR");
  const [ price, setPrice] = useState([])
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
  useEffect(() => {
    getPrice()
    onSearchdata(19741021)
  },[])
  const getPrice = () => {
    ServiceApi.getallPrice()
    .then((response) => {
      setPrice(response.data)
     // console.log(response.data)
    }).catch((e) => {
      console.log(e)
    })
  }
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
    <div className="px-6 py-2 mt-8">
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

      {/*<input type="number" onChange={onChangeData} /> */}
      {err && <h2>{err}</h2>}
      <div className="py-4">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {customer ? (
              <React.Fragment>
                <CardProfile customer={customer} />
                <Transaction customer={customer} price={price} />
              </React.Fragment>
            ) : (
              <Ujicoba customer={customer} price={price} />
            )}
          </>
        )}
      </div>
      {/*
      <button className="px-2 py-2 p-2 bg-pink-500" onClick={handleClick}>
        Fetch data
      </button>
      {isLoading && <h2>Loading...</h2>}
        */}
    </div>
  );
};

export default Profile;
