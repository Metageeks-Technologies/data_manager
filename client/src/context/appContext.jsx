import reducer from "./reducer";
import axios from "axios";
import { toast } from "react-toastify";

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
  LAST_FILTER_QUERY,
  IS_SEARCHED,
  MAKE_ACTIVITY_SUCCESS,
  GET_ALL_ACTIVITY_SUCCESS,
  DRI_ID,
  INCREASE_PAGE,
  GET_ALL_VAR_DATA_SUCCESS,
  DECREASE_PAGE,
  SET_PAGE,
  INITIAL_PAGINATION,
  SET_SHOW_TABLE,
  TOGGLE_EXE_DATA,
  GET_ALL_IPS,
  DELETE_IP,
  ADD_IP,
  GET_OPTION,
  ADD_OPTION,
  ADMIN_POPUP,
  GET_SINGLE_DATA_SUCCESS,
  DELETE_OPTION,
  GET_ALL_ACTIVITY_SUCCESS_VAR,
} from "./action";
import React, { useReducer, useContext, useEffect, useState } from "react";

const value = localStorage.getItem("isAuth");

export const initialState = {
  isLoading: false,
  userLoading: false,
  isAuthenticated: value !== null || false,
  user: null,
  isAdmin: false,
  mainData: [],
  varData: [],
  file: null,
  message: "",
  editRequestData: [],
  editDataStatusChange: false,
  toggleAction: false,
  pageInfo: {
    totalCount: 25,
  },
  allUsers: [],
  deletedData: [],
  openSearchBar: false,
  isEmailVerified: false,
  isOtpVerified: false,
  yearPicker: null,
  isSearched: false,
  lastFilterQuery: "",
  allActivityByExe: [],
  allActivityByVar: [],
  singleData:null,
  dri_idOnWhichActionPerformed: "",
  page: 1,
  varPage: 1,
  totalData: 0,
  numOfPages:1,
  showTable:false,
  toggleExeData:true,
  allowedIPs:[],
  statusOptions:[],
  placeOptions:[],
  memberOptions:[],
  adminPopup:false,
  activityNumOfPageVar:1,
  activityNumOfPage:1

  
};
export const showAlert = (type, text) => {
  if (type === "warn") {
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
  } else if (type === "error") {
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
  } else if (type === "info") {
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
  } else if (type === "succ") {
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
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const instance = axios.create({
    // to get cookies in browser during development
    
    // baseURL: "call/api/v1",

    // production
    baseURL:"/api/v1",
  });
  
  useEffect(() => {
    instance.defaults.headers["token"] = localStorage.getItem("token");
  }, [instance, state.isAuthenticated]);
  const setFile = (file) => {
    dispatch({ type: SET_FILE, payload: file });
  };

  const setInitialPag = () => {
    dispatch({ type: INITIAL_PAGINATION});
  };
  const setAdminPopup = (val) => {
    dispatch({ type: ADMIN_POPUP,payload:val});
  };
  const toggleExeDataF = () => {
    dispatch({ type: TOGGLE_EXE_DATA});
  };
  const setShowTable = (val) => {
    dispatch({ type: SET_SHOW_TABLE,payload:val});
  };
  const setDriId = (id) => {
    dispatch({ type: DRI_ID, payload: id });
  };
  const isSearchedHandler = (val) => {
    dispatch({ type: IS_SEARCHED, payload: val });
  };
  const searchBar = (val) => {
    dispatch({ type: OPEN_SEARCH_BAR, payload: val });
  };
  const setPageNumber = (increase) => {
    if (increase) dispatch({ type: INCREASE_PAGE });
    else dispatch({ type: DECREASE_PAGE });

  };
  
  
  const setPage=(num=>{
    dispatch({type:SET_PAGE,payload:num});
  })
  const getOption = async () => {
    dispatch({ type: API_CALL_BEGIN });
    
    
    try {
      const { data } = await instance.get(`/option/getOption`);

      dispatch({
        type: GET_OPTION,
        payload: data,
      });
      
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
      console.log(error);
    }
  };
  const addOption = async (obj) => {
    dispatch({ type: API_CALL_BEGIN });
    console.log(obj);
    
    try {
      const { data } = await instance.post(`/option/addOption`,obj);

      dispatch({
        type: ADD_OPTION,
        payload: data,
      });
      showAlert("succ", "Option Added successfully");
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
      console.log(error);
    }
  };
  const deleteOption = async (value) => {
    dispatch({ type: API_CALL_BEGIN });
    // console.log(obj);
    
    try {
      const { data } = await instance.delete(`/option/deleteOption/${value}`);

      dispatch({
        type: DELETE_OPTION,
        payload: data,
      });
      showAlert("succ", "Option deleted successfully");
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
      // console.log(error);
    }
  };
  const AddIP = async (obj) => {
    dispatch({ type: API_CALL_BEGIN });
    console.log(obj);
    
    try {
      const { data } = await instance.post(`/ip/addIP`, obj);

      dispatch({
        type: ADD_IP,
        payload: data,
      });
      showAlert("succ", data.message);
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
    }
  };
  const deleteIP = async (id) => {
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance.delete(`/ip/deleteIP/${id}`);

      dispatch({
        type: DELETE_IP,
        payload: data,
      });
      showAlert("succ", data.message);
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
    }
  };
  const getAllIPs = async () => {
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance(`/ip/getAllIP`);
      dispatch({
        type: GET_ALL_IPS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
      showAlert("error", error.message || "something went wrong try again");
    }
  };

  const makeActivity = async (obj) => {
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance.post(`/activity/makeActivity`, obj);

      dispatch({
        type: MAKE_ACTIVITY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
      showAlert("error", error.message || "something went wrong try again");
    }
  };
  const getAllActivity = async (userRole,page) => {
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance(`/activity/getAllActivity?userRole=${userRole}&page=${page}`);
      dispatch({
        type: GET_ALL_ACTIVITY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
      showAlert("error", error.message || "something went wrong try again");
    }
  };
  const getAllActivityVar = async (userRole,page) => {
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance(`/activity/getAllActivity?userRole=${userRole}&page=${page}`);
      dispatch({
        type: GET_ALL_ACTIVITY_SUCCESS_VAR,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
      showAlert("error", error.message || "something went wrong try again");
    }
  };
  const changePassword = async (obj) => {
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance.patch(`/auth/changePassword`, obj);

      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: data.user,
      });
      showAlert("succ", "Password changed successfully");
    } catch (error) {
      dispatch({ type: LOGIN_USER_FAIL });
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return showAlert("warn", error.response.data.message);
      }

      showAlert("error", error.message || "something went wrong try again");
    }
  };
  const loginUser = async (currUser) => {
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance.post(`/auth/login`, currUser);
      console.log("data", data);

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: data.user,
      });
      localStorage.setItem("isAuth", "yes");
      showAlert("succ", "Logged in Successfully");
    } catch (error) {
      dispatch({ type: LOGIN_USER_FAIL });
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return showAlert("warn", error.response.data.message);
      }

      showAlert("error", error.message || "something went wrong try later");
    }
  };

  const logoutUser = async () => {
    dispatch({ type: API_CALL_BEGIN });
    try {
      await instance.get(`/auth/logout`);
      dispatch({ type: LOGOUT_USER });
      localStorage.removeItem("isAuth");
      showAlert("succ", "User Logged out successfully");
    } catch (err) {
      showAlert("error", err.message || "something went wrong try later");
    }
  };

  const getCurrUser = async () => {
    dispatch({ type: GET_USER_BEGIN });
    try {
      const { data } = await instance(`/auth/getCurrUser`);

      dispatch({
        type: GET_USER_SUCCESS,
        payload: data.user,
      });
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.removeItem("isAuth");
        dispatch({ type: GET_USER_FAIL });
        return;
      }
      logoutUser();
    }
  };

  const getAllData = async (queryObject) => {
    // let {status,place,date,customerName,editStatus,dri_id,appNumber,amc,company,membership_type,acceptance,page}=queryObject;
    let {
      status = "All",
      place = "All",
      dri_id = "",
      date = "All",
      customerName = "",
      appNumber = "",
      company = "All",
      membership_type = "All",
      amc = "All",
      acceptance = "accepted",
      editStatus = "All",
      page = 1,
    } = queryObject;
    console.log(page);
    customerName = customerName?.toUpperCase();
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance(
        `/getData?dri_id=${dri_id}&appNumber=${appNumber}&date=${date}&status=${status}&place=${place}&customerName=${customerName}&editStatus=${editStatus}&page=${page}&amc=${amc}&acceptance=${acceptance}&company=${company}&membership_type=${membership_type}`
      );
      console.log(data);

      dispatch({ type: GET_ALL_DATA_SUCCESS, payload: { data, queryObject } });
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
      console.log(error);
    }
  };
  const getSingleData=async (id)=>{
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance(`/getSingleData/${id}`);

      dispatch({
        type: GET_SINGLE_DATA_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({type:API_CALL_FAIL});
    }
  }
  const getAllVarData = async (queryObject) => {
    // let {status,place,date,customerName,editStatus,dri_id,appNumber,amc,company,membership_type,acceptance,page}=queryObject;
    let {
      status = "All",
      place = "All",
      dri_id = "",
      date = "All",
      customerName = "",
      appNumber = "",
      company = "All",
      membership_type = "All",
      amc = "All",
      acceptance = "accepted",
      editStatus = "pending",
      page=1,
    } = queryObject;
    customerName = customerName?.toUpperCase();
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance(
        `/getData?dri_id=${dri_id}&appNumber=${appNumber}&date=${date}&status=${status}&place=${place}&customerName=${customerName}&editStatus=${editStatus}&page=${page}&amc=${amc}&acceptance=${acceptance}&company=${company}&membership_type=${membership_type}`
      );
      dispatch({ type: GET_ALL_VAR_DATA_SUCCESS, payload: { data, queryObject } });
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
    }
  };
  const getAllDeletedData = async (queryObject) => {
    console.log("getALLdeted Called");
    
   
    let {
      status = "All",
      place = "All",
      dri_id = "",
      date = "All",
      customerName = "",
      editStatus = "All",
      appNumber = "",
      company = "All",
      amc = "All",
      membership_type = "All",
      acceptance = "deleted",
      page=1,
    } = queryObject;

    customerName = customerName?.toUpperCase();
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance(
        `/getData?dri_id=${dri_id}&appNumber=${appNumber}&date=${date}&status=${status}&place=${place}&customerName=${customerName}&editStatus=${editStatus}&page=${page}&amc=${amc}&acceptance=${acceptance}&company=${company}&membership_type=${membership_type}`
      );
      console.log(data);

      dispatch({ type: GET_ALL_DELETED_DATA_SUCCESS, payload: { data, queryObject } });
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
      console.log(error);
    }
  };
  const exportData = async (queryObject) => {
    
    let {
      status = "All",
      place = "All",
      dri_id = "",
      date = "All",
      customerName = "",
      editStatus = "All",
      appNumber = "",
      company = "All",
      amc = "All",
      membership_type = "All",
      acceptance,
    } = queryObject;
    customerName = customerName.toUpperCase();
    try {
     
      const response = await instance(
        `/export?dri_id=${dri_id}&appNumber=${appNumber}&date=${date}&status=${status}&place=${place}&customerName=${customerName}&editStatus=${editStatus}&amc=${amc}&acceptance=${acceptance}&company=${company}&membership_type=${membership_type}`,
        {
          responseType: "blob",
        }
      );
      // alert("hi");
      console.log(response);
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a URL for the blob object
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;
      link.download = "Export" + new Date().getTime() + ".xlsx";

      // Simulate a click event to trigger the download
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
      alert("error")
      console.log(error);
    }
  };

  const UploadData = async (file) => {
    dispatch({ type: API_CALL_BEGIN });

    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(file);
      const { data } = await instance.post(`/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({ type: UPLOAD_DATA_SUCCESS, payload: data.message });
      showAlert("succ", data.message);
    } catch (error) {
      dispatch({ type: UPLOAD_DATA_FAIL, payload: error.message });
      showAlert("error", error.message);
    }
  };
  const changeAcceptance = async (id) => {
    const obj = {
      id,
    };
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance.patch(`/deleteData`, obj);

      dispatch({ type: DELETE_DATA_SUCCESS, payload: data.message });
      showAlert("succ", data.message);
    } catch (error) {
      dispatch({ type: API_CALL_FAIL, payload: error.message });
      showAlert("error", error.message);
    }
  };
  const getAllUser = async () => {
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance.get("/auth/admin/getAllUser");

      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ALL_USERS_FAIL });
    }
  };
  const updateUserRole = async (_id, obj) => {
    const objBody = {
      id: _id,
      obj: obj,
    };
    console.log(objBody);

    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance.post(`/auth/admin/updateRole`, objBody);

      dispatch({ type: UPDATE_ROLE_SUCCESS, payload: data });
      showAlert("succ", "User Role Updated");
    } catch (error) {
      dispatch({ type: UPDATE_ROLE_FAIL });
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return showAlert("warn", error.response.data.message);
      }

      showAlert("error", error.message || "something went wrong try later");
    }
  };
  const addUser = async (currUser) => {
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance.post("/auth/admin/addUser", currUser);
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: data.user,
      });
      showAlert("succ", "User added");
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return showAlert("warn", error.response.data.message);
      }

      showAlert("error", error.message || "something went wrong try later");
    }
  };
  const deleteUser = async (id) => {
    const obj = {
      id: id,
    };
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance.delete(`/auth/admin/${id}`, obj);
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: data.user,
      });
      showAlert("succ", "User Deleted");
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return showAlert("warn", error.response.data.message);
      }

      showAlert("error", error.message || "something went wrong try later");
    }
  };

  // EXECUTIVE
  const editData = async (id, changedData) => {
    dispatch({ type: EDIT_DATA_BEGIN });

    try {
      const { data } = await instance.post(`/edit/${id}`, changedData);

      dispatch({ type: EDIT_DATA_SUCCESS, payload: data.data });
      showAlert("succ", "Data Edited Successfully");
    } catch (error) {
      dispatch({ type: EDIT_DATA_FAIL });
      showAlert("error", "Data Edit Failed Try Latter ");
    }
  };
  // VERIFIER
  const getAllEditRequest = async (queryObject) => {
  //  const {status,page}=queryObject;
   
    dispatch({ type: API_CALL_BEGIN });

    
  };
  const approveEditRequest = async (id) => {
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance.patch(`/edit/update/${id}`);
      console.log(data);
      dispatch({ type: APPROVE_EDIT_SUCCESS });
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
    }
  };
  const rejectEditRequest = async (id) => {
    dispatch({ type: API_CALL_BEGIN });
    try {
      const { data } = await instance.patch(`/edit/${id}`);
      console.log(data);
      dispatch({ type: REJECT_EDIT_SUCCESS });
    } catch (error) {
      dispatch({ type: API_CALL_FAIL });
    }
  };
  // initial app load
  useEffect(() => {
    
    // getAllActivity("executive",1);
    getCurrUser();
    getOption();
    
  }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        setFile,
        UploadData,
        getAllData,
        editData,
        getAllEditRequest,
        approveEditRequest,
        rejectEditRequest,
        loginUser,
        logoutUser,
        getCurrUser,
        setShowTable,
        isSearchedHandler,
        exportData,
        getAllUser,
        addUser,
        updateUserRole,
        deleteUser,
        makeActivity,
        getAllActivity,
        searchBar,
        changePassword,
        setDriId,
        getAllDeletedData,
        showAlert,
        changeAcceptance,
        setPageNumber,
        getAllVarData,
        setPage,
        setInitialPag,
        toggleExeDataF,
        getAllIPs,AddIP,deleteIP,
        getOption,
        addOption,
        setAdminPopup,
        getSingleData,
        deleteOption,
        getAllActivityVar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
