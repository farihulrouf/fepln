import React, { useState, useEffect } from "react";
import ServiceApi from "../../services/ServiceApi";
import EditPrce from "./EditPrice";
import { MdModeEdit, MdDelete } from "react-icons/md";
import FormPrice from "./FormPrice";
const ListPrice = ({stateChanger}) => {
  const [price, setPrice] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [dataedit, setDataEdit] = useState({});
  const [editprice, setEditPrice] = useState(false);
  const [showedit, setShowedit] = useState(false);
  console.log("data",!stateChanger)
  useEffect(() => {
    retrieveApi();
  }, []);

  const retrieveApi = () => {
    ServiceApi.getallPrice()
      .then((response) => {
        setPrice(response.data);
        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //console.log(price);
  const currencyFormatter = Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 3,
  });
  const onChangeEdit = (price) => {
    //console.log(price);
    //setShowedit(!showedit);
    stateChanger();
    setShowedit(!showedit);
    setDataEdit(price);
  };
  const onChangeDelete = (id) => {
    console.log(id);
  };
  //console.log(dataedit)
  return (
    <React.Fragment>
      {showedit ? (
        <EditPrce data={dataedit} />
      ) : (
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
                    <div className="text-sm text-gray-900">
                      {currencyFormatter.format(price.harga)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {price.minimum} - {price.maximum}
                    </div>
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <MdModeEdit size={20} onClick={(index) => onChangeEdit(price)} />
                    <MdDelete size={20} onClick={(index) => onChangeDelete(price._id)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};
export default ListPrice;
