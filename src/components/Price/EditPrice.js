import React, { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import ServiceApi from "../../services/ServiceApi";
import Spinner from "../Spinner";
const EditPrice = ({ setIsupdate, idprice }) => {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(null);
  const [data, setData] = useState(null)
  //console.log(setIsupdate)
  const backPrice = () => {
    console.log("rest");
    // setIsupdate
  };
  useEffect(() => {
    getIdPrice(idprice);
  }, []);

  const getIdPrice = (idPrice) => {
    setLoading(true);
    ServiceApi.findPrice(idprice)
      .then((response) => {
        setPrice(response.data);
        //setData(response.data)
        setLoading(false);
        // console.log(response.data)
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const onChangeSave = () => {
    setLoading(true)
    ServiceApi.updatePrice(idprice, data)
    .then((response) => {
      console.log('di dalam',response.data)
      setLoading(false)
    }).catch((e) => {
      setLoading(false)
    })
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target)
    setData({ ...data, [name]: value });
  };
 // console.log('cek',data)
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <div className="px-6">
            <button className="absolute top-[50px] left-20 px-1 mt-2 text-[12px] flex space-x-2 items-center">
              <IoChevronBack onClick={backPrice} />
              Price
            </button>
          </div>
          <div className="container mx-auto p4-10">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
              <div className="md:flex">
                <div className="mb-6">
                  <label className="block text-gray-800 font-bold mb-2">
                    Price
                  </label>
                  <input
                    className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    name="harga"
                    type="number"
                    defaultValue={price?.harga}
                    placeholder="Price"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-800 font-bold mb-2">
                    minimum
                  </label>
                  <input
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="min"
                    type="number"
                    name="minimum"
                    defaultValue={price?.minimum}
                    placeholder="minimum"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-800 font-bold mb-2">
                    maximum
                  </label>
                  <input
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="max"
                    type="number"
                    name="maximum"
                    defaultValue={price?.maximum}
                    placeholder="maximum"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={onChangeSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default EditPrice;
