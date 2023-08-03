import React, { useEffect, useState, useRef, useCallback } from "react";
import { debounce } from "lodash";
import "react-vertical-timeline-component/style.min.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { useAppContext } from "../context/appContext";
import dateStr from "../utils/dateStr";
// import AdminPop from "./AdminPop";
import Loader from "./Loader";
import VarAdminPop from './VarAdminPop'

const UserActivityTimeline = ({ data }) => {
  const { getAllActivityVar, activityNumOfPageVar,setVarAdminPopup,varAdminPopup } =
    useAppContext();
  const [dri_Id, setId] = useState("");
  const [Page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  // const [isOneCalled,setOneCalled]=useState(false);

  const handleClick = (id) => {
    setId(id);
    setVarAdminPopup(true);
  };
  const debouncedSetPage = useCallback(debounce(setPage, 1800), []);
  const observerTargetVar = useRef(null);
  const scrollTargetVar = useRef(null);

  const scrollToTop = () => {
    // Scroll to the top of the scrollable div
    if (scrollTargetVar.current) {
      scrollTargetVar.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setShowBtn(false);
  };
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && Page <= activityNumOfPageVar) {
          // console.log(Page, "var");
          debouncedSetPage((prev) => prev + 1);
          if (Page > 2) setShowBtn(true);
          if (data.length ===8 && Page == 1) {
          } else {
          
            getAllActivityVar("verifier", Page);
          }
        }
      },
      { threshold: 1 }
    );

    if (observerTargetVar.current) {
      observer.observe(observerTargetVar.current);
    }

    return () => {
      if (observerTargetVar.current) {
        observer.unobserve(observerTargetVar.current);
      }
    };
  }, [observerTargetVar, Page]);

  return (
    <>
      {varAdminPopup && (
        <div className="fixed z-10 top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <VarAdminPop id={dri_Id} />
        </div>
      )}
      
      <div className=" w-9/12 p-3 pr-7 relative  bg-blue-100  flex flex-col items-center rounded-md">
        <div className="w-10/12 p-0">
          <h1 className="w-fit border-b-2 border-cyan-600 text-bl text-[2rem] capitalize">
            {data && data[0]?.userRole}
          </h1>
        </div>
        <div
          ref={scrollTargetVar}
          className="w-full overflow-x-hidden custom-scrollbar flex-col overflow-y-scroll"
        >
          <VerticalTimeline
            className="w-full justify-start border-none"
            layout="1-column"
          >
            <div>
              {data.map((obj, index) => {
                // fetching the date and time from createdAT
                let date = dateStr(obj.createdAt);

                return (
                  
                  
      <VerticalTimelineElement
                    key={index}
                    className="m-3 flex items-center justify-start"
                    contentStyle={{
                      background: "#F9FEFF",
                      color: "black",
                    }}
                    contentArrowStyle={{
                      borderRight: "7px solid  #d7d3d7",
                    }}
                    date={date}
                    iconStyle={{
                      background: "rgb(115, 249, 124)",
                      color: "#fff",
                      marginTop: "1.2rem",
                      marginLeft: "1.6rem",
                      height: "10px",
                      width: "10px",
                    }}
                  >
                    <p>
                      <span className="text-sky-700">{`${obj.userName}(${obj?.userRole})`}</span>{" "}
                      <span
                        className={
                          obj.actionType === "edited"
                            ? "text-orange-500"
                            : obj.actionType === "approved"
                            ? "text-[#2eef3b]"
                            : "text-red-600/95"
                        }
                      >{`${obj.actionType}`}</span>{" "}
                      data with DRI-Id{" "}
                      <span
                        onClick={() => handleClick(obj.dataId)}
                        className="cursor-pointer text-[#3B82F6]"
                      >{`${obj.dataId}`}</span>
                    </p>
                  </VerticalTimelineElement>
                  
                  
                );
              })}
              <div ref={observerTargetVar}>
                <div className="w-full flex justify-center">
                {
                    Page<activityNumOfPageVar && <Loader />
                  } 
                </div>
              </div>
            </div>
          </VerticalTimeline>
          {showBtn && (
            <button
              onClick={scrollToTop}
              className="absolute rounded-full right-[2.5rem] bottom-8 p-2  bg-blue-500/40 text-white shadow hover:bg-blue-600"
            >
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
                  d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserActivityTimeline;
