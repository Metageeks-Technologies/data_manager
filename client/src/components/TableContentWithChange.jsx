import React from "react";
import { useAppContext } from "../context/appContext";
import { toolTipClass } from "../utils/tooltip";
import EditExeData from "./EditExeData";
// EditExeData
const TableContentWithChange = ({
  data,
  role,
  handleApprove,
  handleReject,
  showForm,
  hideEdit,
}) => {
  const { user, page, makeEditable } = useAppContext();
  function hasKey(obj, key) {
    return obj && Object.prototype.hasOwnProperty.call(obj, key);
  }
  const handleEditable = (id) => {
    makeEditable(id);
  };
  const color = (cl) => {
    if (cl === "unchanged") return;
    if (cl == "pending") return "text-yellow-500";
    else if (cl == "rejected") return "text-red-500";
    else return "text-green-500";
  };
  return (
    <tbody>
      {data.length > 0 &&
        data.map((obj, index) => {
          const yearsCountTillNow =
            new Date().getFullYear() - parseInt(obj.date.split("-")[0]);

          const afterFeesDeduction__99based = Math.round(
            obj.deposit - (obj.deposit / 99) * yearsCountTillNow
          );
          const afterFeesDeduction__33based = Math.round(
            obj.deposit - (obj.deposit / 33) * yearsCountTillNow
          );
          const serialNum = (page - 1) * 8 + (index + 1);
          return (
            <tr key={obj._id} className="bg-white border-b dark:bg-gray-100 ">
              <td className="px-6 py-2  ">{serialNum}</td>
              <td
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-black"
              >
                {obj.dri_id}
              </td>
              <td
                scope="row"
                className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
              >
                <p
                  className={`${
                    // hasKey(obj.dataToUpdate,"place") &&

                    hasKey(obj.dataToUpdate, "place") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "place") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {" "}
                  {obj.place}
                </p>
                {hasKey(obj.dataToUpdate, "place") && (
                  <p className="text-blue-600">{obj.dataToUpdate.place}</p>
                )}
              </td>{" "}
              {/* <td className="px-6 py-2  ">{obj.appNumber}</td> */}
              <td
                scope="row"
                className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
              >
                <p
                  className={`${
                    // hasKey(obj.dataToUpdate,"amc") && "text-red-500 text-red-500 line-through"
                    hasKey(obj.dataToUpdate, "appNumber") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "appNumber") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {" "}
                  {obj.appNumber || ""}
                </p>
                {hasKey(obj.dataToUpdate, "appNumber") && (
                  <p className="text-blue-600">{obj.dataToUpdate.appNumber}</p>
                )}
              </td>{" "}
              {/* <td
            scope="row"
            className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
          >
            <p
              className={`${
                obj.company.length > 1 &&
                "text-red-500 text-red-500 line-through"
              }`}
            >
              {" "}
              {obj.company  || "-"}
            </p>
            {obj.company[1] && (
              <p className="text-blue-600">{obj.company[1]}</p>
            )}
          </td>{" "} */}
              <td
                scope="row"
                className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
              >
                <p
                  className={`${
                    // hasKey(obj.dataToUpdate,"membership_type") &&

                    hasKey(obj.dataToUpdate, "membership_type") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "membership_type") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {" "}
                  {obj.membership_type}
                </p>
                {hasKey(obj.dataToUpdate, "membership_type") && (
                  <p className="text-blue-600">
                    {obj.dataToUpdate.membership_type}
                  </p>
                )}
              </td>{" "}
              <td
                scope="row"
                className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
              >
                <p
                  className={`${
                    // hasKey(obj.dataToUpdate,"date") && "text-red-500 text-red-500 line-through"
                    hasKey(obj.dataToUpdate, "date") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "date") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {" "}
                  {obj.date}
                </p>
                {hasKey(obj.dataToUpdate, "date") && (
                  <p className="text-blue-600">{obj.dataToUpdate.date}</p>
                )}
              </td>{" "}
              <td
                scope="row"
                className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
              >
                <p
                  className={`${
                    // hasKey(obj.dataToUpdate,"amc") && "text-red-500 text-red-500 line-through"
                    hasKey(obj.dataToUpdate, "amc") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "amc") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {" "}
                  {obj.amc || "-"}
                </p>
                {hasKey(obj.dataToUpdate, "amc") && (
                  <p className="text-blue-600">{obj.dataToUpdate.amc}</p>
                )}
              </td>{" "}
              <td
                scope="row"
                className="px-6  py-2   text-gray-900 text-left whitespace-nowrap dark:text-black"
              >
                <p
                  className={`${
                    // hasKey(obj.dataToUpdate,"customerName") &&
                    // "text-red-500 text-red-500 line-through"
                    hasKey(obj.dataToUpdate, "customerName") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "customerName") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {" "}
                  {obj.customerName}
                </p>
                {hasKey(obj.dataToUpdate, "customerName") && (
                  <p className="text-blue-600">
                    {obj.dataToUpdate.customerName}
                  </p>
                )}
              </td>
              <td
                scope="row"
                className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
              >
                <p
                  className={`${
                    // hasKey(obj.dataToUpdate,"address") &&
                    // "text-red-500 text-red-500 line-through"
                    hasKey(obj.dataToUpdate, "address") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "address") &&
                        "text-red-500 line-through"
                  }`}
                >
                  <div
                    data-tip={`${obj.address}`}
                    className={`${toolTipClass}`}
                  >
                    <p>{`${obj.address.slice(0, 20)}...`}</p>
                  </div>
                </p>
                {hasKey(obj.dataToUpdate, "address") && (
                  <div
                    data-tip={`${obj.dataToUpdate.address}`}
                    className={`text-blue-600 ${toolTipClass}`}
                  >
                    <p>{`${obj.dataToUpdate.address.slice(0, 20)}...`}</p>
                  </div>
                )}
              </td>
              <td
                scope="row"
                className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
              >
                <p
                  className={`${
                    // hasKey(obj.dataToUpdate,"residentialPhone") &&
                    // "text-red-500 text-red-500 line-through"
                    hasKey(obj.dataToUpdate, "residentialPhone") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "residentialPhone") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {" "}
                  {obj.residentialPhone || "-"}
                </p>
                {hasKey(obj.dataToUpdate, "residentialPhone") && (
                  <p className="text-blue-600">
                    {obj.dataToUpdate.residentialPhone}
                  </p>
                )}
              </td>
              <td
                scope="row"
                className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
              >
                <p
                  className={`${
                    // hasKey(obj.dataToUpdate,"officePhone") &&
                    // "text-red-500 text-red-500 line-through"
                    hasKey(obj.dataToUpdate, "officePhone") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "officePhone") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {" "}
                  {obj.officePhone || "-"}
                </p>
                {hasKey(obj.dataToUpdate, "officePhone") && (
                  <p className="text-blue-600">
                    {obj.dataToUpdate.officePhone}
                  </p>
                )}
              </td>
              {/* <td
            scope="row"
            className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
          >
            <p
              className={`${
                obj.profession.length > 1 &&
                "text-red-500 text-red-500 line-through"
              }`}
            >
              {" "}
              {obj.profession }
            </p>
            {obj.profession[1] && (
              <p className="text-blue-600">
                {obj.profession[1]}
              </p>
            )}
          </td> */}
              {/* <td
            scope="row"
            className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
          >
            <p
              className={`${
                obj.GSV.length > 1 && "text-red-500 text-red-500 line-through"
              }`}
            >
              {" "}
              {obj.GSV }
            </p>
            {obj.GSV[1] && (
              <p className="text-blue-600">{obj.GSV[1]}</p>
            )}
          </td> */}
              <td className="px-6  py-2">
                <p
                  className={`${
                    // hasKey(obj.dataToUpdate,"CSV") && "text-red-500 line-through"
                    hasKey(obj.dataToUpdate, "CSV") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "CSV") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {obj.CSV}
                </p>
                {hasKey(obj.dataToUpdate, "CSV") && (
                  <p className="text-blue-600">{obj.dataToUpdate.CSV}</p>
                )}
              </td>
              <td className="px-6  py-2">
                <p
                  className={`${
                    // hasKey(obj.dataToUpdate,"deposit") && "text-red-500 line-through"
                    hasKey(obj.dataToUpdate, "deposit") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "deposit") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {obj.deposit}
                </p>
                {hasKey(obj.dataToUpdate, "deposit") && (
                  <p className="text-blue-600">{obj.dataToUpdate.deposit}</p>
                )}
              </td>
              <td className="px-6  py-2 text-center whitespace-nowrap">
                <p
                  className={`${
                    // hasKey(obj.dataToUpdate,"status") && "text-red-500 line-through"
                    hasKey(obj.dataToUpdate, "status") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "status") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {obj.status}
                </p>
                {hasKey(obj.dataToUpdate, "status") && (
                  <p className="text-blue-600">{obj.dataToUpdate.status}</p>
                )}
              </td>
              <td className="px-6  py-2 text-center">
                {obj.CSV - obj.deposit}
                {/* <p
              className={`${
                (obj.GSV.length > 1 || obj.deposit.length > 1) &&
                "text-red-500 line-through"
              }`}
            >
              {obj.CSV  - obj.deposit }
            </p> */}
                {/* {(obj.GSV.length>1 || obj.deposit.length>1) && (
              <p className="text-blue-600">
                {(obj.CSV[1] || obj.CSV ) -
                  (obj.deposit[1] || obj.deposit )}
              </p>
            )} */}
              </td>
              <td className="px-6 py-2 text-center">
                {yearsCountTillNow || "-"}
              </td>
              <td className="px-6 py-2">
                <p
                  className={`${
                    hasKey(obj.dataToUpdate, "amcLetterStatus") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "amcLetterStatus") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {obj.amcLetterStatus}
                </p>
                {hasKey(obj.dataToUpdate, "amcLetterStatus") && (
                  <p className="text-blue-600">
                    {obj.dataToUpdate.amcLetterStatus}
                  </p>
                )}
              </td>
              <td className="px-6 py-2">
                <p
                  className={`${
                    hasKey(obj.dataToUpdate, "membershipStatus") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "membershipStatus") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {obj.membershipStatus}
                </p>
                {hasKey(obj.dataToUpdate, "membershipStatus") && (
                  <p className="text-blue-600">
                    {obj.dataToUpdate.membershipStatus}
                  </p>
                )}
              </td>
              {/* <td className="px-6 py-2 text-center">{afterFeesDeduction__99based || "-"}</td> */}
              {/* <td className="px-6 py-2 text-center">{afterFeesDeduction__33based || "-"}</td> */}
              <td className="px-6 py-2">
                <p
                  className={`${
                    hasKey(obj.dataToUpdate, "afterFeesDeduction99based") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "afterFeesDeduction99based") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {obj.afterFeesDeduction99based}
                </p>
                {hasKey(obj.dataToUpdate, "afterFeesDeduction99based") && (
                  <p className="text-blue-600">
                    {obj.dataToUpdate.afterFeesDeduction99based}
                  </p>
                )}
              </td>
              <td className="px-6 py-2">
                <p
                  className={`${
                    hasKey(obj.dataToUpdate, "afterFeesDeduction33based") &&
                    obj.editStatus === "approved"
                      ? "hidden"
                      : hasKey(obj.dataToUpdate, "afterFeesDeduction33based") &&
                        "text-red-500 line-through"
                  }`}
                >
                  {obj.afterFeesDeduction33based}
                </p>
                {hasKey(obj.dataToUpdate, "afterFeesDeduction33based") && (
                  <p className="text-blue-600">
                    {obj.dataToUpdate.afterFeesDeduction33based}
                  </p>
                )}
              </td>
              <td className="px-6 py-2">
                <p
                  className={`${
                    hasKey(obj.dataToUpdate, "lastCommunication") &&
                    "text-red-500 line-through"
                  }`}
                >
                  {obj.lastCommunication || "-"}
                </p>
                {hasKey(obj.dataToUpdate, "lastCommunication") && (
                  <p className="text-blue-600">
                    {obj.dataToUpdate.lastCommunication}
                  </p>
                )}
              </td>
              <td className="px-6  py-2 whitespace-nowrap overflow-hidden hover:overflow-visible">
                <p
                  className={`${
                    hasKey(obj.dataToUpdate, "remarks") &&
                    "text-red-500 line-through"
                  }`}
                >
                  <div
                    data-tip={`${obj.remarks}`}
                    className={`${toolTipClass}`}
                  >
                    <p>{`${obj.remarks.slice(0, 10)}...`}</p>
                  </div>
                </p>
                {hasKey(obj.dataToUpdate, "remarks") && (
                  <div
                    data-tip={`${obj.dataToUpdate.remarks}`}
                    className={`text-blue-600 ${toolTipClass}`}
                  >
                    <p>{`${obj.dataToUpdate.remarks.slice(0, 10)}...`}</p>
                  </div>
                )}
              </td>
              {role === "executive" && (
                <td className="px-6 py-2 whitespace-nowrap ">
                  {obj?.editStatus ? (
                    <p
                      style={{ display: "flex", alignItems: "center" }}
                      className={color(obj.editStatus)}
                    >
                      {obj.editStatus === "rejected" &&
                        user?.role === "executive" && (
                          <EditExeData
                            id={obj._id}
                            showForm={showForm}
                            dri_id={obj.dri_id}
                          />
                        )}{" "}
                      <span className="ml-2">{obj.editStatus}</span>
                    </p>
                  ) : (
                    <p>No changes</p>
                  )}
                </td>
              )}
              {role === "popup" && (
                <td className="px-6 py-2 flex gap-2 whitespace-nowrap ">
                  <p className={color(obj.editStatus)}>{obj.editStatus}</p>
                  {role === "popup" && obj.editStatus === "approved" && (
                    <button
                      onClick={() => handleEditable(obj._id)}
                      data-tip={`Editable`}
                      className={`${toolTipClass}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  )}
                </td>
              )}
              {role === "verifier" && (
                <td className="px-6  py-2 flex justify-center flex-col">
                  <button
                    onClick={() => handleApprove(obj._id, obj.dri_id)}
                    className="block mb-1   text-green-400 dark:text-green-500 hover:underline"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(obj._id, obj.dri_id)}
                    className="block   text-red-400 dark:text-red-500 hover:underline"
                  >
                    Reject
                  </button>
                </td>
              )}
            </tr>
          );
        })}
    </tbody>
  );
};

export default TableContentWithChange;
