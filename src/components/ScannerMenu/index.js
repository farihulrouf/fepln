import React, { useState, useEffect } from "react";
import Scanner from "../Scanner";
import ServiceApi from "../../services/ServiceApi";
import Transaction from "../Transaction";
import Spinner from "../Spinner";
import NewTrans from "../ListTransaction/NewTrans";
import Customers from "../Customers";
const ScannerMenu = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scannerType, setScannerType] = useState("QR");
  const [customer, setCustomer] = useState(null);
  const [price, setPrice] = useState([]);
  const [err, setErr] = useState("");
  const [getCall, setGetcall] = useState(false);
  const [decodedValue, setDecodedValue] = useState(43243435);
  const [isUpdate, setIsupdate] = useState(0);
  const [transaction, setTransaction] = useState(null)
  const isBoolean = 1
  useEffect(() => {
    // getAdminBoard()
     getPrice();
    // getCustomerDetail(43243435)
    // onSearchdata(43243435);
  }, []);
  const onChangeData = (res) => {
    setGetcall(false);
    setDecodedValue(res);
    getCustomerDetail(res)
    getTransactionDetail(res)
   // onSearchdata(res)
    setGetcall(true);
  
  };
  const onChangeCal = () => {
    setGetcall(false);
  };
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
    ServiceApi.getTransactionsDetail(id)
      .then((response) => {
        // console.log(response)
        setCustomer(response.data.transaction[0]);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };


  const getCustomerDetail = (id) => {
    setIsLoading(true);
    ServiceApi.getNoCustomer(id)
      .then((response) => {
        // console.log(response)
        setCustomer(response.data.user);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  

  const getTransactionDetail = (no_id) => {
    setIsLoading(true);
    ServiceApi.getDetailtransById(no_id)
      .then((response) => {
          setTransaction(response.data.transaction[0])
          setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setTransaction(null)
      });
  };


  const onChangeBack = () => {
    //setMenuCount(0)
  };

  //console.log('jakshdiajdh',customer)
  return (
    <React.Fragment>
      <div className="flex space-x-16 mb-2 mt-2">
      <label>
        <input
          type="radio"
          defaultChecked
          value="QR"
          name="scannerType"
          className=""
          onChange={() => setScannerType("QR")}
        />
        <span className="ml-2">QR</span>
      </label>
      <label>
        <input
          type="radio"
          value="BAR"
          name="scannerType"
          className=""
          onChange={() => setScannerType("BAR")}
        />
         <span className="ml-2">BAR</span>
      </label>
      </div>
      <Scanner type={scannerType} onResult={(res) => onChangeData(res)} />
      {err && <h2>{err}</h2>}
      <div className="mt-6">
        {getCall ? (
          <>
            <NewTrans customerData={customer} price={price} transaction={transaction}  setGetcall={setGetcall} />
          </>
        ) : (
          <>
            <Customers user={user} isBoolean={isBoolean}  />
          </>
        )}
      </div>
      </React.Fragment>
  );
};
export default ScannerMenu;
