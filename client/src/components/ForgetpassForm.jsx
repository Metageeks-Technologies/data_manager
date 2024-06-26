import React, { useState } from "react";
import FormField from "./FormField";
import { useAppContext } from "../context/appContext";

const ForgetPassForm = ({ setShowForgetPass }) => {
  const { isEmailVerified, isOtpVerified, showAlert } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);

  const [userForm, setUser] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changePasswordSubmit = (e) => {
    e.preventDefault();
    const { email, otp, newPassword, confirmPassword } = userForm;
    if (!email) {
      showAlert("warn", "Enter Your Email");
      return;
    }
    if (otp && otp.length !== 4) {
      showAlert("warn", "OTP must contain four digit");
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlert("info", "Password not matched");
      return;
    }
    console.log(userForm);
    // changePassword({
    //   email: userForm.email,
    //   oldPassword: userForm.oldPassword,
    //   newPassword: userForm.newPassword,
    // });
    // setShowForgetPass(false);
  };
  const handleChange = (e) => {
    setUser({ ...userForm, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form
        onSubmit={changePasswordSubmit}
        className="bg-white rounded-lg px-[4rem] py-[2rem] "
      >
        <div className=" text-black w justify-between flex flex-row  font-medium rounded-md text-sm w-full sm:w-auto  px-5 py-2.5 text-center">
          <span className=" flex justify-center ml-2">Reset your Password</span>
          {/* close btn */}
          <button onClick={() => setShowForgetPass(false)}>
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
        {/* email feild */}
        <div className="flex gap-3 mt-7 w-full p-3 items-center py-2 border-2 bg-sky-50 border-blue-100 mb-4 rounded-md">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#b8c5d7"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </span>

          <input
            className="border-none w-full rounded-sm bg-sky-50 py-1 px-1 placeholder-[#b8c5d7] appearance-none focus:outline-none"
            type="email"
            name="email"
            placeholder="Email"
            value={userForm.email}
            onChange={handleChange}
          />
          {isEmailVerified && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#95F985"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
          )}
        </div>
        {!isEmailVerified && (
          <p className="text-[0.9rem] mt-[-0.8rem] mb-3 text-red-500">
            *only for admin
          </p>
        )}
        {/* OTP feild */}
        {isEmailVerified && (
          <div className="flex gap-3  w-full px-3 items-center py-2 border-2 bg-sky-50 border-blue-100 mb-4 rounded-md">
            <input
              maxLength={4}
              className="border-none w-full rounded-sm bg-sky-50 py-1 px-1 placeholder-[#b8c5d7] appearance-none focus:outline-none"
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={userForm.otp}
              onChange={handleChange}
            />
            {isOtpVerified && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#95F985"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="gray"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            )}
          </div>
        )}

        {/* passwoard feild */}
        {isEmailVerified && isOtpVerified && (
          <>
            <div className="flex gap-3 w-full px-3 mb-4 items-center py-2 border-2 bg-sky-50 border-blue-100 rounded-md">
              <input
                className="border-none w-full bg-sky-50 py-1 placeholder-[#b8c5d7] appearance-none focus:outline-none"
                type="password"
                name="newPassword"
                placeholder="New password"
                value={userForm.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-3 w-full px-3 items-center py-2 mb- border-2 bg-sky-50 border-blue-100 rounded-md">
              <input
                className="border-none w-full bg-sky-50 py-1 placeholder-[#b8c5d7] appearance-none focus:outline-none"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={userForm.confirmPassword}
                onChange={handleChange}
              />
              <span
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#b8c5d7"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#b8c5d7"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </span>
            </div>
          </>
        )}

        {/* btn */}
        <div>
          <button
            type="submit"
            className=" text-white bg-[#020205] my-4 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
          >
            {isEmailVerified && isOtpVerified ? "Submit" : "Verify"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassForm;
