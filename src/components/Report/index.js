import React, { useState, useEffect } from "react";
import { IoCashSharp } from "react-icons/io5";
import { FaWater } from "react-icons/fa";
import { MdOutlineAutoGraph } from "react-icons/md";
import { TbSum } from "react-icons/tb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ServiceApi from "../../services/ServiceApi";
import formatNumber from "../formatNumber";
import Spinner from "../Spinner";
import { LuSpace } from "react-icons/lu";

const Report = () => {
  const [isMonthPicker, setMonthPicker] = useState(false);
  const [isMonthPickerTo, setMonthPickerTo] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateTwo, setStartDateTwo] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  useEffect(() => {
    getReport(3, 3);
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  const getReport = (date1, date2) => {
    setLoading(true);
    ServiceApi.getReportTransaction(date1, date2)
      .then((response) => {
        console.log(response);
        setReport(response.data.transaction);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  const onChangeHandle = (date) => {
    console.log(date.getMonth() + 1, startDate.getMonth() + 1);
    if (date.getMonth() > startDate.getMonth()) {
      getReport(startDate.getMonth() + 1, date.getMonth + 1);
    }
   
  };

  return (
    <div className="">
      <div className="py-4">
        <h3 className="text-sm py-2">Report Transactions</h3>
      </div>
      <div className="flex gap-3">
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
          selected={startDateTwo}
          onChange={(date) => {
            setMonthPickerTo(false);
            setStartDateTwo(date);
            onChangeHandle(date);
          }}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
        />
      </div>
      {report === null ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <div className="flex items-center bg-white rounded-sm overflow-hidden">
            <div className="p-4">
              <TbSum size={45} />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Transactions</h3>
              <div className="flex">
                <p className="text-xl">{report[0]?.count}</p>
                <LuSpace className="text-blue-500" />
                <p className="text-xl text-red-500">{report[1]?.count}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-sm overflow-hidden">
            <div className="p-4">
              <FaWater size={45} />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Usage</h3>
              <div className="flex space-x-2 items-center">
                <div className="flex">
                  <p className="text-xl">{report[0]?.used}</p>{" "}
                  <span className="text-[10px]">Kubik</span>
                </div>
                <LuSpace className="text-blue-500" />
                <div className="flex text-red-500">
                  <p className="text-xl">{report[1]?.used}</p>{" "}
                  <span className="text-[10px]">Kubik</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-sm overflow-hidden">
            <div className="p-4">
              <MdOutlineAutoGraph size={45} />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Average/kubik</h3>
              <div className="flex gap-1 ">
                <p className="text-xl">{report[0]?.avg_used.toFixed(2)}</p>
                <LuSpace className="text-blue-500" />
                <p className="text-xl text-red-600">
                  {report[1]?.avg_used.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-sm overflow-hidden">
            <div className="p-4">
              <IoCashSharp size={45} />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Cash Flow</h3>
              <div className="flex gap-1 ">
                <p className="text-xl">Rp {formatNumber(report[0]?.total)}</p>
                <LuSpace className="text-blue-500" />
                <p className="text-xl text-red-600">
                  Rp {formatNumber(report[1]?.total)}
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default Report;
