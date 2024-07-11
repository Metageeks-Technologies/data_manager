import React, { useEffect, useState } from "react";
import {
  Loader,
  SearchContainer,
  TableHeaders,
  PaginationAndExport,
  TableContentWithChange,
  EditForm,
} from "../../components";
import { useAppContext } from "../../context/appContext";
import { toolTipClass } from "../../utils/tooltip";
import MainData from "../../../../server/models/MainData";

const Work = () => {
  const {
    varData,
    getAllVarData,
    isLoading,
    toggleAction,
    openSearchBar,
    setPage,
    isSearchedHandler,
    page,
    lastFilterQuery,
    isSearched,
    setDriId,
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
    editStatus: "!unchanged",
    page: 1,
    amcLetterStatus: [],
    membershipStatus: [],
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
      editStatus: "!unchanged",
      page: page,
    });
  }, []);
  useEffect(() => {
    if (isSearched) {
      console.log("here is initial render");

      getAllVarData({ ...lastFilterQuery });
    }
  }, [toggleAction]);

  const color = (cl) => {
    if (cl === "unchanged") return;
    if (cl == "pending") return "text-yellow-500";
    else if (cl == "rejected") return "text-red-500";
    else return "text-green-500";
  };
  const [show, setShow] = useState(false);
  const [dataId, setDataId] = useState(null);

  const showForm = (id, dri_id) => {
    setShow(true);
    setDataId(id);
    setDriId(dri_id);
  };

  return (
    <>
      {show && <EditForm setShow={setShow} dataId={dataId} varData={varData} />}
      <div
        style={{ height: "calc(100vh - 5.5rem)" }}
        className="bg-[#f0f4f8]  py-5 px-[3rem] border-t border-l border-gray-300"
      >
        <div className="sticky top-0 z-10 w-full  bg-[#F0F4F8] shadow ">
          {openSearchBar && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <SearchContainer
                role={"VarEX"}
                type={"work"}
                form={form}
                setForm={setForm}
              />
            </div>
          )}
        </div>

        {varData.length === 0 && isLoading ? (
          <div
            style={{ height: "calc(100vh - 7.5rem)" }}
            className="w-full  flex justify-center items-center"
          >
            <Loader></Loader>
          </div>
        ) : (
          <>
            <PaginationAndExport form={form} fun={getAllVarData} />
            <div className="custom-scrollbar relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-center">
                <TableHeaders action={true} dataType={"accepted"} />
                <TableContentWithChange
                  role={"executive"}
                  data={varData}
                  showForm={showForm}
                />
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Work;
