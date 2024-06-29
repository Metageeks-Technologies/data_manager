import { useState } from "react";
import { useAppContext } from "../context/appContext";

import { yearsOption } from "../utils/options";

function EditForm({ setShow, dataId, varData }) {
  const {
    mainData,
    placeOptions,
    amcOptions,
    statusOptions,
    memberOptions,
    memberStatusOptions,
    amcStatusOptions,
    editData,
    makeActivity,
    user,
    dri_idOnWhichActionPerformed,
  } = useAppContext();
  let data;
  if (varData) {
    data = varData.find((obj) => obj._id === dataId);
  } else data = mainData.find((obj) => obj._id === dataId);
  const [changed, setChanged] = useState(false);
  const [form, setFormData] = useState({
    place: data?.place || "",
    appNumber: data?.appNumber || "",
    company: data?.company || "",
    membership_type: data?.membership_type || "",
    date: data?.date || "",
    amc: data?.amc || "",
    customerName: data?.customerName || "",
    CSV: data?.CSV || "",
    lastCommunication: data?.lastCommunication || "",
    deposit: data?.deposit || "",
    status: data?.status || "",
    dri_id: data?.dri_id || "",
    remarks: data?.remarks || "",
    address: data?.address || "",
    residentialPhone: data?.residentialPhone || "",
    officePhone: data?.officePhone || "",
    profession: data?.profession || "",
    adlf: data?.afterFeesDeduction33based
      ? "33 Based"
      : data?.afterFeesDeduction99based
      ? "99 Based"
      : "",
    amcLetterStatus: data?.amcLetterStatus || "",
    membershipStatus: data?.membershipStatus || "",
  });

  const handleInputChange = (e) => {
    if (!changed) setChanged(true);
    if (e.target.name === "customerName") {
      e.target.value = e.target.value.toUpperCase();
    }
    setFormData({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    // form.yearOfPurchase = Number(form.yearOfPurchase);
    const changedData = {};

    for (let key in data) {
      if (form.hasOwnProperty(key) && data[key] !== form[key]) {
        changedData[key] = form[key];
      }
    }
    if (form.adlf) {
      const yearsCountTillNow =
        new Date().getFullYear() - Number(data.date.split("-")[0]);
      const deposit = form.deposit;
      // const deposit = data.deposit;

      if (form.adlf === "99 Based") {
        const afterFeesDeduction99based = Math.round(
          deposit - (deposit / 99) * yearsCountTillNow
        );
        changedData.afterFeesDeduction99based = afterFeesDeduction99based;
      } else if (form.adlf === "33 Based") {
        const afterFeesDeduction33based = Math.round(
          deposit - (deposit / 33) * yearsCountTillNow
        );
        changedData.afterFeesDeduction33based = afterFeesDeduction33based;
      }
    }

    editData(dataId, changedData);
    const obj = {
      userName: user?.name,
      userRole: user?.role,
      dataId: dri_idOnWhichActionPerformed,
      actionType: "edited",
    };
    makeActivity(obj);
  };

  return (
    <div className="fixed top-0 left-0 z-20  right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="  bg-[#dff9fb]  border-blue-500 rounded-md border-t-4 w-full max-w-[1200px] overflow-scroll">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 w-full mx-auto rounded p-7  shadow-md hover:shadow-lg transition duration-400 ease-in-out"
        >
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-[2rem] mb">Edit Data </h1>
            <button onClick={() => setShow(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {/* Customer Name */}
            <div className="flex flex-col mb-4">
              <label htmlFor="customerName" className="text-xs mb-1">
                Customer Name:
              </label>
              <input
                id="customerName"
                type="text"
                name="customerName"
                value={form.customerName}
                onChange={handleInputChange}
                className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* driid */}
            {/* <div className="flex flex-col mb-4">
            <label htmlFor="dri_id" className="text-xs mb-1">
              DRI ID:
            </label>
            <input
              id="dri_id"
              type="text"
              name="dri_id"
              value={form.dri_id}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
            {/* appNumber */}
            <div className="flex flex-col mb-4">
              <label htmlFor="appNumber" className="text-xs mb-1">
                App Number:
              </label>
              <input
                id="appNumber"
                type="text"
                name="appNumber"
                value={form.appNumber}
                onChange={handleInputChange}
                className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* residentialPhone */}
            <div className="flex flex-col mb-4">
              <label htmlFor="residentialPhone" className="text-xs mb-1">
                Residential Phone:
              </label>
              <input
                id="residentialPhone"
                type="text"
                name="residentialPhone"
                value={form.residentialPhone}
                onChange={handleInputChange}
                className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* officePhone */}
            <div className="flex flex-col mb-4">
              <label htmlFor="officePhone" className="text-xs mb-1">
                Office Phone:
              </label>
              <input
                id="officePhone"
                type="text"
                name="officePhone"
                value={form.officePhone}
                onChange={handleInputChange}
                className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* profession */}
            {/* <div className="flex flex-col mb-4">
            <label htmlFor="profession" className="text-xs mb-1">
              Profession:
            </label>
            <input
              id="profession"
              type="text"
              name="profession"
              value={form.profession}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
            {/* company */}
            {/* <div className="flex flex-col mb-4">
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
              {companyOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div> */}
            {/* membership_type */}
            <div className="flex flex-col mb-4">
              <label htmlFor="membership_type" className="text-xs capitalize">
                Member Type:
              </label>
              <select
                id="membership_type"
                name="membership_type"
                value={form.membership_type}
                onChange={handleInputChange}
                className="border border-gray-400 py-1 capitalize px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[
                  data.membership_type,
                  ...memberOptions.filter(
                    (option) =>
                      option.toLowerCase() !==
                      data.membership_type.toLowerCase()
                  ),
                ].map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* date */}
            <div className="flex flex-col mb-4">
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
                {yearsOption.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            {/*  CSV */}
            <div className="flex flex-col mb-4">
              <label htmlFor=" CSV" className="text-xs mb-1">
                CSV:
              </label>
              <input
                id="CSV"
                type="text"
                name="CSV"
                value={form.CSV}
                onChange={handleInputChange}
                className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* deposit */}
            <div className="flex flex-col mb-4">
              <label htmlFor="deposit" className="text-xs mb-1">
                Deposit:
              </label>
              <input
                id="deposit"
                type="text"
                name="deposit"
                value={form.deposit}
                onChange={handleInputChange}
                className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* place */}
            <div className="flex flex-col mb-4">
              <label htmlFor="place" className="text-xs mb-1 capitalize">
                Place:
              </label>
              <select
                id="place"
                name="place"
                value={form.place}
                onChange={handleInputChange}
                className="border border-gray-400 p-1 capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[
                  data.place,
                  ...placeOptions.filter(
                    (option) =>
                      option.toLowerCase() !== data.place.toLowerCase()
                  ),
                ].map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* status */}
            <div className="flex flex-col mb-4">
              <label htmlFor="status" className="text-xs mb-1 ">
                Status:
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleInputChange}
                className="border border-gray-400 p-1 capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[
                  data.status,
                  ...statusOptions.filter(
                    (option) =>
                      option.toLowerCase() !== data.status.toLowerCase()
                  ),
                ].map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            {/*amc letter status */}
            <div className="flex flex-col mb-4">
              <label htmlFor="status" className="text-xs mb-1 ">
                AMC Letter Status:
              </label>
              <select
                id="amcLetterStatus"
                name="amcLetterStatus"
                value={form.amcLetterStatus}
                onChange={handleInputChange}
                className="border border-gray-400 p-1 capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["Select", ...amcStatusOptions].map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            {/*membership status */}
            <div className="flex flex-col mb-4">
              <label htmlFor="status" className="text-xs mb-1 ">
                Agreement Status:
              </label>
              <select
                id="membershipStatus"
                name="membershipStatus"
                value={form.membershipStatus}
                onChange={handleInputChange}
                className="border border-gray-400 p-1 capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["Select", ...memberStatusOptions].map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* address */}
            <div className="flex flex-col mb-4">
              <label htmlFor="address" className="text-xs mb-1">
                Address:
              </label>
              <textarea
                id="address"
                type="text"
                name="address"
                value={form.address}
                onChange={handleInputChange}
                className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/*lastCommunication date */}
            <div className="flex flex-col mb-4">
              <label htmlFor="lastCommunication" className="text-xs">
                Last Communication
              </label>
              <select
                size={1}
                id="lastCommunication"
                name="lastCommunication"
                value={form.lastCommunication}
                onChange={handleInputChange}
                className="border  border-gray-400 py-1 px-3 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["Select", "Never", ...yearsOption].map((data) => {
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
                {["Select", ...amcOptions].map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="adlf" className="text-xs">
                After Deducting License Fee
              </label>
              <select
                size={1}
                id="adlf"
                name="adlf"
                value={form.adlf}
                onChange={handleInputChange}
                className="border  border-gray-400 py-1 px-3 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["Select", "99 Based", "33 Based"].map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* remarks */}
            <div className="flex flex-col mb-4 ">
              <label htmlFor="remarks" className="text-xs mb-1">
                Remarks:
              </label>
              <textarea
                id="remarks"
                type="text"
                name="remarks"
                value={form.remarks}
                onChange={handleInputChange}
                className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!changed}
            className={`w-3/12 mt-4 mx-auto  text-white py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              changed
                ? "bg-blue-500 hover:bg-blue-700"
                : "opacity-50 bg-gray-800"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
