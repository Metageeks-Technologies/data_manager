import React, { useEffect, useState } from "react";
import {
  IP,
  Loader,
  PaginationAndExport,
  SearchContainer,
  TableContent,
  TableHeaders,
  
} from "../../components";
import { useAppContext } from "../../context/appContext";
import TimeLine from "./TimeLine";
function Items({ currentItems,form,fun }) {
  return (
    <>
      <PaginationAndExport form={form} fun={fun}/>
      <div className="custom-scrollbar  h-fit relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full  text-sm text-center ">
          <TableHeaders role={"admin"} dataType={"accepted"} />
          <TableContent
            data={currentItems}
            role={"admin"}
            dataType={"accepted"}
          />
        </table>
      </div>
    </>
  );
}

const Data = () => {
  const {
    getAllData,
    isSearched,
    toggleAction,
    mainData,
    isLoading,
    openSearchBar,
    page,
    setPage,
    isSearchedHandler,
    user,
    showTable
  } = useAppContext();
  const [form, setForm] = useState({
    status: "All",
    place: "All",
    dri_id: "",
    date: "All",
    customerName: "",
    appNumber: "",
    company: "All",
    membership_type: "All",
    acceptance: "accepted",
    amc:"All"
  });
  useEffect(()=>{
    return()=>{
      setPage(1);
      isSearchedHandler(false);
    }
  },[]);
  useEffect(() => {
    if(user)  getAllData({ acceptance: "accepted", page: page });
   
    
  }, [toggleAction]);

  return (
    <>
      {" "}
      <IP/>
      {openSearchBar && (
        <div className="relative top-0 z-10 w-full  bg-[#F0F4F8] shadow ">
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <SearchContainer form={form} role={"admin"} setForm={setForm} />
          </div>
        </div>
      )}
      {showTable ?(
         <div
        style={{ height: "calc(100vh - 5.5rem)" }}
        className="bg-[#f0f4f8]  py-5 px-[3rem] border-t border-gray-300"
      >
        {mainData.length === 0 && isLoading ? (
        <div
          style={{ height: "calc(100vh - 7.5rem)" }}
          className="w-full flex justify-center  items-center"
        >
          <Loader></Loader>
        </div>
      ):(
        <Items currentItems={mainData} form={form}  fun={getAllData}/>
      )}
      </div>
      ):(
      <TimeLine/>
      )}
      
      
    </>
  );
};

export default Data;
