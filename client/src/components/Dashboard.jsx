import React, { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Dashboard = ({ links, admin }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logoutUser, user, openSearchBar, searchBar } =
    useAppContext();

  const handleLogout = () => {
    logoutUser();
    navigate("/auth");
  };
  return (
    <div className="flex ">
      <div className="w-full">
        {/* nav */}
        <div className="h-[5.5rem] flex justify-between py-2 items-center px-[5%]">
          <div className=" flex items-center gap-3   ml-[-1rem]">
            <img
              className=" object-contain w-[6rem] lg:w-[8rem]"
              src="/small_logo.png"
              alt=""
            />
            <p className="capitalize  font-bold">Welcome {user?.name}</p>
          </div>
          {/* <h1 className="text-[2rem] capitalize">{user?.name} Panel</h1> */}

          <div className="flex items-center gap-[20%]">
            <ul className="flex items-center gap-4">
              {links.map((obj) => {
                return (
                  <li key={obj.text}>
                    {" "}
                    <NavLink
                      end={true}
                      className={({ isActive }) =>
                        isActive
                          ? " text-[#fd79a8] transform translate-x-20"
                          : ""
                      }
                      to={obj.to}
                    >
                      {obj.text}{" "}
                    </NavLink>{" "}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex gap-5">
            <button
              onClick={() => searchBar(true)}
              className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
            >
              Search
            </button>
            <button
              onClick={handleLogout}
              className=" text-white bg-[#020205] font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
            >
              Logout
            </button>
          </div>
        </div>
        {/* view */}
        <div className="h-calc(100vh - 5.5rem)">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
