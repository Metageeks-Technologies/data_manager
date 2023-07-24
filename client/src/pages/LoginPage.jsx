import React, { useState, useEffect } from "react";
import { Alert, ChangePassForm, ForgetpassForm, FormField, Loader, LoginSwiper } from "../components";
import { showAlert, useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { loginImgOption } from "../utils/options";

const LoginPage = () => {
  const navigate = useNavigate();
  
  const { loginUser, isAuthenticated, userLoading, isAdmin, user } =
    useAppContext();
  const [changePassword, setChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgetPass, setShowForgetPass] = useState(false);

  // userForm state
  const [userForm, setUser] = useState({
    name: "",
    email: "",
    password: "",
    haveAccount: true,
  });
  // id user is authenticated then there is no need of login page
  
   
    useEffect(() => {
      if (isAuthenticated && isAdmin) {
        navigate("/");
      } else if (isAuthenticated && user?.role === "executive") {
        navigate("/executive");
      } else if (isAuthenticated && user?.role === "verifier") {
        navigate("/verifier");
      }
    }, [isAuthenticated, isAdmin, user]);
   
  
  // onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, haveAccount } = userForm;
    if (!email || !password || (!haveAccount && !name)) {
      showAlert("info", "provide all values");
      return;
    }

    loginUser({
      email: userForm.email,
      password: userForm.password,
    });
  };

  // handel change
  const handleChange = (e) => {
    setUser({ ...userForm, [e.target.name]: e.target.value });
  };
  //handle forget pass
  const handleForgetPass=()=>{
    setShowForgetPass((prev)=>!prev);
    
  }
  if(userLoading){
    return(
      <div className="fixed top-0 left-0 right-0 bottom-0  flex items-center justify-center">
            <Loader />
      </div>
    )
  }

  return (
    <div className=" h-screen w-full flex flex-col sm:flex-row">
      {/* login section */}
      <div className="lg:w-6/12 bg-white sm:w-8/12 px-[2.5rem] py-[6rem]">
        <div className="mx-auto w-full lg:w-7/12 md:w-10/12">
          <div className="w-5/12 lg:w-4/12 mt-3 ">
            <img
              className=" object-contain"
              src="/small_logo.png"
              alt="DALMIA RESORTS"
            />
          </div>
          <h1 className=" mt-[2.5rem] flex font-bold text-[1.6rem]">
            Login to your Account
          </h1>
          <p className="text-gray-500">
            please Login to go to your Dashboard panel
          </p>
          <div>
            {/* from */}
            <form
              onSubmit={onSubmit}
              className="flex flex-col h-full mt-[5.5rem] p-0"
            >
              {/* email feild */}
              <div className="flex gap-3  w-full px-3 items-center py-2 border-2 bg-sky-50 border-blue-100 mb-4 rounded-md">
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
              </div>
              {/* passwoard feild */}
              <div className="flex gap-3 w-full px-3 items-center py-2 border-2 bg-sky-50 border-blue-100 rounded-md">
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
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </span>

                <input
                  className="border-none w-full bg-sky-50 py-1 placeholder-[#b8c5d7] appearance-none focus:outline-none"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={userForm.password}
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
                      strokeWidth="1.5"
                      stroke="#b8c5d7"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
              <div onClick={handleForgetPass} className=" text-[#3b82f6] cursor-pointer w-full mt-3 flex justify-end text-sm py-2.5  font-medium rounded-md ">
               
                Forget Password ?
              </div>

              {/* btn */}
              <div className="text-white w-full mx-auto mt-5 cursor-pointer bg-[#3b82f6] my-4 font-medium rounded-md text-sm  px-5 text-center">
                <button
                  type="submit"
                  className=" text-white w-full bg-[#3b82f6] py-2.5  font-medium rounded-md "
                >
                  Login
                </button>
              </div>
              <div
                onClick={() => setChangePassword((prev) => !prev)}
                className=" text-white w-full cursor-pointer bg-[#3b82f6] my-1 font-medium rounded-md text-sm  sm:w-auto block px-5 py-2.5 text-center"
              >
                Change Password
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* image section */}
      <div className="h-full  lg:w-6/12 w-full sm:w-8/12 mt-[6rem] sm:mt-0">
        <LoginSwiper />
      </div>
      {/* change password form */}
      {changePassword && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <ChangePassForm setChangePassword={setChangePassword} />
        </div>
      )}
      {/* showForgetPassWord form */}
      {showForgetPass && (
        <div className="fixed top-0 left-0 z-10 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <ForgetpassForm setShowForgetPass={setShowForgetPass}/>
      </div>
      )}
    </div>
  );
};

export default LoginPage;
