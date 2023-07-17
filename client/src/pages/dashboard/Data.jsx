import React, { useEffect, useState } from "react";
// import  Pagination  from '../../pages/dashboard/pagination'
import { DeleteAdminData, Loader, SearchContainer, YearPicker } from "../../components";
import { useAppContext } from "../../context/appContext";
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import PaginationContainer from "../../components/PaginationContainer";
dayjs.extend(localizedFormat)
function Items({ currentItems }) {
  return (
    <div className="relative overflow-x-auto overflow-y-scroll h-screen shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left ">
        <thead className="text-xs sticky  top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              DRI-ID
            </th>
            <th scope="col" className="px-6 py-3">
              PLACE
            </th>
            <th scope="col" className="px-6 py-3">
              APP NO
            </th>
            <th scope="col" className="px-6 py-3">
             COMPANY
            </th>
            <th scope="col" className="px-6 py-3">
             MEMBERSHIP TYPE
            </th>
            <th scope="col" className="px-6 py-3">
              DATE OF PURCHASE
            </th>
            <th scope="col" className="px-6 py-3">
              AMC
            </th>
            <th scope="col" className="px-6 py-3">
              CUSTOMER NAME
            </th>
            <th scope="col" className="px-6 py-3">
              ADDRESS
            </th>
            <th scope="col" className="px-6 py-3">
              RES PHONE
            </th>
            <th scope="col" className="px-6 py-3">
              OFFICE PHONE            </th>
            <th scope="col" className="px-6 py-3">
              PROFESSION
            </th>
            <th scope="col" className="px-6 py-3">
              GSV
            </th>
            {/* <th scope="col" className="px-6 py-3">
              CSV
            </th> */}
            <th scope="col" className="px-6 py-3">
              DEPOSIT
            </th>
            <th scope="col" className="px-6 py-3">
              STATUS
            </th>
            <th scope="col" className="px-6 py-3">
              OUTSTANDING
            </th>
            <th scope="col" className="px-6 py-3">
              YEAR TILL NOW
            </th>
            <th scope="col" className="px-6 py-3">
              AFTER DEDUCTING LICENSE FEE
            </th>
            <th scope="col" className="px-6 py-3">
              REMARKS
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((obj) => {
            const yearsCountTillNow = new Date().getFullYear()-parseInt(obj.date.split("-")[0])
            const afterFeesDeduction = Math.round((obj.deposit-(obj.deposit/99)*yearsCountTillNow))
            return (
              <tr key={obj._id} className="bg-white border-b dark:bg-gray-100 ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                >
                 {obj.dri_id}
                </td>
                
                <td className="px-6 py-4">{obj.place}</td>
                <td className="px-6 py-4 !flex-nowrap ">{obj.appNumber}</td>
                <td className="px-6 py-4 text-center">{obj.company || "-"}</td>
                <td className="px-6 py-4">{obj.membership_type}</td>
                <td className="px-6 py-4">{obj.date}</td>
                {/* <td className="px-6 py-4">{dayjs(obj.date,"YYYY-MM-DD").format("LL")}</td> */}
                <td className="px-6 py-4">{obj.amc || "-"}</td>
                <td className="px-6 py-4">{obj.customerName}</td>
                <td className="px-6 py-4">{obj.address || "-"}</td>
                <td className="px-6 py-4">{obj.residentialPhone || "-"}</td>
                <td className="px-6 py-4">{obj.officePhone || "-"}</td>
                <td className="px-6 py-4">{obj.profession || "-"}</td>
                <td className="px-6 py-4">{obj.GSV}</td>
                {/* <td className="px-6 py-4">{obj.CSV}</td> */}
                <td className="px-6 py-4">{obj.deposit|| "-"}</td>
                <td className="px-6 py-4">{obj.status|| "-"}</td>

                <td className="px-6 py-4">{obj.CSV-obj.deposit }</td>
                <td className="px-6 py-4">{yearsCountTillNow}</td>
                <td className="px-6 py-4">{afterFeesDeduction}</td>
                <td className="px-6 py-4">{obj.remarks || "-"}</td>
                <td className="px-6 py-4">
                 <DeleteAdminData id={obj._id} isTrash={false}/> 
                </td>              
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const Data = () => {
  const { getAllData,editRequestData,toggleAction, mainData, isLoading,openSearchBar,searchBar,setPage,pageInfo,page,yearPicker } = useAppContext();
  const [form,setForm]=useState({
    status:"All",
    place:"All",
    dri_id:"",
    date:"",
    customerName:"",
    editStatus:"All",
    appNumber:"",
    company:"All",
    membership_type:"All",
    acceptance: "accepted"
  });
  useEffect(() => {
    getAllData(form);
  }, [toggleAction]);
  

  let DataToShow = JSON.parse(JSON.stringify(mainData));
  

  for (let i = 0; i < DataToShow.length; i++) {
    const data = DataToShow[i];

    const editData = editRequestData.find((ed) => ed.dataId === data._id);
    
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




    return (
    <>
      <div className="bg-[#f0f4f8] h-full  py-2 px-[3rem] border-t border-l border-gray-300">
        <div className="sticky top-0 z-10 w-full  bg-[#F0F4F8] shadow ">
        {openSearchBar && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <SearchContainer form={form} setForm={setForm}/>
          </div>
        )}
      {/* <PaginationContainer form={form}/> */}
        </div>
        {mainData.length===0 && isLoading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <Loader></Loader>
          </div>
        ) : (
          <>
          <Items currentItems={ mainData} />  
          </>
        )}
        {/* <Pagination {...pageInfo} /> */}
        {/* <Items currentItems={ mainData} />   */}
      </div>
    </>
  );
};

export default Data;
