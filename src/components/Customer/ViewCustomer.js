import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { FaWhatsapp } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import ServiceApi from "../../services/ServiceApi";
import EditCustomer from "./EditCustomer";
const ViewCustomer = (props) => {
  const { id } = useParams();
  const initialCustomerState = {
    _id: null,
    name: "",
    notel: "",
    no_id: "",
    gender: "",
  };
  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState);
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false);

  const getCustomer = (id) => {
    ServiceApi.getCustomer(id)
      .then((response) => {
        setCurrentCustomer(response.data);
         //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getCustomer(id);
  }, [id]);

  const editChange = () => {
    setEdit(!edit)
  }
  //console.log(currentCustomer)
  return (
    <React.Fragment>
      {edit ? (
        <EditCustomer customer={currentCustomer} editChange={editChange} />
      ) : (
        <div className="bg-white overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6 flex items-center space-x-2 relative">
            <Avatar
              className="rounded-full"
              name={currentCustomer.name + " " + currentCustomer.name}
              maxInitials={2}
              size={50}
            />
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {currentCustomer.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {currentCustomer.no_id}
              </p>
            </div>
            <MdModeEditOutline size={25} className="absolute right-4"  onClick={editChange} />
          </div>
          <div className="border-t border-gray-200 px-4 py-2 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {currentCustomer.gender == "L" ? <p>Male</p> : <>Female</>}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                  <FaWhatsapp size={25} /> {currentCustomer.no_tel}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {currentCustomer.addres}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default ViewCustomer;
