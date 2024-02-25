import React, { useState, useEffect } from "react";
import ServiceApi from "../services/ServiceApi";
import Spinner from "./Spinner";
import moment from "moment";
import AlertMessage from "./AlertMessage";
import { MdModeEditOutline } from "react-icons/md";
import EscPosEncoder from "@manhnd/esc-pos-encoder";
import {
  Bluetooth,
  BluetoothRemoteGATTCharacteristic,
} from "./util/webbluetooth";
const Transaction = ({ idtrans, user, setIsupdate }) => {
  // console.log(customer);
  const [kubik, setKubik] = useState(1);
  const [bayar, setBayar] = useState(0);
  const [num, setNum] = useState(0);
  const generate = Math.random().toFixed(6).split(".")[1];
  const [loading, setLoading] = useState(false);
  const [currentTrans, setCurrentTrans] = useState(null);
  const [price, setPrice] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [isSave, setIsSave] = useState(true);
  const dataTrans = "Transaction";
  const [isEdit, setIsEdit] = useState(false);
  // console.log('dara dari', idtrans)
  useEffect(() => {
    if (setIsupdate === 0) {
      getCustomerName();
    } else {
      getDetailTransaction();
    }
    getPrice();
  }, []);
  const getCustomerName = () => {
    setLoading(true);
    ServiceApi.getNoCustomer(idtrans)
      .then((response) => {
        setCustomer(response.data.user);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  const getDetailTransaction = () => {
    setLoading(true);
    ServiceApi.getTransactions(idtrans)
      .then((response) => {
        setCurrentTrans(response.data);
        setBayar(response.data.amount);
        setKubik(response.data.last_meteran);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const getPrice = () => {
    ServiceApi.getallPrice().then((response) => {
      setPrice(response.data);
    });
  };

  const onChangeUp = () => {
    setKubik(kubik + 1);
    //console.log('data eksekusi')
  };
  const onChanData = (e) => {
    setKubik(e.target.value);
    setBayar(e.target.value * price[0].harga);
  };
  const onChangeDown = () => {
    setKubik(kubik - 1);
  };

  const randomNumberInRange = (min, max) => {
    min = Math.ceil(0);
    max = Math.floor(5000);
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString().padStart(6, "0");
  };
  const onChangeEdit = () => {
    const edit = {
      status: true,
      meteran: kubik,
      amount: bayar,
      customer: currentTrans.customer,
    };
    setLoading(true);
    ServiceApi.updateTransactions(edit, currentTrans._id)
      .then((response) => {
        setLoading(false);
        setIsSave(false);
        //setIsupdate(0)
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  //console.log('idtrans', idtrans)
  const saveData = () => {
    if (setIsupdate === 0) {
      onChangeSave();
    } else {
      onChangeEdit();
    }
  };
  const onChangeSave = () => {
    //console.log("cek data");

    const dataTransaction = {
      title: "Air",
      noinv: generate,
      no_id: customer.no_id,
      transactionType: "Cash",
      customerId: customer._id,
      status: false,
      amount: bayar,
      meteran: kubik,
    };

    setLoading(true);
    ServiceApi.createTransactions(dataTransaction)
      .then((response) => {
        setLoading(false);
        setIsSave(true);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const MAX_DATA_SIZE = 125;

  const InvoiceColumn = [
    { width: 5, marginRight: 2, align: "left" },
    { width: 10, marginRight: 2, align: "center" },
    { width: 10, align: "right" },
  ];

  const InvoiceColumnHeader = ["No", "Meteran", "Total"];

  const getPrintDeviceList = async () => {
    const nvg = navigator;
    if (nvg && nvg.bluetooth) {
      return await nvg.bluetooth.requestDevice({
        filters: [
          {
            services: ["000018f0-0000-1000-8000-00805f9b34fb"],
          },
        ],
      });
    } else {
      throw new Error("Navigator / Bluetooth is not found!");
    }
  };

  const getData = () => {
    let invoiceEncoder = new EscPosEncoder();
    let basePrint = invoiceEncoder
      .align("center")
      .line("HIPAMM WOTAN")
      .align("left")
      .line("https://hippamwotan.com")
      .line(`No INV: ${currentTrans.noinv}`)
      .line(`Kasir   : Eli`)
      .line(`Tanggal   : ${new Date().toTimeString()}`)
      .line(`Sub total : ${Number(bayar)}`)
      .line(`TOTAL     : ${Number(1111111)}`)
      .newline();

    basePrint
      .table(InvoiceColumn, [
        InvoiceColumnHeader,
        ["1", kubik.toString(), bayar.toString()],
      ])
      .newline();
    basePrint
      .newline()
      .line("Untuk cek pesanan kamu, bisa melakukan scan disini");
    basePrint.qrcode("Guest", 1, 2, "q");

    basePrint.newline().line("Terima Kasih").newline();
    return basePrint.encode();
  };

  function writeStrToCharacteristic(characteristic, str) {
    let buffer = new ArrayBuffer(str.length);
    let dataView = new DataView(buffer);
    for (var i = 0; i < str.length; i++) {
      dataView.setUint8(i, str.at(i));
    }
    return characteristic.writeValue(dataView);
  }

  const handlePrint = async () => {
    try {
      const deviceList = await getPrintDeviceList();
      const gatt = await deviceList?.gatt?.connect();
      if (gatt) {
        if (typeof gatt.getPrimaryService === "function") {
          const service = await gatt.getPrimaryService(
            "000018f0-0000-1000-8000-00805f9b34fb"
          );
          if (service) {
            const printData = getData();
            console.log("printData", printData);
            const characteristic = await service.getCharacteristic(
              "00002af1-0000-1000-8000-00805f9b34fb"
            );
            if (printData.length > MAX_DATA_SIZE) {
              let j = 0;
              for (var i = 0; i < printData.length; i += MAX_DATA_SIZE) {
                var subStr;
                if (i + MAX_DATA_SIZE <= printData.length) {
                  subStr = printData.slice(i, i + MAX_DATA_SIZE);
                } else {
                  subStr = printData.slice(i, printData.length);
                }
                setTimeout(
                  writeStrToCharacteristic,
                  250 * j,
                  characteristic,
                  subStr
                );
                j++;
              }
            } else {
              await characteristic.writeValue(printData);
            }
          } else {
            console.log("service not found!");
          }
        } else {
          console.log("gatt.getPrimaryService not found!");
        }
      } else {
        console.log("GATT Device not found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log('ini data asd', idtrans);
  return (
    <React.Fragment>
      <div className="relative">
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {isSave ? null : <AlertMessage data={dataTrans} />}
            {user.typeuser === "Admin" ? (
              <div className="w-full flex justify-end">
                <MdModeEditOutline />
              </div>
            ) : null}

            <div>{isEdit ? <p>{currentTrans?.meteran}</p> : null}</div>
            <div className="py-2 flex relative">
              <div className="w-2/3">
                <label
                  htmlFor="quantity-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Meteran:
                </label>
                <p className="text-xl">{kubik}</p>
              </div>
              <p className="flex text-sm text-gray-500 justify-end w-1/3">
                <span>
                  {moment(currentTrans?.updated_at).format("MM/DD/YYYY")}
                </span>
              </p>

              <div className="mt-5 absolute right-0">
                <div className="flex flex-row items-center justify-between py-4">
                  <div className="flex flex-col items-start">
                    <span className="text-lg font-medium text-gray-800">
                      Rp {bayar}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {user.typeuser === "Admin" ? (
              <div className="flex justify-end py-4">
                {currentTrans?.status && isSave ? (
                  <button
                    className="px-3 py-1 bg-blue-600 rounded-sm text-white"
                    onClick={handlePrint}
                  >
                    Print
                  </button>
                ) : (
                  <button
                    className="px-3 py-1 bg-blue-600 rounded-sm text-white"
                    onClick={saveData}
                  >
                    Bayar
                  </button>
                )}
              </div>
            ) : null}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
export default Transaction;
