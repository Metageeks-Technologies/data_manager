import { useState } from "react";
import { useAppContext } from "../context/appContext";
import Multiselect from "multiselect-react-dropdown";
import { editStatusOption, yearsOption } from "../utils/options";
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
    memberStatusOptions,
    amcStatusOptions,
    isDuplicate,
    setDuplicate,
  } = useAppContext();
  const [exporting, setExporting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    isSearchedHandler(true);
    searchBar(false);

    console.log("form",form);

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
      const { name, value, type, checked } = event.target;
      console.log(name,value,type,checked);
      setForm((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
      console.log(form);
  };
  const transformedPlace = ["All",...placeOptions].map(item => ({
    key: item,
    value: item
  }));
  const transformedMembership = ["All",...memberOptions].map(item => ({
    key: item,
    value: item
  }));
  const transformedYearOptions=["All",...yearsOption].map(item => ({
    key: item,
    value: item
  }));
  const transformedStatusOptions=["All",...statusOptions].map(item => ({
    key: item,
    value: item
  }));
  const transformedAmcOptions=["All",...amcOptions].map(item => ({
    key: item,
    value: item
  }));
  const transformedAmcLetterStatusOptions=["All",...amcStatusOptions].map(item => ({
    key: item,
    value: item
  }));
  const transformedMemberStatusOptions=["All",...memberStatusOptions].map(item => ({
    key: item,
    value: item
  }));

  

  const handleSelect = (field, selectedList) => {
    const selectedValues = selectedList.map((item) => item.key);
    setForm((prevForm) => ({
      ...prevForm,
      [field]: selectedValues,
    }));
    console.log(form);
  };

  const handleRemove = (field, selectedList) => {
    const selectedValues = selectedList.map((item) => item.key);
    setForm((prevForm) => ({
      ...prevForm,
      [field]: selectedValues,
    }));
    console.log(form);
  };

  console.log("form",form);

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
          <div className="flex flex-col mb-4 flex-1 w-[22%]">
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
          <div className="flex flex-col mb-4 flex-1 w-[22%]">
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
          <div className="flex flex-col mb-4 flex-1 w-[22%]">
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
          <div className="flex flex-col mb-4 flex-1 w-[22%]">
            <label htmlFor="status" className="text-xs">
              STATUS:
            </label>
            <Multiselect
              id="status"
              displayValue="key"
              name="status"
              onKeyPressFn={function noRefCheck(){}}
              onRemove={(selectedList) => handleRemove('status', selectedList)}
              onSelect={(selectedList) => handleSelect('status', selectedList)}
              selectedValues={transformedStatusOptions.filter(option => form.status.includes(option.key))}
              onSearch={function noRefCheck(){}}
              options={transformedStatusOptions}
              showCheckbox
              placeholder="search"
          />
          </div>
          {/* place */}
          <div className="flex flex-col mb-4 flex-1 w-[22%]">
            <label htmlFor="place" className="text-xs">
              PLACE:
            </label>
            <Multiselect
            id="place"
            displayValue="key"
            name="place"
            onKeyPressFn={function noRefCheck(){}}
            onRemove={(selectedList) => handleRemove('place', selectedList)}
            onSelect={(selectedList) => handleSelect('place', selectedList)}
            onSearch={function noRefCheck(){}}
            selectedValues={transformedPlace.filter(option => form.place.includes(option.key))}
            options={transformedPlace}
            showCheckbox
            placeholder="search"
          />
          </div>
          {/* member Type */}
          <div className="flex flex-col uppercase w-[22%] mb-4 flex-1">
            <label htmlFor="place" className="text-xs">
              Member Type:
            </label>
            <Multiselect
              displayValue="key"
              id="membership_type"
              name="membership_type"
              onKeyPressFn={function noRefCheck(){}}
              onRemove={(selectedList) => handleRemove('membership_type', selectedList)}
              onSelect={(selectedList) => handleSelect('membership_type', selectedList)}
              onSearch={function noRefCheck(){}}
              selectedValues={transformedMembership.filter(option => form.membership_type.includes(option.key))}
              options={transformedMembership}
              showCheckbox
              placeholder="search"
          />
          </div>

          {/* company */}
          {/* <div className="flex flex-col mb-4 flex-1 w-[22%]">
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
          <div className="text-bold flex flex-col mb-4 flex-1 w-[22%]">
            <label htmlFor="date" className="text-xs whitespace-nowrap">
              YEAR OF PURCHASE
            </label>
            <Multiselect
              id="date"
              displayValue="key"
              name="date"
              onKeyPressFn={function noRefCheck(){}}
              onRemove={(selectedList) => handleRemove('date', selectedList)}
              onSelect={(selectedList) => handleSelect('date', selectedList)}
              onSearch={function noRefCheck(){}}
              selectedValues={transformedYearOptions.filter(option => form.date.includes(option.key))}
              options={transformedYearOptions}
              showCheckbox
              placeholder="search"
          />
          </div>
          <div className="flex flex-col w-[22%] mb-4">
            <label htmlFor="lastCommunication" className="text-xs">
              Amc
            </label>
            <Multiselect
              id="amc"
              displayValue="key"
              name="amc"
              onKeyPressFn={function noRefCheck(){}}
              onRemove={(selectedList) => handleRemove('amc', selectedList)}
              onSelect={(selectedList) => handleSelect('amc', selectedList)}
              onSearch={function noRefCheck(){}}
              selectedValues={transformedAmcOptions.filter(option => form.amc.includes(option.key))}
              options={transformedAmcOptions}
              showCheckbox
              placeholder="search"
          />
            {/* <select
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
            </select> */}
          </div>
          {/* Amc Letter Status */}
          <div className="flex flex-col w-[22%] uppercase mb-4 flex-1">
            <label htmlFor="place" className="text-xs whitespace-nowrap">
              Amc Letter Status:
            </label>
            <Multiselect
              id="amcLetterStatus"
              displayValue="key"
              name="amcLetterStatus"
              onKeyPressFn={function noRefCheck(){}}
              onRemove={(selectedList) => handleRemove('amcLetterStatus', selectedList)}
              onSelect={(selectedList) => handleSelect('amcLetterStatus', selectedList)}
              onSearch={function noRefCheck(){}}
              selectedValues={transformedAmcLetterStatusOptions.filter(option => form.amcLetterStatus.includes(option.key))}
              options={transformedAmcLetterStatusOptions}
              showCheckbox
              placeholder="search"
          />
            {/* <select
              id="amcLetterStatus"
              name="amcLetterStatus"
              value={form.amcLetterStatus}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", ...amcStatusOptions].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select> */}
          </div>
          {/* Agreement Status */}
          <div className="flex flex-col w-[22%] uppercase mb-4 flex-1">
            <label htmlFor="place" className="text-xs whitespace-nowrap">
              Agreement Status:
            </label>
            <Multiselect
              id="membershipStatus"
              displayValue="key"
              name="membershipStatus"
              onKeyPressFn={function noRefCheck(){}}
              onRemove={(selectedList) => handleRemove('membershipStatus', selectedList)}
              onSelect={(selectedList) => handleSelect('membershipStatus', selectedList)}
              onSearch={function noRefCheck(){}}
              selectedValues={transformedMemberStatusOptions.filter(option => form.membershipStatus.includes(option.key))}
              options={transformedMemberStatusOptions}
              showCheckbox
              placeholder="search"
          />
            {/* <select
              id="membershipStatus"
              name="membershipStatus"
              value={form.membershipStatus}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 w-full capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", ...memberStatusOptions].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select> */}
          </div>
          {/* edit Status */}
          {role && role === "varData" && (
            <div className="flex flex-col w-[22%] mb-4 flex-1">
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
            <div className="flex flex-col mb-4 flex-1 w-[22%]">
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
            <div className="flex flex-col mb-4 flex-1 w-[22%]">
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

        <div className="flex  justify-between items-center mt-6 ">
          <button
            type="submit"
            className="w-3/12  bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          >
            Apply filters
          </button>
          <div>
            <label>
              <input
                name="isDuplicate"
                value={form.isDuplicate}
                checked={form.isDuplicate}
                onChange={handleInputChange}
                className="toggle-checkbox"
                type="checkbox"
              />
              Get Duplicate
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchContainer;
