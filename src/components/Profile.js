import React, { useEffect, useState, useRef } from "react";
//import { FaTachometerAlt } from "react-icons/fa";

import CardProfile from "./CardProfile";
//import EventBus from "../common/eventBus"
import Spinner from "./Spinner";
import ServiceApi from "../services/ServiceApi";
import Scanner from "./Scanner";
import Transaction from "./Transaction";
import Ujicoba from "./Ujicoba";
import UserService from "../services/UserService ";
import QRCode from "react-qr-code";
//import UserUpdate from "./Users/UserUpdate";
import DashUser from "./Dash/DashUser";
export default function Profile({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [decodedValue, setDecodedValue] = useState(45346534);
  const [scannerType, setScannerType] = useState("QR");
  const [price, setPrice] = useState([]);
  const [idvalue, setIdvalue] = useState("");
  const [customer, setCustomer] = useState(null);
  const [content, setContent] = useState("");

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
    // getAdminBoard()
    getPrice();
    // onSearchdata(45346534)
  }, []);

  const getAdminBoard = () => {
    //  console.log('board admmin')
    UserService.getAdminBoard().then(
      (response) => {
        console.log("data response", response);
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          // EventBus.dispatch("logout");
        }
      }
    );
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
  //console.log('data user di profule', user)
  return (
    <>
      <DashUser user={user} />
    </>
  );
}

//export default Profile;
