import React from 'react'
import DeleteAdminData from './DeleteAdminData';
import {toolTipClass} from "../utils/tooltip";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import EditExeData from './EditExeData';

dayjs.extend(localizedFormat);

const TableContent = ({data,role,dataType,showForm}) => {
  
  const color = (cl) => {
    if(cl==="unchanged") return;
    if (cl == "pending") return "text-yellow-500";
    else if (cl == "rejected") return "text-red-500";
    else return "text-green-500";
  };

  return (
    <tbody>
            {data && data.map((obj) => {
              const yearsCountTillNow =new Date().getFullYear() - parseInt(obj.date.split("-")[0]);    
              const afterFeesDeduction = Math.round(
                obj.deposit - (obj.deposit / 99) * yearsCountTillNow
              );
              return (
                <tr
                  key={obj._id}
                  className="bg-white border-b dark:bg-gray-100 "
                >
                  <td
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {obj.dri_id}
                  </td>

                  <td className="px-6 py-2">{obj.place}</td>
                  <td className="px-6 py-2  ">{obj.appNumber}</td>
                  <td className="px-6 py-2 text-center">
                    {obj.company || "-"}
                  </td>
                  <td className="px-6 py-2">{obj.membership_type || "-"}</td>
                  <td className="px-6 py-2">{obj.date || "-"}</td>
                  {/* <td className="px-6 py-2">{dayjs(obj.date,"YYYY-MM-DD").format("LL")}</td> */}
                  <td className="px-6 py-2">{obj.amc || "-"}</td>
                  <td  className="px-6 py-2 text-left whitespace-nowrap">{obj.customerName}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{obj.address || "-"}</td>
                  <td className="px-6 py-2">{obj.residentialPhone || "-"}</td>
                  <td className="px-6 py-2">{obj.officePhone || "-"}</td>
                  {/* <td className="px-6 py-2">{obj.profession || "-"}</td> */}
                  <td className="px-6 py-2">{obj.GSV}</td>
                  {/* <td className="px-6 py-2">{obj.CSV}</td> */}
                  <td className="px-6 py-2">{obj.deposit || "-"}</td>
                  <td className="px-6 py-2">{obj.status || "-"}</td>

                  <td className="px-6 py-2">{obj.GSV - obj.deposit}</td>
                  <td className="px-6 py-2">{yearsCountTillNow || "-"}</td>
                  <td className="px-6 py-2">{afterFeesDeduction || "-"}</td>
                  <td className="px-6 py-2">{"-"}</td>

                  {/* <td className="px-6 py-2">{obj.remarks || "-"}</td> */}
                  <td className="px-6 py-2 whitespace-nowrap ">
                    <div
                      data-tip={`${obj.remarks}`}
                      className={`${toolTipClass}`}
                      >
                      <p>{`${obj.remarks.slice(0,10)}...`}</p>
                    </div>
                  </td>
                  <td className="px-6 py-2">
                  {role==="admin"?(                   
                    <DeleteAdminData id={obj._id} isTrash={dataType==="deleted"} />                
                  ):(
                    <EditExeData id={obj._id} showForm={showForm} dri_id={obj.dri_id}  />
                  )
                  }
                   </td>
                   {role==="executive" && (
                     <td className="px-6 py-[1.1rem] capitalize"><p className={color(obj.editStatus)}>{obj.editStatus}</p></td>
                   )}
                </tr>
              );
            })}
          </tbody>
  )
}

export default TableContent
