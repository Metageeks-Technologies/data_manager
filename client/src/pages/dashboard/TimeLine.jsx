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
          className="flex -py-"  
        >
          <TimeLiner data={allActivityByExe}/>
          <TimeLiner data={allActivityByVar}/>
      </div>
    </div>
  )
}

export default TimeLine
