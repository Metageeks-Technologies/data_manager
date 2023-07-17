import reducer from "./reducer";
import axios from "axios";
import { toast } from 'react-toastify';

import {
    EDIT_DATA_BEGIN,
    EDIT_DATA_SUCCESS,
    EDIT_DATA_FAIL,
    UPLOAD_DATA_SUCCESS,
    UPLOAD_DATA_FAIL,
    API_CALL_BEGIN,
    API_CALL_FAIL,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    GET_USER_BEGIN,
    LOGOUT_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    SET_FILE,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    GET_ALL_DATA_SUCCESS,
    GET_ALL_EDIT_REQUEST_SUCCESS,
    APPROVE_EDIT_SUCCESS,
    REJECT_EDIT_SUCCESS,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAIL,
    DELETE_USER_SUCCESS,
    OPEN_SEARCH_BAR,
    CHANGE_PASSWORD_SUCCESS,
    DELETE_DATA_SUCCESS,
    GET_ALL_DELETED_DATA_SUCCESS,
    YEAR_PICKER,
    IS_SEARCHED
       
} from './action'
import React, { useReducer, useContext,useEffect, useState } from 'react';

const value=localStorage.getItem("isAuth");
 
export const initialState  ={
    isLoading:false,
    userLoading:false,
    isAuthenticated:value!==null || false,
    user:null,
    isAdmin:false,
    mainData:[],
    file:null,
    message:"",
    editRequestData:[],
    editDataStatusChange:false,
    toggleAction:false,
    pageInfo:{
      totalCount:25
    },
    allUsers:[],
    deletedData:[],
    openSearchBar:false,
    isEmailVerified:false,
    isOtpVerified:false,
    yearPicker:null,
    isSearched:false
    
}
export const showAlert=(type,text)=>{
  if(type==="warn"){
    toast.warn(text, {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  else if(type==="error"){
    toast.error(text, {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }else if(type==="info"){
    toast.info(text, {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  else if(type==="succ"){
    toast.success(text, {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
 
  const [state, dispatch] = useReducer(reducer,initialState);
  const [page,setPage]= useState(1)
  // axios --base url
  const instance = axios.create({
    //  baseURL: import.meta.env.VITE_SERVER_URL+"/api/v1",
    baseURL: 'call/api/v1',
     headers:{"token":localStorage.getItem("token")}
      // to get cookies in browser during development
    // production
    
  }); 
  useEffect(()=>{
    instance.defaults.headers["token"] = localStorage.getItem("token")
  },[instance,state.isAuthenticated])
  const setFile=(file)=>{
    dispatch({type:SET_FILE,payload:file});  
  } 
    
  
  const getYearPicker=(year)=>{
    dispatch({type:YEAR_PICKER,payload:year});
  }
  const isSearchedHandler=(val)=>{
    dispatch({type:IS_SEARCHED,payload:val});
  }
    const searchBar= (val)=>{
      dispatch({type:OPEN_SEARCH_BAR,payload:val})  
    }
    const changePassword=async(obj)=>{
      dispatch({type:API_CALL_BEGIN});
      try{
        const {data} =await instance.patch(`/auth/changePassword`,obj);
        
        dispatch({ 
          type:CHANGE_PASSWORD_SUCCESS,
          payload:data.user
        })
        showAlert("succ","Password changed successfully")
      }catch(error){
        dispatch({type:LOGIN_USER_FAIL})
        if (error.response && error.response.data && error.response.data.message) {
          return  showAlert("warn",error.response.data.message);
        } 
        
        showAlert("error",error.message || 'something went wrong try again');
      }

    }
    const loginUser=async(currUser)=>{
      dispatch({type:API_CALL_BEGIN});
      try{
        const {data} =await instance.post(`/auth/login`,currUser);
        console.log("data",data)
        
        dispatch({ 
          type:LOGIN_USER_SUCCESS,
          payload:data.user
        })
        localStorage.setItem("isAuth", "yes");
        showAlert("succ","Logged in Successfully")
      }catch(error){
        dispatch({type:LOGIN_USER_FAIL})
        if (error.response && error.response.data && error.response.data.message) {
          return  showAlert("warn",error.response.data.message);
        } 
        
        showAlert("error",error.message || 'something went wrong try later');
      }

    }


    const logoutUser =async()=>{
      await instance.get(`/auth/logout`);
      dispatch({type:LOGOUT_USER});
      localStorage.removeItem("isAuth");     
    }


    const getCurrUser=async()=>{
        dispatch({type:GET_USER_BEGIN});
        try{
          const {data}= await instance(`/auth/getCurrUser`);
          
          dispatch({
            type:GET_USER_SUCCESS,
            payload:data.user
          })
        }catch(err){
          
          if (err.response.status === 401) { 
            localStorage.removeItem("isAuth");
            dispatch({type:GET_USER_FAIL});
            return;
          };
          logoutUser();
          
          
          
          
          
        }
    }  
    
    
    const getAllData=async(queryObject)=>{
      console.log(queryObject);
      let {status,place,date,customerName,editStatus,dri_id,appNumber,amc,company,membership_type,acceptance}=queryObject;
      customerName=customerName.toUpperCase();
      dispatch({type:API_CALL_BEGIN});     
      try { 
  
        const {data}= await instance(`/getData?dri_id=${dri_id}&appNumber=${appNumber}&date=${date}&status=${status}&place=${place}&customerName=${customerName}&editStatus=${editStatus}&page=${page}&amc=${amc}&acceptance=${acceptance}&company=${company}&membership_type=${membership_type}`) 
       console.log(data);
        
        dispatch({type:GET_ALL_DATA_SUCCESS,
          payload:data
        })
      } catch (error) {
        dispatch({type:API_CALL_FAIL});
        console.log(error)
      }
      
    } 
    const getAllDeletedData=async(queryObject)=>{
      console.log(queryObject);
      let {status,place,date,customerName,editStatus,dri_id,appNumber,amc,company,membership_type,acceptance}=queryObject;

      customerName=customerName.toUpperCase()
      dispatch({type:API_CALL_BEGIN});     
      try { 
  
        const {data}= await instance(`/getData?dri_id=${dri_id}&appNumber=${appNumber}&date=${date}&status=${status}&place=${place}&customerName=${customerName}&editStatus=${editStatus}&page=${page}&amc=${amc}&acceptance=${acceptance}&company=${company}&membership_type=${membership_type}`) 
       console.log(data);
        
        dispatch({type:GET_ALL_DELETED_DATA_SUCCESS,
          payload:data
        })
      } catch (error) {
        dispatch({type:API_CALL_FAIL});
        console.log(error)
      }
      
    } 
    const exportData=async(queryObject)=>{
     let {status="",place="",year="",customerName="",editStatus="",dri_id="",appNumber="",amc=""}=queryObject;
     customerName=customerName.toUpperCase()
     try {
 
       const {data}= await instance(`/export?dri_id=${dri_id}&appNumber=${appNumber}&year=${year}&status=${status}&place=${place}&customerName=${customerName}&editStatus=${editStatus}&page=${page}&amc=${amc}`) 
       
       console.log(data);
      window.open(import.meta.env.VITE_SERVER_URL+"/download/"+data.fileName)
      //  dispatch({type:EXPORT_DATA_SUCCESS,
      //    payload:data
      //  })
     } catch (error) {
       dispatch({type:API_CALL_FAIL});
       console.log(error)
     }
     
   }

    const UploadData=async(file)=>{
     
      dispatch({type:API_CALL_BEGIN});

     
      try {
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);
        const {data}= await instance.post(`/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      
        dispatch({type:UPLOAD_DATA_SUCCESS,
          payload:data.message
        })
        showAlert("succ",data.message);
      } catch (error) {
        
        dispatch({type:UPLOAD_DATA_FAIL, payload:error.message});
        showAlert("error",error.message);
        
      }
    }
    const changeAcceptance=async(id)=>{  
      const obj={
        id
      }  
      dispatch({type:API_CALL_BEGIN});     
      try {
        const {data}= await instance.patch(`/deleteData`, obj);

        dispatch({type:DELETE_DATA_SUCCESS,
          payload:data.message
        })
        showAlert("succ",data.message);
      } catch (error) {
        
        dispatch({type:API_CALL_FAIL, payload:error.message});
        showAlert("error",error.message);
        
      }
    }
    const getAllUser=async()=>{
      
      dispatch({type:API_CALL_BEGIN});     
      try {
  
        const {data}= await instance.get('/auth/admin/getAllUser')
        
        dispatch({type:GET_ALL_USERS_SUCCESS,
          payload:data
        })
      } catch (error) {
        dispatch({type:GET_ALL_USERS_FAIL});
        
      }
      
    } 
    const updateUserRole=async(_id,obj)=>{
      
      const objBody={
        id:_id,
        obj:obj
      }
      console.log(objBody)
      
      dispatch({type:API_CALL_BEGIN});     
      try {
  
        const {data}= await instance.post(`/auth/admin/updateRole`,objBody)
        
        dispatch({type:UPDATE_ROLE_SUCCESS,
          payload:data
        })
        showAlert("succ","User Role Updated")
      } catch (error) {
        dispatch({type:UPDATE_ROLE_FAIL});
        if (error.response && error.response.data && error.response.data.message) {
          return  showAlert("warn",error.response.data.message);
        } 
        
        showAlert("error",error.message || 'something went wrong try later');
      }
      
    } 
    const addUser=async (currUser)=>{
      dispatch({type:API_CALL_BEGIN});
      try {
        const {data}= await instance.post('/auth/admin/addUser',currUser);
          dispatch({
            type:ADD_USER_SUCCESS,
            payload:data.user
          })
          showAlert("succ","User added")
      } catch (error) {
        dispatch({type:API_CALL_FAIL})
        if (error.response && error.response.data && error.response.data.message) {
          return  showAlert("warn",error.response.data.message);
        } 
        
        showAlert("error",error.message || 'something went wrong try later');
      }
    }
    const deleteUser=async (id)=>{
      const obj={
        id:id
      }
      dispatch({type:API_CALL_BEGIN});
      try {
        const {data}= await instance.delete(`/auth/admin/${id}`,obj);
          dispatch({
            type:DELETE_USER_SUCCESS,
            payload:data.user
          })
          showAlert("succ","User Deleted")
      } catch (error) {
        dispatch({type:API_CALL_FAIL})
        if (error.response && error.response.data && error.response.data.message) {
          return  showAlert("warn",error.response.data.message);
        } 
        
        showAlert("error",error.message || 'something went wrong try later');
      }
    }


 
    // EXECUTIVE
    const editData=async(id,changedData)=>{
     
      dispatch({type:EDIT_DATA_BEGIN});
      
      try {
       
        const {data}= await instance.post(`/edit/${id}`,changedData)
       
        dispatch({type:EDIT_DATA_SUCCESS,
          payload:data.data
        })
        
      } catch (error) { 
        dispatch({type:EDIT_DATA_FAIL});  
      }
    }
    // VERIFIER
    const  getAllEditRequest=async()=>{
     
      dispatch({type:API_CALL_BEGIN});
     
      try {
       
        const {data}= await instance.get(`/edit/allData`)
        dispatch({type:GET_ALL_EDIT_REQUEST_SUCCESS,
          payload:data.data
        })
        
      } catch (error) { 
        dispatch({type:API_CALL_FAIL});  
      }
    }
    const approveEditRequest=async(id)=>{
      dispatch({type:API_CALL_BEGIN});
      try {
       
        const {data}= await instance.patch(`/edit/update/${id}`)
        console.log(data);
        dispatch({type:APPROVE_EDIT_SUCCESS
        })
        
      } catch (error) { 
        dispatch({type:API_CALL_FAIL});  
      }

    }
    const rejectEditRequest=async(id)=>{
      dispatch({type:API_CALL_BEGIN});
      try {
       
        const {data}= await instance.patch(`/edit/${id}`)
        console.log(data);
        dispatch({type:REJECT_EDIT_SUCCESS
        })
        
      } catch (error) { 
        dispatch({type:API_CALL_FAIL});  
      }
    }
    // initial app load
    useEffect(()=>{
     // getUser
      getCurrUser();
      // get all users
      getAllUser();
      //get all deleted data
      getAllDeletedData({
        status:"All",
        place:"All",
        dri_id:"",
        date:"",
        customerName:"",
        editStatus:"All",
        appNumber:"",
        company: 'All',
        membership_type: 'All',
        acceptance: "deleted"
      })
    // raw data  
      getAllData(
        {
          dri_id: '',
          appNumber: '',
          date: '',
          status: 'All',
          place: 'All',
          customerName: '',
          editStatus: 'All',
          page: '1',
          amc: '',
          acceptance: 'accepted',
          membership_type:'All',
          company:'All'

        }
      );
      getAllEditRequest();
    },[])
    return (
        <AppContext.Provider
          value={{...state,
            setFile,UploadData,getAllData,editData,getAllEditRequest,approveEditRequest,rejectEditRequest
            ,loginUser,logoutUser,getCurrUser,page,getYearPicker,isSearchedHandler
            ,setPage,exportData,getAllUser,addUser,updateUserRole,deleteUser,
            searchBar,changePassword,getAllDeletedData,showAlert,changeAcceptance}}
        >
          {children}
        </AppContext.Provider>
      );
}
export const useAppContext = () => {
    return useContext(AppContext);
  };
  
  export { AppProvider };