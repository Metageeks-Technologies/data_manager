import React, { useState } from "react";
import FormField from "./FormField";
import { useAppContext } from "../context/appContext";

const ChangePassForm = ({ setChangePassword }) => {
  const { changePassword } = useAppContext();

  const [userForm, setUser] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const changePasswordSubmit = (e) => {
    e.preventDefault();
    const { email, oldPassword, newPassword } = userForm;
    if (!email || !oldPassword || !newPassword) {
      alert("provide all values");
      return;
    }
    changePassword({
      email: userForm.email,
      oldPassword: userForm.oldPassword,
      newPassword: userForm.newPassword,
    });
    setChangePassword(false);
  };
  const handleChange = (e) => {
    setUser({ ...userForm, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={changePasswordSubmit} className="bg-white rounded-lg p-4">
        <div className=" text-black w justify-between flex flex-row  font-medium rounded-md text-sm w-full sm:w-auto  px-5 py-2.5 text-center">
          <span className=" flex justify-center ml-2">Change Password</span>
          {/* close btn */}
          <button onClick={() => setChangePassword(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="tomato"
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
        {/* email field */}
        <div className="sm:w-80 xs:w-9/12 mt-6">
          <FormField
            labelName="Email"
            type="email"
            name="email"
            placeholder="Email"
            value={userForm.email}
            handleChange={handleChange}
          />
        </div>
        {/* old password field */}
        <div className="sm:w-80 xs:w-9/12 mt-6">
          <FormField
            labelName="Password"
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={userForm.password}
            handleChange={handleChange}
          />
        </div>
        {/* new password */}
        <div className="sm:w-80 xs:w-9/12 mt-6">
          <FormField
            labelName="Password"
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={userForm.password}
            handleChange={handleChange}
          />
        </div>
        {/* btn */}
        <div>
          <button
            type="submit"
            className=" text-white bg-[#020205] my-4 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassForm;
