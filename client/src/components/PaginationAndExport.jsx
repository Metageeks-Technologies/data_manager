import React ,{useState}from "react";
import { useAppContext } from "../context/appContext";

const PaginationAndExport = ({form,fun}) => {
  const {
    page,
    numOfPages,
    setPageNumber,
    isSearched,
    lastFilterQuery,
    exportData,
  } = useAppContext();
  const [exporting, setExporting] = useState(false);
  const handleExport = async () => {
    setExporting(true);

    await exportData(lastFilterQuery);
    setExporting(false);
  };
  const handleNext=()=>{
    setPageNumber(true);
    console.log(form);
    fun({...form,page:page+1});

  }
  const handlePrev=()=>{
    setPageNumber();
    fun({...form,page:page-1})
  }

  return (
    <div className="flex justify-between items-center gap-[4rem] ">
      <div >
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
