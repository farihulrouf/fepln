import React, { useState, useEffect } from "react";
//import CardProfile from "../CardProfile";
import CardProfileTest from "../CardProfileTest";
import TransactionTest from "../TransactionTest";
import ServiceApi from "../../services/ServiceApi";
import Spinner from "../Spinner";
import ReactPaginate from "react-paginate";
export default function ListTransaction() {
  const [isUpdate, setIsupdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datatrans, setDatatrans] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [customer, setCustomers] = useState(null);

  const onChange = () => {
    setIsupdate(true);
  };
  useEffect(() => {
    getData();
    ///retrieveCustomers();
  }, []);
  const getData = () => {
    setLoading(true);
    ServiceApi.getTransactionsAll(1, 5)
      .then((response) => {
        // setTransaction(response.data.transaction[0].data);
        setDatatrans(response.data.transaction);
        console.log("dalam", response);
        //console.log(datatrans)
        setMetadata(response.data.transaction);
        //console.log("uesefect",response.data.transaction)
        setLoading(false);
        // console.log(response)
        //setCurrentCustomer(response.data);
        //setLoading(false);

        //console.log(response.data);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  const retrieveCustomers = async () => {
    //  console.log('data dalam', currentPage )
    setLoading(true);

    ServiceApi.getallCustomer("", 1, 5)
      .then((response) => {
        //setIsLoading(true);
        setCustomers(response.data);
        setLoading(false);

        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  // console.log("nilai", metadata);
  //console.log("ini data", datatrans);
  //console.log(isUpdate);
  return (
    <div className="realtive">
      {isUpdate ? (
        <React.Fragment>
          <CardProfileTest />
          <TransactionTest />
        </React.Fragment>
      ) : (
        <>
          <div>
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Nama Customer"
              aria-label="Meteran"
            />
            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pemakaian
                  </th>
                  <th
                    scope="col"
                    className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                { datatrans === null ? (
                  <Spinner />
                ):(
                  <>
                  {datatrans[0].data.map((trans, index) => {
                    return(
                      <tr key={index}>
                      <td className="py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="">
                            <div className="text-sm font-medium text-gray-900">
                              {trans.customers[0].name}
                            </div>
                            <div className="text-sm text-gray-500">
                              INV: {trans.noinv}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Rp {trans.amount}
                        </div>
                        <div className="text-sm text-gray-500">
                          {trans.meteran} Kubik
                        </div>
                      </td>
                      <td className="py-2 whitespace-nowrap">
                        <span
                          onClick={onChange}
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-green-800 ${
                            trans.status ? "bg-green-200" : "bg-red-400"
                          }`}
                        >
                          {trans.status ? (
                            <span>Success</span>
                          ) : (
                            <span>Waiting</span>
                          )}
                        </span>
                      </td>
                      {/*
              <td className="px-6 py-2 whitespace-nowrap  text-sm font-medium">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">
              Edit
              </a>
              <a href="#" class="ml-2 text-red-600 hover:text-red-900">
              Delete
              </a>
              </td>
              */}
                    </tr>
                    )
                  })}
                  </>
                )}
                {/*datatrans[0].data && datatrans[0].data.map((trans, index) => {

                  })*/}
              </tbody>
            </table>
            <p className="text-sm px-2 py-2"></p>
          </div>
        </>
      )}
    </div>
  );
}
