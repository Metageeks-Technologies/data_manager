import React, { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Dashboard = ({ links, admin,role }) => {
  const navigate = useNavigate();
  const { toggleExeData,toggleExeDataF, logoutUser, user,setShowTable,showTable, searchBar } =
    useAppContext();

  const handleLogout = async () => {
   await logoutUser();
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
                          ? " text-[#2196f3] transform font-bold translate-x-20"
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
            {role==='executive' && (
              <span>
                {
              !toggleExeData?(
                <button
                onClick={() => toggleExeDataF()}
                className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
              >
                MyWork
              </button>
              ):(
                <button
                onClick={() => toggleExeDataF()}
                className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
              >
                Edit
              </button>
              )
            }
              </span>
            )}
             {role==='verifier' && (
              <span>
                {
              toggleExeData?(
                <button
                onClick={() => toggleExeDataF()}
                className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
              >
                MyWork
              </button>
              ):(
                <button
                onClick={() => toggleExeDataF()}
                className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
              >
                Data
              </button>
              )
            }
              </span>
            )}
            {admin && (
              <span>
                {showTable ?(
              <button
              onClick={() => setShowTable(false)}
              className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
            >
              Activity
            </button>
            ):(
              <button
              onClick={() => setShowTable(true)}
              className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
            >
              Show Data
            </button>
            )}
              </span>
            )}
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
