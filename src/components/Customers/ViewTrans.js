import React, { useState, useEffect } from "react";
import ServiceApi from "../../services/ServiceApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Spinner from "../Spinner";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ReactPaginate from "react-paginate";
import QRCode from "react-qr-code";
import Avatar from "react-avatar";
import { FaWhatsapp } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import moment from "moment";
const ViewTrans = ({ id }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getTransaction(1);
  }, []);
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
      })
      .catch((e) => {
        //console.log(e);
        setLoading(false);
      });
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
    getTransaction(selected + 1);
    // getTransaction(selected)
  };

  return (
    <>
      <div className="flex flex-col border-t">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-3 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-3 text-left"
                    >
                      Kubik
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-3 text-left"
                    >
                       Rp
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-3 text-left"
                    >
                      Date
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
                            <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
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
                            <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap">
                              {item.last_meteran}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap">
                              {item.amount}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap">
                              {moment(item.updated_at).format("MM/DD/YYYY")}
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
    </>
  );
};
export default ViewTrans;
