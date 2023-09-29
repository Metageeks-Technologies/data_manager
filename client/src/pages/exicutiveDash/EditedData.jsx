import React, { useEffect, useState, useRef } from "react";
import {
  Loader,
  EditForm,
  SearchContainer,
  PaginationAndExport,
  TableHeaders,
  TableContent,
} from "../../components";
import { useAppContext } from "../../context/appContext";

function Items({ currentItems, showForm, form, fun }) {
  return (
    <>
      <PaginationAndExport form={form} fun={fun} />
      <div className="custom-scrollbar  h-fit relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full  text-sm text-center ">
          <TableHeaders role={"executive"} dataType={"accepted"} />
          <TableContent
            data={currentItems}
            role={"executive"}
            dataType={"accepted"}
            showForm={showForm}
          />
        </table>
      </div>
    </>
  );
}

const EData = () => {
  const {
    getAllEditRequest,
    toggleAction,
    mainData,
    isLoading,
    editRequestData,
    getAllData,
    openSearchBar,
    lastFilterQuery,
    exportData,
    isSearched,
    setDriId,
    page,
    setPage,
    getAllVarData,

    isSearchedHandler,
  } = useAppContext();

  const [form, setForm] = useState({
    status: "All",
    place: "All",
    dri_id: "",
    date: "All",
    customerName: "",
    appNumber: "",
    amc: "All",
    company: "All",
    membership_type: "All",
    acceptance: "accepted",
    page: 1,
    editStatus: "unchanged",
  });
  useEffect(() => {
    return () => {
      setPage(1);
      isSearchedHandler(false);
    };
  }, []);
  useEffect(() => {
    getAllData({ acceptance: "accepted", editStatus: "unchanged", page: page });
  }, []);
  useEffect(() => {
    if (isSearched) {
      console.log("here is initial render");

      getAllData({ ...lastFilterQuery });
    }
  }, [toggleAction]);

  const [show, setShow] = useState(false);
  const [dataId, setDataId] = useState(null);

  const showForm = (id, dri_id) => {
    setShow(true);
    setDataId(id);
    setDriId(dri_id);
  };

  return (
    <>
      {show && <EditForm setShow={setShow} dataId={dataId} />}
      <div
        style={{ height: "calc(100vh - 5.5rem)" }}
        className="bg-[#f0f4f8]  py-5 px-[3rem] border-t border-l border-gray-300"
      >
        <div className="relative top-0 z-10 w-full  bg-[#F0F4F8] shadow ">
          {openSearchBar && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <SearchContainer
                role={"executive"}
                type={"data"}
                form={form}
                setForm={setForm}
              />
            </div>
          )}
        </div>
        {mainData.length === 0 && isLoading ? (
          <div
            style={{ height: "calc(100vh - 7.5rem)" }}
            className="w-full flex justify-center items-center"
          >
            <Loader></Loader>
          </div>
        ) : (
          <>
            <Items
              currentItems={mainData}
              form={form}
              fun={getAllData}
              showForm={showForm}
            />
          </>
        )}
      </div>
    </>
  );
};

export default EData;
