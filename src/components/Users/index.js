import React, { useEffect, useState } from "react";
import ServiceApi from "../../services/ServiceApi";
import Spinner from "../Spinner";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GrFormViewHide } from "react-icons/gr";

const User = () => {
  const [isUpdate, setIsupdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [limit, setLimit] = useState(6);
  useEffect(() => {
    getAll(1, 6, "");
    ///retrieveCustomers();
  }, []);
  const getAll = (page, limit, s) => {
    setLoading(true);
    ServiceApi.getallUsers(page, limit, s)
      .then((response) => {
        setUserData(response.data.user);
        console.log(response.data.user);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  const onChangeSearch = (e) => {
    getAll(1, 6, e);
  };
  const handlePageClick = ({ selected }) => {
    getAll(selected + 1, limit, "");
    // console.log(selected, "ini");
  };
  return (
    <React.Fragment>
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
                Role
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
            {userData === null ? (
              <Spinner />
            ) : (
              <>
                {loading ? (
                  <Spinner />
                ) : (
                  <React.Fragment>
                    {userData[0].data.map((users, index) => {
                      return (
                        <tr key={index}>
                          <td className="py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="">
                                <div className="text-sm font-medium text-gray-900">
                                  {users.username}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {users.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {users.typeuser}
                            </div>
                          </td>
                          <td className="py-2 whitespace-nowrap">
                            <button className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-green-800">
                              <span className="flex gap-2 items-center">
                                Detail <GrFormViewHide />{" "}
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    <div>
                      <p className="text-sm px-2 py-2">
                        Total {userData[0].metaData[0].totalDocuments}
                      </p>
                    </div>
                  </React.Fragment>
                )}
              </>
            )}
          </tbody>
        </table>
        {userData === null ? null : (
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <span className="w-10 h-10 flex items-center justify-center bg-lightgray rounded-md">
                <FaChevronRight />
              </span>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={userData[0].metaData[0].totalPages}
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
      </div>
    </React.Fragment>
  );
};
export default User;
