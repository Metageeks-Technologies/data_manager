import React, { useEffect, useState } from "react";
import {
  Loader,
  SearchContainer,
  TableHeaders,
  PaginationAndExport,
  TableContentWithChange,
} from "../../components";
import { useAppContext } from "../../context/appContext";
import { toolTipClass } from "../../utils/tooltip";

const Data = () => {
  const {
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
    isSearched,
    lastFilterQuery,
    makeActivity,
    getAllEditRequest,
  } = useAppContext();

  const [form, setForm] = useState({
    status: [],
    place: [],
    dri_id: "",
    date: [],
    customerName: "",
    amc: [],
    appNumber: "",
    company: "All",
    membership_type: [],
    acceptance: "accepted",
    editStatus: "pending",
    amcLetterStatus: [],
    membershipStatus: [],
    page: 1,
  });
  useEffect(() => {
    return () => {
      setPage(1);
      isSearchedHandler(false);
    };
  }, []);
  useEffect(() => {
    getAllVarData({
      acceptance: "accepted",
      editStatus: "pending",
      page: page,
    });
  }, []);
  useEffect(() => {
    if (isSearched) {
      console.log("here is initial render");

      getAllVarData({ ...lastFilterQuery });
    }
  }, [toggleAction]);

  const handleApprove = (dataId, driId) => {
    approveEditRequest(dataId);
    const obj = {
      userName: user.name,
      userRole: user.role,
      dataId: driId,
      actionType: "approved",
    };
    makeActivity(obj);
  };
  const handleReject = (dataId, driId) => {
    rejectEditRequest(dataId);
    const obj = {
      userName: user.name,
      userRole: user.role,
      dataId: driId,
      actionType: "rejected",
    };
    makeActivity(obj);
  };

  return (
    <>
      {isLoading && varData.length !== 0 && (
        <div className="z-10 fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div
        style={{ height: "calc(100vh - 5.5rem)" }}
        className="bg-[#f0f4f8] py-5 px-[3rem] border-t border-l border-gray-300"
      >
        <div className="sticky top-0 z-10 w-full  bg-[#F0F4F8] shadow ">
          {openSearchBar && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <SearchContainer
                role={"verifier"}
                form={form}
                setForm={setForm}
              />
            </div>
          )}
        </div>
        {varData.length === 0 && isLoading ? (
          <div
            style={{ height: "calc(100vh - 7.5rem)" }}
            className="w-full flex justify-center items-center"
          >
            <Loader></Loader>
          </div>
        ) : (
          <>
            <PaginationAndExport form={form} fun={getAllVarData} />
            <div className="custom-scrollbar relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-center">
                <TableHeaders role={"verifier"} dataType={"accepted"} />
                <TableContentWithChange
                  role={"verifier"}
                  data={varData}
                  handleApprove={handleApprove}
                  handleReject={handleReject}
                />
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Data;
