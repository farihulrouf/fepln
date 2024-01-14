import React, { useState } from "react";
import AuthService from "../services/AuthService";
import Spinner from "./Spinner";
import Cardsearch from "./Cardsearch";
import axios from "axios";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [nomer, setNomer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [resultdata, setResultdata] = useState({});
  //const [showinvoice, setShowinvoice] = useState (false)
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

      console.log(response.data);
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

  const resultSearch = () => {
    if (searchShow) {
      return (
        <>
          <Cardsearch user={resultdata} />
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
            onClick={fetchData}
            disabled={isLoading}
          >
            Scan
          </button>
        </div>
      </form>
      <div className="relative">
        {isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment> {resultSearch()}</React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Profile;
