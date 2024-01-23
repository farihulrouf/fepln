import React from "react";
import moment from "moment";
import ServiceApi from "../services/ServiceApi";
const Invoice = ({ user, value, bayar, noinv, stateChanger }) => {
  //console.log(stateChanger);
  console.log(user);
  const buttonHandler = () => {
    stateChanger();
  };
  const date = new Date();

  const currencyFormatter = Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 3,
  });

  const saveTransaction = async () => {
    const params = {
      title: "Listrik",
      noinv: noinv,
      amount: bayar,
      no_id: user[0].customers[0].no_id,
      meteran: value,
      transactionType: "Credit Card",
      customerId: user[0].customers[0]._id,
    };
   // console.log(params);
    ServiceApi.createTransactions(params)
      .then((response) => {
        //setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //console.log(Math.random().toFixed(7).split('.')[1])
  return (
    <React.Fragment>
      <div className="max-w-sm mx-auto bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
        <hr className="mb-2" />
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">Invoice</h1>
          <div className="text-gray-700">
            <div>Date: {moment(date).format("MM/DD/YYYY")}</div>
            <div>Invoice #: {noinv}</div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2">
            {user[0].customers[0].name} ({user[0].customers[0].no_id})
          </div>
          <div className="text-gray-700 mb-2">
            {user[0].customers[0].no_tel}
          </div>
        </div>
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-700">Description</th>
              <th className="text-right font-bold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left text-gray-700">Pemakaian / kubik</td>
              <td className="text-right text-gray-700">{value}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="text-left font-bold text-gray-700">Total</td>
              <td className="text-right font-bold text-gray-700">
                {currencyFormatter.format(bayar)}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="text-gray-700 mb-2">Thank you for your business!</div>
       
        <div className="flex gap-2">
          <button className="bg-teal-500 px-2 py-2 text-white" onClick={buttonHandler}>
            Back
          </button>
          <button className="bg-teal-500 px-2 py-2 text-white" onClick={saveTransaction}>
            Save Print
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Invoice;
