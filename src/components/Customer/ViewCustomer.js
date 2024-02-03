import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { FaWhatsapp } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import ServiceApi from "../../services/ServiceApi";
import EditCustomer from "./EditCustomer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Spinner from "../Spinner";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ReactPaginate from "react-paginate";
import QRCode from "react-qr-code";

const ViewCustomer = (props) => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [load, setLoad] = useState(false)
  const initialCustomerState = {
    _id: null,
    name: "",
    notel: "",
    no_id: "",
    gender: "",
  };
  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState);
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [transaction, setTransaction] = useState([]);

  const getCustomer = (id) => {
    setLoad(true);

    ServiceApi.getCustomer(id)
      .then((response) => {
        setCurrentCustomer(response.data);
        setLoad(false);

        //console.log(response.data);
      })
      .catch((e) => {
        //console.log(e);
        setLoad(false);
      });
  };

  const getTransaction = (currentPage) => {
    //console.log("data id",id)
    const params = {
      no: id,
    };
    //console.log("data", params);
    setLoading(true);
    ServiceApi.getUserTransactions(params, currentPage, 3)
      .then((response) => {
        setTransaction(response.data);
        setLoading(false);
        // console.log(response)
        //setCurrentCustomer(response.data);
        //setLoading(false);

        //console.log(response.data);
      })
      .catch((e) => {
        //console.log(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTransaction(1);
    if (id) getCustomer(id);
  }, [id]);

  const editChange = () => {
    setEdit(!edit);
    getCustomer(id);
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
    getTransaction(selected + 1);
    // getTransaction(selected)
  };
  // console.log(transaction);
  //console.log('data di eksekusi', currentPage)
  //console.log(currentCustomer)

  return (
    <React.Fragment>
      {edit ? (
        <EditCustomer customer={currentCustomer} editChange={editChange} />
      ) : (
        <div className="bg-white overflow-hidden shadow rounded-lg border relative">
          
          {load ? (
            <div className="relative h-20">
                <Spinner />
            </div>
          ) : (
            <>
              <div className="px-4 py-5 sm:px-6 flex items-center space-x-2 relative">
                <Avatar
                  className="rounded-full"
                  name={currentCustomer.name + " " + currentCustomer.name}
                  maxInitials={2}
                  size={50}
                />
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {currentCustomer.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {currentCustomer.no_id}
                  </p>
                </div>
                <MdModeEditOutline
                  size={25}
                  className="absolute right-4"
                  onClick={editChange}
                />
              </div>
              <div className="border-t border-gray-200 px-4 py-2 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Gender
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {currentCustomer.gender == "L" ? (
                            <p>Male</p>
                          ) : (
                            <>Female</>
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                          <FaWhatsapp size={25} className="text-teal-700" />{" "}
                          <p>{currentCustomer.no_tel} </p>
                        </dd>
                      </div>

                      <QRCode
                        size={50}
                        value={String(currentCustomer.no_id)}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>

                  <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentCustomer.addres}
                    </dd>
                  </div>
                </dl>
              </div>
            </>
          )}
         
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Kubik
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Total Rp
                        </th>

                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody className="relative">
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <React.Fragment>
                          {transaction.data?.map((item, index) => {
                            return (
                              <tr className="border-b">
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {index + 1}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.meteran}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.amount}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.status ? (
                                    <FaCheckCircle
                                      size={16}
                                      className="text-teal-500"
                                    />
                                  ) : (
                                    <IoMdCloseCircleOutline
                                      size={18}
                                      className="text-red-500"
                                    />
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </React.Fragment>
                      )}
                    </tbody>
                  </table>
                  <p className="text-sm px-2 py-2">
                    Total items {transaction.totalitems}{" "}
                  </p>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={
                      <span className="w-10 h-10 flex items-center justify-center bg-lightgray rounded-md">
                        <FaChevronRight />
                      </span>
                    }
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={transaction.totalPages}
                    previousLabel={
                      <span className="w-10 h-10 flex items-center justify-center bg-lightgray rounded-md">
                        <FaChevronLeft />
                      </span>
                    }
                    containerClassName="flex items-center justify-center mt-2 mb-2"
                    pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
                    activeClassName="bg-gray-200 text-white"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default ViewCustomer;
