import React, { useState, useEffect } from "react";
import ServiceApi from "../../services/ServiceApi";
import { FaRegEdit } from "react-icons/fa";
import EditPrice from "./EditPrice";
import Spinner from "../Spinner";
const Price = () => {
  const [dataPrice, setDataPrice] = useState(null);
  const [isUpdate, setIsupdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idPrice, setIdPrice] = useState(null)
  useEffect(() => {
    getPrice();
  }, []);
  const getPrice = () => {
    setIsLoading(true);
    ServiceApi.getallPrice()
      .then((response) => {
        setDataPrice(response.data);
        setIsLoading(false);
        // console.log(response.data)
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };
  const onChangePrice = (id_price) => {
   // console.log('cek',id_price)
     setIsupdate(true);
    setIdPrice(id_price)
  };

  
  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isUpdate ? (
            <EditPrice setIsupdate={setIsupdate} idprice={idPrice} textMenu="Price" getPrice={getPrice} />
          ) : (
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="border-b">
                        <tr>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-4 py-4 text-left"
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-4 py-4 text-left"
                          >
                            Harga
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-4 py-4 text-left"
                          >
                            Range
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-1 py-4 text-left"
                          >
                            Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataPrice?.map((price, index) => {
                          return (
                            <tr className="border-b">
                              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {index + 1}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                {price.harga}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                {price.minimum} - {price.maximum}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                                
                                <FaRegEdit onClick={() => onChangePrice(price._id)} />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </React.Fragment>
  );
};
export default Price;
