import React, { useState, useEffect } from "react";
import moment from "moment";
import ServiceApi from "../../services/ServiceApi";
import Spinner from "../Spinner";
import ReactPaginate from "react-paginate";
import CardProfile from "../CardProfile";
import Transaction from "../Transaction";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { render } from "react-dom";
import { FaCheckDouble } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import formatnumber from "../formatNumber";
export default function ListTransaction({ user }) {
  const [isUpdate, setIsupdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [datatrans, setDatatrans] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [customer, setCustomers] = useState(null);
  const [limit, setLimit] = useState(6);
  const [currentPage, setCurrentpage] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);
  const [curentIdtrans, setCurrentIdtrans] = useState(null);
  const [menuCount, setMenuCount] = useState(0);
  useEffect(() => {
    getData(1, 6, "");
    ///retrieveCustomers();
  }, []);
  const getData = (page, limit, s) => {
    setLoading(true);
    ServiceApi.getTransactionsAll(page, limit, s)
      .then((response) => {
        // setTransaction(response.data.transaction[0].data);
        setDatatrans(response.data.transaction);
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
  const onChangeBack = () => {
    setMenuCount(0);
  };
  const onCalldata = (id, idtrans) => {
    return (
      <>
        {menuCount === 0 ? (
          <div>
            <CardProfile
              id={id}
              user={user}
              onChangeBack={onChangeBack}
              setIsupdate={setIsupdate}
            />
            <Transaction
              idtrans={idtrans}
              user={user}
              setIsupdate={setIsupdate}
            />
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };
  const handlePageClick = ({ selected }) => {
    getData(selected + 1, limit, "");
    // console.log(selected, "ini");
  };
  const onChangeSearch = (e) => {
    console.log(e);
    getData(1, 6, e);
  };
  const onChange = (data, idtrans) => {
    //console.log("this one", idtrans);
    setCurrentUser(data);
    setCurrentIdtrans(idtrans);
    setIsupdate(1);
  };

  //console.log("data ini", datatrans);
  return (
    <div className="realtive">
      {isUpdate === 1 ? (
        onCalldata(currentUser, curentIdtrans)
      ) : (
        <>
          <div>
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none mt-4 mb-4"
              type="text"
              placeholder="Nama Customer"
              aria-label="Meteran"
              onChange={(e) => onChangeSearch(e.target.value)}
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
                    Used
                  </th>
                  <th
                    scope="col"
                    className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {datatrans === null ? (
                  <Spinner />
                ) : (
                  <>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <React.Fragment>
                        {datatrans[0].data.map((trans, index) => {
                          return (
                            <tr key={index}>
                              <td className="py-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="">
                                    <div className="text-sm font-medium text-gray-900">
                                      {trans.customers[0]?.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      INV: {trans.noinv}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-2 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  Rp {formatnumber(trans.amount)}
                                </div>
                                <div className="text-sm text-gray-500 flex gap-1 items-center">
                                  {trans.last_meteran} C
                                </div>
                              </td>
                              <td className="py-2 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {moment(trans.created_at).format(
                                    "YYYY/MM/DD"
                                  )}
                                </div>
                                <div className="text-sm text-gray-500 flex gap-1 items-center">
                                  {trans.meteran} C
                                </div>
                              </td>
                              <td className="py-2 flex justify-center">
                                <button
                                  onClick={() =>
                                    onChange(
                                      trans.customers[0].no_id,
                                      trans._id
                                    )
                                  }
                                  className={`px-1 py-1 leading-5 font-semibold rounded-full text-white ${
                                    trans.status ? "bg-green-700" : "bg-red-500"
                                  }`}
                                >
                                  {trans.status ? (
                                    <FaCheckDouble />
                                  ) : (
                                    <IoCloseSharp />
                                  )}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        <div>
                          <p className="text-sm px-2 py-2">
                            Total {datatrans[0].metaData[0]?.totalDocuments}
                          </p>
                        </div>
                      </React.Fragment>
                    )}
                  </>
                )}
              </tbody>
            </table>
            {datatrans === null ? null : (
              <ReactPaginate
                breakLabel="..."
                nextLabel={
                  <span className="w-10 h-10 flex items-center justify-center bg-lightgray rounded-md">
                    <FaChevronRight />
                  </span>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={datatrans[0].metaData[0]?.totalPages}
                previousLabel={
                  <span className="h-10 flex items-center justify-center bg-lightgray rounded-md">
                    <FaChevronLeft />
                  </span>
                }
                containerClassName="flex items-center justify-center mt-2 mb-2"
                pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-8 h-10 flex items-center justify-center rounded-md mr-4"
                activeClassName="bg-blue-600 text-white"
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
