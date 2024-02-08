import React, { useState } from "react";
const Ujicoba = ({customer, price }) => {
    console.log(price);
    const [kubik, setKubik] = useState(1);
    const [bayar, setBayar] = useState(0);
    const onChangeUp = () => {
      setKubik(kubik + 1);
      //console.log('data eksekusi')
    };
    const onChanData = (e) => {
      setKubik(e.target.value);
      if (e.target.value <= price[0].maximum) {
        setBayar(e.target.value * price[0].harga);
      } else if (
        e.target.value > price[0].maximum &&
        e.target.value <= price[1].maximum
      ) {
        setBayar(e.target.value * price[1].harga);
      } else if (e.target.value > price[2].maximum) {
        setBayar(e.target.value * price[2].harga);
      }
    };
    const onChangeDown = () => {
      setKubik(kubik - 1);
    };
    console.log(kubik);
    return (
      <React.Fragment>
        <div className="py-2">
          <label
            htmlFor="quantity-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Meteran:
          </label>
          <div className="relative flex items-center w-36">
            <button
              type="button"
              id="decrement-button"
              onClick={onChangeDown}
              data-input-counter-decrement="quantity-input"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="number"
              id="quantity-input"
              onChange={onChanData}
              value={kubik}
              data-input-counter
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="999"
              required
            />
            <button
              type="button"
              id="increment-button"
              onClick={onChangeUp}
              data-input-counter-increment="quantity-input"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div>
            <div className="flex flex-row items-center justify-between py-4">
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-600">Total</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-lg font-medium text-gray-800">{bayar}</span>
              </div>
            </div>
            <div className="flex justify-end py-4">
              <button className="px-3 py-1 bg-teal-700 rounded-sm text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
};
export default Ujicoba;