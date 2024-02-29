import React, { useState, useEffect } from "react";
import ServiceApi from "../services/ServiceApi";
import Spinner from "./Spinner";
import moment from "moment";
import AlertMessage from "./AlertMessage";
import { MdModeEditOutline } from "react-icons/md";
import EscPosEncoder from "@manhnd/esc-pos-encoder";
import { IoIosPrint } from "react-icons/io";
import ReactWhatsapp from "react-whatsapp";
import { FaWhatsapp } from "react-icons/fa";
import decodeUriComponent from "decode-uri-component";

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
  const [isPrint, setIprint] = useState(true);
  const dataTrans = "Transaction";
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(null);
  const [isPrice, setIsPrice] = useState();
  //let number = 0;
  // console.log('dara dari', idtrans)
  useEffect(() => {
    if (setIsupdate === 0) {
      getCustomerName();
    } else {
      //getCustomerName()
      getDetailTransaction();
    }
    getPrice();
    // printPrice()
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
        setIprint(response.data.status);
        setBayar(response.data.amount);
        setKubik(response.data.last_meteran);
        getDetailuser(response.data.no_id);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const getDetailuser = (id) => {
    setLoading(true);
    ServiceApi.getCustomer(id)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const printPrice = () => {
    //console.log('cek price',price)
  };
  const getPrice = () => {
    ServiceApi.getallPrice().then((response) => {
      setPrice(response.data);
    });
    // console.log('data', price)
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
        setIprint(true);
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
    //setIsSave(false);
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

    setIsSave(false);
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
    { width: 7, marginRight: 2, align: "center" },
    { width: 9, marginRight: 2, align: "center" },
    { width: 9, align: "right" },
  ];

  const InvoiceColumnHeader = ["Meteran", "Harga", "Total"];

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

  const getData = (
    harga_x,
    harga_y,
    harga_z,
    meteran_x,
    meteran_y,
    meteran_z
  ) => {
    const data_item = [];
    let invoiceEncoder = new EscPosEncoder();
    let basePrint = invoiceEncoder
      .align("center")
      .line("HIPPAM WOTAN")
      .newline()
      .align("left")
      .line(`No INV    : ${currentTrans.noinv}`)
      .line(`Nama      : ${data.name}`)
      .line(`Tanggal   : ${moment(new Date()).format("MM/DD/YYYY HH:mm:ss")}`)
      .line(`Meteran   : ${currentTrans.meteran}`)
      .line(
        `Bayar     : ${Number(bayar + 5000)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      )
      .newline();
    //moment(new Date()).format("MM/DD/YYYY HH:mm:ss")
    {
      /*
      const InvoiceColumn = [
    { width: 7, marginRight: 2, align: "center" },
    { width: 9, marginRight: 2, align: "center" },
    { width: 9, align: "right" },
    ];

  */
    }
    if (harga_z === 0 && harga_y != 0) {
      basePrint
        .table(InvoiceColumn, [
          InvoiceColumnHeader,
          [
            meteran_x.toString(),
            (harga_x / meteran_x)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            harga_x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          ],
          [
            meteran_y.toString(),
            (harga_y / meteran_y)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            harga_y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          ],
          ["Abond", "5,000", "5,000"],
        ])
        .newline();
    } else if (harga_y === 0 && harga_z === 0) {
      basePrint
        .table(InvoiceColumn, [
          InvoiceColumnHeader,
          [
            meteran_x.toString(),
            (harga_x / meteran_x)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            harga_x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          ],
          ["Abond", "5,000", "5,000"],
        ])
        .newline();
    } else {
      basePrint
        .table(InvoiceColumn, [
          InvoiceColumnHeader,
          [
            meteran_x.toString(),
            (harga_x / meteran_x)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            harga_x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          ],
          [
            meteran_y.toString(),
            (harga_y / meteran_y)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            harga_y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          ],
          [
            meteran_z.toString(),
            (harga_z / meteran_z)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            harga_z.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          ],
          ["Abond", "5,000", "5,000"],
        ])
        .newline();
    }

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
    var meteran_x = 0;
    var meteran_y = 0;
    var meteran_z = 0;
    var harga_x = 0;
    var harga_y = 0;
    var harga_z = 0;
    console.log("cek price", price);
    console.log("meteran", currentTrans.meteran);
    if (currentTrans.meteran <= price[0].maximum) {
      meteran_x = currentTrans.meteran;
      harga_x = meteran_x * price[0].harga;
      //console.log("harga normal", currentTrans.meteran * price[0].harga);
    } else if (
      currentTrans.meteran > price[0].maximum &&
      currentTrans.meteran < price[1].maximum
    ) {
      meteran_x = price[0].maximum;
      harga_x = meteran_x * price[0].harga;
      //console.log('meterran awal', meteran_x, harga_x)
      meteran_y = currentTrans.meteran - meteran_x;
      harga_y = meteran_y * price[1].harga;
      //console.log('meteran y', meteran_y, harga_y)
    } else if (currentTrans.meteran >= price[2].minimum) {
      meteran_z = currentTrans.meteran - price[1].maximum;
      harga_z = price[2].harga * meteran_z;
      //console.log('meteran', meteran_z, harga_z)
      meteran_y = price[1].maximum - price[0].maximum;
      harga_y = meteran_y * price[1].harga;
      // console.log('meteran 2',meteran_y, harga_y)
      meteran_x = price[0].maximum;
      harga_x = meteran_x * price[0].harga;
      //console.log('meteran pertama', meteran_x, harga_x)
    }
    //console.log('hasil akhir',meteran_y,meteran_z)

    try {
      const deviceList = await getPrintDeviceList();
      const gatt = await deviceList?.gatt?.connect();
      if (gatt) {
        if (typeof gatt.getPrimaryService === "function") {
          const service = await gatt.getPrimaryService(
            "000018f0-0000-1000-8000-00805f9b34fb"
          );
          if (service) {
            const printData = getData(
              harga_x,
              harga_y,
              harga_z,
              meteran_x,
              meteran_y,
              meteran_z
            );
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
  // const number_phone = "0"+data?.no_tel.toString()
  //console.log(number_phone)
  // const text_whatsapp = `Anggota%20HIPPAM%20WOTAN%20Yth%2C%20`+`${data?.name}`+`%20%0A%20%0ATerima%20kasih%2C%20Anda%20telah%20membayar%20Tagihan%0ARp`+`${(currentTrans?.amount+5000)}`+`.%0A%0A%0A%0A%28Pesan%20ini%20dikirim%20otomatis%20oleh%20sistem%20mohon%20tidak%20membalas%20pesan%20ini%29`
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
                      Rp{" "}
                      {bayar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/*  (`No INV    : ${currentTrans.noinv}`) */}
            {user.typeuser === "Admin" ? (
              <div className="flex justify-end py-4 mt-8">
                {isPrint === true ? (
                  <div className="flex space-x-4">
                    <ReactWhatsapp
                      // encodeURIComponent
                      number={`+62${data?.no_tel.toString()}`}
                      message={`${decodeUriComponent(
                        `Anggota%20HIPPAM%20WOTAN%20Yth%2C%20` +
                          `*${data?.name}*` +
                          `%20%0A%20%0ATerima%20kasih%2C%20Anda%20telah%20membayar%20Tagihan%0ARp` +
                          `*${(currentTrans?.amount + 5000).toString()}*` +
                          `.%0A%0A%0A%0A%28Pesan%20ini%20dikirim%20otomatis%20oleh%20sistem%20mohon%20tidak%20membalas%20pesan%20ini%29`
                      )}`}
                    >
                      <button className="px-2 py-1 bg-teal-600 rounded-sm text-white flex gap-1 items-center">
                        Send
                        <FaWhatsapp />
                      </button>
                    </ReactWhatsapp>
                    <button
                      className="px-2 py-1 bg-blue-600 rounded-sm text-white flex gap-1 items-center"
                      onClick={handlePrint}
                    >
                      Print
                      <IoIosPrint />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <ReactWhatsapp
                      // encodeURIComponent
                      number={`+62${data?.no_tel.toString()}`}
                      message={`${decodeUriComponent(
                        `Anggota%20HIPPAM%20WOTAN%20Yth%2C%20` +
                          `*${data?.name}*` +
                          `%20%0A%20%0ABulan%20ini%2C%20Anda%20memiliki%20Tagihan%20Sebesar%0ARp` +
                          `*${(currentTrans?.amount + 5000).toString()}*`+
                          `.%0A%0A%0A%0A%28Pesan%20ini%20dikirim%20otomatis%20oleh%20sistem%20mohon%20tidak%20membalas%20pesan%20ini%29`
                      )}`}
                    >
                      <button className="px-2 py-1 bg-teal-600 rounded-sm text-white flex gap-1 items-center">
                        Send
                        <FaWhatsapp />
                      </button>
                    </ReactWhatsapp>
                    <button
                      className="px-3 py-1 bg-blue-600 rounded-sm text-white"
                      onClick={saveData}
                    >
                      Bayar
                    </button>
                  </div>
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
