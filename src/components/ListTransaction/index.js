import React from "react";

const ListTransaction = () => {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Pemakaian
            </th>
            <th
              scope="col"
              className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            {/*
            <th
              scope="col"
              className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
            */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="py-2 whitespace-nowrap">
              <div className="flex items-center">
                {/*
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://i.pravatar.cc/150?img=1"
                    alt=""
                  />
                </div>
                 */}
                <div className="">
                  <div className="text-sm font-medium text-gray-900">
                    Jane Cooper
                  </div>
                  <div className="text-sm text-gray-500">
                    INV:9827382
                  </div>
                </div>
              </div>
            </td>
            <td className="py-2 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                Rp 250,000
              </div>
              <div className="text-sm text-gray-500">70 Kubik</div>
            </td>
            <td className="py-2 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
             {/*
            <td className="px-6 py-2 whitespace-nowrap  text-sm font-medium">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">
                Edit
              </a>
              <a href="#" class="ml-2 text-red-600 hover:text-red-900">
                Delete
              </a>
            </td>
            */}
          </tr>
          <tr>
            <td className="py-2 whitespace-nowrap">
              <div className="flex items-center">
                {/*
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://i.pravatar.cc/150?img=1"
                    alt=""
                  />
                </div>
                 */}
                <div className="">
                  <div className="text-sm font-medium text-gray-900">
                    Jane Cooper
                  </div>
                  <div className="text-sm text-gray-500">
                    INV:9827382
                  </div>
                </div>
              </div>
            </td>
            <td className="py-2 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                Rp 250,000
              </div>
              <div className="text-sm text-gray-500">70 Kubik</div>
            </td>
            <td className="py-2 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
             {/*
            <td className="px-6 py-2 whitespace-nowrap  text-sm font-medium">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">
                Edit
              </a>
              <a href="#" class="ml-2 text-red-600 hover:text-red-900">
                Delete
              </a>
            </td>
            */}
          </tr>
          <tr>
            <td className="py-2 whitespace-nowrap">
              <div className="flex items-center">
                {/*
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://i.pravatar.cc/150?img=1"
                    alt=""
                  />
                </div>
                 */}
                <div className="">
                  <div className="text-sm font-medium text-gray-900">
                    Jane Cooper
                  </div>
                  <div className="text-sm text-gray-500">
                    INV:9827382
                  </div>
                </div>
              </div>
            </td>
            <td className="py-2 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                Rp 250,000
              </div>
              <div className="text-sm text-gray-500">70 Kubik</div>
            </td>
            <td className="py-2 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
             {/*
            <td className="px-6 py-2 whitespace-nowrap  text-sm font-medium">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">
                Edit
              </a>
              <a href="#" class="ml-2 text-red-600 hover:text-red-900">
                Delete
              </a>
            </td>
            */}
          </tr>
          <tr>
            <td className="py-2 whitespace-nowrap">
              <div className="flex items-center">
                {/*
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://i.pravatar.cc/150?img=1"
                    alt=""
                  />
                </div>
                 */}
                <div className="">
                  <div className="text-sm font-medium text-gray-900">
                    Jane Cooper
                  </div>
                  <div className="text-sm text-gray-500">
                    INV:9827382
                  </div>
                </div>
              </div>
            </td>
            <td className="py-2 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                Rp 250,000
              </div>
              <div className="text-sm text-gray-500">70 Kubik</div>
            </td>
            <td className="py-2 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
             {/*
            <td className="px-6 py-2 whitespace-nowrap  text-sm font-medium">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">
                Edit
              </a>
              <a href="#" class="ml-2 text-red-600 hover:text-red-900">
                Delete
              </a>
            </td>
            */}
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default ListTransaction;
