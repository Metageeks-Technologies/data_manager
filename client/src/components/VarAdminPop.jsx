import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import TableHeaders from "./TableHeaders";
import TableContentWithChange from "./TableContentWithChange";

const VarAdminPop = ({ id,data,Role }) => {
  const { getSingleData, setVarAdminPopup, singleData } = useAppContext();
  console.log(Role);

  useEffect(() => {
    getSingleData(id);
  }, []);
  return (
    <div className="bg-white rounded-md shadow-md px-8 py-6 w-[97%]">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="">Activity Detail: Verifier  <span className={`${singleData?.editStatus==="approved"?"text-green-500":"text-red-500"}`}>
          
        {singleData?.editStatus}
          </span> This Data </h1>
        <button onClick={() => setVarAdminPopup(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="custom-scrollbar  h-fit relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full  text-sm text-center ">
          <TableHeaders role={"popup"} dataType={"accepted"} />
          <TableContentWithChange role={"popup"} data={singleData ?[singleData]:[]} />
           
        </table>
      </div>
    </div>
  );
};

export default VarAdminPop;
