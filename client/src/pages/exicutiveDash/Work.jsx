import React, { useEffect, useState } from "react";
import { Loader,SearchContainer, TableHeaders ,PaginationAndExport, TableContentWithChange} from "../../components";
import { useAppContext } from "../../context/appContext";
import { toolTipClass } from "../../utils/tooltip";
import MainData from "../../../../server/models/MainData";


const Work = () => {
    const {
        editRequestData,
        varData,
        getAllVarData,
        isLoading,
        toggleAction,
        openSearchBar,
        setPage,
        isSearchedHandler,
        page,
        getAllEditRequest,
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
        editStatus:"!unchanged",
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
        getAllVarData({acceptance:"accepted", editStatus: "!unchanged", page:page}); 
      }, [toggleAction]);


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
  const color = (cl) => {
    if(cl==="unchanged") return;
    if (cl == "pending") return "text-yellow-500";
    else if (cl == "rejected") return "text-red-500";
    else return "text-green-500";
  };

  return (
    <>
    <div 
      style={{ height: "calc(100vh - 5.5rem)" }}
      className="bg-[#f0f4f8]  py-5 px-[3rem] border-t border-l border-gray-300">
        <div className="sticky top-0 z-10 w-full  bg-[#F0F4F8] shadow ">
          {openSearchBar && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <SearchContainer role={"VarEX"} form={form} setForm={setForm} />
            </div>
          )}
         
        </div>

        {varData.length === 0 && isLoading ? (
          <div style={{ height: "calc(100vh - 7.5rem)" }} className="w-full  flex justify-center items-center">
          <Loader></Loader>
        </div>
        
      ) : (
        <><PaginationAndExport form={form} fun={getAllVarData} />
        <div className="custom-scrollbar relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center">
              <TableHeaders action={true} dataType={"accepted"}/>
              <TableContentWithChange role={"executive"} data={varData} />
            </table>
        
        </div>
        </>
      )}
    </div>
  </>
  )
}

export default Work
