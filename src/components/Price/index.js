import React, { useState, useEffect } from "react";
import ServiceApi from "../../services/ServiceApi";
import { FaRegEdit } from "react-icons/fa";
const Price = () => {
  const [dataPrice, setDataPrice] = useState(null);

  useEffect(() => {
    getPrice();
  }, []);
  const getPrice = () => {
    ServiceApi.getallPrice()
      .then((response) => {
        setDataPrice(response.data);
        // console.log(response.data)
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // console.log(data)
  return (
    <React.Fragment>
      <div className="py-2">
        <p className="py-2">List setting Price</p>
      </div>
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
                          {index+1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                          {price.harga} 
                        </td>
                        <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                          {price.minimum} - {price.maximum}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                          <FaRegEdit />
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
    </React.Fragment>
  );
};
export default Price;
