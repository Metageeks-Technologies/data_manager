import React from "react";
import { toolTipClass } from "../utils/tooltip";
import { useAppContext } from "../context/appContext";

const TableHeaders = ({ role, dataType, action }) => {
  const { selectedData, mainData, unselectAllData, selectAllData } =
    useAppContext();
  return (
    <thead className="text-xs sticky  top-0  uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {role === "admin" && (
          <th scope="col" className="px-6 py-3">
            <input
              id="col-checkbox"
              type="checkbox"
              value="all"
              checked={selectedData.length === mainData.length}
              onChange={(e) => {
                if (e.target.checked) {
                  selectAllData(mainData);
                } else {
                  unselectAllData();
                }
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </th>
        )}
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          Serial No.
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          DRI-ID
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          PLACE
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          APP NO
        </th>
        {/* <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          COMPANY
        </th> */}
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          MEMBERSHIP TYPE
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          DATE OF PURCHASE
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          AMC
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          CUSTOMER NAME
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          ADDRESS
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          RES PHONE
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          OFFICE PHONE{" "}
        </th>
        {/* <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
              PROFESSION
            </th> */}
        {/* <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          GSV
        </th> */}
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          CSV
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          DEPOSIT
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          STATUS
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          OUTSTANDING
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-gray-200 whitespace-nowrap font-semibold"
        >
          YEAR TILL NOW
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-gray-200 whitespace-nowrap font-semibold"
        >
          AMC Letter Status
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-gray-200 whitespace-nowrap font-semibold"
        >
          Membership Status
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-gray-200 whitespace-nowrap  font-semibold"
        >
          {/* AFTER DEDUCTING LICENSE FEE (99 based) */}

          <div
            data-tip={"AFTER DEDUCTING LICENSE FEE"}
            className={`${toolTipClass}`}
          >
            <div>ADLF (99 based)</div>
          </div>
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-gray-200 whitespace-nowrap font-semibold"
        >
          <div
            data-tip={"AFTER DEDUCTING LICENSE FEE"}
            className={`${toolTipClass}`}
          >
            <div>ADLF(33 based)</div>
          </div>
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          Last Communication
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
          REMARKS
        </th>

        {role !== "popup" && (
          <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
            {role === "admin"
              ? dataType === "accepted"
                ? "DELETE"
                : "RESTORE"
              : "ACTION"}
          </th>
        )}
        {role === "popup" && (
          <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
            ACTION
          </th>
        )}

        {(role === "executive" || role === "admin") && (
          <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
            ACTION {!action && "STATUS"}
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeaders;
