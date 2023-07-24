import React, { useEffect, useState } from "react";
import "react-vertical-timeline-component/style.min.css"; // Import the CSS for react-vertical-timeline
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { useAppContext } from "../context/appContext";
import dateStr from "../utils/dateStr";
const UserActivityTimeline = ({data}) => {
  const { getAllActivity } = useAppContext();
  // const [allActivityState, setAllActivity] = useState(allActivity);
  useEffect(() => {
    getAllActivity;
  }, []);
  return (
    <>
    
    <div
    style={{ height: "calc(100vh - 5.5rem)" }}
      className="flex w-full items-center justify-start flex-col px-5 bg-[#f0f4f8] p-4  border-t border-gray-300 "
      
    >
       
      <div className=" bg- w-9/12 p-3 bg-white flex flex-col items-center justify-center rounded-md">
      <div className="w-10/12"> 
      <h1 className="w-fit border-b-2 text-bl -ml-[1%]  text-[2rem] capitalize" >{data && data[0]?.userRole}</h1>
      </div>
        <VerticalTimeline
          className="w-full flex-col -m-5 justify-start border-none"
          layout="1-column"
        >
          {data.map((obj, index) => {
            // fetching the date and time from createdAT
            let date=dateStr(obj.createdAt);
            
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
                  <span className="text-[#3B82F6]">{`${obj.dataId}`}</span>
                </p>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </div>
    </>
  );
};

export default UserActivityTimeline;
