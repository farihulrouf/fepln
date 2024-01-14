import React, { useState, useEffect } from "react";
import ServiceApi from "../../services/ServiceApi";
const ListPrice = () => {
  const [price, setPrice] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveApi();
  }, []);

  const retrieveApi = () => {
    ServiceApi.getallPrice()
      .then((response) => {
        setPrice(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const currencyFormatter = Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 3,
  });
  return (
    <React.Fragment>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Harga
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {price &&
            price.map((price, index) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{currencyFormatter.format(price.harga)}</div>
                  <div className="text-sm text-gray-500">
                    {price.minimum} - {price.maximum}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                  <a href="#" className="ml-2 text-red-600 hover:text-red-900">
                    Delete
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default ListPrice;
