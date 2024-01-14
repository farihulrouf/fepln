import React, { useState } from "react";
import ServiceApi from "../../services/ServiceApi";

const FormPrice = () => {
  const initialState = {
    price: null,
    minimum: null,
    maximum: null,
  };
  const [price, setPrice] = useState(initialState);
  //const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPrice({ ...price, [name]: value });
  };

  const savePrice = () => {
    var data = {
      harga: price.price,
      minimum: price.minimum,
      maximum: price.maximum,
    };

    ServiceApi.createPrice(data)
      .then((response) => {
        setPrice({
          price: response.data.price,
          minimum: response.data.minimum,
          maximum: response.data.maximum,
        });
        //setSubmitted(true);
        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newPrice = () => {
    setPrice(initialState);
    //setSubmitted(false);
  };

  return (
    <React.Fragment>
      <form className="w-full p-4">
        <div className="flex items-center flex-col border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Harga"
            aria-label="Meteran"
            value={price.price}
            onChange={handleInputChange}
            name="price"
          />
          <input
            className="appearance-none mt-4 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Minimum"
            aria-label="Minimum"
            value={price.minimum}
            onChange={handleInputChange}
            name="minimum"
          />

          <input
            className="appearance-none mt-4 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Maximum"
            aria-label="Minimum"
            value={price.maximum}
            onChange={handleInputChange}
            name="maximum"
          />
        </div>

        <button
          className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-500  hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={savePrice}
        >
          Save
        </button>
      </form>
    </React.Fragment>
  );
};

export default FormPrice;
