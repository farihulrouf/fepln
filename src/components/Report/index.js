import React, { useState, useEffect } from "react";
import { IoCashSharp } from "react-icons/io5";
import { FaWater } from "react-icons/fa";
import { MdOutlineAutoGraph } from "react-icons/md";
import { TbSum } from "react-icons/tb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ServiceApi from "../../services/ServiceApi";
import Spinner from "../Spinner";
const Report = () => {
  const [isMonthPicker, setMonthPicker] = useState(false);
  const [isMonthPickerTo, setMonthPickerTo] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateTwo, setStartDateTwo] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  useEffect(() => {
    getReport(2, 2);
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
    //getReport(startDate.getMonth()+1,)
    //console.log(startDateTwo.getMonth()+1)
  };
  //  console.log(startDateTwo.getMonth())
  // console.log(startDate.getMonth()+1)
  console.log(report);
  return (
    <div className="">
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
              <IoCashSharp size={45} />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Cash Balance</h3>
              <p className="text-2xl">{rupiah(report[0].total)}</p>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-sm overflow-hidden">
            <div className="p-4">
              <FaWater size={45} />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Usage</h3>
              <div className="flex space-x-2 items-center">
                <p className="text-3xl">{report[0].used}</p>{" "}
                <span className="text-[12px]">Kubik</span>
              </div>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-sm overflow-hidden">
            <div className="p-4">
              <MdOutlineAutoGraph size={45} />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Average/kubik</h3>
              <p className="text-3xl">{report[0].avg_used}</p>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-sm overflow-hidden">
            <div className="p-4">
              <TbSum size={45} />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Transactions</h3>
              <p className="text-3xl">{report[0].count}</p>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default Report;
