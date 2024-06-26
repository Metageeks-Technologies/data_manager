import React from "react";
import DeleteAdminData from "./DeleteAdminData";
import { toolTipClass } from "../utils/tooltip";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import EditExeData from "./EditExeData";
import { useAppContext } from "../context/appContext";

dayjs.extend(localizedFormat);
// 0604A002255
const TableContent = ({ data, role, dataType, showForm }) => {
  const {
    makeEditable,
    page,
    selectedData,
    mainData,
    unselectData,
    selectData,
  } = useAppContext();
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
      {data &&
        data.map((obj, index) => {
          const yearsCountTillNow =
            new Date().getFullYear() - parseInt(obj?.date?.split("-")[0]);
          const afterFeesDeduction_99 = Math.round(
            obj?.deposit - (obj?.deposit / 99) * yearsCountTillNow
          );
          // ((M5-(M5/99)*P5))
          const afterFeesDeduction_33 = Math.round(
            obj?.deposit - (obj?.deposit / 33) * yearsCountTillNow
          );
          const serialNum = (page - 1) * 8 + (index + 1);
          return (
            <tr key={obj._id} className="bg-white border-b dark:bg-gray-100 ">
              {role === "admin" && (
                <th
                  scope="row"
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <input
                    id="row-checkbox"
                    type="checkbox"
                    value={obj._id.toString()}
                    checked={selectedData.some((el) => el._id === obj._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        selectData(obj);
                      } else {
                        unselectData(obj._id);
                      }
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </th>
              )}
              <td className="px-6 py-2">{serialNum}</td>
              <td
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-black"
              >
                {obj.dri_id}
              </td>

              <td className="px-6 py-2">{obj.place}</td>
              <td className="px-6 py-2  ">{obj.appNumber}</td>
              {/* <td className="px-6 py-2 text-center">
                    {obj.company || "-"}
                  </td> */}
              <td className="px-6 py-2">{obj.membership_type || "-"}</td>
              <td className="px-6 py-2">{obj.date || "-"}</td>
              {/* <td className="px-6 py-2">{dayjs(obj.date,"YYYY-MM-DD").format("LL")}</td> */}
              <td className="px-6 py-2">{obj.amc || "-"}</td>
              <td className="px-6 py-2 text-left whitespace-nowrap">
                {obj.customerName}
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div data-tip={`${obj.address}`} className={`${toolTipClass}`}>
                  <p>{`${obj.address.slice(0, 20)}...`}</p>
                </div>
                {/* {obj.address || "-"} */}
              </td>
              <td className="px-6 py-2">{obj.residentialPhone || "-"}</td>
              <td className="px-6 py-2">{obj.officePhone || "-"}</td>
              {/* <td className="px-6 py-2">{obj.profession || "-"}</td> */}
              {/* <td className="px-6 py-2">{obj.GSV}</td> */}
              <td className="px-6 py-2">{obj.CSV}</td>
              <td className="px-6 py-2">{obj.deposit || "-"}</td>
              <td className="px-6 py-2">{obj.status || "-"}</td>

              <td className="px-6 py-2">{obj.CSV - obj.deposit}</td>
              <td className="px-6 py-2">{yearsCountTillNow || "-"}</td>
              <td className="px-6 py-2">{obj.amcLetterStatus || "-"}</td>
              <td className="px-6 py-2">{obj.membershipStatus || "-"}</td>
              <td className="px-6 py-2">
                {obj.afterFeesDeduction99based || "-"}
              </td>
              <td className="px-6 py-2">
                {obj.afterFeesDeduction33based || "-"}
              </td>
              <td className="px-6 py-2">{obj.lastCommunication || "-"}</td>

              {/* <td className="px-6 py-2">{obj.remarks || "-"}</td> */}
              <td className="px-6 py-2 whitespace-nowrap ">
                <div data-tip={`${obj.remarks}`} className={`${toolTipClass}`}>
                  <p>{`${obj.remarks.slice(0, 10)}...`}</p>
                </div>
              </td>
              {/* <td className="px-6 py-2">
                {role === "admin" ? (
                  <DeleteAdminData
                    id={obj._id}
                    isTrash={dataType === "deleted"}
                  />
                ) : (
                  <EditExeData
                    id={obj._id}
                    showForm={showForm}
                    dri_id={obj.dri_id}
                  />
                )}
              </td> */}
              {role === "admin" ? (
                <>
                  {dataType === "deleted" && (
                    <td className="px-6 py-2">
                      <DeleteAdminData
                        id={obj._id}
                        isTrash={dataType === "deleted"}
                      />
                    </td>
                  )}
                </>
              ) : (
                <td className="px-6 py-2">
                  <EditExeData
                    id={obj._id}
                    showForm={showForm}
                    dri_id={obj.dri_id}
                  />
                </td>
              )}
              {(role === "executive" || role === "admin") && (
                <td className="px-6 py-[1.1rem] capitalize flex gap-2">
                  <p className={color(obj.editStatus)}>{obj.editStatus}</p>
                  {/* {role === "admin" && obj.editStatus === "approved" && (
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
                  )} */}
                </td>
              )}
            </tr>
          );
        })}
    </tbody>
  );
};

export default TableContent;
