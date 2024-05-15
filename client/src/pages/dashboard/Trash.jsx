import React, { useEffect, useState } from "react";
import {
  Loader,
  PaginationAndExport,
  SearchContainer,
  TableContent,
  TableHeaders,
} from "../../components";
import { useAppContext } from "../../context/appContext";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
function Items({ currentItems, form, fun }) {
  return (
    <>
      <PaginationAndExport form={form} fun={fun} />
      <div className="custom-scrollbar  h-fit relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full  text-sm text-center ">
          <TableHeaders role={"admin"} dataType={"deleted"} />
          <TableContent
            data={currentItems}
            role={"admin"}
            dataType={"deleted"}
          />
        </table>
      </div>
    </>
  );
}

const Trash = () => {
  const {
    getAllDeletedData,
    toggleAction,
    deletedData,
    isLoading,
    openSearchBar,
    searchBar,
    isSearchedHandler,
    page,
    setPage,
  } = useAppContext();
  const [form, setForm] = useState({
    status: "All",
    place: "All",
    dri_id: "",
    date: "",
    customerName: "",
    editStatus: "All",
    appNumber: "",
    company: "All",
    membership_type: "All",
    acceptance: "deleted",
    amc: "All",
    amcLetterStatus: "All",
    membershipStatus: "All",
    // page:1
  });
  useEffect(() => {
    return () => {
      setPage(1);
      isSearchedHandler(false);
    };
  }, []);
  useEffect(() => {
    getAllDeletedData({ acceptance: "deleted", page: page });
  }, [toggleAction]);

  return (
    <>
      <div
        style={{ height: "calc(100vh - 5.5rem)" }}
        className="bg-[#f0f4f8]  py-5 px-[3rem] border-t border-l border-gray-300"
      >
        <div className="relative top-0 z-10 w-full  bg-[#F0F4F8] shadow ">
          {openSearchBar && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <SearchContainer form={form} setForm={setForm} />
            </div>
          )}
        </div>
        {deletedData.length === 0 && isLoading ? (
          <div
            style={{ height: "calc(100vh - 7.5rem)" }}
            className="w-full flex justify-center items-center"
          >
            <Loader></Loader>
          </div>
        ) : (
          <>
            <Items
              currentItems={deletedData}
              form={form}
              fun={getAllDeletedData}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Trash;
