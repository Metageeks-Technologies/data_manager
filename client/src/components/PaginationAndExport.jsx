import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import Loader from "./Loader";

function containsOnlyNumbers(inputString) {
  const regex = /^[0-9]+$/;
  return regex.test(inputString);
}

const PaginationAndExport = ({ form, fun, role }) => {
  const {
    page,
    numOfPages,
    setPageNumber,
    isSearched,
    lastFilterQuery,
    exportData,
    showAlert,
    setPage,
    setShowDeletePopup,
    setShowEditPopup,
    mainData,
    selectedData,
  } = useAppContext();
  const [customPage, setCustomPage] = useState("");
  const [exporting, setExporting] = useState(false);
  const handleExport = async () => {
    setExporting(true);

    await exportData(lastFilterQuery);
    setExporting(false);
  };
  const handleNext = () => {
    setPageNumber(true);
    console.log(form);
    fun({ ...form, page: page + 1 });
  };
  const handlePrev = () => {
    setPageNumber();
    fun({ ...form, page: page - 1 });
  };
  const handleCustom = () => {
    console.log(customPage);
    if (!containsOnlyNumbers(customPage)) {
      showAlert("warn", "Invalid Page");
      return;
    }
    const page = Number(customPage);
    if (page <= 0 || page > numOfPages) {
      showAlert("warn", "Given page is out of range");
      return;
    }
    setPage(page);
    fun({ ...form, page: page });
    setCustomPage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCustom();
    }
  };

  return (
    <div className="flex justify-between items-center gap-[4rem] ">
      <div className="flex justify-center  items-center">
        <button
          disabled={!numOfPages || page === 1}
          onClick={handlePrev}
          className={`mb-2 rounded py-2 px-2 text-white mr-3 ${
            page === 1 || numOfPages === 0
              ? "opacity-50 bg-gray-800"
              : "bg-[#3b82f6]"
          }`}
        >
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
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          disabled={!numOfPages || page === numOfPages}
          onClick={handleNext}
          className={` mb-2 rounded py-2 px-2 text-white ${
            page === numOfPages || numOfPages === 0
              ? "opacity-50 bg-gray-800"
              : "bg-[#3b82f6]"
          }`}
        >
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
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <div className="flex mb-2 ml-2 w-full px-2 justify-between items-center py-1 border-2 bg-white border-blue-100 rounded-md">
          <input
            className="border-none w-[6.5rem] focus:border-none  rounded-sm bg-white py-1 px-1 placeholder-[#b8c5d7] appearance-none focus:outline-none"
            type="text"
            name=""
            placeholder="Enter page"
            value={customPage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setCustomPage(e.target.value)}
          />
          <button onClick={handleCustom}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#b8c5d7"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        {role === "admin" && mainData.length > 0 && selectedData.length > 0 ? (
          <button
            onClick={() => setShowDeletePopup(true)}
            className=" text-white bg-red-500 whitespace-nowrap font-medium rounded-md text-sm w-full block px-3 mb-2 ml-2 py-2.5 text-center"
          >
            {"Delete Selected"}
          </button>
        ) : null}
        {role === "admin" &&
        lastFilterQuery?.editStatus === "approved" &&
        mainData.length > 0 &&
        selectedData.length > 0 ? (
          <button
            onClick={() => setShowEditPopup(true)}
            className=" text-white bg-blue-500 whitespace-nowrap font-medium rounded-md text-sm w-full block px-3 mb-2 ml-2 py-2.5 text-center"
          >
            {"Edit Selection"}
          </button>
        ) : null}
      </div>
      <p>
        {numOfPages
          ? `${page} of Total ${numOfPages} pages`
          : `No data found with applied filter`}{" "}
      </p>
      {isSearched && numOfPages ? (
        <button
          className="bg-[#3b82f6] mb-2 rounded py-2 px-5 text-white"
          onClick={handleExport}
          type="button"
        >
          {exporting ? "Exporting..." : "Export"}
        </button>
      ) : null}
    </div>
  );
};

export default PaginationAndExport;
