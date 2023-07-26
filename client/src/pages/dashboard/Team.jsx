import React ,{useEffect,useState} from 'react'
import { showAlert, useAppContext } from '../../context/appContext';
import {FormField, Loader } from '../../components';

const SelectComponent = ({_id,role,updateUserRole}) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => {
    setPopupOpen(true);
  };
  
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    
  };
  const handleSubmit=(event)=>{
    event.preventDefault()
    setPopupOpen(false);
    if(selectedValue){
      const obj={
        role:selectedValue
      }
     
      updateUserRole(_id,obj);
    }else {
      showAlert("warn","Please Select Role")
    }
    
  }
  
  return (
    <div className='flex  flex-col'>
    <div className='flex justify-center flex-row mb-2'>
    <p className='mr-3 capitalize'>{role}</p>
    {role!=="admin" && (
      <button onClick={togglePopup}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="pink" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    </button>
    )}
    </div>
    
    {isPopupOpen &&<form onSubmit={handleSubmit}>
      <label htmlFor="select"></label>
      <select id="select" value={selectedValue} onChange={handleSelectChange} className='capitalize'>
        <option value="">Select Role</option>
        <option value="executive">executive</option>
        <option value="verifier">verifier</option>
       
      </select>
      <button className='ml-1 border-2 border-[pink] rounded-md px-1'>update</button>
    </form>}
    </div>
  );
};


const Team = () => {
 
  const {isLoading,getAllUser,toggleAction,addUser,updateUserRole,deleteUser,allUsers}=useAppContext();
  useEffect(() => {
    getAllUser();
  }, [toggleAction]);

  const [userForm,setUser]=useState({
    name:"",
    email:"",
    password:"",
    role:""
  })
  const [activeFormPopup, setActiveFormPopup] = useState(null);

  const openFormPopup = () => {
    setActiveFormPopup(true);
  };

  const closeFormPopup = () => {
    setActiveFormPopup(false);
  };

  const handleChange =(e)=>{
    setUser({...userForm,[e.target.name]:e.target.value})
  }
  
  const onSubmit=(e)=>{
    e.preventDefault();
    const { name, email, password ,role} = userForm;
    if (!email || !password ||  !name || !role) {
      alert("provide all values")
      return;
    }
    closeFormPopup();
   
    addUser({
      name:userForm.name,
      email:userForm.email,
      password:userForm.password,
      role:userForm.role
    });
  }
  
  return (
    <div 
    style={{ height: "calc(100vh - 5.5rem)" }}
    className='flex items-center justify-start flex-col bg-[#f0f4f8] w-full border-t border-l border-gray-300 '>
      {/* loading */}
      {/* {isLoading && (<div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
        <Loader />
      </div>)} */}
      {/* btn */}
      <div className='flex justify-start w-10/12 mt-[5rem] mb-[1rem] '>  
        <button onClick={openFormPopup}
        disabled={isLoading}  
        className=" text-white flex   bg-green-400 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >{"Add User"}
        <span className='ml-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>

        </span>
        </button>
        {/*popup Form  */}
        {activeFormPopup && (
           <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
           <form onSubmit={onSubmit} className="bg-white rounded-lg p-4">
             {/* form */}
             <div 
         
                className=" text-black w justify-between flex flex-row  font-medium rounded-md text-sm w-full sm:w-auto  px-5 py-2.5 text-center"
                >
                <span className=' flex justify-center ml-2'>
                Add User
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>

                </span>
                {/* close btn */}
                <button onClick={closeFormPopup}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="tomato" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                </button>
             </div>
                  {/* name field*/}
                  <div className="sm:w-80 xs:w-9/12 mt-6">
                    <FormField
                            labelName="Name"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={userForm.name}
                            handleChange={handleChange}
                    />
                  </div>  
                  {/* email field */}
                  <div className="sm:w-80 xs:w-9/12 mt-6">
                    <FormField
                            labelName="Email"
                            type="email"
                            name="email"
                            placeholder="email"
                            value={userForm.email}
                            handleChange={handleChange}
                    />
                    </div>
                    {/* password field */}
                    <div className="sm:w-80 xs:w-9/12 mt-6">
                    <FormField
                            labelName="Password"
                            type="password"
                            name="password"
                            placeholder="password"
                            value={userForm.password}
                            handleChange={handleChange}
                    />
                    </div>
                    <div className="flex flex-col sm:w-80 xs:w-9/12 mt-6">
                      <label htmlFor="select">Role</label>
                      <select id="select" className="border capitalize border-gray-300 rounded-md" name="role" value={userForm.role} onChange={handleChange}>
                        <option value="">Select Role</option>
                        <option value="executive">executive</option>
                        <option value="verifier">verifier</option>
                      </select>
                    </div>
                    {/* btn */}
                    <div>
                        <button 
                        type='submit'
                        className=" text-white bg-[#020205] my-4 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
                        > Add</button>
                    </div>
           </form>
         </div>
        )}
      </div>
      {/* table */}
    <div className='w-10/12  shadow-md rounded-md sm:rounded-lg '>
      <table className="w-full text-sm text-center">
                  <thead className="text-xs rounded-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 rounded-tl-lg text-gray-200">
                      NAME
                      </th>
                      <th scope="col" className="px-6 py-3 text-gray-200">
                        EMAIL
                      </th>
                      <th scope="col" className="px-6 py-3 text-gray-200">
                        ROLE
                      </th>
                      <th scope="col" className="px-6 py-3 rounded-tr-lg text-gray-200">
                        DELETE USER
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers && allUsers.map((user) => {
                      
                      return (
                        <tr
                          key={user?._id}
                          className="bg-white border-b dark:bg-gray-100 "
                        >
                          <td
                            scope="row"
                            className="px-6 py-4 uppercase font-medium text-gray-900 whitespace-nowrap dark:text-black"
                          >
                            <p>{user?.name}</p>
                            
                          </td>
                          <td
                            scope="row"
                            className="px-6 py-4 text-left  font-medium text-gray-900 whitespace-nowrap dark:text-black"
                          >
                            <p   style={{marginLeft:"2rem"}}>{user?.email}</p>
                            
                          </td>
                          <td
                            scope="row"
                            className="px-6 flex items-center justify-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                          >                         
                        <SelectComponent _id={user._id} role={user?.role} updateUserRole={updateUserRole} isLoading={isLoading}/>                 
                          </td>
                          <td
                            scope="row"
                            className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-black"
                          >
                          <button onClick={()=>deleteUser(user._id)} className='w-full flex justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#5dffac" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button> 
                          </td> 
                          
                        </tr>
                      );
                    })}
                  </tbody>
      </table>
    </div>  
    </div>
  )
}

export default Team
