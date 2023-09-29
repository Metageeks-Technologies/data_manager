import { useState } from "react";
import { useAppContext } from "../context/appContext";

import { editStatusOption, yearsOption } from "../utils/options";
import AutocompleteSearch from "./AutocompleteSearch";
const SearchContainer = ({ form, setForm, role }) => {
  const {
    handleFilterApplied,
    getAllData,
    getAllDeletedData,
    getAllVarData,
    setPage,
    isSearchedHandler,
    placeOptions,
    statusOptions,
    amcOptions,
    memberOptions,
    setShowTable,
    searchBar,
  } = useAppContext();
  const [exporting, setExporting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    isSearchedHandler(true);
    searchBar(false);

    // if (page === 1) return getAllData({ ...form });
    if (form.acceptance === "deleted") {
      getAllDeletedData({ ...form, page: 1 });
    } else if (role === "verifier") {
      getAllVarData({ ...form, page: 1 });
    } else if (role === "VarEX") {
      getAllVarData({ ...form, page: 1 });
    } else if (role === "varData") {
      getAllVarData({ ...form, page: 1 });
    }

    getAllData({ ...form, page: 1 });

    setPage(1);
    setShowTable(true);
    setForm((prevState) => ({
      ...prevState,
      dri_id: "",
      customerName: "",
      appNumber: "",
    }));

    if (
      form.status === "All" &&
      form.place === "All" &&
      form.membership_type === "All" &&
      form.date === "All" &&
      form.amc === "All"
    ) {
      handleFilterApplied(false);
    } else {
      handleFilterApplied(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(form);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-10/12 md:w-8/12 bg-gray-50 mx-auto rounded py-5 px-[5%]  shadow-md hover:shadow-lg transition duration-400 ease-in-out"
      >
        <div className="flex w-full items-center justify-between  mb-5">
          <h1 className="text-2xl ">Search </h1>
          <div className="flex items-center gap-4">
            <button onClick={() => searchBar(false)}>
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
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-evenly  flex-wrap gap-3">
          {/* DRI_ID */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="status" className="text-xs">
              DRI-ID:
            </label>
            <input
              id="dri_id"
              type="text"
              name="dri_id"
              value={form.dri_id}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* App NUMBER */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="status" className="text-xs">
              APP NUMBER:
            </label>
            <input
              id="appNumber"
              type="text"
              name="appNumber"
              value={form.appNumber}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="customerName" className="text-xs">
              CUSTOMER NAME:
            </label>

            <input
              id="customerName"
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* status */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="status" className="text-xs">
              STATUS:
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", ...statusOptions].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          {/* place */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="place" className="text-xs">
              PLACE:
            </label>
            <select
              id="place"
              name="place"
              value={form.place}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", ...placeOptions].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          {/* member Type */}
          <div className="flex flex-col uppercase mb-4 flex-1">
            <label htmlFor="place" className="text-xs">
              Member Type:
            </label>
            <select
              id="membership_type"
              name="membership_type"
              value={form.membership_type}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", ...memberOptions].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          {/* company */}
          {/* <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="company" className="text-xs">
            company:
            </label>
            <select
              id="company"
              name="company"
              value={form.company}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", ...companyOptions].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div> */}
          {/* Date */}
          <div className="text-bold flex flex-col mb-4 flex-1">
            <label htmlFor="date" className="text-xs">
              YEAR OF PURCHASE
            </label>
            <select
              size={1}
              id="date"
              name="date"
              value={form.date}
              onChange={handleInputChange}
              className="border  border-gray-400 py-1 px-3 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", ...yearsOption].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="lastCommunication" className="text-xs">
              Amc
            </label>
            <select
              size={1}
              id="amc"
              name="amc"
              value={form.amc}
              onChange={handleInputChange}
              className="border  border-gray-400 py-1 px-3 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", ...amcOptions].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          {/* edit Status */}
          {role && role === "varData" && (
            <div className="flex flex-col mb-4 flex-1">
              <label htmlFor="editStatus" className="text-xs">
                Action:
              </label>
              <select
                id="editStatus"
                name="editStatus"
                value={form.editStatus}
                onChange={handleInputChange}
                className="border border-gray-400 py-1 capitalize px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[
                  "Both",
                  ...editStatusOption.filter((d) => d != "pending"),
                ].map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {role && role === "VarEX" && (
            <div className="flex flex-col mb-4 flex-1">
              <label htmlFor="editStatus" className="text-xs">
                Action:
              </label>
              <select
                id="editStatus"
                name="editStatus"
                value={form.editStatus}
                onChange={handleInputChange}
                className="border border-gray-400 py-1 capitalize px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["all", ...editStatusOption].map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {role && role === "admin" && (
            <div className="flex flex-col mb-4 flex-1">
              <label htmlFor="editStatus" className="text-xs">
                Action:
              </label>
              <select
                id="editStatus"
                name="editStatus"
                value={form.editStatus}
                onChange={handleInputChange}
                className="border border-gray-400 py-1 capitalize px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["All", ...editStatusOption].map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-3/12 mt-6 mx-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
        >
          Apply filters
        </button>
      </form>
    </div>
  );
};

export default SearchContainer;
