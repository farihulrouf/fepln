import React from "react"
import Avatar from "react-avatar";
import { MdModeEditOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import QRCode from "react-qr-code";

const CardProfile = ({customer}) => {
    return(
        <React.Fragment>
        <div className="px-4 py-5 sm:px-6 flex items-center space-x-2 relative">
          <Avatar
            className="rounded-full"
            name={customer.name + " " + customer.name}
            maxInitials={2}
            size={50}
          />
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {customer.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              19741021
            </p>
          </div>
          <MdModeEditOutline size={25} className="absolute right-4" />
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
                    {customer.gender == "L" ? (
                      <p>Male</p>
                    ) : (
                      <>Female</>
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                    <FaWhatsapp size={25} className="text-teal-700" />{" "}
                    <p>{customer.no_tel} </p>
                  </dd>
                </div>

                <QRCode
                  size={50}
                  value={String(customer.no_id)}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>

            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.addres}
              </dd>
            </div>
          </dl>
        </div>
        </React.Fragment>
    )
}
export default CardProfile