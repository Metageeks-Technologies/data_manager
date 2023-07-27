import React from 'react'
import { useAppContext } from '../context/appContext';
import { toolTipClass } from '../utils/tooltip';

const TableContentWithChange = ({data,role,handleApprove,handleReject}) => {
    const {mainData}=useAppContext();
    function hasKey(obj, key) {
        return obj && Object.prototype.hasOwnProperty.call(obj, key);
      }

      const color = (cl) => {
        if(cl==="unchanged") return;
        if (cl == "pending") return "text-yellow-500";
        else if (cl == "rejected") return "text-red-500";
        else return "text-green-500";
      }; 
  return (
    <tbody>
    {(data.length >0) && data.map((obj) => {
      const yearsCountTillNow =
        new Date().getFullYear() -
        parseInt(obj.date .split("-")[0]);

      const afterFeesDeduction__99based = Math.round(
        obj.deposit  - (obj.deposit  / 99) * yearsCountTillNow 
      );
      const afterFeesDeduction__33based = Math.round(
        obj.deposit  - (obj.deposit  / 33) * yearsCountTillNow 
      );
      return (
        <tr
          key={obj._id }
          className="bg-white border-b dark:bg-gray-100 "
        >
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
                hasKey(obj.dataToUpdate,"place") &&
                "text-red-500 line-through"
              }`}
            >
              {" "}
              {obj.place }
            </p>
            {hasKey(obj.dataToUpdate,"place") && (
              <p className="text-blue-600">{obj.dataToUpdate.place}</p>
            )}
          </td>{" "}
          <td className="px-6 py-2  ">{obj.appNumber}</td>
          {/* <td
            scope="row"
            className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
          >
            <p
              className={`${
                obj.company.length > 1 &&
                "text-red-500 line-through"
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
                hasKey(obj.dataToUpdate,"membership_type") &&
                "text-red-500 line-through"
              }`}
            >
              {" "}
              {obj.membership_type }
            </p>
            { hasKey(obj.dataToUpdate,"membership_type") && (
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
                hasKey(obj.dataToUpdate,"date") && "text-red-500 line-through"
              }`}
            >
              {" "}
              {obj.date }
            </p>
            {hasKey(obj.dataToUpdate,"date") && (
              <p className="text-blue-600">{obj.dataToUpdate.date}</p>
            )}
          </td>{" "}
          <td
            scope="row"
            className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
          >
            <p
              className={`${
                hasKey(obj.dataToUpdate,"amc") && "text-red-500 line-through"
              }`}
            >
              {" "}
              {obj.amc }
            </p>
            {hasKey(obj.dataToUpdate,"amc") && (
              <p className="text-blue-600">{obj.dataToUpdate.amc}</p>
            )}
          </td>{" "}
          <td
            scope="row"
            className="px-6  py-2   text-gray-900 text-left whitespace-nowrap dark:text-black"
          >
            <p
              className={`${
                hasKey(obj.dataToUpdate,"customerName") &&
                "text-red-500 line-through"
              }`}
            >
              {" "}
              {obj.customerName }
            </p>
            {hasKey(obj.dataToUpdate,"customerName") && (
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
                hasKey(obj.dataToUpdate,"address") &&
                "text-red-500 line-through"
              }`}
            >
              <div
              data-tip={`${obj.address }`}
              className={`${toolTipClass}`}
              >
              <p>{`${obj.address.slice(0,20)}...`}</p>
            </div>
            </p>
            {hasKey(obj.dataToUpdate,"address") && (
              
              <div
              data-tip={`${obj.dataToUpdate.address}`}
              className={`text-blue-600 ${toolTipClass}`}
              >
              <p>{`${obj.dataToUpdate.address.slice(0,20)}...`}</p>
            </div>
            )}
          </td>
          <td
            scope="row"
            className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
          >
            <p
              className={`${
                hasKey(obj.dataToUpdate,"residentialPhone") &&
                "text-red-500 line-through"
              }`}
            >
              {" "}
              {obj.residentialPhone }
            </p>
            {hasKey(obj.dataToUpdate,"residentialPhone") && (
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
                hasKey(obj.dataToUpdate,"officePhone") &&
                "text-red-500 line-through"
              }`}
            >
              {" "}
              {obj.officePhone }
            </p>
            {hasKey(obj.dataToUpdate,"officePhone") && (
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
                "text-red-500 line-through"
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
                obj.GSV.length > 1 && "text-red-500 line-through"
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
                hasKey(obj.dataToUpdate,"CSV") && "line-through"
              }`}
            >
              {obj.CSV }
            </p>
            {hasKey(obj.dataToUpdate,"CSV") && (
              <p className="text-blue-600">{obj.dataToUpdate.CSV}</p>
            )}
          </td>
          <td className="px-6  py-2">
            <p
              className={`${
                hasKey(obj.dataToUpdate,"deposit") && "line-through"
              }`}
            >
              {obj.deposit }
            </p>
            {hasKey(obj.dataToUpdate,"deposit") && (
              <p className="text-blue-600">{obj.dataToUpdate.deposit}</p>
            )}
          </td>
          <td className="px-6  py-2 text-center">
            <p
              className={`${
                hasKey(obj.dataToUpdate,"status") && "line-through"
              }`}
            >
              {obj.status }
            </p>
            {hasKey(obj.dataToUpdate,"status") && (
              <p className="text-blue-600">{obj.dataToUpdate.status}</p>
            )}
          </td>
          <td className="px-6  py-2 text-center">
            0
            {/* <p
              className={`${
                (obj.GSV.length > 1 || obj.deposit.length > 1) &&
                "line-through"
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
          <td className="px-6 py-2 text-center">{yearsCountTillNow || "-"}</td>
          <td className="px-6 py-2 text-center">{afterFeesDeduction__99based || "-"}</td>
                  <td className="px-6 py-2 text-center">{afterFeesDeduction__33based || "-"}</td>
          <td className="px-6 py-4">
            <p
              className={`${
                hasKey(obj.dataToUpdate,"lastCommunication") && "line-through"
              }`}
            >
              {obj.lastCommunication }
            </p>
            {hasKey(obj.dataToUpdate,"lastCommunication") && (
              <p className="text-blue-600">{obj.dataToUpdate.lastCommunication}</p>
            )}
          </td>
          <td className="px-6  py-2 whitespace-nowrap overflow-hidden hover:overflow-visible">
            <p
              className={`${
                hasKey(obj.dataToUpdate,"remarks")  && "line-through"
              }`}
            >
                  <div
              data-tip={`${obj.remarks }`}
              className={`${toolTipClass}`}
              >
              <p>{`${obj.remarks.slice(0,10)}...`}</p>
            </div>
            </p>
            {hasKey(obj.dataToUpdate,"remarks")  && (
               <div
               data-tip={`${obj.dataToUpdate.remarks}`}
               className={`text-blue-600 ${toolTipClass}`}
               >
               <p>{`${obj.dataToUpdate.remarks.slice(0,10)}...`}</p>
             </div>
            )}
          </td>
          {role==='executive' && (
            <td className="px-6 py-4 ">
            {obj?.editStatus  ? (
              <p className={color(obj.editStatus )}>
                {obj.editStatus }
              </p>
            ) : (
              <p>No changes</p>
            )}
          </td>
          )}
          {
            role==='verifier' && (
              <td className="px-6  py-2 flex justify-center flex-col">
                          <button
                            onClick={()=>handleApprove(obj._id,obj.dri_id)}
                            className="block mb-1   text-green-400 dark:text-green-500 hover:underline"
                          >
                            Approve
                          </button>
                          <button
                            onClick={()=>handleReject(obj._id,obj.dri_id)}
                            className="block   text-red-400 dark:text-red-500 hover:underline"
                          >
                            Reject
                          </button>
                        </td>
            )
          }
        </tr>
      );
    })}
  </tbody>
  )
}

export default TableContentWithChange
