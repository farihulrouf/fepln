import React, { useState } from "react";
import { IoCashSharp } from "react-icons/io5";
import { FaWater } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Report = () => {
  const [isMonthPicker, setMonthPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="">
      <DatePicker
        className="px-2 py-2"
        selected={startDate}
        onChange={(date) => {
          setMonthPicker(false);
          setStartDate(date);
        }}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
      />

      <DatePicker
        className="px-2 py-2"
        selected={startDate}
        onChange={(date) => {
          setMonthPicker(false);
          setStartDate(date);
        }}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
      />

      <div className="flex items-center bg-white rounded-sm overflow-hidden">
        <div className="p-4">
          <IoCashSharp size={45} />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Cash Balance</h3>
          <p className="text-3xl">12,768</p>
        </div>
      </div>
      <div className="flex items-center bg-white rounded-sm overflow-hidden">
        <div className="p-4">
          <FaWater size={45} />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Usage</h3>
          <p className="text-3xl">39,265</p>
        </div>
      </div>
      <div className="flex items-center bg-white rounded-sm overflow-hidden">
        <div className="p-4">
          <IoCashSharp size={45} />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Cash Balance</h3>
          <p className="text-3xl">12,768</p>
        </div>
      </div>
    </div>
  );
};
export default Report;
