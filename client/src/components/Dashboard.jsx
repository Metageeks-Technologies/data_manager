import React, { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useNavigate,useLocation } from "react-router-dom";
import Alert from "./Alert";
// import { useLocation } from 'react-router-dom';

const Dashboard = ({ links, admin,role }) => {
  const location = useLocation();
  const currentURL = location.pathname;
  const endpoint = currentURL.split('/').pop();
  console.log(endpoint);
  const navigate = useNavigate();
  const { toggleExeData,toggleExeDataF,isFiltered, logoutUser, user,setShowTable,showTable, searchBar } =
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
                className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-3 py-2.5 text-center"
              >
                Already Worked
              </button>
              ):(
                <button
                onClick={() => toggleExeDataF()}
                className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-3 py-2.5 text-center"
              >
                Pending Task
              </button>
              )
            }
              </span>
            )}
             {role==='verifier' && (
              <span>
                {
              !toggleExeData?(
                <button
                
                onClick={() => toggleExeDataF()}
                className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
              >
                Already worked
              </button>
              ):(
                <button
                onClick={() => toggleExeDataF()}
                className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
              >
                Pending Task
              </button>
              )
            }
              </span>
            )}
            {admin && (
              <span>
                {showTable ?(
              <button
              disabled={endpoint==='users' || endpoint==='upload' || endpoint==='trash'}
              onClick={() => setShowTable(false)}
              className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
            >
              Activity
            </button>
            ):(
              <button
              disabled={endpoint==='users' || endpoint==='upload' || endpoint==='trash'}
              onClick={() => setShowTable(true)}
              className=" text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
            >
              Show Data
            </button>
            )}
              </span>
            )}
            <button
            disabled={endpoint==='users' || endpoint==='upload'}
              onClick={() => searchBar(true)}
              className=" text-white relative bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
            >
              Search
           { isFiltered &&  <span className="bg-green-400 absolute top-[2px] right-[2px] rounded-full h-[0.85rem] w-[0.85rem]"></span>  }
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
