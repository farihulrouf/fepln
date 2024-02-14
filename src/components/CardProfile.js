import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { MdModeEditOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import ServiceApi from "../services/ServiceApi";
import QRCode from "react-qr-code";
import Spinner from "./Spinner";
const CardProfile = ({ id, user }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
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
  
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <div className="px-4 py-5 sm:px-6 flex items-center space-x-2 relative">
            <Avatar
              className="rounded-full"
              name={data.name}
              maxInitials={2}
              size={50}
            />
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {data.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {data.no_id}
              </p>
            </div>
            {user.typeuser === "Admin" ? (
              <MdModeEditOutline size={25} className="absolute right-4" />
            ) : null}
          </div>
          <div className="border-t border-gray-200 px-4 py-2 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Gender
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.gender == "L" ? <p>Male</p> : <>Female</>}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Phone number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <FaWhatsapp size={25} className="text-teal-700" />{" "}
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
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.addres}
                </dd>
              </div>
            </dl>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default CardProfile;
