import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { MdModeEditOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import ServiceApi from "../services/ServiceApi";
import QRCode from "react-qr-code";
import Spinner from "./Spinner";
import Edit from "./Customers/Edit";
import { IoChevronBack } from "react-icons/io5";
import Barcode from "react-barcode";
import { MdOutlineVerified } from "react-icons/md";
import { FaGenderless } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { CiPhone } from "react-icons/ci";

const CardProfile = ({ id, user, onChangeBack, setIsupdate }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(0);
  useEffect(() => {
    getDetailuser(id);
  }, []);
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
  const dataOnchange = () => {
    setIsUpdate(1);
    onChangeBack();
  };
  console.log("data pengguna", data);
  //console.log('function',onChangeBack)
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {isUpdate === 0 ? (
            <>
              <button
                className="absolute top-[50px] left-20 px-1 mt-2 text-[12px] flex space-x-2 items-center"
                onClick={() => setIsupdate(0)}
              >
                <IoChevronBack />
                Customers
              </button>
              <div className="px-4 py-5 sm:px-6 flex items-center space-x-2 relative">
                <Avatar
                  className="rounded-full"
                  name={data.name}
                  maxInitials={2}
                  size={50}
                />
                <div className="w-52">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {data.name}
                  </h3>

                  <p className="mt-1 flex gap-1 items-center text-sm text-gray-500">
                    Active <MdOutlineVerified />
                  </p>
                </div>

                {user.typeuser === "Admin" ? (
                  <MdModeEditOutline
                    size={25}
                    className="absolute right-4"
                    onClick={dataOnchange}
                  />
                ) : null}
              </div>
              <div className="border-t border-gray-200 px-4 py-2 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex gap-1 items-center">
                          <FaGenderless />
                          Gender
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.gender === "L" ? <p className="flex gap-1 items-center"><FaMale />Male</p> : <p className="flex gap-1 items-center"><FaFemale />Female</p>}

                          
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center gap-1">
                          <CiPhone />
                          Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex gap-1 items-center">
                          <FaWhatsapp  />{" "}
                          <p>0{data.no_tel}</p>
                        </dd>
                      </div>

                      <QRCode
                        size={50}
                        value={String(data.no_id)}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                  <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.addres}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="px-2">
                <Barcode
                  height={10}
                  width={3}
                  fontSize={14}
                  textPosition="bottom"
                  value={data.no_id}
                />
              </div>
            </>
          ) : (
            <Edit customer={data} editChange={dataOnchange} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default CardProfile;
