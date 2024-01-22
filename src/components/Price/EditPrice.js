import React, { useState } from "react";
import ServiceApi from "../../services/ServiceApi";
const EditPrce = ({ data }) => {
  const [price, setPrice] = useState(data);
  console.log(price,"info data")
  const updatePrice = () => {
    ServiceApi.updatePrice(price._id, price)
      .then((response) => {
        console.log(response.data);
        //setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPrice({ ...price, [name]: value });
  };

  console.log(price);
  return (
    <React.Fragment>
      <React.Fragment>
        <form className="w-full p-4">
          <div className="flex items-center flex-col border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="number"
              placeholder="Harga"
              aria-label="Meteran"
              name="harga"
              defaultValue={data.harga}
              onChange={handleInputChange}
            />
            <input
              className="appearance-none mt-4 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="number"
              placeholder="Minimum"
              aria-label="Minimum"
              name="minimum"
              defaultValue={data.minimum}
              onChange={handleInputChange}
            />

            <input
              className="appearance-none mt-4 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="number"
              placeholder="Maximum"
              aria-label="Minimum"
              name="maximum"
              defaultValue={data.maximum}
              onChange={handleInputChange}
            />
          </div>

          <button
            className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-500  hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button" onClick={updatePrice}
          >
            Save
          </button>
        </form>
      </React.Fragment>
    </React.Fragment>
  );
};
export default EditPrce;
