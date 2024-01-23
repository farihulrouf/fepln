import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ServiceApi from "../../services/ServiceApi";
import Pagination from "../Pagination";
const Customer = () => {
  const [customers, setCustomers] = useState({});
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");


  const [currentPage, setCurrentPage] = useState(0);
  const [customersPerPage, setCustomerPerpage] = useState(5);

  
  const [recordsPerPage] = useState(5);
  useEffect(() => {
    retrieveCustomers();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const retrieveCustomers = async () => {
    ServiceApi.getallCustomer(currentCustomer, customersPerPage)
      .then((response) => {
        setCustomers(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  //const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const currentRecords = 3
  const nPages = Math.ceil(6 / recordsPerPage)

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
  console.log("data", customers);
  {
    /*
  const findByName = () => {
    ServiceApi.findByName(searchName)
      .then((response) => {
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
*/
  }
  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers.customers?.map((item, index) => {
                    return (
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.no_id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
           
              {/*
              postsPerPage,
  totalPosts,
  paginate,
  currentPage
                */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Customer;
