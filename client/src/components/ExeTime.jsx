import React, { useEffect, useState, useRef, useCallback } from "react";
import { debounce } from "lodash";
import "react-vertical-timeline-component/style.min.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { useAppContext } from "../context/appContext";
import dateStr from "../utils/dateStr";
import AdminPop from "./AdminPop";
import Loader from "./Loader";

const UserActivityTimeline = ({ data }) => {
  const { getAllActivity, activityNumOfPage, adminPopup, setAdminPopup } =
    useAppContext();
  const [dri_Id, setId] = useState("");
  const [Page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const handleClick = (id) => {
    setId(id);
    setAdminPopup(true);
  };
  const debouncedSetPage = useCallback(debounce(setPage, 1800), []);
  const observerTarget = useRef(null);
  const scrollTarget = useRef(null);

  const scrollToTop = () => {
    // Scroll to the top of the scrollable div
    if (scrollTarget.current) {
      scrollTarget.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setShowBtn(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && Page <= activityNumOfPage) {
          // console.log(Page,"exe",lastPage);
          debouncedSetPage((prev) => prev + 1);
          if (Page > 2) setShowBtn(true);
          if (data.length === 8 && Page == 1) {
          } else {
            getAllActivity("executive", Page);
          }
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, Page]);

  return (
    <>
      {adminPopup && (
        <div className="fixed z-10 top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <AdminPop id={dri_Id} />
        </div> 
      )}
      <div className=" w-9/12 p-3 relative pr-7  bg-blue-100  flex flex-col items-center rounded-md">
        <div className="w-10/12">
          <h1 className="w-fit border-b-2 text-bl border-cyan-600   text-[2rem] capitalize">
            {data && data[0]?.userRole}
          </h1>
        </div>
        <div
          ref={scrollTarget}
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
              <div ref={observerTarget}>
                <div className="w-full flex justify-center">
                  {Page < activityNumOfPage && <Loader />}
                </div>
              </div>
            </div>
          </VerticalTimeline>
          {showBtn && (
            <button
              onClick={scrollToTop}
              className="absolute rounded-full bottom-8 right-[2.5rem] p-2  bg-blue-500/40 text-white shadow hover:bg-blue-600"
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
