import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import { showAlert } from "../context/appContext";

const EditablePopup = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isEditTyped, setIsEditTyped] = useState(false);

  const {
    selectedData,
    makeEditableInBulk,
    setShowEditPopup,
    unselectAllData,
  } = useAppContext();

  const handleEditMany = async () => {
    const ids = selectedData.map((el) => el._id);
    setLoading(true);
    await makeEditableInBulk(ids);
    setLoading(false);
    setShowEditPopup(false);
    showAlert("succ", "Data Edited Successfully");
    unselectAllData();
  };
  const handleOnChange = (e) => {
    if (e.target.value === "edit") {
      setIsEditTyped(true);
    } else {
      setIsEditTyped(false);
    }
    setInput(e.target.value);
  };
  return (
    <div className="bg-white rounded-md shadow-md px-16 py-10 w-[30%] ">
      <div className="flex justify-end mb-4 items-center">
        <button onClick={() => setShowEditPopup(false)}>
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
      <h1 className="text-lg font-semibold text-center mb-4">
        Make Selected data Editable?
      </h1>
      <div className="flex mb-2 ml-2 w-full px-2 justify-between items-center py-1 border-2 bg-white border-blue-200 rounded-md">
        <input
          value={input}
          onChange={handleOnChange}
          type="text"
          className="border-none focus:border-none  rounded-sm bg-white py-1 px-1 placeholder-gray-400 appearance-none focus:outline-none"
          placeholder="Type 'edit' to confirm"
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setShowEditPopup(false)}
          className=" text-black px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          disabled={!isEditTyped || loading}
          onClick={handleEditMany}
          className={`${
            isEditTyped ? "bg-blue-500" : "bg-gray-300"
          } text-white px-4 py-2 rounded-md`}
        >
          {loading ? "Editing..." : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default EditablePopup;
