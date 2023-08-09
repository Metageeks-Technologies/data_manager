import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const OptionList=({items,fun,isForIP,submitFun,forOption})=>{
  console.log(isForIP);


  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
   if(isForIP){
    if(inputValue) submitFun({ip:inputValue});
   }else if(forOption==="Place") submitFun({place:inputValue})
   else if(forOption==="Status") submitFun({status:inputValue})
  else if(forOption==="Membership Type") submitFun({membership_type:inputValue})
  else if(forOption==="amc") submitFun({amc:inputValue})



   setInputValue("");
  
  };
  

  return (
    <div>
      <h1  className="m-4 ml-0 text-md font-semibold">{forOption} Options</h1>
      <ul className="overflow-auto">
                {isForIP ?(
                  <div>
                    {items && items.map((item) => (
                  <li
                    key={item._id}
                    className="mb-2 w-full flex overflow-y-auto justify-between bg-blue-500 p-2 text-white rounded-md"
                  >
                    <p>{item.ip}</p>
                    <button onClick={()=>fun(item._id,)} >
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
                  </div>
                ):(
                  <div>
                    {items && items.map((item,index) => (
                  <li
                    key={index}
                    className="mb-2 w-full flex overflow-y-auto justify-between bg-blue-500 p-2 text-white rounded-md"
                  >
                    <p>{item}</p>
                    <button onClick={()=>fun(item)} >
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
                  </div>
                )
                }
                
                
      </ul>

              <form onSubmit={handleSubmit}>
                <div className="w-full">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={`Add new ${forOption}`}
                    className="p-2 border w-full rounded-md  border-gray-300 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 mb-7 text-white px-4 py-2 mt-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
    </div>
  )
}


const Sidebar = () => {
   const {getAllIPs,AddIP,deleteIP,amcOptions,deleteOption, addOption,allowedIPs,toggleAction ,statusOptions,
    placeOptions,
    memberOptions,}=useAppContext();
   useEffect(()=>{
    getAllIPs();
   },[toggleAction]); 
  const [isOpen, setIsOpen] = useState(false);
 
  const [formData, setFormData] = useState({
    status: '',
    membership_type: '',
    place:''
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleOptionSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here using the formData state
    addOption(formData);
    setFormData({
      status: '',
      membership_type: '',
      place:''
    })
    setIsOpen(!isOpen);
  };
  const options =  ['Select Option','Ip', 'Place', 'Status', 'Membership Type','amc'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (event) => {

    setSelectedOption(event.target.value);
  };

  const PropsForOption={}
  if(selectedOption!==options[0]){
    if(selectedOption===options[1]){
      PropsForOption.items=allowedIPs;
      PropsForOption.isForIP=true;
      PropsForOption.fun=deleteIP
      PropsForOption.submitFun=AddIP
      PropsForOption.forOption=options[1]
    }
    else if(selectedOption===options[2]){
      PropsForOption.items=placeOptions;
      PropsForOption.isForIP=false;
      PropsForOption.fun=deleteOption
      PropsForOption.submitFun=addOption
      PropsForOption.forOption=options[2]
    }
    else if(selectedOption===options[3]){
      PropsForOption.items=statusOptions;
      PropsForOption.isForIP=false;
      PropsForOption.fun=deleteOption
      PropsForOption.submitFun=addOption
      PropsForOption.forOption=options[3]
    }
    else if(selectedOption===options[4]){
      PropsForOption.items=memberOptions;
      PropsForOption.isForIP=false;
      PropsForOption.fun=deleteOption;
      PropsForOption.submitFun=addOption
      PropsForOption.forOption=options[4]
    }
    else if(selectedOption===options[5]){
      PropsForOption.items=amcOptions;
      PropsForOption.isForIP=false;
      PropsForOption.fun=deleteOption;
      PropsForOption.submitFun=addOption
      PropsForOption.forOption=options[5]
    }
  }
  
  return (
    <div>
      {/* Button to toggle the sidebar */}
      <button
        className="fixed right-0 top-[6%] transform -translate-y-1/2 bg-blue-500 text-white px-3 py-2 rounded-l-md focus:outline-none"
        onClick={toggleSidebar}
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
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 right-0 bottom-0 overflow-y-auto flex justify-end bg-gray-800 bg-opacity-50 z-20 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
      <div
        className={` h-screen py-[3rem] flex px-2 w-[23%] pb overflow-y-auto rounded-l-lg bg-[#E5E7EB] text  transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar content */}
       <div className="w-[80%]">
       
        <button
              onClick={toggleSidebar}
              className="text-gray-500 ml-3 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
        </button>
          <div className="p-4 h-full">
            <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold">Setting</h3>
            </div>
            <div className="relative">
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="block appearance-none w-full bg-white text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white focus:border-gray-400"
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
            </div>
             {(selectedOption !==options[0]) && (
              <div className="w-full">
              <OptionList {...PropsForOption} />
              </div>
             )}
            
          </div>
       </div>

       {/* <div className="mt-11">
       <h3 className="text-xl font-semibold mb-[2rem]">Add Options</h3>
       
        <div className="flex fle-row justify-center ">
        
      <form onSubmit={handleOptionSubmit} className="w-64 p-4 border bg-gray-50 border-gray-300 rounded">
        <div className="mb-4">
          <label htmlFor="status" className="block mb-1">
            Status:
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="place" className="block mb-1">
            Place:
          </label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="membership_type" className="block  mb-1">
            Membership Type:
          </label>
          <input
            type="text"
            id="membership_type"
            name="membership_type"
            value={formData.membership_type}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
        </div>
       </div> */}

       
      </div>
      </div>  
    </div>
  );
};

export default Sidebar;
