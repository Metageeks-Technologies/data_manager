import { useAppContext } from "../../context/appContext";
import { VarTimeLiner,ExeTimeLiner } from "../../components"


const TimeLine = () => {
    const {
        allActivityByExe,
        allActivityByVar
      } = useAppContext();

      const uniqueDataExe = allActivityByExe.filter((item, index, arr) => {
        return index === arr.findIndex((obj) => obj._id === item._id);
      });
      const uniqueDataVar = allActivityByVar.filter((item, index, arr) => {
        return index === arr.findIndex((obj) => obj._id === item._id);
      });
    
  return (
    <div>
      <div
        style={{ height: "calc(100vh - 5.5rem)" }}
          className="flex gap-[14rem] bg-[#f0f4f8] py-4 px-[5rem] border-t border-gray-300"  
        >
          <ExeTimeLiner data={uniqueDataExe}/>
          <VarTimeLiner data={uniqueDataVar}/>
          
      </div>
    </div>
  )
}

export default TimeLine
