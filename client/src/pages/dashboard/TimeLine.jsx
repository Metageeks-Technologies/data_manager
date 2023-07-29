import { useAppContext } from "../../context/appContext";
import { VarTimeLiner,ExeTimeLiner } from "../../components"


const TimeLine = () => {
    const {
        allActivityByExe,
        allActivityByVar
      } = useAppContext();
    
  return (
    <div>
      <div
        style={{ height: "calc(100vh - 5.5rem)" }}
          className="flex gap-[14rem] bg-[#f0f4f8] py-4 px-[5rem] border-t border-gray-300"  
        >
          <ExeTimeLiner data={allActivityByExe}/>
          <VarTimeLiner data={allActivityByVar}/>
          
      </div>
    </div>
  )
}

export default TimeLine
