import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import ServiceApi from "../../services/ServiceApi";
import Spinner from "../Spinner";
import ReactPaginate from "react-paginate";
import CardProfile from "../CardProfile";
import Transaction from "../Transaction";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { render } from "react-dom";
import { IoAdd } from "react-icons/io5";
import Add from "./Add";
import { IoIosArrowRoundBack } from "react-icons/io";

//import { IoArrowBack } from "react-icons/io5";
import ViewTrans from "./ViewTrans";
export default function Customers({ user }) {
  const [isUpdate, setIsupdate] = useState(0);
  const [loading, setLoading] = useState(false);
  //const [dataCustomer, setDataCustomer] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [customer, setCustomers] = useState(null);
  const [limit, setLimit] = useState(6);
  const [currentPage, setCurrentpage] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);
  const [idCustomer, setIdCustomer] = useState(null);
  const [curentIdtrans, setCurrentIdtrans] = useState(null);
  const [menuCount, setMenuCount] = useState(0);

  useEffect(() => {
    getList(1, 6, "");
  }, []);
  const getList = (page, limit, s) => {
    setLoading(true);
    ServiceApi.getListCustomers(page, limit, s)
      .then((response) => {
        setCustomers(response.data.customer);
        console.log(response.data.customer);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  const onChangeBack = () => {
    setMenuCount(1);
  };
  const onCalldata = (id, id_customer) => {
    return (
      <>
        <div>
          <CardProfile id={id} user={user} onChangeBack={onChangeBack} setIsupdate={setIsupdate} />
          {menuCount === 0 ? <ViewTrans id={idCustomer} /> : null}
        </div>
      </>
    );
  };
  const handlePageClick = ({ selected }) => {
    getList(selected + 1, limit, "");
    // console.log(selected, "ini");
  };
  const onChangeSearch = (e) => {
    console.log(e);
    getList(1, 6, e);
  };
  const onChange = (data, id_customer) => {
    setCurrentUser(data);
    setIdCustomer(id_customer);
    //setCurrentIdtrans(idtrans);
    setIsupdate(1);
    // onCalldata(id)
  };
  const isAddData = () => {
    return (
      <>
        <Add setIsupdate={setIsupdate} />
      </>
    )
  }


  return (
    <div className="realtive px-2">
      {isUpdate === 1 ? (
        onCalldata(currentUser, idCustomer)
      ) :
      isUpdate === 2 ? (
        isAddData()
      ):
      (
        <>       
            <div className="flex space-x-2 items-center">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none mt-4 mb-4"
                type="text"
                placeholder="Type name Customer"
                aria-label="Meteran"
                onChange={(e) => onChangeSearch(e.target.value)}
              />
              {user.typeuser === "Admin" ? (
                <button onClick={()=> setIsupdate(2)} className="px-1 py-1 rounded-full bg-teal-800 text-white text-bold">
                  <IoAdd />
                </button>
              ) : null}
            </div>
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customer === null ? (
                  <Spinner />
                ) : (
                  <>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <React.Fragment>
                        {customer[0].data.map((customer, index) => {
                          return (
                            <tr key={index}>
                              <td className="py-2 whitespace-nowrap">
                                <div className="flex space-x-2 items-center">
                                  <Avatar
                                    className="rounded-full"
                                    name={customer.name}
                                    maxInitials={2}
                                    size={30}
                                  />
                                  <div className="">
                                    <div className="text-sm font-medium text-gray-900">
                                      {customer.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {customer.no_id}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              {/*
                              <td className="py-2 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  0{customer.no_tel}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {customer.gender == "L" ? (
                                    <p>Male</p>
                                  ) : (
                                    <>Female</>
                                  )}
                                </div>
                              </td>
                              */}
                              <td className="py-2 whitespace-nowrap">
                                <button
                                  onClick={() => {
                                    onChange(customer.no_id, customer._id);
                                  }}
                                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-green-800"
                                >
                                  <span>Detail</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        <div>
                          <p className="text-sm px-2 py-2">
                            Total {customer[0].metaData[0].totalDocuments}
                          </p>
                        </div>
                      </React.Fragment>
                    )}
                  </>
                )}
              </tbody>
            </table>
            {customer === null ? null : (
              <ReactPaginate
                breakLabel="..."
                nextLabel={
                  <span className="w-10 h-10 flex items-center justify-center bg-lightgray rounded-md">
                    <FaChevronRight />
                  </span>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={customer[0].metaData[0].totalPages}
                previousLabel={
                  <span className="h-10 flex items-center justify-center bg-lightgray rounded-md">
                    <FaChevronLeft />
                  </span>
                }
                containerClassName="flex items-center justify-center mt-2 mb-2"
                pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-8 h-10 flex items-center justify-center rounded-md mr-4"
                activeClassName="bg-gray-200 text-white"
                renderOnZeroPageCount={null}
              />
            )}
        </>
      )}
    </div>
  );
}
