import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ServiceApi from "../../services/ServiceApi";
import Pagination from "../Pagination";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import Spinner from "../Spinner";
import Avatar from "react-avatar";
import NewCustomer from "./NewCustomer";
import Paginatio from "./Pagination";
import { IoAdd } from "react-icons/io5";
const Customer = () => {
  const [customers, setCustomers] = useState({});
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [customersPerPage, setCustomerPerpage] = useState(5);
  const [nameCustomer, setNameCustomer] = useState("");
  const [recordsPerPage] = useState(5);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addshow, setAddshow] = useState(false);

  useEffect(() => {
    retrieveCustomers(value,currentPage, customersPerPage);
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  //const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const currentRecords = 3;
  const nPages = Math.ceil(6 / recordsPerPage);

  const refreshList = () => {
    retrieveCustomers();
    setCurrentCustomer(null);
    setCurrentIndex(-1);
  };

  const setActiveCustomer = (customer, index) => {
    setCurrentCustomer(customer);
    setCurrentIndex(index);
  };

  const removeAllCustomers = () => {
    ServiceApi.deleteCustomer()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onChangeSearch = (event) => {
    setValue(event);
    //retrieveCustomers
    retrieveCustomers(event, currentPage, customersPerPage );
  };
  
  const onChangeData = () => {
    console.log('data silver', customersPerPage)
     //resultSearch('', currentPage, 5)
  }
  const retrieveCustomers = async (value, currentPage, customersPerPage) => {
    ServiceApi.getallCustomer(value, currentPage, customersPerPage)
      .then((response) => {
        setIsLoading(true);
        setCustomers(response.data);
        setIsLoading(false);

        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const onChangeAdd = () => {
    setAddshow(!addshow);
  };
  console.log('ini data',currentPage)
  console.log(customers)
  return (
    <React.Fragment>
      <div className="overflow-hidden px-4">
        { addshow ? 
          (
            null
          ):
          (
            <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Nama Customer"
              aria-label="Meteran"
              onChange={(e) => onChangeSearch(e.target.value)}
              // onChange={onChangeSearch}
              value={value}
              //onChange={event => setValue(event.target.value)}
              // onChange={event => setDate(event.target.value)}onChange={event => setDate(event.target.value)}
              //  onChange={onChangeSearch}
            />
          </div>
          )
        }
      

        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className="py-2">
              <div className="flex justify-end">
                <button
                  className="px-2 py-1 text-black flex items-center hover:background-indigo-500"
                  onClick={onChangeAdd}
                >
                  <IoAdd size={24} />
                </button>
              </div>
              {addshow ? (
                <NewCustomer onChangeAdd={onChangeAdd} />
              ) : (
                <div>
                  <table className="min-w-full text-left text-sm font-light mb-2">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="" className="px-2 w-1/8 py-3">
                          #
                        </th>

                        <th scope="" className="px-1 w-2/3 py-3">
                          Name
                        </th>
                        <th scope="" className="px-1 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.customers?.map((item, index) => {
                        return (
                          <tr className="border-b dark:border-neutral-500" key={index}>
                            <td className="px-2 py-3 font-medium">{index + 1}</td>
                            <td className="px-1 py-3 flex space-x-2" key={index}>
                              <Avatar
                                className="rounded-full"
                                name={item.name + " " + item.name}
                                maxInitials={2}
                                size={30}
                              />
                              <ul>
                                <Link to={"/customers/" + item._id}>
                                  <li className="font-normal">{item.name}</li>
                                  <li className="text-[12px]">{item.no_id}</li>
                                </Link>
                              </ul>
                            </td>
                            <td className="px-2 py-3">
                              <div className="w-full flex items-center space-x-12">
                               
                                <Link to={"/customers/" + item._id}>
                                  <MdModeEditOutline />{" "}
                                </Link>{" "}
                                <FaTrash />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Paginatio setCurrentPage={setCurrentPage} totalItems={customers.totalItems} currentPage={currentPage} onChangeData={onChangeData} />
  {/*
                  <PaginationButtons
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
                    */}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default Customer;
