import { useAppContext } from "../../context/appContext";
import { TimeLiner } from "../../components"

const TimeLine = () => {
    const {
        allActivityByExe,
        allActivityByVar
      } = useAppContext();
    
  return (
    <div>
      <div
        style={{ height: "calc(100vh - 5.5rem)" }}
          className="flex gap-[12rem] bg-[#f0f4f8] py-4 px-[4rem] border-t border-gray-300"  
        >
          <TimeLiner data={allActivityByExe}/>
          {/* <TimeLiner data={allActivityByVar}/> */}
      </div>
    </div>
  )
}

export default TimeLine
