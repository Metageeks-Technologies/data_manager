import React, { useEffect, useState } from "react";
import { Loader,SearchContainer, TableHeaders ,PaginationAndExport} from "../../components";
import { useAppContext } from "../../context/appContext";
import { toolTipClass } from "../../utils/tooltip";


const Data = () => {
  const {
    editRequestData,
    varData,
    getAllVarData,
    isLoading,
    approveEditRequest,
    rejectEditRequest,
    toggleAction,
    openSearchBar,
    setPage,
      isSearchedHandler,
    user,
    page,
    makeActivity,
    getAllEditRequest
  } = useAppContext();

  const [form, setForm] = useState({
    status: "All",
    place: "All",
    dri_id: "",
    date: "All",
    customerName: "",
    
    appNumber: "",
    company: 'All',
    membership_type: 'All',
    acceptance: 'accepted',
    editStatus:"pending",
    page:1
  });
  useEffect(()=>{
    return()=>{
      setPage(1);
      isSearchedHandler(false);
    }
  },[]);
  useEffect(() => {
    getAllEditRequest();
    getAllVarData({acceptance:"accepted", editStatus: "pending", page:page}); 
  }, [toggleAction]);
  const handleApprove=(dataId,driId)=>{
    approveEditRequest(dataId)
    const obj={
      userName:user.name,
      userRole:user.role,
      dataId:driId, 
      actionType:"approved"
    }
    makeActivity(obj);

  }
  const handleReject=(dataId,driId)=>{
    rejectEditRequest(dataId)
    const obj={
      userName:user.name,
      userRole:user.role,
      dataId:driId,
      actionType:"rejected"
    }
    makeActivity(obj);
  }


  let DataToShow = JSON.parse(JSON.stringify(varData));

  for (let i = 0; i < DataToShow.length; i++) {
    const data = DataToShow[i];

    const editData = editRequestData.find((ed) => ed.dataId === data._id);
    console.log(editData);
    data.editStatus = editData?.status;

    for (let key in data) {
      let lastValue = data[key];
      data[key] = [lastValue];

      if (editData) {
        if (
          editData.dataToUpdate?.hasOwnProperty(key) &&
          data[key].length <= 2 &&
          editData.status !== "approved"
        ) {
          data[key].push(editData.dataToUpdate[key]);
        }
      }
    }
  }

  console.log(DataToShow);
  return (
    <>
      {(isLoading && varData.length !== 0) && (
          <div className="z-10 fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <Loader />
          </div>
        )}
      <div  
      style={{ height: "calc(100vh - 5.5rem)" }}
      className="bg-[#f0f4f8] py-5 px-[3rem] border-t border-l border-gray-300">
       
      <div className="sticky top-0 z-10 w-full  bg-[#F0F4F8] shadow ">
          {openSearchBar && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <SearchContainer role={"verifier"} form={form} setForm={setForm} />
            </div>
          )}
         
        </div>
        { varData.length === 0 && isLoading ? (
           <div 
           style={{ height: "calc(100vh - 7.5rem)" }}
           className="w-full flex justify-center items-center">
           <Loader></Loader>
           </div>
          
        ) : (
          <><PaginationAndExport form={form} fun={getAllVarData} />
          <div className="custom-scrollbar relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-center">
                <TableHeaders role={"verifier"} dataType={"accepted"}/>
                <tbody>
                  {DataToShow.map((obj) => {
                    const yearsCountTillNow =
                      new Date().getFullYear() -
                      parseInt(obj.date[0].split("-")[0]);
                    const yearsCountTillNow2 =
                      obj.date[1] &&
                      new Date().getFullYear() -
                        parseInt(obj.date[1].split("-")[0]);

                    const afterFeesDeduction = Math.round(
                      obj.deposit[0] - (obj.deposit[0] / 99) * yearsCountTillNow 
                    );
                    const afterFeesDeduction2 =
                      (obj.deposit[1] || obj.date[1]) &&
                      Math.round(
                        (obj.deposit[1] || obj.deposit[0]) -
                          ((obj.deposit[1] || obj.deposit[0]) / 99) *
                            (yearsCountTillNow2 || yearsCountTillNow)
                      );
                    return (
                      <tr
                        key={obj._id[0]}
                        className="bg-white border-b dark:bg-gray-100 "
                      >
                        <td
                          scope="row"
                          className="px-6  py-2 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.dri_id.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.dri_id[0]}
                          </p>
                          {obj.dri_id[1] && (
                            <p className="text-blue-600">{obj.dri_id[1]}</p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.place.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.place[0]}
                          </p>
                          {obj.place[1] && (
                            <p className="text-blue-600">{obj.place[1]}</p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.appNumber.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.appNumber[0]}
                          </p>
                          {obj.appNumber[1] && (
                            <p className="text-blue-600">{obj.appNumber[1]}</p>
                          )}
                        </td>{" "}
                        <td
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
                            {obj.company[0] || "-"}
                          </p>
                          {obj.company[1] && (
                            <p className="text-blue-600">{obj.company[1]}</p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.membership_type.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.membership_type[0]}
                          </p>
                          {obj.membership_type[1] && (
                            <p className="text-blue-600">
                              {obj.membership_type[1]}
                            </p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.date.length > 1 && "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.date[0]}
                          </p>
                          {obj.date[1] && (
                            <p className="text-blue-600">{obj.date[1]}</p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.amc.length > 1 && "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.amc[0]}
                          </p>
                          {obj.amc[1] && (
                            <p className="text-blue-600">{obj.amc[1]}</p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6  py-2   text-gray-900 text-left whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.customerName.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.customerName[0]}
                          </p>
                          {obj.customerName[1] && (
                            <p className="text-blue-600">
                              {obj.customerName[1]}
                            </p>
                          )}
                        </td>
                        <td
                          scope="row"
                          className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.address.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.address[0]}
                          </p>
                          {obj.address[1] && (
                            <p className="text-blue-600">
                              {obj.address[1]}
                            </p>
                          )}
                        </td>
                        <td
                          scope="row"
                          className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.residentialPhone.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.residentialPhone[0]}
                          </p>
                          {obj.residentialPhone[1] && (
                            <p className="text-blue-600">
                              {obj.residentialPhone[1]}
                            </p>
                          )}
                        </td>
                        <td
                          scope="row"
                          className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.officePhone.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.officePhone[0]}
                          </p>
                          {obj.officePhone[1] && (
                            <p className="text-blue-600">
                              {obj.officePhone[1]}
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
                            {obj.profession[0]}
                          </p>
                          {obj.profession[1] && (
                            <p className="text-blue-600">
                              {obj.profession[1]}
                            </p>
                          )}
                        </td> */}
                        <td
                          scope="row"
                          className="px-6  py-2   text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.GSV.length > 1 && "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.GSV[0]}
                          </p>
                          {obj.GSV[1] && (
                            <p className="text-blue-600">{obj.GSV[1]}</p>
                          )}
                        </td>
                        {/* <td className="px-6  py-2">
                          <p
                            className={`${
                              obj.CSV.length > 1 && "line-through"
                            }`}
                          >
                            {obj.CSV[0]}
                          </p>
                          {obj.CSV[1] && (
                            <p className="text-blue-600">{obj.CSV[1]}</p>
                          )}
                        </td> */}
                        <td className="px-6  py-2">
                          <p
                            className={`${
                              obj.deposit.length > 1 && "line-through"
                            }`}
                          >
                            {obj.deposit[0]}
                          </p>
                          {obj.deposit[1] && (
                            <p className="text-blue-600">{obj.deposit[1]}</p>
                          )}
                        </td>
                        <td className="px-6  py-2 text-center">
                          <p
                            className={`${
                              obj.status.length > 1 && "line-through"
                            }`}
                          >
                            {obj.status[0]}
                          </p>
                          {obj.status[1] && (
                            <p className="text-blue-600">{obj.status[1]}</p>
                          )}
                        </td>
                        <td className="px-6  py-2 text-center">
                          {/* <p
                            className={`${
                              (obj.GSV.length > 1 || obj.deposit.length > 1) &&
                              "line-through"
                            }`}
                          >
                            {obj.CSV[0] - obj.deposit[0]}
                          </p> */}
                          {/* {(obj.GSV.length>1 || obj.deposit.length>1) && (
                            <p className="text-blue-600">
                              {(obj.CSV[1] || obj.CSV[0]) -
                                (obj.deposit[1] || obj.deposit[0])}
                            </p>
                          )} */}
                        </td>
                        <td className="px-6  py-2 text-center">
                          <p
                            className={`${
                              obj.date.length > 1 && "line-through"
                            }`}
                          >
                            {yearsCountTillNow}
                          </p>
                          {obj.date[1] && (
                            <p className="text-blue-600">
                              {yearsCountTillNow2}
                            </p>
                          )}
                        </td>
                        <td className="px-6  py-2 text-center">
                          <p
                            className={`${
                              afterFeesDeduction2 && "line-through"
                            }`}
                          >
                            {afterFeesDeduction}
                          </p>
                          {obj.afterFeesDeduction2 && (
                            <p className="text-blue-600">
                              {afterFeesDeduction2}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p
                            className={`${
                              obj.lastCommunication.length > 1 && "line-through"
                            }`}
                          >
                            {obj.lastCommunication[0]}
                          </p>
                          {obj.lastCommunication[1] && (
                            <p className="text-blue-600">{obj.lastCommunication[1]}</p>
                          )}
                        </td>
                        <td className="px-6  py-2 whitespace-nowrap">
                          <p
                            className={`${
                              obj.remarks.length > 1 && "line-through"
                            }`}
                          >
                                <div
                            data-tip={`${obj.remarks[0]}`}
                            className={`${toolTipClass}`}
                            >
                            <p>{`${obj.remarks[0].slice(0,10)}...`}</p>
                          </div>
                          </p>
                          {obj.remarks[1] && (
                             <div
                             data-tip={`${obj.remarks[1]}`}
                             className={`text-blue-600 ${toolTipClass}`}
                             >
                             <p>{`${obj.remarks[1].slice(0,10)}...`}</p>
                           </div>
                          )}
                        </td>
                        <td className="px-6  py-2 flex justify-center flex-col">
                          <button
                            onClick={()=>handleApprove(obj._id,obj.dri_id[0])}
                            className="block mb-1   text-green-400 dark:text-green-500 hover:underline"
                          >
                            Approve
                          </button>
                          <button
                            onClick={()=>handleReject(obj._id,obj.dri_id[0])}
                            className="block   text-red-400 dark:text-red-500 hover:underline"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          
          </div>
          </>
        )}
      </div>
    </>
  );
};

export default Data;
