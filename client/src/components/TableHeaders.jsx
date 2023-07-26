import React from "react";
import { toolTipClass } from "../utils/tooltip";

const TableHeaders = ({role, dataType,action}) => {
  return (
    <thead className="text-xs sticky  top-0  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
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
        <th scope="col" className="px-6 py-3 text-gray-200 whitespace-nowrap font-semibold">
          YEAR TILL NOW
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 whitespace-nowrap  font-semibold">
          {/* AFTER DEDUCTING LICENSE FEE (99 based) */}
          
          <div
                      data-tip={"AFTER DEDUCTING LICENSE FEE"}
                      className={`${toolTipClass}`}
                      >
                      <div>ADLF (99 based)</div>
                    </div>
        </th>
        <th scope="col" className="px-6 py-3 text-gray-200 whitespace-nowrap font-semibold">
         
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
        <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
        {role === "admin" ? (
          dataType === "accepted" ? (
            "DELETE"
          ) : (
            "RESTORE"
          )
        ) : (
          "ACTION"
        )}
        </th>
        {role==="executive" && (
          <th scope="col" className="px-6 py-3 text-gray-200 font-semibold">
            ACTION {!action && "STATUS"}
        </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeaders;
