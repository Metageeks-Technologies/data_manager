import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to toggle the sidebar */}
      <button
        className="absolute right-0   bg-white text-white px-2 py-1 rounded-l-md focus:outline-none"
        onClick={toggleSidebar}
      >
        <img src="/yt-logo.png" className="h-10 w-10" alt="" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 overflow-y-auto flex justify-end bg-gray-800 bg-opacity-50 z-20 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className={` h-screen py-[3rem] flex px-2 w-[23%] pb overflow-y-auto rounded-l-lg bg-white text  transition-transform duration-300 ease-in-out transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar content */}
          <div className="w-[80%]">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 ml-3 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="p-4 h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold">Tutorials</h3>
              </div>
              <ul className="flex flex-col text-blue-500 underline underline-offset-2 gap-3">
                <li>
                  {/* <p>Login and pagination -</p> */}
                  <a href="https://youtu.be/JNvmGPjhYs4" target="_blank">
                    Login and pagination -
                  </a>
                </li>
                <li>
                  {/* <p> </p> */}
                  <a href="https://youtu.be/urFNgb-FkXI" target="_blank">
                    About Executive Dashboard -
                  </a>
                </li>
                <li>
                  {/* <p>Verifier Dashboard - </p> */}
                  <a href="https://youtu.be/QWMODuexRAY" target="_blank">
                    Verifier Dashboard -
                  </a>
                </li>
                <li>
                  {/* <p>Admin dashboard Create users - </p> */}
                  <a href="https://youtu.be/_V4RpfvzT34" target="_blank">
                    Admin dashboard Create users -
                  </a>
                </li>
                <li>
                  {/* <p>Admin dashboard activity trash data - </p> */}
                  <a href="https://youtu.be/j7toVWuOoa8" target="_blank">
                    Admin dashboard activity trash data -
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
