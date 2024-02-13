import React, { useState, useEffect } from "react";
import Scanner from "../Scanner";
import ServiceApi from "../../services/ServiceApi";
import CardProfile from "../CardProfile";
import Transaction from "../Transaction";
import Spinner from "../Spinner";
const ScannerMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scannerType, setScannerType] = useState("QR");
  const [customer, setCustomer] = useState(null);
  const [price, setPrice] = useState([]);
  const [err, setErr] = useState("");
  const [getCall, setGetcall] = useState(false);
  const [decodedValue, setDecodedValue] = useState(45346534);

  useEffect(() => {
    // getAdminBoard()
    getPrice();
    // onSearchdata(45346534)
  }, []);
  const onChangeData = (res) => {
    setGetcall(false)
    setDecodedValue(res);
    setGetcall(true);
    {
      /*
    return (
      <div><CardProfile id={res} />
      </div>
    )
    */
    }
  };
  const onChangeCal = () => {
    setGetcall(false);
  }
  const getPrice = () => {
    ServiceApi.getallPrice()
      .then((response) => {
        setPrice(response.data);
        // console.log(response.data)
      })
      .catch((e) => {
        console.log(e);
      });
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
  return (
    <div>
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
      {err && <h2>{err}</h2>}
      <div className="py-4">
        {getCall ? <CardProfile id={decodedValue} /> : <Spinner /> }

        {/*
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {customer ? (
              <React.Fragment>
                <CardProfile id={decodedValue} />
                <Transaction customer={customer} price={price} /> 
              </React.Fragment>
            ) : null}
          </>
        )}
            */}
      </div>
    </div>
  );
};
export default ScannerMenu;
