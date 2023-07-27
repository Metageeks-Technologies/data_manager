import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import TableContent from "./TableContent";
import TableHeaders from "./TableHeaders";
import TableContentWithChange from "./TableContentWithChange";

const AdminPop = ({ id }) => {
  const { getSingleData, setAdminPopup, singleData } = useAppContext();

  useEffect(() => {
    getSingleData(id);
  }, []);
  return (
    <div className="bg-white rounded-md shadow-md px-2 py-6 w-[95%]">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="">Activity Details</h1>
        <button onClick={() => setAdminPopup(false)}>
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
          <TableContentWithChange data={singleData ?[singleData]:[]} />
          {/* <TableContent data={singleData ?[singleData]:[]}
            
            role={"admin"}
            dataType={"accepted"}
          /> */}
        </table>
      </div>
    </div>
  );
};

export default AdminPop;
