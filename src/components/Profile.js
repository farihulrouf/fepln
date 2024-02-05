import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import Spinner from "./Spinner";
import Cardsearch from "./Cardsearch";
import axios from "axios";
import ServiceApi from "../services/ServiceApi";
import { Html5QrcodeScanner } from "html5-qrcode";
const Profile = () => {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success (result) {
      scanner.clear();
      setScanResult(result);
    };

    function error (err) {
      console.warn(err);
    };
  });

  return (
    <div>
      { scanResult 
      ? <div> success: {scanResult} </div>
      : <div id="reader"></div>
      }
    </div>
  );

  {
    /*
  const currentUser = AuthService.getCurrentUser();
  const [nomer, setNomer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [resultdata, setResultdata] = useState();
  const [price, setPrice] = useState([]);
  
  const [scanResult, setScanResult] = useState(null)


  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250
      },
      fps: 5
    })
    const success = (result) => {
      scanner.clear()
      setScanResult(result)
    }
  
    const error = (err) => {
      console.warn(err)
    }
    //getPrice();
  }, []);

  const getPrice = () => {
    ServiceApi.getallPrice()
      .then((response) => {
        setPrice(response.data);
       // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeNomer = (e) => {
    const nomer = e.target.value;
    setNomer(nomer);
  };
  const fetchData = async () => {
    const params = {
      nomer: nomer,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/customers/getnomer",
        params
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 300);

      // console.log(response.data);
      if (response.data.user) {
        setSearchShow(true);
        setResultdata(response.data.user);
        //setDataresult(response.data)
        //console.log(response.data.found)
      } else {
        setSearchShow(false);
        setResultdata({});
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getTransaction = async () => {
    const params = {
      nomer: parseInt(nomer, 10),
    };
    try {
      setIsLoading(true);
      ServiceApi.getTransactions(params)
        .then((response) => {
          //console.log(response.data);
          setResultdata(response.data.transaction)
          setSearchShow(true);

        })
        .catch((e) => {
          console.log(e);
        });
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } catch (error) {}
  };

  const transAction = async () => {};



  const resultSearch = () => {
    if (searchShow) {
      return (
        <>
          <Cardsearch user={resultdata} price={price} />
        </>
      );
    }
  };
  return (
    <div className="container mx-auto">
      <form className="w-full p-4">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Nomer Meteran"
            aria-label="Meteran"
            value={nomer}
            onChange={onChangeNomer}
          />
          <button
            className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-500  hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={getTransaction}
          >
            Scan
          </button>
        </div>
      </form>
      <h1>Qr Code Scaning in React</h1>
      { scanResult 
      ? <div>Success: {scanResult} </div>
      : <div>ok</div>}
      
    </div>
  );
      */
  }
};

export default Profile;
